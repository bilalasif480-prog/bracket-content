// cover for p3: reel frame (NOHEAD) + mystery line band + small [ BRACKET ] mark
const { C } = require('./lib');
const reel = require('./p3.js');
const T = (s, y, size, col) => `<text x="540" y="${y}" font-family="Archivo" font-weight="900" font-size="${size}" fill="${col}" text-anchor="middle" letter-spacing="-4">${s}</text>`;
module.exports = { dur: 1, frame() {
  let s = reel.frame(0.9);
  const band = 820;
  s += `<rect x="0" y="0" width="1080" height="${band}" fill="${C.red}"/><rect x="0" y="${band}" width="1080" height="12" fill="${C.ink}" opacity=".25"/>`;
  s += T('Rings all day.', band - 280, 116, '#fff') + T('Never answered.', band - 120, 112, C.ink);
  s += `<rect x="370" y="330" width="340" height="62" rx="31" fill="${C.ink}"/><text x="540" y="374" font-family="Archivo" font-weight="900" font-size="40" text-anchor="middle" letter-spacing="-1" fill="#fff"><tspan fill="${C.peach}">[</tspan> BRACKET <tspan fill="${C.peach}">]</tspan></text>`;
  return s; } };
