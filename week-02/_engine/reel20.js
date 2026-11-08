// "Same business. Two websites." — before/after wipe
const { C, clamp, seg, eo, eio, eb, lerp, f, txt, line, bracket, check, confetti, sparkle, endCard2, browser } = require('./lib2');
const X = 110, Y = 640, W = 860, H = 700, FLOOR = 1480, END = 9.4;
const WIPE0 = 3.2, WIPE1 = 4.6;
function before() {
  let s = '';
  const cols = [C.red, C.gold, '#6a8cff', C.peach, C.green, '#b45cff'];
  for (let i = 0; i < 9; i++) { const bx = X + 24 + (i % 3) * 270 + (i % 2) * 8, by = Y + 90 + Math.floor(i / 3) * 170 + (i % 3) * 6; s += `<rect x="${bx}" y="${by}" width="${230 - (i % 4) * 14}" height="${130 - (i % 3) * 10}" rx="${4 + i % 3 * 6}" fill="${cols[i % 6]}" opacity=".85"/>`; s += `<rect x="${bx + 10}" y="${by + 14}" width="${70 + i * 7}" height="9" rx="4" fill="#fff"/><rect x="${bx + 10}" y="${by + 34}" width="${44}" height="7" rx="3" fill="#fff" opacity=".8"/>`; }
  s += `<rect x="${X + 560}" y="${Y + 420}" width="60" height="26" rx="6" fill="${C.red}"/><rect x="${X + 380}" y="${Y + 600}" width="120" height="30" rx="4" fill="#bbb"/>`;
  s += `<g transform="rotate(-6 ${X + 640} ${Y + 300})"><rect x="${X + 520}" y="${Y + 250}" width="260" height="110" rx="10" fill="#fff" stroke="${C.red}" stroke-width="5"/>${txt('!  WARNING', X + 650, Y + 315, 34, C.red, { mono: true, weight: 700 })}</g>`;
  return s;
}
function after() {
  let s = `<rect x="${X + 40}" y="${Y + 100}" width="400" height="30" rx="15" fill="${C.ink}"/><rect x="${X + 40}" y="${Y + 150}" width="300" height="22" rx="11" fill="#d9d5d1"/>`;
  s += `<rect x="${X + 40}" y="${Y + 210}" width="260" height="84" rx="42" fill="${C.red}"/>${txt('Order', X + 170, Y + 264, 36, '#fff', { weight: 800 })}`;
  s += `<rect x="${X + 500}" y="${Y + 100}" width="320" height="200" rx="26" fill="${C.peach}"/>`;
  for (let i = 0; i < 3; i++) { const bx = X + 40 + i * 270; s += `<rect x="${bx}" y="${Y + 360}" width="240" height="250" rx="22" fill="#fff" stroke="#d9d5d1" stroke-width="4"/><rect x="${bx + 20}" y="${Y + 380}" width="200" height="130" rx="14" fill="${i === 1 ? C.red : C.peach}" opacity="${i === 1 ? 1 : .8}"/><rect x="${bx + 20}" y="${Y + 535}" width="130" height="16" rx="8" fill="#d9d5d1"/><rect x="${bx + 20}" y="${Y + 565}" width="80" height="14" rx="7" fill="#e8e5e2"/>`; }
  return s;
}
function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < END + 0.6) {
    s += `<g opacity="${f(1 - seg(t, END, END + 0.6))}">`;
    if (t < 3.0) { const o = 1 - seg(t, 2.6, 3.0); s += line('Same business.', 540, 290, 100, C.ink, t, 0.2, { op: o }) + line('Two websites.', 540, 396, 108, C.red, t, 0.5, { op: o }) + line('نفس النشاط… موقعين', 540, 490, 66, C.ink, t, 0.9, { op: o }); }
    else if (t < 6.0) { const o = 1 - seg(t, 5.6, 6.0); s += line('One was rushed.', 540, 300, 100, C.ink, t, 3.1, { op: o }) + line('One was planned.', 540, 406, 100, C.red, t, 4.4, { op: o }) + line('وحد استعجلوا فيه… ووحد خططوا له', 540, 500, 56, C.ink, t, 4.7, { op: o }); }
    else { s += line('Which one would', 540, 300, 100, C.ink, t, 6.1) + line('you trust?', 540, 406, 112, C.red, t, 6.4) + line('أي واحد تثق فيه؟', 540, 500, 66, C.ink, t, 6.8); }
    // browser
    const pop = eb(seg(t, 0.1, 0.6));
    const wp = eio(seg(t, WIPE0, WIPE1)), wx = X + wp * W;
    let inner = `<clipPath id="bw"><rect x="${X}" y="${Y + 64}" width="${W}" height="${H - 64}" rx="26"/></clipPath><g clip-path="url(#bw)"><rect x="${X}" y="${Y + 64}" width="${W}" height="${H - 64}" fill="#fff"/>`;
    inner += `<g transform="translate(${f(Math.sin(t * 40) * (t < WIPE0 ? 1.6 : 0))} 0)">${before()}</g>`;
    inner += `<clipPath id="aw"><rect x="${X}" y="${Y + 64}" width="${f(wp * W)}" height="${H - 64}"/></clipPath><g clip-path="url(#aw)"><rect x="${X}" y="${Y + 64}" width="${W}" height="${H - 64}" fill="#fff"/>${after()}</g>`;
    if (wp > 0 && wp < 1) inner += `<rect x="${f(wx - 5)}" y="${Y + 64}" width="10" height="${H - 64}" fill="${C.red}"/><circle cx="${f(wx)}" cy="${Y + 64 + (H - 64) / 2}" r="28" fill="${C.red}"/>${txt('↔', wx, Y + 64 + (H - 64) / 2 + 14, 40, '#fff', { weight: 800 })}`;
    inner += '</g>';
    s += `<g transform="translate(540 990) scale(${f(pop)}) translate(-540 -990)">${browser(X, Y, W, H, inner)}`;
    s += `<g opacity="${f(1 - wp)}"><rect x="${X + 30}" y="${Y + 76}" width="170" height="48" rx="24" fill="${C.red}"/>${txt('BEFORE', X + 115, Y + 111, 28, '#fff', { mono: true, weight: 700 })}</g>`;
    s += `<g opacity="${f(wp)}"><rect x="${X + W - 200}" y="${Y + 76}" width="170" height="48" rx="24" fill="${C.green}"/>${txt('AFTER', X + W - 115, Y + 111, 28, '#fff', { mono: true, weight: 700 })}</g></g>`;
    if (t > 5.0) s += check(X + W - 60, Y + H - 60, 34, seg(t, 5.0, 5.4));
    const hap = t > WIPE1;
    s += bracket(130, FLOOR, 'L', t, { s: 0.85, mood: hap ? 'happy' : 'grit', look: 1, bounce: t > 6.4 ? 1 : 0 });
    s += bracket(950, FLOOR, 'R', t, { s: 0.85, mood: hap ? 'happy' : 'grit', look: -1, bounce: t > 6.4 ? 1 : 0 });
    if (t > 4.7) s += confetti(X + W / 2, Y + 200, 4.7, t, 26) + sparkle(210, 700, 28, t, 1) + sparkle(880, 1400, 26, t, 3);
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + 0.6))}">${endCard2(t, END, 'Build it once.', 'Build it right.', 'نبنيه مرة وحدة… صح')}</g>`;
  return s;
}
module.exports = { dur: END + 3.6, frame };
