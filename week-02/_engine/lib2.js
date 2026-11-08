// helpers for the "new formats" reels (different endings per reel)
const L = require('./lib');
const { C, clamp, seg, eo, eb, f, txt, line, bracket } = L;
function endCard2(t, t0, l1, l2, ar, cta = 'Start a project →') {
  const lt = t - t0; if (lt < 0) return '';
  const k = eo(lt / 0.5);
  let s = `<rect width="1080" height="1920" fill="${C.ink}"/>`;
  s += bracket(150, 880, 'L', lt, { s: 1.3, bounce: 1, mood: 'happy', sx: 1 });
  s += bracket(930, 880, 'R', lt, { s: 1.3, bounce: 1, mood: 'happy' });
  s += txt('BRACKET', 540, 745, 104, '#fff', { op: k, ls: -4 });
  s += txt('WEBSITES · APPS · QA', 540, 820, 30, C.peach, { mono: true, op: clamp((lt - .3) / .4) });
  s += line(l1, 540, 1110, 76, '#fff', lt, 0.7);
  s += line(l2, 540, 1200, 76, C.peach, lt, 0.9);
  if (ar) s += line(ar, 540, 1275, 50, '#fff', lt, 1.1, { op: .9 });
  const pulse = 1 + Math.sin(lt * 5) * 0.025, pk = eb(seg(lt, 1.5, 2));
  s += `<g transform="translate(540 1400) scale(${f(pulse * pk)})"><rect x="-300" y="-56" width="600" height="112" rx="56" fill="${C.red}"/>${txt(cta, 0, 20, 52, '#fff', { weight: 800, ls: 0 })}</g>`;
  s += txt('LINK IN BIO', 540, 1510, 32, C.mute, { mono: true, op: clamp((lt - 2) / .4) });
  return s;
}
function browser(x, y, w, h, inner, bg = '#fff') {
  return `<rect x="${x + 10}" y="${y + 14}" width="${w}" height="${h}" rx="30" fill="rgba(32,30,29,.16)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="30" fill="${bg}" stroke="${C.ink}" stroke-width="8"/><rect x="${x}" y="${y}" width="${w}" height="64" rx="30" fill="${C.ink}"/><rect x="${x}" y="${y + 34}" width="${w}" height="30" fill="${C.ink}"/><circle cx="${x + 36}" cy="${y + 32}" r="9" fill="${C.red}"/><circle cx="${x + 66}" cy="${y + 32}" r="9" fill="${C.gold}"/><circle cx="${x + 96}" cy="${y + 32}" r="9" fill="${C.green}"/>${inner}`;
}
module.exports = { ...L, endCard2, browser };
