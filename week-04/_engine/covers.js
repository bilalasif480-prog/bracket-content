// week-04 covers (instamake, 26 Nov 2026): one 1080x1920 JPG per reel, hook in big Archivo 900, small [ BRACKET ] mark only.
// Safe area: all text inside the centre 1080x1350 grid crop (y 285–1635) AND clear of the top 12% (y<230) and bottom 20% (y>1536),
// so text lives in y 300–1500. Usage: node covers.js  → ../covers/NN-name.jpg
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const K = require('./kit4');
const { C, big, ui, mono, f } = K;

const mark = (y, col = '#fff', b1 = C.red) => `<text x="540" y="${y}" font-family="Archivo" font-weight="900" font-size="44" text-anchor="middle" letter-spacing="-1" fill="${col}"><tspan fill="${b1}">[</tspan> BRACKET <tspan fill="${C.peach}">]</tspan></text>`;
const lines = (arr, y0, size, lh) => arr.map(([t, c], i) => big(t, 540, y0 + i * lh, size, c, { ls: -4 })).join('');

// motif helpers (simple, echo each reel)
const phoneM = (x, y, sc, inner, dark) => `<g transform="translate(${x} ${y}) scale(${sc})"><rect x="-10" y="-10" width="320" height="560" rx="44" fill="#151414"/><rect width="300" height="540" rx="36" fill="${dark ? '#0b141a' : '#fff'}"/>${inner}</g>`;
const spinner = (x, y, r, col) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${col}" stroke-opacity=".25" stroke-width="12"/><path d="M${x} ${y - r} A${r} ${r} 0 0 1 ${x + r} ${y}" fill="none" stroke="${col}" stroke-width="12" stroke-linecap="round"/>`;
const pin = (x, y, s, col) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 C -10 -22, -36 -40, -36 -66 A36 36 0 1 1 36 -66 C 36 -40, 10 -22, 0 0 Z" fill="${col}"/><circle cy="-66" r="13" fill="#fff"/></g>`;

const COVERS = [
  ['01-slow-site', C.ink, s => s + spinner(540, 1180, 120, C.peach) + lines([['Your customer', '#fff'], ['is about', C.peach], ['to leave.', C.peach]], 620, 126, 140)],
  ['02-bilal-films-ai-answer', '#141414', s => s + `<rect x="80" y="1040" width="920" height="300" rx="30" fill="#2a2a2a"/>${ui('Best café in Ancoats?', 130, 1120, 44, '#bdbdbd', { w: 600 })}<circle cx="150" cy="1220" r="26" fill="${C.green}"/>${ui('Try …', 200, 1236, 50, '#fff', { w: 700 })}` + lines([['Are you in', '#fff'], ['the AI answer?', C.peach]], 640, 140, 150)],
  ['03-pay-upfront', C.paper, s => s + `<g transform="translate(540 1230) rotate(-10)"><rect x="-300" y="-80" width="600" height="160" rx="16" fill="none" stroke="${C.red}" stroke-width="12"/>${big('PAY LATER', 0, 36, 100, C.red, { ls: -1 })}</g>${mono('FOUNDING OFFER · FIRST 5 CLIENTS', 540, 1400, 34, C.ink)}` + lines([['Your site first.', C.ink], ['Pay when', C.red], ['happy.', C.red]], 560, 140, 145)],
  ['04-night-booking', C.navy, s => s + `<circle cx="860" cy="420" r="70" fill="#f4f1e8"/>` + `<g transform="translate(540 1230)"><rect x="-250" y="-90" width="500" height="150" rx="75" fill="${C.ink}" stroke="${C.peach}" stroke-width="6"/>${mono('23:04', 0, 26, 100, '#fff', { ls: 4 })}</g>` + lines([['11 pm.', '#fff'], ['Who answers', C.peach], ['the booking?', C.peach]], 620, 140, 145)],
  ['05-book-challenge', C.peach, s => s + `<g transform="translate(540 1240)"><circle r="160" fill="${C.ink}"/>${mono('10.0', 0, 34, 100, '#fff', { ls: 0 })}</g>` + lines([['Book a table', C.ink], ['in under', C.ink], ['10 seconds?', '#fff']], 560, 140, 145)],
  ['06-maps-invisible', '#eceae4', s => s + pin(300, 1300, 1.6, '#ea4335') + pin(780, 1250, 1.6, '#ea4335') + `<g transform="translate(540 1290)"><circle r="70" fill="#fff" stroke="${C.red}" stroke-width="8" stroke-dasharray="16 12"/>${big('?', 0, 34, 100, C.red, { ls: 0 })}</g>` + `<rect x="60" y="440" width="960" height="560" rx="40" fill="${C.ink}"/>` + lines([['Open today.', '#fff'], ['Invisible', C.peach], ['on Maps.', C.peach]], 600, 140, 145)],
  ['07-broken-form', C.paper, s => s + `<rect x="140" y="1160" width="800" height="120" rx="60" fill="${C.red}"/>${ui('Send', 540, 1238, 54, '#fff', { w: 700, a: 'middle' })}<rect x="140" y="1310" width="800" height="70" rx="14" fill="#fde8e4"/>${ui('Something went wrong.', 540, 1358, 34, C.red, { w: 600, a: 'middle' })}` + lines([['This form', C.ink], ['just lost you', C.red], ['a booking.', C.red]], 600, 140, 145)],
  ['08-juggling-messages', '#1b1a19', s => s + [[300, 1250, C.wa], [540, 1150, C.blue], [780, 1250, C.red]].map(([x, y, c]) => `<rect x="${x - 80}" y="${y - 80}" width="160" height="160" rx="40" fill="${c}" transform="rotate(${(x - 540) / 20} ${x} ${y})"/>`).join('') + `<rect x="50" y="430" width="980" height="540" rx="12" fill="#fff"/>` + lines([['Me answering', C.ink], ['messages', C.ink], ['at 11 pm:', C.red]], 590, 124, 140)],
  ['09-stamp-card', '#d8c3a0', s => s + `<g transform="translate(540 1270) rotate(-12)"><rect x="-300" y="-140" width="600" height="280" rx="20" fill="#fffaf0" stroke="#c9b48a" stroke-width="4"/>${[0, 1, 2, 3, 4].map(i => `<circle cx="${-200 + i * 100}" cy="0" r="36" fill="${i < 4 ? C.red : 'none'}" stroke="#c9b48a" stroke-width="4"/>`).join('')}</g>` + lines([['Your stamp card', C.ink], ['ends up', C.red], ['in the bin.', C.red]], 560, 112, 135)],
  ['10-barber-build', C.ink, s => s + `<g transform="translate(540 1250)">${[[-300, -110, 600, 60, C.peach], [-300, -30, 380, 140, '#f6e4d9'], [100, -30, 200, 140, C.red]].map(([x, y, w, h, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${c}"/>`).join('')}<rect x="-300" y="130" width="600" height="60" rx="16" fill="none" stroke="${C.peach}" stroke-width="5" stroke-dasharray="14 10"/></g>` + lines([['Building a', '#fff'], ['barber’s', C.peach], ['website.', C.peach]], 600, 140, 145)],
  ['11-cafe-whole-system', C.red, s => s + ['Menu', 'Booking', 'Map', 'Collect'].map((m, i) => `<g transform="translate(${i % 2 ? 760 : 320} ${1170 + Math.floor(i / 2) * 140})"><rect x="-190" y="-55" width="380" height="110" rx="55" fill="#fff"/>${ui(m, 0, 16, 46, C.ink, { w: 700, a: 'middle' })}</g>`).join('') + lines([['Café owners:', '#fff'], ['not just', C.ink], ['a website.', C.ink]], 560, 140, 145)],
  ['12-bilal-films-paper-menu', C.paper, s => s + `<g transform="translate(540 1260)"><path d="M-220 -140 L-10 -140 L20 -60 L-20 20 L15 140 L-220 140 Z" fill="#fff" stroke="#c9c2bb" stroke-width="5" transform="rotate(-8)"/><path d="M10 -140 L220 -140 L220 140 L35 140 L0 20 L40 -60 Z" fill="#fff" stroke="#c9c2bb" stroke-width="5" transform="rotate(8) translate(40 0)"/>${big('MENU', -110, -40, 56, C.ink, { ls: 0 })}</g>` + lines([['Your menu', C.ink], ['shouldn’t be', C.red], ['on paper.', C.red]], 580, 140, 145)],
  ['13-ai-pick', '#141414', s => s + `<rect x="90" y="1130" width="420" height="250" rx="26" fill="#fff" stroke="${C.green}" stroke-width="10"/>${big('Café A', 300, 1270, 70, C.ink, { ls: -2 })}<rect x="570" y="1130" width="420" height="250" rx="26" fill="#fff" opacity=".4"/>${big('Café B', 780, 1270, 70, C.ink, { ls: -2 })}` + lines([['Which café', '#fff'], ['would ChatGPT', C.peach], ['pick?', C.peach]], 600, 118, 140)],
  ['14-price-dm', '#0d0d0d', s => s + `<circle cx="540" cy="860" r="420" fill="#fff"/>` + ['“I’ll send you', 'the price', 'in DM.”'].map((l, i) => K.T(l, 540, 770 + i * 140, 120, C.red, { font: 'I', ls: -4 })).join('') + big('That’s how you lose them.', 540, 1420, 66, C.peach, { ls: -2 })],
];

(async () => {
  const b64 = p => fs.readFileSync(path.join(__dirname, 'node_modules/@fontsource', p)).toString('base64');
  const fonts = `@font-face{font-family:Archivo;font-weight:900;src:url(data:font/woff2;base64,${b64('archivo/files/archivo-latin-900-normal.woff2')})}
@font-face{font-family:Archivo;font-weight:800;font-style:italic;src:url(data:font/woff2;base64,${b64('archivo/files/archivo-latin-800-italic.woff2')})}
@font-face{font-family:JB;font-weight:700;src:url(data:font/woff2;base64,${b64('jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2')})}
@font-face{font-family:Inter;font-weight:600;src:url(data:font/woff2;base64,${b64('inter/files/inter-latin-600-normal.woff2')})}
@font-face{font-family:Inter;font-weight:700;src:url(data:font/woff2;base64,${b64('inter/files/inter-latin-700-normal.woff2')})}`;
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.setContent(`<html><head><style>${fonts} html,body{margin:0}svg{display:block}</style></head><body><div id="s"></div></body></html>`);
  await page.evaluate(() => Promise.all([document.fonts.load('900 40px Archivo'), document.fonts.load('italic 800 40px Archivo'), document.fonts.load('700 40px JB'), document.fonts.load('600 40px Inter'), document.fonts.load('700 40px Inter')]));
  const out = path.join(__dirname, '../covers'); fs.mkdirSync(out, { recursive: true });
  const only = process.argv[2];
  for (const [name, bg, draw] of COVERS) {
    if (only && !name.startsWith(only)) continue;
    const dark = [C.ink, C.navy, '#141414', '#1b1a19', '#0d0d0d', C.red].includes(bg);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><rect width="1080" height="1920" fill="${bg}"/>${draw('')}${mark(1500, dark ? '#fff' : C.ink, bg === C.red ? C.ink : C.red)}</svg>`;
    await page.evaluate(h => { document.getElementById('s').innerHTML = h; }, svg);
    await page.screenshot({ path: `${out}/${name}.jpg`, type: 'jpeg', quality: 90 });
  }
  await browser.close(); console.log('covers done');
})();
