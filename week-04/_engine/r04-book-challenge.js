// R04 (Thu 3 Dec 14:30): "Can you book a table here in under 10 seconds?" Hooks-bank #3 Challenge question.
// Template: challenge + timer (peach). Problem: "best table booking system for small café UK" (sheet top 5 #5).
// Both sites are DEMOs. The timer is the game's clock (2x speed), not a claim about any real site.
const K = require('./kit4');
const { C, seg, eo, eb, f, lerp, big, ui, mono, phone, finger, ripple, tick, chip, hook, cafePage, cafeDefs, shake } = K;
const DUR = 14, END = 12.2, FAIL = 5.0, CLEAN = 6.2;

function messy(t) {
  const scroll = 260 * eo(seg(t, 2.3, 3.0));
  let s = `<rect width="380" height="740" fill="#fdfdfd"/><g clip-path="url(#scr)"><g transform="translate(0 ${f(-scroll)})">`;
  s += `<rect width="380" height="60" fill="#5b1f2a"/>` + ui('LA TRATTORIA DEMO', 14, 38, 16, '#ffd', { w: 700 }) + ui('Home | About | News | Gallery | Events', 14, 54, 9, '#fdd');
  s += `<rect x="10" y="74" width="360" height="150" fill="#c8b8a0"/>` + ui('WELCOME TO OUR WEBSITE!!!', 190, 160, 18, '#5b1f2a', { w: 700, a: 'middle' });
  for (let i = 0; i < 9; i++) s += `<rect x="14" y="${240 + i * 14}" width="${300 + (i * 37) % 50}" height="6" fill="#bbb"/>`;
  s += ui('Menu (PDF, 14 MB)', 14, 400, 14, '#00e', { extra: ' text-decoration="underline"' }) + ui('Opening times: see Facebook', 14, 424, 12, '#555');
  s += ui('To book please call or use the Contact page', 14, 450, 12, '#555');
  for (let i = 0; i < 6; i++) s += `<rect x="14" y="${470 + i * 14}" width="${330 - (i * 29) % 60}" height="6" fill="#ccc"/>`;
  const contactTap = t > 3.4;
  s += `<rect x="14" y="570" width="96" height="26" fill="${contactTap ? '#ffe08a' : '#eee'}" stroke="#999"/>` + ui('Contact', 62, 588, 13, '#333', { a: 'middle' });
  s += `</g></g>`;
  // contact page after tap
  if (t > 3.6) {
    s += `<rect width="380" height="740" fill="#fdfdfd"/>` + ui('Contact us', 14, 40, 22, '#5b1f2a', { w: 700 }) + ui('Email your booking request and we', 14, 74, 13, '#555') + ui('will get back to you within 2-3 days.', 14, 92, 13, '#555');
    ['Name', 'Email', 'Phone', 'Date', 'Message'].forEach((l, i) => { s += ui(l, 14, 130 + i * 62, 13, '#333') + `<rect x="14" y="${138 + i * 62}" width="352" height="34" fill="#fff" stroke="#bbb"/>`; });
  }
  // cookie banner
  if (t < 3.6) s += `<rect x="0" y="600" width="380" height="140" fill="#222"/>` + ui('We use cookies to improve your', 16, 636, 14, '#fff') + ui('experience. Manage preferences.', 16, 656, 14, '#fff') + `<rect x="16" y="676" width="160" height="40" fill="#888"/>` + ui('Accept all', 96, 702, 14, '#fff', { a: 'middle' });
  // newsletter pop-up 0.6–2.0
  const pk = eb(seg(t, 0.5, 0.8));
  if (pk > 0 && t < 2.05) s += `<rect width="380" height="740" fill="#000" opacity=".45"/><g transform="translate(190 330) scale(${f(pk)})"><rect x="-160" y="-130" width="320" height="260" rx="6" fill="#fff"/>${ui('SIGN UP TO OUR', 0, -60, 20, '#5b1f2a', { w: 700, a: 'middle' })}${ui('NEWSLETTER!', 0, -32, 20, '#5b1f2a', { w: 700, a: 'middle' })}<rect x="-130" y="0" width="260" height="36" fill="#fff" stroke="#bbb"/><rect x="-130" y="52" width="260" height="40" fill="#5b1f2a"/>${ui('Subscribe', 0, 78, 15, '#fff', { a: 'middle' })}${ui('✕', 140, -104, 18, '#999', { a: 'middle' })}</g>`;
  return s;
}

function cleanBook(t) {
  // one-tap booking sheet on the DEMO café page
  let s = cafePage({ k: 1, name: 'Little Ancoats Kitchen', btn: t < 7.2 ? 'idle' : 'press' });
  const sh = eo(seg(t, 7.25, 7.55));
  if (sh > 0) {
    s += `<rect width="380" height="740" fill="#000" opacity="${f(.4 * sh)}"/><g transform="translate(0 ${f(674 - 440 * sh)})"><rect width="380" height="460" rx="26" fill="#fff"/>`;
    s += ui('Book a table', 24, 50, 24, C.ink, { w: 700 });
    const opt = (y, label, vals, pick, at) => { let r = ui(label, 24, y, 15, C.grey, { w: 600 }); vals.forEach((v, i) => { const on = i === pick && t > at; r += `<rect x="${24 + i * 112}" y="${y + 12}" width="100" height="44" rx="22" fill="${on ? C.red : '#f2ede9'}"/>` + ui(v, 74 + i * 112, y + 41, 16, on ? '#fff' : C.ink, { w: 600, a: 'middle' }); }); return r; };
    s += opt(92, 'DAY', ['Fri', 'Sat', 'Sun'], 1, 0) + opt(176, 'PEOPLE', ['2', '4', '6'], 0, 7.8) + opt(260, 'TIME', ['18:00', '19:00', '20:00'], 1, 8.4);
    const done = t > 9.0;
    s += `<rect x="24" y="352" width="332" height="58" rx="29" fill="${done ? C.green : C.ink}"/>` + ui(done ? 'Booked ✓ Sat · 2 · 19:00' : 'Confirm', 190, 389, 19, '#fff', { w: 700, a: 'middle' });
    s += '</g>';
  }
  return s;
}

const PX = 302, PY = 560, SC = 1.25;
const G = (lx, ly) => [PX + lx * SC, PY + (106 + ly) * SC]; // phone-local → global (url mode)

function main(t) {
  let s = `<rect width="1080" height="1920" fill="${C.peach}"/>`;
  s += `<circle cx="${f(900 + 40 * Math.sin(t * 1.3))}" cy="1700" r="380" fill="#fff" opacity=".12"/>`;
  const clean = t >= CLEAN;
  const sx = shake(t, FAIL, FAIL + .45, 18);
  if (!clean) s += `<g transform="translate(${f(sx)} 0)">${phone(PX, PY, SC, messy(t), { url: 'latrattoria-demo.co.uk' })}</g>`;
  else s += phone(PX, PY, SC, cleanBook(t), { url: 'littleancoats-demo.co.uk', chip: ['DEMO', C.ink] });
  // finger path (messy): wander → X on pop-up (2.0) → scroll → Contact (3.4) → hunting
  let fp = null, pr = 0;
  if (!clean && t < FAIL) {
    const pts = [[-0.2, 330, 900], [0.6, 230, 300], [1.4, 290, 260], [2.0, 330, 226], [2.3, 300, 500], [3.0, 200, 520], [3.4, 62, 328], [4.2, 250, 250], [5.0, 120, 420]];
    let i = 0; while (i < pts.length - 2 && t > pts[i + 1][0]) i++;
    const [a, x1, y1] = pts[i], [b, x2, y2] = pts[i + 1], k = K.eio(seg(t, a, b));
    fp = G(lerp(x1, x2, k), lerp(y1, y2, k)); pr = seg(t, 1.9, 2.05) + seg(t, 3.3, 3.45);
  }
  if (clean && t < 9.3) {
    const pts = [[CLEAN, 300, 900], [7.0, 115, 440], [7.25, 115, 440], [7.75, 74, 444], [7.9, 74, 444], [8.25, 186, 528], [8.4, 186, 528], [8.8, 190, 615], [9.3, 190, 615]];
    let i = 0; while (i < pts.length - 2 && t > pts[i + 1][0]) i++;
    const [a, x1, y1] = pts[i], [b, x2, y2] = pts[i + 1], k = K.eio(seg(t, a, b));
    fp = G(lerp(x1, x2, k), lerp(y1, y2, k)); pr = seg(t, 6.95, 7.1) + seg(t, 7.72, 7.87) + seg(t, 8.22, 8.37) + seg(t, 8.77, 8.92);
  }
  if (fp) s += finger(fp[0] + 10, fp[1] + 10, 1.0, pr);
  // timer
  if (t < CLEAN) {
    const v = Math.min(10, t * 2), over = t >= FAIL;
    const pulse = over ? 1 + .06 * Math.sin(t * 20) : 1;
    s += `<g transform="translate(880 1440) scale(${f(pulse)})"><circle r="150" fill="${over ? C.red : C.ink}"/><circle r="150" fill="none" stroke="#fff" stroke-width="10" stroke-dasharray="${f(942 * v / 10)} 942" transform="rotate(-90)"/>${mono(v.toFixed(1), 0, 30, 84, '#fff', { ls: 0 })}</g>`;
  }
  // texts
  if (t < FAIL) s += hook(t, [['Can you book a table', C.ink], ['here in under', C.ink], ['10 seconds?', C.red]], 300, 80, { lh: 86, bar: [60, '#fff', 30] });
  else if (t < CLEAN) {
    const k = eb(seg(t, FAIL, FAIL + .3));
    s += `<g transform="translate(540 1000) rotate(-10) scale(${f(2 - k)})" opacity="${f(Math.min(1, k * 1.5))}"><rect x="-330" y="-90" width="660" height="180" rx="20" fill="${C.red}" stroke="#fff" stroke-width="10"/>${big('TIME’S UP', 0, 40, 120, '#fff', { ls: -2 })}</g>`;
    s += big('Your customer gave up.', 540, 360, 76, C.ink, { ls: -2 });
  } else if (t < 10.0) {
    s += big('Same challenge.', 540, 320, 84, C.ink) + big('Proper site.', 540, 410, 84, '#fff');
    const tc = [7.05, 7.8, 8.3, 8.85].filter(a => t > a).length;
    if (t > 7.05) s += `<g transform="translate(880 1440)"><circle r="150" fill="${t > 9.0 ? C.green : C.ink}"/>${big(String(tc), 0, 20, 120, '#fff', { ls: 0 })}${mono('TAPS', 0, 80, 34, '#fff')}</g>`;
    s += ripple(...G(115, 440), seg(t, 7.1, 7.6)) + ripple(...G(190, 615), seg(t, 8.85, 9.4));
  } else {
    s += `<rect width="1080" height="1920" fill="${C.ink}"/>`;
    const k = eb(seg(t, 10.0, 10.3));
    s += `<g transform="translate(540 700) scale(${f(k)}) translate(-540 -700)">${big('Booked in', 540, 640, 130, '#fff')}${big('4 taps.', 540, 780, 150, C.peach)}</g>`;
    const k2 = eb(seg(t, 10.7, 11.0)), k3 = eb(seg(t, 11.2, 11.5));
    if (k2 > 0) s += `<g transform="translate(540 980) scale(${f(k2)}) translate(-540 -980)">${big('Booking built into your site.', 540, 1000, 58, '#fff', { ls: -1.5 })}</g>`;
    if (k3 > 0) s += `<g transform="translate(540 1160) scale(${f(k3)}) translate(-540 -1160)">${chip('WEBSITES FROM £655', 540, 1170, C.red, '#fff', 36)}</g>`;
  }
  return s;
}
module.exports = K.reel(DUR, END, main, cafeDefs + '<clipPath id="scr"><rect width="380" height="740"/></clipPath>');
