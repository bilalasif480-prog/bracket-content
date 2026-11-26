// R06 (Fri 4 Dec 14:30): "This form is about to lose you a booking." Hooks-bank #1 About to break, remake of
// "Your customers will find the bug before you do." (87 views). Template: light laptop browser + rage clicks.
// Problem: missed enquiries (sheet: Missed messages/enquiries). Fact: "checked on real phones" before launch (website facts). Salon is a DEMO.
const K = require('./kit4');
const { C, seg, eo, eb, f, lerp, big, ui, mono, tick, cross, chip, lesson, hook, spinner, ripple, shake, notif, phone } = K;
const DUR = 14, END = 12.2;

function cursor(x, y, press = 0) {
  const s = 1.9 * (1 - .12 * Math.sin(Math.PI * K.clamp(press)));
  return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})" filter="url(#sh2)"><path d="M0 0 L0 23 L6 17.5 L10 26.5 L14 24.8 L10 16 L18 16 Z" fill="${C.ink}" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/></g>`;
}
// browser window: x 60..1020, y 560..1300
function browser(t, state) {
  let s = `<g filter="url(#sh)"><rect x="60" y="560" width="960" height="830" rx="22" fill="#fff"/></g>`;
  s += `<rect x="60" y="560" width="960" height="64" rx="22" fill="#ebe7e3"/><rect x="60" y="600" width="960" height="24" fill="#ebe7e3"/>` + ['#ff5f57', '#febc2e', '#28c840'].map((c, i) => `<circle cx="${92 + i * 26}" cy="592" r="9" fill="${c}"/>`).join('');
  s += `<rect x="200" y="574" width="640" height="36" rx="18" fill="#fff"/>` + ui('chorltonhairco-demo.co.uk/book', 520, 599, 19, C.grey, { a: 'middle' });
  s += big('Book an appointment', 110, 700, 50, C.ink, { a: 'start', ls: -1.5 });
  const fields = [['Name', 'Sam'], ['Phone', '07••• ••••••'], ['Service', 'Cut + colour'], ['When', 'Saturday morning']];
  fields.forEach(([l, v], i) => { const y = 760 + i * 106; s += ui(l, 110, y, 20, C.grey, { w: 600 }) + `<rect x="110" y="${y + 12}" width="860" height="62" rx="12" fill="#faf8f6" stroke="#ddd5ce" stroke-width="2"/>` + ui(v, 130, y + 53, 26, C.ink); });
  // button
  const by = 1196;
  if (state === 'ok') s += `<rect x="110" y="${by}" width="860" height="84" rx="42" fill="${C.green}"/>` + ui('Sent ✓  We’ll reply soon', 540, by + 54, 32, '#fff', { w: 700, a: 'middle' });
  else {
    const busy = state === 'busy';
    s += `<rect x="110" y="${by}" width="860" height="84" rx="42" fill="${C.red}" opacity="${busy ? .75 : 1}"/>` + (busy ? spinner(540, by + 42, 22, t, '#fff', 6) : ui('Send', 540, by + 54, 32, '#fff', { w: 700, a: 'middle' }));
  }
  if (state === 'idle' && t < 1) { const p = (t * 2) % 1; s += `<rect x="${f(110 - 16 * p)}" y="${f(by - 16 * p)}" width="${f(860 + 32 * p)}" height="${f(84 + 32 * p)}" rx="${f(42 + 16 * p)}" fill="none" stroke="${C.red}" stroke-width="5" opacity="${f(1 - p)}"/>`; }
  if (state === 'error') s += `<rect x="110" y="${by + 100}" width="860" height="52" rx="12" fill="#fde8e4"/>` + ui('Something went wrong. Please try again later.', 540, by + 135, 24, C.red, { w: 600, a: 'middle' });
  return s;
}

function main(t) {
  let s = `<rect width="1080" height="1920" fill="${C.paper}"/><circle cx="${f(960 + 30 * Math.sin(t))}" cy="420" r="280" fill="${C.peach}" opacity=".15"/>`;
  if (t < 3.5) {
    const state = t < 0.95 ? 'idle' : t < 1.8 ? 'busy' : 'error';
    const sx = shake(t, 1.8, 2.3, 14) + shake(t, 2.5, 3.0, 14) + shake(t, 3.0, 3.4, 10);
    s += `<g transform="translate(${f(sx)} 0)">${browser(t, state)}</g>`;
    // cursor heading to Send at frame 0, then rage clicks
    const cx = t < 0.9 ? lerp(860, 560, eo(seg(t, -0.4, 0.9))) : 560 + 20 * Math.sin(t * 9), cy = t < 0.9 ? lerp(1480, 1240, eo(seg(t, -0.4, 0.9))) : 1240 + 10 * Math.cos(t * 11);
    const clicks = [0.9, 2.1, 2.5, 2.85, 3.15];
    const pr = clicks.reduce((a, c) => a + seg(t, c - .06, c + .06), 0) % 1;
    s += clicks.map(c => ripple(560, 1240, seg(t, c, c + .4), C.ink)).join('') + cursor(cx, cy, pr);
    s += hook(t, [['This form is about', C.ink], ['to lose you a booking.', C.red]], 320, 82, { lh: 90 });
    if (t > 2.1) s += chip(`CLICKS: ${clicks.filter(c => t > c).length}`, 860, 1420, C.ink, '#fff', 26);
  } else if (t < 5.7) {
    // where did it go? customer thinks sent, owner inbox empty
    s += `<rect width="1080" height="1920" fill="${C.ink}"/>`;
    const k = eb(seg(t, 3.5, 3.8));
    s += big('The booking', 540, 340, 92, '#fff') + big('never reaches you.', 540, 436, 92, C.peach);
    s += `<g transform="translate(540 1000) scale(${f(k)}) translate(-540 -1000)">` + phone(350, 560, 1.0, `<rect width="380" height="730" fill="#f4f2f0"/>${ui('Inbox', 24, 60, 34, C.ink, { w: 700 })}${ui('0 new enquiries', 24, 100, 22, C.grey)}<rect x="24" y="140" width="332" height="2" fill="#ddd"/>${ui('Nothing here yet', 190, 360, 22, '#aaa', { a: 'middle' })}`) + '</g>';
    // envelope flying away
    const e = seg(t, 3.6, 4.6);
    if (e < 1) s += `<g transform="translate(${f(lerp(120, 1200, e))} ${f(lerp(1400, 700, e) - 200 * Math.sin(Math.PI * e))}) rotate(${f(30 * e)})"><rect x="-60" y="-40" width="120" height="80" rx="8" fill="#fff"/><path d="M-60 -40 L0 8 L60 -40" stroke="${C.red}" stroke-width="6" fill="none"/></g>`;
    s += lesson(t, 4.6, 'THIS is a', 'SILENT FAIL.', 1460, C.peach);
  } else if (t < 9.7) {
    s += big('Same form.', 540, 340, 92, C.ink) + big('Tested before launch.', 540, 436, 84, C.green);
    const state = t < 6.6 ? 'idle' : t < 7.1 ? 'busy' : 'ok';
    s += browser(t, state);
    const cx = lerp(860, 560, eo(seg(t, 5.7, 6.5))), cy = lerp(1480, 1240, eo(seg(t, 5.7, 6.5)));
    s += ripple(560, 1240, seg(t, 6.6, 7.0), C.ink) + cursor(cx, cy, seg(t, 6.52, 6.68));
    const nk = eo(seg(t, 7.4, 7.7));
    if (nk > 0) s += `<g transform="translate(0 ${f(-160 * (1 - nk))})" opacity="${f(nk)}">${notif(90, 1420, 900, 'Email', 'New booking request', 'Sam · Cut + colour · Saturday morning', { icon: C.blue, h: 130 })}</g>` + tick(950, 1410, 34, seg(t, 7.8, 8.0));
    s += chip('DEMO', 900, 520, C.ink, '#fff', 22);
  } else {
    s += `<rect width="1080" height="1920" fill="${C.ink}"/>`;
    s += big('Before it goes live:', 540, 420, 76, '#fff', { ls: -2 });
    ['Every form tested', 'Lands in your inbox', 'Checked on real phones'].forEach((it, i) => {
      const k = eb(seg(t, 9.85 + i * .45, 10.15 + i * .45)); if (k <= 0) return; const y = 640 + i * 190;
      s += `<g transform="translate(540 ${y}) scale(${f(k)}) translate(-540 ${-y})"><rect x="110" y="${y - 75}" width="860" height="150" rx="34" fill="#2c2a29"/>${tick(200, y, 44, 1)}${big(it, 270, y + 20, 52, '#fff', { a: 'start', ls: -1.5 })}</g>`;
    });
    const p = eb(seg(t, 11.3, 11.6));
    if (p > 0) s += `<g transform="translate(540 1330) scale(${f(p)}) translate(-540 -1330)">${chip('30 DAYS OF FREE FIXES AFTER LAUNCH', 540, 1340, C.red, '#fff', 30)}</g>`;
  }
  return s;
}
module.exports = K.reel(DUR, END, main);
