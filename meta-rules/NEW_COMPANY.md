# Procédure — créer une nouvelle boîte / entreprise

Procédure pour initialiser le **contexte entreprise** (`company/`) d'une nouvelle boîte. À utiliser quand le fondateur lance une activité commerciale distincte (SAS, SASU, EI, side-project monétisé).

> **Différence avec [`NEW_PROJECT.md`](NEW_PROJECT.md)** : `NEW_PROJECT.md` initialise un **repo applicatif** (code + git + Claude rules). `NEW_COMPANY.md` initialise le **contexte business** (brand, stratégie, marketing, juridique) — un dossier `company/` qui peut vivre seul OU se greffer à un repo applicatif existant.

## 1. Choisir l'emplacement

| Cas | Emplacement |
|-----|-------------|
| Boîte solo avec UN produit (app, SaaS) | `<repo>/company/` à la racine du repo applicatif |
| Boîte solo multi-produits OU sans produit tech encore | `oscardcstudio\<nom>\company\` (dossier dédié) |
| Boîte une marque (ne se reproduit pas en pratique) | déjà existant : `une marque\une marque-info\` |

**Par défaut solo founder** : on greffe `company/` dans le repo applicatif principal — moins de fragmentation, tout est lié au même git.

## 2. Scaffolder avec le CLI

```bash
node packages/create-company/src/index.js --dest "<destination>/company" [--solo | --associes] [--with-root]
```

Options :
- `--solo` : mode solo founder (supprime `juridique/pacte_associes.md`)
- `--associes` : mode avec associés (supprime `juridique/checklist_solo.md`)
- `--with-root` : crée aussi `CLAUDE.md`, `MEMORY.md`, `llms.txt` à la racine (si nouveau repo dédié)
- `--force` : écraser si le dossier existe déjà

> Le CLI affiche automatiquement le prompt d'audit à coller dans Claude (voir étape 4).

## 3. Nettoyage solo vs associés

- **Solo founder** → supprimer `juridique/pacte_associes.md`, garder `juridique/checklist_solo.md`
- **Avec associés** → supprimer `juridique/checklist_solo.md`, garder `juridique/pacte_associes.md`

`brand/founder.md` reste utile dans les deux cas (incarnation du dirigeant principal).

## 4. Lancer l'audit IA — prompt à coller

Ouvrir une session Claude **dans le repo de destination**, et coller le prompt suivant :

````
Je viens de cloner un template d'infos entreprise dans `company/` à la racine du repo.
Ta mission : auditer ce que tu peux pré-remplir TOI-MÊME à partir des sources existantes
du projet, et lister précisément ce qui me reste à fournir.

## Étape 1 — Inventaire des sources internes

Lis et indexe ces fichiers (sans rien écrire encore) :
- CLAUDE.md (racine) + tout CLAUDE.md de sous-dossiers
- README.md + tout .md de pitch produit historique
- .planning/PROJECT.md, .planning/STATE.md, .planning/ROADMAP.md (si présents)
- package.json, shared/schema.ts ou équivalent — stack technique, modèle de données
- design_guidelines.md ou équivalent — éléments charte existants
- docs/ et tout .md à la racine — contexte additionnel
- .env.example — services tiers utilisés
- Logique métier centrale (server/, src/, lib/ selon stack)

## Étape 2 — Audit de la structure company/

Pour CHAQUE fichier de `company/` (hors AGENTS.md, CLAUDE.md, llms.txt, README.md
qui sont des fichiers d'infra), classe en 3 catégories :

**A. PRÉ-REMPLISSABLE PAR TOI** (info présente dans les sources internes)
   → indique : fichier · ce que tu peux écrire · source d'où vient l'info

**B. PARTIELLEMENT REMPLISSABLE** (squelette ok mais besoin d'input le fondateur pour finir)
   → indique : fichier · ce que tu peux ébaucher · quelles 1-3 questions précises poser

**C. 100% À FOURNIR PAR le fondateur** (aucune source interne ne couvre ça)
   → indique : fichier · pourquoi (info légale / décision stratégique / créatif pur)

## Étape 3 — Restitution

Sors un seul tableau markdown à 4 colonnes :
`Fichier | Catégorie (A/B/C) | Ce que tu peux écrire seul | Ce qu'il me faut`

Puis sous le tableau, une liste numérotée des questions à me poser (regroupées par
thème : légal / brand / strat / marketing / juridique / founder), classées par
criticité (bloquant pour le launch d'abord, nice-to-have après).

NE REMPLIS RIEN POUR L'INSTANT. Audit only. J'attendrai ta restitution avant de
te donner mes réponses.
````

## 5. Après l'audit

1. Claude restitue le tableau A/B/C + les questions
2. le fondateur répond aux questions critiques (peut être en plusieurs sessions)
3. Demander à Claude : `go remplis les A, ébauche les B avec mes réponses, laisse les C en placeholders avec un commentaire <!-- À fournir --> en tête`
4. Commit + push une fois un état initial cohérent atteint

## 5 bis. Lancer le déroulé de fabrication

L'audit remplit le *classeur*. Pour **produire** la boîte dans le bon ordre (cadrage → validation → stratégie → marque minimale → offre/GTM → identité → build → lancement), suivre la **gamme de fabrication** :

- **`company/COMPANY_PLAYBOOK.md`** — les 8 phases, l'agent pilote de chacune, les livrables et les gates de validation.
- Skill **`/build-company`** — orchestre ce déroulé phase par phase, appelle le bon agent, impose une gate humaine avant de passer. Dire simplement `/build-company` ou "par où je commence pour la boîte ?".

## 6. Checklist d'intégration post-scaffold (l'angle mort)

Le CLI fait le scaffold ; **rendre le reste du méta-système conscient de la nouvelle boîte est manuel et facile à oublier.** Après un scaffold, vérifier :

- [ ] **Compte GitHub** : le fondateur a 2 comptes (`oscardcstudio-cell` perso, `une marque` org). Avant tout `gh repo create`/`push` → `gh auth status` puis `gh auth switch -u <bon compte>`. Une boîte perso = `oscardcstudio-cell`. *(Le wizard `setup.js` cible un fondateur lambda avec un seul compte — cette gymnastique multi-compte est spécifique à le fondateur.)*
- [ ] **CLAUDE.md du bucket** : si repo dédié, ajouter une ligne au tableau "Projets" du `CLAUDE.md` du bucket (`oscardcstudio\CLAUDE.md`). Sans ça, les sessions futures ne "voient" pas la boîte.
- [ ] **DASHBOARDS.md** : la page d'onboarding/architecture (`templates/architecture/index.html` recopiée) est un dashboard → l'enregistrer dans `~/.claude/DASHBOARDS.md` (skill `dashboards-index`).
- [ ] **Mémoire projet** : si la boîte est un projet durable, écrire une entrée mémoire (`~/.claude/projects/.../memory/`) pour qu'elle persiste entre sessions.
- [ ] **Backup .env** : le `.env` de la boîte sera auto-sauvegardé par `ClaudeEnvBackup` **uniquement s'il vit dans un bucket** scanné. Vérifier l'emplacement.

> Tant que le sync transform-aware n'existe pas (BACKLOG #19), c'est manuel. Le but à terme : une commande qui scaffolde **et** référence partout.

## Anti-patterns à éviter

- **Ne pas faire l'audit avant de remplir** → Claude invente des trucs au lieu de partir des sources réelles. L'audit force la traçabilité.
- **Tout remplir d'un coup** → ennuyeux et incomplet. Plusieurs sessions = plus précis.
- **Mélanger founder-perso et brand** → `brand/founder.md` doit être pro et public. Les notes perso vivent ailleurs (mémoire utilisateur, hors git).
- **Garder pacte_associes.md ET checklist_solo.md** → choisir un seul des deux selon la structure réelle. Doublon = confusion pour Claude plus tard.
- **Oublier `brand/guide_editorial.md`** → c'est le fichier le plus chargé en pratique. Sans lui, tout texte est générique.
