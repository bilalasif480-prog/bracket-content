// "Same page. Arabic broke it." — English page switched to Arabic keeps the left-to-right layout and breaks; brackets rebuild it right-to-left and test both languages
const { C, clamp, seg, eo, eio, eb, lerp, f, txt, line, bracket, bug, check, confetti, sparkle, bubble, endCard } = require('./lib');
const X0 = 160, Y0 = 620, W = 760, H = 580, FLOOR = 1480;
const L = X0 + 50, R = X0 + W - 50, CX = X0 + W / 2;
const HK = JSON.parse(process.env.HOOK);
const END = 11.4;
const AR = 1.3;              // language switch
const FIX0 = 7.9, FIX1 = 9.1; // mirror animation
const mir = t => eio(seg(t, FIX0, FIX1));
// x of an element of width w whose left edge is at lx in LTR, mirrored inside the page in RTL
const mx = (t, lx, w) => lerp(lx, X0 + W - (lx - X0) - w, mir(t));

function arrow(x, y, dir, col = '#fff') { // dir 1 = right, -1 = left
  return `<path d="M${x - 16 * dir} ${y} H${x + 14 * dir} M${x + 2 * dir} ${y - 13} L${x + 15 * dir} ${y} L${x + 2 * dir} ${y + 13}" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function warn(x, y, k) {
  if (k <= 0) return '';
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(eb(k))})"><circle r="30" fill="${C.red}"/>${txt('!', 0, 15, 44, '#fff')}</g>`;
}

function page(t) {
  const ar = t >= AR, m = mir(t), fixed = t >= FIX1;
  const flash = t > AR && t < AR + 0.25 ? 1 - seg(t, AR, AR + 0.25) : 0;
  let s = `<rect x="${X0 + 12}" y="${Y0 + 14}" width="${W}" height="${H}" rx="40" fill="rgba(32,30,29,.18)"/>
  <rect x="${X0}" y="${Y0}" width="${W}" height="${H}" rx="40" fill="#fff" stroke="${C.ink}" stroke-width="8"/>`;
  // top bar
  s += `<path d="M${X0 + 4} ${Y0 + 96} V${Y0 + 44} Q${X0 + 4} ${Y0 + 4} ${X0 + 44} ${Y0 + 4} H${X0 + W - 44} Q${X0 + W - 4} ${Y0 + 4} ${X0 + W - 4} ${Y0 + 44} V${Y0 + 96} Z" fill="${C.ink}"/>`;
  const logoX = mx(t, L, 54);
  s += `<rect x="${f(logoX)}" y="${Y0 + 24}" width="54" height="54" rx="14" fill="${C.peach}"/>`;
  [0, 1, 2].forEach(i => { const nx = mx(t, R - 300 + i * 104, 84); s += `<rect x="${f(nx)}" y="${Y0 + 42}" width="84" height="18" rx="9" fill="#fff" opacity=".7"/>`; });
  // language pill
  const pillX = mx(t, L + 76, 96);
  s += `<rect x="${f(pillX)}" y="${Y0 + 30}" width="96" height="42" rx="21" fill="${ar ? C.red : '#3a3735'}"/>${txt(ar ? 'ع' : 'EN', pillX + 48, Y0 + 62, ar ? 30 : 26, '#fff', { mono: !ar, weight: 800 })}`;
  // image block (right in LTR, left in RTL)
  const imgX = mx(t, R - 250, 250);
  s += `<rect x="${f(imgX)}" y="${Y0 + 130}" width="250" height="250" rx="30" fill="${C.peach}" opacity=".6"/><circle cx="${f(imgX + 125)}" cy="${Y0 + 240}" r="56" fill="#fff" opacity=".8"/><rect x="${f(imgX + 95)}" y="${Y0 + 300}" width="60" height="14" rx="7" fill="#fff" opacity=".8"/>`;
  // headline
  if (!ar) {
    s += txt('Fresh coffee,', L, Y0 + 190, 54, C.ink, { anchor: 'start', ls: -1 }) + txt('delivered.', L, Y0 + 250, 54, C.ink, { anchor: 'start', ls: -1 });
  } else if (!fixed) {
    // broken: Arabic stuck to the left edge, second line runs into the image
    const o = m > 0 ? 1 - seg(t, FIX0, FIX0 + 0.4) : 1;
    s += `<g opacity="${f(o)}">` + txt('قهوة طازجة', L, Y0 + 195, 54, C.ink, { anchor: 'start' }) + txt('توصلك لين باب البيت', L, Y0 + 262, 54, C.ink, { anchor: 'start' }) + '</g>';
  }
  if (ar && t > FIX0 + 0.3) {
    const o = seg(t, FIX0 + 0.3, FIX1);
    s += `<g opacity="${f(o)}">` + txt('قهوة طازجة', R, Y0 + 195, 54, C.ink, { anchor: 'end' }) + txt('توصلك البيت', R, Y0 + 262, 54, C.ink, { anchor: 'end' }) + '</g>';
  }
  // body lines
  [[300, 300], [338, 230]].forEach(([y, w]) => { s += `<rect x="${f(mx(t, L, w))}" y="${Y0 + y}" width="${w}" height="18" rx="9" fill="#d9d5d1"/>`; });
  // button with arrow
  const bw = 300, bx = mx(t, L, bw), by = Y0 + 430;
  s += `<rect x="${f(bx)}" y="${by}" width="${bw}" height="86" rx="43" fill="${fixed ? C.green : C.red}"/>`;
  if (!ar) s += txt('Order now', bx + 128, by + 56, 38, '#fff', { weight: 800, ls: 0 }) + arrow(bx + 252, by + 43, 1);
  else if (!fixed) s += txt('اطلب الحين', bx + 124, by + 56, 38, '#fff', { weight: 800 }) + arrow(bx + 252, by + 43, 1);
  else s += txt('اطلب الحين', bx + 176, by + 56, 38, '#fff', { weight: 800 }) + arrow(bx + 48, by + 43, -1);
  if (flash > 0) s += `<rect x="${X0}" y="${Y0}" width="${W}" height="${H}" rx="40" fill="#fff" opacity="${f(flash)}"/>`;
  return s;
}

function frame(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><rect x="0" y="${FLOOR + 6}" width="1080" height="10" fill="${C.ink}" opacity=".08"/>`;
  if (t < END + 0.6) {
    s += `<g opacity="${f(1 - seg(t, END, END + 0.6))}">`;
    if (t < 3.6) {
      const o = 1 - seg(t, 3.2, 3.6);
      s += line(HK[0], 540, 290, HK[0].length > 13 ? 92 : 104, C.ink, t, 0.2, { op: o }) + line(HK[1], 540, 396, HK[1].length > 16 ? 84 : (HK[1].length > 13 ? 94 : 104), C.red, t, 0.5, { op: o }) + line(HK[2], 540, 492, HK[2].length > 24 ? 56 : 64, C.ink, t, 0.9, { op: o });
    } else if (t < 7.6) {
      const o = 1 - seg(t, 7.2, 7.6);
      s += line('English layout.', 540, 290, 100, C.ink, t, 3.7, { op: o }) + line('Arabic words.', 540, 396, 100, C.red, t, 4.0, { op: o }) + line('تصميم إنجليزي… وكلام عربي', 540, 492, 64, C.ink, t, 4.4, { op: o });
    } else {
      s += line('We build it', 540, 290, 104, C.ink, t, 7.7) + line('right to left.', 540, 396, 104, C.red, t, 8.0) + line('نبنيها من اليمين لليسار', 540, 492, 64, C.ink, t, 8.4);
    }
    s += `<g transform="translate(540 910) scale(${f(eb(seg(t, 0.05, 0.5)))}) translate(-540 -910)">${page(t)}</g>`;
    // problem markers while broken
    if (t > 2.0 && t < FIX0 + 0.2) {
      const o = 1 - seg(t, FIX0 - 0.2, FIX0 + 0.2);
      s += `<g opacity="${f(o)}">${warn(X0 + W - 40, Y0 + 230, seg(t, 2.0, 2.3))}${warn(L + 330, Y0 + 473, seg(t, 2.5, 2.8))}${warn(X0 - 4, Y0 + 230, seg(t, 3.0, 3.3))}</g>`;
    }
    // bug: lands on the page after the switch, flees when the brackets fix it
    if (t > AR + 0.3 && t < FIX1) {
      const pop = eb(seg(t, AR + 0.3, AR + 0.7)), flee = eo(seg(t, 7.4, 8.6));
      s += bug(lerp(700, 1320, flee), Y0 + H + 4 - Math.abs(Math.sin(t * 6)) * (t < 7.4 ? 8 : 0), t, { s: 0.6 * pop, flip: flee > 0 ? 1 : -1, mood: t < 7.4 ? 'cheeky' : 'scared', crawl: t < 7.4 ? 0.3 : 1, rot: -8 });
    }
    // brackets walk in and push the page into shape
    if (t > 5.4) {
      const enter = eo(seg(t, 5.5, 6.9));
      const push = t > FIX0 && t < FIX1 ? 1 - Math.sin(seg(t, FIX0, FIX1) * Math.PI * 2) * 0.1 : 1;
      const hap = t > FIX1;
      s += bracket(lerp(-220, 130, enter), FLOOR, 'L', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: push, mood: hap ? 'happy' : 'grit', look: 1, bounce: t > 10.2 ? 1 : 0 });
      s += bracket(lerp(1300, 950, enter), FLOOR, 'R', t, { s: 0.85, walk: enter < 1 ? 1 : 0, squash: push, mood: hap ? 'happy' : 'grit', look: -1, bounce: t > 10.2 ? 1 : 0 });
    }
    // test both languages
    const chip = (x, lbl, a, mono) => {
      const k = eb(seg(t, a - 0.15, a + 0.2)); if (k <= 0) return '';
      return `<g transform="translate(${x} 1300) scale(${f(k)}) translate(${-x} -1300)"><rect x="${x - 100}" y="1266" width="170" height="68" rx="34" fill="#fff" stroke="${C.ink}" stroke-width="5"/>${txt(lbl, x - 15, 1312, mono ? 32 : 36, C.ink, { mono, weight: 800 })}</g>` + check(x + 104, 1300, 30, seg(t, a + 0.1, a + 0.45));
    };
    s += chip(400, 'EN', 9.4, true) + chip(660, 'عربي', 9.8, false);
    if (t > 10.2) s += bubble(540, 1420, 'Both languages work!', t, 10.2, END) + confetti(CX, Y0 + 300, 10.2, t, 34) + sparkle(200, 700, 28, t, 1) + sparkle(890, 1260, 26, t, 3);
    s += '</g>';
  }
  if (t >= END) s += `<g opacity="${f(seg(t, END, END + 0.6))}">${endCard(t, END)}</g>`;
  return s;
}
module.exports = { dur: 15.6, frame };
