# week-03 EXTRA build (instamake T-20261123-10): render video (extra.js via week-03/_engine/render.js),
# voice af_heart 1.0 + SFX (audio-kit/make_audio.py, -nomusic stem), a NEW original track (audio-kit/bg_music.py),
# mix (/home/claude/scr/mix.py: music ~0.22 ducked under voice), mux to week-03/extra/<id>.mp4.
# usage: python3 -I build_extra.py <repo> <kokoro model dir> [ids...]
import json, os, subprocess, sys
REPO, MODEL = sys.argv[1], sys.argv[2]; ONLY = sys.argv[3:]
ENG = os.path.join(REPO, 'week-03/_engine'); HERE = os.path.join(REPO, 'week-03/extra/_engine')
FINAL = os.path.join(REPO, 'week-03/extra'); TMP = '/tmp/w03extra'
MIX = os.environ.get('MIX', '/home/claude/scr/mix.py')
DUR, END = 14.95, 12.4
L = json.load(open(os.path.join(HERE, 'lines.json')))
SFX = {  # whoosh at scene changes, taps, dings (seconds)
 'offer-main': dict(tap=[4.7], ding=[5.1, 8.7]), 'trial-01': dict(tap=[], ding=[7.4, 8.0, 8.6]),
 'trial-02': dict(tap=[], ding=[3.5, 4.0, 4.5]), 'trial-03': dict(tap=[4.7], ding=[5.3, 8.7]),
 'trial-04': dict(tap=[], ding=[4.7, 5.05, 5.4]), 'trial-05': dict(tap=[], ding=[7.4]),
 'trial-06': dict(tap=[], ding=[3.0, 3.6, 4.2, 4.8]),
}
def run(cmd, **kw): return subprocess.run(cmd, check=True, **kw)
os.makedirs(TMP, exist_ok=True)
env = dict(os.environ)
for rid, (style, seed, lines) in L.items():
    if ONLY and rid not in ONLY: continue
    d = os.path.join(TMP, rid); os.makedirs(d, exist_ok=True)
    if not os.environ.get('AUDIOONLY'):
        run(['node', 'render.js', '../extra/_engine/extra'], cwd=ENG, env={**env, 'X': rid, 'OUTNAME': 'extra-' + rid}, capture_output=True)
    cue = dict(duration=DUR, music_drop=2.5, end_card=END, whoosh=[2.5, 6.8], tap=SFX[rid]['tap'], ding=SFX[rid]['ding'],
               lines=[[0.2, lines[0]], [2.7, lines[1]], [7.0, lines[2]], [12.2, lines[3]]], voices=[['af_heart', 1.0]])
    json.dump(cue, open(f'{d}/cue.json', 'w'))
    r = run(['python3', '-I', os.path.join(REPO, 'audio-kit/make_audio.py'), MODEL, f'{d}/cue.json', d], capture_output=True, text=True)
    vend = r.stdout.strip().split()[-1]
    run(['python3', '-I', os.path.join(REPO, 'audio-kit/bg_music.py'), style, str(seed), str(DUR), f'{d}/music.wav'])
    run(['python3', '-I', MIX, f'{d}/audio-af_heart-nomusic.wav', f'{d}/music.wav', f'{d}/mix.wav'])
    out = os.path.join(FINAL, rid + '.mp4')
    run(['ffmpeg', '-y', '-loglevel', 'error', '-i', os.path.join(ENG, 'out', 'extra-' + rid + '.mp4'), '-i', f'{d}/mix.wav',
         '-filter_complex', '[1:a]loudnorm=I=-14:TP=-1.5,aresample=44100[a]', '-map', '0:v', '-map', '[a]',
         '-c:v', 'libx264', '-profile:v', 'main', '-level', '4.1', '-pix_fmt', 'yuv420p', '-crf', '23', '-r', '30',
         '-c:a', 'aac', '-ac', '2', '-ar', '44100', '-b:a', '160k', '-movflags', '+faststart', '-shortest', out])
    print(f'{rid}.mp4\t{DUR}s\tvoice ends {vend}s\t{style} {seed}\t{os.path.getsize(out)/1e6:.1f} MB', flush=True)
