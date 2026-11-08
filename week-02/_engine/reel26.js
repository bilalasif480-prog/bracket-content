// What does a website cost? — scope chips into a box → fixed price tag (no numbers)
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, check, confetti, wrap, head } = require('./lib2');
const chips = [['Pages', 'الصفحات'], ['Features', 'المزايا'], ['Arabic + English', 'عربي + إنجليزي'], ['Payments', 'الدفع']];
module.exports = wrap(10.6, t => {
  let s = '';
  if (t < 3.6) s += head(t, 'What does a website', 'cost in Kuwait?', 'كم يكلف موقع بالكويت؟', 0.1, 3.2, 270, 84);
  else if (t < 8) s += head(t, 'It depends', 'on the scope.', 'يعتمد على الشغل المطلوب', 3.6, 7.6, 270, 90);
  else s += head(t, 'Scope first.', 'Then one price.', 'الشغل أول… وبعدين سعر واحد', 8.2, 99, 270, 90);
  const bx = 540, by = 1130;
  s += `<rect x="${bx - 300}" y="${by - 210}" width="600" height="420" rx="36" fill="#fff" stroke="${C.ink}" stroke-width="8"/>${txt('SCOPE', bx, by - 150, 34, C.red, { mono: true, weight: 700 })}`;
  chips.forEach((c, i) => {
    const t0 = 4.0 + i * .6, k = eio(seg(t, t0, t0 + .6));
    const sx = i % 2 ? 1000 : 80, sy = 560 + i * 20, tx = bx, ty = by - 85 + i * 62;
    const x = sx + (tx - sx) * k, y = sy + (ty - sy) * k;
    if (t > t0 - .5) s += `<g opacity="${f(clamp((t - t0 + .5) / .3))}"><rect x="${f(x - 220)}" y="${f(y - 28)}" width="440" height="52" rx="26" fill="${C.peach}"/>${txt(c[0] + ' · ' + c[1], x, y + 10, 28, C.ink, { weight: 800, ls: 0 })}</g>`;
  });
  const tag = eb(seg(t, 7.6, 8.2));
  if (tag > 0) s += `<g transform="translate(${bx} ${by + 300}) rotate(-4) scale(${f(tag)})"><rect x="-260" y="-70" width="520" height="140" rx="70" fill="${C.green}"/>${txt('FIXED PRICE ✓', 0, 18, 56, '#fff', { weight: 900 })}${txt('سعر ثابت', 0, 80, 34, C.green, { weight: 800 })}</g>`;
  s += bracket(110, 1640, 'L', t, { s: .8, mood: t > 7.6 ? 'happy' : 'grit', look: 1, bounce: t > 8 ? 1 : 0 });
  s += bracket(970, 1640, 'R', t, { s: .8, mood: t > 7.6 ? 'happy' : 'grit', look: -1, bounce: t > 8 ? 1 : 0 });
  if (t > 8) s += confetti(bx, by, 8, t, 22);
  return s;
}, 'No guessing.', 'Price agreed first.', 'بدون تخمين… السعر نتفق عليه أول');
