// 3 questions before you pay any web agency
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, check, confetti, wrap, head } = require('./lib2');
const Q = [['Is the price fixed?', 'السعر ثابت؟'], ['Is the date in writing?', 'موعد التسليم مكتوب؟'], ['Who fixes it after launch?', 'منو يصلحه بعد الإطلاق؟']];
module.exports = wrap(10.6, t => {
  let s = head(t, '3 questions', 'before you pay.', '٣ أسئلة قبل لا تدفع', 0.1, 99, 270, 96);
  Q.forEach((q, i) => {
    const t0 = 1.6 + i * 2.2, k = eo(seg(t, t0, t0 + .5)); if (k <= 0) return;
    const y = 780 + i * 250;
    s += `<g transform="translate(${f((1 - k) * 700)} 0)"><rect x="100" y="${y - 90}" width="880" height="200" rx="36" fill="#fff" stroke="${C.ink}" stroke-width="7"/><circle cx="190" cy="${y + 10}" r="46" fill="${C.red}"/>${txt(String(i + 1), 190, y + 28, 52, '#fff', { weight: 900 })}${txt(q[0], 590, y - 5, 44, C.ink, { weight: 800, ls: 0 })}${txt(q[1], 590, y + 60, 36, C.mute, {})}</g>`;
    if (t > t0 + 1.2) s += check(930, y - 70, 34, seg(t, t0 + 1.2, t0 + 1.5));
  });
  const d = t > 8.2;
  s += bracket(100, 1650, 'L', t, { s: .75, mood: d ? 'happy' : 'grit', look: 1, bounce: d ? 1 : 0 });
  s += bracket(980, 1650, 'R', t, { s: .75, mood: d ? 'happy' : 'grit', look: -1, bounce: d ? 1 : 0 });
  if (d) s += line('Our answer: yes. ×3', 540, 1560, 58, C.red, t, 8.2) + confetti(540, 900, 8.2, t, 22);
  return s;
}, 'Ask us.', 'We say yes ×3.', 'اسألنا… جوابنا نعم ×٣');
