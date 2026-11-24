// Calibre le seuil « profil peu contrasté » : quel indice du n° 1 obtient-on en répondant au hasard, selon l'univers et la longueur ?
// Un profil est dit « peu contrasté » quand son n° 1 ne dépasse pas ce que des réponses au hasard produisent souvent.
// Usage : node tools/calibrate-threshold.js [index.html]
const fs = require('fs'), path = require('path'), vm = require('vm');
const file = process.argv[2] || path.join(__dirname, '..', 'index.html');
const dp = fs.readFileSync(file, 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1].split('let state')[0];
const c = {}; vm.createContext(c);
vm.runInContext(dp + ';this.M={12:META_12,7:META_7};this.B={12:BANK_12,7:BANK_7};this.adj=adjustScores;', c);
const shuffle = a => a.map(x => [Math.random(), x]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
const pick = a => a[Math.floor(Math.random() * a.length)];
const N = 20000;
const out = {};
for (const w of ['12', '7']) {
  const keys = Object.keys(c.M[w]); out[w] = {};
  for (const len of [10, 20, 30]) {
    const tops = [];
    for (let r = 0; r < N; r++) {
      const qs = shuffle(c.B[w]).slice(0, len), raw = Object.fromEntries(keys.map(k => [k, 0]));
      for (const q of qs) { const o = pick(q.o); raw[o[1]] += 2; raw[o[2]] += 1; }
      tops.push(Math.max(...Object.values(c.adj(raw, qs, keys))));
    }
    tops.sort((a, b) => a - b);
    const q = p => tops[Math.floor(p * (N - 1))];
    out[w][len] = { p50: q(0.5), p75: q(0.75), p90: q(0.9), p95: q(0.95) };
    console.log(`Monde ${w}, ${len} questions : indice du n° 1 au hasard — médiane ${q(0.5)}, p75 ${q(0.75)}, p90 ${q(0.9)}, p95 ${q(0.95)}`);
  }
}
console.log('\n' + JSON.stringify(out));
