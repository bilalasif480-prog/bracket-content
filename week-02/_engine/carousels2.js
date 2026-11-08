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
// numbered slide with Arabic under the English title
function nb(i, n, num, title, ar, sub, subAr, dark = false) {
  const fg = dark ? '#fff' : C.ink;
  const ty = 560, arY = ty + (title.length - 1) * 101 + 96;
  return frameSlide(i, n, dark, `
    ${txt(num, 70, 400, 220, dark ? C.peach : C.red, { anchor: 'start', ls: -6 })}
    ${lines(title, 70, ty, 92, fg, 1.1, { anchor: 'start' })}
    ${txt(ar, W - 70, arY, 64, dark ? C.peach : C.red, { anchor: 'end' })}
    ${lines(sub, 70, arY + 110, 42, C.mute, 1.35, { anchor: 'start', weight: 800, ls: 0 })}
    ${txt(subAr, W - 70, arY + 110 + sub.length * 57 + 30, 40, C.mute, { anchor: 'end' })}`);
}
// glossary slide: English word, Arabic word, meaning EN + AR
function word(i, n, en, ar, sub, subAr, art = '') {
  return frameSlide(i, n, false, `
    ${txt('PROJECT WORD', 70, 300, 34, C.red, { mono: true, anchor: 'start' })}
    ${txt(en, 70, 450, en.length > 10 ? 104 : 124, C.ink, { anchor: 'start' })}
    ${txt(ar, W - 70, 580, 84, C.red, { anchor: 'end' })}
    <rect x="70" y="650" width="940" height="6" rx="3" fill="${C.ink}" opacity=".1"/>
    ${lines(sub, 70, 760, 48, C.ink, 1.3, { anchor: 'start', weight: 800, ls: 0 })}
    ${txt(subAr, W - 70, 760 + sub.length * 62 + 50, 46, C.mute, { anchor: 'end' })}
    ${art}`);
}
function cta2(i, n, head, ar, sub, subAr, btn) {
  return frameSlide(i, n, true, `
    ${lines(head, 540, 330, 88, '#fff', 1.12)}
    ${txt(ar, 540, 330 + (head.length - 1) * 99 + 92, 60, C.peach)}
    ${lines(sub, 540, 610, 44, '#fff', 1.3, { weight: 800, ls: 0 })}
    ${txt(subAr, 540, 610 + sub.length * 57 + 20, 42, C.peach)}
    <rect x="250" y="880" width="580" height="108" rx="54" fill="${C.red}"/>${txt(btn, 540, 950, 46, '#fff', { weight: 800, ls: 0 })}
    ${txt('LINK IN BIO · الرابط في البايو', 540, 1060, 30, C.mute, { mono: true })}
    ${bracket(130, 1250, 'L', T, { s: 0.75, mood: 'happy' })}${bracket(950, 1250, 'R', T, { s: 0.75, mood: 'happy' })}`);
}
const decks = {
  'A-5-things-site-needs': [
    frameSlide(1, 7, false, `${lines(['5 things every', 'business website', 'needs'], 70, 360, 100, C.ink, 1.08, { anchor: 'start' })}
      ${txt('٥ أشياء لازم تكون بموقع أي نشاط', W - 70, 730, 60, C.red, { anchor: 'end' })}
      <rect x="70" y="790" width="520" height="70" rx="35" fill="${C.ink}"/>${txt('SAVE THIS CHEAT SHEET ↓', 330, 836, 28, '#fff', { mono: true })}
      ${bracket(880, 1180, 'R', T, { s: 1.0, mood: 'happy', look: -1 })}`),
    nb(2, 7, '01', ['Say what you do', 'in one line.'], 'اكتب شنو تسوي بسطر واحد', ['If visitors can’t tell what you do', 'quickly, they leave.'], 'الزائر ما راح ينتظر يفهم شنو تسوي'),
    nb(3, 7, '02', ['Made for', 'phones first.'], 'مصمم للجوال أول', ['Most visitors arrive on a phone.', 'Check it on a real one.'], 'جرّبه على جوال حقيقي'),
    nb(4, 7, '03', ['A contact button', 'that works.'], 'زر تواصل يشتغل', ['WhatsApp, call or form.', 'Tap it before you launch.'], 'واتساب أو اتصال أو نموذج… جرّبه'),
    nb(5, 7, '04', ['Arabic and', 'English.'], 'عربي وإنجليزي', ['Both versions read properly,', 'right to left included.'], 'والعربي من اليمين لليسار'),
    nb(6, 7, '05', ['Loads fast.'], 'يفتح بسرعة', ['Light images, no clutter.', 'Slow pages lose visitors.'], 'صور خفيفة وبدون زحمة'),
    cta2(7, 7, ['Missing one?'], 'ناقصك واحد منهم؟', ['We build all five in,', 'then test them.'], 'نبنيها كلها ونختبرها', 'Start a project →'),
  ],
  'B-website-app-both': [
    frameSlide(1, 6, true, `${lines(['Website,', 'app, or both?'], 70, 400, 120, '#fff', 1.08, { anchor: 'start' })}
      ${txt('موقع… تطبيق… ولا الثنين؟', W - 70, 660, 72, C.peach, { anchor: 'end' })}
      <rect x="70" y="730" width="480" height="76" rx="38" fill="${C.red}"/>${txt('A QUICK GUIDE ↓', 310, 780, 32, '#fff', { mono: true })}
      ${bracket(130, 1160, 'L', T, { s: 1.1, mood: 'happy' })}${bracket(950, 1160, 'R', T, { s: 1.1, mood: 'happy' })}`),
    nb(2, 6, 'WEB', ['Start with a', 'website if…'], 'ابدأ بموقع إذا…', ['People find you on Google.', 'You need a clear page, fast.'], 'الناس تلقاك بقوقل وتبي صفحة واضحة'),
    nb(3, 6, 'APP', ['Build an app', 'if…'], 'سوّ تطبيق إذا…', ['Customers come back daily,', 'or you need alerts and accounts.'], 'العميل يرجع كل يوم أو تبي إشعارات'),
    nb(4, 6, 'BOTH', ['Both, when', 'it grows.'], 'الثنين لما يكبر الشغل', ['The site brings people in.', 'The app keeps them.'], 'الموقع يجيب الناس… والتطبيق يخليهم'),
    nb(5, 6, '?', ['Still not sure?'], 'للحين محتار؟', ['Tell us the idea.', 'We will say what to build first.'], 'قل لنا الفكرة ونقول لك من وين نبدأ'),
    cta2(6, 6, ['Websites. Apps.'], 'مواقع. تطبيقات.', ['One team builds', 'and tests them.'], 'فريق واحد يبني ويختبر', 'Start a project →'),
  ],
  'C-fixed-scope-explained': [
    frameSlide(1, 6, false, `${lines(['"Fixed scope."', 'What it', 'really means.'], 70, 360, 104, C.ink, 1.08, { anchor: 'start' })}
      ${txt('"شغل محدد" شنو معناها فعلاً', W - 70, 730, 62, C.red, { anchor: 'end' })}
      <rect x="70" y="790" width="420" height="70" rx="35" fill="${C.ink}"/>${txt('SWIPE ↓', 280, 836, 30, '#fff', { mono: true })}
      ${bracket(880, 1180, 'R', T, { s: 1.0, mood: 'happy', look: -1 })}`),
    word(2, 6, 'Scope', 'نطاق الشغل', ['What we will build, written down', 'before we start.'], 'شنو راح نبني… مكتوب قبل نبدأ'),
    word(3, 6, 'Change request', 'طلب تعديل', ['Something new mid-project?', 'We quote it. No surprises.'], 'شي جديد وسط المشروع؟ نعطيك سعره'),
    word(4, 6, 'Fixed price', 'سعر ثابت', ['The price we agree on', 'is the price you pay.'], 'السعر المتفق عليه هو اللي تدفعه'),
    word(5, 6, 'Handover', 'التسليم', ['You get the finished site,', 'tested and ready.'], 'تستلم الموقع جاهز ومفحوص'),
    cta2(6, 6, ['No surprises.'], 'بدون مفاجآت', ['Scope and price,', 'agreed first.'], 'الشغل والسعر نتفق عليهم أول', 'Start a project →'),
  ],
};
(async () => {
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.setContent(`<html><head><style>${fonts} html,body{margin:0}svg{display:block}</style></head><body><div id="s"></div></body></html>`);
  await page.evaluate(() => Promise.all([document.fonts.load('900 40px Archivo'), document.fonts.load('800 40px Archivo'), document.fonts.load('700 40px JB'), document.fonts.load('700 40px PlexAr', 'عربي')]));
  const out = path.join(__dirname, 'out', 'carousels2'); fs.mkdirSync(out, { recursive: true });
  for (const [name, slides] of Object.entries(decks)) {
    fs.mkdirSync(path.join(out, name), { recursive: true });
    for (let i = 0; i < slides.length; i++) {
      await page.evaluate(h => { document.getElementById('s').innerHTML = h; }, `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${slides[i]}</svg>`);
      await page.screenshot({ path: path.join(out, name, `slide${i + 1}.png`) });
    }
  }
  await browser.close(); console.log('done');
})();
