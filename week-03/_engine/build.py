# week-03 build: voice (af_heart 1.0, no pitch) + SFX via audio-kit/make_audio.py (-nomusic stem),
# its own original track via audio-kit/bg_music.py, PM mix (music ~0.22, ducked under voice), then mux.
# usage: python3 -I build.py <repo> <kokoro model dir> <final out dir> [reel ids...]
import json, os, subprocess, sys
REPO, MODEL, FINAL = sys.argv[1], sys.argv[2], sys.argv[3]
ONLY = sys.argv[4:]
ENG = os.path.join(REPO, 'week-03/_engine'); OUT = os.path.join(ENG, 'out'); TMP = '/tmp/w03short'
MIX = '/home/claude/scr/mix.py'

# base reels: video, duration, end card, scene changes, dings, taps, voice lines (line 1 = hook)
# closing CTA line over the end card (Bilal 22 Nov 13:11), end card ~2.2 s
# SHORT cut (T-20261122-06 revision, Bilal "too long"): 12–15 s. hook 0–2.5 · proof 2.5–6.8 · payoff · end card ~2.2 s + closing CTA
BASE = {
 'day1': dict(video='day1-short.mp4', dur=14.95, end=12.4, whoosh=[2.5, 6.8], tap=[3.2, 3.5, 3.8], ding=[5.2, 8.8],
   lines=[[0.2, "I have Instagram. Why a website?"], [2.7, "Your customer searches. Nothing comes up."],
          [7.0, "For example, four lost orders at fifteen dinars. Sixty a month."],
          [12.2, "We'll build it for you. Comment start."]]),
 'day2': dict(video='day2-short.mp4', dur=13.75, end=11.2, whoosh=[2.5, 6.8], tap=[0.7], ding=[4.6, 7.5, 8.2],
   lines=[[0.2, "Customers stopped Googling. They ask ChatGPT."], [2.7, "And the answer names other clinics. Not you."],
          [7.0, "That's GEO. We help AI answers find you."],
          [11.0, "We'll get you found. Comment start."]]),
 'day3': dict(video='day3-short.mp4', dur=13.15, end=10.6, whoosh=[2.5, 6.8], tap=[3.5], ding=[7.8],
   lines=[[0.2, "You decorated the shop. But Instagram is the landlord."], [3.0, "What if the account is gone one day?"],
          [6.9, "Keep Instagram. Add a website you own."],
          [10.4, "We'll build it for you. Comment start."]]),
 'day4': dict(video='day4-short.mp4', dur=14.95, end=12.4, whoosh=[2.5, 6.8], tap=[3.4, 4.4], ding=[8.8],
   lines=[[0.2, "What does your WhatsApp do at eleven at night?"], [2.9, "You reply in the morning. They already booked elsewhere."],
          [7.0, "For example, three late messages at twenty dinars. Sixty a week."],
          [12.2, "We'll set it up for you. Comment start."]]),
 'day5': dict(video='day5-short.mp4', dur=14.95, end=12.4, whoosh=[2.5, 6.8], tap=[], ding=[8.8],
   lines=[[0.2, "You're on Google. On page three."], [2.6, "Almost nobody scrolls that far. They call someone else."],
          [7.0, "For example, two more customers at fifteen dinars. Thirty a week."],
          [12.2, "We'll get you found. Comment start."]]),
 'day6': dict(video='day6-short.mp4', dur=14.95, end=12.4, whoosh=[2.5, 6.8], tap=[], ding=[8.8],
   lines=[[0.2, "You think apps are only for big companies."], [2.7, "Then one week, your regulars forget. And try next door."],
          [7.0, "For example, ten skipped visits at eight dinars. Eighty a month."],
          [12.2, "We'll build your app. Comment start."]]),
 'day7': dict(video='day7-short.mp4', dur=14.95, end=12.4, whoosh=[2.5, 6.8], tap=[], ding=[3.9, 8.8],
   lines=[[0.2, "Missed call. Lost patient."], [2.4, "You're busy. So they call the next one."],
          [7.0, "Example: three lost bookings at twenty five dinars. Seventy five a week."],
          [12.2, "We'll set it up for you. Comment start."]]),
}
# reel id -> (base, new hook line or None, music style, seed, extra line overrides)
REELS = {
 'day1-main':   ('day1', None, 'house', 41), 'day1-trialA': ('day1', "Your customer searched your name. Nothing came up.", 'pluck', 43),
 'day1-trialB': ('day1', "They asked the price on DM. You answered the next day.", 'ambient', 47),
 'day2-main':   ('day2', None, 'lofi', 53), 'day2-trialA': ('day2', "Ask ChatGPT for a clinic in Salmiya. Are you in the answer?", 'piano', 59),
 'day2-trialB': ('day2', "Ask ChatGPT for a salon in Hawalli. Are you in the answer?", 'oud', 61,
                 {1: "And the answer names other salons. Not you."}),
 'day3-main':   ('day3', None, 'ambient', 73),
 'day3-trialA': ('day4', "One a.m. A customer wants to book. Who answers?", 'house', 67),
 'day3-trialB': ('day4', "Still answering WhatsApp after closing?", 'pluck', 71),
 'day4-main':   ('day4', None, 'lofi', 79),
 'day4-trialA': ('day6', "I'm small. An app can wait.", 'piano', 83),
 'day4-trialB': ('day6', "Same customers every week. Still no app?", 'oud', 89),
 'day5-main':   ('day5', None, 'house', 97), 'day5-trialA': ('day5', "Clinic owners: patients search before they call.", 'pluck', 101),
 'day5-trialB': ('day5', "Search near me. Who shows up?", 'ambient', 103),
 'day6-main':   ('day6', None, 'lofi', 107), 'day6-trialA': ('day6', "Gym owners: same members every week. Still no app?", 'piano', 109),
 'day6-trialB': ('day6', "Salon owners: same clients every week. Still no app?", 'oud', 113),
 'day7-main':   ('day7', None, 'house', 127), 'day7-trialA': ('day7', "Missed call. Lost job.", 'pluck', 131),
 'day7-trialB': ('day7', "Missed call. Lost booking.", 'ambient', 137),
}
NAMES = {  # final file names
 'day1-main': 'day1-main-hisaab01-website', 'day2-main': 'day2-main-geo-chatgpt', 'day3-main': 'day3-main-rented-shop',
 'day4-main': 'day4-main-hisaab02-ai-agent-night', 'day5-main': 'day5-main-hisaab03-seo-page3',
 'day6-main': 'day6-main-hisaab04-app', 'day7-main': 'day7-main-hisaab05-missed-call',
}
def run(cmd): subprocess.run(cmd, check=True)

def video_for(rid, b):
    base = BASE[b]
    if rid.endswith('main'):
        v = base['video']; return v if v.startswith('/') else os.path.join(OUT, v)
    if rid == 'day2-trialB': return os.path.join(OUT, 'day2-trialB-short.mp4')
    hook = os.path.join(OUT, rid + '-hook-short.mp4')
    mainv = base['video'] if base['video'].startswith('/') else os.path.join(OUT, base['video'])
    out = os.path.join(TMP, rid + '-video.mp4')
    run(['ffmpeg', '-y', '-loglevel', 'error', '-i', hook, '-i', mainv, '-filter_complex',
         '[0:v]setpts=PTS-STARTPTS[a];[1:v]trim=start_frame=75,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1[v]',
         '-map', '[v]', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', out])
    return out

os.makedirs(TMP, exist_ok=True); os.makedirs(FINAL, exist_ok=True)
log = []
for rid, spec in REELS.items():
    if ONLY and rid not in ONLY: continue
    b, hook, style, seed = spec[:4]; over = spec[4] if len(spec) > 4 else {}
    base = BASE[b]; lines = [list(x) for x in base['lines']]
    if hook: lines[0][1] = hook
    for i, txt in over.items(): lines[i][1] = txt
    d = os.path.join(TMP, rid); os.makedirs(d, exist_ok=True)
    cue = dict(duration=base['dur'], music_drop=2.5, end_card=base['end'], whoosh=base['whoosh'], tap=base['tap'], ding=base['ding'],
               lines=lines, voices=[['af_heart', 1.0]])
    json.dump(cue, open(f'{d}/cue.json', 'w'))
    if os.environ.get('MUXONLY') and os.path.exists(f'{d}/mix.wav'): vend = 'same'  # video-only change: reuse the mixed audio
    else:
        r = subprocess.run(['python3', '-I', os.path.join(REPO, 'audio-kit/make_audio.py'), MODEL, f'{d}/cue.json', d], capture_output=True, text=True, check=True)
        vend = r.stdout.strip().split()[-1]
        run(['python3', '-I', os.path.join(REPO, 'audio-kit/bg_music.py'), style, str(seed), str(base['dur']), f'{d}/music.wav'])
        run(['python3', '-I', MIX, f'{d}/audio-af_heart-nomusic.wav', f'{d}/music.wav', f'{d}/mix.wav'])
    vid = video_for(rid, b)
    name = NAMES.get(rid, rid)
    out = os.path.join(FINAL, name + '.mp4')
    run(['ffmpeg', '-y', '-loglevel', 'error', '-i', vid, '-i', f'{d}/mix.wav', '-filter_complex', '[1:a]loudnorm=I=-14:TP=-1.5,aresample=44100[a]',
         '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-profile:v', 'main', '-level', '4.1', '-pix_fmt', 'yuv420p', '-crf', '23', '-r', '30',
         '-c:a', 'aac', '-ac', '2', '-ar', '44100', '-b:a', '160k', '-movflags', '+faststart', '-shortest', out])
    sz = os.path.getsize(out) / 1e6
    msg = f'{rid}\t{name}.mp4\t{base["dur"]}s\tvoice ends {vend}s (end card {base["end"]})\t{style} {seed}\t{sz:.1f} MB'
    print(msg, flush=True); log.append(msg)
open(os.path.join(TMP, 'build-log.txt'), 'a').write('\n'.join(log) + '\n')
