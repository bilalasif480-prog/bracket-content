// "Screen by screen" — the brackets build a mobile app flow (login, list, order), then test it
const { C, clamp, seg, eo, eio, eb, lerp, f, txt, line, bracket, check, confetti, sparkle, bubble, endCard } = require('./lib');
const PX = 340, PY = 600, PW = 400, PH = 700, FLOOR = 1480;
const CX = PX + PW / 2, SL = PX + 36, SR = PX + PW - 36;
const HK = JSON.parse(process.env.HOOK);
const END = 10.8;
const drop = (t, a) => { const k = seg(t, a, a + 0.5); return { dy: (1 - eb(k)) * -240, on: t >= a }; };
const pulses = [0.8, 1.3, 1.8, 2.3, 4.0, 4.4, 4.8, 6.2];
const sq = t => pulses.some(a => t > a + 0.4 && t < a + 0.7) ? 0.9 : 1;

function screens(t) {
  // screen offset: 0 = login, -1 = list, -2 = confirm (each 400 wide)
  const off = -(eio(seg(t, 3.6, 4.2)) + eio(seg(t, 5.9, 6.5))) * PW;
  let s = `<clipPath id="scr"><rect x="${PX + 14}" y="${PY + 70}" width="${PW - 28}" height="${PH - 110}" rx="26"/></clipPath><g clip-path="url(#scr)"><g transform="translate(${f(off)} 0)">`;
  // screen 1: login
  let d = drop(t, 0.8);
  if (d.on) s += `<g transform="translate(0 ${f(d.dy)})"><circle cx="${CX}" cy="${PY + 190}" r="48" fill="${C.red}"/>${txt('[ ]', CX, PY + 208, 54, '#fff', { mono: true })}</g>`;
  d = drop(t, 1.3);
  if (d.on) s += `<g transform="translate(0 ${f(d.dy)})"><rect x="${SL}" y="${PY + 280}" width="${PW - 72}" height="62" rx="16" fill="${C.paper}" stroke="#d9d5d1" stroke-width="3"/>${txt('الجوال', SR - 14, PY + 322, 30, C.mute, { anchor: 'end' })}</g>`;
  d = drop(t, 1.8);
  if (d.on) s += `<g transform="translate(0 ${f(d.dy)})"><rect x="${SL}" y="${PY + 362}" width="${PW - 72}" height="62" rx="16" fill="${C.paper}" stroke="#d9d5d1" stroke-width="3"/>${txt('الرقم السري', SR - 14, PY + 404, 30, C.mute, { anchor: 'end' })}</g>`;
  d = drop(t, 2.3);
  if (d.on) s += `<g transform="translate(0 ${f(d.dy)})"><rect x="${SL}" y="${PY + 460}" width="${PW - 72}" height="76" rx="38" fill="${C.red}"/>${txt('تسجيل الدخول', CX, PY + 508, 34, '#fff', { weight: 800 })}</g>`;
  // screen 2: list of items
  [4.0, 4.4, 4.8].forEach((a, i) => {
    const e = drop(t, a);
    if (e.on) { const y = PY + 120 + i * 130; s += `<g transform="translate(${PW} ${f(e.dy)})"><rect x="${SL}" y="${y}" width="${PW - 72}" height="112" rx="22" fill="#fff" stroke="#d9d5d1" stroke-width="3"/><rect x="${SL + 14}" y="${y + 14}" width="84" height="84" rx="16" fill="${i === 1 ? C.red : C.peach}"/><rect x="${SL + 116}" y="${y + 30}" width="130" height="18" rx="9" fill="#d9d5d1"/><rect x="${SL + 116}" y="${y + 62}" width="84" height="16" rx="8" fill="#e8e5e2"/></g>`; }
  });
  // screen 3: order confirmed
  const e3 = drop(t, 6.2);
  if (e3.on) s += `<g transform="translate(${PW * 2} ${f(e3.dy)})"><circle cx="${CX}" cy="${PY + 280}" r="84" fill="${C.green}"/><path d="M${CX - 38} ${PY + 282} L${CX - 8} ${PY + 312} L${CX + 44} ${PY + 252}" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${txt('تم الطلب', CX, PY + 440, 52, C.ink, { weight: 800 })}</g>`;
  s += '</g></g>';
  return s;
}
function phone(t) {
  return `<rect x="${PX + 12}" y="${PY + 14}" width="${PW}" height="${PH}" rx="64" fill="rgba(32,30,29,.18)"/>
  <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="64" fill="#fff" stroke="${C.ink}" stroke-width="10"/>
  <rect x="${CX - 56}" y="${PY + 22}" width="112" height="22" rx="11" fill="${C.ink}"/>${screens(t)}`;
}
function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < END + 0.6) {
    s += `<g opacity="${f(1 - seg(t, END, END + 0.6))}">`;
    if (t < 3.4) { const o = 1 - seg(t, 3.0, 3.4); s += line(HK[0], 540, 290, HK[0].length > 13 ? 92 : 104, C.ink, t, 0.2, { op: o }) + line(HK[1], 540, 396, HK[1].length > 16 ? 84 : (HK[1].length > 13 ? 94 : 104), C.red, t, 0.5, { op: o }) + line(HK[2], 540, 492, HK[2].length > 24 ? 56 : 64, C.ink, t, 0.9, { op: o }); }
    else if (t < 6.8) { const o = 1 - seg(t, 6.4, 6.8); s += line('Screen by screen.', 540, 330, 96, C.ink, t, 3.5, { op: o }) + line('شاشة شاشة', 540, 440, 70, C.ink, t, 4.0, { op: o }); }
    else { s += line('Then we', 540, 290, 96, C.ink, t, 6.9) + line('test it.', 540, 396, 108, C.red, t, 7.3) + line('وبعدين نختبره', 540, 490, 68, C.ink, t, 7.7); }
    s += `<g transform="translate(540 950) scale(${f(eb(seg(t, 0.1, 0.6)))}) translate(-540 -950)">${phone(t)}</g>`;
    const hap = t > 8.0, q = sq(t);
    s += bracket(130, FLOOR, 'L', t, { s: 0.85, squash: q, mood: hap ? 'happy' : 'grit', look: 1, bounce: t > 8.6 ? 1 : 0 });
    s += bracket(950, FLOOR, 'R', t, { s: 0.85, squash: q, mood: hap ? 'happy' : 'grit', look: -1, bounce: t > 8.6 ? 1 : 0 });
    if (t > 7.6) s += check(PX + PW - 20, PY + 90, 28, seg(t, 7.6, 8.0)) + check(PX + 40, PY + 330, 28, seg(t, 7.9, 8.3)) + check(PX + PW - 40, PY + 560, 28, seg(t, 8.2, 8.6));
    if (t > 8.6) s += bubble(540, 1415, 'App ready!', t, 8.6, END) + confetti(CX, PY + 300, 8.6, t, 34) + sparkle(200, 740, 28, t, 1) + sparkle(880, 1300, 26, t, 3);
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + 0.6))}">${endCard(t, END)}</g>`;
  return s;
}
module.exports = { dur: 14.0, frame };
