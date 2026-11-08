// WhatsApp button on every phone
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, check, confetti, wrap, head } = require('./lib2');
module.exports = wrap(10.2, t => {
  let s = '';
  if (t < 3.6) s += head(t, 'Your WhatsApp', 'button works?', 'زر الواتساب شغّال؟', 0.1, 3.2);
  else if (t < 7.8) s += head(t, 'On every', 'phone?', 'على كل جوال؟', 3.6, 7.4);
  else s += head(t, 'One tap.', 'Every phone.', 'لمسة وحدة… كل جوال', 8, 99);
  const sizes = [[190, 380], [210, 420], [170, 340], [200, 400], [230, 450], [180, 360]];
  sizes.forEach((sz, i) => {
    const col = i % 3, row = Math.floor(i / 3), cx = 230 + col * 310, cy = 850 + row * 470;
    const t0 = 1.0 + i * .25, k = eb(seg(t, t0, t0 + .5)), w = sz[0], h = sz[1];
    s += `<g transform="translate(${cx} ${cy}) scale(${f(k)})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="30" fill="#fff" stroke="${C.ink}" stroke-width="7"/><rect x="${-w / 2 + 20}" y="${-h / 2 + 30}" width="${w - 40}" height="${h * .3}" rx="14" fill="${C.peach}"/><rect x="${-w / 2 + 20}" y="${-h / 2 + 40 + h * .3}" width="${(w - 40) * .7}" height="12" rx="6" fill="#d9d5d1"/><circle cx="${w / 2 - 44}" cy="${h / 2 - 50}" r="30" fill="#25d366"/>${txt('✆', w / 2 - 44, h / 2 - 38, 36, '#fff', { weight: 900 })}</g>`;
    const tk = 3.6 + i * .6; if (t > tk) s += check(cx + w / 2 - 20, cy - h / 2 + 10, 28, seg(t, tk, tk + .3));
  });
  const done = t > 7.4;
  s += bracket(100, 1690, 'L', t, { s: .7, mood: done ? 'happy' : 'grit', look: 1, bounce: done ? 1 : 0 });
  s += bracket(980, 1690, 'R', t, { s: .7, mood: done ? 'happy' : 'grit', look: -1, bounce: done ? 1 : 0 });
  if (done) s += confetti(540, 1000, 7.4, t, 24);
  return s;
}, 'One tap.', 'More leads.', 'لمسة وحدة… عملاء أكثر');
