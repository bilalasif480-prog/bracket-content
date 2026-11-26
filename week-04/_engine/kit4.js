// kit4.js: shared helpers for the week-04 reels (instamake, 26 Nov 2026).
// Rules baked in: frame 0 is already moving and the hook is fully visible at 0.0 s (no fade/blur-in),
// end card = [ BRACKET ] + "Comment START" only, last 0.3 s crossfades to frame 0 so the reel loops.
const C = { ink: '#201e1d', red: '#ec3013', peach: '#ff8360', paper: '#f3f2f2', white: '#ffffff', green: '#1fa86b', navy: '#0f1b33', grey: '#6d655e', blue: '#1a73e8', wa: '#25d366', waBg: '#efe7de', waOut: '#d9fdd3' };
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const seg = (t, a, b) => clamp((t - a) / (b - a));
const eo = k => 1 - Math.pow(1 - clamp(k), 3);
const eio = k => { k = clamp(k); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
const eb = k => { k = clamp(k); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
const f = n => (+n).toFixed(2);
const esc = s => String(s).replace(/&(?!amp;|lt;|gt;|#)/g, '&amp;').replace(/</g, '&lt;');

// text: font 'A' Archivo 900 (default), 'A8' Archivo 800, 'I' Archivo 800 italic, 'U' Inter, 'M' JetBrains Mono
function T(s, x, y, size, col, o = {}) {
  const font = o.font || 'A';
  let fam = 'Archivo', w = 900, st = '';
  if (font === 'A8') w = 800;
  if (font === 'I') { w = 800; st = ' font-style="italic"'; }
  if (font === 'U') { fam = 'Inter'; w = o.w || 400; }
  if (font === 'M') { fam = 'JB'; w = 700; }
  const ls = o.ls ?? (font === 'M' ? 3 : font === 'U' ? 0 : -3);
  return `<text x="${f(x)}" y="${f(y)}" font-family="${fam}" font-weight="${w}"${st} font-size="${size}" fill="${col}" text-anchor="${o.a || 'middle'}" letter-spacing="${ls}" opacity="${f(o.op ?? 1)}"${o.extra || ''}>${o.raw ? s : esc(s)}</text>`;
}
const big = (s, x, y, size, col, o = {}) => T(s, x, y, size, col, o);
const ui = (s, x, y, size, col, o = {}) => T(s, x, y, size, col, { a: 'start', ...o, font: 'U' });
const mono = (s, x, y, size, col, o = {}) => T(s, x, y, size, col, { ...o, font: 'M' });

const defs = (extra = '') => `<defs>
<filter id="sh" x="-15%" y="-15%" width="130%" height="140%"><feDropShadow dx="0" dy="24" stdDeviation="26" flood-color="#000" flood-opacity=".28"/><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity=".15"/></filter>
<filter id="sh2" x="-15%" y="-15%" width="130%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000" flood-opacity=".18"/></filter>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
<clipPath id="ph"><rect x="0" y="0" width="380" height="780" rx="46"/></clipPath>
${extra}</defs>`;

// phone 380x780 at (x,y) scaled. content(local) is drawn below the status bar at y=50.
// o.dark, o.url (adds browser bar, content then starts at y=108), o.time, o.chip [text, colour]
function phone(x, y, sc, content, o = {}) {
  const bgc = o.dark ? '#0b0b0c' : (o.bg || '#fff'), fg = o.dark ? '#fff' : C.ink;
  let s = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(sc)})"${o.rot ? '' : ''}><rect x="-14" y="-14" width="408" height="808" rx="58" fill="#151414" filter="url(#sh)"/>`;
  s += `<g clip-path="url(#ph)"><rect width="380" height="780" fill="${bgc}"/>`;
  s += ui(o.time || '9:41', 34, 36, 17, fg, { w: 700 }) + `<rect x="322" y="24" width="30" height="14" rx="4" fill="none" stroke="${fg}" stroke-width="2"/><rect x="325" y="27" width="20" height="8" rx="2" fill="${fg}"/>`;
  if (o.url) {
    s += `<rect x="14" y="52" width="352" height="44" rx="14" fill="${o.dark ? '#222' : '#f0ece8'}"/>`;
    if (o.lock !== false) s += `<g transform="translate(36 74) scale(.62)"><rect x="-11" y="-2" width="22" height="17" rx="3.5" fill="${o.lockCol || '#6d655e'}"/><path d="M-7 -2 V-7 a7 7 0 0 1 14 0 V-2" fill="none" stroke="${o.lockCol || '#6d655e'}" stroke-width="3.2"/></g>`;
    s += ui(o.url, o.lock === false ? 30 : 52, 81, 16, fg, { w: 600 });
    if (o.chip) { const w = o.chip[0].length * 10 + 22; s += `<rect x="${358 - w}" y="62" width="${w}" height="26" rx="13" fill="${o.chip[1]}"/>` + mono(o.chip[0], 358 - w / 2, 80, 13, '#fff', { ls: 1 }); }
    s += `<g transform="translate(0 106)">${content}</g>`;
  } else s += `<g transform="translate(0 50)">${content}</g>`;
  s += `</g><rect x="140" y="-4" width="100" height="26" rx="13" fill="#151414"/></g>`;
  return s;
}

// a finger/thumb pointing up-left at (x,y) = fingertip. press 0..1 squashes it.
function finger(x, y, sc = 1, press = 0, rot = -18) {
  const p = 1 - .08 * Math.sin(Math.PI * clamp(press));
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${f(sc * p)})" filter="url(#sh2)">
<path d="M-34 0 Q-36 -2 -34 -30 Q-30 -62 0 -62 Q30 -62 34 -30 Q36 -2 34 0 L40 260 L-40 260 Z" fill="#e9b796"/>
<path d="M-24 -6 Q-24 -46 0 -48 Q24 -46 24 -6 Q20 10 0 12 Q-20 10 -24 -6 Z" fill="#f6d7c3" transform="translate(0 -8)"/>
</g>`;
}
const ripple = (x, y, k, col = '#fff') => k <= 0 || k >= 1 ? '' : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(16 + 60 * eo(k))}" fill="none" stroke="${col}" stroke-width="${f(6 * (1 - k))}" opacity="${f(1 - k)}"/>`;
const tick = (x, y, r, k, col = C.green) => k <= 0 ? '' : `<g transform="translate(${f(x)} ${f(y)}) scale(${f(eb(k))})"><circle r="${r}" fill="${col}"/><path d="M${-r * .42} ${r * .02} L${-r * .1} ${r * .34} L${r * .46} ${-r * .3}" stroke="#fff" stroke-width="${r * .22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const cross = (x, y, r, k, col = C.red) => k <= 0 ? '' : `<g transform="translate(${f(x)} ${f(y)}) scale(${f(eb(k))})"><circle r="${r}" fill="${col}"/><path d="M${-r * .32} ${-r * .32} L${r * .32} ${r * .32} M${r * .32} ${-r * .32} L${-r * .32} ${r * .32}" stroke="#fff" stroke-width="${r * .2}" stroke-linecap="round"/></g>`;
function spinner(x, y, r, t, col = '#999', w = 8) {
  const a = (t * 400) % 360;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"><circle r="${r}" fill="none" stroke="${col}" stroke-opacity=".2" stroke-width="${w}"/><path d="M0 ${-r} A${r} ${r} 0 0 1 ${r} 0" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/></g>`;
}
// chat bubble. side 'in'|'out'. lines = array of strings. returns height via .h on a wrapper object
function bubble(x, y, w, lines, side, o = {}) {
  const lh = o.lh || 30, size = o.size || 22, h = lines.length * lh + 34 + (o.time ? 14 : 0);
  const col = side === 'out' ? (o.outCol || C.waOut) : (o.inCol || '#fff');
  const bx = side === 'out' ? x - w : x;
  let s = `<g transform="translate(0 0)"><rect x="${f(bx)}" y="${f(y)}" width="${w}" height="${h}" rx="18" fill="${col}" filter="url(#sh2)"/>`;
  lines.forEach((l, i) => { s += ui(l, bx + 18, y + 34 + i * lh, size, o.fg || C.ink, { w: o.w || 400 }); });
  if (o.time) s += ui(o.time, bx + w - 14, y + h - 12, 14, '#8a8580', { a: 'end' });
  return s + '</g>';
}
// iOS-style notification banner (local width w)
function notif(x, y, w, app, title, body, o = {}) {
  let s = `<g transform="translate(${f(x)} ${f(y)})"><rect width="${w}" height="${o.h || 118}" rx="26" fill="${o.bg || '#fff'}" fill-opacity="${o.op ?? .96}" filter="url(#sh2)"/>`;
  s += `<rect x="18" y="20" width="44" height="44" rx="11" fill="${o.icon || C.wa}"/>` + (o.glyph || '');
  s += ui(app.toUpperCase(), 76, 38, 15, '#8a8580', { w: 600, ls: .5 }) + ui(o.when || 'now', w - 20, 38, 15, '#8a8580', { a: 'end' });
  s += ui(title, 76, 66, 21, C.ink, { w: 700 }) + ui(body, 76, 94, 20, '#3a3532');
  return s + '</g>';
}
const chip = (s, x, y, col = C.ink, fg = '#fff', size = 22) => { const w = s.length * size * .64 + 28; return `<rect x="${f(x - w / 2)}" y="${f(y - size - 8)}" width="${f(w)}" height="${size + 22}" rx="${(size + 22) / 2}" fill="${col}"/>` + mono(s, x, y + 2, size, fg, { ls: 1 }); };
// "THIS is a ____." label (hooks-bank #10), centred, pops in at `at`
function lesson(t, at, lead, word, y = 960, col = C.peach, bg = 'rgba(0,0,0,.0)') {
  const k = eb(seg(t, at, at + .3)); if (k <= 0) return '';
  return `<g transform="translate(540 ${y}) scale(${f(k)}) translate(-540 ${-y})">${big(lead, 540, y - 70, 64, '#fff', { ls: -1 })}${big(word, 540, y + 60, 130, col, { ls: -5 })}</g>`;
}
// stacked hook text block. lines: [[text, colour], ...]; fully visible at t=0; gentle breathing scale keeps it alive.
function hook(t, lines, y, size, o = {}) {
  const lh = o.lh || size * 1.02, pulse = 1 + .015 * Math.sin(t * 5);
  let s = `<g transform="translate(540 ${f(y)}) scale(${f(pulse * (o.sc || 1))}) translate(-540 ${f(-y)})">`;
  if (o.bar) s += `<rect x="${o.bar[0]}" y="${f(y - size * .95)}" width="${1080 - 2 * o.bar[0]}" height="${f(lh * lines.length + size * .4)}" rx="${o.bar[2] ?? 18}" fill="${o.bar[1]}"/>`;
  lines.forEach(([txt, col], i) => { s += big(txt, 540, y + i * lh, size, col, { ls: o.ls ?? -3 }); });
  return s + '</g>';
}
// end card: ONLY the [ BRACKET ] logo + Comment START pill (Bilal 26 Nov 17:12)
function endCard(t, END, o = {}) {
  const u = t - END, bg = o.bg || C.ink;
  let s = `<rect width="1080" height="1920" fill="${bg}"/>`;
  const a = eb(seg(u, 0, .35)), c = eb(seg(u, .25, .55));
  const bc = o.bracket || C.red, bc2 = o.bracket2 || C.peach;
  s += `<g transform="translate(540 820) scale(${f(Math.max(a, .001))}) translate(-540 -820)"><text x="540" y="866" font-family="Archivo" font-weight="900" font-size="140" text-anchor="middle" letter-spacing="-4" fill="#fff"><tspan fill="${bc}">[</tspan> BRACKET <tspan fill="${bc2}">]</tspan></text></g>`;
  s += `<g transform="translate(540 1080) scale(${f(Math.max(c, .001))}) translate(-540 -1080)"><rect x="250" y="1016" width="580" height="128" rx="64" fill="${o.pill || C.red}"/>${big('Comment START', 540, 1102, 62, '#fff', { ls: -1 })}</g>`;
  // pulse ring on the pill to keep the end card moving
  const p = ((u - .6) * 1.2) % 1;
  if (u > .6) s += `<rect x="${f(250 - 30 * p)}" y="${f(1016 - 30 * p)}" width="${f(580 + 60 * p)}" height="${f(128 + 60 * p)}" rx="${f(64 + 30 * p)}" fill="none" stroke="${o.pill || C.red}" stroke-width="5" opacity="${f(1 - p)}"/>`;
  return s;
}
// wraps a reel: main(t) before END, end card after; red wipe into the end card; last 0.3 s crossfades to frame 0.
function reel(DUR, END, main, defsExtra = '', endOpts = {}) {
  return {
    dur: DUR,
    frame(t) {
      let s = defs(defsExtra) + (t >= END ? endCard(t, END, endOpts) : main(t));
      const w = seg(t, END - .22, END);
      if (w > 0 && w < 1) s += `<rect x="0" y="${f(1920 * (1 - eo(w)))}" width="1080" height="1920" fill="${endOpts.bg || C.ink}"/>`;
      const lp = seg(t, DUR - .3, DUR);
      if (lp > 0) s += `<g opacity="${f(lp)}">${main(0)}</g>`;
      return s;
    },
  };
}
// shake offset for "error" moments
const shake = (t, a, b, amp = 14) => (t > a && t < b) ? Math.sin((t - a) * 70) * amp * (1 - seg(t, a, b)) : 0;

module.exports = { C, clamp, lerp, seg, eo, eio, eb, f, esc, T, big, ui, mono, defs, phone, finger, ripple, tick, cross, spinner, bubble, notif, chip, lesson, hook, endCard, reel, shake };

// DEMO café page, local width 380. o.k: 0 = skeleton (loading), 1 = loaded. o.btn 'idle'|'press'|'booked'. o.t for shimmer.
function cafePage(o = {}) {
  const k = o.k ?? 1, t = o.t || 0, name = o.name || 'Northern Bean';
  let s = `<rect width="380" height="740" fill="#fffaf6"/>`;
  if (k < 1) {
    const sh = (t * 1.4) % 1;
    const bl = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#e9e4df"/>`;
    s += `<g opacity="${f(1 - k)}">${bl(20, 20, 150, 26)}${bl(16, 66, 348, 220)}${bl(20, 306, 300, 30)}${bl(20, 346, 220, 30)}${bl(20, 400, 170, 54)}${bl(16, 480, 108, 130)}${bl(136, 480, 108, 130)}${bl(256, 480, 108, 130)}
    <rect x="${f(-200 + 780 * sh)}" y="0" width="120" height="740" fill="#fff" opacity=".55" transform="skewX(-20)"/></g>`;
    if (k <= 0) return s;
  }
  s += `<g opacity="${f(k)}">`;
  s += T(name, 20, 44, 24, C.ink, { a: 'start', ls: -.5 }) + `<rect x="318" y="26" width="40" height="4" rx="2" fill="${C.ink}"/><rect x="318" y="36" width="40" height="4" rx="2" fill="${C.ink}"/>`;
  s += `<rect x="16" y="66" width="348" height="220" rx="16" fill="url(#cafeHero)"/>`;
  s += `<g><ellipse cx="270" cy="250" rx="62" ry="12" fill="#000" opacity=".15"/><path d="M226 180 h88 v44 a30 30 0 0 1 -30 30 h-28 a30 30 0 0 1 -30 -30 Z" fill="#fff8f3"/><path d="M314 192 a16 16 0 0 1 0 30" fill="none" stroke="#fff8f3" stroke-width="7"/><ellipse cx="270" cy="180" rx="44" ry="8" fill="#6b3e26"/></g>`;
  s += T('Fresh coffee,', 20, 328, 32, C.ink, { a: 'start', ls: -1 }) + T('made in Manchester.', 20, 364, 32, C.ink, { a: 'start', ls: -1 });
  s += ui('Open today 8:00–17:00 · Ancoats', 20, 394, 16, C.grey);
  const b = o.btn || 'idle', pr = b === 'press' ? .95 : 1, bc = b === 'booked' ? C.green : C.red;
  s += `<g transform="translate(110 438) scale(${pr}) translate(-110 -438)"><rect x="20" y="412" width="190" height="56" rx="28" fill="${bc}"/>${ui(b === 'booked' ? 'Booked ✓' : 'Book a table', 115, 447, 19, '#fff', { w: 700, a: 'middle' })}</g>`;
  s += `<rect x="222" y="412" width="138" height="56" rx="28" fill="none" stroke="${C.ink}" stroke-width="2"/>` + ui('Menu', 291, 447, 19, C.ink, { w: 600, a: 'middle' });
  ['Flat white', 'Brunch', 'Cakes'].forEach((m, i) => {
    const x = 16 + i * 120;
    s += `<rect x="${x}" y="490" width="108" height="130" rx="12" fill="${['#f3dfd2', '#efe5dc', '#f7d9c9'][i]}"/><circle cx="${x + 54}" cy="540" r="28" fill="${['#c9805a', '#e9b44c', '#b65a3c'][i]}" opacity=".85"/>` + ui(m, x + 54, 600, 15, C.ink, { w: 600, a: 'middle' });
  });
  return s + '</g>';
}
const cafeDefs = `<linearGradient id="cafeHero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb08f"/><stop offset=".6" stop-color="#e2673f"/><stop offset="1" stop-color="#8a3218"/></linearGradient>`;
module.exports.cafePage = cafePage; module.exports.cafeDefs = cafeDefs;
