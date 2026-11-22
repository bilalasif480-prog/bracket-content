// Day 4 (Thu 26 Nov) MAIN · Format card C "11 PM enquiry" · AI agents · HISAAB #02
// Hook: "What does your WhatsApp do at 11 PM?"  Body is time-neutral ("after closing") so the Wed trials (1 a.m. / after closing) fit it.
const K = require('./kit');
const { C, seg, eo, eb, f, kinS, kinAr, card, bg, scene, hookScene, float, lbl, pop, html, AR, EN } = K;

const DUR = 29.0;
const S = { hook: 0, lead: 3.6, morning: 8.4, maths: 13.4, agent: 19.2, end: 26.0 };

function hookMain(t) {
  let s = '';
  s += `<g transform="translate(0 ${f(float(t) * 2)})">${K.moon(800, 330, 90, t)}</g>`;
  s += K.timeChip(540, 640, '11:00 PM', Math.max(0.9, eb(seg(t, 0, 0.4))), true);
  s += kinS(820, 'What does your | *WhatsApp* do | at 11 PM?', t, -0.2, 100, { col: '#fff', acc: C.peach, step: 0.15 });
  s += kinAr(1220, 'شنو يسوي الواتساب مالك الساعة ١١ بالليل؟', t, 1.4, 58, C.peach, 0.12);
  return hookScene(t, S.lead, s);
}

const msgsNight = [
  { at: 0.5, side: 'l', en: 'Hi, can I book tomorrow 10am?', ar: 'هلا، أقدر أحجز باچر الساعة ١٠؟', w: 690, size: 36, meta: 'AFTER CLOSING' },
];
function sLead(t) {
  const a = S.lead, tr = t - a; let s = '';
  s += kinS(250, 'A customer | wants to *book.*', t, a + 0.1, 96, { col: '#fff', acc: C.peach });
  s += kinAr(500, 'عميل يبي يحجز…', t, a + 0.4, 66, '#d8d3cf');
  const y0 = 640 + float(t, 1);
  s += K.chatCard(t, a, 110, y0, 860, 520, msgsNight, { title: 'Customer', sub: 'WHATSAPP' });
  if (tr > 2.2) {
    s += kinS(1250, "You're *asleep.*", t, a + 2.3, 96, { col: '#fff', acc: C.peach });
    s += kinAr(1380, 'وانت نايم.', t, a + 2.6, 64, C.peach);
    for (let i = 0; i < 3; i++) {
      const k = seg(tr, 2.4 + i * 0.3, 2.8 + i * 0.3);
      if (k > 0) s += `<text x="${830 + i * 50}" y="${f(1240 - i * 60 - k * 30)}" font-family="Archivo" font-weight="900" font-size="${50 + i * 16}" fill="${C.peach}" opacity="${f(1 - k * 0.4)}">z</text>`;
    }
  }
  return scene(t, S.lead, S.morning, s);
}

function sMorning(t) {
  const a = S.morning, tr = t - a; let s = '';
  s += K.timeChip(540, 330, tr < 0.6 ? '--:--' : '9:30 AM', eb(seg(tr, 0, 0.3)) * (1 + 0.06 * Math.sin(seg(tr, 0.55, 0.8) * Math.PI)));
  s += kinS(450, 'You reply | in the *morning…*', t, a + 0.5, 72);
  s += kinAr(640, 'ترد الصبح…', t, a + 0.8, 52);
  const y0 = 730 + float(t, 2);
  s += K.chatCard(t, a, 110, y0, 860, 700, [
    { at: 0.1, side: 'l', en: 'Hi, can I book tomorrow 10am?', ar: 'هلا، أقدر أحجز باچر الساعة ١٠؟', w: 690, size: 36 },
    { at: 1.0, side: 'r', en: 'Yes! 10am is free', ar: 'أكيد! الساعة ١٠ فاضية', w: 520, size: 36, meta: '9:30 AM ✓✓' },
    { at: 2.2, side: 'l', en: 'Sorry, booked somewhere else', ar: 'آسف، حجزت بمكان ثاني', w: 690, size: 36, col: '#fde3dc' },
  ], { title: 'Customer', sub: 'WHATSAPP', typing: [1.5, 2.2] });
  if (tr > 3.0) {
    s += kinS(1450, 'Too *late.*', t, a + 3.0, 76);
  }
  return scene(t, S.morning, S.maths, s);
}

function sMaths(t) {
  return scene(t, S.maths, S.agent, K.calc(t, S.maths, {
    n: '02',
    rows: [
      { at: 1.0, en: 'Late enquiries a week', ar: 'رسائل بعد الدوام بالأسبوع', val: (n, k) => `${n(3, k)}` },
      { at: 1.6, en: 'Each booking', ar: 'كل حجز', val: (n, k) => `× ${n(20, k)} KD` },
      { at: 2.2, en: 'Every week', ar: 'كل أسبوع', val: (n, k) => `= ${n(60, k)} KD` },
      { at: 2.9, en: 'In 4 weeks', ar: 'في ٤ أسابيع', val: () => `× 4` },
    ],
    total: { at: 3.6, en: 'Lost a month', ar: 'ضاع عليك بالشهر', value: 240 },
  }));
}

function sAgent(t) {
  const a = S.agent, tr = t - a; let s = '';
  s += kinS(240, 'The *fix:* an AI agent | on your WhatsApp.', t, a + 0.1, 80, { step: 0.15 });
  s += kinAr(450, 'الحل: وكيل ذكاء اصطناعي على الواتساب.', t, a + 0.6, 54, C.ink, 0.12);
  const y0 = 570 + float(t, 3);
  s += K.chatCard(t, a, 110, y0, 860, 760, [
    { at: 0.6, side: 'l', en: 'Hi, can I book tomorrow 10am?', ar: 'هلا، أقدر أحجز باچر الساعة ١٠؟', w: 690, size: 36, meta: 'AFTER CLOSING' },
    { at: 1.4, side: 'r', en: 'Yes! 10:00 or 11:30?', ar: 'أكيد! ١٠:٠٠ ولا ١١:٣٠؟', w: 520, size: 36 },
    { at: 2.4, side: 'r', en: 'Booked for 10:00 ✓', ar: 'تم الحجز الساعة ١٠ ✓', w: 520, size: 36, col: '#cdeedd' },
  ], { title: 'AI agent', sub: 'ANSWERS · BOOKS · HANDS OVER', subCol: C.green, avatar: C.peach, typing: [0.9, 1.4], typingSide: 'r' });
  s += K.demoTag(690, y0 + 40);
  const ks = eo(seg(tr, 3.4, 3.8));
  s += `<g opacity="${f(ks)}">${lbl('HANDS OVER TO YOU WHEN NEEDED', 540, 1420, 30, C.ink)}</g>`;
  s += html(140, 1440, 800, 60, `<div style="${AR(36, C.mute)}text-align:center;direction:rtl;opacity:${f(ks)}">ويحوّل لك وقت الحاجة</div>`);
  return scene(t, S.agent, S.end, s);
}

module.exports = {
  dur: DUR, S, hookMain, sMorning,
  frame(t) {
    const mode = t < S.morning ? 'night' : t >= S.end ? 'dark' : 'paper';
    return bg(t, mode) + hookMain(t) + sLead(t) + sMorning(t) + sMaths(t) + sAgent(t) + K.endCard(t, S.end, { ai: true });
  },
};
