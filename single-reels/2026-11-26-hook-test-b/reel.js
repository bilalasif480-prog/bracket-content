// Hook test B (instamake, 26 Nov 2026): hooks-bank "Expectation vs reality" (bait-and-switch).
// Dark mode, realistic browser UI (Inter), red accents, no cartoon. No voice: music + SFX only (build.py).
// 0–3.5 s split EXPECTATION / REALITY, red "Not secure" flashing + glitch · 3.3 cursor click · 3.5 flip to padlock,
// page snaps clean, "Fixed. Secure. Fast." · 4.6 care plan card · 6.0–7.5 end card · last 0.3 s crossfades to frame 0.
// Render from week-03/_engine:  OUTNAME=hook-test-b node render.js ../../single-reels/2026-11-26-hook-test-b/reel
const { C, clamp, seg, eo, eb, f } = require('../../week-03/_engine/lib');
const TURN = 3.5, END = 6.0, DUR = 7.5;
const INK = '#201e1d', BG = '#121110', WIN = '#1b1a19', BAR = '#2a2827', UI = 'Inter';
const rnd = n => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); };
const ui = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="${UI}" font-weight="${o.w || 400}" font-size="${size}" fill="${col}" text-anchor="${o.a || 'start'}" letter-spacing="${o.ls ?? 0}" opacity="${f(o.op ?? 1)}">${s}</text>`;
const big = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="Archivo" font-weight="900" font-size="${size}" fill="${col}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? -3}" opacity="${f(o.op ?? 1)}">${s}</text>`;
const mono = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="JB" font-weight="700" font-size="${size}" fill="${col}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? 3}" opacity="${f(o.op ?? 1)}">${s}</text>`;

const defs = `<defs>
<filter id="ws" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="24" stdDeviation="26" flood-color="#000" flood-opacity=".55"/><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity=".5"/></filter>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
<linearGradient id="hero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a2a22"/><stop offset=".55" stop-color="#7a3b25"/><stop offset="1" stop-color="#ff8360"/></linearGradient>
<linearGradient id="bgg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1b1a"/><stop offset="1" stop-color="#0e0d0c"/></linearGradient>
<radialGradient id="redg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ec3013" stop-opacity=".35"/><stop offset="1" stop-color="#ec3013" stop-opacity="0"/></radialGradient>
<clipPath id="cw"><rect x="0" y="0" width="920" height="560" rx="22"/></clipPath>
</defs>`;

const padlock = (x, y, s, col) => `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><rect x="-11" y="-2" width="22" height="17" rx="3.5" fill="${col}"/><path d="M-7 -2 V-7 a7 7 0 0 1 14 0 V-2" fill="none" stroke="${col}" stroke-width="3.2"/></g>`;
const warnTri = (x, y, s, col) => `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><path d="M0 -14 L13 9 H-13 Z" fill="${col}" stroke="${col}" stroke-width="3" stroke-linejoin="round"/><rect x="-1.6" y="-6" width="3.2" height="8" rx="1.4" fill="#fff"/><circle cx="0" cy="5.2" r="1.9" fill="#fff"/></g>`;
const cursor = (x, y, s = 1) => `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s * 1.6)})"><path d="M0 0 L0 23 L6 17.5 L10 26.5 L14 24.8 L10 16 L18 16 Z" fill="#fff" stroke="#000" stroke-width="1.6" stroke-linejoin="round"/></g>`;
const ripple = (x, y, k) => k <= 0 || k >= 1 ? '' : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(16 + 60 * eo(k))}" fill="none" stroke="#fff" stroke-width="${f(5 * (1 - k))}" opacity="${f(1 - k)}"/>`;

// the demo shop page inside a window (local coords, 920 x 560); broken = 0..1 (1 = reality mess)
function page(t, broken) {
  let s = `<rect x="0" y="0" width="920" height="560" fill="#f7f5f2"/>`;
  // site nav
  s += `<text x="40" y="146" font-family="Archivo" font-weight="900" font-size="34" fill="${INK}" letter-spacing="-1">Your Shop</text>`;
  s += ['New in', 'Shop', 'About'].map((w, i) => ui(w, 560 + i * 110, 144, 22, '#5d5853', { w: 500 })).join('');
  s += `<rect x="40" y="172" width="840" height="1" fill="#e6e1dc"/>`;
  if (broken < 0.5) {
    // hero: warm photo-like block with product shapes, slow drift
    const d = Math.sin(t * 1.6) * 8;
    s += `<rect x="40" y="196" width="840" height="230" rx="16" fill="url(#hero)"/>`;
    s += `<circle cx="${f(700 + d)}" cy="300" r="78" fill="#ffd9c9" opacity=".9"/><rect x="${f(640 + d)}" y="330" width="120" height="70" rx="12" fill="#f3e3d8"/>`;
    s += `<rect x="${f(790 - d)}" y="250" width="56" height="120" rx="10" fill="#201e1d" opacity=".85"/>`;
    s += `<text x="76" y="290" font-family="Archivo" font-weight="900" font-size="46" fill="#fff" letter-spacing="-2">New in this week.</text>`;
    s += ui('Handmade in Manchester', 78, 330, 22, '#ffe7dc', { w: 400 });
    s += `<rect x="76" y="356" width="170" height="48" rx="24" fill="#fff"/>` + ui('Shop now', 161, 388, 21, INK, { w: 600, a: 'middle' });
    // product row
    for (let i = 0; i < 4; i++) {
      const x = 40 + i * 214;
      s += `<rect x="${x}" y="446" width="198" height="96" rx="12" fill="${['#ece6e0', '#e8d9cf', '#efe9e4', '#e4ddd6'][i]}"/>`;
      s += `<rect x="${x + 16}" y="512" width="${90 + (i % 2) * 30}" height="10" rx="5" fill="#c9c1b9"/>`;
    }
  } else {
    // reality: hero image failed, layout shifted, grey skeletons
    s += `<rect x="40" y="196" width="840" height="230" rx="16" fill="#e3dfda"/>`;
    s += `<g transform="translate(460 290)"><rect x="-38" y="-30" width="76" height="60" rx="6" fill="none" stroke="#a9a29b" stroke-width="4"/><path d="M-30 22 L-8 -2 L8 14 L18 4 L30 22" fill="none" stroke="#a9a29b" stroke-width="4"/><path d="M-44 -38 L44 38" stroke="#a9a29b" stroke-width="4"/></g>`;
    s += ui('image could not be loaded', 460, 372, 20, '#8f8881', { a: 'middle' });
    s += `<text x="${f(118)}" y="472" font-family="Times New Roman" font-size="36" fill="#555">New in this week.</text>`;
    s += `<rect x="118" y="492" width="130" height="38" fill="#ddd" stroke="#999"/>` + `<text x="183" y="518" font-family="Times New Roman" font-size="20" fill="#333" text-anchor="middle">Shop now</text>`;
    s += `<rect x="300" y="492" width="320" height="14" rx="7" fill="#d8d3ce"/><rect x="300" y="516" width="240" height="14" rx="7" fill="#d8d3ce"/>`;
  }
  return s;
}

// browser window; mode 'good' | 'bad' | flip (0..1 bar flip progress)
function windowAt(x, y, sc, t, mode, k = 0) {
  const bad = mode === 'bad';
  const jit = bad ? (rnd(Math.floor(t * 14)) - .5) * 14 * (rnd(Math.floor(t * 14) + 3) > .55 ? 1 : 0.2) : 0;
  let s = `<g transform="translate(${f(x + jit)} ${f(y)}) scale(${f(sc)})">`;
  s += `<rect x="0" y="0" width="920" height="560" rx="22" fill="${WIN}" filter="url(#ws)"/>`;
  s += `<g clip-path="url(#cw)">`;
  s += page(t, bad ? 1 : 0);
  // tab strip + address bar (dark chrome)
  s += `<rect x="0" y="0" width="920" height="104" fill="${BAR}"/>`;
  s += ['#ff5f57', '#febc2e', '#28c840'].map((c, i) => `<circle cx="${30 + i * 26}" cy="26" r="8" fill="${c}"/>`).join('');
  s += `<path d="M118 46 V22 a10 10 0 0 1 10 -10 H330 a10 10 0 0 1 10 10 V46 Z" fill="${WIN}"/>` + ui('Your Shop', 140, 37, 19, '#d6d2ce', { w: 500 });
  s += `<rect x="0" y="46" width="920" height="58" fill="${WIN}"/>`;
  s += ui('←', 28, 84, 24, '#8a8580') + ui('→', 64, 84, 24, '#5a5551') + ui('↻', 100, 84, 24, '#8a8580');
  s += `<rect x="140" y="56" width="700" height="40" rx="20" fill="#0f0e0d"/>`;
  if (bad) {
    const fl = 0.55 + 0.45 * (Math.sin(t * 14) > -0.2 ? 1 : 0);
    s += `<rect x="146" y="60" width="172" height="32" rx="16" fill="${C.red}" opacity="${f(fl)}"/>`;
    s += warnTri(170, 77, 0.78, '#fff').replace('fill="#fff" stroke="#fff"', `fill="#fff" stroke="#fff"`);
    s += ui('Not secure', 188, 84, 19, '#fff', { w: 600 });
    s += ui('yourshop.co.uk', 334, 84, 20, '#c8c3be');
  } else {
    s += padlock(166, 77, 0.8, '#bdb8b3') + ui('yourshop.co.uk', 186, 84, 20, '#e9e5e1');
  }
  s += `<rect x="770" y="62" width="62" height="28" rx="14" fill="${C.red}"/>` + `<text x="801" y="82" font-family="JB" font-weight="700" font-size="15" fill="#fff" text-anchor="middle" letter-spacing="1">DEMO</text>`;
  s += `</g>`;
  if (bad) { // glitch slices
    const g = Math.floor(t * 14);
    for (let i = 0; i < 3; i++) {
      if (rnd(g * 7 + i) < .45) continue;
      const yy = 110 + rnd(g * 3 + i) * 420, hh = 6 + rnd(g + i * 9) * 22;
      s += `<rect x="${f((rnd(g + i) - .5) * 40)}" y="${f(yy)}" width="920" height="${f(hh)}" fill="${i % 2 ? '#00e5ff' : C.red}" opacity=".22"/>`;
    }
  }
  s += `</g>`;
  return s;
}

// bar flip: the red pill folds away and a padlock bar unfolds (k 0..1), drawn over the window bar area
function flipBar(x, y, sc, k) {
  const a = k < .5 ? 1 - k * 2 : (k - .5) * 2;
  let s = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(sc)})"><rect x="140" y="56" width="700" height="40" rx="20" fill="#0f0e0d"/>`;
  s += `<g transform="translate(0 76) scale(1 ${f(Math.max(.02, a))}) translate(0 -76)">`;
  if (k < .5) s += `<rect x="146" y="60" width="172" height="32" rx="16" fill="${C.red}"/>` + warnTri(170, 77, .78, '#fff') + ui('Not secure', 188, 84, 19, '#fff', { w: 600 }) + ui('yourshop.co.uk', 334, 84, 20, '#c8c3be');
  else s += padlock(166, 77, .8, '#fff') + ui('yourshop.co.uk', 186, 84, 20, '#fff');
  s += `</g><rect x="770" y="62" width="62" height="28" rx="14" fill="${C.red}"/><text x="801" y="82" font-family="JB" font-weight="700" font-size="15" fill="#fff" text-anchor="middle" letter-spacing="1">DEMO</text></g>`;
  return s;
}

function background(t, redOn) {
  let s = `<rect width="1080" height="1920" fill="url(#bgg)"/>`;
  // faint moving dot grid
  const o = (t * 18) % 60;
  s += `<g opacity=".08">`;
  for (let yy = -60; yy < 1980; yy += 60) for (let xx = 30; xx < 1080; xx += 60) s += `<circle cx="${xx}" cy="${f(yy + o)}" r="2" fill="#fff"/>`;
  s += `</g>`;
  if (redOn > 0) s += `<ellipse cx="540" cy="1250" rx="620" ry="420" fill="url(#redg)" opacity="${f(redOn)}"/>`;
  return s;
}

const label = (s, x, y, col, op = 1) => `<g opacity="${f(op)}"><rect x="${f(x)}" y="${f(y - 54)}" width="${s.length * 41 + 44}" height="72" rx="10" fill="${col}"/>${big(s, x + 22, y, 60, col === '#fff' ? INK : '#fff', { a: 'start', ls: 1 })}</g>`;

function hookScene(t) {
  const flash = Math.sin(t * 14) > -0.2 ? 1 : .55;
  let s = background(t, .55 + .45 * (flash - .55) / .45);
  // hook text: line 1 then line 2
  const l2 = seg(t, 1.55, 1.75);
  const ty = 210;
  if (l2 < 1) s += big('Your website', 540, ty - 8, 88, '#fff', { op: 1 - l2 }) + big('looks fine…', 540, ty + 84, 88, '#fff', { op: 1 - l2 });
  if (l2 > 0) {
    const k = eb(l2);
    s += `<g transform="translate(540 ${ty + 40}) scale(${f(.85 + .15 * k)}) translate(-540 ${-ty - 40})" opacity="${f(l2)}">` + big('Until Chrome', 540, ty - 8, 88, '#fff') + big('says <tspan fill="' + C.red + '">this.</tspan>', 540, ty + 84, 88, '#fff') + `</g>`;
  }
  // panels
  s += label('EXPECTATION', 80, 440, '#fff');
  s += windowAt(80, 470, 1, t, 'good');
  s += label('REALITY', 80, 1150, C.red);
  s += windowAt(80, 1180, 1, t, 'bad');
  // magnified "Not secure" loupe over the broken hero, linked to the small pill (readable at frame 0)
  const pulse = 1 + .05 * Math.sin(t * 14), fl2 = Math.sin(t * 14) > -0.2 ? 1 : .6;
  s += `<path d="M312 1272 L430 1400" stroke="${C.red}" stroke-width="5" stroke-dasharray="10 8"/><circle cx="312" cy="1257" r="30" fill="none" stroke="${C.red}" stroke-width="5"/>`;
  s += `<g transform="translate(560 1450) scale(${f(pulse)})"><rect x="-290" y="-70" width="580" height="140" rx="70" fill="#0f0e0d" filter="url(#ws)"/>
  <rect x="-270" y="-52" width="540" height="104" rx="52" fill="${C.red}" opacity="${f(fl2)}"/>${warnTri(-190, 4, 2.3, '#fff')}${ui('Not secure', -140, 22, 62, '#fff', { w: 700 })}</g>`;
  // top cursor glides over "Shop now"
  const cx = 360 + Math.sin(t * 1.4) * 60, cy = 850 + Math.cos(t * 1.7) * 20;
  s += cursor(cx, cy);
  // bottom cursor heads for the warning, clicks at 3.3
  const m = eo(seg(t, 0.2, 3.2));
  const bx = 700 + (330 - 700) * m, by = 1560 + (1265 - 1560) * m;
  s += ripple(330, 1265, seg(t, 3.3, 3.8)) + cursor(bx, by, 1 - .12 * (seg(t, 3.28, 3.33) - seg(t, 3.36, 3.42)));
  return s;
}

function turnScene(t) {
  const u = t - TURN;
  let s = background(t, 0);
  // top panel slides up and fades, bottom window rises to centre
  const k = eo(seg(u, 0, .45));
  if (k < 1) s += `<g opacity="${f(1 - k)}" transform="translate(0 ${f(-300 * k)})">${label('EXPECTATION', 80, 440, '#fff')}${windowAt(80, 470, 1, t, 'good')}</g>`;
  const wy = 1180 + (700 - 1180) * k, sc = 1 + .0 * k;
  const flip = seg(u, -0.05, .3);
  s += windowAt(80, wy, sc, t, flip >= .5 ? 'good' : 'bad');
  if (flip < 1) s += flipBar(80, wy, sc, flip);
  // white snap flash
  const fl = 1 - seg(u, 0, .18);
  if (fl > 0) s += `<rect width="1080" height="1920" fill="#fff" opacity="${f(fl * .55)}"/>`;
  // headline words appear one by one
  const op = a => f(clamp(seg(u, a, a + .15)));
  const hk = eb(seg(u, .25, .55));
  s += `<g transform="translate(540 300) scale(${f(.9 + .1 * hk)}) translate(-540 -300)"><text x="540" y="300" font-family="Archivo" font-weight="900" font-size="92" text-anchor="middle" letter-spacing="-3" fill="#fff"><tspan opacity="${op(.25)}">Fixed. </tspan><tspan opacity="${op(.55)}">Secure. </tspan><tspan fill="${C.red}" opacity="${op(.85)}">Fast.</tspan></text></g>`;
  // label swap
  const lk = eo(seg(u, .2, .5));
  s += `<g opacity="${f(lk)}"><rect x="80" y="${f(588)}" width="300" height="60" rx="10" fill="${C.green}"/>${padlock(124, 618, 1.2, '#fff')}${big('SECURE', 154, 636, 46, '#fff', { a: 'start', ls: 1 })}</g>`;
  // care plan card
  const c = eb(seg(u, 1.1, 1.45));
  if (c > 0) s += `<g transform="translate(540 1420) scale(${f(c)}) translate(-540 -1420)"><rect x="150" y="1360" width="780" height="120" rx="60" fill="#fff"/>${big('Care plan from <tspan fill="' + C.red + '">£43</tspan>/month', 540, 1440, 54, INK, { ls: -1 })}</g>`;
  // a calm cursor parked on the padlock with one last ripple
  s += ripple(80 + 166, wy + 77, seg(u, .05, .55));
  return s;
}

function endCard(t) {
  const u = t - END;
  let s = `<rect width="1080" height="1920" fill="${INK}"/>`;
  const o = (t * 18) % 60;
  s += `<g opacity=".07">`; for (let yy = -60; yy < 1980; yy += 60) for (let xx = 30; xx < 1080; xx += 60) s += `<circle cx="${xx}" cy="${f(yy + o)}" r="2" fill="#fff"/>`; s += `</g>`;
  const a = eb(seg(u, 0, .35)), b = eo(seg(u, .15, .45)), c = eb(seg(u, .3, .6));
  s += `<g transform="translate(540 760) scale(${f(a)}) translate(-540 -760)"><text x="540" y="800" font-family="Archivo" font-weight="900" font-size="128" text-anchor="middle" letter-spacing="-4" fill="#fff"><tspan fill="${C.red}">[</tspan> BRACKET <tspan fill="${C.peach}">]</tspan></text></g>`;
  s += mono('SOFTWARE HOUSE · BASED IN KUWAIT', 540, 880, 30, '#bdb8b3', { op: b });
  s += big('We’ll keep it safe.', 540, 1060, 84, '#fff', { op: b });
  s += `<g transform="translate(540 1230) scale(${f(c)}) translate(-540 -1230)"><rect x="270" y="1170" width="540" height="120" rx="60" fill="${C.red}"/>${big('Comment START', 540, 1250, 58, '#fff', { ls: -1 })}</g>`;
  return s;
}

module.exports = {
  dur: DUR,
  frame(t) {
    let s = defs;
    s += t < TURN ? hookScene(t) : t < END ? turnScene(t) : endCard(t);
    // card wipe into end, and loop crossfade back to frame 0
    const w = seg(t, END - .2, END);
    if (w > 0 && w < 1) s += `<rect x="0" y="${f(1920 * (1 - eo(w)))}" width="1080" height="1920" fill="${INK}"/>`;
    const lp = seg(t, DUR - .3, DUR);
    if (lp > 0) s += `<g opacity="${f(lp)}">${hookScene(0)}</g>`;
    return s;
  },
};
