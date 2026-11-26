// R05 (Thu 3 Dec 22:00): "POV: your customer searches 'near me'." Hooks-bank #9 Danger POV. Template: full-screen map POV.
// Problem: "Why is my business not showing on Google Maps?" (sheet top 5 #1). Service: local SEO / Google Business Profile.
// All businesses shown are made up (DEMO). No ranking promise: "helps locals find you". Price from profile: local SEO from £325/month.
const K = require('./kit4');
const { C, seg, eo, eb, f, lerp, big, ui, mono, tick, chip, hook, finger, ripple } = K;
const DUR = 14, END = 12.2;

function mapBg(t) {
  const px = -40 * t, py = -18 * t;
  let s = `<rect width="1080" height="1920" fill="#eceae4"/><g transform="translate(${f(px % 240)} ${f(py % 240)})">`;
  for (let i = -1; i < 7; i++) for (let j = -1; j < 10; j++) s += `<rect x="${i * 240 + 18}" y="${j * 240 + 18}" width="204" height="204" rx="10" fill="${(i * 7 + j * 3) % 5 === 0 ? '#cfe7c4' : '#f7f6f2'}"/>`;
  s += `</g><g transform="translate(${f(px)} ${f(py)})"><path d="M-200 1300 C 200 1200, 500 1500, 1400 1250" stroke="#aad3f2" stroke-width="70" fill="none"/><path d="M-100 300 L 1400 900" stroke="#ffd98a" stroke-width="34" fill="none"/><path d="M400 -200 L 700 2300" stroke="#fff" stroke-width="40" fill="none"/></g>`;
  return s;
}
function pin(x, y, k, col = '#ea4335', label = '', sc = 1) {
  if (k <= 0) return '';
  const yy = y - 120 * (1 - eo(k));
  return `<g transform="translate(${f(x)} ${f(yy)}) scale(${f(sc * eb(k))})"><ellipse cx="0" cy="6" rx="20" ry="7" fill="#000" opacity=".2"/><path d="M0 0 C -10 -22, -36 -40, -36 -66 A36 36 0 1 1 36 -66 C 36 -40, 10 -22, 0 0 Z" fill="${col}"/><circle cy="-66" r="13" fill="#fff"/>${label ? `<rect x="44" y="-92" width="${label.length * 17 + 30}" height="50" rx="12" fill="#fff" filter="url(#sh2)"/>` + ui(label, 59, -58, 26, C.ink, { w: 700 }) : ''}</g>`;
}
const PINS = [[300, 760, -.12, 'Plumber A'], [700, 900, .35, 'Plumber B'], [380, 1060, .8, 'Plumber C']];

function main(t) {
  let s = mapBg(t);
  // search bar (typed at frame 0)
  const q = 'plumber near me', n = Math.min(q.length, 11 + Math.floor(t * 8));
  if (t < 9.6) s += `<rect x="60" y="490" width="960" height="110" rx="55" fill="#fff" filter="url(#sh2)"/>` + ui(q.slice(0, n), 130, 562, 44, C.ink, { w: 600 }) + (n < q.length || (t * 2) % 1 < .5 ? `<rect x="${130 + n * 23.5}" y="522" width="4" height="52" fill="${C.blue}"/>` : '');
  if (t < 9.6) s += `<circle cx="960" cy="545" r="28" fill="${C.blue}"/><circle cx="955" cy="540" r="11" fill="none" stroke="#fff" stroke-width="4"/>`;
  if (t < 9.6) {
    PINS.forEach(([x, y, a, l]) => { s += pin(x, y, seg(t, a, a + .3), '#ea4335', t < 5.4 ? l : ''); });
    // your ghost location
    if (t > 2.6 && t < 5.6) {
      const p = (t * 1.5) % 1;
      s += `<circle cx="700" cy="1200" r="${f(60 + 80 * p)}" fill="none" stroke="${C.red}" stroke-width="6" stroke-dasharray="14 12" opacity="${f(1 - p)}"/><circle cx="700" cy="1200" r="54" fill="#fff" stroke="${C.red}" stroke-width="6" stroke-dasharray="14 12"/>${big('?', 700, 1226, 74, C.red, { ls: 0 })}`;
      s += `<g transform="translate(700 1310)">${chip('YOUR BUSINESS', 0, 0, C.red, '#fff', 26)}</g>`;
    }
    // results sheet 1.8–5.4
    const rk = eo(seg(t, 1.8, 2.2)) * (1 - eo(seg(t, 5.3, 5.6)));
    if (rk > 0) {
      const y0 = 1920 - 560 * rk;
      s += `<g transform="translate(0 ${f(y0)})"><rect x="0" y="0" width="1080" height="700" rx="40" fill="#fff" filter="url(#sh)"/><rect x="490" y="16" width="100" height="10" rx="5" fill="#ddd"/>`;
      ['Plumber A', 'Plumber B', 'Plumber C'].forEach((l, i) => { const y = 70 + i * 130; s += ui(l + ' (DEMO)', 70, y + 40, 36, C.ink, { w: 700 }) + ui('★★★★☆ · Open now · Stockport', 70, y + 84, 26, C.grey) + `<rect x="840" y="${y + 14}" width="170" height="64" rx="32" fill="#e8f0fe"/>` + ui('Call', 925, y + 56, 26, C.blue, { w: 700, a: 'middle' }); });
      s += `</g>`;
    }
  }
  // hook / beat text
  if (t < 2.6) s += hook(t, [['POV: your customer', '#fff'], ['searches ‘near me’.', C.peach]], 300, 86, { lh: 92, bar: [40, C.ink, 28] });
  else if (t < 5.6) s += hook(t, [['Open today.', '#fff'], ['Invisible on Maps.', C.peach]], 300, 92, { lh: 98, bar: [40, C.ink, 28] });
  // fix: profile checklist 5.6–9.6
  if (t >= 5.6 && t < 9.6) {
    const k = eo(seg(t, 5.6, 5.9));
    s += `<rect width="1080" height="1920" fill="${C.ink}" opacity="${f(.72 * k)}"/>`;
    s += big('The fix: a complete', 540, 330, 76, '#fff', { op: k }) + big('Google Business Profile', 540, 414, 76, C.peach, { op: k });
    const items = ['Right category', 'Opening hours', 'Area you cover', 'Real photos', 'Website linked', 'Ask for reviews'];
    s += `<g opacity="${f(k)}"><rect x="140" y="${490}" width="800" height="${items.length * 112 + 40}" rx="36" fill="#fff"/></g>`;
    items.forEach((it, i) => { const a = 5.9 + i * .45, y = 570 + i * 112; if (t < a - .1) return; s += tick(220, y, 32, seg(t, a, a + .25)) + ui(it, 280, y + 14, 44, C.ink, { w: 700, op: eo(seg(t, a - .1, a + .15)) }); });
  }
  // your pin lands 9.6–12.2
  if (t >= 9.6) {
    PINS.forEach(([x, y]) => { s += pin(x, y, 1, '#ea4335', '', .8); });
    s += pin(700, 1200, seg(t, 9.65, 9.95), C.red, 'Your Plumbing', 1.4) + ripple(700, 1200, seg(t, 9.9, 10.5), C.red);
    const k = eb(seg(t, 10.2, 10.5));
    if (k > 0) s += `<g transform="translate(540 1480) scale(${f(k)}) translate(-540 -1480)"><rect x="90" y="1380" width="900" height="200" rx="32" fill="#fff" filter="url(#sh)"/>${ui('Your Plumbing (DEMO)', 140, 1450, 40, C.ink, { w: 700 })}${ui('Open now · Call · Website · Directions', 140, 1500, 28, C.grey)}${tick(920, 1470, 30, 1)}</g>`;
    s += `<rect x="40" y="250" width="1000" height="200" rx="28" fill="${C.ink}"/>` + big('Helps locals', 540, 340, 80, '#fff') + big('find you.', 540, 424, 80, C.peach);
    const p = eb(seg(t, 11.0, 11.3));
    if (p > 0) s += `<g transform="translate(540 545) scale(${f(p)}) translate(-540 -545)">${chip('LOCAL SEO FROM £325/MONTH', 540, 560, C.red, '#fff', 34)}</g>`;
  }
  // POV finger scrolling the sheet at the start
  if (t > 1.9 && t < 3.2) s += finger(lerp(700, 640, seg(t, 1.9, 3.2)), lerp(1700, 1560, eo(seg(t, 2.2, 2.9))), 1.2, 0);
  return s;
}
module.exports = K.reel(DUR, END, main);
