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
    ${txt('QA WORD', 70, 300, 34, C.red, { mono: true, anchor: 'start' })}
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
  'day2-carousel-white-friday': [
    frameSlide(1, 7, true, `${lines(['Is your sale page', 'White Friday', 'ready?'], 70, 360, 104, '#fff', 1.08, { anchor: 'start' })}
      ${txt('صفحة عرضك جاهزة للجمعة البيضاء؟', W - 70, 730, 60, C.peach, { anchor: 'end' })}
      ${txt('5 things to build in before the sale', 70, 830, 44, C.mute, { anchor: 'start', weight: 800, ls: 0 })}
      ${txt('٥ أشياء لازم تكون فيها قبل العرض', W - 70, 900, 42, C.mute, { anchor: 'end' })}
      ${bug(800, 1110, T, { s: 1.3, flip: -1, mood: 'cheeky' })}`),
    nb(2, 7, '01', ['The offer, in', '3 seconds.'], 'العرض واضح من أول نظرة', ['Big price, big discount, one photo.', 'Nobody should hunt for the deal.'], 'السعر والخصم واضحين بدون تدوير'),
    nb(3, 7, '02', ['A deadline', 'people can see.'], 'موعد نهاية العرض واضح', ['Show when the sale ends,', 'on the product page too.'], 'خل العميل يعرف متى يخلص العرض'),
    nb(4, 7, '03', ['Checkout built', 'for phones.'], 'دفع سهل من الجوال', ['Big buttons, a short form,', 'no pinching and zooming.'], 'أزرار كبيرة وخطوات قليلة'),
    nb(5, 7, '04', ['KNET at', 'checkout.'], 'كي نت وقت الدفع', ['Shoppers in Kuwait expect it.', 'Test a real payment before launch.'], 'جرّب دفعة حقيقية قبل الإطلاق'),
    nb(6, 7, '05', ['A chat button', 'that works.'], 'زر واتساب يشتغل صج', ['Tap it on a phone, and from', 'Instagram’s browser too.'], 'جرّبه من الجوال ومن داخل إنستقرام'),
    cta2(7, 7, ['Sale coming?'], 'عندك عرض جاي؟', ['We build it, then we test it', 'before the rush.'], 'نبنيها ونختبرها قبل الزحمة', 'Start a project →'),
  ],
  'day4-carousel-store-page': [
    frameSlide(1, 7, false, `${lines(['What your Kuwait', 'store page', 'must show'], 70, 360, 104, C.ink, 1.08, { anchor: 'start' })}
      ${txt('شنو لازم يبين في صفحة متجرك', W - 70, 730, 62, C.red, { anchor: 'end' })}
      <rect x="70" y="790" width="560" height="70" rx="35" fill="${C.ink}"/>${txt('SAVE THIS CHECKLIST ↓', 350, 836, 30, '#fff', { mono: true })}
      ${txt('From Kuwait’s new Digital Commerce Law', 70, 940, 34, C.mute, { anchor: 'start', weight: 800, ls: 0 })}${txt('(not in force yet).', 70, 985, 34, C.mute, { anchor: 'start', weight: 800, ls: 0 })}
      ${bracket(900, 1190, 'R', T, { s: 0.95, mood: 'happy', look: -1 })}`),
    nb(2, 7, '01', ['Trade name +', 'registration no.'], 'الاسم التجاري ورقم القيد', ['In the footer, on every page.'], 'في أسفل كل صفحة'),
    nb(3, 7, '02', ['How to', 'reach you.'], 'طريقة التواصل معاك', ['Phone, email and address,', 'easy to find.'], 'تلفون وإيميل وعنوان واضحين'),
    nb(4, 7, '03', ['Clear final', 'prices.'], 'السعر النهائي واضح', ['The full price before checkout.', 'No surprises at the last step.'], 'بدون مفاجآت آخر خطوة'),
    nb(5, 7, '04', ['Your return', 'policy.'], 'سياسة الاسترجاع', ['Written clearly and easy to', 'find before someone pays.'], 'مكتوبة وواضحة قبل الدفع'),
    nb(6, 7, '05', ['An Arabic', 'e-invoice.'], 'فاتورة إلكترونية بالعربي', ['A clear invoice in Arabic', 'for every order.'], 'لكل طلب فاتورة بالعربي'),
    cta2(7, 7, ['We build it in.'], 'نبنيها في موقعك من البداية', ['Checklist, not legal advice.', 'Confirm with the ministry or a lawyer.'], 'مو استشارة قانونية', 'Start a project →'),
  ],
  'day6-carousel-qa-words': [
    frameSlide(1, 7, true, `${lines(['QA words,', 'in Kuwaiti.'], 70, 400, 120, '#fff', 1.08, { anchor: 'start' })}
      ${txt('كلمات الـQA بالكويتي', W - 70, 650, 72, C.peach, { anchor: 'end' })}
      <rect x="70" y="720" width="330" height="76" rx="38" fill="${C.red}"/>${txt('SAVE THIS ↓', 235, 770, 34, '#fff', { mono: true })}
      ${txt('احفظها', W - 70, 775, 52, '#fff', { anchor: 'end' })}
      ${bug(300, 1100, T, { s: 1.2, mood: 'cheeky' })}${bracket(860, 1250, 'R', T, { s: 1.0, mood: 'happy', look: -1 })}`),
    word(2, 7, 'Bug', 'بق (خلل)', ['Something that doesn’t work', 'the way it should.'], 'شي ما يشتغل مثل ما المفروض', bug(860, 300, T, { s: 0.6, flip: -1 })),
    word(3, 7, 'Smoke test', 'فحص سريع', ['A quick check first: does it open?', 'Can you log in? Can you pay?'], 'الموقع يفتح؟ الدخول يمشي؟ الدفع يمشي؟'),
    word(4, 7, 'Regression', 'شي قديم خرب', ['You fixed one thing. Check that', 'nothing else broke.'], 'صلحنا شي؟ نتأكد ما خرب شي ثاني'),
    word(5, 7, 'RTL check', 'فحص العربي', ['Arabic reads right to left.', 'The layout has to, too.'], 'العربي من اليمين… والتصميم بعد'),
    word(6, 7, 'Real device', 'جوال حقيقي', ['Test on real phones,', 'not just a laptop window.'], 'نجرب على جوالات حقيقية مو بس اللابتوب'),
    cta2(7, 7, ['Send this to', 'your developer.'], 'أرسلها للمبرمج', ['We build it and we test it,', 'one team.'], 'نبني ونختبر، فريق واحد', 'Start a project →'),
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
