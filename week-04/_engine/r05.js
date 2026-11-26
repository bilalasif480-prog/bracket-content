// WEEK-04 05 · Messy gym website → book a class in 3 taps. Hook formula #3 "Challenge question": "Can she book a class in 10 seconds?" over a racing timer.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.4, FIX = 7.1, UP = 4.9;
const G = 1480;
const mem = { female: true, hair: 'pony', hairCol: HAIR.black, skin: SKIN[2], top: '#ec3013', bottom: '#201e1d', acc: { phone: '#9fd3ff' }, blinkPh: .5 };
const own = { hair: 'bald', hairCol: HAIR.dark, skin: SKIN[4], top: '#1fa86b', bottom: '#2f3a4a', acc: { beard: 1 }, blinkPh: 1.2 };

function gym(t) {
  let s = W.room(t, { wall: '#3b4350', floor: '#2b2f36', pattern: 'bricks', pcol: 'rgba(255,255,255,.04)', fy: G - 40 });
  s += `<rect x="0" y="1150" width="1080" height="30" fill="#ffc23c" opacity=".8"/>`;
  // rack
  s += `<rect x="900" y="1160" width="160" height="280" rx="10" fill="#5b6270"/>` + [0, 1, 2].map(i => `<rect x="915" y="${1190 + i * 80}" width="130" height="26" rx="13" fill="#9aa1ad"/><rect x="905" y="${1180 + i * 80}" width="34" height="46" rx="10" fill="${C.ink}"/><rect x="1021" y="${1180 + i * 80}" width="34" height="46" rx="10" fill="${C.ink}"/>`).join('');
  return s;
}
function timer(t, x, y) {
  const left = Math.max(0, 10 - (t / UP) * 10), p = left / 10;
  const a = -Math.PI / 2 + (1 - p) * Math.PI * 2, r = 92;
  let s = `<circle cx="${x}" cy="${y}" r="${r + 14}" fill="${C.ink}"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`;
  if (p > 0 && p < 1) s += `<path d="M${x} ${y} L${x} ${y - r} A${r} ${r} 0 ${1 - p > .5 ? 1 : 0} 1 ${f(x + Math.cos(a) * r)} ${f(y + Math.sin(a) * r)} Z" fill="${left < 3 ? C.red : C.peach}" opacity=".9"/>`;
  s += W.T(String(Math.ceil(left)), x, y + 34, 96, C.ink);
  return s;
}
function messy(t) {
  let g = `<rect width="1080" height="1920" fill="#f4f4f4"/>` + W.T('GYM STUFF!!!', 40, 80, 60, '#333', { a: 'start' }) + `<rect x="40" y="110" width="600" height="20" fill="#ccc"/><rect x="40" y="150" width="420" height="20" fill="#ccc"/>`;
  if (t > 1.9 && t < 3.0) g += W.pop(500, 220, eb(seg(t, 1.9, 2.1)), `<rect x="90" y="110" width="820" height="230" rx="20" fill="#ffd400" stroke="#111" stroke-width="6"/>` + W.T('SIGN UP TO OUR', 500, 200, 54, '#111') + W.T('NEWSLETTER!!!', 500, 270, 54, C.red) + `<circle cx="880" cy="140" r="30" fill="#111"/>` + W.T('x', 880, 152, 36, '#fff'));
  if (t >= 3.0) g += `<rect x="80" y="110" width="840" height="230" rx="10" fill="#fff" stroke="#999" stroke-width="4"/>` + W.T('timetable.pdf', 500, 200, 50, '#111') + W.T('(page 1 of 14)', 500, 270, 40, '#777');
  return g;
}
function before(t) {
  let s = gym(t);
  // site card
  s += W.panel(330, 480, 720, 450, 'your-gym.co.uk', `<g transform="translate(345 580) scale(.68)">${messy(t)}</g>`, 1, { ts: 30 });
  // cookie banner -> giant cookie flies out and bonks her
  if (t < 0.75) s += `<rect x="345" y="${f(860 - 70 * eo(seg(t, 0, 0.3)))}" width="690" height="70" fill="#111"/>` + W.T('Accept all cookies?', 690, f(905 - 70 * eo(seg(t, 0, 0.3))), 34, '#fff');
  else if (t < 1.9) { const k = seg(t, 0.75, 1.1); const cx = 690 - 330 * eo(k), cy = 830 + 180 * eo(k) - Math.sin(k * Math.PI) * 200; s += `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(t * 400)})"><circle r="70" fill="#d79a4e" stroke="#8f5c2b" stroke-width="6"/><circle cx="-24" cy="-16" r="11" fill="#4a2c17"/><circle cx="20" cy="10" r="12" fill="#4a2c17"/><circle cx="-6" cy="30" r="9" fill="#4a2c17"/><circle cx="28" cy="-28" r="8" fill="#4a2c17"/></g>`; }
  // PDF timetable unrolls to the floor
  if (t > 3.0) { const k = eo(seg(t, 3.0, 3.5)); s += `<path d="M600 930 V${f(930 + (G - 970) * k)} Q600 ${f(G - 20)} ${f(600 - 360 * k)} ${f(G - 20)}" stroke="#fff" stroke-width="90" fill="none"/><path d="M570 950 H630 M570 1000 H630 M570 1050 H630" stroke="#ccc" stroke-width="6" opacity="${f(k)}"/>`; }
  s += timer(t, 170, 680);
  // member
  let pose = 'run', mood = 'grit', x = 330, lift = 0, rot = 0;
  if (t < 1.1) { pose = 'tap'; mood = 'grit'; }
  else if (t < 1.9) { pose = 'idle'; mood = 'dizzy'; }
  else if (t < 2.4) { pose = 'point'; mood = 'angry'; }
  else if (t < 3.3) { pose = 'tap'; mood = 'grit'; }
  else if (t < 3.9) { const k = seg(t, 3.3, 3.9); pose = 'air'; mood = 'scream'; lift = Math.sin(k * Math.PI) * 200; rot = 40 * k; x = 330 + 80 * k; }
  else if (t < UP) { pose = 'panic'; mood = 'scream'; x = 410; }
  else { const k = seg(t, UP, UP + 0.4); pose = 'flat'; mood = 'dizzy'; rot = -90 * eo(k); x = 410; }
  s += Ch.person(x, G + (t >= UP ? 120 * eo(seg(t, UP, UP + 0.4)) : 0), t, { ...mem, pose, mood, lift, rot, eyesOpen: 1, sweat: t > 2.4, hairUp: t > 3.9 && t < UP ? 1 : 0, shadow: t < UP });
  if (t > 1.1 && t < 1.9) s += Ch.stars(330, G - 560, t, { r: 70 });
  if (t > 1.05 && t < 1.8) s += Ch.impact(200, 940, seg(t, 1.05, 1.8), 'BONK!', { r: 100 });
  if (t > 1.95 && t < 2.6) s += Ch.impact(620, 860, seg(t, 2.05, 2.7), 'HIYA!', { r: 100 });
  if (t > 3.3 && t < 4.1) s += Ch.impact(250, 1020, seg(t, 3.3, 4.0), 'TRIP!', { r: 95 });
  // owner: lifting a dumbbell, cheering, then drops it on his foot
  let opose = 'celebrate', omood = 'grin', ox = 800, olift = 0;
  const dumbY = t < 5.4 ? null : G - 30;
  if (t < UP) { opose = t < 2 ? 'celebrate' : 'wave2'; omood = t < 2 ? 'grin' : 'shock'; }
  else if (t < 5.4) { opose = 'shock' === 'x' ? 'idle' : 'idle'; omood = 'shock'; }
  else { opose = 'air'; omood = 'scream'; olift = Math.abs(Math.sin((t - 5.4) * 8)) * 90; ox = 800 + Math.sin((t - 5.4) * 4) * 40; }
  s += Ch.person(ox, G, t, { ...own, dir: -1, pose: opose, mood: omood, eyesOpen: 1, lift: olift, sweat: t > 2, limbs: t >= 5.4 ? { ha: 60, ka: 100, hb: -4, kb: 4 } : undefined });
  // the dumbbell (held over his head until it drops)
  const dk = seg(t, 5.0, 5.4);
  const db = (x, y) => `<g transform="translate(${f(x)} ${f(y)})"><rect x="-80" y="-12" width="160" height="24" rx="12" fill="#9aa1ad"/><rect x="-100" y="-40" width="40" height="80" rx="12" fill="${C.ink}"/><rect x="60" y="-40" width="40" height="80" rx="12" fill="${C.ink}"/></g>`;
  if (t < 5.0) s += db(ox - 10, G - 560 - (t < UP ? Math.abs(Math.sin(t * 7)) * 40 : 0));
  else if (t < 5.4) s += db(ox - 10, G - 560 + 540 * dk * dk);
  else s += db(760, dumbY);
  if (t > 5.4) s += Ch.impact(940, 760, seg(t, 5.4, 6.3), 'OUCH!', { r: 110 });
  if (t > UP && t < UP + 0.9) s += Ch.impact(540, 760, seg(t, UP, UP + 0.9), 'BZZZT!', { r: 130 });
  if (t < UP) s += S.head(t, -2, 'Can she book a class | in *10* *seconds?*', { col: '#fff', acc: C.peach });
  else s += S.head(t, UP, '*Time’s* *up.*', { col: '#fff', acc: C.peach, size: 110 });
  return s;
}
function clean(t) {
  let g = `<rect width="1080" height="1920" fill="#fff"/><rect width="1080" height="100" fill="${C.ink}"/>` + W.T('Your Gym · Book a class', 40, 66, 44, '#fff', { a: 'start' });
  const rows = ['Spin · 6pm', 'Yoga · 7pm'];
  rows.forEach((r, i) => { const on = i === 0 && t > 8.2; g += `<rect x="40" y="${140 + i * 120}" width="1000" height="100" rx="22" fill="${on ? '#ffe9e3' : '#f3f2f2'}" stroke="${on ? C.red : '#f3f2f2'}" stroke-width="6"/>` + W.T(r, 80, 205 + i * 120, 48, C.ink, { a: 'start', w: 800 }); });
  g += t > 9.4 ? W.btn(240, 410, 600, 110, 'Booked ✓', C.green, 54) : W.btn(240, 410, 600, 110, 'Book', C.red, 54);
  return g;
}
function after(t) {
  let s = gym(t);
  s += W.panel(330, 480, 720, 450, 'your-gym.co.uk', `<g transform="translate(345 580) scale(.66)">${clean(t)}</g>`, eb(seg(t, FIX + 0.2, FIX + 0.5)), { ts: 30 });
  s += W.tapNum(1, 160, 640, seg(t, 8.2, 8.5)) + W.tapNum(2, 160, 760, seg(t, 8.8, 9.1)) + W.tapNum(3, 160, 880, seg(t, 9.4, 9.7));
  const pose = t < 8.0 ? 'idle' : t < 9.5 ? 'tap' : t < 10.5 ? 'celebrate' : 'dance';
  s += Ch.person(380, G, t, { ...mem, pose, mood: t < 9.5 ? 'smile' : 'grin', eyesOpen: 1 });
  s += Ch.person(800, G, t, { ...own, dir: -1, pose: t < 9.5 ? 'thumbs' : 'celebrate', mood: 'grin', eyesOpen: 1, ph: .4 });
  if (t > 9.5) s += confetti(540, 900, 9.5, t, 40);
  if (t < 10.6) s += S.head(t, FIX + 0.15, '*3* *taps.* | Booked.', { col: '#fff', acc: C.peach, size: 92 });
  else s += S.tag(t, 10.6, 'Websites from £655', '', { y: 345, w: 860, s1: 70 });
  return s;
}
module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < FIX ? before(t) : after(t);
    s += S.wipe(t, FIX, C.peach, 0.45);
    s += S.endOnly(t, END, 'dark');
    return s;
  },
};
