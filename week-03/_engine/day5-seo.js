// Day 5 (Fri 27 Nov) MAIN · Format card A (Google results UI) · SEO · HISAAB #03
// Hook: "You're on Google. Page 3."  Body query "dentist near me" fits the clinic + "near me" trials.
const K = require('./kit');
const { C, seg, eo, eb, f, kinS, kinAr, card, bg, scene, hookScene, float, lbl, pop, html, AR, EN } = K;

const DUR = 28.0;
const S = { hook: 0, search: 3.6, page3: 8.4, maths: 13.2, fix: 19.0, end: 25.0 };

function pager(cx, cy, t, a, o = {}) {
  let s = '';
  [1, 2, 3, 4].forEach((p, i) => {
    const x = cx - 270 + i * 180, k = eb(seg(t, a + i * 0.1, a + 0.35 + i * 0.1)), on = p === 3;
    s += pop(x, cy, Math.max(o.min ?? 0, k), `<circle cx="${x}" cy="${cy}" r="70" fill="${on ? C.red : '#fff'}" filter="url(#sh)"/><text x="${x}" y="${cy + 30}" font-family="Archivo" font-weight="900" font-size="84" fill="${on ? '#fff' : C.ink}" text-anchor="middle">${p}</text>`);
  });
  // "YOU" pin dropping on page 3
  const kp = eb(seg(t, a + 0.6, a + 1.0)), x3 = cx + 90, bob = Math.sin(t * 4) * 6;
  if (kp > 0) s += `<g transform="translate(${x3} ${f(cy - 120 - (1 - kp) * 120 + bob)})" opacity="${f(Math.min(1, kp))}"><path d="M0 40 C-50 -10 -50 -70 0 -70 C50 -70 50 -10 0 40 Z" fill="${C.ink}"/><text x="0" y="-22" font-family="Archivo" font-weight="900" font-size="30" fill="#fff" text-anchor="middle">YOU</text></g>`;
  return s;
}

function hookMain(t) {
  let s = '';
  s += kinS(270, "You're on *Google.*", t, -0.3, 104, { step: 0.18 });
  s += kinAr(410, 'انت موجود في قوقل…', t, 0.3, 68);
  s += kinS(560, '*Page* *3.*', t, 1.0, 200, { step: 0.2 });
  s += kinAr(800, 'بالصفحة الثالثة.', t, 1.4, 80, C.red);
  s += pager(540, 1180, t, -0.3, { min: 0.8 });
  return hookScene(t, S.search, s);
}

function results(t, a, y0, q) {
  let s = K.searchCard(t, a, y0, q, { h: 740, typeAt: 0.4, typeDur: 0.8 });
  const tr = t - a;
  for (let i = 0; i < 4; i++) {
    const k = eb(seg(tr, 1.4 + i * 0.25, 1.7 + i * 0.25)), y = y0 + 210 + i * 120;
    if (k <= 0) continue;
    s += `<g opacity="${f(Math.min(1, k))}"><rect x="170" y="${y}" width="40" height="40" rx="10" fill="#e4e1df"/><rect x="230" y="${y + 4}" width="${f((420 - i * 40) * k)}" height="28" rx="14" fill="#c6d1e6"/><rect x="170" y="${y + 56}" width="${f((700 - i * 50) * k)}" height="18" rx="9" fill="#eeebe9"/></g>`;
  }
  return s;
}

function sSearch(t) {
  const a = S.search, tr = t - a; let s = '';
  s += kinS(250, 'Your customer | *searches…*', t, a + 0.1, 96);
  s += kinAr(500, 'زبونك يدوّر…', t, a + 0.4, 64);
  const y0 = 640 + float(t, 1);
  s += results(t, a, y0, 'dentist near me');
  s += K.demoTag(670, y0 + 650);
  if (tr > 3.0) s += kinS(1420, 'They check *page 1.*', t, a + 3.0, 72);
  return scene(t, S.search, S.page3, s);
}

function sPage3(t) {
  const a = S.page3; let s = '';
  s += kinS(260, 'Almost *nobody* | scrolls to page 3.', t, a + 0.1, 92, { col: '#fff', acc: C.peach });
  s += kinAr(520, 'قليل اللي يوصل للصفحة الثالثة.', t, a + 0.7, 62, C.peach);
  s += pager(540, 900, t, a + 0.3);
  // cursor hovering page 1, never goes to 3
  const kc = eo(seg(t - a, 1.2, 1.8)), cx = 270 + Math.sin(t * 3) * 10, cy = 1020 + Math.cos(t * 3) * 6;
  s += `<g opacity="${f(kc)}" transform="translate(${f(cx)} ${f(cy)})"><path d="M0 0 L0 70 L18 54 L32 84 L44 78 L30 50 L54 50 Z" fill="#fff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g>`;
  s += kinS(1180, 'So they call | someone *else.*', t, a + 2.2, 80, { col: '#fff', acc: C.peach });
  s += kinAr(1400, 'فيتصلون بغيرك.', t, a + 2.6, 56, '#d8d3cf');
  return scene(t, S.page3, S.maths, s);
}

function sMaths(t) {
  return scene(t, S.maths, S.fix, K.calc(t, S.maths, {
    n: '03',
    rows: [
      { at: 1.0, en: 'Extra customers', ar: 'زيادة بالأسبوع لو لقوك', val: (n, k) => `+${n(2, k)}` },
      { at: 1.6, en: 'Each visit', ar: 'كل زيارة', val: (n, k) => `× £${n(30, k)}` },
      { at: 2.2, en: 'Every week', ar: 'كل أسبوع', val: (n, k) => `= £${n(60, k)}` },
      { at: 2.9, en: 'In a year', ar: 'في سنة، ٥٢ أسبوع', val: () => `× 52` },
    ],
    total: { at: 3.6, en: 'Missed', ar: 'فاتك بالسنة', value: 3120, size: 84 },
  }));
}

function sFix(t) {
  const a = S.fix; let s = '';
  s += kinS(260, 'The *SEO* fix:', t, a + 0.05, 104);
  s += kinAr(400, 'الحل مع SEO:', t, a + 0.25, 68);
  s += K.tickList(t, a, [
    { en: 'A fast site with|clear pages', ar: 'موقع سريع وصفحات واضحة' },
    { en: 'Titles with the words|people search', ar: 'عناوين بنفس كلام الناس' },
    { en: 'Google Business|Profile done right', ar: 'ملف قوقل للنشاط التجاري مضبوط' },
  ], { y0: 540, gap: 290, ch: 250, size: 48 });
  return scene(t, S.fix, S.end, s);
}

module.exports = {
  dur: DUR, S, hookMain, sPage3,
  frame(t) {
    const mode = (t >= S.page3 && t < S.maths) || t >= S.end ? 'dark' : 'paper';
    return bg(t, mode) + hookMain(t) + sSearch(t) + sPage3(t) + sMaths(t) + sFix(t) + K.endCard(t, S.end);
  },
};
