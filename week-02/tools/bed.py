# soft original background bed (Am-F-C-G pad + plucks). usage: bed.py out.wav seconds
import sys, numpy as np, soundfile as sf
out, D = sys.argv[1], float(sys.argv[2]); sr = 44100; n = int(sr*D); t = np.arange(n)/sr
def note(f,t0,dur,amp,kind='pluck'):
    m=(t>=t0)&(t<t0+dur); tt=t[m]-t0
    e=np.exp(-tt*4.0)*np.minimum(tt/0.01,1) if kind=='pluck' else np.minimum(tt/0.6,1)*np.minimum((dur-tt)/0.8,1)
    w=np.sin(2*np.pi*f*tt)+0.3*np.sin(2*np.pi*2*f*tt)*np.exp(-tt*3)+(0.5*np.sin(2*np.pi*f*1.004*tt) if kind!='pluck' else 0)
    y=np.zeros(n); y[m]=w*e*amp; return y
ch=[(220.0,[220,261.63,329.63]),(174.61,[174.61,220,261.63]),(261.63,[261.63,329.63,392]),(196.0,[196,246.94,293.66])]
x=np.zeros(n); bar=2.4; i=0; t0=0
while t0<D:
    root,notes=ch[i%4]
    for f in notes: x+=note(f/2,t0,bar+0.4,0.10,'pad')
    for k,f in enumerate(notes+notes[:1]): x+=note(f*2,t0+k*0.6,1.2,0.12)
    x+=note(root/2,t0,0.8,0.18); t0+=bar; i+=1
x=np.convolve(x,np.ones(6)/6,'same')*np.minimum(t/1.0,1)*np.minimum((D-t)/1.5,1)
sf.write(out,x/np.abs(x).max()*0.9,sr)
