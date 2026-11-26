# Hook test E audio + mux (instamake 26 Nov 2026). NO voice.
# 0-2.2 tense filtered groove + missed-tap thuds on the old site; 2.2 cut hit; montage: drag swish (2.35-2.85), typing (2.98-3.6),
# photo click (3.97), three tick pops (4.45, 4.62, 4.79); 5.0 BEAT CHANGE (full track + sub drop) on the AFTER; tap + ding (5.85, 6.2);
# whoosh + impact on the end card (7.2). Music: NEW track audio-kit/bg_music.py house 199 (logged in MUSIC-LOG.md).
# usage: python3 -I build.py <repo> <video.mp4> <out.mp4>
import os, subprocess, sys
import numpy as np, soundfile as sf
REPO, VID, OUT = sys.argv[1:4]
DUR, T1, T2, END, sr = 8.8, 2.2, 5.0, 7.2, 44100
N = int(DUR * sr); T = lambda n: np.arange(n) / sr; rng = np.random.default_rng(31)
TMP = '/tmp/hooktest-e'; os.makedirs(TMP, exist_ok=True)
def place(buf, x, at, g=1.0):
    i = int(at * sr); n = min(len(x), len(buf) - i)
    if n > 0: buf[i:i + n] += x[:n] * g
def band(x, lo, hi):
    X = np.fft.rfft(x); fr = np.fft.rfftfreq(len(x), 1 / sr); X[(fr < lo) | (fr > hi)] = 0; return np.fft.irfft(X, len(x))
def click(f0=3200, d=.03):
    n = int(d * sr); return np.sin(2 * np.pi * f0 * T(n)) * np.exp(-T(n) * 260) + band(rng.standard_normal(n), 2000, 9000) * np.exp(-T(n) * 400) * .6
def key():
    n = int(.025 * sr); return band(rng.standard_normal(n), 2500, 9000) * np.exp(-T(n) * 300)
pop = lambda f: np.sin(2 * np.pi * np.linspace(f, f * 1.8, int(.12 * sr)) * T(int(.12 * sr))) * np.exp(-T(int(.12 * sr)) * 35)
def whoosh(dur=.45):
    m = int(dur * sr); x = rng.standard_normal(m); o = np.zeros(m); s = m // 12
    for j in range(12): lo = 300 + j * 500; o[j * s:(j + 1) * s] = band(x[j * s:(j + 1) * s], lo, lo + 2500)
    return o * np.sin(np.pi * T(m) / dur) ** 2 * .6
sfx = np.zeros(N)
thud = lambda: np.sin(2 * np.pi * 120 * T(int(.12 * sr))) * np.exp(-T(int(.12 * sr)) * 30)
for a in np.arange(0, T1, 1.1): place(sfx, thud(), a + .2, .5); place(sfx, click(900, .05), a + .2, .25)  # missed taps
n = int(.6 * sr); place(sfx, np.sin(2 * np.pi * np.cumsum(np.linspace(70, 40, n)) / sr) * np.exp(-T(n) * 6), T1, .6); place(sfx, click(1800, .06), T1, .8)
place(sfx, click(2400), 2.34, .6); place(sfx, band(rng.standard_normal(int(.5 * sr)), 600, 3000) * np.sin(np.pi * T(int(.5 * sr)) / .5) * .3, 2.35); place(sfx, click(1600, .05), 2.86, .7)
for a in np.arange(2.98, 3.6, .06): place(sfx, key(), a + rng.uniform(-.01, .01), .45)
place(sfx, click(2600), 3.97, .8)
for i, a in enumerate((4.45, 4.62, 4.79)): place(sfx, pop(700 + i * 180), a, .55)
n = int(.7 * sr); place(sfx, np.sin(2 * np.pi * np.cumsum(np.linspace(90, 38, n)) / sr) * np.exp(-T(n) * 4), T2, .8)
place(sfx, whoosh(.35), T2 - .3, .6)
tap = band(rng.standard_normal(int(.03 * sr)), 1500, 6000) * np.exp(-T(int(.03 * sr)) * 200); place(sfx, tap, 5.85, .8)
m_ = int(.9 * sr); ding = (np.sin(2 * np.pi * 1318 * T(m_)) + .5 * np.sin(2 * np.pi * 1976 * T(m_))) * np.exp(-T(m_) * 5) * .4; place(sfx, ding, 6.2, .9)
place(sfx, whoosh(), END - .3, .8); n = int(.5 * sr); place(sfx, np.sin(2 * np.pi * 55 * T(n)) * np.exp(-T(n) * 7), END, .6)
subprocess.run(['python3', '-I', os.path.join(REPO, 'audio-kit/bg_music.py'), 'house', '199', str(DUR), f'{TMP}/music.wav'], check=True)
mus, msr = sf.read(f'{TMP}/music.wav'); mus = mus.mean(1) if mus.ndim > 1 else mus; mus = np.pad(mus, (0, max(0, N - len(mus))))[:N]
mus = mus / (np.abs(mus).max() + 1e-9)
cut = int(T2 * sr); pre = band(mus, 150, 1800)  # low-passed groove until the AFTER, then the full beat
mus = np.concatenate([pre[:cut] / (np.abs(pre[:cut]).max() + 1e-9) * .6, mus[cut:]])
gain = np.where(T(N) < T2, .3, .48)
mix = sfx + mus * gain
fade = np.ones(N); m = int(.25 * sr); fade[-m:] = np.linspace(1, .3, m); mix *= fade
sf.write(f'{TMP}/mix.wav', (mix / np.abs(mix).max() * .95).astype(np.float32), sr)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', VID, '-i', f'{TMP}/mix.wav', '-filter_complex', '[1:a]loudnorm=I=-14:TP=-1.5,aresample=44100[a]',
                '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-profile:v', 'main', '-pix_fmt', 'yuv420p', '-crf', '21', '-r', '30',
                '-c:a', 'aac', '-ac', '2', '-b:a', '160k', '-movflags', '+faststart', '-shortest', OUT], check=True)
print('done', OUT)
