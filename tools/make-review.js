// Génère un document de relecture des nouvelles questions : node tools/make-review.js > docs/revue-questions.md
const fs = require('fs'), path = require('path'), vm = require('vm');
function load(f) { const c = {}; vm.createContext(c); return vm.runInContext('[' + fs.readFileSync(path.join(__dirname, '..', 'docs', 'drafts', f), 'utf8') + ']', c); }
const out = [];
out.push('# Relecture des 100 nouvelles questions (v0.4.0)\n');
out.push('Pour chaque option : **archétype principal** (2 points) et *archétype secondaire* (1 point). Les options sont mélangées à l\'affichage dans l\'application.\n');
out.push('À vérifier : (1) l\'option est-elle bien représentative de l\'archétype principal ? (2) le secondaire est-il plausible ? (3) la formulation est-elle naturelle ? Indiquez les numéros de questions à corriger.\n');
for (const [title, f] of [['Monde 12 Archétypes', 'new_12.js'], ['Monde 7 Déesses', 'new_7.js']]) {
  out.push(`\n## ${title}\n`);
  let mode = '';
  for (const q of load(f)) {
    if (q.m !== mode) { mode = q.m; out.push(`\n### ${mode}\n`); }
    out.push(`**Q${q.id}** · ${q.t} · *${q.a}*  \n${q.q}\n`);
    q.o.forEach(([t, p, s]) => out.push(`- ${t} → **${p}** / *${s}*`));
    out.push('');
  }
}
console.log(out.join('\n'));
