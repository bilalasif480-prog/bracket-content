// 239 Parfum — "Numbered, not named" (sample reel for @parfum_239, by Bracket)
// Self-contained: { dur, frame(t) } -> SVG. Fonts: Cormorant Garamond, Inter, PlexAr (IBM Plex Sans Arabic).
const K = { black: '#070504', deep: '#120b07', gold: '#d4a373', lgold: '#f1cfa4', copper: '#b5652b', cream: '#f4ead9', mute: '#8f7f70' };
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const eo = k => 1 - Math.pow(1 - clamp(k), 3);
const eio = k => { k = clamp(k); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
const lerp = (a, b, k) => a + (b - a) * k;
const f = n => (+n).toFixed(2);

// timeline (seconds)
const T = { s2: 3.2, b2: 5.4, s3: 9.0, s4: 12.2, end: 15.6, dur: 19.5 };

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

// ---------- scenes ----------
function frame(t) {
  let s = defs + atmosphere(t);
  // 1. hook
  if (t < T.s2 + 0.4) {
    const out = 1 - seg(t, T.s2 - 0.35, T.s2 + 0.25);
    const big = 1 + t * .02;
    s += `<g opacity="${f(out)}">`;
    s += `<g transform="translate(540 1010) scale(${f(big)})">${tx('No.', 0, 150, 520, 'none', { weight: 500, italic: true, stroke: ` stroke="${K.gold}" stroke-width="1.6" stroke-opacity=".22"` })}</g>`;
    s += rv('We don’t name', 540, 760, 104, K.cream, t, 0.0);
    s += rv('our scents.', 540, 870, 104, K.cream, t, 0.15);
    s += rule(540, 935, 220, t, 0.6);
    s += rv('We number them.', 540, 1060, 112, 'url(#goldtxt)', t, 0.55, { italic: true });
    s += rv('عطورنا ما لها أسامي… لها أرقام.', 540, 1190, 60, K.lgold, t, 0.9, { fam: AR, rtl: true, weight: 500 });
    s += '</g>';
  }
  // 2-4. bottles
  if (t >= T.s2 && t < T.end + 0.8) {
    const outK = 1 - seg(t, T.end - 0.2, T.end + 0.6);
    const push = 1 + .05 * seg(t, T.s2, T.end);
    s += `<g opacity="${f(outK)}" transform="translate(540 1300) scale(${f(push)}) translate(-540 -1300)">`;
    // spotlight cone + plinth
    const lit = eo(seg(t, T.s2, T.s2 + 1.2));
    s += `<path d="M470 720 L610 720 L960 1560 L120 1560 Z" fill="url(#cone)" opacity="${f(lit)}"/>`;
    s += `<ellipse cx="540" cy="1560" rx="470" ry="74" fill="url(#plinth)" opacity="${f(lit)}"/><ellipse cx="540" cy="1560" rx="470" ry="74" fill="none" stroke="${K.gold}" stroke-opacity="${f(.35 * lit)}" stroke-width="2"/>`;
    const split = eio(seg(t, T.b2, T.b2 + 1.2));
    const drawA = seg(t, T.s2 + .1, T.s2 + 1.6), fillA = seg(t, T.s2 + 1.2, T.s2 + 2.6);
    s += bottle(lerp(540, 330, split), 1560, lerp(1.2, 1.0, split), '001', t, { id: 'a', draw: drawA, fill: fillA, sweepAt: [T.s2 + 2.4, 8.0, 13.2] });
    if (t > T.b2) {
      const drawB = seg(t, T.b2 + .2, T.b2 + 1.6), fillB = seg(t, T.b2 + 1.0, T.b2 + 2.3);
      s += bottle(lerp(800, 750, split), 1560, 1.0, '003', t, { id: 'b', draw: drawB, fill: fillB, sweepAt: [8.2, 13.4] });
    }
    s += '</g>';
    // headings (upper safe area)
    s += `<g opacity="${f(outK)}">`;
    if (t < T.b2 + .5) {
      s += rv('No. 001', 540, 520, 150, 'url(#goldtxt)', t, T.s2 + .3, { italic: true, out: T.b2 });
      s += rv('رقم <tspan font-family="Inter, sans-serif" font-weight="400" dx="-10">⁦001⁩</tspan>', 540, 630, 64, K.lgold, t, T.s2 + .6, { fam: AR, rtl: true, out: T.b2 });
    } else if (t < T.s3 + .5) {
      s += rv('No. 001 · No. 003', 540, 500, 112, 'url(#goldtxt)', t, T.b2 + .3, { italic: true, out: T.s3 });
      s += rv('رقم <tspan font-family="Inter, sans-serif" font-weight="400" dx="-10">⁦001⁩</tspan> و رقم <tspan font-family="Inter, sans-serif" font-weight="400" dx="-10">⁦003⁩</tspan>', 540, 610, 60, K.lgold, t, T.b2 + .6, { fam: AR, rtl: true, out: T.s3 });
    } else if (t < T.s4 + .5) {
      s += rv('200 ml', 540, 490, 150, K.cream, t, T.s3 + .25, { out: T.s4 });
      s += rv('Eau de Parfum', 540, 580, 70, 'url(#goldtxt)', t, T.s3 + .5, { italic: true, out: T.s4 });
      s += rv('<tspan font-family="Inter, sans-serif" font-weight="400" dx="-10">⁦200⁩</tspan> مل — أو دو بارفان', 540, 670, 56, K.lgold, t, T.s3 + .8, { fam: AR, rtl: true, out: T.s4 });
    } else {
      s += rv('Exceptional Scents.', 540, 470, 100, K.cream, t, T.s4 + .25, { out: T.end - .3 });
      s += rv('Accessible Luxury.', 540, 575, 100, 'url(#goldtxt)', t, T.s4 + .6, { italic: true, out: T.end - .3 });
      s += rv('عطور مميزة… وفخامة بمتناول يدك.', 540, 675, 54, K.lgold, t, T.s4 + .95, { fam: AR, rtl: true, out: T.end - .3 });
    }
    s += '</g>';
  }
  // 5. end card
  if (t >= T.end) {
    const a = T.end + .2;
    s += `<path d="M540 640 L540 690" stroke="${K.gold}" stroke-width="2" opacity="${f(eo(seg(t, a, a + .8)) * .7)}"/>`;
    s += rv('CCXXXIX', 540, 780, 46, K.gold, t, a, { ls: 18, weight: 500 });
    s += rule(540, 820, 520, t, a + .2);
    s += rv('239 PARFUM', 540, 950, 132, K.cream, t, a + .35, { ls: 10, weight: 500 });
    s += rule(540, 995, 520, t, a + .5);
    s += rv('Exceptional Scents. Accessible Luxury.', 540, 1060, 40, K.lgold, t, a + .7, { italic: true });
    // DM pill
    const pk = eo(seg(t, a + 1.1, a + 1.9));
    if (pk > 0) {
      s += `<g opacity="${f(pk)}" transform="translate(0 ${f((1 - pk) * 20)})"><rect x="290" y="1170" width="500" height="250" rx="34" fill="${K.gold}" fill-opacity=".08" stroke="${K.gold}" stroke-width="2"/>
      ${tx('DM to Order', 540, 1268, 76, K.cream, { italic: true, weight: 600 })}
      ${tx('اطلب بالخاص', 540, 1370, 60, K.lgold, { fam: AR, rtl: true, weight: 500 })}</g>`;
    }
    s += rv('@parfum_239', 540, 1520, 46, K.gold, t, a + 1.6, { fam: SANS, weight: 500, ls: 3 });
    s += rv('Kuwait · الكويت', 540, 1585, 32, K.mute, t, a + 1.8, { fam: SANS, weight: 400, ls: 2 });
    s += rv('Sample by Bracket', 1020, 150, 20, K.mute, t, a + 1.0, { fam: SANS, anchor: 'end', ls: 2, op: .55 });
  }
  // gentle vignette
  s += `<rect width="1080" height="1920" fill="url(#bg)" opacity="0"/>`;
  return s;
}
module.exports = { dur: T.dur, frame };
