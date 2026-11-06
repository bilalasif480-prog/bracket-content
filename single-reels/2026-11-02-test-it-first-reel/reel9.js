// "We test it first" — a customer hits a bug and leaves; brackets test first, customer orders
const { C, clamp, seg, eo, eio, eb, lerp, f, txt, line, bracket, bug, check, confetti, sparkle, bubble, endCard } = require('./lib');
const X0 = 240, Y0 = 640, W = 600, H = 600, FLOOR = 1480;
const L = X0 + 46, R = X0 + W - 46, CX = X0 + W / 2;
const END = 11.0;

function page(t) {
  let s = `<rect x="${X0 + 12}" y="${Y0 + 14}" width="${W}" height="${H}" rx="40" fill="rgba(32,30,29,.18)"/>
  <rect x="${X0}" y="${Y0}" width="${W}" height="${H}" rx="40" fill="#fff" stroke="${C.ink}" stroke-width="8"/>
  <path d="M${X0 + 4} ${Y0 + 100} V${Y0 + 44} Q${X0 + 4} ${Y0 + 4} ${X0 + 44} ${Y0 + 4} H${X0 + W - 44} Q${X0 + W - 4} ${Y0 + 4} ${X0 + W - 4} ${Y0 + 44} V${Y0 + 100} Z" fill="${C.ink}"/>
  <circle cx="${L + 8}" cy="${Y0 + 52}" r="10" fill="${C.red}"/><circle cx="${L + 40}" cy="${Y0 + 52}" r="10" fill="${C.gold}"/><circle cx="${L + 72}" cy="${Y0 + 52}" r="10" fill="${C.green}"/>
  <rect x="${L}" y="${Y0 + 120}" width="${W - 92}" height="170" rx="28" fill="${C.peach}"/><circle cx="${L + 100}" cy="${Y0 + 180}" r="30" fill="#fff" opacity=".7"/>
  <rect x="${L}" y="${Y0 + 320}" width="400" height="24" rx="12" fill="#d9d5d1"/><rect x="${L}" y="${Y0 + 362}" width="320" height="24" rx="12" fill="#d9d5d1"/>`;
  const ok = t > 8.0;
  s += `<rect x="${CX - 170}" y="${Y0 + 430}" width="340" height="92" rx="46" fill="${ok ? C.green : C.red}"/>${txt('اطلب الآن', CX, Y0 + 489, 44, '#fff', { weight: 800 })}`;
  return s;
}

function person(x, y, mood, t, o = {}) {
  const { s = 1, step = 0 } = o;
  const sw = Math.sin(t * 10) * step * 8;
  const face = mood === 'happy'
    ? `<path d="M-14 6 Q0 22 14 6" stroke="${C.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>`
    : `<path d="M-14 16 Q0 2 14 16" stroke="${C.ink}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-22 -16 L-8 -10 M22 -16 L8 -10" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})">
    <rect x="-34" y="-150" width="68" height="120" rx="30" fill="${C.ink}"/>
    <rect x="-24" y="-30" width="18" height="${f(30 + sw)}" rx="9" fill="${C.ink}"/><rect x="6" y="-30" width="18" height="${f(30 - sw)}" rx="9" fill="${C.ink}"/>
    <circle cx="0" cy="-190" r="48" fill="#f2c9a5" stroke="${C.ink}" stroke-width="6"/>
    <circle cx="-15" cy="-196" r="6" fill="${C.ink}"/><circle cx="15" cy="-196" r="6" fill="${C.ink}"/>
    <g transform="translate(0 -176)">${face}</g></g>`;
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < END + 0.6) {
    s += `<g opacity="${f(1 - seg(t, END, END + 0.6))}">`;
    if (t < 3.6) {
      const o = 1 - seg(t, 3.2, 3.6);
      s += line('Your customers', 540, 280, 92, C.ink, t, 0.2, { op: o }) + line('shouldn’t be', 540, 380, 92, C.red, t, 0.5, { op: o }) + line('your testers.', 540, 480, 92, C.red, t, 0.8, { op: o }) + line('عملاؤك مو مختبرين عندك', 540, 570, 60, C.ink, t, 1.1, { op: o });
    } else if (t < 7.2) {
      const o = 1 - seg(t, 6.8, 7.2);
      s += line('We test it first.', 540, 360, 104, C.red, t, 3.7, { op: o }) + line('نختبره قبلهم', 540, 466, 72, C.ink, t, 4.2, { op: o });
    } else {
      s += line('Then you launch.', 540, 360, 96, C.ink, t, 7.3) + line('وبعدين تطلق', 540, 466, 68, C.ink, t, 7.7);
    }
    s += `<g transform="translate(540 960) scale(${f(eb(seg(t, 0.1, 0.6)))}) translate(-540 -960)">${page(t)}</g>`;
    // customer #1 arrives, bug bites, leaves
    if (t < 3.6) {
      const arrive = eo(seg(t, 0.7, 1.9)), leave = eio(seg(t, 2.6, 3.6));
      const x = lerp(1250, 830, arrive) + leave * 450;
      s += person(x, FLOOR, t < 2.2 ? 'happy' : 'sad', t, { s: 1.3, step: arrive < 1 || leave > 0 ? 1 : 0 });
      if (t > 1.0) { const k = eio(seg(t, 1.9, 2.4)); const bx = lerp(CX + 60, x, k), by = lerp(Y0 + 470, FLOOR - 270, eo(k)) - Math.sin(k * Math.PI) * 120; s += bug(bx, by, t, { s: 0.55 * eb(seg(t, 1.0, 1.4)), flip: -1, mood: 'cheeky', crawl: 0.5 }); }
      if (t > 2.6) s += bubble(Math.min(x, 700), 1320, 'Lost customer', t, 2.6, 3.6);
    }
    // brackets arrive, bug flees, checks
    if (t > 3.6 && t < 8.6) {
      const enter = eo(seg(t, 3.7, 4.9));
      const stomp = t > 5.0 && t < 5.6 ? 1 - Math.sin(seg(t, 5.0, 5.6) * Math.PI) * 0.14 : 1;
      const mood = t < 5.6 ? 'grit' : 'happy';
      const flee = eo(seg(t, 5.0, 6.4));
      if (flee < 1) s += bug(lerp(CX + 60, -200, flee), Y0 + 470 - flee * 0, t, { s: 0.55, flip: 1, mood: 'scared', crawl: 1 });
      s += bracket(lerp(-220, 150, enter), FLOOR, 'L', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: stomp, mood, look: 1 });
      s += bracket(lerp(1300, 930, enter), FLOOR, 'R', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: stomp, mood, look: -1 });
      if (t > 5.8) s += check(R + 8, Y0 + 52, 28, seg(t, 5.8, 6.2)) + check(CX + 150, Y0 + 489, 28, seg(t, 6.0, 6.4)) + check(L + 330, Y0 + 205, 28, seg(t, 6.2, 6.6));
    }
    // customer #2 orders happily
    if (t >= 7.2) {
      const arrive = eo(seg(t, 7.2, 8.2));
      s += bracket(150, FLOOR, 'L', t, { s: 0.85, mood: 'happy', look: 1, bounce: t > 8.6 ? 1 : 0 }) + bracket(930, FLOOR, 'R', t, { s: 0.85, mood: 'happy', look: -1, bounce: t > 8.6 ? 1 : 0 });
      s += person(lerp(1250, 640, arrive), FLOOR, 'happy', t, { s: 1.3, step: arrive < 1 ? 1 : 0 });
      if (t > 8.4) s += bubble(400, 1400, 'New order!', t, 8.4, END) + confetti(CX, Y0 + 300, 8.4, t, 34) + sparkle(210, 760, 28, t, 1) + sparkle(880, 1300, 26, t, 3);
    }
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + 0.6))}">${endCard(t, END)}</g>`;
  return s;
}
module.exports = { dur: 16.6, frame };
