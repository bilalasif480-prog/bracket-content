# bracket-content: shared home of Bilal's Bracket Instagram agents

This public repo is the single place where the Bracket (@bracketkw) Instagram agents keep their files. It replaces the old Mac folder `/Users/bilal/Desktop/bilal copy/instagram-reels/`. Wherever a skill mentions that Mac path, use the same path inside this repo instead. Never use the Mac or device tools: every agent runs 100% in the cloud.

## Agents and who owns what
| Agent | When (Kuwait time) | Reads | Writes (owns) |
|---|---|---|---|
| Research | daily 08:45 | `research/strategy-brief.md` | `research/niche-report.md` |
| Instapulse | Friday 17:43 | Metricool, `research/niche-report.md`, `week-NN/POSTING-PLAN.md` | `research/strategy-brief.md`, `analytics/week-NN.md` |
| Instamake | Saturday 14:58 | `research/*`, `content-log.md`, newest `week-NN/`, `audio-kit/` | new `week-NN/` (incl. `trials/`, `TRIALS.md`), `content-log.md`, schedules main posts + trial reels in Metricool |

Only edit the files you own. Never delete another agent's files.

## Layout
- `_engine/`: shared render engine (lib.js, render.js, carousels.js, README.md). Each week copies the scripts into `week-NN/_engine/` and adds its reel files.
- `week-NN/`: one weekly pack: `POSTING-PLAN.md`, `dayN-…mp4` reels, `dayN-…-slideK.png` carousel slides, `_engine/`, and `SCHEDULED.md` (what was scheduled in Metricool, with planner links).
- `single-reels/`: one-off reels and carousels; `single-reels/2026-11-02-build-block-by-block/reel10.js` and `single-reels/2026-11-02-build-app-reel/reel11.js` are the build-reel templates.
- `content-log.md`: every topic used + a "Planned" section from Bilal.
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
- Bracket builds websites, builds mobile apps, and does QA testing. Never invent stats, clients, prices, results or testimonials.
- Everything on screen and in captions is bilingual: English + natural Gulf Arabic.
- This repo is public: never commit passwords, tokens, personal data, commenters' names or DM text.
