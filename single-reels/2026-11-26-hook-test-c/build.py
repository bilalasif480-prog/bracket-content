# Hook test C audio + mux (instamake 26 Nov 2026).
# One casual British line, Kokoro bf_emma speed 1.0, no pitch shift, at 3.9 s (ends before the 7.0 s end card; never says "Bracket").
# Pop SFX per block (laptop + phone), tap + ding on "Book now" (5.2), whoosh + pop on the end card (7.0).
# Music: NEW track audio-kit/bg_music.py pluck 193 (logged in MUSIC-LOG.md).
# usage: python3 -I build.py <repo> <kokoro model dir> <video.mp4> <out.mp4>
import os, subprocess, sys
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
REPO, MODEL, VID, OUT = sys.argv[1:5]
DUR, TAP, END, sr = 8.5, 5.2, 7.0, 44100
POPS = [-0.25, -0.12, 1.0, 1.55, 1.95, 2.35, 2.9, 3.5]  # same as reel.js
LINE, VOICE, VAT = 'Seven seconds. Your website could be next.', 'bf_emma', 3.9
N = int(DUR * sr); T = lambda n: np.arange(n) / sr; rng = np.random.default_rng(23)
TMP = '/tmp/hooktest-c'; os.makedirs(TMP, exist_ok=True)
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
notes = [523, 587, 659, 784, 880, 988, 1047, 1175]  # rising pops as the site fills
for i, a in enumerate(POPS):
    place(sfx, pop(notes[i]), a + .02, .5); place(sfx, pop(notes[i] * 1.5, .07), a + .1, .22)  # phone copy lands a beat later
tap = band(rng.standard_normal(int(.03 * sr)), 1500, 6000) * np.exp(-T(int(.03 * sr)) * 200)
place(sfx, tap, TAP, .8)
ding = (np.sin(2 * np.pi * 1318 * T(int(.9 * sr))) + .5 * np.sin(2 * np.pi * 1976 * T(int(.9 * sr)))) * np.exp(-T(int(.9 * sr)) * 5) * .4
place(sfx, ding, TAP + .25, .8)
def whoosh(dur=.45):
    m = int(dur * sr); x = rng.standard_normal(m); o = np.zeros(m); s = m // 12
    for j in range(12): lo = 300 + j * 500; o[j * s:(j + 1) * s] = band(x[j * s:(j + 1) * s], lo, lo + 2500)
    return o * np.sin(np.pi * T(m) / dur) ** 2 * .6
place(sfx, whoosh(), END - .3, .7); place(sfx, pop(392, .16), END + .05, .5); place(sfx, pop(659), END + .35, .35)
# voice
k = Kokoro(MODEL + '/kokoro-v1.0.onnx', MODEL + '/voices-v1.0.bin')
v, vsr = k.create(LINE, voice=VOICE, speed=1.0, lang='en-gb')
v = np.interp(np.arange(int(len(v) * sr / vsr)) / sr, np.arange(len(v)) / vsr, v)
voice = np.zeros(N); place(voice, v / np.abs(v).max() * .9, VAT)
print('voice ends', round(VAT + len(v) / sr, 2), '(end card at', END, ')')
# music
subprocess.run(['python3', '-I', os.path.join(REPO, 'audio-kit/bg_music.py'), 'pluck', '193', str(DUR), f'{TMP}/music.wav'], check=True)
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
