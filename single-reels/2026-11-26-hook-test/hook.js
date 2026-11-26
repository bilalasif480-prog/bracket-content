// Hook test (instamake, 26 Nov 2026): hooks-bank formula #1 "About to break" (stress hook).
// 0–3.5 s slow demo café site, thumb heading for "back", red countdown · 3.5 cut: same page loads, thumb taps "Book a table"
// · 6.5–8.5 end card · last 0.25 s crossfades into frame 0 so the loop is seamless.
// Render from week-03/_engine:  OUTNAME=hook-test node render.js ../../single-reels/2026-11-26-hook-test/hook
const K = require('../../week-03/_engine/kit');
const { C, clamp, seg, eo, eb, f, esc, html, EN, kinS, card, lbl, pop, bg } = K;
const G = C.green;
const TURN = 3.5, END = 6.5, DUR = 8.5;
const PX = 170, PY = 560, PW = 740, PH = 1220; // phone
const BACK = [252, 668]; // back button centre
const BOOK = [540, 1395]; // "Book a table" centre

// ---------- parts ----------
function phoneShell(inner, sx = 0, sy = 0) {
  return `<g transform="translate(${f(sx)} ${f(sy)})"><rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="70" fill="${C.ink}" filter="url(#sh)"/>
  <rect x="${PX + 16}" y="${PY + 16}" width="${PW - 32}" height="${PH - 32}" rx="56" fill="#fff"/>
  <rect x="${540 - 60}" y="${PY + 30}" width="120" height="30" rx="15" fill="${C.ink}"/>${inner}</g>`;
}
function browserBar(t, hot) {
  // back button (glows red as the thumb closes in), url pill with DEMO chip, progress bar
  let s = `<rect x="${PX + 16}" y="${PY + 74}" width="${PW - 32}" height="72" fill="#f4f3f2"/>`;
  const warn = hot >= 0; // hook scene passes hot>=0, turn scene passes -1
  s += warn ? `<circle cx="${BACK[0]}" cy="${BACK[1]}" r="${f(44 + 8 * Math.abs(Math.sin(t * 5)))}" fill="none" stroke="${C.red}" stroke-width="5" opacity=".7"/>` : '';
  s += `<circle cx="${BACK[0]}" cy="${BACK[1]}" r="34" fill="${warn ? C.red : '#e6e3e0'}" opacity="${f(warn ? 0.75 + 0.25 * hot : 1)}"/>`;
  s += `<text x="${BACK[0]}" y="${BACK[1] + 15}" font-family="Archivo" font-weight="900" font-size="46" fill="${warn ? '#fff' : C.ink}" text-anchor="middle">←</text>`;
  s += `<rect x="304" y="${PY + 86}" width="580" height="48" rx="24" fill="#fff" stroke="#e2dfdc" stroke-width="2"/>`;
  s += lbl('yourcafe.co.uk', 334, PY + 119, 24, C.mute, 'start');
  s += `<rect x="770" y="${PY + 93}" width="100" height="34" rx="17" fill="${C.red}"/>` + lbl('DEMO', 820, PY + 118, 20, '#fff');
  return s;
}
function spinner(cx, cy, t, r = 54) {
  const a = t * 420;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e3dfdb" stroke-width="14"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.red}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${f(r * 1.6)} ${f(r * 6.3)}" transform="rotate(${f(a)} ${cx} ${cy})"/>`;
}
function slowPage(t) {
  const y = PY + 146; let s = '';
  // stuck progress bar
  s += `<rect x="${PX + 16}" y="${y}" width="${PW - 32}" height="8" fill="#eee"/><rect x="${PX + 16}" y="${y}" width="${f((PW - 32) * (0.34 + 0.05 * clamp(t / 3.5)))}" height="8" fill="${C.red}"/>`;
  const sh = 0.5 + 0.5 * Math.sin(t * 6); // shimmer
  const grey = o => `rgba(32,30,29,${f(o)})`;
  // header half-loaded
  s += html(PX + 50, y + 40, 400, 80, `<div style="${EN(54, C.ink)}letter-spacing:-2px;opacity:.55;filter:blur(1.5px)">Your Café</div>`);
  s += `<rect x="640" y="${y + 58}" width="90" height="26" rx="13" fill="${grey(.08 + .04 * sh)}"/><rect x="750" y="${y + 58}" width="100" height="26" rx="13" fill="${grey(.08 + .04 * sh)}"/>`;
  // hero block (only top half painted)
  s += `<rect x="${PX + 50}" y="${y + 140}" width="${PW - 100}" height="400" rx="30" fill="${grey(.07 + .04 * sh)}"/>`;
  s += `<rect x="${PX + 50}" y="${y + 140}" width="${PW - 100}" height="150" rx="30" fill="${C.peach}" opacity=".45"/>`;
  s += spinner(540, y + 360, t);
  s += lbl('LOADING…', 540, y + 470, 26, C.mute);
  // text + button skeletons
  [[0.8, 0], [0.62, 1], [0.7, 2]].forEach(([w, i]) => s += `<rect x="${PX + 50}" y="${y + 585 + i * 50}" width="${f((PW - 100) * w)}" height="28" rx="14" fill="${grey(.07 + .05 * Math.sin(t * 6 + i))}"/>`);
  s += `<rect x="${BOOK[0] - 230}" y="${BOOK[1] - 55}" width="460" height="110" rx="55" fill="${grey(.08 + .04 * sh)}"/>`;
  s += [0, 1, 2].map(i => `<rect x="${PX + 50 + i * 220}" y="${y + 950}" width="200" height="110" rx="20" fill="${grey(.06)}"/>`).join('');
  return s;
}
function fastPage(t, tap) {
  const y = PY + 146; let s = '';
  s += html(PX + 50, y + 40, 400, 80, `<div style="${EN(54, C.ink)}letter-spacing:-2px">Your Café</div>`);
  s += lbl('MENU', 690, y + 86, 24, C.ink) + lbl('VISIT', 800, y + 86, 24, C.ink);
  s += `<rect x="${PX + 50}" y="${y + 140}" width="${PW - 100}" height="400" rx="30" fill="${C.peach}"/>`;
  s += `<circle cx="760" cy="${y + 250}" r="90" fill="#fff" opacity=".25"/><circle cx="700" cy="${y + 430}" r="50" fill="#fff" opacity=".2"/>`;
  s += html(PX + 90, y + 300, 560, 220, `<div style="${EN(64, '#fff')}letter-spacing:-2px">Fresh coffee,<br/>brunch all day.</div>`);
  s += html(PX + 50, y + 575, 640, 60, `<div style="font-family:Archivo;font-weight:800;font-size:34px;color:${C.mute}">Open today · tables free now</div>`);
  const k = tap > 0 ? 1 - 0.06 * Math.sin(Math.PI * clamp(tap / 0.25)) : 1;
  s += pop(BOOK[0], BOOK[1], k, `<rect x="${BOOK[0] - 230}" y="${BOOK[1] - 55}" width="460" height="110" rx="55" fill="${tap > 0.2 ? G : C.red}"/><text x="${BOOK[0]}" y="${BOOK[1] + 17}" font-family="Archivo" font-weight="900" font-size="46" fill="#fff" text-anchor="middle">${tap > 0.2 ? 'Booked ✓' : 'Book a table'}</text>`);
  s += [0, 1, 2].map(i => `<rect x="${PX + 50 + i * 220}" y="${y + 950}" width="200" height="110" rx="20" fill="#efedeb"/><rect x="${PX + 70 + i * 220}" y="${y + 975}" width="110" height="20" rx="10" fill="${C.ink}" opacity=".5"/>`).join('');
  return s;
}
// thumb: tip at (x,y); body runs down-right
function thumb(x, y, press = 0) {
  const sc = 1 - 0.05 * press;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(-33) scale(${f(sc)})">
  <rect x="-70" y="-14" width="140" height="640" rx="70" fill="#000" opacity=".16" transform="translate(16 26)"/>
  <rect x="-70" y="-14" width="140" height="640" rx="70" fill="#e2a882"/>
  <rect x="-70" y="-14" width="70" height="640" rx="35" fill="#efbd9c" opacity=".6"/>
  <rect x="-46" y="6" width="92" height="120" rx="42" fill="#f7d9c6" stroke="#d99a74" stroke-width="3"/>
  <path d="M-50 200 Q0 222 50 200" stroke="#c98a66" stroke-width="5" fill="none" opacity=".7"/></g>`;
}
const lerp = (a, b, k) => a + (b - a) * k;
// countdown row "3… 2… 1…" — current number bright, rest dim
function countdown(t) {
  const n = t < 1.17 ? 0 : t < 2.33 ? 1 : 2, lt = t - n * 1.167;
  const beat = 1 + 0.12 * Math.exp(-lt * 8);
  let s = `<rect x="300" y="420" width="480" height="104" rx="52" fill="${C.red}"/>`;
  // stopwatch icon
  s += `<circle cx="360" cy="474" r="26" fill="none" stroke="#fff" stroke-width="7"/><rect x="352" y="433" width="16" height="10" rx="3" fill="#fff"/>`;
  s += `<line x1="360" y1="474" x2="${f(360 + 17 * Math.sin(t * 6))}" y2="${f(474 - 17 * Math.cos(t * 6))}" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`;
  ['3…', '2…', '1…'].forEach((d, i) => {
    const on = i === n, op = on ? 1 : i < n ? 0.3 : 0.45, sz = on ? 66 * beat : 54;
    s += `<text x="${470 + i * 115}" y="${f(474 + sz * 0.36)}" font-family="Archivo" font-weight="900" font-size="${f(sz)}" fill="#fff" opacity="${op}" text-anchor="middle">${d}</text>`;
  });
  return s;
}

// ---------- scenes ----------
function hook(t) {
  const k = clamp(t / 3.4), e = k * k * (3 - 2 * k) * 0.55 + k * 0.45; // keeps moving from frame 0
  const tx = lerp(700, BACK[0] + 38, e), ty = lerp(1330, BACK[1] + 46, e);
  const hot = clamp((k - 0.5) / 0.5);
  const shake = hot * 5 * Math.sin(t * 70);
  let s = bg(t, 'paper');
  // red pulse each count
  const lt = (t % 1.167); s += `<rect width="1080" height="1920" fill="${C.red}" opacity="${f(0.10 * Math.exp(-lt * 5))}"/>`;
  // headline: on screen from frame 0, no fade
  s += html(40, 110, 1000, 300, `<div style="${EN(104, C.ink)}letter-spacing:-3px;word-spacing:14px">Your customer is<br/>about to <span style="color:${C.red}">leave.</span></div>`, 'text-align:center;');
  s += countdown(t);
  s += phoneShell(browserBar(t, hot) + slowPage(t), shake, 0);
  // motion trail behind the thumb (so frame 0 reads as moving)
  for (let i = 3; i >= 1; i--) {
    const kk = clamp(k - i * 0.05), ee = kk * kk * (3 - 2 * kk) * 0.55 + kk * 0.45;
    s += `<circle cx="${f(lerp(700, BACK[0] + 38, ee) + 30)}" cy="${f(lerp(1330, BACK[1] + 46, ee) + 30)}" r="${30 - i * 6}" fill="${C.red}" opacity="${f(0.10 * (4 - i))}"/>`;
  }
  s += `<line x1="${f(tx)}" y1="${f(ty)}" x2="${BACK[0]}" y2="${BACK[1]}" stroke="${C.red}" stroke-width="5" stroke-dasharray="14 12" opacity=".4"/>`;
  s += thumb(tx + shake, ty);
  return s;
}
function turn(t) {
  const lt = t - TURN;
  let s = bg(t, 'paper');
  // thumb leaves "back", travels to "Book a table", taps at 4.6
  const m = eo(seg(lt, 0.15, 1.0));
  const r = eo(seg(lt, 1.45, 1.9)); // retract after the tap so "Booked" reads
  const tx = lerp(BACK[0] + 38, BOOK[0] + 40, m) + r * 230, ty = lerp(BACK[1] + 46, BOOK[1] + 20, m) + r * 330;
  const tap = lt - 1.1, press = tap > 0 && tap < 0.25 ? Math.sin(Math.PI * tap / 0.25) : 0;
  s += kinS(110, 'Fast site. | They *stay.*', t, TURN + 0.05, 112, { step: 0.12, acc: G });
  // green tick where the timer was
  s += `<g>${pop(540, 472, eb(seg(lt, 0.05, 0.4)), `<rect x="330" y="420" width="420" height="104" rx="52" fill="${G}"/><path d="M398 474 L420 496 L460 450" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="600" y="494" font-family="Archivo" font-weight="900" font-size="54" fill="#fff" text-anchor="middle">Loaded</text>`)}</g>`;
  s += phoneShell(browserBar(t, -1) + fastPage(t, tap));
  if (tap > 0 && tap < 0.6) s += `<circle cx="${BOOK[0]}" cy="${BOOK[1]}" r="${f(40 + tap * 160)}" fill="none" stroke="${G}" stroke-width="8" opacity="${f(1 - tap / 0.6)}"/>`;
  // big green tick after the tap
  const kt = eb(seg(lt, 1.3, 1.65));
  if (kt > 0) s += pop(800, 1180, kt, `<circle cx="800" cy="1180" r="90" fill="${G}" filter="url(#sh)"/><path d="M758 1182 L788 1212 L846 1150" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
  s += thumb(tx, ty, press);
  // white flash on the cut
  s += `<rect width="1080" height="1920" fill="#fff" opacity="${f(1 - eo(seg(lt, 0, 0.18)))}"/>`;
  return s;
}
function endCard(t) {
  const lt = t - END; let s = bg(t, 'dark');
  const k = eb(seg(lt, 0, 0.4)), spread = (1 - eo(seg(lt, 0.05, 0.5))) * 120;
  s += `<g opacity="${f(eo(seg(lt, 0, 0.2)))}">`;
  s += `<text x="${f(170 + spread)}" y="700" font-family="Archivo" font-weight="900" font-size="150" fill="${C.red}" text-anchor="middle">[</text>`;
  s += `<text x="${f(910 - spread)}" y="700" font-family="Archivo" font-weight="900" font-size="150" fill="${C.peach}" text-anchor="middle">]</text>`;
  s += `<text x="540" y="692" font-family="Archivo" font-weight="900" font-size="${f(118 * k)}" fill="#fff" text-anchor="middle" letter-spacing="-4">BRACKET</text>`;
  s += lbl('SOFTWARE HOUSE · BASED IN KUWAIT', 540, 780, 30, C.peach);
  s += `</g>`;
  s += kinS(930, "We'll *build* it | for you.", t, END + 0.3, 104, { col: '#fff', acc: C.peach, step: 0.1 });
  const kc = eb(seg(lt, 0.8, 1.15));
  s += pop(540, 1330, kc, `<rect x="270" y="1275" width="540" height="110" rx="55" fill="${C.red}"/><text x="540" y="1346" font-family="Archivo" font-weight="900" font-size="50" fill="#fff" text-anchor="middle" letter-spacing="-1">Comment START</text>`);
  s += `<g opacity="${f(eo(seg(lt, 1.0, 1.3)))}">${lbl('WEBSITES · APPS · AI AGENTS · SEO · GEO', 540, 1480, 26, '#8d8782')}</g>`;
  return s;
}
function frame(t) {
  let s = t < TURN ? hook(t) : t < END ? turn(t) : endCard(t);
  // loop: crossfade the last 0.25 s into frame 0
  if (t > DUR - 0.25) s += `<g opacity="${f(eo(seg(t, DUR - 0.25, DUR - 0.02)))}">${hook(0)}</g>`;
  return s;
}
module.exports = { dur: DUR, frame };
