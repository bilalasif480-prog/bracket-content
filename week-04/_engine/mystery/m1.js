// MYSTERY 1 · "She lost the biggest order of her life… because of one button."
// Clues: groom taps Send at midnight → message vanishes → bride books someone else. Twist: website form broken. Fix: Websites from £655.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const M = require('./mk');
const { SKIN, HAIR, INK } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 17.4, END = 15.7;
const C1 = 3.5, C2 = 6.9, TWIST = 9.6, FIX = 12.6;
const G = 1480;

const florist = { female: true, hair: 'long', hairCol: HAIR.brown, skin: SKIN[1], top: '#3f9a5c', bottom: '#2f3a4a', acc: { apron: '#f3e6c8', earrings: 1 }, blinkPh: .4 };
const groom = { hair: 'short', hairCol: HAIR.black, skin: SKIN[3], top: '#7d6bb0', bottom: '#7d6bb0', longSleeves: 1, acc: { nightcap: C.peach, phone: '#bfe3f2' }, blinkPh: 1.1 };
const groomDay = { hair: 'short', hairCol: HAIR.black, skin: SKIN[3], top: '#2f3a4a', bottom: '#2f3a4a', collar: 1, acc: { tie: C.red }, blinkPh: 1.1 };
const bride = { female: true, hair: 'bun', hairCol: HAIR.blond, skin: SKIN[0], top: '#ffffff', bottom: '#ffffff', skirt: 1, legs: SKIN[0], acc: { earrings: 1 }, blinkPh: .7 };

// ---------- props ----------
function bouquet(x, y, s = 1) {
  let g = `<path d="M-14 0 L0 70 L14 0 Z" fill="#3f9a5c"/>`;
  [[-28, -10, C.red], [0, -26, '#f2a3c4'], [28, -10, C.peach], [-14, -40, '#fff'], [16, -42, C.gold]].forEach(([a, b, c]) => g += `<circle cx="${a}" cy="${b}" r="22" fill="${c}" stroke="${INK}" stroke-width="4"/><circle cx="${a}" cy="${b}" r="7" fill="${INK}" opacity=".25"/>`);
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})">${g}</g>`;
}
function bigButton(x, y, t, press = 0, label = 'SEND') {
  const glow = 0.5 + 0.5 * Math.sin(t * 8);
  let g = `<ellipse cx="0" cy="40" rx="190" ry="56" fill="#000" opacity=".18"/><rect x="-190" y="-10" width="380" height="60" rx="30" fill="#7a2a1a"/>`;
  g += `<circle cx="0" cy="-100" r="${f(205 + 12 * glow)}" fill="${C.red}" opacity="${f(.15 + .1 * glow)}"/>`;
  g += `<rect x="-170" y="${f(-120 + press * 40)}" width="340" height="${f(150 - press * 40)}" rx="70" fill="${C.red}" stroke="${INK}" stroke-width="9"/>`;
  g += W.T(label, 0, f(-28 + press * 40), 82, '#fff', { ls: 0 });
  return `<g transform="translate(${f(x)} ${f(y)})">${g}</g>`;
}
function shopInside(t) {
  let s = W.room(t, { wall: '#fde3ea', floor: '#c9a27e', pattern: 'stripes', pcol: 'rgba(224,90,154,.07)', fy: G - 40, boards: 1 });
  s += W.sign(540, 640, 470, 92, 'PETAL &amp; STEM', { bg: INK, size: 44, ls: 2 });
  // shelves with flowers
  for (let i = 0; i < 4; i++) s += `<rect x="${60 + i * 250}" y="${780}" width="200" height="16" rx="6" fill="#8f5c3b"/>` + `<rect x="${95 + i * 250}" y="720" width="60" height="60" rx="10" fill="${['#9aa3ad', '#c9583b', '#9aa3ad', '#c9583b'][i]}"/>` + bouquet(125 + i * 250, 712, .8);
  return s;
}
function counterFront() {
  return `<rect x="560" y="1250" width="520" height="210" fill="#8f5c3b"/><rect x="546" y="1228" width="560" height="30" rx="10" fill="#6e4329"/>`;
}
// florist mini website with an enquiry form (inside a phone)
function formScreen(t, x, y, w, o = {}) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="900" fill="#fff7f9"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="90" fill="${INK}"/>` + W.T('Petal &amp; Stem', x + 28, y + 58, 36, '#fff', { a: 'start' });
  if (o.clock) s += W.T(o.clock, x + w - 28, y + 56, 26, C.peach, { a: 'end', mono: 1, w: 700, ls: 0 });
  s += W.T('Wedding enquiry', x + 28, y + 166, 50, INK, { a: 'start', ls: -2 });
  const field = (yy, lab, val) => `<rect x="${x + 28}" y="${yy}" width="${w - 56}" height="80" rx="18" fill="#fff" stroke="#e2ddd8" stroke-width="4"/>` + W.T(lab, x + 50, yy + 30, 22, '#8a847f', { a: 'start', mono: 1, w: 700, ls: 0 }) + W.T(val, x + 50, yy + 66, 32, INK, { a: 'start', w: 800, ls: 0 });
  s += field(y + 200, 'GUESTS', '200') + field(y + 296, 'DATE', 'Saturday 14 June') + field(y + 392, 'FLOWERS', 'Everything!');
  const press = o.press || 0;
  s += `<g transform="translate(${x + w / 2} ${y + 560}) scale(${f(1 - .08 * press)}) translate(${-(x + w / 2)} ${-(y + 560)})">` + W.btn(x + 40, y + 515, w - 80, 92, 'Send', o.btnCol || C.red, 44) + `</g>`;
  if (o.crack) {
    const k = o.crack;
    s += `<path d="M${x + w / 2 - 20} ${y + 515} l30 30 l-40 20 l50 24 l-20 18" stroke="${INK}" stroke-width="7" fill="none" stroke-linejoin="round" stroke-dasharray="200" stroke-dashoffset="${f(200 * (1 - k))}"/>`;
  }
  if (o.status) s += o.status;
  return s;
}

// ---------- 0–3.5: HOOK (shop, giant button drops) ----------
function hook(t) {
  let s = shopInside(t);
  // petals drifting
  for (let i = 0; i < 9; i++) { const p = (t * .35 + i / 9) % 1; s += `<ellipse cx="${f(80 + i * 115 + Math.sin(t * 2 + i) * 30)}" cy="${f(560 + p * 950)}" rx="14" ry="8" fill="${['#f2a3c4', C.peach, C.red][i % 3]}" transform="rotate(${f(t * 90 + i * 40)} ${f(80 + i * 115)} ${f(560 + p * 950)})"/>`; }
  // florist: shocked, then reaching
  let o;
  if (t < 0.45) o = { pose: 'wave2', mood: 'shock', look: [1, -1] };
  else if (t < 1.4) o = { pose: 'panic', mood: 'shock', hairUp: seg(t, .45, .8) };
  else if (t < 2.4) o = { pose: 'point', mood: 'grumpy', look: [1, 0] };
  else o = { pose: 'facepalm', mood: 'sad' };
  s += Ch.person(230, G, t, { ...florist, ...o });
  if (t < 1.4) s += bouquet(t < 0.45 ? 370 + Math.sin(t * 30) * 6 : 370 + (t - .45) * 300, t < 0.45 ? 1190 : 1190 - 900 * (t - .45) + 1200 * (t - .45) ** 2, 1.1);
  // giant SEND button drops onto the counter
  const d = S.drop(t, 0, 0.45, 1300);
  s += counterFront();
  if (t < 0.45) s += `<ellipse cx="760" cy="1236" rx="${f(60 + 300 * t)}" ry="${f(14 + 50 * t)}" fill="#000" opacity="${f(.15 + .4 * t)}"/>` + W.T('!', 760, 1150, 120, C.red, { op: 0.6 + 0.4 * Math.sin(t * 40) });
  if (d) {
    s += `<g transform="translate(760 1228) scale(${f(2 - (d.squash || 1))} ${f(d.squash || 1)}) translate(-760 -1228)">` + bigButton(760, 1228 - d.lift, t, 0, 'SEND') + `</g>`;
    s += Ch.dust(760, 1240, t - 0.45, { col: '#e0c6aa', spread: 220 });
  }
  s += Ch.impact(760, 960, seg(t, .45, 1.15), 'THUD!', { r: 110 });
  s += M.qmarks(760, 1000, t, 1.4, 3);
  if (t > 2.4) s += Ch.bubble(330, 830, 'One button?!', seg(t, 2.4, 2.6), { tail: -50, size: 50 });
  s += S.head(t, -2, 'She lost the biggest | order of her life… | because of *one* *button.*', { col: INK, acc: C.red, size: 84, y: 200 });
  return s;
}

// ---------- 3.5–6.9: CLUE 1 (midnight, groom taps Send) ----------
const TAPS = [4.0, 4.75, 5.45, 6.0];
function clue1(t) {
  let s = W.room(t, { wall: '#2b3150', floor: '#3d3552', pattern: 'dots', pcol: '#363d63', fy: G - 40 });
  s += W.windowNight(60, 560, 300, 250, t);
  // clock chip
  s += `<rect x="70" y="860" width="280" height="70" rx="35" fill="${C.peach}"/>` + W.T('11:59 PM', 210, 908, 38, INK, { mono: 1, w: 700, ls: 1 });
  let press = 0, n = 0;
  TAPS.forEach((a, i) => { if (t >= a) n = i + 1; press = Math.max(press, Math.sin(Math.PI * seg(t, a, a + .18))); });
  let status = '';
  const lastTap = TAPS.filter(a => t >= a).pop();
  if (lastTap && t < 6.25) {
    const lt = t - lastTap;
    if (lt < .45) status = W.spinner(452 + 278, 564 + 700, 34, t);
    else status = W.T('…nothing?', 452 + 278, 564 + 714, 40, '#8a847f', { w: 800, ls: 0 });
  }
  s += W.phone(430, 480, 600, 960, formScreen(t, 452, 544, 556, { clock: '11:59 PM', press, status }), { k: eb(seg(t, C1, C1 + .3)) });
  TAPS.forEach(a => s += M.ripple(730, 1104, t, a));
  if (n > 0 && t < 6.25) s += M.qmarks(730, 1110, t, TAPS[0] + .5, 1, C.peach) + Ch.notifBadge(960, 1040, 'x' + n, seg(t, lastTap, lastTap + .2));
  // envelope flies out and vanishes
  if (t > 6.2) {
    const k = seg(t, 6.2, 6.6);
    if (k < 1) s += W.paperPlane(730 + 200 * k, 1080 - 520 * eo(k), -40, 1.6);
    s += Ch.impact(950, 560, seg(t, 6.55, 6.9 + .4), 'POOF!', { r: 100, fill: '#fff', stroke: INK, col: INK });
  }
  const mood = n < 2 ? 'smile' : n < 4 ? 'grumpy' : 'angry';
  s += Ch.person(220, G, t, { ...groom, pose: t > 6.3 ? 'shrug' : 'tap', mood: t > 6.3 ? 'shock' : mood, look: [1, -1], sweat: n >= 3 });
  s += S.head(t, C1 + .05, 'Midnight. The groom | taps *Send.* *Again.*', { col: '#fff', acc: C.peach, size: 84, y: 200 });
  return s;
}

// ---------- 6.9–9.6: CLUE 2 (morning, bride books the rival) ----------
function clue2(t) {
  let s = `<rect width="1080" height="1920" fill="#bfe3f2"/>` + W.cloud(820, 560, .8, '#fff') + W.cloud(180, 640, .6, '#fff');
  // two shopfronts
  const shopF = (x, w, name, col, door) => `<rect x="${x}" y="720" width="${w}" height="740" fill="${col}"/><rect x="${x - 10}" y="700" width="${w + 20}" height="40" rx="8" fill="${INK}"/>` + W.sign(x + w / 2, 800, w - 60, 80, name, { bg: INK, size: 34, ls: 1 }) + `<rect x="${x + 40}" y="880" width="${w - 80}" height="260" rx="10" fill="#e8f6fb" stroke="${INK}" stroke-width="6"/><rect x="${x + door}" y="1180" width="160" height="280" rx="8" fill="#7a4b2f"/>`;
  s += shopF(20, 500, 'PETAL &amp; STEM', '#f2a3c4', 40) + shopF(560, 500, 'OTHER FLORIST', '#9fd3b0', 300);
  s += bouquet(170, 1080, .9) + bouquet(300, 1080, .9) + bouquet(710, 1080, .9) + bouquet(860, 1080, .9);
  s += `<rect y="${G - 20}" width="1080" height="460" fill="#9aa3ad"/><rect y="${G - 20}" width="1080" height="14" fill="#7d8794"/>`;
  // rival BOOKED sign
  if (t > 8.3) s += W.pop(810, 960, eb(seg(t, 8.3, 8.6)), `<g transform="rotate(-6 810 960)"><rect x="640" y="900" width="340" height="110" rx="18" fill="${C.green}" stroke="${INK}" stroke-width="6"/>` + W.T('BOOKED ✓', 810, 975, 56, '#fff') + `</g>`);
  // florist waiting by her door, checking her phone
  const fo = t < 8.4 ? { pose: 'phoneIdle', mood: 'smile', acc: { ...florist.acc, phone: '#bfe3f2' } } : { pose: 'panic', mood: 'shock', hairUp: seg(t, 8.4, 8.7), acc: florist.acc };
  s += Ch.person(150, G + 20, t, { ...florist, ...fo, look: [1, 0], sweat: t > 8.6 });
  if (t < 8.4) s += W.pop(300, 900, eb(seg(t, 7.2, 7.4)), `<rect x="210" y="870" width="180" height="62" rx="31" fill="#fff" stroke="${INK}" stroke-width="5"/>` + W.T('0 new', 300, 912, 32, '#8a847f', { w: 800, ls: 0 }));
  // bride + groom walk past her into the rival
  const bx = S.tw(t, C2, 8.3, -200, 760, k => k);
  const walking = t < 8.3;
  s += Ch.person(bx - 170, G + 30, t, { ...groomDay, pose: walking ? 'walk' : 'thumbs', mood: 'happy', ph: .2 });
  s += Ch.person(bx, G + 30, t, { ...bride, pose: walking ? 'walk' : 'celebrate', mood: 'grin' });
  s += bouquet(bx + 90, G + 30 - 400 - (walking ? 0 : 140), .9);
  if (t > 8.7) s += Ch.bubble(330, 640, '?!', seg(t, 8.7, 8.9), { tail: -60, size: 80 });
  s += S.head(t, C2 + .05, 'Next morning… | the bride booked | *someone* *else.*', { col: INK, acc: C.red, size: 84, y: 200 });
  return s;
}

// ---------- 9.6–12.6: TWIST (the form was broken) ----------
function twist(t) {
  let s = `<rect width="1080" height="1920" fill="${INK}"/>`;
  // spotlight
  const tap = 10.35;
  const press = Math.sin(Math.PI * seg(t, tap, tap + .18));
  const crack = seg(t, 10.6, 10.9);
  let status = '';
  if (t > 10.95) status = W.pop(730, 1290, eb(seg(t, 10.95, 11.2)), `<rect x="480" y="1250" width="500" height="80" rx="20" fill="#fde2dc" stroke="${C.red}" stroke-width="4"/>` + W.T('Sent to: nowhere', 730, 1302, 36, C.red, { w: 900, ls: 0 }));
  s += W.phone(430, 480, 600, 960, formScreen(t, 452, 544, 556, { press, crack, btnCol: t > 10.6 ? '#b5afa9' : C.red, status }), { k: eb(seg(t, TWIST + .05, TWIST + .35)) });
  s += M.ripple(730, 1104, t, tap);
  s += M.stamp(730, 900, t, 11.45, 'FORM BROKEN', { w: 560, size: 72 });
  s += Ch.person(200, G, t, { ...florist, pose: t < 11.45 ? 'idle' : 'facepalm', mood: t < 11.45 ? 'shock' : 'sad', look: [1, -1] });
  s += S.head(t, TWIST + .1, 'The twist: her website | form was *broken.*', { col: '#fff', acc: C.peach, size: 84, y: 200 });
  return s;
}

// ---------- 12.6–15.7: FIX ----------
function fix(t) {
  let s = shopInside(t);
  const tap = 13.25;
  const press = Math.sin(Math.PI * seg(t, tap, tap + .18));
  let status = '';
  if (t > 13.5) status = W.pop(730, 1290, eb(seg(t, 13.5, 13.75)), `<rect x="480" y="1250" width="500" height="80" rx="40" fill="${C.green}"/>` + W.T('Enquiry received ✓', 730, 1302, 36, '#fff', { w: 900, ls: 0 }));
  s += W.phone(430, 480, 600, 960, formScreen(t, 452, 544, 556, { press, status }), { k: eb(seg(t, FIX + .05, FIX + .35)) });
  s += M.ripple(730, 1104, t, tap);
  // tested-on chips
  if (t > 13.9) s += W.pop(560, 1385, eb(seg(t, 13.9, 14.1)), `<rect x="470" y="1355" width="190" height="60" rx="30" fill="#fff" stroke="${INK}" stroke-width="5"/>` + W.T('iPhone ✓', 565, 1396, 30, C.green, { w: 900, ls: 0 }));
  if (t > 14.1) s += W.pop(800, 1385, eb(seg(t, 14.1, 14.3)), `<rect x="690" y="1355" width="220" height="60" rx="30" fill="#fff" stroke="${INK}" stroke-width="5"/>` + W.T('Android ✓', 800, 1396, 30, C.green, { w: 900, ls: 0 }));
  const happy = t > 13.6;
  s += Ch.person(220, G, t, { ...florist, pose: happy ? 'celebrate' : 'point', mood: happy ? 'happy' : 'smile', look: [1, -1] });
  if (happy) s += confetti(300, 820, 13.65, t, 30);
  s += S.tag(t, 14.4, 'Websites from £655', '', { y: 1500, w: 760 });
  s += S.head(t, FIX + .1, 'Every form tested | on *real* *phones.*', { col: INK, acc: C.red, size: 84, y: 200 });
  return s;
}

module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < C1 ? hook(t) : t < C2 ? clue1(t) : t < TWIST ? clue2(t) : t < FIX ? twist(t) : fix(t);
    s += S.wipe(t, C1, INK, 0.4) + S.wipe(t, C2, C.peach, 0.4) + S.wipe(t, TWIST, INK, 0.45) + S.wipe(t, FIX, C.red, 0.45);
    s += S.endOnly(t, END, 'dark');
    return s;
  },
};
