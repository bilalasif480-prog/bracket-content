# Original background music for reels — a different track every reel.
# usage: python3 -I bg_music.py <style|auto> <seed> <duration_s> <out.wav>
# styles: lofi, ambient, piano, house, oud, pluck. "auto" picks a style from the seed.
# Every track is generated here (no samples, no copyright). Log each style+seed used in
# audio-kit/MUSIC-LOG.md so no two reels share the same track.
import sys, numpy as np, soundfile as sf
from numpy.fft import rfft, irfft

style, seed, DUR, out = sys.argv[1], int(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
STYLES = ["lofi", "ambient", "piano", "house", "oud", "pluck"]
rng = np.random.default_rng(seed)
if style == "auto":
    style = STYLES[seed % len(STYLES)]
sr = 44100; N = int(sr * DUR); T = lambda n: np.arange(n) / sr
hz = lambda m: 440 * 2 ** ((m - 69) / 12)

def place(buf, x, at, g=1.0):
    i = int(at * sr)
    if i >= len(buf) or i < 0: return
    n = min(len(x), len(buf) - i); buf[i:i + n] += x[:n] * g

def band(x, lo, hi):
    X = rfft(x); f = np.fft.rfftfreq(len(x), 1 / sr); X[(f < lo) | (f > hi)] = 0; return irfft(X, len(x))

def reverb(x, size=1.6, mix=.25):
    n = int(size * sr); ir = rng.standard_normal(n) * np.exp(-T(n) * 4 / size)
    ir = band(ir, 200, 9000); ir /= np.abs(ir).sum() ** .5 * 20
    wet = irfft(rfft(x, len(x) + n) * rfft(ir, len(x) + n))[:len(x)]
    wet = wet / (np.abs(wet).max() + 1e-9) * np.abs(x).max()
    return x * (1 - mix) + wet * mix

def env(n, a=.01, d=3.0):
    t = T(n); return np.minimum(1, t / a) * np.exp(-t * d)

def tone(f, dur, kind="sine", a=.01, d=3.0, det=0):
    n = int(dur * sr); t = T(n); ph = 2 * np.pi * f * t
    if kind == "sine": x = np.sin(ph) + .2 * np.sin(2 * ph)
    elif kind == "keys": x = np.sin(ph) + .35 * np.sin(2 * ph) * np.exp(-t * 6) + .1 * np.sin(3 * ph)
    elif kind == "pad":
        x = sum(np.sin(2 * np.pi * f * (1 + dd) * t + rng.random() * 6) for dd in (-.004, 0, .004, .002))
    elif kind == "pluck":
        x = np.sin(ph) + .5 * np.sin(2 * ph) * np.exp(-t * 12) + .25 * np.sin(3 * ph) * np.exp(-t * 20)
    elif kind == "oud":
        x = sum(np.sin(k * ph) * np.exp(-t * (4 + 5 * k)) / k for k in range(1, 7))
    else: x = np.sin(ph)
    return x * env(n, a, d)

def kick(g=1.0):
    n = int(.3 * sr); return np.sin(2 * np.pi * np.cumsum(np.linspace(120, 45, n)) / sr) * np.exp(-T(n) * 10) * g
def hat(): n = int(.05 * sr); return band(rng.standard_normal(n), 7000, 15000) * np.exp(-T(n) * 80) * .4
def snare(soft=True):
    n = int(.2 * sr); x = band(rng.standard_normal(n), 800, 5000) * np.exp(-T(n) * (25 if soft else 18))
    return x * (.45 if soft else .7)
def tak():  # darbuka-ish
    n = int(.12 * sr); return (band(rng.standard_normal(n), 1500, 6000) * .5 + np.sin(2 * np.pi * 380 * T(n))) * np.exp(-T(n) * 30) * .5
def dum():
    n = int(.25 * sr); return np.sin(2 * np.pi * np.cumsum(np.linspace(110, 70, n)) / sr) * np.exp(-T(n) * 9) * .8

# random key + progression per seed
key = int(rng.integers(-4, 4))
progs = [[(57, "m"), (53, ""), (48, ""), (55, "")],   # Am F C G
         [(50, "m"), (55, ""), (48, ""), (57, "m")],  # Dm G C Am
         [(48, "maj7"), (57, "m7"), (53, "maj7"), (55, "")],
         [(52, "m7"), (57, "m7"), (50, "m7"), (55, "maj7")]]
prog = progs[int(rng.integers(len(progs)))]
def chord(root, q):
    iv = {"m": [0, 3, 7], "": [0, 4, 7], "maj7": [0, 4, 7, 11], "m7": [0, 3, 7, 10]}[q]
    return [root + key + i for i in iv]

mus = np.zeros(N); drums = np.zeros(N)
bpm = {"lofi": rng.integers(74, 86), "ambient": 70, "piano": rng.integers(78, 92),
       "house": rng.integers(116, 124), "oud": rng.integers(88, 100), "pluck": rng.integers(100, 112)}[style]
bt = 60 / bpm; bar = 4 * bt
nb = int(DUR / bar) + 1
for b in range(nb):
    t0 = b * bar; root, q = prog[b % 4]; ch = chord(root, q)
    if style == "lofi":
        for m in ch: place(mus, tone(hz(m), bar, "keys", .02, 1.2), t0, .12)
        place(mus, tone(hz(ch[0] - 12), bar, "sine", .02, 1.0), t0, .25)
        for s in range(4):
            if s in (0, 2): place(drums, kick(.8), t0 + s * bt + (0.03 if s == 2 else 0))
            if s in (1, 3): place(drums, snare(), t0 + s * bt)
            place(drums, hat(), t0 + s * bt + bt / 2 + rng.random() * .02, .7)
    elif style == "ambient":
        for m in ch + [ch[0] + 12]: place(mus, tone(hz(m), bar * 1.3, "pad", 1.2, .5), t0, .06)
        for s in range(4):
            if rng.random() < .5: place(mus, tone(hz(ch[s % len(ch)] + 24), 1.5, "sine", .005, 3), t0 + s * bt, .07)
    elif style == "piano":
        place(mus, tone(hz(ch[0] - 12), bar, "keys", .005, .8), t0, .22)
        for s in range(8):
            m = ch[(s * 2 + b) % len(ch)] + 12
            place(mus, tone(hz(m), bt, "keys", .004, 3.5), t0 + s * bt / 2, .11)
    elif style == "house":
        for m in ch: place(mus, tone(hz(m + 12), bt * .4, "pad", .01, 6), t0 + bt / 2, .05)
        for m in ch: place(mus, tone(hz(m + 12), bt * .4, "pad", .01, 6), t0 + 2.5 * bt, .05)
        for s in range(4):
            place(drums, kick(.9), t0 + s * bt)
            place(drums, hat(), t0 + s * bt + bt / 2, 1.0)
            if s in (1, 3): place(drums, snare(), t0 + s * bt, .8)
            place(mus, tone(hz(ch[0] - 12), bt * .45, "sine", .005, 6), t0 + s * bt + bt / 2, .3)
    elif style == "oud":  # hijaz-flavoured, original
        scale = [0, 1, 4, 5, 7, 8, 10, 12]; base = 50 + key
        place(mus, tone(hz(base - 12), bar, "pad", .5, .6), t0, .08)
        for s in range(8):
            if rng.random() < .75:
                m = base + scale[int(rng.integers(len(scale)))]
                place(mus, tone(hz(m), bt, "oud", .003, 2), t0 + s * bt / 2, .14)
        for s, (fn, off) in enumerate([(dum, 0), (tak, 1), (tak, 1.5), (dum, 2), (tak, 3)]):
            place(drums, fn(), t0 + off * bt, .7)
    elif style == "pluck":
        for s in range(8):
            m = ch[(s + b) % len(ch)] + 12 + (12 if s % 4 == 3 else 0)
            place(mus, tone(hz(m), bt, "pluck", .003, 6), t0 + s * bt / 2, .12)
        place(mus, tone(hz(ch[0] - 12), bar, "sine", .02, 1.2), t0, .22)
        for s in range(4):
            place(drums, kick(.6), t0 + s * bt) if s % 2 == 0 else place(drums, snare(), t0 + s * bt, .7)
            place(drums, hat(), t0 + s * bt + bt / 2, .5)

mus = reverb(band(mus, 40, 12000), 2.0 if style in ("ambient", "piano") else 1.2, .3)
if style == "lofi":  # warm + vinyl crackle
    mus = band(mus, 40, 5000)
    crack = np.zeros(N); idx = rng.integers(0, N, int(DUR * 25)); crack[idx] = rng.standard_normal(len(idx)) * .3
    mus += band(crack, 1000, 8000) * .2
mix = mus / (np.abs(mus).max() + 1e-9) * .8 + (drums / (np.abs(drums).max() + 1e-9) * .5 if np.abs(drums).max() > 0 else 0)
fi, fo = int(.8 * sr), int(1.5 * sr)
mix[:fi] *= np.linspace(0, 1, fi); mix[-fo:] *= np.linspace(1, 0, fo)
mix = mix / np.abs(mix).max() * .9
sf.write(out, mix.astype(np.float32), sr)
print(style, "seed", seed, "bpm", int(bpm), "key", key)
