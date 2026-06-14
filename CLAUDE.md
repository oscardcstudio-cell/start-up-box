# CLAUDE.md — start-up-box

Config IA minimale pour le repo start-up-box lui-même (développement et maintenance de la box).

## Ce repo

start-up-box est un toolkit public. Ce CLAUDE.md s'applique au **développement de la box** (contribuer, mettre à jour les agents, faire évoluer les skills).

Il ne s'applique PAS au projet startup de l'utilisateur final — celui-ci a son propre `company/CLAUDE.md` créé par `/create-company`.

## Architecture de distribution (couche meta + auto-update)

La box livre **3 choses** chez le fondateur : les agents, les skills, et la **couche meta** (`meta-rules/`).

- `meta-rules/HARNESS.md` — **harness fondateur** (mode non-technique : zéro jargon, Claude fait le technique lui-même, raccourci `ctv`). Installé en `~/.claude/startup-box/HARNESS.md`, branché via un `@import` dans le `~/.claude/CLAUDE.md` du fondateur → c'est **le meta au-dessus de tous ses projets**. **Authoré ici** (box-only).
- `meta-rules/{CONTEXT_ENGINEERING,CLAUDE_HEALTH_RULES,CLAUDE_BUG_DOCTRINE,NEW_PROJECT,NEW_COMPANY}.md` — doctrines. **NE PAS les éditer ici** : elles sont synchronisées (neutralisées) depuis l'infra du mainteneur par `scripts/publish-to-box.mjs` (dry-run par défaut → `--write`). Toute édition ici sera écrasée à la prochaine sync. Allowlist + table de neutralisation : `scripts/publish-manifest.mjs`.
- `hooks/startup-box-update.js` — hook SessionStart installé chez le fondateur : `git pull` de la box + resync à chaque conversation. **Sûr** : ff-only, fail-silent, contenu `.md` auto, hooks exécutables mis à jour SEULEMENT si `hooks/VERSION` distante > installée. **Bumper `hooks/VERSION`** à chaque modif d'un hook, sinon les fondateurs ne le reçoivent pas.

## Mise à jour à distance (sans poste de dev)

Le repo est public et les fondateurs le pullent à chaque conversation. Tu peux donc le mettre à jour **depuis n'importe où** (interface web/mobile GitHub) : édite un fichier de `meta-rules/` (sauf doctrines, gérées par `scripts/publish-to-box.mjs`) ou un agent/skill, commit sur `main`.

Filet : le workflow **`.github/workflows/scan-gate.yml`** (`scripts/scan-gate.mjs`) tourne à chaque push et sur déclenchement manuel (bouton « Run workflow », accessible depuis le mobile GitHub). Il échoue si une fuite perso/secret est introduite → build rouge visible au téléphone, rien n'atteint les fondateurs tant que ce n'est pas corrigé.

## Règles de développement

- **Ne pas modifier les agents sans tester** : chaque méta-agent packagé dans `plugins/startup-agents/agents/` est une copie de la version user-scope. Toute modification doit être testée en user-scope d'abord.
- **Sync double copy** : les agents dans `plugins/startup-agents/agents/` et les skills dans `plugins/startup-skills/skills/` sont des copies — elles ne sont pas sourced automatiquement depuis `~/.claude/`. Les mettre à jour manuellement à chaque évolution.
- **Le fondateur ne tape jamais de commande** : aucune doc/skill ne doit dire "lance `/create-company`" ni "tape `/build-company`". Claude enchaîne les skills lui-même (outil Skill). Entrée unique = `/build-company` ou langage naturel.
- **Pas de plugin / marketplace** : la machinery `.claude-plugin/` a été retirée (2026-06-09). Un plugin ne sait pas livrer le harness (`@import`) ni l'auto-update silencieux (les marketplaces ne se mettent pas à jour seuls par défaut). Le SEUL chemin = le prompt-installeur de `INSTALL.md` (clone + copie + hook SessionStart). Ne pas réintroduire de manifest plugin.
- **Onboarding (page publique)** : la page d'onboarding publique vit dans un **repo séparé déployé** — `oscardcstudio-cell/start-up-box-architecture` (live : https://start-up-box-onboarding-production.up.railway.app). **Source unique : la page fetch `INSTALL.md` en live** depuis `raw.githubusercontent.com/.../master/INSTALL.md` (entre marqueurs `PROMPT:START/END` et `UPDATE_PROMPT:START/END`) et injecte le prompt à chaque chargement. Donc **une modif du prompt dans `INSTALL.md` est en ligne dès le push de la box — aucune répercussion manuelle, aucun `railway up`**. Le `<div id="install-prompt">` hardcodé n'est qu'un fallback si le fetch échoue (`railway up` requis seulement pour un changement de structure/design de `index.html`). (L'ancienne page `docs/onboarding/` a été retirée le 2026-06-08 — redondante.)

## llms.txt

Fichiers critiques à lire en priorité : voir `llms.txt`.
