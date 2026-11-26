// scene.js — shared helpers for the cartoon reels
const { C, clamp, seg, eo, eb, f } = require('./lib');
const K = require('./kit');
const X = require('./fx');
const INK = '#201e1d';
// falling from above: returns {lift, squash, pose, landed (seconds since landing) } or null before start
function drop(t, a, dur = 0.4, h = 1500) {
  if (t < a) return null;
  const k = (t - a) / dur;
  if (k < 1) return { lift: h * (1 - k * k), squash: 1.12, pose: 'air', landed: -1 };
  const lt = t - a - dur;
  return { lift: 0, squash: 1 - 0.32 * Math.exp(-lt * 9) * Math.cos(lt * 26), pose: null, landed: lt };
}
// ease a value between a and b over [t0, t1]
const tw = (t, t0, t1, a, b, e = eo) => a + (b - a) * e(seg(t, t0, t1));
// diagonal colour wipe centred on time a (covers screen at a)
function wipe(t, a, col = C.red, d = 0.5) {
  const k = (t - (a - d / 2)) / d; if (k < 0 || k > 1) return '';
  const x = -1600 + k * 3200;
  return `<path d="M${f(x)} -200 H${f(x + 1500)} L${f(x + 900)} 2100 H${f(x - 600)} Z" fill="${col}"/>`;
}
// headline on a band; str uses kit.kinS syntax. a<0 = fully visible.
function head(t, a, str, o = {}) {
  if (process.env.NOHEAD) return '';
  const y = o.y ?? 250, size = o.size ?? 80;
  return K.kinS(y, str, t, a, size, { col: o.col || '#fff', acc: o.acc || C.peach, step: o.step ?? 0.1, h: size * 1.45 * (str.split('|').length) });
}
// price / service tag
function tag(t, a, l1, l2, o = {}) {
  if (process.env.NOHEAD) return '';
  if (t < a) return '';
  const k = eb(seg(t, a, a + 0.45)), y = o.y ?? 1420, w = o.w ?? 900;
  const bgc = o.bg || C.red;
  let g = `<rect x="${-w / 2}" y="-80" width="${w}" height="${l2 ? 168 : 110}" rx="36" fill="${bgc}" stroke="${INK}" stroke-width="6"/>`;
  g += `<text x="0" y="-8" font-family="Archivo" font-weight="900" font-size="${o.s1 || 58}" fill="#fff" text-anchor="middle" letter-spacing="-2">${l1}</text>`;
  if (l2) g += `<text x="0" y="60" font-family="Archivo" font-weight="800" font-size="${o.s2 || 44}" fill="${o.c2 || '#ffe2d6'}" text-anchor="middle" letter-spacing="-1">${l2}</text>`;
  return `<g transform="translate(540 ${y}) scale(${f(k)}) rotate(${f(o.rot ?? -2)})">${g}</g>`;
}
const demo = (x, y, col) => X.demoPill(x, y, col);
module.exports = { drop, tw, wipe, head, tag, demo, endOnly: X.endOnly };
