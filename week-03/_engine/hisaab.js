// Format card A (niche-report 2026-11-22): belief -> phone-UI proof -> hisaab (the maths)
// "I have Instagram. Why a website?" / "عندي انستقرام… ليش موقع؟"
const { C, clamp, seg, eo, eb, f } = require('./lib');

const DUR = 29.5;
const S = { hook: 0, search: 3.6, dm: 8.4, worst: 13.2, maths: 17.4, ticks: 23.2, end: 26.8 };

// ---------- helpers ----------
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// HTML block inside the SVG (real text layout, Arabic shaping, CSS blur)
function html(x, y, w, h, inner, style = '') {
  return `<foreignObject x="${f(x)}" y="${f(y)}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${w}px;height:${h}px;${style}">${inner}</div></foreignObject>`;
}
// one word, blur-in + rise
function word(s, t, a, st) {
  const k = clamp((t - a) / 0.35);
  const op = eo(k), blur = (1 - eo(k)) * 14, dy = (1 - eo(k)) * 26;
  return `<span style="display:inline-block;opacity:${f(op)};filter:blur(${f(blur)}px);transform:translateY(${f(dy)}px);margin:0 0.14em;${st}">${esc(s)}</span>`;
}
const EN = (size, color, it) => `font-family:Archivo;font-weight:${it ? 800 : 900};font-style:${it ? 'italic' : 'normal'};font-size:${size}px;color:${color};letter-spacing:${it ? -1 : -3}px;line-height:1.05;`;
const AR = (size, color) => `font-family:PlexAr;font-weight:700;font-size:${size}px;color:${color};line-height:1.35;`;
// kinetic English line: words = [[text, color?, italic?]], appearing every `step` s from a
function kin(y, words, t, a, size, o = {}) {
  const step = o.step ?? 0.22, h = o.h ?? size * 1.3;
  const inner = words.map((w, i) => (w === '\n' || w[0] === '\n') ? '<br/>' : word(w[0], t, a + i * step, EN(w.it ? size * 0.92 : size, w[1] || C.ink, w[2]))).join('');
  return html(40, y, 1000, h, inner, 'text-align:center;');
}
// Arabic line under it (~70%), RTL, word by word
function kinAr(y, s, t, a, size, color = C.ink, step = 0.16) {
  const inner = s.split(' ').map((w, i) => word(w, t, a + i * step, AR(size, color))).join('');
  return html(40, y, 1000, size * 1.6, inner, 'text-align:center;direction:rtl;');
}
const shadow = `<filter id="sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#201e1d" flood-opacity=".14"/></filter>`;
function card(x, y, w, h, r = 40, fill = '#fff') {
  return `<rect x="${f(x)}" y="${f(y)}" width="${w}" height="${h}" rx="${r}" fill="${fill}" filter="url(#sh)"/>`;
}
// 4-point star
function star(x, y, r, rot, col = C.peach, op = 1) {
  const q = r * 0.22;
  return `<path transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})" opacity="${f(op)}" fill="${col}" d="M0 ${-r} C${q} ${-q} ${q} ${-q} ${r} 0 C${q} ${q} ${q} ${q} 0 ${r} C${-q} ${q} ${-q} ${q} ${-r} 0 C${-q} ${-q} ${-q} ${-q} 0 ${-r} Z"/>`;
}
function wavy(y, t, col, op = 0.5, amp = 14) {
  let d = '';
  for (let x = -20; x <= 1100; x += 20) d += (x === -20 ? 'M' : 'L') + f(x) + ' ' + f(y + Math.sin(x / 70 + t * 3) * amp);
  return `<path d="${d}" stroke="${col}" stroke-width="4" fill="none" opacity="${op}" stroke-linecap="round"/>`;
}
function bg(t, dark) {
  const base = dark ? C.ink : C.paper, gl = dark ? 'rgba(255,255,255,.045)' : 'rgba(32,30,29,.055)';
  let s = `<defs>${shadow}<radialGradient id="vg" cx="50%" cy="45%" r="75%"><stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="${dark ? .5 : .13}"/></radialGradient>
  <pattern id="gr" width="72" height="72" patternUnits="userSpaceOnUse" patternTransform="translate(0 ${f((t * 12) % 72)})"><path d="M72 0H0V72" fill="none" stroke="${gl}" stroke-width="2"/></pattern></defs>`;
  s += `<rect width="1080" height="1920" fill="${base}"/><rect width="1080" height="1920" fill="url(#gr)"/><rect width="1080" height="1920" fill="url(#vg)"/>`;
  s += star(110, 300, 46, t * 40, C.peach);
  s += star(178, 380, 18, -t * 70, C.peach, .7);
  s += star(975, 1460, 52, -t * 35, C.peach);
  s += star(900, 1540, 20, t * 80, C.peach, .7);
  s += wavy(1640, t, dark ? C.peach : C.red, dark ? .45 : .35);
  return s;
}
// scene wrapper: fade/slide in at a, out at b
function scene(t, a, b, inner) {
  if (t < a - 0.01 || t > b + 0.01) return '';
  const kin_ = eo(seg(t, a, a + 0.35)), kout = seg(t, b - 0.3, b);
  const op = Math.min(kin_, 1 - kout);
  return `<g opacity="${f(op)}" transform="translate(0 ${f((1 - kin_) * 40 - kout * 40)})">${inner}</g>`;
}
const float = (t, ph = 0) => Math.sin(t * 2.2 + ph) * 6;
const lbl = (s, x, y, size, col, anchor = 'middle') => `<text x="${f(x)}" y="${f(y)}" font-family="JB" font-weight="700" font-size="${size}" fill="${col}" text-anchor="${anchor}" letter-spacing="2">${s}</text>`;

// ---------- scenes ----------
function sHook(t) {
  const a = S.hook;
  let s = '';
  s += kin(300, [['You', C.ink, 1], ['think…', C.red, 1]], t, a - 0.3, 120, { step: 0.25 });
  s += kinAr(460, 'تقول…', t, a + 0.05, 80, C.red);
  s += kin(640, [['I', C.ink], ['have', C.ink], ['Instagram.', C.ink]], t, a + 0.9, 104, { step: 0.2 });
  s += kin(780, [['Why', C.ink], ['a', C.ink], ['website?', C.red]], t, a + 1.5, 116, { step: 0.2 });
  s += kinAr(940, 'عندي انستقرام… ليش موقع؟', t, a + 1.7, 76);
  // little Instagram-style profile card with posts popping in
  const k = eb(seg(t, a + 0.1, a + 0.6)), y0 = 1120 + float(t);
  s += `<g transform="translate(540 ${f(y0 + 180)}) scale(${f(k)}) translate(-540 ${f(-(y0 + 180))})">`;
  s += card(250, y0, 580, 380, 44);
  s += `<circle cx="330" cy="${f(y0 + 80)}" r="44" fill="none" stroke="${C.peach}" stroke-width="7"/><circle cx="330" cy="${f(y0 + 80)}" r="34" fill="#e4e1df"/>`;
  s += `<rect x="400" y="${f(y0 + 56)}" width="220" height="20" rx="10" fill="#d9d5d2"/><rect x="400" y="${f(y0 + 90)}" width="140" height="16" rx="8" fill="#e8e5e3"/>`;
  for (let i = 0; i < 6; i++) {
    const kk = eb(seg(t, a + 0.4 + i * 0.18, a + 0.7 + i * 0.18));
    const cx = 290 + (i % 3) * 172, cy = y0 + 150 + Math.floor(i / 3) * 110;
    s += `<rect x="${f(cx + 80 * (1 - kk))}" y="${f(cy + 50 * (1 - kk))}" width="${f(160 * kk)}" height="${f(100 * kk)}" rx="14" fill="${i % 2 ? '#f0d9cf' : '#e7e3e0'}"/>`;
  }
  s += `</g>`;
  return scene(t, -1, S.search, s);
}

function sSearch(t) {
  const a = S.search;
  let s = '';
  s += kin(270, [['Your', C.ink], ['customer', C.ink], ['\n'], ['searches…', C.red]], t, a + 0.1, 96, { h: 240 });
  s += kinAr(500, 'زبونك يدوّر عليك…', t, a + 0.4, 66);
  const y0 = 640 + float(t, 1);
  s += card(110, y0, 860, 640, 48);
  // search bar
  s += `<rect x="160" y="${f(y0 + 50)}" width="760" height="110" rx="55" fill="#f4f3f2" stroke="#e2dfdc" stroke-width="3"/>`;
  s += `<circle cx="225" cy="${f(y0 + 100)}" r="20" fill="none" stroke="${C.mute}" stroke-width="6"/><path d="M240 ${f(y0 + 116)} l18 18" stroke="${C.mute}" stroke-width="7" stroke-linecap="round"/>`;
  const q = 'your shop name', n = Math.floor(clamp((t - a - 0.7) / 1.1) * q.length);
  const cursor = (Math.floor(t * 2.5) % 2 === 0 || (n > 0 && n < q.length)) ? `<span style="display:inline-block;width:4px;height:46px;background:${C.red};vertical-align:-8px;margin-left:3px"></span>` : '';
  s += html(280, y0 + 72, 600, 70, `<span style="font-family:Archivo;font-weight:800;font-size:46px;color:${C.ink}">${q.slice(0, n)}</span>${cursor}`);
  s += kinAr(y0 + 165, 'اسم محلك', t, a + 1.0, 40, C.mute);
  // results skeleton (shimmer) then "No results"
  const tr = t - a, skel = tr > 2.0 && tr < 3.0, none = tr >= 3.0;
  if (skel) {
    for (let i = 0; i < 3; i++) {
      const sh = 0.45 + 0.35 * Math.sin(t * 12 - i);
      s += `<rect x="170" y="${f(y0 + 270 + i * 110)}" width="${560 - i * 90}" height="26" rx="13" fill="#e4e1de" opacity="${f(sh)}"/><rect x="170" y="${f(y0 + 312 + i * 110)}" width="${700 - i * 60}" height="18" rx="9" fill="#eeebe9" opacity="${f(sh)}"/>`;
    }
  }
  if (none) {
    const k = eb(seg(tr, 3.0, 3.4));
    s += `<g transform="translate(540 ${f(y0 + 360)}) scale(${f(k)})"><circle r="62" fill="${C.red}" opacity=".12"/><path d="M-22 -22 L22 22 M22 -22 L-22 22" stroke="${C.red}" stroke-width="12" stroke-linecap="round"/></g>`;
    s += kin(y0 + 440, [['No', C.red], ['results.', C.red]], t, a + 3.05, 84);
    s += kinAr(y0 + 535, 'ما في نتايج.', t, a + 3.3, 56, C.red);
  }
  return scene(t, S.search, S.dm, s);
}

function clock(cx, cy, r, t, speed) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${C.ink}" stroke-width="8"/>` +
    [0, 1, 2, 3].map(i => `<rect x="${cx - 4}" y="${cy - r + 10}" width="8" height="16" rx="4" fill="${C.ink}" transform="rotate(${i * 90} ${cx} ${cy})"/>`).join('') +
    `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * 0.72}" stroke="${C.red}" stroke-width="8" stroke-linecap="round" transform="rotate(${f(t * speed * 360)} ${cx} ${cy})"/>` +
    `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * 0.48}" stroke="${C.ink}" stroke-width="10" stroke-linecap="round" transform="rotate(${f(t * speed * 30)} ${cx} ${cy})"/><circle cx="${cx}" cy="${cy}" r="9" fill="${C.ink}"/>`;
}
function sDM(t) {
  const a = S.dm, tr = t - a;
  let s = '';
  s += kin(270, [['So', C.ink], ['they', C.ink], ['DM', C.ink], ['you.', C.red]], t, a + 0.1, 96);
  s += kinAr(400, 'يراسلونك…', t, a + 0.4, 66);
  const y0 = 540 + float(t, 2);
  s += card(130, y0, 820, 700, 48);
  // chat header
  s += `<circle cx="215" cy="${f(y0 + 75)}" r="36" fill="#e4e1df"/><rect x="270" y="${f(y0 + 52)}" width="200" height="20" rx="10" fill="#d9d5d2"/><rect x="270" y="${f(y0 + 84)}" width="120" height="14" rx="7" fill="#ebe8e6"/>`;
  s += `<line x1="130" y1="${f(y0 + 140)}" x2="950" y2="${f(y0 + 140)}" stroke="#eeebe9" stroke-width="3"/>`;
  // customer bubble (left)
  const kb = eb(seg(tr, 0.6, 0.9));
  if (kb > 0) {
    s += `<g transform="translate(190 ${f(y0 + 200)}) scale(${f(kb)})"><rect x="0" y="0" width="330" height="150" rx="40" fill="#efedeb"/></g>`;
    s += html(190, y0 + 208, 330, 140, `<div style="${EN(50, C.ink)}letter-spacing:-1px;opacity:${f(kb)}">Price?</div><div style="${AR(38, C.ink)}direction:rtl;text-align:left;opacity:${f(kb)}">كم السعر؟</div>`, 'padding:12px 34px;box-sizing:border-box;');
  }
  // typing dots then "Seen"
  if (tr > 1.0 && tr < 1.8) for (let i = 0; i < 3; i++) s += `<circle cx="${210 + i * 28}" cy="${f(y0 + 395 - Math.abs(Math.sin(t * 9 + i)) * 10)}" r="9" fill="${C.mute}"/>`;
  if (tr >= 1.8) {
    const k = eo(seg(tr, 1.8, 2.1));
    s += `<g opacity="${f(k)}">${lbl('Seen', 200, y0 + 395, 30, C.mute, 'start')}</g>`;
    s += html(300, y0 + 362, 300, 60, `<span style="${AR(30, C.mute)}">· شافها</span>`, 'direction:rtl;text-align:right;width:auto;');
  }
  // clock spinning
  const kc = eb(seg(tr, 1.9, 2.3));
  if (kc > 0) s += `<g transform="translate(540 ${f(y0 + 560)}) scale(${f(kc)}) translate(-540 ${f(-(y0 + 560))})">${clock(540, y0 + 560, 95, Math.max(0, tr - 1.9), 1.6)}</g>`;
  if (tr > 2.6) {
    s += kin(1290, [['Reply…', C.ink], ['next', C.red], ['day.', C.red]], t, a + 2.7, 92);
    s += kinAr(1410, 'الرد… باچر.', t, a + 3.0, 64, C.red);
  }
  return scene(t, S.dm, S.worst, s);
}

function sWorst(t) {
  const a = S.worst, tr = t - a;
  let s = '';
  const k = eb(seg(tr, 0.1, 0.5)), wob = Math.sin(t * 7) * 3;
  s += `<g transform="translate(540 520) scale(${f(k)}) rotate(${f(wob)})"><path d="M0 -130 L125 95 L-125 95 Z" fill="${C.red}" stroke="${C.red}" stroke-width="30" stroke-linejoin="round"/><rect x="-11" y="-55" width="22" height="90" rx="11" fill="#fff"/><circle cx="0" cy="68" r="14" fill="#fff"/></g>`;
  s += kin(720, [['The', '#fff'], ['worst', '#fff'], ['part?', C.peach]], t, a + 0.4, 108);
  s += kinAr(870, 'والأسوأ؟', t, a + 0.7, 76, C.peach);
  s += kin(1030, [['They', '#fff'], ['bought', '#fff'], ['\n'], ['from', '#fff'], ['the', '#fff'], ['shop', '#fff'], ['\n'], ['that', '#fff'], ['had', '#fff'], ['a', '#fff'], ['website.', C.red]], t, a + 1.5, 84, { step: 0.17, h: 320 });
  s += kinAr(1370, 'اشتروا من المحل اللي عنده موقع.', t, a + 2.3, 58, '#d8d3cf', 0.13);
  return scene(t, S.worst, S.maths, s);
}

function sMaths(t) {
  const a = S.maths, tr = t - a;
  let s = '';
  s += kin(250, [['One', C.ink, 1], ['minute.', C.ink, 1], ['\n'], ['Do', C.ink], ['the', C.ink], ['maths:', C.red]], t, a + 0.1, 84, { step: 0.18, h: 200 });
  s += kinAr(430, 'دقيقة… احسبها:', t, a + 0.5, 64);
  const y0 = 560 + float(t, 3);
  s += card(110, y0, 860, 900, 48);
  // "example" tag
  s += `<rect x="150" y="${f(y0 + 40)}" width="290" height="58" rx="29" fill="${C.peach}" opacity=".2"/>`;
  s += lbl('EXAMPLE', 180, y0 + 80, 28, C.red, 'start');
  s += html(320, y0 + 44, 110, 56, `<span style="${AR(30, C.red)}">مثال</span>`, 'direction:rtl;text-align:center;');
  const num = (v, k) => Math.round(v * eo(k));
  const rows = [
    { at: 1.0, en: 'Lost orders a month', ar: 'طلبات ضايعة بالشهر', val: k => `${num(4, k)}` },
    { at: 1.6, en: 'Each order', ar: 'كل طلب', val: k => `× ${num(15, k)} KD` },
    { at: 2.2, en: 'Every month', ar: 'كل شهر', val: k => `= ${num(60, k)} KD`, col: C.ink },
    { at: 2.9, en: 'In 6 months', ar: 'في ٦ شهور', val: k => `× 6`, col: C.ink },
  ];
  rows.forEach((r, i) => {
    const y = y0 + 150 + i * 135, k = seg(tr, r.at, r.at + 0.6), op = eo(seg(tr, r.at, r.at + 0.25));
    if (op <= 0) return;
    s += `<g opacity="${f(op)}">`;
    s += html(160, y, 470, 120, `<div style="${EN(40, C.ink)}letter-spacing:-1px">${r.en}</div><div style="${AR(32, C.mute)}direction:rtl;text-align:left">${r.ar}</div>`);
    s += `<text x="920" y="${f(y + 62)}" font-family="Archivo" font-weight="900" font-size="62" fill="${r.col || C.ink}" text-anchor="end" letter-spacing="-2">${r.val(k)}</text>`;
    s += `<line x1="160" y1="${f(y + 122)}" x2="920" y2="${f(y + 122)}" stroke="#efecea" stroke-width="3"/></g>`;
  });
  // total
  const kt = seg(tr, 3.6, 4.6);
  if (tr > 3.5) {
    const pop = 1 + 0.08 * Math.sin(clamp((tr - 4.6) / 0.4) * Math.PI);
    s += `<rect x="150" y="${f(y0 + 700)}" width="780" height="160" rx="32" fill="${C.red}" opacity="${f(eo(seg(tr, 3.5, 3.8)))}"/>`;
    s += `<text x="190" y="${f(y0 + 800)}" font-family="Archivo" font-weight="900" font-size="48" fill="#fff" opacity="${f(eo(seg(tr, 3.5, 3.8)))}">Lost</text>`;
    s += html(190, y0 + 812, 300, 50, `<span style="${AR(30, '#fff')}">ضاع عليك</span>`, 'direction:rtl;text-align:left;opacity:' + f(eo(seg(tr, 3.5, 3.8))));
    s += `<g transform="translate(900 ${f(y0 + 812)}) scale(${f(pop)})"><text x="0" y="0" font-family="Archivo" font-weight="900" font-size="104" fill="#fff" text-anchor="end" letter-spacing="-4">${Math.round(360 * eo(kt))} KD</text></g>`;
  }
  return scene(t, S.maths, S.ticks, s);
}

function sTicks(t) {
  const a = S.ticks, tr = t - a;
  let s = '';
  s += kin(270, [['The', C.ink], ['fix:', C.red]], t, a + 0.05, 104);
  s += kinAr(410, 'الحل:', t, a + 0.25, 72);
  const items = [
    ['Found on Google', 'تطلع في قوقل'],
    ['Answers on WhatsApp,', 'يرد على الواتساب حتى ٢ الفجر', 'even at 2 a.m.'],
    ['Real photos, real trust', 'صور حقيقية، ثقة حقيقية'],
  ];
  items.forEach((it, i) => {
    const at = 0.5 + i * 0.75, k = eb(seg(tr, at, at + 0.4)), y = 560 + i * 280 + float(t, i);
    if (k <= 0) return;
    s += `<g transform="translate(540 ${f(y + 115)}) scale(${f(0.85 + 0.15 * k)}) translate(-540 ${f(-(y + 115))})" opacity="${f(clamp(k))}">`;
    s += card(90, y, 900, 230, 40);
    // tick
    const kk = eb(seg(tr, at + 0.25, at + 0.6));
    s += `<g transform="translate(185 ${f(y + 115)}) scale(${f(kk)})"><circle r="52" fill="${C.green}"/><path d="M-22 2 L-6 18 L24 -16" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    const en = it[2] ? `${it[0]}<br/>${it[2]}` : it[0];
    s += html(270, y + (it[2] ? 18 : 40), 700, 210, `<div style="${EN(52, C.ink)}letter-spacing:-2px">${en}</div><div style="${AR(38, C.mute)}direction:rtl;text-align:left;margin-top:6px">${it[1]}</div>`);
    s += `</g>`;
  });
  return scene(t, S.ticks, S.end, s);
}

function sEnd(t) {
  const a = S.end, lt = t - a;
  if (lt < 0) return '';
  let s = '';
  const k = eb(seg(lt, 0, 0.5)), spread = (1 - eo(seg(lt, 0.1, 0.7))) * 120;
  s += `<g opacity="${f(eo(seg(lt, 0, 0.3)))}">`;
  s += `<text x="${f(170 + spread)}" y="830" font-family="Archivo" font-weight="900" font-size="150" fill="${C.peach}" text-anchor="middle">[</text>`;
  s += `<text x="${f(910 - spread)}" y="830" font-family="Archivo" font-weight="900" font-size="150" fill="${C.peach}" text-anchor="middle">]</text>`;
  s += `<text x="540" y="822" font-family="Archivo" font-weight="900" font-size="${f(118 * k)}" fill="#fff" text-anchor="middle" letter-spacing="-4">BRACKET</text>`;
  s += lbl('SOFTWARE HOUSE · KUWAIT', 540, 900, 30, C.peach);
  s += `</g>`;
  s += kin(1060, [['Software', '#fff'], ['that', '#fff'], ['gets', '#fff'], ['it', '#fff'], ['done.', C.peach]], t, a + 0.6, 66, { step: 0.16 });
  s += kinAr(1170, 'برمجيات تنجز الشغل.', t, a + 1.1, 54, '#d8d3cf');
  return s;
}

module.exports = {
  dur: DUR, S, bg, sHook, sSearch,
  frame(t) {
    const dark = (t >= S.worst && t < S.maths) || t >= S.end;
    return bg(t, dark) + sHook(t) + sSearch(t) + sDM(t) + sWorst(t) + sMaths(t) + sTicks(t) + sEnd(t);
  },
};
