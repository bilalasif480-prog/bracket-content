// R12 (Mon 7 Dec 22:00): "'I'll send you the price in DM.'" Research format card H "The wait is the problem" (alphaagency1 Df8GYUPgnt3).
// Template: bold text punch (quote in a circle on black) → DM clock → site with prices. Problem: price questions in DMs / missed messages (sheet).
// Bakery and its prices are a DEMO, labelled EXAMPLE. Bracket price from profile: websites from £655.
const K = require('./kit4');
const { C, seg, eo, eb, f, lerp, big, ui, mono, phone, tick, cross, chip, hook, bubble } = K;
const DUR = 14, END = 12.2;

function dm(t) {
  let s = `<rect width="380" height="730" fill="#fff"/><rect width="380" height="70" fill="#fafafa"/>` + `<circle cx="40" cy="35" r="20" fill="#d6249f"/>` + ui('customer', 72, 42, 19, C.ink, { w: 700 });
  const B = (y, lines, side, at, time) => { const k = eb(seg(t, at, at + .25)); if (k <= 0) return ''; const w = Math.max(...lines.map(l => l.length)) * 10.6 + 40, x = side === 'out' ? 366 : 14; return `<g transform="translate(${x} ${y}) scale(${f(k)}) translate(${-x} ${-y})">` + bubble(x, y, Math.min(w, 320), lines, side, { size: 18, lh: 25, time, inCol: '#efefef', outCol: '#3797f0', fg: side === 'out' ? '#fff' : C.ink }) + '</g>'; };
  return s + B(96, ['how much is a', 'birthday cake?'], 'in', 2.3, '00:04') + B(200, ['Hi! Sending you', 'the price list now'], 'out', 4.1, '11:02') + B(304, ['thanks, already', 'ordered elsewhere'], 'in', 4.9, '11:06');
}
function shop(t) {
  let s = `<rect width="380" height="730" fill="#fffaf5"/>` + big('Rise Bakery', 20, 44, 24, C.ink, { a: 'start', ls: -.5 }) + ui('EXAMPLE PRICES · DEMO', 20, 68, 13, C.red, { w: 700 });
  const items = [['Birthday cake', '£35', '#f4c2c2'], ['Cupcakes ×6', '£15', '#ffe0a8'], ['Sourdough loaf', '£5', '#e8d2b0']];
  items.forEach(([n, p, col], i) => { const y = 96 + i * 150, k = eb(seg(t, 5.9 + i * .3, 6.2 + i * .3)); s += `<g opacity="${f(Math.min(1, k))}"><rect x="16" y="${y}" width="348" height="136" rx="18" fill="#fff" stroke="#efe4da" stroke-width="2"/><rect x="28" y="${y + 12}" width="112" height="112" rx="14" fill="${col}"/>${ui(n, 156, y + 50, 20, C.ink, { w: 700 })}${ui('Collect or delivery', 156, y + 78, 15, C.grey)}${big(p, 340, y + 112, 30, C.red, { a: 'end', ls: 0 })}</g>`; });
  const ok = t > 7.9;
  s += `<rect x="16" y="560" width="348" height="64" rx="32" fill="${ok ? C.green : C.ink}"/>` + ui(ok ? 'Order placed 00:07 ✓' : 'Order now', 190, 600, 20, '#fff', { w: 700, a: 'middle' });
  return s;
}

function main(t) {
  let s = `<rect width="1080" height="1920" fill="#0d0d0d"/>`;
  if (t < 2.2) {
    // card H: quote in a white circle, fully visible at frame 0, circle spinning dashes + punch-in scale
    const pulse = 1 + .03 * Math.sin(t * 7);
    s += `<g transform="translate(540 900) scale(${f(pulse)})"><circle r="430" fill="#fff"/><circle r="455" fill="none" stroke="${C.red}" stroke-width="10" stroke-dasharray="40 30" transform="rotate(${f(t * 90)})"/>`;
    s += T(['“I’ll send you', 'the price', 'in DM.”'], t) + '</g>';
    s += big('That’s how you lose them.', 540, 1500, 70, C.peach, { ls: -2 });
  } else if (t < 5.6) {
    s += big('They ask at midnight.', 540, 330, 80, '#fff', { ls: -2 }) + big(t < 4.1 ? 'You reply at 11 am.' : 'Gone.', 540, 420, 80, C.peach, { ls: -2 });
    s += phone(540 - 190 * 1.3, 520, 1.3, dm(t), { time: t < 4.0 ? '00:04' : '11:02' });
    // clock spin between 2.9 and 4.0
    const ck = seg(t, 2.9, 4.0);
    if (ck > 0 && ck < 1) { const a = ck * 360 * 3; s += `<g transform="translate(540 1000)" opacity="${f(Math.sin(Math.PI * ck))}"><circle r="200" fill="#fff" filter="url(#sh)"/><line x1="0" y1="0" x2="0" y2="-150" stroke="${C.ink}" stroke-width="12" stroke-linecap="round" transform="rotate(${f(a)})"/><line x1="0" y1="0" x2="0" y2="-100" stroke="${C.red}" stroke-width="16" stroke-linecap="round" transform="rotate(${f(a / 12)})"/><circle r="16" fill="${C.ink}"/></g>`; }
    s += cross(880, 1050, 50, seg(t, 5.0, 5.2));
  } else if (t < 9.6) {
    s += big('Prices on your site.', 540, 330, 84, '#fff', { ls: -2 }) + big('Orders at midnight.', 540, 424, 84, C.green, { ls: -2 });
    s += phone(540 - 190 * 1.3, 520, 1.3, shop(t), { url: 'risebakery-demo.co.uk', time: '00:06' });
    s += tick(880, 1310, 48, seg(t, 7.9, 8.1));
  } else {
    s += `<rect width="1080" height="1920" fill="${C.red}"/>`;
    const ks = [9.6, 10.1, 10.6].map(a => eb(seg(t, a, a + .3)));
    [['No waiting', '#fff'], ['for your reply.', '#fff'], ['They just order.', C.ink]].forEach(([l, c], i) => { if (ks[i] > 0) s += `<g transform="translate(540 ${700 + i * 130}) scale(${f(ks[i])}) translate(-540 ${-(700 + i * 130)})">${big(l, 540, 700 + i * 130, 110, c)}</g>`; });
    const p = eb(seg(t, 11.2, 11.5));
    if (p > 0) s += `<g transform="translate(540 1150) scale(${f(p)}) translate(-540 -1150)">${chip('WEBSITES FROM £655', 540, 1160, C.ink, '#fff', 38)}</g>`;
  }
  return s;
}
// quote lines in Archivo italic, red, inside the circle
function T(lines, t) { return lines.map((l, i) => K.T(l, 0, -120 + i * 150, 128, C.red, { font: 'I', ls: -4 })).join(''); }
module.exports = K.reel(DUR, END, main);
