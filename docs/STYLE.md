# Charte de style des questions

Établie à partir des 50 questions d'origine de chaque univers (voix de l'auteur) et vérifiée automatiquement par `node tools/style-check.js`.

## Règles

1. **Tutoiement** dans tous les énoncés, toutes les options et tous les textes de l'application (jamais de « vous », « votre », « vos »). Choix de l'auteur en v0.8.0, pour un public jeune ; avant, la charte imposait le vouvoiement.
2. **Aucune première personne** dans les options : pas de « Je… », « J'… », « Me… ». Les questions d'origine n'en ont aucune.
3. **Longueur** : 8 à 12 mots par option (moyenne visée ≈ 10, maximum 15). Écart de longueur entre options d'une même question limité (9 mots maximum).
4. **Formes parallèles** au sein d'une question : toutes les options à l'infinitif (« Profiter du soleil… »), ou toutes en groupes nominaux (« Un monde où… », « Les moments où… »), ou toutes en « Celui qui… ».
5. **Questions Déclaratif** : options impersonnelles (infinitif, groupe nominal, « on »), ou « Tu… » (forme déjà présente dans les questions d'origine du monde 7, alors au vouvoiement).
6. **Questions Observation / Miroir / Réflexe** : « Il/Elle + présent » (ou « Celle de… » pour une impression). Énoncé préfixé `OBSERVATION :`, `MIROIR SOCIAL :`, `RÉFLEXE SOUS PRESSION :` ou `ARBITRAGE FORCÉ :`.
7. **Arbitrages forcés** : « Que préserve-t-il coûte que coûte ? » (choix positif, pas de « renoncer à… »).
8. **Guillemets « » uniquement** pour une devise ou une citation (questions du type « Quelle phrase résume… ? »).
9. **Registre** : sobre et direct, scènes de vie ou de travail sans mise en scène émotionnelle ; pas de listes à rallonge, un seul « : » par option au maximum.
10. **Genre** : formulations neutres quand c'est possible (« quelqu'un de… »). Le monde 7 reste au féminin pour la personne observée (« Elle… »), comme à l'origine.

## Mesure (v0.6.0)

| | Questions d'origine (1-50) | Questions ajoutées (51-100) avant | après |
|---|---|---|---|
| Monde 12, mots par option | 10,0 | 12,7 | **10,5** |
| Monde 7, mots par option | 10,2 | 13,1 | **11,3** |
| Options à la première personne | 0 % | 13 % / 16 % | **0 %** |
| Énoncés tutoyés | 14 % (monde 12) | 0 % | **0 %** (v0.6.0) ; **passage de tout le contenu au tutoiement en v0.8.0** |

Changements de texte seulement : les archétypes principal et secondaire de chaque option sont inchangés, les poids de la banque sont identiques avant/après (vérifié avec `tools/pools.js`).
