// Time-warp wrapper: node-side helper. rwNN.js = require('./warp')('reelNN')
const fs = require('fs');
module.exports = (name) => {
  const orig = require('./' + name + '.js');
  const a = JSON.parse(fs.readFileSync('/tmp/anch_' + name + '.json')).anch; // [video t, new t]
  const D2 = JSON.parse(fs.readFileSync('/tmp/anch_' + name + '.json')).D2;
  const inv = T => {
    if (T <= a[0][1]) return a[0][0] + (T - a[0][1]);
    for (let i = 0; i < a.length - 1; i++) { const [v0, t0] = a[i], [v1, t1] = a[i + 1]; if (T <= t1) return t1 > t0 ? v0 + (v1 - v0) * (T - t0) / (t1 - t0) : v0; }
    const [v, t] = a[a.length - 1]; return v + (T - t);
  };
  return { dur: D2, frame: T => orig.frame(inv(T)) };
};
