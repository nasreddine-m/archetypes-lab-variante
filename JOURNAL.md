# Journal de bord — Archétypes Lab

Objectif final : une application qui tourne sur **iOS (Safari / écran d'accueil)** et **Chrome** (desktop et Android).

## Résumé de l'évolution (à tenir à jour)

| Version | Date | Statut | En une ligne |
|---|---|---|---|
| v0.1.0 | 2026-11-23 | Base | Import de l'application d'origine (fichier unique), dépôt Git, outil de mesure d'équilibre |
| v0.2.0 | 2026-11-23 | Scoring | Indice ajusté par l'exposition de chaque archétype, chrono expiré sans point, départage aléatoire, correction Q33 (monde 7) |
| v0.3.0 | 2026-11-23 | PWA | Installable (manifeste, icônes, écran d'accueil iOS, bouton Installer Chrome), hors-ligne via service worker, version affichée |
| v0.4.0 | 2026-11-23 | Banque (publiée sur `main` pour test par l'auteur, relecture en cours) | 100 questions par univers (50 → 100), options rééquilibrées : rapport max/min des poids 3,68 → 1,24 (monde 12) et 1,61 → 1,12 (monde 7) |
| v0.5.0 | 2026-11-23 | Synthèse | Paragraphe de synthèse du profil sous le radar (portrait en 3 paragraphes : moteur, nuance, relations, ombre, piste, archétypes les moins mobilisés) |
| v0.6.0 | 2026-11-23 | Style | Style unifié sur la voix des questions d'origine (charte `docs/STYLE.md`) : vouvoiement partout, plus de « Je… », options de ≈ 10 mots ; contrôle automatique |
| v0.7.0 | 2026-11-23 | Longueur | Longueur de session au choix : 10 (aperçu), **20 (standard, par défaut)**, 30 (approfondi) ; modes plus petits limités à leur taille ; longueur verrouillée en mode Duo |
| v0.8.0 | 2026-11-23 | Tutoiement | Tout le contenu passe au **tutoiement** (200 questions, synthèse, interface), choix de l'auteur pour un public jeune ; charte et contrôle automatique inversés |
| v0.9.0 | 2026-11-23 | Affinage visuel | Même identité (bleu nuit et or), interface plus claire : accueil simplifié, mode replié, question sans surtitre, résultats à barres, radar sans étiquettes coupées, états de focus, animation discrète, zoom autorisé ; « Déesses » devient « Princesses » dans l'intitulé |
| v0.10.0 | 2026-11-23 | Suite | Les quatre améliorations : historique local, partage (carte image + texte), « Affiner » (+10 questions sur la même session), seuils de force du profil calibrés sur des réponses au hasard |
| v0.13.3 | 2026-11-23 | Questions stables | Fin de l'alternance crème / bleu nuit d'une question à l'autre : la carte de question reste en bleu nuit pour ne pas distraire |
| v0.13.2 | 2026-11-23 | Mise à jour fiable | La page est toujours demandée sans cache HTTP (GitHub Pages la garde 10 min), vérification d'une nouvelle version à chaque ouverture, rechargement automatique quand elle est prête |
| v0.13.1 | 2026-11-23 | Illustration d'accueil | Le radar du hero (qui évoquait un oiseau) est remplacé par une rosace de 12 pétales aux couleurs des archétypes, sur un médaillon crème |
| v0.13.0 | 2026-11-23 | Alternance et icônes | Bandes crème / bleu nuit sur toutes les pages, petites icônes sur l'accueil ; mode clair reporté |
| v0.12.2 | 2026-11-23 | Vocabulaire | « Six façons de jouer » devient « Six façons de participer » (le vocabulaire de jeu est évité dans l'interface) |
| v0.12.1 | 2026-11-23 | Finitions | Radar sur panneau crème (comme le rapport PDF), polices moins lourdes |
| v0.12.0 | 2026-11-23 | Accueil et rapport | Page d'accueil de concept (illustration, modes expliqués), bouton Accueil partout, palette élargie de 12 teintes, rapport PDF d'une page |
| v0.11.0 | 2026-11-23 | Cinq demandes | Palette plus claire et douce, figures associées (repères culturels sourcés), tampon d'archétype à côté de la synthèse, fiches des profils types, envoi par e-mail |

**État actuel :** PWA statique (`index.html` + `manifest.json` + `sw.js` + `icons/`), 2 univers de 100 questions (12 Archétypes, 7 Déesses), 6 modes de tirage, radar canvas, synthèse du profil, comparaison Duo. Le biais de scoring et de banque est faible (v0.4.0 : rapport max/min des poids 1,24 et 1,12). Tests réels (2026-11-23) : iPhone (Safari) OK — installation, ouverture, hors-ligne en mode avion ; Windows OK après une erreur DNS passagère (`DNS_PROBE_FINISHED_NXDOMAIN`, résolue en relançant, aucun défaut dans l'app). Installation depuis Chrome (icône « Installer ») et hors-ligne sur Windows non encore confirmés.

**Prochaines étapes (v0.11.0 faite : couleurs, figures, tampon, fiches, e-mail) :** pistes restantes : comparer deux résultats de l'historique (évolution), export des données, neutralisation du genre du monde 7, test sur vrai iPhone du partage de fichier. Anciennes étapes : (0) **refonte visuelle pour un public jeune** (évaluation du 2026-11-23, voir ci-dessous) : accueil simplifié, carte de résultat partageable, barres au lieu de chiffres, couleur et icône par archétype, transitions ; l'auteur a demandé d'utiliser l'outil « impeccable », **non installé** dans cet environnement : décision en attente (A23) ; (1) tester la v0.8.0 sur iPhone et Windows (installation à jour, tutoiement, longueurs 10/20/30, mode Duo) ; (2) bibliothèque de 6 options dont 4 tirées : **reportée** par l'auteur, on reste à 4 options pour le moment (backlog 8, décision A17) ; (3) pistes : résultat provisoire à 10 questions avec « Affiner de 10 questions », historique local, partage/export, neutralisation du genre du monde 7.

**Procédure de release :** modifier `APP_VERSION` (index.html) et `CACHE_VERSION` (sw.js) avec la même valeur, lancer `node tools/smoke.js`, commit, push. Sans changement de version, les téléphones gardent l'ancienne version en cache.

---

## Journal des versions et modifications

### v0.13.0 — 2026-11-23 — Alternance crème / bleu nuit et icônes
**Surfaces crème.** Une classe `.paper` redéfinit localement les variables de couleur (fond crème #fbf8f3, texte et accent bleu nuit, sable sur les boutons, teintes d'archétypes en version « papier »). Tout le CSS existant s'adapte sans règle en plus. Accueil : 5 bandes pleine largeur qui alternent (hero bleu, concept crème, univers bleu, façons de participer crème, résultat bleu, fin crème). Réglages : cartes « Combien de questions ? » et historique en crème. Question : la carte alterne crème / bleu d'une question à l'autre. Résultats : signature et profils types en crème, résumé et classement en bleu. Fiche : le texte en crème.
**Icônes.** 18 icônes dessinées (trait), regroupées dans un sprite SVG et placées devant les titres de section, les modes, les usages et les contenus du résultat. Pas d'émoji.
**Mode clair : reporté** (A40).

### v0.12.1 — 2026-11-23 — Finitions demandées après essai du PDF
**Radar sur fond clair.** Le radar des résultats est posé sur un panneau crème (#fbf8f3, même papier que le rapport PDF) avec les couleurs « papier » de l'archétype dominant ; un fond blanc pur aurait été trop dur sur le bleu nuit. **Polices moins chargées.** Les titres en graisse 800 passent à 600 (accueil, fiches, longueurs) et à 700 sur la carte de partage et le PDF.

### v0.12.0 — 2026-11-23 — Page d'accueil, palette élargie, rapport PDF
**1. Page d'accueil.** Affichée au démarrage : illustration (les 12 archétypes en couronne autour d'un profil qui « respire », animation coupée si l'utilisateur réduit les animations), explication du concept en 3 étapes, les deux univers (cartes qui ouvrent directement les réglages), les six modes, les trois longueurs, les usages (se découvrir, décrire quelqu'un, Duo, affiner), ce que contient le résultat, mention « pas un diagnostic » et « rien ne quitte ton téléphone ». C'est le contenu de l'explication des modes donnée en conversation.
**2. Bouton « Accueil ».** Dans l'en-tête de toutes les autres pages (icône dessinée, pas d'émoji). En pleine session avec des réponses, un premier appui demande « Quitter la session ? » (3 s), le second quitte.
**3. Palette élargie.** 12 teintes de luminosité perceptive égale (tools/palette.js, détail dans docs/palette.md et docs/palette-check.txt), une par archétype, versions sombre et « papier ». Utilisées sur l'accueil, les tampons, les barres du classement et le rapport. Fond bleu nuit et sable inchangés. Les 7 Princesses reprennent sept teintes du monde 12.
**4. Rapport PDF d'une page.** Bouton « Rapport PDF (1 page) » : A4 dessiné sur canvas (signature, tampon, radar, classement avec repère du hasard, lecture, 3 points forts, 3 points à travailler, pistes, fiabilité), emballé dans un PDF écrit à la main (aucune bibliothèque, hors-ligne). Partage natif sur mobile (les applications e-mail apparaissent), téléchargement sinon. Limite : le texte du PDF est une image, non sélectionnable.
**Vérifications :** 130 contrôles (accueil, navigation, contrastes de palette, contenu du rapport, structure du PDF avec tableau xref exact, canvas A4).

### v0.11.0 — 2026-11-23 — Cinq demandes de l'auteur
**1. Figures associées (avec une limite à retenir).** Demande : « chercher des personnes réelles ayant ce profil ». Trois recherches web n'ont trouvé **aucune source de référence** (Pearson, Mark, Bolen) qui associe des personnes réelles aux archétypes ; seuls des sites de vulgarisation citent quelques figures, souvent fictives, et personne n'a passé ce test : une personne réelle ne « a » donc pas un profil (A31). Retenu : des **repères culturels** appuyés sur ces recherches (Einstein et Yoda pour le Sage, Steve Jobs et Gandalf pour le Magicien, Amelia Earhart, Léonard de Vinci, Mère Teresa, etc.), affichés dans la synthèse (« Figures souvent associées au Sage (repères culturels) : … ») et dans la fiche, avec la mention qu'il ne s'agit pas de profils réels. **Aucune figure pour le Bouffon** (seule piste : un acteur cité pour ses rôles) **ni pour les 7 Princesses** (aucune source) : rien n'a été inventé. Sources et écarts : `docs/figures-sources.md`.

**2. Couleurs plus douces et plus claires.** Même identité (bleu, sable, thème rosé), mais fond bleu plus clair (`#1c2846` au lieu de `#0f172a`), cartes et accent éclaircis (sable `#ebcfa9`), thème Princesses éclairci (`#3b2543`, accent `#f3d2b3`). Contrastes recalculés (texte atténué sur cartes ≥ 4,9:1). La couleur de la barre du navigateur et du manifeste suit. Pas de mode clair complet : à décider si « tons plus clairs » visait un fond blanc (A35).

**3. Envoi par e-mail.** Bouton « Envoyer par e-mail » : ouvre l'application e-mail de l'appareil avec sujet et texte préremplis (sujet, signature, top 3 avec indices, synthèse, lien, mention « pas un diagnostic »), via un lien `mailto:` limité à 1900 caractères (repli automatique sur un texte plus court). C'est l'utilisateur qui choisit le destinataire et envoie : **aucun serveur, aucune adresse collectée** (A34).

**4. Tampon.** Chaque archétype a un **tampon circulaire dessiné** (nom en majuscules sur l'arc du haut, « Archétypes Lab » en bas, emblème au trait au centre, légère rotation et contour rugueux) : 12 + 7 emblèmes (compas, livre, éclair, couronne, bouclier, flamme, épi, etc.). Il est placé **à droite de la synthèse** (le texte l'épouse) et sur chaque fiche (A32). Non ajouté à la carte de partage (limite).

**5. Les deux profils types.** Une carte « Tes deux profils types » sous la synthèse ouvre la **fiche** de chacun des deux archétypes principaux : tampon, moteur, ce que l'archétype apporte, relations, zone d'ombre, piste, figures associées ; chaque ligne du classement ouvre aussi sa fiche (accessible au clavier) (A33). Compris comme « les deux archétypes principaux de ton résultat » ; à corriger si l'auteur voulait dire autre chose (par exemple consulter les deux univers).

**Vérifications.** 116 contrôles de `tools/smoke.js` passent (dont : 19 emblèmes, 19 SVG de tampon complets avec identifiants de tracé uniques, figures seulement pour le monde 12, aucune figure pour le Bouffon, ouverture/retour de fiche, fiche Princesses, e-mail < 1950 caractères avec mention et lien). Captures : nuancier des 19 tampons, résultat Archétypes, fiche, thème Princesses. **Non testé sur un vrai iPhone** (rendu des chemins de texte SVG et ouverture de l'application e-mail à valider).

**Limites.** (1) Les repères culturels viennent de sites non académiques et sont subjectifs. (2) L'e-mail n'envoie pas l'image : c'est du texte (l'image passe par « Partager »). (3) Le tampon n'est pas sur la carte de partage. (4) Les fiches reprennent les textes de la synthèse : même contenu, présenté par archétype.

### v0.10.0 — 2026-11-23 — Historique, partage, affiner, seuils calibrés
Les « 4 améliorations » : les quatre pistes listées par l'assistant après la v0.7.0 (historique local, partage/export, résultat provisoire avec « Affiner », calibrage du seuil de synthèse). Même identité visuelle (A26).

**1. Seuils calibrés (constat important).** `tools/calibrate-threshold.js` (20 000 répondants au hasard par cellule, résultats dans `docs/threshold-calibration.txt`) montre que **même en répondant au hasard, le n° 1 dépasse largement 100** : médiane 229 pour 12 archétypes et 10 questions (186 à 20 q., 168 à 30 q.), 174 / 150 / 141 pour les 7 Princesses. L'ancien seuil fixe de 130 ne signalait donc presque jamais un profil « peu contrasté », et la légende « au-dessus de 100 = vraie affinité » était **trompeuse pour les premiers rangs**. Corrigé : `profileStrength` classe le n° 1 en 3 niveaux (A27) — *flat* sous le 75e centile du hasard (texte « profil peu contrasté »), *moderate* entre le 75e et le 95e (la synthèse ajoute « le signal reste modéré » et invite à affiner avant 30 questions), *clear* au-delà. La légende du classement affiche le repère réel (« même au hasard, le n° 1 monte vers 229 »), et chaque barre porte un **trait vertical** à ce repère.

**2. Affiner.** Sous un résultat de moins de 30 questions, une carte propose « Affiner : +10 questions » : la session continue avec des questions **jamais vues** du même mode, les scores s'additionnent, le compteur indique « Question 11 / 20 », le plafond est 30 (A28). Proposé seulement s'il reste au moins 5 questions neuves (donc pas en Miroir à 20/22) et hors mode Duo. Mode mixte : moitié-moitié conservée. Le résultat de l'aperçu est présenté comme **provisoire**.

**3. Historique local.** Chaque session terminée est enregistrée sur l'appareil (clé `arch_history`, 30 entrées maximum, `localStorage`) : date, sujet, mode, longueur, indices ajustés et classement (pas les réponses). Une session affinée **met à jour sa propre entrée**. Carte « Historique » repliée sur l'accueil : réouverture d'un résultat complet (sans « Affiner » ni Duo, bouton « Retour »), suppression d'une entrée, « Tout effacer » en deux appuis (A29). Rien n'est envoyé nulle part ; vider les données du site efface l'historique.

**4. Partage et export.** « Partager mon profil » dessine une **carte 1080 × 1350** (format story) aux couleurs du thème (nom, deux archétypes, radar, top 3, mention « pas un diagnostic ») et l'envoie par le partage natif du téléphone ; si l'appareil ne partage pas de fichier, l'image est téléchargée. « Copier le résumé » met un texte (sujet, signature, moteur, ombre, lien) dans le presse-papiers (A30). Aucun service externe. Le radar est dessiné par la même fonction que l'écran (paramétrée par taille).

**Vérifications.** `tools/smoke.js` : 106 contrôles passent, dont : seuils aux bornes, texte « modéré » avant/après 30 questions, affiner (10 → 20 → 30, questions distinctes, scores additionnés, plafond, une seule entrée d'historique, mode mixte 10 + 10, refus en Miroir), historique (plafond 30, réouverture, suppression, double appui), texte de partage et dessin de la carte. Captures de contrôle : résultat provisoire avec carte « Affiner », classement avec repère du hasard, accueil avec historique, carte de partage dans les thèmes Archétypes et Princesses (deux défauts corrigés avant publication : titre « ArchétypesLab » sans espace, pied de page débordant de la carte).

**Limites.** (1) Le partage de **fichier** dépend de l'appareil : prévu pour Safari iOS 15+ et Chrome Android ; sur ordinateur, repli par téléchargement. **Non testé sur un vrai iPhone.** (2) L'historique est propre à chaque navigateur et appareil (pas de synchronisation). (3) Les seuils viennent de réponses au hasard idéalisées ; ils servent de repère, pas de test statistique. (4) Un résultat réouvert depuis l'historique n'a pas les réponses d'origine : pas d'« Affiner » ni de Duo.

### v0.9.0 — 2026-11-23 — Affinage visuel (identité d'origine conservée)
- **Contexte** : à la demande de l'auteur, le skill « impeccable » a été installé (A24) et utilisé. Deux séries de directions visuelles complètes (10 mondes examinés, 7 cartes présentées) ont été **refusées** : « trop ludiques et trop fantaisistes ». L'auteur a ensuite tranché : « reste dans le style de la version initiale » (A26). Le tirage de directions est abandonné ; le travail devient un **affinage** de l'existant (commande « polish » : l'identité d'origine reste l'autorité).
- **Accueil** : une phrase d'accroche, la longueur en premier, le **mode replié** dans une ligne « Mode » (liste à choix radio au dépliage, au lieu de six cartes identiques), « Pour qui ? » (défaut « Moi-même » au lieu de « Profil Test »), chronomètre en ligne avec explication, **bouton de lancement collé en bas** de l'écran. « Les 7 Déesses » devient « Les 7 Princesses » (intitulé seulement).
- **Question** : suppression du surtitre en capitales au-dessus de l'énoncé (règle du skill : pas de surtitre au-dessus d'un titre), énoncé à 20 px, options de 56 px minimum de haut, **animation d'entrée unique** (0,4 s, courbe exponentielle), barre de progression plus épaisse, abandon **en deux temps** (« Appuie encore pour abandonner »).
- **Résultats** : titres de sections à la place des étiquettes en capitales, **classement à barres** (n° 1 et 2 en or, les autres en teinte neutre, « — » à la place d'un 0), radar agrandi avec **noms longs sur deux lignes** (plus de coupe à droite) et couleurs qui suivent le thème Archétypes / Princesses.
- **Transversal** : aucune police sous 12 px (avant : 10,5 à 11 px), contrôles d'au moins 44 px, états de survol / focus clavier / appui / désactivé, sélection de texte, curseur et barre de défilement aux couleurs du thème, chiffres alignés (tabulaires), `prefers-reduced-motion` respecté, zoom autorisé (suppression de `user-scalable=no`).
- **Inchangé** : palette, police système, textes et ordre des 200 questions, Duo, chrono, longueurs, synthèse, scoring. Les 100 contrôles de `tools/smoke.js` passent.
- Vérifié par captures (Chrome sans fenêtre, 500 px) : accueil replié et déplié, question, résultats Archétypes et Princesses. **Pas testé sur un vrai iPhone** : à valider par l'auteur.
- Le relecteur indépendant et la documentation `DESIGN.md` du skill n'ont pas été lancés : ce cycle est prévu pour un nouveau monde visuel, pas pour un affinage.

### v0.8.0 — 2026-11-23 — Tutoiement
- **Décision de l'auteur** : « je préfère tu » (A22). La charte de style passe du vouvoiement au tutoiement (`docs/STYLE.md`, règle 1).
- **254 textes réécrits à la main** (conjugaisons, pronoms réfléchis, inversions) : 115 questions des deux mondes (énoncés et options, dont une partie des questions d'origine passée au « vous » en v0.6.0), les 40 champs de la synthèse du profil (table `SYNTH`) et les phrases d'interface (« Relance une session », « Choisis maintenant un second mode », « préfère 20 questions ou plus »…). Données : `docs/drafts/tutoiement.js` ; outil : `tools/apply-tutoiement.js`. Les archétypes principal/secondaire ne sont pas touchés : les poids sont identiques (rapports 1,24 et 1,12).
- `tools/style-check.js` inversé : il signale désormais tout « vous / votre / vos » (sauf le nom « rendez-vous »). Le test de bout en bout l'inclut.
- Une faute repérée à la relecture avant publication : « tu disséques » corrigé en « tu dissèques ». Un « vous » pluriel (« ce que vous avez bâti ensemble ») remplacé par une tournure impersonnelle.
- **Limite :** la correction grammaticale est relue par moi et vérifiée par motif, pas par un correcteur orthographique ; quelques tournures peuvent encore sonner moins naturelles à l'oral. À signaler lors du test.
- Le monde 7 reste au féminin pour la personne interrogée (« seule », « enfermée », « alignée »), comme à l'origine.

### Évaluation de la présentation (2026-11-23, captures du site à 500 px de large, Chrome sans fenêtre)
Constat : propre, cohérent, lisible, mais **sobre et plutôt « adulte »** pour un public de 15-25 ans. Points faibles : accueil en forme de formulaire de réglages (4 cartes avant la première question), vocabulaire académique (« Mode de tirage dynamique », « Tirage Intégral »), résultats techniques (indices 286/215/160 puis une série de 0), aucune carte de résultat à partager, aucune identité visuelle par archétype, interface statique, polices d'aide à 10,5-11 px, pas de mode clair. Plan proposé : (1) accueil simplifié avec un seul gros bouton et réglages repliés ; (2) carte de résultat partageable (Web Share) ; (3) barres colorées et « peu présent » à la place des 0 ; (4) couleur et icône par archétype ; (5) transitions et encouragements ; (6) textes moins académiques ; (7) polices ≥ 12 px et mode clair optionnel. Limite : captures à 500 px, pas un vrai iPhone.

### v0.7.0 — 2026-11-23 — Longueur de session au choix
- **Recommandation validée par l'auteur** (« ok ») après l'étude de fiabilité (A19) : trois formules, **Standard 20 par défaut**.
- Nouvelle carte « Longueur de la session » : **10 Aperçu (≈ 2 min), 20 Standard (≈ 4-5 min), 30 Approfondi (≈ 7 min)**. Le choix est mémorisé (`localStorage`, clé `arch_length`). Le bouton de lancement affiche le nombre exact de questions.
- Le « 10 » codé en dur est remplacé par `state.length` (demandé) et `state.total` (réellement tiré) : compteur « Question x / N », barre de progression, détection de fin de session, message « temps écoulé sur les N questions », compte des questions sans réponse.
- **Modes plus petits que la longueur demandée** (A20) : la session est limitée à la taille du mode et la note l'indique. Miroir Social : 22 (monde 12) / 21 (monde 7) ; Dilemmes : 27 / 28 ; mode mixte : moitié-moitié (10, 20 ou 30). Déclaratif, Observation, Tirage intégral : aucune limite jusqu'à 30.
- **Mode Duo** : la longueur est **verrouillée** à celle du passage 1 (boutons désactivés) pour comparer ce qui est comparable ; le diagnostic affiche le nombre de réponses de chaque passage.
- Les libellés des modes ne mentionnent plus « 10 questions » ni « 25 items » (les pools comptent maintenant 50 questions Déclaratif et 50 Observation, 100 en tirage intégral).
- `tools/smoke.js` : les tests historiques fixent la longueur à 10 ; nouveaux tests pour les trois longueurs dans les deux mondes (questions distinctes, compteur, fin de session), les limites Miroir (22 / 21) et Dilemmes (27), le mode mixte 15 + 15, le tirage intégral, la mémorisation et le verrou du Duo. **100 contrôles, tous réussis.**

**Limites :** (1) le texte de synthèse et le seuil « profil peu contrasté » (indice < 130) ne sont pas encore calibrés selon la longueur ; à 20 ou 30 questions, un indice plus bas devient déjà significatif. (2) Les questions déjà vues à la session précédente sont évitées autant que possible ; dans les petits modes (Miroir), une session de 20 sur 22 questions revoit presque les mêmes questions d'une fois sur l'autre. (3) Non testé dans un vrai navigateur (le test utilise un faux DOM).

### v0.6.0 — 2026-11-23 — Unification du style
- **Suggestion de l'auteur** : « unifier le style des questions : le style des nouvelles questions est bien identifiable ». Décision : on aligne les 100 questions ajoutées sur la voix des 100 questions d'origine (A18). Charte écrite dans `docs/STYLE.md`.
- **100 questions réécrites (ids 51-100, deux univers)** : textes seulement. Pour chaque option, l'ordre et les archétypes principal/secondaire sont inchangés ; les poids de la banque sont identiques avant et après (`tools/pools.js`, comparaison exacte).
- **Questions d'origine Q5 à Q10 du monde 12 : passées du tutoiement au vouvoiement** (seuls les pronoms ont changé, 11 remplacements). C'est la seule modification de questions d'origine de cette version.
- `tools/style-check.js` : contrôle de la charte (tutoiement, première personne, longueur, écarts de longueur entre options). Détection du tutoiement fiabilisée pour les lettres accentuées (une première version prenait « tête » ou « fête » pour « te »). Intégré à `tools/smoke.js`, avec validation de la structure des deux banques.
- `tools/apply-restyle.js` + `docs/drafts/restyle.js` : outil et données de la réécriture ; `docs/revue-questions.md` régénéré.

| Mesure | Avant | Après |
|---|---|---|
| Monde 12 : mots par option (origine 10,0) | 12,7 | **10,5** |
| Monde 7 : mots par option (origine 10,2) | 13,1 | **11,3** |
| Options en « Je… » (origine 0 %) | 13 % / 16 % | **0 %** |
| Énoncés tutoyés | 14 % (monde 12) | **0 %** |
| Contrôle automatique de la charte | 143 points à revoir | **0** |

**Limite :** le style est mesuré sur des critères formels (longueur, personne, forme). L'impression de voix commune reste un jugement : à valider par l'auteur en testant.

### Étude de la longueur de session (2026-11-23, `tools/session-length.js`, résultats dans `docs/session-length-v0.5.0.txt`)
Question de l'auteur : quel est le nombre idéal de questions ? Simulation avec le vrai code de scoring : un répondant a un profil « vrai » (deux archétypes) et choisit l'option correspondante avec une probabilité p (0,5 = signal faible, 0,7 = signal fort), sinon au hasard. 3 000 répondants par cellule.

| Questions | Monde 12 : n° 1 retrouvé (p=0,5 / 0,7) | Monde 12 : vrai profil dans le top 2 | Monde 12 : test-retest du n° 1 | Monde 7 : n° 1 retrouvé (p=0,5 / 0,7) |
|---|---|---|---|---|
| 10 (actuel) | 38 % / 52 % | 58 % / 74 % | 23 % / 35 % | 65 % / 78 % |
| 15 | 46 % / 61 % | 67 % / 84 % | 31 % / 49 % | 75 % / 84 % |
| 20 | 53 % / 67 % | 76 % / 90 % | 37 % / 56 % | 79 % / 88 % |
| 30 | 62 % / 73 % | 85 % / 96 % | 51 % / 67 % | 85 % / 91 % |
| 50 | 71 % / 79 % | 95 % / 99 % | 61 % / 74 % | 90 % / 94 % |

**Lecture :** (1) à 10 questions, avec 12 archétypes, l'archétype n° 1 n'est retrouvé que dans environ 4 cas sur 10 à 5 cas sur 10 ; l'ensemble « n° 1 + n° 2 » est nettement plus fiable. (2) Les gains ralentissent après 30 questions (≈ +5 points pour 20 questions de plus). (3) Le monde 7 (7 archétypes) est plus facile : 15 à 20 questions suffisent. **Recommandation : 20 questions par défaut (≈ 4 à 5 minutes), 10 comme « aperçu » et 30 pour « approfondi » dans le monde 12.** Limites : modèle de répondant cohérent et idéalisé (les vraies personnes sont plus bruitées), fatigue non modélisée.

### v0.5.0 — 2026-11-23 — Synthèse du profil
- **Suggestion de l'auteur** : « donner après la représentation en radar un paragraphe de synthèse sur le profil ».
- Nouvelle carte « Synthèse du profil » juste sous le radar : 3 paragraphes. (1) Dominante : moteur de l'archétype n° 1 et nuance apportée par le n° 2 (ou « profil peu contrasté » si l'indice du n° 1 est inférieur à 130). (2) Relations, zone d'ombre possible, piste pour progresser. (3) Archétypes les moins mobilisés, avec rappel que ce n'est pas un diagnostic.
- Textes dans une table `SYNTH` (4 champs par archétype : `trait`, `nuance`, `relation`, `piste`, soit 19 entrées), formulations neutres (« on vous perçoit comme quelqu'un de... »). La fonction `buildSynthesis` compose le portrait ; les accords des noms (« du Sage », « de l'Innocent », « d'Aphrodite ») sont gérés.
- La combinaison est **compositionnelle** : la synthèse dépend surtout de l'archétype n° 1 et du n° 2. Les 132 paires du monde 12 ne sont pas rédigées une par une.
- `tools/smoke.js` teste : les 19 entrées complètes, 348 synthèses (toutes les paires, profil marqué et plat) sans « undefined », sans erreur d'accord, le cas « profil plat » et les deux accords types.
- Un bug trouvé par ces tests avant publication : « de L'Innocent et de Le Sage » (accord des noms), corrigé.

**Limite :** le texte est générique par archétype ; il ne tient pas compte des réponses précises ni de l'écart entre mode déclaratif et observation (le diagnostic Duo reste dans son encadré).

### v0.4.0 — 2026-11-23 — Banque de 100 questions par univers (publiée pour test, relecture en cours)
- **+100 questions** : ids 51–100 dans chaque univers (25 Déclaratif + 25 Observation par univers). Les 50 questions d'origine sont inchangées. Brouillons dans `docs/drafts/`, relecture dans `docs/revue-questions-v0.4.0.md`.
- **Conception par plan d'équilibre** : pour chaque sous-ensemble de tirage (Déclaratif, Observation), les archétypes principaux et secondaires ont été planifiés avant la rédaction, de façon à compenser le déficit de chacun (ex. Innocent : principal dans 24 des 50 nouvelles questions du monde 12, contre 2 sur 50 avant). Plan des quadruplets du monde 7 calculé par script.
- **Reclassement honnête des types** : seules les vraies situations de stress ou de choix forcé portent le type `dilemme` ; les formulations « Que préserve-t-il coûte que coûte ? » remplacent les « renoncer à… » pour éviter la logique inversée (A15, ci-dessous).
- **Nouveaux outils** : `tools/merge-bank.js` (fusion d'un brouillon dans une copie d'`index.html` + validation : 4 options, principaux distincts, archétypes connus, ids uniques, pas de doublon d'énoncé), `tools/pools.js` (poids par sous-ensemble), `tools/make-review.js` (document de relecture). `tools/balance.js` simule aussi chaque mode de tirage.
- Version `v0.4.0` dans `index.html` et `sw.js`. `tools/smoke.js` : tous les tests passent.

| Mesure (répondant au hasard, scoring ajusté) | Avant (v0.3.0) | v0.4.0 | Cible |
|---|---|---|---|
| Monde 12 : rapport max/min des poids de la banque | 3,68 | **1,24** | < 1,3 |
| Monde 12 : part de l'archétype en tête (mode intégral) | 5,8–13,1 % | **6,1–10,7 %** | 6–11 % (idéal 8,3 %) |
| Monde 12 : égalité en tête | 9,6 % | 9,1 % | — |
| Monde 7 : rapport max/min des poids | 1,61 | **1,12** | — |
| Monde 7 : part en tête (mode intégral) | 11,9–15,9 % | **12,3–16,8 %** | idéal 14,3 % |
| Pools : Miroir Social monde 12 | 10 questions | **22** | ≥ 15 |
| Pools : Dilemmes (monde 12 / monde 7) | 15 / 15 | **27 / 28** | ≥ 15 |

**Limites connues :** (1) le pool *Dilemmes* du monde 12 reste déséquilibré (rapport 2,56 ; Héros 41 vs Créateur 17) car ses 15 questions d'origine sont très orientées ; en mode Dilemmes, la part en tête va de 4,9 % (Innocent) à 13,6 % (Amoureux). (2) Les nouvelles questions du monde 7 sont rédigées au féminin, comme les questions d'origine : le genre n'est pas neutralisé. (3) Des quadruplets très « doux » (Innocent, Amoureux, Bouffon, Homme ordinaire réunis) sont fréquents dans le monde 12, par construction : ils servent à compenser le déficit mais discriminent moins les archétypes « durs ». (4) Le contenu psychologique (représentativité de chaque option) n'a pas été validé hors de cette relecture.

### v0.3.0 — 2026-11-23 — PWA
- `manifest.json` : nom, mode `standalone`, portrait, couleurs `#0f172a`, 3 icônes (192, 512, 512 maskable).
- `sw.js` : service worker. Page : réseau d'abord (mises à jour récupérées en ligne), cache en secours hors-ligne. Icônes et manifeste : cache d'abord. Les anciens caches sont supprimés à l'activation.
- `icons/` : icône radar à 12 branches (fond `#0f172a`, profil `#d4a373`), générée par `tools/make-icons.ps1` ; variante maskable avec zone de sécurité ; `apple-touch-icon` 180 px pour l'écran d'accueil iOS.
- `index.html` : liens manifeste, icône Apple, `theme-color`, enregistrement du service worker (uniquement en http/https), version affichée en pied de page avec la mention « outil de réflexion personnelle, pas un diagnostic psychologique » (A4).
- `tools/smoke.js` vérifie maintenant : champs du manifeste, existence et dimensions réelles des icônes, cohérence `APP_VERSION` = `CACHE_VERSION`, existence de tous les fichiers du cache.
- Aucun changement de scoring ni de questions.

**Installer :** iPhone → ouvrir l'URL dans **Safari** → Partager → « Sur l'écran d'accueil ». Chrome (ordinateur, Android) → icône « Installer » dans la barre d'adresse.

### v0.2.0 — 2026-11-23 — Scoring
- **Indice ajusté** : le score brut de chaque archétype est divisé par son « exposition » (points qu'un répondant au hasard obtiendrait en moyenne sur les questions réellement répondues). Indice 100 = niveau du hasard. Les fonctions `computeExposure`, `adjustScores`, `rankKeys` sont dans `index.html` et testées par `tools/balance.js`.
- **Chrono expiré** : la question est passée sans point (avant : une option au hasard était enregistrée). Le nombre de questions non comptées est affiché dans les résultats. Si les 10 expirent, retour à l'accueil avec un message.
- **Égalités** : départage par indice, puis score brut, puis ordre aléatoire propre à la session (avant : l'ordre de déclaration favorisait Magicien et Sage). Une égalité entre les deux premiers est signalée dans les résultats.
- **Résultats** : le classement affiche l'indice (plus « pts ») avec une légende ; l'échelle du radar est fixée à un minimum de 200. Le duo mémorise l'ordre des archétypes du passage 1.
- **Q33 du monde 7** : deux options avaient Artémis en primaire ; « reconnaissance officielle » passe en Hestia (primaire) / Artémis (secondaire).
- `tools/balance.js` simule désormais le scoring brut et le scoring ajusté avec le code réel de l'application. Résultat : `docs/balance-v0.2.0.txt`.
- Vérifié par un test de bout en bout avec faux DOM (parcours complet des 2 mondes, chrono expiré partiel et total, duo). Test versionné : `node tools/smoke.js`.

| Répondant au hasard, archétype en tête | Brut (départage aléatoire) | Ajusté v0.2.0 | Idéal |
|---|---|---|---|
| Monde 12, plus fréquent / plus rare | Sage 23,8 % / Innocent 0,3 % | Bouffon 12,9 % / Souverain 5,6 % | 8,3 % |
| Monde 12, égalité en tête | 22,4 % | 9,4 % | — |
| Monde 7, plus fréquent / plus rare | Athéna 31,2 % / Héra 5,6 % | Perséphone 13,6 % / ≈ 12 % | 14,3 % |
| Monde 7, égalité en tête | 20,0 % | 3,6 % | — |

**Limite connue :** diviser par l'exposition amplifie le bruit sur les archétypes rares (Innocent n'est primaire que 2 fois sur 50 questions). Dans le monde 12, Bouffon, Amoureux et Innocent sont légèrement sur-représentés (11–13 %) et Sage, Magicien, Souverain sous-représentés (≈ 6 %). Le correctif de fond est de rééquilibrer la banque.

### v0.1.0 — 2026-11-23 — Base
- Import de `index.html` d'origine (copie intacte conservée dans `docs/index.v0.original.html`).
- Création du dépôt de travail `Archetypes-Lab` et du dépôt GitHub public `nasreddine-m/archetypes-lab`.
- Publication via GitHub Pages : https://nasreddine-m.github.io/archetypes-lab/ (branche `main`, racine).
- Ajout de `tools/balance.js` : mesure de l'équilibre des archétypes dans les banques de questions + simulation de 20 000 répondants aléatoires. Résultat de référence : `docs/balance-baseline.txt`.
- Aucune modification fonctionnelle de l'application.

---

## Arbitrages et décisions

| # | Date | Décision | Raison | Alternative écartée |
|---|---|---|---|---|
| A1 | 2026-11-23 | Cible multiplateforme = **PWA** (manifest + service worker + icônes), hébergée sur GitHub Pages | Un seul code pour iOS et Chrome, installable, hors-ligne, gratuit, pas de Mac requis | App native (Capacitor/Xcode) : exige un Mac et un compte Apple Developer (99 $/an). À reconsidérer seulement si l'App Store devient un objectif |
| A2 | 2026-11-23 | Rester sans framework ni build (HTML/CSS/JS vanilla) pour l'instant | Simplicité, déploiement direct sur Pages, code déjà fonctionnel | Réécriture React/Vue : coût élevé, aucun gain immédiat |
| A3 | 2026-11-23 | Dépôt GitHub **public** | GitHub Pages gratuit exige un dépôt public. Le code ne contient aucune donnée personnelle (résultats stockés localement dans le navigateur) | Dépôt privé : Pages indisponible sur compte gratuit |
| A4 | 2026-11-23 | Positionnement : outil de réflexion, pas diagnostic psychologique | Archétypes de Pearson/Jung et déesses de Bolen = cadres narratifs non validés psychométriquement ; risque d'effet Barnum | Garder « profil psychologique » : survend la portée |
| A5 | 2026-11-23 | Correction du biais par **ratio score brut / exposition** (indice, 100 = hasard) | Simulation de 30 000 répondants aléatoires, monde 12 : part en tête de 5,4 % à 13,3 % (idéal 8,3 %), contre 1,8 % à 14,6 % pour l'écart au hasard et 0,2 % à 23,1 % pour le brut. Monde 7 : 11,9–15,9 % contre 9,4–17,8 % et 5,6–30,5 % | Écart au hasard (brut − exposition) : moins équilibré, scores négatifs à afficher sur le radar. Score brut : biais Sage/Souverain |
| A6 | 2026-11-23 | Exposition calculée sur les questions **réellement répondues**, pas sur les 10 tirées | Une question expirée ne doit ni donner de points ni compter dans la référence du hasard | Exposition sur la banque entière : ne tient pas compte du tirage de la session |
| A7 | 2026-11-23 | Chrono expiré = question passée **sans point** | Une réponse aléatoire pollue le profil sans que l'utilisateur le sache | Garder la réponse aléatoire (comportement v0.1.0) |
| A8 | 2026-11-23 | Départage des égalités par ordre **aléatoire propre à la session** | Un ordre fixe favorisait systématiquement les premiers archétypes déclarés. Rejouer la même session peut donner un ordre différent, mais l'égalité est signalée à l'utilisateur | Ordre fixe alphabétique ou de déclaration : biais permanent |
| A10 | 2026-11-23 | Service worker : **réseau d'abord** pour la page, cache d'abord pour le reste | Une mise à jour poussée sur GitHub est visible dès l'ouverture suivante en ligne, sans vider le cache ; le hors-ligne reste garanti | Cache d'abord partout : plus rapide mais l'utilisateur garderait l'ancienne version jusqu'à une seconde ouverture |
| A11 | 2026-11-23 | Icônes générées par script (`tools/make-icons.ps1`, System.Drawing) plutôt que dessinées à la main | Reproductible, modifiable (couleurs, motif), aucune dépendance à installer sous Windows | Éditeur graphique : non versionnable |
| A12 | 2026-11-23 | Chemins relatifs (`./`) partout dans le manifeste et le service worker | L'app est servie dans un sous-dossier (`/archetypes-lab/`) sur GitHub Pages ; des chemins absolus (`/`) casseraient l'installation | Chemins absolus : fonctionnent en local mais pas sur Pages |
| A13 | 2026-11-23 | Banque portée à **100 questions par univers** (demande de l'utilisateur), avec **plan d'équilibre avant rédaction** : comptes cibles d'archétypes principaux/secondaires par sous-ensemble de tirage, puis écriture des questions pour les remplir | Équilibrer après coup en retouchant des options existantes : plus long, et risque de dégrader des questions déjà validées | Ajouter 50 questions sans plan : le biais aurait été simplement dilué |
| A14 | 2026-11-23 | Les 50 questions d'origine restent **inchangées** ; seul le complément est équilibré | Traçabilité, pas de régression sur du contenu existant, comparaison avant/après propre | Réécrire les anciennes options pour corriger le biais |
| A15 | 2026-11-23 | Nouveaux arbitrages formulés « Que préserve-t-il coûte que coûte ? » (choix positif) au lieu de « Renoncer à… » | Avec « renoncer », l'archétype noté était celui qui tient le moins à la chose abandonnée : logique inversée, source d'erreur de lecture pour l'utilisateur | Garder la logique inversée des questions d'origine |
| A16 | 2026-11-23 | Version v0.4.0 d'abord sur la branche `v0.4-banque`, puis publiée sur `main` quand l'auteur a demandé à la tester sur lui-même (retour arrière : `git revert` du merge) | Contenu psychologique : seul l'auteur de l'app peut juger si une option représente bien l'archétype. GitHub Pages ne sert que `main` | Publier directement et corriger ensuite |
| A17 | 2026-11-23 | **Rester à 4 options par question** pour le moment (idée de l'auteur : bibliothèque de 6 options dont 4 tirées) | Décision de l'auteur. Elle reste ouverte : le code de scoring la supporterait (l'exposition se calcule sur les options affichées), mais cela demande 400 rédactions et augmente un peu la variabilité entre sessions | Passer à 6 options maintenant |
| A18 | 2026-11-23 | Unifier le style en **alignant les nouvelles questions sur les questions d'origine** | Les questions d'origine sont la voix de l'auteur ; c'est lui qui a repéré les nouvelles comme étrangères. Mesure : 0 % de « Je » à l'origine contre 13-16 % dans les nouvelles ; options plus longues de 27 % | Aligner les anciennes sur les nouvelles : change du contenu validé |
| A19 | 2026-11-23 | Recommander **20 questions par défaut** (aperçu 10, approfondi 30) | Simulation de fiabilité (`docs/session-length-v0.5.0.txt`) : à 10 questions le n° 1 du monde 12 n'est retrouvé que 38-52 % du temps ; rendements décroissants après 30 | Rester à 10 : résultat trop instable ; 50 : lassitude pour un gain d'environ 5 points |
| A20 | 2026-11-23 | Un mode plus petit que la longueur demandée est **limité à sa taille** (Miroir : 22 / 21), avec une note visible, plutôt que de compléter avec des questions d'un autre type | Respecte la définition du mode (Miroir = impressions sociales) ; transparent pour l'utilisateur | Compléter avec le reste de la banque : mélange des types, mode dénaturé |
| A21 | 2026-11-23 | Longueur **verrouillée en mode Duo** | Comparer deux passages de longueurs différentes rendrait le diagnostic non comparable (la fiabilité dépend du nombre de questions) | Laisser libre et avertir |
| A22 | 2026-11-23 | **Tutoiement** dans toute l'application | Demande explicite de l'auteur, pour un public jeune. Renverse la décision A18 sur ce point précis (A18 avait aligné sur les questions d'origine, alors majoritairement au vouvoiement) | Garder le vouvoiement : plus formel, moins proche d'un public jeune |
| A23 | 2026-11-23 | **Outil « impeccable » non installé** : refonte visuelle en attente de décision (l'installer soi-même, ou je conçois sans cet outil) | Il n'existe ni dans les skills, ni dans les plugins installés, ni dans les catalogues configurés. Installer un outil tiers sans vérification de sa source n'est pas fait sans accord explicite | Installer automatiquement un plugin non vérifié |
| A24 | 2026-11-23 | **Skill « impeccable » installé** dans `~/.claude/skills/impeccable` (v4.10.0, Apache-2.0, dépôt officiel `pbakaus/impeccable`) à la demande explicite de l'auteur, après audit : source vérifiée (115 000 étoiles), texte du skill lu, lanceur lu. Le lanceur télécharge au premier usage un moteur depuis `github.com/pbakaus/impeccable/releases`, vérifié par SHA-256 contre un fichier fourni dans le skill (échec fermé) ; les hooks sont désactivés par défaut ; aucun compte créé | L'auteur voulait un outil de design reconnu pour moderniser l'interface | Concevoir la refonte sans cet outil |
| A25 | 2026-11-23 | Refonte visuelle : périmètre = **les trois écrans** ; à préserver = textes/ordre des questions, Duo/chrono/longueurs, mention « pas un diagnostic », monde 7 distinct ; à éviter = trop clinique, trop enfantin/gamer, surchargé d'effets, ressemblant à un autre test connu. **« Déesses » devient « Princesses » en intitulé seulement** (les 7 profils grecs et leurs questions restent) | Réponses de l'auteur aux questions d'initialisation du skill | Remplacer les 7 profils par des figures de princesses : chantier de contenu séparé |
| A26 | 2026-11-23 | **Conserver l'identité visuelle d'origine** (bleu nuit, or, thème rosé) et moderniser à l'intérieur | Décision explicite de l'auteur après rejet de deux séries de directions (trop ludiques, trop fantaisistes). Une décision épinglée par l'utilisateur prime sur le tirage du skill | Remplacer le monde visuel par Photomaton, Wrapped, Atlas céleste, Graphite, Suisse ou Carnet |
| A27 | 2026-11-23 | Force du profil en **3 niveaux** (peu contrasté / modéré / net) fondés sur les centiles 75 et 95 de l'indice du n° 1 **obtenu au hasard**, par univers et longueur | L'indice du n° 1 est gonflé par le simple hasard (médiane 229 pour 12 archétypes, 10 questions) : un seuil fixe de 130 ne détectait rien. Les centiles donnent un repère honnête | Garder 130 ; test statistique formel (inutile pour un outil de réflexion) |
| A28 | 2026-11-23 | « Affiner » **ajoute** des questions nouvelles à la session (scores additionnés, plafond 30, au moins 5 questions neuves), au lieu de relancer une session complète | Un aperçu de 10 questions est peu fiable (n° 1 retrouvé 4 à 5 fois sur 10) : prolonger coûte moins que recommencer, sans refaire les mêmes questions | Recommencer à 20 ; ajouter sans plafond |
| A29 | 2026-11-23 | Historique **local**, 30 entrées, stockant les scores ajustés et le classement mais pas les réponses | Vie privée (rien ne quitte l'appareil), taille minimale ; suffisant pour relire un résultat | Compte et synchronisation ; stocker toutes les réponses |
| A30 | 2026-11-23 | Partage par **carte image** via le partage natif (repli : téléchargement) + copie de texte, sans service externe | Format attendu par un public jeune (story), cohérent avec « aucun compte, rien d'envoyé » | Lien de partage serveur ; capture d'écran manuelle seulement |
| A31 | 2026-11-23 | Figures associées présentées comme **repères culturels**, seulement quand une recherche les signale ; aucune pour le Bouffon ni les Princesses | Aucune source de référence n'associe de personnes réelles aux archétypes et personne n'a passé le test : prétendre qu'une personne « a ce profil » serait faux. Mieux vaut un repère honnête et incomplet qu'une liste inventée | Lister une personne réelle par archétype sans source ; ne rien ajouter |
| A32 | 2026-11-23 | « Tampon » = emblème circulaire au trait dessiné en SVG (un par archétype), placé à droite de la synthèse | Une illustration cohérente avec l'identité (au trait, couleur d'accent), sans image externe ni service de génération, qui garde l'app hors-ligne | Illustrations figuratives générées ; icônes d'une bibliothèque externe |
| A33 | 2026-11-23 | « Les deux profils types principaux » = les **fiches des deux archétypes dominants** du résultat (et de tout archétype du classement) | Lecture la plus naturelle de la demande ; réutilise les textes de la synthèse | Comparer les deux univers (autre lecture possible) |
| A34 | 2026-11-23 | E-mail par lien `mailto:` | Aucune adresse collectée, aucun serveur, cohérent avec « rien ne quitte ton téléphone » ; l'utilisateur garde le contrôle du destinataire | Service d'envoi tiers (EmailJS, etc.) : exige un compte, des clés et envoie les données chez un tiers |
| A36 | 2026-11-23 | PDF construit à la main (image JPEG dans un PDF minimal) | Pas de bibliothèque, pas de réseau, rendu identique partout | Texte vectoriel sélectionnable (nécessiterait une police embarquée ou une bibliothèque) |
| A37 | 2026-11-23 | Couleurs d'archétypes toujours accompagnées du nom ou d'une icône | Certaines paires restent proches pour le daltonisme (voir docs/palette-check.txt) | Couleur seule |
| A38 | 2026-11-23 | Accueil affiché à chaque ouverture | Demande explicite d'une page d'accueil ; un bouton « Commencer » mène aux réglages | Mémoriser « déjà vu » pour ouvrir directement les réglages |
| A39 | 2026-11-23 | Garder « archétype » comme mot unique ; ne pas renommer les figures du monde 12 en « princes » | Mot genré pour des figures mixtes, certaines figures ne sont pas des princes (Bouffon, Souverain), chantier large (accueil, fiches, synthèses, PDF, tests) | « Les 12 Princes » en simple étiquette d'onglet |
| A40 | 2026-11-23 | Mode clair reporté ; l'alternance crème / bleu nuit est livrée d'abord | Demande de l'auteur : « si difficile, le laisser de côté ». La classe .paper pose les bases (variables locales) | Choix Auto / Clair / Sombre : thème clair complet, versions papier des couleurs d'archétypes pour les tampons et barres, couleur de la barre du navigateur |
| A35 | 2026-11-23 | « Adoucir, tons plus clairs » = éclaircir la palette sombre existante, pas ajouter un mode clair | Reste dans le style d'origine (A26) ; un mode clair serait un chantier à part | Thème clair complet (à proposer si c'était l'intention) |
| A9 | 2026-11-23 | Ne pas rééquilibrer la banque dans la v0.2.0 | Rééquilibrer demande de réécrire des dizaines d'options et de les relire une à une : c'est un chantier de contenu à part (backlog 2) | Tout corriger d'un coup : version trop large, régression difficile à isoler |

---

## Constats de mesure (baseline v0.1.0)

Source : `docs/balance-baseline.txt` (`node tools/balance.js`).

**12 Archétypes** — fort déséquilibre. Poids (2×primaire + secondaire) : Sage 81 → Innocent 22, rapport max/min = 3,68. Un répondant répondant au hasard obtient Sage en tête 26,7 % du temps (idéal : 8,3 %) et Innocent 0,1 %. Égalité en tête dans 23 % des cas. Ces chiffres incluent l'effet du départage par ordre de déclaration (corrigé en v0.2.0).
**7 Déesses** — déséquilibre modéré (rapport 1,61) : Athéna 36 % vs Perséphone 5 % pour un répondant aléatoire. Héra et Perséphone sont surtout des choix secondaires.
**Pools** — Miroir Social (monde 12) : exactement 10 questions, donc aucun tirage aléatoire. Q33 (monde 7, et non monde 12 comme noté initialement) : deux options avaient le même archétype primaire (corrigé en v0.2.0).

---

## Backlog priorisé

7. ~~**Unifier le style des questions**~~ (fait en v0.6.0, voir A18 et `docs/STYLE.md`) — (suggestion de l'auteur : « le style des nouvelles questions est bien identifiable »). Écarts mesurés entre les questions d'origine (id ≤ 50) et les nouvelles (id > 50) : options plus longues (monde 12 : 10,0 → 12,7 mots ; monde 7 : 10,2 → 13,1), **aucune** option d'origine à la première personne (« Je... ») contre 13 % et 16 % des nouvelles, plus d'options entre guillemets dans le monde 7 (2 % → 6 %), et 14 % des énoncés d'origine du monde 12 tutoient alors que tout le reste vouvoie. Charte proposée : options de 8 à 12 mots, sans « Je » (infinitif ou groupe nominal en Déclaratif, « Il/Elle + présent » en Observation), formes parallèles au sein d'une question, vouvoiement partout, registre sobre des questions d'origine. Direction proposée : aligner les nouvelles questions sur les anciennes (voix d'origine de l'auteur).
9. ~~**Longueur de session réglable**~~ (fait en v0.7.0, voir A20 et A21) — : 10 (aperçu) / 20 (par défaut) / 30 (approfondi). Le « 10 » est codé en dur à plusieurs endroits de `index.html` (compteur, barre de progression, fin de session) et dans `drawQuestions`. À rendre variable ; vérifier la taille des pools (mode Miroir : 22 et 21 questions, donc 30 impossible dans ce mode sans réutiliser des questions) ; texte de synthèse déjà paramétré par le nombre de réponses.
8. **(Reporté par l'auteur : on reste à 4 options pour le moment — A17.)** **Bibliothèque de 6 options par question, 4 tirées au hasard** (suggestion de l'auteur). À prévoir : 2 options supplémentaires pour chacune des 200 questions (400 rédactions) avec 6 archétypes principaux distincts ; `computeExposure` calculée sur les 4 options **réellement affichées** (déjà compatible si on lui passe la version tirée) ; tirage sans doublon ; outils de mesure (`balance.js`, `pools.js`, `merge-bank.js`) à adapter pour 6 options. Avantages : moins de mémorisation entre sessions, moins d'effet de position et de biais d'option. Inconvénient : un peu plus de variabilité entre deux sessions d'une même personne (chaque option a 2 chances sur 3 d'apparaître).

1. ~~**Scoring (v0.2.0)**~~ : fait.
2. ~~**Banque**~~ : fait en v0.4.0 (reste à relire et publier). Pistes restantes : rééquilibrer le pool Dilemmes du monde 12 ; neutraliser le genre du monde 7. Initialement : rééquilibrer les options (plus de choix primaires Innocent, Amoureux, Bouffon, Homme ordinaire, Héra, Perséphone) ; ≥ 15 questions éligibles par mode (Miroir Social du monde 12 : 10 seulement) ; neutraliser le genre du monde 7 ou l'assumer. Objectif chiffré : rapport max/min des poids < 1,3 et part en tête d'un répondant au hasard entre 6 % et 11 % dans le monde 12.
3. **Résultats** : descriptions détaillées, avertissement « outil de réflexion », nuance du diagnostic Duo (deux tirages de 10 questions différentes ne prouvent pas un « décalage »).
4. ~~**PWA (v0.3.0)**~~ : fait (testé sur iPhone et Windows).
5. **UX** : retour arrière, confirmation d'abandon, historique local, partage/export, labels radar non coupés (« Homme ordinaire », « Hors-la-loi »), retrait de `user-scalable=no`, couleurs du radar selon le thème.
6. **Tests** : étendre `tools/smoke.js` (rendu réel dans un navigateur, test iOS Safari).
