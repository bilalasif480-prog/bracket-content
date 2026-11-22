# Hisaab reel (2026-11-22), task T-20261122-03

Format card A from `research/niche-report.md` ("Reference style from Bilal 2026-11-22"): belief → phone-UI proof → hisaab → 3 ticks → end card. Mechanism only; no words, footage or audio copied from the reference reels.

- `hisaab.js`: the reel (29.5 s, 1080x1920, 30 fps). Paper background with grid/vignette, rotating peach stars, wavy line, blur-in kinetic words (Archivo 900 + Archivo 800 italic as the accent face), EN with Gulf Arabic under it.
- Beats: 0 belief "I have Instagram. Why a website?" · 3.6 search card → "No results" · 8.4 DM "Price?" + Seen + clock → "Reply… next day" · 13.2 dark "The worst part?" · 17.4 calculator (example): 4 × 15 KD = 60 KD/month, × 6 = 360 KD · 23.2 three ticks · 26.8 `[ BRACKET ]` + "Software that gets it done."
- `lib.js`, `render.js` (adds Archivo 800 italic), `package.json`: engine copy. `audio-hisaab.json`: audio-kit cue (am_fenrir, voice ends 22.5 s, before the end card).
- `captions.md`: caption, hashtags, alt text, cover.

Render: `npm i playwright@1.64.1 @fontsource/archivo @fontsource/jetbrains-mono @fontsource/ibm-plex-sans-arabic`, set `PW_CHROMIUM`, `node render.js hisaab`. Audio: see `audio-kit/README.md`.
Hook check: frame 0 moving (words blurring in + Instagram-style card), claim lands by 1.5 s, works on mute, about the viewer's shop. Plan as a Trial reel.
