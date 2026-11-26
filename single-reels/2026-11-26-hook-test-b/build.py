# Hook test B audio + mux (instamake 26 Nov 2026). NO voice.
# Glitch stutters + alert beeps on the flashing "Not secure" (0–3.5 s, music filtered and low), cursor click 3.3,
# satisfying click + beat drop on the flip (3.5), pop on the care-plan card (4.6), whoosh + impact on the end card (6.0).
# Music: NEW track audio-kit/bg_music.py house 191 (logged in MUSIC-LOG.md).
# usage: python3 -I build.py <repo> <video.mp4> <out.mp4>
import os, subprocess, sys
import numpy as np, soundfile as sf
REPO, VID, OUT = sys.argv[1:4]
DUR, TURN, END, sr = 7.5, 3.5, 6.0, 44100
N = int(DUR * sr); T = lambda n: np.arange(n) / sr; rng = np.random.default_rng(11)
TMP = '/tmp/hooktest-b'; os.makedirs(TMP, exist_ok=True)
def place(buf, x, at, g=1.0):
    i = int(at * sr); n = min(len(x), len(buf) - i)
    if n > 0: buf[i:i + n] += x[:n] * g
def band(x, lo, hi):
    X = np.fft.rfft(x); fr = np.fft.rfftfreq(len(x), 1 / sr); X[(fr < lo) | (fr > hi)] = 0; return np.fft.irfft(X, len(x))
sfx = np.zeros(N)
# alert beeps: two-tone, once per flash cycle (the pill flashes with period 2π/14 ≈ 0.449 s)
def beep(f1, d=.09):
    n = int(d * sr); t = T(n); return np.sign(np.sin(2 * np.pi * f1 * t)) * .5 * np.minimum(1, (d - t) * 60) * np.minimum(1, t * 400)
P = 2 * np.pi / 14
k = 0
while k * P < TURN - .1:
    place(sfx, beep(1046 if k % 2 == 0 else 784), k * P, .22); k += 1
# glitch stutters: chopped band noise + bit-crushed buzz at random moments
for at in (0.0, .62, 1.18, 1.7, 2.25, 2.7, 3.05):
    n = int(rng.uniform(.08, .16) * sr); x = band(rng.standard_normal(n), 800, 9000)
    gate = (np.floor(T(n) * rng.uniform(40, 70)) % 2)
    buzz = np.round(np.sin(2 * np.pi * rng.uniform(90, 160) * T(n)) * 4) / 4
    place(sfx, (x * .5 + buzz * .5) * gate * np.exp(-T(n) * 8), at, .45)
# tension riser into the flip
n = int(TURN * sr); t = T(n)
place(sfx, band(rng.standard_normal(n), 400, 7000) * (t / TURN) ** 3 * .3, 0)
# cursor click (3.3) and the satisfying fix click + soft chime (3.5)
def click(f0=3200, d=.03):
    n = int(d * sr); return np.sin(2 * np.pi * f0 * T(n)) * np.exp(-T(n) * 260) + band(rng.standard_normal(n), 2000, 9000) * np.exp(-T(n) * 400) * .6
place(sfx, click(2600), 3.3, .6)
place(sfx, click(1800, .06), TURN, 1.0); place(sfx, click(3600), TURN + .035, .7)
ch = sum(np.sin(2 * np.pi * fq * T(int(1.0 * sr))) * a for fq, a in ((1568, .5), (2349, .3), (3136, .15))) * np.exp(-T(int(1.0 * sr)) * 4.5)
place(sfx, ch, TURN + .05, .35)
# sub drop on the flip
n = int(.7 * sr); place(sfx, np.sin(2 * np.pi * np.cumsum(np.linspace(90, 38, n)) / sr) * np.exp(-T(n) * 4), TURN, .7)
pop = lambda f: np.sin(2 * np.pi * np.linspace(f, f * 1.8, int(.12 * sr)) * T(int(.12 * sr))) * np.exp(-T(int(.12 * sr)) * 35)
place(sfx, pop(700), 4.6, .45)
for a in (.25, .55, .85): place(sfx, click(2200 + a * 1000), TURN + a, .35)
def whoosh(dur=.45):
    m = int(dur * sr); x = rng.standard_normal(m); o = np.zeros(m); s = m // 12
    for j in range(12): lo = 300 + j * 500; o[j * s:(j + 1) * s] = band(x[j * s:(j + 1) * s], lo, lo + 2500)
    return o * np.sin(np.pi * T(m) / dur) ** 2 * .6
place(sfx, whoosh(), END - .3, .8)
n = int(.5 * sr); place(sfx, np.sin(2 * np.pi * 55 * T(n)) * np.exp(-T(n) * 7), END, .6)
# music: band-limited + quiet under the hook (filtered "phone speaker" feel), full beat from the flip
subprocess.run(['python3', '-I', os.path.join(REPO, 'audio-kit/bg_music.py'), 'house', '191', str(DUR), f'{TMP}/music.wav'], check=True)
mus, msr = sf.read(f'{TMP}/music.wav'); mus = mus.mean(1) if mus.ndim > 1 else mus; mus = np.pad(mus, (0, max(0, N - len(mus))))[:N]
mus = mus / (np.abs(mus).max() + 1e-9)
cut = int(TURN * sr); pre = band(mus, 300, 2500)
mus = np.concatenate([pre[:cut] / (np.abs(pre[:cut]).max() + 1e-9) * .5, mus[cut:]])
gain = np.where(T(N) < TURN, .22, .42)
mix = sfx + mus * gain
fade = np.ones(N); m = int(.25 * sr); fade[-m:] = np.linspace(1, .3, m); mix *= fade
sf.write(f'{TMP}/mix.wav', (mix / np.abs(mix).max() * .95).astype(np.float32), sr)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', VID, '-i', f'{TMP}/mix.wav', '-filter_complex', '[1:a]loudnorm=I=-14:TP=-1.5,aresample=44100[a]',
                '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-profile:v', 'main', '-pix_fmt', 'yuv420p', '-crf', '21', '-r', '30',
                '-c:a', 'aac', '-ac', '2', '-b:a', '160k', '-movflags', '+faststart', '-shortest', OUT], check=True)
print('done', OUT)
