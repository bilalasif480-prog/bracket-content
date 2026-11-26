import json,sys
from kokoro_onnx import Kokoro
k=Kokoro('/tmp/claude-0/kokoro/kokoro-v1.0.onnx','/tmp/claude-0/kokoro/voices-v1.0.bin')
for p in sys.argv[1:]:
  c=json.load(open(p)); last=0
  for at,l in c['lines']:
    v,sr=k.create(l,voice='af_heart',speed=1.0,lang='en-us'); at=max(at,last+.12); last=at+len(v)/sr
    print(f'{p[5:16]} {at:5.2f}-{last:5.2f} {l}')
  print('  END', round(last,2), 'OK' if last<=c['dur']-.3 else 'TOO LONG')
