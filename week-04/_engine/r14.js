// CARTOON 3 · Old website → new website. Hook formula: "Expectation vs reality" — customers stroll up to a giant phone; the BOOK button falls off.
const { C, clamp, seg, eo, eb, f, sparkle, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.5, FIX = 7.45;
const G = 1490;
const PX = 560, PY = 500, PW = 460, PH = 980; // giant phone
const SX = PX + 24, SY = PY + 70, SW = PW - 48, SH = PH - 110; // screen

const c1 = { skin: SKIN[1], hair: 'short', hairCol: HAIR.dark, top: '#4a6fa5', bottom: '#2f3a4a', collar: 1, acc: { glasses: 1, tie: C.red }, blinkPh: .2 };
const c2 = { female: true, hair: 'long', hairCol: HAIR.black, skin: SKIN[3], top: C.red, bottom: '#283a5a', blinkPh: 1.3 };
const c3 = { hair: 'bald', hairCol: HAIR.grey, skin: SKIN[0], top: '#2f9e8f', longSleeves: 1, bottom: '#5b4a3a', acc: { beard: 1 }, blinkPh: 2.1 };
const own = { hair: 'curly', hairCol: HAIR.black, skin: SKIN[4], top: C.peach, bottom: C.ink, acc: { apron: C.ink }, blinkPh: .7 };

function stage(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/>`;
  for (let x = 0; x <= 1080; x += 90) s += `<path d="M${x} 0 V${G}" stroke="#e6e3e0" stroke-width="3"/>`;
  for (let y = 0; y <= G; y += 90) s += `<path d="M0 ${y} H1080" stroke="#e6e3e0" stroke-width="3"/>`;
  s += `<rect y="${G}" width="1080" height="${1920 - G}" fill="#ffd9c7"/><rect y="${G}" width="1080" height="12" fill="${C.peach}"/>`;
  return s;
}
function phoneFrame(inner) {
  return `<rect x="${PX + 18}" y="${PY + 22}" width="${PW}" height="${PH}" rx="70" fill="#000" opacity=".12"/><rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="70" fill="${C.ink}"/><rect x="${PX + PW / 2 - 60}" y="${PY + 26}" width="120" height="24" rx="12" fill="#3a3735"/>` +
    `<clipPath id="scr"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="30"/></clipPath><g clip-path="url(#scr)">${inner}</g>`;
}
// the ancient website
function oldSite(t, o = {}) {
  let s = `<rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" fill="#c0c0c0"/>`;
  for (let y = SY; y < SY + SH; y += 40) for (let x = SX + ((y / 40) % 2) * 20; x < SX + SW; x += 40) s += `<rect x="${x}" y="${y}" width="20" height="20" fill="#b4b4b4"/>`;
  const blink = Math.sin(t * 9) > 0;
  const cols = ['#0000ee', '#ee0000', '#008800', '#cc00cc'];
  ['WELCOME', 'TO OUR', 'WEB SITE!!!'].forEach((w, i) => s += `<text x="${SX + SW / 2}" y="${SY + 70 + i * 52}" font-family="Archivo" font-weight="800" font-style="italic" font-size="48" fill="${cols[(i + Math.floor(t * 4)) % 4]}" text-anchor="middle">${w}</text>`);
  // marquee
  const mx = SX + SW - ((t * 220) % (SW + 520));
  s += `<rect x="${SX}" y="${SY + 210}" width="${SW}" height="54" fill="#000080"/><text x="${f(mx)}" y="${SY + 248}" font-family="JB" font-weight="700" font-size="30" fill="#ffff00">*** NEW!!! *** OPEN 9-5 *** NEW!!!</text>`;
  // under construction
  let st = ''; for (let i = -2; i < 14; i++) st += `<path d="M${SX + i * 40} ${SY + 290} l40 0 l-30 60 l-40 0 Z" fill="#111"/>`;
  s += `<rect x="${SX}" y="${SY + 290}" width="${SW}" height="60" fill="#ffd400"/>${st}`;
  s += `<rect x="${SX + 40}" y="${SY + 300}" width="${SW - 80}" height="40" fill="#ffd400"/><text x="${SX + SW / 2}" y="${SY + 331}" font-family="Archivo" font-weight="900" font-size="28" fill="#111" text-anchor="middle">UNDER CONSTRUCTION</text>`;
  // broken image + counter
  s += `<rect x="${SX + 40}" y="${SY + 380}" width="160" height="130" fill="#ddd" stroke="#888" stroke-width="4"/><path d="M${SX + 60} ${SY + 400} l120 90 M${SX + 180} ${SY + 400} l-120 90" stroke="#e00" stroke-width="6"/>`;
  s += `<text x="${SX + 230}" y="${SY + 420}" font-family="JB" font-weight="700" font-size="24" fill="#333">Visitors:</text><rect x="${SX + 228}" y="${SY + 436}" width="150" height="44" fill="#000"/><text x="${SX + 238}" y="${SY + 468}" font-family="JB" font-weight="700" font-size="30" fill="#3f3">${o.count || '000127'}</text>`;
  s += `<text x="${SX + SW / 2}" y="${SY + 560}" font-family="JB" font-weight="700" font-size="22" fill="#444" text-anchor="middle">best viewed in 800x600</text>`;
  if (blink) s += `<text x="${SX + SW / 2}" y="${SY + 620}" font-family="Archivo" font-weight="900" font-size="34" fill="#ee0000" text-anchor="middle">Click here 2 book!!</text>`;
  // BOOK button slot (button drawn separately so it can fall off)
  s += `<rect x="${SX + 66}" y="${SY + 660}" width="${SW - 132}" height="96" fill="#9a9a9a" opacity="${o.btnGone ? 1 : 0}"/>`;
  if (o.loading !== undefined) {
    s += `<rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" fill="#fff" opacity=".86"/>`;
    s += `<text x="${SX + SW / 2}" y="${SY + 420}" font-family="Archivo" font-weight="900" font-size="46" fill="#333" text-anchor="middle">Loading...</text>`;
    s += `<rect x="${SX + 50}" y="${SY + 450}" width="${SW - 100}" height="40" fill="#fff" stroke="#333" stroke-width="4"/><rect x="${SX + 54}" y="${SY + 454}" width="${f((SW - 108) * o.loading / 100)}" height="32" fill="#0a0"/>`;
    s += `<text x="${SX + SW / 2}" y="${SY + 540}" font-family="JB" font-weight="700" font-size="34" fill="#333" text-anchor="middle">${Math.floor(o.loading)}%</text>`;
    // spinner
    let sp = ''; for (let i = 0; i < 8; i++) { const a = i * 45 + t * 200; sp += `<circle cx="${f(SX + SW / 2 + Math.cos(a * Math.PI / 180) * 36)}" cy="${f(SY + 310 + Math.sin(a * Math.PI / 180) * 36)}" r="8" fill="#333" opacity="${f((i + 1) / 8)}"/>`; }
    s += sp;
  }
  return s;
}
function bookBtn(x, y, rot, s = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s)})"><rect x="-140" y="-44" width="280" height="88" fill="#d4d0c8" stroke="#fff" stroke-width="6"/><path d="M-140 44 H140 V-44" stroke="#555" stroke-width="6" fill="none"/><text x="0" y="16" font-family="Archivo" font-weight="900" font-size="44" fill="#000" text-anchor="middle">BOOK</text></g>`;
}
// the new demo site
function newSite(t, a) {
  const lt = t - a;
  let s = `<rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" fill="#fff"/>`;
  s += `<rect x="${SX}" y="${SY}" width="${SW}" height="90" fill="${C.ink}"/><text x="${SX + 30}" y="${SY + 60}" font-family="Archivo" font-weight="900" font-size="38" fill="#fff" letter-spacing="-1">Your Salon</text>`;
  s += S.demo(SX + SW - 172, SY + 22, C.red);
  s += `<text x="${SX + 30}" y="${SY + 170}" font-family="Archivo" font-weight="900" font-size="58" fill="${C.ink}" letter-spacing="-2">Book a</text><text x="${SX + 30}" y="${SY + 228}" font-family="Archivo" font-weight="900" font-size="58" fill="${C.red}" letter-spacing="-2">haircut.</text>`;
  const step = t < 8.9 ? 0 : t < 9.4 ? 1 : t < 9.9 ? 2 : 3;
  // step 1: service
  const rows = ['Haircut', 'Cut + beard', 'Kids cut'];
  rows.forEach((r, i) => {
    const y = SY + 270 + i * 86, on = step >= 1 && i === 0;
    s += `<rect x="${SX + 30}" y="${y}" width="${SW - 60}" height="70" rx="20" fill="${on ? '#ffe2d6' : C.paper}" stroke="${on ? C.red : 'none'}" stroke-width="5"/><text x="${SX + 56}" y="${y + 46}" font-family="Archivo" font-weight="800" font-size="32" fill="${C.ink}">${r}</text>`;
    if (on) s += `<circle cx="${SX + SW - 66}" cy="${y + 35}" r="18" fill="${C.red}"/><path d="M${SX + SW - 74} ${y + 35} l6 6 l11 -12" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  });
  // step 2: time chips
  ['Sat 10:00', 'Sat 11:30'].forEach((c, i) => {
    const x = SX + 30 + i * 190, y = SY + 540, on = step >= 2 && i === 0;
    s += `<rect x="${x}" y="${y}" width="172" height="66" rx="33" fill="${on ? C.red : C.paper}"/><text x="${x + 86}" y="${y + 43}" font-family="Archivo" font-weight="800" font-size="29" fill="${on ? '#fff' : C.ink}" text-anchor="middle">${c}</text>`;
  });
  // step 3: book button / confirmation
  const by = SY + 650;
  if (step < 3) s += `<rect x="${SX + 30}" y="${by}" width="${SW - 60}" height="96" rx="48" fill="${C.red}"/><text x="${SX + SW / 2}" y="${by + 62}" font-family="Archivo" font-weight="900" font-size="44" fill="#fff" text-anchor="middle">Book now</text>`;
  else { const k = eb(seg(t, 9.9, 10.2)); s += `<g transform="translate(${SX + SW / 2} ${by + 48}) scale(${f(k)})"><rect x="${-(SW - 60) / 2}" y="-48" width="${SW - 60}" height="96" rx="48" fill="${C.green}"/><text x="0" y="14" font-family="Archivo" font-weight="900" font-size="44" fill="#fff" text-anchor="middle">Booked ✓</text></g>`; }
  // swipe-in reveal
  const rk = eo(seg(lt, 0, 0.4));
  return `<g transform="translate(0 ${f((1 - rk) * SH)})">${s}</g>`;
}
function tumbleweed(x, y, t) {
  let g = `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(-t * 400)})">`;
  for (let i = 0; i < 6; i++) g += `<ellipse cx="0" cy="0" rx="58" ry="${22 + i * 6}" fill="none" stroke="#a07848" stroke-width="6" transform="rotate(${i * 30})"/>`;
  return g + `</g>`;
}
function tapNum(n, x, y, k) {
  if (k <= 0 || k >= 1) return '';
  const sc = eb(seg(k, 0, 0.3)), op = 1 - seg(k, 0.7, 1);
  return `<g opacity="${f(op)}" transform="translate(${x} ${f(y - 60 * k)}) scale(${f(sc)})"><circle r="56" fill="${C.ink}"/><text y="26" font-family="Archivo" font-weight="900" font-size="74" fill="#fff" text-anchor="middle">${n}</text></g>`;
}

function before(t) {
  let s = stage(t);
  // signpost to the shop next door (left)
  s += `<rect x="70" y="1150" width="18" height="340" fill="#7a4b2f"/><path d="M20 1150 H220 L250 1185 L220 1220 H20 Z" fill="#7a4b2f"/><text x="120" y="1196" font-family="Archivo" font-weight="900" font-size="30" fill="#fff" text-anchor="middle">← NEXT DOOR</text>`;
  const loading = t >= 2.95 ? Math.min(2, (t - 2.95) * 0.5) + 1 : undefined;
  s += phoneFrame(oldSite(t, { btnGone: t >= 1.85, loading, count: t > 6.3 ? '000128' : '000127' }));
  s += S.demo(PX + PW / 2 - 75, PY + PH - 44, C.red);
  // BOOK button: wobble, pop off, fall on c1's head, then lie on the floor
  const bx0 = SX + SW / 2, by0 = SY + 708;
  if (t < 1.85) s += bookBtn(bx0, by0, t > 1.4 ? Math.sin(t * 50) * 6 * seg(t, 1.4, 1.8) : 0);
  // c1
  let c1x = S.tw(t, 0, 1.2, 230, 470, k => k), c1p = t < 1.2 ? 'walk' : 'idle', c1m = 'smile', c1r = 0, c1sq = 1, c1d = 1;
  if (t >= 1.25 && t < 1.85) { c1p = 'reach'; c1m = 'grin'; }
  if (t >= 2.2) { c1m = 'dizzy'; c1p = 'idle'; c1sq = 1 - 0.3 * Math.exp(-(t - 2.2) * 8) * Math.cos((t - 2.2) * 28); c1x = 470 - 170 * eo(seg(t, 2.3, 2.8)); }
  if (t >= 5.1) { c1p = 'walk'; c1d = -1; c1x = 300 - 650 * seg(t, 5.1, 6.4); }
  if (t >= 1.85 && t < 2.2) {
    const k = seg(t, 1.85, 2.2);
    s += bookBtn(bx0 + (480 - bx0) * k, by0 - Math.sin(k * Math.PI) * 260 + (1060 - by0) * k, -200 * k, 0.75);
  } else if (t >= 2.2 && t < 7) {
    const k = seg(t, 2.2, 2.6);
    s += bookBtn(480 - 230 * k, 1060 + (G - 30 - 1060) * eo(k), -200 - 160 * k, 0.75);
  }
  // c2: walks in, steps up, taps, yawns, falls asleep and keels over
  let c2x = S.tw(t, 0, 1.2, 80, 300, k => k), c2p = t < 1.2 ? 'walk' : 'idle', c2m = 'smile', c2r = 0, c2tilt = 0, c2y = G;
  if (t >= 2.45) { c2x = 300 + 160 * eo(seg(t, 2.45, 2.85)); c2p = t < 2.85 ? 'walk' : 'idle'; }
  if (t >= 2.85 && t < 3.15) { c2p = 'tap'; c2m = 'flat'; }
  if (t >= 3.15) { c2m = 'tired'; }
  if (t >= 3.6 && t < 4.3) { c2p = 'yawn'; c2m = 'yawn'; }
  if (t >= 4.3) { c2m = 'sleep'; c2tilt = 18; c2p = 'idle'; }
  if (t >= 4.7) { const k = eo(seg(t, 4.7, 5.2)); c2r = -90 * k; c2y = G + 150 * k; c2x = 460 + 40 * k; }
  // c3: walks in, waits, checks, gives up and walks off to the shop next door
  let c3x = S.tw(t, 0, 1.2, -80, 140, k => k), c3p = t < 1.2 ? 'walk' : 'idle', c3m = 'smile', c3d = 1;
  if (t >= 2.2) c3m = 'shock';
  if (t >= 3.4) { c3p = 'shrug'; c3m = 'flat'; }
  if (t >= 4.4) { c3p = 'walk'; c3d = -1; c3m = 'grumpy'; c3x = 140 - 500 * seg(t, 4.4, 5.6); }
  if (t < 5.7) s += Ch.person(c3x, G, t, { ...c3, pose: c3p, mood: c3m, dir: c3d, talk: t > 3.5 && t < 4.3 });
  s += Ch.person(c2x, c2y, t, { ...c2, pose: c2p, mood: c2m, rot: c2r, headTilt: c2tilt, shadow: c2r === 0 });
  if (t >= 4.3) s += Ch.zzz(c2r < -45 ? 300 : 470, c2r < -45 ? 1450 : 1060, t, C.ink, 0.9);
  if (t < 6.5) s += Ch.person(c1x, G, t, { ...c1, pose: c1p, mood: c1m, dir: c1d, squash: c1sq, eyesOpen: 1 });
  if (t >= 2.2 && t < 5.2) s += Ch.stars(c1x + 6, 1035, t, { r: 60 });
  s += Ch.impact(330, 690, seg(t, 2.2, 2.9), 'BONK!', { r: 110 });
  if (t > 3.5 && t < 4.3) s += Ch.bubble(200, 900, 'Nope.', seg(t, 3.5, 3.7), { tail: -40, size: 52 });
  // tumbleweed across the empty floor
  if (t > 5.9) { const k = seg(t, 5.9, 7.4), x = 1150 - 1400 * k; s += tumbleweed(x, G - 60 - Math.abs(Math.sin(k * 12)) * 60 - (x > 0 && x < 380 ? Math.sin((x / 380) * Math.PI) * 200 : 0), t); }
  if (t < 1.85) s += S.head(t, -2, 'Expectation: | *book* *in* *seconds.*', { col: C.ink, acc: C.red });
  else s += S.head(t, 1.85, '*Reality:*', { col: C.ink, acc: C.red, size: 110 });
  return s;
}

function after(t) {
  let s = stage(t);
  const swap = 8.15;
  s += phoneFrame(t < swap ? oldSite(t, { btnGone: true }) : oldSite(t, { btnGone: true }) + newSite(t, swap));
  // owner runs in and swaps the site
  let ox = S.tw(t, FIX, FIX + 0.55, -200, 450), op = t < FIX + 0.5 ? 'run' : t < FIX + 0.7 ? 'skid' : t < 8.4 ? 'tap' : 'wave', od = 1;
  if (t >= 8.25) { ox = S.tw(t, 8.25, 8.75, 450, 135); op = t < 8.75 ? 'walk' : 'wave'; od = t < 8.75 ? -1 : 1; }
  if (t >= 10.1) op = 'dance';
  // customers come back
  const cx1 = S.tw(t, 8.3, 8.8, -200, 470), cx2 = S.tw(t, 8.35, 8.9, -320, 330), cx3 = S.tw(t, 8.4, 9.0, -440, 190);
  const tapping = t >= 8.8 && t < 10.0;
  const dancing = t >= 10.1;
  s += Ch.person(ox, G, t, { ...own, pose: op, mood: dancing ? 'grin' : 'smile', eyesOpen: 1, dir: od, ph: 1.3 });
  s += Ch.person(cx3, G, t, { ...c3, pose: dancing ? 'celebrate' : t < 9.0 ? 'run' : 'idle', mood: dancing ? 'grin' : 'smile', eyesOpen: 1, ph: .4 });
  s += Ch.person(cx2, G, t, { ...c2, pose: dancing ? 'dance' : t < 8.9 ? 'run' : 'idle', mood: dancing ? 'grin' : 'smile', eyesOpen: 1, ph: .9 });
  s += Ch.person(cx1, G, t, { ...c1, pose: dancing ? 'dance' : t < 8.8 ? 'run' : tapping ? 'reach' : 'idle', mood: dancing || t > 9.9 ? 'grin' : 'smile', eyesOpen: 1, limbs: tapping ? { sa: t < 9.4 ? 128 : 118, ea: 0 } : undefined });
  if (t < 8.8) { s += Ch.speedLines(cx1, G - 130, 1, t, { col: '#c9c4bf' }); }
  if (ox > 600) s += ''; // owner beside the phone, in front
  if (t < FIX + 0.5) s += Ch.speedLines(ox, G - 130, 1, t, { col: '#c9c4bf' });
  // tap counters
  s += tapNum(1, 1010, 880, seg(t, 8.9, 9.5)) + tapNum(2, 1010, 1140, seg(t, 9.4, 10.0)) + tapNum(3, 1010, 1270, seg(t, 9.9, 10.5));
  if (dancing) s += confetti(540, 700, 10.1, t, 46);
  if (t >= 11.0) s += S.tag(t, 11.0, 'Websites from £655', '', { y: 345, w: 860, s1: 70 });
  if (t < 11.0) s += S.head(t, FIX + 0.15, 'Booking in | *3* *taps.*', { col: C.ink, acc: C.red, size: 92 });
  return s;
}

module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < FIX ? before(t) : after(t);
    s += S.wipe(t, FIX, C.ink, 0.45);
    s += S.endOnly(t, END, 'paper');
    return s;
  },
};
