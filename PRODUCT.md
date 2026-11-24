# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Jeunes adultes en réflexion personnelle (confirmé par l'auteur). Ils ouvrent l'app sur téléphone (iPhone via Safari / écran d'accueil, Chrome), prennent le temps de répondre à une session de 10 à 30 questions puis de lire leur synthèse. Une partie d'entre eux fait le test pour quelqu'un d'autre ou à deux (mode Duo). L'auteur vise un public « jeune » ; la tranche d'âge exacte n'est pas fixée (18-30 ans environ, à ne pas inventer plus précisément).

## Product Purpose
Archétypes Lab est un questionnaire de réflexion sur soi : l'utilisateur répond à des mises en situation, puis découvre un profil sous forme de classement, de radar et de synthèse écrite. C'est un **outil de réflexion personnelle, pas un diagnostic psychologique** (mention déjà présente dans l'application). Le succès : la personne se reconnaît, comprend ce que le résultat dit et ne dit pas, et a envie de le relire ou de le comparer.

## Positioning
Ce qu'un test de personnalité ordinaire ne fait pas (confirmé par l'auteur) :
- **Se voir vs être vu** : deux familles de questions, Déclaratif (ce que tu dis de toi) et Observation (ce qu'on observe de quelqu'un), comparables en mode Duo avec deux radars superposés.
- **Deux univers** : les 12 Archétypes (mixte) et les 7 Princesses (anciennement « 7 Déesses » : intitulé changé le 2026-11-23, profils grecs inchangés ; monde au féminin, avec sa propre ambiance), chacun avec 100 questions.
- **Fonctionne hors-ligne, sans compte** : aucune donnée envoyée, rien à créer ; tout reste dans l'appareil.

## Operating Context
Application web statique, un fichier `index.html` (HTML/CSS/JS sans framework) + `manifest.json` + `sw.js` + `icons/`, publiée sur GitHub Pages (https://nasreddine-m.github.io/archetypes-lab/), installable comme PWA. Parcours : accueil (univers, sujet évalué, longueur de session 10/20/30, mode de tirage parmi 6, chronomètre optionnel) → questions (4 options, une seule réponse) → résultats (signature, radar, synthèse en 3 paragraphes, classement, mode Duo).

## Capabilities and Constraints
- 2 univers × 100 questions, 4 options par question, scoring par indice ajusté (100 = niveau du hasard) pour corriger un biais de la banque.
- 6 modes de tirage : Déclaratif, Observation, Mixte, Dilemmes, Miroir Social, Tirage Intégral ; Miroir et Dilemmes sont limités à leur taille (21-28 questions).
- Longueur 10 (aperçu) / 20 (standard, défaut) / 30 (approfondi), verrouillée en mode Duo.
- Chronomètre de 10 s optionnel : une question expirée ne compte pas.
- Contenu entièrement en français, **tutoiement** partout (décision de l'auteur, v0.8.0), charte `docs/STYLE.md` ; le monde 7 reste au féminin pour la personne interrogée.
- Aucune donnée personnelle envoyée ; seuls des réglages (longueur) et l'historique de tirage des questions sont gardés dans le navigateur.
- Doit rester utilisable hors-ligne (service worker), un seul fichier de page, déployable par simple `git push`. Changer la version dans `index.html` (`APP_VERSION`) et `sw.js` (`CACHE_VERSION`) à chaque release.
- Test de bout en bout : `node tools/smoke.js` (le contrôle de style `tools/style-check.js` refuse « vous / votre / vos »).
- Non décidé : tranche d'âge exacte, partage du résultat (Web Share), historique des résultats, mode clair.

## Brand Commitments
- Nom : **Archétypes Lab**. Voix : **tutoiement direct et bienveillant**, phrases courtes, sans jargon, comme un ami qui pose de bonnes questions (confirmé par l'auteur).
- Mention à conserver : « Outil de réflexion personnelle, pas un diagnostic psychologique ».
- **Identité visuelle d'origine à conserver** (décision de l'auteur, 2026-11-23, après avoir refusé les directions « ludiques et fantaisistes » proposées) : thème sombre bleu nuit (#0f172a, cartes #1e293b), accent or (#d4a373), thème rosé distinct pour les Princesses, police système, cartes arrondies. La modernisation se fait **dans** ce style (hiérarchie, lisibilité, états, animation discrète), pas en le remplaçant.

## Evidence on Hand
- Une banque de 200 questions rédigées et un contrôle de qualité chiffré : poids équilibrés (rapport max/min 1,24 pour le monde 12, 1,12 pour le monde 7), simulations de fiabilité selon la longueur (`docs/session-length-v0.5.0.txt`, `docs/balance-v0.4.0.txt`).
- Tests réels de l'auteur : iPhone (installation, hors-ligne) et Windows OK.
- **Absent, à ne pas inventer** : nombre d'utilisateurs, témoignages, statistiques d'usage, validation psychométrique des archétypes (cadres narratifs de Pearson/Jung et Bolen, non validés scientifiquement).

## Product Principles
1. **Honnête sur ses limites** : 10 à 30 questions donnent un point de départ, pas une vérité ; l'interface le dit sans l'enterrer.
2. **Se comprendre avant de se montrer** : la lecture du résultat est la récompense ; tout ce qui la précède reste léger.
3. **Deux regards** : se voir et être vu est ce qui distingue le produit ; le Duo est une fonction centrale, pas un bonus.
4. **Deux mondes, deux identités** : les 12 Archétypes et les 7 Princesses sont lus comme deux univers distincts.
5. **Privé par défaut** : tout reste sur l'appareil, aucun compte.

## Accessibility & Inclusion
Aucune exigence produit spécifique établie. Points connus : l'application tourne sur téléphone (zones tactiles larges), le texte d'aide actuel descend à 10,5-11 px (jugé trop petit à l'évaluation du 2026-11-23), et le monde 7 utilise des accords féminins pour la personne interrogée.
