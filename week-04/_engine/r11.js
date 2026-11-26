// WEEK-04 11 · Which florist does the AI pick? → GEO. Hook formula #3 "Challenge question" on a game-show stage.
const { C, clamp, seg, eo, eb, f, confetti } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const W = require('./w4');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.4, FIX = 7.1, DROP = 5.2;
const G = 1480, AX = 250, BX = 830, POD = 260;
const fa = { hair: 'buzz', hairCol: HAIR.dark, skin: SKIN[4], top: '#1fa86b', bottom: '#2f3a4a', collar: 1, acc: { tie: C.gold }, blinkPh: .5 };
const fb = { female: true, hair: 'long', hairCol: HAIR.ginger, skin: SKIN[0], top: '#e05a9a', bottom: '#2f3a4a', acc: { earrings: 1 }, blinkPh: 1.2 };

function stage(t) {
  let s = `<rect width="1080" height="1920" fill="#2a1f4a"/>`;
  for (let i = 0; i < 2; i++) { const a = Math.sin(t * 1.4 + i * 2) * 18 + (i ? 18 : -18); s += `<path d="M${i ? 1000 : 80} 0 L${f((i ? 1000 : 80) + Math.tan(a * Math.PI / 180) * 1400 - 220)} 1440 H${f((i ? 1000 : 80) + Math.tan(a * Math.PI / 180) * 1400 + 220)} Z" fill="#fff4c8" opacity=".08"/>`; }
  for (let i = 0; i < 14; i++) s += `<circle cx="${40 + i * 77}" cy="470" r="10" fill="${(Math.floor(t * 6) + i) % 2 ? C.gold : '#5a4a8a'}"/>`;
  s += `<rect y="${G - 40}" width="1080" height="${1960 - G}" fill="#4a3a7a"/><rect y="${G - 40}" width="1080" height="14" fill="#6a5aa0"/>`;
  return s;
}
function screen(t, mode) {
  const x = 330, y = 500, w = 420, h = 320;
  let s = `<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="30" fill="#151026"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="#1d3b5a"/>`;
  s += W.T('AI ANSWER', x + 24, y + 44, 26, '#5ef0d0', { a: 'start', mono: 1, ls: 2 }) + `<rect x="${x + w - 124}" y="${y + 16}" width="110" height="40" rx="20" fill="${C.red}"/>` + W.T('DEMO', x + w - 69, y + 44, 22, '#fff', { mono: 1, ls: 2 });
  const cx = x + w / 2;
  if (mode === 'scan') {
    const sx = x + 40 + ((t * 0.9) % 1) * (w - 80);
    s += W.T('Best florist', cx, y + 150, 44, '#fff') + W.T('in Didsbury?', cx, y + 204, 44, '#fff') + `<rect x="${f(sx)}" y="${y + 70}" width="10" height="${h - 90}" fill="#5ef0d0" opacity=".7"/>`;
  } else if (mode === 'A') s += W.T('✓ hours', cx, y + 130, 40, '#5ef0d0') + W.T('✓ services', cx, y + 186, 40, '#5ef0d0') + W.T('✓ area', cx, y + 242, 40, '#5ef0d0');
  else if (mode === 'B') s += W.T('???', cx, y + 220, 120, Math.sin(t * 30) > 0 ? C.red : '#fff');
  else if (mode === 'pickA') s += W.T('I pick:', cx, y + 150, 44, '#fff') + W.T('Florist A', cx, y + 230, 64, C.gold);
  else if (mode === 'both') s += W.T('Also recommended:', cx, y + 130, 36, '#fff') + W.pop(cx, y + 200, eb(seg(t, 9.0, 9.3)), W.T('Your Florist', cx, y + 218, 58, C.gold)) + W.T('Florist A', cx, y + 280, 36, '#9fb4cc');
  return s;
}
function podium(x, label, col) {
  return `<path d="M${x - 140} ${G - 40} L${x - 120} ${G - POD} H${x + 120} L${x + 140} ${G - 40} Z" fill="${col}"/><rect x="${x - 130}" y="${G - POD - 20}" width="260" height="30" rx="10" fill="#fff" opacity=".9"/>` + W.T(label, x, G - 120, 48, '#fff');
}
function signCard(x, y, k, neat) {
  if (k <= 0) return '';
  let g = `<rect x="-130" y="-90" width="260" height="180" rx="16" fill="#fff" stroke="${C.ink}" stroke-width="6"/>`;
  if (neat) g += W.T('My website', 0, -42, 32, C.ink) + W.T('hours · area', 0, 6, 30, C.green) + W.T('services', 0, 48, 30, C.green);
  else g += `<rect x="-100" y="-66" width="200" height="110" rx="8" fill="#d6c3e8"/><circle cx="-20" cy="-14" r="34" fill="#e05a9a" opacity=".5"/><circle cx="30" cy="-24" r="28" fill="#ffc23c" opacity=".5"/>` + W.T('just a photo', 0, 72, 28, C.ink);
  return W.pop(x, y, eb(k), `<g transform="translate(${f(x)} ${f(y)}) rotate(${neat ? -4 : 5})">${g}</g>`);
}
function before(t) {
  let s = stage(t);
  const mode = t < 1.8 ? 'scan' : t < 2.8 ? 'A' : t < 3.8 ? 'B' : 'pickA';
  s += screen(t, mode);
  // florist A
  const ap = t < 0.9 ? 'wave' : t < 3.8 ? 'reach' : 'celebrate';
  s += Ch.person(AX, G - 40, t, { ...fa, pose: ap, mood: t < 3.8 ? 'smile' : 'grin', eyesOpen: 1, shadow: false, limbs: ap === 'reach' ? { sa: 150, ea: 0 } : undefined });
  if (t > 0.9 && t < 3.8) s += signCard(165, 790, seg(t, 0.9, 1.2), true);
  // florist B (falls through the trapdoor)
  if (t < DROP) {
    const bp = t < 0.9 ? 'wave2' : t < 3.8 ? 'reach' : t < 4.6 ? 'idle' : 'panic';
    s += Ch.person(BX, G - 40, t, { ...fb, dir: -1, pose: bp, mood: t < 2.8 ? 'grin' : t < 3.8 ? 'shock' : 'scream', eyesOpen: 1, shadow: false, sweat: t > 2.8, limbs: bp === 'reach' ? { sa: 150, ea: 0 } : undefined });
    if (t > 0.9 && t < 3.8) s += signCard(915, 790, seg(t, 1.1, 1.4), false);
  } else if (t < DROP + 0.5) {
    const k = seg(t, DROP, DROP + 0.5);
    s += `<clipPath id="td"><rect x="0" y="0" width="1080" height="${G - POD}"/></clipPath><g clip-path="url(#td)">` + Ch.person(BX, G - 40 + 700 * k * k, t, { ...fb, dir: -1, pose: 'air', mood: 'scream', shadow: false }) + `</g>`;
  }
  s += podium(AX, 'A', '#1fa86b') + podium(BX, 'YOU', C.red);
  // trapdoor flaps
  if (t >= DROP) { const k = eo(seg(t, DROP, DROP + 0.15)); s += `<rect x="${BX - 130}" y="${G - POD - 20}" width="260" height="30" fill="#151026"/><g transform="rotate(${f(90 * k)} ${BX - 130} ${G - POD - 5})"><rect x="${BX - 130}" y="${G - POD - 20}" width="130" height="24" fill="#888"/></g><g transform="rotate(${f(-90 * k)} ${BX + 130} ${G - POD - 5})"><rect x="${BX}" y="${G - POD - 20}" width="130" height="24" fill="#888"/></g>`; }
  if (t > DROP + 0.3) { const k = seg(t, DROP + 0.3, 7.0); s += `<ellipse cx="${f(BX + Math.sin(t * 4) * 60)}" cy="${f(700 + 500 * k)}" rx="20" ry="12" fill="#e05a9a" transform="rotate(${f(t * 90)} ${f(BX + Math.sin(t * 4) * 60)} ${f(700 + 500 * k)})"/>`; }
  if (t > 3.8) s += confetti(AX, 900, 3.8, t, 36);
  if (t > DROP + 0.1) s += Ch.impact(540, 1000, seg(t, DROP + 0.1, DROP + 0.9), 'WHOOPS!', { r: 120 });
  if (t < DROP) s += S.head(t, -2, 'Which florist will | the *AI* *pick?*', { col: '#fff', acc: C.gold });
  else s += S.head(t, DROP, 'Not *you.*', { col: '#fff', acc: C.gold, size: 110 });
  return s;
}
function after(t) {
  let s = stage(t);
  s += screen(t, t < 8.9 ? 'scan' : 'both');
  s += Ch.person(AX, G - 40, t, { ...fa, pose: t < 9.3 ? 'idle' : 'dance', mood: 'smile', eyesOpen: 1, shadow: false, ph: .7 });
  // B springs back up with a tidy info card
  const k = seg(t, FIX + 0.2, FIX + 0.6);
  const lift = Math.sin(k * Math.PI) * 220;
  s += Ch.person(BX, G - 40 + (k < 1 ? 300 * (1 - k) : 0), t, { ...fb, dir: -1, pose: k < 1 ? 'air' : t < 9.3 ? 'reach' : 'celebrate', mood: 'grin', eyesOpen: 1, shadow: false, lift, limbs: k >= 1 && t < 9.3 ? { sa: 150, ea: 0 } : undefined });
  s += podium(AX, 'A', '#1fa86b') + podium(BX, 'YOU', C.red);
  if (t > FIX + 0.6 && t < 9.3) {
    let g = `<rect x="-150" y="-120" width="300" height="240" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="6"/>`;
    s += `<g transform="translate(905 735)">${g}</g>` + W.ticks(t, 765, 665, ['Hours', 'Delivery area', 'FAQs'], FIX + 0.8, 0.35, { size: 36, gap: 64 });
  }
  if (t > 9.3) s += confetti(BX, 900, 9.3, t, 40);
  if (t < 10.6) s += S.head(t, FIX + 0.15, 'Clear details | *AI* *can* *read.*', { col: '#fff', acc: C.gold });
  else s += S.tag(t, 10.6, 'GEO from £215/month', '', { y: 345, w: 860, s1: 66 });
  return s;
}
module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < FIX ? before(t) : after(t);
    s += S.wipe(t, FIX, C.gold, 0.45);
    s += S.endOnly(t, END, 'dark');
    return s;
  },
};
