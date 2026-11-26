// R10 (Sun 6 Dec 14:30): "Café owners: not just a website." Research format card I "One niche, whole system" (makeuforward DgDg04BRIw6).
// Template: feature chips flying onto a phone (red). Problem: café "how to get my café on Google Maps" + "table booking system" (sheet top 5 #5).
// Facts from the café page: menu, hours, map, table booking or click-and-collect, from £655; site includes card payments, edit it yourself, ready for Google.
const K = require('./kit4');
const { C, seg, eo, eb, f, lerp, big, ui, mono, phone, finger, ripple, tick, chip, hook, cafePage, cafeDefs } = K;
const DUR = 14, END = 12.2, SUCK = 7.3;
const CHIPS = [['Menu', 'M', -0.15, 245, 640], ['Opening hours', 'H', .75, 840, 700], ['Map', 'P', 1.6, 245, 870], ['Table booking', 'B', 2.45, 840, 900], ['Click-and-collect', 'C', 3.3, 245, 1100], ['Ready for Google', 'G', 4.15, 840, 1120], ['Card payments', '£', 5.0, 245, 1330], ['Edit it yourself', 'E', 5.85, 840, 1340]];

function fchip(label, g, x, y, sc) {
  const w = label.length * 20 + 112;
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(sc)})"><rect x="${-w / 2}" y="-50" width="${w}" height="100" rx="50" fill="#fff" filter="url(#sh2)"/><circle cx="${-w / 2 + 50}" cy="0" r="34" fill="${C.ink}"/>${big(g, -w / 2 + 50, 14, 38, '#fff', { ls: 0 })}${ui(label, -w / 2 + 94, 12, 32, C.ink, { w: 700 })}</g>`;
}

function main(t) {
  let s = `<rect width="1080" height="1920" fill="${C.red}"/>`;
  s += `<circle cx="540" cy="1000" r="${f(470 + 20 * Math.sin(t * 2))}" fill="#fff" opacity=".08"/>`;
  if (t < 9.8) {
    const grow = eo(seg(t, SUCK, SUCK + .6));
    const sc = lerp(1.0, 1.25, grow), px = 540 - 190 * sc, py = lerp(600, 540, grow);
    const btn = t < 8.6 ? 'idle' : t < 8.8 ? 'press' : 'booked';
    s += phone(px, py, sc, cafePage({ k: 1, btn }), { url: 'yourcafe-demo.co.uk', chip: ['DEMO', C.ink] });
    // chips fly in from off-screen, then get sucked into the phone at SUCK
    CHIPS.forEach(([l, g, a, x, y], i) => {
      const k = eo(seg(t, a, a + .45)); if (k <= 0) return;
      const sx = x < 540 ? -500 : 1580, sy = y + 300;
      let cx = lerp(sx, x, k), cy = lerp(sy, y, k) + 8 * Math.sin(t * 3 + i), csc = .9 * (0.6 + .4 * eb(seg(t, a, a + .45)));
      const sk = K.eio(seg(t, SUCK + i * .04, SUCK + .45 + i * .04));
      if (sk > 0) { cx = lerp(cx, 540, sk); cy = lerp(cy, 1000, sk); csc *= 1 - sk; }
      if (csc > .02) s += fchip(l, g, cx, cy, csc);
    });
    if (t > 8.0 && t < 9.0) s += finger(lerp(820, 452, eo(seg(t, 8.0, 8.5))), lerp(1700, 1230, eo(seg(t, 8.0, 8.5))), 1.1, seg(t, 8.5, 8.7));
    s += ripple(446, 1222, seg(t, 8.6, 9.1)) + tick(860, 1240, 46, seg(t, 8.85, 9.05));
    if (t < SUCK) s += hook(t, [['Café owners:', '#fff'], ['not just a website.', C.ink]], 320, 96, { lh: 102 });
    else s += big('All in one site.', 540, 360, 96, '#fff', { op: eo(seg(t, SUCK, SUCK + .3)) });
    if (t < SUCK) { const n = CHIPS.filter(c => t > c[2] + .3).length; s += chip(`${n}/8`, 540, 1530, C.ink, '#fff', 30); }
  } else {
    s += `<rect width="1080" height="1920" fill="${C.ink}"/>`;
    const ks = [9.8, 10.3, 10.8].map(a => eb(seg(t, a, a + .3)));
    if (ks[0] > 0) s += `<g transform="translate(540 640) scale(${f(ks[0])}) translate(-540 -640)">${big('Café websites', 540, 600, 120, '#fff')}${big('from £655.', 540, 730, 120, C.peach)}</g>`;
    if (ks[1] > 0) s += `<g opacity="${f(eo(seg(t, 10.3, 10.6)))}">${ui('Menu · hours · map · booking', 540, 900, 44, '#e9e5e1', { a: 'middle', w: 600 })}${ui('click-and-collect · card payments', 540, 966, 44, '#e9e5e1', { a: 'middle', w: 600 })}</g>`;
    if (ks[2] > 0) s += `<g transform="translate(540 1120) scale(${f(ks[2])}) translate(-540 -1120)">${chip('TEXT WRITTEN FOR YOU', 540, 1130, C.red, '#fff', 34)}</g>`;
  }
  return s;
}
module.exports = K.reel(DUR, END, main, cafeDefs);
