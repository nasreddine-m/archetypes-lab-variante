// Contrôle de la charte de style (docs/STYLE.md) sur toutes les questions. Usage : node tools/style-check.js [index.html]
const fs = require('fs'), path = require('path'), vm = require('vm');
const file = process.argv[2] || path.join(__dirname, '..', 'index.html');
const dp = fs.readFileSync(file, 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1].split('let state')[0];
const c = {}; vm.createContext(c); vm.runInContext(dp + ';this.B12=BANK_12;this.B7=BANK_7;', c);
const words = s => s.trim().split(/\s+/).length;
// Tutoiement (charte v0.8.0) : « vous / votre / vos » interdits. « rendez-vous » (nom) est toléré.
const VOUS = /(?<![\p{L}])(vous|votre|vos|vôtre|vôtres)(?![\p{L}])|(?<=[\p{L}])-vous(?![\p{L}])/iu;
const hasVous = s => VOUS.test(s.replace(/rendez-vous/gi, ''));
let issues = 0;
const flag = (w, q, msg) => { issues++; console.log(`  Monde ${w} Q${q.id} : ${msg}`); };
for (const [w, bank] of [['12', c.B12], ['7', c.B7]]) {
  for (const q of bank) {
    if (hasVous(q.q) || q.o.some(o => hasVous(o[0]))) flag(w, q, 'vouvoiement (la charte demande le tutoiement)');
    q.o.forEach((o, i) => {
      if (/^(Je|J')\b/.test(o[0]) || /^J'/.test(o[0])) flag(w, q, `option ${i + 1} à la première personne : « ${o[0].slice(0, 40)}… »`);
      if (words(o[0]) > 15) flag(w, q, `option ${i + 1} trop longue (${words(o[0])} mots)`);
    });
    const ws = q.o.map(o => words(o[0])); if (Math.max(...ws) - Math.min(...ws) > 9) flag(w, q, `options déséquilibrées en longueur (${ws.join('/')} mots)`);
  }
  const stat = qs => { const o = qs.flatMap(q => q.o.map(x => words(x[0]))); return (o.reduce((a, b) => a + b, 0) / o.length).toFixed(1); };
  console.log(`Monde ${w} : mots/option — questions 1-50 : ${stat(bank.filter(q => q.id <= 50))} ; questions 51-100 : ${stat(bank.filter(q => q.id > 50))}`);
}
console.log(issues ? `${issues} point(s) à revoir` : 'Charte respectée');
process.exit(issues ? 1 : 0);
