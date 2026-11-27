// MYSTERY R03 · "This plumber's phone rings all day. He's never answered once."
// Clues: phone buzzing in his toolbox, missed-call pile grows → flooded kitchen gives up, rival van zooms past.
// Twist: he's under sinks all day and his website is just a phone number (no prices, areas or quote form). Fix: Websites from £655.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const M = require('./mk');
const { SKIN, HAIR, INK } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 17.6, END = 15.9;
const C1 = 3.4, C2 = 6.5, TWIST = 9.5, FIX = 12.6;
const G = 1480;

const plumber = { hair: 'short', hairCol: HAIR.ginger, skin: SKIN[0], top: '#2f5fa8', bottom: '#2f5fa8', shoe: '#5b3a1f', acc: { cap: C.red, beard: 1 }, blinkPh: .3 };
const customer = { female: true, hair: 'pony', hairCol: HAIR.black, skin: SKIN[3], top: '#f2a3c4', bottom: '#7d6bb0', longSleeves: 1, acc: { earrings: 1, phone: '#bfe3f2' }, blinkPh: .8 };

// ---------- props ----------
function wrench(x, y, rot = 0, s = 1) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s)})"><rect x="-10" y="-10" width="120" height="22" rx="10" fill="#9aa3ad" stroke="${INK}" stroke-width="5"/><path d="M110 -26 a30 30 0 1 1 0 52 l0 -16 l14 0 l0 -20 l-14 0 Z" fill="#9aa3ad" stroke="${INK}" stroke-width="5"/></g>`;
}
// small ringing phone (lying flat-ish), shakes
function ringPhone(x, y, t, s = 1, o = {}) {
  const sh = o.still ? 0 : Math.sin(t * 70) * 7, rot = (o.rot ?? -8) + (o.still ? 0 : Math.sin(t * 55) * 4);
  let g = `<rect x="-50" y="-90" width="100" height="180" rx="18" fill="${INK}"/><rect x="-40" y="-74" width="80" height="148" rx="10" fill="${o.screen || '#25b864'}"/>`;
  g += W.icon.call(0, -14, .55, o.screen ? C.gold : '#fff').replace('fill="#fff"/></g>', `fill="${o.screen ? '#fff' : '#25b864'}"/></g>`);
  g += `<text x="0" y="52" font-family="Archivo" font-weight="900" font-size="20" fill="#fff" text-anchor="middle">RING</text>`;
  if (!o.still) for (let i = 0; i < 3; i++) { const p = (t * 2.5 + i / 3) % 1; g += `<path d="M${f(62 + p * 50)} ${f(-50 - p * 20)} q${f(26 + p * 20)} ${f(50 + p * 20)} 0 ${f(100 + p * 40)}" stroke="${C.red}" stroke-width="8" fill="none" stroke-linecap="round" opacity="${f(1 - p)}"/><path d="M${f(-62 - p * 50)} ${f(-50 - p * 20)} q${f(-26 - p * 20)} ${f(50 + p * 20)} 0 ${f(100 + p * 40)}" stroke="${C.red}" stroke-width="8" fill="none" stroke-linecap="round" opacity="${f(1 - p)}"/>`; }
  return `<g transform="translate(${f(x + sh)} ${f(y)}) rotate(${f(rot)}) scale(${f(s)})">${g}</g>`;
}
function kitchen(t, o = {}) {
  let s = W.room(t, { wall: o.wall || '#dff0f3', floor: o.floor || '#c9b8a6', pattern: 'tiles', pcol: 'rgba(0,0,0,.06)', fy: G - 40 });
  return s;
}
// sink cabinet with open doors (x0..x0+w, top at y0)
function sinkCab(t, x0 = 560, y0 = 1060, w = 480, o = {}) {
  const fy = G - 40;
  let s = `<rect x="${x0 - 20}" y="${y0 - 30}" width="${w + 40}" height="40" rx="10" fill="#e6e3e0" stroke="${INK}" stroke-width="5"/>`;
  // tap + sink basin on top
  s += `<path d="M${x0 + w / 2 - 20} ${y0 - 30} V${y0 - 150} Q${x0 + w / 2 - 20} ${y0 - 190} ${x0 + w / 2 + 40} ${y0 - 190} H${x0 + w / 2 + 70} V${y0 - 160}" stroke="#9aa3ad" stroke-width="22" fill="none" stroke-linecap="round"/>`;
  s += `<rect x="${x0}" y="${y0 + 10}" width="${w}" height="${fy - y0 - 10}" fill="#8f5c3b"/>`;
  s += `<rect x="${x0 + 40}" y="${y0 + 40}" width="${w - 80}" height="${fy - y0 - 40}" fill="#2b2420"/>`;
  // pipe inside (U-bend)
  s += `<path d="M${x0 + w / 2} ${y0 + 40} V${y0 + 150} Q${x0 + w / 2} ${y0 + 210} ${x0 + w / 2 + 60} ${y0 + 210} Q${x0 + w / 2 + 120} ${y0 + 210} ${x0 + w / 2 + 120} ${y0 + 150} V${y0 + 120} H${x0 + w - 40}" stroke="#c9ced4" stroke-width="26" fill="none"/>`;
  if (o.drip) for (let i = 0; i < 2; i++) { const p = (t * 1.6 + i * .5) % 1; s += `<path d="M${x0 + w / 2 + 60} ${f(y0 + 226 + p * 150)} q9 15 0 22 q-9 -7 0 -22 Z" fill="#7cc4ff" opacity="${f(1 - p * .6)}"/>`; }
  return s;
}
function cabDoors(x0 = 560, y0 = 1060, w = 480) {
  const fy = G - 40;
  // doors swung open (seen edge-on as thin slanted panels)
  return `<path d="M${x0 + 40} ${y0 + 40} L${x0 - 30} ${y0 + 70} L${x0 - 30} ${fy + 20} L${x0 + 40} ${fy}" fill="#a8714b" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M${x0 + w - 40} ${y0 + 40} L${x0 + w + 20} ${y0 + 70} L${x0 + w + 20} ${fy + 20} L${x0 + w - 40} ${fy}" fill="#a8714b" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
}
// plumber lying on his back, head inside the cabinet, legs out to the left (kicking)
function lyingPlumber(x, t, o = {}) {
  const k = Math.sin(t * (o.kick ?? 7));
  const limbs = { ha: 70 + 25 * k, ka: 90 + 30 * k, hb: 60 - 25 * k, kb: 80 - 30 * k, sa: 170, ea: 10, sb: 160, eb: 30, lean: 0, hop: 0, ground: false };
  return Ch.person(x, 1655, t, { ...plumber, pose: 'idle', limbs, rot: 90, shadow: false, mood: o.mood || 'grumpy', look: [0, -1] });
}
// toolbox (open) with a buzzing phone inside
function toolbox(x, y, t, ring = true) {
  let s = `<rect x="${x - 170}" y="${y - 150}" width="340" height="150" rx="14" fill="${C.red}" stroke="${INK}" stroke-width="6"/><rect x="${x - 170}" y="${y - 150}" width="340" height="34" fill="#b8240e"/>`;
  s += `<path d="M${x - 70} ${y - 150} V${y - 196} H${x + 70} V${y - 150}" stroke="${INK}" stroke-width="14" fill="none" stroke-linejoin="round"/>`;
  s += wrench(x - 150, y - 175, -20, .8) + `<rect x="${x + 60}" y="${y - 230}" width="26" height="90" rx="6" fill="#ffc23c" stroke="${INK}" stroke-width="4" transform="rotate(14 ${x + 73} ${y - 185})"/>`;
  if (ring) s += ringPhone(x, y - 200, t, .9);
  s += `<rect x="${x - 170}" y="${y - 120}" width="340" height="120" rx="14" fill="${C.red}" stroke="${INK}" stroke-width="6"/>` + `<rect x="${x - 40}" y="${y - 88}" width="80" height="26" rx="8" fill="#ffc23c" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
function missedCard(x, y, rot = 0) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><rect x="-160" y="-38" width="320" height="76" rx="22" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="-118" cy="0" r="22" fill="${C.red}"/><path d="M-128 -8 l20 16 m0 -16 l-20 16" stroke="#fff" stroke-width="6" stroke-linecap="round"/>${W.T('Missed call', -86, 12, 34, INK, { a: 'start', w: 900, ls: -1 })}</g>`;
}
function van(x, y, label, col = '#ffffff', tcol = INK) {
  return `<g transform="translate(${f(x)} ${f(y)})"><rect x="-200" y="-150" width="300" height="150" rx="16" fill="${col}" stroke="${INK}" stroke-width="6"/><path d="M100 -110 H160 Q190 -110 200 -70 V0 H100 Z" fill="${col}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M115 -96 H156 Q176 -96 184 -68 H115 Z" fill="#bfe3f2"/>${W.T(label, -50, -62, 40, tcol, { ls: -1 })}<circle cx="-120" cy="2" r="30" fill="${INK}"/><circle cx="-120" cy="2" r="12" fill="#9aa3ad"/><circle cx="130" cy="2" r="30" fill="${INK}"/><circle cx="130" cy="2" r="12" fill="#9aa3ad"/></g>`;
}
function duck(x, y, t) {
  const b = Math.sin(t * 4) * 6;
  return `<g transform="translate(${f(x)} ${f(y + b)}) rotate(${f(Math.sin(t * 3) * 8)})"><ellipse cx="0" cy="0" rx="48" ry="30" fill="#ffd23c" stroke="${INK}" stroke-width="5"/><circle cx="30" cy="-34" r="24" fill="#ffd23c" stroke="${INK}" stroke-width="5"/><path d="M50 -36 l22 6 l-22 6 Z" fill="${C.peach}"/><circle cx="36" cy="-40" r="4" fill="${INK}"/></g>`;
}
function water(t, top) {
  let d = `M0 ${f(top)}`;
  for (let x = 0; x <= 1080; x += 30) d += ` L${x} ${f(top + Math.sin(x / 60 + t * 4) * 10)}`;
  d += ' L1080 1920 L0 1920 Z';
  return `<path d="${d}" fill="#5aa9ff" opacity=".72"/><path d="${d.split(' L1080 1920')[0]}" stroke="#fff" stroke-width="6" fill="none" opacity=".7"/>`;
}

// plumber's site inside the phone (twist: just a number / fix: proper site)
const PX = 452, PY = 544, PW = 556;
function siteHeader() {
  return `<rect x="${PX}" y="${PY}" width="${PW}" height="90" fill="${INK}"/>` + W.T('Pipe Dream Plumbing', PX + 28, PY + 58, 34, '#fff', { a: 'start' });
}
function badSite(t, a) {
  let s = `<rect x="${PX}" y="${PY}" width="${PW}" height="900" fill="#fff"/>` + siteHeader();
  s += W.T('Call us!', PX + PW / 2, PY + 210, 70, INK, { ls: -2 });
  s += W.icon.call(PX + PW / 2, PY + 300, .9);
  s += W.T('0161 ••• ••••', PX + PW / 2, PY + 410, 40, '#8a847f', { mono: 1, w: 700, ls: 1 });
  ['Prices?', 'Areas covered?', 'Quote form?'].forEach((l, i) => {
    const at = a + i * .32; if (t < at) return;
    const k = eb(seg(t, at, at + .25)), yy = PY + 480 + i * 92;
    s += W.pop(PX + PW / 2, yy, k, `<rect x="${PX + 40}" y="${yy - 40}" width="${PW - 80}" height="80" rx="20" fill="#fde2dc"/>` + W.T(l, PX + 70, yy + 13, 36, INK, { a: 'start', w: 800, ls: 0 }) + `<circle cx="${PX + PW - 90}" cy="${yy}" r="26" fill="${C.red}"/><path d="M${PX + PW - 100} ${yy - 10} l20 20 m0 -20 l-20 20" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`);
  });
  return s;
}
function goodSite(t, o = {}) {
  let s = `<rect x="${PX}" y="${PY}" width="${PW}" height="900" fill="#f4f8fb"/>` + siteHeader();
  s += W.T('Leaks, boilers,', PX + 28, PY + 160, 46, INK, { a: 'start', ls: -2 }) + W.T('blocked sinks.', PX + 28, PY + 212, 46, C.red, { a: 'start', ls: -2 });
  const row = (yy, title, sub, at) => {
    if (t < at) return '';
    const k = eb(seg(t, at, at + .25));
    return W.pop(PX + PW / 2, yy + 40, k, `<rect x="${PX + 28}" y="${yy}" width="${PW - 56}" height="96" rx="20" fill="#fff" stroke="#dde3e8" stroke-width="4"/><circle cx="${PX + 70}" cy="${yy + 48}" r="24" fill="${C.green}"/><path d="M${PX + 58} ${yy + 48} l9 10 l17 -19" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + W.T(title, PX + 110, yy + 44, 32, INK, { a: 'start', w: 900, ls: -.5 }) + W.T(sub, PX + 110, yy + 78, 22, '#6b6560', { a: 'start', mono: 1, w: 700, ls: 0 }));
  };
  s += row(PY + 250, 'Areas we cover', 'SALFORD · STOCKPORT · DIDSBURY', o.a1);
  s += row(PY + 360, 'Prices from', 'FOR EVERY COMMON JOB', o.a2);
  if (t >= o.a3) {
    const k = eb(seg(t, o.a3, o.a3 + .3)), press = o.press || 0;
    s += W.pop(PX + PW / 2, PY + 530, k * (1 - .06 * press), `<rect x="${PX + 28}" y="${PY + 480}" width="${PW - 56}" height="104" rx="52" fill="${C.red}"/>` + `<g transform="translate(${PX + 84} ${PY + 532})"><rect x="-26" y="-18" width="52" height="38" rx="8" fill="#fff"/><rect x="-10" y="-26" width="20" height="10" rx="3" fill="#fff"/><circle cx="0" cy="1" r="11" fill="${C.red}"/><circle cx="0" cy="1" r="5" fill="#fff"/></g>` + W.T('Get a quote:', PX + 130, PY + 525, 32, '#fff', { a: 'start' }) + W.T('send a photo', PX + 130, PY + 562, 32, '#ffe2d6', { a: 'start' }));
  }
  if (o.status) s += o.status;
  return s;
}
function quoteMsg(x, y, k, job, area) {
  return W.pop(x, y, k, `<g transform="translate(${x} ${y})"><rect x="-250" y="-58" width="500" height="116" rx="26" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="-226" y="-36" width="72" height="72" rx="14" fill="#bfe3f2"/><path d="M-220 30 l20 -26 l14 14 l12 -18 l20 30 Z" fill="#3f9a5c"/><circle cx="-176" cy="-14" r="9" fill="#ffc23c"/>${W.T('New quote request', -136, -10, 30, INK, { a: 'start', w: 900, ls: -.5 })}${W.T(job + ' · ' + area, -136, 28, 24, '#6b6560', { a: 'start', mono: 1, w: 700, ls: 0 })}</g>`);
}

// ---------- 0–3.4: HOOK (phone rings on the floor, he's under the sink) ----------
function hook(t) {
  let s = kitchen(t) + sinkCab(t, 560, 1060, 480, { drip: 1 });
  s += lyingPlumber(540, t, { mood: t > 2.2 ? 'angry' : 'grumpy' });
  s += cabDoors(560, 1060, 480);
  s += W.splash(840, 1300, (t % 1.1), '#7cc4ff');
  // phone ringing on the floor, big
  s += ringPhone(250, 1180 + Math.sin(t * 9) * 4, t, 1.7);
  // RING! bursts on a loop
  [0, 1.0, 2.0].forEach(a => s += Ch.impact(250, 920, seg(t, a, a + .75), 'RING!', { r: 110 }));
  if (t > 1.6) s += Ch.bubble(780, 820, 'Busy!', seg(t, 1.6, 1.8), { tail: 40, size: 56 });
  s += S.head(t, -2, 'This plumber\'s phone | rings all day. He\'s | *never* *answered* *once.*', { col: INK, acc: C.red, size: 84, y: 200 });
  return s;
}

// ---------- 3.4–6.5: CLUE 1 (phone in the toolbox, missed calls pile up) ----------
const CARDS = Array.from({ length: 11 }, (_, i) => 3.75 + i * 0.22);
function clue1(t) {
  let s = kitchen(t, { wall: '#e9e4f2' }) + sinkCab(t, 600, 1060, 440, { drip: 1 });
  s += lyingPlumber(580, t, { kick: 9, mood: 'grumpy' });
  s += cabDoors(600, 1060, 440);
  s += toolbox(250, 1450, t, true);
  // missed-call cards fly up out of the toolbox and stack into a tottering pile
  const wob = Math.sin(t * 5) * seg(t, 5.2, 6.4) * 6;
  CARDS.forEach((a, i) => {
    if (t < a) return;
    const k = eo(seg(t, a, a + .25)), tx = 250, ty = 1180 - i * 62;
    const x = 250 + (tx - 250) * k, y = 1250 + (ty - 1250) * k - 200 * Math.sin(Math.PI * k);
    s += missedCard(x + wob * i * .9, y, ((i % 2) ? 4 : -4) + wob * i * .4);
  });
  if (t > 5.9) s += Ch.bubble(720, 840, 'Not now!', seg(t, 5.9, 6.1), { tail: 60, size: 52 });
  s += S.head(t, C1 + .05, 'It rings in his | *toolbox.* The missed | calls *pile* *up.*', { col: INK, acc: C.red, size: 84, y: 200 });
  return s;
}

// ---------- 6.5–9.5: CLUE 2 (flooded kitchen gives up, rival van zooms past) ----------
function clue2(t) {
  let s = W.room(t, { wall: '#fdeed8', floor: '#b9a48e', pattern: 'stripes', pcol: 'rgba(224,140,60,.08)', fy: G - 40 });
  // window with the street
  const wx = 500, wy = 590, ww = 530, wh = 330;
  s += `<rect x="${wx - 14}" y="${wy - 14}" width="${ww + 28}" height="${wh + 28}" rx="12" fill="#fff" stroke="${INK}" stroke-width="5"/><clipPath id="win"><rect x="${wx}" y="${wy}" width="${ww}" height="${wh}"/></clipPath><g clip-path="url(#win)"><rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#bfe3f2"/>${W.cloud(wx + 300, wy + 80, .5, '#fff')}<rect x="${wx}" y="${wy + wh - 70}" width="${ww}" height="70" fill="#7d8794"/>`;
  if (t > 7.95 && t < 9.05) { const vx = S.tw(t, 7.95, 9.0, wx - 230, wx + ww + 260, k => k); s += van(vx, wy + wh - 30, 'OTHER PLUMBER', '#ffc23c') + Ch.speedLines(vx - 200, wy + wh - 30, 1, t, { n: 3, len: 120, gap: 40 }); }
  s += `</g><path d="M${wx + ww / 2} ${wy} V${wy + wh} M${wx} ${wy + wh / 2} H${wx + ww}" stroke="#fff" stroke-width="10"/>`;
  // sink spraying
  s += W.counter(620, 1080, 420, 360, '#8f5c3b', '#e6e3e0');
  for (let i = 0; i < 6; i++) { const p = (t * 2 + i / 6) % 1; s += `<circle cx="${f(830 + Math.cos(-1.2 - i * .35) * 140 * p)}" cy="${f(1000 - 160 * p + 260 * p * p)}" r="${f(18 * (1 - p * .5))}" fill="#7cc4ff"/>`; }
  s += `<path d="M830 1060 V990" stroke="#9aa3ad" stroke-width="22" stroke-linecap="round"/>`;
  // customer on the phone
  const waved = t > 8.35;
  s += Ch.person(300, G, t, { ...customer, pose: waved ? 'wave2' : 'phoneIdle', mood: waved ? 'shock' : (t > 7.6 ? 'grumpy' : 'smile'), look: waved ? [1, -1] : [1, 0], acc: waved ? { earrings: 1 } : customer.acc, sweat: t > 7.4, hairUp: waved ? seg(t, 8.35, 8.6) : 0 });
  // water rising
  const lvl = S.tw(t, C2, TWIST, 1440, 1250, k => k);
  s += water(t, lvl) + duck(700, lvl - 10, t);
  if (t > 6.8 && t < 8.3) s += Ch.bubble(560, 800 - 0, t < 7.6 ? 'Ring… ring…' : '…no answer.', seg(t, t < 7.6 ? 6.8 : 7.6, (t < 7.6 ? 6.8 : 7.6) + .2), { tail: -120, size: 46 });
  if (t > 8.5) s += Ch.bubble(320, 780, 'WAIT! COME BACK!', seg(t, 8.5, 8.7), { tail: 0, size: 44 });
  s += S.head(t, C2 + .05, 'Across town, a | *flooded* kitchen rings… | and *gives* *up.*', { col: INK, acc: C.red, size: 84, y: 200 });
  return s;
}

// ---------- 9.5–12.6: TWIST (under a sink all day + website is just a number) ----------
function twist(t) {
  let s = `<rect width="1080" height="1920" fill="${INK}"/>`;
  s += W.phone(430, 480, 600, 960, badSite(t, 10.35), { k: eb(seg(t, TWIST + .05, TWIST + .35)) });
  s += M.stamp(730, 1330, t, 11.5, 'JUST A NUMBER', { w: 600, size: 66 });
  s += Ch.person(210, G, t, { ...plumber, pose: t < 11.5 ? 'shrug' : 'facepalm', mood: t < 11.5 ? 'shock' : 'sad', look: [1, -1] });
  s += wrench(120, 1300, 30, 1);
  s += S.head(t, TWIST + .1, 'The twist: he\'s under | a sink, and his site is | *just* *a* *number.*', { col: '#fff', acc: C.peach, size: 80, y: 200 });
  return s;
}

// ---------- 12.6–15.9: FIX ----------
function fix(t) {
  let s = kitchen(t);
  const tap = 13.75, press = Math.sin(Math.PI * seg(t, tap, tap + .18));
  let status = '';
  if (t > 14.0) status = W.pop(PX + PW / 2, PY + 650, eb(seg(t, 14.0, 14.25)), `<rect x="${PX + 50}" y="${PY + 612}" width="${PW - 100}" height="76" rx="38" fill="${C.green}"/>` + W.T('Quote request sent ✓', PX + PW / 2, PY + 662, 32, '#fff', { w: 900, ls: 0 }));
  s += W.phone(430, 480, 600, 960, goodSite(t, { a1: 12.95, a2: 13.2, a3: 13.45, press, status }), { k: eb(seg(t, FIX + .05, FIX + .35)) });
  s += M.ripple(730, PY + 532, t, tap);
  // tidy quote messages arrive while he works
  s += quoteMsg(730, 1290, eb(seg(t, 14.3, 14.55)), 'Leaking tap', 'Salford');
  const happy = t > 14.35;
  s += Ch.person(220, G, t, { ...plumber, pose: happy ? 'thumbs' : 'point', mood: happy ? 'grin' : 'smile', look: [1, -1] });
  s += wrench(90, 1330, -20, .9);
  if (happy) s += confetti(260, 820, 14.4, t, 26);
  s += S.tag(t, 14.7, 'Websites from £655', '', { y: 1500, w: 760 });
  s += S.head(t, FIX + .1, 'Prices, areas and a | *quote* *form.*', { col: INK, acc: C.red, size: 84, y: 200 });
  return s;
}

module.exports = {
  dur: DUR,
  parts: { kitchen, sinkCab, cabDoors, lyingPlumber, ringPhone, plumber },
  frame(t) {
    let s = t < C1 ? hook(t) : t < C2 ? clue1(t) : t < TWIST ? clue2(t) : t < FIX ? twist(t) : fix(t);
    s += S.wipe(t, C1, C.red, 0.4) + S.wipe(t, C2, C.peach, 0.4) + S.wipe(t, TWIST, INK, 0.45) + S.wipe(t, FIX, C.red, 0.45);
    s += S.endOnly(t, END, 'dark');
    return s;
  },
};
