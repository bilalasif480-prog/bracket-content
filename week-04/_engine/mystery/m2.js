// MYSTERY 2 · "3 am. A pigeon knocks with an urgent message."
// Escalates to a flock of pigeons with booking notes. Twist: customers messaged all night, nobody answered. Fix: AI agent from £875 + £109/month.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const M = require('./mk');
const { SKIN, HAIR, INK } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 17.85, END = 16.15;
const NOTE = 3.35, FLOCK = 5.5, TWIST = 9.35, FIX = 12.7;
const G = 1480;

const owner = { hair: 'curly', hairCol: HAIR.black, skin: SKIN[2], top: '#4a6fa5', bottom: '#4a6fa5', longSleeves: 1, acc: { nightcap: C.red, beard: 1 }, blinkPh: .8 };

function bedroom(t, o = {}) {
  let s = W.room(t, { wall: '#2b3150', floor: '#3d3552', pattern: 'dots', pcol: '#363d63', fy: G - 40 });
  // big window right
  s += W.windowNight(620, 560, 400, 330, t);
  s += `<rect x="600" y="895" width="440" height="26" rx="8" fill="#5b4a3a"/>`;
  // clock chip
  s += `<rect x="70" y="580" width="270" height="74" rx="37" fill="${C.peach}"/>` + W.T(o.clock || '3:00 AM', 205, 630, 40, INK, { mono: 1, w: 700, ls: 1 });
  return s;
}
function bed(t, sleeping, o = {}) {
  let s = `<rect x="40" y="1200" width="40" height="290" rx="12" fill="#7a4b2f"/><rect x="60" y="1300" width="680" height="120" rx="20" fill="#8f5c3b"/>`;
  s += `<rect x="90" y="1200" width="210" height="100" rx="40" fill="#fff"/>`;
  if (sleeping) {
    s += Ch.head(200, 1205, t, { ...owner, mood: o.mood || 'snore', rot: -18, hairUp: o.hairUp || 0, s: 1 });
    s += `<path d="M240 1250 Q500 1180 740 1250 V1330 H240 Z" fill="${C.peach}"/><path d="M240 1250 Q500 1180 740 1250" stroke="${INK}" stroke-width="6" fill="none"/>`;
  } else s += `<path d="M240 1260 Q500 1300 740 1250 V1330 H240 Z" fill="${C.peach}"/>`;
  return s;
}

// ---------- 0–3.35 HOOK ----------
function hook(t) {
  let s = bedroom(t, { clock: '3:00 AM' });
  const awake = t > 2.4;
  s += bed(t, true, { mood: awake ? 'shock' : 'snore', hairUp: awake ? seg(t, 2.4, 2.7) : 0 });
  if (!awake) s += Ch.zzz(300, 1120, t, '#fff', .9);
  // pigeon flies in (moving at frame 0) and lands on the sill, then taps the glass
  let px, py, pose = 'stand', rot = 0;
  if (t < 0.8) { const k = eo(seg(t, 0, 0.8)); px = 1010 - 190 * k; py = 640 + 255 * k; pose = 'fly'; }
  else { px = 820; py = 895; const tap = (t > 1.1 && t < 1.4) || (t > 1.8 && t < 2.1) || (t > 2.5 && t < 2.8); rot = tap ? -14 * Math.abs(Math.sin(t * 22)) : 0; }
  // pigeon outside: drawn inside window area (behind glass tint)
  s += Ch.pigeon(px, py, t, { dir: -1, pose, rot, note: 'URGENT', s: 1.05 });
  s += `<rect x="620" y="560" width="400" height="330" fill="#bfe3f2" opacity=".12"/>`;
  [1.15, 1.85, 2.55].forEach(a => s += Ch.impact(700, 700, seg(t, a, a + .55), 'TAP!', { r: 80 }));
  if (awake) s += M.qmarks(220, 1080, t, 2.6, 2, '#fff');
  s += S.head(t, -2, '3 am. A pigeon | knocks with an | *urgent* *message.*', { col: '#fff', acc: C.peach, size: 86, y: 170 });
  return s;
}

// ---------- 3.35–5.5 THE NOTE ----------
function note(t) {
  let s = bedroom(t, { clock: '3:01 AM' }) + bed(t, false);
  s += Ch.pigeon(820, 895, t, { dir: -1, pose: 'stand', s: 1.05 });
  s += Ch.person(520, G, t, { ...owner, pose: t < 4.3 ? 'reach' : 'panic', mood: t < 4.3 ? 'tired' : 'shock', hairUp: seg(t, 4.3, 4.6), look: [1, -1] });
  // giant note pops
  const k = eb(seg(t, NOTE + .15, NOTE + .5));
  s += W.pop(560, 820, k, `<g transform="rotate(${f(-4 + Math.sin(t * 3) * 1.5)} 560 820)"><rect x="200" y="640" width="720" height="330" rx="16" fill="#fffbe9" stroke="${INK}" stroke-width="8"/><path d="M200 700 H920" stroke="#f2a3a3" stroke-width="4"/>` + W.T('TABLE FOR 30.', 560, 790, 92, INK, { ls: -3 }) + W.T('TONIGHT?', 560, 910, 104, C.red, { ls: -3 }) + `</g>`);
  if (t > 4.4) s += Ch.impact(890, 640, seg(t, 4.4, 5.1), '30?!', { r: 90 });
  s += S.head(t, NOTE + .05, 'The note said…', { col: '#fff', acc: C.peach, size: 88, y: 230 });
  return s;
}

// ---------- 5.5–9.35 FLOCK ----------
const NOTES = ['BOOK 4 AT 8?', 'OPEN SUNDAY?', 'VEGAN MENU?', 'PARTY OF 12!', 'TABLE FOR 2?', 'BIRTHDAY?', 'STILL OPEN?', 'PARKING?', 'TAKEAWAY?'];
function flock(t) {
  let s = bedroom(t, { clock: '3:04 AM' }) + bed(t, false);
  const lt = t - FLOCK;
  // owner: panic, then running, then flattened under pigeons
  let o, ox = 520;
  if (lt < 1.6) o = { pose: 'panic', mood: 'scream', hairUp: 1, sweat: 1 };
  else if (lt < 3.0) { o = { pose: 'run', mood: 'scream', hairUp: 1, sweat: 1, dir: Math.floor(lt * 1.6) % 2 ? -1 : 1 }; ox = 540 + Math.sin(lt * 3.2) * 260; }
  else o = { pose: 'panic', mood: 'dizzy', hairUp: 1 };
  s += Ch.person(ox, G, t, { ...owner, ...o, dir: o.dir || 1 });
  if (lt >= 3.0) s += Ch.stars(ox + 10, G - 640, t, { r: 90 });
  // pigeons arrive one by one, then the flock
  const n = lt < 0.6 ? 1 : lt < 1.2 ? 2 : lt < 1.8 ? 4 : lt < 2.4 ? 7 : 12;
  for (let i = 0; i < n; i++) {
    const at = i < 1 ? 0 : i < 2 ? .6 : i < 4 ? 1.2 : i < 7 ? 1.8 : 2.4;
    const k = eo(seg(lt, at, at + .5));
    const hx = 120 + ((i * 271) % 860), hy = 560 + ((i * 197) % 640);
    const x = 1250 + (hx - 1250) * k + Math.sin(t * 3 + i) * 30, y = 300 + (hy - 300) * k + Math.cos(t * 4 + i) * 20;
    s += Ch.pigeon(x, y, t + i * .1, { dir: i % 3 ? -1 : 1, pose: 'fly', note: i < NOTES.length ? NOTES[i] : '', s: .75 });
  }
  // feathers
  if (lt > 1.8) for (let i = 0; i < 10; i++) { const p = (t * .5 + i / 10) % 1; s += `<ellipse cx="${f(60 + i * 105 + Math.sin(t * 3 + i) * 40)}" cy="${f(560 + p * 900)}" rx="18" ry="7" fill="#e6e9ee" transform="rotate(${f(t * 120 + i * 50)} ${f(60 + i * 105)} ${f(560 + p * 900)})"/>`; }
  if (lt > 0.1 && lt < 1.6) s += Ch.bubble(520, 760, 'Another one?!', seg(lt, .1, .3), { tail: 0, size: 52 });
  s += S.head(t, FLOCK + .05, 'Then another. | Then *fifty* *more.*', { col: '#fff', acc: C.peach, size: 88, y: 190 });
  return s;
}

// ---------- 9.35–12.7 TWIST ----------
function chat(t, x, y, w, list) {
  let s = '', yy = y;
  for (const m of list) {
    if (t < m.at) continue;
    const k = eb(seg(t, m.at, m.at + .3)), size = 31;
    const tw = Math.min(w - 20, m.text.length * size * 0.55 + 56), bx = m.out ? x + w - tw : x;
    let g = `<rect x="${bx}" y="${yy}" width="${tw}" height="78" rx="28" fill="${m.out ? C.green : '#ece9e6'}"/>` + W.T(m.text, bx + tw / 2, yy + 50, size, m.out ? '#fff' : INK, { w: 800, ls: -.5 });
    g += W.T(m.time, m.out ? bx + tw - 10 : bx + 10, yy + 106, 22, m.timeCol || '#8a847f', { a: m.out ? 'end' : 'start', mono: 1, w: 700, ls: 0 });
    s += W.pop(bx + tw / 2, yy + 39, k, g);
    yy += 136;
  }
  return s;
}
function chatHead(x, y, w, sub) {
  return `<rect x="${x}" y="${y}" width="${w}" height="96" fill="${INK}"/><circle cx="${x + 56}" cy="${y + 48}" r="28" fill="${C.peach}"/>` + W.T('Your restaurant', x + 100, y + 46, 32, '#fff', { a: 'start' }) + W.T(sub, x + 100, y + 80, 22, '#bfb8b2', { a: 'start', mono: 1, w: 700, ls: 0 });
}
function twist(t) {
  let s = `<rect width="1080" height="1920" fill="${INK}"/>`;
  const list = [
    { at: 9.9, text: 'Table for 30 tonight?', time: '11:02 PM · unread' },
    { at: 10.35, text: 'Hello??', time: '11:48 PM · unread' },
    { at: 10.8, text: 'Anyone there?', time: '1:15 AM · unread' },
    { at: 11.25, text: 'Ok. Sending a pigeon.', time: '2:58 AM', timeCol: C.red },
  ];
  s += W.phone(400, 480, 640, 980, `<rect x="422" y="544" width="596" height="880" fill="#f6f3ef"/>` + chatHead(422, 544, 596, 'no reply') + chat(t, 445, 680, 550, list), { k: eb(seg(t, TWIST + .05, TWIST + .35)) });
  s += M.stamp(720, 1290, t, 11.85, 'NOBODY ANSWERED', { w: 660, size: 60 });
  // pigeon on the floor, shrugging (wings out), owner facepalm
  s += Ch.person(190, G, t, { ...owner, pose: t > 11.85 ? 'facepalm' : 'idle', mood: t > 11.85 ? 'sad' : 'shock', look: [1, -1] });
  s += Ch.pigeon(330, 860, t, { dir: -1, pose: t > 11.3 && t < 12.2 ? 'fly' : 'stand', s: .8, note: t > 11.3 ? 'TOLD YOU' : '' });
  s += S.head(t, TWIST + .1, 'Customers messaged | *all* *night.* | Nobody answered.', { col: '#fff', acc: C.peach, size: 84, y: 170 });
  return s;
}

// ---------- 12.7–15.9 FIX ----------
function fix(t) {
  let s = bedroom(t, { clock: '3:00 AM' });
  s += bed(t, true, { mood: 'snore' }) + Ch.zzz(300, 1120, t, '#fff', .9);
  const list = [
    { at: 13.0, text: 'Table for 30 tonight?', time: '11:02 PM' },
    { at: 13.5, out: 1, text: 'Yes! Booked for 8 pm ✓', time: 'AI agent · 11:02 PM' },
  ];
  s += W.phone(400, 470, 540, 760, `<rect x="422" y="534" width="496" height="680" fill="#f6f3ef"/>` + chatHead(422, 534, 496, 'AI agent · online') + chat(t, 440, 670, 460, list), { k: eb(seg(t, FIX + .05, FIX + .35)) });
  // robot agent pops up beside the bed with a thumbs up; pigeon sleeps on its head
  const d = S.drop(t, FIX + .3, .4, 1300);
  if (d) {
    s += Ch.person(970, G, t, { robot: 1, pose: d.pose || (t > 14 ? 'thumbs' : 'tap'), mood: 'happy', lift: d.lift, squash: d.squash, dir: -1, talk: t > 13.5 && t < 14 });
    if (t > 14.3) s += Ch.pigeon(930, G - 770, t, { dir: -1, pose: 'stand', s: .6 }) + Ch.zzz(970, G - 860, t, '#fff', .6);
  }
  s += S.tag(t, 14.4, 'AI agents from £875', 'setup + £109/month', { y: 1440, w: 780 });
  s += S.head(t, FIX + .1, 'An AI agent answers | and books, *24/7.*', { col: '#fff', acc: C.peach, size: 88, y: 190 });
  return s;
}

module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < NOTE ? hook(t) : t < FLOCK ? note(t) : t < TWIST ? flock(t) : t < FIX ? twist(t) : fix(t);
    s += S.wipe(t, TWIST, C.peach, 0.45) + S.wipe(t, FIX, C.red, 0.45);
    s += S.endOnly(t, END, 'dark');
    return s;
  },
};
module.exports.parts = { bedroom, bed, owner };
