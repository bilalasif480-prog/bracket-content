// TEST reel from research (10 Nov): empty-list hook "Will your clinic booking page survive?" (pattern: honeywave "WILL YOU SURVIVE?", adapted)
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, bug, check, confetti, wrap } = require('./lib2');
const rows = [
  ['Arabic name', 'اسم عربي'],
  ['Booking at 2 a.m.', 'حجز الساعة ٢ الفجر'],
  ['Double tap on Book', 'ضغطتين على احجز'],
  ['Slow 4G', 'نت ضعيف'],
  ['WhatsApp link', 'رابط الواتساب'],
];
const T0 = 2.4, STEP = 1.7, Y0 = 610, GAP = 172;
module.exports = wrap(11.6, t => {
  let s = '';
  // hook stays on screen the whole time (frame 1)
  s += line('Will your clinic', 540, 250, 82, C.ink, t, 0.05);
  s += line('booking page survive?', 540, 346, 82, C.red, t, 0.1);
  s += line('صفحة حجز العيادة… بتصمد؟', 540, 430, 54, C.ink, t, 0.2);
  rows.forEach((r, i) => {
    const y = Y0 + i * GAP, a = T0 + i * STEP, done = seg(t, a + 1.0, a + 1.3);
    const active = t >= a && t < a + 1.3;
    s += `<rect x="90" y="${y - 66}" width="900" height="140" rx="28" fill="${done > 0 ? '#fff' : 'rgba(32,30,29,.06)'}" stroke="${C.ink}" stroke-width="${done > 0 ? 7 : 4}" stroke-dasharray="${done > 0 ? '0' : '14 12'}"/>`;
    s += txt(String(i + 1), 150, y + 22, 64, done > 0 ? C.red : C.mute || '#999', { weight: 900 });
    if (t >= a) {
      s += txt(r[0], 230, y + 8, 50, C.ink, { anchor: 'start', weight: 800, ls: 0, op: eo(seg(t, a, a + .3)) });
      s += txt(r[1], 230, y + 58, 38, C.ink, { anchor: 'start', op: eo(seg(t, a, a + .3)) * .8 });
    }
    if (done > 0) s += check(920, y + 4, 34, done);
  });
  // the bug attacks the active row, flees when it passes
  const i = Math.min(4, Math.max(0, Math.floor((t - T0) / STEP)));
  if (t >= T0 - .3 && t < T0 + 5 * STEP) {
    const a = T0 + i * STEP, y = Y0 + i * GAP, phase = clamp((t - a) / 1.3), flee = seg(t, a + 1.0, a + 1.6);
    const x = 840 + flee * 360, shake = phase < .75 ? Math.sin(t * 40) * 4 : 0;
    s += bug(x + shake, y + 66 - Math.abs(Math.sin(t * 8)) * 6, t, { s: .75, flip: flee > 0 ? 1 : -1, mood: phase < .75 ? 'cheeky' : 'scared', crawl: .4 });
  }
  const ok = t > T0 + 5 * STEP - .2;
  s += bracket(110, 1700, 'L', t, { s: .8, mood: ok ? 'happy' : 'grit', look: 1, bounce: ok ? 1 : 0 });
  s += bracket(970, 1700, 'R', t, { s: .8, mood: ok ? 'happy' : 'grit', look: -1, bounce: ok ? 1 : 0 });
  if (ok) {
    s += line('5 / 5 passed.', 540, 1560, 70, C.green, t, T0 + 5 * STEP - .1);
    s += confetti(540, 1000, T0 + 5 * STEP - .1, t, 24);
  }
  return s;
}, 'Test it before', 'patients do.', 'افحصها قبل المراجعين');
