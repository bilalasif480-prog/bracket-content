# Task board

The PM owns this file. Agents read their own rows and append to the Log.
One row per task. Newest requests at the top of Open.

Status: `queued` → `running` → `done` | `blocked` | `needs-approval`

## Open

| id | business | agent | task | status | needs from | updated |
|---|---|---|---|---|---|---|
| T-20261122-17 | bracket | websiteqa + bracket-hacker | QA + security after UK changes / Arabic removal | queued (after T-16) | — | 2026-11-22 |
| T-20261122-16 | bracket | websitebuilder | Remove Arabic (/ar/, switch, hreflang, AR articles; backup first) + UK copy, British spelling, Manchester page, "Based in Kuwait, working with UK clients" | queued (after T-15) | Mac on | 2026-11-22 |
| T-20261122-15 | bracket | bracket-geo | UK/Manchester SEO + GEO plan: keywords, page targets, copy changes, Manchester page brief | done, `geo/bracket-uk-plan.md` | — | 2026-11-22 |
| T-20261122-14 | bracket | instamake | Remake week-03 for UK: £ maths, UK/Manchester captions + hashtags, English only | running | — | 2026-11-22 |
| T-20261122-07 | bracket | salesman | Find perfume brands on Instagram with no website: (A) new brands, (B) big-following brands selling only via WhatsApp. Brief: `pm/briefs/salesman-perfume-leads.md` | queued — on hold (Bilal: don't run yet) | Bilal: say go | 2026-11-22 |
| T-20261122-06 | bracket | instamake | Week-03 pack (23–29 Nov), Kuwait version | PAUSED 22 Nov 22:58 (Bilal: UK shift) — 3 posting tasks disabled; remake in T-14 | — | 2026-11-22 |
| T-20261122-05 | bracket | research | Outliers + format cards | done — 13 ref accounts, cards C–G, 10 ideas in `research/niche-report.md` | — | 2026-11-22 |
| T-20261122-04 | bracket | instapulse | Audit @bracketkw + strategy brief for client enquiries | done (public view only: Chrome not logged in as @bracketkw) — `analytics/week-03.md`, `research/strategy-brief.md` | Bilal: log Chrome into @bracketkw | 2026-11-22 |
| T-20261122-03 | bracket | instamake | Trial reels remaking the 3 reference reels' format (animated UI mockups + kinetic serif type), per research format cards | needs-approval — single-reels/2026-11-22-hisaab-reel/, mp4 off repo | Bilal: OK to post + who answers "WEBSITE" comments | 2026-11-22 |
| T-20261122-02 | bracket | research | Find reels like Bilal's 3 references | stopped by Bilal; PM wrote format cards A/B from the 3 refs in research/niche-report.md | — | 2026-11-22 |
| T-20261122-12 | bracket | websitebuilder | About, How we work, Work rewrite, Articles hub + 6 articles EN+AR, schema alternateName/founder | done, in Website (backup in _website-backups/) | 2026-11-22 |
| T-20261122-11 | bracket | bracket-geo | Article plan + trust checklist | `geo/bracket-content-plan.md` | 2026-11-22 |
| T-20261122-13 | bracket | websiteqa + bracket-hacker | QA + security on final Website incl. new pages | on hold (Bilal: leave QA; hacker launch blocked) | Bilal | 2026-11-22 |
| T-20261122-01 | bracket | bracket-geo | Re-audit final Website + AI visibility baseline | 15/20 (was 5/20); 0/10 visibility (not live); `geo/bracket-audit.md`, `geo/bracket-visibility.md` | 2026-11-22 |
| T-20261118-16 | bracket | websitebuilder | Light redesign, 16 AR pages (RTL) | done | 2026-11-22 |
| T-20261118-15 | bracket | websitebuilder | Light redesign: v2 design system, Three.js 3D heroes, 16 EN pages | done | 2026-11-22 |
| T-20261118-17 | bracket | websiteqa + bracket-hacker | QA + security on redesign | on hold (Bilal: don't test) | Bilal | 2026-11-18 |
| T-20261118-13 | bracket | websitebuilder | Final polish (tap targets, short-screen CTA, Arabic nits, dist allow-list, _redirects) | done | 2026-11-18 |
| T-20261118-12 | bracket | websiteqa + bracket-hacker | Retest | QA PASS, security PASS | 2026-11-18 |
| T-20261118-11 | bracket | websitebuilder | QA + security fixes, privacy + 404, self-hosted fonts, headers, build-dist.sh | done | 2026-11-18 |
| T-20261118-14 | bracket | pm | Deploy Bracket site (dist/ only) + live header/404 checks | needs-approval | Bilal: domain + host + OK to deploy | 2026-11-18 |
| T-20261118-09 | bracket | bracket-hacker | Security test | PASS — 0C/1H(deploy)/1M/4L, `security/bracket-pentest.md` | 2026-11-18 |
| T-20261118-08 | bracket | websiteqa | QA + launch-check, 28 pages EN+AR | FAIL — 0C/1H/5M/11L, `qa/bracket-report.md`, `qa/bracket-launch-check.md` | 2026-11-18 |
| T-20261118-10 | bracket | websitebuilder | Full Arabic /ar/ site | done, 15 pages | 2026-11-18 |
| T-20261118-07 | bracket | websitebuilder | English software-house site, 5 services, SEO/GEO tags, robots/sitemap/llms.txt, og image | site files (off repo, Bilal's site folder after QA) | 2026-11-18 |
| T-20261118-06 | bracket | bracket-geo | SEO + GEO audit, page targets, robots/sitemap/llms.txt drafts | `geo/bracket-audit.md` — 5/20 today | 2026-11-18 |
| T-20261118-05 | bracket | bracket-designer | Site review + software-house plan, EN+AR copy, handoff | `design/bracket-design.md` | 2026-11-18 |

## Done (newest first)

| id | business | agent | task | result | finished |
|---|---|---|---|---|---|
| T-20261118-04 | parfum-239 | instamake | "Guess the price" reel, trial variants A/B + shot list | `clients/parfum-239/insta/week-01/`; mp4s off repo, sent to Bilal | 2026-11-18 |
| T-20261118-03 | parfum-239 | research | 12 reference accounts, outliers, 7 format cards | `clients/parfum-239/insta/research/niche-report.md` | 2026-11-18 |
| T-20261118-02 | parfum-239 | instamake | 239 Parfum "We number them" reel | `clients/parfum-239/reels/2026-11-18-numbered/` (script, cue, captions); mp4 kept off repo, sent to Bilal | 2026-11-18 |
| T-20261118-01 | parfum-239 | research | Read @parfum_239 + draft profile | `business/parfum-239.md`, `clients/parfum-239/research/instagram.md` | 2026-11-18 |
| T-20261111-02 | rental-app | bracket-designer | Design the full app on a design canvas from T-01 | `design/rental-app-design.md` — canvas, 50 artboards, 11 open questions | 2026-11-11 |
| T-20261111-01 | rental-app | research | Research how rental apps (tenant applications with salary/doc upload, owner listings) structure every screen | `clients/rental-app/research/screens.md` — 44 screens, 26 sources | 2026-11-11 |

## Log

(Agents append one line per run: `YYYY-MM-DD HH:MM <agent> <task-id> — what happened`.)
2026-11-11 19:13 research T-20261111-01 — wrote clients/rental-app/research/screens.md: 44 screens (tenant 17, owner 17, shared 10), application fields, owner review, UX patterns, sourced Kuwait notes; 26 sources
2026-11-11 19:25 bracket-designer T-20261111-02 — built Design canvas "Rental app design" (https://claude.ai/artifact/TNDb3yAidZvqYjzvzyxQx7): 50 linked phone artboards covering all 44 inventory screens in 7 rows, look "Teal & Sand"; wrote design/rental-app-design.md with screen list, flows and 11 open questions
2026-11-11 19:30 pm — rental-app: research + full design done; waiting on Bilal for open questions
2026-11-11 20:10 pm — iOS 27 restyle was for Mousa A/C (not rental-app); T-03/T-04 dropped, done directly on a new Mousa canvas
2026-11-17 14:21 pm — installed apple-design skill (emilkowalski/skills, MIT) and added it to websitebuilder's skills: loads it for any UI, motion, gesture or typography work
2026-11-18 07:58 pm — reviewed Ootto-AI/claude-content-skills (MIT); proposed instamake + instapulse updates: 8-point hook check, covers, one CTA, caption search, humanizer, carousel slide jobs, A/B hook trials, weekly Stories, comment mining, DM scripts, own-median ranking, profile check. Waiting on Bilal to save.
2026-11-18 08:10 pm — Bilal: no Metricool or other tools; instamake/instapulse now post and read Instagram directly in his Chrome. Repo rules updated; skill updates proposed.
2026-11-18 08:11 research T-20261118-01 — parfum-239: read @parfum_239 in Chrome (read-only) + demo site; wrote clients/parfum-239/research/instagram.md and business/parfum-239.md; flagged Dior/Chanel trademark risk in their reels
2026-11-18 08:16 instamake T-20261118-02 — parfum-239: sample reel "Numbered, not named" (19.5 s, EN+Gulf Arabic, original bottle vector, kokoro am_fenrir + original music); repo has reel js, cue json, captions.md in clients/parfum-239/reels/2026-11-18-numbered/; mp4 kept outside repo; not posted
2026-11-18 08:35 pm — parfum-239: research + reel done (PM sent back once: Arabic digits → 001/003); reel waiting on Bilal, nothing posted
2026-11-18 08:45 pm — Bilal: agents must grow any client's Instagram. Added pm/INSTAGRAM-GROWTH.md (remake outliers, Trial reels by default, volume, promote/drop, client report), profile section 10, client layout clients/<slug>/insta/. Skill updates for instamake, instapulse, pm proposed.
2026-11-18 08:45 research T-20261118-03 — parfum-239: read 12 reference accounts' Reels tabs in Chrome (read-only); 25+ outliers found, 8 watched; wrote clients/parfum-239/insta/research/niche-report.md (7 format cards, best 3, 12 hooks EN+AR). Not committed.
2026-11-18 08:55 instamake T-20261118-04 — parfum-239: "Guess the price" trial reels A (challenge hook) + B (objection hook), 15.5 s, card #1 price reveal, hook check 8/8; script, cues, TRIALS.md, captions.md, POSTING-PLAN.md, SHOT-LIST.md in clients/parfum-239/insta/week-01/; mp4s off repo; price 6.900 KD to be confirmed by owner; not posted, not committed
2026-11-18 09:20 pm — parfum-239: first run of the growth process (research outliers → format card #1 price reveal → instamake A/B trials). Waiting on Bilal + owner's price confirmation; nothing posted
2026-11-18 13:15 pm — Bilal: Bracket is a software house again (websites, apps, AI agents, SEO, GEO; never 'studio'). Profile + CLAUDE.md updated; assumed no QA service and no prices on site. T-05 designer + T-06 geo running; build waits on Bilal's OK.
2026-11-18 13:25 pm — T-05 + T-06 done and checked (no invented numbers/prices). Build T-07 waits on Bilal: slogan, domain/email, Arabic approach, OK on plan.
2026-11-18 13:30 pm — Bilal OK'd build: no prices, full Arabic, email bracketkw@gmail.com, WhatsApp set, PM picked slogan 'Software that gets it done.'; dropped reply-time promises and unconfirmed careers lines.
2026-11-18 13:50 pm — T-07 English build done and checked (no prices/studio/invented numbers). T-10 Arabic build running.
2026-11-18 14:25 pm — Arabic built; QA FAIL (small: hero CTA fold, contrast, tap targets, titles, privacy page), hacker PASS w/ deploy fixes. Sent all back to websitebuilder (T-11).
2026-11-18 14:25 pm — QA PASS + security PASS after fixes; final polish done. New site copied into Bilal's 'bilal copy' folder (old files backed up in _before-software-house/). Not deployed: needs domain + Bilal's OK.
2026-11-18 14:50 pm — Bilal: moved all website files into 'bilal copy/bracket-website/' (site/, docs/, old-versions/, README). Build still OK (67 files).
2026-11-18 18:40 pm — Bilal: full light redesign with animations + 3D, websitebuilder only, no QA/hacker this run (T-17 on hold; must run before deploy).
2026-11-22 01:25 pm — light redesign (EN+AR, 3D) done by websitebuilder only; copied into bracket-website/site/ (previous version in old-versions/before-light-redesign). QA + security (T-17) still on hold per Bilal — must run before deploy.
2026-11-22 01:40 pm — Bilal: nav dropdown needed a click. Cause: 10px gap between Services button and menu closed it on slow mouse moves. Fixed in v2.css/v2.js (hover bridge, CSS hover open, 350ms close delay); checked EN+AR.
2026-11-22 02:05 pm — Bilal: 'bilal copy/Website' is the final site (dark 3D version); only fix bugs he reports, nobody else works on it. Light v2 redesign not used (cloud copy only). Fixed Services dropdown there: bracket-3d.css overflow:hidden clipped the hover bridge, and a click left it stuck open — hover bridge on .nav-dd, hover open/close on mouse, tap toggle on touch. Checked EN+AR.
2026-11-22 08:35 pm — Bilal: added page loader like his video (from 'bilal copy 2'): [ BRACKET ], 000→100 counter, red bar, brackets fly apart. New loader.css + loader.js in Website, linked on 32 pages (EN+AR), added to build-dist.sh. Shows once per visit.
2026-11-22 09:30 pm — bracket-geo: final site 15/20; loader + 600 KB 3D file on every page are the main SEO risks (fixes wait on Bilal's OK); favicon/font 'missing' items were PM staging artifacts. Visibility baseline 0/10; next check ~22 Dec.
2026-11-22 09:40 pm — Fix 1+2 (Bilal OK): loader skips bots/speed tests, shorter (min 0.9s, max 2.5s, waits for HTML not full load); bracket-3d.js (600 KB) no longer a page script — loader.js loads it after page load + idle, people only, all pages keep their 3D/motion. Tested: humans content ~1.9s (was 4–8s), Googlebot ~0.1s with no 3D request. 32 pages updated, build OK.
2026-11-22 09:42 instamake T-20261122-03 — hisaab reel (Format card A) rendered, 29.5 s, am_fenrir voice + music/SFX and no-music versions; files in single-reels/2026-11-22-hisaab-reel/, mp4 not committed. Not posted.
2026-11-22 09:50 pm — Bilal sent 3 reference reels; research stopped early on his word, PM wrote format cards; instamake made 'hisaab' reel (29.5 s, EN+AR, voice). Waiting on Bilal; nothing posted. Note: shared lib.js endCard() still says 'QA testing & web build studio' — needs updating.
2026-11-22 09:46 pm — Bilal: am_fenrir voice + generated music sound robotic/not good. Hisaab reel re-cut with UI SFX only (no voice, no music), trending sound to be added on Instagram. Don't use the kokoro voice/music on reels until a better voice is picked.
2026-11-22 09:53 pm — Bilal picked af_heart voice; wants background music, different on every reel. Added audio-kit/bg_music.py (6 original styles, seeded) + MUSIC-LOG.md; README default voice → af_heart. 3 music options for hisaab sent.
2026-11-22 09:55 pm — Bilal: all 3 music versions (lofi/piano/oud) approved as good. Rule kept: af_heart voice + a different original track every reel. Posting still waits on his yes.
2026-11-22 09:57 pm — Bilal: 'start managing my Instagram, grow the business, get clients from Insta'. Agents switched back on for Bracket Instagram. Started T-04 instapulse audit + T-05 research; instamake pack T-06 after.
2026-11-22 09:59 instapulse T-20261122-04 — Chrome logged into a different IG account (not @bracketkw): no Insights/DMs read. Public audit: 9 posts, 2 followers, last post 9 Nov, old QA/fixed-price bio, no link/highlights/pins. Wrote analytics/week-03.md + strategy-brief top '22 Nov 2026: client-enquiry plan' (profile fixes, 5 pillars, Hisaab series, 23-29 Nov slots 1 main + 2 trials/day, keyword START/ابدأ, DM scripts). Not committed.
2026-11-22 10:02 pm — Bilal: do NOT post the old week-02 pack; make new reels instead. week-02 retired. T-06 instamake builds fresh reels from the 22 Nov brief + research.
2026-11-22 10:06 am instapulse T-20261122-04 — owner-side pass as @bracketkw (read-only): 30 d 332 views / 301 reached, 97.9% non-followers, 0 saves/shares/follows, 1 like, 10 profile visits, 1 link tap; 0 comments; DMs 0 inbound leads. analytics/week-03.md rewritten; brief: carousels → pin-only extras, Wed/Sat mains now reels, every post needs a share/save/START action. Not committed.
2026-11-22 10:08 am — Bilal approved comment keyword START / ابدأ. Added business/bracket.md section 10. DM text + profile edits still need his yes.
2026-11-22 10:08 am instapulse T-20261122-04 — brief: START keyword DM + public reply marked approved (relayed by PM). Profile edit + archiving NOT done: needs Bilal's own confirmation, not an agent relay. Bio as written = 180 chars (>150); short line 3 = 146. Not committed.
2026-11-22 10:40 pm research T-20261122-05 — niche-report top section extended: 13 reference accounts, outlier table (3 refs + genesisworks.jo, moujtabakhalifa, aiwithhazim, saoudalajme), format cards C-G, 10 bilingual ideas. Kuwait web/app sellers have no outliers (100-170 views). Read-only Chrome, no screenshots, not committed.
2026-11-22 10:20 am — PM (Bilal's yes in chat): bio + name changed on @bracketkw ('Bracket | Websites & Apps Kuwait'). Fixed-price reel removed from profile grid (web has no archive). Link + archiving 3 old carousels must be done in the app (web can't). Instamake T-06 started.
2026-11-22 10:49 instamake T-20261122-06 — week-03 pack made (23–29 Nov): 7 mains (Hisaab #01–#05 + GEO + rented-shop) + 14 trial hook variants, 25–29.5 s, af_heart 1.0, 21 new tracks (MUSIC-LOG). POSTING-PLAN.md, TRIALS.md, content-log updated. Brief's 2 pin carousels not made. Nothing posted, not committed.
2026-11-22 10:54 am — Bilal: week-03 reels too long (25–30 s). Instamake re-cutting all 21 to 12–15 s.
2026-11-22 11:14 instamake T-20261122-06 — revision: all 21 week-03 reels re-cut to 12.2–14.0 s (_engine/short.js), one-line hisaab cards, 3 short af_heart lines ending ≥0.8 s before end card, same tracks at new length. Overwrote week-03 mp4s + /home/claude/out/week-03-short/. POSTING-PLAN, TRIALS, MUSIC-LOG, content-log updated. Not committed, nothing posted.
2026-11-22 13:40 instamake T-20261122-06 — CTA end card on all 21 week-03 reels (Bilal 13:11): topic line (build it / get you found / set it up / build your app) + Comment START pill, spoken closing line over it (ends ≥0.5 s before video end). Lengths 13.15–14.95 s. week-03 + out/week-03-short overwritten; audio-kit/README rule note, POSTING-PLAN, MUSIC-LOG updated. Not committed, nothing posted.
2026-11-22 13:44 pm — Bilal said YES to the week-03 pack (7 mains + 14 trials, 12–15 s, 'we can help' end card). Covers exactly those 21 posts at their POSTING-PLAN slots, trials with Trial switch on, our own first comment, and promoting trial winners per instapulse. Nothing else.
2026-11-22 13:49 pm — Scheduled tasks set (Bilal's yes): week-03 posting 12:27/16:27/19:57 Kuwait 23–29 Nov; daily 21:13 instapulse check (read-only, drafts START replies/lead DMs/trial verdicts for Bilal to send); Friday 17:43 weekly report + next week's plan. Auto-sending START DMs was blocked by the safety check, so the daily check only drafts them.
2026-11-22 14:35 pm — (T-20261122-11/12/13) trust pages + 6 articles (EN+AR) added to Website (54 files, build OK 89 files). Bilal skipped client naming + licence; photo pending. QA stopped on Bilal's request; security test launch was blocked by safety check — both still needed before launch.
2026-11-22 14:45 pm — Bilal couldn't find Articles (footer only): added 'Articles / المقالات' to top nav + mobile menu on all 50 pages (EN, AR, articles). Fits on one line down to tablet width.
2026-11-22 15:30 pm — Bilal: remove Arabic text from reels. On-screen text now English only (captions stay EN+AR). Profile updated; instamake re-rendering all 21 before Mon 12:27.
2026-11-22 15:34 pm — Bilal: captions English-only too (Arabic hashtags kept for search).
2026-11-22 15:45 pm — Bilal: leave the captions as they were (EN+AR). Only on-screen text is English-only.
2026-11-22 15:53 instamake T-20261122-06 — on-screen text English only (Bilal 15:29): all 21 week-03 reels re-rendered with no Arabic on screen (render.js strips it; end card pill 'Comment START'), same timing/voice/music/lengths. Captions unchanged EN+AR (Bilal 15:44). week-03 + out/week-03-short overwritten. Not committed, nothing posted.
2026-11-22 22:16 instapulse — daily check (read-only, Chrome as @bracketkw): 0 new comments, 0 START, 0 new DMs (General/Requests empty), 0 leads; no trials live yet (week-03 starts Mon 23). Figures in analytics/week-03.md. Nothing sent.
2026-11-22 22:58 pm — Bilal: target the UK (Manchester first), show Bracket is based in Kuwait. Paused week-03 posting (Kuwait pack), profile + CLAUDE.md → UK/English-only/£, Arabic site to be deleted with backup, bio change approved, old posts kept. T-14..T-17 opened.
2026-11-22 23:02 bracket-geo T-20261122-15 — geo/bracket-uk-plan.md: UK/Manchester keywords per service, title/meta/H1 for every page, manchester.html brief (honest remote, FAQ), Arabic removal + /ar/* 301s, sitemap/llms.txt/schema (areaServed UK+Manchester, address KW, en-GB), 5 articles re-angled for UK, #6 dropped. 6 decisions for Bilal (domain, UK-hours calls, ownership, £ quotes, listing name, article #6).
