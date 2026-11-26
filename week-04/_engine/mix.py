# usage: python3 mix.py <cfg.json> <out.wav>   (voice af_heart 1.0, music ducked ~0.22, SFX)
# cfg: {dur, music:[style,seed], lines:[[at,text]], sfx:{name:[times]}}
import sys, json, subprocess, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
cfg = json.load(open(sys.argv[1])); OUT = sys.argv[2]
sr = 44100; DUR = cfg['dur']; N = int(sr * DUR)
T = lambda n: np.arange(n) / sr
rng = np.random.default_rng(7)
def place(buf, x, at, g=1.0):
    i = int(at * sr); n = min(len(x), len(buf) - i)
    if n > 0 and i >= 0: buf[i:i + n] += x[:n] * g
def bp(x, lo, hi):
    X = np.fft.rfft(x); fr = np.fft.rfftfreq(len(x), 1 / sr); X[(fr < lo) | (fr > hi)] = 0; return np.fft.irfft(X, len(x))
def ping():
    n = int(.3 * sr); t = T(n); a = np.sin(2 * np.pi * 1568 * t) * np.exp(-t * 16)
    b = np.zeros(n); m = int(.08 * sr); b[m:] = np.sin(2 * np.pi * 2093 * t[:n - m]) * np.exp(-t[:n - m] * 14)
    return (a + b) * .35
def buzz():
    n = int(.25 * sr); t = T(n); return np.sign(np.sin(2 * np.pi * 150 * t)) * np.exp(-t * 6) * .18
def pop(f=900):
    n = int(.1 * sr); t = T(n); return np.sin(2 * np.pi * np.linspace(f, f * 1.7, n) * t) * np.exp(-t * 38) * .5
def tap():
    n = int(.05 * sr); return bp(rng.standard_normal(n), 1500, 6000) * np.exp(-T(n) * 90) * .9
def ding():
    n = int(.9 * sr); t = T(n); return (np.sin(2 * np.pi * 1318 * t) + .5 * np.sin(2 * np.pi * 1976 * t)) * np.exp(-t * 5) * .35
def whoosh(d=.4):
    n = int(d * sr); return bp(rng.standard_normal(n), 400, 5000) * np.sin(np.pi * T(n) / d) ** 2 * .45
def thud():
    n = int(.6 * sr); t = T(n); return np.sin(2 * np.pi * np.cumsum(np.linspace(110, 40, n)) / sr) * np.exp(-t * 6) * .8
def powerdown():
    n = int(.8 * sr); t = T(n); return np.sin(2 * np.pi * np.cumsum(np.linspace(600, 60, n)) / sr) * np.exp(-t * 3) * .4
def boing():
    n = int(.5 * sr); t = T(n); return np.sin(2 * np.pi * np.cumsum(180 + 120 * np.sin(t * 40) * np.exp(-t * 4)) / sr) * np.exp(-t * 5) * .5
def sad():  # sad trombone-ish wah wah
    out = np.zeros(int(1.6 * sr))
    for i, f0 in enumerate([311, 294, 277, 262]):
        n = int((.32 if i < 3 else .6) * sr); t = T(n)
        fr = f0 * (1 + (0.02 * np.sin(t * 30) if i == 3 else 0))
        w = np.sin(2 * np.pi * np.cumsum(np.ones(n) * fr) / sr)
        w = np.tanh(w * 2) * np.minimum(1, t * 30) * np.exp(-t * 2)
        place(out, w * .25, i * .36)
    return out
def scratch():
    n = int(.35 * sr); return bp(rng.standard_normal(n), 300, 3000) * np.sin(np.linspace(0, 6 * np.pi, n)) ** 2 * .5
def glitch():
    n = int(.3 * sr); t = T(n); return np.sign(np.sin(2 * np.pi * 90 * t * (1 + 5 * t))) * .2 * (rng.random(n) > .3)
FX = dict(ping=ping, buzz=buzz, pop=pop, tap=tap, ding=ding, whoosh=whoosh, thud=thud, powerdown=powerdown, boing=boing, sad=sad, scratch=scratch, glitch=glitch)
sfx = np.zeros(N)
for name, times in cfg.get('sfx', {}).items():
    for at in times: place(sfx, FX[name](), at, cfg.get('gain', {}).get(name, .8))
k = Kokoro("/home/claude/kmodel/kokoro-v1.0.onnx", "/home/claude/kmodel/voices-v1.0.bin")
vo = np.zeros(N); end = 0; info = []
for at, txt in cfg['lines']:
    a, r = k.create(txt, voice="af_heart", speed=1.0, lang="en-gb" if cfg.get('gb') else "en-us")
    a = np.interp(np.arange(0, len(a), r / sr), np.arange(len(a)), a)
    nz = np.where(np.abs(a) > .01)[0]; a = a[max(0, nz[0] - 200): nz[-1] + 2000]  # trim silence
    s = max(int(at * sr), end + int(.12 * sr)); place(vo, a, s / sr); end = s + len(a)
    info.append((round(s / sr, 2), round(end / sr, 2), txt))
for i in info: print(i)
print('VOICE_END', round(end / sr, 2), 'DUR', DUR)
vo = vo / np.abs(vo).max() * .9
subprocess.run(['python3', '-I', '/home/claude/bracket-content/audio-kit/bg_music.py', cfg['music'][0], str(cfg['music'][1]), str(DUR), '/tmp/m_'+OUT.split('/')[-1]], check=True, capture_output=True)
m, msr = sf.read('/tmp/m_'+OUT.split('/')[-1]); m = m.mean(1) if m.ndim > 1 else m
m = np.interp(np.arange(N) * msr / sr, np.arange(len(m)), m) if msr != sr else np.pad(m, (0, max(0, N - len(m))))[:N]
m = m / np.abs(m).max() * .9
env = np.convolve(np.abs(vo), np.ones(2205) / 2205, 'same'); dv = 1 - np.clip(env * 6, 0, .55)
x = sfx / (np.abs(sfx).max() + 1e-9) * .9
mix = vo + m * .22 * dv + x * .35
fade = np.ones(N); fn = int(.25 * sr); fade[-fn:] = np.linspace(1, 0, fn)
sf.write(OUT, (mix / np.abs(mix).max() * .95 * fade).astype(np.float32), sr)
json.dump({'lines': info, 'end': end / sr}, open(OUT + '.json', 'w'))
