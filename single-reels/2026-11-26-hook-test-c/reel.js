// Hook test C (instamake, 26 Nov 2026): hooks-bank "Satisfying build / reveal".
// Bold colour-block look: peach background, ink text, chunky shapes. A DEMO barber site builds itself block by block
// on a laptop + phone (already moving at frame 0) · 5.2 tap "Book now" on the phone → 5.45 "Booked ✓", "Yours next?"
// · 7.0–8.5 end card · last 0.3 s crossfades to frame 0. Pop times in POPS (build.py uses the same list).
// Render from week-03/_engine:  OUTNAME=hook-test-c node render.js ../../single-reels/2026-11-26-hook-test-c/reel
const { C, clamp, seg, eo, eb, f } = require('../../week-03/_engine/lib');
const TAP = 5.2, END = 7.0, DUR = 8.5;
const INK = C.ink, PEACH = C.peach, RED = C.red, G = C.green;
// block start times: header, hero, headline, 3 cards, hours, book button
const POPS = [-0.25, -0.12, 1.0, 1.55, 1.95, 2.35, 2.9, 3.5];
const big = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="Archivo" font-weight="${o.w || 900}" font-size="${size}" fill="${col}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? -2}" opacity="${f(o.op ?? 1)}">${s}</text>`;
const mono = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="JB" font-weight="700" font-size="${size}" fill="${col}" text-anchor="${o.a || 'start'}" letter-spacing="${o.ls ?? 1}" opacity="${f(o.op ?? 1)}">${s}</text>`;
const defs = `<defs><filter id="hs" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="14" stdDeviation="0" flood-color="#201e1d" flood-opacity=".9"/></filter>
<clipPath id="lap"><rect x="0" y="0" width="720" height="450" rx="6"/></clipPath><clipPath id="ph"><rect x="0" y="0" width="226" height="496" rx="30"/></clipPath></defs>`;

// pop a block in: flies up from below with a bounce; cx,cy = centre for the scale
function blk(t, a, cx, cy, inner, dy = 90) {
  const k = eb(seg(t, a, a + .38)); if (k <= 0) return '';
  const op = clamp(seg(t, a, a + .12));
  return `<g opacity="${f(op)}" transform="translate(0 ${f(dy * (1 - k))}) translate(${f(cx)} ${f(cy)}) scale(${f(.55 + .45 * k)}) translate(${f(-cx)} ${f(-cy)})">${inner}</g>`;
}
const pole = (x, y, w, h) => { // chunky barber pole
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}" fill="#fff"/>`;
  for (let i = 0; i < 4; i++) s += `<rect x="${x}" y="${y + 10 + i * h / 4}" width="${w}" height="${h / 9}" fill="${RED}" transform="skewY(-20)" transform-origin="${x + w / 2} ${y + 10 + i * h / 4}"/>`;
  return s + `<rect x="${x - 6}" y="${y - 12}" width="${w + 12}" height="16" rx="8" fill="${INK}"/><rect x="${x - 6}" y="${y + h - 4}" width="${w + 12}" height="16" rx="8" fill="${INK}"/>`;
};
const booked = t => seg(t, TAP + .25, TAP + .4);

function desktop(t) {
  let s = `<rect x="0" y="0" width="720" height="450" fill="#fffaf6"/>`;
  s += blk(t, POPS[0], 360, 28, `<rect x="0" y="0" width="720" height="56" fill="#fff"/><rect x="0" y="54" width="720" height="3" fill="${INK}"/>${big('Your Barber', 22, 38, 28, INK, { a: 'start', ls: -1 })}
    <rect x="200" y="17" width="66" height="24" rx="6" fill="${RED}"/>${mono('DEMO', 211, 35, 15, '#fff')}${mono('CUTS', 470, 35, 15, INK)}${mono('HOURS', 545, 35, 15, INK)}${mono('FIND US', 630, 35, 15, INK)}`, -70);
  s += blk(t, POPS[1], 230, 170, `<rect x="20" y="72" width="420" height="196" rx="18" fill="${INK}"/>${pole(56, 100, 34, 140)}
    <circle cx="300" cy="170" r="62" fill="${PEACH}"/><rect x="250" y="190" width="100" height="58" rx="14" fill="#fff"/><rect x="232" y="236" width="136" height="18" rx="9" fill="${PEACH}"/>
    ${mono('PHOTO', 380, 92, 13, '#fff', { op: .5 })}`);
  s += blk(t, POPS[2], 580, 140, `${big('Sharp cuts', 458, 112, 32, INK, { a: 'start', ls: -1.2 })}${big('in Manchester.', 458, 148, 32, INK, { a: 'start', ls: -1.2 })}
    <rect x="458" y="164" width="180" height="10" rx="5" fill="#e6dcd4"/>`, 60);
  ['Skin fade', 'Beard trim', 'Hot towel shave'].forEach((n, i) => {
    const x = 20 + i * 232;
    s += blk(t, POPS[3 + i], x + 108, 335, `<rect x="${x}" y="290" width="216" height="94" rx="14" fill="#fff" stroke="${INK}" stroke-width="3"/>
      ${big(n, x + 16, 324, 22, INK, { a: 'start', ls: -.5 })}${mono('from', x + 16, 362, 15, '#8a8078')}<rect x="${x + 70}" y="349" width="70" height="18" rx="9" fill="#e6dcd4"/>`);
  });
  s += blk(t, POPS[6], 360, 418, `<rect x="20" y="400" width="680" height="38" rx="10" fill="${PEACH}"/>${mono('OPEN MON–SAT · WALK-INS WELCOME', 40, 425, 15, INK)}`);
  const bk = booked(t);
  s += blk(t, POPS[7], 560, 222, `<rect x="460" y="196" width="200" height="54" rx="27" fill="${bk > .5 ? G : RED}" filter="url(#hs)"/>${big(bk > .5 ? 'Booked ✓' : 'Book now', 560, 232, 24, '#fff', { ls: -.5 })}`, 40);
  return s;
}
function mobile(t) {
  let s = `<rect x="0" y="0" width="226" height="496" fill="#fffaf6"/>`;
  const d = .08;
  s += blk(t, POPS[0] + d, 113, 50, `<rect x="0" y="0" width="226" height="74" fill="#fff"/><rect x="0" y="72" width="226" height="3" fill="${INK}"/>${big('Your Barber', 16, 56, 20, INK, { a: 'start', ls: -.5 })}<rect x="160" y="40" width="50" height="20" rx="5" fill="${RED}"/>${mono('DEMO', 167, 55, 11, '#fff')}`, -60);
  s += blk(t, POPS[1] + d, 113, 140, `<rect x="12" y="86" width="202" height="110" rx="14" fill="${INK}"/>${pole(30, 104, 20, 76)}<circle cx="140" cy="136" r="34" fill="${PEACH}"/><rect x="112" y="150" width="56" height="34" rx="8" fill="#fff"/>`);
  s += blk(t, POPS[2] + d, 113, 220, `${big('Sharp cuts in', 14, 222, 21, INK, { a: 'start', ls: -.8 })}${big('Manchester.', 14, 246, 21, INK, { a: 'start', ls: -.8 })}`, 50);
  ['Skin fade', 'Beard trim', 'Hot towel shave'].forEach((n, i) => {
    const y = 262 + i * 42;
    s += blk(t, POPS[3 + i] + d, 113, y + 18, `<rect x="12" y="${y}" width="202" height="36" rx="10" fill="#fff" stroke="${INK}" stroke-width="2.5"/>${big(n, 24, y + 24, 14, INK, { a: 'start', ls: 0, w: 800 })}${mono('from', 140, y + 23, 10, '#8a8078')}<rect x="172" y="${y + 13}" width="30" height="11" rx="5" fill="#e6dcd4"/>`);
  });
  s += blk(t, POPS[6] + d, 113, 400, `<rect x="12" y="390" width="202" height="22" rx="7" fill="${PEACH}"/>${mono('OPEN MON–SAT', 24, 405, 10, INK)}`);
  const bk = booked(t), press = 1 - .06 * (seg(t, TAP - .05, TAP + .05) - seg(t, TAP + .1, TAP + .2));
  s += blk(t, POPS[7] + d, 113, 452, `<g transform="translate(113 452) scale(${f(press)}) translate(-113 -452)"><rect x="12" y="424" width="202" height="56" rx="28" fill="${bk > .5 ? G : RED}" filter="url(#hs)"/>${big(bk > .5 ? 'Booked ✓' : 'Book now', 113, 461, 24, '#fff', { ls: -.5 })}</g>`, 40);
  return s;
}

function devices(t) {
  let s = '';
  // laptop
  s += `<rect x="44" y="456" width="752" height="482" rx="24" fill="${INK}"/>`;
  s += `<g transform="translate(60 472)"><g clip-path="url(#lap)">${desktop(t)}</g></g>`;
  s += `<path d="M14 938 H826 L800 982 H40 Z" fill="${INK}"/><rect x="360" y="938" width="120" height="10" rx="5" fill="#4a4543"/>`;
  // phone (overlaps the laptop's right corner)
  const PX = 790, PY = 660;
  s += `<rect x="${PX - 12}" y="${PY - 12}" width="250" height="520" rx="42" fill="${INK}" filter="url(#hs)"/>`;
  s += `<g transform="translate(${PX} ${PY})"><g clip-path="url(#ph)">${mobile(t)}</g></g><rect x="${PX + 78}" y="${PY + 4}" width="70" height="16" rx="8" fill="${INK}"/>`;
  // tap ripple + finger dot on the phone's Book now
  const bx = PX + 113, by = PY + 452;
  const r = seg(t, TAP, TAP + .5);
  if (t > TAP - .45 && t < TAP + .3) {
    const m = eo(seg(t, TAP - .45, TAP));
    s += `<circle cx="${f(bx + 60 * (1 - m))}" cy="${f(by + 120 * (1 - m))}" r="26" fill="#fff" opacity=".85" stroke="${INK}" stroke-width="4"/>`;
  }
  if (r > 0 && r < .7) s += `<circle cx="${bx}" cy="${by}" r="${f(30 + 90 * eo(r))}" fill="none" stroke="#fff" stroke-width="${f(8 * (1 - r))}"/>`;
  return s;
}

function backdrop(t) {
  let s = `<rect width="1080" height="1920" fill="${PEACH}"/>`;
  s += `<circle cx="${f(980 + Math.sin(t * 1.3) * 20)}" cy="${f(1700 + Math.cos(t) * 16)}" r="230" fill="${INK}"/>`;
  s += `<rect x="-80" y="${f(1450 + Math.sin(t * 1.6) * 14)}" width="380" height="380" rx="60" fill="#fff" transform="rotate(${f(-12 + Math.sin(t) * 3)} 110 1640)"/>`;
  s += `<circle cx="${f(70)}" cy="${f(430 + Math.sin(t * 2) * 10)}" r="34" fill="${RED}"/>`;
  return s;
}

function main(t) {
  let s = backdrop(t);
  // hook text (frame 0) → "Yours next?" after the booking
  const sw = seg(t, TAP + .35, TAP + .6);
  if (sw < 1) {
    const o = 1 - clamp(sw * 2.5);
    s += big('Watch a website', 540, 170, 92, INK, { op: o, ls: -3 }) + big('build itself', 540, 262, 92, INK, { op: o, ls: -3 });
    s += `<g opacity="${f(o)}"><rect x="198" y="292" width="684" height="104" rx="16" fill="${INK}"/>${big('in 7 seconds.', 540, 374, 92, '#fff', { ls: -3 })}</g>`;
  }
  // build progress bar
  s += `<g transform="translate(0 170)">`;
  const pr = clamp(seg(t, 0, POPS[7] + .4));
  s += `<rect x="44" y="1030" width="752" height="22" rx="11" fill="#fff" opacity=".55"/><rect x="44" y="1030" width="${f(752 * Math.max(.04, pr))}" height="22" rx="11" fill="${INK}"/>`;
  s += mono(pr < 1 ? 'BUILDING…' : 'LIVE', 44, 1090, 28, INK, { ls: 3 });
  s += devices(t) + `</g>`;
  if (sw > 0) {
    const k = eb(sw);
    s += `<g transform="translate(540 260) scale(${f(k)}) translate(-540 -260)"><rect x="110" y="130" width="860" height="250" rx="24" fill="${INK}"/>${big('Yours next?', 540, 290, 132, '#fff', { ls: -4 })}</g>`;
  }
  return s;
}

function endCard(t) {
  const u = t - END;
  let s = `<rect width="1080" height="1920" fill="${PEACH}"/>`;
  s += `<circle cx="${f(960 + Math.sin(t * 1.3) * 20)}" cy="1600" r="230" fill="${INK}"/><rect x="-80" y="1290" width="380" height="380" rx="60" fill="#fff" transform="rotate(-12 110 1480)"/>`;
  const a = eb(seg(u, 0, .35)), b = eo(seg(u, .15, .45)), c = eb(seg(u, .3, .6));
  s += `<g transform="translate(540 760) scale(${f(a)}) translate(-540 -760)"><text x="540" y="800" font-family="Archivo" font-weight="900" font-size="128" text-anchor="middle" letter-spacing="-4" fill="${INK}"><tspan fill="${RED}">[</tspan> BRACKET <tspan fill="#fff">]</tspan></text></g>`;
  s += mono('SOFTWARE HOUSE · BASED IN KUWAIT', 540, 880, 30, INK, { a: 'middle', ls: 3, op: b });
  s += big('We’ll build it for you.', 540, 1060, 80, INK, { op: b, ls: -3 });
  s += `<g transform="translate(540 1230) scale(${f(c)}) translate(-540 -1230)"><rect x="270" y="1170" width="540" height="120" rx="60" fill="${INK}"/>${big('Comment START', 540, 1250, 58, '#fff', { ls: -1 })}</g>`;
  return s;
}

module.exports = {
  dur: DUR, POPS, TAP, END,
  frame(t) {
    let s = defs + (t < END ? main(t) : endCard(t));
    const w = seg(t, END - .2, END);
    if (w > 0 && w < 1) s += `<rect x="${f(-1080 + 1080 * eo(w))}" y="0" width="1080" height="1920" fill="${INK}"/>`;
    const lp = seg(t, DUR - .3, DUR);
    if (lp > 0) s += `<g opacity="${f(lp)}">${main(0)}</g>`;
    return s;
  },
};
