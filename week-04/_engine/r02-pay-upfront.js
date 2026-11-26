// R02 (Wed 2 Dec 14:30): "Expectation: a big bill upfront. Reality:" Hooks-bank #4 Expectation vs reality + niche card H's offer close
// (alphaagency1 "free demo, no advance"). Problem: "Do I need a website for my small business?" / cost worry (sheet top 5 #4).
// Fact used: founding client offer on the site (first 5 clients pay nothing upfront, preview link, 2 rounds of changes, pay when happy).
const K = require('./kit4');
const { C, seg, eo, eb, f, big, ui, mono, phone, tick, chip, hook, cafePage, cafeDefs, shake } = K;
const DUR = 14, END = 12.2, FLIP = 3.2;

function invoice(t) {
  const drop = eo(seg(t, -0.6, 1.0)); // already falling at frame 0
  const y = 650 + (1 - drop) * -140, r = -6 + 4 * Math.sin(t * 2.2);
  let s = `<g transform="translate(540 ${f(y + 420)}) rotate(${f(r)}) translate(-540 -420)">`;
  s += `<rect x="190" y="0" width="700" height="860" rx="10" fill="#fffdf8" filter="url(#sh)"/>`;
  s += T2('INVOICE', 250, 92, 60) + ui('Website project', 252, 140, 28, C.grey);
  const rows = [['Design', '£££'], ['Build', '£££'], ['Page text', '£££'], ['Extras', '£££']];
  rows.forEach(([a, b], i) => { const yy = 230 + i * 86; s += ui(a, 252, yy, 34, C.ink, { w: 600 }) + ui(b, 828, yy, 34, C.ink, { w: 700, a: 'end' }) + `<rect x="252" y="${yy + 26}" width="576" height="2" fill="#e4ddd6"/>`; });
  s += `<rect x="232" y="590" width="616" height="110" rx="14" fill="${C.ink}"/>` + ui('DUE BEFORE YOU SEE IT', 262, 658, 30, '#fff', { w: 700 }) + ui('£££££', 818, 660, 40, C.peach, { w: 700, a: 'end' });
  const st = eb(seg(t, 0.9, 1.15));
  if (st > 0) s += `<g transform="translate(560 790) rotate(-12) scale(${f(2.2 - 1.2 * st)})" opacity="${f(Math.min(1, st * 1.4))}"><rect x="-250" y="-58" width="500" height="116" rx="12" fill="none" stroke="${C.red}" stroke-width="10"/>${big('PAY UPFRONT', 0, 26, 74, C.red, { ls: -1 })}</g>`;
  return s + '</g>';
}
const T2 = (s, x, y, size) => big(s, x, y, size, C.ink, { a: 'start', ls: -2 });

const STEPS = [[3.5, 'Scope agreed', 'in writing'], [4.9, 'Built on a', 'preview link'], [6.3, '2 rounds', 'of changes'], [7.7, 'Pay when', 'you’re happy']];

function main(t) {
  let s = '';
  if (t < FLIP + .25) {
    s += `<rect width="1080" height="1920" fill="${C.ink}"/>`;
    const sx = shake(t, 1.0, 1.4, 16);
    s += `<g transform="translate(${f(sx)} 0)">${invoice(t)}</g>`;
    s += big('EXPECTATION:', 540, 300, 64, C.peach, { ls: 2 });
    s += hook(t, [['A big bill', '#fff'], ['before you see it.', '#fff']], 400, 92, { lh: 96 });
  }
  // flip: a red panel wipes up
  const fl = seg(t, FLIP, FLIP + .3);
  if (t >= FLIP) {
    let r = `<rect width="1080" height="1920" fill="${C.paper}"/><circle cx="${f(200 + 60 * Math.sin(t))}" cy="${f(1500 + 40 * Math.cos(t))}" r="300" fill="${C.peach}" opacity=".18"/>`;
    r += big('REALITY:', 540, 300, 64, C.red, { ls: 2 });
    if (t < 9.4) {
      r += big('Your site first.', 540, 405, 90, C.ink);
      r += phone(600, 520, .96, cafePage({ k: 1, btn: t > 8.2 ? 'booked' : 'idle' }), { url: 'preview link', chip: ['PREVIEW', C.peach] });
      r += chip('DEMO', 790, 1310, C.ink, '#fff', 20);
      STEPS.forEach(([at, a, b], i) => {
        const k = eb(seg(t, at, at + .3)); if (k <= 0) return;
        const y = 600 + i * 178, last = i === 3;
        r += `<g transform="translate(${f(-500 * (1 - eo(seg(t, at, at + .3))))} 0)"><rect x="50" y="${y - 70}" width="520" height="150" rx="28" fill="${last ? C.red : '#fff'}" filter="url(#sh2)"/>`;
        r += `<circle cx="112" cy="${y + 5}" r="36" fill="${last ? '#fff' : C.ink}"/>${big(String(i + 1), 112, y + 22, 46, last ? C.red : '#fff', { ls: 0 })}`;
        r += big(a, 170, y - 4, 46, last ? '#fff' : C.ink, { a: 'start', ls: -1.5 }) + big(b, 170, y + 46, 46, last ? '#fff' : C.ink, { a: 'start', ls: -1.5 }) + '</g>';
        if (t > at + .3) r += tick(556, y - 60, 22, seg(t, at + .3, at + .5));
      });
    } else {
      const k = eb(seg(t, 9.4, 9.7)), k2 = eb(seg(t, 10.1, 10.4)), k3 = eb(seg(t, 10.8, 11.1));
      r += `<g transform="translate(540 760) scale(${f(k)}) translate(-540 -760)">${big('Your website first.', 540, 700, 98, C.ink)}${big('You pay only when', 540, 830, 98, C.red)}${big('you’re happy.', 540, 940, 98, C.red)}</g>`;
      if (k2 > 0) r += `<g transform="translate(540 1110) scale(${f(k2)}) translate(-540 -1110)">${chip('FIRST 5 CLIENTS · FOUNDING OFFER', 540, 1120, C.ink, '#fff', 30)}</g>`;
      if (k3 > 0) r += `<g opacity="${f(k3)}">${ui('Scope in writing · 2 rounds of changes · domain in your name', 540, 1240, 30, C.grey, { a: 'middle', w: 600 })}</g>`;
    }
    s += `<g clip-path="url(#flipClip)"><g>${r}</g></g>`;
  }
  return s;
}
const clip = t => `<clipPath id="flipClip"><rect x="0" y="${f(1920 * (1 - eo(seg(t, FLIP, FLIP + .3))))}" width="1080" height="1920"/></clipPath>`;

const R = K.reel(DUR, END, main, cafeDefs);
const frame = R.frame;
R.frame = t => frame(t).replace('</defs>', clip(t) + '</defs>');
module.exports = R;
