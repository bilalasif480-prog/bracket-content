// "Built block by block" — the brackets build a Kuwait-ready page, then test it
const { C, clamp, seg, eo, eio, eb, lerp, f, txt, line, bracket, check, confetti, sparkle, bubble, endCard } = require('./lib');
const X0 = 240, Y0 = 640, W = 600, H = 640, FLOOR = 1480;
const L = X0 + 46, R = X0 + W - 46, CX = X0 + W / 2;
const END = 10.8;
// each block drops in from above: appear time, rest y
const drop = (t, a) => { const k = seg(t, a, a + 0.55); return { k, dy: (1 - eb(k)) * -260, on: t >= a }; };
const landPulse = t => [0.8, 1.5, 2.2, 2.9, 3.9].some(a => t > a + 0.45 && t < a + 0.75);

function page(t) {
  let s = `<rect x="${X0 + 12}" y="${Y0 + 14}" width="${W}" height="${H}" rx="40" fill="rgba(32,30,29,.18)"/>
  <rect x="${X0}" y="${Y0}" width="${W}" height="${H}" rx="40" fill="#fff" stroke="${C.ink}" stroke-width="8"/>`;
  let d = drop(t, 0.8);
  if (d.on) s += `<g transform="translate(0 ${f(d.dy)})"><path d="M${X0 + 4} ${Y0 + 100} V${Y0 + 44} Q${X0 + 4} ${Y0 + 4} ${X0 + 44} ${Y0 + 4} H${X0 + W - 44} Q${X0 + W - 4} ${Y0 + 4} ${X0 + W - 4} ${Y0 + 44} V${Y0 + 100} Z" fill="${C.ink}"/>${txt('المتجر', R, Y0 + 70, 40, '#fff', { anchor: 'end' })}<rect x="${L}" y="${Y0 + 44}" width="90" height="16" rx="8" fill="#fff" opacity=".85"/></g>`;
  d = drop(t, 1.5);
  if (d.on) s += `<g transform="translate(0 ${f(d.dy)})"><rect x="${L}" y="${Y0 + 120}" width="${W - 92}" height="170" rx="28" fill="${C.peach}"/><circle cx="${L + 100}" cy="${Y0 + 180}" r="30" fill="#fff" opacity=".7"/>${txt('عرض خاص', R - 20, Y0 + 230, 54, '#fff', { anchor: 'end', weight: 800 })}</g>`;
  d = drop(t, 2.2);
  if (d.on) s += `<g transform="translate(0 ${f(d.dy)})"><rect x="${L}" y="${Y0 + 320}" width="400" height="24" rx="12" fill="#d9d5d1"/><rect x="${L}" y="${Y0 + 362}" width="320" height="24" rx="12" fill="#d9d5d1"/></g>`;
  d = drop(t, 2.9);
  if (d.on) s += `<g transform="translate(0 ${f(d.dy)})"><rect x="${CX - 170}" y="${Y0 + 430}" width="340" height="92" rx="46" fill="${t > 7.9 ? C.green : C.red}"/>${txt('اطلب الآن', CX, Y0 + 489, 44, '#fff', { weight: 800 })}</g>`;
  // WhatsApp-style chat button (generic green speech bubble, no brand mark)
  d = drop(t, 3.9);
  if (d.on) s += `<g transform="translate(0 ${f(d.dy)})"><circle cx="${R - 10}" cy="${Y0 + H - 60}" r="44" fill="${C.green}" stroke="#fff" stroke-width="6"/><path d="M${R - 34} ${Y0 + H - 76} h48 a8 8 0 0 1 8 8 v22 a8 8 0 0 1 -8 8 h-30 l-14 12 v-12 a8 8 0 0 1 -4 -8 v-22 a8 8 0 0 1 0 0z" fill="#fff"/><circle cx="${R - 22}" cy="${Y0 + H - 58}" r="3.5" fill="${C.green}"/><circle cx="${R - 10}" cy="${Y0 + H - 58}" r="3.5" fill="${C.green}"/><circle cx="${R + 2}" cy="${Y0 + H - 58}" r="3.5" fill="${C.green}"/></g>`;
  return s;
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < END + 0.6) {
    s += `<g opacity="${f(1 - seg(t, END, END + 0.6))}">`;
    if (t < 3.6) {
      const o = 1 - seg(t, 3.2, 3.6);
      s += line('We build', 540, 340, 100, C.ink, t, 0.2, { op: o }) + line('websites.', 540, 446, 108, C.red, t, 0.5, { op: o }) + line('نبني مواقع', 540, 548, 72, C.ink, t, 0.9, { op: o });
    } else if (t < 6.8) {
      const o = 1 - seg(t, 6.4, 6.8);
      s += line('Block by block.', 540, 360, 100, C.ink, t, 3.7, { op: o }) + line('خطوة خطوة', 540, 466, 72, C.ink, t, 4.2, { op: o });
    } else {
      s += line('Then we', 540, 340, 96, C.ink, t, 6.9) + line('test it.', 540, 446, 108, C.red, t, 7.3) + line('وبعدين نختبره', 540, 548, 70, C.ink, t, 7.7);
    }
    s += `<g transform="translate(540 960) scale(${f(eb(seg(t, 0.1, 0.6)))}) translate(-540 -960)">${page(t)}</g>`;
    const sq = landPulse(t) ? 0.9 : 1;
    const hap = t > 8.0;
    s += bracket(150, FLOOR, 'L', t, { s: 0.85, squash: sq, mood: hap ? 'happy' : 'grit', look: 1, bounce: t > 8.6 ? 1 : 0 });
    s += bracket(930, FLOOR, 'R', t, { s: 0.85, squash: sq, mood: hap ? 'happy' : 'grit', look: -1, bounce: t > 8.6 ? 1 : 0 });
    if (t > 7.4) {
      s += check(R + 8, Y0 + 52, 28, seg(t, 7.4, 7.8)) + check(CX + 196, Y0 + 489, 28, seg(t, 7.7, 8.1)) + check(R - 10, Y0 + H - 60, 28, seg(t, 8.0, 8.4));
    }
    if (t > 8.6) s += bubble(540, 1415, 'Ready to launch!', t, 8.6, END) + confetti(CX, Y0 + 300, 8.6, t, 34) + sparkle(210, 760, 28, t, 1) + sparkle(880, 1300, 26, t, 3);
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + 0.6))}">${endCard(t, END)}</g>`;
  return s;
}
module.exports = { dur: 16.4, frame };
