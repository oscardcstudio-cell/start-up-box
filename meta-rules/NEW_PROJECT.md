# Procédure — créer un nouveau projet/repo

Procédure cross-bucket pour initialiser proprement un nouveau projet sous `~/projets\<bucket>\<nom>`.

## 1. Choisir le bucket

| Bucket                  | Compte GitHub        | Pour quoi |
|-------------------------|----------------------|-----------|
| `une marque\`     | `une marque`    | Tout projet société la marque |
| `oscardcstudio\`        | `oscardcstudio-cell` | Projets persos le fondateur (tout ce qui n'est pas la marque) |

**Règle absolue** : un repo la marque ne pointe JAMAIS vers un remote perso, et inversement.

## 2. Switcher le compte GitHub actif AVANT toute commande `gh`

```bash
gh auth status                          # voir l'utilisateur actif
gh auth switch -u <user>                # switcher si mismatch
```

`<user>` = `une marque` ou `oscardcstudio-cell`.

## 3. Créer le repo physiquement dans le bucket

Les repos vivent **directement** dans leur bucket (pas ailleurs, pas de junctions). Le `un projet créatif` épisode (mai 2026) a confirmé : créer un dossier physique séparé + junction est inutile et complique pour rien.

```bash
mkdir "~/projets/<bucket>/<nom>"
git -C "~/projets/<bucket>/<nom>" init
git -C "~/projets/<bucket>/<nom>" checkout -b main
```

## 4. Créer le repo GitHub et ajouter le remote

```bash
gh repo create <nom> --private --description "<courte description>"
git -C "~/projets/<bucket>/<nom>" remote add origin https://github.com/<user>/<nom>.git
```

## 5. Installer la structure de base

**Toujours** :
- `CLAUDE.md` — règles et contexte projet (< 200 lignes, règles uniquement)
- `MEMORY.md` — mémoire vivante du projet : index des fichiers structurants, décisions, gotchas techniques, sessions cumulées. À lire en premier par tout Claude qui entre dans le projet, à mettre à jour à la fin de chaque session significative. **Obligatoire dès l'init**, même squelette vide (sections : Index, Décisions structurelles, Gotchas, Sessions).
- `llms.txt` — inventaire des fichiers/dossiers critiques
- `README.md` — pitch court du projet

**Selon nature du projet** :

| Fichier/Dossier | Quand l'ajouter |
|---|---|
| `BACKLOG.md` | Tout projet actif avec des tâches à tracker |
| `.claude/settings.json` | Permissions ou hooks spécifiques au projet |
| `company/` | Projet avec composante business — voir [`NEW_COMPANY.md`](NEW_COMPANY.md) et le package [`packages/create-company`](packages/create-company/) |
| `wiki/` | Projets complexes (pattern Karpathy : index/entities/decisions/gotchas/patterns) |
| Dossiers métier | Selon domaine (`src/`, `tests/`, `script/`, `production/`, etc.) avec `.gitkeep` si vides |

**Avant de créer un nouveau module/package** : vérifier [`packages/`](packages/) en premier — si quelque chose couvre le besoin, l'utiliser ou l'étendre plutôt que rebâtir.

## 6. Premier commit + push

```bash
git -C "~/projets/<bucket>/<nom>" add -A
git -C "~/projets/<bucket>/<nom>" commit -m "feat: init <nom> — <description>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git -C "~/projets/<bucket>/<nom>" push -u origin main
```

## 7. Référencer dans le CLAUDE.md du bucket

Ajouter une ligne au tableau `## Projets` du `CLAUDE.md` du bucket (`une marque\CLAUDE.md` ou `oscardcstudio\CLAUDE.md`), commit + push ce CLAUDE.md.

## 8. Lancer GSD pour les projets avec roadmap

Si le projet a une complexité réelle (plusieurs phases, features distinctes, architecture à poser) :

```
/gsd:new-project
```

Génère `PROJECT.md`, la roadmap et le répertoire `.planning/` avec les phases. À lancer après l'init git, dans la même session ou la suivante.

**Convention notes** : les projets GSD accumulent des items dans `.planning/notes/`. Obligation : marquer `✅ RÉSOLU [AAAA-MM-JJ]` dès qu'un item est implémenté (voir section [Convention RÉSOLU](CLAUDE.md#convention-résolu--notes-planningnotes-cross-projet) dans le meta CLAUDE.md). Ne jamais marquer RÉSOLU sans vérifier dans le code réel.

## 9. Avant de créer un dashboard dans le projet

Consulter `~/.claude\DASHBOARDS.md` — si un dashboard existant couvre le besoin, dupliquer/étendre plutôt que rebâtir. Mettre à jour le registry après création. Skill : `dashboards-index`.

## 10. Checklist santé infra (context engineering)

Avant de clore l'init :
- [ ] `llms.txt` présent à la racine
- [ ] `CLAUDE.md` < 200 lignes, règles uniquement (pas de doc d'archi)
- [ ] `MEMORY.md` présent à la racine, même si squelette (Index / Décisions / Gotchas / Sessions)
- [ ] Pas de fichier > 300 lignes non documenté dans `llms.txt`
- [ ] `.gitignore` adapté (au minimum : secrets, dépendances, build, OS)
- [ ] Si projet complexe : `/gsd:new-project` lancé et `PROJECT.md` présent

## Anti-patterns à ne pas répéter

- **Junction Windows** vers un repo physique ailleurs → inutile, casse l'intuition, fait perdre du temps. Garder le repo dans son bucket.
- **Init git dans un sous-dossier d'un repo parent existant** sans vérifier — si le bucket est lui-même un repo git, le nouveau projet sera un repo imbriqué non-tracké. Vérifier `git -C <bucket> rev-parse --is-inside-work-tree` avant.
- **`gh repo create` sans `gh auth switch`** → repo créé sur le mauvais compte, douleur garantie.
- **Skipper `MEMORY.md`** → perte de mémoire cumulée entre sessions.
- **Créer un module qui existe déjà dans `packages/`** → doublon silencieux qui diverge et coûte cher à maintenir.
- **Créer un dashboard sans checker `DASHBOARDS.md`** → duplication de travail cross-projet.
