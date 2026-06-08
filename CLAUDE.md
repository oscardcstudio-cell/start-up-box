# CLAUDE.md — start-up-box

Config IA minimale pour le repo start-up-box lui-même (développement et maintenance de la box).

## Ce repo

start-up-box est un toolkit public. Ce CLAUDE.md s'applique au **développement de la box** (contribuer, mettre à jour les agents, faire évoluer les skills).

Il ne s'applique PAS au projet startup de l'utilisateur final — celui-ci a son propre `company/CLAUDE.md` créé par `/create-company`.

## Règles de développement

- **Ne pas modifier les agents sans tester** : chaque méta-agent packagé dans `plugins/startup-agents/agents/` est une copie de la version user-scope. Toute modification doit être testée en user-scope d'abord.
- **Sync double copy** : les agents dans `plugins/startup-agents/agents/` et les skills dans `plugins/startup-skills/skills/` sont des copies — elles ne sont pas sourced automatiquement depuis `~/.claude/`. Les mettre à jour manuellement à chaque évolution.
- **Marketplace** : après tout ajout/suppression de plugin dans `.claude-plugin/marketplace.json`, vérifier que le `plugin.json` du plugin correspondant existe et est cohérent.
- **Onboarding (page publique)** : la page d'onboarding publique vit dans un **repo séparé déployé** — `oscardcstudio-cell/start-up-box-architecture` (live : https://start-up-box-onboarding-production.up.railway.app). Après toute modif du prompt-installeur dans `INSTALL.md`, répercuter le prompt copié dans ce repo (`index.html`, div `#install-prompt`) puis `railway up`. (L'ancienne page `docs/onboarding/` a été retirée le 2026-06-08 — redondante.)

## llms.txt

Fichiers critiques à lire en priorité : voir `llms.txt`.
