# week-03 build: voice (af_heart 1.0, no pitch) + SFX via audio-kit/make_audio.py (-nomusic stem),
# its own original track via audio-kit/bg_music.py, PM mix (music ~0.22, ducked under voice), then mux.
# usage: python3 -I build.py <repo> <kokoro model dir> <final out dir> [reel ids...]
import json, os, subprocess, sys
REPO, MODEL, FINAL = sys.argv[1], sys.argv[2], sys.argv[3]
ONLY = sys.argv[4:]
ENG = os.path.join(REPO, 'week-03/_engine'); OUT = os.path.join(ENG, 'out'); TMP = '/tmp/w03audio'
MIX = '/home/claude/scr/mix.py'

# base reels: video, duration, end card, scene changes, dings, taps, voice lines (line 1 = hook)
BASE = {
 'day1': dict(video='/tmp/hisaab-out/hisaab.mp4', dur=29.5, end=26.8, whoosh=[3.6, 8.4, 13.2, 17.4, 23.2],
   tap=[4.35, 4.65, 4.95, 9.0, 20.95], ding=[6.6, 23.9, 24.65, 25.4],
   lines=[[0.2, "You think... I have Instagram. Why do I need a website?"], [3.8, "Your customer searches for you. Nothing comes up."],
          [8.6, "So they message you, and wait until tomorrow."], [13.4, "By then, they've bought from someone else."],
          [17.6, "For example, four lost orders a month at fifteen dinars. That's three hundred sixty in six months."]]),
 'day2': dict(video='day2-geo.mp4', dur=26.8, end=23.8, whoosh=[3.6, 8.6, 13.6, 19.0], tap=[4.2, 4.6, 5.0], ding=[9.5, 9.9, 10.4, 19.8, 20.5],
   lines=[[0.2, "Your customers stopped asking Google. They ask ChatGPT."], [3.9, "They type: best clinic in Salmiya?"],
          [8.8, "The answer names other clinics. Not you."], [13.8, "AI picks businesses it can read and trust."],
          [19.2, "That's GEO. We help AI answers find you."]]),
 'day3': dict(video='day3-rented.mp4', dur=25.0, end=22.0, whoosh=[3.8, 9.0, 13.0, 18.0], tap=[13.8, 14.1], ding=[15.2, 15.7, 16.2],
   lines=[[0.2, "You decorated the shop. But Instagram owns the building."], [4.0, "What if the account is gone one day?"],
          [9.2, "Your posts, your followers, your messages. Gone overnight."], [13.2, "On your own website, it all stays yours."],
          [18.2, "Keep Instagram. Just add a home you own."]]),
 'day4': dict(video='day4-night.mp4', dur=29.0, end=26.0, whoosh=[3.6, 8.4, 13.4, 19.2], tap=[4.1, 9.4, 10.6, 19.8, 20.6], ding=[17.0, 21.6],
   lines=[[0.2, "What does your WhatsApp do at eleven at night?"], [3.8, "A customer wants to book. You're asleep."],
          [8.6, "You reply in the morning. They already booked somewhere else."],
          [13.6, "For example, three late enquiries a week at twenty dinars. Two hundred forty a month."],
          [19.4, "An AI agent answers, books, and hands over to you when needed."]]),
 'day5': dict(video='day5-seo.mp4', dur=28.0, end=25.0, whoosh=[3.6, 8.4, 13.2, 19.0], tap=[4.0, 4.3, 4.6], ding=[16.8, 19.8, 20.5, 21.3],
   lines=[[0.2, "You're on Google. On page three."], [3.8, "Your customer searches for what you do, near them."],
          [8.6, "Almost nobody scrolls to page three. So they call someone else."],
          [13.4, "For example, two more customers a week at fifteen dinars. Fifteen hundred sixty a year."],
          [19.4, "SEO fixes the basics, so you show up where they look."]]),
 'day6': dict(video='day6-app.mp4', dur=28.0, end=25.0, whoosh=[3.6, 8.4, 13.2, 19.0], tap=[21.4], ding=[16.8, 21.6, 22.0, 22.4],
   lines=[[0.2, "You think apps are only for big companies."], [3.8, "But the same customers come back every week."],
          [8.6, "Until one week they forget, and try next door."],
          [13.4, "For example, ten skipped visits a month at eight dinars. Nine hundred sixty a year."],
          [19.4, "A simple app reminds them, and lets them book again."]]),
 'day7': dict(video='day7-missed.mp4', dur=28.0, end=25.0, whoosh=[3.6, 8.4, 13.2, 19.0], tap=[19.6, 20.8], ding=[10.0, 16.8, 21.6],
   lines=[[0.2, "Missed call. Lost patient."], [3.8, "You're busy, and the phone keeps ringing."], [8.6, "So they call the next one."],
          [13.4, "For example, three lost bookings a week at twenty five dinars. Three hundred a month."],
          [19.4, "An AI agent texts them back on WhatsApp, and books them."]]),
}
# reel id -> (base, new hook line or None, music style, seed, extra line overrides)
REELS = {
 'day1-main':   ('day1', None, 'house', 41), 'day1-trialA': ('day1', "Your customer searched your name. Nothing came up.", 'pluck', 43),
 'day1-trialB': ('day1', "They asked the price on DM. You answered the next day.", 'ambient', 47),
 'day2-main':   ('day2', None, 'lofi', 53), 'day2-trialA': ('day2', "Ask ChatGPT for a clinic in Salmiya. Are you in the answer?", 'piano', 59),
 'day2-trialB': ('day2', "Ask ChatGPT for a salon in Hawalli. Are you in the answer?", 'oud', 61,
                 {1: "They type: best salon in Hawalli?", 2: "The answer names other salons. Not you."}),
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
    if rid == 'day2-trialB': return os.path.join(OUT, 'day2-trialB.mp4')
    hook = os.path.join(OUT, rid + '-hook.mp4')
    mainv = base['video'] if base['video'].startswith('/') else os.path.join(OUT, base['video'])
    out = os.path.join(TMP, rid + '-video.mp4')
    run(['ffmpeg', '-y', '-loglevel', 'error', '-i', hook, '-i', mainv, '-filter_complex',
         '[0:v]setpts=PTS-STARTPTS[a];[1:v]trim=start_frame=108,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1[v]',
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
    cue = dict(duration=base['dur'], music_drop=3.6, end_card=base['end'], whoosh=base['whoosh'], tap=base['tap'], ding=base['ding'],
               lines=lines, voices=[['af_heart', 1.0]])
    json.dump(cue, open(f'{d}/cue.json', 'w'))
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
