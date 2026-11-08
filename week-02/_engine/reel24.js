// "It's just a small change." — tower collapse
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, check, confetti, wrap, head } = require('./lib2');
const names = ['Footer', 'Payment', 'Login', 'Cart', 'Menu', 'Header'];
module.exports = wrap(10.2, t => {
  let s = '';
  if (t < 4.8) s += head(t, '"It\'s just a', 'small change."', '"بس تعديل بسيط"', 0.1, 4.4);
  else if (t < 8) s += head(t, 'Famous', 'last words.', 'آخر كلمات مشهورة', 4.8, 7.6);
  else s += head(t, 'Change it.', 'Test the rest.', 'غيّر… وافحص الباقي', 8.1);
  const fall = seg(t, 4.0, 5.6), rebuild = eio(seg(t, 6.6, 8.0));
  names.forEach((n, i) => {
    const base = 1480 - i * 118, x = 540, pull = i === 4 ? eo(seg(t, 3.0, 3.8)) * 330 : 0;
    const dir = i % 2 ? 1 : -1, g = fall * fall;
    let dx = dir * (60 + i * 40) * g, dy = (i + 1) * 70 * g, rot = dir * (8 + i * 6) * g;
    if (t > 6.4) { const r = 1 - rebuild; dx *= r; dy *= r; rot *= r; }
    const wob = t > 3.6 && t < 4.2 ? Math.sin(t * 60) * 5 : 0;
    const colr = i === 4 ? C.red : (i % 2 ? C.peach : '#fff');
    s += `<g transform="translate(${f(x + dx + pull * (i === 4 ? 1.4 : 0) + wob)} ${f(base + dy)}) rotate(${f(rot)})"><rect x="-330" y="-50" width="660" height="102" rx="18" fill="${colr}" stroke="${C.ink}" stroke-width="7"/>${txt(n, 0, 14, 44, i === 4 ? '#fff' : C.ink, { weight: 800, ls: 0 })}</g>`;
    if (t > 8.2) s += check(x + 290, base - 4, 22, seg(t, 8.2 + (5 - i) * .12, 8.5 + (5 - i) * .12));
  });
  if (t > 3.0 && t < 4.0) s += line('"Just this one."', 760, 1000, 52, C.red, t, 3.0, { op: 1 });
  const bad = t > 4.2 && t < 6.6;
  s += bracket(110, 1630, 'L', t, { s: .8, mood: bad ? 'sad' : (t > 8 ? 'happy' : 'grit'), look: 1, bounce: t > 8.4 ? 1 : 0 });
  s += bracket(970, 1630, 'R', t, { s: .8, mood: bad ? 'sad' : (t > 8 ? 'happy' : 'grit'), look: -1, bounce: t > 8.4 ? 1 : 0 });
  if (t > 8.6) s += confetti(540, 900, 8.6, t, 24);
  return s;
}, 'Small change.', 'Zero surprises.', 'تعديل صغير… بدون مفاجآت');
