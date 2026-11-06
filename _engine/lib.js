// Shared animation library: everything returns SVG strings for a time t (seconds)
const C = { ink: '#201e1d', red: '#ec3013', peach: '#ff8360', paper: '#f3f2f2', white: '#ffffff', mute: '#9a948f', green: '#1fa86b', gold: '#ffc23c' };
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const seg = (t, a, b) => clamp((t - a) / (b - a));
const eo = k => 1 - Math.pow(1 - clamp(k), 3);
const eio = k => { k = clamp(k); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
const eb = k => { k = clamp(k); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
const f = n => (+n).toFixed(2);

function txt(s, x, y, size, fill, o = {}) {
  const { anchor = 'middle', weight = 900, op = 1, ls = -2, rot = 0, mono = false } = o;
  const fam = mono ? 'JB' : 'Archivo';
  return `<text x="${f(x)}" y="${f(y)}" font-family="${fam}" font-weight="${mono ? 700 : weight}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" opacity="${f(op)}" letter-spacing="${o.ls ?? (mono ? 2 : ls)}" transform="rotate(${rot} ${f(x)} ${f(y)})">${s}</text>`;
}
// pop-in line: appears at time a, slides up and fades
function line(s, x, y, size, fill, t, a, o = {}) {
  const k = eb(seg(t, a, a + 0.5));
  const op = clamp((t - a) / 0.2);
  if (op <= 0) return '';
  return txt(s, x, y + (1 - k) * 60, size, fill, { ...o, op: op * (o.op ?? 1) });
}

// ---------- Bracket character ----------
// side: 'L' or 'R'. (x,y) = bottom-centre of feet. h = body height.
function bracket(x, y, side, t, o = {}) {
  const { s = 1, color = side === 'L' ? C.red : C.peach, walk = 0, bounce = 0, rot = 0, squash = 1, mood = 'happy', look = 0, sx = 1, hat = false, extra = '' } = o;
  const dir = side === 'L' ? 1 : -1;
  const bob = Math.abs(Math.sin(t * 9)) * 10 * walk + Math.abs(Math.sin(t * 5)) * 6 * bounce;
  const step = Math.sin(t * 9) * 14 * walk;
  const blink = (t % 3.1) < 0.12 ? 0.1 : 1;
  const bar = 76, arm = 140, H = 270, th = 54;
  // local coords: x from 0 (outer edge) rightwards, y from 0 (top)
  const body = `<path d="M0 0 H${arm} V${th} H${bar} V${H - th} H${arm} V${H} H0 Z" fill="${color}"/>`;
  const shade = `<path d="M${bar} ${th} H${arm} V${th + 10} H${bar} Z" fill="rgba(0,0,0,.12)"/><path d="M${bar} ${H - th - 10} H${arm} V${H - th} H${bar} Z" fill="rgba(0,0,0,.12)"/>`;
  const ex = 18, ey = 100 + look * 0;
  const pup = (dx) => `<circle cx="${ex + dx}" cy="${ey}" r="16" fill="#fff"/><circle cx="${ex + dx + look * 5}" cy="${ey + (mood === 'scared' ? -2 : 2)}" r="${mood === 'scared' ? 5 : 8}" fill="${C.ink}"/>`;
  const eyes = `<g transform="translate(0 ${f(ey)}) scale(1 ${blink}) translate(0 ${f(-ey)})">${pup(0)}${pup(40)}</g>`;
  let mouth;
  if (mood === 'happy') mouth = `<path d="M${ex + 6} 150 Q${ex + 28} 176 ${ex + 52} 150" stroke="${C.ink}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  else if (mood === 'wow') mouth = `<ellipse cx="${ex + 28}" cy="160" rx="13" ry="17" fill="${C.ink}"/>`;
  else if (mood === 'grit') mouth = `<path d="M${ex + 6} 160 H${ex + 52}" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>`;
  else mouth = `<path d="M${ex + 6} 168 Q${ex + 28} 148 ${ex + 52} 168" stroke="${C.ink}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  const cheek = `<circle cx="${ex - 4}" cy="150" r="9" fill="rgba(255,255,255,.28)"/><circle cx="${ex + 62}" cy="150" r="9" fill="rgba(255,255,255,.28)"/>`;
  const legL = `<rect x="22" y="${H - 2}" width="30" height="${f(40 - step)}" rx="12" fill="${C.ink}"/><rect x="${arm - 52}" y="${H - 2}" width="30" height="${f(40 + step)}" rx="12" fill="${C.ink}"/>`;
  const hatSvg = hat ? `<path d="M10 -4 Q${bar} -70 ${arm - 10} -4 Z" fill="${C.gold}"/><rect x="-6" y="-8" width="${arm + 12}" height="16" rx="8" fill="${C.gold}"/>` : '';
  const g = `<g>${legL}${body}${shade}${cheek}${eyes}${mouth}${hatSvg}${extra}</g>`;
  const cx = arm / 2, cy = H + 36;
  return `<g transform="translate(${f(x)} ${f(y - bob)}) rotate(${f(rot)}) scale(${f(dir * s * sx)} ${f(s * squash)}) translate(${-cx} ${-cy})">${g}</g>`;
}

// ---------- Bug character ----------
function bug(x, y, t, o = {}) {
  const { s = 1, flip = 1, mood = 'cheeky', rot = 0, crawl = 1, squash = 1, dizzy = false } = o;
  let legs = '';
  for (let i = 0; i < 3; i++) for (const side of [-1, 1]) {
    const ph = Math.sin(t * 22 * crawl + i * 2.1 + (side > 0 ? 1.6 : 0)) * 10 * crawl;
    const lx = -28 + i * 30;
    legs += `<path d="M${lx} ${side * 30} L${lx + ph} ${side * 62} L${lx + ph * 1.3 + 10} ${side * 76}" stroke="${C.ink}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  const wig = Math.sin(t * 12) * 6;
  const ant = `<path d="M62 -16 Q96 -52 ${112 + wig} -50" stroke="${C.ink}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M62 16 Q96 52 ${112 - wig} 50" stroke="${C.ink}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="${112 + wig}" cy="-50" r="8" fill="${C.red}"/><circle cx="${112 - wig}" cy="50" r="8" fill="${C.red}"/>`;
  const body = `<ellipse cx="-14" cy="0" rx="70" ry="52" fill="${C.ink}"/><ellipse cx="-14" cy="0" rx="70" ry="52" fill="none" stroke="${C.mute}" stroke-width="3" opacity=".5"/><path d="M-84 0 H46" stroke="${C.mute}" stroke-width="4" opacity=".6"/><circle cx="-40" cy="-22" r="11" fill="${C.red}"/><circle cx="-40" cy="22" r="11" fill="${C.red}"/><circle cx="2" cy="-24" r="9" fill="${C.peach}"/><circle cx="2" cy="24" r="9" fill="${C.peach}"/>`;
  const head = `<circle cx="64" cy="0" r="38" fill="${C.ink}"/>`;
  let eyes;
  if (dizzy) eyes = `<path d="M58 -22 l16 16 m0 -16 l-16 16 M58 6 l16 16 m0 -16 l-16 16" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`;
  else eyes = `<circle cx="72" cy="-14" r="${mood === 'scared' ? 15 : 12}" fill="#fff"/><circle cx="72" cy="14" r="${mood === 'scared' ? 15 : 12}" fill="#fff"/><circle cx="${mood === 'scared' ? 70 : 77}" cy="-14" r="${mood === 'scared' ? 4 : 6}" fill="${C.ink}"/><circle cx="${mood === 'scared' ? 70 : 77}" cy="14" r="${mood === 'scared' ? 4 : 6}" fill="${C.ink}"/>`;
  const mouth = dizzy ? '' : mood === 'scared' ? `<ellipse cx="92" cy="0" rx="6" ry="9" fill="${C.red}"/>` : `<path d="M86 -8 Q98 0 86 8" stroke="${C.red}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s * flip)} ${f(s * squash)})">${legs}${ant}${body}${head}${eyes}${mouth}</g>`;
}

// ---------- Browser window ----------
function windowMock(x, y, w, h, t, o = {}) {
  const { state = 'ok', shake = 0, op = 1, s = 1 } = o;
  const sx = Math.sin(t * 40) * shake;
  const bad = state === 'bad', fixed = state === 'fixed';
  const bx = x + w * 0.6, by = y + h - 150;
  const btnFill = bad ? C.mute : fixed ? C.green : C.red;
  const btnLbl = bad ? 'ERROR 500' : fixed ? 'ORDER ✓' : 'ORDER NOW';
  const flicker = bad && Math.sin(t * 30) > 0.2;
  return `<g opacity="${f(op)}" transform="translate(${f(sx)} 0)">
    <rect x="${x + 12}" y="${y + 14}" width="${w}" height="${h}" rx="34" fill="rgba(32,30,29,.18)"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="#fff" stroke="${C.ink}" stroke-width="8"/>
    <path d="M${x + 4} ${y + 80} V${y + 38} Q${x + 4} ${y + 4} ${x + 38} ${y + 4} H${x + w - 38} Q${x + w - 4} ${y + 4} ${x + w - 4} ${y + 38} V${y + 80} Z" fill="${C.ink}"/>
    <circle cx="${x + 46}" cy="${y + 42}" r="11" fill="${C.red}"/><circle cx="${x + 82}" cy="${y + 42}" r="11" fill="${C.gold}"/><circle cx="${x + 118}" cy="${y + 42}" r="11" fill="${C.green}"/>
    <rect x="${x + 170}" y="${y + 26}" width="${w - 240}" height="32" rx="16" fill="#3a3735"/>
    <rect x="${x + 50}" y="${y + 125}" width="${w * 0.55}" height="36" rx="18" fill="${C.ink}"/>
    <rect x="${x + 50}" y="${y + 185}" width="${w * 0.4}" height="36" rx="18" fill="${C.paper}"/>
    <rect x="${x + 50}" y="${y + 245}" width="${w * 0.48}" height="22" rx="11" fill="${C.paper}"/>
    <rect x="${x + w * 0.62}" y="${y + 125}" width="${w * 0.3}" height="${h * 0.34}" rx="24" fill="${C.peach}" opacity=".55"/>
    <rect x="${x + 50}" y="${by}" width="${w * 0.34}" height="84" rx="42" fill="${btnFill}" opacity="${flicker ? .35 : 1}"/>
    ${txt(btnLbl, x + 50 + w * 0.17, by + 54, 34, '#fff', { ls: 1, weight: 800 })}
    ${bad ? `<path d="M${x + w - 160} ${y + h - 200} l60 -70 l26 22 l-30 40 l40 8 l-70 80 l-6 -44 l-44 -10 z" fill="${C.red}" opacity=".0"/>` : ''}
  </g>`;
}

// ---------- Misc ----------
function sparkle(x, y, r, t, ph = 0, col = C.gold) {
  const k = 0.6 + 0.4 * Math.sin(t * 8 + ph); const rr = r * k;
  return `<path d="M${x} ${y - rr} Q${x} ${y} ${x + rr} ${y} Q${x} ${y} ${x} ${y + rr} Q${x} ${y} ${x - rr} ${y} Q${x} ${y} ${x} ${y - rr} Z" fill="${col}"/>`;
}
function confetti(cx, cy, t0, t, n = 40) {
  let s = '';
  const cols = [C.red, C.peach, C.gold, C.ink, C.green];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + i * 0.37, v = 420 + (i * 97) % 380, tt = t - t0;
    if (tt < 0) continue;
    const px = cx + Math.cos(a) * v * tt * 0.9, py = cy + Math.sin(a) * v * tt * 0.9 + 900 * tt * tt * 0.5 - 200 * tt;
    const op = clamp(1 - tt / 2.2);
    s += `<rect x="${f(px)}" y="${f(py)}" width="22" height="12" rx="3" fill="${cols[i % 5]}" opacity="${f(op)}" transform="rotate(${f(tt * 400 + i * 30)} ${f(px)} ${f(py)})"/>`;
  }
  return s;
}
function check(x, y, r, k, col = C.green) {
  const p = clamp(k);
  return `<g transform="translate(${x} ${y}) scale(${f(eb(p))})"><circle r="${r}" fill="${col}"/><path d="M${-r * .42} ${r * .02} L${-r * .1} ${r * .34} L${r * .46} ${-r * .3}" stroke="#fff" stroke-width="${r * .22}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}
function bubble(x, y, s, t, a, b) {
  if (t < a || t > b) return '';
  const k = eb(seg(t, a, a + 0.25));
  return `<g transform="translate(${x} ${y}) scale(${f(k)})"><rect x="-${s.length * 15 + 30}" y="-44" width="${s.length * 30 + 60}" height="78" rx="39" fill="#fff" stroke="${C.ink}" stroke-width="6"/>${txt(s, 0, 14, 44, C.ink, { weight: 800, ls: 0 })}</g>`;
}

// ---------- End card (shared) ----------
function endCard(t, t0) {
  const lt = t - t0; if (lt < 0) return '';
  const k = eo(lt / 0.5);
  let s = `<rect width="1080" height="1920" fill="${C.ink}"/>`;
  s += bracket(150, 880, 'L', lt, { s: 1.3, bounce: 1, mood: 'happy', sx: 1 });
  s += bracket(930, 880, 'R', lt, { s: 1.3, bounce: 1, mood: 'happy' });
  s += txt('BRACKET', 540, 745, 104, '#fff', { op: k, ls: -4 });
  s += txt('QA TESTING &amp; WEB BUILD STUDIO', 540, 820, 30, C.peach, { mono: true, op: clamp((lt - .3) / .4) });
  s += line('We break it before', 540, 1130, 76, '#fff', lt, 0.7);
  s += line('your users do.', 540, 1220, 76, C.peach, lt, 0.9);
  const pulse = 1 + Math.sin(lt * 5) * 0.025;
  const pk = eb(seg(lt, 1.5, 2));
  s += `<g transform="translate(540 1370) scale(${f(pulse * pk)})"><rect x="-300" y="-56" width="600" height="112" rx="56" fill="${C.red}"/>${txt('Start a project →', 0, 20, 52, '#fff', { weight: 800, ls: 0 })}</g>`;
  s += txt('LINK IN BIO', 540, 1480, 32, C.mute, { mono: true, op: clamp((lt - 2) / .4) });
  return s;
}

module.exports = { C, clamp, lerp, seg, eo, eio, eb, f, txt, line, bracket, bug, windowMock, sparkle, confetti, check, bubble, endCard };
