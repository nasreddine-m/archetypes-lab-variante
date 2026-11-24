// Applique docs/drafts/restyle.js (nouveaux textes) aux brouillons new_12.js / new_7.js SANS toucher aux archétypes,
// puis remplace les questions 51-100 dans index.html. Usage : node tools/apply-restyle.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const restyle = require(path.join(root, 'docs', 'drafts', 'restyle.js'));
const J = JSON.stringify;
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/\r\n/g, '\n');

for (const world of ['12', '7']) {
  const file = path.join(root, 'docs', 'drafts', `new_${world}.js`);
  const c = {}; vm.createContext(c);
  const qs = vm.runInContext('[' + fs.readFileSync(file, 'utf8') + ']', c);
  const out = [];
  for (const q of qs) {
    const r = restyle[world][q.id];
    if (!r) throw new Error(`Monde ${world} : pas de réécriture pour Q${q.id}`);
    if (r.o.length !== q.o.length) throw new Error(`Monde ${world} Q${q.id} : ${r.o.length} options au lieu de ${q.o.length}`);
    const o = q.o.map(([, p, s], i) => `[${J(r.o[i])},${J(p)},${J(s)}]`).join(',');
    if (q.id === 76) out.push('');
    out.push(`  {id:${q.id},m:${J(q.m)},t:${J(q.t)},a:${J(q.a)},q:${J(r.q)},o:[${o}]}`);
  }
  const fragment = out.join(',\n').replace(/,\n\n/g, ',\n\n').replace(/\n,\n/g, '\n\n'); // ligne vide avant Q76
  const frag = out.map((l, i) => (l === '' ? '' : l + (i < out.length - 1 && out[i + 1] !== '' ? ',' : (i < out.length - 1 ? ',' : '')))).join('\n');
  fs.writeFileSync(file, frag.replace(/\n\n/, '\n\n') + '\n');

  const s = html.indexOf(`const BANK_${world} = [`), e = html.indexOf('\n];', s);
  const bank = html.slice(s, e), cut = bank.indexOf('  {id:51,');
  if (cut < 0) throw new Error(`Monde ${world} : Q51 introuvable dans index.html`);
  html = html.slice(0, s) + bank.slice(0, cut).replace(/,\s*$/, '') + ',\n\n' + frag + html.slice(e);
  console.log(`Monde ${world} : ${qs.length} questions réécrites`);
}
fs.writeFileSync(path.join(root, 'index.html'), html);
