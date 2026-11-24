// Fusionne un fragment de questions (docs/drafts/new_XX.js) dans une banque d'index.html et valide la structure.
// Usage : node tools/merge-bank.js <12|7> <fragment.js> <sortie.html> [entrée.html]
// Sans entrée explicite, la base est index.html. Le fichier d'entrée n'est jamais modifié.
const fs = require('fs'), path = require('path'), vm = require('vm');
const [world, fragFile, outFile, inFile] = process.argv.slice(2);
if (!['12', '7'].includes(world) || !fragFile || !outFile) {
  console.error('Usage : node tools/merge-bank.js <12|7> <fragment.js> <sortie.html> [entrée.html]'); process.exit(2);
}
const base = inFile || path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(base, 'utf8').replace(/\r\n/g, '\n');
const fragment = fs.readFileSync(fragFile, 'utf8').replace(/\r\n/g, '\n').replace(/\s+$/, '');

const start = html.indexOf(`const BANK_${world} = [`);
const end = html.indexOf('\n];', start);
if (start < 0 || end < 0) { console.error('Banque introuvable'); process.exit(2); }
html = html.slice(0, end) + ',\n\n' + fragment + html.slice(end);
fs.writeFileSync(outFile, html);

// --- Validation -------------------------------------------------------------
const dataPart = html.match(/<script>([\s\S]*?)<\/script>/)[1].split('let state')[0];
const ctx = {}; vm.createContext(ctx);
vm.runInContext(dataPart + ';this.META=META_' + world + ';this.BANK=BANK_' + world + ';', ctx);
const keys = new Set(Object.keys(ctx.META));
let problems = 0;
const bad = (id, msg) => { problems++; console.log(`  ! Q${id} : ${msg}`); };
const ids = new Set(), texts = new Set();
for (const q of ctx.BANK) {
  if (ids.has(q.id)) bad(q.id, 'id en double'); ids.add(q.id);
  if (!['Déclaratif', 'Observation'].includes(q.m)) bad(q.id, `mode invalide « ${q.m} »`);
  if (!['core', 'social', 'dilemme', 'miroir', 'obs_gen'].includes(q.t)) bad(q.id, `type invalide « ${q.t} »`);
  if (!q.a || !q.q) bad(q.id, 'axe ou énoncé vide');
  if (texts.has(q.q)) bad(q.id, 'énoncé en double'); texts.add(q.q);
  if (q.o.length !== 4) bad(q.id, `${q.o.length} options`);
  const prim = new Set();
  q.o.forEach(([txt, p, s]) => {
    if (!keys.has(p)) bad(q.id, `primaire inconnu « ${p} »`);
    if (!keys.has(s)) bad(q.id, `secondaire inconnu « ${s} »`);
    if (p === s) bad(q.id, `primaire = secondaire (${p})`);
    if (prim.has(p)) bad(q.id, `primaire ${p} en double`); prim.add(p);
    if (!txt || txt.length < 10) bad(q.id, 'texte d\'option trop court');
  });
}
const maxId = Math.max(...ctx.BANK.map(q => q.id));
if (ctx.BANK.length !== maxId) bad('-', `${ctx.BANK.length} questions mais id max = ${maxId}`);
console.log(problems ? `${problems} problème(s) de structure` : `Structure OK : ${ctx.BANK.length} questions (monde ${world})`);
process.exit(problems ? 1 : 0);
