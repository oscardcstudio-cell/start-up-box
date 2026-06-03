# CLAUDE.md — start-up-box

Config IA minimale pour le repo start-up-box lui-même (développement et maintenance de la box).

## Ce repo

start-up-box est un toolkit public. Ce CLAUDE.md s'applique au **développement de la box** (contribuer, mettre à jour les agents, faire évoluer les skills).

Il ne s'applique PAS au projet startup de l'utilisateur final — celui-ci a son propre `company/CLAUDE.md` créé par `/create-company`.

## Règles de développement

- **Ne pas modifier les agents sans tester** : chaque méta-agent packagé dans `plugins/startup-agents/agents/` est une copie de la version user-scope. Toute modification doit être testée en user-scope d'abord.
- **Sync double copy** : les agents dans `plugins/startup-agents/agents/` et les skills dans `plugins/startup-skills/skills/` sont des copies — elles ne sont pas sourced automatiquement depuis `~/.claude/`. Les mettre à jour manuellement à chaque évolution.
- **Marketplace** : après tout ajout/suppression de plugin dans `.claude-plugin/marketplace.json`, vérifier que le `plugin.json` du plugin correspondant existe et est cohérent.
- **Onboarding** : après toute modification du prompt-installeur dans `INSTALL.md`, répercuter le prompt dans `docs/onboarding/index.html`.

## llms.txt

Fichiers critiques à lire en priorité : voir `llms.txt`.
