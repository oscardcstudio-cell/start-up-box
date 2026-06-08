# CLAUDE.md — start-up-box

Config IA minimale pour le repo start-up-box lui-même (développement et maintenance de la box).

## Ce repo

start-up-box est un toolkit public. Ce CLAUDE.md s'applique au **développement de la box** (contribuer, mettre à jour les agents, faire évoluer les skills).

Il ne s'applique PAS au projet startup de l'utilisateur final — celui-ci a son propre `company/CLAUDE.md` créé par `/create-company`.

## Architecture de distribution (couche meta + auto-update)

La box livre **3 choses** chez le fondateur : les agents, les skills, et la **couche meta** (`meta-rules/`).

- `meta-rules/HARNESS.md` — **harness fondateur** (mode non-technique : zéro jargon, Claude fait le technique lui-même, raccourci `ctv`). Installé en `~/.claude/startup-box/HARNESS.md`, branché via un `@import` dans le `~/.claude/CLAUDE.md` du fondateur → c'est **le meta au-dessus de tous ses projets**. **Authoré ici** (box-only).
- `meta-rules/{CONTEXT_ENGINEERING,CLAUDE_HEALTH_RULES,CLAUDE_BUG_DOCTRINE,NEW_PROJECT,NEW_COMPANY}.md` — doctrines. **NE PAS les éditer ici** : elles sont synchronisées depuis `C:\dev\claude\public-rules\` par le gate `scripts/publish-rules.mjs` (channel 2). Source unique = `public-rules/`.
- `hooks/startup-box-update.js` — hook SessionStart installé chez le fondateur : `git pull` de la box + resync à chaque conversation. **Sûr** : ff-only, fail-silent, contenu `.md` auto, hooks exécutables mis à jour SEULEMENT si `hooks/VERSION` distante > installée. **Bumper `hooks/VERSION`** à chaque modif d'un hook, sinon les fondateurs ne le reçoivent pas.

Pipeline complet : `meta-claude-dev` (privé) → `public-rules/` (curé) → `publish-rules.mjs` (scan-gate) → channel 1 `claude-meta-rules` (DEV) + channel 2 `start-up-box/meta-rules/` (FONDATEUR) → pull auto chez le fondateur.

## Règles de développement

- **Ne pas modifier les agents sans tester** : chaque méta-agent packagé dans `plugins/startup-agents/agents/` est une copie de la version user-scope. Toute modification doit être testée en user-scope d'abord.
- **Sync double copy** : les agents dans `plugins/startup-agents/agents/` et les skills dans `plugins/startup-skills/skills/` sont des copies — elles ne sont pas sourced automatiquement depuis `~/.claude/`. Les mettre à jour manuellement à chaque évolution.
- **Le fondateur ne tape jamais de commande** : aucune doc/skill ne doit dire "lance `/create-company`" ni "tape `/build-company`". Claude enchaîne les skills lui-même (outil Skill). Entrée unique = `/build-company` ou langage naturel.
- **Marketplace** : après tout ajout/suppression de plugin dans `.claude-plugin/marketplace.json`, vérifier que le `plugin.json` du plugin correspondant existe et est cohérent.
- **Onboarding (page publique)** : la page d'onboarding publique vit dans un **repo séparé déployé** — `oscardcstudio-cell/start-up-box-architecture` (live : https://start-up-box-onboarding-production.up.railway.app). Après toute modif du prompt-installeur dans `INSTALL.md`, répercuter le prompt copié dans ce repo (`index.html`, div `#install-prompt`) puis `railway up`. (L'ancienne page `docs/onboarding/` a été retirée le 2026-06-08 — redondante.)

## llms.txt

Fichiers critiques à lire en priorité : voir `llms.txt`.
