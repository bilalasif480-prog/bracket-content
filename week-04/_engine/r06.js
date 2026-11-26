// WEEK-04 06 · Can't find the barber → local SEO. Hook formula: "Challenge question" — "Will he find the café?" over a sprinting customer.
const { C, clamp, seg, eo, eb, f } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.6, FIX = 7.45, BONK = 5.0;
const G = 1490;        // pavement ground line
const DOOR = 590;      // café door centre x
const DOORG = 1330;    // doorway floor
const POLE = 165;

const runner = { skin: SKIN[1], hair: 'short', hairCol: HAIR.brown, top: '#ff8360', bottom: '#2f3a4a', acc: { cap: C.red, phone: '#9fd3ff' }, blinkPh: .3 };
const owner = { female: true, hair: 'bun', hairCol: HAIR.black, skin: SKIN[3], top: '#1fa86b', bottom: '#2f3a4a', acc: { apron: '#3b4350', earrings: 1 }, blinkPh: 1.1 };
const p1 = { female: true, hair: 'long', hairCol: HAIR.blond, skin: SKIN[0], top: '#ffc23c', longSleeves: 1, bottom: '#3b3b3b', skirt: true, legs: '#3b3b3b', acc: { phone: '#9fd3ff' }, blinkPh: 2.2 };
const p2 = { hair: 'spiky', hairCol: HAIR.black, skin: SKIN[2], top: '#8a5cf5', longSleeves: 1, bottom: '#283a5a', acc: { headphones: '#201e1d', phone: '#9fd3ff' }, blinkPh: .8 };

function street(t) {
  let s = `<rect width="1080" height="1920" fill="#d9ecf7"/>`;
  s += `<circle cx="900" cy="560" r="80" fill="#ffd9a0"/>`;
  for (let i = 0; i < 3; i++) { const x = ((i * 420 + t * 30) % 1500) - 200, y = 480 + i * 40; s += `<g fill="#fff"><ellipse cx="${f(x)}" cy="${y}" rx="90" ry="34"/><ellipse cx="${f(x + 60)}" cy="${y - 20}" rx="60" ry="36"/></g>`; }
  // left shop (phones)
  s += `<rect x="-40" y="660" width="345" height="660" fill="#6f87a8"/><rect x="-40" y="660" width="345" height="40" fill="#5b7192"/>`;
  s += `<rect x="10" y="700" width="250" height="80" rx="8" fill="${C.ink}"/><text x="135" y="755" font-family="Archivo" font-weight="900" font-size="46" fill="#fff" text-anchor="middle">PHONES</text>`;
  s += `<rect x="20" y="900" width="230" height="300" rx="8" fill="#bcd3ea"/><rect x="20" y="1200" width="230" height="16" fill="#5b7192"/>`;
  // café
  s += `<rect x="320" y="600" width="540" height="720" fill="#fff4e6"/><rect x="320" y="600" width="540" height="34" fill="#e8d9c4"/>`;
  s += `<rect x="400" y="660" width="380" height="96" rx="12" fill="${C.ink}"/><text x="590" y="733" font-family="Archivo" font-weight="900" font-size="62" fill="#fff" text-anchor="middle" letter-spacing="2">BARBER</text>`;
  // awning stripes
  let aw = ''; for (let i = 0; i < 9; i++) aw += `<path d="M${330 + i * 58} 790 h58 v70 q-29 26 -58 0 Z" fill="${i % 2 ? '#fff' : C.red}"/>`;
  s += aw;
  s += `<rect x="350" y="900" width="160" height="230" rx="8" fill="#ffe9c9" stroke="#c9a77a" stroke-width="6"/><g stroke="#3a2a20" stroke-width="8" fill="none"><circle cx="405" cy="1050" r="20"/><circle cx="455" cy="1050" r="20"/><path d="M418 1035 L470 960 M442 1035 L390 960"/></g><rect x="350" y="1100" width="160" height="12" fill="#c9a77a"/>`;
  s += `<rect x="520" y="980" width="140" height="340" rx="6" fill="#3a2a20"/>`; // open door
  { let st = ''; const o = (t * 60) % 40; for (let i = -2; i < 8; i++) st += `<path d="M843 ${f(1110 + i * 40 - o)} l34 -24 v18 l-34 24 Z" fill="${C.red}"/>`; s += `<clipPath id="bp"><rect x="843" y="1000" width="34" height="200" rx="17"/></clipPath><rect x="843" y="1000" width="34" height="200" rx="17" fill="#fff"/><g clip-path="url(#bp)">${st}</g><rect x="837" y="988" width="46" height="16" rx="8" fill="#3b4350"/><rect x="837" y="1196" width="46" height="16" rx="8" fill="#3b4350"/>`; }
  s += `<rect x="676" y="900" width="160" height="230" rx="8" fill="#ffe9c9" stroke="#c9a77a" stroke-width="6"/><text x="756" y="1040" font-family="Archivo" font-weight="900" font-size="40" fill="${C.red}" text-anchor="middle" transform="rotate(-6 756 1040)">OPEN</text>`;
  // right shop (laundrette)
  s += `<rect x="880" y="700" width="260" height="620" fill="#b8a3d9"/><rect x="900" y="780" width="200" height="70" rx="8" fill="${C.ink}"/><text x="1000" y="828" font-family="Archivo" font-weight="900" font-size="34" fill="#fff" text-anchor="middle">LAUNDRY</text>`;
  s += `<rect x="910" y="900" width="170" height="300" rx="8" fill="#e5dcf3"/><circle cx="960" cy="1060" r="34" fill="#fff" stroke="#8a78ad" stroke-width="8"/><circle cx="1040" cy="1060" r="34" fill="#fff" stroke="#8a78ad" stroke-width="8"/>`;
  // pavement + road
  s += `<rect y="1320" width="1080" height="260" fill="#cfc9c2"/>`;
  for (let x = 0; x < 1080; x += 135) s += `<path d="M${x} 1320 v260" stroke="#bdb6ae" stroke-width="4"/>`;
  s += `<rect y="1580" width="1080" height="340" fill="#4a4a4f"/><rect y="1580" width="1080" height="16" fill="#9a948f"/>`;
  return s;
}
function lamppost(t, wob = 0) {
  const TY = 850;
  return `<g transform="rotate(${f(wob)} ${POLE} ${G + 10})"><rect x="${POLE - 14}" y="${TY}" width="28" height="${G + 10 - TY}" rx="10" fill="#3b4350"/><rect x="${POLE - 26}" y="${G - 30}" width="52" height="40" rx="10" fill="#3b4350"/><path d="M${POLE} ${TY + 10} q0 -50 60 -50 h20" stroke="#3b4350" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M${POLE + 58} ${TY - 38} h70 l-14 40 h-42 Z" fill="#3b4350"/><ellipse cx="${POLE + 93}" cy="${TY + 6}" rx="24" ry="8" fill="#ffe7a0"/></g>`;
}
function mapCard(t, a, b, fixed) {
  if (t < a || t > b) return '';
  const k = eb(seg(t, a, a + 0.35)) * (1 - eo(seg(t, b - 0.25, b)));
  const x = 640, y = 470, w = 410, h = 400;
  let g = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="${C.ink}"/><rect x="${x + 14}" y="${y + 14}" width="${w - 28}" height="${h - 28}" rx="24" fill="#eef3e6"/>`;
  g += `<clipPath id="mc"><rect x="${x + 14}" y="${y + 14}" width="${w - 28}" height="${h - 28}" rx="24"/></clipPath><g clip-path="url(#mc)">`;
  g += `<path d="M${x} ${y + 150} H${x + w} M${x} ${y + 290} H${x + w} M${x + 120} ${y} V${y + h} M${x + 290} ${y} V${y + h}" stroke="#fff" stroke-width="26"/>`;
  g += `<rect x="${x + 150}" y="${y + 180}" width="110" height="80" rx="10" fill="#cfe3c0"/>`;
  const pin = (px, py, col, sc = 1) => `<g transform="translate(${px} ${py}) scale(${sc})"><path d="M0 0 C-30 -36 -30 -70 0 -70 C30 -70 30 -36 0 0 Z" fill="${col}"/><circle cx="0" cy="-46" r="11" fill="#fff"/></g>`;
  g += pin(x + 60, y + 120, '#8a8f98', .8) + pin(x + 360, y + 110, '#8a8f98', .8) + pin(x + 350, y + 370, '#8a8f98', .8);
  g += `<circle cx="${x + 205}" cy="${y + 330}" r="16" fill="#2f7cf6" stroke="#fff" stroke-width="5"/>`;
  if (!fixed) g += `<circle cx="${x + 205}" cy="${y + 220}" r="${f(44 + 4 * Math.sin(t * 8))}" fill="none" stroke="${C.red}" stroke-width="6" stroke-dasharray="12 10"/><text x="${x + 205}" y="${y + 238}" font-family="Archivo" font-weight="900" font-size="52" fill="${C.red}" text-anchor="middle">?</text>`;
  else g += pin(x + 205, y + 250, C.red, 1.5 * eb(seg(t, a + 0.2, a + 0.6)));
  g += `</g>`;
  g += S.demo(x + 30, y + h - 74, C.red);
  g += `<text x="${x + 34}" y="${y + 60}" font-family="Archivo" font-weight="900" font-size="32" fill="${C.ink}">${fixed ? 'Barber · 2 min walk' : 'barber near me'}</text>`;
  return `<g transform="translate(${x + w / 2} ${y + h / 2}) scale(${f(k)}) translate(${-(x + w / 2)} ${-(y + h / 2)})">${g}</g>`;
}
// someone walking into the café door: fade + shrink as they enter
function enter(t, a, x, o) {
  if (t < a) return Ch.person(x, G, t, o);
  const k = seg(t, a, a + 0.35);
  if (k >= 1) return '';
  const xx = x + (DOOR - x) * eo(k);
  return `<g opacity="${f(1 - k)}">${Ch.person(xx, G - 150 * k, t, { ...o, s: 1 - 0.25 * k, pose: 'walk', dir: 1, shadow: false })}</g>`;
}

function before(t) {
  let s = street(t);
  // lamppost wobble after the bonk
  const wl = t > BONK ? 7 * Math.exp(-(t - BONK) * 4) * Math.sin((t - BONK) * 30) : 0;
  s += lamppost(t, wl);
  // owner in the doorway
  let op = 'wave2', om = 'shock', ot = false;
  if (t < 1.4) { op = 'wave2'; om = 'scream'; ot = true; }
  else if (t < 3.9) { op = t % 1.2 < 0.6 ? 'wave' : 'wave2'; om = 'talk'; ot = true; }
  else if (t < 4.5) { op = 'point'; om = 'flat'; }
  else if (t < BONK) { op = 'wave2'; om = 'scream'; ot = true; }
  else if (t < 5.7) { op = 'idle'; om = 'shock'; }
  else { op = 'facepalm'; om = 'sad'; }
  const odir = (t > 1.9 && t < 2.9) || (t > 4.3 && t < 5.7) ? -1 : 1;
  s += Ch.person(DOOR, DOORG, t, { ...owner, pose: op, mood: om, talk: ot, dir: odir, shadow: false, sweat: t > 2, handOverHead: op === 'facepalm' });
  // pigeon walks into the café (the only customer)
  if (t > 3.1 && t < 4.4) {
    const k = seg(t, 3.1, 4.1);
    const px = 1150 - (1150 - DOOR - 40) * k;
    s += `<g opacity="${f(1 - seg(t, 4.0, 4.3))}">${Ch.pigeon(px, G - 20 - 160 * seg(t, 3.9, 4.3), t, { dir: -1, pose: 'walk', s: 0.75 })}</g>`;
  }
  // passer-by 1 (right → left), passer-by 2 (left → right): both staring at phones
  if (t > 1.4 && t < 4.8) { const x = 1220 - 1420 * seg(t, 1.4, 4.7); s += Ch.person(x, G, t, { ...p1, pose: 'phone', dir: -1, mood: 'flat', speed: 0.9 }); }
  if (t > 2.0 && t < 5.2) { const x = -160 + 1420 * seg(t, 2.0, 5.1); s += Ch.person(x, G + 10, t, { ...p2, pose: 'phone', dir: 1, mood: 'smile', speed: 0.85 }); }
  // the runner: L→R sprint, then back R→L into the lamppost
  if (t < 1.45) {
    const x = 270 + 1000 * (t / 1.45);
    s += Ch.speedLines(x, G - 130, 1, t, { col: '#8a8f98' }) + Ch.person(x, G, t, { ...runner, pose: 'run', dir: 1, mood: 'flat', limbs: { sa: 30, ea: 80 }, sweat: 1 });
  } else if (t >= 3.95 && t < BONK) {
    const x = 1250 - (1250 - 255) * seg(t, 3.95, BONK);
    s += Ch.speedLines(x, G - 130, -1, t, { col: '#8a8f98' }) + Ch.person(x, G, t, { ...runner, pose: 'run', dir: -1, mood: 'flat', limbs: { sa: 30, ea: 80 }, sweat: 1 });
  } else if (t >= BONK) {
    const lt = t - BONK, k = eo(seg(lt, 0, 0.45));
    const x = 255 + 190 * k;
    s += Ch.person(x, G + 190 * k, t, { ...runner, acc: { cap: C.red }, pose: k < 1 ? 'air' : 'flat', dir: -1, rot: -90 * k, mood: lt < 0.15 ? 'shock' : 'dizzy', squash: lt < 0.12 ? 0.8 : 1, shadow: false });
    // phone flies up and lands on his face
    const pk = seg(lt, 0, 0.8);
    if (pk < 1) { const px = 230 + 420 * pk, py = 1100 - Math.sin(pk * Math.PI) * 420 + 260 * pk; s += `<g transform="translate(${f(px)} ${f(py)}) rotate(${f(lt * 900)})"><rect x="-26" y="-44" width="52" height="88" rx="10" fill="${C.ink}"/><rect x="-19" y="-36" width="38" height="68" rx="6" fill="#9fd3ff"/></g>`; }
    else s += `<g transform="translate(650 1362) rotate(-90)"><rect x="-26" y="-44" width="52" height="88" rx="10" fill="${C.ink}"/><rect x="-19" y="-36" width="38" height="68" rx="6" fill="#9fd3ff"/></g>`;
    if (lt > 0.3) s += Ch.stars(650, 1290, t, { r: 70 });
    s += Ch.impact(200, 1060, seg(t, BONK, BONK + 0.8), 'BONK!', { r: 140 });
  }
  // the runner's phone map: the café isn't on it
  s += mapCard(t, 0.9, 3.9, false);
  // owner's bubbles
  s += Ch.bubble(430, 590, 'Over here!!', t < 1.5 ? seg(t, 0.15, 0.35) : 0, { tail: 120, size: 50 });
  s += t > 1.9 && t < 2.9 ? Ch.bubble(380, 590, 'Haircut? Shave?', seg(t, 1.9, 2.1), { tail: 150, size: 48 }) : '';
  s += t > 4.05 && t < 4.5 ? Ch.bubble(400, 590, '...not you.', seg(t, 4.05, 4.2), { tail: 150, size: 48 }) : '';
  s += t > 4.5 && t < BONK ? Ch.bubble(430, 590, 'HERE!!!', seg(t, 4.5, 4.65), { tail: 120, size: 60, fill: C.red, col: '#fff' }) : '';
  s += t > 5.9 ? Ch.bubble(560, 590, 'So close...', seg(t, 5.9, 6.1), { tail: 20, size: 50 }) : '';
  s += S.head(t, -2, 'Will he find | the *barber?*', { col: C.ink, acc: C.red });
  return s;
}

function after(t) {
  let s = street(t) + lamppost(t);
  // giant pin drops onto the café roof
  const d = S.drop(t, FIX + 0.15, 0.35, 900);
  if (d) {
    const sq = d.landed < 0 ? 1.15 : d.squash;
    s += `<g transform="translate(590 ${f(600 - d.lift)}) scale(${f(1 + (1 - sq) * 0.8)} ${f(sq)})"><ellipse cx="0" cy="0" rx="60" ry="14" fill="#000" opacity=".15"/><path d="M0 0 C-95 -110 -95 -220 0 -220 C95 -220 95 -110 0 0 Z" fill="${C.red}" stroke="${C.ink}" stroke-width="8"/><circle cx="0" cy="-145" r="36" fill="#fff"/></g>`;
    if (d.landed > 0) { for (let i = 0; i < 6; i++) s += Ch.dust(590, 610, d.landed, { col: '#fff', n: 5, spread: 200 }); s += require('./lib').sparkle(470, 450, 24, t) + require('./lib').sparkle(720, 470, 20, t, 2); }
  }
  // runner gets up, checks the phone, walks into the café
  const up = seg(t, 8.35, 8.75);
  if (t < 8.35) s += Ch.person(445, G + 190, t, { ...runner, acc: { cap: C.red }, pose: 'flat', dir: -1, rot: -90, mood: 'dizzy', shadow: false }) + `<g transform="translate(650 1362) rotate(-90)"><rect x="-26" y="-44" width="52" height="88" rx="10" fill="${C.ink}"/><rect x="-19" y="-36" width="38" height="68" rx="6" fill="${t > 8.0 ? '#ffd23c' : '#9fd3ff'}"/></g>`;
  else if (t < 9.3) s += Ch.person(445, G + 190 * (1 - eo(up)), t, { ...runner, pose: t < 8.75 ? 'air' : 'phoneIdle', dir: 1, rot: -90 * (1 - eo(up)), mood: t < 8.9 ? 'shock' : 'grin', shadow: up >= 1 });
  else s += enter(t, 9.85, 445 + (DOOR - 445) * seg(t, 9.3, 9.85), { ...runner, pose: 'walk', dir: 1, mood: 'grin' });
  if (t > 8.75 && t < 9.4) s += Ch.bubble(445, 900, 'Oh! Right here!', seg(t, 8.8, 9.0), { tail: 0, size: 48 });
  // the two passers-by come back and go in
  if (t > 8.7) s += enter(t, 10.15, Math.min(DOOR - 10, -150 + 900 * seg(t, 8.7, 10.15)), { ...p1, pose: 'phone', dir: 1, mood: 'grin', speed: 1.1 });
  if (t > 9.0) s += enter(t, 10.55, Math.max(DOOR + 10, 1230 - 820 * seg(t, 9.0, 10.55)), { ...p2, pose: 'phone', dir: -1, mood: 'grin', speed: 1.1 });
  // owner hops out of the doorway and welcomes everyone
  const ox = S.tw(t, FIX + 0.6, FIX + 0.95, DOOR, 830);
  const oy = t < FIX + 0.6 ? DOORG : G + 10;
  s += Ch.person(ox, oy, t, { ...owner, pose: t < FIX + 0.6 ? 'idle' : t < FIX + 0.95 ? 'air' : t < 11.0 ? 'wave' : 'dance', mood: t < FIX + 0.6 ? 'shock' : 'grin', dir: -1, eyesOpen: 1, lift: t > FIX + 0.6 && t < FIX + 0.95 ? Math.sin(seg(t, FIX + 0.6, FIX + 0.95) * Math.PI) * 120 : 0 });
  // happy faces in the café window, then the pigeon at the door
  if (t > 11.2) {
    const k = eb(seg(t, 11.2, 11.5));
    s += `<clipPath id="cw"><rect x="350" y="900" width="160" height="180"/></clipPath><g clip-path="url(#cw)">`;
    s += Ch.head(395, 1090 - 70 * k, t, { ...runner, s: 0.6, mood: 'grin', acc: { cap: C.red } }) + Ch.head(470, 1095 - 70 * k, t, { ...p1, s: 0.55, mood: 'happy' });
    s += `</g>`;
  }
  if (t > 12.0) s += Ch.pigeon(700, G - 10, t, { dir: -1, pose: 'walk', s: 0.75 });
  s += mapCard(t, FIX + 0.4, 10.6, true);
  if (t >= 10.75) s += S.tag(t, 10.75, 'Local SEO from £325/month', '', { y: 880, w: 900, s1: 60 });
  s += S.head(t, FIX + 0.1, 'Get on the *map.*', { col: C.ink, acc: C.red, size: 92 });
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
