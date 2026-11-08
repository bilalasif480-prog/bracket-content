// Client chat: "Can you make the logo bigger?" — fixed scope
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, check, confetti, endCard2 } = require('./lib2');
const END = 11.4;
function bub(x, y, w, h, fill, tc, text, t, t0, right) {
  const k = eb(seg(t, t0, t0 + 0.35)); if (k <= 0) return '';
  const ox = right ? x + w : x;
  return `<g transform="translate(${ox} ${y + h}) scale(${f(k)}) translate(${-ox} ${-(y + h)})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="38" fill="${fill}"/>${txt(text, x + w / 2, y + h / 2 + 16, 44, tc, { weight: 700 })}</g>`;
}
function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/>`;
  if (t < END + .6) {
    s += `<g opacity="${f(1 - seg(t, END, END + .6))}">`;
    s += line('Client message #7', 540, 330, 84, C.ink, t, 0.1) + line('رسالة العميل رقم ٧', 540, 420, 56, C.ink, t, 0.3);
    s += `<rect x="90" y="500" width="900" height="860" rx="50" fill="#fff" stroke="${C.ink}" stroke-width="8"/>`;
    s += bub(130, 540, 700, 110, '#e8e5e2', C.ink, 'Can you make the logo bigger?', t, 1.0, false);
    s += bub(130, 690, 700, 110, '#e8e5e2', C.ink, 'Also… a bit bigger. 🙂', t, 2.6, false);
    s += bub(130, 840, 780, 110, '#e8e5e2', C.ink, 'One small thing: new page', t, 4.2, false);
    if (t > 5.2) {
      s += bub(240, 1000, 700, 120, C.red, '#fff', 'It was in the scope. Done.', t, 5.9, true);
      s += bub(240, 1150, 700, 120, C.green, '#fff', 'New page = new quote ✓', t, 7.1, true);
    }
    const hap = t > 5.9;
    s += bracket(150, 1560, 'L', t, { s: 0.9, mood: hap ? 'happy' : 'grit', look: 1, bounce: t > 7.5 ? 1 : 0 });
    s += bracket(930, 1560, 'R', t, { s: 0.9, mood: hap ? 'happy' : 'grit', look: -1, bounce: t > 7.5 ? 1 : 0 });
    if (t > 5.2 && t < 5.9) s += `<rect x="0" y="0" width="1080" height="1920" fill="${C.red}" opacity="${f(.12 * Math.sin(seg(t, 5.2, 5.9) * Math.PI))}"/>`;
    if (t > 8.2) s += line('Fixed scope.', 540, 1710, 84, C.red, t, 8.2) + line('Fixed price.', 540, 1800, 84, C.ink, t, 8.8) ;
    if (t > 8.2) s += confetti(540, 1000, 8.2, t, 22);
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + .6))}">${endCard2(t, END, 'No more', '"one small thing".', 'ولا "شغلة صغيرة" بعد اليوم')}</g>`;
  return s;
}
module.exports = { dur: END + 3.6, frame };
