// Applique docs/drafts/tutoiement.js aux banques de index.html (textes uniquement, archétypes inchangés).
// Chaque ancien texte est lu dans la banque puis remplacé EXACTEMENT sur la ligne de sa question. Usage : node tools/apply-tutoiement.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const map = require(path.join(root, 'docs', 'drafts', 'tutoiement.js'));
const file = path.join(root, 'index.html');
let html = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const dp = html.match(/<script>([\s\S]*?)<\/script>/)[1].split('let state')[0];
const c = {}; vm.createContext(c); vm.runInContext(dp + ';this.B={12:BANK_12,7:BANK_7};', c);
let n = 0;
for (const w of ['12', '7']) {
  const s = html.indexOf(`const BANK_${w} = [`), e = html.indexOf('\n];', s);
  let seg = html.slice(s, e);
  for (const [id, ch] of Object.entries(map[w])) {
    const q = c.B[w].find(x => x.id === Number(id));
    if (!q) throw new Error(`Monde ${w} Q${id} introuvable`);
    const start = seg.indexOf(`\n  {id:${id},`) + 1;
    if (start < 1) throw new Error(`Monde ${w} Q${id} : ligne introuvable`);
    let end = seg.indexOf('\n', start); if (end < 0) end = seg.length;
    let line = seg.slice(start, end);
    const swap = (oldT, newT, label) => {
      const a = JSON.stringify(oldT);
      if (line.split(a).length !== 2) throw new Error(`Monde ${w} Q${id} ${label} : ${line.split(a).length - 1} occurrence(s)`);
      line = line.replace(a, () => JSON.stringify(newT)); n++;
    };
    if (ch.q) swap(q.q, ch.q, 'énoncé');
    for (const [i, t] of Object.entries(ch.o || {})) swap(q.o[Number(i) - 1][0], t, `option ${i}`);
    seg = seg.slice(0, start) + line + seg.slice(end);
  }
  html = html.slice(0, s) + seg + html.slice(e);
}
fs.writeFileSync(file, html);
console.log(`${n} textes passés au tutoiement`);
