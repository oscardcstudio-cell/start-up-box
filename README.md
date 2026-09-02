# start-up-box

Toolkit IA open-source pour créer une startup de A à Z — depuis **Claude Code** ou **Gemini CLI**.

Un prompt, un `/build-company`, et les meilleurs agents de stratégie/marque/pricing/rédaction pilotent ton projet phase par phase — avec une gate humaine à chaque étape.

## Ce que tu obtiens

- **9 agents spécialisés** : stratégie, marketing, création DA, pricing, UX/conversion, rédaction, UI/UX, philosophie, gamification
- **Skill `/build-company`** : orchestrateur qui séquence les 8 phases (cadrage → validation → stratégie → marque minimale → offre/GTM → identité → build → lancement) — le seul truc à lancer
- **Skill `create-company`** : scaffold ton dossier `company/`, déclenché automatiquement par `/build-company` (tu ne la tapes pas toi-même)
- **29 fichiers de contexte** : brand, stratégie, marketing, juridique — tous les docs qu'un fondateur doit remplir, structurés pour l'IA

## Installation (30 secondes)

**Prérequis** — au choix :
- [Claude Code](https://claude.ai/download) + abonnement [Max](https://claude.ai/upgrade)
- ou **Gemini CLI** (gratuit) : `npm install -g @google/gemini-cli` + un compte Google

Git dans les deux cas.

Copie le bloc dans `INSTALL.md` et colle-le dans une session Claude Code :

```
→ voir INSTALL.md
```

## Structure du repo

```
start-up-box/
├── INSTALL.md                  ← prompt-installeur à copier-coller (le seul chemin)
├── plugins/
│   ├── startup-agents/agents/  ← 9 méta-agents (convertis à la volée pour Gemini)
│   └── startup-skills/skills/  ← 4 skills (build-company, create-company, design-director, autoresearch)
├── meta-rules/                 ← harness fondateur + doctrines (couche meta installée chez l'user)
└── hooks/                      ← mise à jour automatique (SessionStart)
```

> Page d'onboarding publique (déployée) : [start-up-box-onboarding-production.up.railway.app](https://start-up-box-onboarding-production.up.railway.app) — repo séparé `start-up-box-architecture`.

## Installer

Un seul chemin : le **prompt-installeur** (copier-coller dans Claude Code) → voir [INSTALL.md](INSTALL.md). Il installe tout : agents, compétences, **harness fondateur** et **mise à jour automatique** (clone + petit hook, pas de plugin ni de marketplace).

## Démarrer

Une seule commande (ou la même chose en langage normal, _« je veux lancer ma boîte »_) :

```
/build-company      ← démarre tout : cadrage de ton idée (phase 0)
```

S'il manque le dossier `company/`, Claude le crée automatiquement avant de continuer — tu n'as pas à taper de commande pour ça.

## Philosophie

L'IA baisse la barrière d'**exécution**, pas celle du **jugement**.
À chaque gate : tu décides. L'agent propose, exécute, chiffre — toi tu valides.

Source : simulation CMU 2026 (TheAgentCompany) — même le meilleur modèle échoue 76% des tâches autonomes. Les gates ne sont pas une limitation : elles sont la valeur.

## Licence

MIT — fork, adapte, redistribue.
