// Combien de questions faut-il pour un résultat fiable ? Simulation avec le vrai code de scoring de l'app.
// Modèle de répondant : il a deux archétypes « vrais » (T1 dominant, T2). À chaque question, avec une probabilité
// p (force du signal) il choisit l'option dont l'archétype principal est T1 (sinon T2 si présent), sinon il répond au hasard.
// Mesures : (a) l'app retrouve-t-elle T1 en tête ? (b) T1 est-il dans le top 2 ? (c) deux sessions indépendantes
// donnent-elles le même archétype en tête (fidélité test-retest) ?
// Usage : node tools/session-length.js [chemin/index.html]
const fs = require('fs'), path = require('path'), vm = require('vm');
const file = process.argv[2] || path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const dataPart = html.match(/<script>([\s\S]*?)<\/script>/)[1].split('let state')[0];
const ctx = {}; vm.createContext(ctx);
vm.runInContext(dataPart + ';this.M12=META_12;this.M7=META_7;this.B12=BANK_12;this.B7=BANK_7;this.adjustScores=adjustScores;this.rankKeys=rankKeys;', ctx);

const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => a.map(x => [Math.random(), x]).sort((x, y) => x[0] - y[0]).map(x => x[1]);

function session(bank, keys, T1, T2, n, p) {
  const qs = shuffle(bank).slice(0, n);
  const raw = Object.fromEntries(keys.map(k => [k, 0]));
  for (const q of qs) {
    let o;
    if (Math.random() < p) o = q.o.find(x => x[1] === T1) || q.o.find(x => x[1] === T2) || pick(q.o);
    else o = pick(q.o);
    raw[o[1]] += 2; raw[o[2]] += 1;
  }
  const tieRank = {}; shuffle(keys).forEach((k, i) => tieRank[k] = i);
  return ctx.rankKeys(ctx.adjustScores(raw, qs, keys), raw, tieRank);
}

function run(name, meta, bank, p, runs = 3000) {
  const keys = Object.keys(meta);
  console.log(`\n${name} — signal p = ${p} (part de réponses guidées par le vrai profil)`);
  console.log('questions'.padEnd(11) + 'top1 retrouvé'.padStart(15) + 'dans le top 2'.padStart(15) + 'test-retest top1'.padStart(19));
  for (const n of [5, 10, 15, 20, 25, 30, 40, 50]) {
    let a = 0, b = 0, c = 0;
    for (let r = 0; r < runs; r++) {
      const [T1, T2] = shuffle(keys);
      const s1 = session(bank, keys, T1, T2, n, p), s2 = session(bank, keys, T1, T2, n, p);
      if (s1[0] === T1) a++;
      if (s1[0] === T1 || s1[1] === T1) b++;
      if (s1[0] === s2[0]) c++;
    }
    const f = v => (100 * v / runs).toFixed(0) + ' %';
    console.log(String(n).padEnd(11) + f(a).padStart(15) + f(b).padStart(15) + f(c).padStart(19));
  }
}
const mondes = [['12 Archétypes', ctx.M12, ctx.B12], ['7 Déesses', ctx.M7, ctx.B7]];
for (const p of [0.5, 0.7]) for (const [name, meta, bank] of mondes) run(name, meta, bank, p);
console.log('\nRepère : au hasard pur, top1 retrouvé = ' + (100 / 12).toFixed(0) + ' % (monde 12) ou ' + (100 / 7).toFixed(0) + ' % (monde 7).');
