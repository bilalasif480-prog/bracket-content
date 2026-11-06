const L = require('./lib');
const { C, seg, eo, eio, eb, lerp, f, txt, line, bracket, bug, check, confetti, sparkle, endCard } = L;
const FLOOR = 1480;
const SX = 160, SY = 470, SW = 760, SH = 760; // site frame

function chip(x, y, label, fill, col, t, a) {
  const k = eb(seg(t, a, a + 0.5)); if (k <= 0) return '';
  const w = label.length * 26 + 70;
  return `<g transform="translate(${x} ${y}) scale(${f(k)})"><rect x="${-w / 2}" y="-34" width="${w}" height="68" rx="34" fill="${fill}"/>${txt(label, 0, 14, 38, col, { mono: true, ls: 4 })}</g>`;
}
// falling block
function block(t, a, x, y, w, h, fill, r = 16, stroke = '') {
  const k = eb(seg(t, a, a + 0.55)); const op = clamp01((t - a) / 0.12); if (op <= 0) return '';
  const dy = (1 - k) * -700;
  return `<rect x="${x}" y="${f(y + dy)}" width="${w}" height="${h}" rx="${r}" fill="${fill}" opacity="${f(op)}" ${stroke}/>`;
}
const clamp01 = x => Math.max(0, Math.min(1, x));

function magnifier(x, y, t, big = 1) {
  const wig = Math.sin(t * 7) * 6;
  return `<g transform="translate(${f(x + wig)} ${f(y)}) scale(${f(big)})"><line x1="60" y1="60" x2="150" y2="150" stroke="${C.ink}" stroke-width="24" stroke-linecap="round"/><circle r="84" fill="rgba(255,255,255,.55)" stroke="${C.ink}" stroke-width="18"/><path d="M-42 -30 A56 56 0 0 1 8 -58" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" opacity=".9"/></g>`;
}

function site(t) {
  let s = '';
  // frame & header
  const k = eo(seg(t, 3.2, 3.8));
  s += `<g opacity="${f(k)}"><rect x="${SX + 12}" y="${SY + 14}" width="${SW}" height="${SH}" rx="34" fill="rgba(32,30,29,.15)"/><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="34" fill="#fff" stroke="${C.ink}" stroke-width="8"/><path d="M${SX + 4} ${SY + 78} V${SY + 38} Q${SX + 4} ${SY + 4} ${SX + 38} ${SY + 4} H${SX + SW - 38} Q${SX + SW - 4} ${SY + 4} ${SX + SW - 4} ${SY + 38} V${SY + 78} Z" fill="${C.ink}"/><circle cx="${SX + 44}" cy="${SY + 41}" r="11" fill="${C.red}"/><circle cx="${SX + 78}" cy="${SY + 41}" r="11" fill="${C.gold}"/><circle cx="${SX + 112}" cy="${SY + 41}" r="11" fill="${C.green}"/></g>`;
  const x0 = SX + 40, w0 = SW - 80;
  s += block(t, 3.9, x0, SY + 110, w0, 56, C.paper);                 // nav
  s += block(t, 4.5, x0, SY + 190, w0 * 0.62, 50, C.ink);            // headline
  s += block(t, 4.9, x0, SY + 258, w0 * 0.45, 30, C.paper);          // sub
  s += block(t, 5.3, x0 + w0 * 0.66, SY + 190, w0 * 0.34, 170, C.peach);  // image
  s += block(t, 5.7, x0, SY + 320, w0 * 0.3, 70, C.red, 35);         // button
  const cw = (w0 - 40) / 3;
  for (let i = 0; i < 3; i++) s += block(t, 6.0 + i * 0.3, x0 + i * (cw + 20), SY + 450, cw, 230, i === 2 ? '#fff' : C.paper, 22, i === 2 ? `stroke="${C.ink}" stroke-width="6"` : '');
  return s;
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  const sceneOp = 1 - seg(t, 13.8, 14.4);
  if (t < 14.4) {
    s += `<g opacity="${f(sceneOp)}">`;
    // titles
    if (t < 3.4) { const o = 1 - seg(t, 3.0, 3.4); s += line('TWO DISCIPLINES.', 540, 470, 92, C.ink, t, 0.3, { op: o }) + line('ONE TEAM.', 540, 600, 124, C.red, t, 0.8, { op: o }); }
    if (t >= 3.4 && t < 9.4) {
      const a = t < 6.7 ? 1 - seg(t, 6.3, 6.7) : 1 - seg(t, 9.0, 9.4);
      if (t < 6.7) s += line('Build it.', 540, 330, 130, C.red, t, 3.5, { op: a });
      else s += line('Test it.', 540, 330, 130, C.ink, t, 6.8, { op: a });
    }
    if (t >= 9.4) s += line('Nothing falls', 540, 300, 96, C.ink, t, 9.6) + line('in the gap.', 540, 420, 116, C.red, t, 10.0);

    // site
    if (t > 3.2) s += site(t);

    // characters
    const enter = eo(seg(t, 0.2, 1.0));
    const lx = lerp(-150, 100, enter), rx = lerp(1230, 980, enter);
    const buildHop = t > 3.9 && t < 6.8 ? 1 : 0;
    let lMood = 'happy', rMood = 'happy';
    // bug on card 3
    const cwid = (SW - 80 - 40) / 3, cx3 = SX + 40 + 2 * (cwid + 20) + cwid / 2, cy3 = SY + 450 + 115;
    const found = t > 7.5, caught = t > 8.3;
    if (found && !caught) rMood = 'wow';
    if (t > 8.0 && t < 9.4) rMood = 'grit';
    const jump = t > 8.1 && t < 8.5 ? Math.sin(seg(t, 8.1, 8.5) * Math.PI) * 40 : 0;
    const joy = t > 9.4 ? 1 : 0;
    // high-five: walk toward centre late
    const hf = eio(seg(t, 10.2, 11.2));
    const lxx = lerp(lx, 400, hf), rxx = lerp(rx, 680, hf);
    s += bracket(lxx, FLOOR, 'L', t, { s: 1, hat: true, bounce: buildHop || joy, mood: lMood, look: 1, walk: t < 1.0 ? 1 : (t > 10.2 && t < 11.2 ? 1 : 0) });
    s += bracket(rxx, FLOOR - jump, 'R', t, { s: 1, bounce: joy, mood: rMood, look: -1, walk: t < 1.0 ? 1 : (t > 10.2 && t < 11.2 ? 1 : 0) });
    if (t > 3.9 && t < 9.9) { s += chip(lx + 20, 1150, 'BUILD', C.red, '#fff', t, 3.9); s += chip(rx - 50, 1150, 'TEST', C.ink, '#fff', t, 6.6); }
    if (t > 7.5 && t < 8.4 && !caught) s += `<g transform="translate(${rx - 20} 1090)">${txt('!', 0, 0, 120, C.red, { weight: 900 })}</g>`;

    // magnifier + bug
    if (t > 6.6 && t < 8.6) {
      const k1 = eio(seg(t, 6.6, 7.6));
      const mx = lerp(rx - 300, cx3 - 30, k1) - Math.sin(k1 * Math.PI) * 220;
      const my = lerp(1150, cy3 - 40, k1) - Math.sin(k1 * Math.PI) * 240;
      s += magnifier(mx, my, t, 1 + (found ? 0.25 : 0));
    }
    if (t > 7.5 && t < 9.2) {
      const pk = eb(seg(t, 7.5, 7.9));
      if (!caught) s += bug(cx3, cy3 + 20, t, { s: 0.5 * pk, flip: -1, mood: 'scared', crawl: 1.5 });
      else { const k = seg(t, 8.3, 8.9); s += bug(cx3, cy3 + 40, t, { s: 0.5 * (1 - k * 0.2), squash: 0.35, dizzy: true, flip: -1, crawl: 0 }); if (k > 0.3) for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2, r = 130 * k; s += `<circle cx="${f(cx3 + Math.cos(a) * r)}" cy="${f(cy3 + 40 + Math.sin(a) * r)}" r="${f(16 * (1 - k))}" fill="${C.red}"/>`; } }
    }
    if (t > 8.5 && t < 9.4) s += txt('SQUASHED', cx3, cy3 - 140, 44, C.red, { mono: true, op: 1 - seg(t, 9.0, 9.4) });

    // done: signed off
    if (t > 9.4) {
      s += check(SX + SW - 60, SY + 80 + 30, 72, seg(t, 9.4, 9.9));
      const k = eb(seg(t, 9.8, 10.3));
      s += `<g transform="translate(540 1010) rotate(-6) scale(${f(k)})"><rect x="-260" y="-58" width="520" height="116" rx="58" fill="${C.green}"/>${txt('SIGNED OFF ✓', 0, 24, 62, '#fff', { ls: 1 })}</g>`;
      s += confetti(540, 800, 9.4, t, 34);
    }
    s += '</g>';
  }
  if (t >= 13.8) s += `<g opacity="${f(seg(t, 13.8, 14.4))}">${endCard(t, 13.8)}</g>`;
  return s;
}
module.exports = { dur: 19, frame };
