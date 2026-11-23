// week-03 EXTRA reels (instamake T-20261123-10): founding-offer MAIN + 6 trials from the updated website.
// Same look as week-03/_engine (kit.js, short.js): paper bg, kinetic Archivo, white UI cards, dark end card.
// Structure (14.95 s): hook 0–2.5 · proof 2.5–6.8 · payoff 6.8–12.4 · end card 12.4–14.95 (spoken CTA over it).
// Render from week-03/_engine:  X=offer-main OUTNAME=offer-main node render.js ../extra/_engine/extra
// Existing week-03 files are not changed; this only requires kit.js.
const K = require('../../_engine/kit');
const { C, clamp, seg, eo, eb, f, esc, html, EN, kinS, card, lbl, pop, scene, hookScene, float, phone } = K;

const H = 2.5, P = 6.8, END = 12.4, DUR = 14.95;
const G = C.green || '#1fa86b';

// ---------- parts ----------
// browser card with a URL pill. inner drawn by caller
function browser(x, y, w, h, url, o = {}) {
  let s = card(x, y, w, h, 44);
  s += `<rect x="${f(x)}" y="${f(y)}" width="${w}" height="96" rx="44" fill="#f4f3f2"/><rect x="${f(x)}" y="${f(y + 50)}" width="${w}" height="46" fill="#f4f3f2"/>`;
  [0, 1, 2].forEach(i => s += `<circle cx="${f(x + 50 + i * 34)}" cy="${f(y + 48)}" r="11" fill="${['#ff8360', '#e8c26a', '#9fd3b0'][i]}"/>`);
  s += `<rect x="${f(x + 170)}" y="${f(y + 22)}" width="${w - 210}" height="52" rx="26" fill="#fff" stroke="#e2dfdc" stroke-width="2"/>`;
  s += lbl(esc(url), x + 200, y + 57, 24, o.urlCol || C.mute, 'start');
  return s;
}
// a website building itself inside a box. k = 0..1 progress
function siteBlocks(x, y, w, k, o = {}) {
  const st = i => eb(clamp(k * 5 - i));
  let s = '';
  const a = st(0); if (a > 0) s += `<g opacity="${f(clamp(a))}"><rect x="${f(x)}" y="${f(y)}" width="${f(w * a)}" height="52" rx="14" fill="${C.ink}"/><rect x="${f(x + 24)}" y="${f(y + 18)}" width="120" height="16" rx="8" fill="${C.peach}"/></g>`;
  const b = st(1); if (b > 0) s += pop(x + w / 2, y + 170, b, `<rect x="${f(x)}" y="${f(y + 76)}" width="${w}" height="190" rx="22" fill="${C.peach}" opacity=".35"/><rect x="${f(x + 34)}" y="${f(y + 116)}" width="${f(w * .62)}" height="34" rx="12" fill="${C.ink}"/><rect x="${f(x + 34)}" y="${f(y + 166)}" width="${f(w * .45)}" height="22" rx="11" fill="${C.ink}" opacity=".35"/>`);
  const c = st(2); if (c > 0) s += pop(x + 130, y + 315, c, `<rect x="${f(x)}" y="${f(y + 288)}" width="250" height="62" rx="31" fill="${C.red}"/><text x="${f(x + 125)}" y="${f(y + 330)}" font-family="Archivo" font-weight="900" font-size="28" fill="#fff" text-anchor="middle">${esc(o.btn || 'Book now')}</text>`);
  const d = st(3); if (d > 0) s += `<g opacity="${f(clamp(d))}">` + [0, 1, 2].map(i => `<rect x="${f(x + i * (w / 3))}" y="${f(y + 380)}" width="${f(w / 3 - 18)}" height="${f(120 * d)}" rx="18" fill="#efedeb"/>`).join('') + `</g>`;
  return s;
}
const tapRing = (cx, cy, tr) => tr < 0 || tr > 0.6 ? '' : `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(20 + tr * 90)}" fill="none" stroke="${C.ink}" stroke-width="6" opacity="${f(1 - tr / 0.6)}"/><circle cx="${f(cx)}" cy="${f(cy)}" r="22" fill="${C.ink}" opacity="${f(.35 * (1 - tr / 0.6))}"/>`;
const tick = (cx, cy, r, k, col = G) => k <= 0 ? '' : pop(cx, cy, k, `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col}"/><path d="M${f(cx - r * .42)} ${f(cy + r * .04)} L${f(cx - r * .12)} ${f(cy + r * .34)} L${f(cx + r * .46)} ${f(cy - r * .3)}" stroke="#fff" stroke-width="${f(r * .22)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
const chip = (cx, cy, s, k, bgc = C.ink, col = '#fff', size = 30) => {
  const w = s.length * size * 0.66 + 70;
  return k <= 0 ? '' : pop(cx, cy, k, `<rect x="${f(cx - w / 2)}" y="${f(cy - size * 1.05)}" width="${f(w)}" height="${f(size * 2.1)}" rx="${f(size * 1.05)}" fill="${bgc}"/><text x="${cx}" y="${f(cy + size * .36)}" font-family="JB" font-weight="700" font-size="${size}" fill="${col}" text-anchor="middle" letter-spacing="2">${esc(s)}</text>`);
};
// sentence line (Archivo) centred
const line = (y, s, size, col, op = 1, w = 900) => html(540 - w / 2, y, w, size * 1.4, `<div style="${EN(size, col)}letter-spacing:-1px;opacity:${f(op)}">${esc(s)}</div>`, 'text-align:center;');
// ticked rows in a white card. items [{en, at}] (local time)
function rows(t, a, x, y, w, items, o = {}) {
  const tr = t - a, rh = o.rh || 150; let s = card(x, y, w, rh * items.length + 40, 44);
  items.forEach((it, i) => {
    const yy = y + 20 + i * rh, k = eb(seg(tr, it.at, it.at + 0.35)), op = eo(seg(tr, it.at, it.at + 0.3));
    s += tick(x + 80, yy + rh / 2, 40, k, it.col || G);
    s += html(x + 145, yy + rh / 2 - (o.size || 44) * 0.75, w - 175, rh, `<div style="${EN(o.size || 44, C.ink)}letter-spacing:-1px;opacity:${f(op)}">${esc(it.en)}</div>`);
    if (i < items.length - 1) s += `<line x1="${x + 40}" y1="${yy + rh}" x2="${x + w - 40}" y2="${yy + rh}" stroke="#efecea" stroke-width="3"/>`;
  });
  return s;
}
// own end card (based on kit.endHelp; pill text configurable). o = {help, pill}
function endX(t, a, o = {}) {
  const lt = t - a; if (lt < 0) return '';
  const tf = a + lt * 1.6; let s = '';
  const k = eb(seg(lt * 1.6, 0, 0.5)), spread = (1 - eo(seg(lt * 1.6, 0.1, 0.7))) * 120;
  s += `<g opacity="${f(eo(seg(lt * 1.6, 0, 0.3)))}">`;
  s += `<text x="${f(170 + spread)}" y="700" font-family="Archivo" font-weight="900" font-size="150" fill="${C.peach}" text-anchor="middle">[</text>`;
  s += `<text x="${f(910 - spread)}" y="700" font-family="Archivo" font-weight="900" font-size="150" fill="${C.peach}" text-anchor="middle">]</text>`;
  s += `<text x="540" y="692" font-family="Archivo" font-weight="900" font-size="${f(118 * k)}" fill="#fff" text-anchor="middle" letter-spacing="-4">BRACKET</text>`;
  s += lbl('SOFTWARE HOUSE · BASED IN KUWAIT', 540, 770, 30, C.peach);
  s += `</g>`;
  s += K.kin(840, [['Software', '#fff'], ['that', '#fff'], ['gets', '#fff'], ['it', '#fff'], ['done.', C.peach]], tf, a + 0.35, 64, { step: 0.12 });
  s += `<line x1="340" y1="990" x2="740" y2="990" stroke="#4a4542" stroke-width="3" opacity="${f(eo(seg(lt, 0.5, 0.8)))}"/>`;
  s += kinS(1040, o.help || "We'll *build* it | for you.", t, a + 0.55, 104, { col: '#fff', acc: C.peach, step: 0.1 });
  const kc = eb(seg(lt, 1.15, 1.5)), pt = o.pill || 'Comment START', pw = Math.max(540, pt.length * 30 + 120);
  s += pop(540, 1400, kc, `<rect x="${f(540 - pw / 2)}" y="1345" width="${f(pw)}" height="110" rx="55" fill="${C.red}"/><text x="540" y="1416" font-family="Archivo" font-weight="900" font-size="50" fill="#fff" text-anchor="middle" letter-spacing="-1">${esc(pt)}</text>`);
  if (o.note) s += `<g opacity="${f(eo(seg(lt, 1.4, 1.8)))}">${lbl(esc(o.note), 540, 1530, 26, '#8d8782')}</g>`;
  return s;
}

// ---------- reels ----------
const R = {};

// A) MAIN: founding offer
R['offer-main'] = {
  hook: t => hookScene(t, H,
    kinS(250, 'Your *website* | first.', t, -0.45, 96, { step: 0.15 }) +
    kinS(560, 'Payment *after.*', t, 0.55, 124, { step: 0.18 }) +
    (() => { const y = 800 + float(t); let s = browser(150, y, 780, 640, 'preview link');
      s += siteBlocks(200, y + 130, 680, clamp(0.35 + t / 1.6));
      s += chip(540, y + 640, '£0 UPFRONT', eb(seg(t, 1.0, 1.35)), C.red, '#fff', 40); return s; })()),
  proof: t => scene(t, H, P, (() => {
    const tr = t - H; let s = kinS(240, 'We *build* it. | You *review* it.', t, H + 0.05, 96, { step: 0.13 });
    const y = 520 + float(t, 1); s += browser(110, y, 860, 860, 'preview link · not live yet');
    s += siteBlocks(170, y + 130, 740, clamp(tr / 1.5));
    const by = y + 700, kb = eb(seg(tr, 1.5, 1.8)), done = tr > 2.55;
    if (!done) s += pop(540, by + 50, kb, `<rect x="270" y="${f(by)}" width="540" height="100" rx="50" fill="${C.ink}"/><text x="540" y="${f(by + 66)}" font-family="Archivo" font-weight="900" font-size="48" fill="#fff" text-anchor="middle">Review</text>`);
    s += tapRing(640, by + 50, tr - 2.2);
    if (done) { const kd = eb(seg(tr, 2.55, 2.9)); s += pop(540, by + 50, kd, `<rect x="150" y="${f(by)}" width="780" height="100" rx="50" fill="${G}"/><text x="540" y="${f(by + 66)}" font-family="Archivo" font-weight="900" font-size="48" fill="#fff" text-anchor="middle">Happy? Then pay.</text>`); }
    return s; })()),
  pay: t => scene(t, P, END, (() => {
    const tr = t - P; let s = kinS(240, 'First *5* clients | only.', t, P + 0.05, 100, { step: 0.14 });
    const y = 640 + float(t, 2);
    for (let i = 0; i < 5; i++) {
      const cx = 180 + i * 180, k = eb(seg(tr, 0.6 + i * 0.18, 0.95 + i * 0.18));
      s += pop(cx, y, k, `<circle cx="${cx}" cy="${f(y)}" r="74" fill="#fff" filter="url(#sh)"/><circle cx="${cx}" cy="${f(y)}" r="60" fill="none" stroke="${C.peach}" stroke-width="6" stroke-dasharray="14 10"/><text x="${cx}" y="${f(y + 26)}" font-family="Archivo" font-weight="900" font-size="72" fill="${C.ink}" text-anchor="middle">${i + 1}</text>`);
    }
    s += `<g opacity="${f(eo(seg(tr, 1.6, 1.9)))}">${lbl('5 FOUNDING PLACES', 540, y + 150, 36, C.red)}</g>`;
    const cy = 900 + float(t, 3), kc = eb(seg(tr, 1.9, 2.3));
    s += pop(540, cy + 150, kc, card(110, cy, 860, 300, 44) +
      line(cy + 50, 'No upfront payment.', 62, C.ink) + line(cy + 150, 'Pay when you’re happy.', 62, C.red));
    s += line(1270, 'Scope agreed in writing first.', 48, C.ink, eo(seg(tr, 2.8, 3.2)));
    return s; })()),
  end: { help: "We'll *build* it | for you." },
};

// B1) We write the text
R['trial-01'] = {
  hook: t => hookScene(t, H,
    kinS(250, 'Not sure what | to *write?*', t, -0.45, 100, { step: 0.15 }) +
    (() => { const y = 650 + float(t); let s = browser(150, y, 780, 720, 'your new website');
      s += `<rect x="210" y="${f(y + 150)}" width="660" height="70" rx="14" fill="#f4f3f2" stroke="#d9d5d2" stroke-width="3" stroke-dasharray="12 10"/>`;
      for (let i = 0; i < 4; i++) s += `<rect x="210" y="${f(y + 270 + i * 80)}" width="${660 - i * 90}" height="40" rx="12" fill="#f4f3f2" stroke="#d9d5d2" stroke-width="3" stroke-dasharray="12 10"/>`;
      if (Math.floor(t * 2.5) % 2 === 0) s += `<rect x="226" y="${f(y + 162)}" width="6" height="46" fill="${C.red}"/>`;
      s += chip(540, y + 620, 'TEXT GOES HERE?', eb(seg(t, 0.9, 1.25)), C.red, '#fff', 34); return s; })()),
  proof: t => scene(t, H, P, (() => {
    const tr = t - H; let s = kinS(240, 'One short *call.* | We write the *text.*', t, H + 0.05, 83, { step: 0.12 });
    const y = 560 + float(t, 1);
    // call card
    s += card(110, y, 860, 220, 44);
    s += `<circle cx="210" cy="${f(y + 110)}" r="56" fill="${C.peach}" opacity=".5"/><circle cx="210" cy="${f(y + 95)}" r="20" fill="${C.ink}"/><rect x="178" y="${f(y + 120)}" width="64" height="30" rx="15" fill="${C.ink}"/>`;
    s += html(300, y + 50, 420, 130, `<div style="${EN(48, C.ink)}letter-spacing:-1px">Video call</div><div style="font-family:JB;font-weight:700;font-size:26px;color:${C.mute};letter-spacing:2px;margin-top:8px">ONE SHORT CALL</div>`);
    s += `<circle cx="870" cy="${f(y + 110)}" r="44" fill="${C.red}"/><path d="M850 ${f(y + 100)} q20 30 40 0" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>`;
    // arrow
    const ka = eo(seg(tr, 0.8, 1.1));
    s += `<path d="M540 ${f(y + 240)} v${f(60 * ka)}" stroke="${C.red}" stroke-width="10" stroke-linecap="round"/><path d="M515 ${f(y + 280 * 1 + 0)} l25 25 l25 -25" stroke="${C.red}" stroke-width="10" fill="none" stroke-linecap="round" opacity="${f(ka)}"/>`;
    // page card writing itself
    const py = y + 330; s += card(110, py, 860, 480, 44) + lbl('PAGE TEXT', 160, py + 62, 26, C.red, 'start');
    const full = ['Friendly local café in', 'the heart of town.', 'Fresh coffee, homemade', 'cakes, open seven days.'], LY = [100, 168, 250, 304];
    const n = Math.floor(clamp((tr - 1.1) / 2.0) * full.join('').length); let used = 0;
    full.forEach((ln, i) => { const take = Math.max(0, Math.min(ln.length, n - used)); used += ln.length;
      s += html(160, py + LY[i], 760, 80, `<span style="${EN(i < 2 ? 56 : 42, i < 2 ? C.ink : C.mute)}letter-spacing:-1px">${esc(ln.slice(0, take))}</span>`); });
    s += K.demoTag(690, py + 26);
    return s; })()),
  pay: t => scene(t, P, END, (() => {
    const tr = t - P; let s = kinS(240, 'You *review* it | first.', t, P + 0.05, 100, { step: 0.14 });
    s += rows(t, P, 110, 600 + float(t, 2), 860, [
      { en: 'Page text written for you', at: 0.6 },
      { en: 'From one short call', at: 1.2 },
      { en: 'You check it on our preview link', at: 1.8 },
    ], { rh: 170, size: 46 });
    return s; })()),
  end: { help: "We'll *write* it | for you." },
};

// B2) Ready for Google from day one
R['trial-02'] = {
  hook: t => hookScene(t, H,
    kinS(250, 'Ready for *Google* | from day *one.*', t, -0.45, 84, { step: 0.15 }) +
    (() => { const y = 680 + float(t); let s = K.searchCard(t, -0.3, y, 'cafe near me', { h: 600, typeAt: 0, typeDur: 0.8 });
      s += K.resultRows(t, y + 220, 3, { k: i => eb(seg(t, 0.9 + i * 0.2, 1.2 + i * 0.2)) }); return s; })()),
  proof: t => scene(t, H, P, (() => {
    const tr = t - H; let s = kinS(240, 'Built in from | the *start.*', t, H + 0.05, 100, { step: 0.13 });
    const y = 540 + float(t, 1);
    // a search result being assembled
    s += card(110, y, 860, 300, 44);
    s += `<circle cx="180" cy="${f(y + 70)}" r="22" fill="${C.peach}"/>` + lbl('yourbusiness.co.uk', 220, y + 80, 26, C.mute, 'start');
    const kt = eo(seg(tr, 0.3, 0.7)); s += html(160, y + 110, 760, 70, `<span style="${EN(46, '#1a4fd6')}letter-spacing:-1px;opacity:${f(kt)}">Your Café – Coffee &amp; Cakes</span>`.replace('&amp;amp;', '&amp;'));
    const kd = eo(seg(tr, 0.7, 1.1)); s += `<rect x="160" y="${f(y + 200)}" width="${f(700 * kd)}" height="22" rx="11" fill="#e4e1df"/><rect x="160" y="${f(y + 238)}" width="${f(520 * kd)}" height="22" rx="11" fill="#eeebe9"/>`;
    s += rows(t, H, 110, y + 340, 860, [
      { en: 'Clear titles', at: 1.0 }, { en: 'Fast pages', at: 1.5 }, { en: 'Sensible structure', at: 2.0 },
    ], { rh: 140, size: 50 });
    s += K.demoTag(690, y + 34);
    return s; })()),
  pay: t => scene(t, P, END, (() => {
    const tr = t - P; let s = kinS(260, 'SEO *basics* | from day *one.*', t, P + 0.05, 100, { step: 0.14 });
    const y = 680 + float(t, 2), k = eb(seg(tr, 1.0, 1.4));
    s += pop(540, y + 180, k, card(110, y, 860, 360, 44) + K.lbl('ONGOING SEO', 540, y + 80, 30, C.red) +
      line(y + 115, 'Optional.', 72, C.ink) + line(y + 225, 'Local SEO from £325/month', 46, C.mute));
    return s; })()),
  end: { help: "We'll *build* it | for you." },
};

// B3) Nothing goes live without your yes
R['trial-03'] = {
  hook: t => hookScene(t, H,
    kinS(250, 'Nothing goes *live* | without your *yes.*', t, -0.45, 80, { step: 0.14 }) +
    (() => { const y = 720 + float(t), on = 0; let s = card(150, y, 780, 520, 48);
      s += lbl('GO LIVE', 540, y + 110, 40, C.mute);
      // switch, locked off, wiggles
      const wig = Math.sin(t * 22) * 6 * (t > 0.6 && t < 1.4 ? 1 : 0);
      s += `<g transform="translate(${f(wig)} 0)"><rect x="330" y="${f(y + 170)}" width="420" height="190" rx="95" fill="#e4e1df"/><circle cx="${f(425 + on)}" cy="${f(y + 265)}" r="78" fill="#fff" filter="url(#sh)"/></g>`;
      const kl = eb(seg(t, 0.2, 0.6));
      s += pop(660, y + 265, kl, `<rect x="615" y="${f(y + 255)}" width="90" height="74" rx="14" fill="${C.red}"/><path d="M635 ${f(y + 255)} v-22 a25 25 0 0 1 50 0 v22" stroke="${C.red}" stroke-width="12" fill="none"/>`);
      s += chip(540, y + 440, 'WAITING FOR YOUR YES', eb(seg(t, 1.0, 1.35)), C.ink, '#fff', 30); return s; })()),
  proof: t => scene(t, H, P, (() => {
    const tr = t - H; let s = kinS(240, 'You see it *first.*', t, H + 0.05, 88, { step: 0.14 });
    const y = 420 + float(t, 1), live = tr > 2.75;
    s += browser(110, y, 860, 820, live ? 'live' : 'preview link');
    s += chip(830, y + 150, live ? 'LIVE' : 'PREVIEW', 1, live ? G : C.peach, live ? '#fff' : C.ink, 28);
    s += siteBlocks(170, y + 210, 740, clamp(tr / 1.0));
    const by = y + 860, kb = eb(seg(tr, 1.1, 1.45));
    s += pop(540, by + 110, kb, card(110, by, 860, 220, 44) + line(by + 22, 'Ready to launch?', 48, C.ink) +
      `<rect x="160" y="${f(by + 110)}" width="360" height="84" rx="42" fill="#efedeb"/><text x="340" y="${f(by + 166)}" font-family="Archivo" font-weight="900" font-size="38" fill="${C.ink}" text-anchor="middle">Not yet</text>` +
      `<rect x="560" y="${f(by + 110)}" width="360" height="84" rx="42" fill="${tr > 2.5 ? G : C.red}"/><text x="740" y="${f(by + 166)}" font-family="Archivo" font-weight="900" font-size="38" fill="#fff" text-anchor="middle">${tr > 2.5 ? 'Yes ✓' : 'Yes, launch'}</text>`);
    s += tapRing(760, by + 152, tr - 2.2);
    return s; })()),
  pay: t => scene(t, P, END, (() => {
    const tr = t - P; let s = kinS(240, 'Written *scope* | before any *work.*', t, P + 0.05, 88, { step: 0.13 });
    const y = 620 + float(t, 2); s += card(170, y, 740, 680, 36);
    s += lbl('SCOPE', 230, y + 80, 34, C.red, 'start');
    for (let i = 0; i < 5; i++) { const k = eo(seg(tr, 0.5 + i * 0.2, 0.8 + i * 0.2)), yy = y + 140 + i * 82;
      s += `<g opacity="${f(k)}"><rect x="230" y="${f(yy)}" width="40" height="40" rx="8" fill="none" stroke="${C.ink}" stroke-width="5"/><path d="M238 ${f(yy + 20)} l10 10 l16 -18" stroke="${G}" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="300" y="${f(yy + 10)}" width="${f((520 - i * 60) * k)}" height="22" rx="11" fill="#e4e1df"/></g>`; }
    const ks = eb(seg(tr, 1.8, 2.2));
    s += pop(700, y + 590, ks, `<g transform="rotate(-8 700 ${f(y + 590)})"><rect x="530" y="${f(y + 540)}" width="340" height="100" rx="18" fill="none" stroke="${C.red}" stroke-width="8"/><text x="700" y="${f(y + 608)}" font-family="Archivo" font-weight="900" font-size="54" fill="${C.red}" text-anchor="middle">AGREED</text></g>`);
    return s; })()),
  end: { help: "We'll *build* it | for you." },
};

// B4) Checked on real phones before launch
function miniSite(x, y, w, h, k) {
  let s = '';
  const a = eb(clamp(k * 3)), b = eb(clamp(k * 3 - 1)), c = eb(clamp(k * 3 - 2));
  if (a > 0) s += `<rect x="${f(x)}" y="${f(y)}" width="${f(w * a)}" height="${f(h * .08)}" rx="8" fill="${C.ink}"/>`;
  if (b > 0) s += `<rect x="${f(x)}" y="${f(y + h * .12)}" width="${w}" height="${f(h * .3 * b)}" rx="14" fill="${C.peach}" opacity=".4"/>`;
  if (c > 0) s += `<rect x="${f(x + w * .1)}" y="${f(y + h * .48)}" width="${f(w * .8 * c)}" height="${f(h * .09)}" rx="${f(h * .045)}" fill="${C.red}"/>` +
    [0, 1].map(i => `<rect x="${f(x)}" y="${f(y + h * (.62 + i * .14))}" width="${f(w * (i ? .7 : .95) * c)}" height="${f(h * .07)}" rx="8" fill="#efedeb"/>`).join('');
  return s;
}
function phones(t, a, y0, o = {}) {
  const tr = t - a; let s = '';
  [[95, 250, 500], [395, 290, 600], [735, 250, 520]].forEach(([x, w, h], i) => {
    const yy = y0 + (600 - h) / 2 + float(t, i);
    s += phone(x, yy, w, h, miniSite(x + 34, yy + 80, w - 68, h - 120, clamp((tr - (o.build ?? 0) - i * 0.15) / 0.9)));
    if (o.ticks) s += tick(x + w - 20, yy + 20, 46, eb(seg(tr, o.ticks + i * 0.35, o.ticks + 0.35 + i * 0.35)));
  });
  return s;
}
R['trial-04'] = {
  hook: t => hookScene(t, H,
    kinS(250, 'Checked on | *real* *phones.*', t, -0.45, 100, { step: 0.15 }) +
    phones(t, -0.6, 720, { ticks: 0.9 }) +
    `<g opacity="${f(eo(seg(t, 1.3, 1.6)))}">${lbl('BEFORE LAUNCH', 540, 1430, 36, C.red)}</g>`),
  proof: t => scene(t, H, P, (() => {
    const tr = t - H; let s = kinS(240, 'Built for *phones* | first.', t, H + 0.05, 93, { step: 0.14 });
    s += phones(t, H, 600, { build: 0.2, ticks: 2.2 });
    s += `<g opacity="${f(eo(seg(tr, 2.9, 3.2)))}">${lbl('CHECKED BEFORE IT GOES LIVE', 540, 1320, 30, C.mute)}</g>`;
    return s; })()),
  pay: t => scene(t, P, END, (() => {
    let s = kinS(240, 'What\u2019s built *in:*', t, P + 0.05, 100, { step: 0.14 });
    s += rows(t, P, 110, 580 + float(t, 2), 860, [
      { en: 'Contact, WhatsApp or booking built in', at: 0.6 },
      { en: 'Card payments: Stripe, PayPal, Square', at: 1.2 },
      { en: 'Easy to edit yourself', at: 1.8 },
    ], { rh: 180, size: 42 });
    return s; })()),
  end: { help: "We'll *build* it | for you." },
};

// B5) Websites from £655, plumber in Stockport
R['trial-05'] = {
  hook: t => hookScene(t, H,
    kinS(250, 'Plumber in | *Stockport?*', t, -0.45, 100, { step: 0.15 }) +
    kinS(560, 'No website *yet?*', t, 0.6, 96, { step: 0.15 }) +
    (() => { const y = 760 + float(t); let s = K.searchCard(t, -0.3, y, 'plumber stockport', { h: 520, typeAt: 0, typeDur: 0.8 });
      s += K.resultRows(t, y + 210, 2, { k: i => eb(seg(t, 1.0 + i * 0.2, 1.3 + i * 0.2)) });
      const k = eb(seg(t, 1.5, 1.85));
      s += pop(540, y + 450, k, `<rect x="250" y="${f(y + 410)}" width="580" height="80" rx="40" fill="${C.red}" opacity=".12"/><text x="540" y="${f(y + 464)}" font-family="Archivo" font-weight="900" font-size="40" fill="${C.red}" text-anchor="middle">Not your business.</text>`);
      return s; })()),
  proof: t => scene(t, H, P, (() => {
    const tr = t - H; let s = kinS(240, 'A site *built* for | the phone.', t, H + 0.05, 93, { step: 0.13 });
    const x = 250, y = 520 + float(t, 1), w = 580, h = 900; let inner = '';
    const k = i => eb(seg(tr, 0.3 + i * 0.45, 0.65 + i * 0.45));
    inner += `<g opacity="${f(clamp(k(0)))}"><rect x="${x + 40}" y="${y + 90}" width="${w - 80}" height="70" rx="16" fill="${C.ink}"/><text x="${x + 70}" y="${y + 137}" font-family="Archivo" font-weight="900" font-size="32" fill="#fff">Your Plumbing Co</text></g>`;
    inner += pop(540, y + 260, k(1), `<rect x="${x + 40}" y="${y + 185}" width="${w - 80}" height="160" rx="20" fill="${C.peach}" opacity=".35"/><text x="540" y="${y + 255}" font-family="Archivo" font-weight="900" font-size="40" fill="${C.ink}" text-anchor="middle">Boilers, leaks,</text><text x="540" y="${y + 305}" font-family="Archivo" font-weight="900" font-size="40" fill="${C.ink}" text-anchor="middle">bathrooms.</text>`);
    [['Call now', C.red], ['WhatsApp us', G], ['Book a visit', C.ink]].forEach(([lab, col], i) => {
      const yy = y + 380 + i * 120;
      inner += pop(540, yy + 45, k(2 + i), `<rect x="${x + 60}" y="${yy}" width="${w - 120}" height="90" rx="45" fill="${col}"/><text x="540" y="${yy + 58}" font-family="Archivo" font-weight="900" font-size="38" fill="#fff" text-anchor="middle">${lab}</text>`);
    });
    s += phone(x, y, w, h, inner);
    s += K.demoTag(415, y + h + 24);
    return s; })()),
  pay: t => scene(t, P, END, (() => {
    const tr = t - P; let s = kinS(260, 'Websites', t, P + 0.05, 100, { step: 0.14 });
    const y = 450 + float(t, 2), k = eb(seg(tr, 0.4, 0.8));
    s += pop(540, y + 230, k, card(110, y, 860, 460, 48) + lbl('FROM', 540, y + 110, 44, C.red) +
      `<text x="540" y="${f(y + 330)}" font-family="Archivo" font-weight="900" font-size="230" fill="${C.ink}" text-anchor="middle" letter-spacing="-8">£655</text>`);
    s += line(1000, 'Exact price in a written scope', 46, C.mute, eo(seg(tr, 1.6, 2.0)));
    s += line(1066, 'and quote.', 46, C.mute, eo(seg(tr, 1.6, 2.0)));
    s += `<g opacity="${f(eo(seg(tr, 2.2, 2.6)))}">${lbl('TRADES · HOME SERVICES · ANY SMALL BUSINESS', 540, 1230, 26, C.ink)}</g>`;
    return s; })()),
  end: { help: "We'll *build* it | for you." },
};

// B6) Founding offer, second angle: see it before you pay
R['trial-06'] = {
  hook: t => hookScene(t, H,
    kinS(250, 'See your *website* | *before* you pay.', t, -0.45, 84, { step: 0.14 }) +
    (() => { const x = 290, y = 620 + float(t), w = 500, h = 820;
      let s = phone(x, y, w, h, miniSite(x + 50, y + 110, w - 100, h - 170, clamp(0.3 + t / 1.4)));
      s += chip(540, y + 760, 'PAID: £0', eb(seg(t, 0.9, 1.25)), C.red, '#fff', 38); return s; })()),
  proof: t => scene(t, H, P, (() => {
    const tr = t - H; let s = kinS(240, 'How it *works:*', t, H + 0.05, 100, { step: 0.14 });
    const steps = ['Tell us about your business', 'Scope agreed in writing', 'We write and build it', 'Launch after your yes'];
    steps.forEach((st, i) => {
      const y = 470 + i * 205 + float(t, i), k = eb(seg(tr, 0.4 + i * 0.6, 0.75 + i * 0.6));
      s += pop(540, y + 85, k, card(110, y, 860, 170, 40) + `<circle cx="200" cy="${f(y + 85)}" r="48" fill="${i === 3 ? G : C.red}"/><text x="200" y="${f(y + 104)}" font-family="Archivo" font-weight="900" font-size="54" fill="#fff" text-anchor="middle">${i + 1}</text>` +
        html(280, y + 52, 660, 80, `<span style="${EN(46, C.ink)}letter-spacing:-1px">${esc(st)}</span>`));
    });
    return s; })()),
  pay: t => scene(t, P, END, (() => {
    const tr = t - P; let s = kinS(240, 'Pay only when | you’re *happy.*', t, P + 0.05, 92, { step: 0.14 });
    s += rows(t, P, 110, 560 + float(t, 2), 860, [
      { en: 'Files, domain and logins handed over after payment', at: 0.9 },
      { en: 'Extra changes outside the scope quoted separately', at: 1.5 },
    ], { rh: 190, size: 40 });
    s += chip(540, 1110, 'FIRST 5 CLIENTS ONLY', eb(seg(tr, 2.3, 2.7)), C.red, '#fff', 38);
    return s; })()),
  end: { help: "Ask for a | *founding* place." },
};

function build(key) {
  const r = R[key]; if (!r) throw new Error('unknown extra reel ' + key);
  return {
    dur: DUR,
    frame(t) {
      const md = t >= END ? 'dark' : 'paper';
      return K.bg(t, md) + r.hook(t) + r.proof(t) + r.pay(t) + endX(t, END, r.end);
    },
  };
}
const key = process.env.X;
module.exports = key ? build(key) : {};
module.exports.build = build;
module.exports.KEYS = Object.keys(R);
