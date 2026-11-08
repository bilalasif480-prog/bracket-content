// Timeline: Kickoff → Build → Launch
const { C, clamp, seg, eo, eio, eb, f, txt, line, bracket, check, confetti, sparkle, endCard2 } = require('./lib2');
const END = 10.6;
function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/>`;
  if (t < END + .6) {
    s += `<g opacity="${f(1 - seg(t, END, END + .6))}">`;
    s += line('From idea', 540, 300, 100, C.ink, t, 0.1) + line('to live.', 540, 408, 108, C.red, t, 0.4) + line('من الفكرة… للإطلاق', 540, 500, 62, C.ink, t, 0.8);
    const x0 = 200, x1 = 880, y = 1000;
    const prog = eio(seg(t, 1.4, 8.4));
    s += `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#d9d5d1" stroke-width="14" stroke-linecap="round"/><line x1="${x0}" y1="${y}" x2="${f(x0 + (x1 - x0) * prog)}" y2="${y}" stroke="${C.red}" stroke-width="14" stroke-linecap="round"/>`;
    const st = [['KICKOFF', 'البداية', 'Scope + price agreed', 1.8, 'نتفق على الشغل والسعر'], ['BUILD', 'البناء', 'Design, code, test', 4.6, 'تصميم، برمجة، فحص'], ['LAUNCH', 'الإطلاق', 'Live. Handover.', 7.6, 'موقعك شغّال']];
    st.forEach((a, i) => {
      const cx = x0 + (x1 - x0) * i / 2, k = eb(seg(t, a[3], a[3] + .5));
      s += `<g transform="translate(${cx} ${y}) scale(${f(k)})"><circle r="46" fill="${i === 2 ? C.green : C.red}" stroke="${C.ink}" stroke-width="8"/>${txt(String(i + 1), 0, 16, 46, '#fff', { weight: 900 })}</g>`;
      if (k > 0) {
        s += txt(a[0], cx, y - 90, 34, C.ink, { mono: true, weight: 700, op: k });
        s += txt(a[2], cx, y + 130, 30, C.ink, { op: k, weight: 700 });
        s += txt(a[4], cx, y + 180, 30, C.ink, { op: k });
      }
    });
    const bx = x0 + (x1 - x0) * prog;
    s += bracket(bx - 20, 1480, 'L', t, { s: 0.8, mood: t > 8.4 ? 'happy' : 'grit', look: 1, walk: t > 1.4 && t < 8.4 ? 1 : 0, bounce: t > 8.4 ? 1 : 0 });
    s += bracket(bx + 110, 1480, 'R', t, { s: 0.8, mood: t > 8.4 ? 'happy' : 'grit', look: 1, walk: t > 1.4 && t < 8.4 ? 1 : 0, bounce: t > 8.4 ? 1 : 0 });
    if (t > 8.4) s += confetti(x1, y, 8.4, t, 30) + sparkle(820, 760, 30, t, 1) + line('3 steps. No surprises.', 540, 1700, 70, C.red, t, 8.6) + line('٣ خطوات… بدون مفاجآت', 540, 1780, 50, C.ink, t, 9.0);
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + .6))}">${endCard2(t, END, 'Your idea.', 'Live. On time.', 'فكرتك… شغّالة بوقتها')}</g>`;
  return s;
}
module.exports = { dur: END + 3.6, frame };
