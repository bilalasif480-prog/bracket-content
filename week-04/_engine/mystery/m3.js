// MYSTERY 3 · "Nobody in this town has ever found this café."
// Clues: people walk past in circles, a tourist spins with a map, a detective investigates. Twist: not on Google Maps. Fix: Local SEO from £325/month.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const M = require('./mk');
const { SKIN, HAIR, INK } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 17.1, END = 15.4;
const LOOP = 2.9, DET = 6.0, TWIST = 9.4, FIX = 12.4;
const G = 1500;

const barista = { female: true, hair: 'pony', hairCol: HAIR.ginger, skin: SKIN[0], top: '#2f9e8f', bottom: '#2f3a4a', acc: { apron: '#6e4329' }, blinkPh: .3 };
const walkerA = { female: true, hair: 'long', hairCol: HAIR.dark, skin: SKIN[3], top: '#e05a9a', bottom: '#5a3a5a', skirt: 1, legs: SKIN[3], blinkPh: 1.2 };
const walkerB = { hair: 'buzz', hairCol: HAIR.black, skin: SKIN[4], top: C.gold, bottom: '#2f3a4a', acc: { phone: '#bfe3f2', headphones: C.red }, blinkPh: 2.1 };
const tourist = { hair: 'bald', hairCol: HAIR.grey, skin: SKIN[0], top: '#f28c38', bottom: '#d9c08a', shorts: 1, legs: SKIN[0], acc: { backpack: '#3f9a5c', glasses: 1 }, blinkPh: .9 };
const detective = { hair: 'short', hairCol: HAIR.brown, skin: SKIN[1], top: '#c8a97a', bottom: '#6e5a40', longSleeves: 1, collar: 1, acc: { cap: '#7a5a3a' }, blinkPh: 1.6 };

function street(t, o = {}) {
  let s = `<rect width="1080" height="1920" fill="${o.sky || '#bfe3f2'}"/>` + W.cloud(840, 520, .7, '#fff') + W.cloud(200, 600, .5, '#fff');
  // tall building left
  s += `<rect x="0" y="560" width="330" height="${G - 560}" fill="#9aa3ad"/>`;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 3; c++) s += `<rect x="${26 + c * 102}" y="${610 + r * 110}" width="72" height="70" rx="6" fill="#d7e6ef"/>`;
  // tall building right
  s += `<rect x="750" y="500" width="330" height="${G - 500}" fill="#c9583b"/>`;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 3; c++) s += `<rect x="${776 + c * 102}" y="${550 + r * 112}" width="72" height="72" rx="6" fill="#f3c7b8"/>`;
  // small café squeezed in the middle
  s += `<rect x="330" y="860" width="420" height="${G - 860}" fill="#fff3e3" stroke="${INK}" stroke-width="6"/>`;
  s += `<path d="M318 860 H762 L742 930 H338 Z" fill="${C.red}"/>`;
  for (let i = 0; i < 8; i++) s += `<path d="M${338 + i * 50.5} 930 q25 26 50.5 0" fill="${i % 2 ? C.red : '#fff'}"/>`;
  s += W.sign(540, 812, 440, 64, 'LITTLE CORNER CAFÉ', { bg: INK, size: 29, ls: 0 });
  s += `<rect x="460" y="1020" width="160" height="${G - 1020}" rx="8" fill="#7a4b2f"/>`;
  // windows with steaming cups either side of the door
  for (const wx of [350, 640]) {
    s += `<rect x="${wx}" y="1000" width="90" height="140" rx="8" fill="#bfe3f2" stroke="${INK}" stroke-width="4"/><path d="M${wx + 20} 1080 h50 v26 q0 16 -25 16 q-25 0 -25 -16 Z" fill="#fff" stroke="${INK}" stroke-width="4"/>`;
    for (let i = 0; i < 2; i++) s += `<path d="M${wx + 35 + i * 20} ${1070 - (t * 20 % 10)} q-8 -12 0 -24 q8 -12 0 -24" stroke="#fff" stroke-width="5" fill="none" opacity=".9"/>`;
  }
  // pavement
  s += `<rect y="${G}" width="1080" height="${1920 - G}" fill="#b8b2ab"/><rect y="${G}" width="1080" height="14" fill="#8a847f"/>`;
  return s;
}
// tourist holding an open map
function touristMap(x, t, dir, o = {}) {
  let s = Ch.person(x, G + 40, t, { ...tourist, dir, pose: 'shrug', mood: o.mood || 'shock', look: [0, 1], ...o });
  const mx = x + dir * 70, my = G + 40 - 300;
  s += `<g transform="translate(${f(mx)} ${f(my)}) rotate(${f(dir * 8)})"><rect x="-100" y="-70" width="200" height="140" fill="#f7ecc8" stroke="${INK}" stroke-width="5"/><path d="M-33 -70 V70 M33 -70 V70" stroke="#d8c8a0" stroke-width="4"/><path d="M-80 30 Q-20 -40 60 10" stroke="${C.red}" stroke-width="6" fill="none" stroke-dasharray="12 10"/><text x="60" y="-20" font-family="Archivo" font-weight="900" font-size="44" fill="${C.red}">?</text></g>`;
  return s;
}

// ---------- 0–2.9 HOOK ----------
function hook(t) {
  let s = street(t);
  s += Ch.person(540, G, t, { ...barista, pose: 'wave2', mood: 'smile', look: [-1, 0] });
  // man walks past fast staring at his phone (moving at frame 0)
  const x = S.tw(t, 0, 2.9, 250, 1250, k => k);
  s += Ch.person(x, G + 60, t, { ...walkerB, pose: 'phone', mood: 'tired' });
  // bobbing arrow
  const by = Math.sin(t * 7) * 14;
  if (t > 1.3) s += W.pop(540, 700, eb(seg(t, 1.3, 1.6)), `<path d="M540 ${f(780 + by)} l-48 -60 h30 v-70 h36 v70 h30 Z" fill="${C.red}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`);
  if (t > 2.1) s += Ch.bubble(800, 800, 'Hello?!', seg(t, 2.1, 2.3), { tail: -150, tailDx: -40, size: 54 });
  s += S.head(t, -2, 'Nobody in this town | has *ever* found | *this* *café.*', { col: INK, acc: C.red, size: 88, y: 170 });
  return s;
}

// ---------- 2.9–6.0 CIRCLES ----------
function loops(t) {
  let s = street(t);
  const lt = t - LOOP;
  s += Ch.person(540, G, t, { ...barista, pose: lt < 1.6 ? 'wave2' : 'facepalm', mood: lt < 1.6 ? 'shock' : 'sad', look: [1, 0] });
  // A walks right, wraps around; B walks left, wraps around (same people, again and again)
  const pA = (lt * 0.62) % 1, pB = (lt * 0.62 + 0.45) % 1;
  const xa = -150 + pA * 1380, xb = 1230 - pB * 1380;
  s += Ch.person(xa, G + 60, t, { ...walkerA, pose: 'walk', mood: 'tired', look: [1, -1] });
  if (xa > 0 && xa < 1000) s += Ch.bubble(xa + 40, G - 640, 'Coffee…?', 1, { tail: -20, size: 40 });
  s += Ch.person(xb, G + 80, t, { ...walkerB, dir: -1, pose: 'phone', mood: 'tired' });
  // lap counter
  const lap = 1 + Math.floor(lt * 0.62 + 0.0001) + 1;
  s += W.pop(900, 470, eb(seg(t, LOOP + .1, LOOP + .35)), `<rect x="770" y="430" width="260" height="76" rx="38" fill="${INK}"/>` + W.T('LAP ' + lap, 900, 482, 42, '#fff', { mono: 1, w: 700, ls: 1 }));
  s += S.head(t, LOOP + .05, 'People walk past | every day. *In* *circles.*', { col: INK, acc: C.red, size: 84, y: 170 });
  return s;
}

// ---------- 6.0–9.4 TOURIST + DETECTIVE ----------
function detect(t) {
  let s = street(t);
  const lt = t - DET;
  s += Ch.person(540, G, t, { ...barista, pose: lt < 1.6 ? 'wave2' : lt < 2.4 ? 'point' : 'facepalm', mood: lt < 2.4 ? 'grin' : 'sad', look: [1, 0] });
  // tourist spinning on the spot with a map
  const spin = Math.floor(lt * 5) % 2 ? -1 : 1;
  s += touristMap(175, t, lt < 2.6 ? spin : 1, { mood: lt < 2.6 ? 'dizzy' : 'shock' });
  // detective: walks in from the right, inspects, finds nothing, shrugs
  let dx, pose, dir = -1, mood = 'grumpy';
  if (lt < 1.0) { dx = S.tw(t, DET, DET + 1.0, 1220, 860, k => k); pose = 'walk'; }
  else if (lt < 2.3) { dx = 860 + Math.sin((lt - 1) * 3) * 30; pose = 'reach'; mood = 'grumpy'; }
  else { dx = 860; pose = 'shrug'; mood = 'sad'; }
  s += Ch.person(dx, G + 60, t, { ...detective, dir, pose, mood, look: [-1, 0] });
  if (pose === 'reach') s += M.magnifier(dx - 170, G + 60 - 470 + Math.sin(t * 4) * 12, 1.0, 90);
  if (lt > 2.4) s += Ch.bubble(820, 880, 'Nothing here.', seg(lt, 2.4, 2.6), { tail: 40, size: 48 });
  s += S.head(t, DET + .05, 'A tourist. A detective. | *Still* *nothing.*', { col: INK, acc: C.red, size: 80, y: 170 });
  return s;
}

// ---------- map screen (DEMO) ----------
function mapScreen(t, x, y, w, h, o = {}) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#eef1e6"/>`;
  // streets + park
  s += `<rect x="${x + 330}" y="${y + 560}" width="200" height="180" rx="20" fill="#bfe0b0"/>`;
  s += `<path d="M${x} ${y + 420} H${x + w} M${x + 190} ${y} V${y + h} M${x} ${y + 760} L${x + w} ${y + 640} M${x + 420} ${y} V${y + 520}" stroke="#fff" stroke-width="30"/>`;
  s += `<path d="M${x} ${y + 420} H${x + w} M${x + 190} ${y} V${y + h}" stroke="#ffe39a" stroke-width="12"/>`;
  // search bar
  s += `<rect x="${x + 24}" y="${y + 24}" width="${w - 48}" height="80" rx="40" fill="#fff" stroke="#d8d2cc" stroke-width="3"/><circle cx="${x + 70}" cy="${y + 62}" r="15" fill="none" stroke="${INK}" stroke-width="5"/><path d="M${x + 81} ${y + 73} l12 12" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  const q = 'café near me', n = Math.floor(clamp((t - (o.typeAt || 0)) / .5) * q.length);
  s += W.T(q.slice(0, n), x + 108, y + 75, 32, INK, { a: 'start', w: 800, ls: 0 });
  const pin = (px, py, k, col, label) => k <= 0 ? '' : W.pop(px, py, eb(k), `<path d="M${px} ${py} q-38 -48 -38 -76 a38 38 0 0 1 76 0 q0 28 -38 76 Z" fill="${col}" stroke="${INK}" stroke-width="5"/><circle cx="${px}" cy="${py - 78}" r="13" fill="#fff"/>` + (label ? `<rect x="${px - 92}" y="${py + 8}" width="184" height="48" rx="24" fill="#fff" stroke="${INK}" stroke-width="4"/>` + W.T(label, px, py + 42, 26, INK, { w: 900, ls: 0 }) : ''));
  (o.others || []).forEach(p => s += pin(p.x + x, p.y + y, seg(t, p.at, p.at + .3), '#8a93a6', p.label));
  if (o.mine) s += pin(x + o.mine.x, y + o.mine.y, seg(t, o.mine.at, o.mine.at + .35), C.red, o.mine.label);
  if (o.hole) { const k = seg(t, o.hole.at, o.hole.at + .3); if (k > 0) s += `<circle cx="${x + o.hole.x}" cy="${y + o.hole.y}" r="${f(70 * eb(k))}" fill="none" stroke="${C.red}" stroke-width="7" stroke-dasharray="16 12"/>` + W.T('?', x + o.hole.x, y + o.hole.y + 30, 84, C.red); }
  return s;
}

// ---------- 9.4–12.4 TWIST ----------
function twist(t) {
  let s = `<rect width="1080" height="1920" fill="${INK}"/>`;
  const others = [{ x: 110, y: 300, at: 10.25, label: 'Café A' }, { x: 460, y: 720, at: 10.45, label: 'Café B' }];
  s += W.phone(400, 470, 640, 1000, mapScreen(t, 422, 534, 596, 900, { typeAt: 9.75, others, hole: { x: 300, y: 560, at: 10.8 } }), { k: eb(seg(t, TWIST + .05, TWIST + .35)) });
  s += M.stamp(720, 1300, t, 11.35, 'NOT ON THE MAP', { w: 620, size: 62 });
  s += Ch.person(190, G - 20, t, { ...barista, pose: t > 11.35 ? 'facepalm' : 'idle', mood: t > 11.35 ? 'sad' : 'shock', look: [1, -1] });
  s += S.head(t, TWIST + .1, 'The twist? It isn’t | on *Google* *Maps.*', { col: '#fff', acc: C.peach, size: 84, y: 170 });
  return s;
}

// ---------- 12.4–15.4 FIX ----------
function fix(t) {
  let s = street(t, { sky: '#cdeaf7' });
  // giant pin drops onto the café roof
  const d = S.drop(t, FIX + .2, .45, 1100);
  if (d) {
    const py = 775 - d.lift;
    s += `<g transform="translate(540 775) scale(${f(2 - d.squash)} ${f(d.squash)}) translate(-540 -775)"><path d="M540 ${f(py)} q-90 -110 -90 -170 a90 90 0 0 1 180 0 q0 60 -90 170 Z" fill="${C.red}" stroke="${INK}" stroke-width="8"/><circle cx="540" cy="${f(py - 175)}" r="34" fill="#fff"/></g>`;
    s += Ch.impact(540, 700, seg(t, FIX + .65, FIX + 1.3), '', { r: 120 });
  }
  if (t > 13.3) s += W.pop(540, 490, eb(seg(t, 13.3, 13.55)), `<rect x="250" y="448" width="580" height="84" rx="42" fill="#fff" stroke="${INK}" stroke-width="6"/>` + W.T('Little Corner Café · Open now', 540, 505, 34, INK, { w: 900, ls: 0 }));
  s += Ch.person(540, G, t, { ...barista, pose: t > 13 ? 'celebrate' : 'idle', mood: t > 13 ? 'happy' : 'shock' });
  if (t > 13.1) s += confetti(540, 820, 13.1, t, 34);
  // the walkers, tourist and detective finally walk in
  const k = seg(t, FIX + .9, FIX + 2.6);
  s += Ch.person(-120 + 380 * eo(k), G + 60, t, { ...walkerA, pose: k < 1 ? 'walk' : 'celebrate', mood: 'happy' });
  s += Ch.person(1200 - 380 * eo(k), G + 70, t, { ...detective, dir: -1, pose: k < 1 ? 'walk' : 'thumbs', mood: 'happy' });
  s += S.tag(t, 14.0, 'Local SEO from £325/month', '', { y: 1500, w: 900, s1: 54 });
  s += S.head(t, FIX + .1, 'Google profile set up. | *On* *the* *map.*', { col: INK, acc: C.red, size: 84, y: 170 });
  return s;
}

module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < LOOP ? hook(t) : t < DET ? loops(t) : t < TWIST ? detect(t) : t < FIX ? twist(t) : fix(t);
    s += S.wipe(t, TWIST, INK, 0.45) + S.wipe(t, FIX, C.red, 0.45);
    s += S.endOnly(t, END, 'dark');
    return s;
  },
};
