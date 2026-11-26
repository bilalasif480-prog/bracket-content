// R07 (Fri 4 Dec 22:00): "Me answering WhatsApp, emails and website chats at 11 pm:" Hooks-bank #8 Relatable meme caption.
// Template: meme caption bar + juggling app icons. Problem: owner time & admin / missed messages (sheet). Service: AI customer agent
// (answers and books on WhatsApp and website chat, hands hard ones to a person, you approve). Agent screen is a DEMO.
const K = require('./kit4');
const { C, seg, eo, eb, f, lerp, big, ui, mono, tick, chip, hook } = K;
const DUR = 14, END = 12.2, DROP = 3.9;

const ICONS = [
  ['WA', C.wa, 'WhatsApp'], ['@', C.blue, 'Email'], ['☎', '#8e44ad', 'Calls'], ['…', C.red, 'Site chat'], ['WA', C.wa, 'WhatsApp'],
];
function icon(x, y, r, i, badge, rot = 0) {
  const [g, col] = ICONS[i];
  let s = `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><rect x="${-r}" y="${-r}" width="${2 * r}" height="${2 * r}" rx="${r * .45}" fill="${col}" filter="url(#sh2)"/>`;
  s += g === 'WA' ? `<circle r="${r * .5}" fill="none" stroke="#fff" stroke-width="${r * .12}"/><path d="M${-r * .45} ${r * .5} l${r * .12} ${-r * .3}" stroke="#fff" stroke-width="${r * .12}"/>` : big(g, 0, r * .35, r * 1.05, '#fff', { ls: 0, font: g === '☎' ? 'U' : 'A' });
  if (badge) s += `<circle cx="${r * .8}" cy="${-r * .8}" r="${r * .42}" fill="${C.red}" stroke="#fff" stroke-width="4"/>` + big(String(badge), r * .8, -r * .8 + r * .18, r * .5, '#fff', { ls: 0 });
  return s + '</g>';
}
const MSGS = [['price?', 0.3], ['open Sunday?', 0.9], ['can I book Sat?', 1.5], ['you there??', 2.2], ['hello?', 2.9]];

function main(t) {
  let s = `<rect width="1080" height="1920" fill="#1b1a19"/>`;
  if (t < 5.7) {
    // juggling: icons on a parabola between hands at x 300 and 780, y 1380
    const n = 4 + (t > 1.6 ? 1 : 0);
    const hx = [300, 780], hy = 1380;
    for (let i = 0; i < n; i++) {
      const ph = (t * .95 + i / n) % 1, dir = i % 2;
      let x = lerp(hx[dir], hx[1 - dir], ph), y = hy - 760 * 4 * ph * (1 - ph);
      if (t > DROP) { const d = seg(t, DROP + i * .05, DROP + .6 + i * .05); y = y + 1400 * d * d; x += (i - 2) * 120 * d; }
      s += icon(x, y, 92, i, Math.floor(3 + t * (4 + i * 2)), (t * 200 + i * 70) % 360 * (t > DROP ? 1 : .15)).replace("translate(", "translate(").replace(`width="144"`, `width="144"`);
    }
    // hands
    [300, 780].forEach((x, i) => { const b = Math.sin(t * 6 + i * Math.PI) * 14; s += `<g transform="translate(${x} ${f(1440 + b)})"><rect x="-62" y="20" width="124" height="320" rx="50" fill="#e9b796"/><rect x="-75" y="170" width="150" height="300" rx="30" fill="#3b5bdb"/><path d="M-120 -10 Q-120 50 0 56 Q120 50 120 -10 Z" fill="#e9b796"/>${[-96, -48, 0, 48].map(fx => `<rect x="${fx}" y="-46" width="44" height="70" rx="22" fill="#f0c3a4"/>`).join('')}<rect x="${i ? -150 : 106}" y="-20" width="44" height="62" rx="22" fill="#f0c3a4" transform="rotate(${i ? -25 : 25})"/></g>`; });
    // message bubbles popping around
    MSGS.forEach(([m, a], i) => {
      const k = eb(seg(t, a, a + .25)); if (k <= 0 || t > DROP + .4) return;
      const x = [190, 820, 250, 760, 540][i], y = [880, 820, 1100, 1060, 980][i];
      s += `<g transform="translate(${x} ${y}) scale(${f(k)})"><rect x="${-m.length * 13 - 26}" y="-40" width="${m.length * 26 + 52}" height="80" rx="40" fill="#fff" filter="url(#sh2)"/>${ui(m, 0, 13, 36, C.ink, { w: 600, a: 'middle' })}</g>`;
    });
    // meme caption bar (white, black text) fully visible at frame 0
    s += hook(t, [['Me answering WhatsApp,', C.ink], ['emails and site chats', C.ink], ['at 11 pm:', C.red]], 330, 76, { lh: 84, bar: [40, '#fff', 8] });
    if (t > DROP + .3) s += `<rect width="1080" height="1920" fill="#000" opacity="${f(.5 * seg(t, DROP + .3, DROP + .5))}"/>` + big('…and one', 540, 1000, 120, '#fff', { op: eo(seg(t, DROP + .4, DROP + .6)) }) + big('always drops.', 540, 1130, 120, C.peach, { op: eo(seg(t, DROP + .6, DROP + .8)) });
  } else if (t < 9.8) {
    // AI agent inbox (DEMO)
    s += `<rect width="1080" height="1920" fill="${C.paper}"/>`;
    s += big('Same messages.', 540, 330, 86, C.ink) + big('An AI agent on it.', 540, 424, 86, C.red);
    s += `<rect x="70" y="500" width="940" height="900" rx="40" fill="#fff" filter="url(#sh)"/>` + ui('Inbox · AI agent (DEMO)', 120, 575, 32, C.ink, { w: 700 }) + `<circle cx="940" cy="565" r="12" fill="${C.green}" opacity="${f(.5 + .5 * Math.sin(t * 6))}"/>`;
    const rows = [['WA', 'can I book Sat?', 'Booked Sat 2pm', C.green, 6.0], ['…', 'open Sunday?', 'Answered: 10–4', C.blue, 6.6], ['@', 'price for a cut?', 'Sent price list', C.blue, 7.2], ['WA', 'wrong order, help', 'Passed to you', C.red, 7.8]];
    rows.forEach(([g, q, a, col, at], i) => {
      const y = 650 + i * 180, k = eo(seg(t, at - .3, at));
      s += `<g opacity="${f(k)}" transform="translate(${f(60 * (1 - k))} 0)">` + icon(160, y + 30, 46, g === 'WA' ? 0 : g === '@' ? 1 : 3) + ui(q, 236, y + 18, 34, C.ink, { w: 600 });
      const d = seg(t, at + .25, at + .5);
      if (d > 0) s += `<rect x="236" y="${y + 40}" width="${a.length * 19 + 40}" height="50" rx="25" fill="${col}" opacity="${f(d)}"/>` + ui(a, 256, y + 75, 28, '#fff', { w: 700, op: d });
      s += `<rect x="120" y="${y + 120}" width="840" height="2" fill="#eee"/></g>`;
    });
    s += `<g transform="translate(540 1490)">${chip('ANSWERS AND BOOKS · HARD ONES GO TO YOU', 0, 0, C.ink, '#fff', 26)}</g>`;
  } else {
    s += `<rect width="1080" height="1920" fill="${C.red}"/>`;
    const ks = [9.8, 10.3, 10.8].map(a => eb(seg(t, a, a + .3)));
    [['Stop juggling.', '#fff'], ['Let an agent', C.ink], ['answer first.', C.ink]].forEach(([l, c], i) => { if (ks[i] > 0) s += `<g transform="translate(540 ${700 + i * 130}) scale(${f(ks[i])}) translate(-540 ${-(700 + i * 130)})">${big(l, 540, 700 + i * 130, 112, c)}</g>`; });
    const p = eb(seg(t, 11.3, 11.6));
    if (p > 0) s += `<g transform="translate(540 1180) scale(${f(p)}) translate(-540 -1180)">${chip('AI AGENTS FROM £875 + £109/MONTH', 540, 1190, C.ink, '#fff', 32)}</g>`;
  }
  return s;
}
module.exports = K.reel(DUR, END, main);
