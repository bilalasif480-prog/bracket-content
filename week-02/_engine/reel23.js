// An app before it has a name — phone screens fan out
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, confetti, sparkle, endCard2 } = require('./lib2');
const END = 10.4;
function phone(cx, cy, rot, sc, k, kind, accent) {
  const w = 300, h = 600;
  let s = `<g transform="translate(${cx} ${cy}) rotate(${f(rot)}) scale(${f(sc * k)})"><rect x="${-w / 2 + 8}" y="${-h / 2 + 12}" width="${w}" height="${h}" rx="44" fill="rgba(32,30,29,.18)"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="44" fill="#fff" stroke="${C.ink}" stroke-width="8"/><rect x="-40" y="${-h / 2 + 16}" width="80" height="12" rx="6" fill="${C.ink}"/>`;
  if (kind === 0) { s += `<circle cx="0" cy="-120" r="70" fill="${accent}"/><rect x="-100" y="0" width="200" height="22" rx="11" fill="${C.ink}"/><rect x="-80" y="40" width="160" height="16" rx="8" fill="#d9d5d1"/><rect x="-110" y="150" width="220" height="70" rx="35" fill="${C.red}"/><rect x="-110" y="240" width="220" height="70" rx="35" fill="none" stroke="${C.ink}" stroke-width="5"/>`; }
  if (kind === 1) { for (let i = 0; i < 4; i++) s += `<rect x="-120" y="${-220 + i * 110}" width="240" height="90" rx="20" fill="${i === 1 ? accent : '#f3f2f2'}"/><circle cx="-80" cy="${-175 + i * 110}" r="22" fill="${i === 1 ? '#fff' : C.peach}"/><rect x="-40" y="${-190 + i * 110}" width="130" height="14" rx="7" fill="${i === 1 ? '#fff' : '#d9d5d1'}"/>`; }
  if (kind === 2) { s += `<rect x="-120" y="-230" width="240" height="200" rx="24" fill="${accent}"/><rect x="-120" y="0" width="150" height="20" rx="10" fill="${C.ink}"/><rect x="-120" y="40" width="240" height="14" rx="7" fill="#d9d5d1"/><rect x="-120" y="70" width="200" height="14" rx="7" fill="#d9d5d1"/><rect x="-120" y="180" width="240" height="84" rx="42" fill="${C.red}"/>`; }
  return s + '</g>';
}
function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/>`;
  if (t < END + .6) {
    s += `<g opacity="${f(1 - seg(t, END, END + .6))}">`;
    s += line('An app idea.', 540, 290, 100, C.ink, t, 0.1) + line('No name yet.', 540, 396, 108, C.red, t, 0.5) + line('فكرة تطبيق… بدون اسم بعد', 540, 490, 58, C.ink, t, 0.9);
    const fan = eio(seg(t, 2.2, 4.2));
    const k0 = eb(seg(t, 1.6, 2.2)), k1 = eb(seg(t, 3.0, 3.6)), k2 = eb(seg(t, 3.4, 4.0));
    s += phone(540 - 300 * fan, 1060 + 20 * fan, -10 * fan, 0.9, k1, 1, C.peach);
    s += phone(540 + 300 * fan, 1060 + 20 * fan, 10 * fan, 0.9, k2, 2, C.peach);
    s += phone(540, 1040, 0, 1, k0, 0, C.peach);
    s += bracket(110, 1540, 'L', t, { s: 0.85, mood: t > 4.4 ? 'happy' : 'grit', look: 1, bounce: t > 5 ? 1 : 0 });
    s += bracket(970, 1540, 'R', t, { s: 0.85, mood: t > 4.4 ? 'happy' : 'grit', look: -1, bounce: t > 5 ? 1 : 0 });
    if (t > 4.6) s += line('Screens first.', 540, 1480, 80, C.ink, t, 4.7) + line('Code second.', 540, 1580, 80, C.red, t, 5.4) + line('الشاشات أول… والكود بعدين', 540, 1665, 50, C.ink, t, 6.0);
    if (t > 7.4) s += line('You see it before we build it.', 540, 1770, 54, C.ink, t, 7.4, { op: .95 }) + confetti(540, 800, 7.4, t, 26) + sparkle(160, 780, 28, t, 1) + sparkle(930, 800, 28, t, 2);
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + .6))}">${endCard2(t, END, 'Your idea.', 'Our screens.', 'فكرتك… وإحنا نرسمها')}</g>`;
  return s;
}
module.exports = { dur: END + 3.6, frame };
