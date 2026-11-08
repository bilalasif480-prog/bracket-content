// Same page, different phone
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, check, confetti, wrap, head, browser } = require('./lib2');
function lap(x, y, k) { // laptop page
  return `<g transform="translate(${x} ${y}) scale(${f(k)})"><rect x="-300" y="-190" width="600" height="380" rx="24" fill="#fff" stroke="${C.ink}" stroke-width="8"/><rect x="-260" y="-150" width="240" height="26" rx="13" fill="${C.ink}"/><rect x="-260" y="-100" width="180" height="16" rx="8" fill="#d9d5d1"/><rect x="-260" y="-50" width="150" height="54" rx="27" fill="${C.red}"/><rect x="40" y="-150" width="220" height="150" rx="18" fill="${C.peach}"/><rect x="-260" y="40" width="520" height="100" rx="14" fill="#f3f2f2"/><rect x="-330" y="196" width="660" height="22" rx="11" fill="${C.ink}"/></g>`;
}
function ph(x, y, k, fixed) {
  const w = 270, h = 520; let s = `<g transform="translate(${x} ${y}) scale(${f(k)})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="40" fill="#fff" stroke="${C.ink}" stroke-width="8"/>`;
  if (!fixed) s += `<rect x="-170" y="-190" width="380" height="26" rx="13" fill="${C.ink}"/><rect x="-60" y="-140" width="300" height="16" rx="8" fill="#d9d5d1"/><rect x="40" y="-80" width="190" height="150" rx="18" fill="${C.peach}"/><rect x="80" y="130" width="150" height="54" rx="27" fill="${C.red}"/><g transform="rotate(-8 0 220)"><rect x="-90" y="200" width="220" height="50" rx="8" fill="#fff" stroke="${C.red}" stroke-width="5"/>${txt('CUT OFF', 20, 236, 28, C.red, { mono: true, weight: 700 })}</g>`;
  else s += `<rect x="-100" y="-210" width="200" height="26" rx="13" fill="${C.ink}"/><rect x="-100" y="-160" width="160" height="16" rx="8" fill="#d9d5d1"/><rect x="-100" y="-110" width="200" height="140" rx="18" fill="${C.peach}"/><rect x="-100" y="60" width="200" height="60" rx="30" fill="${C.red}"/>${txt('Order', 0, 100, 32, '#fff', { weight: 800 })}<rect x="-100" y="150" width="200" height="16" rx="8" fill="#e8e5e2"/><rect x="-100" y="190" width="140" height="16" rx="8" fill="#e8e5e2"/>`;
  return s + '</g>';
}
module.exports = wrap(9.6, t => {
  let s = '';
  if (t < 4.2) s += head(t, 'Looks great', 'on your laptop.', 'حلو على اللابتوب', 0.1, 3.8);
  else if (t < 7.2) s += head(t, 'And on', 'their phone?', 'وعلى جوالهم؟', 4.2, 6.8);
  else s += head(t, 'Same page.', 'Fixed phone.', 'نفس الصفحة… والجوال انحل', 7.4);
  const k1 = eb(seg(t, .5, 1)), k2 = eb(seg(t, 2.4, 3));
  const fixed = t > 7.0;
  s += lap(300, 1050, k1 * .95) + ph(790, 1060, k2, fixed);
  if (t > 3.2 && t < 7) s += `<g opacity="${f(clamp((t - 3.2) / .3))}"><circle cx="905" cy="800" r="40" fill="${C.red}"/>${txt('!', 905, 818, 54, '#fff', { weight: 900 })}</g>`;
  if (fixed) s += check(900, 880, 40, seg(t, 7.0, 7.4)) + confetti(790, 900, 7.2, t, 20);
  s += txt('LAPTOP', 300, 1330, 30, C.mute, { mono: true }) + txt('PHONE', 790, 1360, 30, C.mute, { mono: true });
  s += bracket(130, 1640, 'L', t, { s: .8, mood: fixed ? 'happy' : (t > 3.4 ? 'sad' : 'grit'), look: 1, bounce: fixed ? 1 : 0 });
  s += bracket(950, 1640, 'R', t, { s: .8, mood: fixed ? 'happy' : (t > 3.4 ? 'sad' : 'grit'), look: -1, bounce: fixed ? 1 : 0 });
  return s;
}, 'Every screen.', 'Checked.', 'كل الشاشات… مفحوصة');
