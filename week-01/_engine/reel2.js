const L = require('./lib');
const { C, seg, eo, eio, eb, lerp, f, txt, line, bracket, check, confetti, sparkle, endCard } = L;
const FLOOR = 1480, CX = 540;

function clock(x, y, t, o = {}) {
  const { sx = 1, sy = 1, shake = 0, sweat = false, mood = 'smug' } = o;
  const r = 180;
  let ticks = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ticks += `<line x1="${f(Math.sin(a) * (r - 28))}" y1="${f(-Math.cos(a) * (r - 28))}" x2="${f(Math.sin(a) * (r - 8))}" y2="${f(-Math.cos(a) * (r - 8))}" stroke="${C.ink}" stroke-width="${i % 3 ? 6 : 10}" stroke-linecap="round"/>`; }
  const ha = t * 1.2 * 180, ma = t * 14 * 60;
  const hand = (len, ang, w, col) => `<line x1="0" y1="0" x2="${f(Math.sin(ang * Math.PI / 180) * len)}" y2="${f(-Math.cos(ang * Math.PI / 180) * len)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const legs = `<rect x="-86" y="${r - 6}" width="34" height="70" rx="16" fill="${C.peach}"/><rect x="52" y="${r - 6}" width="34" height="70" rx="16" fill="${C.peach}"/>`;
  const eyes = `<circle cx="-56" cy="-62" r="22" fill="${C.ink}"/><circle cx="56" cy="-62" r="22" fill="${C.ink}"/><circle cx="-50" cy="-68" r="8" fill="#fff"/><circle cx="62" cy="-68" r="8" fill="#fff"/>`;
  const brow = `<path d="M-84 -102 L-30 -88" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/><path d="M84 -102 L30 -88" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/>`;
  const mouth = mood === 'smug' ? `<path d="M-48 60 Q0 100 48 60" stroke="${C.ink}" stroke-width="9" fill="none" stroke-linecap="round"/>` : `<ellipse cx="0" cy="70" rx="22" ry="30" fill="${C.ink}"/>`;
  const drop = sweat ? `<path d="M130 -90 q22 36 0 50 q-22 -14 0 -50z" fill="#7cc7ff"/>` : '';
  return `<g transform="translate(${f(x + Math.sin(t * 50) * shake)} ${f(y)}) scale(${f(sx)} ${f(sy)})">${legs}<circle r="${r}" fill="#fff" stroke="${C.red}" stroke-width="18"/>${ticks}${eyes}${mood === 'smug' ? '' : brow}${mouth}${hand(80, ha, 12, C.ink)}${hand(124, ma, 8, C.red)}<circle r="12" fill="${C.ink}"/>${drop}</g>`;
}
function coin(x, y, a, rot = 0) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})" opacity="${f(a)}"><circle r="40" fill="${C.gold}" stroke="#d9951a" stroke-width="6"/>${txt('KD', 0, 12, 34, '#8a5a00', { ls: 0, weight: 900 })}</g>`;
}
function scopeCard(x, y, t, a) {
  const k = eo(seg(t, a, a + 0.6));
  let s = `<g transform="translate(${x} ${y + (1 - k) * 500}) scale(${f(0.6 + 0.4 * k)})" opacity="${f(k)}">`;
  s += `<rect x="-190" y="-240" width="380" height="480" rx="30" fill="#fff" stroke="${C.peach}" stroke-width="8"/><rect x="-190" y="-240" width="380" height="96" rx="30" fill="${C.red}"/><rect x="-190" y="-190" width="380" height="46" fill="${C.red}"/>`;
  s += txt('SCOPE', 0, -172, 52, '#fff', { ls: 4 });
  for (let i = 0; i < 3; i++) {
    const cy = -80 + i * 100, c = seg(t, a + 0.9 + i * 0.45, a + 1.2 + i * 0.45);
    s += `<rect x="-150" y="${cy - 28}" width="56" height="56" rx="14" fill="none" stroke="${C.ink}" stroke-width="7"/><rect x="-62" y="${cy - 14}" width="${200 - i * 30}" height="28" rx="14" fill="${C.paper}"/>`;
    if (c > 0) s += `<path d="M-138 ${cy} l16 18 l28 -34" stroke="${C.green}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${f(c)}"/>`;
  }
  return s + '</g>';
}
function priceTag(x, y, t, a, lockT) {
  const k = eb(seg(t, a, a + 0.7));
  const swing = Math.sin(t * 6) * 6 * (1 - seg(t, a + .7, a + 1.8));
  const lk = seg(t, lockT, lockT + .25);
  return `<g transform="translate(${x} ${f(lerp(y - 700, y, k))}) rotate(${f(swing + (1 - k) * 25)})">
    
    <path d="M-170 -100 H120 L190 0 L120 100 H-170 Q-200 100 -200 70 V-70 Q-200 -100 -170 -100 Z" fill="${C.gold}" stroke="#d9951a" stroke-width="7"/>
    <circle cx="-150" cy="0" r="14" fill="${C.ink}"/>
    ${txt('FIXED', -20, -8, 46, C.ink, { ls: 2 })}${txt('PRICE', -20, 42, 46, C.ink, { ls: 2 })}
    <g transform="translate(150 -118)"><path d="M-22 6 V-18 Q-22 -42 0 -42 Q22 -42 22 -18 V${f(6 - lk * 8)}" stroke="${C.ink}" stroke-width="9" fill="none" stroke-linecap="round"/><rect x="-32" y="6" width="64" height="48" rx="12" fill="${C.ink}"/><circle cx="0" cy="30" r="7" fill="${C.gold}"/></g>
  </g>`;
}
function calendar(x, y, t, a) {
  const k = eb(seg(t, a, a + 0.6));
  let s = `<g transform="translate(${x} ${y}) scale(${f(k)})"><rect x="-300" y="-270" width="600" height="540" rx="34" fill="#fff" stroke="${C.peach}" stroke-width="8"/><path d="M-300 -236 Q-300 -270 -266 -270 H266 Q300 -270 300 -236 V-160 H-300 Z" fill="${C.red}"/>`;
  s += txt('SHIP DATE', 0, -192, 56, '#fff', { ls: 5 });
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
    const cx = -240 + c * 80, cy = -100 + r * 80, hit = (r === 2 && c === 4);
    if (hit) { const p = seg(t, a + 0.9, a + 1.3); s += `<circle cx="${cx}" cy="${cy}" r="${f(40 * eb(p))}" fill="${C.red}"/>`; s += p > 0 ? `<path d="M${cx - 12} ${cy + 18} V${cy - 22} L${cx + 22} ${cy - 10} L${cx - 12} ${cy + 2}" fill="#fff" opacity="${f(p)}"/>` : ''; }
    else s += `<rect x="${cx - 24}" y="${cy - 24}" width="48" height="48" rx="12" fill="${C.paper}"/>`;
  }
  return s + '</g>';
}

function scene(t) {
  let s = `<rect width="1080" height="1920" fill="${C.ink}"/>`;
  s += `<rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="#fff" opacity=".08"/>`;

  // ---- S1: the money clock ----
  if (t < 6.5) {
    const out = 1 - seg(t, 6.0, 6.4);
    const pop = t > 5.9;
    if (t < 3.7 || t > 3.7) {
      s += line('Paying by the hour?', 540, 390, 84, '#fff', t, 0.2, { op: t < 4.0 ? 1 : 0 });
      if (t > 3.9) s += line('No hourly', 540, 380, 100, '#fff', t, 3.9, { op: out }) + line('clock.', 540, 500, 120, C.peach, t, 4.3, { op: out });
      if (t < 4.0) s += line('The meter never stops.', 540, 480, 58, C.mute, t, 1.4, { weight: 800, ls: 0 });
    }
    // coins
    if (t < 5.3) for (let i = 0; i < 16; i++) {
      const t0 = 0.5 + i * 0.22, a = t - t0; if (a < 0 || a > 2.2) continue;
      const dir = i % 2 ? 1 : -1, vx = dir * (180 + (i * 53) % 220), vy = -520 - (i * 37) % 260;
      s += coin(540 + vx * a, 1000 + vy * a + 640 * a * a, clamp01(1 - a / 2.2), a * dir * 300);
    }
    // clock
    const enter = eb(seg(t, 0.1, 0.8));
    let sx = 1, sy = 1, sh = 0, sweat = false, mood = 'smug';
    if (t > 5.0 && t < 6.0) { const k = seg(t, 5.0, 6.0); sx = 1 - k * 0.45; sy = 1 + k * 0.25; sh = 4 + k * 8; sweat = true; mood = 'o'; }
    if (!pop) s += clock(540, 1130 + (1 - enter) * 800, t, { sx: sx * enter, sy: sy * enter, shake: sh, sweat, mood: t > 4.4 ? 'o' : 'smug' });
    if (pop) { // puff
      const k = seg(t, 5.9, 6.5);
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; s += `<circle cx="${f(540 + Math.cos(a) * 220 * k)}" cy="${f(1130 + Math.sin(a) * 220 * k)}" r="${f(70 * (1 - k) + 6)}" fill="#fff" opacity="${f(1 - k)}"/>`; }
    }
    // brackets
    if (t > 3.5) {
      const enter2 = eo(seg(t, 3.6, 4.8)), close = eio(seg(t, 4.8, 5.2));
      const gap = t > 6.0 ? lerp(250, 330, eo(seg(t, 6.0, 6.5))) : lerp(lerp(800, 380, enter2), 250, close);
      const walking = t < 4.9 ? 1 : 0;
      s += bracket(CX - gap, FLOOR, 'L', t, { s: 1, walk: walking, mood: t < 6 ? 'grit' : 'happy', bounce: t > 6.1 ? 1 : 0, look: 1, color: C.red });
      s += bracket(CX + gap, FLOOR, 'R', t, { s: 1, walk: walking, mood: t < 6 ? 'grit' : 'happy', bounce: t > 6.1 ? 1 : 0, look: -1 });
    }
  }
  // ---- S2: scope + price ----
  if (t >= 6.5 && t < 12.4) {
    const fadeIn = seg(t, 6.5, 6.9);
    s += line('Fixed scope.', 540, 380, 104, '#fff', t, 7.0);
    s += line('Fixed price.', 540, 506, 104, C.peach, t, 9.4);
    const bump = t > 10.6 && t < 10.9 ? 1 - Math.sin(seg(t, 10.6, 10.9) * Math.PI) * 0.06 : 1;
    const gap = lerp(330, 270, eo(seg(t, 6.9, 7.6)));
    const joy = t > 10.8;
    s += bracket(CX - gap, FLOOR, 'L', t, { s: 1, mood: 'happy', bounce: joy ? 1 : 0, squash: bump, look: 1 });
    s += bracket(CX + gap, FLOOR, 'R', t, { s: 1, mood: 'happy', bounce: joy ? 1 : 0, squash: bump, look: -1 });
    s += scopeCard(CX, 1020, t, 7.2);
    if (t > 9.6) s += priceTag(CX + 90, 1220, t, 9.6, 10.6);
    if (t > 10.7) s += check(CX + 200, 800, 64, seg(t, 10.7, 11.1)) + sparkle(250, 760, 36, t, 1) + sparkle(840, 820, 30, t, 3);
  }
  return s;
}
const clamp01 = x => Math.max(0, Math.min(1, x));

function scene2(t) { // calendar
  let s = `<rect width="1080" height="1920" fill="${C.ink}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="#fff" opacity=".08"/>`;
  const lt = t - 12.4;
  s += line('Ship date agreed', 540, 380, 84, '#fff', t, 12.5);
  s += line('at kickoff.', 540, 490, 96, C.peach, t, 12.8);
  s += calendar(CX, 880, t, 13.0);
  const joy = t > 14.3;
  s += bracket(160, FLOOR, 'L', t, { s: 1, mood: 'happy', bounce: 1, look: 1 });
  s += bracket(920, FLOOR, 'R', t, { s: 1, mood: 'happy', bounce: 1, look: -1 });
  if (t > 14.3) {
    const k = eb(seg(t, 14.3, 14.8));
    s += `<g transform="translate(700 1160) rotate(-10) scale(${f(k)})"><rect x="-230" y="-60" width="460" height="120" rx="60" fill="${C.green}"/>${txt('ON TIME ✓', 0, 24, 66, '#fff', { ls: 1, weight: 900 })}</g>`;
    s += confetti(540, 880, 14.3, t, 34);
  }
  if (t > 15.0) s += line('Hit on the day.', 540, 1340, 76, '#fff', t, 15.0, { weight: 800, ls: -1 });
  return s;
}

function frame(t) {
  let s = '';
  const sceneOut = 1 - seg(t, 16.2, 16.6);
  if (t < 12.4) s += `<g opacity="${f(t > 12.1 ? 1 - seg(t, 12.1, 12.4) : 1)}">${scene(t)}</g>`;
  else if (t < 16.6) s += `<g opacity="${f(Math.min(seg(t, 12.4, 12.7), sceneOut))}"><rect width="1080" height="1920" fill="${C.ink}"/>${scene2(t)}</g>`;
  if (t >= 16.2) s += `<g opacity="${f(seg(t, 16.2, 16.6))}">${endCard(t, 16.2)}</g>`;
  return `<rect width="1080" height="1920" fill="${C.ink}"/>` + s;
}
module.exports = { dur: 22, frame };
