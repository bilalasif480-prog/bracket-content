// WEEK-04 12 · Price question left waiting → AI agent (nail bar). Hook formula #2 "Countdown / clock → payoff": a waiting clock races while she gets older.
const { C, clamp, seg, eo, eb, f, confetti, sparkle } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.4, FIX = 7.1, GONE = 5.2;
const G = 1480;
const cust = { female: true, hair: 'pony', hairCol: HAIR.brown, skin: SKIN[2], top: '#5ec4c9', bottom: '#283a5a', acc: { phone: '#9fd3ff' }, blinkPh: .7 };
const tech = { female: true, hair: 'long', hairCol: HAIR.black, skin: SKIN[3], top: '#ec3013', bottom: '#201e1d', acc: { earrings: 1 }, blinkPh: 1.6 };
const client = { hair: 'short', hairCol: HAIR.blond, skin: SKIN[0], top: '#ffc23c', bottom: '#2f3a4a', blinkPh: .2 };

function bar(t) {
  let s = W.room(t, { wall: '#ffe3ef', floor: '#e8c3d3', pattern: 'stripes', pcol: 'rgba(224,90,154,.07)', fy: G - 40 });
  // bench
  s += `<rect x="40" y="${G - 210}" width="340" height="30" rx="12" fill="#8f5c3b"/><rect x="70" y="${G - 190}" width="22" height="150" fill="#8f5c3b"/><rect x="330" y="${G - 190}" width="22" height="150" fill="#8f5c3b"/>`;
  // nail polish shelf
  const cols = [C.red, '#e05a9a', '#8a5cf5', C.peach, C.gold, '#1fa86b'];
  s += `<rect x="560" y="1000" width="480" height="16" rx="6" fill="#c08aa3"/>` + cols.map((c, i) => `<rect x="${585 + i * 76}" y="950" width="40" height="50" rx="10" fill="${c}"/><rect x="${595 + i * 76}" y="922" width="20" height="30" rx="4" fill="${C.ink}"/>`).join('');
  return s;
}
function desk() { return `<rect x="560" y="${G - 250}" width="400" height="26" rx="10" fill="#fff" stroke="#e8c3d3" stroke-width="6"/><rect x="590" y="${G - 230}" width="22" height="190" fill="#c08aa3"/><rect x="910" y="${G - 230}" width="22" height="190" fill="#c08aa3"/>`; }
function clockChip(t) {
  const txt = t < 1.0 ? '0:00:0' + Math.floor(t * 9 + 1) : t < 2.0 ? '0:' + String(12 + Math.floor((t - 1) * 40)).padStart(2, '0') + ':40' : t < 3.4 ? String(2 + Math.floor((t - 2) * 4)) + ':47:15' : 'Next day';
  const big = t >= 3.4;
  return `<rect x="730" y="520" width="320" height="200" rx="30" fill="${C.ink}"/>` + W.T('WAITING', 890, 580, 30, C.peach, { mono: 1, ls: 3 }) + W.T(txt, 890, 670, big ? 54 : 70, big ? C.red : '#fff');
}
function stick(x, y, rot = 0) { return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><path d="M0 0 V-240 Q0 -276 30 -276 Q56 -276 56 -250" stroke="#7a4b2f" stroke-width="16" fill="none" stroke-linecap="round"/></g>`; }
function before(t) {
  let s = bar(t);
  // chat panel
  const inner = W.msgs(t, 90, 584, 560, [{ at: -1, text: 'How much for gel nails?', out: 1 }, { at: 4.9, text: 'Hi! Sorry, just seen this' }], { size: 32 });
  s += W.panel(60, 480, 640, 420, 'Messages', inner, 1, { head: '#e05a9a', dot: '#fff' });
  s += clockChip(t);
  // the client getting nails done + the tech, too busy for the phone
  s += Ch.person(940, G, t, { ...client, dir: -1, pose: 'idle', mood: 'happy', limbs: { sa: 70, ea: 20 } });
  s += Ch.person(560, G, t, { ...tech, pose: t < 4.4 ? 'idle' : 'phoneIdle', mood: t < 4.4 ? 'flat' : t < GONE + 0.2 ? 'smile' : 'shock', limbs: t < 4.4 ? { sa: 80 + Math.sin(t * 20) * 6, ea: 10 } : undefined, acc: t < 4.4 ? tech.acc : { ...tech.acc, phone: '#9fd3ff' }, eyesOpen: 1, talk: t > 4.5 && t < 5.0 });
  s += desk();
  if (t < 4.4) { s += `<g transform="translate(${f(800 + Math.sin(t * 60) * 5)} ${G - 270})"><rect x="-28" y="-16" width="56" height="32" rx="8" fill="${C.ink}"/></g>` + Ch.notifBadge(830, G - 320, String(1 + Math.floor(t * 2)), 1); }
  // the customer: waits, ages, leaves
  if (t < GONE) {
    const old = t >= 2.6;
    const pose = t < 1.0 ? 'phoneIdle' : t < 2.0 ? 'tap' : t < 3.4 ? 'phoneIdle' : 'idle';
    s += Ch.person(220, G, t, { ...cust, hairCol: old ? HAIR.grey : cust.hairCol, hair: old ? 'bun' : 'pony', pose, mood: t < 1.0 ? 'smile' : t < 2.0 ? 'grumpy' : 'tired', acc: old ? { glasses: 1, phone: '#9fd3ff' } : cust.acc, eyesOpen: 1, limbs: t >= 3.4 ? { sb: -14, eb: 10 } : undefined });
    if (t > 2.45 && t < 2.9) { const k = seg(t, 2.45, 2.9); s += `<g opacity="${f(1 - k)}">` + [0, 1, 2, 3, 4].map(i => `<circle cx="${f(220 + Math.cos(i * 1.3) * 120 * (0.5 + k))}" cy="${f(900 + Math.sin(i * 2) * 80 * (0.5 + k))}" r="${f(70 - 20 * k)}" fill="#fff"/>`).join('') + `</g>`; }
    if (t >= 3.4) s += stick(130, G);
    s += W.cobweb(40, G - 700, 240, seg(t, 1.6, 3.4), 1);
  } else {
    s += stick(330, G - 190, 70) + `<g transform="translate(250 ${G - 240}) rotate(-6)"><rect x="-120" y="-60" width="240" height="70" rx="6" fill="#fffbe9" stroke="${C.ink}" stroke-width="4"/>` + W.T('Booked elsewhere', 0, -14, 28, C.ink) + `</g>`;
    s += W.cobweb(40, G - 700, 240, 1, 1);
    s += Ch.pigeon(40, G - 205, t, { dir: 1, s: .8, pose: 'stand' });
  }
  if (t > 3.5 && t < 4.4) s += Ch.bubble(270, 780, 'Still waiting...', seg(t, 3.5, 3.7), { tail: 0, size: 42 });
  if (t > GONE + 0.2) s += Ch.impact(240, 1020, seg(t, GONE + 0.2, GONE + 1.1), 'GONE!', { r: 110 });
  if (t < GONE) s += S.head(t, -2, 'She asks *your* *price* | at 9 pm...', { col: C.ink, acc: C.red });
  else s += S.head(t, GONE, '...you reply | *tomorrow.*', { col: C.ink, acc: C.red });
  return s;
}
function after(t) {
  let s = bar(t);
  const inner = W.msgs(t, 90, 576, 560, [
    { at: 7.6, text: 'How much for gel nails?', out: 1 },
    { at: 8.1, text: 'Here’s our price list. Sat 2pm?' },
    { at: 8.7, text: 'Yes please!', out: 1 },
    { at: 9.2, text: 'Booked ✓ Sat 2pm' }], { size: 30, gap: 78 });
  s += W.panel(60, 480, 640, 440, 'Messages · AI agent', inner, eb(seg(t, FIX + 0.2, FIX + 0.5)), { head: '#e05a9a', dot: '#fff' });
  s += Ch.person(940, G, t, { ...client, dir: -1, pose: t < 10.2 ? 'idle' : 'dance', mood: 'happy', limbs: t < 10.2 ? { sa: 70, ea: 20 } : undefined });
  s += Ch.person(560, G, t, { ...tech, pose: t < 10.2 ? 'idle' : 'dance', mood: 'happy', limbs: t < 10.2 ? { sa: 80 + Math.sin(t * 20) * 6, ea: 10 } : undefined, eyesOpen: 1 });
  s += desk();
  // robot pops up beside the panel
  const ry = S.tw(t, FIX + 0.3, FIX + 0.7, 700, 0);
  s += `<g transform="translate(0 ${f(ry)})">${Ch.person(880, 1000, t, { robot: true, s: .62, dir: -1, pose: t < 9.6 ? 'tap' : 'thumbs', mood: 'happy', talk: t > 8.0 && t < 9.4, shadow: false })}</g>`;
  s += `<rect x="730" y="985" width="320" height="30" rx="12" fill="#c08aa3"/>`;
  // the customer (young again) books and shows her nails
  const x = S.tw(t, 8.7, 9.2, -200, 220);
  if (t > 8.7) s += Ch.person(x, G, t, { ...cust, pose: t < 9.2 ? 'walk' : t < 10.2 ? 'wave' : 'dance', mood: 'grin', eyesOpen: 1 });
  if (t > 10.2) s += sparkle(260, 960, 26, t) + sparkle(330, 1010, 20, t, 2) + confetti(540, 900, 10.2, t, 30);
  if (t < 10.6) s += S.head(t, FIX + 0.15, 'An *AI* *agent* answers | while you work.', { col: C.ink, acc: C.red });
  else s += S.tag(t, 10.6, 'AI agents from £875', 'setup + £109/month', { y: 330, w: 880 });
  return s;
}
module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < FIX ? before(t) : after(t);
    s += S.wipe(t, FIX, '#e05a9a', 0.45);
    s += S.endOnly(t, END, 'paper');
    return s;
  },
};
