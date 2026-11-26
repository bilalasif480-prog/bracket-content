// WEEK-04 13 · Locksmith next door but not on the map → local SEO. Hook formula #9 "Danger POV": frame 0 the door slams on him at 11 pm.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.4, FIX = 7.1, SHUT = 5.2;
const G = 1480, DOORX = 330;
const guy = { hair: 'curly', hairCol: HAIR.dark, skin: SKIN[3], top: '#8fb6e8', bottom: '#8fb6e8', longSleeves: 1, acc: { stripe: '#4a6fa5' }, blinkPh: .3 };
const smith = { female: true, hair: 'pony', hairCol: HAIR.ginger, skin: SKIN[1], top: '#2f3a4a', bottom: '#5b4a3a', acc: { cap: C.red }, blinkPh: 1.1 };

function street(t, night = true) {
  let s = `<rect width="1080" height="1920" fill="#1b2140"/>`;
  [[80, 520], [300, 600], [700, 520], [980, 640], [520, 700]].forEach(([x, y], i) => s += `<circle cx="${x}" cy="${y}" r="${f(4 + 2 * Math.sin(t * 4 + i))}" fill="#fff"/>`);
  // his house
  s += `<rect x="0" y="1000" width="520" height="${G - 1040}" fill="#7d5a8c"/><path d="M-20 1010 L260 860 L540 1010 Z" fill="#4a3358"/>`;
  s += `<rect x="70" y="1100" width="140" height="150" fill="#ffd77a"/><path d="M140 1100 V1250 M70 1175 H210" stroke="#4a3358" stroke-width="10"/><rect x="60" y="1240" width="160" height="16" fill="#4a3358"/>`;
  // locksmith shop
  s += `<rect x="560" y="1020" width="520" height="${G - 1060}" fill="#3f6f8f"/><rect x="590" y="1050" width="460" height="80" rx="10" fill="${C.ink}"/>` + W.T('LOCKSMITH', 820, 1106, 52, C.gold, { ls: 2 });
  s += `<rect x="620" y="1170" width="200" height="200" rx="8" fill="#ffd77a"/><rect x="860" y="1170" width="150" height="270" rx="6" fill="#26465c"/>`;
  s += `<g transform="translate(720 1270)"><circle r="40" fill="none" stroke="${C.gold}" stroke-width="12"/><rect x="34" y="-10" width="80" height="20" rx="6" fill="${C.gold}"/><rect x="92" y="0" width="14" height="28" fill="${C.gold}"/></g>`;
  s += `<rect y="${G - 40}" width="1080" height="${1960 - G}" fill="#3a3f4f"/><rect y="${G - 40}" width="1080" height="12" fill="#555b6e"/>`;
  return s;
}
function door(t, ang) { // ang 0 = shut, 1 = open (swung)
  const w = 150 * (1 - 0.8 * ang);
  return `<rect x="${DOORX - 75}" y="1150" width="150" height="290" fill="#2a1a33"/><rect x="${DOORX - 75}" y="1150" width="${f(w)}" height="290" fill="#c9583b" stroke="#8f3e28" stroke-width="6"/>` + (ang < .5 ? `<circle cx="${f(DOORX - 75 + w - 24)}" cy="1300" r="10" fill="${C.gold}"/>` : '');
}
function mapPanel(t, a, b, fixed) {
  if (t < a || t > b) return '';
  const k = eb(seg(t, a, a + 0.3)) * (1 - eo(seg(t, b - 0.2, b)));
  let g = `<rect x="320" y="604" width="696" height="300" fill="#e8efe2"/><path d="M320 700 H1016 M320 820 H1016 M480 604 V904 M820 604 V904" stroke="#fff" stroke-width="22"/>`;
  const pin = (x, y, col, sc = 1) => `<g transform="translate(${x} ${y}) scale(${sc})"><path d="M0 0 C-26 -32 -26 -62 0 -62 C26 -62 26 -32 0 0 Z" fill="${col}"/><circle cx="0" cy="-40" r="10" fill="#fff"/></g>`;
  g += pin(380, 680, '#8a8f98') + pin(980, 660, '#8a8f98') + pin(960, 890, '#8a8f98');
  g += `<circle cx="600" cy="800" r="14" fill="#2f7cf6" stroke="#fff" stroke-width="5"/>`;
  if (!fixed) g += `<circle cx="680" cy="760" r="${f(40 + 4 * Math.sin(t * 8))}" fill="none" stroke="${C.red}" stroke-width="6" stroke-dasharray="12 10"/>` + W.T('?', 680, 778, 50, C.red);
  else g += W.pop(680, 790, eb(seg(t, 8.6, 9.0)), pin(680, 790, C.red, 1.6)) + (t > 8.9 ? `<rect x="560" y="610" width="440" height="56" rx="28" fill="#fff"/>` + W.T('Locksmith · 1 min walk', 780, 648, 30, C.ink) : '');
  return W.panel(300, 480, 740, 440, fixed ? 'locksmith near me' : 'locksmith near me', g, k, { head: '#2f7cf6', dot: '#fff' });
}
function legsOut(t, x, y) {
  const k = Math.sin(t * 14) * 16;
  return `<g transform="translate(${x} ${y})"><rect x="-50" y="-10" width="100" height="70" rx="20" fill="#8fb6e8"/><rect x="-50" y="20" width="100" height="14" fill="#4a6fa5"/><path d="M-26 50 L${f(-40 + k)} 190" stroke="#8fb6e8" stroke-width="34" stroke-linecap="round"/><path d="M26 50 L${f(40 - k)} 190" stroke="#8fb6e8" stroke-width="34" stroke-linecap="round"/><ellipse cx="${f(-34 + k)}" cy="206" rx="22" ry="14" fill="${SKIN[3]}"/><ellipse cx="${f(46 - k)}" cy="206" rx="22" ry="14" fill="${SKIN[3]}"/></g>`;
}
function before(t) {
  let s = street(t);
  s += door(t, 1 - eo(seg(t, 0, 0.25)));
  // puddle
  s += `<ellipse cx="200" cy="${G - 20}" rx="150" ry="24" fill="#4f7fb5" opacity=".8"/>`;
  // slipper flies off
  if (t < 1.4) { const k = seg(t, 0.1, 1.2); s += `<g transform="translate(${f(400 + 300 * k)} ${f(1200 - Math.sin(k * Math.PI) * 400 + 280 * k)}) rotate(${f(t * 600)})"><ellipse rx="34" ry="16" fill="#e05a9a"/></g>`; }
  // the guy
  if (t < 3.0) {
    const pose = t < 0.5 ? 'air' : t < 1.8 ? 'shrug' : 'phoneIdle';
    const lift = t < 0.5 ? Math.sin(seg(t, 0, 0.5) * Math.PI) * 120 : 0;
    s += Ch.person(DOORX + 120, G, t, { ...guy, pose, mood: t < 0.5 ? 'shock' : t < 1.8 ? 'sad' : 'grumpy', lift, eyesOpen: 1, acc: t >= 1.8 ? { ...guy.acc, phone: '#9fd3ff' } : guy.acc });
  } else if (t < SHUT) {
    // climbing in through the window: legs kicking
    s += legsOut(t, 140, 1180);
  } else {
    const k = seg(t, SHUT, SHUT + 0.4);
    if (k < 1) s += legsOut(t, 140, 1180 + 260 * k * k);
    else s += Ch.person(220, G + 110, t, { ...guy, pose: 'flat', rot: -90, dir: -1, mood: 'dizzy', shadow: false });
  }
  // window frame drawn over him + the cat
  s += `<path d="M140 1100 V1250 M70 1175 H210" stroke="#4a3358" stroke-width="10"/>`;
  if (t > 3.0) s += Ch.cat(120, 1240, t, { s: .55, pose: t > SHUT - 0.3 ? 'sit' : 'sit', mood: 'grumpy' });
  if (t >= SHUT - 0.1 && t < SHUT + 0.8) s += Ch.impact(300, 1090, seg(t, SHUT - 0.1, SHUT + 0.8), 'SLAM!', { r: 100 });
  if (t > SHUT + 0.4) s += W.splash(200, G - 30, t - SHUT - 0.4, '#7cc4ff');
  if (t < 0.9) s += Ch.impact(DOORX - 120, 1050, seg(t, -0.15, 0.8), 'SLAM!', { r: 100 });
  // rain cloud follows him
  if (t > 0.9) { const cx = t < 3.0 ? DOORX + 120 : t < SHUT + 0.4 ? 150 : 220; const k = eo(seg(t, 0.9, 1.3)); s += Ch && W.cloud(cx - 400 * (1 - k), 870, .9) + W.rain(t, cx - 140, cx + 140, 900, G - 20, 16); }
  // the locksmith walks past, whistling, doesn't notice
  if (t > 3.6 && t < 5.6) { const x = 940 + 400 * seg(t, 3.6, 5.5) - 0; s += Ch.person(800 + 450 * seg(t, 3.6, 5.5), G, t, { ...smith, pose: 'walk', dir: 1, mood: 'happy' }); s += t > 3.8 && t < 5.0 ? `<text x="${f(840 + 450 * seg(t, 3.6, 5.5))}" y="900" font-family="Archivo" font-weight="900" font-size="60" fill="${C.gold}">♪</text>` : ''; }
  s += mapPanel(t, 1.8, 3.6, false);
  if (t > 1.9 && t < 2.9) s += Ch.bubble(700, 990, 'Not here...', seg(t, 1.9, 2.1), { tail: -160, size: 44 });
  if (t > 4.0 && t < 5.1) s += Ch.bubble(420, 1000, 'HELP!!', seg(t, 4.0, 4.2), { tail: -140, size: 50, fill: C.red, col: '#fff' });
  if (t < 3.0) s += S.head(t, -2, 'POV: locked out | at *11* *pm.*', { col: '#fff', acc: C.gold });
  else if (t < SHUT) s += S.head(t, 3.0, 'The locksmith is | *next* *door...*', { col: '#fff', acc: C.gold });
  else s += S.head(t, SHUT, '...but not | *on* *the* *map.*', { col: '#fff', acc: C.gold });
  return s;
}
function after(t) {
  let s = street(t);
  const open = seg(t, 9.6, 9.9);
  s += door(t, open);
  s += mapPanel(t, FIX + 0.2, 11.5, true);
  if (t < 8.5) s += W.panel(300, 480, 740, 440, 'Google Business Profile', W.ticks(t, 340, 640, ['Category: locksmith', 'Opening hours', 'Area covered', 'Photos + phone'], FIX + 0.4, 0.28, { size: 38, gap: 70 }), eb(seg(t, FIX + 0.2, FIX + 0.5)), { head: '#2f7cf6', dot: '#fff' });
  // he sits up, the locksmith runs over with a giant key
  s += Ch.person(DOORX + 120, G, t, { ...guy, pose: t < 9.0 ? 'phoneIdle' : t < 9.9 ? 'wave' : 'celebrate', mood: t < 8.6 ? 'sad' : 'grin', eyesOpen: 1, acc: { ...guy.acc, phone: '#9fd3ff' } });
  const x = t < 8.9 ? 940 : S.tw(t, 8.9, 9.4, 940, 560);
  const p = t < 8.9 ? 'idle' : t < 9.4 ? 'run' : t < 9.9 ? 'reach' : 'dance';
  s += Ch.person(x, G, t, { ...smith, dir: t > 8.9 && t < 9.9 ? -1 : 1, pose: p, mood: 'grin', eyesOpen: 1 });
  if (t > 8.9 && t < 9.4) s += Ch.speedLines(x, G - 140, -1, t, { col: '#555b6e' });
  if (t > 9.4 && t < 10.0) s += `<g transform="translate(${f(560 - 120 * seg(t, 9.4, 9.7))} 1180)"><circle r="40" fill="none" stroke="${C.gold}" stroke-width="14"/><rect x="34" y="-12" width="110" height="24" rx="8" fill="${C.gold}"/></g>`;
  if (t > 9.6 && t < 10.4) s += Ch.impact(DOORX - 140, 1050, seg(t, 9.6, 10.4), 'CLICK!', { r: 100 });
  if (t > 9.9) s += confetti(540, 1000, 9.9, t, 36);
  if (t < 10.6) s += S.head(t, FIX + 0.15, 'Get on *the* *map.*', { col: '#fff', acc: C.gold, size: 92 });
  else s += S.tag(t, 10.6, 'Local SEO from £325/month', '', { y: 345, w: 920, s1: 62 });
  return s;
}
module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < FIX ? before(t) : after(t);
    s += S.wipe(t, FIX, '#2f7cf6', 0.45);
    s += S.endOnly(t, END, 'red');
    return s;
  },
};
