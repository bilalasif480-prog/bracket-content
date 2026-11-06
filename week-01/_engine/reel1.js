const L = require('./lib');
const { C, seg, eo, eio, eb, lerp, f, txt, line, bracket, bug, windowMock, check, confetti, sparkle, bubble, endCard } = L;

const FLOOR = 1520, WX = 90, WY = 560, WW = 900, WH = 700;

function bugState(t) {
  // returns {x,y,flip,mood,rot,dizzy,crawl,squash}
  if (t < 3.6) { // crawling on the floor, left across to x=760
    const k = eio(seg(t, 1.2, 3.6));
    return { x: lerp(1300, 900, k), y: 1450, flip: -1, mood: 'cheeky', crawl: 1, s: 0.95 };
  }
  if (t < 4.0) { const k = seg(t, 3.6, 4.0); return { x: lerp(900, 1000, k), y: lerp(1450, 1150, eo(k)) - Math.sin(k * Math.PI) * 120, flip: -1, mood: 'cheeky', crawl: 1, s: 0.95 }; }
  if (t < 6.3) { const k = eio(seg(t, 4.0, 6.3)); return { x: lerp(1000, 520, k), y: 1150, flip: -1, mood: 'cheeky', crawl: 1, s: 0.95 }; }
  if (t < 8.7) return { x: 520, y: 1150, flip: -1, mood: 'cheeky', crawl: 0.2, s: 0.95 };
  if (t < 9.4) { const k = seg(t, 8.7, 9.4); return { x: lerp(520, 700, k), y: lerp(1150, 1450, k * k) - Math.sin(k * Math.PI) * 220, flip: -1, mood: 'scared', crawl: 1.4, rot: k * 360 * -1, s: 0.95 }; }
  if (t < 11.1) { // zig-zag fleeing
    const k = seg(t, 9.4, 11.1);
    return { x: 700 + Math.sin(k * Math.PI * 3.5) * 200 - k * 60, y: 1450, flip: Math.cos(k * Math.PI * 3.5) > 0 ? -1 : 1, mood: 'scared', crawl: 1.8, s: 0.95 };
  }
  const x = bugState(11.099).x;
  const sq = t < 11.4 ? 1 - Math.sin(seg(t, 11.1, 11.4) * Math.PI) * 0.2 : 1;
  return { x, y: 1450, flip: -1, mood: 'scared', crawl: 0, dizzy: t > 11.5, squash: sq, s: 0.95 };
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/>`;
  // floor line
  s += `<rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;

  // titles
  const t1 = 1 - seg(t, 3.0, 3.4);
  if (t < 3.4) {
    s += line('YOUR WEBSITE', 540, 560, 106, C.ink, t, 0.2, { op: t1 });
    s += line('HAS A BUG.', 540, 700, 124, C.red, t, 0.7, { op: t1 });
  }
  if (t > 3.4 && t < 8.7) {
    s += line('Customers find it', 540, 380, 88, C.ink, t, 3.5);
    s += line('before you do.', 540, 482, 88, C.red, t, 3.9);
  }
  if (t > 8.9 && t < 14.4) {
    const o = 1 - seg(t, 13.9, 14.3);
    s += line('We find it', 540, 380, 100, C.ink, t, 9.0, { op: o });
    s += line('first.', 540, 490, 120, C.red, t, 9.4, { op: o });
  }

  // window
  if (t >= 3.0 && t < 14.4) {
    const k = eo(seg(t, 3.0, 3.7));
    const state = t < 5.5 ? 'ok' : t < 12.2 ? 'bad' : 'fixed';
    const shake = state === 'bad' && t < 8.7 ? 4 : 0;
    const off = (1 - k) * 1000;
    const exitK = eio(seg(t, 13.8, 14.4));
    s += `<g transform="translate(0 ${f(off + exitK * 400)})">${windowMock(WX, WY, WW, WH, t, { state, shake, op: 1 - exitK })}</g>`;
    if (t > 12.2) {
      s += check(WX + WW - 130, WY + 150, 70, seg(t, 12.2, 12.7));
      s += sparkle(200, 640, 40, t, 0) + sparkle(900, 760, 32, t, 2) + sparkle(820, 1190, 36, t, 4);
    }
  }

  // bug
  if (t > 1.2 && t < 14.4) {
    const b = bugState(t);
    s += bug(b.x, b.y, t, { ...b });
    if (t > 6.4 && t < 7.9) s += bubble(b.x + 20, b.y - 130, 'hehe', t, 6.4, 7.9);
  }

  // brackets chase + catch
  if (t > 9.0 && t < 14.4) {
    const b = bugState(t);
    const enter = eo(seg(t, 9.0, 10.2));
    const closeK = eio(seg(t, 10.6, 11.15));
    const gap = lerp(lerp(900, 360, enter), 150, closeK);
    const sq = t > 11.1 && t < 11.45 ? 1 - Math.sin(seg(t, 11.1, 11.45) * Math.PI) * 0.12 : 1;
    const walking = t < 11.1 ? 1 : 0;
    const joy = t > 12.2 ? 1 : 0;
    const bx = b.x;
    const mood = t < 11.1 ? 'grit' : 'happy';
    const hop = joy ? Math.abs(Math.sin(t * 7)) * 30 : 0;
    s += bracket(bx - gap, FLOOR - hop, 'L', t, { s: 1, walk: walking, bounce: joy, squash: sq, mood, look: 1 });
    s += bracket(bx + gap, FLOOR - hop, 'R', t, { s: 1, walk: walking, bounce: joy, squash: sq, mood, look: -1 });
    if (t > 11.5 && t < 14.2) s += txt('[ bug ]', bx, FLOOR + 80, 40, C.ink, { mono: true, op: 0.7 });
    if (t > 11.1 && t < 11.7) { // impact stars
      const k = seg(t, 11.1, 11.7);
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; s += `<circle cx="${f(bx + Math.cos(a) * 160 * k)}" cy="${f(1440 + Math.sin(a) * 110 * k)}" r="${f(14 * (1 - k))}" fill="${C.red}"/>`; }
    }
  }
  if (t > 12.2 && t < 14.4) s += confetti(540, 900, 12.2, t, 36);

  // wipe + end card
  if (t > 14.0 && t < 14.7) { const k = eio(seg(t, 14.0, 14.7)); s += `<circle cx="540" cy="1000" r="${f(k * 1500)}" fill="${C.ink}"/>`; }
  if (t >= 14.7) s += endCard(t, 14.7);
  return s;
}

module.exports = { dur: 21, frame };
