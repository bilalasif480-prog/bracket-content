# Hook test D audio + mux (instamake 26 Nov 2026).
# One calm British line, Kokoro bf_emma speed 1.0, no pitch shift, at 0.3 s (ends before the 7.8 s end card; never says "Bracket").
# Pen scratch under the notepad (0-2.4), swipe whoosh on each step (2.6, 4.4, 6.0), key clicks while typing (2.6-3.6),
# swatch click (3.78), message pops (4.75, 5.4), tap + ding on "Book a table" (6.6, 6.95), whoosh + pop on the end card (7.8).
# Music: NEW track audio-kit/bg_music.py piano 197 (logged in MUSIC-LOG.md).
# usage: python3 -I build.py <repo> <kokoro model dir> <video.mp4> <out.mp4>
import os, subprocess, sys
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
REPO, MODEL, VID, OUT = sys.argv[1:5]
DUR, END, sr = 9.4, 7.8, 44100
LINE, VOICE, VAT = 'I build your website by hand, step by step, with you.', 'bf_emma', 0.3
N = int(DUR * sr); T = lambda n: np.arange(n) / sr; rng = np.random.default_rng(29)
TMP = '/tmp/hooktest-d'; os.makedirs(TMP, exist_ok=True)
def place(buf, x, at, g=1.0):
    i = int(at * sr)
    if i < 0: x = x[-i:]; i = 0
    n = min(len(x), len(buf) - i)
    if n > 0: buf[i:i + n] += x[:n] * g
def band(x, lo, hi):
    X = np.fft.rfft(x); fr = np.fft.rfftfreq(len(x), 1 / sr); X[(fr < lo) | (fr > hi)] = 0; return np.fft.irfft(X, len(x))
sfx = np.zeros(N)
def pop(f, d=.11):
    n = int(d * sr); t = T(n)
    return np.sin(2 * np.pi * np.cumsum(np.linspace(f * 1.9, f, n)) / sr) * np.exp(-t * 32) + band(rng.standard_normal(n), 1500, 7000) * np.exp(-t * 300) * .4
def key():
    n = int(.025 * sr); return band(rng.standard_normal(n), 2500, 9000) * np.exp(-T(n) * 300)
def whoosh(dur=.4):
    m = int(dur * sr); x = rng.standard_normal(m); o = np.zeros(m); s = m // 12
    for j in range(12): lo = 300 + j * 500; o[j * s:(j + 1) * s] = band(x[j * s:(j + 1) * s], lo, lo + 2500)
    return o * np.sin(np.pi * T(m) / dur) ** 2 * .6
# pen scratch: soft band noise with stroke gating
n = int(2.4 * sr); x = band(rng.standard_normal(n), 2500, 8000); g = (np.sin(2 * np.pi * 7 * T(n)) > -.3) * .5 + .2
place(sfx, x * g * .08, 0)
for a in (2.6, 4.4, 6.0): place(sfx, whoosh(), a - .12, .5)
for a in np.arange(2.62, 3.6, .065): place(sfx, key(), a + rng.uniform(-.01, .01), .35)
place(sfx, key(), 3.78, .9); place(sfx, pop(880, .08), 3.8, .3)
place(sfx, pop(660), 4.75, .45); place(sfx, pop(990), 5.4, .45)
tap = band(rng.standard_normal(int(.03 * sr)), 1500, 6000) * np.exp(-T(int(.03 * sr)) * 200)
place(sfx, tap, 6.6, .8)
ding = (np.sin(2 * np.pi * 1318 * T(int(.9 * sr))) + .5 * np.sin(2 * np.pi * 1976 * T(int(.9 * sr)))) * np.exp(-T(int(.9 * sr)) * 5) * .4
place(sfx, ding, 6.95, .8)
place(sfx, whoosh(.45), END - .3, .7); place(sfx, pop(392, .16), END + .05, .5); place(sfx, pop(659), END + .35, .35)
# voice
k = Kokoro(MODEL + '/kokoro-v1.0.onnx', MODEL + '/voices-v1.0.bin')
v, vsr = k.create(LINE, voice=VOICE, speed=1.0, lang='en-gb')
v = np.interp(np.arange(int(len(v) * sr / vsr)) / sr, np.arange(len(v)) / vsr, v)
voice = np.zeros(N); place(voice, v / np.abs(v).max() * .9, VAT)
print('voice ends', round(VAT + len(v) / sr, 2), '(end card at', END, ')')
# music
subprocess.run(['python3', '-I', os.path.join(REPO, 'audio-kit/bg_music.py'), 'piano', '197', str(DUR), f'{TMP}/music.wav'], check=True)
mus, msr = sf.read(f'{TMP}/music.wav'); mus = mus.mean(1) if mus.ndim > 1 else mus; mus = np.pad(mus, (0, max(0, N - len(mus))))[:N]
mus = mus / (np.abs(mus).max() + 1e-9)
env = np.convolve(np.abs(voice), np.ones(4410) / 4410, 'same'); duck = 1 - np.clip(env * 5, 0, .5)
mix = voice + sfx * .8 + mus * .3 * duck
fade = np.ones(N); m = int(.25 * sr); fade[-m:] = np.linspace(1, .3, m); mix *= fade
sf.write(f'{TMP}/mix.wav', (mix / np.abs(mix).max() * .95).astype(np.float32), sr)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', VID, '-i', f'{TMP}/mix.wav', '-filter_complex', '[1:a]loudnorm=I=-14:TP=-1.5,aresample=44100[a]',
                '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-profile:v', 'main', '-pix_fmt', 'yuv420p', '-crf', '21', '-r', '30',
                '-c:a', 'aac', '-ac', '2', '-b:a', '160k', '-movflags', '+faststart', '-shortest', OUT], check=True)
print('done', OUT)
