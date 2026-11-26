// WEEK-04 02 · Not in the AI answer → GEO (curry house). Hook formula #5 "Split-screen reaction": top = customer asking AI, bottom = the owner reacting.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.4, FIX = 7.1, FALL = 5.2;
const MID = 960, G2 = 1600, POT = 880;
const cust = { female: true, hair: 'pony', hairCol: HAIR.blond, skin: SKIN[0], top: '#2f9e8f', bottom: '#283a5a', acc: { phone: '#9fd3ff' }, blinkPh: .9 };
const chef = { hair: 'short', hairCol: HAIR.black, skin: SKIN[3], top: '#ffffff', bottom: '#2f3a4a', acc: { chef: 1, beard: 1, apron: '#ec3013' }, blinkPh: .2 };

function top(t, after) {
  let s = `<rect width="1080" height="${MID}" fill="#e7e1f5"/>`;
  for (let y = 520; y < MID; y += 100) for (let x = 40; x < 1080; x += 100) s += `<circle cx="${x + ((y / 100) % 2) * 50}" cy="${y}" r="6" fill="#d6cdee"/>`;
  s += `<rect x="-20" y="800" width="380" height="200" rx="40" fill="#ff8360"/><rect x="-20" y="740" width="380" height="90" rx="40" fill="#e9704e"/>`; // sofa
  // customer on the sofa (clipped to the top half)
  let cx = 175, pose = 'phoneIdle', mood = 'flat';
  if (!after) { if (t > 4.3) { cx = 175 - 600 * eo(seg(t, 4.6, 5.3)); pose = t > 4.6 ? 'walk' : 'phoneIdle'; mood = 'grin'; } }
  else { cx = S.tw(t, 8.6, 9.0, -250, 175); pose = t < 9.0 ? 'walk' : 'phoneIdle'; mood = t > 9.0 ? 'grin' : 'smile'; if (t > 9.9) { cx = 175 + 700 * eo(seg(t, 9.9, 10.5)); pose = 'run'; } }
  s += `<clipPath id="tc"><rect width="1080" height="${MID}"/></clipPath><g clip-path="url(#tc)">${Ch.person(cx, 1190, t, { ...cust, pose, mood, dir: pose === 'walk' && !after ? -1 : 1, shadow: false, talk: (t > 4.3 && t < 4.9) || (t > 9.1 && t < 9.7) })}</g>`;
  if (!after && t > 4.3 && t < 5.1) s += Ch.bubble(230, 600, 'Ooh, Spice House!', seg(t, 4.3, 4.5), { tail: -40, size: 40 });
  if (after && t > 9.1 && t < 9.9) s += Ch.bubble(230, 600, 'Ooh, that one!', seg(t, 9.1, 9.3), { tail: -40, size: 42 });
  // AI chat panel
  let inner = W.msgs(t, 430, 580, 580, [{ at: -1, text: 'Best curry near Rusholme?', out: 1 }], { outCol: '#6c4ad8' });
  const list = after ? [['Spice House', 99], ['Lahori Grill', 99], ['Your Curry House', 8.75]] : [['Spice House', 1.0], ['Lahori Grill', 1.8], ['Curry Hut', 2.6], ['Mumbai Nights', 3.4]];
  if (!after) { if (t < 1.0) inner += W.T('...', 470, 730, 60, '#9a948f', { a: 'start' }); }
  else if (t < 8.6) inner += W.ticks(t, 460, 700, ['Menu', 'Opening hours', 'Address + area'], 7.5, 0.3, { size: 36, gap: 66 });
  if (!after || t >= 8.6) list.forEach(([n, at], i) => {
    if (t < at && at < 90) return;
    const y = 715 + i * 52, hi = n === 'Your Curry House';
    const k = at < 90 ? eb(seg(t, at, at + 0.3)) : 1;
    if (hi) s += '';
    inner += W.pop(600, y - 12, k, (hi ? `<rect x="440" y="${y - 42}" width="560" height="56" rx="16" fill="#fff3c4" stroke="${C.gold}" stroke-width="4"/>` : '') + W.T(`${i + 1}. ${n}`, 460, y, 38, hi ? C.red : C.ink, { a: 'start', w: 800 }));
  });
  s += W.panel(410, 470, 630, 470, 'AI assistant', inner, 1, { head: '#3b2f6b', dot: '#5ef0d0' });
  s += W.T('YOUR CUSTOMER', 40, 520, 30, '#6c5fa0', { a: 'start', mono: 1, ls: 2 });
  return s;
}
function chefLegs(t, x, y) { // legs sticking out of the pot, kicking
  const k = Math.sin(t * 14) * 14;
  return `<g transform="translate(${x} ${y})"><path d="M-30 0 L${f(-50 + k)} -150" stroke="#2f3a4a" stroke-width="36" stroke-linecap="round"/><path d="M30 0 L${f(50 - k)} -150" stroke="#2f3a4a" stroke-width="36" stroke-linecap="round"/><ellipse cx="${f(-54 + k)}" cy="-166" rx="34" ry="18" fill="${C.ink}"/><ellipse cx="${f(54 - k)}" cy="-166" rx="34" ry="18" fill="${C.ink}"/></g>`;
}
function pot(t, front) {
  const x = POT, y = G2;
  if (!front) return `<rect x="${x - 170}" y="${y - 30}" width="340" height="30" fill="#6e7886"/>` + `<ellipse cx="${x}" cy="${y - 250}" rx="160" ry="34" fill="#c9701d"/>` + [0, 1, 2].map(i => { const p = (t * .6 + i / 3) % 1; return `<path d="M${x - 60 + i * 60} ${f(y - 290 - p * 120)} q20 -30 0 -60" stroke="#fff" stroke-width="8" fill="none" opacity="${f(.6 * Math.sin(p * Math.PI))}" stroke-linecap="round"/>`; }).join('');
  return `<path d="M${x - 165} ${y - 250} H${x + 165} L${x + 140} ${y - 30} H${x - 140} Z" fill="#8a93a6"/><path d="M${x - 165} ${y - 250} H${x + 165}" stroke="#6e7886" stroke-width="14" stroke-linecap="round"/><rect x="${x - 200}" y="${y - 220}" width="40" height="20" rx="8" fill="#6e7886"/><rect x="${x + 160}" y="${y - 220}" width="40" height="20" rx="8" fill="#6e7886"/>`;
}
function bottom(t, after) {
  let s = `<rect y="${MID}" width="1080" height="${1920 - MID}" fill="#ffd9a8"/>`;
  for (let x = 0; x < 1080; x += 120) s += `<path d="M${x} ${MID} v${G2 - MID}" stroke="#f6c98f" stroke-width="40"/>`;
  s += `<rect y="${G2}" width="1080" height="${1920 - G2}" fill="#a0522d"/>`;
  s += W.T('YOU', 40, MID + 64, 30, '#b0743a', { a: 'start', mono: 1, ls: 2 });
  // table
  s += `<rect x="250" y="${G2 - 95}" width="300" height="26" rx="10" fill="#7a4b2f"/><rect x="270" y="${G2 - 75}" width="22" height="75" fill="#7a4b2f"/><rect x="508" y="${G2 - 75}" width="22" height="75" fill="#7a4b2f"/>`;
  s += pot(t, false);
  if (!after) {
    if (t < FALL) {
      const onTable = t > 2.6, lift = onTable ? 95 * eo(seg(t, 2.6, 2.9)) : 0;
      const pose = t < 1.0 ? 'wave2' : t < 1.8 ? 'idle' : t < 2.6 ? 'point' : t < 2.9 ? 'air' : 'wave2';
      const mood = t < 1.0 ? 'grin' : t < 1.8 ? 'shock' : t < 2.6 ? 'talk' : 'scream';
      s += Ch.person(400, G2 - lift, t, { ...chef, s: 0.9, pose, mood, talk: t > 1.8 && t < 2.6, eyesOpen: 1, sweat: t > 1.8, shadow: !onTable, lift: 0 });
    } else if (t < FALL + 0.45) {
      const k = seg(t, FALL, FALL + 0.45);
      s += Ch.person(400 + (POT - 400) * k, G2 - 95 + 30 * k - Math.sin(k * Math.PI) * 220, t, { ...chef, s: 0.9, pose: 'air', rot: 160 * k, mood: 'scream', shadow: false });
    } else s += chefLegs(t, POT, G2 - 210);
    if (t >= FALL + 0.4) s += W.splash(POT, G2 - 260, t - FALL - 0.4, '#e08a2e');
    if (t > 6.0) s += Ch.pigeon(POT + 120, G2 - 256, t, { dir: -1, s: .7, pose: 'stand' });
  } else {
    // pops out of the pot with curry on his face, then dances
    const k = seg(t, FIX + 0.3, FIX + 0.7);
    if (t < FIX + 0.3) s += chefLegs(t, POT, G2 - 210);
    else {
      const x = POT - (POT - 600) * eo(seg(t, FIX + 0.7, FIX + 1.1));
      const y = t < FIX + 0.7 ? G2 - 210 - 200 * Math.sin(k * Math.PI) : G2;
      const pose = t < FIX + 1.1 ? 'air' : t < 10.2 ? 'wave' : 'dance';
      s += Ch.person(x, y, t, { ...chef, s: 0.9, pose, mood: t < 8.8 ? 'shock' : 'grin', eyesOpen: 1, dir: -1, shadow: t > FIX + 1.1 });
      if (t > FIX + 0.7 && t < 8.8) s += Ch.bubble(860, 1060, 'Wait... me?', seg(t, 8.0, 8.2), { tail: 40, size: 44 });
    }
    // the customer walks in
    if (t > 10.3) { const x = S.tw(t, 10.3, 10.8, -200, 220); s += Ch.person(x, G2, t, { ...cust, pose: t < 10.8 ? 'walk' : 'dance', mood: 'grin', eyesOpen: 1, acc: {} }); }
    if (t > 10.2) s += confetti(540, 1200, 10.2, t, 40);
  }
  s += pot(t, true);
  if (!after) {
    if (t > 1.8 && t < 2.6) s += Ch.bubble(680, 1060, 'Pick us!!', seg(t, 1.8, 2.0), { tail: -60, size: 50 });
    if (t > 2.9 && t < FALL) s += Ch.bubble(700, 1040, 'US!! US!!', seg(t, 2.9, 3.1), { tail: -100, size: 54, fill: C.red, col: '#fff' });
    if (t > FALL + 0.3) s += Ch.impact(POT - 220, 1150, seg(t, FALL + 0.35, FALL + 1.2), 'SPLOSH!', { r: 120 });
  }
  return s;
}
module.exports = {
  dur: DUR,
  frame(t) {
    const after = t >= FIX;
    let s = `<clipPath id="bc"><rect y="${MID}" width="1080" height="${1920 - MID}"/></clipPath><g clip-path="url(#bc)">${bottom(t, after)}</g>` + top(t, after);
    s += `<rect y="${MID - 6}" width="1080" height="12" fill="${C.ink}"/>`;
    if (!after) {
      if (t < FALL) s += S.head(t, -2, 'Is your restaurant | in the *AI* *answer?*', { col: C.ink, acc: C.red });
      else s += S.head(t, FALL, '*Nope.*', { col: C.ink, acc: C.red, size: 110 });
    } else if (t < 10.6) s += S.head(t, FIX + 0.15, 'Make it easy | for *AI* *to* *read.*', { col: C.ink, acc: C.red });
    if (t >= 10.6) s += S.tag(t, 10.6, 'GEO from £215/month', '', { y: 345, w: 860, s1: 66 });
    s += S.wipe(t, FIX, '#6c4ad8', 0.45);
    s += S.endOnly(t, END, 'dark');
    return s;
  },
};
