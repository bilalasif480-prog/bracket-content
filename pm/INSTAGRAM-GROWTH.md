# Instagram growth system (any client)

Added 18 Nov 2026 by the PM at Bilal's request. Every Instagram agent (research, instamake,
instapulse) follows this for Bracket **and** any client. The business itself (name, voice,
brand, limits) still comes only from `business/<slug>.md`; the growth settings for that
account are in section 10 of the same file.

Idea taken from the "Ripping" reel Bilal shared: find what already works in the niche,
remake the format as original content, push volume through **Trial reels**, keep the
winners. Plus what that reel leaves out: real numbers, fast replies, a profile that
converts, and a monthly report the client can see.

## 1. The weekly loop

```
research  ──► instapulse ──► instamake ──► Bilal approves ──► instamake posts ──► instapulse reads
(outliers)    (brief)        (pack)        (one yes/week)     (Chrome)            (trials → promote)
     ▲                                                                                   │
     └───────────────────────────────── winners + questions ◄─────────────────────────────┘
```

| Day (Kuwait) | Agent | Does |
|---|---|---|
| Daily | research | finds new outlier reels in the client's niche (section 3) |
| Daily, at the main slot | instamake | posts the approved main post + the day's trial reels |
| Daily, evening | instapulse | comments/DMs triage, trial check: promote / keep / drop (section 4) |
| Friday | instapulse | weekly numbers, hooks bank, strategy brief |
| Saturday | instamake | next week's pack, waits for Bilal's yes |
| 1st of month | instapulse | client report + profile check (section 7) |

## 2. Where a client's files live

- Bracket: `research/`, `analytics/`, `week-NN/` (as before).
- A client: `clients/<slug>/insta/research/niche-report.md`, `.../strategy-brief.md`,
  `.../analytics/week-NN.md`, `.../week-NN/` (POSTING-PLAN.md, TRIALS.md, SCHEDULED.md,
  reel scripts and cue files).
- **The repo is public.** Client photos, client videos and rendered client reels never go in
  it (`clients/**/*.mp4|*.mov|*.jpg|*.png|*.wav` are git-ignored). They live in the client's
  folder on Bilal's Mac or in Google Drive; the pack lists where each file is.

## 3. Remake what works (research → instamake)

1. research keeps 10–20 **reference accounts** per client (profile section 10): same niche,
   same country first, a few global ones for formats.
2. An **outlier** is a reel at 3× or more that account's own median views (or, when views
   aren't shown, its median likes + comments). Only outliers from the last 60 days count.
3. For each outlier research writes a **format card**: hook mechanism (price shock, question,
   before/after, POV, list, myth, challenge), first-frame picture, structure beat by beat,
   length, pacing (cuts per 5 s), text style, audio type, CTA, why it likely worked.
4. instamake turns format cards into **original** reels for the client: same mechanism and
   structure, the client's own product, footage, words and brand. Never the other account's
   footage, audio, captions, music, faces or logos. Write which card each reel uses.

## 4. Trial reels by default

- Every new reel goes out first as a **Trial reel** (Share → Advanced / Trial toggle on
  instagram.com; needs a Professional account). Trials are shown to non-followers only, so
  volume doesn't spam the followers.
- Main feed posts are: the week's carousels, proven trial winners, and anything the profile
  says must go to followers (launches, offers).
- **Read after 24 h, decide at 72 h** (instapulse, using Insights for that trial):
  - **Promote** (share to followers / main feed) if it beats the account's trial median on
    3-second hold *and* watch-through, or on shares + saves per reach. Promotion is covered by
    the week's approval.
  - **Remake** if the hook held (3 s hold above median) but watch-through dropped: same hook,
    new middle or shorter.
  - **Drop** if 3 s hold is below median: the hook failed. The hook goes to "Flopped".
  - Fewer than ~200 views: "no result yet", wait.
- Each idea is tested with 2–3 variants that change ONE thing (hook line + first frame, or
  length, or first scene). Never near-duplicates.

## 5. Volume

Set per client in profile section 10. Defaults:

| Stage | Main posts | Trial reels |
|---|---|---|
| Start (first 2 weeks) | 1 a day (reels/carousels mixed) | 2 a day |
| Once a winner is found | 1 a day | 3–5 a day |
| Ceiling | 1–2 a day | 10 a day |

Quality beats count: never go up a step while the hook check (instamake Quality pass) is
failing or the client hasn't sent fresh footage for 2 weeks.

## 6. Content that grows a business account

- **Pillars** (profile section 10): 3–5 recurring themes. Every pack covers them.
- **Series:** at least one recurring numbered series per client (e.g. "No. 001 on the night
  out", "Guess the price"). Series bring people back and make the grid readable.
- **Real footage first** for product and place businesses: hands, product, packaging, shop,
  owner, customers (with their consent). Animated reels are for explaining and filling gaps.
  On the 1st of each month instamake sends a **shot list** (10–15 clips, 3–8 s each, vertical,
  what to film and how) for the client to film on a phone.
- **Search:** first caption line and spoken words carry what a buyer would search
  ("perfume Kuwait", "عطور الكويت"). Captions bilingual per the profile.
- **One CTA per piece**, varied: follow, save, share, DM to order, comment a keyword.
  **Comment-a-keyword → DM** only when the profile lists the keyword and its approved reply.
- **Covers** that read at grid size and look like one family.
- **Audio:** original voice/music from `audio-kit/` is the default (instagram.com can't add
  Instagram's music library). If the profile wants trending audio, instamake saves a
  no-music version and Bilal or the client adds the sound in the app.
- **Collabs (monthly idea, never automatic):** one collab-post or creator idea per month,
  for Bilal to propose to the client.

## 7. Engagement, profile and the client report

- **First hour after each main post:** instapulse checks comments and drafts replies.
  Questions with a reply listed in profile section 10 ("approved replies") may be answered
  with that exact text only after Bilal turns that on for the client in chat; everything
  else is drafted and waits.
- **DMs:** sorted into orders/leads, questions, other. Draft replies; order leads first.
- **Profile check (monthly):** name field with the search word, bio with what/where/how to
  order, link, 3 pinned posts (best seller, how to order, best reel), highlights (Prices or
  How to order, Reviews only if real, Delivery). Suggestions only.
- **Monthly client report** (`clients/<slug>/insta/analytics/month-YYYY-MM.md`, figures only,
  no names): followers start → end, non-follower reach, views, shares, saves, profile visits,
  link taps, DMs/orders counted, best 3 reels and why, trial win rate, what next month
  changes. This is what Bilal shows the client. Never invent or estimate a number.

## 8. The numbers that matter (in this order)

1. Shares and saves per 1,000 reach (people sending it on = growth).
2. 3-second hold and watch-through on reels (hook and pacing).
3. Non-follower reach (trials and promoted reels).
4. Follows per 1,000 reach and profile visits.
5. DMs / orders / link taps (the client's real goal).
Likes and raw follower count are reported but never drive the plan.

## 9. Approval line (unchanged)

- Bilal approves each client's week in chat once. That yes covers: the listed main posts at
  their slots, the listed trial reels, and promoting trial winners. Nothing else.
- If the profile says the client must sign off, Bilal gets the client's yes first.
- Never like, follow, comment (other than our own first comment), DM, change the bio or
  settings, boost or spend on a client's account without Bilal's yes to that exact action.
- Before posting, check the logged-in account is the profile's handle. Wrong or missing
  account → stop.
- Mac off / Chrome unreachable → nothing posts; say which posts are waiting.
