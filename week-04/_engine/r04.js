// CARTOON 1 · Bookings at night → AI agent. Hook formula: "About to break (stress)" — frame 0 the owner is mid-flop onto the bed.
const { C, clamp, seg, eo, eb, f } = require('./lib');
const Ch = require('./chars');
const S = require('./scene');
const { SKIN, HAIR } = Ch;
Ch.cfg.scale = 1.25;
const DUR = 15.0, END = 13.35, FIX = 7.05, CRASH = 6.2;
const MAT = 1185; // mattress top (standing line on the bed)
const FLOOR = 1530;

const owner = { skin: SKIN[2], hair: 'short', hairCol: HAIR.black, top: '#2f9e8f', bottom: '#2f3a4a', acc: { apron: '#ffffff' }, face: 0 };
const custA = { female: true, hair: 'pony', hairCol: HAIR.ginger, skin: SKIN[0], top: '#ec3013', bottom: '#283a5a', blinkPh: 1 };
const custB = { hair: 'short', hairCol: HAIR.dark, skin: SKIN[4], top: '#4a6fa5', bottom: '#3b3b3b', acc: { beard: 1 }, blinkPh: 2 };
const custC = { female: true, hair: 'curly', hairCol: HAIR.grey, skin: SKIN[1], top: '#e05a9a', acc: { glasses: 1 }, blinkPh: .5 };
const rider = { skin: SKIN[3], top: '#2b2b2b', bottom: '#2b2b2b', longSleeves: 1, acc: { helmet: '#ff8360', box: '#ffc23c' }, blinkPh: 1.7 };

function room(t, night = true) {
  let s = `<rect width="1080" height="1920" fill="#2b3150"/>`;
  // wallpaper dots
  for (let y = 520; y < 1440; y += 120) for (let x = 40; x < 1080; x += 120) s += `<circle cx="${x + ((y / 120) % 2) * 60}" cy="${y}" r="6" fill="#363d63"/>`;
  s += `<rect y="1440" width="1080" height="480" fill="#3d3552"/><rect y="1440" width="1080" height="14" fill="#4a4163"/>`;
  return s;
}
function windowSvg(t) {
  const x = 620, y = 470, w = 340, h = 300;
  let s = `<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="14" fill="#5b4a3a"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#141833"/>`;
  s += `<circle cx="${x + 250}" cy="${y + 90}" r="46" fill="#fff4c8"/><circle cx="${x + 272}" cy="${y + 76}" r="40" fill="#141833"/>`;
  [[60, 60], [140, 120], [90, 220], [200, 40], [300, 230], [180, 200]].forEach(([a, b], i) => s += `<circle cx="${x + a}" cy="${y + b}" r="${f(4 + 2 * Math.sin(t * 5 + i))}" fill="#fff"/>`);
  return s;
}
function windowFrame() {
  const x = 620, y = 470, w = 340, h = 300;
  return `<path d="M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}" stroke="#5b4a3a" stroke-width="14"/><path d="M${x - 30} ${y - 20} Q${x + 20} ${y + 150} ${x - 10} ${y + h + 30} L${x - 50} ${y + h + 30} L${x - 50} ${y - 20} Z M${x + w + 30} ${y - 20} Q${x + w - 20} ${y + 150} ${x + w + 10} ${y + h + 30} L${x + w + 50} ${y + h + 30} L${x + w + 50} ${y - 20} Z" fill="${C.peach}"/>`;
}
function bed(t, dropY = 0, tilt = 0, legsOk = true) {
  let s = `<g transform="translate(0 ${f(dropY)}) rotate(${f(tilt)} 620 1300)">`;
  s += `<rect x="990" y="960" width="60" height="380" rx="26" fill="#7a4b2f"/><rect x="1004" y="990" width="32" height="300" rx="14" fill="#8f5c3b"/>`;
  s += `<rect x="230" y="1260" width="800" height="70" rx="18" fill="#7a4b2f"/>`;
  s += `<rect x="225" y="${MAT}" width="790" height="90" rx="30" fill="#e9e6f2"/><path d="M240 ${MAT + 46} H1000" stroke="#cfc9de" stroke-width="5" stroke-dasharray="26 16"/>`;
  s += `<rect x="840" y="1120" width="150" height="70" rx="30" fill="#fff"/>`;
  s += `</g>`;
  if (legsOk) s += `<rect x="255" y="1325" width="30" height="120" rx="8" fill="#5e3a24"/><rect x="975" y="1325" width="30" height="120" rx="8" fill="#5e3a24"/>`;
  else s += `<rect x="250" y="1405" width="34" height="40" rx="8" fill="#5e3a24" transform="rotate(-50 267 1425)"/><rect x="975" y="1405" width="34" height="40" rx="8" fill="#5e3a24" transform="rotate(40 992 1425)"/>`;
  return s;
}
// owner lying on the bed: dir -1, rot -90 → head on the right. ground point (748,1320) → head ≈ (900,1120)
function lyingOwner(t, o = {}) {
  const gx = 748, gy = 1320 + (o.dy || 0);
  return Ch.person(gx, gy, t, { ...owner, dir: -1, rot: -90, shadow: false, ...o });
}
function chatPanel(t, a, msgs) {
  if (t < a) return '';
  const x = 300, y = 440, w = 740, h = 540;
  const k = eb(seg(t, a, a + 0.4));
  let g = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="40" fill="#fff" stroke="${C.ink}" stroke-width="7"/>`;
  g += `<path d="M${x + 4} ${y + 104} V${y + 40} Q${x + 4} ${y + 4} ${x + 40} ${y + 4} H${x + w - 40} Q${x + w - 4} ${y + 4} ${x + w - 4} ${y + 40} V${y + 104} Z" fill="${C.ink}"/>`;
  g += `<circle cx="${x + 62}" cy="${y + 54}" r="28" fill="${C.red}"/><rect x="${x + 48}" y="${y + 44}" width="28" height="20" rx="6" fill="#fff"/>`;
  g += `<text x="${x + 108}" y="${y + 68}" font-family="Archivo" font-weight="900" font-size="34" fill="#fff" letter-spacing="-1">Café bookings · AI agent</text>`;
  g += S.demo(x + w - 172, y + 28, C.red);
  let yy = y + 128;
  for (const m of msgs) {
    if (t < m.at) continue;
    const kk = eb(seg(t, m.at, m.at + 0.3));
    const tw = m.text.length * 19 + 50, bx = m.out ? x + w - 30 - tw : x + 30;
    g += `<g transform="translate(${f(bx + tw / 2)} ${f(yy + 40)}) scale(${f(kk)}) translate(${f(-(bx + tw / 2))} ${f(-(yy + 40))})"><rect x="${bx}" y="${yy}" width="${tw}" height="80" rx="30" fill="${m.out ? C.red : '#ece9e6'}"/><text x="${bx + tw / 2}" y="${yy + 52}" font-family="Archivo" font-weight="800" font-size="34" fill="${m.out ? '#fff' : C.ink}" text-anchor="middle" letter-spacing="-0.5">${m.text}</text></g>`;
    yy += 92;
  }
  return `<g transform="translate(${x + w / 2} ${y + h / 2}) scale(${f(k)}) translate(${-(x + w / 2)} ${-(y + h / 2)})">${g}</g>`;
}

function chaos(t) {
  let s = room(t) + windowSvg(t);
  const crashed = t >= CRASH, ck = seg(t, CRASH, CRASH + 0.18);
  const bedDrop = crashed ? 110 * eb(ck) : 0, tilt = crashed ? 3 * eo(ck) : 0;
  // customer C at the window (behind frame)
  if (t >= 3.7) {
    const k = eo(seg(t, 3.7, 4.0));
    s += `<clipPath id="wc"><rect x="620" y="470" width="340" height="300"/></clipPath><g clip-path="url(#wc)">`;
    s += Ch.person(800, 1070 - 100 * k, t, { ...custC, dir: -1, pose: crashed ? 'panic' : 'knock', mood: crashed ? 'shock' : 'angry', talk: !crashed && t > 4.1, shadow: false });
    s += `</g>`;
  }
  s += windowFrame();
  s += bed(t, bedDrop, tilt, !crashed);
  // owner
  {
    let o;
    if (t < 0.45) { const k = t / 0.45; o = { lift: 300 * (1 - k * k), rot: -25 - 65 * eo(k), pose: 'air', mood: 'happy' }; }
    else if (t < 2.05) { const lt = t - 0.45; o = { pose: 'flat', mood: 'snore', squash: 1 - 0.25 * Math.exp(-lt * 9) * Math.cos(lt * 26) }; }
    else if (t < 4.6) o = { pose: 'flat', mood: 'shock', hairUp: seg(t, 2.1, 4.6) * 0.6 };
    else if (!crashed) o = { pose: 'panic', mood: 'scream', hairUp: 1, sweat: 1 };
    else o = { pose: 'flat', mood: 'dizzy', hairUp: 1 };
    s += lyingOwner(t, { ...o, dy: bedDrop });
    if (t >= 0.9 && t < 2.05) s += Ch.zzz(930, 1020, t, '#fff');
  }
  // note on chest (dropped by the pigeon)
  if (t >= 2.0 && t < CRASH) {
    const k = eo(seg(t, 2.0, 2.25));
    const nx = 860 - 80 * k, ny = 960 + 110 * k;
    s += `<g transform="translate(${f(nx)} ${f(ny + bedDrop)}) rotate(${f(-10 + 4 * k)})"><rect x="-90" y="-30" width="180" height="56" rx="6" fill="#fffbe9" stroke="${C.ink}" stroke-width="4"/><text x="0" y="8" font-family="Archivo" font-weight="900" font-size="26" fill="${C.ink}" text-anchor="middle">table for 4??</text></g>`;
  }
  // customer A drops
  const dA = S.drop(t, 2.3, 0.38);
  if (dA) {
    const fallen = crashed;
    s += Ch.person(420, MAT + bedDrop, t, { ...custA, lift: dA.lift, squash: dA.squash, pose: fallen ? 'air' : dA.pose || 'point', rot: fallen ? -70 * eo(ck) : 0, mood: fallen ? 'dizzy' : (dA.landed < 0 ? 'shock' : 'angry'), talk: !fallen && dA.landed > 0.1 });
    if (dA.landed > 0.05 && !crashed) s += Ch.bubble(250, 560, 'Table for|Friday?', seg(t, 2.75, 2.95), { tail: 60, size: 46, tailDx: 40 });
  }
  // customer B drops onto the owner's legs
  const dB = S.drop(t, 3.0, 0.38);
  if (dB) {
    const fallen = crashed;
    s += Ch.person(575, MAT + bedDrop, t, { ...custB, dir: 1, lift: dB.lift, squash: dB.squash, pose: fallen ? 'air' : dB.pose || 'wave', rot: fallen ? 75 * eo(ck) : 0, mood: fallen ? 'dizzy' : (dB.landed < 0 ? 'shock' : 'grin'), eyesOpen: 1, talk: !fallen && dB.landed > 0.1 });
    if (dB.landed > 0.05 && !crashed) s += Ch.bubble(250, 830, 'Open at 8??', seg(t, 3.45, 3.65), { tail: 90, size: 46, tailDx: 120 });
  }
  if (t >= 4.1 && !crashed) s += Ch.bubble(790, 420, 'Gluten free??', seg(t, 4.1, 4.3), { tail: 0, size: 42 });
  // rider runs in from the left on the floor
  if (t >= 4.3) {
    const x = S.tw(t, 4.3, 4.8, -200, 180);
    const moving = t < 4.75;
    s += Ch.person(x, FLOOR, t, { ...rider, pose: crashed ? 'panic' : moving ? 'run' : t < 4.95 ? 'skid' : 'point', mood: crashed ? 'shock' : 'grin', eyesOpen: 1, talk: !crashed && t > 5.0 });
    if (moving) s += Ch.speedLines(x, FLOOR - 120, 1, t, { col: '#cfc9de' });
    s += Ch.dust(200, FLOOR, t - 4.75, { col: '#6a6080' });
    if (t > 5.0 && !crashed) s += Ch.bubble(330, 1030, 'Order for Sam!', seg(t, 5.0, 5.2), { tail: -100, size: 42 });
  }
  // grumpy cat leaps onto the owner's belly and sits there (unbothered by the crash)
  if (t >= 4.75) {
    const k = seg(t, 4.75, 5.15);
    const x = 1180 - 480 * k, y = (FLOOR + 10) * (1 - k) + 1088 * k - Math.sin(k * Math.PI) * 330;
    s += Ch.cat(x, (k < 1 ? y : 1088) + (k >= 1 ? bedDrop : 0), t, { dir: -1, s: 0.8, pose: k < 1 ? 'leap' : 'sit', mood: 'grumpy', squash: k >= 1 ? 1 - 0.2 * Math.exp(-(t - 5.15) * 10) : 1 });
  }
  // pigeon flies in with the note, then perches on the headboard
  if (t >= 1.1) {
    if (t < 2.05) {
      const k = eo(seg(t, 1.1, 2.0));
      s += Ch.pigeon(1180 - 300 * k, 560 + 400 * k - Math.sin(k * Math.PI) * 160, t, { dir: -1, pose: 'fly', note: t < 2.0 ? 'table for 4??' : '', s: 0.85 });
    } else if (!crashed) s += Ch.pigeon(1020, 962, t, { dir: -1, pose: 'stand', s: 0.75 });
    else { const k = seg(t, CRASH, CRASH + 0.8); s += Ch.pigeon(1020 + 200 * k, 962 - 500 * k, t, { dir: 1, pose: 'fly', s: 0.75 }); }
  }
  // crash FX
  if (crashed) {
    s += Ch.dust(620, 1450, t - CRASH, { n: 9, spread: 480, col: '#8b82a3' });
    s += Ch.impact(640, 860, seg(t, CRASH, CRASH + 0.85), 'CRASH!', { r: 170 });
    if (t > CRASH + 0.2) s += Ch.stars(900, 1150, t, { r: 80 });
  }
  // headline
  if (t < 2.2) s += S.head(t, -2, 'Café owner. | *Finally* in bed.');
  else s += S.head(t, 2.2, 'Then *everyone* | wants a table.');
  return s;
}

function fix(t) {
  let s = room(t) + windowSvg(t) + windowFrame() + bed(t);
  s += lyingOwner(t, { pose: 'flat', mood: 'snore', acc: { apron: '#ffffff', nightcap: C.red } });
  s += Ch.zzz(930, 1020, t, '#fff');
  s += Ch.cat(700, 1088, t, { dir: -1, s: 0.8, pose: 'sleep' });
  // robot runs in
  const x = S.tw(t, FIX, FIX + 0.6, -220, 230);
  const running = t < FIX + 0.55;
  let pose = running ? 'run' : t < FIX + 0.8 ? 'skid' : 'idle';
  if (t > 8.15 && t < 8.7) pose = 'tap';
  if (t > 9.35 && t < 9.9) pose = 'tap';
  if (t > 10.6 && t < 12.3) pose = 'dance';
  if (t >= 12.3) pose = 'thumbs';
  s += Ch.person(x, FLOOR, t, { robot: true, pose, mood: t > 8.7 && t < 9.3 || t > 9.9 ? 'happy' : 'smile', talk: (t > 8.7 && t < 9.2) || (t > 9.9 && t < 10.4), acc: { phone: '#5ef0d0' } });
  if (running) s += Ch.speedLines(x, FLOOR - 140, 1, t, { col: '#cfc9de' });
  s += Ch.dust(260, FLOOR, t - (FIX + 0.6), { col: '#6a6080' });
  // pigeon brings a note, gets a tick, leaves happy
  let pg = '';
  if (t >= 9.0 && t < 10.9) {
    let px, py, note, dir = 1, ps = 'fly';
    if (t < 9.5) { const k = eo(seg(t, 9.0, 9.5)); px = 530; py = -150 + 1300 * k; note = 'table for 2?'; }
    else if (t < 10.1) { px = 530; py = 1150; note = t < 9.9 ? 'table for 2?' : '✓ booked'; }
    else { const k = seg(t, 10.1, 10.9); px = 530 + 120 * k; py = 1150 - 1500 * k * k; note = '✓ booked'; }
    pg = Ch.pigeon(px, py, t, { dir, pose: ps, note, s: 0.8 });
  }
  if (t < 10.55) s += chatPanel(t, FIX + 0.85, [
    { at: 8.1, text: 'Table for 4, Fri 8pm?' },
    { at: 8.7, text: 'Booked! See you Friday ✓', out: 1 },
    { at: 9.4, text: 'Table for 2, Saturday?' },
    { at: 9.9, text: 'Done ✓ Sat 1pm', out: 1 },
  ]);
  s += pg;
  if (t >= 10.55) s += S.tag(t, 10.55, 'AI agents from £875', 'setup + £109/month', { y: 690, w: 880 });
  s += S.head(t, FIX + 0.25, 'An *AI* *agent* answers | and books.');
  return s;
}

module.exports = {
  dur: DUR,
  frame(t) {
    let s = t < FIX ? chaos(t) : fix(t);
    s += S.wipe(t, FIX, C.red, 0.45);
    s += S.endOnly(t, END, 'dark');
    return s;
  },
};
