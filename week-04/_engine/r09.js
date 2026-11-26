// WEEK-04 09 · Paper stamp card lost → loyalty app (bakery). Hook formula #6 "Pattern interrupt": frame 0 a pigeon snatches the stamp card.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.4, FIX = 7.1, AGAIN = 5.2;
const G = 1480, PUD = 760;
const man = { hair: 'bald', hairCol: HAIR.grey, skin: SKIN[1], top: '#4a6fa5', bottom: '#5b4a3a', longSleeves: 1, acc: { glasses: 1, beard: 1 }, blinkPh: .5 };
const baker = { female: true, hair: 'bun', hairCol: HAIR.black, skin: SKIN[4], top: '#ff8360', bottom: '#2f3a4a', acc: { apron: '#ffffff' }, blinkPh: 1.3 };

function bakery(t) {
  let s = W.room(t, { wall: '#fff0c9', floor: '#d9b48a', pattern: 'dots', pcol: 'rgba(201,88,59,.10)', fy: G - 40, boards: 1 });
  return s;
}
function counterFront() {
  let s = W.counter(800, G - 220, 280, 180, '#c9583b', '#8f3e28');
  for (let i = 0; i < 3; i++) s += `<ellipse cx="${860 + i * 80}" cy="${G - 262}" rx="36" ry="24" fill="#d79a4e"/><path d="M${840 + i * 80} ${G - 270} q20 -10 40 0" stroke="#fff" stroke-width="5" fill="none"/>`;
  return s;
}
function card(x, y, n, rot = 0, soggy = 0, s = 1) {
  let g = `<rect x="-110" y="-66" width="220" height="132" rx="12" fill="#fffbe9" stroke="${C.ink}" stroke-width="5"/>` + W.T('STAMP CARD', 0, -30, 26, C.ink);
  for (let i = 0; i < 10; i++) { const cx = -80 + (i % 5) * 40, cy = 4 + Math.floor(i / 5) * 38; g += `<circle cx="${cx}" cy="${cy}" r="15" fill="${i < n ? C.red : 'none'}" stroke="${C.ink}" stroke-width="3" opacity="${f(1 - soggy * .7)}"/>`; if (i < n && soggy > 0) g += `<path d="M${cx} ${cy + 10} v${f(30 * soggy)}" stroke="${C.red}" stroke-width="6" opacity=".7"/>`; }
  if (soggy > 0) g += `<rect x="-110" y="-66" width="220" height="132" rx="12" fill="#7cc4ff" opacity="${f(.35 * soggy)}"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${s})">${g}</g>`;
}
function before(t) {
  let s = bakery(t);
  // puddle
  s += `<ellipse cx="${PUD}" cy="${G - 20}" rx="170" ry="30" fill="#7cc4ff" opacity=".8"/>`;
  // the man
  let mx = 300, pose = 'reach', mood = 'shock', lift = 0, rot = 0, dir = 1;
  if (t < 1.1) { pose = t < 0.5 ? 'reach' : 'panic'; mood = t < 0.5 ? 'smile' : 'scream'; }
  else if (t < 2.4) { mx = 300 + 260 * seg(t, 1.1, 2.4); pose = 'run'; mood = 'scream'; }
  else if (t < 2.8) { mx = 560; pose = 'point'; mood = 'shock'; }
  else if (t < 3.3) { const k = seg(t, 2.8, 3.3); mx = 560 + 200 * k; pose = 'air'; rot = 80 * k; lift = Math.sin(k * Math.PI) * 200; mood = 'scream'; }
  else if (t < 3.7) { mx = 700; pose = 'flat'; rot = 90; mood = 'dizzy'; lift = -60; }
  else { mx = 620; pose = t < 4.4 ? 'reach' : t < AGAIN ? 'idle' : 'panic'; mood = t < AGAIN ? 'sad' : 'scream'; }
  s += Ch.person(mx, G, t, { ...man, pose, mood, lift, rot, dir, eyesOpen: 1, sweat: t > 3.7, shadow: rot === 0 });
  if (t > 3.0 && t < 3.9) s += W.splash(PUD, G - 40, t - 3.2);
  // the card(s)
  const hand = [mx + 130, G - 620];
  if (t < 0.45) s += card(hand[0], hand[1], 9, -8, 0, 1.2);
  // pigeon 1: snatch, fly right, drop into the puddle
  if (t < 2.6) {
    const k = seg(t, 0, 0.45), k2 = seg(t, 0.45, 2.2);
    const px = t < 0.45 ? 140 + 290 * k : 430 + 420 * k2, py = t < 0.45 ? 600 + 210 * k : 860 - 150 * Math.sin(k2 * Math.PI);
    s += Ch.pigeon(px, py, t, { dir: 1, pose: 'fly', s: 1.1 });
    if (t >= 0.45 && t < 2.2) s += card(px + 110, py - 40, 9, 10, 0, 1.0);
    if (t >= 2.2) { const k3 = seg(t, 2.2, 2.5); s += card(850 - 90 * k3, 700 + (G - 60 - 700) * k3 * k3, 9, 10 + 70 * k3, 0, 1.0); }
  }
  // soggy card held up
  if (t >= 3.7 && t < AGAIN + 0.2) s += card(mx + 140, G - 640, 9, -6 + Math.sin(t * 9) * 4, seg(t, 3.7, 4.3), 1.2);
  // baker offers a fresh card
  const bp = t < 4.4 ? (t < 2.4 ? 'wave' : 'facepalm') : t < AGAIN ? 'reach' : 'facepalm';
  s += Ch.person(940, G, t, { ...baker, dir: -1, pose: bp, mood: t < 4.4 ? 'shock' : t < AGAIN ? 'smile' : 'sad', eyesOpen: 1, handOverHead: bp === 'facepalm' });
  s += counterFront();
  if (t >= 4.4 && t < AGAIN + 0.3) s += card(800, G - 640, 0, 6, 0, 1.0);
  // pigeon 2 steals the new one too
  if (t >= AGAIN) { const k = seg(t, AGAIN, AGAIN + 1.4); const px = 1200 - 1500 * k, py = 640 + 120 * Math.sin(k * Math.PI); s += Ch.pigeon(px, py, t, { dir: -1, pose: 'fly', s: 1.1 }); if (k > 0.25) s += card(px - 110, py - 40, 0, -10, 0, 1.0); }
  if (t > 2.4 && t < 3.0) s += Ch.impact(PUD + 120, 1180, seg(t, 2.4, 3.0), 'PLOP!', { r: 90 });
  if (t > 3.2 && t < 4.0) s += Ch.impact(PUD - 260, 1200, seg(t, 3.2, 4.0), 'SPLASH!', { r: 110 });
  if (t > 4.4 && t < AGAIN) s += Ch.bubble(520, 800, 'Start again!', seg(t, 4.4, 4.6), { tail: 120, size: 44 });
  if (t > AGAIN + 0.4) s += Ch.bubble(380, 880, 'NOT AGAIN!', seg(t, AGAIN + 0.4, AGAIN + 0.6), { tail: 60, size: 50, fill: C.red, col: '#fff' });
  if (t < 2.4) s += S.head(t, -2, '*9* stamps. | One to go...', { col: C.ink, acc: C.red });
  else s += S.head(t, 2.4, '*Gone.*', { col: C.ink, acc: C.red, size: 110 });
  return s;
}
function app(t) {
  let g = W.T('Your Bakery', 140, 640, 52, C.ink, { a: 'start', ls: -2 }) + (t < 8.7 ? W.T('Loyalty', 940, 640, 34, '#9a948f', { a: 'end', w: 800 }) : '');
  const n = t < 8.4 ? 9 : 10;
  for (let i = 0; i < 10; i++) { const cx = 190 + (i % 5) * 140, cy = 730 + Math.floor(i / 5) * 110; const k = i === 9 ? eb(seg(t, 8.4, 8.7)) : 1; g += `<circle cx="${cx}" cy="${cy}" r="44" fill="none" stroke="${C.ink}" stroke-width="5"/>` + (i < n ? W.pop(cx, cy, k, `<circle cx="${cx}" cy="${cy}" r="38" fill="${C.red}"/><path d="M${cx - 16} ${cy} l10 12 l22 -24" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>`) : ''); }
  return g;
}
function after(t) {
  let s = bakery(t);
  s += W.panel(90, 480, 900, 430, 'your-bakery app', app(t), eb(seg(t, FIX + 0.2, FIX + 0.5)));
  if (t > 8.7) s += W.pop(830, 630, eb(seg(t, 8.7, 9.0)), `<rect x="660" y="595" width="300" height="70" rx="35" fill="${C.green}"/>` + W.T('Free bun!', 810, 644, 42, '#fff'));
  s += Ch.person(360, G, t, { ...man, pose: t < 9.2 ? 'phoneIdle' : t < 10.2 ? 'celebrate' : 'dance', mood: 'grin', eyesOpen: 1, acc: { glasses: 1, beard: 1, phone: '#9fd3ff' } });
  s += Ch.person(940, G, t, { ...baker, dir: -1, pose: t < 9.2 ? 'wave' : 'reach', mood: 'grin', eyesOpen: 1 });
  s += counterFront();
  // pigeon pecks at crumbs, happy
  s += Ch.pigeon(640, G - 10, t, { dir: -1, pose: 'walk', s: .9 });
  if (t > 9.2) { const k = seg(t, 9.2, 9.7); s += `<ellipse cx="${f(820 - 300 * eo(k))}" cy="${f(G - 640 + 60 * k)}" rx="40" ry="26" fill="#d79a4e"/>`; }
  for (let i = 0; i < 5; i++) s += `<circle cx="${590 + i * 22}" cy="${G - 14}" r="6" fill="#d79a4e"/>`;
  if (t < 10.6) s += S.head(t, FIX + 0.15, 'Stamps that | *can’t* *fly* *away.*', { col: C.ink, acc: C.red });
  else s += S.tag(t, 10.6, 'Apps from £3,995', '', { y: 345, w: 820, s1: 70 });
  return s;
}
module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < FIX ? before(t) : after(t);
    s += S.wipe(t, FIX, C.red, 0.45);
    s += S.endOnly(t, END, 'dark');
    return s;
  },
};
