// WEEK-04 08 · Juggling every message → AI agent (dental clinic). Hook formula #8 "Relatable meme caption": white caption bar over the receptionist juggling messages.
const { C, clamp, seg, eo, eb, f } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.4, FIX = 7.1, CRASH = 5.1;
const G = 1480, RX = 560;
const rec = { hair: 'spiky', hairCol: HAIR.blond, skin: SKIN[1], top: '#5ec4c9', bottom: '#2f3a4a', acc: { headphones: C.ink }, blinkPh: .3 };
const pat = { female: true, hair: 'curly', hairCol: HAIR.grey, skin: SKIN[2], top: '#e05a9a', bottom: '#3b3b3b', acc: { glasses: 1 }, blinkPh: 1.5 };
const ICONS = ['chat', 'mail', 'dm', 'call', 'chat', 'mail', 'dm'];

function clinic(t) {
  let s = W.room(t, { wall: '#dff5ee', floor: '#bfd9d0', pattern: 'dots', pcol: 'rgba(31,168,107,.10)', fy: G - 40 });
  // tooth sign
  s += `<g transform="translate(900 640)"><circle r="90" fill="#fff" stroke="${C.ink}" stroke-width="6"/><path d="M-44 -40 Q-50 -70 -20 -66 Q0 -60 20 -66 Q50 -70 44 -40 Q40 0 30 40 Q24 60 14 40 L0 10 L-14 40 Q-24 60 -30 40 Q-40 0 -44 -40 Z" fill="#fff" stroke="${C.ink}" stroke-width="6"/></g>`;
  s += W.plant(1000, G - 40, 1);
  return s;
}
function desk() { return W.counter(RX - 220, G - 260, 440, 220, '#ffffff', '#5ec4c9') + `<rect x="${RX - 220}" y="${G - 200}" width="440" height="16" fill="#5ec4c9" opacity=".5"/>`; }
function bandage(x, t) { // swollen cheek + bandage on the patient's head
  const hx = x + 6 * 1.25, hy = G - 447;
  return `<ellipse cx="${f(hx + 40)}" cy="${f(hy + 36)}" rx="36" ry="30" fill="#d98fa0" opacity=".55"/><g transform="translate(${f(hx + 52)} ${f(hy + 36)}) rotate(-20)"><rect x="-22" y="-9" width="44" height="18" rx="6" fill="#f6e0c0" stroke="#c9a77a" stroke-width="3"/></g>`;
}
function juggle(t, n, speed, cx, cy, w, h) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const p = (t * speed + i / n) % 1;
    const x = cx + Math.cos(p * Math.PI * 2) * w, y = cy - Math.abs(Math.sin(p * Math.PI)) * h * (i % 2 ? 1 : 0.8) - (p > .5 ? 0 : 0);
    s += W.icon[ICONS[i]](x, y, 0.95);
  }
  return s;
}
function memeBar(t) {
  return `<rect x="0" y="230" width="1080" height="230" fill="#fff"/>` + W.T('Me answering WhatsApp,', 540, 325, 64, C.ink, { ls: -2 }) + W.T('emails and DMs at 11 pm', 540, 405, 64, C.ink, { ls: -2 });
}
function before(t) {
  let s = clinic(t);
  // patient at the bell
  const pp = t < 3.3 ? 'idle' : t < 4.4 ? 'knock' : t < CRASH ? 'point' : 'idle';
  s += Ch.person(190, G, t, { ...pat, pose: pp, mood: t < 3.3 ? 'sad' : t < CRASH ? 'angry' : 'shock', eyesOpen: 1, talk: t > 3.3 && t < 4.4 });
  s += bandage(190, t);
  // receptionist + juggling
  const buried = t >= CRASH + 0.35;
  if (!buried) s += Ch.person(RX, G - 30, t, { ...rec, pose: t < CRASH ? 'panic' : 'air', mood: t < 1.3 ? 'grin' : t < 2.4 ? 'shock' : 'scream', eyesOpen: 1, sweat: t > 1.3, hairUp: seg(t, 2.4, 4.4), shadow: false });
  s += desk();
  if (t < CRASH) {
    const n = t < 1.3 ? 3 : t < 2.4 ? 4 : t < 3.4 ? 5 : 7;
    const sp = t < 1.3 ? 0.9 : t < 2.4 ? 1.2 : t < 4.4 ? 1.6 : 2.4;
    s += juggle(t, n, sp, RX + 20, G - 640, 190, 300);
    if (t > 1.15 && t < 1.4) s += W.icon.call(1100 - 500 * seg(t, 1.15, 1.4), 700, .95);
    if (t > 4.4) s += Ch.notifBadge(RX + 230, 690, '99+', seg(t, 4.4, 4.6));
  } else {
    // everything falls: a pile on top of him
    const k = seg(t, CRASH, CRASH + 0.35);
    for (let i = 0; i < 7; i++) {
      const tx = RX - 150 + (i % 4) * 100, ty = G - 300 - Math.floor(i / 4) * 90;
      const sx = RX + 20 + Math.cos(i) * 190, sy = G - 900;
      s += W.icon[ICONS[i]](sx + (tx - sx) * k, sy + (ty - sy) * k * k, 1.1);
    }
    if (buried) { const w = Math.sin(t * 12) * 20; s += `<g transform="translate(${RX + 60} ${G - 470}) rotate(${f(w)})"><rect x="-14" y="-10" width="28" height="90" rx="12" fill="#5ec4c9"/><circle cx="0" cy="-20" r="22" fill="${SKIN[1]}"/></g>`; }
    if (t > CRASH + 0.3) s += Ch.impact(RX + 260, 1050, seg(t, CRASH + 0.3, CRASH + 1.2), 'THUD!', { r: 110 });
  }
  // desk bell
  s += `<g transform="translate(${RX - 170} ${G - 282})"><path d="M-34 0 Q-34 -40 0 -40 Q34 -40 34 0 Z" fill="${C.gold}"/><rect x="-42" y="-4" width="84" height="10" rx="5" fill="#8a6a1d"/><circle cx="0" cy="-44" r="7" fill="#8a6a1d"/></g>`;
  if (t > 3.3 && t < 4.4) s += Ch.bubble(260, 850, 'Hellooo??', seg(t, 3.3, 3.5), { tail: -40, size: 46 });
  if (t > 3.4 && t < 4.2) s += Ch.impact(RX - 170, 1130, seg(t, 3.4, 4.2), 'DING!', { r: 80 });
  s += memeBar(t);
  return s;
}
function after(t) {
  let s = clinic(t);
  // patient: books, bandage still on, happy
  s += Ch.person(190, G, t, { ...pat, pose: t < 9.8 ? 'phoneIdle' : 'dance', mood: 'grin', eyesOpen: 1, acc: { glasses: 1, phone: '#9fd3ff' } });
  s += bandage(190, t);
  // robot slides in behind the desk; the receptionist relaxes with a tea
  const x = S.tw(t, FIX, FIX + 0.5, 1200, RX);
  s += Ch.person(x, G, t, { robot: true, pose: t < FIX + 0.5 ? 'run' : t < 9.8 ? 'tap' : 'dance', dir: -1, mood: 'happy', talk: t > 8.2 && t < 9.6, shadow: false });
  s += desk();
  s += Ch.person(910, G, t, { ...rec, dir: -1, pose: 'idle', mood: 'happy', limbs: { sa: 40, ea: 100 }, ph: 1 });
  s += `<g transform="translate(880 ${G - 290})"><rect x="-26" y="-34" width="52" height="60" rx="10" fill="#fff" stroke="${C.ink}" stroke-width="5"/><path d="M26 -20 q22 0 22 18 q0 18 -22 18" stroke="${C.ink}" stroke-width="5" fill="none"/>${[0, 1].map(i => { const p = (t * .8 + i / 2) % 1; return `<path d="M${-8 + i * 16} ${f(-44 - p * 50)} q8 -12 0 -24" stroke="#9a948f" stroke-width="5" fill="none" opacity="${f(Math.sin(p * Math.PI))}"/>`; }).join('')}</g>`;
  const inner = W.msgs(t, 110, 574, 860, [
    { at: 7.8, text: 'Can I book a check-up?' },
    { at: 8.3, text: 'Tue 9:30 is free. Booked ✓', out: 1 },
    { at: 9.0, text: 'My tooth really hurts!' },
    { at: 9.5, text: 'Passing you to the team now', out: 1 },
  ], { size: 34 });
  s += W.panel(90, 480, 900, 450, 'Clinic inbox · AI agent', inner, eb(seg(t, FIX + 0.25, FIX + 0.55)));
  if (t < 10.6) s += S.head(t, FIX + 0.15, 'An *AI* *agent* answers | and books.', { col: C.ink, acc: C.red });
  else s += S.tag(t, 10.6, 'AI agents from £875', 'setup + £109/month', { y: 330, w: 880 });
  return s;
}
module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < FIX ? before(t) : after(t);
    s += S.wipe(t, FIX, '#5ec4c9', 0.45);
    s += S.endOnly(t, END, 'red');
    return s;
  },
};
