// 239 Parfum: "Guess the price" (trial reels A/B for @parfum_239, sample by Bracket)
// Format card #1 (price reveal) from clients/parfum-239/insta/research/niche-report.md.
// One script, two variants: only the hook (0 to ~2.4 s) differs. Everything after is identical.
// Render: copy this file + reel-guess-A.js / reel-guess-B.js into an engine folder and run
//   node render.js reel-guess-A   (fonts: Cormorant Garamond, Inter, IBM Plex Sans Arabic)

// ===== PRICE: must be confirmed by the owner before posting. Change it here only. =====
const PRICE = '6.900';          // shown on @parfum_239's own posts for No. 001 / 200 ml
const CUR_EN = 'KD', CUR_AR = 'د.ك';
const UNDER = '7';              // variant B hook "for under 7 KD?"; must stay above PRICE
// (the spoken price is in cue-guess-A.json / cue-guess-B.json: change it there too)
// =====================================================================================

const K = { black: '#070504', deep: '#120b07', gold: '#d4a373', lgold: '#f1cfa4', copper: '#b5652b', cream: '#f4ead9', mute: '#8f7f70' };
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const eo = k => 1 - Math.pow(1 - clamp(k), 3);
const eio = k => { k = clamp(k); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
const lerp = (a, b, k) => a + (b - a) * k;
const f = n => (+n).toFixed(2);

// timeline (seconds)

// ---------- text ----------
const SERIF = "'Cormorant Garamond', serif", SANS = 'Inter, sans-serif', AR = 'PlexAr, sans-serif';
function tx(s, x, y, size, fill, o = {}) {
  const { anchor = 'middle', weight = 500, op = 1, ls = 0, fam = SERIF, italic = false, rtl = false, stroke = '' } = o;
  return `<text x="${f(x)}" y="${f(y)}" font-family="${fam}" font-weight="${weight}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" opacity="${f(op)}" letter-spacing="${ls}" style="font-variant-numeric:lining-nums"${italic ? ' font-style="italic"' : ''}${rtl ? ' direction="rtl" unicode-bidi="embed"' : ''}${stroke}>${s}</text>`;
}
// slow luxurious reveal: rises 26px, fades in over 0.8 s, letter-spacing settles; fades out at [o1,o2]
function rv(s, x, y, size, fill, t, a, o = {}) {
  const k = eo(seg(t, a, a + 0.9));
  let op = clamp((t - a) / 0.7);
  if (o.out) op *= 1 - seg(t, o.out, o.out + 0.45);
  if (op <= 0) return '';
  return tx(s, x, y + (1 - k) * 26, size, fill, { ...o, op: op * (o.op ?? 1) });
}
const rule = (x, y, w, t, a, op = 1) => { const k = eio(seg(t, a, a + 1)); return k > 0 ? `<rect x="${f(x - w * k / 2)}" y="${y}" width="${f(w * k)}" height="2" fill="${K.gold}" opacity="${f(op * .8)}"/>` : ''; };

// ---------- atmosphere ----------
const rnd = (() => { let s = 239; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
const P = Array.from({ length: 80 }, () => ({ x: rnd() * 1080, y: rnd() * 1920, v: 14 + rnd() * 38, r: 1.2 + rnd() * 3.2, ph: rnd() * 6.28, dx: rnd() * 30 - 15 }));
const MIST = [[200, 1500, 520, 0.15, 0], [880, 1250, 600, 0.12, 2], [540, 1700, 700, 0.14, 4], [760, 600, 460, 0.07, 1]];
const defs = `<defs>
<radialGradient id="bg" cx="50%" cy="54%" r="70%"><stop offset="0" stop-color="#24150c"/><stop offset=".55" stop-color="${K.deep}"/><stop offset="1" stop-color="${K.black}"/></radialGradient>
<radialGradient id="pg"><stop offset="0" stop-color="${K.lgold}" stop-opacity=".9"/><stop offset=".35" stop-color="${K.gold}" stop-opacity=".35"/><stop offset="1" stop-color="${K.gold}" stop-opacity="0"/></radialGradient>
<radialGradient id="mist"><stop offset="0" stop-color="${K.copper}" stop-opacity="1"/><stop offset="1" stop-color="${K.copper}" stop-opacity="0"/></radialGradient>
<linearGradient id="cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${K.lgold}" stop-opacity=".16"/><stop offset="1" stop-color="${K.lgold}" stop-opacity="0"/></linearGradient>
<linearGradient id="juice" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8743a"/><stop offset=".45" stop-color="#8e4318"/><stop offset="1" stop-color="#3e1806"/></linearGradient>
<linearGradient id="juiceSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".25" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${K.lgold}" stop-opacity=".16"/><stop offset=".5" stop-color="${K.lgold}" stop-opacity=".03"/><stop offset="1" stop-color="${K.lgold}" stop-opacity=".12"/></linearGradient>
<linearGradient id="cap" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5e2c10"/><stop offset=".3" stop-color="#d9935a"/><stop offset=".5" stop-color="#f1cfa4"/><stop offset=".7" stop-color="${K.copper}"/><stop offset="1" stop-color="#4a220c"/></linearGradient>
<linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff6e6" stop-opacity="0"/><stop offset=".5" stop-color="#fff6e6" stop-opacity=".42"/><stop offset="1" stop-color="#fff6e6" stop-opacity="0"/></linearGradient>
<radialGradient id="plinth" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#3a2416"/><stop offset="1" stop-color="#0d0805"/></radialGradient>
<radialGradient id="shadow"><stop offset="0" stop-color="#000" stop-opacity=".75"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="goldtxt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${K.lgold}"/><stop offset=".5" stop-color="${K.gold}"/><stop offset="1" stop-color="${K.copper}"/></linearGradient>
</defs>`;
function atmosphere(t) {
  let s = `<rect width="1080" height="1920" fill="url(#bg)"/>`;
  for (const [x, y, r, op, ph] of MIST) s += `<ellipse cx="${f(x + Math.sin(t * .25 + ph) * 70)}" cy="${f(y - t * 6 + Math.cos(t * .2 + ph) * 30)}" rx="${r}" ry="${f(r * .55)}" fill="url(#mist)" opacity="${op}"/>`;
  for (const p of P) {
    const y = ((p.y - t * p.v) % 1920 + 1920) % 1920, x = p.x + Math.sin(t * .6 + p.ph) * p.dx;
    const tw = .45 + .55 * Math.abs(Math.sin(t * 1.3 + p.ph));
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(p.r * 4)}" fill="url(#pg)" opacity="${f(tw * .6)}"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(p.r * .55)}" fill="${K.lgold}" opacity="${f(tw)}"/>`;
  }
  return s;
}

// ---------- bottle (original minimal vector) ----------
const W = 280, H = 450, R = 44;
const bodyPath = `M${-W / 2 + R} ${-H} H${W / 2 - R} Q${W / 2} ${-H} ${W / 2} ${-H + R} V${-R} Q${W / 2} 0 ${W / 2 - R} 0 H${-W / 2 + R} Q${-W / 2} 0 ${-W / 2} ${-R} V${-H + R} Q${-W / 2} ${-H} ${-W / 2 + R} ${-H} Z`;
// cx, by = bottom-centre; draw 0..1 outline draw; fill 0..1 juice level; sweep x position (-1..1 or null)
function bottle(cx, by, sc, num, t, o) {
  const { draw = 1, fill = 1, sweepAt = [], id = 'a', op = 1 } = o;
  const juiceTop = -18 - (H - 70) * eo(fill);
  const glassOp = eo(seg(draw, .55, 1));
  let s = `<g transform="translate(${f(cx)} ${f(by)}) scale(${f(sc)})" opacity="${f(op)}">`;
  s += `<ellipse cx="0" cy="6" rx="${W * .75}" ry="26" fill="url(#shadow)" opacity="${f(glassOp)}"/>`;
  s += `<clipPath id="cl${id}"><path d="${bodyPath}"/></clipPath>`;
  // glass + juice
  s += `<path d="${bodyPath}" fill="url(#glass)" opacity="${f(glassOp)}"/>`;
  s += `<g clip-path="url(#cl${id})">`;
  if (fill > 0) {
    const wob = Math.sin(t * 2.2) * 4 * (1 - seg(fill, .9, 1) * .7);
    s += `<path d="M${-W / 2} ${f(juiceTop + wob)} Q0 ${f(juiceTop - wob)} ${W / 2} ${f(juiceTop + wob)} V20 H${-W / 2} Z" fill="url(#juice)" opacity=".95"/>`;
    s += `<rect x="${-W / 2}" y="${-H}" width="${W}" height="${H + 20}" fill="url(#juiceSide)"/>`;
    s += `<ellipse cx="0" cy="${f(juiceTop + 2)}" rx="${W / 2 - 10}" ry="7" fill="${K.lgold}" opacity="${f(.25 * eo(fill))}"/>`;
  }
  // inner well (thick glass base + shoulder), like heavy perfume glass
  s += `<path d="M${-W / 2 + 16} ${-H + 24} Q0 ${-H + 150} ${W / 2 - 16} ${-H + 24}" fill="none" stroke="${K.lgold}" stroke-opacity="${f(.22 * glassOp)}" stroke-width="3"/>`;
  s += `<rect x="${-W / 2 + 12}" y="-46" width="${W - 24}" height="34" rx="14" fill="${K.lgold}" opacity="${f(.07 * glassOp)}"/>`;
  // light sweeps
  for (const a of sweepAt) {
    const k = seg(t, a, a + 1.6);
    if (k > 0 && k < 1) s += `<g transform="translate(${f(lerp(-W * 1.1, W * 1.1, eio(k)))} 0) skewX(-18)"><rect x="-55" y="${-H - 10}" width="110" height="${H + 20}" fill="url(#sweep)"/></g>`;
  }
  s += `<rect x="${-W / 2 + 18}" y="${-H + 30}" width="12" height="${H - 90}" rx="6" fill="#fff" opacity="${f(.16 * glassOp)}"/>`;
  s += `</g>`;
  // outline (drawn)
  s += `<path d="${bodyPath}" fill="none" stroke="${K.gold}" stroke-width="3" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${f(1 - eio(draw))}" stroke-linejoin="round"/>`;
  // neck + cap
  const capK = eo(seg(draw, .6, 1));
  if (capK > 0) {
    const dy = (1 - capK) * -40;
    s += `<g opacity="${f(capK)}" transform="translate(0 ${f(dy)})"><rect x="-38" y="${-H - 22}" width="76" height="24" fill="${K.copper}" opacity=".7"/>
    <rect x="-64" y="${-H - 132}" width="128" height="112" rx="8" fill="url(#cap)"/>
    <rect x="-64" y="${-H - 40}" width="128" height="6" fill="${K.lgold}" opacity=".55"/>
    <rect x="-46" y="${-H - 126}" width="10" height="96" rx="5" fill="#fff" opacity=".22"/></g>`;
  }
  // label
  const lk = eo(seg(draw, .8, 1));
  if (lk > 0) {
    const lw = 196, lh = 150, ly = -H * .56;
    s += `<g opacity="${f(lk)}"><rect x="${-lw / 2}" y="${f(ly - lh / 2)}" width="${lw}" height="${lh}" rx="5" fill="${K.cream}"/>
    ${tx('CCXXXIX', -lw / 2 + 14, ly - lh / 2 + 28, 19, K.black, { anchor: 'start', weight: 600, ls: 1.5 })}
    ${tx('Parfum_239', lw / 2 - 14, ly - lh / 2 + 28, 17, '#3a2a20', { anchor: 'end', italic: true })}
    ${tx(num, 0, ly + 34, 74, 'none', { weight: 600, stroke: ` stroke="${K.black}" stroke-width="2.2"`, ls: 2 })}
    <rect x="${-lw / 2 + 14}" y="${f(ly + 46)}" width="${lw - 28}" height="2" fill="${K.black}"/>
    ${tx('200 ml', -lw / 2 + 14, ly + lh / 2 - 12, 13, '#3a2a20', { anchor: 'start', fam: SANS })}
    ${tx('Eau de Parfum', lw / 2 - 14, ly + lh / 2 - 12, 13, '#3a2a20', { anchor: 'end', fam: SANS })}</g>`;
  }
  return s + '</g>';
}

// timeline (seconds)
const T = { hookOut: 1.9, s2: 2.4, s3: 5.0, lock0: 6.9, s4: 9.0, end: 12.3, dur: 15.5 };
const LTR = s => `<tspan font-family="Inter, sans-serif" font-weight="500">⁦${s}⁩</tspan>`; // Western digits inside Arabic
const EMOJI = `<tspan font-family="'Noto Color Emoji'" font-style="normal">👀</tspan>`;

// ---------- slot-machine digits ----------
const blurDefs = `<defs>${[3, 8, 16].map(b => `<filter id="vb${b}" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="0 ${b}"/></filter>`).join('')}</defs>`;
// one reel window. pos = continuous digit position (0..), cell height h
function reelCell(cx, cy, w, h, pos, size, speed, id) {
  const base = Math.floor(pos), fr = pos - base;
  const filt = speed > 30 ? 'url(#vb16)' : speed > 12 ? 'url(#vb8)' : speed > 4 ? 'url(#vb3)' : '';
  let s = `<clipPath id="rc${id}"><rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${w}" height="${h}" rx="14"/></clipPath>`;
  s += `<rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${w}" height="${h}" rx="14" fill="${K.black}" fill-opacity=".72" stroke="${K.gold}" stroke-opacity=".45" stroke-width="2"/>`;
  s += `<g clip-path="url(#rc${id})"><g${filt ? ` filter="${filt}"` : ''}>`;
  for (let k = -1; k <= 1; k++) {
    const d = ((base + k) % 10 + 10) % 10;
    const y = cy + (k - fr) * h + size * .35;
    s += tx(String(d), cx, y, size, 'url(#goldtxt)', { fam: SANS, weight: 600 });
  }
  s += `</g><rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${w}" height="${f(h * .22)}" fill="${K.black}" opacity=".55"/><rect x="${f(cx - w / 2)}" y="${f(cy + h / 2 - h * .22)}" width="${w}" height="${f(h * .22)}" fill="${K.black}" opacity=".55"/></g>`;
  return s;
}
// a full counter for PRICE. mode 'spin' (never locks) or 'lock' (spins from t0, digit i locks at lockT[i])
function counter(cx, cy, scale, t, mode, t0, idp) {
  const chars = PRICE.split('');
  const cw = 150 * scale, ch = 230 * scale, dotW = 54 * scale, size = 190 * scale, gap = 14 * scale;
  const widths = chars.map(c => /\d/.test(c) ? cw : dotW);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (chars.length - 1);
  let x = cx - total / 2, s = '', di = 0;
  chars.forEach((c, i) => {
    const w = widths[i], mx = x + w / 2;
    if (/\d/.test(c)) {
      const target = +c; let pos, speed;
      if (mode === 'spin') { const v = 26 + di * 3; pos = (t + 0.4) * v + di * 3.3; speed = v; }
      else {
        const lockT = T.lock0 + di * 0.25, turns = 30 + di * 10;
        const k = seg(t, t0, lockT), e = eo(k);
        pos = target + turns * (1 - e); // lands exactly on target
        speed = turns * 3 * Math.pow(1 - k, 2) / (lockT - t0);
      }
      s += reelCell(mx, cy, w, ch, pos, size, speed, idp + i);
      di++;
    } else s += tx(c, mx, cy + size * .35, size, K.lgold, { fam: SANS, weight: 600 });
    x += w + gap;
  });
  return s;
}
// tag shape (rounded, punched hole on the left)
function tag(cx, cy, w, h, op = 1) {
  const x = cx - w / 2, y = cy - h / 2;
  return `<g opacity="${f(op)}"><path d="M${f(x + 70)} ${f(y)} H${f(x + w - 30)} Q${f(x + w)} ${f(y)} ${f(x + w)} ${f(y + 30)} V${f(y + h - 30)} Q${f(x + w)} ${f(y + h)} ${f(x + w - 30)} ${f(y + h)} H${f(x + 70)} L${f(x)} ${f(cy + h * .18)} V${f(cy - h * .18)} Z" fill="#1c120b" stroke="${K.gold}" stroke-width="3"/>
  <circle cx="${f(x + 46)}" cy="${f(cy)}" r="14" fill="${K.black}" stroke="${K.gold}" stroke-width="2"/></g>`;
}

// ---------- hooks (the ONLY part that differs) ----------
function hookA(t) { // bottle No. 001 big on frame 0, price tag spinning + blurred
  let s = '';
  const push = lerp(1.55 + t * .03, 1.2, eio(seg(t, T.hookOut - .3, T.s2)));
  s += `<path d="M470 560 L610 560 L980 1560 L100 1560 Z" fill="url(#cone)"/>`;
  s += bottle(540, lerp(1540, 1550, seg(t, T.hookOut - .3, T.s2)), push, '001', t, { id: 'h', draw: 1, fill: 1, sweepAt: [-.6, 1.0] });
  // hanging tag, spinning on its string (scaleX flip) with blurred digits
  const ang = t * 7.5, sx = Math.cos(ang), swing = Math.sin(t * 3.1) * 8;
  s += `<path d="M720 860 Q800 ${f(880 + swing)} 860 ${f(940 + swing)}" stroke="${K.lgold}" stroke-width="3" fill="none" opacity=".8"/>`;
  s += `<g transform="translate(870 ${f(1030 + swing)}) rotate(${f(swing)}) scale(${f(Math.max(.08, Math.abs(sx)))} 1)">`;
  s += `<rect x="-150" y="-90" width="300" height="180" rx="22" fill="${K.cream}" stroke="${K.copper}" stroke-width="4"/>`;
  s += `<g filter="url(#vb8)">${tx(sx > 0 ? '?.??? ' + CUR_EN : String(Math.floor(t * 37) % 10) + '.' + String(Math.floor(t * 53) % 1000).padStart(3, '0'), 0, 24, 62, K.black, { fam: SANS, weight: 600 })}</g></g>`;
  s += rv('Guess the price', 540, 330, 118, K.cream, t, 0.05, { weight: 600 });
  s += rv(`of 200 ml ${EMOJI}`, 540, 450, 118, 'url(#goldtxt)', t, 0.45, { italic: true, weight: 600 });
  s += rv(`خمّن سعر ${LTR('200')} مل ${EMOJI}`, 540, 550, 66, K.lgold, t, 0.75, { fam: AR, rtl: true, weight: 600 });
  return s;
}
function hookB(t) { // objection first, slot counter already rolling on frame 0
  let s = '';
  const sc = 1 + t * .02;
  s += `<g transform="translate(540 1060) scale(${f(sc)}) translate(-540 -1060)">`;
  s += tag(540, 1060, 980, 760);
  s += tx('?', 540, 820, 70, K.gold, { fam: SANS, weight: 500, op: .8 });
  s += counter(560, 1050, 1.08, t, 'spin', 0, 'h');
  s += tx(CUR_EN, 560, 1330, 80, K.gold, { fam: SANS, weight: 600, ls: 6 });
  s += '</g>';
  s += rv('Luxury perfume', 540, 330, 112, K.cream, t, 0.05, { weight: 600 });
  s += rv(`for under ${UNDER} ${CUR_EN}?`, 540, 445, 112, 'url(#goldtxt)', t, 0.45, { italic: true, weight: 600 });
  s += rv(`عطر فخم بأقل من ${LTR(UNDER)} دنانير؟`, 540, 550, 66, K.lgold, t, 0.75, { fam: AR, rtl: true, weight: 600 });
  return s;
}

// ---------- shared body (identical in A and B) ----------
function body(t) {
  let s = '';
  const inK = eo(seg(t, T.hookOut + .1, T.s2));
  const outK = 1 - seg(t, T.end - .2, T.end + .5);
  if (inK <= 0 || outK <= 0) return '';
  s += `<g opacity="${f(inK * outK)}">`;
  // bottle position per beat
  const toPrice = eio(seg(t, T.s3, T.s3 + .9)), toTag = eio(seg(t, T.s4, T.s4 + .9));
  const sc = lerp(lerp(1.2, .62, toPrice), 1.05, toTag) * lerp(.94, 1, inK);
  const lit = 1 - toPrice + toTag;
  s += `<path d="M470 720 L610 720 L960 1560 L120 1560 Z" fill="url(#cone)" opacity="${f(clamp(lit))}"/>`;
  s += `<ellipse cx="540" cy="1560" rx="${f(470 * Math.min(1, sc / 1.1))}" ry="70" fill="url(#plinth)"/><ellipse cx="540" cy="1560" rx="${f(470 * Math.min(1, sc / 1.1))}" ry="70" fill="none" stroke="${K.gold}" stroke-opacity=".3" stroke-width="2"/>`;
  s += bottle(540, 1550, sc, '001', t, { id: 's', draw: 1, fill: 1, sweepAt: [2.9, 7.7, 9.6] });
  // beat 2: No. 001 / 200 ml / EDP
  if (t < T.s3 + .5) {
    s += rv('No. 001', 540, 470, 150, 'url(#goldtxt)', t, T.s2, { italic: true, out: T.s3 - .1 });
    s += rv('200 ml · Eau de Parfum', 540, 570, 62, K.cream, t, T.s2 + .25, { out: T.s3 - .1 });
    s += rv(`رقم ${LTR('001')} · ${LTR('200')} مل · أو دو بارفان`, 540, 660, 54, K.lgold, t, T.s2 + .5, { fam: AR, rtl: true, out: T.s3 - .1 });
  }
  // beat 3: guess → slot machine locks on PRICE
  if (t >= T.s3 - .1 && t < T.s4 + .5) {
    const lockEnd = T.lock0 + .25 * (PRICE.replace(/\D/g, '').length - 1);
    const done = seg(t, lockEnd, lockEnd + .3);
    s += rv('Your guess?', 540, 450, 120, K.cream, t, T.s3, { italic: true, out: lockEnd - .1 });
    s += rv(`شنو توقعك؟`, 540, 550, 64, K.lgold, t, T.s3 + .25, { fam: AR, rtl: true, out: lockEnd - .1 });
    s += rv('200 ml · No. 001', 540, 450, 84, K.cream, t, lockEnd + .05, { out: T.s4 - .1 });
    s += rv(`${LTR('200')} مل · رقم ${LTR('001')}`, 540, 545, 56, K.lgold, t, lockEnd + .25, { fam: AR, rtl: true, out: T.s4 - .1 });
    const tk = eo(seg(t, T.s3 + .1, T.s3 + .8)) * (1 - seg(t, T.s4 - .1, T.s4 + .4));
    const pop = 1 + .06 * Math.sin(Math.PI * seg(t, lockEnd, lockEnd + .35));
    s += `<g opacity="${f(tk)}" transform="translate(540 900) scale(${f(lerp(.85, 1, tk) * pop)}) translate(-540 -900)">`;
    s += tag(540, 900, 940, 520);
    s += counter(565, 840, .92, t, 'lock', T.s3, 's');
    s += tx(CUR_EN, 565, 1060, 64, K.gold, { fam: SANS, weight: 600, ls: 6, op: 1 - done });
    s += tx(`${LTR(PRICE)} ${CUR_AR}`, 565, 1072, 74, K.cream, { fam: AR, weight: 600, rtl: true, op: done });
    // flash on lock
    if (done > 0 && done < 1) s += `<rect x="70" y="640" width="940" height="520" rx="30" fill="${K.lgold}" opacity="${f(.35 * (1 - done))}"/>`;
    s += '</g>';
  }
  // beat 4: tagline + price pill
  if (t >= T.s4 - .1) {
    s += rv('Exceptional Scents.', 540, 440, 100, K.cream, t, T.s4 + .15, { out: T.end - .4 });
    s += rv('Accessible Luxury.', 540, 545, 100, 'url(#goldtxt)', t, T.s4 + .45, { italic: true, out: T.end - .4 });
    s += rv('عطور مميزة… وفخامة بمتناول يدك.', 540, 640, 54, K.lgold, t, T.s4 + .75, { fam: AR, rtl: true, out: T.end - .4 });
    const pk = eo(seg(t, T.s4 + .9, T.s4 + 1.5)) * (1 - seg(t, T.end - .4, T.end));
    if (pk > 0) s += `<g opacity="${f(pk)}"><rect x="300" y="700" width="480" height="84" rx="42" fill="${K.gold}" fill-opacity=".12" stroke="${K.gold}" stroke-width="2"/>${tx(`200 ml · ${PRICE} ${CUR_EN}`, 540, 756, 44, K.cream, { fam: SANS, weight: 500, ls: 1 })}</g>`;
  }
  return s + '</g>';
}

function endCard(t) {
  if (t < T.end) return '';
  const a = T.end + .2;
  let s = '';
  s += rv('CCXXXIX', 540, 700, 46, K.gold, t, a, { ls: 18, weight: 500 });
  s += rule(540, 740, 520, t, a + .2);
  s += rv('239 PARFUM', 540, 870, 132, K.cream, t, a + .35, { ls: 10, weight: 500 });
  s += rule(540, 915, 520, t, a + .5);
  s += rv('Exceptional Scents. Accessible Luxury.', 540, 980, 40, K.lgold, t, a + .7, { italic: true });
  const pk = eo(seg(t, a + 1.0, a + 1.8));
  if (pk > 0) s += `<g opacity="${f(pk)}" transform="translate(0 ${f((1 - pk) * 20)})"><rect x="290" y="1080" width="500" height="250" rx="34" fill="${K.gold}" fill-opacity=".08" stroke="${K.gold}" stroke-width="2"/>
    ${tx('DM to Order', 540, 1178, 76, K.cream, { italic: true, weight: 600 })}
    ${tx('اطلب بالخاص', 540, 1280, 60, K.lgold, { fam: AR, rtl: true, weight: 500 })}</g>`;
  s += rv('@parfum_239', 540, 1420, 46, K.gold, t, a + 1.5, { fam: SANS, weight: 500, ls: 3 });
  s += rv('Kuwait · الكويت', 540, 1485, 32, K.mute, t, a + 1.7, { fam: SANS, weight: 400, ls: 2 });
  s += rv('Sample by Bracket', 540, 1530, 20, K.mute, t, a + 1.0, { fam: SANS, ls: 2, op: .55 });
  return s;
}

module.exports = variant => ({
  dur: T.dur,
  frame(t) {
    let s = defs + blurDefs + atmosphere(t);
    if (t < T.s2 + .1) {
      const out = 1 - eo(seg(t, T.hookOut, T.s2));
      s += `<g opacity="${f(out)}">${variant === 'B' ? hookB(t) : hookA(t)}</g>`;
    }
    s += body(t) + endCard(t);
    return s;
  },
});
