// WEEK-04 01 · Slow website → fast website (clothes shop). Hook formula #1 "About to break": frame 0 the customer is already tapping her foot at a loading site.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.4, FIX = 7.1, BACK = 5.0;
const G = 1470;
const cust = { female: true, hair: 'long', hairCol: HAIR.dark, skin: SKIN[3], top: '#8a5cf5', bottom: '#2f3a4a', acc: { phone: '#9fd3ff', earrings: 1 }, blinkPh: .4 };
const own = { hair: 'spiky', hairCol: HAIR.ginger, skin: SKIN[0], top: '#ffc23c', bottom: '#2f3a4a', acc: { glasses: 1 }, collar: 1, blinkPh: 1.6 };

function shop(t) {
  let s = W.room(t, { wall: '#fde3ea', floor: '#e3cdb8', pattern: 'stripes', pcol: 'rgba(236,48,19,.06)', fy: G - 40, boards: 1 });
  // clothes rail
  s += `<path d="M640 1010 H1060" stroke="#6e7886" stroke-width="12" stroke-linecap="round"/><path d="M660 1010 V${G - 40} M1040 1010 V${G - 40}" stroke="#6e7886" stroke-width="10"/>`;
  const cols = ['#ec3013', '#2f9e8f', '#ffc23c', '#4a6fa5', '#ff8360'];
  cols.forEach((c, i) => { const x = 700 + i * 72, sw = Math.sin(t * 2 + i) * 3; s += `<g transform="rotate(${f(sw)} ${x} 1010)"><path d="M${x} 1010 v14" stroke="${C.ink}" stroke-width="4"/><path d="M${x - 34} 1040 l34 -16 l34 16 l-6 120 h-56 Z" fill="${c}"/></g>`; });
  s += W.plant(110, G - 40, 1.1);
  return s;
}
function oldSite(t, p) {
  let s = `<rect x="0" y="0" width="1080" height="1920" fill="#f1efed"/>`;
  s += W.spinner(540, 640, 60, t, C.ink) + W.T('Loading...', 540, 770, 48, C.ink) + W.bar(330, 800, 420, 44, p, C.red) + W.T(Math.floor(p * 100) + '%', 540, 900, 40, C.red);
  return s;
}
function looking(t) {
  let s = shop(t);
  // site card above
  const p = t < BACK ? 0.02 + 0.06 * seg(t, 0, BACK) : t < 6.2 ? 0.08 + 0.92 * seg(t, 5.9, 6.2) : 1;
  const inner = t < 6.2 ? oldSite(t, p) : W.T('Loaded!', 540, 690, 70, C.green) + W.T('(nobody here)', 540, 770, 40, '#9a948f');
  s += W.panel(300, 480, 720, 460, 'threads-shop.co.uk', `<clipPath id="pc"><rect x="304" y="580" width="712" height="356" rx="30"/></clipPath><g clip-path="url(#pc)"><g transform="translate(271 180) scale(.72)">${inner}</g></g>`, 1, { ts: 30 });
  // cobweb between her and the card
  s += W.cobweb(300, 940, 220, seg(t, 3.2, 4.4));
  // the customer
  const gone = t >= BACK;
  if (!gone) {
    const pose = t < 1.2 ? 'phoneIdle' : t < 2.4 ? 'tap' : t < 3.4 ? 'phoneIdle' : t < 4.4 ? 'shrug' : 'tap';
    const mood = t < 1.2 ? 'flat' : t < 2.4 ? 'grumpy' : t < 3.4 ? 'tired' : t < 4.4 ? 'angry' : 'angry';
    const foot = t > 0.0 && t < 4.4 ? { kb: 10 + 22 * Math.max(0, Math.sin(t * 16)), hb: -4 } : {};
    s += Ch.person(330, G, t, { ...cust, pose, mood, limbs: foot, hairUp: 0 });
    // her hair grows (waiting so long)
    const hk = seg(t, 2.4, 3.6);
    if (hk > 0) s += `<path d="M262 ${f(G - 520)} Q240 ${f(G - 300)} ${f(250 - 30 * hk)} ${f(G - 520 + 520 * hk)} L${f(300 - 20 * hk)} ${f(G - 520 + 520 * hk)} Q290 ${f(G - 300)} 300 ${f(G - 520)} Z" fill="${HAIR.dark}"/>`;
  } else {
    const k = seg(t, BACK, BACK + 0.6);
    const x = 330 - 620 * eo(k);
    if (k < 1) s += Ch.speedLines(x, G - 140, -1, t, { col: '#c9a7b0' }) + Ch.person(x, G, t, { ...cust, pose: 'run', dir: -1, mood: 'angry' });
  }
  // the owner: hopeful → sweating → dives after her → face-plant
  if (t < 4.6) {
    const pose = t < 1.6 ? 'wave' : t < 3.2 ? 'point' : 'panic';
    s += Ch.person(800, G, t, { ...own, dir: -1, pose, mood: t < 1.6 ? 'grin' : t < 3.2 ? 'talk' : 'scream', talk: t > 1.6 && t < 3.2, eyesOpen: 1, sweat: t > 2.4, hairUp: seg(t, 3.4, 4.4) });
  } else if (t < BACK + 0.3) {
    s += Ch.person(800, G, t, { ...own, dir: -1, pose: 'panic', mood: 'scream', hairUp: 1, sweat: 1 });
  } else {
    const k = seg(t, BACK + 0.3, BACK + 0.75);
    const x = 800 - 330 * eo(k);
    s += Ch.person(x, G + 150 * eo(k), t, { ...own, dir: -1, pose: k < 1 ? 'air' : 'flat', rot: 90 * eo(k), mood: k < 1 ? 'scream' : 'dizzy', shadow: false });
    if (k >= 1) s += Ch.stars(330, G - 90, t, { r: 70 });
    s += Ch.dust(420, G, t - BACK - 0.75, { col: '#cbb39b', n: 7, spread: 220 });
  }
  if (t > 1.6 && t < 3.0) s += Ch.bubble(780, 1010, 'Any second now!', seg(t, 1.6, 1.8), { tail: 60, size: 42 });
  if (t > BACK - 0.15 && t < BACK + 0.6) s += Ch.impact(250, 1000, seg(t, BACK - 0.15, BACK + 0.6), 'BACK!', { r: 120 });
  if (t > BACK + 0.8) s += Ch.bubble(560, 1060, 'Come back!!', seg(t, BACK + 0.8, BACK + 1.0), { tail: 0, size: 46 });
  // pigeon wanders in and sits on the head-planted owner
  if (t > 5.9) { const k = seg(t, 5.9, 6.7); s += Ch.pigeon(1150 - 520 * k, G - 6, t, { dir: -1, pose: k < 1 ? 'walk' : 'stand', s: 0.75 }); }
  if (t < 2.4) s += S.head(t, -2, 'Your site is | *still* *loading...*', { col: C.ink, acc: C.red });
  else if (t < BACK) s += S.head(t, 2.4, 'Still... | *loading...*', { col: C.ink, acc: C.red });
  else s += S.head(t, BACK, 'And she\'s | *gone.*', { col: C.ink, acc: C.red });
  return s;
}
function newSite(t, a) {
  let s = `<rect x="0" y="0" width="1080" height="1920" fill="#fff"/>`;
  s += `<rect width="1080" height="90" fill="${C.ink}"/>` + W.T('THREADS · New in', 40, 60, 40, '#fff', { a: 'start' });
  const items = [['#2f9e8f', 'Wool coat'], ['#ff8360', 'Puffer'], ['#4a6fa5', 'Rain mac']];
  items.forEach(([c, n], i) => { const k = eb(seg(t, a + 0.1 + i * 0.12, a + 0.4 + i * 0.12)); s += W.pop(180 + i * 360, 230, k, `<rect x="${60 + i * 360}" y="120" width="240" height="210" rx="20" fill="${c}"/><path d="M${120 + i * 360} 170 l60 -26 l60 26 l-10 140 h-100 Z" fill="#fff" opacity=".35"/>` + W.T(n, 180 + i * 360, 380, 40, C.ink)); });
  return s;
}
function fixed(t) {
  let s = shop(t);
  const bought = t >= 8.7;
  let inner = newSite(t, FIX + 0.4);
  inner += bought ? W.pop(540, 465, eb(seg(t, 8.7, 9.0)), W.btn(240, 410, 600, 110, 'Order placed ✓', C.green, 50)) : W.btn(240, 410, 600, 110, 'Add to bag', C.red, 50);
  s += W.panel(300, 480, 720, 460, 'threads-shop.co.uk', `<clipPath id="pc2"><rect x="304" y="580" width="712" height="356" rx="30"/></clipPath><g clip-path="url(#pc2)"><g transform="translate(304 580) scale(.66)">${inner}</g></g>`, eb(seg(t, FIX + 0.2, FIX + 0.5)), { ts: 30 });
  if (t > 8.05 && t < 8.75) s += W.tapNum(1, 900, 900, seg(t, 8.1, 8.4));
  // she zooms back in and skids
  const x = S.tw(t, FIX + 0.6, FIX + 1.1, -200, 330);
  const pose = t < FIX + 1.05 ? 'run' : t < FIX + 1.3 ? 'skid' : t < 8.7 ? 'tap' : t < 10.4 ? 'celebrate' : 'dance';
  if (t < FIX + 1.05) s += Ch.speedLines(x, G - 140, 1, t, { col: '#c9a7b0' });
  s += Ch.person(x, G, t, { ...cust, pose, mood: t < 8.7 ? 'grin' : 'happy', eyesOpen: 1 });
  s += Ch.person(830, G, t, { ...own, dir: -1, pose: t < 8.7 ? 'idle' : t < 10.4 ? 'celebrate' : 'dance', mood: t < 8.7 ? 'shock' : 'grin', eyesOpen: 1, ph: .5 });
  if (bought && t < 11) s += confetti(540, 900, 8.7, t, 40);
  if (t >= 10.6) s += S.tag(t, 10.6, 'Websites from £655', '', { y: 345, w: 860, s1: 70 });
  if (t < 10.6) s += S.head(t, FIX + 0.15, 'A *fast* site. | Order in a tap.', { col: C.ink, acc: C.red });
  return s;
}
module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < FIX ? looking(t) : fixed(t);
    s += S.wipe(t, FIX, C.red, 0.45);
    s += S.endOnly(t, END, 'paper');
    return s;
  },
};
