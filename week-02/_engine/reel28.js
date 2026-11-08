// App or website first? — decision flow
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, check, confetti, wrap, head } = require('./lib2');
function card(x, y, w, h, fill, tc, a, b, t, t0) {
  const k = eb(seg(t, t0, t0 + .45)); if (k <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${f(k)})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="30" fill="${fill}" stroke="${C.ink}" stroke-width="6"/>${txt(a, 0, -4, 38, tc, { weight: 800, ls: 0 })}${txt(b, 0, 46, 32, tc, { weight: 700 })}</g>`;
}
module.exports = wrap(10.8, t => {
  let s = head(t, 'App or website', 'first?', 'تطبيق ولا موقع أول؟', 0.1, 99, 270, 92);
  s += card(540, 800, 840, 130, '#fff', C.ink, 'Need people to find you on Google?', 'تبي الناس تلقاك بقوقل؟', t, 1.6);
  s += card(300, 1010, 400, 150, C.red, '#fff', '→ Website', '← موقع', t, 3.0);
  s += card(540 + 240, 1010, 400, 150, '#fff', C.ink, 'Daily use + alerts?', 'استخدام يومي + إشعارات؟', t, 4.4);
  s += card(780, 1220, 400, 150, C.peach, C.ink, '→ App', 'تطبيق', t, 5.8);
  s += card(540, 1420, 840, 120, C.green, '#fff', 'Not sure? Start with the website.', 'مو متأكد؟ ابدأ بالموقع', t, 7.4);
  s += bracket(100, 1670, 'L', t, { s: .7, mood: t > 7.4 ? 'happy' : 'grit', look: 1, bounce: t > 8 ? 1 : 0 });
  s += bracket(980, 1670, 'R', t, { s: .7, mood: t > 7.4 ? 'happy' : 'grit', look: -1, bounce: t > 8 ? 1 : 0 });
  if (t > 7.6) s += confetti(540, 1100, 7.6, t, 20);
  return s;
}, 'Still not sure?', 'Ask us first.', 'للحين محتار؟ اسألنا أول');
