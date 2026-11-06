// "Your contact form works... right?" — messages fall into a hole, brackets fix it
const { C, seg, eo, eio, eb, lerp, f, txt, line, bracket, check, confetti, sparkle, bubble, endCard } = require('./lib');
const FLOOR = 1480;
const HX = 560, HY = 1440; // hole

function form(x, y, t, press) {
  const pk = press ? 0.94 : 1;
  return `<g transform="translate(${x} ${y})">
   <rect x="-180" y="-250" width="360" height="500" rx="30" fill="#fff" stroke="${C.ink}" stroke-width="7"/>
   ${txt('CONTACT US', 0, -195, 34, C.ink, { mono: true })}
   <rect x="-140" y="-160" width="280" height="56" rx="14" fill="${C.paper}"/><rect x="-140" y="-84" width="280" height="56" rx="14" fill="${C.paper}"/><rect x="-140" y="-8" width="280" height="120" rx="14" fill="${C.paper}"/>
   <g transform="translate(0 175) scale(${pk})"><rect x="-140" y="-36" width="280" height="72" rx="36" fill="${C.red}"/>${txt('SEND', 0, 14, 38, '#fff', { ls: 3 })}</g>
  </g>`;
}
function envelope(x, y, t, o = {}) {
  const { s = 1, rot = 0, mood = 'happy' } = o;
  const flap = Math.sin(t * 14) * 8;
  const mouth = mood === 'happy' ? `<path d="M-22 26 Q0 44 22 26" stroke="${C.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>` : `<ellipse cx="0" cy="32" rx="10" ry="14" fill="${C.ink}"/>`;
  const wings = `<path d="M-90 -10 Q-150 ${-50 + flap} -130 10 Z" fill="#fff" stroke="${C.ink}" stroke-width="5"/><path d="M90 -10 Q150 ${-50 + flap} 130 10 Z" fill="#fff" stroke="${C.ink}" stroke-width="5"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s)})">${wings}<rect x="-95" y="-62" width="190" height="124" rx="14" fill="#fff" stroke="${C.ink}" stroke-width="6"/><path d="M-95 -62 L0 8 L95 -62" fill="${C.peach}" stroke="${C.ink}" stroke-width="6" stroke-linejoin="round"/><circle cx="-26" cy="0" r="8" fill="${C.ink}"/><circle cx="26" cy="0" r="8" fill="${C.ink}"/>${mouth}</g>`;
}
function inbox(x, y, n, t, glow) {
  const g = glow ? `<circle cx="${x}" cy="${y}" r="${f(190 + Math.sin(t * 8) * 10)}" fill="${C.gold}" opacity=".25"/>` : '';
  return `${g}<g transform="translate(${x} ${y})"><path d="M-140 -40 L-100 -120 H100 L140 -40 V100 Q140 120 120 120 H-120 Q-140 120 -140 100 Z" fill="${C.ink}"/><path d="M-140 -40 H-50 Q-40 10 0 10 Q40 10 50 -40 H140" stroke="${C.mute}" stroke-width="8" fill="none"/>
   ${txt('INBOX', 0, 84, 36, '#fff', { mono: true })}
   <g transform="translate(118 -112)"><circle r="42" fill="${n ? C.green : C.red}"/>${txt(String(n), 0, 15, 44, '#fff', { ls: 0 })}</g></g>`;
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < 13.6) {
    s += `<g opacity="${f(1 - seg(t, 13.0, 13.6))}">`;
    if (t < 3.6) { const o = 1 - seg(t, 3.2, 3.6); s += line('Your contact form', 540, 380, 92, C.ink, t, 0.2, { op: o }) + line('works… right?', 540, 492, 104, C.red, t, 0.6, { op: o }); }
    if (t >= 3.6 && t < 7.4) { const o = 1 - seg(t, 7.0, 7.4); s += line('Some messages', 540, 380, 96, C.ink, t, 3.7, { op: o }) + line('never arrive.', 540, 492, 108, C.red, t, 4.1, { op: o }); }
    if (t >= 7.4) s += line('We test every', 540, 380, 96, C.ink, t, 7.6) + line('form, end to end.', 540, 492, 92, C.red, t, 8.0);

    const fk = eb(seg(t, 0.1, 0.6));
    s += `<g transform="translate(260 920) scale(${f(fk * 0.9)}) translate(-260 -920)">${form(260, 920, t, (t > 1.6 && t < 1.8) || (t > 10.2 && t < 10.4))}</g>`;
    // cursor clicks SEND
    if (t > 1.0 && t < 2.2) { const k = eio(seg(t, 1.0, 1.6)); s += `<path transform="translate(${f(lerp(520, 300, k))} ${f(lerp(1300, 1095, k))})" d="M0 0 L0 60 L16 46 L28 72 L40 66 L28 40 L48 40 Z" fill="#fff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>`; }

    const n = t > 11.4 ? 1 : 0;
    const ik = eb(seg(t, 0.4, 0.9));
    s += `<g transform="translate(840 900) scale(${f(ik)}) translate(-840 -900)">${inbox(840, 900, n, t, t > 11.4)}</g>`;

    // the hole in the floor-path between form and inbox
    const holeR = t < 2.2 ? 0 : t < 9.6 ? eb(seg(t, 2.2, 2.7)) : 1 - eio(seg(t, 9.0, 9.6));
    if (holeR > 0) s += `<ellipse cx="${HX}" cy="${HY}" rx="${f(150 * holeR)}" ry="${f(46 * holeR)}" fill="${C.ink}"/>${holeR > 0.6 ? txt('404', HX, HY + 14, 34, C.red, { mono: true, op: holeR }) : ''}`;

    // envelope 1: flies, falls into the hole
    if (t > 1.8 && t < 4.6) {
      const k1 = eio(seg(t, 1.8, 2.8));
      if (t < 2.8) s += envelope(lerp(260, HX, k1), lerp(1080, HY - 260, k1) - Math.sin(k1 * Math.PI) * 120, t, { s: 0.7 });
      else { const k = seg(t, 2.8, 4.0); s += envelope(HX, lerp(HY - 260, HY, eio(k)), t, { s: 0.7 * (1 - k * 0.9), rot: k * 540, mood: 'oh' }); }
      if (t > 3.0) s += bubble(HX, HY - 380, 'nooo', t, 3.0, 4.4);
    }
    // brackets plug the hole
    if (t > 7.2 && t < 12.0) {
      const enter = eo(seg(t, 7.4, 8.6)), close = eio(seg(t, 8.6, 9.1)), out = eo(seg(t, 9.8, 10.4));
      const gap = lerp(lerp(700, 330, enter), 240, close) + out * 120;
      const stomp = t > 9.0 && t < 9.6 ? 1 - Math.sin(seg(t, 9.0, 9.6) * Math.PI) * 0.15 : 1;
      const mood = t < 9.6 ? 'grit' : 'happy';
      s += bracket(HX - gap, FLOOR, 'L', t, { walk: t < 8.6 ? 1 : 0, squash: stomp, mood, look: 1, bounce: t > 11.4 ? 1 : 0 });
      s += bracket(HX + gap, FLOOR, 'R', t, { walk: t < 8.6 ? 1 : 0, squash: stomp, mood, look: -1, bounce: t > 11.4 ? 1 : 0 });
    }
    // envelope 2: makes it to the inbox
    if (t > 10.3 && t < 11.5) { const k = eio(seg(t, 10.3, 11.4)); s += envelope(lerp(260, 840, k), lerp(1080, 880, k) - Math.sin(k * Math.PI) * 300, t, { s: 0.7 * (1 - k * 0.5) }); }
    if (t > 11.4) { s += bubble(840, 700, 'New lead!', t, 11.5, 13.0) + confetti(840, 900, 11.4, t, 30) + sparkle(980, 1080, 30, t, 1) + sparkle(700, 760, 26, t, 3); }
    s += '</g>';
  }
  if (t >= 13.0) s += `<g opacity="${f(seg(t, 13.0, 13.6))}">${endCard(t, 13.0)}</g>`;
  return s;
}
module.exports = { dur: 18.5, frame };
