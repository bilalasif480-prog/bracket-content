// "Spot the bug" — an Arabic page with English-style (LTR) layout bugs; brackets fix the RTL, bug flees
const { C, clamp, seg, eo, eio, eb, lerp, f, txt, line, bracket, bug, check, confetti, sparkle, bubble, endCard } = require('./lib');
const X0 = 240, Y0 = 620, W = 600, H = 640, FLOOR = 1480;
const L = X0 + 46, R = X0 + W - 46;            // content edges inside the card
const BARS = [{ y: Y0 + 276, w: 430 }, { y: Y0 + 334, w: 350 }, { y: Y0 + 392, w: 400 }];
const BCX = X0 + W / 2, BCY = Y0 + H - 118;    // button centre
const FIX0 = 9.0;

function card(t) {
  const k = eio(seg(t, FIX0, FIX0 + 0.8));
  const flip = lerp(1, -1, eb(seg(t, FIX0 + 0.1, FIX0 + 0.7)));
  let s = `<rect x="${X0 + 12}" y="${Y0 + 14}" width="${W}" height="${H}" rx="40" fill="rgba(32,30,29,.18)"/>
  <rect x="${X0}" y="${Y0}" width="${W}" height="${H}" rx="40" fill="#fff" stroke="${C.ink}" stroke-width="8"/>
  <path d="M${X0 + 4} ${Y0 + 100} V${Y0 + 44} Q${X0 + 4} ${Y0 + 4} ${X0 + 44} ${Y0 + 4} H${X0 + W - 44} Q${X0 + W - 4} ${Y0 + 4} ${X0 + W - 4} ${Y0 + 44} V${Y0 + 100} Z" fill="${C.ink}"/>
  <circle cx="${L + 8}" cy="${Y0 + 52}" r="10" fill="${C.red}"/><circle cx="${L + 40}" cy="${Y0 + 52}" r="10" fill="${C.gold}"/><circle cx="${L + 72}" cy="${Y0 + 52}" r="10" fill="${C.green}"/>`;
  s += txt('المتجر', R, Y0 + 70, 46, '#fff', { anchor: 'end' });
  // heading is correctly right-aligned
  s += txt('عرض خاص', R, Y0 + 205, 70, C.ink, { anchor: 'end' });
  // paragraph bars: stuck to the LEFT (bug) until the brackets slide them to the RIGHT
  BARS.forEach((b, i) => {
    const x = lerp(L, R - b.w, clamp(k * 1.0));
    s += `<rect x="${f(x)}" y="${b.y}" width="${b.w}" height="30" rx="15" fill="${i === 0 ? C.peach : '#d9d5d1'}"/>`;
  });
  // product tile
  s += `<rect x="${f(lerp(L, R - 150, k))}" y="${Y0 + 235}" width="0" height="0"/>`;
  // button with arrow that points the wrong way until fixed
  s += `<rect x="${BCX - 190}" y="${BCY - 52}" width="380" height="104" rx="52" fill="${C.red}"/>`;
  s += txt('التالي', BCX + 40, BCY + 17, 48, '#fff', { weight: 800 });
  s += `<g transform="translate(${BCX - 120} ${BCY}) scale(${f(flip)} 1)"><path d="M-30 0 H26 M4 -24 L30 0 L4 24" stroke="#fff" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  return s;
}

function flags(t) {
  const op = clamp((t - 1.8) / 0.4) * (1 - seg(t, FIX0, FIX0 + 0.3));
  if (op <= 0) return '';
  const p = 0.65 + 0.35 * Math.sin(t * 9);
  const badge = (x, y) => `<g transform="translate(${x} ${y})"><circle r="26" fill="${C.red}"/>${txt('!', 0, 14, 42, '#fff', { ls: 0 })}</g>`;
  return `<g opacity="${f(op * p)}">
    <rect x="${L - 18}" y="${Y0 + 252}" width="${W - 56}" height="${190}" rx="26" fill="none" stroke="${C.red}" stroke-width="7" stroke-dasharray="22 14"/>
    <circle cx="${BCX - 120}" cy="${BCY}" r="54" fill="none" stroke="${C.gold}" stroke-width="7" stroke-dasharray="18 12"/>
  </g><g opacity="${f(op)}">${badge(R + 6, Y0 + 262)}${badge(BCX - 176, BCY - 40)}</g>`;
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < 13.6) {
    s += `<g opacity="${f(1 - seg(t, 13.0, 13.6))}">`;
    // captions: English big, Arabic ~70% directly under
    if (t < 3.6) {
      const o = 1 - seg(t, 3.2, 3.6);
      s += line('Can you spot', 540, 340, 92, C.ink, t, 0.2, { op: o }) + line('the bug?', 540, 446, 104, C.red, t, 0.6, { op: o }) + line('شفت الغلط؟', 540, 548, 72, C.ink, t, 1.0, { op: o });
    } else if (t < 7.4) {
      const o = 1 - seg(t, 7.0, 7.4);
      s += line('Arabic site.', 540, 340, 92, C.ink, t, 3.7, { op: o }) + line('English layout.', 540, 446, 92, C.red, t, 4.1, { op: o }) + line('موقع عربي، تصميم إنجليزي', 540, 548, 64, C.ink, t, 4.5, { op: o });
    } else {
      s += line('We test RTL', 540, 340, 96, C.ink, t, 7.6) + line('before launch.', 540, 446, 96, C.red, t, 8.0) + line('نختبره قبل الإطلاق', 540, 548, 66, C.ink, t, 8.4);
    }

    const ck = eb(seg(t, 0.1, 0.6));
    s += `<g transform="translate(540 940) scale(${f(ck)}) translate(-540 -940)">${card(t)}${flags(t)}</g>`;

    // the bug crawls in, sits on the page, then runs away when the brackets arrive
    if (t > 3.9 && t < 10.6) {
      const inK = eo(seg(t, 3.9, 5.0)), outK = eo(seg(t, 8.7, 10.4));
      const x = lerp(1240, 770, inK) + outK * 520;
      const scared = t > 8.6;
      s += bug(x, Y0 + 352 + Math.sin(t * 3) * 4, t, { s: 0.7, flip: scared ? 1 : -1, mood: scared ? 'scared' : 'cheeky', crawl: t < 5.0 || scared ? 1 : 0.25 });
    }

    // brackets walk in, stomp, RTL fixed
    if (t > 7.3) {
      const enter = eo(seg(t, 7.4, 8.8));
      const stomp = t > FIX0 - 0.1 && t < FIX0 + 0.5 ? 1 - Math.sin(seg(t, FIX0 - 0.1, FIX0 + 0.5) * Math.PI) * 0.14 : 1;
      const mood = t < FIX0 + 0.6 ? 'grit' : 'happy';
      const lx = lerp(-220, 150, enter), rx = lerp(1300, 930, enter);
      s += bracket(lx, FLOOR, 'L', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: stomp, mood, look: 1, bounce: t > 10.4 ? 1 : 0 });
      s += bracket(rx, FLOOR, 'R', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: stomp, mood, look: -1, bounce: t > 10.4 ? 1 : 0 });
    }

    // checks + celebration
    if (t > FIX0 + 0.8) {
      s += check(R + 6, Y0 + 262, 30, seg(t, FIX0 + 0.8, FIX0 + 1.2));
      s += check(BCX - 176, BCY - 40, 30, seg(t, FIX0 + 1.0, FIX0 + 1.4));
    }
    if (t > FIX0 + 0.9) {
      s += bubble(540, 1345, 'Fixed!', t, FIX0 + 0.9, 13.0) + confetti(540, 940, FIX0 + 0.9, t, 34) + sparkle(220, 700, 28, t, 1) + sparkle(860, 1280, 26, t, 3);
    }
    s += '</g>';
  }
  if (t >= 13.0) s += `<g opacity="${f(seg(t, 13.0, 13.6))}">${endCard(t, 13.0)}</g>`;
  return s;
}
module.exports = { dur: 18.5, frame };
