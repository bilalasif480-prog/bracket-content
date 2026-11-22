// Day 6 (Sat 28 Nov) MAIN · Format card A (belief → app UI → hisaab) · Mobile apps · HISAAB #04
// Hook: "You think: apps are for big companies."  Body is business-neutral ("customers") so the Thu/Sat trials fit it.
const K = require('./kit');
const { C, seg, eo, eb, f, kinS, kinAr, card, bg, scene, hookScene, float, lbl, pop, html, AR, EN } = K;

const DUR = 28.0;
const S = { hook: 0, regulars: 3.6, forget: 8.4, maths: 13.2, app: 19.0, end: 25.0 };

// phone home screen with app icons; the empty slot pulses "your app?"
function homeScreen(t, a, x, y, w = 480, h = 760) {
  let s = K.phone(x, y, w, h);
  const cols = 3, gap = (w - 80) / cols;
  for (let i = 0; i < 9; i++) {
    const k = eb(seg(t, a + i * 0.06, a + 0.3 + i * 0.06)), cx = x + 40 + (i % cols) * gap + gap / 2, cy = y + 160 + Math.floor(i / cols) * 170;
    if (i === 4) {
      const p = 1 + 0.06 * Math.sin(t * 6);
      s += pop(cx, cy, k * p, `<rect x="${f(cx - 55)}" y="${f(cy - 55)}" width="110" height="110" rx="28" fill="none" stroke="${C.red}" stroke-width="6" stroke-dasharray="14 10"/><text x="${f(cx)}" y="${f(cy + 22)}" font-family="Archivo" font-weight="900" font-size="64" fill="${C.red}" text-anchor="middle">?</text>`);
    } else s += pop(cx, cy, k, `<rect x="${f(cx - 55)}" y="${f(cy - 55)}" width="110" height="110" rx="28" fill="${['#e7e3e0', '#f0d9cf', '#dfe6ef'][i % 3]}"/>`);
  }
  return s;
}

function hookMain(t) {
  let s = '';
  s += kinS(250, '_You_ _think…_', t, -0.4, 96, { step: 0.2 });
  s += kinS(380, 'Apps are for | *big* companies.', t, 0.5, 100, { step: 0.17 });
  s += kinAr(640, 'تقول: التطبيق للشركات الكبيرة.', t, 1.2, 66);
  s += homeScreen(t, -0.3, 300, 800 + float(t));
  return hookScene(t, S.regulars, s);
}

// 4-week visit grid: rows = customers, cols = weeks; o.fade: customers who stop
function visits(t, a, y0, o = {}) {
  let s = card(110, y0, 860, 640, 48);
  ['W1', 'W2', 'W3', 'W4'].forEach((w, j) => s += lbl(w, 420 + j * 140, y0 + 80, 28, C.mute));
  for (let r = 0; r < 4; r++) {
    const y = y0 + 150 + r * 115, gone = o.gone && r % 2 === 1;
    s += `<circle cx="220" cy="${y}" r="40" fill="${['#f0d9cf', '#e7e3e0', '#dfe6ef', '#f6e7c8'][r]}"/><circle cx="220" cy="${y - 10}" r="14" fill="#fff"/><path d="M196 ${y + 26} a24 20 0 0 1 48 0" fill="#fff"/>`;
    for (let j = 0; j < 4; j++) {
      const at = 0.6 + r * 0.15 + j * 0.25, k = eb(seg(t - a, at, at + 0.3)), x = 420 + j * 140;
      const miss = gone && j >= 2;
      if (miss) {
        const km = eb(seg(t - a, (o.missAt ?? 1.0) + r * 0.2 + j * 0.2, (o.missAt ?? 1.0) + 0.3 + r * 0.2 + j * 0.2));
        s += pop(x, y, km, `<circle cx="${x}" cy="${y}" r="34" fill="${C.red}" opacity=".12"/><path d="M${x - 14} ${y - 14} l28 28 M${x + 14} ${y - 14} l-28 28" stroke="${C.red}" stroke-width="9" stroke-linecap="round"/>`);
      } else s += pop(x, y, o.static ? 1 : k, `<circle cx="${x}" cy="${y}" r="34" fill="${C.green}"/><path d="M${x - 14} ${y + 1} l9 9 l19 -19" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
    }
  }
  return s;
}

function sRegulars(t) {
  const a = S.regulars; let s = '';
  s += kinS(250, 'Same customers. | *Every* week.', t, a + 0.1, 96);
  s += kinAr(500, 'نفس الزباين… كل أسبوع.', t, a + 0.5, 66);
  s += visits(t, a, 660 + float(t, 1));
  return scene(t, S.regulars, S.forget, s);
}

function sForget(t) {
  const a = S.forget; let s = '';
  s += kinS(250, 'Then one week… | they *forget.*', t, a + 0.1, 96, { col: '#fff', acc: C.peach });
  s += kinAr(500, 'وفجأة أسبوع… ينسون.', t, a + 0.5, 66, C.peach);
  s += visits(t, a, 640 + float(t, 2), { gone: true, static: true, missAt: 0.9 });
  s += kinS(1330, 'And try *next* *door.*', t, a + 2.6, 76, { col: '#fff', acc: C.peach });
  s += kinAr(1440, 'ويجربون المحل اللي جنبك.', t, a + 2.9, 50, '#d8d3cf');
  return scene(t, S.forget, S.maths, s);
}

function sMaths(t) {
  return scene(t, S.maths, S.app, K.calc(t, S.maths, {
    n: '04',
    rows: [
      { at: 1.0, en: 'Skipped visits a month', ar: 'زيارات فاتت بالشهر', val: (n, k) => `${n(10, k)}` },
      { at: 1.6, en: 'Each visit', ar: 'كل زيارة', val: (n, k) => `× ${n(8, k)} KD` },
      { at: 2.2, en: 'Every month', ar: 'كل شهر', val: (n, k) => `= ${n(80, k)} KD` },
      { at: 2.9, en: 'In 12 months', ar: 'في ١٢ شهر', val: () => `× 12` },
    ],
    total: { at: 3.6, en: 'Lost a year', ar: 'ضاع عليك بالسنة', value: 960 },
  }));
}

function sApp(t) {
  const a = S.app, tr = t - a; let s = '';
  s += kinS(240, 'A simple app | *reminds* them.', t, a + 0.1, 88);
  s += kinAr(470, 'تطبيق بسيط… يذكّرهم.', t, a + 0.5, 62);
  const x = 140, y = 600 + float(t, 3), w = 470, h = 860;
  let ph = K.phone(x, y, w, h);
  // loyalty card
  ph += `<rect x="${x + 40}" y="${f(y + 90)}" width="${w - 80}" height="230" rx="30" fill="${C.ink}"/>`;
  ph += `<text x="${x + 70}" y="${f(y + 150)}" font-family="Archivo" font-weight="900" font-size="34" fill="#fff">Your points</text>`;
  ph += html(x + 70, y + 160, 300, 50, `<span style="${AR(26, '#bdb6b0')}">نقاطك</span>`, 'direction:rtl;text-align:left;');
  for (let i = 0; i < 10; i++) {
    const k = eb(seg(tr, 0.6 + i * 0.08, 0.85 + i * 0.08)), on = i < 7;
    const cx = x + 80 + (i % 5) * 72, cy = y + 240 + Math.floor(i / 5) * 56;
    ph += pop(cx, cy, k, `<circle cx="${cx}" cy="${f(cy)}" r="22" fill="${on ? C.peach : '#4a4542'}"/>`);
  }
  // book again button
  const kb = eb(seg(tr, 1.6, 2.0)), tap = tr > 2.4 && tr < 2.7 ? 0.94 : 1;
  ph += pop(x + w / 2, y + 420, kb * tap, `<rect x="${x + 40}" y="${f(y + 370)}" width="${w - 80}" height="100" rx="50" fill="${C.red}"/><text x="${x + w / 2}" y="${f(y + 433)}" font-family="Archivo" font-weight="900" font-size="38" fill="#fff" text-anchor="middle">Book again · احجز</text>`);
  ph += `<rect x="${x + 40}" y="${f(y + 510)}" width="${w - 80}" height="120" rx="24" fill="#f4f3f2"/><rect x="${x + 40}" y="${f(y + 650)}" width="${w - 80}" height="120" rx="24" fill="#f4f3f2"/>`;
  s += ph;
  // notification
  const kn = eb(seg(tr, 1.0, 1.4)), ny = 700 + float(t, 4);
  s += pop(780, ny + 90, kn, `<rect x="560" y="${f(ny)}" width="440" height="190" rx="34" fill="#fff" filter="url(#sh)"/><circle cx="615" cy="${f(ny + 60)}" r="26" fill="${C.peach}"/>` + K.lbl('REMINDER', 655, ny + 70, 24, C.mute, 'start'));
  s += html(585, ny + 95, 400, 100, `<div style="${EN(30, C.ink)}letter-spacing:-1px;opacity:${f(Math.min(1, kn))}">Your usual slot is free tomorrow</div><div style="${AR(24, C.mute)}direction:rtl;text-align:left;opacity:${f(Math.min(1, kn))}">موعدك المعتاد فاضي باچر</div>`);
  s += K.demoTag(700, 960 + float(t, 2));
  const items = [['Reminders', 'تذكير'], ['Points', 'نقاط'], ['Book again', 'حجز بسهولة']];
  items.forEach((it, i) => {
    const k = eb(seg(tr, 2.6 + i * 0.4, 3.0 + i * 0.4)), yy = 1100 + i * 110;
    if (k <= 0) return;
    s += pop(660, yy + 30, k, `<circle cx="660" cy="${yy + 30}" r="30" fill="${C.green}"/><path d="M647 ${yy + 31} l9 9 l17 -19" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
    s += html(705, yy, 330, 70, `<span style="${EN(40, C.ink)}letter-spacing:-1px;opacity:${f(Math.min(1, k))}">${it[0]}</span><br/><span style="${AR(28, C.mute)}opacity:${f(Math.min(1, k))}">${it[1]}</span>`);
  });
  return scene(t, S.app, S.end, s);
}

module.exports = {
  dur: DUR, S, homeScreen, hookMain, sForget,
  frame(t) {
    const mode = (t >= S.forget && t < S.maths) || t >= S.end ? 'dark' : 'paper';
    return bg(t, mode) + hookMain(t) + sRegulars(t) + sForget(t) + sMaths(t) + sApp(t) + K.endCard(t, S.end);
  },
};
