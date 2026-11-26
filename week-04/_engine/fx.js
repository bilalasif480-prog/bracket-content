// shared bits for the funny test reels
const K = require('./kit');
const L = require('./lib');
const { C, clamp, seg, eo, eb, f, esc, html, EN, lbl, pop } = K;

// END CARD: only [ BRACKET ] + Comment START. look: 'dark' | 'red' | 'paper'
function endOnly(t, a, look = 'dark') {
  const lt = t - a; if (lt < 0) return '';
  const P = {
    dark: { bg: C.ink, br: C.peach, txt: '#fff', pill: C.red, pillTxt: '#fff' },
    red: { bg: C.red, br: C.ink, txt: '#fff', pill: C.ink, pillTxt: '#fff' },
    paper: { bg: C.paper, br: C.red, txt: C.ink, pill: C.red, pillTxt: '#fff' },
  }[look];
  // background wipes in fast (circle reveal) so the cut is a moment, not a fade
  const r = 1300 * eo(seg(lt, 0, 0.3));
  let s = `<circle cx="540" cy="900" r="${f(r)}" fill="${P.bg}"/>`;
  const k = eb(seg(lt, 0.1, 0.5)), spread = (1 - eo(seg(lt, 0.15, 0.55))) * 140;
  s += `<g opacity="${f(clamp(lt / 0.15))}">`;
  s += `<text x="${f(150 + spread)}" y="860" font-family="Archivo" font-weight="900" font-size="170" fill="${P.br}" text-anchor="middle">[</text>`;
  s += `<text x="${f(930 - spread)}" y="860" font-family="Archivo" font-weight="900" font-size="170" fill="${P.br}" text-anchor="middle">]</text>`;
  s += `<text x="540" y="850" font-family="Archivo" font-weight="900" font-size="${f(128 * k)}" fill="${P.txt}" text-anchor="middle" letter-spacing="-4">BRACKET</text></g>`;
  const kc = eb(seg(lt, 0.45, 0.8)), pulse = 1 + 0.035 * Math.sin(lt * 8);
  s += pop(540, 1080, kc * pulse, `<rect x="230" y="1015" width="620" height="130" rx="65" fill="${P.pill}"/><text x="540" y="1101" font-family="Archivo" font-weight="900" font-size="60" fill="${P.pillTxt}" text-anchor="middle" letter-spacing="-1">Comment START</text>`);
  return s;
}
const demoPill = (x, y, col = C.red) => `<rect x="${x}" y="${y}" width="150" height="50" rx="25" fill="${col}"/>` + lbl('DEMO', x + 75, y + 35, 26, '#fff');
// Zzz rising
function zzz(x, y, t, col = '#fff') {
  let s = '';
  for (let i = 0; i < 3; i++) {
    const p = ((t * 0.7 + i / 3) % 1);
    s += `<text x="${f(x + p * 70 + i * 6)}" y="${f(y - p * 150)}" font-family="Archivo" font-weight="900" font-size="${f(40 + p * 40)}" fill="${col}" opacity="${f(Math.sin(p * Math.PI))}">z</text>`;
  }
  return s;
}
// eye positions of lib.bracket (side L, no bob) for scale s at (x,y)
const eyesOf = (x, y, s) => [[x + (18 - 70) * s, y + (100 - 306) * s], [x + (58 - 70) * s, y + (100 - 306) * s]];
// tears: arcs of drops out of both eyes. k = intensity 0..1
function tears(x, y, s, t, k) {
  if (k <= 0) return '';
  let out = '';
  eyesOf(x, y, s).forEach(([ex, ey], e) => {
    const dir = e === 0 ? -1 : 1;
    for (let i = 0; i < 9; i++) {
      const p = ((t * 1.6 + i / 9) % 1);
      const v = 260 + 260 * k;
      const px = ex + dir * p * v * 0.9, py = ey + 10 - p * 120 * k + p * p * 520;
      out += `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(10 + 6 * k)}" ry="${f(14 + 8 * k)}" fill="#5aa9ff" opacity="${f(0.9 * k * (1 - p * 0.4))}"/>`;
    }
    out += `<rect x="${f(ex - 9)}" y="${f(ey + 10)}" width="18" height="${f(60 * k)}" rx="9" fill="#5aa9ff" opacity="${f(.8 * k)}"/>`;
  });
  return out;
}
module.exports = { endOnly, demoPill, zzz, eyesOf, tears };
