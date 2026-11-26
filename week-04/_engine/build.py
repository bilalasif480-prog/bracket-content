# week-04 audio + mux (instamake, 26 Nov 2026). One cue file per reel: cues/<reel>.json
# {"dur":14,"end":12.2,"music":["house",211],"lines":[[0.2,"text"],...],"whoosh":[..],"tap":[..],"ding":[..],"pop":[..],"buzz":[..],"error":[..],"typing":[[a,b],..],"tick":[[a,b],..]}
# Voice: Kokoro af_heart, speed 1.0, no pitch shift (Bilal 22/26 Nov). Never says "Bracket". New original music per reel (audio-kit/bg_music.py), ducked under the voice.
# A line that would overlap the one before is pushed back; the script fails if the voice ends later than dur-0.3 s.
# usage: python3 -I build.py <repo> <kokoro model dir> <cue.json> <video.mp4> <out.mp4>
import json, os, subprocess, sys
import numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
REPO, MODEL, CUE, VID, OUT = sys.argv[1:6]
c = json.load(open(CUE)); DUR, END, sr = c['dur'], c['end'], 44100
N = int(DUR * sr); T = lambda n: np.arange(n) / sr; rng = np.random.default_rng(int(c['music'][1]))
TMP = '/tmp/claude-0/w04-' + os.path.basename(CUE)[:-5]; os.makedirs(TMP, exist_ok=True)
def place(buf, x, at, g=1.0):
    i = int(at * sr)
    if i < 0: x = x[-i:]; i = 0
    n = min(len(x), len(buf) - i)
    if n > 0: buf[i:i + n] += x[:n] * g
def band(x, lo, hi):
    X = np.fft.rfft(x); fr = np.fft.rfftfreq(len(x), 1 / sr); X[(fr < lo) | (fr > hi)] = 0; return np.fft.irfft(X, len(x))
def pop(f, d=.11):
    n = int(d * sr); t = T(n)
    return np.sin(2 * np.pi * np.cumsum(np.linspace(f * 1.9, f, n)) / sr) * np.exp(-t * 32) + band(rng.standard_normal(n), 1500, 7000) * np.exp(-t * 300) * .4
def key():
    n = int(.025 * sr); return band(rng.standard_normal(n), 2500, 9000) * np.exp(-T(n) * 300)
def whoosh(dur=.4):
    m = int(dur * sr); x = rng.standard_normal(m); o = np.zeros(m); s = m // 12
    for j in range(12): lo = 300 + j * 500; o[j * s:(j + 1) * s] = band(x[j * s:(j + 1) * s], lo, lo + 2500)
    return o * np.sin(np.pi * T(m) / dur) ** 2 * .6
def tap():
    n = int(.03 * sr); return band(rng.standard_normal(n), 1500, 6000) * np.exp(-T(n) * 200)
def ding():
    n = int(.9 * sr); return (np.sin(2 * np.pi * 1318 * T(n)) + .5 * np.sin(2 * np.pi * 1976 * T(n))) * np.exp(-T(n) * 5) * .4
def buzz():
    n = int(.35 * sr); return np.sign(np.sin(2 * np.pi * 150 * T(n))) * (np.sin(2 * np.pi * 14 * T(n)) > 0) * .12
def err():
    n = int(.32 * sr); t = T(n); return (np.sin(2 * np.pi * 220 * t) + np.sin(2 * np.pi * 233 * t)) * np.exp(-t * 6) * .3
def tk():
    n = int(.02 * sr); return band(rng.standard_normal(n), 3000, 9000) * np.exp(-T(n) * 400)
sfx = np.zeros(N)
for a in c.get('whoosh', []): place(sfx, whoosh(), a - .12, .5)
for a in c.get('tap', []): place(sfx, tap(), a, .8)
for a in c.get('ding', []): place(sfx, ding(), a, .8)
for a in c.get('pop', []): place(sfx, pop(660 + 220 * rng.random()), a, .45)
for a in c.get('buzz', []): place(sfx, buzz(), a, .7)
for a in c.get('error', []): place(sfx, err(), a, .7)
for a, b in c.get('typing', []):
    for x in np.arange(a, b, .07): place(sfx, key(), x + rng.uniform(-.01, .01), .35)
for a, b in c.get('tick', []):
    for x in np.arange(a, b, .5): place(sfx, tk(), x, .5)
place(sfx, whoosh(.45), END - .3, .7); place(sfx, pop(392, .16), END + .05, .5); place(sfx, pop(659), END + .3, .35)
# voice
k = Kokoro(MODEL + '/kokoro-v1.0.onnx', MODEL + '/voices-v1.0.bin')
voice = np.zeros(N); last = 0
for at, line in c['lines']:
    v, vsr = k.create(line, voice='af_heart', speed=1.0, lang='en-us')
    v = np.interp(np.arange(int(len(v) * sr / vsr)) / sr, np.arange(len(v)) / vsr, v)
    nz = np.where(np.abs(v) > .01)[0]; v = v[max(0, nz[0] - 400):nz[-1] + 1200]  # trim silence
    at = max(at, last + .12)
    place(voice, v / np.abs(v).max() * .9, at); last = at + len(v) / sr
    print(f'  {at:5.2f}-{last:5.2f}  {line}')
print('voice ends', round(last, 2), '(dur', DUR, ')')
assert last <= DUR - .3, 'voice runs past the end'
# music
subprocess.run(['python3', '-I', os.path.join(REPO, 'audio-kit/bg_music.py'), c['music'][0], str(c['music'][1]), str(DUR), f'{TMP}/music.wav'], check=True)
mus, msr = sf.read(f'{TMP}/music.wav'); mus = mus.mean(1) if mus.ndim > 1 else mus; mus = np.pad(mus, (0, max(0, N - len(mus))))[:N]
mus = mus / (np.abs(mus).max() + 1e-9)
env = np.convolve(np.abs(voice), np.ones(4410) / 4410, 'same'); duck = 1 - np.clip(env * 5, 0, .55)
mix = voice + sfx * .8 + mus * .32 * duck
fade = np.ones(N); m = int(.25 * sr); fade[-m:] = np.linspace(1, .3, m); mix *= fade
sf.write(f'{TMP}/mix.wav', (mix / np.abs(mix).max() * .95).astype(np.float32), sr)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', VID, '-i', f'{TMP}/mix.wav', '-filter_complex', '[1:a]loudnorm=I=-14:TP=-1.5,aresample=44100[a]',
                '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-profile:v', 'main', '-level', '4.1', '-pix_fmt', 'yuv420p', '-crf', '21', '-r', '30',
                '-c:a', 'aac', '-ac', '2', '-b:a', '160k', '-movflags', '+faststart', '-shortest', OUT], check=True)
print('done', OUT)
