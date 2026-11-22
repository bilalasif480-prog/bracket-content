// week-03 trial reels: each day's base reel with ONE change, the opening hook (0 → cut s).
// Select with env TRIAL=dayN-trialA|B, e.g. TRIAL=day1-trialA OUTNAME=day1-trialA node render.js trials
const K = require('./kit');
const { C, seg, eo, eb, f, kinS, kinAr, hookScene, float, lbl, pop, html, AR, EN } = K;
const CUT = 3.6;

const hisaab = () => require('./hisaab');
const geo = () => require('./day2-geo');
const night = () => require('./day4-night');
const seo = () => require('./day5-seo');
const app = () => require('./day6-app');
const missed = () => require('./day7-missed');

// generic hook: lines [{s, size, at, col?, acc?}] + ar {s,size,at,col} + prop(t)
function H(items, prop, dark) {
  return t => {
    let s = '';
    items.forEach(it => {
      if (it.ar) s += kinAr(it.y, it.ar, t, it.at, it.size, it.col || (dark ? C.peach : C.ink), it.step ?? 0.12);
      else s += kinS(it.y, it.s, t, it.at, it.size, { col: it.col || (dark ? '#fff' : C.ink), acc: it.acc || (dark ? C.peach : C.red), step: it.step ?? 0.17 });
    });
    return hookScene(t, CUT, s + (prop ? prop(t) : ''));
  };
}
function noResults(t, y0, q) {
  let s = K.searchCard(t, -0.2, y0, q, { h: 480, typeAt: 0, typeDur: 0.7 });
  const k = eb(seg(t, 1.0, 1.4));
  if (k > 0) s += pop(540, y0 + 320, k, `<circle cx="540" cy="${y0 + 280}" r="58" fill="${C.red}" opacity=".12"/><path d="M518 ${y0 + 258} l44 44 M562 ${y0 + 258} l-44 44" stroke="${C.red}" stroke-width="12" stroke-linecap="round"/><text x="540" y="${y0 + 420}" font-family="Archivo" font-weight="900" font-size="60" fill="${C.red}" text-anchor="middle">No results.</text>`);
  return s;
}
function dmProp(t, y0) {
  let s = K.card(130, y0, 820, 470, 48);
  s += `<rect x="190" y="${f(y0 + 60)}" width="330" height="150" rx="40" fill="#efedeb"/>`;
  s += html(190, y0 + 68, 330, 140, `<div style="${EN(50, C.ink)}letter-spacing:-1px">Price?</div><div style="${AR(38, C.ink)}direction:rtl;text-align:left">كم السعر؟</div>`, 'padding:12px 34px;box-sizing:border-box;');
  s += lbl('Seen', 200, y0 + 255, 30, C.mute, 'start');
  s += K.clock(700, y0 + 300, 110, Math.max(0, t), 1.6);
  return s;
}
function aiAsk(t, y0, q) {
  let s = K.card(110, y0, 860, 520, 48);
  s += K.star(190, y0 + 80, 28, t * 60, C.red) + lbl('AI ASSISTANT', 240, y0 + 90, 28, C.mute, 'start');
  const n = Math.floor(seg(t, 0, 0.9) * q.length);
  s += `<rect x="330" y="${f(y0 + 160)}" width="600" height="110" rx="40" fill="#efedeb"/>`;
  s += html(360, y0 + 185, 560, 70, `<span style="${EN(42, C.ink)}letter-spacing:-1px">${q.slice(0, n)}</span>`);
  for (let i = 0; i < 3; i++) {
    const k = eb(seg(t, 1.2 + i * 0.25, 1.5 + i * 0.25)), y = y0 + 310 + i * 65;
    if (k > 0) s += pop(170, y, k, `<circle cx="180" cy="${y}" r="20" fill="${C.ink}"/><rect x="220" y="${y - 16}" width="${360 - i * 50}" height="32" rx="16" fill="#d9d5d2"/>`);
  }
  return s;
}
function unread(t, y0) {
  let s = K.phone(300, y0, 480, 560);
  for (let i = 0; i < 4; i++) {
    const y = y0 + 110 + i * 105, k = Math.max(0.5, eb(seg(t, i * 0.2 - 0.2, 0.1 + i * 0.2)));
    s += pop(540, y + 40, k, `<circle cx="380" cy="${y + 40}" r="34" fill="#e4e1df"/><rect x="430" y="${y + 20}" width="200" height="18" rx="9" fill="#d9d5d2"/><rect x="430" y="${y + 50}" width="140" height="14" rx="7" fill="#ebe8e6"/><circle cx="710" cy="${y + 40}" r="24" fill="${C.green}"/><text x="710" y="${y + 50}" font-family="Archivo" font-weight="900" font-size="26" fill="#fff" text-anchor="middle">${[3, 7, 1, 12][i]}</text>`);
  }
  const ks = eb(seg(t, 0.8, 1.2)), sw = Math.sin(t * 3) * 5;
  s += `<g transform="translate(820 ${f(y0 + 40)}) rotate(${f(sw)})" opacity="${f(Math.min(1, ks))}"><line x1="-60" y1="0" x2="-90" y2="-40" stroke="${C.mute}" stroke-width="4"/><line x1="60" y1="0" x2="90" y2="-40" stroke="${C.mute}" stroke-width="4"/><rect x="-130" y="0" width="260" height="110" rx="18" fill="${C.red}"/><text x="0" y="52" font-family="Archivo" font-weight="900" font-size="42" fill="#fff" text-anchor="middle">CLOSED</text><text x="0" y="94" font-family="PlexAr" font-weight="700" font-size="32" fill="#fff" text-anchor="middle">مسكّر</text></g>`;
  return s;
}
function pins(t, y0) {
  let s = K.card(130, y0, 820, 460, 48);
  s += `<path d="M130 ${y0 + 200} Q 400 ${y0 + 120} 950 ${y0 + 260}" stroke="#e7e3e0" stroke-width="40" fill="none"/><path d="M380 ${y0} L 460 ${y0 + 460}" stroke="#e7e3e0" stroke-width="30"/>`;
  [[300, 260], [560, 170], [780, 330]].forEach(([x, y], i) => {
    const k = eb(seg(t, 0.6 + i * 0.3, 0.9 + i * 0.3));
    s += `<g transform="translate(${x} ${f(y0 + y - (1 - k) * 80)})" opacity="${f(Math.min(1, Math.max(0, k)))}"><path d="M0 30 C-40 -10 -40 -60 0 -60 C40 -60 40 -10 0 30 Z" fill="${i === 1 ? C.red : C.ink}"/><text x="0" y="-22" font-family="Archivo" font-weight="900" font-size="30" fill="#fff" text-anchor="middle">?</text></g>`;
  });
  s += `<circle cx="540" cy="${y0 + 400}" r="16" fill="#3b82f6"/><circle cx="540" cy="${y0 + 400}" r="${f(16 + (t * 30) % 30)}" fill="none" stroke="#3b82f6" stroke-width="4" opacity="${f(1 - ((t * 30) % 30) / 30)}"/>`;
  return s;
}
const homeP = (t) => require('./day6-app').homeScreen(t, -0.3, 300, 880 + float(t));
const tagChip = (s, y) => `<rect x="${540 - s.length * 11 - 30}" y="${y}" width="${s.length * 22 + 60}" height="56" rx="28" fill="${C.ink}"/>` + lbl(s, 540, y + 38, 28, '#fff');

const T = {
  'day1-trialA': [hisaab, H([
    { y: 250, s: 'Your customer | *searched* your name.', at: -0.4, size: 86 },
    { y: 480, s: 'Nothing | came *up.*', at: 0.8, size: 110 },
    { y: 760, ar: 'عميلك دوّر اسمك… وما طلع شي.', at: 1.2, size: 62 },
  ], t => noResults(t, 950 + float(t), 'your shop name'))],
  'day1-trialB': [hisaab, H([
    { y: 250, s: 'Asked the *price* | on DM.', at: -0.4, size: 100 },
    { y: 500, s: 'Answered | the *next* *day.*', at: 0.8, size: 100 },
    { y: 760, ar: 'سأل عن السعر بالخاص… والرد ثاني يوم.', at: 1.2, size: 60 },
  ], t => dmProp(t, 960 + float(t)))],
  'day2-trialA': [geo, H([
    { y: 240, s: 'Ask *ChatGPT* for a | clinic in Didsbury.', at: -0.4, size: 82 },
    { y: 460, s: 'Are *you* in | the answer?', at: 0.8, size: 100 },
    { y: 720, ar: 'انت موجود بالجواب؟', at: 1.2, size: 50 },
  ], t => aiAsk(t, 920 + float(t), 'Best clinic in Didsbury?'))],
  'day2-trialB': [() => require('./day2-geo').make({ hook: true, biz: { q: 'Best salon in Chorlton?', qAr: '', en: 'salon', ar: 'صالونك', not: 'مو موجود' } }), H([
    { y: 240, s: 'Ask *ChatGPT* for a | salon in Chorlton.', at: -0.4, size: 82 },
    { y: 460, s: 'Are *you* in | the answer?', at: 0.8, size: 100 },
    { y: 720, ar: 'انت موجود بالجواب؟', at: 1.2, size: 50 },
  ], t => aiAsk(t, 920 + float(t), 'Best salon in Chorlton?')), true],
  'day3-trialA': [night, H([
    { y: 760, s: '*1* *a.m.* A customer | wants to book.', at: -0.4, size: 88 },
    { y: 1000, s: 'Who *answers?*', at: 0.9, size: 116 },
    { y: 1170, ar: 'الساعة ١ بالليل… عميل يبي يحجز. منو يرد؟', at: 1.3, size: 56 },
  ], t => `<g transform="translate(0 ${f(float(t) * 2)})">${K.moon(800, 330, 90, t)}</g>` + K.timeChip(540, 560, '1:00 AM', Math.max(0.9, eb(seg(t, 0, 0.4))), true), true), 'night'],
  'day3-trialB': [night, H([
    { y: 250, s: 'Still answering | *WhatsApp*', at: -0.4, size: 96 },
    { y: 490, s: 'after *closing?*', at: 0.8, size: 104 },
    { y: 640, ar: 'للحين ترد على الواتساب بعد الدوام؟', at: 1.2, size: 62 },
  ], t => unread(t, 860 + float(t)), true), 'night'],
  'day4-trialA': [app, H([
    { y: 250, s: '"I\'m *small.*', at: -0.4, size: 120 },
    { y: 420, s: 'An app | can *wait."*', at: 0.7, size: 120 },
    { y: 720, ar: '"مشروعي صغير… التطبيق بعدين."', at: 1.2, size: 64 },
  ], homeP)],
  'day4-trialB': [app, H([
    { y: 250, s: 'Same customers | *every* week.', at: -0.4, size: 96 },
    { y: 500, s: 'Still *no* *app?*', at: 0.8, size: 110 },
    { y: 660, ar: 'نفس الزباين كل أسبوع… وللحين ما عندك تطبيق؟', at: 1.2, size: 54 },
  ], homeP)],
  'day5-trialA': [seo, H([
    { y: 250, s: '*Clinic* *owners:*', at: -0.4, size: 110 },
    { y: 400, s: 'patients search | before they *call.*', at: 0.6, size: 92 },
    { y: 660, ar: 'أصحاب العيادات: المراجع يدوّر قبل لا يتصل.', at: 1.2, size: 56 },
  ], t => K.searchCard(t, -0.2, 900 + float(t), 'clinic near me', { h: 300, typeAt: 0, typeDur: 0.8 }) + K.resultRows(t, 1030 + float(t), 1, { k: () => eb(seg(t, 1.0, 1.3)) }))],
  'day5-trialB': [seo, H([
    { y: 250, s: 'Search *"near* *me".*', at: -0.4, size: 96 },
    { y: 400, s: 'Who *shows* *up?*', at: 0.8, size: 104 },
    { y: 600, ar: 'دوّر "قريب مني"… منو يطلع؟', at: 1.2, size: 66 },
  ], t => pins(t, 860 + float(t)))],
  'day6-trialA': [app, H([
    { y: 240, s: '*Gym* *owners:* same | members every week.', at: -0.4, size: 84 },
    { y: 470, s: 'Still *no* *app?*', at: 0.9, size: 110 },
    { y: 630, ar: 'أصحاب الجيم: نفس الأعضاء كل أسبوع… وللحين بدون تطبيق؟', at: 1.2, size: 48 },
  ], t => tagChip('GYM', 790) + homeP(t))],
  'day6-trialB': [app, H([
    { y: 240, s: '*Salon* *owners:* same | clients every week.', at: -0.4, size: 84 },
    { y: 470, s: 'Still *no* *app?*', at: 0.9, size: 110 },
    { y: 630, ar: 'أصحاب الصالونات: نفس الزبونات كل أسبوع… وللحين بدون تطبيق؟', at: 1.2, size: 46 },
  ], t => tagChip('SALON', 790) + homeP(t))],
  'day7-trialA': [missed, H([
    { y: 270, s: 'Missed *call.*', at: -0.4, size: 140, step: 0.2 },
    { y: 460, s: 'Lost *job.*', at: 0.7, size: 140, step: 0.2 },
    { y: 660, ar: 'مكالمة فايتة… شغلة راحت.', at: 1.2, size: 76, col: C.red },
  ], t => tagChip('TRADES · HOME SERVICE', 860) + require('./day7-missed').missedCard(t, -0.1, 980 + float(t)))],
  'day7-trialB': [missed, H([
    { y: 270, s: 'Missed *call.*', at: -0.4, size: 140, step: 0.2 },
    { y: 470, s: 'Lost *booking.*', at: 0.7, size: 118, step: 0.2 },
    { y: 660, ar: 'مكالمة فايتة… حجز راح.', at: 1.2, size: 76, col: C.red },
  ], t => tagChip('SALON', 860) + require('./day7-missed').missedCard(t, -0.1, 980 + float(t)))],
};

const key = process.env.TRIAL;
if (!T[key]) throw new Error('set TRIAL to one of ' + Object.keys(T).join(', '));
const hook = T[key][1];
const mode = key.startsWith('day3') ? 'night' : 'paper';
// SHORT cut (T-20261122-06 revision): the hook is played in 2.5 s (its 3.6 s timing re-timed), then the day's short main from 2.5 s
const NEW_CUT = 2.5;
const BASEDAY = { day1: 'day1', day2: 'day2', day3: 'day4', day4: 'day6', day5: 'day5', day6: 'day6', day7: 'day7' };
const short = require('./short');
const b = key === 'day2-trialB'
  ? short.build('day2', { biz: { q: 'Best salon in Chorlton?', qAr: '', en: 'salon', ar: 'صالونك', not: 'مو موجود' } })
  : short.build(BASEDAY[key.slice(0, 4)]);
module.exports = { dur: b.dur, cut: NEW_CUT, frame: t => t < NEW_CUT ? K.bg(t, mode) + hook(t * CUT / NEW_CUT) : b.frame(t) };
module.exports.full = key === 'day2-trialB'; // body differs (salon query) -> render the whole reel
