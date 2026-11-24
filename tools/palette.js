// Palette élargie d'Archétypes Lab : 12 teintes de luminosité perceptive égale (OKLCH), en version « sombre » (sur le fond bleu nuit)
// et « papier » (rapport PDF imprimable). Contrôle : contraste ≥ 3:1 sur le fond, et distinction minimale entre toutes les paires,
// y compris sous simulation de daltonisme. Usage : node tools/palette.js
const lin = c => (c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const gam = c => 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
const toLin = hex => [1, 3, 5].map(i => lin(parseInt(hex.slice(i, i + 2), 16)));
function oklchToRgb(L, C, hDeg) {
  const h = hDeg * Math.PI / 180, a = C * Math.cos(h), b = C * Math.sin(h);
  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.2914855480 * b, 3);
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
          -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
          -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s];
}
const clamp = x => Math.max(0, Math.min(1, x));
const toHex = lrgb => '#' + lrgb.map(v => Math.round(gam(clamp(v))).toString(16).padStart(2, '0')).join('');
const lum = lrgb => 0.2126 * lrgb[0] + 0.7152 * lrgb[1] + 0.0722 * lrgb[2];
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
function toOklab(lrgb) {
  const [r, g, b] = lrgb;
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
}
const dE = (a, b) => Math.hypot(...toOklab(a).map((v, i) => v - toOklab(b)[i])) * 100;
// Simulation de daltonisme (matrices de Machado et al., sévérité 1.0, dans l'espace RGB linéaire)
const CVD = {
  protanopie: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutéranopie: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
  tritanopie: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]]
};
const sim = (m, c) => m.map(row => clamp(row[0] * c[0] + row[1] * c[1] + row[2] * c[2]));

// Teintes (angle OKLCH) et rôle sémantique : trois familles chaudes, trois vertes/turquoise, trois bleues, trois violettes/roses
const HUES = [
  ['Héros', 20, 'corail'], ['Créateur', 50, 'orange'], ['Souverain', 80, 'ambre'], ['Bouffon', 105, 'citron'],
  ['Homme ordinaire', 135, 'tilleul'], ['Protecteur', 160, 'sauge'], ['Explorateur', 190, 'turquoise'], ['Innocent', 220, 'ciel'],
  ['Sage', 255, 'bleu'], ['Magicien', 285, 'indigo'], ['Hors-la-loi', 315, 'magenta'], ['Amoureux', 350, 'rose']
];
const BG_DARK = '#1c2846', BG_PAPER = '#fbf8f3';
// La luminosité alterne légèrement (±0,05) d'une teinte à l'autre : deux teintes voisines se distinguent ainsi aussi sous daltonisme
const make = (L, C) => HUES.map(([name, h, label], i) => ({ name, label, h, lrgb: oklchToRgb(L + (i % 2 ? -0.05 : 0.05), C, h) }));
const dark = make(0.80, 0.115), paper = make(0.52, 0.125);

const report = (title, set, bg, minContrast) => {
  const bgL = toLin(bg);
  console.log(`\n${title} — fond ${bg}`);
  set.forEach(c => console.log(`  ${c.name.padEnd(16)} ${c.label.padEnd(10)} ${toHex(c.lrgb)}  contraste ${contrast(c.lrgb, bgL).toFixed(2)}:1`));
  const worst = Math.min(...set.map(c => contrast(c.lrgb, bgL)));
  console.log(`  contraste minimal ${worst.toFixed(2)}:1 ${worst >= minContrast ? 'OK (≥ ' + minContrast + ':1)' : 'INSUFFISANT'}`);
  let minPair = [Infinity], minCvd = {};
  for (let i = 0; i < set.length; i++) for (let j = i + 1; j < set.length; j++) {
    const d = dE(set[i].lrgb, set[j].lrgb); if (d < minPair[0]) minPair = [d, set[i].name, set[j].name];
    for (const [n, m] of Object.entries(CVD)) {
      const dc = dE(sim(m, set[i].lrgb), sim(m, set[j].lrgb));
      if (!minCvd[n] || dc < minCvd[n][0]) minCvd[n] = [dc, set[i].name, set[j].name];
    }
  }
  console.log(`  écart minimal entre deux teintes : ${minPair[0].toFixed(1)} (${minPair[1]} / ${minPair[2]})`);
  for (const [n, v] of Object.entries(minCvd)) console.log(`  sous ${n} : ${v[0].toFixed(1)} (${v[1]} / ${v[2]})`);
};
report('Version SOMBRE (L=0,80 ; C=0,115)', dark, BG_DARK, 3);
report('Version PAPIER (L=0,52 ; C=0,125)', paper, BG_PAPER, 3);
console.log('\nJSON sombre :', JSON.stringify(Object.fromEntries(dark.map(c => [c.name, toHex(c.lrgb)]))));
console.log('JSON papier :', JSON.stringify(Object.fromEntries(paper.map(c => [c.name, toHex(c.lrgb)]))));
