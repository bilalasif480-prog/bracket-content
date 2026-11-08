// "One thumb. One chance." — a customer keeps missing a tiny Pay button on a phone, brackets fix + test it, order goes through
const { C, clamp, seg, eo, eio, eb, lerp, f, txt, line, bracket, bug, check, confetti, sparkle, bubble, endCard } = require('./lib');
const PX = 340, PY = 600, PW = 400, PH = 700, FLOOR = 1480;
const CX = PX + PW / 2, SL = PX + 36, SR = PX + PW - 36;
const HK = JSON.parse(process.env.HOOK);
const END = 13.2;
const BTN_Y = PY + 560;           // pay button centre y
const grow = t => eb(seg(t, 9.2, 9.9));
const btnW = t => lerp(96, 328, grow(t)), btnH = t => lerp(40, 84, grow(t));
const btnCx = t => SR - btnW(t) / 2;

// thumb taps: time, x, y (tip), hit?
const TAPS = [
  { t: 1.0, x: 586, y: BTN_Y - 8, hit: false },
  { t: 1.9, x: 660, y: BTN_Y - 52, hit: false },
  { t: 2.8, x: 604, y: BTN_Y + 52, hit: false },
  { t: 11.2, x: 540, y: BTN_Y, hit: true },
];
function thumb(t) {
  for (const k of TAPS) {
    const p = (t - k.t) / 1.0;
    if (p < -0.05 || p > 1) continue;
    const a = p < 0.35 ? eo(clamp(p / 0.35)) : p < 0.55 ? 1 : 1 - eio(clamp((p - 0.55) / 0.45));
    const rx = 800, ry = 1560;
    const x = lerp(rx, k.x, a), y = lerp(ry, k.y, a);
    const press = p > 0.33 && p < 0.5 ? 0.94 : 1;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(-22) scale(${f(press)})"><rect x="-46" y="0" width="92" height="560" rx="46" fill="#f2c9a5" stroke="${C.ink}" stroke-width="6"/><ellipse cx="0" cy="34" rx="28" ry="24" fill="#ffe3d2" stroke="${C.ink}" stroke-width="4"/></g>`;
  }
  return '';
}
function ripples(t) {
  let s = '';
  for (const k of TAPS) {
    const p = (t - (k.t + 0.35)) / 0.55;
    if (p < 0 || p > 1) continue;
    const col = k.hit ? C.green : C.red;
    s += `<circle cx="${k.x}" cy="${k.y}" r="${f(lerp(14, 70, eo(p)))}" fill="none" stroke="${col}" stroke-width="8" opacity="${f(1 - p)}"/>`;
    if (!k.hit) s += `<g opacity="${f(1 - p)}"><path d="M${k.x - 14} ${k.y - 74 - 14} l28 28 M${k.x + 14} ${k.y - 74 - 14} l-28 28" stroke="${C.red}" stroke-width="9" stroke-linecap="round"/></g>`;
  }
  return s;
}

function screen(t) {
  let s = `<clipPath id="scr"><rect x="${PX + 14}" y="${PY + 70}" width="${PW - 28}" height="${PH - 110}" rx="26"/></clipPath><g clip-path="url(#scr)">`;
  s += `<rect x="${PX + 14}" y="${PY + 70}" width="${PW - 28}" height="${PH - 110}" fill="#fff"/>`;
  // title
  s += txt('السلة', SR, PY + 130, 36, C.ink, { anchor: 'end', weight: 800 });
  s += `<rect x="${SL}" y="${PY + 104}" width="70" height="16" rx="8" fill="#e8e5e2"/>`;
  // two item rows
  [0, 1].forEach(i => {
    const y = PY + 164 + i * 124;
    s += `<rect x="${SL}" y="${y}" width="${PW - 72}" height="106" rx="22" fill="#fff" stroke="#d9d5d1" stroke-width="3"/><rect x="${SL + 14}" y="${y + 14}" width="78" height="78" rx="16" fill="${i ? C.red : C.peach}"/><rect x="${SL + 108}" y="${y + 28}" width="120" height="18" rx="9" fill="#d9d5d1"/><rect x="${SL + 108}" y="${y + 60}" width="76" height="16" rx="8" fill="#e8e5e2"/>`;
  });
  // total
  s += txt('المجموع', SR, PY + 470, 30, C.mute, { anchor: 'end', weight: 700 });
  s += `<rect x="${SL}" y="${PY + 448}" width="96" height="22" rx="11" fill="#d9d5d1"/>`;
  // pay button (tiny -> full width)
  const bw = btnW(t), bh = btnH(t), bcx = btnCx(t), fixed = t > 9.2;
  s += `<rect x="${f(bcx - bw / 2)}" y="${f(BTN_Y - bh / 2)}" width="${f(bw)}" height="${f(bh)}" rx="${f(bh / 2)}" fill="${fixed && t > 9.9 ? C.red : C.red}"/>`;
  s += txt(t < 9.2 ? 'ادفع' : 'ادفع الآن', bcx, BTN_Y + lerp(8, 13, grow(t)), lerp(20, 38, grow(t)), '#fff', { weight: 800 });
  // toast
  if (t > 4.6 && t < 9.6) { const k = eb(seg(t, 4.6, 5.1)), o = 1 - seg(t, 9.0, 9.6); s += `<g transform="translate(0 ${f((1 - k) * -90)})" opacity="${f(o)}"><rect x="${SL}" y="${PY + 84}" width="${PW - 72}" height="56" rx="16" fill="${C.red}"/>${txt('طلب ملغي', CX, PY + 122, 28, '#fff', { weight: 800 })}</g>`; }
  // success overlay
  if (t >= 11.7) {
    const k = eb(seg(t, 11.7, 12.2));
    s += `<rect x="${PX + 14}" y="${PY + 70}" width="${PW - 28}" height="${PH - 110}" fill="#fff" opacity="${f(clamp(k))}"/>`;
    s += `<g transform="translate(${CX} ${PY + 330}) scale(${f(k)}) translate(${-CX} ${-(PY + 330)})"><circle cx="${CX}" cy="${PY + 330}" r="84" fill="${C.green}"/><path d="M${CX - 38} ${PY + 332} L${CX - 8} ${PY + 362} L${CX + 44} ${PY + 302}" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${txt('تم الطلب', CX, PY + 490, 52, C.ink, { weight: 800 })}</g>`;
  }
  s += '</g>';
  return s;
}
function phone(t) {
  return `<rect x="${PX + 12}" y="${PY + 14}" width="${PW}" height="${PH}" rx="64" fill="rgba(32,30,29,.18)"/>
  <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="64" fill="#fff" stroke="${C.ink}" stroke-width="10"/>
  <rect x="${CX - 56}" y="${PY + 22}" width="112" height="22" rx="11" fill="${C.ink}"/>${screen(t)}`;
}
function chips(t) {
  const rows = [['375px', 800, 10.0], ['390px', 880, 10.35], ['430px', 960, 10.7]];
  let s = '';
  rows.forEach(r => {
    const k = eb(seg(t, r[2] - 0.15, r[2] + 0.2));
    if (k <= 0) return;
    s += `<g transform="translate(150 ${r[1]}) scale(${f(k)}) translate(-150 -${r[1]})"><rect x="60" y="${r[1] - 34}" width="190" height="68" rx="34" fill="#fff" stroke="${C.ink}" stroke-width="5"/>${txt(r[0], 155, r[1] + 12, 34, C.ink, { mono: true, weight: 700 })}</g>`;
    s += check(292, r[1], 30, seg(t, r[2] + 0.1, r[2] + 0.45));
  });
  return s;
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < END + 0.6) {
    s += `<g opacity="${f(1 - seg(t, END, END + 0.6))}">`;
    if (t < 4.3) {
      const o = 1 - seg(t, 3.9, 4.3);
      s += line(HK[0], 540, 290, HK[0].length > 13 ? 92 : 104, C.ink, t, 0.2, { op: o }) + line(HK[1], 540, 396, HK[1].length > 16 ? 84 : (HK[1].length > 13 ? 94 : 104), C.red, t, 0.5, { op: o }) + line(HK[2], 540, 492, HK[2].length > 24 ? 56 : 64, C.ink, t, 0.9, { op: o });
    } else if (t < 8.9) {
      const o = 1 - seg(t, 8.5, 8.9);
      s += line('Tiny button', 540, 330, 108, C.ink, t, 4.4, { op: o }) + line('= lost order.', 540, 436, 104, C.red, t, 4.75, { op: o }) + line('زر صغير = طلب ضايع', 540, 534, 66, C.ink, t, 5.2, { op: o });
    } else {
      s += line('We fix it,', 540, 330, 108, C.ink, t, 9.0) + line('then we test it.', 540, 436, 96, C.red, t, 9.3) + line('نصلحه وبعدين نختبره', 540, 534, 66, C.ink, t, 9.7);
    }
    s += `<g transform="translate(540 950) scale(${f(eb(seg(t, 0.1, 0.6)))}) translate(-540 -950)">${phone(t)}</g>`;
    // bug sits on the tiny button, then flees
    if (t > 0.6 && t < 9.8) {
      const pop = eb(seg(t, 0.6, 1.0)), flee = eo(seg(t, 8.4, 9.7));
      s += bug(lerp(660, -240, flee), lerp(BTN_Y - 30, BTN_Y - 30, flee) - Math.abs(Math.sin(t * 6)) * (t < 8.4 ? 6 : 0), t, { s: 0.52 * pop, flip: flee > 0 ? 1 : -1, mood: t < 8.4 ? 'cheeky' : 'scared', crawl: t < 8.4 ? 0.3 : 1 });
    }
    s += thumb(t) + ripples(t);
    // brackets walk in, stomp, celebrate
    if (t > 6.5) {
      const enter = eo(seg(t, 6.6, 7.9));
      const stomp = t > 8.4 && t < 9.0 ? 1 - Math.sin(seg(t, 8.4, 9.0) * Math.PI) * 0.14 : 1;
      const hap = t > 9.0;
      s += bracket(lerp(-220, 130, enter), FLOOR, 'L', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: stomp, mood: hap ? 'happy' : 'grit', look: 1, bounce: t > 11.9 ? 1 : 0 });
      s += bracket(lerp(1300, 950, enter), FLOOR, 'R', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: stomp, mood: hap ? 'happy' : 'grit', look: -1, bounce: t > 11.9 ? 1 : 0 });
    }
    s += chips(t);
    if (t > 11.9) s += bubble(540, 1415, 'Order placed!', t, 11.9, END) + confetti(CX, PY + 330, 11.9, t, 34) + sparkle(210, 700, 28, t, 1) + sparkle(880, 1300, 26, t, 3);
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + 0.6))}">${endCard(t, END)}</g>`;
  return s;
}
module.exports = { dur: 18.8, frame };
