// R11 (Mon 7 Dec 14:30): "Which café would ChatGPT recommend?" Hooks-bank #3 Challenge question (split-screen comparison, #5 without a face).
// Template: split screen + AI chat (dark UI). Problem: "How do you get ChatGPT to recommend your business?" (sheet top 5 #3). Service: GEO (+SEO).
// Both cafés and the AI answer are DEMO mock-ups. No promise of AI citations ("easier for AI to read"). Price from profile: GEO from £215/month.
const K = require('./kit4');
const { C, seg, eo, eb, f, lerp, big, ui, mono, tick, cross, chip, hook } = K;
const DUR = 14, END = 12.2;

function card(x, y, w, h, title, kind, t, dim, glow) {
  let s = `<g opacity="${f(1 - .6 * dim)}">`;
  if (glow > 0) s += `<rect x="${x - 10}" y="${y - 10}" width="${w + 20}" height="${h + 20}" rx="38" fill="none" stroke="${C.green}" stroke-width="8" opacity="${f(glow)}"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="30" fill="#fff"/>` + big(title, x + 30, y + 62, 40, C.ink, { a: 'start', ls: -1 }) + ui(kind === 'site' ? 'Website' : 'Instagram only', x + 30, y + 100, 24, C.grey, { w: 600 });
  if (kind === 'site') {
    const rows = ['Menu', 'Opening hours', 'Book a table', 'FAQs', 'Address + map'];
    rows.forEach((r, i) => { const yy = y + 160 + i * 78, a = .4 + i * .35; s += `<rect x="${x + 24}" y="${yy - 34}" width="${w - 48}" height="60" rx="14" fill="#f5f1ed"/>` + ui(r, x + 44, yy + 6, 28, C.ink, { w: 600 }) + tick(x + w - 60, yy - 4, 20, seg(t, a, a + .2)); });
  } else {
    for (let i = 0; i < 9; i++) s += `<rect x="${x + 24 + (i % 3) * ((w - 60) / 3 + 6)}" y="${y + 130 + Math.floor(i / 3) * 112}" width="${(w - 60) / 3}" height="104" rx="8" fill="${['#e8c6b0', '#d9a88a', '#f0dccd'][i % 3]}"/>`;
    const q = ['Hours?', 'Menu?', 'Booking?'], n = [.6, 1.05, 1.5].filter(a => t > a).length;
    s += `<rect x="${x + 24}" y="${y + 480}" width="${w - 48}" height="${h - 504}" rx="14" fill="#fde8e4"/>`;
    if (n) s += ui(q.slice(0, n).join('  '), x + 44, y + 532, 28, C.red, { w: 700 }) + ui('not on a page AI can read', x + 44, y + 572, 22, C.red);
  }
  return s + '</g>';
}

function main(t) {
  let s = `<rect width="1080" height="1920" fill="#141414"/>`;
  if (t < 9.8) {
    const pick = seg(t, 5.3, 5.6);
    // scanning beam at frame 0 (AI "reading" both)
    const by = 560 + ((180 + t * 520) % 600);
    s += card(40, 520, 485, 640, 'Café A', 'site', t, 0, pick) + card(555, 520, 485, 640, 'Café B', 'insta', t, pick, 0);
    if (t < 3.2) s += `<rect x="30" y="${f(by)}" width="1020" height="6" fill="${C.peach}" opacity=".9"/><rect x="30" y="${f(by - 60)}" width="1020" height="60" fill="${C.peach}" opacity=".12"/>`;
    s += chip('DEMO', 540, 1200, '#fff', C.ink, 22);
    // AI chat answer streaming 2.6–5.3
    {
      const k = 1, qq = 'You: brunch in Ancoats this Sunday?', qn = Math.min(qq.length, 12 + Math.round(t * 20));
      s += `<g opacity="${f(k)}"><rect x="40" y="1240" width="1000" height="300" rx="30" fill="#2a2a2a"/>${ui(qq.slice(0, qn), 80, 1300, 28, '#bdbdbd', { w: 600 })}`;
      const ans = 'Try Café A: their site lists the menu, Sunday hours and table booking.';
      const n = Math.round(ans.length * K.clamp((t - 2.9) / 2.2));
      const words = ans.slice(0, n), l1 = words.slice(0, 38), l2 = words.slice(38);
      s += (t < 2.9 ? [0, 1, 2].map(i => `<circle cx="${100 + i * 26}" cy="1385" r="8" fill="#888" opacity="${f(.3 + .7 * Math.abs(Math.sin(t * 6 + i)))}"/>`).join('') : '') + `<circle cx="96" cy="1380" r="22" fill="${C.green}" opacity="${t > 2.9 ? 1 : 0}"/>` + ui(l1, 134, 1392, 32, '#fff', { w: 600 }) + ui(l2, 134, 1440, 32, '#fff', { w: 600 }) + '</g>';
    }
    if (t > 5.6 && t < 9.8) s += cross(797, 840, 60, seg(t, 5.6, 5.8)) + chip('NOT MENTIONED', 797, 960, C.red, '#fff', 30);
    if (t < 5.6) s += hook(t, [['Which café would', '#fff'], ['ChatGPT recommend?', C.peach]], 320, 88, { lh: 96 });
    else s += big('AI can only recommend', 540, 320, 76, '#fff', { ls: -2 }) + big('what it can read.', 540, 410, 76, C.peach, { ls: -2 });
    // 7.2–9.8 checklist overlay replaces the answer box
    if (t > 7.2) {
      const k = eo(seg(t, 7.2, 7.5));
      s += `<rect x="40" y="1240" width="1000" height="300" rx="30" fill="#fff" opacity="${f(k)}"/>`;
      ['Clear pages for each service', 'FAQs in your customers’ words', 'Same details on Google + site'].forEach((it, i) => { const a = 7.35 + i * .45; s += tick(100, 1300 + i * 90, 26, seg(t, a, a + .2)) + ui(it, 145, 1312 + i * 90, 36, C.ink, { w: 700, op: eo(seg(t, a, a + .2)) }); });
    }
  } else {
    s += `<rect width="1080" height="1920" fill="${C.ink}"/>`;
    const ks = [9.8, 10.3, 10.8].map(a => eb(seg(t, a, a + .3)));
    if (ks[0] > 0) s += `<g transform="translate(540 680) scale(${f(ks[0])}) translate(-540 -680)">${big('Make your business', 540, 640, 104, '#fff')}${big('easy for AI to read.', 540, 760, 104, C.peach)}</g>`;
    if (ks[1] > 0) s += `<g opacity="${f(ks[1])}">${ui('ChatGPT · Perplexity · Gemini · Google AI Overviews', 540, 920, 34, '#cfc9c4', { a: 'middle', w: 600 })}</g>`;
    if (ks[2] > 0) s += `<g transform="translate(540 1090) scale(${f(ks[2])}) translate(-540 -1090)">${chip('GEO FROM £215/MONTH', 540, 1100, C.red, '#fff', 38)}</g>`;
  }
  return s;
}
module.exports = K.reel(DUR, END, main);
