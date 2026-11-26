// WEEK-04 07 · Broken contact form → form checked on real phones (estate agent). Hook formula #1 "About to break": frame 0 the couple are already filling in the form.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.4, FIX = 7.1, LEAVE = 5.0;
const G = 1480;
const him = { hair: 'curly', hairCol: HAIR.black, skin: SKIN[2], top: '#ff8360', bottom: '#2f3a4a', acc: { glasses: 1 }, blinkPh: .4 };
const her = { female: true, hair: 'bun', hairCol: HAIR.ginger, skin: SKIN[0], top: '#2f9e8f', bottom: '#283a5a', skirt: true, legs: '#283a5a', blinkPh: 1.1 };
const agent = { female: true, hair: 'long', hairCol: HAIR.dark, skin: SKIN[3], top: '#283a5a', bottom: '#283a5a', collar: 1, longSleeves: 1, acc: { phone: '#9fd3ff', earrings: 1 }, blinkPh: 2 };

function office(t) {
  let s = W.room(t, { wall: '#dce6f5', floor: '#9aa6b8', pattern: 'stripes', pcol: 'rgba(32,30,29,.04)', fy: G - 40 });
  // house photos on the wall
  [[40, 540], [40, 680]].forEach(([x, y]) => { s += `<rect x="${x}" y="${y}" width="110" height="90" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="4"/><path d="M${x + 25} ${y + 70} V${y + 45} L${x + 55} ${y + 22} L${x + 85} ${y + 45} V${y + 70} Z" fill="${C.peach}"/>`; });
  // desk
  s += `<rect x="760" y="${G - 220}" width="330" height="30" rx="8" fill="#7a4b2f"/><rect x="1040" y="${G - 200}" width="24" height="160" fill="#7a4b2f"/>`;
  return s;
}
function form(t, sentAt, good) {
  let g = W.T('Book a viewing', 40, 60, 50, C.ink, { a: 'start', ls: -2 });
  g += `<rect x="40" y="90" width="620" height="70" rx="16" fill="#f3f2f2"/>` + W.T(t > sentAt - 0.8 ? 'Sam & Priya' : 'Sam & Pri', 60, 138, 36, C.ink, { a: 'start', w: 800 });
  g += `<rect x="40" y="180" width="620" height="70" rx="16" fill="#f3f2f2"/>` + W.T('Sat 11:00', 60, 228, 36, C.ink, { a: 'start', w: 800 });
  const pressed = t > sentAt && t < sentAt + 0.2;
  g += W.pop(350, 310, pressed ? 0.9 : 1, W.btn(160, 272, 380, 76, good && t > sentAt + 0.3 ? 'Sent ✓' : 'SEND', good && t > sentAt + 0.3 ? C.green : C.red, 42));
  return g;
}
function plane(t, a, pts) { // fly along points [[t,x,y,rot]]
  if (t < a || t < pts[0][0] || t > pts[pts.length - 1][0]) return '';
  for (let i = 0; i < pts.length - 1; i++) { const [t0, x0, y0, r0] = pts[i], [t1, x1, y1, r1] = pts[i + 1]; if (t <= t1) { const k = seg(t, t0, t1); return W.paperPlane(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k, r0 + (r1 - r0) * k, 1.3); } }
  return '';
}
function before(t) {
  let s = office(t);
  s += W.panel(240, 480, 720, 470, 'your-agency.co.uk', `<g transform="translate(255 572)">${form(t, 1.0, false)}</g>`, 1, { ts: 30 });
  s += W.bin(560, G - 10);
  // plane 1: loops and nosedives into the bin
  s += plane(t, 1.1, [[1.1, 600, 880, -20], [1.5, 860, 760, 10], [1.8, 960, 920, 120], [2.1, 760, 1050, 200], [2.4, 560, G - 170, 100]]);
  if (t > 2.4 && t < 3.2) s += Ch.impact(560, 1200, seg(t, 2.4, 3.2), 'CRUNCH!', { r: 100 });
  // plane 2: stolen by the pigeon
  s += plane(t, 3.3, [[3.3, 600, 880, -20], [3.8, 760, 760, -10]]);
  if (t > 3.5 && t < 5.2) { const k = seg(t, 3.5, 3.8), k2 = seg(t, 3.85, 5.0); s += Ch.pigeon(1180 - 420 * eo(k) - 900 * k2, 700 - 160 * k2, t, { dir: -1, pose: 'fly', note: t > 3.8 ? 'viewing??' : '', s: .9 }); }
  // the couple
  const gone = t > LEAVE;
  const cx = gone ? 320 - 640 * seg(t, LEAVE + 0.3, LEAVE + 1.4) : 320;
  const hp = t < 1.0 ? 'tap' : t < 2.4 ? 'point' : t < 3.3 ? 'tap' : t < LEAVE ? 'shrug' : 'walk';
  s += Ch.person(cx - 140, G, t, { ...her, pose: hp === 'tap' ? 'idle' : hp, mood: t < 2.4 ? 'grin' : t < LEAVE ? 'flat' : 'angry', eyesOpen: 1, dir: gone && t > LEAVE + 0.3 ? -1 : 1, ph: .4 });
  s += Ch.person(cx + 40, G, t, { ...him, pose: hp, mood: t < 2.4 ? 'grin' : t < LEAVE ? 'shock' : 'grumpy', eyesOpen: 1, dir: gone && t > LEAVE + 0.3 ? -1 : 1 });
  // the agent behind the desk
  let ap = 'phoneIdle', am = 'grin', shake = 0;
  if (t > 2.4 && t < 3.3) { ap = 'phoneIdle'; am = 'shock'; shake = Math.sin(t * 50) * 12; }
  else if (t > 3.3 && t < 4.3) { ap = 'point'; am = 'scream'; }
  else if (t > 4.3 && t < LEAVE) { ap = 'yawn'; am = 'tired'; }
  const sleep = t > LEAVE + 0.3;
  s += Ch.person(900 + shake, G, t, { ...agent, dir: -1, pose: sleep ? 'idle' : ap, mood: sleep ? 'sleep' : am, eyesOpen: 1, headTilt: sleep ? 28 * eo(seg(t, LEAVE + 0.3, LEAVE + 0.6)) : 0, talk: t > 2.4 && t < 3.3 });
  s += `<rect x="760" y="${G - 220}" width="330" height="30" rx="8" fill="#7a4b2f"/>`; // desk front edge over her hands
  s += W.cobweb(1080, G - 720, 190, seg(t, 4.2, 5.4), -1);
  if (sleep) s += Ch.zzz(840, 900, t, C.ink);
  if (t > 2.5 && t < 3.3) s += Ch.bubble(760, 960, 'Nothing?', seg(t, 2.5, 2.7), { tail: 60, size: 44 });
  if (t > 3.8 && t < 4.4) s += Ch.bubble(760, 960, 'HEY!!', seg(t, 3.8, 3.95), { tail: 60, size: 50, fill: C.red, col: '#fff' });
  if (t > LEAVE && t < 6.3) s += Ch.bubble(260, 960, 'Next agent.', seg(t, LEAVE, LEAVE + 0.2), { tail: 0, size: 46 });
  if (t < LEAVE) s += S.head(t, -2, 'They fill in | your *form...*', { col: C.ink, acc: C.red });
  else s += S.head(t, LEAVE, '...and it goes | *nowhere.*', { col: C.ink, acc: C.red });
  return s;
}
function after(t) {
  let s = office(t);
  s += W.panel(240, 480, 720, 470, 'your-agency.co.uk', `<g transform="translate(255 572)">${form(t, 7.9, true)}</g>`, eb(seg(t, FIX + 0.2, FIX + 0.5)), { ts: 30 });
  s += plane(t, 8.0, [[8.0, 600, 880, -10], [8.5, 820, 1000, 20]]);
  const got = t > 8.5;
  s += Ch.person(170, G, t, { ...her, pose: t < 8.0 ? 'idle' : t < 10.0 ? 'idle' : 'dance', mood: 'grin', eyesOpen: 1, ph: .4 });
  s += Ch.person(360, G, t, { ...him, pose: t < 8.0 ? 'tap' : t < 10.0 ? 'idle' : 'celebrate', mood: 'grin', eyesOpen: 1 });
  s += Ch.person(900, G, t, { ...agent, dir: -1, pose: !got ? 'idle' : t < 9.6 ? 'phoneIdle' : t < 10.0 ? 'point' : 'celebrate', mood: got ? 'grin' : 'smile', eyesOpen: 1 });
  s += `<rect x="760" y="${G - 220}" width="330" height="30" rx="8" fill="#7a4b2f"/>`;
  if (got && t < 10.4) s += Ch.notifBadge(1000, 900, '1', seg(t, 8.5, 8.7));
  if (t > 8.7 && t < 10.5) s += Ch.bubble(640, 1000, 'Sat 11:00 ✓', seg(t, 8.7, 8.9), { tail: 60, size: 44 });
  // keys fly to the couple
  if (t > 9.7) { const k = seg(t, 9.7, 10.2); const x = 760 - 440 * eo(k), y = 1000 + 160 * k - Math.sin(k * Math.PI) * 200; s += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(t * 300)})"><circle r="26" fill="none" stroke="${C.gold}" stroke-width="10"/><rect x="20" y="-8" width="70" height="16" rx="6" fill="${C.gold}"/><rect x="70" y="0" width="12" height="22" fill="${C.gold}"/></g>`; }
  if (t > 10.1) s += confetti(540, 900, 10.1, t, 40);
  if (t < 10.6) s += S.head(t, FIX + 0.15, 'Checked on | *real* *phones.*', { col: C.ink, acc: C.red });
  else s += S.tag(t, 10.6, 'Websites from £655', '', { y: 345, w: 860, s1: 70 });
  return s;
}
module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < FIX ? before(t) : after(t);
    s += S.wipe(t, FIX, C.red, 0.45);
    s += S.endOnly(t, END, 'paper');
    return s;
  },
};
