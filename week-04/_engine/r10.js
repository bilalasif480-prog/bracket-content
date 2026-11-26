// WEEK-04 10 · No website yet → a site built block by block (pet groomer). Hook formula #7 "Satisfying build": frame 0 the first block is already slamming into the phone.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.4, POOF = 6.3;
const G = 1480;
const PX = 520, PY = 480, PW = 500, PH = 960, SX = PX + 22, SY = PY + 64, SW = PW - 44;
const groomer = { female: true, hair: 'short', hairCol: HAIR.ginger, skin: SKIN[1], top: '#8a5cf5', bottom: '#2f3a4a', acc: { apron: '#5ec4c9' }, blinkPh: .6 };
const cust = { hair: 'curly', hairCol: HAIR.dark, skin: SKIN[3], top: '#ffc23c', bottom: '#283a5a', acc: { phone: '#9fd3ff' }, blinkPh: 1.4 };

function salon(t) {
  let s = W.room(t, { wall: '#e8f4ff', floor: '#c7d3e0', pattern: 'dots', pcol: 'rgba(138,92,245,.10)', fy: G - 40 });
  // paw prints on the wall
  [[90, 620], [180, 720], [100, 820]].forEach(([x, y]) => { s += `<g transform="translate(${x} ${y})" fill="#cfc2f5"><ellipse cx="0" cy="10" rx="22" ry="18"/><circle cx="-22" cy="-16" r="9"/><circle cx="0" cy="-26" r="9"/><circle cx="22" cy="-16" r="9"/></g>`; });
  // grooming table
  s += `<rect x="190" y="${G - 260}" width="300" height="24" rx="10" fill="#6e7886"/><rect x="230" y="${G - 240}" width="20" height="200" fill="#6e7886"/><rect x="430" y="${G - 240}" width="20" height="200" fill="#6e7886"/>`;
  return s;
}
// a block dropping into place at time a: returns transform wrapper
function blk(t, a, x, y, w, h, inner) {
  if (t < a) return '';
  const d = S.drop(t, a, 0.3, 900);
  const sq = d.landed < 0 ? 1.1 : d.squash;
  return `<g transform="translate(${x + w / 2} ${f(y + h - d.lift)}) scale(${f(1 + (1 - sq) * .6)} ${f(sq)}) translate(${-(x + w / 2)} ${-(y + h)})">${inner}</g>`;
}
function site(t) {
  const x = SX, w = SW;
  let s = '';
  s += blk(t, -0.6, x, SY, w, 90, `<rect x="${x}" y="${SY}" width="${w}" height="90" fill="${C.ink}"/>` + W.T('Your Groomer', x + 24, SY + 58, 38, '#fff', { a: 'start' }));
  s += blk(t, -0.27, x + 16, SY + 104, w - 32, 200, `<rect x="${x + 16}" y="${SY + 104}" width="${w - 32}" height="200" rx="22" fill="${C.peach}"/>` + W.T('Pampered', x + 40, SY + 180, 52, '#fff', { a: 'start', ls: -2 }) + W.T('pets.', x + 40, SY + 236, 52, C.ink, { a: 'start', ls: -2 }) + `<g transform="translate(${x + w - 90} ${SY + 210})" fill="#fff"><ellipse cx="0" cy="14" rx="30" ry="24"/><circle cx="-30" cy="-20" r="12"/><circle cx="0" cy="-34" r="12"/><circle cx="30" cy="-20" r="12"/></g>`);
  // the button: drops, bounces out, comes back at 2.4
  const btnIn = `<rect x="${x + 16}" y="${SY + 318}" width="${w - 32}" height="84" rx="42" fill="${C.red}"/>` + W.T(t > 6.0 ? 'Booked ✓ Sat 10:00' : 'Book a groom', x + w / 2, SY + 372, 38, '#fff');
  if (t >= 2.4) s += blk(t, 2.4, x + 16, SY + 318, w - 32, 84, t > 6.0 ? btnIn.replace(C.red, C.green) : btnIn);
  s += blk(t, 2.9, x + 16, SY + 416, w - 32, 180, `<rect x="${x + 16}" y="${SY + 416}" width="${w - 32}" height="180" rx="20" fill="#f3f2f2"/>` + ['Wash &amp; dry', 'Full groom', 'Nail trim'].map((n, i) => W.T(n, x + 40, SY + 466 + i * 50, 32, C.ink, { a: 'start', w: 800 }) + `<path d="M${x + w - 80} ${SY + 456 + i * 50} h40" stroke="#c9c4bf" stroke-width="10" stroke-linecap="round"/>`).join(''));
  s += blk(t, 3.6, x + 16, SY + 610, w - 32, 120, `<rect x="${x + 16}" y="${SY + 610}" width="${(w - 48) / 2}" height="120" rx="18" fill="#dff5ee"/><path d="M${x + 16} ${SY + 670} H${x + 16 + (w - 48) / 2} M${x + 90} ${SY + 610} V${SY + 730}" stroke="#fff" stroke-width="14"/><circle cx="${x + 130}" cy="${SY + 660}" r="16" fill="${C.red}"/>` + `<rect x="${x + 32 + (w - 48) / 2}" y="${SY + 610}" width="${(w - 48) / 2}" height="120" rx="18" fill="#f3f2f2"/>` + W.T('Tue–Sat', x + 48 + (w - 48) / 2, SY + 660, 30, C.ink, { a: 'start' }) + W.T('9–5', x + 48 + (w - 48) / 2, SY + 700, 30, '#9a948f', { a: 'start' }));
  // text types in ("we write the text")
  if (t > 4.3) { const n = Math.floor(seg(t, 4.3, 5.2) * 28); const txt = 'Gentle grooming, happy pets.'.slice(0, n); s += W.T(txt, x + 20, SY + 780, 27, C.ink, { a: 'start', w: 800, ls: -.5 }) + (t < 5.3 && (t * 4) % 1 > .5 ? `<rect x="${x + 22 + n * 14.2}" y="${SY + 756}" width="4" height="30" fill="${C.ink}"/>` : ''); }
  if (t > 5.0) s += W.pop(x + w - 60, SY + 800, eb(seg(t, 5.0, 5.3)), W.icon.chat(x + w - 60, SY + 800, .8));
  return s;
}
function poodle(x, y, k) { // pom-poms on the groomed cat
  if (k <= 0) return '';
  const p = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${f(r * k)}" fill="#f6f1ea" stroke="#d9d2c8" stroke-width="4"/>`;
  return p(x + 5, y - 300, 46) + p(x + 130, y - 210, 30) + p(x - 30, y - 20, 24) + p(x + 40, y - 20, 24);
}
module.exports = {
  dur: DUR,
  frame(t) {
    let s = salon(t);
    s += W.phone(PX, PY, PW, PH, `<rect x="${SX}" y="${SY}" width="${SW}" height="${PH - 100}" fill="#fff"/>` + site(t));
    // the button's escape: drops at 1.3, bounces off the cat, caught by the groomer
    if (t >= 1.3 && t < 2.4) {
      let bx, by, rot;
      if (t < 1.6) { const k = seg(t, 1.3, 1.6); bx = 640 - 200 * k; by = 300 + 600 * k * k; rot = -20 * k; }
      else if (t < 2.0) { const k = seg(t, 1.6, 2.0); bx = 440 - 120 * k; by = 900 - Math.sin(k * Math.PI) * 160 + 120 * k; rot = -20 - 200 * k; }
      else { const k = seg(t, 2.0, 2.4); bx = 320 + 460 * eo(k); by = 1020 - 200 * eo(k); rot = -220 + 220 * k; }
      s += `<g transform="translate(${f(bx)} ${f(by)}) rotate(${f(rot)})"><rect x="-200" y="-42" width="400" height="84" rx="42" fill="${C.red}"/>` + W.T('Book a groom', 0, 13, 38, '#fff') + `</g>`;
    }
    // the cat on the table: hisses after the bonk, poofs into a poodle cut later
    const hiss = t > 1.6 && t < 2.6;
    const groomed = t >= POOF;
    s += Ch.cat(360, G - 260, t, { dir: 1, s: 1, pose: hiss ? 'hiss' : 'sit', mood: groomed ? 'grumpy' : 'grumpy', col: groomed ? '#d8cfc4' : '#6f6a66' });
    s += poodle(360, G - 260, eb(seg(t, POOF + 0.2, POOF + 0.6)));
    if (t > 1.6 && t < 2.3) s += Ch.impact(380, 840, seg(t, 1.6, 2.3), 'BOING!', { r: 90 });
    if (t > POOF - 0.2 && t < POOF + 0.5) { const k = seg(t, POOF - 0.2, POOF + 0.5); s += `<g opacity="${f(1 - k)}">` + [0, 1, 2, 3, 4, 5].map(i => `<circle cx="${f(360 + Math.cos(i) * 120 * (0.5 + k))}" cy="${f(G - 400 + Math.sin(i * 2) * 100 * (0.5 + k))}" r="${f(90 - 30 * k)}" fill="#fff"/>`).join('') + `</g>`; }
    // groomer
    let gp = 'idle', gm = 'smile';
    if (t < 1.3) { gp = 'celebrate'; gm = 'grin'; }
    else if (t < 2.0) { gp = 'panic'; gm = 'shock'; }
    else if (t < 2.4) { gp = 'reach'; gm = 'grit'; }
    else if (t < 4.3) { gp = 'point'; gm = 'grin'; }
    else if (t < POOF - 0.3) { gp = 'thumbs'; gm = 'happy'; }
    else if (t < POOF + 0.6) { gp = 'reach'; gm = 'grin'; }
    else if (t < 10.4) { gp = 'shrug'; gm = 'grin'; }
    else { gp = 'dance'; gm = 'grin'; }
    s += Ch.person(150, G, t, { ...groomer, pose: gp, mood: gm, eyesOpen: 1, ph: .3 });
    // customer walks in, books, then laughs at the cat
    if (t > 5.3) {
      const x = S.tw(t, 5.3, 5.8, 1250, 935);
      const cp = t < 5.8 ? 'walk' : t < 6.2 ? 'tap' : t < 10.4 ? 'celebrate' : 'dance';
      s += Ch.person(x, G, t, { ...cust, dir: -1, pose: cp, mood: t < 6.2 ? 'smile' : 'grin', eyesOpen: 1 });
    }
    if (t > 7.0 && t < 8.2) s += Ch.bubble(250, 770, 'Looking sharp!', seg(t, 7.0, 7.2), { tail: 0, size: 44 });
    if (t > 8.4 && t < 9.6) s += Ch.bubble(250, 770, '...', seg(t, 8.4, 8.6), { tail: 0, size: 60 });
    if (t > 10.4) s += confetti(540, 900, 10.4, t, 40);
    // headlines
    if (t < 4.3) s += S.head(t, -2, 'Building a site for | a *pet* *groomer* (demo)', { col: C.ink, acc: '#8a5cf5' });
    else if (t < POOF) s += S.head(t, 4.3, 'We *write* *the* *text* | for you.', { col: C.ink, acc: '#8a5cf5' });
    else if (t < 10.6) s += S.head(t, POOF, 'Booked. | *Groomed.*', { col: C.ink, acc: '#8a5cf5', size: 92 });
    else s += S.tag(t, 10.6, 'Websites from £655', '', { y: 345, w: 860, s1: 70, bg: '#8a5cf5' });
    s += S.endOnly(t, END, 'paper');
    return s;
  },
};
