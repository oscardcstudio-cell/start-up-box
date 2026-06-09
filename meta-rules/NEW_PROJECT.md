# Procédure — créer un nouveau projet/repo

Procédure cross-bucket pour initialiser proprement un nouveau projet sous `<workspace>/<bucket>/<nom>`.

> **Concept de bucket** : un *bucket* est un dossier qui regroupe les repos d'un même contexte (un client, une organisation, vos projets persos). Chaque bucket est typiquement rattaché à **un compte GitHub**. Adaptez les noms ci-dessous à votre setup.

## 1. Choisir le bucket

| Bucket            | Compte GitHub     | Pour quoi |
|-------------------|-------------------|-----------|
| `<bucket-org>/`   | `<compte-org>`    | Projets d'une organisation / société |
| `<bucket-perso>/` | `<compte-perso>`  | Projets persos (tout ce qui n'est pas l'org) |

**Règle absolue** : un repo d'un bucket ne pointe JAMAIS vers le remote d'un autre bucket, et inversement.

## 2. Switcher le compte GitHub actif AVANT toute commande `gh`

```bash
gh auth status                          # voir l'utilisateur actif
gh auth switch -u <user>                # switcher si mismatch
```

`<user>` = le compte GitHub rattaché au bucket cible.

## 3. Créer le repo physiquement dans le bucket

Les repos vivent **directement** dans leur bucket (pas ailleurs, pas de junctions). Créer un dossier physique séparé + junction est inutile et complique pour rien (leçon vécue).

```bash
mkdir "<workspace>/<bucket>/<nom>"
git -C "<workspace>/<bucket>/<nom>" init
git -C "<workspace>/<bucket>/<nom>" checkout -b main
```

## 4. Créer le repo GitHub et ajouter le remote

```bash
gh repo create <nom> --private --description "<courte description>"
git -C "<workspace>/<bucket>/<nom>" remote add origin https://github.com/<user>/<nom>.git
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
| `company/` | Projet avec composante business — voir [`NEW_COMPANY.md`](NEW_COMPANY.md) |
| `wiki/` | Projets complexes (pattern Karpathy : index/entities/decisions/gotchas/patterns) |
| Dossiers métier | Selon domaine (`src/`, `tests/`, `script/`, `production/`, etc.) avec `.gitkeep` si vides |

**Avant de créer un nouveau module/package** : vérifier si un module réutilisable dans votre workspace couvre déjà le besoin — utiliser ou étendre plutôt que rebâtir.

## 6. Premier commit + push

```bash
git -C "<workspace>/<bucket>/<nom>" add -A
git -C "<workspace>/<bucket>/<nom>" commit -m "feat: init <nom> — <description>"
git -C "<workspace>/<bucket>/<nom>" push -u origin main
```

## 7. Référencer dans le CLAUDE.md du bucket

Ajouter une ligne au tableau `## Projets` du `CLAUDE.md` du bucket, commit + push ce CLAUDE.md.

## 8. Lancer GSD pour les projets avec roadmap

Si le projet a une complexité réelle (plusieurs phases, features distinctes, architecture à poser) :

```
/gsd:new-project
```

Génère `PROJECT.md`, la roadmap et le répertoire `.planning/` avec les phases. À lancer après l'init git, dans la même session ou la suivante.

**Convention notes** : les projets GSD accumulent des items dans `.planning/notes/`. Obligation : marquer `✅ RÉSOLU [AAAA-MM-JJ]` dès qu'un item est implémenté dans le code réel. Ne jamais marquer RÉSOLU sans vérifier.

## 9. Checklist santé infra (context engineering)

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
- **Créer un module qui existe déjà ailleurs dans le workspace** → doublon silencieux qui diverge.
