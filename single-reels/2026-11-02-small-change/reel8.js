// "Just a small change" — client asks for a tiny tweak, the page falls apart, brackets test everything
const { C, clamp, seg, eo, eio, eb, lerp, f, txt, line, bracket, bug, check, confetti, sparkle, bubble, endCard } = require('./lib');
const X0 = 240, Y0 = 700, W = 600, H = 640, FLOOR = 1480;
const L = X0 + 46, R = X0 + W - 46, CX = X0 + W / 2;
const END = 10.6;
const chaos = t => eo(seg(t, 2.2, 3.2)) * (1 - eio(seg(t, 8.0, 8.8)));

function page(t) {
  const ch = chaos(t);
  const shake = Math.sin(t * 55) * ch * 5;
  const btnCol = t > 1.7 ? C.gold : C.red;
  const press = t > 1.6 && t < 1.8 ? 0.93 : 1;
  const heroCx = CX, heroCy = Y0 + 215;
  const btnCy = Y0 + 520;
  let s = `<g transform="translate(${f(shake)} 0)">
  <rect x="${X0 + 12}" y="${Y0 + 14}" width="${W}" height="${H}" rx="40" fill="rgba(32,30,29,.18)"/>
  <rect x="${X0}" y="${Y0}" width="${W}" height="${H}" rx="40" fill="#fff" stroke="${C.ink}" stroke-width="8"/>`;
  // header band
  s += `<g transform="translate(0 ${f(ch * 56)}) rotate(${f(ch * -3)} ${CX} ${Y0 + 50})"><path d="M${X0 + 4} ${Y0 + 100} V${Y0 + 44} Q${X0 + 4} ${Y0 + 4} ${X0 + 44} ${Y0 + 4} H${X0 + W - 44} Q${X0 + W - 4} ${Y0 + 4} ${X0 + W - 4} ${Y0 + 44} V${Y0 + 100} Z" fill="${C.ink}"/>
    <circle cx="${L + 8}" cy="${Y0 + 52}" r="10" fill="${C.red}"/><circle cx="${L + 40}" cy="${Y0 + 52}" r="10" fill="${C.gold}"/><circle cx="${L + 72}" cy="${Y0 + 52}" r="10" fill="${C.green}"/></g>`;
  // hero image block
  s += `<g transform="translate(${f(ch * 36)} ${f(ch * 14)}) rotate(${f(ch * 9)} ${heroCx} ${heroCy})"><rect x="${L}" y="${Y0 + 120}" width="${W - 92}" height="190" rx="28" fill="${C.peach}"/><circle cx="${L + 110}" cy="${Y0 + 190}" r="34" fill="#fff" opacity=".7"/><path d="M${L + 190} ${Y0 + 310} L${L + 310} ${Y0 + 200} L${L + 400} ${Y0 + 270} L${L + 440} ${Y0 + 240} L${L + 508} ${Y0 + 310} Z" fill="${C.ink}" opacity=".2"/></g>`;
  // text bars
  s += `<g transform="translate(${f(ch * 80)} 0) rotate(${f(ch * 5)} ${L} ${Y0 + 350})"><rect x="${L}" y="${Y0 + 340}" width="430" height="26" rx="13" fill="#d9d5d1"/></g>`;
  s += `<g transform="translate(${f(ch * -50)} ${f(ch * 12)}) rotate(${f(ch * -4)} ${L} ${Y0 + 400})"><rect x="${L}" y="${Y0 + 390}" width="340" height="26" rx="13" fill="#d9d5d1"/></g>`;
  // button: the "small change" turns it gold, then it falls off the page
  s += `<g transform="translate(${f(ch * 40)} ${f(ch * 310)}) rotate(${f(ch * 20)} ${CX} ${btnCy}) translate(${CX} ${btnCy}) scale(${f(press)}) translate(${-CX} ${-btnCy})"><rect x="${CX - 180}" y="${btnCy - 48}" width="360" height="96" rx="48" fill="${btnCol}"/>${txt('اطلب الآن', CX, btnCy + 16, 46, t > 1.7 ? C.ink : '#fff', { weight: 800 })}</g>`;
  s += '</g>';
  return s;
}

function bugs(t) {
  const spots = [{ x: 700, y: Y0 + 220, a: 2.7, d: 0 }, { x: 400, y: Y0 + 385, a: 3.5, d: 0.2 }, { x: 760, y: Y0 + 90, a: 4.3, d: 0.4 }];
  let s = '';
  spots.forEach((b, i) => {
    if (t < b.a) return;
    const pop = eb(seg(t, b.a, b.a + 0.4));
    const out = eo(seg(t, 7.7 + b.d, 9.2 + b.d));
    if (out >= 1) return;
    const scared = t > 7.6 + b.d;
    s += bug(b.x + out * 650, b.y + Math.sin(t * 4 + i) * 6, t, { s: 0.62 * pop, flip: scared ? 1 : (i % 2 ? 1 : -1), mood: scared ? 'scared' : 'cheeky', crawl: scared ? 1 : 0.3 });
  });
  return s;
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < END + 0.6) {
    s += `<g opacity="${f(1 - seg(t, END, END + 0.6))}">`;
    if (t < 2.4) {
      const o = 1 - seg(t, 2.0, 2.4);
      s += line('Client:', 540, 340, 92, C.red, t, 0.2, { op: o }) + line('“Just a small change.”', 540, 446, 80, C.ink, t, 0.5, { op: o }) + line('تغيير بسيط بس', 540, 548, 70, C.ink, t, 0.9, { op: o });
    } else if (t < 6.2) {
      const o = 1 - seg(t, 5.8, 6.2);
      s += line('5 minutes later…', 540, 340, 96, C.ink, t, 2.5, { op: o }) + line('everything is broken.', 540, 446, 84, C.red, t, 2.9, { op: o }) + line('بعد خمس دقايق… كل شي خربان', 540, 548, 62, C.ink, t, 3.3, { op: o });
    } else {
      s += line('We test the', 540, 340, 96, C.ink, t, 6.3) + line('whole page.', 540, 446, 104, C.red, t, 6.7) + line('نختبر الصفحة كلها', 540, 548, 70, C.ink, t, 7.1);
    }
    const ck = eb(seg(t, 0.1, 0.6));
    s += `<g transform="translate(540 1020) scale(${f(ck)}) translate(-540 -1020)">${page(t)}</g>`;
    // cursor makes the small change
    if (t > 0.9 && t < 2.0) { const k = eio(seg(t, 0.9, 1.55)); s += `<path transform="translate(${f(lerp(860, CX + 60, k))} ${f(lerp(1420, Y0 + 520, k))})" d="M0 0 L0 60 L16 46 L28 72 L40 66 L28 40 L48 40 Z" fill="#fff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>`; }
    if (t > 1.7 && t < 2.2) s += sparkle(CX + 150, Y0 + 480, 30, t, 1);
    s += bugs(t);
    // brackets walk in, stomp, everything restored
    if (t > 5.9) {
      const enter = eo(seg(t, 6.0, 7.4));
      const stomp = t > 7.6 && t < 8.2 ? 1 - Math.sin(seg(t, 7.6, 8.2) * Math.PI) * 0.14 : 1;
      const mood = t < 8.3 ? 'grit' : 'happy';
      s += bracket(lerp(-220, 150, enter), FLOOR, 'L', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: stomp, mood, look: 1, bounce: t > 9.3 ? 1 : 0 });
      s += bracket(lerp(1300, 930, enter), FLOOR, 'R', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: stomp, mood, look: -1, bounce: t > 9.3 ? 1 : 0 });
    }
    if (t > 8.8) {
      s += check(R + 8, Y0 + 52, 28, seg(t, 8.8, 9.2)) + check(R + 8, Y0 + 130, 28, seg(t, 9.0, 9.4)) + check(CX + 196, Y0 + 480, 28, seg(t, 9.2, 9.6));
      s += bubble(540, 1415, 'All tested!', t, 9.0, END) + confetti(540, 1020, 8.9, t, 34) + sparkle(210, 760, 28, t, 1) + sparkle(880, 1300, 26, t, 3);
    }
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + 0.6))}">${endCard(t, END)}</g>`;
  return s;
}
module.exports = { dur: 16.1, frame };
