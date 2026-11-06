// Renders carousel slides (1080x1350) as PNG. Usage: node carousels.js
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const { C, txt, bracket, bug, check } = require('./lib');
const W = 1080, H = 1350, T = 1.0;

const b64 = p => fs.readFileSync(path.join(__dirname, 'node_modules/@fontsource', p)).toString('base64');
const fonts = `@font-face{font-family:Archivo;font-weight:800;src:url(data:font/woff2;base64,${b64('archivo/files/archivo-latin-800-normal.woff2')})}
@font-face{font-family:Archivo;font-weight:900;src:url(data:font/woff2;base64,${b64('archivo/files/archivo-latin-900-normal.woff2')})}
@font-face{font-family:JB;font-weight:700;src:url(data:font/woff2;base64,${b64('jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2')})}
@font-face{font-family:PlexAr;font-weight:700;src:url(data:font/woff2;base64,${b64('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-700-normal.woff2')})}`;

const lines = (arr, x, y, size, col, gap = 1.12, o = {}) => arr.map((l, i) => txt(l, x, y + i * size * gap, size, col, o)).join('');
function frameSlide(i, n, dark, body) {
  const bg = dark ? C.ink : C.paper, fg = dark ? '#fff' : C.ink;
  let s = `<rect width="${W}" height="${H}" fill="${bg}"/>`;
  s += `<text x="70" y="110" font-family="Archivo" font-weight="900" font-size="40" letter-spacing="1"><tspan fill="${dark ? C.peach : C.red}">[ </tspan><tspan fill="${fg}">BRACKET</tspan><tspan fill="${dark ? C.peach : C.red}"> ]</tspan></text>`;
  s += txt(`${i}/${n}`, W - 70, 108, 34, C.mute, { mono: true, anchor: 'end' });
  s += body;
  if (i < n) s += txt('swipe →', W - 70, H - 70, 32, C.mute, { mono: true, anchor: 'end' });
  return s;
}
function numbered(i, n, num, title, sub, dark = false, art = '') {
  const fg = dark ? '#fff' : C.ink;
  return frameSlide(i, n, dark, `
    ${txt(num, 70, 400, 220, dark ? C.peach : C.red, { anchor: 'start', ls: -6 })}
    ${lines(title, 70, 560, 92, fg, 1.1, { anchor: 'start' })}
    ${lines(sub, 70, 560 + title.length * 101 + 50, 44, C.mute, 1.35, { anchor: 'start', weight: 800, ls: 0 })}
    ${art}`);
}
function cta(i, n, head, sub, btn) {
  return frameSlide(i, n, true, `
    ${lines(head, 540, 360, 88, '#fff', 1.12)}
    ${bracket(130, 1060, 'L', T, { s: 1.05, mood: 'happy' })}${bracket(950, 1060, 'R', T, { s: 1.05, mood: 'happy' })}
    ${lines(sub, 540, 770, 46, C.peach, 1.3, { weight: 800, ls: 0 })}
    <rect x="250" y="900" width="580" height="108" rx="54" fill="${C.red}"/>${txt(btn, 540, 970, 46, '#fff', { weight: 800, ls: 0 })}
    ${txt('LINK IN BIO', 540, 1080, 30, C.mute, { mono: true })}`);
}
const decks = {
  'carousel1-5-signs': [
    frameSlide(1, 7, false, `${lines(['5 signs your', 'website is losing', 'customers'], 70, 380, 104, C.ink, 1.08, { anchor: 'start' })}${txt('(and you don’t know it)', 70, 760, 48, C.red, { anchor: 'start', weight: 800, ls: 0 })}
      ${bug(780, 1040, T, { s: 1.5, flip: -1, mood: 'cheeky' })}`),
    numbered(2, 7, '01', ['It’s slow on', 'phones.'], ['Most of your visitors are on mobile.', 'If it takes ages to load, they leave.']),
    numbered(3, 7, '02', ['Buttons that', 'do nothing.'], ['A “Book now” or “Order” button that', 'doesn’t work = a customer gone.']),
    numbered(4, 7, '03', ['Your contact form', 'never arrives.'], ['Messages get lost and you never', 'even know someone tried.']),
    numbered(5, 7, '04', ['No WhatsApp or', 'call button.'], ['In Kuwait, people want to message', 'you in one tap. Make it easy.']),
    numbered(6, 7, '05', ['It looks', 'outdated.'], ['An old site makes a good business', 'look closed. First impressions count.']),
    cta(7, 7, ['Spotted 2 or more?'], ['We test it and fix it.', 'Fixed scope. Fixed price.'], 'DM us “SITE”'),
  ],
  'carousel2-how-it-works': [
    frameSlide(1, 6, true, `${lines(['How a Bracket', 'project works'], 70, 420, 110, '#fff', 1.08, { anchor: 'start' })}${txt('Fixed scope. Fixed price. No surprises.', 70, 680, 46, C.peach, { anchor: 'start', weight: 800, ls: 0 })}
      ${bracket(330, 1220, 'L', T, { s: 1.3, mood: 'happy' })}${bracket(750, 1220, 'R', T, { s: 1.3, mood: 'happy' })}`),
    numbered(2, 6, '01', ['Scope & quote'], ['You tell us what you need.', 'We write it down and give you', 'one fixed price. No hourly clock.']),
    numbered(3, 6, '02', ['Kickoff & date'], ['We agree the ship date at the', 'start, not a guess at the end.', 'That’s the date we hit.']),
    numbered(4, 6, '03', ['Build or', 'break it'], ['Developers build. Testers try to', 'break it. Every bug gets tracked', 'until it’s closed.']),
    numbered(5, 6, '04', ['Ship & sign-off'], ['You get a clean handover and', 'a short support window after launch.']),
    cta(6, 6, ['Got a project?'], ['Websites + QA testing', 'for businesses in Kuwait.'], 'Start a project →'),
  ],
  'carousel3-launch-checklist': [
    frameSlide(1, 4, false, `${lines(['Before you launch', 'your website:'], 70, 400, 100, C.ink, 1.08, { anchor: 'start' })}${txt('the 8-point checklist', 70, 640, 64, C.red, { anchor: 'start' })}
      <rect x="70" y="720" width="320" height="76" rx="38" fill="${C.ink}"/>${txt('SAVE THIS ↓', 230, 770, 34, '#fff', { mono: true })}
      ${bracket(820, 1240, 'R', T, { s: 1.3, mood: 'happy' })}`),
    frameSlide(2, 4, false, checklist(['Works on iPhone & Android', 'Loads fast on mobile data', 'Every button & link clicked', 'Contact form tested fully'], 1)),
    frameSlide(3, 4, false, checklist(['WhatsApp / call button works', 'Spelling checked (EN + AR)', 'Address & hours correct', 'Share preview & icon set'], 5)),
    cta(4, 4, ['No time to check?'], ['We’ll test it before', 'your customers do.'], 'DM us “SITE”'),
  ],
};
function checklist(items, start) {
  return items.map((it, i) => {
    const y = 330 + i * 230;
    return `${check(140, y, 52, 1)}${txt(String(start + i).padStart(2, '0'), 230, y - 20, 34, C.red, { mono: true, anchor: 'start' })}${txt(it, 230, y + 40, 52, C.ink, { anchor: 'start', ls: -1 })}`;
  }).join('');
}

(async () => {
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.setContent(`<html><head><style>${fonts} html,body{margin:0}svg{display:block}</style></head><body><div id="s"></div></body></html>`);
  await page.evaluate(() => Promise.all([document.fonts.load('900 40px Archivo'), document.fonts.load('800 40px Archivo'), document.fonts.load('700 40px JB'), document.fonts.load('700 40px PlexAr', 'عربي')]));
  const out = path.join(__dirname, 'out', 'carousels'); fs.mkdirSync(out, { recursive: true });
  for (const [name, slides] of Object.entries(decks)) {
    fs.mkdirSync(path.join(out, name), { recursive: true });
    for (let i = 0; i < slides.length; i++) {
      await page.evaluate(h => { document.getElementById('s').innerHTML = h; }, `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${slides[i]}</svg>`);
      await page.screenshot({ path: path.join(out, name, `slide${i + 1}.png`) });
    }
  }
  await browser.close(); console.log('done');
})();
