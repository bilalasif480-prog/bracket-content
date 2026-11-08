# usage: mix_voice.py reelNN voice.wav out.mp4   (needs aud3/reelNN-silent.mp4 and tools/lines.json)
import sys,json,subprocess,numpy as np,soundfile as sf
r,vf,out=sys.argv[1:4]; cues=[c[0] for c in json.load(open('/home/claude/bracket-content/week-02/tools/lines.json'))[r]]
sil=f'/home/claude/aud3/{r}-silent.mp4'
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',sil]))
subprocess.run(['ffmpeg','-v','error','-y','-i',vf,'-ac','1','-ar','44100','/tmp/_in.wav'],check=True)
y,sr=sf.read('/tmp/_in.wav'); H=256
rms=np.array([np.sqrt(np.mean(y[i:i+1024]**2)+1e-12) for i in range(0,len(y)-1024,H)])
act=20*np.log10(rms/rms.max())>-38
iv=[];st=None
for k,a in enumerate(act):
    if a and st is None: st=k*H
    if not a and st is not None: iv.append((st,k*H+1024)); st=None
if st is not None: iv.append((st,len(y)))
# merge pauses shorter than 0.45s => one line each
segs=[]
for a,b in iv:
    if segs and (a-segs[-1][1])/sr<0.45: segs[-1][1]=b
    else: segs.append([a,b])
print(r,'found',len(segs),'lines, expected',len(cues))
mix=np.zeros(int(dur*sr)+sr*5); cur=0
for i,(a,b) in enumerate(segs):
    start=max(cues[min(i,len(cues)-1)]-0.0,cur) if i<len(cues) else cur+0.3
    seg=y[max(0,a-int(.03*sr)):b+int(.05*sr)]; s=int(start*sr); mix[s:s+len(seg)]+=seg; cur=start+len(seg)/sr+0.15
    print(f'  line{i+1} {start:.2f}-{cur-.15:.2f}s')
mix=mix[:int(dur*sr)]; sf.write('/tmp/_v.wav',mix,sr)
subprocess.run(['python3','-I','/home/claude/bracket-content/week-02/tools/bed.py','/tmp/_bed.wav',str(dur)],check=True)
subprocess.run(['ffmpeg','-v','error','-y','-i','/tmp/_v.wav','-i','/tmp/_bed.wav','-filter_complex',f'[0:a]highpass=f=70,loudnorm=I=-16:TP=-1.5,aresample=44100,apad=whole_dur={dur},asplit=2[vo][sc];[1:a]volume=0.16[b];[b][sc]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=400[d];[vo][d]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.9[a]','-map','[a]','/tmp/_mix.wav'],check=True)
subprocess.run(['ffmpeg','-v','error','-y','-i',sil,'-i','/tmp/_mix.wav','-map','0:v','-map','1:a','-c:v','libx264','-profile:v','main','-level','4.1','-pix_fmt','yuv420p','-crf','20','-c:a','aac','-ac','2','-ar','44100','-b:a','192k','-movflags','+faststart','-t',str(dur),out],check=True)
