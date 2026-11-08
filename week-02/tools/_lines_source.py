import json,subprocess,os
L={
"reel20":("same-business-two-websites",[[0.2,"Same business. Two websites. Let's look at the first one."],[3.3,"This one was rushed. And this one? This one was planned."],[6.3,"So, which one would you trust with your business?"]]),
"reel21":("logo-bigger-fixed-scope",[[0.2,"Message number seven. Can you make the logo bigger?"],[2.7,"A bit bigger. Oh, and one small thing: a new page."],[5.9,"Logo? In scope, done. New page? New quote."],[9.3,"Fixed scope. Fixed price."]]),
"reel22":("idea-to-live-3-steps",[[0.3,"From idea to live."],[1.6,"Kickoff. We agree scope and price."],[4.6,"Build. Design, code, test."],[7.6,"Launch. Live, no surprises."]]),
"reel23":("app-before-name",[[0.2,"An app idea, with no name yet."],[2.7,"No problem. We start with the screens."],[5.0,"Screens first, code second."],[7.3,"You see it before we build it."]]),
"reel24":("small-change-tower",[[0.2,"It's just a small change."],[2.1,"Just this one block. Easy."],[4.2,"And down it goes."],[5.6,"Famous last words."],[7.9,"We change it, then we test the rest."]]),
"reel25":("same-page-different-phone",[[0.2,"It looks great on your laptop."],[2.4,"But on their phone?"],[3.6,"The button is cut off, and the text runs off the screen."],[7.3,"Same page. Fixed phone."]]),
"reel26":("website-cost-kuwait",[[0.2,"What does a website cost in Kuwait?"],[2.6,"Honest answer: it depends on the scope."],[5.6,"Pages, features, languages, payments."],[8.1,"Scope first, then one fixed price."]]),
"reel27":("checkout-3-taps",[[0.2,"Checkout. In three taps."],[2.0,"Tap one, add to cart."],[3.9,"Tap two, pay."],[5.7,"Tap three, and you're done."],[7.6,"Fewer taps, more orders."]]),
"reel28":("app-or-website-first",[[0.2,"App or website first?"],[1.6,"Need people to find you on Google? Start with a website."],[4.4,"Daily use and alerts? That's an app."],[8.0,"Not sure? Start with the website."]]),
"reel29":("arabic-first",[[0.2,"Arabic first, English second."],[2.0,"Flip the switch, and the whole layout flips right to left."],[5.2,"One site, both ways. Your customers read both."]]),
"reel30":("whatsapp-every-phone",[[0.2,"Does your WhatsApp button work?"],[2.3,"On every phone? Big ones, small ones, old ones?"],[6.0,"We tap it on each one, before launch."],[8.3,"One tap, every phone."]]),
"reel31":("3-questions-before-you-pay",[[0.2,"Three questions before you pay."],[1.8,"One: is the price fixed?"],[4.0,"Two: is the date in writing?"],[6.2,"Three: who fixes it after launch?"],[8.3,"Our answer? Yes. Three times."]])}
for r,(name,lines) in L.items():
    c=json.load(open(f'/home/claude/aud3/{r}.json')); c['lines']=lines; c['voices']=[["am_michael",1.0,0]]
    json.dump(c,open(f'/home/claude/aud3/{r}v3.json','w'))
    os.makedirs(f'/home/claude/aud3/{r}v3',exist_ok=True)
    p=subprocess.run(['python3','-I','../../audio-kit/make_audio.py','/home/claude/kokoro',f'/home/claude/aud3/{r}v3.json',f'/home/claude/aud3/{r}v3'],capture_output=True,text=True,cwd='/home/claude/bracket-content/week-02/_engine')
    ve=[l for l in p.stdout.splitlines() if 'voice ends' in l]
    print(r,ve,'end',c['end_card'],flush=True)
    subprocess.run(['ffmpeg','-v','error','-y','-i',f'/home/claude/aud3/{r}-silent.mp4','-i',f'/home/claude/aud3/{r}v3/audio-am_michael.wav','-filter_complex','[1:a]loudnorm=I=-14:TP=-1.5,aresample=44100[a]','-map','0:v','-map','[a]','-c:v','libx264','-profile:v','main','-level','4.1','-pix_fmt','yuv420p','-crf','20','-c:a','aac','-ac','2','-ar','44100','-b:a','192k','-movflags','+faststart','-shortest',f'/home/claude/bracket-content/week-02/new3/{r}-{name}.mp4'],check=True)
    # gap check: silences >0.6s inside voice-only track
    s=subprocess.run(['ffmpeg','-i',f'/home/claude/aud3/{r}v3/audio-am_michael-nomusic.wav','-af','silencedetect=n=-40dB:d=0.6','-f','null','-'],capture_output=True,text=True).stderr
    print('  gaps:',[l.split('silence_duration:')[1].strip()[:4] for l in s.splitlines() if 'silence_duration' in l])
