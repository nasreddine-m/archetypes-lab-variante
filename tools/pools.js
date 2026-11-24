// Poids (2×primaire + secondaire) par archétype pour chaque pool de tirage.
// Usage : node tools/pools.js [chemin/index.html]
const fs = require('fs'), path = require('path'), vm = require('vm');
const file = process.argv[2] || path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const dataPart = html.match(/<script>([\s\S]*?)<\/script>/)[1].split('let state')[0];
const ctx = {}; vm.createContext(ctx);
vm.runInContext(dataPart + ';this.M12=META_12;this.M7=META_7;this.B12=BANK_12;this.B7=BANK_7;', ctx);
const filters = {
  'Déclaratif': q => q.m === 'Déclaratif', 'Observation': q => q.m === 'Observation',
  'dilemme': q => q.t === 'dilemme', 'miroir': q => q.t === 'miroir', 'TOUT': () => true,
};
function table(name, meta, bank) {
  const keys = Object.keys(meta);
  console.log(`\n##### ${name} : ${bank.length} questions #####`);
  console.log('pool'.padEnd(12) + 'n'.padStart(4) + '  ' + keys.map(k => k.slice(0, 5).padStart(6)).join('') + '   max/min');
  for (const [fn, f] of Object.entries(filters)) {
    const qs = bank.filter(f), w = Object.fromEntries(keys.map(k => [k, 0]));
    qs.forEach(q => q.o.forEach(([, p, s]) => { w[p] += 2; w[s] += 1; }));
    const v = keys.map(k => w[k]);
    console.log(fn.padEnd(12) + String(qs.length).padStart(4) + '  ' + v.map(x => String(x).padStart(6)).join('') + '   ' + (Math.max(...v) / Math.max(1, Math.min(...v))).toFixed(2));
  }
}
table('12 Archétypes', ctx.M12, ctx.B12);
table('7 Déesses', ctx.M7, ctx.B7);
