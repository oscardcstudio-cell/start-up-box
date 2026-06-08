# start-up-box

Toolkit IA open-source pour créer une startup de A à Z depuis Claude Code.

Un prompt, un `/build-company`, et les meilleurs agents de stratégie/marque/pricing/rédaction pilotent ton projet phase par phase — avec une gate humaine à chaque étape.

## Ce que tu obtiens

- **9 agents spécialisés** : stratégie, marketing, création DA, pricing, UX/conversion, rédaction, UI/UX, philosophie, gamification
- **Skill `/build-company`** : orchestrateur qui séquence les 8 phases (cadrage → validation → stratégie → marque minimale → offre/GTM → identité → build → lancement)
- **Skill `/create-company`** : scaffold ton dossier `company/` en une commande
- **29 fichiers de contexte** : brand, stratégie, marketing, juridique — tous les docs qu'un fondateur doit remplir, structurés pour l'IA

## Installation (30 secondes)

**Prérequis** : [Claude Code](https://claude.ai/download) + abonnement [Max](https://claude.ai/upgrade). Git en option (mais recommandé).

Copie le bloc dans `INSTALL.md` et colle-le dans une session Claude Code :

```
→ voir INSTALL.md
```

## Structure du repo

```
start-up-box/
├── INSTALL.md                  ← prompt-installeur à copier-coller
├── plugins/
│   ├── startup-agents/         ← 9 méta-agents Claude Code
│   └── startup-skills/         ← 4 skills (build-company, create-company, design-director, autoresearch)
└── .claude-plugin/
    └── marketplace.json        ← marketplace Claude Code officiel
```

> Page d'onboarding publique (déployée) : [start-up-box-onboarding-production.up.railway.app](https://start-up-box-onboarding-production.up.railway.app) — repo séparé `start-up-box-architecture`.

## Installer via le marketplace Claude Code

```
/plugin marketplace add https://github.com/oscardcstudio-cell/start-up-box
/plugin install startup-agents@start-up-box
/plugin install startup-skills@start-up-box
```

## Démarrer

```
/create-company     ← scaffold ton dossier company/
/build-company      ← démarre la phase 0 : cadrage de ton idée
```

## Philosophie

L'IA baisse la barrière d'**exécution**, pas celle du **jugement**.
À chaque gate : tu décides. L'agent propose, exécute, chiffre — toi tu valides.

Source : simulation CMU 2026 (TheAgentCompany) — même le meilleur modèle échoue 76% des tâches autonomes. Les gates ne sont pas une limitation : elles sont la valeur.

## Licence

MIT — fork, adapte, redistribue.
