// "Looks great on your laptop. But on a phone?"
const { C, seg, eo, eio, eb, lerp, f, txt, line, bracket, bug, check, confetti, sparkle, bubble, endCard } = require('./lib');
const FLOOR = 1480;

function laptop(x, y, s, op) {
  return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${f(op)}">
   <rect x="-380" y="-250" width="760" height="480" rx="28" fill="${C.ink}"/>
   <rect x="-356" y="-226" width="712" height="432" rx="12" fill="#fff"/>
   <rect x="-320" y="-196" width="640" height="40" rx="20" fill="${C.paper}"/>
   <rect x="-320" y="-130" width="360" height="44" rx="22" fill="${C.ink}"/>
   <rect x="-320" y="-70" width="280" height="26" rx="13" fill="${C.paper}"/>
   <rect x="80" y="-130" width="240" height="190" rx="20" fill="${C.peach}"/>
   <rect x="-320" y="0" width="200" height="64" rx="32" fill="${C.red}"/>
   ${txt('ORDER NOW', -220, 42, 26, '#fff', { ls: 1, weight: 800 })}
   <rect x="-320" y="100" width="200" height="80" rx="16" fill="${C.paper}"/><rect x="-100" y="100" width="200" height="80" rx="16" fill="${C.paper}"/><rect x="120" y="100" width="200" height="80" rx="16" fill="${C.paper}"/>
   <path d="M-440 230 H440 L400 270 H-400 Z" fill="${C.ink}"/>
  </g>`;
}
// phone with layout that is broken (k=0) or fixed (k=1)
function phone(x, y, t, k, wob) {
  const W = 340, H = 680, L = x - W / 2, T = y;
  const j = (a) => Math.sin(t * 9 + a) * 6 * wob;
  const hl = lerp(560, 240, k);           // headline overflow
  const imgX = lerp(L + 130, L + 30, k), imgY = lerp(T + 300, T + 250, k);
  const btnY = lerp(T + 610, T + 470, k), btnR = lerp(9, 0, k);
  return `<g>
   <rect x="${L - 18}" y="${T - 18}" width="${W + 36}" height="${H + 36}" rx="56" fill="${C.ink}"/>
   <rect x="${L}" y="${T}" width="${W}" height="${H}" rx="40" fill="#fff"/>
   <rect x="${x - 50}" y="${T + 10}" width="100" height="22" rx="11" fill="${C.ink}"/>
   <rect x="${L + 30}" y="${T + 60}" width="${W - 60}" height="34" rx="17" fill="${C.paper}"/>
   <rect x="${L + 30 + j(1)}" y="${T + 120}" width="${hl}" height="40" rx="20" fill="${C.ink}"/>
   <rect x="${L + 30 + j(2)}" y="${T + 175}" width="${hl * 0.8}" height="40" rx="20" fill="${C.ink}"/>
   <rect x="${f(imgX + j(3))}" y="${f(imgY)}" width="280" height="180" rx="22" fill="${C.peach}" opacity=".92"/>
   <g transform="rotate(${f(btnR + j(4) * 0.3)} ${x} ${f(btnY + 32)})"><rect x="${L + 30}" y="${f(btnY)}" width="${W - 60}" height="68" rx="34" fill="${C.red}"/>${txt('ORDER NOW', x, btnY + 44, 30, '#fff', { ls: 1, weight: 800 })}</g>
   <rect x="${L + 30}" y="${T + 570}" width="${W - 60}" height="70" rx="16" fill="${C.paper}" opacity="${f(k)}"/>
  </g>`;
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < 13.6) {
    s += `<g opacity="${f(1 - seg(t, 13.0, 13.6))}">`;
    if (t < 3.3) { const o = 1 - seg(t, 2.9, 3.3); s += line('Looks great', 540, 420, 112, C.ink, t, 0.2, { op: o }) + line('on your laptop.', 540, 540, 100, C.red, t, 0.6, { op: o }); }
    if (t >= 3.3 && t < 7.6) { const o = 1 - seg(t, 7.2, 7.6); s += line('But on a phone?', 540, 420, 104, C.ink, t, 3.4, { op: o }); }
    if (t >= 7.6) s += line('We test on', 540, 380, 104, C.ink, t, 7.8) + line('real phones.', 540, 500, 116, C.red, t, 8.2);

    // laptop
    if (t < 3.8) { const k = eb(seg(t, 0.1, 0.7)); const out = eio(seg(t, 3.0, 3.8)); s += laptop(540 - out * 900, 960, 0.95 * k, 1); s += check(820, 760, 54, seg(t, 1.0, 1.4)); }
    // phone
    if (t > 3.1) {
      const k = eo(seg(t, 3.1, 3.8));
      const fixK = eb(seg(t, 9.6, 10.3));
      const squeeze = t > 9.2 && t < 9.8 ? Math.sin(seg(t, 9.2, 9.8) * Math.PI) * 0.06 : 0;
      s += `<g transform="translate(${f((1 - k) * 900)} 0) translate(540 0) scale(${f(1 - squeeze)} 1) translate(-540 0)">${phone(540, 560, t, fixK, t < 9.6 ? 1 : 0)}</g>`;
      if (t > 4.2 && t < 7.6) { const p = eb(seg(t, 4.2, 4.6)); s += `<g opacity="${f(p)}">${txt('text cut off ✕', 335, 700, 30, C.red, { mono: true, anchor: 'end', rot: -4 })}${txt('button hidden ✕', 335, 1230, 30, C.red, { mono: true, anchor: 'end', rot: 3 })}</g>`.replace(/anchor="start"/g, ''); }
      if (t > 10.3) { s += check(760, 600, 60, seg(t, 10.3, 10.7)) + sparkle(250, 760, 34, t, 1) + sparkle(860, 1000, 28, t, 3); s += confetti(540, 900, 10.3, t, 30); }
    }
    // bug on the phone, then flung away
    if (t > 4.6 && t < 10.6) {
      const p = eb(seg(t, 4.6, 5.0));
      if (t < 9.6) { s += bug(610, 980, t, { s: 0.55 * p, flip: -1, crawl: 0.6 }); s += bubble(640, 880, 'hehe', t, 5.4, 6.8); }
      else { const k = seg(t, 9.6, 10.6); s += bug(610 + k * 700, 980 - Math.sin(k * Math.PI) * 500 - k * 300, t, { s: 0.55, rot: k * 900, mood: 'scared', crawl: 2, flip: -1 }); }
    }
    // brackets
    if (t > 7.6) {
      const enter = eo(seg(t, 7.6, 8.8)), close = eio(seg(t, 8.8, 9.3)), open = eo(seg(t, 9.8, 10.4));
      const gap = lerp(lerp(800, 340, enter), 250, close) + open * 80;
      const walk = t < 8.8 ? 1 : 0, joy = t > 10.3 ? 1 : 0;
      const mood = t < 9.8 ? 'grit' : 'happy';
      s += bracket(540 - gap, FLOOR, 'L', t, { walk, bounce: joy, mood, look: 1 });
      s += bracket(540 + gap, FLOOR, 'R', t, { walk, bounce: joy, mood, look: -1 });
    }
    s += '</g>';
  }
  if (t >= 13.0) s += `<g opacity="${f(seg(t, 13.0, 13.6))}">${endCard(t, 13.0)}</g>`;
  return s;
}
module.exports = { dur: 18.5, frame };
