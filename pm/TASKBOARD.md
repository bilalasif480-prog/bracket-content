# Task board

The PM owns this file. Agents read their own rows and append to the Log.
One row per task. Newest requests at the top of Open.

Status: `queued` → `running` → `done` | `blocked` | `needs-approval`

## Open

| id | business | agent | task | status | needs from | updated |
|---|---|---|---|---|---|---|
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
