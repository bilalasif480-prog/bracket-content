// R03 (Wed 2 Dec 22:00): "11 pm. A customer wants to book." Research format card C "11 PM enquiry" (Bilal's preferred test-reel-3 style)
// + hooks-bank #2 countdown/clock. Template: night phone-chat story (navy). Problem: AI receptionist for small business (sheet top 5 #2, +70% UK).
// Agent conversation is a DEMO. Price from the profile: AI agents from £875 setup + £109/month.
const K = require('./kit4');
const { C, seg, eo, eb, f, lerp, big, ui, mono, phone, tick, cross, chip, lesson, hook, bubble } = K;
const DUR = 14, END = 12.2;

function clockStr(t) {
  // 23:04 at 0; time-lapse 1.6–3.4 to 09:12; rewind 6.0–6.5 back to 23:04
  let m = 23 * 60 + 4 + Math.floor(t * 0.8);
  if (t > 1.6) m = Math.round(lerp(23 * 60 + 5, 24 * 60 + 9 * 60 + 12, K.eio(seg(t, 1.6, 3.4))));
  if (t > 6.0) m = Math.round(lerp(33 * 60 + 12, 23 * 60 + 4, K.eio(seg(t, 6.0, 6.5))));
  if (t > 6.5) m = 23 * 60 + 4 + Math.floor((t - 6.5) * 0.6);
  m = ((m % 1440) + 1440) % 1440;
  return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
}
const day = t => t < 6 ? eo(seg(t, 1.6, 3.4)) : 1 - eo(seg(t, 6.0, 6.5));

function chat(t, mode) {
  // dark WhatsApp-like chat, local width 380 (content starts below status bar)
  let s = `<rect width="380" height="730" fill="#0b141a"/><rect width="380" height="70" fill="#1f2c34"/>`;
  s += `<circle cx="44" cy="35" r="22" fill="#6b7c85"/>` + ui('C', 44, 43, 20, '#fff', { w: 700, a: 'middle' }) + ui('New customer', 78, 32, 19, '#e9edef', { w: 700 }) + ui(mode === 'agent' ? 'AI agent (DEMO) replying' : 'online', 78, 55, 14, mode === 'agent' ? C.wa : '#8696a0');
  const B = (y, lines, side, at, time, col) => {
    const k = eb(seg(t, at, at + .25)); if (k <= 0) return '';
    const w = Math.max(...lines.map(l => l.length)) * 10.6 + 40;
    const x = side === 'out' ? 366 : 14;
    return `<g transform="translate(${x} ${y}) scale(${f(k)}) translate(${-x} ${-y})">` + bubble(x, y, Math.min(w, 330), lines, side, { size: 18, lh: 25, time, inCol: '#1f2c34', outCol: col || '#005c4b', fg: '#e9edef' }) + '</g>';
  };
  let s2 = B(96, ['Hi! Any tables for 6', 'this Saturday night?'], 'in', -0.12, '23:04');
  if (mode === 'owner') {
    s2 += B(206, ['Morning! Yes, we have', 'one at 8pm. Want it?'], 'out', 3.5, '09:12');
    s2 += B(316, ['Sorted thanks, booked', 'somewhere else.'], 'in', 4.25, '09:14');
  }
  if (mode === 'agent') {
    s2 += B(206, ['Hi! Yes, a table for 6', 'on Sat at 8pm is free.', 'Shall I book it?'], 'out', 7.2, '23:04');
    s2 += B(342, ['Yes please!'], 'in', 8.0, '23:05');
    s2 += B(420, ['Booked ✓ See you', 'Saturday at 8pm.'], 'out', 8.7, '23:05');
  }
  // typing dots at frame 0 (customer still typing a follow-up)
  if (mode === 'owner' && t < 1.6) { const d = i => .35 + .65 * Math.abs(Math.sin(t * 6 + i)); s2 += `<rect x="14" y="200" width="80" height="40" rx="18" fill="#1f2c34"/>` + [0, 1, 2].map(i => `<circle cx="${36 + i * 18}" cy="220" r="6" fill="#8696a0" opacity="${f(d(i))}"/>`).join(''); }
  return s + s2;
}

function sky(t) {
  const d = day(t);
  const top = mix('#0b1530', '#8fc3ff', d), bot = mix('#1d2f5c', '#fbe3c8', d);
  let s = `<linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient>`;
  return s;
}
function mix(a, b, k) {
  const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const A = p(a), B = p(b);
  return '#' + A.map((x, i) => Math.round(x + (B[i] - x) * k).toString(16).padStart(2, '0')).join('');
}

function main(t) {
  let s = `<rect width="1080" height="1920" fill="url(#skyg)"/>`;
  const d = day(t);
  // moon / sun arc
  const ang = Math.PI * (0.15 + 0.7 * d);
  s += `<circle cx="${f(540 - 470 * Math.cos(ang))}" cy="${f(1820 - 300 * Math.sin(ang))}" r="70" fill="${d < .5 ? '#f4f1e8' : '#ffd36b'}" opacity=".9"/>`;
  if (d < .5) for (let i = 0; i < 18; i++) s += `<circle cx="${(i * 197) % 1080}" cy="${260 + (i * 131) % 700}" r="${2 + i % 3}" fill="#fff" opacity="${f((1 - 2 * d) * (.4 + .4 * Math.sin(t * 3 + i)))}"/>`;
  const fg = d > .5 ? C.ink : '#fff';
  // headline per beat
  if (t < 1.6) s += hook(t, [['11 pm. A customer', '#fff'], ['wants to book.', C.peach]], 330, 92, { lh: 98 });
  else if (t < 6.0) s += big(t < 4.4 ? 'You reply at 9 am.' : 'Too late.', 540, 360, 92, fg);
  else if (t < 9.9) s += big('Same message.', 540, 320, 84, '#fff') + big('An AI agent replies.', 540, 410, 84, C.peach);
  // phone
  if (t < 9.9) {
    const mode = t < 6.0 ? 'owner' : 'agent';
    const sc = 1.5, x = 540 - 190 * sc, y = 520;
    s += phone(x, y, sc, chat(t, mode), { dark: true, time: clockStr(t) });
    s += `<g transform="translate(860 540)"><rect x="-150" y="-62" width="300" height="104" rx="52" fill="${C.ink}" stroke="${C.peach}" stroke-width="4"/>${mono(clockStr(t), 0, 14, 62, '#fff', { ls: 2 })}</g>`;
    if (t > 4.4 && t < 6.0) s += cross(900, 1100, 50, seg(t, 4.4, 4.6));
    if (t > 6.0) s += chip('DEMO', 170, 560, '#fff', C.ink, 24);
    if (t > 9.0) s += tick(900, 1250, 50, seg(t, 9.0, 9.2));
  }
  if (t > 4.6 && t < 6.0) s += `<rect width="1080" height="1920" fill="#000" opacity="${f(.55 * seg(t, 4.6, 4.8))}"/>` + lesson(t, 4.7, 'THIS is a', 'LOST BOOKING.', 1000, C.peach);
  // rewind streaks
  if (t > 6.0 && t < 6.5) for (let i = 0; i < 12; i++) s += `<rect x="0" y="${(i * 167 + t * 3000) % 1920}" width="1080" height="${6 + i % 3 * 4}" fill="#fff" opacity=".25"/>`;
  // end beat
  if (t >= 9.9) {
    s += `<rect width="1080" height="1920" fill="${C.navy}"/>`;
    const items = ['Answers at night', 'Books the table', 'Hard ones go to you'];
    s += big('Answered while', 540, 420, 100, '#fff') + big('you slept.', 540, 520, 100, C.peach);
    items.forEach((it, i) => {
      const k = eb(seg(t, 10.05 + i * .4, 10.35 + i * .4)); if (k <= 0) return; const y = 720 + i * 170;
      s += `<g transform="translate(540 ${y}) scale(${f(k)}) translate(-540 ${-y})"><rect x="130" y="${y - 66}" width="820" height="132" rx="66" fill="#1d2f5c"/>${tick(215, y, 40, 1)}${big(it, 280, y + 20, 54, '#fff', { a: 'start', ls: -1.5 })}</g>`;
    });
    const p = eb(seg(t, 11.3, 11.6));
    if (p > 0) s += `<g transform="translate(540 1290) scale(${f(p)}) translate(-540 -1290)">${chip('AI AGENTS FROM £875 + £109/MONTH', 540, 1300, C.red, '#fff', 30)}</g>`;
  }
  return s;
}
const R = K.reel(DUR, END, main, '', { bg: C.navy });
const fr = R.frame; R.frame = t => fr(t).replace('</defs>', sky(t) + '</defs>');
module.exports = R;
