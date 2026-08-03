# Context Engineering — Doctrine transverse

Le **context engineering** est la discipline de rendre le codebase navigable et lisible pour les agents Claude, afin de réduire les erreurs, les lectures inutiles, et les régressions silencieuses.

Origine : audit de lisibilité un projet de trading (mai 2026). Standards adoptés par Anthropic, Cloudflare, Stripe. Proposé par Answer.AI (sept. 2024).

## Les 8 standards

**1. CLAUDE.md précis**
- Fichiers critiques (> 300 lignes) → descriptions dans **llms.txt** (pas CLAUDE.md). CLAUDE.md = règles de comportement, pas inventaire.
- La description doit refléter où la logique se trouve RÉELLEMENT (`engine.js` ne fait pas le sizing si le sizing est dans `sizeCalc.js`)
- Quand un nouveau fichier critique est créé → l'ajouter dans llms.txt dans le même commit

**2. `llms.txt` à la racine du repo**
Fichier de navigation pour tout agent arrivant à froid. CLAUDE.md = règles, `llms.txt` = carte + **inventaire unique** des fichiers sources. Ne pas dupliquer cet inventaire dans CLAUDE.md.
Template minimal :
```markdown
# Nom du projet
> Description en 1 ligne

## Vue d'ensemble
- [CLAUDE.md](CLAUDE.md): Instructions complètes pour Claude Code

## Fichiers critiques
- [src/xxx.js](src/xxx.js): Rôle précis du fichier

## Points non-évidents (gotchas)
- Invariant à connaître avant de toucher au code
```

**3. Index de sections dans les fichiers > 2000 lignes**
Tout fichier > 2000 lignes avec plusieurs responsabilités → bloc de commentaires en tête avec numéros de lignes approximatifs et rôle de chaque bloc. Voir `src/logic/shadowTrading.js` dans un projet de trading comme modèle.

**4. Commentaires sur code désactivé intentionnellement**
Tout bloc désactivé en dur (`if (false)`, feature flag off, dead branch) → commentaire visible expliquant POURQUOI et qui décide de le réactiver. Sans ça Claude peut le lire comme actif et baser une modification dessus.

**5. Audit de lisibilité périodique**
Routine schedulée hebdomadaire sur les projets actifs qui détecte : nouveaux fichiers > 300 lignes non documentés, fichiers > 2000 lignes sans index, descriptions obsolètes.
Modèle de routine : un projet de trading `<routine>` (lundi 8h Paris).

**6. Où placer une règle (séquence obligatoire avant tout ajout à un CLAUDE.md)**

Avant d'écrire quoi que ce soit dans un CLAUDE.md projet, classer d'abord :
1. **Règle qui change chaque décision routinière** → CLAUDE.md (court, 1-3 lignes max)
2. **Référence / inventaire / liste** → `docs/` ou `CLAUDE_REFERENCE.md` + pointeur dans CLAUDE.md
3. **Workflow / procédure > 5 lignes** → skill `.claude/skills/` ou `docs/`
4. **État projet / backlog / statut** → `memory/` ou git log
5. **Doublon d'un CLAUDE.md parent** → supprimer (l'héritage est automatique)

Test final : *"Si je supprime cette ligne, Claude ferait-il des erreurs sur des tâches routinières ?"* Si non → ça n'appartient pas au CLAUDE.md.

Règles techniques : CLAUDE.md < 200 lignes (référence dans `CLAUDE_HEALTH_RULES.md` §2 pour seuils et enforcement). `@import` n'est PAS du chargement conditionnel (même coût token qu'inline, chargé au lancement, max 4 hops — confirmé doc Anthropic). Vraiment à la demande : **skills** (`.claude/skills/`), **`.claude/rules/` path-scopés** (frontmatter `paths:`), **CLAUDE.md de sous-dossier**. Détail + correction dans `CLAUDE_HEALTH_RULES.md` §3.

**7. Signal de dette documentaire en session**
Quand Claude est contraint de lire un fichier source pour comprendre un comportement qui aurait dû être documenté, il doit :
1. Le signaler explicitement : "j'ai dû lire X pour trouver Y — ça manque dans la doc"
2. Spawner une tâche (chip) pour ajouter le commentaire/gotcha au bon endroit
3. Ne pas absorber silencieusement : chaque lecture forcée = dette à rembourser dans le même commit ou le suivant

Exemple : `dischargeStrategy()` dans un projet de trading ne fonctionne pas — il faut modifier `config.js` directement. Non documenté → lecture de fichier à mi-session → tokens perdus.

**8. Hiérarchie de levier humain : relire la recherche > le plan > le code (HumanLayer ACE, 2026-06)**

L'effort de revue humaine ne rend pas le même rendement à chaque étage. Une erreur dans la phase **recherche** (mauvaise compréhension du problème) se propage en milliers de lignes pourries ; une erreur de **plan** en centaines ; une erreur de **code** en lignes isolées. Donc concentrer la relecture **en amont** : relire le brief/la recherche prime sur relire le plan, qui prime sur relire le diff final. GSD a déjà les trois phases (recherche → plan → exécution) ; ce standard dit **où mettre les yeux du fondateur en priorité** quand le temps de revue est limité. Corollaire compaction : viser **40-60 %** d'utilisation du contexte comme zone de travail (compaction intentionnelle avant la « dumb zone »), pas attendre 90 %.

**9. Glossaire de domaine `CONTEXT.md` (langage partagé — anti-verbosité)**

Repris de Matt Pocock (`mattpocock/skills`). Un agent qui débarque sur un projet **n'a pas le jargon métier** : il écrit 20 mots là où l'équipe en dit 1, navigue de façon incohérente, brûle des tokens. Remède : un `CONTEXT.md` à la racine du repo qui fige le **langage partagé** — chaque terme du domaine défini une fois, avec ses synonymes _à éviter_ (« Avoid: … ») et les relations entre termes.

Ce n'est PAS un `llms.txt` (carte des fichiers) ni un `CLAUDE.md` (règles de comportement) : c'est le **dictionnaire du domaine métier**. Structure recommandée : `## Language` (terme → définition + « Avoid »), `## Relationships` (un X a plusieurs Y…), `## Flagged ambiguities` (termes ambigus tranchés, avec la résolution). À poser sur un projet à jargon dense (métier, multi-contexte) ; inutile sur un throwaway. Alimenté/raffiné par le skill `/domain-modeling` (voir `.agents/skills/domain-modeling`), qui produit aussi les ADR. **Créer/étendre le `CONTEXT.md` d'un projet quand un terme métier revient ≥ 3 fois avec des formulations différentes.**

## Propagation vers les projets existants

Niveau 1 (llms.txt) automatisable sans contexte projet — lancer : "crée le llms.txt pour le projet X".
Niveau 2 (audit complet CLAUDE.md vs code réel) → ouvrir le projet et dire "applique le context engineering selon les standards du meta CLAUDE.md".

**Checklist par projet (nouveau projet ou audit annuel) :**
- [ ] `llms.txt` présent à la racine
- [ ] Tous les fichiers > 300 lignes listés dans llms.txt avec description précise
- [ ] Fichiers > 2000 lignes avec index de sections en tête
- [ ] Blocs désactivés commentés
- [ ] Routine d'audit schedulée (si projet actif avec commits réguliers)
