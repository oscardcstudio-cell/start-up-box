# CLAUDE Health Rules — protocole anti-bloat cross-projet

Source de vérité pour la santé des `CLAUDE.md` sur une machine de dev.
Référencé depuis le `CLAUDE.md` meta racine.
**Tous les projets** sous le workspace doivent respecter ces règles.

## 1. Pourquoi

Chaque `CLAUDE.md` est chargé **à chaque message** (pas une fois par session). Bloat = tokens cramés à vie + place perdue dans le context window. Le cache prompt baisse le coût en `$` mais **n'enlève pas** le poids dans la fenêtre de contexte.

Stack typique : `user (5K) + meta (6K) + bucket (2K) + projet (8K cible)` = ~21 KB ~5K tokens. Au-delà de 30 KB cumulé on est en zone rouge.

## 2. Seuils chiffrés

| Métrique | Warn | Critical |
|----------|------|----------|
| `CLAUDE.md` projet (taille brute) | > 8 KB | > 12 KB |
| Hiérarchie totale (user + meta + bucket + projet) | > 20 KB | > 30 KB |
| Résidus racine projet (`*.bak`, `*_backup_*.json` multiples, `local_screenshot.png`) | > 2 fichiers | > 5 fichiers |
| Fichier > 5 MB à la racine projet **sans** `.claudeignore` | warn | critical |
| `MEMORY.md` absent dans `memory/` | warn | - |
| Doublon de règle entre niveaux (même règle écrite 2 fois) | warn | - |

Un hook `claude-md-health-check.js` (SessionStart, user-level) peut mesurer ces seuils à chaque ouverture de session et alerter si dépassement. Read-only, jamais d'écriture sur les `CLAUDE.md`.

## 3. Patterns à appliquer

### `@import` — N'ALLÈGE PAS le contexte

⚠️ **Correction d'une erreur fréquente.** `CLAUDE.md` supporte `@chemin/fichier.md`, mais — **doc Anthropic officielle** ([code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory)) — le fichier importé est **expansé et chargé en contexte au lancement, comme s'il était inline**. **Même coût token.** Récursion max = **4 hops**. Donc `@import` sert à **organiser / dédupliquer** (un fichier source réutilisé à plusieurs endroits), **JAMAIS à décharger un CLAUDE.md**.

> *"Splitting into @path imports helps organization but does not reduce context, since imported files load at launch."* — docs Anthropic

**Les VRAIS mécanismes lazy** (chargés seulement à la demande) :
- **skills** (`.claude/skills/`) → chargés à l'invocation
- **`.claude/rules/` path-scopés** (frontmatter `paths:`) → chargés quand Claude ouvre un fichier qui matche le glob
- **CLAUDE.md de sous-dossier** → chargé quand Claude lit un fichier dans ce sous-dossier
- **commentaires HTML** `<!-- … -->` → strippés avant injection (notes mainteneur gratuites en tokens)

Pour vraiment décharger un gros bloc d'un CLAUDE.md : le sortir en **skill** ou en **rule path-scopée**, pas en `@import`.

### Trigger tables au lieu de prose

```markdown
| Skill | Déclencheur |
|-------|-------------|
| health-check | "le service tourne ?" |
| pre-deploy-check | avant push |
```

Plus dense et plus actionnable que des paragraphes.

### Skill > règle longue dans CLAUDE.md

Une règle qui fait > 20 lignes : la transformer en skill (`description` triggerante + `SKILL.md` chargé à la demande). Plus jamais dans le CLAUDE.md de base.

### Path-scoped frontmatter (YAML)

Pour des règles qui ne concernent qu'un sous-dossier, utiliser le frontmatter YAML qui scope par chemin. Réduit la pollution cross-projet du même repo.

### Règle "two strikes"

N'ajouter une instruction au `CLAUDE.md` que **la deuxième fois** où Claude se trompe dessus. Premier échec = exception, deuxième = pattern qui justifie une règle.

## 4. Anti-patterns

- **Résidus à la racine projet** : `CLAUDE.md.bak`, `*_backup_*.json` multiples, screenshots de debug. À bouger dans `backups/` ou supprimer.
- **Règles dupliquées inter-niveaux** : si une règle est dans `user/CLAUDE.md`, ne pas la répéter dans `meta/CLAUDE.md`. Dédupliquer.
- **Secrets en clair** : tokens, mots de passe, IDs privés. Toujours en env var. Un hook `secret-scan.js` (PreToolUse Write/Edit) peut bloquer, mais pas les CLAUDE.md existants.
- **Sections "État actuel"** datées dans le `CLAUDE.md` : ça pourrit en silence. À bouger dans un fichier d'état dédié (`docs/STATE.md`) qui peut être régénéré.
- **Listes chiffrées longues** (stratégies actives, fichiers critiques avec descriptions) : tout ce qui ressemble à de la doc de référence va dans `docs/REFERENCE.md`.
- **Doublons skills/agents/CLAUDE.md** : si une instruction est aussi dans un skill, ne pas la répéter en prose dans le CLAUDE.md.

## 5. Outils

### Hook `claude-md-health-check.js` (auto, passif)

Lancé par `SessionStart` user-level.
- Mesure les seuils ci-dessus
- Alerte 1 ligne sur stderr si dépassement (visible au démarrage de session)
- Loggue dans un fichier de suivi pour traquer la dérive
- **Ne modifie aucun fichier**

### Audit profond manuel

[github.com/tyabu12/claude-config-doctor](https://github.com/tyabu12/claude-config-doctor) — audit sémantique cross-fichiers (CLAUDE.md ↔ hooks ↔ permissions). À installer pour audit ponctuel quand le hook auto alerte sérieusement.

### Skills officiels Anthropic

- `claude-md-management:claude-md-improver` — audit + edits proposés
- `claude-md-management:revise-claude-md` — update post-session

## 6. Checklist nouveau projet

Avant de commit le premier `CLAUDE.md` d'un projet :

- [ ] `CLAUDE.md` < 8 KB
- [ ] Hiérarchie héritée documentée en haut (`> Hiérarchie : hérite de ...`)
- [ ] Pas de doublon avec les niveaux supérieurs (user/meta/bucket)
- [ ] Si détails techniques > 20 lignes : sortir dans `docs/REFERENCE.md`
- [ ] `memory/MEMORY.md` créé (vide ou avec une 1re entrée)
- [ ] `.claudeignore` créé si fichiers > 5 MB existent ou sont prévus (data, logs, builds)
- [ ] Aucun secret en clair (tokens, mots de passe, IDs privés)
- [ ] Sections "État actuel" / "Stratégies actives" dans des fichiers séparés (`docs/STATE.md`)

## 7. Quand auditer un projet existant

Déclencheurs :

- Le hook auto alerte (warn ou critical)
- Sentiment "j'ai trop écrit" en relisant
- Après avoir ajouté un nouveau bloc qui ferait passer au-dessus du seuil
- Tous les ~3 mois sur les projets actifs (passage manuel)
- Avant un onboarding (un nouveau dev / un autre Claude doit prendre le projet en main)

Procédure :

1. Lancer un audit profond (`claude-config-doctor`)
2. Identifier ce qui peut sortir en skill / rule path-scopée
3. Identifier les doublons à dédupliquer
4. Bouger les listes datées dans des fichiers d'état
5. Trimmer les sections > 20 lignes en pointant vers le skill ou `docs/REFERENCE.md`
6. Re-mesurer après : doit être sous le seuil warn

## 8. Comment cette doc se diffuse

- Référencée depuis le `CLAUDE.md` meta racine → tous les projets sous le workspace héritent
- Le hook `claude-md-health-check.js` rappelle l'existence de cette doc dans son alerte
- À consulter explicitement avant toute création/refacto de `CLAUDE.md`

Pas d'`@import` automatique de cette doc dans le meta racine — sinon elle gonfle le contexte de tous les projets, l'inverse du but. Lecture **à la demande**.
