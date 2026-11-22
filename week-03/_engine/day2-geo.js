// Day 2 (Tue 24 Nov) MAIN · Format card B "Google → AI answer" · GEO (+SEO)
// Hook: "Customers aren't asking Google any more. They're asking ChatGPT."
const K = require('./kit');
const { C, seg, eo, eb, f, kin, kinS, kinAr, card, bg, scene, hookScene, float, lbl, pop, html, AR, EN, esc } = K;

const DUR = 26.8;
const S = { hook: 0, ask: 3.6, answer: 8.6, why: 13.6, fix: 19.0, end: 23.8 };

function hookMain(t) {
  let s = '';
  s += kinS(250, 'Customers _stopped_ | asking *Google.*', t, -0.4, 90, { step: 0.18 });
  s += kinAr(500, 'العملاء ما صاروا يسألون قوقل…', t, 0.3, 60);
  s += kinS(640, 'They ask *ChatGPT.*', t, 1.1, 92, { step: 0.2 });
  s += kinAr(790, 'يسألون ChatGPT.', t, 1.5, 72, C.red);
  // search bar gets struck out, AI chat card slides over it
  const y0 = 1000 + float(t);
  s += card(130, y0, 820, 170, 85);
  s += `<circle cx="215" cy="${f(y0 + 85)}" r="22" fill="none" stroke="${C.mute}" stroke-width="7"/><path d="M231 ${f(y0 + 101)} l20 20" stroke="${C.mute}" stroke-width="8" stroke-linecap="round"/>`;
  s += `<text x="280" y="${f(y0 + 102)}" font-family="Archivo" font-weight="800" font-size="46" fill="${C.mute}">Search…</text>`;
  const ks = seg(t, 1.0, 1.4);
  s += `<line x1="160" y1="${f(y0 + 85)}" x2="${f(160 + 760 * ks)}" y2="${f(y0 + 85)}" stroke="${C.red}" stroke-width="12" stroke-linecap="round"/>`;
  const ka = eb(seg(t, 1.5, 2.0)), y1 = 1230 + float(t, 1);
  s += pop(540, y1 + 110, ka, aiBox(y1, 'Best clinic in Salmiya?', 1, t));
  return hookScene(t, S.ask, s);
}
function aiBox(y, q, n, t) {
  let s = card(130, y, 820, 220, 50);
  s += K.star(205, y + 75, 26, t * 60, C.red);
  s += lbl('AI ASSISTANT', 250, y + 85, 26, C.mute, 'start');
  s += html(180, y + 115, 720, 70, `<span style="font-family:Archivo;font-weight:800;font-size:44px;color:${C.ink}">${esc(q.slice(0, Math.floor(q.length * n)))}</span>`);
  return s;
}

function make(o = {}) {
  const biz = o.biz || { q: 'Best clinic in Salmiya?', qAr: 'أحسن عيادة بالسالمية؟', en: 'clinic', ar: 'عيادتك' };
  function sAsk(t) {
    const a = S.ask, tr = t - a; let s = '';
    s += kinS(270, 'They *type…*', t, a + 0.1, 104);
    s += kinAr(410, 'يكتبون…', t, a + 0.35, 70);
    const y0 = 600 + float(t, 1);
    s += card(110, y0, 860, 760, 48);
    s += K.star(190, y0 + 80, 28, t * 60, C.red);
    s += lbl('AI ASSISTANT', 240, y0 + 90, 28, C.mute, 'start');
    s += `<line x1="110" y1="${f(y0 + 150)}" x2="970" y2="${f(y0 + 150)}" stroke="#eeebe9" stroke-width="3"/>`;
    // user bubble typing
    const n = Math.floor(seg(tr, 0.5, 1.8) * biz.q.length);
    s += `<rect x="330" y="${f(y0 + 200)}" width="600" height="150" rx="40" fill="#efedeb"/>`;
    const cur = n < biz.q.length ? `<span style="display:inline-block;width:4px;height:44px;background:${C.red};vertical-align:-8px;margin-left:3px"></span>` : '';
    s += html(360, y0 + 215, 560, 130, `<div style="${EN(44, C.ink)}letter-spacing:-1px">${esc(biz.q.slice(0, n))}${cur}</div><div style="${AR(32, C.mute)}direction:rtl;text-align:left;opacity:${f(seg(tr, 1.8, 2.1))}">${esc(biz.qAr)}</div>`);
    // thinking dots
    if (tr > 2.2) {
      for (let i = 0; i < 3; i++) s += `<circle cx="${190 + i * 34}" cy="${f(y0 + 440 - Math.abs(Math.sin(t * 8 + i)) * 12)}" r="11" fill="${C.peach}"/>`;
      s += kin(y0 + 500, [['Thinking…', C.mute, 1]], t, a + 2.4, 56);
    }
    return scene(t, S.ask, S.answer, s);
  }
  function sAnswer(t) {
    const a = S.answer, tr = t - a; let s = '';
    s += kinS(250, 'The answer lists… | *other* businesses.', t, a + 0.1, 80, { step: 0.17 });
    s += kinAr(470, 'الجواب فيه… محلات ثانية.', t, a + 0.6, 64);
    const y0 = 610 + float(t, 2);
    s += card(110, y0, 860, 820, 48);
    s += K.demoTag(150, y0 + 40);
    s += html(150, y0 + 120, 780, 70, `<span style="${EN(42, C.ink)}letter-spacing:-1px">Here are 3 good options:</span>`);
    for (let i = 0; i < 3; i++) {
      const k = eb(seg(tr, 0.8 + i * 0.45, 1.2 + i * 0.45)), y = y0 + 220 + i * 125;
      if (k <= 0) continue;
      s += pop(170, y + 40, k, `<circle cx="190" cy="${y + 40}" r="30" fill="${C.ink}"/><text x="190" y="${y + 53}" font-family="Archivo" font-weight="900" font-size="36" fill="#fff" text-anchor="middle">${i + 1}</text>` +
        `<rect x="245" y="${y + 18}" width="${380 - i * 40}" height="44" rx="22" fill="#d9d5d2" filter="url(#blr)"/>` +
        `<text x="${700 - i * 40}" y="${y + 55}" font-family="Archivo" font-weight="900" font-size="40" fill="${C.gold}">★★★★★</text>`);
    }
    s += `<defs><filter id="blr"><feGaussianBlur stdDeviation="6"/></filter></defs>`;
    // "you": not listed
    const ky = eb(seg(tr, 2.4, 2.8)), y = y0 + 610;
    if (ky > 0) {
      s += pop(540, y + 70, ky, `<rect x="150" y="${y}" width="780" height="150" rx="34" fill="${C.red}" opacity=".1"/><g transform="translate(220 ${y + 75})"><circle r="40" fill="${C.red}"/><path d="M-16 -16 L16 16 M16 -16 L-16 16" stroke="#fff" stroke-width="10" stroke-linecap="round"/></g>`);
      s += html(290, y + 18, 620, 130, `<div style="${EN(48, C.red)}letter-spacing:-1px;opacity:${f(ky)}">Your ${esc(biz.en)}? Not there.</div><div style="${AR(34, C.red)}direction:rtl;text-align:left;opacity:${f(ky)}">${esc(biz.ar)}؟ ${biz.not || 'مو موجودة'}.</div>`);
    }
    return scene(t, S.answer, S.why, s);
  }
  function sWhy(t) {
    const a = S.why; let s = '';
    s += kinS(250, 'Why *not* you?', t, a + 0.1, 112, { col: '#fff' });
    s += kinAr(400, 'ليش مو انت؟', t, a + 0.4, 74, C.peach);
    s += kinS(530, 'AI picks businesses | it can *read* and *trust:*', t, a + 0.9, 64, { col: '#fff', acc: C.peach, step: 0.13 });
    s += kinAr(700, 'الذكاء الاصطناعي يختار اللي يقدر يفهمه ويثق فيه:', t, a + 1.4, 44, '#d8d3cf', 0.1);
    const items = [['1/3', 'A clear website', 'موقع واضح'], ['2/3', 'Answers to real questions', 'أجوبة لأسئلة الناس'], ['3/3', 'Reviews + Google profile', 'تقييمات وملف قوقل']];
    items.forEach((it, i) => {
      const k = eb(seg(t - a, 2.0 + i * 0.7, 2.4 + i * 0.7)), y = 830 + i * 230 + float(t, i);
      if (k <= 0) return;
      s += pop(540, y + 95, k, `<rect x="110" y="${f(y)}" width="860" height="190" rx="40" fill="#2d2a28"/>` + lbl(it[0], 150, y + 110, 40, C.peach, 'start'));
      s += html(290, y + 22, 650, 160, `<div style="${EN(50, '#fff')}letter-spacing:-2px;opacity:${f(Math.min(1, k))}">${it[1]}</div><div style="${AR(36, '#bdb6b0')}direction:rtl;text-align:left;opacity:${f(Math.min(1, k))}">${it[2]}</div>`);
    });
    return scene(t, S.why, S.fix, s);
  }
  function sFix(t) {
    const a = S.fix; let s = '';
    s += kinS(260, 'The *fix:*', t, a + 0.05, 110);
    s += kinAr(400, 'الحل:', t, a + 0.25, 72);
    s += K.tickList(t, a, [
      { en: 'GEO: get cited|in AI answers', ar: 'يذكرونك في أجوبة الذكاء الاصطناعي' },
      { en: 'SEO: get found|on Google', ar: 'يلقونك في قوقل' },
    ], { y0: 560, gap: 300, ch: 250 });
    return scene(t, S.fix, S.end, s);
  }
  return {
    dur: DUR, S,
    frame(t) {
      const mode = (t >= S.why && t < S.fix) || t >= S.end ? 'dark' : 'paper';
      return bg(t, mode) + (o.hook ? '' : hookMain(t)) + sAsk(t) + sAnswer(t) + sWhy(t) + sFix(t) + K.endCard(t, S.end);
    },
    aiBox, hookMain, sAnswer, sFix,
  };
}
const main = make();
main.make = make; main.aiBox = aiBox;
module.exports = main;
