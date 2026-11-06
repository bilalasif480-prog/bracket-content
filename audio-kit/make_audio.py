import sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
import json
# usage: python3 -I make_audio.py <model_dir> <cue.json> <out_dir>
d=sys.argv[1]; cue=json.load(open(sys.argv[2])); out=sys.argv[3]
DUR=cue["duration"]; sr=44100; N=int(sr*DUR)
rng=np.random.default_rng(7); T=lambda n: np.arange(n)/sr
def place(buf,x,at,g=1.0):
    i=int(at*sr); n=min(len(x),len(buf)-i)
    if n>0: buf[i:i+n]+=x[:n]*g
# ---------- music: upbeat 122 bpm, original ----------
bpm=122; bt=60/bpm; mus=np.zeros(N); duck=np.ones(N)
kick=np.sin(2*np.pi*np.cumsum(np.linspace(150,48,int(.28*sr)))/sr)*np.exp(-T(int(.28*sr))*11)
clap=sum(rng.standard_normal(int(.18*sr))*np.exp(-T(int(.18*sr))*(30+6*j))*.0+0 for j in range(1))
c=rng.standard_normal(int(.2*sr)); 
from numpy.fft import rfft,irfft
def bandpass(x,lo,hi):
    X=rfft(x); f=np.fft.rfftfreq(len(x),1/sr); X[(f<lo)|(f>hi)]=0; return irfft(X,len(x))
clap=bandpass(c,900,4000)*np.exp(-T(len(c))*22)*1.2
hat=bandpass(rng.standard_normal(int(.06*sr)),6000,16000)*np.exp(-T(int(.06*sr))*70)*.6
prog=[(57,[57,60,64]),(53,[53,57,60]),(48,[48,52,55]),(55,[55,59,62])]  # Am F C G (midi)
hz=lambda m: 440*2**((m-69)/12)
def pluck(f,dur):
    n=int(dur*sr); t=T(n); x=np.sign(np.sin(2*np.pi*f*t))*.35+np.sin(2*np.pi*f*t)
    return bandpass(x,80,3500)*np.exp(-t*9)
def sub(f,dur):
    n=int(dur*sr); t=T(n); return np.sin(2*np.pi*f*t)*np.minimum(1,t/.01)*np.exp(-t*2.5)
END=cue["end_card"]  # end card drop
b=0.0; i=0
while b<DUR-0.5:
    bar=(i//4)%4; root,ch=prog[bar]
    intro = b<cue.get("music_drop",1.9)
    if not intro:
        place(mus,kick,b,1.0)
        k=int(b*sr); duck[k:k+int(.18*sr)]=np.minimum(duck[k:k+int(.18*sr)],np.linspace(.35,1,int(.18*sr)))
        if i%2==1: place(mus,clap,b,.55)
        place(mus,sub(hz(root-12),bt*.9),b,.55)
    place(mus,hat,b+bt/2,.35 if not intro else .2)
    for m in ch: place(mus,pluck(hz(m+12),bt*.45),b+bt/2,.12)
    if intro:
        for m in ch: place(mus,pluck(hz(m+12),bt*.45),b,.10)
    b+=bt; i+=1
mus*=duck
# ---------- sfx ----------
sfx=np.zeros(N)
def whoosh(dur=.45):
    n=int(dur*sr); x=rng.standard_normal(n); out=np.zeros(n); seg=n//12
    for j in range(12):
        lo=300+j*500; out[j*seg:(j+1)*seg]=bandpass(x[j*seg:(j+1)*seg],lo,lo+2500)
    return out*np.sin(np.pi*T(n)/dur)**2*.5
def pop(f=880):
    n=int(.12*sr); t=T(n); return np.sin(2*np.pi*np.linspace(f,f*1.8,n)*t)*np.exp(-t*35)*.6
def ding():
    n=int(.9*sr); t=T(n); return (np.sin(2*np.pi*1318*t)+.5*np.sin(2*np.pi*1976*t))*np.exp(-t*5)*.3
def impact():
    n=int(1.2*sr); t=T(n); return (np.sin(2*np.pi*np.cumsum(np.linspace(90,35,n))/sr)*np.exp(-t*3)+bandpass(rng.standard_normal(n),200,3000)*np.exp(-t*9)*.4)
place(sfx,pop(700),0.15,.7)
for at in cue.get("whoosh",[]): place(sfx,whoosh(),at-0.2,.8)
for at in cue.get("tap",[]): place(sfx,pop(1000),at,.45)
for at in cue.get("ding",[]): place(sfx,pop(1200),at-0.05,.7); place(sfx,ding(),at,.8)
place(sfx,whoosh(.6),END-0.45,.9); place(sfx,impact(),END,.9)
# riser before end card
n=int(1.0*sr); t=T(n); place(sfx,bandpass(rng.standard_normal(n),2000,9000)*(t/1.0)**2*.35,END-1.0)
# ---------- voices ----------
k=Kokoro(d+"/kokoro-v1.0.onnx", d+"/voices-v1.0.bin")
lines=[tuple(x) for x in cue["lines"]]
for v,spd in [tuple(x) for x in cue.get("voices",[["af_bella",1.1],["am_fenrir",1.08],["af_heart",1.1]])]:
    vo=np.zeros(N); end=0
    for at,txt in lines:
        a,r=k.create(txt,voice=v,speed=spd,lang="en-us")
        a=np.interp(np.arange(0,len(a),r/sr),np.arange(len(a)),a)
        s=max(int(at*sr),end); place(vo,a,s/sr); end=s+len(a)
    print(v,"voice ends",round(end/sr,2))
    vo=vo/np.abs(vo).max()*.9
    m=mus/np.abs(mus).max()*.9; x=sfx/np.abs(sfx).max()*.9
    # music ducks under voice
    env=np.convolve(np.abs(vo),np.ones(2205)/2205,'same'); dv=1-np.clip(env*6,0,.55)
    fade=np.ones(N); fl=int(1.5*sr); fade[-fl:]=np.linspace(1,0,fl)
    mix=vo*1.0+m*.30*dv*fade+x*.38
    sf.write(f"{out}/audio-{v}.wav",(mix/np.abs(mix).max()*.95).astype(np.float32),sr)
    nm=vo*1.0+x*.38  # voice + sfx, no music: use this under an Instagram trending sound
    sf.write(f"{out}/audio-{v}-nomusic.wav",(nm/np.abs(nm).max()*.95).astype(np.float32),sr)
