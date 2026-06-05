# Prompt-installeur start-up-box

**Prérequis immédiats** (avant de lancer le prompt) :
- **Git** → https://git-scm.com/downloads (`git --version` pour vérifier)
- **Claude Code** → https://claude.ai/download
- **Abonnement Max** → https://claude.ai/upgrade

**Prérequis Phase 5 — Build** (tu n'en as pas besoin maintenant) :
- **Node.js ≥18** → https://nodejs.org (si app web)
- **GitHub CLI (gh)** → https://cli.github.com (pour créer et versionner le repo)
- **Railway** → https://railway.app (déploiement, si app web)
- **OpenRouter** → https://openrouter.ai (optionnel — si tu veux changer de modèle IA)

⚠ **Windows** : le prompt utilise des chemins Unix (`~/`). Claude Code les résout automatiquement via WSL ou Git Bash. Si ça échoue, lancer Claude Code depuis Git Bash.

---

## Le prompt à copier-coller

Ouvre Claude Code (dans n'importe quel dossier), copie le bloc ci-dessous et colle-le :

```
Installe start-up-box sur cette machine. C'est un toolkit IA pour créer une startup de A à Z.

Exécute ces étapes dans l'ordre avec tes outils bash :

1. Clone le repo :
   git clone https://github.com/oscardcstudio-cell/start-up-box.git ~/.start-up-box

2. Installe les agents :
   mkdir -p ~/.claude/agents
   cp ~/.start-up-box/plugins/startup-agents/agents/*.md ~/.claude/agents/

3. Installe les skills :
   mkdir -p ~/.claude/skills/build-company
   cp -r ~/.start-up-box/plugins/startup-skills/skills/build-company/. ~/.claude/skills/build-company/
   mkdir -p ~/.claude/skills/create-company
   cp -r ~/.start-up-box/plugins/startup-skills/skills/create-company/. ~/.claude/skills/create-company/

4. Vérifie que ces fichiers existent :
   ~/.claude/agents/meta-business.md
   ~/.claude/skills/build-company/SKILL.md

5. Dis-moi "Installation terminée ✓" et explique-moi les deux prochaines commandes à lancer.
```

---

## Ce qui se passe ensuite

Une fois l'install terminée, ouvre Claude Code **dans le dossier de ton projet** et lance :

```
/create-company     ← crée le dossier company/ (structure complète)
/build-company      ← démarre la phase 0 : cadrage de ton idée
```

Claude te posera des questions, écrira dans tes fichiers, et te demandera de valider chaque étape avant de passer à la suivante.

---

## Installer via le marketplace (alternative)

Si tu préfères utiliser le système de plugin officiel Claude Code :

```
/plugin marketplace add https://github.com/oscardcstudio-cell/start-up-box
/plugin install startup-agents@start-up-box
/plugin install startup-skills@start-up-box
```

---

## GitHub (optionnel — recommandé mais pas bloquant)

GitHub n'est **pas nécessaire pour commencer**. Tu peux travailler en local.

Si tu veux versionner ton projet, lance `/build-company` : à la phase 5 (build), il t'expliquera comment créer ton repo.

---

## Désinstaller

```bash
rm -rf ~/.start-up-box
rm ~/.claude/agents/meta-*.md
rm -rf ~/.claude/skills/build-company
rm -rf ~/.claude/skills/create-company
```
