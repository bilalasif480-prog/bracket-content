// Checkout in 3 taps
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, check, confetti, wrap, head } = require('./lib2');
const taps = [2.4, 4.2, 6.0];
module.exports = wrap(9.4, t => {
  let s = '';
  if (t < 2.2) s += head(t, 'Checkout.', 'In 3 taps.', 'الدفع… بـ ٣ لمسات', 0.1, 99, 270, 100);
  else s += head(t, 'Checkout.', 'In 3 taps.', 'الدفع… بـ ٣ لمسات', 0.1, 99, 270, 100);
  const pop = eb(seg(t, .5, 1.1)), step = taps.filter(x => t > x + .35).length;
  const labels = ['Add to cart', 'Pay', 'Done'], arl = ['أضف للسلة', 'ادفع', 'تم'];
  s += `<g transform="translate(540 1030) scale(${f(pop)})"><rect x="-230" y="-420" width="460" height="840" rx="56" fill="#fff" stroke="${C.ink}" stroke-width="9"/><rect x="-50" y="-396" width="100" height="14" rx="7" fill="${C.ink}"/>`;
  if (step < 3) {
    s += `<rect x="-170" y="-330" width="340" height="230" rx="26" fill="${C.peach}"/><rect x="-170" y="-60" width="220" height="24" rx="12" fill="${C.ink}"/><rect x="-170" y="-20" width="150" height="16" rx="8" fill="#d9d5d1"/>`;
    s += `<rect x="-170" y="${step === 0 ? 150 : 40}" width="340" height="92" rx="46" fill="${C.red}"/>${txt(labels[step] + ' · ' + arl[step], 0, (step === 0 ? 150 : 40) + 60, 32, '#fff', { weight: 800, ls: 0 })}`;
    if (step === 1) s += `<rect x="-170" y="160" width="340" height="60" rx="30" fill="#f3f2f2"/><rect x="-170" y="240" width="340" height="60" rx="30" fill="#f3f2f2"/>`;
  } else s += check(0, -60, 110, seg(t, 6.4, 6.9)) + txt('Done · تم', 0, 160, 54, C.green, { weight: 900 });
  s += '</g>';
  taps.forEach((x, i) => { const k = seg(t, x, x + .5); if (k > 0 && k < 1) { const ty = i === 0 ? 1180 : 1070; s += `<circle cx="540" cy="${ty + 20}" r="${f(20 + k * 60)}" fill="none" stroke="${C.ink}" stroke-width="6" opacity="${f(1 - k)}"/>`; } });
  for (let i = 0; i < 3; i++) s += `<g transform="translate(${360 + i * 180} 1600)"><circle r="34" fill="${step > i ? C.green : '#d9d5d1'}"/>${txt(String(i + 1), 0, 14, 38, '#fff', { weight: 900 })}</g>`;
  s += bracket(100, 1480, 'L', t, { s: .75, mood: step > 2 ? 'happy' : 'grit', look: 1, bounce: step > 2 ? 1 : 0 });
  s += bracket(980, 1480, 'R', t, { s: .75, mood: step > 2 ? 'happy' : 'grit', look: -1, bounce: step > 2 ? 1 : 0 });
  if (step > 2) s += confetti(540, 800, 6.4, t, 26);
  return s;
}, 'Fewer taps.', 'More orders.', 'لمسات أقل… طلبات أكثر');
