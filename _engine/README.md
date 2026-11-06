# Bracket reel engine (shared)

One install of the render engine for every week's Instagram pack. `node_modules` here holds Playwright 1.64.1 and the fonts. Its Chromium lives in ~/Library/Caches/ms-playwright, and ffmpeg is at /opt/homebrew/bin/ffmpeg.

Brand: ink #201e1d, red #ec3013, peach #ff8360, paper #f3f2f2, Archivo font (900/800), JetBrains Mono for labels.
Characters (lib.js): `bracket()` makes the red [ and peach ] mascots, `bug()` makes the cheeky bug. There are also helpers for windows, checks, confetti, speech bubbles and the shared `endCard()`.

Each week gets its own copy of the scripts in `week-NN/_engine/`, with `node_modules` symlinked back here:
    cp lib.js render.js carousels.js README.md ../week-NN/_engine/
    ln -s "<path to this folder>/node_modules" ../week-NN/_engine/node_modules

Render a reel: `node render.js reel1` → out/reel1.mp4 (1080x1920, 30fps, about 12 s per reel)
Preview frames: `node render.js reel1 1.5,5,9` → PNGs at those seconds
Carousels: `node carousels.js` → out/carousels/<deck>/slideN.png (1080x1350)

A new reel is a file exporting `{ dur, frame(t) }` that returns SVG. Copy an existing reel from a previous week as a template.
Calls to action are "Link in bio" style. Never use "DM us SITE" or a free-check offer.
If Playwright says its browser is missing, run `npx playwright install chromium` in this folder.
