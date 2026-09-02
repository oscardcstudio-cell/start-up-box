# AGENTS.md — start-up-box

Fichier cross-tool : pointer Codex, Cursor, Gemini CLI, Copilot CLI vers ce repo.

## Contexte

start-up-box est un toolkit IA open-source pour créer une startup. Ce repo contient :
- 9 méta-agents Claude Code spécialisés (stratégie, marketing, pricing, création, rédaction...)
- 4 skills : `/build-company` (orchestrateur 8 phases), `create-company` (scaffold, auto-invoquée), `design-director`, `autoresearch`
- `meta-rules/` : harness fondateur + doctrines (couche meta installée chez l'utilisateur)
- `hooks/` : mise à jour automatique (SessionStart)

**Deux runtimes** : Claude Code, et Gemini CLI via une conversion générée à l'install (`scripts/to-gemini.mjs`) — le repo ne commite que la version Claude.

Install unique = prompt-installeur de `INSTALL.md` (clone + copie + hook d'auto-update). Pas de plugin ni de marketplace : ça ne saurait pas livrer le harness ni l'auto-update silencieux.

## Fichiers clés

Voir `llms.txt` pour l'inventaire complet.

## Pour commencer

Lire `INSTALL.md` — contient le prompt-installeur unique à copier dans Claude Code.
