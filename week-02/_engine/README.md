# Bracket reel engine

These scripts generate the animated Bracket reels and carousels. They're used by the weekly scheduled task, and Claude Code can use them too.

Brand: ink #201e1d, red #ec3013, peach #ff8360, paper #f3f2f2, Archivo font (900/800), JetBrains Mono for labels.
Characters (lib.js): `bracket()` makes the red [ and peach ] mascots, `bug()` makes the cheeky bug. There are also helpers for windows, checks, confetti, speech bubbles and the shared `endCard()`.

Setup: `npm i @fontsource/archivo @fontsource/jetbrains-mono @fontsource/ibm-plex-sans-arabic playwright` (ffmpeg must be installed).
Render a reel: `node render.js reel4` → out/reel4.mp4 (1080x1920, 30fps)
Preview frames: `node render.js reel4 1.5,5,9` → PNGs at those seconds
Carousels: `node carousels.js` → out/carousels/<deck>/slideN.png (1080x1350)

A new reel is a file exporting `{ dur, frame(t) }` that returns SVG. Copy an existing reel as a template.

Arabic: every reel and carousel is bilingual (English + Arabic). Any string with Arabic letters passed to `txt()`/`line()` automatically uses IBM Plex Sans Arabic, right-to-left. Put the Arabic line directly under its English line, about 70% of the English size.
