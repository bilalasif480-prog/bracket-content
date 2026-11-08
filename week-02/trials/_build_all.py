import json,subprocess,os,sys
os.chdir('/home/claude/bracket-content/week-02/_engine')
H=json.load(open('../trials/_hooks.json'))
base={'thumb':'audio-one-thumb.json','arabic':'audio-reel13.json','inapp':'audio-reel14.json'}
env0=dict(os.environ,PW_CHROMIUM=subprocess.check_output("ls -d /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell|head -1",shell=True,text=True).strip())
os.makedirs('/home/claude/aud2',exist_ok=True); os.makedirs('../trials/v2',exist_ok=True)
for k,v in H.items():
    for s in 'QPCU':
        name=f'{k}-{s}'
        if os.path.exists(f'../trials/v2/{name}.mp4'): continue
        hk=v[s]
        if k=='app':
            cue={"duration":14.0,"music_drop":1.9,"end_card":10.45,"whoosh":[1.8,3.35,5.85],"tap":[2.4,2.7,3.0],"ding":[8.0],
                 "lines":[[0.25,hk[3]],[3.45,"We build it, screen by screen."],[5.9,"Then we try to break it,"],[7.7,"so your customers never can."]],"voices":[["am_fenrir",0.95,-1.5]]}
        else:
            cue=json.load(open(base[k])); cue['lines'][0][1]=hk[3]
        json.dump(cue,open(f'/home/claude/aud2/{name}.json','w'))
        env=dict(env0,HOOK=json.dumps(list(hk[:3]),ensure_ascii=False))
        subprocess.run(['node','render.js','tv_'+k],env=env,check=True)
        os.rename(f'out/tv_{k}.mp4',f'/home/claude/aud2/{name}-silent.mp4')
        os.makedirs(f'/home/claude/aud2/{name}',exist_ok=True)
        r=subprocess.run(['python3','-I','../../audio-kit/make_audio.py','/home/claude/kokoro',f'/home/claude/aud2/{name}.json',f'/home/claude/aud2/{name}'],capture_output=True,text=True)
        print(name,[l for l in r.stdout.splitlines() if 'voice ends' in l],r.stderr[-200:] if r.returncode else '',flush=True)
        subprocess.run(['ffmpeg','-v','error','-y','-i',f'/home/claude/aud2/{name}-silent.mp4','-i',f'/home/claude/aud2/{name}/audio-am_fenrir-1.5.wav','-filter_complex','[1:a]loudnorm=I=-14:TP=-1.5,aresample=44100[a]','-map','0:v','-map','[a]','-c:v','libx264','-profile:v','main','-level','4.1','-pix_fmt','yuv420p','-crf','20','-c:a','aac','-ac','2','-ar','44100','-b:a','192k','-movflags','+faststart','-shortest',f'../trials/v2/{name}.mp4'],check=True)
print('DONE',flush=True)
