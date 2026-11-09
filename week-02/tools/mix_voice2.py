# usage: mix_voice2.py reelNN voice.wav out.mp4 END
# Keeps the natural speed of the voice and retimes the VIDEO so each line lands on its visual beat.
import sys,json,subprocess,numpy as np,soundfile as sf
r,vf,out,END=sys.argv[1],sys.argv[2],sys.argv[3],float(sys.argv[4])
lines=json.load(open('/home/claude/bracket-content/week-02/tools/lines.json'))[r]; cues=[l[0] for l in lines]; N=len(lines)
sil=f'/home/claude/aud3/{r}-silent.mp4'
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',sil]))
subprocess.run(['ffmpeg','-v','error','-y','-i',vf,'-ac','1','-ar','44100','/tmp/_in.wav'],check=True)
y,sr=sf.read('/tmp/_in.wav'); H=256
rms=np.array([np.sqrt(np.mean(y[i:i+1024]**2)+1e-12) for i in range(0,len(y)-1024,H)])
act=20*np.log10(rms/rms.max())>-38
iv=[];st=None
for k,a in enumerate(act):
    if a and st is None: st=k*H
    if not a and st is not None: iv.append([st,k*H+1024]); st=None
if st is not None: iv.append([st,len(y)])
# gaps between voiced intervals
def merge(th):
    s=[list(iv[0])]
    for a,b in iv[1:]:
        if (a-s[-1][1])/sr<th: s[-1][1]=b
        else: s.append([a,b])
    return s
segs=merge(0.45)
if len(segs)!=N:
    # pick N-1 gaps closest to cumulative character proportions
    tot=sum(len(l[1]) for l in lines); span0,span1=iv[0][0],iv[-1][1]
    gaps=[((iv[i][1]+iv[i+1][0])/2,i) for i in range(len(iv)-1)]
    cut=[];acc=0
    for l in lines[:-1]:
        acc+=len(l[1]); tgt=span0+(span1-span0)*acc/tot
        g=min(gaps,key=lambda g:abs(g[0]-tgt)+ (1e9 if g[1] in [c[1] for c in cut] else 0)); cut.append(g)
    idx=sorted(c[1] for c in cut); segs=[];s=iv[0][0]
    for i in idx: segs.append([s,iv[i][1]]); s=iv[i+1][0]
    segs.append([s,iv[-1][1]])
assert len(segs)==N,(len(segs),N)
lead=segs[0][0]/sr; s0=0.2
nat=[(a/sr-lead+s0) for a,b in segs]; ln=[(b-a)/sr+0.08 for a,b in segs]
A=[nat[0]]; shift=0
for i in range(1,N):
    dv=cues[i]-cues[i-1]; ai=nat[i]+shift
    if (ai-A[-1])/dv<0.85: d=A[-1]+0.85*dv-ai; shift+=d; ai+=d
    A.append(ai)
Eaud=A[-1]+ln[-1]
Tend=max(Eaud+0.4, A[-1]+0.85*(END-cues[-1]))
anch=[(0,0)]+[(cues[i],A[i]) for i in range(N)]+[(END,Tend)]
anch[1]=(cues[0],A[0])
D2=Tend+(dur-END)
mix=np.zeros(int(D2*sr)+sr)
for i,(a,b) in enumerate(segs):
    seg=y[max(0,a-int(.04*sr)):b+int(.06*sr)]; p=int((A[i]-.04)*sr); mix[p:p+len(seg)]+=seg
mix=mix[:int(D2*sr)]; sf.write('/tmp/_v.wav',mix,sr)
subprocess.run(['python3','-I','/home/claude/bracket-content/week-02/tools/bed.py','/tmp/_bed.wav',f'{D2:.2f}'],check=True)
# video: write time-warp anchors; the reel is re-rendered with warped time (smooth slow-motion)
json.dump({'anch':anch,'dur':dur,'END':END,'D2':D2},open(f'/tmp/anch_{r}.json','w'))
subprocess.run(['ffmpeg','-v','error','-y','-i','/tmp/_v.wav','-i','/tmp/_bed.wav','-filter_complex',f'[0:a]highpass=f=70,loudnorm=I=-16:TP=-1.5,aresample=44100,apad=whole_dur={D2:.2f},asplit=2[vo][sc];[1:a]volume=0.16[b];[b][sc]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=400[d];[vo][d]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.9[a]','-map','[a]','/tmp/_mix.wav'],check=True)
import shutil; shutil.copy('/tmp/_mix.wav',f'/tmp/mix_{r}.wav')
print(r,'lines',N,'new length %.1fs'%D2,'speed factors',[round((anch[i+1][1]-anch[i][1])/(anch[i+1][0]-anch[i][0]),2) for i in range(1,len(anch)-1)])
