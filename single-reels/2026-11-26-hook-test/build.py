# Hook test audio + mux (instamake 26 Nov 2026).
# Ticks on each count + rising tension 0–3.5 s, whoosh on the turn (3.5) and end card (6.5), tap/ding on "Book",
# one af_heart 1.0 line on the turn, NEW track audio-kit/bg_music.py ambient 181 (logged in MUSIC-LOG.md).
# usage: python3 -I build.py <repo> <kokoro model dir> <video.mp4> <out.mp4>
import os, subprocess, sys
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
REPO, MODEL, VID, OUT = sys.argv[1:5]
DUR, TURN, END, sr = 8.5, 3.5, 6.5, 44100
N = int(DUR * sr); T = lambda n: np.arange(n) / sr; rng = np.random.default_rng(5)
TMP = '/tmp/hooktest'; os.makedirs(TMP, exist_ok=True)
def place(buf, x, at, g=1.0):
    i = int(at * sr); n = min(len(x), len(buf) - i)
    if n > 0: buf[i:i + n] += x[:n] * g
def band(x, lo, hi):
    X = np.fft.rfft(x); fr = np.fft.rfftfreq(len(x), 1 / sr); X[(fr < lo) | (fr > hi)] = 0; return np.fft.irfft(X, len(x))
sfx = np.zeros(N)
tick = lambda f=2400: np.sin(2 * np.pi * f * T(int(.05 * sr))) * np.exp(-T(int(.05 * sr)) * 90)
for i in range(int(TURN / 0.29)):  # clock ticks, louder on each count
    at = i * 0.29; place(sfx, tick(2600 if i % 2 else 2000), at, .35)
for at in (0.0, 1.167, 2.333): place(sfx, tick(1300), at, .9)
n = int(TURN * sr); t = T(n)  # riser
riser = band(rng.standard_normal(n), 500, 6000) * (t / TURN) ** 2.2 * .35 + np.sin(2 * np.pi * np.cumsum(np.linspace(110, 330, n)) / sr) * (t / TURN) ** 2 * .18
place(sfx, riser, 0)
def whoosh(dur=.5):
    m = int(dur * sr); x = rng.standard_normal(m); o = np.zeros(m); s = m // 12
    for j in range(12): lo = 300 + j * 500; o[j * s:(j + 1) * s] = band(x[j * s:(j + 1) * s], lo, lo + 2500)
    return o * np.sin(np.pi * T(m) / dur) ** 2 * .6
place(sfx, whoosh(), TURN - .25, 1); place(sfx, whoosh(), END - .25, .7)
pop = lambda f: np.sin(2 * np.pi * np.linspace(f, f * 1.8, int(.12 * sr)) * T(int(.12 * sr))) * np.exp(-T(int(.12 * sr)) * 35) * .6
ding = (np.sin(2 * np.pi * 1318 * T(int(.9 * sr))) + .5 * np.sin(2 * np.pi * 1976 * T(int(.9 * sr)))) * np.exp(-T(int(.9 * sr)) * 5) * .3
place(sfx, pop(1000), 4.6, .5); place(sfx, ding, 4.85, .8); place(sfx, pop(700), END + 0.8, .5)
# voice
k = Kokoro(MODEL + '/kokoro-v1.0.onnx', MODEL + '/voices-v1.0.bin')
v, vsr = k.create('Fast site. They stay.', voice='af_heart', speed=1.0, lang='en-gb')
v = np.interp(np.arange(int(len(v) * sr / vsr)) / sr, np.arange(len(v)) / vsr, v)
voice = np.zeros(N); place(voice, v / np.abs(v).max() * .9, TURN + 0.25)
print('voice ends', round(TURN + 0.25 + len(v) / sr, 2))
# music: quiet under the hook, full after the turn
subprocess.run(['python3', '-I', os.path.join(REPO, 'audio-kit/bg_music.py'), 'ambient', '181', str(DUR), f'{TMP}/music.wav'], check=True)
mus, msr = sf.read(f'{TMP}/music.wav'); mus = mus.mean(1) if mus.ndim > 1 else mus; mus = np.pad(mus, (0, max(0, N - len(mus))))[:N]
mus = mus / (np.abs(mus).max() + 1e-9)
gain = np.where(T(N) < TURN, .16, .25)
env = np.convolve(np.abs(voice), np.ones(4410) / 4410, 'same'); duck = 1 - np.clip(env * 5, 0, .5)
mix = voice + sfx + mus * gain * duck
fade = np.ones(N); m = int(.2 * sr); fade[-m:] = np.linspace(1, 0, m); mix *= fade
sf.write(f'{TMP}/mix.wav', (mix / np.abs(mix).max() * .95).astype(np.float32), sr)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', VID, '-i', f'{TMP}/mix.wav', '-filter_complex', '[1:a]loudnorm=I=-14:TP=-1.5,aresample=44100[a]',
                '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-profile:v', 'main', '-pix_fmt', 'yuv420p', '-crf', '21', '-r', '30',
                '-c:a', 'aac', '-ac', '2', '-b:a', '160k', '-movflags', '+faststart', '-shortest', OUT], check=True)
print('done', OUT)
