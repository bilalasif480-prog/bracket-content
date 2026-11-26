// R08 (Sat 5 Dec 14:30): "Your stamp card ends up in the bin." Hooks-bank #4 Expectation vs reality (niche idea #10).
// Template: falling object → app reveal (kraft paper → peach). Problem: "loyalty scheme for small café" / repeat customers (sheet top 5 #5).
// App screens are the DEMO café app (as on the site). Price from profile: mobile apps from £3,995.
const K = require('./kit4');
const { C, seg, eo, eb, f, lerp, big, ui, mono, phone, tick, chip, hook, ripple } = K;
const DUR = 14, END = 12.2, LAND = 1.7, REAL = 3.4;

function stampCard(n, sc = 1) {
  let s = `<g transform="scale(${sc})"><rect x="-260" y="-150" width="520" height="300" rx="20" fill="#fffaf0" stroke="#d9c9a8" stroke-width="3"/>`;
  s += big('COFFEE CARD', -230, -92, 40, C.ink, { a: 'start', ls: -1 }) + ui('10th one free', -228, -58, 22, C.grey);
  for (let i = 0; i < 10; i++) { const x = -200 + (i % 5) * 100, y = 0 + Math.floor(i / 5) * 90; s += `<circle cx="${x}" cy="${y}" r="34" fill="none" stroke="#c9b48a" stroke-width="3"/>` + (i < n ? `<circle cx="${x}" cy="${y}" r="28" fill="${C.red}" opacity=".85"/>${big('★', x, y + 12, 34, '#fff', { ls: 0, font: 'U' })}` : ''); }
  return s + '</g>';
}
function bin(t) {
  const bounce = Math.sin(seg(t, LAND, LAND + .5) * Math.PI * 3) * 14 * (1 - seg(t, LAND, LAND + .5));
  return `<g transform="translate(540 1500)"><path d="M-190 -170 L190 -170 L160 220 L-160 220 Z" fill="#5d6166"/>${[-110, -40, 40, 110].map(x => `<rect x="${x - 8}" y="-120" width="16" height="300" rx="8" fill="#4a4d52"/>`).join('')}<g transform="rotate(${f(-8 - bounce)} -200 -175)"><rect x="-215" y="-200" width="430" height="40" rx="12" fill="#6e7378"/><rect x="-50" y="-226" width="100" height="30" rx="10" fill="#6e7378"/></g></g>`;
}
function appScreen(t) {
  const stamps = 7 + [4.6, 5.2, 5.8].filter(a => t > a).length;
  let s = `<rect width="380" height="730" fill="#fff8f2"/>` + T2('Northern Bean', 22, 46, 24) + ui('DEMO APP', 22, 70, 13, C.red, { w: 700 });
  s += `<rect x="16" y="92" width="348" height="250" rx="22" fill="${C.ink}"/>` + ui('Your stamps', 36, 132, 18, '#fff', { w: 600 }) + big(`${stamps}/10`, 344, 136, 30, C.peach, { a: 'end', ls: 0 });
  for (let i = 0; i < 10; i++) {
    const x = 56 + (i % 5) * 67, y = 196 + Math.floor(i / 5) * 76, on = i < stamps;
    const k = i >= 7 ? eb(seg(t, [4.6, 5.2, 5.8][i - 7], [4.6, 5.2, 5.8][i - 7] + .25)) : 1;
    s += `<circle cx="${x}" cy="${y}" r="26" fill="none" stroke="#5a5552" stroke-width="2"/>` + (on ? `<circle cx="${x}" cy="${y}" r="${f(24 * k)}" fill="${C.peach}"/>` : '');
  }
  const free = t > 6.1;
  s += `<rect x="16" y="360" width="348" height="74" rx="20" fill="${free ? C.green : '#efe6de'}"/>` + ui(free ? 'Free coffee unlocked ✓' : `${10 - stamps} more for a free coffee`, 190, 405, 18, free ? '#fff' : C.ink, { w: 700, a: 'middle' });
  ['Menu', 'Order ahead', 'Book'].forEach((m, i) => { s += `<rect x="${16 + i * 120}" y="452" width="108" height="96" rx="18" fill="#fff" stroke="#eadfd6" stroke-width="2"/>` + ui(m, 70 + i * 120, 508, 15, C.ink, { w: 600, a: 'middle' }); });
  s += `<rect x="0" y="650" width="380" height="80" fill="#fff"/>` + ['Home', 'Stamps', 'Order', 'Me'].map((m, i) => ui(m, 48 + i * 95, 690, 14, i === 1 ? C.red : C.grey, { w: 600, a: 'middle' })).join('');
  return s;
}
const T2 = (s, x, y, size) => big(s, x, y, size, C.ink, { a: 'start', ls: -.5 });

function main(t) {
  let s = '';
  if (t < REAL + .3) {
    s += `<rect width="1080" height="1920" fill="#d8c3a0"/>`;
    for (let i = 0; i < 30; i++) s += `<circle cx="${(i * 137) % 1080}" cy="${(i * 283) % 1920}" r="3" fill="#b89f78" opacity=".5"/>`;
    s += bin(t);
    // card tumbling (already mid-air at frame 0)
    const k = seg(t, -0.5, LAND);
    if (t < LAND + .05) {
      const x = lerp(420, 540, k), y = lerp(700, 1340, k * k), r = lerp(-30, 160, k), sc = lerp(1.25, .5, k * k);
      s += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(r)})">${stampCard(7, sc)}</g>`;
    }
    s += hook(t, [['Your stamp card', C.ink], ['ends up in the bin.', C.red]], 330, 92, { lh: 98 });
    if (t > LAND) { const k2 = eb(seg(t, LAND + .15, LAND + .45)); s += `<g transform="translate(540 1030) scale(${f(k2)}) translate(-540 -1030)">${big('7 stamps. Gone.', 540, 1060, 110, C.ink, { ls: -3 })}</g>`; }
  }
  if (t >= REAL) {
    const k = eo(seg(t, REAL, REAL + .35));
    let r = `<rect width="1080" height="1920" fill="${C.peach}"/><circle cx="${f(540 + 60 * Math.sin(t))}" cy="1100" r="520" fill="#fff" opacity=".16"/>`;
    if (t < 8.6) {
      r += big('The one on', 540, 320, 92, C.ink) + big('their phone stays.', 540, 416, 92, '#fff');
      r += phone(540 - 190 * 1.28, 520, 1.28, appScreen(t), {});
      r += [4.6, 5.2, 5.8].map(a => ripple(540 - 190 * 1.28 + (56 + ((a - 4.6) / .6 + 7) % 5 * 67) * 1.28, 520 + (50 + 196 + 76) * 1.28, seg(t, a, a + .4), C.ink)).join('');
      const nk = eo(seg(t, 6.8, 7.1));
      if (nk > 0) r += `<g transform="translate(0 ${f(-140 * (1 - nk))})" opacity="${f(nk)}">${K.notif(110, 540, 860, 'Northern Bean (demo)', 'Your free coffee is ready', 'Show this at the counter', { icon: C.red, h: 130 })}</g>`;
    } else {
      const ks = [8.6, 9.1, 9.6].map(a => eb(seg(t, a, a + .3)));
      r += big('One café app:', 540, 520, 92, C.ink);
      ['Loyalty stamps', 'Menu + order ahead', 'Reminders to come back'].forEach((it, i) => { if (ks[i] <= 0) return; const y = 720 + i * 180; r += `<g transform="translate(540 ${y}) scale(${f(ks[i])}) translate(-540 ${-y})"><rect x="110" y="${y - 72}" width="860" height="144" rx="72" fill="#fff"/>${tick(195, y, 42, 1)}${big(it, 260, y + 20, 54, C.ink, { a: 'start', ls: -1.5 })}</g>`; });
      const p = eb(seg(t, 10.5, 10.8));
      if (p > 0) r += `<g transform="translate(540 1350) scale(${f(p)}) translate(-540 -1350)">${chip('APPS FROM £3,995 · DEMO SHOWN', 540, 1360, C.ink, '#fff', 34)}</g>`;
    }
    s += `<g transform="translate(0 ${f(1920 * (1 - k))})">${r}</g>`;
  }
  return s;
}
module.exports = K.reel(DUR, END, main);
