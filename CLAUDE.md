# bracket-content: shared home of Bilal's agents

This public repo is the single place where Bilal's agents keep their files.

## The business is AI agents (changed 10 Nov 2026)
Bracket sells **AI agents to other businesses**: customer agents (WhatsApp replies and bookings),
sales agents (lead finding and outreach), marketing agents (social media), and custom agents.
It no longer sells website building, app building or QA testing. Never advertise those.

## Every agent reads a business profile
Nothing about a business lives in an agent's prompt or skill. It lives in `business/<slug>.md`.
An agent's FIRST step is to read `business/<slug>.md` (default `bracket`), and take the name,
services, audience, language, voice, brand, goal and limits from there. Same agents, any business.
`business/TEMPLATE.md` is the blank. `pm/README.md` is how the PM runs the team, and
`pm/TASKBOARD.md` is the shared task board every agent logs to.

## Approval line
No agent posts, schedules, sends, publishes, deploys or spends without Bilal's approval in that
run's chat. Everything else (research, drafts, renders, reports, commits) needs no approval.

## Where the files live
This repo replaces the old Mac folder `/Users/bilal/Desktop/bilal copy/instagram-reels/`. Wherever a skill mentions that Mac path, use the same path inside this repo instead. Never use the Mac or device tools: every agent runs 100% in the cloud. Exception (Bilal, 8 Nov 2026): the Research agent may use Claude in Chrome on Bilal's Mac, read-only, to watch competitors' reels when the laptop is on; if it isn't, it uses Metricool only. It never commits screenshots.

## Agents and who owns what
Every agent also reads `business/<slug>.md` first.

| Agent | When (Kuwait time) | Reads | Writes (owns) |
|---|---|---|---|
| PM | on request from Bilal | everything | `pm/TASKBOARD.md`, `pm/reports/` |
| Research | daily 08:45 | `research/strategy-brief.md` | `research/niche-report.md` |
| Instapulse | Friday 17:43 | Metricool, `research/niche-report.md`, `week-NN/POSTING-PLAN.md` | `research/strategy-brief.md`, `analytics/week-NN.md` |
| Instamake | Saturday 14:58 | `research/*`, `content-log.md`, newest `week-NN/`, `audio-kit/` | new `week-NN/` (incl. `trials/`, `TRIALS.md`), `content-log.md`, prepares posts in Metricool |
| Instaupload | with instamake | `week-NN/POSTING-PLAN.md` | `week-NN/SCHEDULED.md` |
| Salesman | on request | `research/niche-report.md` | `sales/<slug>-leads.md` |
| Websitebuilder | on request | `research/niche-report.md` | the website files |
| Websiteqa | after a build | the website files | `qa/<slug>-report.md` |

All agents are paused as of 10 Nov 2026 until Bilal switches them back on.

Only edit the files you own. Never delete another agent's files.

## Layout
- `_engine/`: shared render engine (lib.js, render.js, carousels.js, README.md). Each week copies the scripts into `week-NN/_engine/` and adds its reel files.
- `week-NN/`: one weekly pack: `POSTING-PLAN.md`, `dayN-…mp4` reels, `dayN-…-slideK.png` carousel slides, `_engine/`, and `SCHEDULED.md` (what was scheduled in Metricool, with planner links).
- `single-reels/`: one-off reels and carousels; `single-reels/2026-11-02-build-block-by-block/reel10.js` and `single-reels/2026-11-02-build-app-reel/reel11.js` are the build-reel templates.
- `content-log.md`: every topic used + a "Planned" section from Bilal.
- `business/`: one profile per business (`bracket.md`, `TEMPLATE.md`). Read this first.
- `pm/`: `README.md` (how the PM runs the team), `TASKBOARD.md` (shared task board), `reports/`.
- `research/`: `niche-report.md` (research agent), `strategy-brief.md` (Instapulse).
- `analytics/`: weekly reports from Instapulse.
- `audio-kit/`: approved voice-over + original music + SFX generator for every reel (Instapulse maintains it; read its README).

## Rendering in the cloud
In `week-NN/_engine/`: `npm i playwright@1.64.1 @fontsource/archivo @fontsource/jetbrains-mono @fontsource/ibm-plex-sans-arabic` then `export PW_CHROMIUM=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell | head -1)` before `node render.js …` / `node carousels.js` (the cloud's preinstalled Chromium; downloading browsers is blocked there). ffmpeg is at /usr/local/bin/ffmpeg. A full reel renders in ~30 s. Never commit `node_modules/` or `_engine/out/` (see .gitignore).

## Public media links (for Metricool)
A committed file is public at `https://raw.githubusercontent.com/bilalasif480-prog/bracket-content/main/<path>`. Push first, then use that URL in Metricool's `media` list.

## Git
Before pushing: `git pull --rebase origin main`. Commit with a short message naming the agent, e.g. `instamake: week-03 pack`. Keep files small: reels 1080x1920 ~15-20 s mp4 (a few MB), slides PNG.

## Shared rules
- Bracket builds AI agents for other businesses. Never invent stats, clients, prices, results or testimonials.
- Everything on screen and in captions is bilingual: English + natural Gulf Arabic.
- This repo is public: never commit passwords, tokens, personal data, commenters' names or DM text.
