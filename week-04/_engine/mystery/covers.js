// cover N = a reel frame (NOHEAD) + big mystery line + small [ BRACKET ] mark. COVER=1|2|3
const { C } = require('./lib');
const SET = {
  1: { r: 'm1', t: 1.9, l1: 'Lost by', l2: 'one button.', bg: C.ink, c1: '#fff', c2: C.peach },
  2: { r: 'm2', t: 8.3, l1: '3 am.', l2: 'Pigeons?!', bg: C.red, c1: '#fff', c2: C.ink, s2: 150 },
  3: { r: 'm3', t: 7.7, band: 760, l1: 'Nobody finds', l2: 'this café.', bg: C.ink, c1: '#fff', c2: C.peach },
};
const cfg = SET[process.env.COVER];
const reel = require('./' + cfg.r + '.js');
const T = (s, y, size, col) => `<text x="540" y="${y}" font-family="Archivo" font-weight="900" font-size="${size}" fill="${col}" text-anchor="middle" letter-spacing="-4">${s}</text>`;
module.exports = { dur: 1, frame() {
  let s;
  if (process.env.COVER === '2') {
    const Ch = require('./chars'), P = reel.parts, t = 7.3;
    s = require('./w4').room(t, { wall: '#2b3150', floor: '#3d3552', pattern: 'dots', pcol: '#363d63', fy: 1440 }) + P.bed(t, false);
    s += Ch.person(560, 1480, t, { ...P.owner, pose: 'panic', mood: 'scream', hairUp: 1, sweat: 1 });
    [[130, 1080, 'TABLE FOR 30?', 1], [950, 1080, 'BOOK 4 AT 8?', -1], [200, 1330, 'OPEN SUNDAY?', 1], [930, 1320, 'PARTY OF 12!', -1]].forEach(([x, y, n, d], i) => s += Ch.pigeon(x, y, t + i * .2, { dir: d, pose: 'fly', note: n, s: .8 }));
  } else s = reel.frame(cfg.t);
  s += `<rect x="0" y="0" width="1080" height="${cfg.band || 810}" fill="${cfg.bg}"/><rect x="0" y="${cfg.band || 810}" width="1080" height="12" fill="${C.ink}" opacity=".25"/>`;
  s += T(cfg.l1, (cfg.band || 810) - 280, cfg.s1 || 140, cfg.c1) + T(cfg.l2, (cfg.band || 810) - 110, cfg.s2 || 140, cfg.c2);
  s += `<rect x="370" y="1430" width="340" height="62" rx="31" fill="${C.ink}"/><text x="540" y="1474" font-family="Archivo" font-weight="900" font-size="40" text-anchor="middle" letter-spacing="-1" fill="#fff"><tspan fill="${C.peach}">[</tspan> BRACKET <tspan fill="${C.peach}">]</tspan></text>`;
  return s; } };
