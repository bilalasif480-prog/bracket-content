// covers.js — one cover per reel: a frame of the reel (no headline) + the hook in BIG text + a small [ BRACKET ] mark.
// usage: NOHEAD=1 COVER=01 OUTNAME=cover01 node render.js covers 0
// All text sits between y≈300 and y≈1525 (inside the 1080x1350 grid crop, clear of the top 12% and bottom 20%).
const { C, f } = require('./lib');
const N = process.env.COVER;
const SET = {
  '01': { t: 3.9, l1: 'Still', l2: 'loading...', bg: C.ink, c1: '#fff', c2: C.peach },
  '02': { t: 4.0, l1: 'Is AI', l2: 'ignoring you?', bg: '#3b2f6b', c1: '#fff', c2: C.gold },
  '03': { t: 1.5, l1: 'Website first.', l2: 'Pay when happy.', bg: C.red, c1: '#fff', c2: C.ink, s1: 112, s2: 104 },
  '04': { t: 5.3, l1: 'Bookings', l2: 'at midnight?', bg: C.ink, c1: '#fff', c2: C.peach },
  '05': { t: 2.3, l1: 'Book in', l2: '10 seconds?', bg: C.ink, c1: '#fff', c2: C.peach },
  '06': { t: 4.6, l1: 'They can’t', l2: 'find you.', bg: C.paper, c1: C.ink, c2: C.red },
  '07': { t: 3.9, l1: 'Your form goes', l2: 'nowhere.', bg: C.paper, c1: C.ink, c2: C.red, s1: 112 },
  '08': { t: 4.6, l1: '11 pm.', l2: '99+ messages.', bg: '#fff', c1: C.ink, c2: C.red },
  '09': { t: 0.4, l1: 'Stamp card:', l2: 'GONE.', bg: C.paper, c1: C.ink, c2: C.red },
  '10': { t: 7.8, l1: 'No website', l2: 'yet?', bg: '#8a5cf5', c1: '#fff', c2: C.gold },
  '11': { t: 2.0, l1: 'Will AI', l2: 'pick you?', bg: '#151026', c1: '#fff', c2: C.gold },
  '12': { t: 3.8, l1: 'She asked', l2: 'your price.', bg: C.ink, c1: '#fff', c2: C.peach },
  '13': { t: 4.4, l1: 'Next door.', l2: 'Not on the map.', bg: '#151026', c1: '#fff', c2: C.gold, s2: 112 },
  '14': { t: 2.5, l1: 'Is your website', l2: 'this old?', bg: C.paper, c1: C.ink, c2: C.red, s1: 108 },
};
const cfg = SET[N];
const reel = require('./r' + N + '.js');
const T = (s, y, size, col) => `<text x="540" y="${y}" font-family="Archivo" font-weight="900" font-size="${size}" fill="${col}" text-anchor="middle" letter-spacing="-4">${s}</text>`;
module.exports = {
  dur: 1,
  frame() {
    let s = reel.frame(cfg.t);
    s += `<rect x="0" y="230" width="1080" height="480" fill="${cfg.bg}"/><rect x="0" y="704" width="1080" height="12" fill="${C.ink}" opacity=".25"/>`;
    s += T(cfg.l1, 470, cfg.s1 || 132, cfg.c1) + T(cfg.l2, 640, cfg.s2 || 132, cfg.c2);
    s += `<rect x="370" y="1478" width="340" height="62" rx="31" fill="${C.ink}"/><text x="540" y="1522" font-family="Archivo" font-weight="900" font-size="40" text-anchor="middle" letter-spacing="-1" fill="#fff"><tspan fill="${C.peach}">[</tspan> BRACKET <tspan fill="${C.peach}">]</tspan></text>`;
    return s;
  },
};
