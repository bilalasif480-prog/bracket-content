// R09 (Sat 5 Dec 22:00): "Building a website for a Manchester barber (demo)." Hooks-bank #7 Satisfying build
// (build-reel idea from single-reels/2026-11-02-build-block-by-block). Template: colour-block canvas, blocks snapping in.
// Problem: "Do I need a website for my small business?" / no or weak website (sheet top 5 #4). Facts: "we write the text", checked on real phones.
const K = require('./kit4');
const { C, seg, eo, eb, f, lerp, big, ui, mono, phone, finger, ripple, tick, chip, hook } = K;
const DUR = 14, END = 12.2;
const STEPS = [[-0.6, 'Header'], [-0.12, 'Photo'], [0.7, 'Your words, written for you'], [2.1, 'Booking button'], [2.9, 'Services'], [3.8, 'Map + hours'], [4.7, 'Google reviews link'], [5.6, 'WhatsApp button'], [7.2, 'Checked on a phone']];
const at = i => STEPS[i][0];
const pop = (t, i) => eb(seg(t, at(i), at(i) + .35));

// page at 800 x 880 local
function page(t) {
  let s = `<rect width="800" height="880" rx="24" fill="#fbf7f2"/>`;
  const slots = [[0, 0, 0, 800, 84], [1, 24, 104, 752, 300], [2, 36, 430, 600, 100], [3, 36, 546, 270, 76], [4, 330, 546, 434, 76], [5, 24, 646, 370, 210], [6, 414, 646, 362, 100], [7, 672, 752, 96, 96]];
  slots.forEach(([i, x, y, w, h]) => { if (t < at(i) + .3) s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="none" stroke="${C.red}" stroke-width="3" stroke-dasharray="12 10" stroke-dashoffset="${f(-t * 60)}" opacity=".55"/>`; });
  const blk = (i, inner, cx, cy) => { const k = pop(t, i); if (k <= 0) return ''; const dx = 700 * (1 - eo(seg(t, at(i), at(i) + .35))) * (i % 2 ? 1 : -1); return `<g transform="translate(${f(cx + dx)} ${cy}) scale(${f(Math.max(k, .01))}) translate(${-cx} ${-cy})">${inner}</g>`; };
  s += blk(0, `<rect x="0" y="0" width="800" height="84" rx="24" fill="${C.ink}"/><rect x="0" y="40" width="800" height="44" fill="${C.ink}"/>${big('ANCOATS CUTS', 36, 56, 32, '#fff', { a: 'start', ls: -.5 })}${ui('Services   Find us   Book', 764, 54, 20, '#d8d2cc', { a: 'end', w: 600 })}`, 400, 42);
  // hero photo with barber pole
  s += blk(1, `<rect x="24" y="104" width="752" height="300" rx="20" fill="#3a2f2a"/><g transform="translate(640 140)"><rect x="-26" y="0" width="52" height="230" rx="26" fill="#fff"/>${[0, 1, 2, 3, 4].map(j => `<path d="M-26 ${j * 50 - ((t * 60) % 50)} l52 -30 v22 l-52 30 Z" fill="${j % 2 ? C.red : '#2851a3'}"/>`).join('')}</g><circle cx="200" cy="300" r="90" fill="#5a4a40"/><rect x="120" y="330" width="160" height="80" rx="40" fill="#5a4a40"/>`, 400, 254);
  // headline typed
  if (t > at(2)) {
    const full = 'Fresh cuts in Ancoats.', n = Math.round(full.length * K.clamp((t - at(2)) / 1.1));
    s += big(full.slice(0, n), 36, 476, 54, C.ink, { a: 'start', ls: -2 });
    if (n < full.length) s += `<rect x="${36 + n * 26.5}" y="430" width="5" height="54" fill="${C.red}"/>`;
    if (t > at(2) + 1.1) s += ui('Walk-ins welcome · Tue–Sat', 38, 516, 22, C.grey, { op: eo(seg(t, at(2) + 1.1, at(2) + 1.4)) });
  }
  const booked = t > 8.3;
  s += blk(3, `<rect x="36" y="546" width="270" height="76" rx="38" fill="${booked ? C.green : C.red}"/>${ui(booked ? 'Booked ✓' : 'Book a chair', 171, 594, 26, '#fff', { w: 700, a: 'middle' })}`, 171, 584);
  s += blk(4, `<rect x="330" y="546" width="434" height="76" rx="18" fill="#efe6dc"/>${ui('Skin fade · Beard trim · Kids', 547, 594, 22, C.ink, { w: 600, a: 'middle' })}`, 547, 584);
  s += blk(5, `<rect x="24" y="646" width="370" height="210" rx="18" fill="#dfe9d8"/><path d="M24 760 C 120 700, 260 820, 394 730" stroke="#fff" stroke-width="16" fill="none"/><path d="M210 720 c-12 -18 -30 -30 -30 -48 a30 30 0 1 1 60 0 c0 18 -18 30 -30 48 Z" fill="${C.red}"/>${ui('Open Tue–Sat 9–6', 40, 840, 20, C.ink, { w: 600 })}`, 209, 751);
  s += blk(6, `<rect x="414" y="646" width="362" height="100" rx="18" fill="#fff" stroke="#e5dbd2" stroke-width="2"/>${ui('See our Google reviews →', 595, 706, 22, C.blue, { w: 700, a: 'middle' })}`, 595, 696);
  s += blk(7, `<circle cx="720" cy="800" r="48" fill="${C.wa}"/><circle cx="720" cy="800" r="22" fill="none" stroke="#fff" stroke-width="6"/>`, 720, 800);
  return s;
}

function main(t) {
  let s = `<rect width="1080" height="1920" fill="${C.ink}"/>`;
  // colour-block background shifts per step
  let si = 0; STEPS.forEach((st, i) => { if (t >= st[0]) si = i; });
  const cols = [C.peach, '#f6e4d9', C.peach, '#f6e4d9', C.peach, '#f6e4d9', C.peach, '#f6e4d9', C.peach];
  s += `<rect x="0" y="480" width="1080" height="1100" fill="${cols[si]}"/>`;
  if (t < 9.7) {
    const sh = eo(seg(t, 7.1, 7.6)); // canvas → phone
    if (sh < 1) s += `<g transform="translate(${f(140 - 60 * sh)} ${f(540)}) scale(${f(1 - .35 * sh)})" opacity="${f(1 - sh)}"><g filter="url(#sh)">${page(t)}</g></g>`;
    if (sh > 0) {
      const sc = 1.24 * sh;
      s += phone(540 - 190 * sc, 520 + 40 * (1 - sh), sc, `<g transform="scale(.475)">${page(t)}</g><rect y="418" width="380" height="400" fill="#fbf7f2"/>${ui('Tue–Sat 9–6 · Ancoats', 22, 460, 18, C.grey)}`, { url: 'ancoatscuts-demo.co.uk' });
      if (t > 7.7 && t < 8.6) s += finger(lerp(800, 412, eo(seg(t, 7.7, 8.2))), lerp(1600, 1000, eo(seg(t, 7.7, 8.2))), 1, seg(t, 8.15, 8.35));
      s += ripple(405, 995, seg(t, 8.25, 8.7), C.ink) + tick(830, 1100, 46, seg(t, 8.5, 8.7));
    }
    // step label
    const k = eb(seg(t, STEPS[si][0], STEPS[si][0] + .25));
    s += `<g transform="translate(540 1500) scale(${f(Math.max(k, .01))}) translate(-540 -1500)">${chip(`${si + 1} · ${STEPS[si][1].toUpperCase()}`, 540, 1505, C.ink, '#fff', 34)}</g>`;
    s += hook(t, [['Building a website', '#fff'], ['for a Manchester barber.', C.peach]], 300, 80, { lh: 88 });
    s += chip('DEMO', 960, 230, '#fff', C.ink, 22);
  } else {
    const ks = [9.7, 10.2, 10.7].map(a => eb(seg(t, a, a + .3)));
    s += `<rect x="0" y="480" width="1080" height="1100" fill="${C.ink}"/>`;
    [['Built by hand.', '#fff'], ['Text written', C.peach], ['for you.', C.peach]].forEach(([l, c], i) => { if (ks[i] > 0) s += `<g transform="translate(540 ${640 + i * 140}) scale(${f(ks[i])}) translate(-540 ${-(640 + i * 140)})">${big(l, 540, 640 + i * 140, 124, c)}</g>`; });
    const p = eb(seg(t, 11.2, 11.5));
    if (p > 0) s += `<g transform="translate(540 1130) scale(${f(p)}) translate(-540 -1130)">${chip('WEBSITES FROM £655', 540, 1140, C.red, '#fff', 38)}</g>`;
  }
  return s;
}
module.exports = K.reel(DUR, END, main);
