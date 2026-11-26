const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const name = process.argv[2];
const only = process.argv[3] ? process.argv[3].split(',').map(Number) : null; // preview times
const reel = require('./' + name + '.js');
const OUTNAME = process.env.OUTNAME || name; // FROM/TO (seconds) render a part only, e.g. a trial's new opening
const FPS = 30;
// On-screen text English only (Bilal 22 Nov 15:29; captions stay EN+AR). Set KEEP_AR=1 to render the old bilingual look.
const AR_CH = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
function noAr(svg) {
  if (process.env.KEEP_AR) return svg;
  return svg
    .replace(/<span[^>]*PlexAr[^>]*>[^<]*<\/span>/g, '')
    .replace(/<div[^>]*PlexAr[^>]*>[^<]*<\/div>/g, '')
    .replace(/<text[^>]*PlexAr[^>]*>[^<]*<\/text>/g, '')
    .replace(/>([^<]*)</g, (m, x) => AR_CH.test(x) ? '>' + x.replace(/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\u0660-\u0669]+/g, '').replace(/\s*·\s*$/, '').replace(/^\s*·\s*/, '') + '<' : m);
}

const b64 = p => fs.readFileSync(path.join(__dirname, 'node_modules/@fontsource', p)).toString('base64');
const fonts = `
@font-face{font-family:Archivo;font-weight:800;src:url(data:font/woff2;base64,${b64('archivo/files/archivo-latin-800-normal.woff2')})}
@font-face{font-family:Archivo;font-weight:900;src:url(data:font/woff2;base64,${b64('archivo/files/archivo-latin-900-normal.woff2')})}
@font-face{font-family:Archivo;font-weight:800;font-style:italic;src:url(data:font/woff2;base64,${b64('archivo/files/archivo-latin-800-italic.woff2')})}
@font-face{font-family:JB;font-weight:700;src:url(data:font/woff2;base64,${b64('jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2')})}
@font-face{font-family:PlexAr;font-weight:700;src:url(data:font/woff2;base64,${b64('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-700-normal.woff2')})}`;

(async () => {
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.setContent(`<html><head><style>${fonts} html,body{margin:0;background:#000}svg{display:block}</style></head><body><div id="s"></div></body></html>`);
  await page.evaluate(() => Promise.all([document.fonts.load('900 40px Archivo'), document.fonts.load('800 40px Archivo'), document.fonts.load('italic 800 40px Archivo'), document.fonts.load('700 40px JB'), document.fonts.load('700 40px PlexAr', 'عربي')]));
  const draw = async t => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">${noAr(reel.frame(t))}</svg>`;
    await page.evaluate(h => { document.getElementById('s').innerHTML = h; }, svg);
  };
  const out = path.join(__dirname, 'out');
  fs.mkdirSync(out, { recursive: true });
  if (only) {
    for (const t of only) { await draw(t); await page.screenshot({ path: `${out}/${OUTNAME}_t${t}.png` }); }
    await browser.close(); return;
  }
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${out}/${OUTNAME}.mp4`], { stdio: ['pipe', 'inherit', 'inherit'] });
  const n = Math.round((process.env.TO ? +process.env.TO : reel.dur) * FPS);
  const i0 = Math.round((process.env.FROM ? +process.env.FROM : 0) * FPS);
  for (let i = i0; i < n; i++) {
    await draw(i / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('done', OUTNAME);
})();
