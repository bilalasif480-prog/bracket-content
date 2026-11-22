// week-03 kit: the hisaab.js look (paper bg, kinetic Archivo words, red key word, peach stars,
// white animated UI cards, EN big + Gulf Arabic under) as reusable parts. Own end card (not lib.endCard()).
const { C, clamp, seg, eo, eb, f } = require('./lib');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
function html(x, y, w, h, inner, style = '') {
  return `<foreignObject x="${f(x)}" y="${f(y)}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${w}px;height:${h}px;${style}">${inner}</div></foreignObject>`;
}
function word(s, t, a, st) {
  const k = clamp((t - a) / 0.35);
  const op = eo(k), blur = (1 - eo(k)) * 14, dy = (1 - eo(k)) * 26;
  return `<span style="display:inline-block;opacity:${f(op)};filter:blur(${f(blur)}px);transform:translateY(${f(dy)}px);margin:0 0.14em;${st}">${esc(s)}</span>`;
}
const EN = (size, color, it) => `font-family:Archivo;font-weight:${it ? 800 : 900};font-style:${it ? 'italic' : 'normal'};font-size:${size}px;color:${color};letter-spacing:${it ? -1 : -3}px;line-height:1.05;`;
const AR = (size, color) => `font-family:PlexAr,Archivo;font-weight:700;font-size:${size}px;color:${color};line-height:1.35;`;
// kinetic English: words = [[text, color?, italic?]] or '\n'
function kin(y, words, t, a, size, o = {}) {
  const step = o.step ?? 0.22, h = o.h ?? size * 1.3;
  const inner = words.map((w, i) => (w === '\n' || w[0] === '\n') ? '<br/>' : word(w[0], t, a + i * step, EN(size, w[1] || o.col || C.ink, w[2]))).join('');
  return html(40, y, 1000, h, inner, 'text-align:center;');
}
// shorthand: kinS(y, "Your customer *searches*", ...) — *word* = accent colour, _word_ = italic, | = line break
function kinS(y, str, t, a, size, o = {}) {
  const base = o.col || C.ink, acc = o.acc || C.red;
  const words = str.split(' ').flatMap(w => {
    if (w === '|') return ['\n'];
    if (w.startsWith('*') && w.endsWith('*')) return [[w.slice(1, -1), acc]];
    if (w.startsWith('_') && w.endsWith('_')) return [[w.slice(1, -1), base, 1]];
    return [[w, base]];
  });
  const lines = words.filter(w => w === '\n').length + 1;
  return kin(y, words, t, a, size, { ...o, h: o.h ?? size * 1.3 * lines });
}
function kinAr(y, s, t, a, size, color = C.ink, step = 0.16) {
  const inner = s.split(' ').map((w, i) => word(w, t, a + i * step, AR(size, color))).join('');
  return html(40, y, 1000, size * 1.6 * (o_lines(s)), inner, 'text-align:center;direction:rtl;');
}
const o_lines = s => 1 + Math.floor(s.length / 34);
const shadow = `<filter id="sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#201e1d" flood-opacity=".14"/></filter>`;
function card(x, y, w, h, r = 40, fill = '#fff') {
  return `<rect x="${f(x)}" y="${f(y)}" width="${w}" height="${h}" rx="${r}" fill="${fill}" filter="url(#sh)"/>`;
}
function star(x, y, r, rot, col = C.peach, op = 1) {
  const q = r * 0.22;
  return `<path transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})" opacity="${f(op)}" fill="${col}" d="M0 ${-r} C${q} ${-q} ${q} ${-q} ${r} 0 C${q} ${q} ${q} ${q} 0 ${r} C${-q} ${q} ${-q} ${q} ${-r} 0 C${-q} ${-q} ${-q} ${-q} 0 ${-r} Z"/>`;
}
function wavy(y, t, col, op = 0.5, amp = 14) {
  let d = '';
  for (let x = -20; x <= 1100; x += 20) d += (x === -20 ? 'M' : 'L') + f(x) + ' ' + f(y + Math.sin(x / 70 + t * 3) * amp);
  return `<path d="${d}" stroke="${col}" stroke-width="4" fill="none" opacity="${op}" stroke-linecap="round"/>`;
}
// mode: 'paper' | 'dark' | 'night' (dark + moon-ish dots)
function bg(t, mode = 'paper') {
  const dark = mode !== 'paper';
  const base = dark ? C.ink : C.paper, gl = dark ? 'rgba(255,255,255,.045)' : 'rgba(32,30,29,.055)';
  let s = `<defs>${shadow}<radialGradient id="vg" cx="50%" cy="45%" r="75%"><stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="${dark ? .5 : .13}"/></radialGradient>
  <pattern id="gr" width="72" height="72" patternUnits="userSpaceOnUse" patternTransform="translate(0 ${f((t * 12) % 72)})"><path d="M72 0H0V72" fill="none" stroke="${gl}" stroke-width="2"/></pattern></defs>`;
  s += `<rect width="1080" height="1920" fill="${base}"/><rect width="1080" height="1920" fill="url(#gr)"/><rect width="1080" height="1920" fill="url(#vg)"/>`;
  if (mode === 'night') {
    for (let i = 0; i < 26; i++) {
      const x = (i * 397) % 1040 + 20, y = (i * 233) % 1500 + 140, tw = 0.35 + 0.35 * Math.sin(t * 3 + i);
      s += `<circle cx="${x}" cy="${y}" r="${2 + (i % 3)}" fill="#fff" opacity="${f(tw)}"/>`;
    }
  }
  s += star(110, 300, 46, t * 40, C.peach);
  s += star(178, 380, 18, -t * 70, C.peach, .7);
  s += star(975, 1460, 52, -t * 35, C.peach);
  s += star(900, 1540, 20, t * 80, C.peach, .7);
  s += wavy(1640, t, dark ? C.peach : C.red, dark ? .45 : .35);
  return s;
}
function scene(t, a, b, inner) {
  if (t < a - 0.01 || t > b + 0.01) return '';
  const kin_ = eo(seg(t, a, a + 0.35)), kout = seg(t, b - 0.3, b);
  const op = Math.min(kin_, 1 - kout);
  return `<g opacity="${f(op)}" transform="translate(0 ${f((1 - kin_) * 40 - kout * 40)})">${inner}</g>`;
}
// hook scene: fades out at b, but is already fully visible at frame 0
function hookScene(t, b, inner) {
  if (t > b + 0.01) return '';
  const kout = seg(t, b - 0.3, b);
  return `<g opacity="${f(1 - kout)}" transform="translate(0 ${f(-kout * 40)})">${inner}</g>`;
}
const float = (t, ph = 0) => Math.sin(t * 2.2 + ph) * 6;
const lbl = (s, x, y, size, col, anchor = 'middle') => `<text x="${f(x)}" y="${f(y)}" font-family="JB" font-weight="700" font-size="${size}" fill="${col}" text-anchor="${anchor}" letter-spacing="2">${s}</text>`;
const pop = (cx, cy, k, inner) => `<g transform="translate(${f(cx)} ${f(cy)}) scale(${f(Math.max(0, k))}) translate(${f(-cx)} ${f(-cy)})">${inner}</g>`;
// small pill: EN (mono) + AR
function pill(x, y, en, ar, col = C.red, w = 300) {
  return `<rect x="${x}" y="${f(y)}" width="${w}" height="58" rx="29" fill="${C.peach}" opacity=".2"/>` + lbl(en, x + 28, y + 40, 28, col, 'start') +
    html(x + w - 130, y + 4, 115, 56, `<span style="${AR(30, col)}">${ar}</span>`, 'direction:rtl;text-align:center;');
}
function clock(cx, cy, r, t, speed) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${C.ink}" stroke-width="8"/>` +
    [0, 1, 2, 3].map(i => `<rect x="${cx - 4}" y="${cy - r + 10}" width="8" height="16" rx="4" fill="${C.ink}" transform="rotate(${i * 90} ${cx} ${cy})"/>`).join('') +
    `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * 0.72}" stroke="${C.red}" stroke-width="8" stroke-linecap="round" transform="rotate(${f(t * speed * 360)} ${cx} ${cy})"/>` +
    `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * 0.48}" stroke="${C.ink}" stroke-width="10" stroke-linecap="round" transform="rotate(${f(t * speed * 30)} ${cx} ${cy})"/><circle cx="${cx}" cy="${cy}" r="9" fill="${C.ink}"/>`;
}
// big digital time chip
function timeChip(cx, cy, s, k = 1, dark = false) {
  const w = 120 + s.length * 52;
  return pop(cx, cy, k, `<rect x="${f(cx - w / 2)}" y="${f(cy - 75)}" width="${w}" height="150" rx="40" fill="${dark ? '#2d2a28' : '#fff'}" filter="url(#sh)"/><text x="${cx}" y="${f(cy + 32)}" font-family="Archivo" font-weight="900" font-size="96" fill="${dark ? '#fff' : C.ink}" text-anchor="middle" letter-spacing="-3">${s}</text>`);
}
function moon(cx, cy, r, t) {
  return `<circle cx="${cx}" cy="${cy}" r="${r * 1.5}" fill="${C.peach}" opacity="${f(.08 + .04 * Math.sin(t * 2))}"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.peach}"/><circle cx="${f(cx + r * .45)}" cy="${f(cy - r * .3)}" r="${f(r * .85)}" fill="${C.ink}"/>`;
}
// search card (bar types q, then shimmer, then "No results" if none)
function searchCard(t, a, y0, q, o = {}) {
  const tr = t - a; let s = card(110, y0, 860, o.h || 560, 48);
  s += `<rect x="160" y="${f(y0 + 50)}" width="760" height="110" rx="55" fill="#f4f3f2" stroke="#e2dfdc" stroke-width="3"/>`;
  s += `<circle cx="225" cy="${f(y0 + 100)}" r="20" fill="none" stroke="${C.mute}" stroke-width="6"/><path d="M240 ${f(y0 + 116)} l18 18" stroke="${C.mute}" stroke-width="7" stroke-linecap="round"/>`;
  const n = Math.floor(clamp((tr - (o.typeAt ?? 0.2)) / (o.typeDur ?? 0.9)) * q.length);
  const cursor = (Math.floor(t * 2.5) % 2 === 0 || (n > 0 && n < q.length)) ? `<span style="display:inline-block;width:4px;height:46px;background:${C.red};vertical-align:-8px;margin-left:3px"></span>` : '';
  s += html(280, y0 + 72, 620, 70, `<span style="font-family:Archivo;font-weight:800;font-size:${o.qs || 46}px;color:${C.ink}">${esc(q.slice(0, n))}</span>${cursor}`);
  return s;
}
function resultRows(t, y0, n, o = {}) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const k = o.k ? o.k(i) : 1;
    if (k <= 0) continue;
    const y = y0 + i * (o.gap || 105);
    s += `<g opacity="${f(clamp(k))}"><rect x="170" y="${f(y)}" width="${f((470 - i * 50) * k)}" height="28" rx="14" fill="${o.col || '#cfd6e4'}"/><rect x="170" y="${f(y + 42)}" width="${f((680 - i * 40) * k)}" height="18" rx="9" fill="#eeebe9"/></g>`;
  }
  return s;
}
// chat card. msgs: {at, side:'l'|'r', en, ar, w?, col?}
function chatCard(t, a, x, y0, w, h, msgs, o = {}) {
  const tr = t - a; let s = card(x, y0, w, h, 48);
  s += `<circle cx="${x + 85}" cy="${f(y0 + 75)}" r="36" fill="${o.avatar || '#e4e1df'}"/>`;
  if (o.title) s += `<text x="${x + 140}" y="${f(y0 + 70)}" font-family="Archivo" font-weight="900" font-size="36" fill="${C.ink}">${esc(o.title)}</text>` + (o.sub ? lbl(o.sub, x + 140, y0 + 108, 24, o.subCol || C.mute, 'start') : '');
  else s += `<rect x="${x + 140}" y="${f(y0 + 52)}" width="200" height="20" rx="10" fill="#d9d5d2"/><rect x="${x + 140}" y="${f(y0 + 84)}" width="120" height="14" rx="7" fill="#ebe8e6"/>`;
  s += `<line x1="${x}" y1="${f(y0 + 140)}" x2="${x + w}" y2="${f(y0 + 140)}" stroke="#eeebe9" stroke-width="3"/>`;
  let y = y0 + 175;
  msgs.forEach(m => {
    const k = eb(seg(tr, m.at, m.at + 0.3)), bh = m.ar ? 128 : 84, bw = m.w || 430;
    if (k > 0) {
      const bx = m.side === 'r' ? x + w - 45 - bw : x + 45;
      const fill = m.col || (m.side === 'r' ? '#dff3e8' : '#efedeb');
      s += pop(m.side === 'r' ? bx + bw : bx, y, k, `<rect x="${bx}" y="${f(y)}" width="${bw}" height="${bh}" rx="34" fill="${fill}"/>`);
      s += html(bx, y + 8, bw, bh, `<div style="${EN(m.size || 38, C.ink)}letter-spacing:-1px;opacity:${f(clamp(k))}">${esc(m.en)}</div>` + (m.ar ? `<div style="${AR(30, C.mute)}direction:rtl;text-align:left;opacity:${f(clamp(k))}">${esc(m.ar)}</div>` : ''), 'padding:10px 28px;box-sizing:border-box;');
      if (m.meta) s += `<g opacity="${f(clamp(k))}">${lbl(m.meta, m.side === 'r' ? bx + bw - 10 : bx + 10, y + bh + 30, 22, m.metaCol || C.mute, m.side === 'r' ? 'end' : 'start')}</g>`;
    }
    y += bh + (m.meta ? 52 : 26);
  });
  if (o.typing && tr > o.typing[0] && tr < o.typing[1]) for (let i = 0; i < 3; i++) s += `<circle cx="${(o.typingSide === 'r' ? x + w - 130 : x + 75) + i * 28}" cy="${f(y + 20 - Math.abs(Math.sin(t * 9 + i)) * 10)}" r="9" fill="${C.mute}"/>`;
  return s;
}
// phone frame
function phone(x, y, w, h, inner = '', dark = false) {
  return `<rect x="${f(x)}" y="${f(y)}" width="${w}" height="${h}" rx="64" fill="${C.ink}" filter="url(#sh)"/><rect x="${f(x + 16)}" y="${f(y + 16)}" width="${w - 32}" height="${h - 32}" rx="50" fill="${dark ? '#2d2a28' : '#fff'}"/><rect x="${f(x + w / 2 - 60)}" y="${f(y + 30)}" width="120" height="30" rx="15" fill="${C.ink}"/>` + inner;
}
// tick card list
function tickList(t, a, items, o = {}) {
  let s = ''; const y0 = o.y0 ?? 560, gap = o.gap ?? 280, ch = o.ch ?? 230;
  items.forEach((it, i) => {
    const at = (o.start ?? 0.5) + i * (o.step ?? 0.75), k = eb(seg(t - a, at, at + 0.4)), y = y0 + i * gap + float(t, i);
    if (k <= 0) return;
    s += `<g transform="translate(540 ${f(y + ch / 2)}) scale(${f(0.85 + 0.15 * k)}) translate(-540 ${f(-(y + ch / 2))})" opacity="${f(clamp(k))}">`;
    s += card(90, y, 900, ch, 40);
    const kk = eb(seg(t - a, at + 0.25, at + 0.6));
    const icon = it.x ? `<circle r="52" fill="${C.red}"/><path d="M-20 -20 L20 20 M20 -20 L-20 20" stroke="#fff" stroke-width="12" stroke-linecap="round"/>` : `<circle r="52" fill="${C.green}"/><path d="M-22 2 L-6 18 L24 -16" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<g transform="translate(185 ${f(y + ch / 2)}) scale(${f(kk)})">${icon}</g>`;
    const two = it.en.includes('|');
    s += html(270, y + (two ? 14 : ch / 2 - 75), 700, ch, `<div style="${EN(o.size || 50, C.ink)}letter-spacing:-2px">${it.en.split('|').map(esc).join('<br/>')}</div><div style="${AR(o.arSize || 36, C.mute)}direction:rtl;text-align:left;margin-top:6px">${esc(it.ar)}</div>`);
    s += `</g>`;
  });
  return s;
}
// "one minute, do the maths" card. rows: {at,en,ar,val:(num,k)=>string}. total: {en, ar, value, at}
function calc(t, a, o) {
  const tr = t - a; let s = '';
  s += lbl(`HISAAB #${o.n}`, 70, 225, 30, C.red, 'start');
  s += html(360, 190, 260, 50, `<span style="${AR(30, C.red)}">· حسبة دقيقة</span>`, 'direction:rtl;text-align:left;');
  s += kin(250, [['One', C.ink, 1], ['minute.', C.ink, 1], ['\n'], ['Do', C.ink], ['the', C.ink], ['maths:', C.red]], t, a + 0.1, 84, { step: 0.18, h: 200 });
  s += kinAr(430, 'دقيقة… احسبها:', t, a + 0.5, 64);
  const y0 = 560 + float(t, 3);
  s += card(110, y0, 860, 900, 48);
  s += pill(150, y0 + 40, 'EXAMPLE', 'مثال', C.red, 290);
  const num = (v, k) => Math.round(v * eo(k)).toLocaleString('en-US');
  o.rows.forEach((r, i) => {
    const y = y0 + 150 + i * 135, k = seg(tr, r.at, r.at + 0.6), op = eo(seg(tr, r.at, r.at + 0.25));
    if (op <= 0) return;
    s += `<g opacity="${f(op)}">`;
    s += html(160, y, 470, 120, `<div style="${EN(40, C.ink)}letter-spacing:-1px">${r.en}</div><div style="${AR(32, C.mute)}direction:rtl;text-align:left">${r.ar}</div>`);
    s += `<text x="920" y="${f(y + 62)}" font-family="Archivo" font-weight="900" font-size="62" fill="${C.ink}" text-anchor="end" letter-spacing="-2">${r.val(num, k)}</text>`;
    s += `<line x1="160" y1="${f(y + 122)}" x2="920" y2="${f(y + 122)}" stroke="#efecea" stroke-width="3"/></g>`;
  });
  const T = o.total, kt = seg(tr, T.at + 0.1, T.at + 1.1);
  if (tr > T.at) {
    const op = eo(seg(tr, T.at, T.at + 0.3)), popk = 1 + 0.08 * Math.sin(clamp((tr - T.at - 1.1) / 0.4) * Math.PI);
    s += `<rect x="150" y="${f(y0 + 700)}" width="780" height="160" rx="32" fill="${C.red}" opacity="${f(op)}"/>`;
    s += `<text x="190" y="${f(y0 + 790)}" font-family="Archivo" font-weight="900" font-size="44" fill="#fff" opacity="${f(op)}">${T.en}</text>`;
    s += html(190, y0 + 800, 330, 50, `<span style="${AR(30, '#fff')}">${T.ar}</span>`, 'direction:rtl;text-align:left;opacity:' + f(op));
    s += `<g transform="translate(900 ${f(y0 + 812)}) scale(${f(popk)})"><text x="0" y="0" font-family="Archivo" font-weight="900" font-size="${T.size || 100}" fill="#fff" text-anchor="end" letter-spacing="-4">${Math.round(T.value * eo(kt)).toLocaleString('en-US')} KD</text></g>`;
  }
  return s;
}
// end card (dark): [ BRACKET ] + slogan
function endCard(t, a, o = {}) {
  const lt = t - a; if (lt < 0) return '';
  let s = '';
  const k = eb(seg(lt, 0, 0.5)), spread = (1 - eo(seg(lt, 0.1, 0.7))) * 120;
  s += `<g opacity="${f(eo(seg(lt, 0, 0.3)))}">`;
  s += `<text x="${f(170 + spread)}" y="830" font-family="Archivo" font-weight="900" font-size="150" fill="${C.peach}" text-anchor="middle">[</text>`;
  s += `<text x="${f(910 - spread)}" y="830" font-family="Archivo" font-weight="900" font-size="150" fill="${C.peach}" text-anchor="middle">]</text>`;
  s += `<text x="540" y="822" font-family="Archivo" font-weight="900" font-size="${f(118 * k)}" fill="#fff" text-anchor="middle" letter-spacing="-4">BRACKET</text>`;
  s += lbl('SOFTWARE HOUSE · KUWAIT', 540, 900, 30, C.peach);
  s += `</g>`;
  const ai = o.ai;
  s += kin(1060, ai ? [['AI', '#fff'], ['that', '#fff'], ['gets', '#fff'], ['it', '#fff'], ['done.', C.peach]] : [['Software', '#fff'], ['that', '#fff'], ['gets', '#fff'], ['it', '#fff'], ['done.', C.peach]], t, a + 0.6, 66, { step: 0.16 });
  s += kinAr(1170, ai ? 'ذكاء اصطناعي ينجز الشغل.' : 'برمجيات تنجز الشغل.', t, a + 1.1, 54, '#d8d3cf');
  s += `<g opacity="${f(eo(seg(lt, 1.6, 2.0)))}">${lbl('WEBSITES · APPS · AI AGENTS · SEO · GEO', 540, 1330, 26, '#8d8782')}</g>`;
  return s;
}
// trial: replace only the opening (t < cut) of a base reel with a new hook scene
function withHook(base, cut, hookFn, mode = 'paper') {
  return { dur: base.dur, cut, frame: t => t < cut ? bg(t, mode) + hookFn(t) : base.frame(t) };
}

// ---- short cut (T-20261122-06 revision, 12–15 s reels) ----
// play an old scene fn (built for [oA,oB]) inside a new window [nA,nB]: time is remapped linearly
function warp(fn, oA, oB, nA, nB) {
  return t => (t < nA - 0.01 || t > nB + 0.01) ? '' : fn(oA + (t - nA) * (oB - oA) / (nB - nA));
}
// end card played 1.6x so it fits ~1.6 s
const endFast = (t, a, o) => t < a ? '' : endCard(a + (t - a) * 1.6, a, o);
// one-line hisaab: o = {n, lab, labAr, a:[v,'4'], b:15, total:60, per:'a month', perAr:'بالشهر', fix, fixAr, dark}
function calc1(t, a, o) {
  const tr = t - a; let s = '';
  s += lbl(`HISAAB #${o.n}`, 70, 225, 30, C.red, 'start');
  s += html(360, 190, 260, 50, `<span style="${AR(30, C.red)}">· حسبة دقيقة</span>`, 'direction:rtl;text-align:left;');
  s += kinS(255, 'Do the *maths:*', t, a + 0.05, 104, { step: 0.15 });
  s += kinAr(390, 'احسبها:', t, a + 0.3, 66);
  const y0 = 520 + float(t, 3), kc = eb(seg(tr, 0.15, 0.5));
  let c = card(110, y0, 860, 570, 48) + pill(150, y0 + 40, 'EXAMPLE', 'مثال', C.red, 290);
  const ol = eo(seg(tr, 0.35, 0.6));
  c += html(150, y0 + 120, 780, 120, `<div style="${EN(40, C.ink)}letter-spacing:-1px;opacity:${f(ol)}">${esc(o.lab)}</div><div style="${AR(32, C.mute)}direction:rtl;text-align:left;opacity:${f(ol)}">${esc(o.labAr)}</div>`);
  const ke = seg(tr, 0.5, 1.1), num = v => Math.round(v * eo(ke)).toLocaleString('en-US');
  c += `<text x="540" y="${f(y0 + 345)}" font-family="Archivo" font-weight="900" font-size="120" fill="${C.ink}" text-anchor="middle" letter-spacing="-4" opacity="${f(eo(seg(tr, 0.45, 0.7)))}">${num(o.a)} × ${num(o.b)} KD</text>`;
  if (tr > 1.2) {
    const op = eo(seg(tr, 1.2, 1.45)), kt = seg(tr, 1.3, 2.0), pk = 1 + 0.1 * Math.sin(clamp((tr - 2.0) / 0.35) * Math.PI);
    c += `<rect x="150" y="${f(y0 + 385)}" width="780" height="150" rx="32" fill="${C.red}" opacity="${f(op)}"/>`;
    c += `<text x="190" y="${f(y0 + 455)}" font-family="Archivo" font-weight="900" font-size="46" fill="#fff" opacity="${f(op)}">${esc(o.per)}</text>`;
    c += html(190, y0 + 468, 330, 54, `<span style="${AR(32, '#fff')}">${esc(o.perAr)}</span>`, 'direction:rtl;text-align:left;opacity:' + f(op));
    c += `<g transform="translate(900 ${f(y0 + 497)}) scale(${f(pk)})"><text x="0" y="0" font-family="Archivo" font-weight="900" font-size="104" fill="#fff" text-anchor="end" letter-spacing="-4" opacity="${f(op)}">= ${Math.round(o.total * eo(kt)).toLocaleString('en-US')} KD</text></g>`;
  }
  s += pop(540, y0 + 285, kc, c);
  const fa = a + (o.fixAt ?? 2.3);
  s += kinS(1150, o.fix, t, fa, o.fixSize || 74, { step: 0.13 });
  s += kinAr(o.fixArY || 1345, o.fixAr, t, fa + 0.35, 52, C.mute, 0.1);
  return s;
}
const demoTag = (x, y) => pill(x, y, 'DEMO', 'نموذج', C.red, 250);

module.exports = { C, clamp, seg, eo, eb, f, esc, html, word, EN, AR, kin, kinS, kinAr, card, star, wavy, bg, scene, hookScene, float, lbl, pop, pill, clock, timeChip, moon, searchCard, resultRows, chatCard, phone, tickList, calc, endCard, withHook, demoTag, warp, endFast, calc1 };
