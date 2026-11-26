// Hook test D (instamake, 26 Nov 2026): "My process in 4 steps", first person, built by hand (Bilal 26 Nov 10:36).
// Light paper/peach look, realistic UI (Inter), no cartoon. One calm voice line (build.py), original music + UI SFX.
// 0 hook "I build websites for UK cafés. Here's how." over a live video call + notepad being written
// 1.0 step 1 We talk · 2.6 step 2 I write + design (typing, colour pick) · 4.4 step 3 preview link + "Love it!"
// 6.0 step 4 It goes live (Book a table → Booked ✓) · 7.8–9.4 end card · last 0.3 s crossfades to frame 0.
// Render from week-03/_engine:  OUTNAME=hook-test-d node render.js ../../single-reels/2026-11-26-hook-test-d/reel
const { C, clamp, seg, eo, eb, f } = require('../../week-03/_engine/lib');
const DUR = 9.4, END = 7.8;
const S = [0, 2.6, 4.4, 6.0, END]; // scene starts: call, design, preview, live
const INK = C.ink, PAPER = '#f6efe9', UI = 'Inter';
const esc = s => s.replace(/&/g, '&amp;');
const ui = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="${UI}" font-weight="${o.w || 400}" font-size="${size}" fill="${col}" text-anchor="${o.a || 'start'}" letter-spacing="${o.ls ?? 0}" opacity="${f(o.op ?? 1)}">${esc(s)}</text>`;
const big = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="Archivo" font-weight="900" font-size="${size}" fill="${col}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? -3}" opacity="${f(o.op ?? 1)}">${s}</text>`;
const mono = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="JB" font-weight="700" font-size="${size}" fill="${col}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? 3}" opacity="${f(o.op ?? 1)}">${esc(s)}</text>`;
const cursor = (x, y, s = 1, name = 'Me') => `<g transform="translate(${f(x)} ${f(y)})"><g transform="scale(${f(s * 1.5)})"><path d="M0 0 L0 23 L6 17.5 L10 26.5 L14 24.8 L10 16 L18 16 Z" fill="${C.red}" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/></g>${name ? `<rect x="26" y="34" width="${name.length * 15 + 26}" height="36" rx="8" fill="${C.red}"/>${ui(name, 39, 59, 21, '#fff', { w: 700 })}` : ''}</g>`;
const ripple = (x, y, k, col = INK) => k <= 0 || k >= 1 ? '' : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(14 + 50 * eo(k))}" fill="none" stroke="${col}" stroke-width="${f(5 * (1 - k))}" opacity="${f(1 - k)}"/>`;
const touch = (x, y, k) => k <= 0 ? '' : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(30 - 6 * Math.sin(Math.PI * clamp(k)))}" fill="#fff" fill-opacity=".55" stroke="${INK}" stroke-opacity=".35" stroke-width="3"/>`;
const tick = (x, y, r, k, col = C.green) => k <= 0 ? '' : `<g transform="translate(${f(x)} ${f(y)}) scale(${f(eb(k))})"><circle r="${r}" fill="${col}"/><path d="M${-r * .42} ${r * .02} L${-r * .1} ${r * .34} L${r * .46} ${-r * .3}" stroke="#fff" stroke-width="${r * .22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;

const defs = `<defs>
<filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="#5a3a2a" flood-opacity=".22"/><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity=".12"/></filter>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf6f2"/><stop offset="1" stop-color="#f6e4d9"/></linearGradient>
<linearGradient id="vid1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6b4a3a"/><stop offset="1" stop-color="#2e2522"/></linearGradient>
<linearGradient id="vid2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3f4a"/><stop offset="1" stop-color="#1f2228"/></linearGradient>
<linearGradient id="heroA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9b3ad"/><stop offset="1" stop-color="#8f8882"/></linearGradient>
<linearGradient id="heroB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb08f"/><stop offset=".6" stop-color="#e2673f"/><stop offset="1" stop-color="#8a3218"/></linearGradient>
<clipPath id="cw"><rect x="0" y="0" width="960" height="540" rx="26"/></clipPath>
<clipPath id="dw"><rect x="0" y="0" width="960" height="790" rx="22"/></clipPath>
<clipPath id="ph"><rect x="0" y="0" width="380" height="780" rx="46"/></clipPath>
<clipPath id="ab"><rect x="0" y="0" width="300" height="560"/></clipPath>
</defs>`;

// ---------- the DEMO café page (local coords, width w) ----------
// o: { hero: 0..1 (grey→peach), head: string, caret, btn: 'idle'|'press'|'booked', sunday }
function cafePage(w, o = {}) {
  const sc = w / 360;
  let s = `<g transform="scale(${f(sc)})"><rect width="360" height="900" fill="#fffaf6"/>`;
  s += `<text x="20" y="40" font-family="Archivo" font-weight="900" font-size="20" fill="${INK}" letter-spacing="-.5">Your Café</text>`;
  s += `<rect x="300" y="24" width="40" height="4" rx="2" fill="${INK}"/><rect x="300" y="33" width="40" height="4" rx="2" fill="${INK}"/>`;
  // hero image
  const hk = o.hero ?? 1;
  s += `<rect x="16" y="60" width="328" height="210" rx="16" fill="url(#heroA)"/>`;
  if (hk > 0) s += `<rect x="16" y="60" width="328" height="210" rx="16" fill="url(#heroB)" opacity="${f(hk)}"/>`;
  // cup + steam on the hero (photo-ish shapes)
  s += `<g opacity=".9"><ellipse cx="250" cy="226" rx="62" ry="12" fill="#000" opacity=".15"/><path d="M206 160 h88 v44 a30 30 0 0 1 -30 30 h-28 a30 30 0 0 1 -30 -30 Z" fill="#fff8f3"/><path d="M294 172 a16 16 0 0 1 0 30" fill="none" stroke="#fff8f3" stroke-width="7"/><ellipse cx="250" cy="160" rx="44" ry="8" fill="#6b3e26"/>
  <path d="M236 140 q-8 -12 0 -24 q8 -12 0 -24 M262 140 q-8 -12 0 -24 q8 -12 0 -24" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="4" stroke-linecap="round"/></g>`;
  // headline (typed)
  const head = o.head ?? 'Fresh coffee,|made in Manchester.';
  const L = head.split('|');
  L.forEach((l, i) => { s += `<text x="20" y="${312 + i * 34}" font-family="Archivo" font-weight="900" font-size="30" fill="${INK}" letter-spacing="-1">${esc(l)}</text>`; });
  if (o.caret) { const last = L[L.length - 1]; const cx = 20 + last.length * 15.6; s += `<rect x="${f(cx + 2)}" y="${290 + (L.length - 1) * 34}" width="3" height="30" fill="${C.red}"/>`; }
  s += `<text x="20" y="${380}" font-family="${UI}" font-size="15" fill="#6d655e">Mon–Sat 8:00–17:00${o.sunday ? ' · Sun 9:00–15:00' : ''}</text>`;
  // button
  const b = o.btn || 'idle';
  const pr = b === 'press' ? .96 : 1;
  const bc = b === 'booked' ? C.green : C.red;
  s += `<g transform="translate(110 428) scale(${pr}) translate(-110 -428)"><rect x="20" y="402" width="180" height="52" rx="26" fill="${bc}"/>${ui(b === 'booked' ? 'Booked ✓' : 'Book a table', 110, 435, 18, '#fff', { w: 700, a: 'middle' })}</g>`;
  s += `<rect x="212" y="402" width="128" height="52" rx="26" fill="none" stroke="${INK}" stroke-width="2"/>` + ui('Menu', 276, 435, 18, INK, { w: 600, a: 'middle' });
  // menu cards
  ['Flat white', 'Brunch', 'Cakes'].forEach((m, i) => {
    const x = 16 + i * 112;
    s += `<rect x="${x}" y="480" width="104" height="120" rx="12" fill="${['#f3dfd2', '#efe5dc', '#f7d9c9'][i]}"/><circle cx="${x + 52}" cy="528" r="26" fill="${['#c9805a', '#e9b44c', '#b65a3c'][i]}" opacity=".8"/>` + ui(m, x + 52, 584, 14, INK, { w: 600, a: 'middle' });
  });
  return s + `</g>`;
}

// phone (380x780) at x,y with scale; content fn gets screen width 380
function phone(x, y, sc, url, chip, content) {
  let s = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(sc)})"><rect x="-14" y="-14" width="408" height="808" rx="58" fill="#161515" filter="url(#sh)"/>`;
  s += `<g clip-path="url(#ph)"><rect width="380" height="780" fill="#fff"/>`;
  s += ui('9:41', 34, 38, 17, INK, { w: 700 }) + `<rect x="322" y="26" width="30" height="14" rx="4" fill="none" stroke="${INK}" stroke-width="2"/><rect x="325" y="29" width="20" height="8" rx="2" fill="${INK}"/>`;
  s += `<rect x="14" y="56" width="352" height="44" rx="14" fill="#f0ece8"/>`;
  s += `<g transform="translate(36 78) scale(.62)"><rect x="-11" y="-2" width="22" height="17" rx="3.5" fill="#6d655e"/><path d="M-7 -2 V-7 a7 7 0 0 1 14 0 V-2" fill="none" stroke="#6d655e" stroke-width="3.2"/></g>`;
  s += ui(url, 52, 85, 16, INK, { w: 500 });
  if (chip) s += `<rect x="${366 - chip[0].length * 11 - 26}" y="64" width="${chip[0].length * 11 + 18}" height="28" rx="14" fill="${chip[1]}"/>` + mono(chip[0], 366 - 17 - chip[0].length * 5.5, 84, 14, '#fff', { ls: 1 });
  s += `<g transform="translate(0 110)">${content}</g>`;
  s += `</g><rect x="140" y="-2" width="100" height="26" rx="13" fill="#161515"/></g>`;
  return s;
}

// ---------- scene 1: video call + notepad (stage local, 960 wide) ----------
function callScene(t) {
  let s = `<g filter="url(#sh)"><rect width="960" height="540" rx="26" fill="#1c1b1d"/></g><g clip-path="url(#cw)"><rect width="960" height="540" fill="#1c1b1d"/>`;
  s += `<rect width="960" height="60" fill="#252427"/><circle cx="34" cy="30" r="8" fill="${C.red}" opacity="${f(.55 + .45 * Math.sin(t * 6))}"/>` + ui('Call · 15 min', 54, 38, 21, '#e9e5e1', { w: 600 });
  const sec = 4 + Math.floor(t * 1.2);
  s += ui(`00:${String(sec).padStart(2, '0')}`, 926, 38, 21, '#a8a29d', { w: 600, a: 'end' });
  // tiles
  const tile = (x, grad, init, col, name, speak) => {
    let r = `<rect x="${x}" y="76" width="452" height="372" rx="18" fill="url(#${grad})"/>`;
    if (speak) { const p = (t * 1.6) % 1; r += `<rect x="${x}" y="76" width="452" height="372" rx="18" fill="none" stroke="${C.green}" stroke-width="5"/>` + `<circle cx="${x + 226}" cy="236" r="${f(84 + 30 * p)}" fill="none" stroke="#fff" stroke-opacity="${f(.35 * (1 - p))}" stroke-width="6"/>`; }
    r += `<circle cx="${x + 226}" cy="236" r="84" fill="${col}"/>` + big(init, x + 226, 262, 70, '#fff', { ls: 0 });
    r += `<rect x="${x + 14}" y="398" width="${name.length * 12 + 30}" height="38" rx="10" fill="#000" fill-opacity=".55"/>` + ui(name, x + 29, 424, 20, '#fff', { w: 600 });
    return r;
  };
  const who = Math.floor(t / 0.9) % 2; // who is talking
  s += tile(20, 'vid1', 'YC', C.peach, 'Your Café (DEMO)', who === 0);
  s += tile(488, 'vid2', 'Me', '#4a5160', 'Me', who === 1);
  // controls
  s += [['#3a393c', 400], ['#3a393c', 470], [C.red, 540]].map(([c, x]) => `<circle cx="${x}" cy="494" r="24" fill="${c}"/>`).join('');
  s += `<rect x="393" y="481" width="14" height="22" rx="7" fill="#fff"/><path d="M386 494 a14 14 0 0 0 28 0 M400 508 v6" fill="none" stroke="#fff" stroke-width="3"/>`;
  s += `<rect x="456" y="484" width="22" height="18" rx="4" fill="#fff"/><path d="M478 490 l10 -6 v20 l-10 -6 Z" fill="#fff"/>`;
  s += `<path d="M526 497 q14 -12 28 0" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  s += `</g>`;
  // notepad (handwriting reveals; already writing at frame 0)
  const ny = 560;
  s += `<g transform="translate(40 ${ny}) rotate(-1.5)"><rect width="880" height="250" rx="14" fill="#fff6c8" filter="url(#sh)"/>`;
  for (let i = 0; i < 4; i++) s += `<rect x="24" y="${64 + i * 52}" width="832" height="2" fill="#e7d98f"/>`;
  s += `<rect x="70" y="0" width="2" height="250" fill="#f0a49a"/>`;
  s += ui('Notes: Your Café (DEMO)', 90, 46, 24, '#7a6a2a', { w: 700 });
  const lines = ['Menu + opening hours', 'Book a table online', 'Warm colours, real photos'];
  const starts = [-0.6, 0.5, 1.4], dur = 1.0;
  let pen = null;
  lines.forEach((l, i) => {
    const k = clamp((t - starts[i]) / dur); if (k <= 0) return;
    const n = Math.round(l.length * k);
    s += `<text x="90" y="${104 + i * 52}" font-family="Archivo" font-style="italic" font-weight="800" font-size="34" fill="#2b3a8c" letter-spacing="-.5">• ${esc(l.slice(0, n))}</text>`;
    if (k < 1) pen = [90 + 24 + n * 17.2, 104 + i * 52];
  });
  if (pen) s += `<g transform="translate(${f(pen[0])} ${f(pen[1] + Math.sin(t * 40) * 3)}) rotate(155)"><rect x="-6" y="-92" width="14" height="84" rx="3" fill="${INK}"/><path d="M-6 -8 L1 8 L8 -8 Z" fill="#c9a77a"/><rect x="-6" y="-92" width="14" height="16" fill="${C.red}"/></g>`;
  s += `</g>`;
  return s;
}

// ---------- scene 2: design tool (stage local) ----------
function designScene(t) {
  const u = t - S[1];
  let s = `<g filter="url(#sh)"><rect width="960" height="790" rx="22" fill="#2c2c2c"/></g><g clip-path="url(#dw)"><rect width="960" height="790" fill="#1e1e1e"/>`;
  // toolbar
  s += `<rect width="960" height="56" fill="#2c2c2c"/>` + ['#ff5f57', '#febc2e', '#28c840'].map((c, i) => `<circle cx="${26 + i * 24}" cy="28" r="8" fill="${c}"/>`).join('');
  s += ui('your-cafe · Home', 480, 36, 19, '#d9d9d9', { w: 600, a: 'middle' });
  s += `<rect x="868" y="14" width="74" height="30" rx="8" fill="${C.red}"/>` + ui('Share', 905, 35, 16, '#fff', { w: 700, a: 'middle' });
  // layers panel
  s += `<rect x="0" y="56" width="210" height="734" fill="#2c2c2c"/>` + ui('Layers', 18, 92, 17, '#fff', { w: 700 });
  const layers = ['Home', 'Nav', 'Hero photo', 'Headline', 'Opening hours', 'Book a table', 'Menu'];
  const sel = u < 1.0 ? 3 : 2;
  layers.forEach((l, i) => {
    if (i === sel) s += `<rect x="6" y="${110 + i * 40}" width="198" height="34" rx="6" fill="#0c8ce9" fill-opacity=".35"/>`;
    s += `<rect x="${i ? 34 : 18}" y="${121 + i * 40}" width="12" height="12" rx="2" fill="none" stroke="#9a9a9a" stroke-width="2"/>` + ui(l, i ? 56 : 40, 133 + i * 40, 16, '#e3e3e3', { w: i ? 400 : 700 });
  });
  // properties panel with swatches
  s += `<rect x="750" y="56" width="210" height="734" fill="#2c2c2c"/>` + ui('Fill', 768, 92, 17, '#fff', { w: 700 });
  const sw = ['#8f8882', '#e2673f', '#ff8360', '#2e2522', '#1fa86b'];
  sw.forEach((c, i) => { s += `<rect x="${768 + (i % 3) * 58}" y="${112 + Math.floor(i / 3) * 58}" width="46" height="46" rx="8" fill="${c}"/>`; });
  const picked = u > 1.18;
  if (picked) s += `<rect x="823" y="109" width="52" height="52" rx="10" fill="none" stroke="#fff" stroke-width="3"/>`;
  s += ui('Text', 768, 272, 17, '#fff', { w: 700 }) + ui('Archivo · Black · 30', 768, 304, 15, '#bdbdbd') + ui('Written by me', 768, 334, 15, '#bdbdbd');
  // canvas artboard
  s += mono('HOME · 360', 330, 96, 13, '#9a9a9a', { a: 'start', ls: 1 });
  const typed = 'Fresh coffee,|made in Manchester.';
  const tk = clamp((u + 0.05) / 1.0);
  const n = Math.round(typed.length * tk);
  const head = typed.slice(0, Math.max(1, n));
  const hero = eo(seg(u, 1.2, 1.45));
  s += `<g transform="translate(330 108)"><rect x="-2" y="-2" width="304" height="564" fill="#0c8ce9"/><g clip-path="url(#ab)">${cafePage(300, { hero, head, caret: tk < 1 || Math.sin(u * 12) > 0 })}</g></g>`;
  // selection box around the headline while typing
  if (u < 1.1) s += `<rect x="342" y="335" width="262" height="72" fill="none" stroke="#0c8ce9" stroke-width="2"/><rect x="${342 - 4}" y="331" width="8" height="8" fill="#fff" stroke="#0c8ce9" stroke-width="2"/><rect x="${604 - 4}" y="403" width="8" height="8" fill="#fff" stroke="#0c8ce9" stroke-width="2"/>`;
  // cursor: at the headline while typing, then moves to the peach swatch and clicks at 1.18
  const m = eo(seg(u, 0.95, 1.15));
  const cx = 600 + (848 - 600) * m + (u < 0.95 ? Math.sin(u * 9) * 4 : 0), cy = 400 + (138 - 400) * m;
  s += ripple(848, 135, seg(u, 1.18, 1.6), '#fff') + cursor(cx, cy, 1 - .1 * (seg(u, 1.15, 1.18) - seg(u, 1.22, 1.26)));
  s += `</g>`;
  return s;
}

// ---------- scene 3: preview link + comments ----------
function previewScene(t) {
  const u = t - S[2];
  let s = phone(20, 0, 1, 'preview · your-cafe', ['PREVIEW', '#7a5cff'], cafePage(380, { sunday: u > 1.15 }));
  // link card being opened
  const lk = eo(seg(u, 0, .3));
  s += `<g transform="translate(450 ${f(40 - 30 * (1 - lk))})" opacity="${f(lk)}"><rect width="490" height="104" rx="18" fill="#fff" filter="url(#sh)"/>`;
  s += `<rect x="18" y="20" width="64" height="64" rx="14" fill="#efe9ff"/><path d="M38 60 l24 -24 M44 40 h18 v18" stroke="#7a5cff" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += ui('Your preview link', 100, 48, 22, INK, { w: 700 }) + ui('Check it on your own phone', 100, 80, 18, '#6d655e') + `</g>`;
  // client comment
  const b1 = eb(seg(u, .35, .6));
  if (b1 > 0) s += `<g transform="translate(450 190) scale(${f(b1)})"><rect width="490" height="170" rx="22" fill="#fff" filter="url(#sh)"/><circle cx="52" cy="54" r="30" fill="${C.peach}"/>${big('YC', 52, 66, 30, '#fff', { ls: 0 })}${ui('Your Café (DEMO)', 96, 48, 20, INK, { w: 700 })}${ui('just now', 96, 74, 16, '#9a948f')}${big('Love it!', 30, 140, 50, INK, { a: 'start', ls: -1 })}${ui('Can we add Sunday hours?', 230, 138, 18, '#6d655e')}</g>`;
  // my reply
  const b2 = eb(seg(u, 1.0, 1.25));
  if (b2 > 0) s += `<g transform="translate(450 390) scale(${f(b2)})"><rect width="490" height="120" rx="22" fill="${INK}" filter="url(#sh)"/><circle cx="52" cy="60" r="30" fill="#4a5160"/>${ui('Me', 52, 67, 20, '#fff', { w: 700, a: 'middle' })}${ui('Sunday hours added', 98, 70, 26, '#fff', { w: 700 })}${tick(440, 60, 22, seg(u, 1.15, 1.35))}</g>`;
  // highlight the new line on the phone
  if (u > 1.15) s += `<rect x="36" y="${110 + 362}" width="348" height="30" rx="6" fill="${C.green}" fill-opacity="${f(.25 * (1 - seg(u, 1.4, 1.8)))}"/>`;
  return s;
}

// ---------- scene 4: live, Book a table → Booked ✓ ----------
function liveScene(t) {
  const u = t - S[3];
  const pressK = seg(u, .55, .65), booked = u > .95;
  const btn = booked ? 'booked' : u > .55 && u < .75 ? 'press' : 'idle';
  const scl = 1.04;
  const px = 480 - 190 * scl, py = 0;
  let s = phone(px, py, scl, 'yourcafe.co.uk', ['LIVE', C.green], cafePage(380, { btn, sunday: true }));
  // button centre on screen: phone x + (110*380/360)*scl, y + (110 + 428*380/360)*scl
  const bx = px + 116 * scl, by = py + (110 + 452) * scl;
  // finger approaches, taps at .6
  const a = eo(seg(u, .1, .55));
  const fx = bx + 160 * (1 - a), fy = by + 220 * (1 - a);
  if (u < .85) s += touch(fx, fy, seg(u, .55, .75) + (u > .3 ? .01 : 0));
  s += ripple(bx, by, seg(u, .6, 1.0), C.red);
  // booking toast
  const k = eb(seg(u, .95, 1.25));
  if (k > 0) s += `<g transform="translate(480 690) scale(${f(k)})"><rect x="-330" y="-70" width="660" height="140" rx="28" fill="#fff" filter="url(#sh)"/>${tick(-250, 0, 40, 1)}${ui('Table for 2 · Sat 11:00', -190, -10, 30, INK, { w: 700 })}${ui('Booked online, no phone call', -190, 32, 22, '#6d655e')}</g>`;
  return s;
}

// ---------- frame chrome ----------
function background(t) {
  let s = `<rect width="1080" height="1920" fill="url(#bg)"/>`;
  s += `<circle cx="${f(940 + Math.sin(t * .8) * 30)}" cy="${f(300 + Math.cos(t * .7) * 20)}" r="260" fill="${C.peach}" opacity=".12"/>`;
  s += `<circle cx="${f(120 + Math.cos(t * .6) * 30)}" cy="1650" r="300" fill="${C.peach}" opacity=".10"/>`;
  return s;
}

const STEPS = [['1', 'We talk', '(15-min call)'], ['2', 'I write your text', '&amp; design it'], ['3', 'You check it on', 'a preview link'], ['4', 'It goes live', '']];
const STEP_AT = [1.0, S[1], S[2], S[3]];
function stepLabel(t) {
  let i = -1; for (let j = 0; j < 4; j++) if (t >= STEP_AT[j]) i = j;
  if (i < 0 || t >= END) return '';
  const k = eb(seg(t, STEP_AT[i], STEP_AT[i] + .3));
  const [n, a, b] = STEPS[i];
  let s = `<g transform="translate(70 1475)"><g transform="translate(90 0) scale(${f(k)}) translate(-90 0)"><circle cx="90" cy="0" r="88" fill="${C.red}"/>${big(n, 90, 46, 130, '#fff', { ls: 0 })}</g>`;
  s += `<g opacity="${f(clamp(k))}" transform="translate(${f(30 * (1 - clamp(k)))} 0)">${big(a, 210, b ? -6 : 22, 68, INK, { a: 'start', ls: -2 })}${b ? big(b, 210, 66, 68, C.red, { a: 'start', ls: -2 }) : ''}</g></g>`;
  // progress dots
  for (let j = 0; j < 4; j++) s += `<rect x="${f(390 + j * 80)}" y="1612" width="64" height="10" rx="5" fill="${j <= i ? C.red : '#e2d3c8'}"/>`;
  return s;
}

function header(t) {
  // frame 0: hook fully visible. From 1.75 it shrinks into a small header line.
  const k = eo(seg(t, 1.75, 2.15));
  let s = '';
  if (k < 1) {
    s += `<g opacity="${f(1 - k)}" transform="translate(540 300) scale(${f(1 - .25 * k)}) translate(-540 -300)">`;
    s += big('I build websites', 540, 232, 104, INK) + big('for UK cafés.', 540, 342, 104, INK) + big('Here’s how.', 540, 452, 104, C.red);
    s += `</g>`;
  }
  if (k > 0) {
    s += `<g opacity="${f(k)}">` + mono('MY PROCESS · BUILT BY HAND', 540, 260, 30, C.red) + big('I build it with you,', 540, 360, 76, INK, { ls: -2 }) + big('step by step.', 540, 440, 76, INK, { ls: -2 }) + `</g>`;
  }
  return s;
}

function stage(t) {
  // stage area x 60..1020, y 540..1360; scenes swipe left on change
  const sc = [callScene, designScene, previewScene, liveScene];
  let i = 0; for (let j = 1; j < 4; j++) if (t >= S[j]) i = j;
  const sw = eo(seg(t, S[i], S[i] + .3));
  let s = '';
  const y0 = i === 0 ? 560 : 540;
  if (i > 0 && sw < 1) s += `<g transform="translate(${f(60 - 1100 * sw)} ${i - 1 === 0 ? 560 : 540})" opacity="${f(1 - sw)}">${sc[i - 1](S[i] - .001)}</g>`;
  s += `<g transform="translate(${f(60 + (i > 0 ? 1100 * (1 - sw) : 0))} ${y0})">${sc[i](t)}</g>`;
  return s;
}

function endCard(t) {
  const u = t - END;
  let s = `<rect width="1080" height="1920" fill="${INK}"/>`;
  const a = eb(seg(u, 0, .35)), b = eo(seg(u, .15, .45)), c = eb(seg(u, .3, .6));
  s += `<g transform="translate(540 760) scale(${f(a)}) translate(-540 -760)"><text x="540" y="800" font-family="Archivo" font-weight="900" font-size="128" text-anchor="middle" letter-spacing="-4" fill="#fff"><tspan fill="${C.red}">[</tspan> BRACKET <tspan fill="${C.peach}">]</tspan></text></g>`;
  s += mono('SOFTWARE HOUSE · BASED IN KUWAIT', 540, 880, 30, '#bdb8b3', { op: b });
  s += big('I’ll build yours.', 540, 1060, 96, '#fff', { op: b });
  s += `<g transform="translate(540 1230) scale(${f(c)}) translate(-540 -1230)"><rect x="270" y="1170" width="540" height="120" rx="60" fill="${C.red}"/>${big('Comment START', 540, 1250, 58, '#fff', { ls: -1 })}</g>`;
  return s;
}

function main(t) {
  if (t >= END) return endCard(t);
  return background(t) + header(t) + stage(t) + stepLabel(t);
}

module.exports = {
  dur: DUR,
  frame(t) {
    let s = defs + main(t);
    const w = seg(t, END - .2, END);
    if (w > 0 && w < 1) s += `<rect x="0" y="${f(1920 * (1 - eo(w)))}" width="1080" height="1920" fill="${INK}"/>`;
    const lp = seg(t, DUR - .3, DUR);
    if (lp > 0) s += `<g opacity="${f(lp)}">${main(0)}</g>`;
    return s;
  },
};
