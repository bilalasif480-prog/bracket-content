// w4.js — shared props for the week-04 cartoon reels (backgrounds, giant phone, panels, icons, gags)
const { C, clamp, seg, eo, eb, f } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const X = require('./fx');
const INK = '#201e1d';
const G = 1480; // default floor line (feet)

const pop = (cx, cy, k, inner) => k <= 0 ? '' : `<g transform="translate(${f(cx)} ${f(cy)}) scale(${f(k)}) translate(${f(-cx)} ${f(-cy)})">${inner}</g>`;
const T = (s, x, y, size, col, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-family="${o.mono ? 'JB' : 'Archivo'}" font-weight="${o.w || 900}" font-size="${size}" fill="${col}" text-anchor="${o.a || 'middle'}" letter-spacing="${o.ls ?? -1}"${o.op != null ? ` opacity="${f(o.op)}"` : ''}${o.rot ? ` transform="rotate(${o.rot} ${f(x)} ${f(y)})"` : ''}${o.it ? ' font-style="italic"' : ''}>${s}</text>`;

// ---------- rooms ----------
function room(t, o = {}) {
  const wall = o.wall || '#f6e7d8', floor = o.floor || '#d8c2a8', fy = o.fy ?? G - 40;
  let s = `<rect width="1080" height="1920" fill="${wall}"/>`;
  if (o.pattern === 'dots') for (let y = 120; y < fy; y += 110) for (let x = 30; x < 1080; x += 110) s += `<circle cx="${x + ((y / 110) % 2) * 55}" cy="${y}" r="7" fill="${o.pcol || 'rgba(0,0,0,.06)'}"/>`;
  if (o.pattern === 'stripes') for (let x = 0; x < 1080; x += 90) s += `<rect x="${x}" y="0" width="45" height="${fy}" fill="${o.pcol || 'rgba(0,0,0,.04)'}"/>`;
  if (o.pattern === 'tiles') { for (let x = 0; x <= 1080; x += 90) s += `<path d="M${x} 0 V${fy}" stroke="${o.pcol || 'rgba(0,0,0,.07)'}" stroke-width="3"/>`; for (let y = 0; y <= fy; y += 90) s += `<path d="M0 ${y} H1080" stroke="${o.pcol || 'rgba(0,0,0,.07)'}" stroke-width="3"/>`; }
  if (o.pattern === 'bricks') for (let y = 0; y < fy; y += 60) for (let x = -60; x < 1080; x += 120) s += `<rect x="${x + ((y / 60) % 2) * 60 + 4}" y="${y + 4}" width="112" height="52" rx="4" fill="${o.pcol || 'rgba(0,0,0,.06)'}"/>`;
  s += `<rect y="${fy}" width="1080" height="${1920 - fy}" fill="${floor}"/><rect y="${fy}" width="1080" height="12" fill="rgba(0,0,0,.08)"/>`;
  if (o.boards) for (let x = 0; x < 1080; x += 150) s += `<path d="M${x} ${fy} L${x - 120} 1920" stroke="rgba(0,0,0,.06)" stroke-width="5"/>`;
  return s;
}
function sign(x, y, w, h, text, o = {}) {
  return `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${o.r ?? 14}" fill="${o.bg || INK}"/>` + T(text, x, y + (o.size || 52) * 0.36, o.size || 52, o.fg || '#fff', { ls: o.ls ?? 1 });
}
function windowNight(x, y, w, h, t, o = {}) {
  let s = `<rect x="${x - 12}" y="${y - 12}" width="${w + 24}" height="${h + 24}" rx="12" fill="${o.frame || '#5b4a3a'}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.sky || '#141833'}"/>`;
  if (o.moon !== false) s += `<circle cx="${x + w * .72}" cy="${y + h * .3}" r="34" fill="#fff4c8"/><circle cx="${x + w * .72 + 16}" cy="${y + h * .3 - 10}" r="30" fill="${o.sky || '#141833'}"/>`;
  s += `<path d="M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}" stroke="${o.frame || '#5b4a3a'}" stroke-width="10"/>`;
  return s;
}
function clockWall(x, y, r, t, speed = 1) {
  const a1 = t * 360 * speed, a2 = t * 30 * speed;
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${INK}" stroke-width="8"/><path d="M${x} ${y} l${f(Math.sin(a1 * Math.PI / 180) * r * .75)} ${f(-Math.cos(a1 * Math.PI / 180) * r * .75)}" stroke="${C.red}" stroke-width="7" stroke-linecap="round"/><path d="M${x} ${y} l${f(Math.sin(a2 * Math.PI / 180) * r * .5)} ${f(-Math.cos(a2 * Math.PI / 180) * r * .5)}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="7" fill="${INK}"/>`;
}
function plant(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -60 Q-60 -140 -40 -200 Q-10 -140 0 -60 Z M0 -60 Q50 -160 30 -220 Q0 -150 0 -60 Z M0 -60 Q80 -110 90 -160 Q30 -120 0 -60 Z" fill="#3f9a5c"/><path d="M-40 -60 H40 L30 0 H-30 Z" fill="#c9583b"/></g>`;
}
function counter(x, y, w, h = 200, col = '#8f5c3b', top = '#6e4329') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${col}"/><rect x="${x - 14}" y="${y - 22}" width="${w + 28}" height="30" rx="10" fill="${top}"/>`;
}
function rain(t, x0, x1, y0, y1, n = 30) {
  let s = '';
  for (let i = 0; i < n; i++) { const x = x0 + ((i * 97) % (x1 - x0)), p = ((t * 2.2 + i * .37) % 1), y = y0 + p * (y1 - y0); s += `<path d="M${f(x)} ${f(y)} l-8 34" stroke="#7cc4ff" stroke-width="6" stroke-linecap="round" opacity=".85"/>`; }
  return s;
}
function cloud(x, y, s = 1, col = '#8a93a6') {
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})" fill="${col}"><ellipse cx="0" cy="0" rx="110" ry="50"/><ellipse cx="-60" cy="-20" rx="60" ry="50"/><ellipse cx="50" cy="-40" rx="70" ry="60"/></g>`;
}
function cobweb(x, y, r, k, flip = 1) { // corner web from (x,y) growing to radius r*k
  if (k <= 0) return '';
  const rr = r * k; let s = '';
  for (let i = 0; i <= 4; i++) { const a = i * 22.5 * Math.PI / 180; s += `<path d="M${x} ${y} L${f(x + flip * Math.cos(a) * rr)} ${f(y + Math.sin(a) * rr)}" stroke="#fff" stroke-width="3" opacity=".9"/>`; }
  for (let j = 1; j <= 3; j++) { let d = ''; for (let i = 0; i <= 4; i++) { const a = i * 22.5 * Math.PI / 180, q = rr * j / 3.4; d += (i ? 'L' : 'M') + f(x + flip * Math.cos(a) * q) + ' ' + f(y + Math.sin(a) * q); } s += `<path d="${d}" stroke="#fff" stroke-width="3" fill="none" opacity=".9"/>`; }
  return s;
}

// ---------- giant phone + app panels ----------
function phone(x, y, w, h, inner, o = {}) {
  const k = o.k ?? 1;
  const id = 'ph' + Math.round(x) + Math.round(y);
  let s = `<rect x="${x + 16}" y="${y + 20}" width="${w}" height="${h}" rx="64" fill="#000" opacity=".12"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="64" fill="${INK}"/><rect x="${x + w / 2 - 55}" y="${y + 24}" width="110" height="22" rx="11" fill="#3a3735"/>`;
  s += `<clipPath id="${id}"><rect x="${x + 22}" y="${y + 64}" width="${w - 44}" height="${h - 100}" rx="30"/></clipPath><rect x="${x + 22}" y="${y + 64}" width="${w - 44}" height="${h - 100}" rx="30" fill="${o.screen || '#fff'}"/><g clip-path="url(#${id})">${inner}</g>`;
  if (o.demo !== false) s += X.demoPill(x + w / 2 - 75, y + h - 30, C.red);
  return pop(x + w / 2, y + h / 2, k, s);
}
// a floating app card with a dark header and a DEMO pill
function panel(x, y, w, h, title, inner, k = 1, o = {}) {
  let s = `<rect x="${x + 12}" y="${y + 16}" width="${w}" height="${h}" rx="36" fill="#000" opacity=".14"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="36" fill="#fff" stroke="${INK}" stroke-width="7"/>`;
  s += `<path d="M${x + 4} ${y + 96} V${y + 36} Q${x + 4} ${y + 4} ${x + 36} ${y + 4} H${x + w - 36} Q${x + w - 4} ${y + 4} ${x + w - 4} ${y + 36} V${y + 96} Z" fill="${o.head || INK}"/>`;
  s += `<circle cx="${x + 56}" cy="${y + 50}" r="24" fill="${o.dot || C.red}"/>` + T(title, x + 94, y + 63, o.ts || 34, '#fff', { a: 'start' });
  s += X.demoPill(x + w - 172, y + 25, o.pill || C.red);
  const id = 'pn' + Math.round(x) + Math.round(y);
  s += `<clipPath id="${id}"><rect x="${x + 4}" y="${y + 96}" width="${w - 8}" height="${h - 100}" rx="30"/></clipPath><g clip-path="url(#${id})">${inner}</g>`;
  return pop(x + w / 2, y + h / 2, k, s);
}
function msgs(t, x, y, w, list, o = {}) {
  let s = '', yy = y; const size = o.size || 34;
  for (const m of list) {
    if (t < m.at) continue;
    const kk = eb(seg(t, m.at, m.at + 0.3));
    const tw = Math.min(w - 20, m.text.length * size * 0.56 + 50), bx = m.out ? x + w - tw : x;
    s += pop(bx + tw / 2, yy + 38, kk, `<rect x="${bx}" y="${yy}" width="${tw}" height="76" rx="30" fill="${m.out ? (o.outCol || C.red) : '#ece9e6'}"/>` + T(m.text, bx + tw / 2, yy + 50, size, m.out ? '#fff' : INK, { w: 800, ls: -.5 }));
    yy += o.gap || 90;
  }
  return s;
}
function ticks(t, x, y, items, a, step = 0.35, o = {}) {
  let s = ''; const size = o.size || 40, gap = o.gap || 74;
  items.forEach((it, i) => {
    const at = a + i * step; if (t < at) return;
    const k = eb(seg(t, at, at + 0.3));
    s += pop(x + 30, y + i * gap, k, `<circle cx="${x + 30}" cy="${y + i * gap}" r="28" fill="${C.green}"/><path d="M${x + 16} ${y + i * gap} l10 11 l20 -22" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`) + T(it, x + 76, y + i * gap + size * .36, size, o.col || INK, { a: 'start', w: 800, op: clamp((t - at) / .2) });
  });
  return s;
}
function spinner(cx, cy, r, t, col = INK) {
  let s = '';
  for (let i = 0; i < 8; i++) { const a = (i * 45 + Math.floor(t * 12) * 45) * Math.PI / 180; s += `<circle cx="${f(cx + Math.cos(a) * r)}" cy="${f(cy + Math.sin(a) * r)}" r="${f(r * .16 * (0.4 + i / 10))}" fill="${col}" opacity="${f(.2 + i / 10)}"/>`; }
  return s;
}
function bar(x, y, w, h, p, col = C.green) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="${x + 5}" y="${y + 5}" width="${f(Math.max(0, (w - 10) * clamp(p)))}" height="${h - 10}" rx="${(h - 10) / 2}" fill="${col}"/>`;
}
function tapNum(n, x, y, k) { return k <= 0 ? '' : pop(x, y, eb(k), `<circle cx="${x}" cy="${y}" r="44" fill="${INK}" stroke="#fff" stroke-width="6"/>` + T(String(n), x, y + 19, 54, '#fff')); }
function btn(x, y, w, h, label, col = C.red, size = 40, fg = '#fff') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${col}"/>` + T(label, x + w / 2, y + h / 2 + size * .36, size, fg, { w: 900 });
}
// generic tidy site body (used inside phone()): hero title + rows + button
function cleanSite(x, y, w, o) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="90" fill="${INK}"/>` + T(o.name, x + 30, y + 58, 36, '#fff', { a: 'start' });
  s += T(o.h1, x + 30, y + 170, 58, INK, { a: 'start', ls: -2 }) + (o.h2 ? T(o.h2, x + 30, y + 232, 58, C.red, { a: 'start', ls: -2 }) : '');
  return s;
}

// ---------- icons ----------
const icon = {
  chat: (x, y, s = 1, col = '#25b864') => `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><circle r="52" fill="${col}"/><path d="M-26 -14 h52 a8 8 0 0 1 8 8 v24 a8 8 0 0 1 -8 8 h-30 l-16 14 v-14 h-6 a8 8 0 0 1 -8 -8 v-24 a8 8 0 0 1 8 -8 z" fill="#fff"/></g>`,
  mail: (x, y, s = 1, col = '#2f7cf6') => `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><circle r="52" fill="${col}"/><rect x="-30" y="-20" width="60" height="42" rx="6" fill="#fff"/><path d="M-30 -18 L0 6 L30 -18" stroke="${col}" stroke-width="6" fill="none"/></g>`,
  dm: (x, y, s = 1, col = '#e05a9a') => `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><circle r="52" fill="${col}"/><path d="M-28 4 L28 -22 L10 30 L2 8 Z" fill="#fff"/></g>`,
  call: (x, y, s = 1, col = C.gold) => `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><circle r="52" fill="${col}"/><path d="M-22 -26 q-10 10 0 26 q14 24 34 32 q14 4 20 -6 l-12 -12 q-6 6 -12 2 q-14 -8 -20 -20 q-4 -6 2 -12 z" fill="#fff"/></g>`,
};
function paperPlane(x, y, rot, s = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s)})"><path d="M-60 -10 L60 0 L-60 20 L-36 2 Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M-36 2 L60 0" stroke="${INK}" stroke-width="4"/></g>`;
}
function bin(x, y) {
  return `<path d="M${x - 70} ${y - 160} H${x + 70} L${x + 56} ${y} H${x - 56} Z" fill="#8a93a6"/><rect x="${x - 80}" y="${y - 176}" width="160" height="24" rx="10" fill="#6e7886"/><path d="M${x - 30} ${y - 130} V${y - 30} M${x} ${y - 130} V${y - 30} M${x + 30} ${y - 130} V${y - 30}" stroke="#6e7886" stroke-width="8" stroke-linecap="round"/>`;
}
function splash(x, y, lt, col = '#7cc4ff') {
  if (lt < 0 || lt > 0.8) return '';
  let s = ''; const k = eo(lt / 0.8);
  for (let i = 0; i < 9; i++) { const a = (-160 + i * 17.5) * Math.PI / 180, v = 220 * k; s += `<circle cx="${f(x + Math.cos(a) * v)}" cy="${f(y + Math.sin(a) * v + 300 * lt * lt)}" r="${f(18 * (1 - k * .6))}" fill="${col}" opacity="${f(1 - k * .7)}"/>`; }
  return s;
}

module.exports = { G, INK, pop, T, room, sign, windowNight, clockWall, plant, counter, rain, cloud, cobweb, phone, panel, msgs, ticks, spinner, bar, tapNum, btn, cleanSite, icon, paperPlane, bin, splash };
