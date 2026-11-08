// Arabic first. English second. — language toggle mirrors layout
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, check, confetti, wrap, head, browser } = require('./lib2');
module.exports = wrap(9.4, t => {
  let s = '';
  if (t < 5) s += head(t, 'Arabic first.', 'English second.', 'العربي أول… والإنجليزي ثاني', 0.1, 4.6);
  else s += head(t, 'One site.', 'Both ways.', 'موقع واحد… باتجاهين', 5.2);
  const ar = t > 3.0, flip = eio(seg(t, 3.0, 3.8)); // 0 = LTR, 1 = RTL
  const X = 120, W = 840, Y = 640, H = 760, cx = X + W / 2;
  const mx = x => cx + (x - cx) * (1 - 2 * flip); // mirror
  const pop = eb(seg(t, .5, 1));
  let inner = `<rect x="${X}" y="${Y + 64}" width="${W}" height="${H - 64}" fill="#fff"/>`;
  const rect = (x, y, w, h, fill, r = 12) => { const x0 = mx(x), x1 = mx(x + w); return `<rect x="${f(Math.min(x0, x1))}" y="${Y + y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`; };
  inner += rect(X + 40, 110, 360, 34, C.ink, 17) + rect(X + 40, 170, 280, 20, '#d9d5d1', 10) + rect(X + 40, 205, 240, 20, '#d9d5d1', 10) + rect(X + 40, 270, 230, 84, C.red, 42) + rect(X + 460, 110, 340, 250, C.peach, 26);
  for (let i = 0; i < 3; i++) inner += rect(X + 40 + i * 260, 430, 230, 200, i === 1 ? C.red : C.peach, 20) + rect(X + 40 + i * 260, 650, 150, 16, '#d9d5d1', 8);
  const lab = flip > .5 ? 'اطلب الحين' : 'Order now';
  inner += txt(lab, mx(X + 155), Y + 326, 34, '#fff', { weight: 800 });
  s += `<g transform="translate(540 ${Y + H / 2}) scale(${f(pop)}) translate(-540 ${-(Y + H / 2)})">${browser(X, Y, W, H, inner)}`;
  s += `<g transform="translate(${X + W - 130} ${Y + 32})"><rect x="-70" y="-22" width="140" height="44" rx="22" fill="#fff" opacity=".18"/><circle cx="${ar ? 36 : -36}" cy="0" r="16" fill="${C.peach}"/>${txt(ar ? 'AR' : 'EN', ar ? -14 : 14, 8, 24, '#fff', { mono: true, weight: 700 })}</g></g>`;
  if (t > 3.8) s += check(X + W - 40, Y + H - 40, 34, seg(t, 3.8, 4.2));
  s += bracket(110, 1640, 'L', t, { s: .8, mood: t > 3.8 ? 'happy' : 'grit', look: 1, bounce: t > 4 ? 1 : 0 });
  s += bracket(970, 1640, 'R', t, { s: .8, mood: t > 3.8 ? 'happy' : 'grit', look: -1, bounce: t > 4 ? 1 : 0 });
  if (t > 4) s += confetti(540, 1000, 4, t, 22);
  return s;
}, 'Your customers', 'read both.', 'عملاؤك يقرؤون اللغتين');
