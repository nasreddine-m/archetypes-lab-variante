# Palette élargie (v0.12.0)

Objectif : sublimer l'application sans quitter son identité (bleu nuit `#1c2846`, sable `#ebcfa9`, thème rosé des Princesses).

## Principe
Douze teintes réparties sur le cercle chromatique (OKLCH), à luminosité et saturation quasi égales (L 0,80 / C 0,115 sur fond sombre ; L 0,52 / C 0,125 sur papier), avec une alternance de ±0,05 de luminosité entre voisines pour mieux séparer les paires proches. Le bleu nuit reste dominant, le sable sert d'accent, les teintes n'apparaissent que sur les éléments qui désignent un archétype.

| Archétype | Sombre | Papier (PDF) |
|---|---|---|
| Héros | #ffafaf | #b55558 |
| Créateur | #e8986a | #904100 |
| Souverain | #f5c572 | #9d6d00 |
| Bouffon | #b9b256 | #665d00 |
| Homme ordinaire | #addf92 | #558736 |
| Protecteur | #65c495 | #006f41 |
| Explorateur | #64e6de | #008e88 |
| Innocent | #46bfe0 | #00698b |
| Sage | #9ad1ff | #4079bf |
| Magicien | #a6a3f4 | #554d9d |
| Hors-la-loi | #eab7ff | #935faa |
| Amoureux | #e58fb8 | #8c3865 |

Princesses : Athéna = Sage, Artémis = Protecteur, Hestia = Créateur, Héra = Souverain, Déméter = Homme ordinaire, Perséphone = Magicien, Aphrodite = Amoureux.

## Recherche (repères retenus)
- Un fond bleu marine dominant (environ 60 %) avec un accent chaud (environ 10 %) est une base classique et lisible.
- Les couples corail, sauge, lavande et turquoise s'accordent bien avec un bleu nuit et du sable.
- Accessibilité WCAG : 4,5:1 pour le texte, 3:1 pour les éléments graphiques.

## Contrôles (tools/palette.js, docs/palette-check.txt, tests de smoke.js)
- Sur le fond bleu nuit : contraste minimal 6,21:1.
- Sur le papier : minimal 3,79:1 (Explorateur), utilisé uniquement pour des éléments graphiques (barres, pastilles, titres de grande taille).
- Daltonisme : certaines paires restent proches (surtout Créateur et Bouffon sur papier en deutéranopie). La couleur n'est donc jamais le seul signal : chaque teinte est accompagnée du nom ou d'une icône.
