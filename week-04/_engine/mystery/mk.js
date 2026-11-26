// mk.js: shared bits for the mystery story-hook reels
const { C, clamp, seg, eo, eb, f } = require('./lib');
const Ch = require('./chars');
const W = require('./w4');
const INK = '#201e1d';
// rubber stamp
function stamp(cx, cy, t, a, text, o = {}) {
  if (t < a) return '';
  const k = seg(t, a, a + 0.25), sc = 1 + 1.4 * (1 - eo(k)), w = o.w || 520, size = o.size || 64;
  return `<g opacity="${f(clamp(k * 3))}" transform="translate(${cx} ${cy}) rotate(${o.rot ?? -8}) scale(${f(sc)})"><rect x="${-w / 2}" y="-62" width="${w}" height="124" rx="18" fill="${o.bg || 'rgba(255,255,255,.92)'}" stroke="${o.col || C.red}" stroke-width="12"/>${W.T(text, 0, size * 0.36, size, o.col || C.red, { ls: -2 })}</g>`;
}
// question marks popping around a point
function qmarks(x, y, t, a, n = 3, col = C.red) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const at = a + i * 0.18; if (t < at) continue;
    const k = eb(seg(t, at, at + 0.3)), ang = -150 + i * (120 / Math.max(1, n - 1)), r = 150;
    const px = x + Math.cos(ang * Math.PI / 180) * r, py = y + Math.sin(ang * Math.PI / 180) * r + Math.sin(t * 6 + i) * 8;
    s += W.pop(px, py, k, W.T('?', px, py + 30, 96, col, { rot: (i - 1) * 14 }));
  }
  return s;
}
// tap ripple
function ripple(x, y, t, a) {
  if (t < a || t > a + 0.4) return '';
  const k = seg(t, a, a + 0.4);
  return `<circle cx="${x}" cy="${y}" r="${f(26 + 70 * k)}" fill="none" stroke="${INK}" stroke-width="7" opacity="${f(1 - k)}"/><circle cx="${x}" cy="${y}" r="22" fill="${INK}" opacity="${f(.35 * (1 - k))}"/>`;
}
// magnifying glass (handle down-right)
function magnifier(x, y, s = 1, rot = 0) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s)})"><path d="M48 48 L120 120" stroke="#6e4329" stroke-width="22" stroke-linecap="round"/><circle r="70" fill="rgba(190,230,255,.45)" stroke="${INK}" stroke-width="14"/><path d="M-36 -28 Q-28 -46 -8 -50" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/></g>`;
}
module.exports = { stamp, qmarks, ripple, magnifier };
