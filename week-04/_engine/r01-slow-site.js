// R01 (Tue 1 Dec 14:30): "Your customer is about to leave." Hooks-bank #1 About to break (stress), remake of
// "Still loading… and they're gone." (110 views). Template: dark phone POV. Problem: slow / weak café website (sheet: No or weak website).
const K = require('./kit4');
const { C, seg, eo, eb, f, big, ui, mono, phone, finger, ripple, tick, spinner, chip, lesson, hook, cafePage, cafeDefs } = K;
const DUR = 14, END = 12.2;

function googleBack() {
  let s = `<rect width="380" height="740" fill="#fff"/>`;
  s += `<rect x="16" y="14" width="348" height="46" rx="23" fill="#fff" stroke="#dadce0" stroke-width="2"/>` + ui('café near me', 40, 44, 18, C.ink);
  const r = (y, name, sub, hi) => `<rect x="12" y="${y}" width="356" height="104" rx="14" fill="${hi ? '#fff3ef' : '#fff'}" stroke="${hi ? C.red : '#eee'}" stroke-width="${hi ? 3 : 1.5}"/>` + ui(name, 28, y + 36, 20, '#1a0dab', { w: 600 }) + ui(sub, 28, y + 64, 15, C.grey) + (hi ? `<rect x="240" y="${y + 66}" width="114" height="30" rx="15" fill="${C.blue}"/>` + ui('Book a table', 297, y + 87, 14, '#fff', { w: 700, a: 'middle' }) : '');
  s += r(80, 'Another Café (next door)', '★★★★☆ · open now · 2 min', true) + r(196, 'Corner Coffee House', '★★★★☆ · open now · 5 min') + r(312, 'Mill St Kitchen', '★★★★★ · open now · 6 min');
  return s;
}

function main(t) {
  let s = `<rect width="1080" height="1920" fill="${C.ink}"/>`;
  s += `<circle cx="${f(540 + Math.sin(t) * 40)}" cy="1000" r="520" fill="${t < 6 ? C.red : C.green}" opacity=".10" filter="url(#glow)"/>`;
  // ---- scene A 0–3.6: loading, thumb drifting to back
  if (t < 4.3) {
    const flip = seg(t, 3.75, 4.05);
    let screen;
    if (t < 3.75) {
      const bar = 0.06 + 0.14 * eo(seg(t, 0, 3.6));
      screen = cafePage({ k: 0, t }) + `<rect x="0" y="0" width="${f(380 * bar)}" height="5" fill="${C.red}"/>` + spinner(190, 300, 34, t, C.grey, 7);
    } else screen = googleBack();
    const ph = phone(302, 560, 1.25, screen, { url: 'northernbean.co.uk', dark: false });
    s += `<g transform="translate(${f(-80 * eo(flip))} 0)">${ph}</g>`;
    // seconds counter
    const sec = Math.min(9, 3 + Math.floor(t * 1.4));
    if (t < 3.75) s += chip(`STILL LOADING · 0:0${sec}`, 540, 1530, C.red, '#fff', 30);
    // back arrow highlight + thumb path
    const bk = seg(t, 0, 3.6);
    const fx = 760 - 400 * eo(bk), fy = 1500 - 820 * eo(bk);
    s += `<circle cx="345" cy="660" r="${f(26 + 6 * Math.sin(t * 8))}" fill="${C.red}" opacity=".9"/>` + big('‹', 343, 682, 56, '#fff', { ls: 0 });
    s += ripple(345, 660, seg(t, 3.55, 4.1), '#fff');
    if (t < 4.1) s += finger(t < 3.55 ? fx : 360, t < 3.55 ? fy : 690, 1.1, seg(t, 3.5, 3.75));
    if (t < 4.0) s += hook(t, [['Your customer', '#fff'], ['is about to leave.', C.peach]], 330, 100, { lh: 104 });
  }
  // ---- scene B 4.0–6.1: lost customer
  if (t >= 4.0 && t < 6.2) {
    const k = eo(seg(t, 4.0, 4.3));
    s += phone(302 - 80 + 80 * (1 - k) * 0, 560, 1.25, googleBack(), { url: 'google.co.uk/search' }).replace('<g transform', `<g opacity="${f(1 - .65 * seg(t, 4.4, 4.7))}"><g transform`) + '</g>';
    s += big('They tapped back.', 540, 380, 88, '#fff', { op: k });
    s += lesson(t, 4.7, 'THIS is a', 'LOST TABLE.', 1080, C.peach);
  }
  // ---- scene C 6.1–9.6: same café, fast page, one-tap booking (DEMO)
  if (t >= 6.1 && t < 9.7) {
    const u = t - 6.1, k = eb(seg(u, 0, .3));
    const btn = t < 7.9 ? 'idle' : t < 8.15 ? 'press' : 'booked';
    s += `<g transform="translate(540 1050) scale(${f(.85 + .15 * k)}) translate(-540 -1050)">` + phone(302, 560, 1.25, cafePage({ k: 1, btn }), { url: 'northernbean.co.uk', chip: ['LOADED', C.green] }) + '</g>';
    s += big('Same café.', 540, 300, 92, '#fff') + big('Fast page.', 540, 400, 92, C.green);
    s += chip('DEMO', 900, 520, '#fff', C.ink, 22);
    if (t > 7.0 && t < 8.3) s += finger(lerpX(t), lerpY(t), 1.1, seg(t, 7.85, 8.1));
    s += ripple(446, 1242, seg(t, 7.95, 8.5));
    const tk = eb(seg(t, 8.3, 8.6));
    if (tk > 0) s += `<g transform="translate(540 1600) scale(${f(tk)})"><rect x="-370" y="-70" width="740" height="140" rx="30" fill="#fff" filter="url(#sh)"/>${tick(-290, 0, 40, 1)}${ui('Table for 2 · Sat 11:00', -230, -8, 34, C.ink, { w: 700 })}${ui('Booked online, no phone call', -230, 34, 24, C.grey)}</g>`;
  }
  // ---- scene D 9.6–12.2: what I build
  if (t >= 9.6) {
    s += big('What your page needs:', 540, 420, 70, '#fff', { ls: -2 });
    const items = ['Loads fast on phones', 'Menu + hours up top', 'Book in one tap'];
    items.forEach((it, i) => {
      const k = eb(seg(t, 9.75 + i * .45, 10.05 + i * .45)); if (k <= 0) return;
      const y = 640 + i * 190;
      s += `<g transform="translate(540 ${y}) scale(${f(k)}) translate(-540 ${-y})"><rect x="110" y="${y - 75}" width="860" height="150" rx="34" fill="#2c2a29"/>${tick(200, y, 44, 1)}${big(it, 270, y + 22, 58, '#fff', { a: 'start', ls: -1.5 })}</g>`;
    });
    const p = eb(seg(t, 11.2, 11.5));
    if (p > 0) s += `<g transform="translate(540 1330) scale(${f(p)}) translate(-540 -1330)">${chip('WEBSITES FROM £655', 540, 1340, C.red, '#fff', 34)}</g>`;
  }
  return s;
}
// finger path in scene C: from bottom right up to the Book button (phone x302 + 115*1.25, y 560 + 106*1.25 + 438*1.25)
function lerpX(t) { return 760 - (760 - 448) * eo(seg(t, 7.0, 7.8)); }
function lerpY(t) { return 1700 - (1700 - 1255) * eo(seg(t, 7.0, 7.8)); }

module.exports = K.reel(DUR, END, main, cafeDefs);
