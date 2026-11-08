// "What if they tap Pay 5 times?" — double-submit bug: 5 taps = 5 orders; brackets fix it, now it counts once
const { C, clamp, seg, eo, eio, eb, lerp, f, txt, line, bracket, bug, check, confetti, sparkle, bubble, endCard } = require('./lib');
const PX = 340, PY = 600, PW = 400, PH = 700, FLOOR = 1480;
const CX = PX + PW / 2, SL = PX + 36, SR = PX + PW - 36;
const END = 12.6, FIX = 8.2;
const BTN_Y = PY + 560, BW = PW - 72, BH = 84;
const BUG_TAPS = [1.4, 2.0, 2.6, 3.2, 3.8];
const FIX_TAPS = [9.6, 10.1, 10.6, 11.1, 11.6];
const TAPS = [...BUG_TAPS.map(t => ({ t, fixed: false })), ...FIX_TAPS.map((t, i) => ({ t, fixed: true, first: i === 0 }))];
const tapX = i => CX + [-40, 30, -10, 50, 0][i % 5];
const count = t => t >= FIX ? (t > FIX_TAPS[0] + 0.3 ? 1 : 0) : BUG_TAPS.filter(a => t > a + 0.3).length;

function thumb(t) {
  for (const k of TAPS) {
    const p = (t - k.t) / 0.55;
    if (p < -0.05 || p > 1) continue;
    const a = p < 0.5 ? eo(clamp(p / 0.5)) : 1 - eio(clamp((p - 0.5) / 0.5));
    const i = TAPS.indexOf(k) % 5;
    const x = lerp(820, tapX(i), a), y = lerp(1560, BTN_Y + 6, a);
    const press = p > 0.45 && p < 0.6 ? 0.94 : 1;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(-22) scale(${f(press)})"><rect x="-46" y="0" width="92" height="560" rx="46" fill="#f2c9a5" stroke="${C.ink}" stroke-width="6"/><ellipse cx="0" cy="34" rx="28" ry="24" fill="#ffe3d2" stroke="${C.ink}" stroke-width="4"/></g>`;
  }
  return '';
}
function ripples(t) {
  let s = '';
  for (const k of TAPS) {
    const p = (t - (k.t + 0.28)) / 0.5;
    if (p < 0 || p > 1) continue;
    const i = TAPS.indexOf(k) % 5;
    const col = k.fixed ? (k.first ? C.green : '#9a9593') : C.red;
    s += `<circle cx="${tapX(i)}" cy="${BTN_Y + 6}" r="${f(lerp(14, 64, eo(p)))}" fill="none" stroke="${col}" stroke-width="8" opacity="${f(1 - p)}"/>`;
  }
  return s;
}
function screen(t) {
  let s = `<clipPath id="scr"><rect x="${PX + 14}" y="${PY + 70}" width="${PW - 28}" height="${PH - 110}" rx="26"/></clipPath><g clip-path="url(#scr)">`;
  s += `<rect x="${PX + 14}" y="${PY + 70}" width="${PW - 28}" height="${PH - 110}" fill="#fff"/>`;
  s += txt('الدفع', SR, PY + 130, 36, C.ink, { anchor: 'end', weight: 800 });
  // orders counter chip
  const n = count(t), good = t >= FIX;
  const pop = 1 + 0.14 * Math.max(0, 1 - ((t - ([...BUG_TAPS, FIX_TAPS[0]].map(a => a + 0.3).filter(a => a <= t).pop() || -9)) / 0.25));
  s += `<g transform="translate(${SL + 56} ${PY + 118}) scale(${f(pop)}) translate(${-(SL + 56)} ${-(PY + 118)})"><rect x="${SL}" y="${PY + 92}" width="112" height="52" rx="26" fill="${n === 0 ? '#e8e5e2' : good ? C.green : C.red}"/>${txt('x' + n, SL + 56, PY + 129, 32, '#fff', { mono: true, weight: 700 })}</g>`;
  [0, 1].forEach(i => {
    const y = PY + 176 + i * 124;
    s += `<rect x="${SL}" y="${y}" width="${PW - 72}" height="106" rx="22" fill="#fff" stroke="#d9d5d1" stroke-width="3"/><rect x="${SL + 14}" y="${y + 14}" width="78" height="78" rx="16" fill="${i ? C.red : C.peach}"/><rect x="${SL + 108}" y="${y + 28}" width="120" height="18" rx="9" fill="#d9d5d1"/><rect x="${SL + 108}" y="${y + 60}" width="76" height="16" rx="8" fill="#e8e5e2"/>`;
  });
  s += txt('المجموع', SR, PY + 480, 30, C.mute, { anchor: 'end', weight: 700 });
  s += `<rect x="${SL}" y="${PY + 458}" width="96" height="22" rx="11" fill="#d9d5d1"/>`;
  // pay button: red, turns grey "processing" once fixed + first tap
  const locked = t > FIX_TAPS[0] + 0.3;
  s += `<rect x="${SL}" y="${BTN_Y - BH / 2}" width="${BW}" height="${BH}" rx="${BH / 2}" fill="${locked ? '#9a9593' : C.red}"/>`;
  s += txt(locked ? 'جاري الدفع…' : 'ادفع', CX, BTN_Y + 13, 34, '#fff', { weight: 800 });
  // bug banner (after 5 taps) — 5 charges
  if (t > 4.4 && t < FIX + 0.4) { const k = eb(seg(t, 4.4, 4.9)), o = 1 - seg(t, FIX - 0.2, FIX + 0.4); s += `<g transform="translate(0 ${f((1 - k) * -90)})" opacity="${f(o)}"><rect x="${SL}" y="${PY + 150}" width="${PW - 72}" height="60" rx="16" fill="${C.red}"/>${txt('تم الخصم 5 مرات', CX, PY + 190, 28, '#fff', { weight: 800 })}</g>`; }
  s += '</g>';
  return s;
}
function phone(t) {
  return `<rect x="${PX + 12}" y="${PY + 14}" width="${PW}" height="${PH}" rx="64" fill="rgba(32,30,29,.18)"/>
  <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="64" fill="#fff" stroke="${C.ink}" stroke-width="10"/>
  <rect x="${CX - 56}" y="${PY + 22}" width="112" height="22" rx="11" fill="${C.ink}"/>${screen(t)}`;
}
function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < END + 0.6) {
    s += `<g opacity="${f(1 - seg(t, END, END + 0.6))}">`;
    if (t < 4.4) {
      const o = 1 - seg(t, 4.0, 4.4);
      s += line('What if they', 540, 290, 104, C.ink, t, 0.2, { op: o }) + line('tap Pay 5 times?', 540, 396, 92, C.red, t, 0.5, { op: o }) + line('لو ضغط العميل ادفع 5 مرات؟', 540, 492, 62, C.ink, t, 0.9, { op: o });
    } else if (t < FIX) {
      const o = 1 - seg(t, FIX - 0.4, FIX);
      s += line('Five orders.', 540, 330, 108, C.ink, t, 4.5, { op: o }) + line('Five charges.', 540, 436, 104, C.red, t, 4.85, { op: o }) + line('5 طلبات… و5 خصومات', 540, 534, 64, C.ink, t, 5.3, { op: o });
    } else {
      s += line('We test it', 540, 330, 108, C.ink, t, FIX + 0.1) + line('before launch.', 540, 436, 100, C.red, t, FIX + 0.4) + line('نختبره قبل الإطلاق', 540, 534, 66, C.ink, t, FIX + 0.8);
    }
    s += `<g transform="translate(540 950) scale(${f(eb(seg(t, 0.1, 0.6)))}) translate(-540 -950)">${phone(t)}</g>`;
    // bug appears with the first tap, scared away at the fix
    if (t > 1.1 && t < FIX + 1.4) {
      const pop = eb(seg(t, 1.1, 1.5)), flee = eo(seg(t, FIX - 0.2, FIX + 1.3));
      s += bug(lerp(700, -240, flee), BTN_Y - 70 - Math.abs(Math.sin(t * 7)) * (t < FIX - 0.2 ? 8 : 0), t, { s: 0.5 * pop, flip: flee > 0 ? 1 : -1, mood: t < FIX - 0.2 ? 'cheeky' : 'scared', crawl: t < FIX - 0.2 ? 0.3 : 1 });
    }
    s += thumb(t) + ripples(t);
    if (t > 5.8) {
      const enter = eo(seg(t, 5.9, 7.2));
      const stomp = t > 7.5 && t < FIX + 0.1 ? 1 - Math.sin(seg(t, 7.5, FIX + 0.1) * Math.PI) * 0.14 : 1;
      const hap = t > FIX + 0.1;
      s += bracket(lerp(-220, 130, enter), FLOOR, 'L', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: stomp, mood: hap ? 'happy' : 'grit', look: 1, bounce: t > 10.0 ? 1 : 0 });
      s += bracket(lerp(1300, 950, enter), FLOOR, 'R', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: stomp, mood: hap ? 'happy' : 'grit', look: -1, bounce: t > 10.0 ? 1 : 0 });
    }
    if (t > 10.0) s += bubble(540, 1415, 'Counts once!', t, 10.0, END) + confetti(CX, PY + 300, 10.0, t, 30) + sparkle(210, 700, 28, t, 1) + sparkle(880, 1300, 26, t, 3);
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + 0.6))}">${endCard(t, END)}</g>`;
  return s;
}
module.exports = { dur: 16.2, frame };
