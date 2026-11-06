// "Still loading..." — slow site loses the customer, brackets speed it up
const { C, seg, eo, eio, eb, lerp, f, txt, line, bracket, check, confetti, sparkle, bubble, endCard } = require('./lib');
const FLOOR = 1480;

function spinner(x, y, t, o = {}) {
  const { awake = 0, speed = 0.4 } = o;
  const a = t * 360 * speed;
  let arcs = '';
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2 + a * Math.PI / 180;
    const op = 0.25 + 0.75 * (i / 7);
    arcs += `<circle cx="${f(x + Math.cos(ang) * 210)}" cy="${f(y + Math.sin(ang) * 210)}" r="26" fill="${C.peach}" opacity="${f(op)}"/>`;
  }
  const face = `<circle cx="${x}" cy="${y}" r="150" fill="#fff"/>`;
  const eyes = awake > 0.5
    ? `<circle cx="${x - 52}" cy="${y - 20}" r="24" fill="${C.ink}"/><circle cx="${x + 52}" cy="${y - 20}" r="24" fill="${C.ink}"/><circle cx="${x - 44}" cy="${y - 28}" r="8" fill="#fff"/><circle cx="${x + 60}" cy="${y - 28}" r="8" fill="#fff"/><path d="M${x - 50} ${y + 50} Q${x} ${y + 100} ${x + 50} ${y + 50}" stroke="${C.ink}" stroke-width="10" fill="none" stroke-linecap="round"/>`
    : `<path d="M${x - 78} ${y - 18} Q${x - 52} ${y + 2} ${x - 26} ${y - 18}" stroke="${C.ink}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M${x + 26} ${y - 18} Q${x + 52} ${y + 2} ${x + 78} ${y - 18}" stroke="${C.ink}" stroke-width="10" fill="none" stroke-linecap="round"/><ellipse cx="${x}" cy="${y + 62}" rx="16" ry="10" fill="${C.ink}"/>`;
  let zz = '';
  if (awake < 0.5) for (let i = 0; i < 3; i++) { const p = ((t * 0.6 + i / 3) % 1); zz += txt('z', x + 150 + p * 90, y - 140 - p * 160, 40 + i * 14, C.mute, { op: 1 - p }); }
  let lines = '';
  if (awake > 0.5) for (let i = 0; i < 5; i++) lines += `<line x1="${x - 380}" y1="${y - 160 + i * 80}" x2="${x - 280 - (i % 2) * 40}" y2="${y - 160 + i * 80}" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".5"/>`;
  return lines + arcs + face + eyes + zz;
}
function bar(x, y, w, p, label) {
  return `<rect x="${x - w / 2}" y="${y}" width="${w}" height="40" rx="20" fill="#3a3735"/><rect x="${x - w / 2}" y="${y}" width="${f(Math.max(40, w * p))}" height="40" rx="20" fill="${p >= 1 ? C.green : C.red}"/>${txt(label, x, y + 100, 44, '#fff', { mono: true })}`;
}
function customer(x, y, t, o = {}) {
  const { mood = 'wait', walk = 0, flip = 1, tap = 0 } = o;
  const bob = Math.abs(Math.sin(t * 9)) * 12 * walk;
  const foot = Math.sin(t * 16) * 10 * tap;
  const mouth = mood === 'happy' ? `<path d="M-40 30 Q0 66 40 30" stroke="${C.ink}" stroke-width="9" fill="none" stroke-linecap="round"/>`
    : mood === 'mad' ? `<path d="M-36 46 Q0 20 36 46" stroke="${C.ink}" stroke-width="9" fill="none" stroke-linecap="round"/>`
    : `<path d="M-30 40 H30" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/>`;
  const brows = mood === 'mad' ? `<path d="M-60 -52 L-20 -38 M60 -52 L20 -38" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/>` : '';
  return `<g transform="translate(${f(x)} ${f(y - bob)}) scale(${flip} 1)">
    <rect x="-40" y="100" width="28" height="${f(60 - foot)}" rx="12" fill="${C.ink}"/><rect x="12" y="100" width="28" height="60" rx="12" fill="${C.ink}"/>
    <circle r="120" fill="${C.gold}"/><rect x="40" y="10" width="60" height="100" rx="12" fill="${C.ink}" transform="rotate(14)"/><rect x="50" y="22" width="40" height="70" rx="6" fill="#7cc7ff" transform="rotate(14)"/>
    <circle cx="-36" cy="-18" r="14" fill="${C.ink}"/><circle cx="36" cy="-18" r="14" fill="${C.ink}"/>${brows}${mouth}
  </g>`;
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.ink}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="#fff" opacity=".08"/>`;
  if (t < 14.6) {
    s += `<g opacity="${f(1 - seg(t, 14.0, 14.6))}">`;
    // titles
    if (t < 6.4) { const o = 1 - seg(t, 6.0, 6.4); s += line('Still loading…', 540, 400, 108, '#fff', t, 0.2, { op: o }); if (t > 4.6) s += line('…and they’re gone.', 540, 520, 76, C.peach, t, 4.6, { op: o }); }
    if (t >= 6.4 && t < 14) { s += line('We speed it up.', 540, 400, 104, '#fff', t, 6.6); if (t > 10.6) s += line('Speed check on every site.', 540, 510, 58, C.peach, t, 10.6, { weight: 800, ls: 0 }); }

    // spinner
    const awake = t > 8.6 ? 1 : 0;
    const speed = t < 8.6 ? 0.35 : 3.2;
    const sk = eb(seg(t, 0.1, 0.7));
    s += `<g transform="translate(400 900) scale(${f(sk * 0.82)}) translate(-400 -900)">${spinner(400, 900, t, { awake, speed })}</g>`;
    // progress
    const p = t < 8.6 ? lerp(0.04, 0.18, seg(t, 0.5, 8.6)) : lerp(0.18, 1, eo(seg(t, 8.8, 9.8)));
    const lbl = p >= 1 ? 'LOADED ✓' : `LOADING ${Math.round(p * 100)}%`;
    s += bar(400, 1150, 520, p, lbl);

    // customer
    if (t > 1.6 && t < 6.4) {
      const k = eo(seg(t, 1.6, 2.4)), leave = eio(seg(t, 4.4, 6.2));
      const x = lerp(1250, 850, k) + leave * 600;
      s += customer(x, 1280, t, { mood: t > 3.0 ? 'mad' : 'wait', walk: (t < 2.4 || t > 4.4) ? 1 : 0, tap: t > 2.6 && t < 4.4 ? 1 : 0, flip: t > 4.4 ? -1 : 1 });
      s += bubble(x - 30, 1100, 'ugh…', t, 3.0, 4.3);
      s += bubble(x - 30, 1100, 'bye!', t, 4.5, 5.6);
    }
    if (t > 10.4 && t < 14.0) {
      const k = eo(seg(t, 10.4, 11.2));
      const x = lerp(1250, 850, k);
      s += customer(x, 1280, t, { mood: 'happy', walk: t < 11.2 ? 1 : 0, flip: 1 });
      s += bubble(x - 30, 1100, 'nice!', t, 11.3, 13.8);
    }
    if (t > 9.8 && t < 14) s += check(640, 700, 56, seg(t, 9.8, 10.2)) + confetti(400, 900, 9.8, t, 30) + sparkle(160, 700, 30, t, 2);

    // brackets kick the spinner awake
    if (t > 6.4 && t < 10.6) {
      const enter = eo(seg(t, 6.6, 7.8)), push = eio(seg(t, 7.9, 8.5)), back = eo(seg(t, 8.7, 9.4)), out = eio(seg(t, 9.8, 10.6));
      const gap = lerp(lerp(700, 360, enter), 250, push) + back * 80 + out * 700;
      const mood = t < 8.6 ? 'grit' : 'happy';
      s += bracket(400 - gap, FLOOR, 'L', t, { walk: (t < 7.8 || t > 9.8) ? 1 : 0, mood, look: 1, bounce: t > 8.7 && t < 9.8 ? 1 : 0 });
      s += bracket(400 + gap, FLOOR, 'R', t, { walk: (t < 7.8 || t > 9.8) ? 1 : 0, mood, look: -1, bounce: t > 8.7 && t < 9.8 ? 1 : 0 });
      if (t > 8.5 && t < 8.9) { const k = seg(t, 8.5, 8.9); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; s += `<circle cx="${f(400 + Math.cos(a) * 280 * k)}" cy="${f(900 + Math.sin(a) * 280 * k)}" r="${f(16 * (1 - k))}" fill="${C.gold}"/>`; } }
    }
    s += '</g>';
  }
  if (t >= 14.0) s += `<g opacity="${f(seg(t, 14.0, 14.6))}">${endCard(t, 14.0)}</g>`;
  return s;
}
module.exports = { dur: 19.5, frame };
