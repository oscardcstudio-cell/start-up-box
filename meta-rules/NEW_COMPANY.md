# Procédure — créer une nouvelle boîte / entreprise

Procédure pour initialiser le **contexte entreprise** (`company/`) d'une nouvelle boîte. À utiliser quand vous lancez une activité commerciale distincte (SAS, SASU, EI, side-project monétisé).

> **Différence avec [`NEW_PROJECT.md`](NEW_PROJECT.md)** : `NEW_PROJECT.md` initialise un **repo applicatif** (code + git + Claude rules). `NEW_COMPANY.md` initialise le **contexte business** (brand, stratégie, marketing, juridique) — un dossier `company/` qui peut vivre seul OU se greffer à un repo applicatif existant.

## 1. Choisir l'emplacement

| Cas | Emplacement |
|-----|-------------|
| Boîte solo avec UN produit (app, SaaS) | `<repo>/company/` à la racine du repo applicatif |
| Boîte solo multi-produits OU sans produit tech encore | `<bucket>/<nom>/company/` (dossier dédié) |

**Par défaut solo founder** : on greffe `company/` dans le repo applicatif principal — moins de fragmentation, tout est lié au même git.

## 2. Scaffolder la structure

Initialiser un squelette `company/` avec, au minimum :

```
company/
  brand/
    founder.md           # incarnation du dirigeant principal (pro, public)
    guide_editorial.md   # voix, ton, vocabulaire — le fichier le plus chargé en pratique
    charte.md            # couleurs, typo, logo, principes visuels
  strategie/
    hypotheses.md        # hypothèses de marché à valider
    metrics.md           # métriques clés, objectifs
  juridique/
    checklist_solo.md    # (mode solo) OU…
    pacte_associes.md    # (mode avec associés) — garder UN seul des deux
  AGENTS.md              # config IA cross-tool
  CLAUDE.md              # règles du dossier company/
  llms.txt
  README.md
```

> Un CLI de scaffold peut automatiser ça. À défaut, créer les fichiers à la main à partir du squelette ci-dessus.

## 3. Nettoyage solo vs associés

- **Solo founder** → supprimer `juridique/pacte_associes.md`, garder `juridique/checklist_solo.md`
- **Avec associés** → supprimer `juridique/checklist_solo.md`, garder `juridique/pacte_associes.md`

`brand/founder.md` reste utile dans les deux cas.

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

**B. PARTIELLEMENT REMPLISSABLE** (squelette ok mais besoin de mon input pour finir)
   → indique : fichier · ce que tu peux ébaucher · quelles 1-3 questions précises poser

**C. 100% À FOURNIR PAR MOI** (aucune source interne ne couvre ça)
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
2. Vous répondez aux questions critiques (peut être en plusieurs sessions)
3. Demander à Claude : `go remplis les A, ébauche les B avec mes réponses, laisse les C en placeholders avec un commentaire <!-- À fournir --> en tête`
4. Commit + push une fois un état initial cohérent atteint

## 6. Checklist d'intégration post-scaffold (l'angle mort)

Le scaffold pose les fichiers ; **rendre le reste du méta-système conscient de la nouvelle boîte est manuel et facile à oublier.** Après un scaffold, vérifier :

- [ ] **Compte GitHub** : si vous avez plusieurs comptes, avant tout `gh repo create`/`push` → `gh auth status` puis `gh auth switch -u <bon compte>`.
- [ ] **CLAUDE.md du bucket** : si repo dédié, ajouter une ligne au tableau "Projets" du `CLAUDE.md` du bucket. Sans ça, les sessions futures ne "voient" pas la boîte.
- [ ] **Mémoire projet** : si la boîte est un projet durable, écrire une entrée mémoire pour qu'elle persiste entre sessions.
- [ ] **Backup des secrets** : vérifier que le `.env` de la boîte est couvert par votre routine de sauvegarde.

## Anti-patterns à éviter

- **Ne pas faire l'audit avant de remplir** → Claude invente des trucs au lieu de partir des sources réelles. L'audit force la traçabilité.
- **Tout remplir d'un coup** → ennuyeux et incomplet. Plusieurs sessions = plus précis.
- **Mélanger founder-perso et brand** → `brand/founder.md` doit être pro et public. Les notes perso vivent ailleurs (hors git).
- **Garder pacte_associes.md ET checklist_solo.md** → choisir un seul des deux selon la structure réelle. Doublon = confusion pour Claude plus tard.
- **Oublier `brand/guide_editorial.md`** → c'est le fichier le plus chargé en pratique. Sans lui, tout texte est générique.
