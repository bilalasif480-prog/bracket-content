// Day 7 (Sun 29 Nov) MAIN · Format card A (+G's "fixed version") · AI agents (clinic) · HISAAB #05
// Hook: "Missed call. Lost patient."  Body is business-neutral so the trades / salon trials fit it. Demo labelled.
const K = require('./kit');
const { C, seg, eo, eb, f, kinS, kinAr, card, bg, scene, hookScene, float, lbl, pop, html, AR, EN } = K;

const DUR = 28.0;
const S = { hook: 0, busy: 3.6, next: 8.4, maths: 13.2, agent: 19.0, end: 25.0 };

// missed-call card: counter ticks up
function missedCard(t, a, y0, o = {}) {
  let s = card(150, y0, 780, 360, 50);
  const n = Math.min(o.max ?? 3, 1 + Math.floor(Math.max(0, t - a) / (o.every ?? 0.7)));
  const shake = Math.sin(t * 40) * (((t - a) % (o.every ?? 0.7)) < 0.2 ? 6 : 0);
  s += `<g transform="translate(${f(270 + shake)} ${f(y0 + 180)})"><circle r="80" fill="${C.red}"/><path d="M-36 -10 C-36 -30 36 -30 36 -10 L36 4 L20 10 L14 -6 C4 -10 -4 -10 -14 -6 L-20 10 L-36 4 Z" fill="#fff" transform="rotate(135)"/></g>`;
  s += html(390, y0 + 90, 520, 200, `<div style="${EN(60, C.red)}letter-spacing:-2px">Missed call${n > 1 ? 's' : ''} (${n})</div><div style="${AR(40, C.mute)}direction:rtl;text-align:left">مكالمة فايتة (${n})</div>`);
  return s;
}

function hookMain(t) {
  let s = '';
  s += kinS(270, 'Missed *call.*', t, -0.4, 140, { step: 0.2 });
  s += kinS(460, 'Lost *patient.*', t, 0.7, 140, { step: 0.2 });
  s += kinAr(660, 'مكالمة فايتة… مراجع راح.', t, 1.2, 76, C.red);
  s += missedCard(t, -0.1, 980 + float(t));
  return hookScene(t, S.busy, s);
}

function sBusy(t) {
  const a = S.busy, tr = t - a; let s = '';
  s += kinS(250, "You're *busy.*", t, a + 0.1, 116);
  s += kinAr(410, 'انت مشغول…', t, a + 0.4, 72);
  s += kinS(530, 'The phone keeps *ringing.*', t, a + 1.0, 72, { step: 0.15 });
  s += kinAr(640, 'والتلفون يرن ويرن.', t, a + 1.4, 52);
  // ringing phone + queue
  const y0 = 820 + float(t, 1), ring = Math.sin(t * 30) * 8;
  s += card(160, y0, 760, 560, 50);
  s += `<g transform="translate(${f(380 + ring)} ${f(y0 + 230)}) rotate(${f(ring)})"><rect x="-90" y="-150" width="180" height="300" rx="34" fill="${C.ink}"/><rect x="-74" y="-128" width="148" height="250" rx="22" fill="${C.peach}"/></g>`;
  for (let i = 0; i < 3; i++) {
    const k = (tr * 1.4 + i / 3) % 1;
    s += `<circle cx="380" cy="${f(y0 + 230)}" r="${f(120 + k * 120)}" fill="none" stroke="${C.red}" stroke-width="6" opacity="${f(1 - k)}"/>`;
  }
  // queue of people
  for (let i = 0; i < 3; i++) {
    const k = eb(seg(tr, 0.6 + i * 0.3, 0.9 + i * 0.3)), x = 640 + i * 90;
    s += pop(x, y0 + 300, k, `<circle cx="${x}" cy="${f(y0 + 250)}" r="30" fill="#d9d5d2"/><path d="M${x - 42} ${f(y0 + 360)} a42 50 0 0 1 84 0 Z" fill="#d9d5d2"/>`);
  }
  s += `<g opacity="${f(eo(seg(tr, 1.6, 2.0)))}">${lbl('3 WAITING · 1 RINGING', 540, y0 + 480, 30, C.mute)}</g>`;
  return scene(t, S.busy, S.next, s);
}

function sNext(t) {
  const a = S.next, tr = t - a; let s = '';
  s += kinS(260, 'So they call | the *next* one.', t, a + 0.1, 104, { col: '#fff', acc: C.peach });
  s += kinAr(520, 'فيتصلون باللي بعدك.', t, a + 0.6, 68, C.peach);
  const y0 = 760 + float(t, 2);
  s += missedCard(t, a - 2.0, y0);
  const k = eb(seg(tr, 1.6, 2.0));
  s += pop(540, y0 + 560, k, `<rect x="150" y="${f(y0 + 420)}" width="780" height="260" rx="50" fill="#2d2a28"/><circle cx="270" cy="${f(y0 + 550)}" r="70" fill="${C.green}"/><path d="M240 ${f(y0 + 535)} l24 24 l40 -44" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
  s += html(380, y0 + 480, 520, 160, `<div style="${EN(50, '#fff')}letter-spacing:-2px;opacity:${f(Math.min(1, k))}">Booked… somewhere else</div><div style="${AR(36, '#bdb6b0')}direction:rtl;text-align:left;opacity:${f(Math.min(1, k))}">حجز… بمكان ثاني</div>`);
  return scene(t, S.next, S.maths, s);
}

function sMaths(t) {
  return scene(t, S.maths, S.agent, K.calc(t, S.maths, {
    n: '05',
    rows: [
      { at: 1.0, en: 'Lost bookings a week', ar: 'حجوزات ضايعة بالأسبوع', val: (n, k) => `${n(3, k)}` },
      { at: 1.6, en: 'Each visit', ar: 'كل زيارة', val: (n, k) => `× £${n(40, k)}` },
      { at: 2.2, en: 'Every week', ar: 'كل أسبوع', val: (n, k) => `= £${n(120, k)}` },
      { at: 2.9, en: 'In 4 weeks', ar: 'في ٤ أسابيع', val: () => `× 4` },
    ],
    total: { at: 3.6, en: 'Lost a month', ar: 'ضاع عليك بالشهر', value: 480 },
  }));
}

function sAgent(t) {
  const a = S.agent, tr = t - a; let s = '';
  s += kinS(240, 'The *fix:* an AI agent | texts them back.', t, a + 0.1, 82, { step: 0.15 });
  s += kinAr(450, 'الحل: وكيل ذكاء اصطناعي يرد عليهم بالواتساب.', t, a + 0.6, 50, C.ink, 0.1);
  const y0 = 570 + float(t, 3);
  s += K.chatCard(t, a, 110, y0, 860, 760, [
    { at: 0.6, side: 'r', en: 'Missed your call! 5:00 or 6:30 today?', ar: 'فاتتنا مكالمتك! اليوم ٥:٠٠ ولا ٦:٣٠؟', w: 720, size: 32 },
    { at: 1.8, side: 'l', en: '6:30 please', ar: '٦:٣٠ لو سمحت', w: 380, size: 36 },
    { at: 2.6, side: 'r', en: 'Booked for 6:30 ✓', ar: 'تم الحجز ٦:٣٠ ✓', w: 480, size: 36, col: '#cdeedd' },
  ], { title: 'AI agent', sub: 'WHATSAPP · AFTER A MISSED CALL', subCol: C.green, avatar: C.peach, typing: [2.1, 2.6], typingSide: 'r' });
  s += K.demoTag(690, y0 + 40);
  const ks = eo(seg(tr, 3.4, 3.8));
  s += `<g opacity="${f(ks)}">${lbl('YOUR TEAM STEPS IN WHEN NEEDED', 540, 1420, 30, C.ink)}</g>`;
  s += html(140, 1440, 800, 60, `<div style="${AR(36, C.mute)}text-align:center;direction:rtl;opacity:${f(ks)}">وفريقك يتدخل وقت الحاجة</div>`);
  return scene(t, S.agent, S.end, s);
}

module.exports = {
  dur: DUR, S, missedCard, hookMain, sNext,
  frame(t) {
    const mode = (t >= S.next && t < S.maths) || t >= S.end ? 'dark' : 'paper';
    return bg(t, mode) + hookMain(t) + sBusy(t) + sNext(t) + sMaths(t) + sAgent(t) + K.endCard(t, S.end, { ai: true });
  },
};
