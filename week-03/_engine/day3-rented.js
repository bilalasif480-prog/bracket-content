// Day 3 (Wed 25 Nov) MAIN · Format card D "Rented shop" · Websites
// Hook: "You decorated the shop. But the landlord is Instagram." (a "what if", never a claim that accounts get banned often)
const K = require('./kit');
const { C, seg, eo, eb, f, kinS, kinAr, card, bg, scene, hookScene, float, lbl, pop, html, AR, EN, esc } = K;

const DUR = 25.0;
const S = { hook: 0, plinth: 3.8, gone: 9.0, yours: 13.0, keep: 18.0, end: 22.0 };

function profile(x, y, w, t, a, dim = 0) {
  let s = `<rect x="${x}" y="${f(y)}" width="${w}" height="380" rx="44" fill="#fff" filter="url(#sh)"/>`;
  s += `<circle cx="${x + 80}" cy="${f(y + 80)}" r="44" fill="none" stroke="${C.peach}" stroke-width="7"/><circle cx="${x + 80}" cy="${f(y + 80)}" r="34" fill="#e4e1df"/>`;
  s += `<rect x="${x + 150}" y="${f(y + 56)}" width="220" height="20" rx="10" fill="#d9d5d2"/><rect x="${x + 150}" y="${f(y + 90)}" width="140" height="16" rx="8" fill="#e8e5e3"/>`;
  const cw = (w - 80) / 3;
  for (let i = 0; i < 6; i++) {
    const kk = eb(seg(t, a + i * 0.12, a + 0.3 + i * 0.12));
    const cx = x + 40 + (i % 3) * cw, cy = y + 150 + Math.floor(i / 3) * 110;
    s += `<rect x="${f(cx + 4)}" y="${f(cy)}" width="${f((cw - 12) * kk)}" height="${f(100 * kk)}" rx="14" fill="${i % 2 ? '#f0d9cf' : '#e7e3e0'}" opacity="${f(1 - dim)}"/>`;
  }
  return s;
}

function hookMain(t) {
  let s = '';
  s += kinS(260, 'You _decorated_ | the shop.', t, -0.4, 84, { col: '#bdb6b0', step: 0.18 });
  s += kinS(500, 'But the *landlord* | is Instagram.', t, 0.6, 100, { col: '#fff', acc: C.peach, step: 0.16 });
  s += kinAr(770, 'زيّنت المحل… بس المالك انستقرام.', t, 1.1, 64, C.peach);
  const k = eb(seg(t, 0, 0.5)), y0 = 960 + float(t);
  s += pop(540, y0 + 190, 1.25 * Math.max(k, 0.85), profile(250, y0, 580, t, -0.2));
  return hookScene(t, S.plinth, s);
}

function sPlinth(t) {
  const a = S.plinth, tr = t - a; let s = '';
  s += kinS(250, 'What *if* | one day…', t, a + 0.1, 100, { col: '#fff', acc: C.peach });
  s += kinAr(510, 'ولو في يوم من الأيام…', t, a + 0.5, 64, '#d8d3cf');
  // phone on a museum plinth
  const y0 = 700 + float(t, 1) * 0.5, lock = seg(tr, 1.2, 1.5);
  s += `<rect x="330" y="${f(y0)}" width="420" height="620" rx="56" fill="#111" stroke="#3a3633" stroke-width="6"/>`;
  s += `<rect x="350" y="${f(y0 + 20)}" width="380" height="580" rx="44" fill="${lock > 0 ? '#2d2a28' : '#fff'}"/>`;
  if (lock <= 0) s += profile(360, y0 + 120, 360, t, a - 1);
  else {
    const kl = eb(lock);
    s += pop(540, y0 + 230, kl, `<rect x="500" y="${f(y0 + 225)}" width="80" height="70" rx="14" fill="${C.red}"/><path d="M515 ${f(y0 + 225)} v-28 a25 25 0 0 1 50 0 v28" stroke="${C.red}" stroke-width="12" fill="none"/>`);
    s += html(360, y0 + 330, 360, 160, `<div style="${EN(40, '#fff')}letter-spacing:-1px;text-align:center;opacity:${f(kl)}">Account<br/>unavailable</div><div style="${AR(32, '#bdb6b0')}direction:rtl;text-align:center;opacity:${f(kl)}">الحساب غير متاح</div>`);
  }
  // plinth + label
  s += `<rect x="250" y="${f(y0 + 640)}" width="580" height="200" fill="#e9e5e1"/><rect x="230" y="${f(y0 + 625)}" width="620" height="30" fill="#f6f3f0"/>`;
  const kl2 = eo(seg(tr, 1.8, 2.2));
  s += `<g opacity="${f(kl2)}">${lbl('EXHIBIT 03 · STATUS: LOST', 540, y0 + 735, 30, C.ink)}${lbl('YOUR SHOP · YEARS OF WORK', 540, y0 + 785, 26, C.mute)}</g>`;
  return scene(t, S.plinth, S.gone, s);
}

function sGone(t) {
  const a = S.gone, tr = t - a; let s = '';
  const items = [['Your posts.', 'بوستاتك.'], ['Your followers.', 'متابعينك.'], ['Your DMs.', 'رسايلك.']];
  items.forEach((it, i) => {
    const at = 0.2 + i * 0.55, y = 300 + i * 190;
    s += kinS(y, it[0], t, a + at, 92, { col: '#fff', step: 0.12 });
    s += kinAr(y + 110, it[1], t, a + at + 0.15, 50, '#bdb6b0');
    const ks = seg(tr, at + 0.6, at + 0.9);
    if (ks > 0) s += `<line x1="230" y1="${y + 62}" x2="${f(230 + 620 * ks)}" y2="${y + 62}" stroke="${C.red}" stroke-width="14" stroke-linecap="round"/>`;
  });
  s += kinS(940, 'Gone | *overnight.*', t, a + 2.2, 120, { col: '#fff', acc: C.peach });
  s += kinAr(1260, 'راحت بليلة.', t, a + 2.6, 76, C.peach);
  return scene(t, S.gone, S.yours, s);
}

function sYours(t) {
  const a = S.yours, tr = t - a; let s = '';
  s += kinS(250, 'On *your* website, | it stays yours.', t, a + 0.1, 88);
  s += kinAr(490, 'بموقعك… كل شي يبقى لك.', t, a + 0.6, 62);
  const y0 = 620 + float(t, 2);
  s += card(110, y0, 860, 820, 44);
  // browser bar
  s += `<rect x="110" y="${f(y0)}" width="860" height="90" rx="44" fill="#ebe7e4"/><rect x="110" y="${f(y0 + 45)}" width="860" height="45" fill="#ebe7e4"/>`;
  [0, 1, 2].forEach(i => s += `<circle cx="${160 + i * 34}" cy="${f(y0 + 45)}" r="11" fill="${[C.red, C.gold, C.green][i]}"/>`);
  s += `<rect x="290" y="${f(y0 + 20)}" width="560" height="52" rx="26" fill="#fff"/>`;
  const dom = 'yourshop.com', n = Math.floor(seg(tr, 0.4, 1.1) * dom.length);
  s += `<text x="320" y="${f(y0 + 58)}" font-family="JB" font-weight="700" font-size="30" fill="${C.ink}">${dom.slice(0, n)}</text>`;
  // hero blocks build
  const b = i => eb(seg(tr, 0.8 + i * 0.25, 1.1 + i * 0.25));
  s += pop(540, y0 + 200, b(0), `<rect x="160" y="${f(y0 + 130)}" width="760" height="150" rx="24" fill="${C.peach}" opacity=".35"/>`);
  s += pop(300, y0 + 330, b(1), `<rect x="160" y="${f(y0 + 305)}" width="420" height="34" rx="17" fill="#d9d5d2"/>`);
  s += pop(300, y0 + 370, b(2), `<rect x="160" y="${f(y0 + 355)}" width="300" height="24" rx="12" fill="#ebe8e6"/>`);
  s += pop(280, y0 + 440, b(3), `<rect x="160" y="${f(y0 + 405)}" width="250" height="74" rx="37" fill="${C.red}"/><text x="285" y="${f(y0 + 453)}" font-family="Archivo" font-weight="900" font-size="34" fill="#fff" text-anchor="middle">Book · احجز</text>`);
  const ticks = [['Your domain', 'دومينك'], ['Your customer list', 'قائمة زباينك'], ['Your bookings & orders', 'حجوزاتك وطلباتك']];
  ticks.forEach((it, i) => {
    const k = eb(seg(tr, 2.0 + i * 0.5, 2.4 + i * 0.5)), y = y0 + 530 + i * 90;
    if (k <= 0) return;
    s += pop(195, y + 30, k, `<circle cx="195" cy="${y + 30}" r="30" fill="${C.green}"/><path d="M182 ${y + 31} l9 9 l17 -19" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
    s += html(245, y + 2, 700, 70, `<span style="${EN(42, C.ink)}letter-spacing:-1px;opacity:${f(Math.min(1, k))}">${it[0]}</span><span style="${AR(32, C.mute)}opacity:${f(Math.min(1, k))};margin-left:18px">${it[1]}</span>`);
  });
  return scene(t, S.yours, S.keep, s);
}

function sKeep(t) {
  const a = S.keep, tr = t - a; let s = '';
  s += kinS(260, 'Keep Instagram. | Add a *home* you own.', t, a + 0.1, 88);
  s += kinAr(500, 'خلّ الانستقرام… وزد عليه بيت ملكك.', t, a + 0.6, 60);
  const k1 = eb(seg(tr, 0.3, 0.7)), k2 = eb(seg(tr, 1.0, 1.4)), y0 = 760 + float(t, 3);
  s += pop(300, y0 + 200, k1, profile(120, y0 + 60, 360, t, a + 0.3));
  // arrow
  const ka = seg(tr, 0.7, 1.0);
  s += `<path d="M500 ${f(y0 + 200)} h${f(80 * ka)}" stroke="${C.red}" stroke-width="12" stroke-linecap="round"/>` + (ka >= 1 ? `<path d="M570 ${f(y0 + 180)} l22 20 l-22 20" stroke="${C.red}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : '');
  s += pop(800, y0 + 200, k2, `<rect x="620" y="${f(y0 + 40)}" width="360" height="330" rx="34" fill="#fff" filter="url(#sh)"/><rect x="620" y="${f(y0 + 40)}" width="360" height="60" rx="30" fill="#ebe7e4"/><rect x="650" y="${f(y0 + 130)}" width="300" height="100" rx="18" fill="${C.peach}" opacity=".35"/><rect x="650" y="${f(y0 + 260)}" width="170" height="60" rx="30" fill="${C.red}"/>` + lbl('YOURS', 800, y0 + 82, 26, C.ink));
  return scene(t, S.keep, S.end, s);
}

module.exports = {
  dur: DUR, S, hookMain, sPlinth, sKeep,
  frame(t) {
    const mode = t < S.yours || t >= S.end ? 'dark' : 'paper';
    return bg(t, mode) + hookMain(t) + sPlinth(t) + sGone(t) + sYours(t) + sKeep(t) + K.endCard(t, S.end);
  },
};
