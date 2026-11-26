# week-04 engine (instamake, 26 Nov 2026)

- `kit4.js`: shared helpers (phone, finger, bubbles, ticks, chips, hook block, end card = [ BRACKET ] + Comment START only, loop wrapper, DEMO café page).
- `r01…r12-*.js`: the 12 rendered reels (14.0 s, end card at 12.2 s). Output names in week-04/: r01→01, r02→03, r03→04, r04→05, r05→06, r06→07, r07→08, r08→09, r09→10, r10→11, r11→13, r12→14 (02 and 12 are Bilal-filmed).
- `cues/<reel>.json`: voice lines (af_heart 1.0), SFX times, music style + seed.
- `build.py`: voice + original music (audio-kit/bg_music.py) + SFX, ducked, muxed; fails if the voice runs past dur − 0.3 s.
- `make.sh <reel>`: render + audio → week-04/<reel>.mp4 (then renamed). `prev.sh <reel> 0,5,10`: preview sheet. `measure.py cues/x.json`: voice timing check.
- `covers.js`: the 14 covers → week-04/covers/ (text kept in y 300–1500: inside the 1080x1350 grid crop, clear of top 12% / bottom 20%).

Setup: `npm i playwright@1.64.1 @fontsource/archivo @fontsource/jetbrains-mono @fontsource/ibm-plex-sans-arabic @fontsource/inter`, `export PW_CHROMIUM=...` (see CLAUDE.md), Kokoro models in a scratch dir (`KOKORO=<dir>`, never committed).
