// Hook test E (instamake, 26 Nov 2026): "Before / After, built by me" (Bilal 26 Nov 10:36: show I build it by hand, not automatic).
// Dark look, realistic UI (Inter), no cartoon, no voice (music + click/typing SFX in build.py, beat change at AFTER).
// 0 split BEFORE (cluttered DEMO barber site, Not secure, missed tap) | AFTER wireframe being drawn by my cursor
// 2.2 "So I rebuilt it:" layout tool: drag section · type "Book a cut" · pick photo · checklist Mobile/Fast/Secure
// 5.0 AFTER: clean site, "Book now" tapped → Booked ✓ · 7.2–8.8 end card · last 0.3 s crossfades to frame 0.
// Render from week-03/_engine:  OUTNAME=hook-test-e node render.js ../../single-reels/2026-11-26-hook-test-e/reel
const { C, clamp, seg, eo, eb, f } = require('../../week-03/_engine/lib');
const DUR = 8.8, T1 = 2.2, T2 = 5.0, END = 7.2;
const INK = C.ink, UI = 'Inter', CREAM = '#f3ead8', GOLD = '#d9a441';
const esc = s => s.replace(/&/g, '&amp;');
const ui = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="${o.ff || UI}" font-weight="${o.w || 400}" font-size="${size}" fill="${col}" text-anchor="${o.a || 'start'}" letter-spacing="${o.ls ?? 0}" opacity="${f(o.op ?? 1)}">${esc(s)}</text>`;
const big = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="Archivo" font-weight="900" font-size="${size}" fill="${col}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? -3}" opacity="${f(o.op ?? 1)}">${s}</text>`;
const mono = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="JB" font-weight="700" font-size="${size}" fill="${col}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? 3}" opacity="${f(o.op ?? 1)}">${esc(s)}</text>`;
const cursor = (x, y, s = 1, name = 'Me', grab = false) => `<g transform="translate(${f(x)} ${f(y)})"><g transform="scale(${f(s * 1.5)})">${grab ? `<path d="M-2 4 q0 -8 6 -8 q2 -6 7 -4 q3 -5 8 -2 q4 -3 7 2 v14 q0 10 -9 12 h-8 q-8 0 -11 -8 Z" fill="#fff" stroke="#000" stroke-width="1.6"/>` : `<path d="M0 0 L0 23 L6 17.5 L10 26.5 L14 24.8 L10 16 L18 16 Z" fill="${C.peach}" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>`}</g>${name ? `<rect x="28" y="36" width="${name.length * 15 + 26}" height="36" rx="8" fill="${C.peach}"/>${ui(name, 41, 61, 21, INK, { w: 800 })}` : ''}</g>`;
const ripple = (x, y, k, col = '#fff') => k <= 0 || k >= 1 ? '' : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(14 + 50 * eo(k))}" fill="none" stroke="${col}" stroke-width="${f(5 * (1 - k))}" opacity="${f(1 - k)}"/>`;
const touch = (x, y, k) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(30 - 6 * Math.sin(Math.PI * clamp(k)))}" fill="#fff" fill-opacity=".5" stroke="#000" stroke-opacity=".3" stroke-width="3"/>`;
const tick = (x, y, r, k, col = C.green) => k <= 0 ? '' : `<g transform="translate(${f(x)} ${f(y)}) scale(${f(eb(k))})"><circle r="${r}" fill="${col}"/><path d="M${-r * .42} ${r * .02} L${-r * .1} ${r * .34} L${r * .46} ${-r * .3}" stroke="#fff" stroke-width="${r * .22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const warnTri = (x, y, s) => `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><path d="M0 -14 L13 9 H-13 Z" fill="#fff" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><rect x="-1.6" y="-6" width="3.2" height="8" rx="1.4" fill="${C.red}"/><circle cx="0" cy="5.2" r="1.9" fill="${C.red}"/></g>`;
const padlock = (x, y, s, col) => `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><rect x="-11" y="-2" width="22" height="17" rx="3.5" fill="${col}"/><path d="M-7 -2 V-7 a7 7 0 0 1 14 0 V-2" fill="none" stroke="${col}" stroke-width="3.2"/></g>`;

const defs = `<defs>
<filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="24" stdDeviation="26" flood-color="#000" flood-opacity=".6"/><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity=".5"/></filter>
<linearGradient id="bgg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1a19"/><stop offset="1" stop-color="#0c0b0b"/></linearGradient>
<linearGradient id="p0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b4636"/><stop offset="1" stop-color="#1d1714"/></linearGradient>
<linearGradient id="p1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c58a52"/><stop offset=".6" stop-color="#6e3f24"/><stop offset="1" stop-color="#231610"/></linearGradient>
<linearGradient id="p2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#46525e"/><stop offset="1" stop-color="#15191d"/></linearGradient>
<radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${C.green}" stop-opacity=".3"/><stop offset="1" stop-color="${C.green}" stop-opacity="0"/></radialGradient>
<clipPath id="ph"><rect x="0" y="0" width="380" height="780" rx="46"/></clipPath>
<clipPath id="dw"><rect x="0" y="0" width="960" height="800" rx="22"/></clipPath>
<clipPath id="ab"><rect x="0" y="0" width="300" height="600"/></clipPath>
<clipPath id="tile"><rect x="0" y="0" width="160" height="110" rx="10"/></clipPath>
</defs>`;

// a "photo" of a barber shop: chair + mirror, in a w x h box (gradient id g)
function photo(w, h, g, alt = 0) {
  const sx = w / 340, sy = h / 200;
  let s = `<rect width="${w}" height="${h}" fill="url(#${g})"/><g transform="scale(${f(sx)} ${f(sy)})">`;
  s += `<ellipse cx="${alt ? 90 : 240}" cy="60" rx="54" ry="40" fill="#fff" opacity=".14"/>`;
  s += `<rect x="${alt ? 230 : 40}" y="20" width="16" height="110" rx="8" fill="#fff" opacity=".85"/><path d="M${alt ? 230 : 40} 40 l16 -12 M${alt ? 230 : 40} 64 l16 -12 M${alt ? 230 : 40} 88 l16 -12 M${alt ? 230 : 40} 112 l16 -12" stroke="${C.red}" stroke-width="6"/>`;
  const cx = alt ? 120 : 170;
  s += `<rect x="${cx - 40}" y="86" width="80" height="54" rx="12" fill="#111" opacity=".9"/><rect x="${cx - 46}" y="128" width="92" height="22" rx="8" fill="#111" opacity=".9"/><rect x="${cx - 6}" y="150" width="12" height="30" fill="#2a2a2a"/><rect x="${cx - 34}" y="178" width="68" height="8" rx="4" fill="#2a2a2a"/>`;
  s += `<rect x="0" y="186" width="340" height="14" fill="#000" opacity=".25"/></g>`;
  return s;
}

// AFTER page, local width 360. o: { photo: 0..1, btnText, caret, btn: 'idle'|'press'|'booked', order: 0..1 (button section moved up) }
function newPage(o = {}) {
  let s = `<rect width="360" height="900" fill="#141414"/>`;
  s += `<text x="20" y="40" font-family="Archivo" font-weight="900" font-size="20" fill="${CREAM}" letter-spacing="-.5">Your Barber</text>` + mono('DEMO', 330, 38, 12, C.peach, { a: 'end', ls: 1 });
  s += `<g transform="translate(16 60)"><clipPath id="hc"><rect width="328" height="190" rx="14"/></clipPath><g clip-path="url(#hc)"><rect width="328" height="190" fill="#2a2a2a"/>`;
  const pk = o.photo ?? 1;
  if (pk > 0) s += `<g opacity="${f(pk)}">${photo(328, 190, 'p1')}</g>`;
  else s += `<path d="M140 80 h48 v34 h-48 Z M146 108 l12 -12 l10 8 l8 -6 l12 10" fill="none" stroke="#666" stroke-width="3"/>` + ui('Photo', 164, 138, 13, '#777', { a: 'middle' });
  s += `</g></g>`;
  s += `<text x="20" y="292" font-family="Archivo" font-weight="900" font-size="30" fill="${CREAM}" letter-spacing="-1">Sharp cuts,</text><text x="20" y="326" font-family="Archivo" font-weight="900" font-size="30" fill="${C.peach}" letter-spacing="-1">no waiting.</text>`;
  // sections below the headline: button block and prices; order animates (button moves up from below prices)
  const ord = o.order ?? 1;
  const btnY = 470 + (350 - 470) * ord, prY = 350 + (420 - 350) * ord;
  const b = o.btn || 'idle', bt = o.btnText ?? 'Book a cut';
  s += `<g transform="translate(0 ${f(btnY - 350)})"><rect x="20" y="350" width="200" height="52" rx="26" fill="${b === 'booked' ? C.green : C.peach}"/>${ui(bt, 120, 383, 18, INK, { w: 800, a: 'middle' })}`;
  if (o.caret) s += `<rect x="${f(120 + bt.length * 5.4 + 3)}" y="364" width="2.5" height="24" fill="${INK}"/>`;
  s += `</g>`;
  s += `<g transform="translate(0 ${f(prY - 350)})">`;
  [['Cut', '£'], ['Skin fade', '£'], ['Beard trim', '£']].forEach(([n], i) => { s += `<rect x="20" y="${430 + i * 44}" width="320" height="1" fill="#2e2e2e"/>` + ui(n, 20, 418 + 44 * i + 40 - 30, 16, '#cfc8bb', { w: 500 }); });
  s += `</g>`;
  return s;
}

// phone (380x780) at x,y with scale
function phone(x, y, sc, bar, content, dark = true) {
  let s = `<g transform="translate(${f(x)} ${f(y)}) scale(${f(sc)})"><rect x="-14" y="-14" width="408" height="808" rx="58" fill="#2a2928" filter="url(#sh)"/><rect x="-12" y="-12" width="404" height="804" rx="56" fill="none" stroke="#4a4846" stroke-width="2"/>`;
  s += `<g clip-path="url(#ph)"><rect width="380" height="780" fill="${dark ? '#141414' : '#fff'}"/>`;
  s += `<g transform="translate(0 110)">${content}</g>`;
  s += `<rect width="380" height="108" fill="${dark ? '#141414' : '#fff'}"/>` + ui('9:41', 34, 38, 17, dark ? '#fff' : '#000', { w: 700 });
  s += `<rect x="14" y="56" width="352" height="44" rx="14" fill="${dark ? '#262626' : '#ececec'}"/>` + bar;
  s += `</g><rect x="140" y="-2" width="100" height="26" rx="13" fill="#2a2928"/></g>`;
  return s;
}

// BEFORE page, white, cluttered (local width 380)
function oldPage(t) {
  const j = Math.sin(t * 2.2) * 30; // the user keeps scrolling up and down looking for the booking link
  let s = `<rect width="380" height="700" fill="#fff"/><g transform="translate(0 ${f(-30 + j)})">`;
  s += `<rect width="380" height="70" fill="#0033cc"/><text x="8" y="46" font-family="Times New Roman" font-weight="700" font-size="30" fill="#ffff00">WELCOME TO YOUR BARBER!!!</text>`;
  const mq = (t * 90) % 600;
  s += `<rect y="70" width="380" height="22" fill="#000"/><text x="${f(380 - mq)}" y="87" font-family="Times New Roman" font-size="15" fill="#ff2020">*** CALL US FOR APPOINTMENTS *** OPEN MOST DAYS *** CASH ONLY ***</text>`;
  s += `<rect x="10" y="104" width="170" height="120" fill="#eee" stroke="#999"/><path d="M60 140 h70 v50 h-70 Z M60 140 L130 190" fill="none" stroke="#aaa" stroke-width="2"/>` + ui('img_0042.jpg', 95, 214, 9, '#888', { a: 'middle', ff: 'Times New Roman' });
  for (let i = 0; i < 9; i++) s += `<rect x="190" y="${108 + i * 12}" width="${170 - (i * 37) % 60}" height="5" fill="#aaa"/>`;
  s += `<text x="190" y="232" font-family="Times New Roman" font-size="9" fill="#0000ee" text-decoration="underline">click here to book</text>`;
  // overflowing table box (broken layout)
  s += `<rect x="40" y="250" width="420" height="120" fill="#ffe9a8" stroke="#c00" stroke-width="2"/><text x="52" y="276" font-family="Comic Relief" font-size="18" fill="#c00">PRICES!!! (see below)</text>`;
  for (let i = 0; i < 5; i++) s += `<rect x="52" y="${290 + i * 14}" width="${300 + (i % 2) * 90}" height="6" fill="#c9a" opacity=".7"/>`;
  s += `<text x="10" y="400" font-family="Times New Roman" font-size="11" fill="#555">Last updated 2014. Best viewed in Internet Explorer.</text>`;
  for (let i = 0; i < 14; i++) s += `<rect x="10" y="${414 + i * 11}" width="${340 - (i * 53) % 120}" height="4" fill="#bbb"/>`;
  s += `<rect x="10" y="580" width="110" height="36" fill="#ddd" stroke="#888"/><text x="65" y="603" font-family="Times New Roman" font-size="12" fill="#333" text-anchor="middle">Guestbook</text>`;
  s += `<rect x="220" y="560" width="180" height="90" fill="#9cf" opacity=".8"/>`;
  return s + `</g>`;
}

function background(t, green = 0) {
  let s = `<rect width="1080" height="1920" fill="url(#bgg)"/>`;
  const o = (t * 18) % 60;
  s += `<g opacity=".07">`;
  for (let yy = -60; yy < 1980; yy += 60) for (let xx = 30; xx < 1080; xx += 60) s += `<circle cx="${xx}" cy="${f(yy + o)}" r="2" fill="#fff"/>`;
  s += `</g>`;
  if (green > 0) s += `<ellipse cx="540" cy="1050" rx="640" ry="560" fill="url(#glow)" opacity="${f(green)}"/>`;
  return s;
}
const tag = (s, x, y, bg, fg, sz = 44) => `<rect x="${f(x)}" y="${f(y - sz * .82)}" width="${f(s.length * sz * .74 + 36)}" height="${f(sz * 1.15)}" rx="10" fill="${bg}"/>${big(s, x + 18, y + sz * .08, sz, fg, { a: 'start', ls: 1 })}`;

// ---------- 0–2.2: split ----------
function hookScene(t) {
  let s = background(t);
  s += big('This barber’s', 540, 210, 96, '#fff') + big('website was', 540, 312, 96, '#fff') + big('losing bookings.', 540, 414, 96, C.red);
  s += `<rect x="395" y="450" width="290" height="44" rx="22" fill="none" stroke="#8a8580" stroke-width="2"/>` + mono('DEMO EXAMPLE', 540, 481, 22, '#bdb8b3', { ls: 3 });
  // BEFORE phone (left)
  s += tag('BEFORE', 60, 600, C.red, '#fff');
  const fl = Math.sin(t * 12) > -0.2 ? 1 : .55;
  const bar = `<rect x="20" y="62" width="138" height="32" rx="16" fill="${C.red}" opacity="${f(fl)}"/>${warnTri(42, 79, .7)}${ui('Not secure', 58, 85, 16, '#fff', { w: 700 })}${ui('yourbarber.co.uk', 166, 85, 15, '#555')}`;
  const shake = (Math.sin(t * 37) > .7 ? 1 : 0) * 5;
  s += phone(60 + shake, 650, 1.18, bar, oldPage(t), false).replace('scale(1.18)', 'scale(1.18)');
  // missed tap on the tiny link
  const mt = (t % 1.1) / 1.1;
  const tx = 60 + 1.18 * 200, ty = 650 + 1.18 * (110 + 205 + Math.sin(Math.floor(t / 1.1) * 2.2) * 30);
  s += touch(tx + 20, ty + 18, mt) + ripple(tx + 20, ty + 18, mt * 1.6, C.red);
  // AFTER side (right): wireframe being drawn by my cursor
  const ax = 590, ay = 650, sc = 1.0;
  s += tag('AFTER', 600, 600, '#3a3836', '#fff');
  s += `<g transform="translate(${ax} ${ay}) scale(${sc})"><rect x="-10" y="-10" width="420" height="940" rx="50" fill="none" stroke="#4a4846" stroke-width="3" stroke-dasharray="14 10"/>`;
  const boxes = [[20, 30, 360, 50], [20, 100, 360, 220], [20, 345, 300, 44], [20, 400, 220, 44], [20, 470, 200, 60], [20, 560, 360, 160]];
  const prog = (t + .5) / 1.2; // already drawing at frame 0
  let cur = [0, 0];
  boxes.forEach((b, i) => {
    const k = clamp(prog * boxes.length - i); if (k <= 0) return;
    const w = b[2] * eo(Math.min(1, k * 1.4)), h = b[3] * eo(Math.min(1, k * 1.4));
    s += `<rect x="${b[0]}" y="${b[1]}" width="${f(w)}" height="${f(h)}" rx="10" fill="${C.peach}" fill-opacity="${i === 4 ? .5 : .1}" stroke="${C.peach}" stroke-width="2.5"/>`;
    if (k < 1) cur = [b[0] + w, b[1] + h];
    else if (i === boxes.length - 1) cur = [b[0] + b[2], b[1] + b[3]];
  });
  s += `</g>` + cursor(ax + cur[0] * sc, ay + cur[1] * sc);
  s += mono('BUILT BY ME', 795, 1640, 24, C.peach);
  return s;
}

// ---------- 2.2–5.0: layout tool montage ----------
const BEATS = [[T1, 'Moving the sections'], [2.95, 'Writing “Book a cut”'], [3.65, 'Choosing the photo'], [4.3, 'Checking it all']];
function toolScene(t) {
  const u = t - T1;
  let s = background(t);
  const hk = eb(seg(u, 0, .3));
  s += `<g transform="translate(540 260) scale(${f(.8 + .2 * hk)}) translate(-540 -260)" opacity="${f(clamp(hk))}">` + big('So I rebuilt it:', 540, 300, 104, '#fff') + `</g>`;
  s += mono('BY HAND · SECTION BY SECTION', 540, 380, 26, C.peach, { op: clamp(hk) });
  // window
  const wx = 60, wy = 450;
  s += `<g transform="translate(${wx} ${wy})"><g filter="url(#sh)"><rect width="960" height="800" rx="22" fill="#2c2c2c"/></g><g clip-path="url(#dw)"><rect width="960" height="800" fill="#1e1e1e"/>`;
  s += `<rect width="960" height="56" fill="#2c2c2c"/>` + ['#ff5f57', '#febc2e', '#28c840'].map((c, i) => `<circle cx="${26 + i * 24}" cy="28" r="8" fill="${c}"/>`).join('');
  s += ui('your-barber (DEMO) · Home', 480, 36, 19, '#d9d9d9', { w: 600, a: 'middle' });
  // layers
  s += `<rect x="0" y="56" width="210" height="744" fill="#2c2c2c"/>` + ui('Layers', 18, 92, 17, '#fff', { w: 700 });
  const ord = eo(seg(u, .15, .65));
  const L = [['Home', 0], ['Nav', 1], ['Hero photo', 2], ['Headline', 3], ['Book button', 4 + (3.999 - 4) * 0 - ord], ['Prices', 4 + ord * 1 - 0]];
  // Book button row moves from slot 5 to slot 4; Prices from 4 to 5
  const rows = [['Home', 0], ['Nav', 1], ['Hero photo', 2], ['Headline', 3], ['Book button', 5 - ord], ['Prices', 4 + ord]];
  rows.forEach(([l, p], i) => {
    const y = 110 + p * 40;
    const selRow = (u < .75 && l === 'Book button') || (u >= .75 && u < 1.45 && l === 'Book button') || (u >= 1.45 && u < 2.1 && l === 'Hero photo');
    if (selRow) s += `<rect x="6" y="${f(y)}" width="198" height="34" rx="6" fill="#0c8ce9" fill-opacity=".4"/>`;
    s += `<rect x="${i ? 34 : 18}" y="${f(y + 11)}" width="12" height="12" rx="2" fill="none" stroke="#9a9a9a" stroke-width="2"/>` + ui(l, i ? 56 : 40, y + 23, 16, '#e3e3e3', { w: i ? 400 : 700 });
  });
  // right panel: photo picker
  s += `<rect x="750" y="56" width="210" height="744" fill="#2c2c2c"/>` + ui(u < 1.45 ? 'Text' : 'Choose photo', 768, 92, 17, '#fff', { w: 700 });
  if (u < 1.45) s += ui('Archivo · Black', 768, 124, 15, '#bdbdbd') + ui('Written by me', 768, 152, 15, '#bdbdbd');
  else {
    ['p0', 'p1', 'p2'].forEach((g, i) => {
      s += `<g transform="translate(775 ${112 + i * 128})"><g clip-path="url(#tile)">${photo(160, 110, g, i % 2)}</g>`;
      if (i === 1 && u > 1.75) s += `<rect x="-3" y="-3" width="166" height="116" rx="12" fill="none" stroke="#0c8ce9" stroke-width="4"/>`;
      s += `</g>`;
    });
  }
  // artboard
  const photoK = eo(seg(u, 1.78, 2.0));
  const tw = 'Book a cut'; const tk = clamp((u - .78) / .6);
  const btnText = u < .75 ? 'Button' : tw.slice(0, Math.round(tw.length * tk));
  s += mono('HOME · 360', 330, 92, 13, '#9a9a9a', { a: 'start', ls: 1 });
  s += `<g transform="translate(330 104)"><rect x="-2" y="-2" width="304" height="604" fill="#0c8ce9"/><g clip-path="url(#ab)"><g transform="scale(${f(300 / 360)})">${newPage({ photo: photoK, btnText, caret: u > .75 && u < 1.45 && (tk < 1 || Math.sin(u * 14) > 0), order: ord })}</g></g></g>`;
  // cursor path: grab button section (drag), then at button typing, then to photo tile 2, click
  const sc3 = 300 / 360;
  const btnY = 104 + (470 + (350 - 470) * ord + 26) * sc3;
  let cx, cy, grab = false;
  if (u < .75) { cx = 330 + 140 * sc3; cy = btnY; grab = u > .12 && u < .68; }
  else if (u < 1.45) { cx = 330 + 200 * sc3 + Math.sin(u * 8) * 3; cy = 104 + 380 * sc3; }
  else { const m = eo(seg(u, 1.45, 1.72)); cx = 330 + 200 * sc3 + (855 - 330 - 200 * sc3) * m; cy = 104 + 380 * sc3 + (300 - 104 - 380 * sc3) * m; }
  s += ripple(855, 300, seg(u, 1.75, 2.1)) + cursor(cx, cy, 1, 'Me', grab);
  s += `</g></g>`;
  // checklist card (4.3–5.0)
  const ck = eb(seg(t, 4.25, 4.45));
  if (ck > 0) {
    s += `<g transform="translate(540 1110) scale(${f(ck)}) translate(-540 -1110)"><rect x="140" y="1010" width="800" height="200" rx="26" fill="#fff" filter="url(#sh)"/>`;
    ['Mobile', 'Fast', 'Secure'].forEach((w, i) => {
      const x = 175 + i * 250;
      s += `<rect x="${x}" y="1080" width="50" height="50" rx="10" fill="none" stroke="#c8c2bc" stroke-width="4"/>` + tick(x + 25, 1105, 30, seg(t, 4.45 + i * .17, 4.6 + i * .17)) + big(w, x + 64, 1122, 46, INK, { a: 'start', ls: -1 });
    });
    s += mono('MY CHECKLIST · BEFORE IT GOES LIVE', 540, 1058, 20, '#8a8580') + `</g>`;
  }
  // what I'm doing now (caption under the window)
  let bi = 0; for (let j = 0; j < 4; j++) if (t >= BEATS[j][0]) bi = j;
  const bk = eo(seg(t, BEATS[bi][0], BEATS[bi][0] + .2));
  s += `<g opacity="${f(bk)}" transform="translate(0 ${f(20 * (1 - bk))})">${mono('0' + (bi + 1) + ' / 04', 540, 1340, 24, '#8a8580')}${big(BEATS[bi][1], 540, 1420, 68, '#fff', { ls: -2 })}</g>`;
  return s;
}

// ---------- 5.0–7.2: AFTER ----------
function afterScene(t) {
  const u = t - T2;
  let s = background(t, eo(seg(u, 0, .4)));
  const fl = 1 - seg(u, 0, .2);
  const k = eb(seg(u, 0, .35));
  s += `<g transform="translate(540 250) scale(${f(.8 + .2 * k)}) translate(-540 -250)">${tag('AFTER', 395, 230, C.green, '#fff', 80)}</g>`;
  s += big('Rebuilt by me.', 540, 400, 88, '#fff', { op: clamp(k) });
  const btn = u > 1.2 ? 'booked' : 'idle';
  const bar = `${padlock(38, 79, .7, '#9a9a9a')}${ui('yourbarber.co.uk', 54, 85, 16, '#eee', { w: 500 })}<rect x="296" y="64" width="62" height="28" rx="14" fill="${C.peach}"/>${mono('DEMO', 327, 84, 13, INK, { ls: 1 })}`;
  // sticky "Book now" bar inside the phone
  const content = `<g transform="scale(${f(380 / 360)})">${newPage({ btn: 'idle', btnText: 'Book a cut' })}</g>`;
  const pressed = u > .75 && u < .95;
  const sticky = `<g transform="translate(190 612) scale(${pressed ? .96 : 1}) translate(-190 -612)"><rect x="20" y="580" width="340" height="64" rx="32" fill="${btn === 'booked' ? C.green : C.red}"/>${ui(btn === 'booked' ? 'Booked ✓' : 'Book now', 190, 622, 24, '#fff', { w: 800, a: 'middle' })}</g>`;
  const py = 480 + 60 * (1 - eo(seg(u, 0, .4)));
  s += phone(540 - 190 * 1.12, py, 1.12, bar, content + sticky);
  const bx = 540, by = py + (110 + 612) * 1.12;
  const a = eo(seg(u, .2, .8));
  if (u < 1.05) s += touch(bx + 120 * (1 - a), by + 180 * (1 - a), seg(u, .8, 1.0));
  s += ripple(bx, by, seg(u, .85, 1.25), C.green);
  // booking confirmation
  const c = eb(seg(u, 1.2, 1.5));
  if (c > 0) s += `<g transform="translate(540 1490) scale(${f(c)})"><rect x="-360" y="-75" width="720" height="150" rx="30" fill="#fff" filter="url(#sh)"/>${tick(-275, 0, 42, 1)}${ui('Skin fade · Sat 10:30', -210, -8, 34, INK, { w: 800 })}${ui('Booked on the website', -210, 36, 24, '#6d655e')}</g>`;
  if (fl > 0) s += `<rect width="1080" height="1920" fill="#fff" opacity="${f(fl * .5)}"/>`;
  return s;
}

function endCard(t) {
  const u = t - END;
  let s = `<rect width="1080" height="1920" fill="#121110"/>`;
  const a = eb(seg(u, 0, .35)), b = eo(seg(u, .15, .45)), c = eb(seg(u, .3, .6)), d = eo(seg(u, .5, .8));
  s += `<g transform="translate(540 720) scale(${f(a)}) translate(-540 -720)"><text x="540" y="760" font-family="Archivo" font-weight="900" font-size="128" text-anchor="middle" letter-spacing="-4" fill="#fff"><tspan fill="${C.red}">[</tspan> BRACKET <tspan fill="${C.peach}">]</tspan></text></g>`;
  s += mono('SOFTWARE HOUSE · BASED IN KUWAIT', 540, 840, 30, '#bdb8b3', { op: b });
  s += big('Your website,', 540, 1010, 92, '#fff', { op: b }) + big('rebuilt by me.', 540, 1105, 92, C.peach, { op: b });
  s += `<g transform="translate(540 1260) scale(${f(c)}) translate(-540 -1260)"><rect x="270" y="1200" width="540" height="120" rx="60" fill="${C.red}"/>${big('Comment START', 540, 1280, 58, '#fff', { ls: -1 })}</g>`;
  s += ui('Websites from £655', 540, 1400, 34, '#bdb8b3', { w: 600, a: 'middle', op: d });
  return s;
}

function main(t) { return t < T1 ? hookScene(t) : t < T2 ? toolScene(t) : t < END ? afterScene(t) : endCard(t); }

module.exports = {
  dur: DUR,
  frame(t) {
    let s = defs + main(t);
    const w1 = seg(t, T1 - .12, T1 + .08); // quick cut flash into the montage
    if (w1 > 0 && w1 < 1) s += `<rect width="1080" height="1920" fill="#000" opacity="${f(.6 * Math.sin(Math.PI * w1))}"/>`;
    const w = seg(t, END - .2, END);
    if (w > 0 && w < 1) s += `<rect x="0" y="${f(1920 * (1 - eo(w)))}" width="1080" height="1920" fill="#121110"/>`;
    const lp = seg(t, DUR - .3, DUR);
    if (lp > 0) s += `<g opacity="${f(lp)}">${hookScene(0)}</g>`;
    return s;
  },
};
