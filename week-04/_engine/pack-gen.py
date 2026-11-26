import json
TAGS = "#ManchesterBusiness #ManchesterSmallBusiness #UKSmallBusiness"
R = [
 dict(n=1, slug='01-slow-shop-site', day='Tuesday 1 December 2026', d='1 December 2026', time='14:30', svc='Websites', setting='Clothes shop', problem='Slow / weak website (sheet: No or weak website)', hook='#1 About to break (stress)', frame0='Customer already tapping her foot at a site stuck on "Loading... 2%"; the shop owner waves hopefully.',
  joke='She waits so long her hair grows to the floor and a cobweb forms; she taps BACK and sprints off; the owner dives after her, face-plants, and a pigeon walks over him. The site finishes loading to nobody ("Loaded! (nobody here)").',
  fix='A fast DEMO shop page loads at once, she zooms back in and orders in one tap.', price='Websites from £655', music=('piano', 9211),
  q='How long does your website take to load on your phone?',
  body="When a shop page takes too long on a phone, people tap back and buy somewhere else. A fast page shows your products straight away.\n\nWebsites from £655, built for phones first. Comment START and I'll tell you what yours needs.",
  tags='#ShopOwner #SmallBusinessWebsite', alt='Cartoon: a customer waits so long for a clothes shop website to load that her hair grows to the floor; she leaves, the owner face-plants, then a fast demo site lets her order in one tap.', cover='Still loading...'),
 dict(n=2, slug='02-ai-answer-curry', day='Tuesday 1 December 2026', d='1 December 2026', time='22:00', svc='GEO', setting='Curry house (split screen: customer on sofa / owner in his kitchen)', problem='"How do you get ChatGPT to recommend your business?" (sheet top 5 #3)', hook='#5 Split-screen reaction', frame0='Top: customer asks an AI assistant "Best curry near Rusholme?". Bottom: the chef already waving, hoping.',
  joke='The AI lists four other places; the chef climbs on a table shouting "US!! US!!", then falls backwards into his own curry pot (only his legs kick out).',
  fix='GEO ticks (menu, opening hours, address + area) and the DEMO answer now includes "Your Curry House"; the chef pops out of the pot and the customer walks in.', price='GEO from £215/month', music=('lofi', 9212),
  q='Have you ever asked ChatGPT about your own restaurant?',
  body="More people ask AI tools where to eat. If they can't read clear details about your restaurant, they name someone else.\n\nGEO from £215/month. Comment START and I'll check what AI tools can see about you.",
  tags='#ChatGPT #RestaurantOwner', alt='Cartoon split screen: a customer asks an AI for the best curry nearby while the restaurant owner waves to be picked, falls into a curry pot, then appears in the demo AI answer.', cover='Is AI ignoring you?'),
 dict(n=3, slug='03-website-first', day='Wednesday 2 December 2026', d='2 December 2026', time='14:30', svc='Websites (founding offer)', setting='Plumber in a bathroom', problem='"Do I need a website for my small business?" + cost worry (sheet top 5 #4)', hook='#4 Expectation vs reality', frame0='"Expectation: a big bill upfront." The plumber walks in with his toolbox as a giant invoice falls on him.',
  joke='SPLAT: the invoice flattens him; his mate peels him up; a second "EXTRA CHANGES" invoice drops, he jumps it, a pipe bursts in his face, he slips and lands in the bath with his legs kicking.',
  fix='"Reality:" a preview-link panel ticks Built on a preview link, 2 rounds of changes, Pay only when you\'re happy.', price='Your website first. You pay only when you\'re happy. (First 5 clients · websites from £655)', music=('pluck', 9213),
  q='What stops you getting a website right now?',
  body="For my first 5 website clients: the scope is agreed in writing, the full site is built on a preview link, you get 2 rounds of changes, and you pay only when you're happy. Your domain is in your name from day one.\n\nWebsites from £655. Comment START to ask for a founding place.",
  tags='#PlumberUK #SmallBusinessWebsite', alt='Cartoon: a plumber is flattened by a giant upfront invoice and ends up in the bath, then a preview-link panel shows the website is built first and paid for only when he is happy.', cover='Website first. Pay when happy.'),
 dict(n=4, slug='04-night-bookings', day='Wednesday 2 December 2026', d='2 December 2026', time='22:00', svc='AI agents', setting='Café owner\'s bedroom at night (approved test reel 1, re-cut)', problem='"AI receptionist for small business" (sheet top 5 #2)', hook='#1 About to break (stress)', frame0='The café owner is mid-flop onto his bed, still in his apron.',
  joke='A pigeon drops a "table for 4??" note, customers drop onto the bed, a woman knocks at the window, a rider skids in, the cat lands on him and the bed collapses: CRASH.',
  fix='A robot AI agent runs in and books tables in the DEMO chat while he sleeps; the pigeon leaves with "✓ booked".', price='AI agents from £875 setup + £109/month', music=('pluck', 9201),
  q='How many booking messages are waiting for you every morning?',
  body="Customers ask for tables late at night. An AI agent can answer, book the table and pass tricky questions to you, while you sleep.\n\nAI agents from £875 setup + £109/month. Comment START and I'll show you how it would work for your café.",
  tags='#CafeOwner #AIAgents', alt='Cartoon: a café owner trying to sleep is buried by customers wanting tables until the bed collapses, then a robot AI agent books the tables in a demo chat while he sleeps.', cover='Bookings at midnight?'),
 dict(n=5, slug='05-gym-10-seconds', day='Thursday 3 December 2026', d='3 December 2026', time='14:30', svc='Websites', setting='Gym', problem='"Best booking system for a small business UK" (sheet: booking)', hook='#3 Challenge question', frame0='"Can she book a class in 10 seconds?" with a timer already counting down from 10 while she taps.',
  joke='A cookie banner turns into a giant cookie that bonks her, she karate-chops a newsletter pop-up, trips on a 14-page PDF timetable, time runs out and she collapses; the owner drops his dumbbell on his foot.',
  fix='A clean DEMO gym page: Spin 6pm → Book → Booked ✓ in 3 taps.', price='Websites from £655', music=('house', 9214),
  q='How many taps does it take to book on your website?',
  body="Pop-ups, a PDF timetable and \"call us 9 to 5\". Members give up long before they book. On a proper site it's three taps.\n\nGym and studio websites with class booking built in, from £655. Comment START and I'll test yours.",
  tags='#GymOwner #SmallBusinessWebsite', alt='Cartoon: a gym member races a 10-second timer through cookie banners, pop-ups and a PDF timetable and collapses, then books a class in three taps on a clean demo site.', cover='Book in 10 seconds?'),
 dict(n=6, slug='06-cant-find-barber', day='Thursday 3 December 2026', d='3 December 2026', time='22:00', svc='Local SEO', setting='Barber shop street (approved test reel 2, moved from café to barber)', problem='"Why is my business not showing on Google Maps?" (sheet top 5 #1)', hook='#3 Challenge question', frame0='"Will he find the barber?" over a customer already sprinting past, staring at his phone; the barber waves "Over here!!".',
  joke='His map shows a "?" where the barber is, passers-by walk past, a pigeon is the only customer ("...not you."), and he runs straight into a lamppost: BONK.',
  fix='A giant map pin drops on the roof, the DEMO map shows "Barber · 2 min walk" and everyone walks in.', price='Local SEO from £325/month', music=('lofi', 9202),
  q='If someone searched "barber near me" on your street right now, would they find you?',
  body="A complete Google Business Profile (right category, hours, photos, website linked, reviews) helps people nearby find you on the map.\n\nLocal SEO from £325/month. Comment START and I'll check your profile.",
  tags='#ManchesterBarber #LocalSEO', alt='Cartoon: a customer runs past a barber shop because it is missing from his phone map and hits a lamppost, then a map pin drops on the shop and everyone walks in.', cover="They can't find you."),
 dict(n=7, slug='07-form-nowhere', day='Friday 4 December 2026', d='4 December 2026', time='14:30', svc='Websites', setting='Estate agent\'s office', problem='Missed enquiries (sheet: Missed messages/enquiries)', hook='#1 About to break (stress)', frame0='A couple already typing into a DEMO "Book a viewing" form while the agent waits by her phone.',
  joke='They tap SEND: the message loops around as a paper plane and nosedives into the bin (CRUNCH); the second one is stolen by a pigeon; the agent grows a cobweb and falls asleep while they leave for the next agent.',
  fix='"Checked on real phones": the plane lands in her hand, "Sat 11:00 ✓", she throws them the keys.', price='Websites from £655', music=('ambient', 9215),
  q='When did you last test your own contact form on your phone?',
  body="If your form doesn't actually send, the enquiry never reaches you and the customer thinks you ignored them. Every form I build is checked on real phones before launch.\n\nWebsites from £655. Comment START and I'll test yours.",
  tags='#EstateAgentUK #SmallBusinessWebsite', alt='Cartoon: a couple send a viewing request from an estate agent website, but it flies into the bin and a pigeon steals the next one; then the fixed demo form delivers the request and the agent hands over keys.', cover='Your form goes nowhere.'),
 dict(n=8, slug='08-juggling-messages', day='Friday 4 December 2026', d='4 December 2026', time='22:00', svc='AI agents', setting='Dental clinic reception', problem='Owner time & admin / messages after hours (sheet)', hook='#8 Relatable meme caption', frame0='White caption bar "Me answering WhatsApp, emails and DMs at 11 pm" over the receptionist already juggling message icons.',
  joke='More icons fly in (99+), a patient with a swollen cheek rings the desk bell, and the whole pile crashes down and buries him; only his hand waves out.',
  fix='A robot AI agent takes the desk: "Tue 9:30 is free. Booked ✓" and "Passing you to the team now"; the receptionist drinks his tea.', price='AI agents from £875 setup + £109/month', music=('pluck', 9216),
  q='How many messages do you answer after closing?',
  body="WhatsApp, emails, DMs, website chat. An AI agent can answer the routine ones, book appointments and pass anything urgent to your team.\n\nAI agents from £875 setup + £109/month. Comment START and I'll show you how it would work for you.",
  tags='#ClinicOwner #AIAgents', alt='Cartoon: a dental clinic receptionist juggles message icons until they bury him, then a robot AI agent books a check-up and passes an urgent message to the team in a demo inbox.', cover='11 pm. 99+ messages.'),
 dict(n=9, slug='09-stamp-card-pigeon', day='Saturday 5 December 2026', d='5 December 2026', time='14:30', svc='Mobile apps', setting='Bakery', problem='"Loyalty scheme for small café" / repeat customers (sheet top 5 #5)', hook='#6 Pattern interrupt', frame0='A pigeon swoops in and snatches a paper stamp card with 9 of 10 stamps.',
  joke='He chases it, it drops in a puddle, he dives in (SPLASH) and the card is soggy; the baker hands him a new blank card... and the pigeon steals that too.',
  fix='A DEMO bakery app: the 10th stamp lands, "Free bun!", and the pigeon gets the crumbs.', price='Apps from £3,995', music=('piano', 9217),
  q='Where do your customers\' paper stamp cards end up?',
  body="Paper cards get lost, washed and binned. In your own app the stamps live on their phone, and regulars come back for the free one.\n\nApps from £3,995. Comment START and I'll tell you what your app could do.",
  tags='#BakeryOwner #LoyaltyApp', alt='Cartoon: a pigeon steals a customer\'s nearly full paper stamp card, twice, then a demo bakery app adds the tenth stamp and gives him a free bun.', cover='Stamp card: GONE.'),
 dict(n=10, slug='10-groomer-build', day='Saturday 5 December 2026', d='5 December 2026', time='22:00', svc='Websites', setting='Pet groomer', problem='"Do I need a website for my small business?" / no website (sheet top 5 #4)', hook='#7 Satisfying build', frame0='Website blocks already slamming into a giant phone ("Building a site for a pet groomer (demo)").',
  joke='The "Book a groom" button bounces off and bonks the cat; the groomer catches it and slots it in; a customer books, and the cat comes out with a poodle pom-pom cut.',
  fix='The finished DEMO site: booking, prices list, map, hours, text written for her, chat button.', price='Websites from £655', music=('lofi', 9218),
  q='No website yet? What would yours need?',
  body="Booking, prices, map and opening hours, built for phones first. You don't have to write the words: I write the text from one short call.\n\nWebsites from £655. Comment START and I'll tell you what yours needs.",
  tags='#PetGroomer #SmallBusinessWebsite', alt='Cartoon: a demo website for a pet groomer builds itself block by block on a giant phone; the booking button bonks the cat, a customer books, and the cat ends up with a poodle cut.', cover='No website yet?'),
 dict(n=11, slug='11-florist-ai-pick', day='Sunday 6 December 2026', d='6 December 2026', time='14:30', svc='GEO', setting='Game-show stage, two florists', problem='"How do you get ChatGPT to recommend your business?" (sheet top 5 #3)', hook='#3 Challenge question', frame0='"Which florist will the AI pick?" with two florists bouncing on podiums under an AI ANSWER screen.',
  joke='Florist A holds up a clear website, "YOU" holds up just a photo; the AI says "???" then "I pick: Florist A" and a trapdoor drops "YOU" through the floor.',
  fix='She springs back with clear details (hours, delivery area, FAQs) and the DEMO answer shows "Also recommended: Your Florist".', price='GEO from £215/month', music=('house', 9219),
  q='Have you checked what AI tools say about your business?',
  body="AI tools can only mention what they can read. Clear hours, services, area and FAQs on your website make it easier for them.\n\nGEO from £215/month. Comment START and I'll check what AI tools can see about you.",
  tags='#Florist #ChatGPT', alt='Cartoon game show: an AI picks the florist with a clear website and the other florist drops through a trapdoor, then returns with clear details and appears in the demo AI answer.', cover='Will AI pick you?'),
 dict(n=12, slug='12-price-waiting', day='Sunday 6 December 2026', d='6 December 2026', time='22:00', svc='AI agents', setting='Nail bar', problem='Price questions stuck in DMs / slow replies (sheet: Missed messages)', hook='#2 Countdown / clock → payoff', frame0='"She asks your price at 9 pm..." with a WAITING clock already racing next to her message.',
  joke='The clock races to hours, she grows a cobweb, her hair turns grey and she gets a walking stick; the reply finally comes "next day" and she has gone, leaving a "Booked elsewhere" note and a pigeon.',
  fix='A robot AI agent replies in the DEMO chat with the price list and books "Sat 2pm ✓"; she walks in young again.', price='AI agents from £875 setup + £109/month', music=('ambient', 9220),
  q='How long do price questions wait in your DMs?',
  body="When your hands are busy, price questions wait, and people book somewhere else. An AI agent can answer them, send your price list and book the appointment.\n\nAI agents from £875 setup + £109/month. Comment START and I'll show you how it would work for you.",
  tags='#NailSalon #AIAgents', alt='Cartoon: a customer waits for a nail bar to reply to her price question until she grows old and leaves, then a robot AI agent answers and books her in a demo chat.', cover='She asked your price.'),
 dict(n=13, slug='13-locksmith-map', day='Monday 7 December 2026', d='7 December 2026', time='14:30', svc='Local SEO', setting='Street at night, locksmith next door', problem='"Why is my business not showing on Google Maps?" (sheet top 5 #1)', hook='#9 Danger POV', frame0='"POV: locked out at 11 pm." The door slams and a man in pyjamas jumps as his slipper flies.',
  joke='A rain cloud follows only him, his map shows no locksmith, he gets stuck in his own window with his legs kicking while the locksmith walks right past, then the cat shuts the window and he drops into a puddle.',
  fix='A DEMO Google Business Profile ticks category, hours, area covered, photos + phone; the pin drops "Locksmith · 1 min walk" and she opens his door.', price='Local SEO from £325/month', music=('piano', 9221),
  q='When did you last update your Google Business Profile?',
  body="Someone nearby searches \"locksmith near me\" and you're not on the map, even though you're next door. A complete Google Business Profile helps people nearby find you.\n\nLocal SEO from £325/month. Comment START and I'll check your profile.",
  tags='#LocksmithUK #LocalSEO', alt='Cartoon: a man locked out at night cannot find a locksmith on his phone map even though one is next door; after a demo Google profile is completed, the pin appears and she opens his door.', cover='Next door. Not on the map.'),
 dict(n=14, slug='14-old-website', day='Monday 7 December 2026', d='7 December 2026', time='22:00', svc='Websites', setting='Salon (approved test reel 3)', problem='Old / weak website (sheet: No or weak website)', hook='#4 Expectation vs reality', frame0='"Expectation: book in seconds." Three customers stroll up to a giant phone showing a blinking 1990s site.',
  joke='The BOOK button falls off and bonks a customer, another falls asleep at "Loading... 1%", the third says "Nope." and walks to the shop next door; a tumbleweed rolls by.',
  fix='The owner swaps in a clean DEMO salon site and everyone books a haircut in 3 taps.', price='Websites from £655', music=('house', 9203),
  q='When did you last try booking on your own website, on your phone?',
  body="If your website looks like this, customers give up before they book. A new site where they can book in a few taps.\n\nWebsites from £655. Comment START and I'll tell you what yours needs.",
  tags='#ManchesterSalon #WebDesignUK', alt='Cartoon: customers try to book on an ancient salon website, get bonked and fall asleep, then book a haircut in three taps on a clean demo site.', cover='Is your website this old?'),
]
VO = {}
for r in R:
    c = json.load(open(f"/home/claude/scratch/week04-cartoon/cues/r{r['n']:02d}.wav.json"))
    r['lines'] = [l[2] for l in c['lines']]; r['vend'] = round(c['end'], 2)
def caption(r):
    return f"{r['q']}\n\n{r['body']}\n\n{TAGS} {r['tags']}"
W = '/home/claude/bracket-content/week-04/'
# POSTING-PLAN
p = ["# Week 04 posting plan · Tue 1 – Mon 7 Dec 2026 · CARTOON pack (instamake, made 26 Nov 2026)", "",
"Replaces the earlier week-04 pack (Bilal 26 Nov 23:11: \"Make a new week 4 batch of 14 reels in the cartoon style... Use the cartoon style for all future reels\"). Same 14 problems as the old plan (research sheet + hooks bank), remade as cartoon scenes; 3 swaps for variety: the two \"Bilal films\" slots are now cartoons (02 GEO split screen, 12 price-in-DM → AI agents), and \"café whole system\" became a GEO florist game show (11). Reels 04, 06 and 14 are Bilal's approved test reels (cartoon-1/2/3), re-cut: characters 25% bigger, reel 04's pigeon note no longer clips at the right edge, reel 06 moved from a café to a barber.", "",
"**Every reel:** 15.0 s, 1080x1920 · frame 0 already moving with 2+ characters · punchline by ~5–6.5 s · then the Bracket service that fixes it with its official \"from\" price · something changes at least every 1.5 s · end card (last 1.6 s) = `[ BRACKET ]` + Comment START only · voice Kokoro af_heart 1.0 (no pitch shift), never says \"Bracket\", ends with an offer line tied to the problem, ends before the video does · new original bg_music.py track per reel at ~0.22, ducked under the voice, plus light SFX · every app/site/map mock labelled DEMO · no \"freelance web developer\", no UK office implied, no invented clients/results/reviews/stats.", "",
"**Times:** 2 a day, 14:30 and 22:00 Kuwait (11:30 / 19:00 UK). Normal reels (no Trial switch), each with its own cover.", "",
"**Services:** websites 6 (01, 03, 05, 07, 10, 14) · AI agents 3 (04, 08, 12) · local SEO 2 (06, 13) · GEO 2 (02, 11) · apps 1 (09).", "",
"**Settings:** clothes shop, curry house, plumber, café, gym, barber, estate agent, dental clinic, bakery, pet groomer, florists, nail bar, locksmith, salon. Men and women, varied skin tones and hair.", "",
"**QA (Read on frames 0 / 4 / 8 / 11 / 14.2 s of every final mp4):** no clipped text, no text over faces, limbs intact, nothing cut at the edges except characters walking in/out, end card = logo + pill only, voice ends before the video (12.7–13.8 s of 15.0 s). Covers checked at 150 px wide.", "",
"`SHOT-LIST.md` (Bilal-films clips) is from the old pack; none of these 14 reels needs filming.", ""]
for r in R:
    p += [f"## {r['n']:02d} · {r['day']} · {r['time']} Kuwait · {r['svc']}", "",
     f"- **File:** `{r['slug']}.mp4` · **Cover:** `covers/{r['slug']}.jpg` (\"{r['cover']}\")",
     f"- **Setting:** {r['setting']}",
     f"- **Problem (research):** {r['problem']}",
     f"- **Hook formula:** {r['hook']} · **Frame 0:** {r['frame0']}",
     f"- **The joke:** {r['joke']}",
     f"- **The fix:** {r['fix']} · **Tag:** {r['price']}",
     f"- **Voice (af_heart 1.0, ends {r['vend']} s):** " + " / ".join(f'"{l}"' for l in r['lines']),
     f"- **Music:** {r['music'][0]} {r['music'][1]}",
     f"- **Alt text:** {r['alt']}",
     "- **Caption:**", "", "```", caption(r), "```", ""]
open(W + 'POSTING-PLAN.md', 'w').write("\n".join(p))
# CAPTIONS
c = ["# Week 04 captions (cartoon pack) · paste as-is", ""]
for r in R: c += [f"## {r['n']:02d} · {r['slug']} · {r['d']} {r['time']} Kuwait", "", "```", caption(r), "```", ""]
open(W + 'CAPTIONS.md', 'w').write("\n".join(c))
# UPLOAD-LIST
u = ["# Week 04 upload list (cartoon pack, Instagram only, Reel)", "", "Numbered in posting order. Each reel: upload the mp4, then set the custom cover with the matching JPG. Times are Kuwait time (UK time in brackets). Nothing is posted or scheduled until Bilal says yes in chat.", "",
     "| # | Date | Kuwait (UK) | Reel | Cover | Service |", "|---|---|---|---|---|---|"]
for r in R:
    uk = '11:30' if r['time'] == '14:30' else '19:00'
    u.append(f"| {r['n']:02d} | {r['day'].rsplit(' 2026',1)[0]} | {r['time']} ({uk}) | {r['slug']}.mp4 | covers/{r['slug']}.jpg | {r['svc']} |")
open(W + 'UPLOAD-LIST.md', 'w').write("\n".join(u) + "\n")
json.dump([dict(n=r['n'], file=f"week-04/{r['slug']}.mp4", cover=f"week-04/covers/{r['slug']}.jpg", date=r['d'], time=r['time'], caption=caption(r)) for r in R], open(W + 'schedule.json', 'w'), indent=2, ensure_ascii=False)
json.dump([dict(n=r['n'], slug=r['slug'], svc=r['svc'], cover=r['cover'], music=r['music'], vend=r['vend'], hook=r['hook'], setting=r['setting']) for r in R], open('/home/claude/scratch/week04-cartoon/pack/meta.json', 'w'))
print('ok')
