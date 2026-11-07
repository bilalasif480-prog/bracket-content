// "Your website has a bug." — a store opened from an Instagram bio link runs inside the app's own browser: logged out, chat button does nothing. Brackets test inside the in-app browser too.
const { C, clamp, seg, eo, eio, eb, lerp, f, txt, line, bracket, bug, check, confetti, sparkle, bubble, endCard } = require('./lib');
const PX = 330, PY = 600, PW = 420, PH = 740, FLOOR = 1480;
const CX = PX + PW / 2, SL = PX + 36, SR = PX + PW - 36;
const END = 11.8;
const OPEN = 1.6;                        // in-app browser slides up
const LINK = { t: 0.8, x: CX, y: PY + 330 };
const WA = { x: SR - 30, y: PY + PH - 92 }; // chat button
const TAPS = [LINK, { t: 3.9, x: WA.x, y: WA.y, hit: false }, { t: 4.9, x: WA.x, y: WA.y, hit: false }, { t: 9.9, x: WA.x, y: WA.y, hit: true }];

function thumb(t) {
  for (const k of TAPS) {
    const p = (t - k.t) / 0.9;
    if (p < -0.05 || p > 1) continue;
    const a = p < 0.35 ? eo(clamp(p / 0.35)) : p < 0.55 ? 1 : 1 - eio(clamp((p - 0.55) / 0.45));
    const x = lerp(820, k.x, a), y = lerp(1600, k.y, a);
    const press = p > 0.33 && p < 0.5 ? 0.94 : 1;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(-22) scale(${f(press)})"><rect x="-46" y="0" width="92" height="560" rx="46" fill="#f2c9a5" stroke="${C.ink}" stroke-width="6"/><ellipse cx="0" cy="34" rx="28" ry="24" fill="#ffe3d2" stroke="${C.ink}" stroke-width="4"/></g>`;
  }
  return '';
}
function ripples(t) {
  let s = '';
  for (const k of TAPS) {
    const p = (t - (k.t + 0.3)) / 0.55;
    if (p < 0 || p > 1) continue;
    const col = k.hit === false ? C.red : C.green;
    s += `<circle cx="${k.x}" cy="${k.y}" r="${f(lerp(14, 70, eo(p)))}" fill="none" stroke="${col}" stroke-width="8" opacity="${f(1 - p)}"/>`;
    if (k.hit === false) s += `<g opacity="${f(1 - p)}"><path d="M${k.x - 14} ${k.y - 88} l28 28 M${k.x + 14} ${k.y - 88} l-28 28" stroke="${C.red}" stroke-width="9" stroke-linecap="round"/></g>`;
  }
  return s;
}
function chatBtn(x, y, col = C.green) {
  return `<circle cx="${x}" cy="${y}" r="40" fill="${col}" stroke="#fff" stroke-width="6"/><path d="M${x - 22} ${y - 15} h44 a8 8 0 0 1 8 8 v20 a8 8 0 0 1 -8 8 h-28 l-12 11 v-11 a8 8 0 0 1 -4 -8 v-20 a8 8 0 0 1 0 0z" fill="#fff"/>`;
}

// generic social profile (no real app branding)
function profile() {
  let s = `<rect x="${PX + 14}" y="${PY + 70}" width="${PW - 28}" height="${PH - 110}" fill="#fff"/>`;
  s += `<circle cx="${SL + 60}" cy="${PY + 170}" r="54" fill="${C.peach}"/><rect x="${SL + 140}" y="${PY + 140}" width="170" height="20" rx="10" fill="${C.ink}"/><rect x="${SL + 140}" y="${PY + 176}" width="120" height="16" rx="8" fill="#d9d5d1"/>`;
  s += `<rect x="${SL}" y="${PY + 250}" width="260" height="16" rx="8" fill="#d9d5d1"/>`;
  s += `<rect x="${SL}" y="${PY + 296}" width="${PW - 72}" height="68" rx="34" fill="${C.paper}" stroke="${C.ink}" stroke-width="4"/>${txt('shop.example', CX, PY + 340, 28, C.ink, { mono: true, weight: 700 })}`;
  for (let i = 0; i < 6; i++) { const c = i % 3, r = Math.floor(i / 3); s += `<rect x="${SL + c * 118}" y="${PY + 400 + r * 118}" width="110" height="110" rx="10" fill="${i % 2 ? C.peach : '#e8e5e2'}" opacity=".8"/>`; }
  return s;
}
// store inside the in-app browser
function store(t) {
  const y0 = PY + 70;
  let s = `<rect x="${PX + 14}" y="${y0}" width="${PW - 28}" height="${PH - 110}" fill="#fff"/>`;
  // in-app browser bar: close x + domain
  s += `<rect x="${PX + 14}" y="${y0}" width="${PW - 28}" height="70" fill="#ece9e6"/><path d="M${SL + 4} ${y0 + 24} l22 22 m0 -22 l-22 22" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>${txt('shop.example', CX + 10, y0 + 46, 26, C.ink, { mono: true })}<circle cx="${SR - 10}" cy="${y0 + 35}" r="5" fill="${C.ink}"/><circle cx="${SR - 26}" cy="${y0 + 35}" r="5" fill="${C.ink}"/><circle cx="${SR + 6}" cy="${y0 + 35}" r="5" fill="${C.ink}"/>`;
  // product
  s += `<rect x="${SL}" y="${y0 + 96}" width="${PW - 72}" height="230" rx="24" fill="${C.peach}" opacity=".6"/><circle cx="${CX}" cy="${y0 + 210}" r="60" fill="#fff" opacity=".8"/>`;
  s += txt('عباية سوداء', SR, y0 + 380, 34, C.ink, { anchor: 'end', weight: 800 });
  s += `<rect x="${SL}" y="${y0 + 400}" width="200" height="16" rx="8" fill="#d9d5d1"/>`;
  s += `<rect x="${SL}" y="${y0 + 440}" width="${PW - 72}" height="76" rx="38" fill="${C.red}"/>${txt('اشتري الحين', CX, y0 + 490, 34, '#fff', { weight: 800 })}`;
  s += chatBtn(WA.x, WA.y);
  // logged-out toast
  if (t > 5.9 && t < 9.4) { const k = eb(seg(t, 5.9, 6.4)), o = 1 - seg(t, 8.9, 9.4); s += `<g transform="translate(0 ${f((1 - k) * -80)})" opacity="${f(o)}"><rect x="${SL}" y="${y0 + 84}" width="${PW - 72}" height="64" rx="18" fill="${C.ink}"/>${txt('سجّل دخولك مرة ثانية', CX, y0 + 126, 28, '#fff', { weight: 800 })}</g>`; }
  // chat opened (fixed)
  if (t > 10.3) {
    const k = eb(seg(t, 10.3, 10.8));
    s += `<g transform="translate(${CX} ${y0 + 300}) scale(${f(k)}) translate(${-CX} ${-(y0 + 300)})"><rect x="${SL + 10}" y="${y0 + 190}" width="${PW - 92}" height="220" rx="30" fill="#fff" stroke="${C.ink}" stroke-width="5"/><circle cx="${CX}" cy="${y0 + 270}" r="52" fill="${C.green}"/><path d="M${CX - 24} ${y0 + 272} L${CX - 6} ${y0 + 290} L${CX + 28} ${y0 + 252}" stroke="#fff" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${txt('المحادثة فتحت', CX, y0 + 375, 32, C.ink, { weight: 800 })}</g>`;
  }
  return s;
}
function screen(t) {
  let s = `<clipPath id="scr"><rect x="${PX + 14}" y="${PY + 70}" width="${PW - 28}" height="${PH - 110}" rx="26"/></clipPath><g clip-path="url(#scr)">`;
  s += profile();
  if (t > OPEN) { const k = eo(seg(t, OPEN, OPEN + 0.5)); s += `<g transform="translate(0 ${f((1 - k) * PH)})">${store(t)}</g>`; }
  return s + '</g>';
}
function phone(t) {
  return `<rect x="${PX + 12}" y="${PY + 14}" width="${PW}" height="${PH}" rx="64" fill="rgba(32,30,29,.18)"/>
  <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="64" fill="#fff" stroke="${C.ink}" stroke-width="10"/>
  <rect x="${CX - 56}" y="${PY + 22}" width="112" height="22" rx="11" fill="${C.ink}"/>${screen(t)}`;
}
function chips(t) {
  const rows = [['Safari', 780, 8.6], ['Chrome', 870, 8.95], ['In-app', 960, 9.3]];
  let s = '';
  rows.forEach(r => {
    const k = eb(seg(t, r[2] - 0.15, r[2] + 0.2)); if (k <= 0) return;
    s += `<g transform="translate(150 ${r[1]}) scale(${f(k)}) translate(-150 -${r[1]})"><rect x="40" y="${r[1] - 34}" width="210" height="68" rx="34" fill="#fff" stroke="${C.ink}" stroke-width="5"/>${txt(r[0], 145, r[1] + 11, 30, C.ink, { mono: true })}</g>`;
    s += check(282, r[1], 28, seg(t, r[2] + 0.1, r[2] + 0.45));
  });
  return s;
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < END + 0.6) {
    s += `<g opacity="${f(1 - seg(t, END, END + 0.6))}">`;
    if (t < 3.5) {
      const o = 1 - seg(t, 3.1, 3.5);
      s += line('Your website', 540, 290, 104, C.ink, t, 0.0, { op: o }) + line('has a bug.', 540, 396, 108, C.red, t, 0.3, { op: o }) + line('موقعك فيه خلل', 540, 492, 68, C.ink, t, 0.7, { op: o });
    } else if (t < 7.9) {
      const o = 1 - seg(t, 7.5, 7.9);
      s += line('Opened from', 540, 290, 100, C.ink, t, 3.6, { op: o }) + line('Instagram?', 540, 396, 108, C.red, t, 3.9, { op: o }) + line('فتحته من إنستقرام؟', 540, 492, 68, C.ink, t, 4.3, { op: o });
    } else {
      s += line('We test it', 540, 290, 104, C.ink, t, 8.0) + line('in there too.', 540, 396, 104, C.red, t, 8.3) + line('نختبره داخل إنستقرام بعد', 540, 492, 64, C.ink, t, 8.7);
    }
    s += `<g transform="translate(540 970) scale(${f(eb(seg(t, 0.05, 0.5)))}) translate(-540 -970)">${phone(t)}</g>`;
    // bug sits on the chat button, flees when brackets arrive
    if (t > OPEN + 0.6 && t < 9.6) {
      const pop = eb(seg(t, OPEN + 0.6, OPEN + 1.0)), flee = eo(seg(t, 8.0, 9.4));
      s += bug(lerp(WA.x - 120, 1320, flee), WA.y + 6 - Math.abs(Math.sin(t * 6)) * (t < 8 ? 6 : 0), t, { s: 0.42 * pop, flip: 1, mood: t < 8 ? 'cheeky' : 'scared', crawl: t < 8 ? 0.3 : 1 });
    }
    s += thumb(t) + ripples(t);
    if (t > 6.6) {
      const enter = eo(seg(t, 6.7, 8.0));
      const hap = t > 9.4;
      s += bracket(lerp(-220, 130, enter), FLOOR, 'L', t, { s: 0.85, walk: enter < 1 ? 1 : 0, mood: hap ? 'happy' : 'grit', look: 1, bounce: t > 10.6 ? 1 : 0 });
      s += bracket(lerp(1300, 950, enter), FLOOR, 'R', t, { s: 0.85, walk: enter < 1 ? 1 : 0, mood: hap ? 'happy' : 'grit', look: -1, bounce: t > 10.6 ? 1 : 0 });
    }
    s += chips(t);
    if (t > 10.6) s += bubble(540, 1420, 'Chat opens!', t, 10.6, END) + confetti(CX, PY + 360, 10.6, t, 30) + sparkle(200, 680, 28, t, 1) + sparkle(890, 1290, 26, t, 3);
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + 0.6))}">${endCard(t, END)}</g>`;
  return s;
}
module.exports = { dur: 16.0, frame };
