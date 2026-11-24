// Mesure l'équilibre des archétypes dans les banques de questions de index.html.
// Usage : node tools/balance.js [chemin/vers/index.html]
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const file = process.argv[2] || path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
// On ne garde que les constantes de données (avant "let state")
const dataPart = script.split('let state')[0];
const ctx = {};
vm.createContext(ctx);
vm.runInContext(dataPart + ';this.META_12=META_12;this.META_7=META_7;this.BANK_12=BANK_12;this.BANK_7=BANK_7;this.adjustScores=adjustScores;this.rankKeys=rankKeys;', ctx);

function analyse(name, meta, bank) {
  const keys = Object.keys(meta);
  const prim = Object.fromEntries(keys.map(k => [k, 0]));
  const sec = Object.fromEntries(keys.map(k => [k, 0]));
  const unknown = new Set();
  let nOpts = 0;
  for (const q of bank) {
    if (q.o.length !== 4) console.warn(`  ! Q${q.id} a ${q.o.length} options`);
    const seen = new Set();
    for (const [, p, s] of q.o) {
      nOpts++;
      if (!(p in prim)) unknown.add(p); else prim[p]++;
      if (!(s in sec)) unknown.add(s); else sec[s]++;
      if (p === s) console.warn(`  ! Q${q.id} : primaire = secondaire (${p})`);
      seen.add(p);
    }
    if (seen.size < q.o.length) console.warn(`  ! Q${q.id} : même archétype primaire sur 2 options`);
  }
  const ideal = nOpts / keys.length; // apparitions primaires attendues si équilibré
  console.log(`\n=== ${name} : ${bank.length} questions, ${nOpts} options ===`);
  console.log(`Apparitions primaires attendues si équilibré : ${ideal.toFixed(1)} par archétype`);
  console.log('Archétype'.padEnd(18) + 'prim'.padStart(5) + 'sec'.padStart(5) + 'poids'.padStart(7) + '  écart/idéal');
  const rows = keys.map(k => ({ k, p: prim[k], s: sec[k], w: prim[k] * 2 + sec[k] }))
    .sort((a, b) => b.w - a.w);
  const idealW = (nOpts * 3) / keys.length;
  for (const r of rows) {
    const dev = ((r.w / idealW - 1) * 100).toFixed(0);
    console.log(r.k.padEnd(18) + String(r.p).padStart(5) + String(r.s).padStart(5) + String(r.w).padStart(7) + `  ${dev >= 0 ? '+' : ''}${dev}%`);
  }
  const ws = rows.map(r => r.w);
  console.log(`Rapport max/min des poids : ${(Math.max(...ws) / Math.min(...ws)).toFixed(2)}`);
  if (unknown.size) console.warn('  ! Archétypes inconnus :', [...unknown].join(', '));

  // Pools par mode
  const pools = {
    decl: bank.filter(q => q.m === 'Déclaratif').length,
    obs: bank.filter(q => q.m === 'Observation').length,
    dilemme: bank.filter(q => q.t === 'dilemme').length,
    miroir: bank.filter(q => q.t === 'miroir').length,
  };
  console.log('Taille des pools :', JSON.stringify(pools), pools.miroir <= 10 ? ' <-- miroir <= 10 : aucun tirage aléatoire possible' : '');
  return { prim, sec, keys };
}

// Simulation : un répondant aléatoire uniforme (10 questions, mode "random")
function simulate(name, meta, bank, runs = 20000) {
  const keys = Object.keys(meta);
  const top1 = Object.fromEntries(keys.map(k => [k, 0]));
  const top1Adj = Object.fromEntries(keys.map(k => [k, 0]));
  let ties = 0, tiesAdj = 0;
  for (let r = 0; r < runs; r++) {
    const qs = bank.slice().sort(() => Math.random() - 0.5).slice(0, 10);
    const sc = Object.fromEntries(keys.map(k => [k, 0]));
    for (const q of qs) {
      const o = q.o[Math.floor(Math.random() * q.o.length)];
      sc[o[1]] += 2; sc[o[2]] += 1;
    }
    // Tirage de départage aléatoire (comme dans l'application : tieRank par session)
    const tieRank = {};
    keys.slice().sort(() => Math.random() - 0.5).forEach((k, i) => tieRank[k] = i);
    const zero = Object.fromEntries(keys.map(k => [k, 0]));
    const rawOrder = ctx.rankKeys(sc, zero, tieRank);   // brut, départage aléatoire
    if (sc[rawOrder[0]] === sc[rawOrder[1]]) ties++;
    top1[rawOrder[0]]++;
    const adj = ctx.adjustScores(sc, qs, keys);          // scoring v0.2.0 (code réel de l'app)
    const adjOrder = ctx.rankKeys(adj, sc, tieRank);
    if (adj[adjOrder[0]] === adj[adjOrder[1]]) tiesAdj++;
    top1Adj[adjOrder[0]]++;
  }
  const pct = v => (100 * v / runs).toFixed(1) + '%';
  console.log(`
--- Simulation ${name} : ${runs} répondants aléatoires (10 q.) ---`);
  console.log(`Part attendue si équilibré : ${(100 / keys.length).toFixed(1)}% chacun`);
  console.log(`Égalité en tête : brut ${pct(ties)}  |  ajusté ${pct(tiesAdj)}`);
  console.log('Archétype'.padEnd(18) + 'brut'.padStart(8) + 'ajusté'.padStart(9));
  Object.entries(top1Adj).sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(k.padEnd(18) + pct(top1[k]).padStart(8) + pct(v).padStart(9)));
}

analyse('12 Archétypes', ctx.META_12, ctx.BANK_12);
simulate('12 Archétypes', ctx.META_12, ctx.BANK_12);
analyse('7 Déesses', ctx.META_7, ctx.BANK_7);
simulate('7 Déesses', ctx.META_7, ctx.BANK_7);

// Simulation par mode de tirage (scoring ajusté, répondant aléatoire) : un mode peut être déséquilibré
// même si la banque entière est équilibrée.
function simulateModes(name, meta, bank, runs = 20000) {
  const keys = Object.keys(meta);
  const modes = {
    'Déclaratif': q => q.m === 'Déclaratif', 'Observation': q => q.m === 'Observation',
    'Dilemmes': q => q.t === 'dilemme', 'Miroir': q => q.t === 'miroir', 'Intégral': () => true,
  };
  console.log(`\n--- Par mode, ${name} (ajusté ; idéal ${(100 / keys.length).toFixed(1)}% chacun) ---`);
  for (const [label, f] of Object.entries(modes)) {
    const pool = bank.filter(f), top = Object.fromEntries(keys.map(k => [k, 0]));
    for (let r = 0; r < runs; r++) {
      const qs = pool.slice().sort(() => Math.random() - 0.5).slice(0, 10);
      const sc = Object.fromEntries(keys.map(k => [k, 0]));
      for (const q of qs) { const o = q.o[Math.floor(Math.random() * q.o.length)]; sc[o[1]] += 2; sc[o[2]] += 1; }
      const tieRank = {}; keys.slice().sort(() => Math.random() - 0.5).forEach((k, i) => tieRank[k] = i);
      top[ctx.rankKeys(ctx.adjustScores(sc, qs, keys), sc, tieRank)[0]]++;
    }
    const sh = Object.entries(top).map(([k, v]) => [k, 100 * v / runs]).sort((a, b) => a[1] - b[1]);
    console.log(label.padEnd(12) + `n=${String(pool.length).padStart(3)}  min ${sh[0][1].toFixed(1)}% (${sh[0][0]})  max ${sh[sh.length - 1][1].toFixed(1)}% (${sh[sh.length - 1][0]})`);
  }
}
simulateModes('12 Archétypes', ctx.META_12, ctx.BANK_12);
simulateModes('7 Déesses', ctx.META_7, ctx.BANK_7);
