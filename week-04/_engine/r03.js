// WEEK-04 03 · "A website means a big bill upfront" → founding offer (plumber). Hook formula #4 "Expectation vs reality": a giant invoice drops on him.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.4, FIX = 7.1, SLIP = 5.1;
const G = 1480;
const plum = { hair: 'short', hairCol: HAIR.brown, skin: SKIN[1], top: '#2f6fd5', bottom: '#2f6fd5', longSleeves: 0, acc: { cap: '#ec3013', box: '#c9583b' }, blinkPh: .3 };
const mate = { female: true, hair: 'curly', hairCol: HAIR.brown, skin: SKIN[3], top: '#ffc23c', bottom: '#2f3a4a', acc: { earrings: 1 }, blinkPh: 1.4 };

function bathroom(t) {
  let s = W.room(t, { wall: '#d9f0ee', floor: '#b9c7d6', pattern: 'tiles', pcol: 'rgba(32,30,29,.08)', fy: G - 40 });
  // bath
  s += `<rect x="700" y="${G - 250}" width="400" height="210" rx="40" fill="#fff" stroke="#c9d3dc" stroke-width="8"/><rect x="740" y="${G - 40}" width="30" height="40" fill="#c9d3dc"/><rect x="1030" y="${G - 40}" width="30" height="40" fill="#c9d3dc"/>`;
  // wall pipe
  s += `<path d="M0 1100 H210 V${G - 40}" stroke="#b0b8c2" stroke-width="34" fill="none"/><rect x="186" y="1080" width="48" height="40" rx="8" fill="#8a93a6"/>`;
  return s;
}
function invoice(x, y, w, h, l1, l2, rot = 0) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><rect x="${-w / 2 + 10}" y="${-h + 12}" width="${w}" height="${h}" fill="#000" opacity=".15"/><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="#fffbe9" stroke="${C.ink}" stroke-width="7"/>` +
    W.T('INVOICE', 0, -h + 70, 54, C.ink) + `<path d="M${-w / 2 + 40} ${-h + 100} H${w / 2 - 40}" stroke="${C.ink}" stroke-width="5"/>` + W.T(l1, 0, -h / 2 + 30, 64, C.red) + (l2 ? W.T(l2, 0, -h / 2 + 100, 38, C.ink) : '') + `</g>`;
}
function before(t) {
  let s = bathroom(t);
  // water spray from the burst pipe
  if (t > 3.6) { for (let i = 0; i < 12; i++) { const p = (t * 2.5 + i / 12) % 1; s += `<circle cx="${f(234 + p * 380)}" cy="${f(1100 - p * 160 + p * p * 420)}" r="${f(14 + 6 * (1 - p))}" fill="#7cc4ff" opacity="${f(.9 - p * .5)}"/>`; } s += `<ellipse cx="520" cy="${G - 20}" rx="${f(120 + 240 * seg(t, 3.6, 5))}" ry="22" fill="#7cc4ff" opacity=".7"/>`; }
  // plumber
  const d1 = S.drop(t, 0.75, 0.32, 1700);
  let px = S.tw(t, 0, 0.75, 300, 430), pose = t < 0.75 ? 'walk' : 'idle', mood = 'smile', sq = 1, lift = 0, rot = 0, pdir = 1;
  if (d1 && d1.landed >= 0 && t < 2.7) { sq = t < 2.2 ? 0.22 : 0.22 + 0.78 * eb(seg(t, 2.2, 2.6)); mood = t < 2.2 ? 'dizzy' : 'shock'; pose = 'flat'; }
  if (t >= 2.7 && t < 3.6) { pose = 'idle'; mood = 'dizzy'; if (t > 3.05) { pose = 'air'; lift = Math.sin(seg(t, 3.05, 3.6) * Math.PI) * 220; mood = 'shock'; } }
  if (t >= 3.6 && t < SLIP) { pose = 'panic'; mood = 'scream'; px = 430 + Math.sin(t * 9) * 30; }
  let shownPlumber = true;
  if (t >= SLIP) { // slips, slides on the water and lands in the bath
    const k = seg(t, SLIP, SLIP + 0.7);
    if (k < 1) { px = 430 + 450 * eo(k); pose = 'air'; rot = 60 * k; lift = Math.sin(k * Math.PI) * 300; mood = 'scream'; }
    else shownPlumber = false;
  }
  if (shownPlumber) s += Ch.person(px, G, t, { ...plum, pose, mood, squash: sq, lift, rot, eyesOpen: 1, talk: false, acc: t < 0.75 ? plum.acc : { cap: '#ec3013' } });
  else { // legs out of the bath + splash
    const k = Math.sin(t * 13) * 12;
    s += `<g transform="translate(900 ${G - 240})"><path d="M-30 0 L${f(-60 + k)} -150" stroke="#2f6fd5" stroke-width="34" stroke-linecap="round"/><path d="M30 0 L${f(60 - k)} -150" stroke="#2f6fd5" stroke-width="34" stroke-linecap="round"/><ellipse cx="${f(-66 + k)}" cy="-166" rx="32" ry="17" fill="${C.ink}"/><ellipse cx="${f(66 - k)}" cy="-166" rx="32" ry="17" fill="${C.ink}"/></g>`;
    s += W.splash(900, G - 260, t - SLIP - 0.7);
    s += `<rect x="700" y="${G - 250}" width="400" height="60" rx="30" fill="#fff" stroke="#c9d3dc" stroke-width="8"/>`;
  }
  // toolbox dropped on the floor after the splat
  if (t >= 0.75) s += `<g transform="translate(560 ${G - 4}) rotate(${f(-10 * eo(seg(t, 0.75, 1.1)))})"><rect x="-60" y="-80" width="120" height="80" rx="10" fill="#c9583b"/><rect x="-30" y="-100" width="60" height="22" rx="8" fill="none" stroke="#8f3e28" stroke-width="8"/></g>`;
  // invoice 1 lands on him
  if (d1 && t < 2.3) {
    const k = t < 1.8 ? 0 : seg(t, 1.8, 2.3);
    s += invoice(430 + 400 * eo(k), G - d1.lift - 1000 * k * k, 520, 360, '£££', 'PAY UPFRONT', -4 + 50 * k);
  }
  if (d1 && d1.landed >= 0 && d1.landed < 0.9) s += Ch.impact(430, 1000, d1.landed / 0.9, 'SPLAT!', { r: 130 });
  // invoice 2: he jumps over it
  const d2 = S.drop(t, 2.95, 0.3, 1700);
  if (d2 && t < 4.6) { const k = seg(t, 3.9, 4.6); s += invoice(430 - 900 * k * k, G - d2.lift, 440, 300, '£££', 'EXTRA CHANGES', 4 - 30 * k); }
  // the mate
  let mpose = 'idle', mmood = 'smile', mx = S.tw(t, 0, 0.9, 40, 120);
  if (t < 0.9) mpose = 'walk';
  else if (t < 1.8) { mpose = 'idle'; mmood = 'shock'; }
  else if (t < 2.7) { mpose = 'reach'; mmood = 'grit'; mx = 190; }
  else if (t < 3.6) { mpose = 'point'; mmood = 'shock'; mx = 110; }
  else if (t < SLIP + 0.7) { mpose = 'facepalm'; mmood = 'sad'; mx = 110; }
  else { mpose = 'shrug'; mmood = 'flat'; mx = 110; }
  s += Ch.person(mx, G, t, { ...mate, pose: mpose, mood: mmood, eyesOpen: 1, handOverHead: mpose === 'facepalm', talk: t > 2.95 && t < 3.6 });
  if (t > 2.95 && t < 3.6) s += Ch.bubble(320, 920, 'Another one!', seg(t, 2.95, 3.15), { tail: -80, size: 44 });
  if (t > 3.7 && t < SLIP) s += Ch.impact(330, 780, seg(t, 3.65, 4.4), 'PSSHH!', { r: 100 });
  if (t > SLIP + 0.6) s += Ch.impact(900, 1060, seg(t, SLIP + 0.65, SLIP + 1.5), 'SPLOSH!', { r: 120 });
  if (t < 1.8) s += S.head(t, -2, 'Expectation: | a *big* *bill* *upfront.*', { col: C.ink, acc: C.red });
  else s += S.head(t, 1.8, 'And it gets | *worse.*', { col: C.ink, acc: C.red });
  return s;
}
function after(t) {
  let s = bathroom(t);
  // panel: your website first
  const pk = eb(seg(t, FIX + 0.2, FIX + 0.55));
  let inner = W.T('Your website first', 140, 625, 52, C.ink, { a: 'start', ls: -2 });
  inner += W.ticks(t, 140, 700, ['Built on a preview link', '2 rounds of changes', 'Pay only when you’re happy'], 7.9, 0.55, { size: 42, gap: 76 });
  s += W.panel(90, 480, 900, 460, 'preview link', inner, pk, { head: C.ink });
  // plumber pops out of the bath, dripping, then celebrates with his mate
  const k = seg(t, FIX + 0.2, FIX + 0.7);
  const px = 900 - 330 * eo(k), lift = Math.sin(k * Math.PI) * 260;
  const pose = k < 1 ? 'air' : t < 9.6 ? 'thumbs' : 'celebrate';
  s += Ch.person(px, G, t, { ...plum, acc: { cap: '#ec3013' }, pose, mood: t < 8.0 ? 'shock' : 'grin', eyesOpen: 1, lift, dir: -1 });
  if (t < 9.0) for (let i = 0; i < 3; i++) { const p = (t * 1.5 + i / 3) % 1; s += `<path d="M${f(px - 40 + i * 40)} ${f(G - 400 + p * 260)} q8 14 0 20 q-8 -6 0 -20 Z" fill="#7cc4ff" opacity="${f(1 - p)}"/>`; }
  s += Ch.person(200, G, t, { ...mate, pose: t < 9.6 ? 'point' : 'dance', mood: 'grin', eyesOpen: 1, ph: .6 });
  if (t > 9.6) s += confetti(540, 900, 9.6, t, 40);
  if (t < 10.6) s += S.head(t, FIX + 0.15, '*Reality:*', { col: C.ink, acc: C.red, size: 110 });
  else s += S.tag(t, 10.6, 'Your website first.', 'You pay only when you’re happy.', { y: 320, w: 920, s1: 62, s2: 44 });
  if (t >= 11.2) s += W.pop(540, 446, eb(seg(t, 11.2, 11.5)), `<rect x="230" y="419" width="620" height="54" rx="27" fill="${C.ink}"/>` + W.T('First 5 clients · websites from £655', 540, 457, 32, '#fff'));
  return s;
}
module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < FIX ? before(t) : after(t);
    s += S.wipe(t, FIX, C.peach, 0.45);
    s += S.endOnly(t, END, 'red');
    return s;
  },
};
