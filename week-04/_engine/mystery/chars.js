// chars.js — parametric flat-vector cartoon characters (original designs) + animals + comic props.
// Everything returns SVG strings. Angles in degrees: 0 = limb hanging straight down, + = forward (facing side).
const { clamp, seg, eo, eb, f } = require('./lib');
const INK = '#201e1d';
const cfg = { scale: 1 }; // global character scale (week-04: 1.25 so people read on a phone)
const SKIN = ['#f6d1b1', '#e8b48f', '#c98b5f', '#8d5a3b', '#5c3a26'];
const HAIR = { black: '#1d1714', brown: '#5b3a1f', ginger: '#b5561d', blond: '#e0b85a', grey: '#a9a6a2', dark: '#2b1d16' };
const R = Math.PI / 180;
const sn = a => Math.sin(a * R), cs = a => Math.cos(a * R);
const L1 = 74, L2 = 72, A1 = 62, A2 = 58; // thigh, shin, upper arm, forearm

function shade(hex, k) { // k<0 darker, k>0 lighter
  let h = hex.slice(1); if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const n = parseInt(h, 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = k < 0 ? 0 : 255, p = Math.abs(k);
  r = Math.round(r + (t - r) * p); g = Math.round(g + (t - g) * p); b = Math.round(b + (t - b) * p);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function chain(x0, y0, a1, l1, a2, l2) {
  const x1 = x0 + sn(a1) * l1, y1 = y0 + cs(a1) * l1;
  return [x1, y1, x1 + sn(a2) * l2, y1 + cs(a2) * l2];
}
const limbPath = (x0, y0, p, w, col) => `<path d="M${f(x0)} ${f(y0)} L${f(p[0])} ${f(p[1])} L${f(p[2])} ${f(p[3])}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

// ---------- poses ----------
// returns {ha,ka,hb,kb (hip angle, knee bend), sa,ea,sb,eb (shoulder angle, elbow bend), lean, hop, ground}
function pose(name, t, o = {}) {
  const sp = o.speed ?? 1;
  let P;
  switch (name) {
    case 'walk': {
      const p = t * 7.5 * sp;
      const s1 = Math.sin(p), c1 = Math.cos(p);
      P = { ha: 26 * s1, ka: 6 + 38 * Math.max(0, c1), hb: -26 * s1, kb: 6 + 38 * Math.max(0, -c1), sa: -24 * s1, ea: 18, sb: 24 * s1, eb: 18, lean: 3, hop: 0 };
      break;
    }
    case 'run': {
      const p = t * 13 * sp;
      const s1 = Math.sin(p), c1 = Math.cos(p);
      P = { ha: 42 * s1 + 8, ka: 18 + 80 * Math.max(0, c1), hb: -42 * s1 + 8, kb: 18 + 80 * Math.max(0, -c1), sa: -45 * s1 + 5, ea: 75, sb: 45 * s1 + 5, eb: 75, lean: 14, hop: 16 * Math.abs(c1) };
      break;
    }
    case 'air': { // jumping / dropping, limbs flailing
      const w = Math.sin(t * 20);
      P = { ha: 35, ka: 70, hb: -15, kb: 50, sa: 150 + 20 * w, ea: 20, sb: -(140 - 20 * w), eb: -25, lean: 0, hop: 0, ground: false };
      break;
    }
    case 'tuck': P = { ha: 70, ka: 120, hb: 50, kb: 110, sa: 40, ea: 90, sb: 30, eb: 90, lean: 0, hop: 0, ground: false }; break;
    case 'panic': {
      const w = Math.sin(t * 16), q = Math.sin(t * 22);
      P = { ha: 14 * q, ka: 10 + 20 * Math.max(0, q), hb: -14 * q, kb: 10 + 20 * Math.max(0, -q), sa: 140 + 22 * w, ea: 25 + 25 * w, sb: -(150 - 22 * w), eb: -(25 - 25 * w), lean: -4, hop: 8 * Math.abs(q) };
      break;
    }
    case 'wave': {
      const w = Math.sin(t * 14);
      P = { ha: 4, ka: 4, hb: -4, kb: 4, sa: 140, ea: 25 + 30 * w, sb: 6, eb: 12, lean: 0, hop: 0 };
      break;
    }
    case 'wave2': { // both arms, jumping (desperate waving)
      const w = Math.sin(t * 15), hop = Math.abs(Math.sin(t * 7.5));
      P = { ha: 8 + 20 * hop, ka: 10 + 40 * hop, hb: -8 + 10 * hop, kb: 10 + 40 * hop, sa: 145 + 18 * w, ea: 20 + 25 * w, sb: -(155 - 18 * w), eb: -(20 - 25 * w), lean: 0, hop: 50 * hop };
      break;
    }
    case 'celebrate': {
      const h = Math.abs(Math.sin(t * 7 * sp)), w = Math.sin(t * 14 * sp);
      P = { ha: 10 + 30 * h, ka: 10 + 60 * h, hb: -10 + 20 * h, kb: 10 + 60 * h, sa: 148 + 10 * w, ea: 10, sb: -(155 - 10 * w), eb: -10, lean: 0, hop: 70 * h };
      break;
    }
    case 'dance': { // side-step disco: one arm up, one down, hips sway
      const p = t * 8 * sp, s1 = Math.sin(p);
      P = { ha: 18 * s1, ka: 10 + 25 * Math.max(0, s1), hb: -18 * s1, kb: 10 + 25 * Math.max(0, -s1), sa: s1 > 0 ? 155 : 40, ea: s1 > 0 ? 10 : 60, sb: s1 > 0 ? -40 : -155, eb: s1 > 0 ? -60 : -10, lean: 6 * s1, hop: 14 * Math.abs(Math.cos(p)) };
      break;
    }
    case 'point': P = { ha: 6, ka: 4, hb: -6, kb: 4, sa: 92, ea: 0, sb: 4, eb: 14, lean: 2, hop: 0 }; break;
    case 'reach': P = { ha: 10, ka: 4, hb: -14, kb: 8, sa: 120, ea: 0, sb: -10, eb: 20, lean: 6, hop: 0 }; break;
    case 'phone': { const p = t * 7.5 * sp, s1 = Math.sin(p), c1 = Math.cos(p); // walking while staring at phone
      P = { ha: 24 * s1, ka: 6 + 34 * Math.max(0, c1), hb: -24 * s1, kb: 6 + 34 * Math.max(0, -c1), sa: 40, ea: 70, sb: 20 * s1, eb: 18, lean: 6, hop: 0 }; break; }
    case 'phoneIdle': P = { ha: 3, ka: 3, hb: -3, kb: 3, sa: 40, ea: 72, sb: 4, eb: 12, lean: 4, hop: 0 }; break;
    case 'knock': { const k = Math.abs(Math.sin(t * 12));
      P = { ha: 4, ka: 4, hb: -4, kb: 4, sa: 100 + 20 * k, ea: 60 - 30 * k, sb: 6, eb: 12, lean: 4, hop: 0 }; break; }
    case 'shrug': P = { ha: 3, ka: 3, hb: -3, kb: 3, sa: 60, ea: 100, sb: -60, eb: -100, lean: 0, hop: 0 }; break;
    case 'facepalm': P = { ha: 3, ka: 3, hb: -3, kb: 3, sa: 30, ea: 140, sb: 4, eb: 10, lean: 8, hop: 0 }; break;
    case 'yawn': P = { ha: 3, ka: 3, hb: -3, kb: 3, sa: 155, ea: 15, sb: -155, eb: -15, lean: -6, hop: 0 }; break;
    case 'sit': P = { ha: 90, ka: 90, hb: 84, kb: 86, sa: 20, ea: 50, sb: 14, eb: 50, lean: -4, hop: 0, ground: false }; break;
    case 'flat': P = { ha: 0, ka: 0, hb: 6, kb: 4, sa: 170, ea: 0, sb: -170, eb: 0, lean: 0, hop: 0 }; break;
    case 'tap': { const k = Math.max(0, Math.sin(t * 10));
      P = { ha: 4, ka: 4, hb: -4, kb: 4, sa: 70 + 10 * k, ea: 20 - 15 * k, sb: 6, eb: 12, lean: 6, hop: 0 }; break; }
    case 'thumbs': P = { ha: 4, ka: 4, hb: -4, kb: 4, sa: 60, ea: 90, sb: 6, eb: 12, lean: 0, hop: 0 }; break;
    case 'skid': P = { ha: 40, ka: 0, hb: -10, kb: 40, sa: -40, ea: 20, sb: -60, eb: 20, lean: -18, hop: 0 }; break;
    default: { const b = Math.sin(t * 2.4);
      P = { ha: 3, ka: 3, hb: -3, kb: 3, sa: 6 + 2 * b, ea: 12, sb: -6 - 2 * b, eb: 12, lean: 0, hop: 0 }; }
  }
  if (P.ground === undefined) P.ground = true;
  return P;
}

// ---------- head ----------
// draws a head centred at (0,0) radius 66 in local coords (already facing +x).
function headSvg(t, o) {
  const skin = o.skin || SKIN[1], hc = o.hairCol || HAIR.brown, fx = (o.face ?? 1) * 12;
  const mood = o.mood || 'smile', acc = o.acc || {};
  let back = '', hair = '', front = '';
  const style = acc.helmet ? 'none' : (o.hair || 'short');
  // back hair
  if (style === 'long') back += `<path d="M-74 -10 C-84 -96 84 -96 74 -10 L82 84 Q0 104 -82 84 Z" fill="${hc}"/>`;
  if (style === 'afro') back += `<circle cx="0" cy="-18" r="94" fill="${hc}"/>`;
  if (style === 'pony') { const sw = Math.sin(t * 9) * 12; back += `<path d="M-50 -50 Q-120 -40 ${f(-112 + sw)} 40 Q${f(-96 + sw)} 70 ${f(-80 + sw)} 46 Q-96 -6 -40 -30 Z" fill="${hc}"/>`; }
  if (style === 'bun') back += `<circle cx="-6" cy="-88" r="30" fill="${hc}"/>`;
  // ears
  let g = back + `<circle cx="${f(-58 + fx * 0.3)}" cy="6" r="15" fill="${shade(skin, -0.08)}"/>`;
  if ((o.face ?? 1) < 0.6) g += `<circle cx="${f(58 + fx * 0.3)}" cy="6" r="15" fill="${shade(skin, -0.08)}"/>`;
  if (acc.earrings) g += `<circle cx="${f(-58 + fx * 0.3)}" cy="26" r="6" fill="#ffc23c"/>`;
  // head
  g += `<circle cx="0" cy="0" r="66" fill="${skin}"/>`;
  // hair top
  const cap = `M-69 -2 C-72 -62 -38 -86 0 -86 C40 -86 72 -62 69 -2 C62 -30 42 -46 12 -46 C-18 -46 -54 -32 -69 -2 Z`;
  if (style === 'short' || style === 'long' || style === 'pony' || style === 'bun') hair += `<path d="${cap}" fill="${hc}"/>`;
  if (style === 'curly' || style === 'afro') for (let i = 0; i < 9; i++) { const a = 200 + i * 17.5; hair += `<circle cx="${f(cs(a) * 62)}" cy="${f(sn(a) * 58 - 8)}" r="26" fill="${hc}"/>`; }
  if (style === 'spiky') hair += `<path d="M-68 -6 L-74 -60 L-46 -50 L-40 -96 L-14 -64 L6 -104 L22 -64 L50 -94 L50 -50 L78 -54 L68 -6 C56 -36 30 -44 0 -44 C-30 -44 -56 -34 -68 -6 Z" fill="${hc}"/>`;
  if (style === 'buzz') hair += `<path d="M-66 -10 C-66 -70 66 -70 66 -10 C50 -40 -50 -40 -66 -10 Z" fill="${hc}"/>`;
  if (style === 'bald') hair += `<path d="M-66 -4 Q-70 -30 -56 -36 L-52 8 Z M66 -4 Q70 -30 56 -36 L52 8 Z" fill="${hc}"/><ellipse cx="-18" cy="-44" rx="16" ry="8" fill="#fff" opacity=".35"/>`;
  // hair standing up (shock)
  if (o.hairUp > 0) {
    const k = o.hairUp;
    for (let i = 0; i < 9; i++) {
      const a = -160 + i * 17.5 + Math.sin(t * 30 + i) * 3, l = (36 + 60 * k) * (0.85 + 0.15 * Math.sin(i * 2.3));
      const x0 = cs(a) * 58, y0 = sn(a) * 58 - 6, x1 = cs(a) * (58 + l), y1 = sn(a) * (58 + l) - 6;
      hair += `<path d="M${f(x0 - 10)} ${f(y0)} L${f(x1)} ${f(y1)} L${f(x0 + 10)} ${f(y0)} Z" fill="${hc}" stroke="${hc}" stroke-width="6" stroke-linejoin="round"/>`;
    }
  }
  g += hair;
  // eyes
  const blink = ((t + (o.blinkPh || 0)) % 3.3) < 0.12;
  const ex1 = fx - 22, ex2 = fx + 24, ey = -4;
  const lk = o.look || [0, 0];
  const lx = clamp(lk[0], -1, 1) * 5, ly = clamp(lk[1], -1, 1) * 6;
  let eyes = '';
  const eyeOpen = (rx, ry, pr) => [ex1, ex2].map(x => `<ellipse cx="${f(x)}" cy="${ey}" rx="${rx}" ry="${ry}" fill="#fff"/><circle cx="${f(x + 2 + lx)}" cy="${f(ey + 2 + ly)}" r="${pr}" fill="${INK}"/><circle cx="${f(x + 4 + lx)}" cy="${f(ey - 2 + ly)}" r="${f(pr * 0.3)}" fill="#fff"/>`).join('');
  const arcs = (up) => [ex1, ex2].map(x => `<path d="M${f(x - 11)} ${ey} Q${f(x)} ${ey + (up ? -12 : 10)} ${f(x + 11)} ${ey}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`).join('');
  if (mood === 'sleep' || mood === 'snore') eyes = arcs(false);
  else if (mood === 'happy' || mood === 'grin' && !o.eyesOpen) eyes = arcs(true);
  else if (mood === 'dizzy') eyes = [ex1, ex2].map(x => `<path d="M${f(x - 9)} ${ey - 9} l18 18 m0 -18 l-18 18" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`).join('');
  else if (blink) eyes = [ex1, ex2].map(x => `<path d="M${f(x - 11)} ${ey} H${f(x + 11)}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`).join('');
  else if (mood === 'shock' || mood === 'scream') eyes = eyeOpen(16, 21, 4.5);
  else if (mood === 'tired' || mood === 'grumpy') eyes = eyeOpen(12, 14, 6.5) + [ex1, ex2].map(x => `<path d="M${f(x - 14)} ${ey - 15} H${f(x + 14)} V${ey + 1} H${f(x - 14)} Z" fill="${skin}"/><path d="M${f(x - 13)} ${ey + 1} H${f(x + 13)}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`).join('');
  else eyes = eyeOpen(12, 15, 6.5);
  if (o.female && !['sleep', 'snore', 'happy', 'dizzy'].includes(mood) && !blink) eyes += [ex1, ex2].map(x => `<path d="M${f(x + 9)} ${ey - 12} l7 -6" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`).join('');
  g += eyes;
  // brows
  const by = ey - 26;
  if (mood === 'angry' || mood === 'grumpy') g += `<path d="M${f(ex1 - 14)} ${by - 6} L${f(ex1 + 12)} ${by + 4} M${f(ex2 - 12)} ${by + 4} L${f(ex2 + 14)} ${by - 6}" stroke="${hc === '#a9a6a2' ? '#77736f' : INK}" stroke-width="7" stroke-linecap="round"/>`;
  else if (mood === 'shock' || mood === 'scream' || mood === 'sad') g += `<path d="M${f(ex1 - 12)} ${by - 6} Q${f(ex1)} ${by - 16} ${f(ex1 + 12)} ${by - 8} M${f(ex2 - 12)} ${by - 8} Q${f(ex2)} ${by - 16} ${f(ex2 + 12)} ${by - 6}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  // nose + cheeks
  g += `<ellipse cx="${f(fx * 1.2 + 4)}" cy="16" rx="8" ry="6" fill="${shade(skin, -0.14)}"/>`;
  g += `<circle cx="${f(ex1 - 8)}" cy="26" r="10" fill="#ff8a7a" opacity=".35"/><circle cx="${f(ex2 + 8)}" cy="26" r="10" fill="#ff8a7a" opacity=".35"/>`;
  // beard
  if (acc.beard) g += `<path d="M-62 4 Q-62 74 0 76 Q62 74 62 4 Q54 46 ${f(fx)} 48 Q-50 46 -62 4 Z" fill="${hc}"/><path d="M${f(fx - 18)} 36 Q${f(fx)} 28 ${f(fx + 18)} 36" stroke="${hc}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  // mouth
  const mx = fx + 2, my = 40;
  let m = mood;
  if (o.talk && !['sleep', 'snore', 'dizzy'].includes(mood)) m = (Math.sin(t * 20 + (o.blinkPh || 0)) > -0.1) ? 'talkO' : 'talkC';
  const lip = o.female ? '#c4473a' : INK;
  if (m === 'smile' || m === 'happy') g += `<path d="M${f(mx - 18)} ${my - 4} Q${f(mx)} ${my + 14} ${f(mx + 18)} ${my - 4}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  else if (m === 'grin') g += `<path d="M${f(mx - 24)} ${my - 8} Q${f(mx)} ${my + 30} ${f(mx + 24)} ${my - 8} Z" fill="${INK}"/><path d="M${f(mx - 18)} ${my - 6} H${f(mx + 18)} L${f(mx + 14)} ${my + 1} H${f(mx - 14)} Z" fill="#fff"/><ellipse cx="${f(mx)}" cy="${my + 12}" rx="9" ry="5" fill="#e65a5a"/>`;
  else if (m === 'shock' || m === 'talkO') g += `<ellipse cx="${f(mx)}" cy="${my + 2}" rx="${m === 'shock' ? 13 : 12}" ry="${m === 'shock' ? 18 : 11}" fill="${INK}"/><ellipse cx="${f(mx)}" cy="${my + (m === 'shock' ? 12 : 7)}" rx="7" ry="4" fill="#e65a5a"/>`;
  else if (m === 'scream' || m === 'yawn') g += `<ellipse cx="${f(mx)}" cy="${my + 6}" rx="20" ry="26" fill="${INK}"/><ellipse cx="${f(mx)}" cy="${my + 20}" rx="11" ry="7" fill="#e65a5a"/>`;
  else if (m === 'talkC') g += `<path d="M${f(mx - 14)} ${my} Q${f(mx)} ${my + 8} ${f(mx + 14)} ${my}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  else if (m === 'sad' || m === 'grumpy') g += `<path d="M${f(mx - 16)} ${my + 8} Q${f(mx)} ${my - 6} ${f(mx + 16)} ${my + 8}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  else if (m === 'snore') { const k = 0.6 + 0.4 * Math.sin(t * 3); g += `<ellipse cx="${f(mx)}" cy="${my + 2}" rx="${f(7 * k + 3)}" ry="${f(9 * k + 3)}" fill="${INK}"/>`; }
  else if (m === 'sleep' || m === 'flat' || m === 'tired') g += `<path d="M${f(mx - 12)} ${my + 2} H${f(mx + 12)}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
  else if (m === 'dizzy') g += `<path d="M${f(mx - 18)} ${my + 4} q6 -8 12 0 t12 0 t12 0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  else if (m === 'angry') g += `<path d="M${f(mx - 18)} ${my + 6} H${f(mx + 18)}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
  if (o.female && (m === 'smile' || m === 'talkC')) g += `<path d="M${f(mx - 8)} ${my + 4} Q${f(mx)} ${my + 9} ${f(mx + 8)} ${my + 4}" stroke="${lip}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  // accessories on head
  if (acc.glasses) g += `<g stroke="${INK}" stroke-width="5" fill="rgba(255,255,255,.18)"><circle cx="${f(ex1)}" cy="${ey}" r="19"/><circle cx="${f(ex2)}" cy="${ey}" r="19"/><path d="M${f(ex1 + 19)} ${ey} H${f(ex2 - 19)}" fill="none"/></g>`;
  if (acc.cap) g += `<path d="M-70 -14 C-72 -84 72 -84 70 -14 Z" fill="${acc.cap}"/><path d="M30 -24 Q100 -30 112 -14 L40 -10 Z" fill="${shade(acc.cap, -0.2)}"/><circle cx="0" cy="-74" r="7" fill="${shade(acc.cap, -0.2)}"/>`;
  if (acc.helmet) g += `<path d="M-76 0 C-80 -100 80 -100 76 0 Z" fill="${acc.helmet}"/><path d="M-60 -64 Q0 -96 60 -64" stroke="#fff" stroke-width="10" fill="none" opacity=".75"/><path d="M4 -52 H78 Q84 -36 76 -30 H4 Z" fill="#2e3b4e" opacity=".85"/><path d="M14 -46 H40" stroke="#fff" stroke-width="5" opacity=".5" stroke-linecap="round"/>`;
  if (acc.headphones) g += `<path d="M-64 0 C-66 -96 66 -96 64 0" stroke="${acc.headphones}" stroke-width="12" fill="none"/><rect x="-80" y="-14" width="26" height="44" rx="12" fill="${acc.headphones}"/>`;
  if (acc.chef) g += `<path d="M-60 -88 H60 L56 -52 H-56 Z" fill="#fff" stroke="#ddd" stroke-width="4"/><circle cx="-40" cy="-118" r="36" fill="#fff"/><circle cx="0" cy="-134" r="42" fill="#fff"/><circle cx="40" cy="-118" r="36" fill="#fff"/><path d="M-58 -78 H58" stroke="#e6e3e0" stroke-width="6"/>`;
  if (acc.nightcap) g += `<path d="M-70 -20 Q-30 -130 60 -90 Q90 -76 104 -20 Q60 -60 -70 -20 Z" fill="${acc.nightcap}"/><circle cx="104" cy="-14" r="16" fill="#fff"/>`;
  return g;
}

// ---------- robot head (AI agent) ----------
function robotHead(t, o) {
  const fx = (o.face ?? 1) * 8, mood = o.mood || 'smile';
  const ab = Math.sin(t * 9) * 10;
  let g = `<path d="M0 -70 Q${f(ab * 0.5)} -96 ${f(ab)} -112" stroke="${INK}" stroke-width="7" fill="none"/><circle cx="${f(ab)}" cy="-116" r="14" fill="#ec3013"/><circle cx="${f(ab - 4)}" cy="-120" r="4" fill="#fff" opacity=".7"/>`;
  g += `<rect x="-78" y="-72" width="156" height="132" rx="44" fill="#ffffff" stroke="${INK}" stroke-width="7"/>`;
  g += `<rect x="-84" y="-20" width="12" height="36" rx="6" fill="${INK}"/><rect x="72" y="-20" width="12" height="36" rx="6" fill="${INK}"/>`;
  g += `<rect x="${f(-58 + fx)}" y="-50" width="116" height="88" rx="30" fill="#201e1d"/>`;
  const blink = (t % 2.7) < 0.12;
  const ec = '#5ef0d0';
  const e1 = -26 + fx, e2 = 26 + fx;
  if (mood === 'happy' || mood === 'grin') g += [e1, e2].map(x => `<path d="M${f(x - 12)} -2 Q${f(x)} -18 ${f(x + 12)} -2" stroke="${ec}" stroke-width="8" fill="none" stroke-linecap="round"/>`).join('');
  else if (blink) g += [e1, e2].map(x => `<path d="M${f(x - 10)} -8 H${f(x + 10)}" stroke="${ec}" stroke-width="7" stroke-linecap="round"/>`).join('');
  else g += [e1, e2].map(x => `<rect x="${f(x - 9)}" y="-22" width="18" height="26" rx="9" fill="${ec}"/>`).join('');
  if (o.talk) { const k = Math.sin(t * 20) > 0 ? 1 : 0.4; g += `<rect x="${f(fx - 14)}" y="${f(14 - 4 * k)}" width="28" height="${f(8 * k + 4)}" rx="5" fill="${ec}"/>`; }
  else g += `<path d="M${f(fx - 14)} 14 Q${f(fx)} 26 ${f(fx + 14)} 14" stroke="${ec}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  g += `<circle cx="${f(-38 + fx)}" cy="22" r="7" fill="#ff8360" opacity=".7"/><circle cx="${f(38 + fx)}" cy="22" r="7" fill="#ff8360" opacity=".7"/>`;
  return g;
}

// ---------- full character ----------
// (x,y) = ground point between the feet. o: see defaults below.
function person(x, y, t, o = {}) {
  const s = (o.s ?? 1) * cfg.scale, dir = o.dir ?? 1;
  const P = { ...pose(o.pose || 'idle', t + (o.ph || 0), o), ...(o.limbs || {}) };
  const robot = !!o.robot;
  const skin = o.skin || SKIN[1];
  const top = o.top || '#3a7bd5', bottom = o.bottom || '#2f3a4a', shoe = o.shoe || INK;
  const acc = o.acc || {};
  const limbCol = robot ? '#3a3735' : null;
  // leg geometry relative to hip at (0,0)
  const legA = chain(6, 0, P.ha, L1, P.ha - P.ka, L2), legB = chain(-6, 0, P.hb, L1, P.hb - P.kb, L2);
  let hipY;
  if (P.ground) hipY = -(Math.max(legA[3], legB[3]) + 12) - P.hop;
  else hipY = -(L1 + L2 + 12) - P.hop;
  const shY = hipY - 138;
  // leg drawing
  const thigh = robot ? limbCol : bottom;
  const shin = robot ? limbCol : (o.skirt || o.shorts ? (o.legs || skin) : bottom);
  const leg = (p, xo, back) => {
    const dark = back ? -0.18 : 0;
    const k = [p[0], p[1] + hipY, p[2], p[3] + hipY];
    let s1 = limbPath(xo, hipY, [k[0], k[1], k[0], k[1]], 30, shade(thigh, dark)) + limbPath(k[0], k[1], [k[2], k[3], k[2], k[3]], 28, shade(shin, dark));
    const sa = Math.atan2(k[3] - k[1], k[2] - k[0]) / R - 90; // shin angle for shoe rotation
    s1 += `<ellipse cx="${f(k[2] + 12)}" cy="${f(k[3] + 4)}" rx="25" ry="14" fill="${shade(robot ? '#ec3013' : shoe, dark)}" transform="rotate(${f(sa * 0.35)} ${f(k[2])} ${f(k[3])})"/>`;
    return s1;
  };
  // arm drawing
  const sleeve = robot ? limbCol : top;
  const fore = robot ? limbCol : (o.longSleeves ? top : skin);
  const arm = (sa, ea, xo, back) => {
    const dark = back ? -0.18 : 0;
    const p = chain(xo, shY + 16, sa, A1, sa + ea, A2);
    let s1 = limbPath(xo, shY + 16, [p[0], p[1], p[0], p[1]], 27, shade(sleeve, dark)) + limbPath(p[0], p[1], [p[2], p[3], p[2], p[3]], 23, shade(fore, dark));
    s1 += `<circle cx="${f(p[2])}" cy="${f(p[3])}" r="15" fill="${shade(robot ? '#ffffff' : skin, dark)}"${robot ? ` stroke="${INK}" stroke-width="5"` : ''}/>`;
    return [s1, p];
  };
  const [armB] = arm(P.sb, P.eb, -30, true);
  const [armA, pA] = arm(P.sa, P.ea, 34, false);
  // torso
  let torso = '';
  const tc = robot ? '#ec3013' : top;
  if (acc.box) torso += `<g transform="translate(-118 ${f(shY - 20)})"><rect width="96" height="118" rx="12" fill="${acc.box}" stroke="${shade(acc.box, -0.3)}" stroke-width="5"/><rect y="0" width="96" height="22" rx="10" fill="${shade(acc.box, -0.2)}"/><rect x="18" y="52" width="60" height="16" rx="8" fill="#fff" opacity=".85"/></g>`;
  if (acc.backpack) torso += `<rect x="-78" y="${f(shY + 6)}" width="44" height="96" rx="18" fill="${acc.backpack}"/>`;
  torso += `<path d="M-46 ${f(shY + 30)} Q-48 ${f(shY - 6)} -14 ${f(shY - 6)} H14 Q48 ${f(shY - 6)} 46 ${f(shY + 30)} L${o.female ? 38 : 44} ${f(hipY + 14)} Q0 ${f(hipY + 26)} ${o.female ? -38 : -44} ${f(hipY + 14)} Z" fill="${tc}"/>`;
  if (robot) torso += `<circle cx="8" cy="${f(shY + 60)}" r="18" fill="#fff"/><circle cx="8" cy="${f(shY + 60)}" r="9" fill="#5ef0d0" opacity="${f(0.6 + 0.4 * Math.sin(t * 6))}"/>`;
  if (o.collar) torso += `<path d="M-16 ${f(shY - 6)} L0 ${f(shY + 22)} L16 ${f(shY - 6)}" fill="#fff"/>`;
  if (acc.tie) torso += `<path d="M0 ${f(shY + 4)} L-9 ${f(shY + 20)} L0 ${f(shY + 84)} L9 ${f(shY + 20)} Z" fill="${acc.tie}"/>`;
  if (acc.stripe) torso += `<rect x="-46" y="${f(shY + 50)}" width="92" height="16" fill="${acc.stripe}"/>`;
  if (o.skirt) torso += `<path d="M-40 ${f(hipY - 10)} H40 L64 ${f(hipY + 62)} Q0 ${f(hipY + 74)} -64 ${f(hipY + 62)} Z" fill="${bottom}"/>`;
  if (acc.apron) torso += `<path d="M-30 ${f(shY + 30)} H34 V${f(hipY + 64)} Q2 ${f(hipY + 72)} -30 ${f(hipY + 64)} Z" fill="${acc.apron}"/><path d="M-26 ${f(shY + 30)} L-14 ${f(shY - 4)} M30 ${f(shY + 30)} L18 ${f(shY - 4)}" stroke="${acc.apron}" stroke-width="6"/><rect x="-14" y="${f(hipY - 8)}" width="34" height="26" rx="6" fill="${shade(acc.apron, -0.12)}"/>`;
  // head
  const hy = shY - 62;
  const hk = (o.headTilt || 0) + (P.lean ? -P.lean * 0.4 : 0);
  const head = `<g transform="translate(6 ${f(hy)}) rotate(${f(hk)})">${robot ? robotHead(t, o) : headSvg(t, { ...o, acc, skin })}</g>`;
  // phone prop in front hand
  let prop = '';
  if (acc.phone) prop = `<g transform="translate(${f(pA[2])} ${f(pA[3])}) rotate(${f(-(P.sa + P.ea) + 100)})"><rect x="-16" y="-34" width="32" height="56" rx="7" fill="${INK}"/><rect x="-11" y="-28" width="22" height="42" rx="4" fill="${acc.phone}"/></g>`;
  // sweat
  let fx = '';
  if (o.sweat) for (let i = 0; i < 2; i++) {
    const p = ((t * 1.4 + i * 0.5) % 1);
    fx += `<path d="M${f(70 + i * 16)} ${f(hy - 40 + p * 70)} q8 14 0 20 q-8 -6 0 -20 Z" fill="#7cc4ff" opacity="${f(1 - p)}" stroke="#3a8fd8" stroke-width="2"/>`;
  }
  const upper = `<g transform="rotate(${f(P.lean)} 0 ${f(hipY)})">${armB}${torso}${o.handOverHead ? head + armA + prop : armA + prop + head}${fx}</g>`;
  const legs = leg(legB, -6, true) + leg(legA, 6, false);
  const body = `${legs}${upper}`;
  const sq = o.squash ?? 1, sx = 1 + (1 - sq) * 0.9;
  const lift = o.lift || 0;
  const rot = o.rot || 0;
  let shadow = '';
  if (o.shadow !== false) { const k = clamp(1 - lift / 900, 0.3, 1); shadow = `<ellipse cx="${f(x)}" cy="${f(y + 4)}" rx="${f(78 * s * k)}" ry="${f(14 * s * k)}" fill="#000" opacity="${f(0.16 * k)}"/>`; }
  return shadow + `<g transform="translate(${f(x)} ${f(y - lift)}) scale(${f(dir * s * sx)} ${f(s * sq)}) rotate(${f(rot)} 0 -200)">${body}</g>`;
}
// head only (e.g. lying in bed), centre (x,y)
function head(x, y, t, o = {}) {
  const s = (o.s ?? 1) * cfg.scale, dir = o.dir ?? 1;
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(dir * s)} ${f(s)}) rotate(${f(o.rot || 0)})">${o.robot ? robotHead(t, o) : headSvg(t, o)}</g>`;
}

// ---------- animals ----------
function cat(x, y, t, o = {}) {
  const s = (o.s ?? 1) * cfg.scale, dir = o.dir ?? 1, col = o.col || '#6f6a66', pose = o.pose || 'sit';
  const dk = shade(col, -0.25), lt = shade(col, 0.35);
  let g = '';
  const sw = Math.sin(t * 3) * 14;
  const face = (hx, hy, mood) => {
    let h = `<path d="M${hx - 42} ${hy - 18} L${hx - 40} ${hy - 66} L${hx - 10} ${hy - 40} Z M${hx + 42} ${hy - 18} L${hx + 40} ${hy - 66} L${hx + 10} ${hy - 40} Z" fill="${col}"/><path d="M${hx - 34} ${hy - 30} L${hx - 34} ${hy - 54} L${hx - 18} ${hy - 40} Z M${hx + 34} ${hy - 30} L${hx + 34} ${hy - 54} L${hx + 18} ${hy - 40} Z" fill="#f2a3a3"/>`;
    h += `<ellipse cx="${hx}" cy="${hy}" rx="50" ry="44" fill="${col}"/><ellipse cx="${hx + 6}" cy="${hy + 16}" rx="26" ry="18" fill="${lt}"/>`;
    if (mood === 'sleep') h += `<path d="M${hx - 28} ${hy - 6} q10 8 20 0 M${hx + 10} ${hy - 6} q10 8 20 0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    else {
      const big = mood === 'hiss' || mood === 'shock';
      h += `<ellipse cx="${hx - 18}" cy="${hy - 6}" rx="${big ? 13 : 12}" ry="${big ? 14 : 11}" fill="#d7e85a"/><ellipse cx="${hx + 20}" cy="${hy - 6}" rx="${big ? 13 : 12}" ry="${big ? 14 : 11}" fill="#d7e85a"/>`;
      h += `<rect x="${hx - 21}" y="${hy - 15}" width="6" height="18" rx="3" fill="${INK}"/><rect x="${hx + 17}" y="${hy - 15}" width="6" height="18" rx="3" fill="${INK}"/>`;
      if (!big) h += `<path d="M${hx - 32} ${hy - 18} H${hx - 4} V${hy - 6} H${hx - 32} Z M${hx + 6} ${hy - 18} H${hx + 34} V${hy - 6} H${hx + 6} Z" fill="${col}"/><path d="M${hx - 32} ${hy - 6} H${hx - 4} M${hx + 6} ${hy - 6} H${hx + 34}" stroke="${INK}" stroke-width="4"/>`; // grumpy lids
      h += `<path d="M${hx - 34} ${hy - 26} L${hx - 6} ${hy - 18} M${hx + 36} ${hy - 26} L${hx + 8} ${hy - 18}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    }
    h += `<path d="M${hx} ${hy + 8} l-6 -6 h12 Z" fill="#e57d8a"/>`;
    if (mood === 'hiss') h += `<path d="M${hx - 14} ${hy + 16} Q${hx} ${hy + 44} ${hx + 14} ${hy + 16} Z" fill="${INK}"/><path d="M${hx - 10} ${hy + 18} l3 8 l3 -8 M${hx + 4} ${hy + 18} l3 8 l3 -8" fill="#fff"/>`;
    else h += `<path d="M${hx - 12} ${hy + 22} Q${hx - 6} ${hy + 16} ${hx} ${hy + 20} Q${hx + 6} ${hy + 16} ${hx + 12} ${hy + 22}" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round" transform="rotate(180 ${hx} ${hy + 19})"/>`;
    h += `<path d="M${hx - 26} ${hy + 10} H${hx - 66} M${hx - 26} ${hy + 18} L${hx - 62} ${hy + 26} M${hx + 26} ${hy + 10} H${hx + 66} M${hx + 26} ${hy + 18} L${hx + 62} ${hy + 26}" stroke="${INK}" stroke-width="3" opacity=".7"/>`;
    return h;
  };
  if (pose === 'sit' || pose === 'hiss' || pose === 'sleep') {
    const arch = pose === 'hiss';
    g += `<path d="M30 -20 Q${f(110 + sw)} -40 ${f(96 + sw)} -130" stroke="${col}" stroke-width="20" fill="none" stroke-linecap="round"/>`;
    if (arch) for (let i = 0; i < 9; i++) { const a = 200 + i * 17; g += `<path d="M${f(cs(a) * 70)} ${f(sn(a) * 80 - 70)} l${f(cs(a) * 24)} ${f(sn(a) * 24)}" stroke="${col}" stroke-width="12" stroke-linecap="round"/>`; }
    g += `<ellipse cx="0" cy="-62" rx="62" ry="66" fill="${col}"/><ellipse cx="8" cy="-50" rx="30" ry="40" fill="${lt}"/>`;
    g += `<ellipse cx="-26" cy="-6" rx="20" ry="10" fill="${dk}"/><ellipse cx="26" cy="-6" rx="20" ry="10" fill="${dk}"/>`;
    g += face(4, -150, pose === 'hiss' ? 'hiss' : pose === 'sleep' ? 'sleep' : (o.mood || 'grumpy'));
  } else if (pose === 'walk' || pose === 'leap') {
    const p = t * 10;
    const legs = [[-50, 0], [-30, Math.PI], [36, Math.PI * 0.5], [56, Math.PI * 1.5]];
    for (const [lx, ph] of legs) { const a = pose === 'leap' ? (lx < 0 ? -40 : 40) : Math.sin(p + ph) * 26; const e = chain(lx, -64, a, 34, a, 30); g += limbPath(lx, -64, [e[0], e[1], e[2], e[3]], 16, lx === -30 || lx === 56 ? dk : col); }
    g += `<path d="M-74 -86 Q${f(-140)} ${f(-110 + sw)} ${f(-130)} ${f(-170 + sw)}" stroke="${col}" stroke-width="20" fill="none" stroke-linecap="round"/>`;
    g += `<ellipse cx="0" cy="-90" rx="84" ry="42" fill="${col}"/>`;
    g += face(86, -128, o.mood || 'grumpy');
  }
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(dir * s)} ${f(s * (o.squash ?? 1))}) rotate(${f(o.rot || 0)} 0 -80)">${g}</g>`;
}

function pigeon(x, y, t, o = {}) {
  const s = (o.s ?? 1) * cfg.scale, dir = o.dir ?? 1, pose = o.pose || 'stand';
  const body = '#9ea7b3', dk = '#6e7886', neck = '#4f8f7a';
  let g = '';
  const fly = pose === 'fly';
  const bob = pose === 'walk' ? Math.sin(t * 14) * 14 : 0;
  const step = pose === 'walk' ? Math.sin(t * 14) * 10 : 0;
  if (!fly) g += `<path d="M-8 -30 L${f(-14 + step)} 0 M${f(-22 + step)} 0 H${f(-2 + step)} M10 -30 L${f(14 - step)} 0 M${f(6 - step)} 0 H${f(26 - step)}" stroke="#ff8a3d" stroke-width="7" stroke-linecap="round"/>`;
  else g += `<path d="M-10 -26 l-14 14 M8 -26 l-10 16" stroke="#ff8a3d" stroke-width="7" stroke-linecap="round"/>`;
  const wa = fly ? Math.sin(t * 26) * 55 : 0;
  g += `<path d="M-60 -60 L-110 -40 L-96 -56 L-112 -66 Z" fill="${dk}"/>`; // tail
  if (fly) g += `<g transform="rotate(${f(-wa)} -10 -74)"><path d="M-10 -74 Q-60 -170 -120 -150 Q-70 -110 -40 -66 Z" fill="${dk}"/></g>`;
  g += `<ellipse cx="-10" cy="-58" rx="60" ry="38" fill="${body}"/>`;
  if (fly) g += `<g transform="rotate(${f(wa)} -10 -74)"><path d="M-10 -74 Q-40 -180 -110 -170 Q-60 -120 -30 -64 Z" fill="${body}" stroke="${dk}" stroke-width="4"/></g>`;
  else g += `<path d="M-50 -64 Q-10 -84 26 -60 Q-10 -40 -50 -64 Z" fill="${dk}"/><path d="M-46 -54 h40 M-40 -46 h36" stroke="#3b4350" stroke-width="5" stroke-linecap="round"/>`;
  const hx = 40 + bob, hy = -98;
  g += `<path d="M14 -84 Q${f(hx - 10)} ${hy + 10} ${f(hx)} ${hy} L${f(hx + 6)} ${hy + 40} Q20 -40 6 -52 Z" fill="${neck}"/><path d="M18 -70 Q${f(hx - 6)} ${hy + 28} ${f(hx + 4)} ${hy + 26}" stroke="#8c5bb0" stroke-width="9" fill="none" opacity=".8"/>`;
  g += `<circle cx="${f(hx)}" cy="${hy}" r="26" fill="#7d8794"/>`;
  g += `<circle cx="${f(hx + 8)}" cy="${hy - 6}" r="9" fill="#ff8a3d"/><circle cx="${f(hx + 10)}" cy="${hy - 6}" r="4.5" fill="${INK}"/>`;
  g += `<path d="M${f(hx + 22)} ${hy - 2} L${f(hx + 44)} ${hy + 6} L${f(hx + 22)} ${hy + 10} Z" fill="#3b3b3b"/><circle cx="${f(hx + 22)}" cy="${hy - 2}" r="5" fill="#eee"/>`;
  if (o.note) {
    const nw = o.note.length * 15 + 34;
    g += `<g transform="translate(${f(hx + 40)} ${hy + 8}) rotate(${f(8 + Math.sin(t * 8) * 6)}) scale(${dir} 1)"><rect x="${dir < 0 ? -nw : 0}" y="0" width="${nw}" height="58" rx="6" fill="#fffbe9" stroke="${INK}" stroke-width="4"/><text x="${dir < 0 ? -nw / 2 : nw / 2}" y="39" font-family="Archivo" font-weight="900" font-size="28" fill="${INK}" text-anchor="middle" letter-spacing="-0.5">${o.note}</text></g>`;
  }
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(dir * s)} ${f(s)}) rotate(${f(o.rot || 0)})">${g}</g>`;
}

// ---------- comic props ----------
function bubble(x, y, text, k, o = {}) {
  if (k <= 0) return '';
  const size = o.size || 44, lines = String(text).split('|');
  const w = Math.max(...lines.map(l => l.length)) * size * 0.56 + 56, h = lines.length * size * 1.12 + 34;
  const tx = o.tail ?? 0; // tail x offset from bubble centre (+ right)
  const tdir = o.tailUp ? -1 : 1;
  const ty = tdir > 0 ? h / 2 : -h / 2;
  const fill = o.fill || '#fff', col = o.col || INK;
  let g = `<path d="M${f(tx - 22)} ${f(ty - tdir * 4)} L${f(tx * 1.4 + (o.tailDx || 0))} ${f(ty + tdir * 46)} L${f(tx + 22)} ${f(ty - tdir * 4)} Z" fill="${fill}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  g += `<rect x="${f(-w / 2)}" y="${f(-h / 2)}" width="${f(w)}" height="${f(h)}" rx="${f(Math.min(40, h / 2))}" fill="${fill}" stroke="${INK}" stroke-width="6"/>`;
  g += `<path d="M${f(tx - 19)} ${f(ty - tdir * 3)} H${f(tx + 19)}" stroke="${fill}" stroke-width="8"/>`;
  lines.forEach((l, i) => { g += `<text x="0" y="${f(-h / 2 + 17 + size * 0.88 + i * size * 1.12)}" font-family="Archivo" font-weight="900" font-size="${size}" fill="${col}" text-anchor="middle" letter-spacing="-1">${l}</text>`; });
  const sc = eb(clamp(k));
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(sc)}) rotate(${f(o.rot || 0)})">${g}</g>`;
}
function impact(x, y, k, text, o = {}) {
  if (k <= 0 || k >= 1) return '';
  const sc = eb(seg(k, 0, 0.3)) * (1 + 0.1 * Math.sin(k * 40)), op = 1 - seg(k, 0.75, 1);
  const r1 = o.r || 130, r2 = r1 * 0.6;
  let d = '';
  for (let i = 0; i < 24; i++) { const a = i * 15, r = i % 2 ? r2 : r1 * (0.85 + 0.15 * ((i * 7) % 3)); d += (i ? 'L' : 'M') + f(cs(a) * r * 1.25) + ' ' + f(sn(a) * r); }
  let g = `<path d="${d}Z" fill="${o.fill || '#ffd23c'}" stroke="${o.stroke || '#ec3013'}" stroke-width="9" stroke-linejoin="round"/>`;
  if (text) g += `<text x="0" y="${f(r1 * 0.18)}" font-family="Archivo" font-weight="900" font-size="${f(r1 * 0.5)}" fill="${o.col || '#ec3013'}" text-anchor="middle" letter-spacing="-2" transform="rotate(-8)">${text}</text>`;
  return `<g opacity="${f(op)}" transform="translate(${f(x)} ${f(y)}) scale(${f(sc)})">${g}</g>`;
}
function stars(x, y, t, o = {}) {
  const r = o.r || 70; let g = '';
  for (let i = 0; i < 3; i++) {
    const a = t * 6 + i * 2.1, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r * 0.3;
    const sz = 16 + 4 * Math.sin(a);
    let d = ''; for (let j = 0; j < 10; j++) { const aa = j * 36 - 90, rr = j % 2 ? sz * 0.45 : sz; d += (j ? 'L' : 'M') + f(px + cs(aa) * rr) + ' ' + f(py + sn(aa) * rr); }
    g += `<path d="${d}Z" fill="#ffd23c" stroke="${INK}" stroke-width="3"/>`;
  }
  return g;
}
function speedLines(x, y, dir, t, o = {}) {
  let g = ''; const n = o.n || 5, len = o.len || 160, col = o.col || INK;
  for (let i = 0; i < n; i++) {
    const p = (t * 4 + i * 0.37) % 1, yy = y - 60 - i * (o.gap || 60), l = len * (0.6 + 0.4 * Math.sin(i * 1.7));
    const x0 = x - dir * (70 + p * 60);
    g += `<path d="M${f(x0)} ${f(yy)} H${f(x0 - dir * l)}" stroke="${col}" stroke-width="${o.w || 9}" stroke-linecap="round" opacity="${f(0.55 * (1 - p))}"/>`;
  }
  return g;
}
function dust(x, y, lt, o = {}) {
  if (lt < 0 || lt > 0.9) return '';
  let g = ''; const n = o.n || 6, sp = o.spread || 160;
  for (let i = 0; i < n; i++) {
    const d = (i / (n - 1) - 0.5) * 2, k = eo(lt / 0.9);
    g += `<circle cx="${f(x + d * sp * k)}" cy="${f(y - 20 - Math.abs(d) * 30 * k - 30 * k)}" r="${f((24 + 20 * k) * (1 - Math.abs(d) * 0.3))}" fill="${o.col || '#d9d4cf'}" opacity="${f(0.9 * (1 - k))}"/>`;
  }
  return g;
}
function zzz(x, y, t, col = '#fff', sz = 1) {
  let s = '';
  for (let i = 0; i < 3; i++) {
    const p = ((t * 0.7 + i / 3) % 1);
    s += `<text x="${f(x + p * 70 * sz + i * 6)}" y="${f(y - p * 150 * sz)}" font-family="Archivo" font-weight="900" font-size="${f((40 + p * 40) * sz)}" fill="${col}" stroke="${INK}" stroke-width="${col === '#fff' ? 0 : 0}" opacity="${f(Math.sin(p * Math.PI))}">z</text>`;
  }
  return s;
}
function notifBadge(x, y, n, k = 1) {
  if (k <= 0) return '';
  const w = String(n).length * 26 + 40;
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(eb(clamp(k)))})"><rect x="${f(-w / 2)}" y="-32" width="${f(w)}" height="64" rx="32" fill="#ec3013" stroke="#fff" stroke-width="5"/><text x="0" y="16" font-family="Archivo" font-weight="900" font-size="44" fill="#fff" text-anchor="middle">${n}</text></g>`;
}

module.exports = { cfg, SKIN, HAIR, INK, shade, pose, person, head, cat, pigeon, bubble, impact, stars, speedLines, dust, zzz, notifBadge, chain };
