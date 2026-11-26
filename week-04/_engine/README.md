# week-04 cartoon engine (approved style, Bilal 26 Nov 2026)

Flat-vector cartoon reels: parametric people (`chars.js`: poses walk/run/air/panic/celebrate/dance/flat/…, moods, hair, skin, props), robot (AI agent), cat, pigeon, comic props (bubble, impact, stars, dust, speed lines). `Ch.cfg.scale` = global character size (1.25 for every week-04 reel).
- `scene.js`: drop / wipe / headline (`head`) / price `tag` / DEMO pill / end card (`endOnly`: only [ BRACKET ] + Comment START). `NOHEAD=1` hides headline + tag (used for covers).
- `w4.js`: rooms, giant phone, app `panel` (clipped, DEMO pill), chat `msgs`, `ticks`, icons, paper plane, splash, cobweb, rain.
- `rNN.js`: one reel each (`{ dur, frame(t) }` → SVG). `covers.js`: cover NN = a reel frame + big hook text + small [ BRACKET ] mark.
- `cues/rNN.json`: voice lines (Kokoro af_heart 1.0), music style+seed, SFX times. `python3 mix.py cues/rNN.json cues/rNN.wav`.

Render (cloud): symlink `node_modules` to `week-03/_engine/node_modules`, `export PW_CHROMIUM=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell | head -1)`, then
`./prev.sh r05 0,2.2,5.9` (preview sheet) · `Q1="r01 r03" Q2="r02 r04" ./renderall.sh` (video + audio → `out/final_rNN.mp4`, ~40 s a reel) · `./qa.sh r05` (QA strip) · `NOHEAD=1 COVER=05 OUTNAME=cover05 node render.js covers 0`.
`pack-gen.py` writes POSTING-PLAN / CAPTIONS / UPLOAD-LIST / schedule.json.
