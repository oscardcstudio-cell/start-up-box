---
name: create-company
description: "Scaffolde un dossier company/ complet dans le repo courant — brand, stratégie, marketing, juridique, projets. Normalement invoquée AUTOMATIQUEMENT par build-company quand le dossier company/ manque — le fondateur n'a pas à la lancer lui-même. Triggers : créer le dossier company, initialiser ma startup, scaffold company, create-company."
---

# Create Company — scaffold du dossier company/

Tu scaffoldes un dossier `company/` complet dans le répertoire courant. C'est l'étape d'initialisation que `build-company` déclenche tout seul quand le dossier manque. **Le fondateur ne tape jamais cette commande** : soit tu es invoquée automatiquement par `build-company`, soit le fondateur a exprimé l'envie de créer la structure en langage normal. À la fin, tu enchaînes toi-même sur `build-company` (outil Skill) — jamais "tape /build-company".

## Mode opératoire

### Étape 1 — Vérification

Vérifie si `company/` existe déjà dans le répertoire courant.
- **Oui** : demande confirmation avant de continuer ("Un dossier company/ existe déjà. Je peux l'écraser ou l'ignorer et démarrer /build-company directement. Que préfères-tu ?")
- **Non** : continue.

### Étape 2 — Choix fondateur

Pose une seule question : **solo founder ou avec associés ?**
- `solo` → crée `juridique/checklist_solo.md`, supprime `juridique/pacte_associes.md`
- `associés` → crée `juridique/statuts.md` + `juridique/pacte_associes.md`, supprime `juridique/checklist_solo.md`

### Étape 3 — Scaffold (COPIE des templates prêts à l'emploi — tu n'improvises pas)

La box embarque l'arbre `company/` **déjà rédigé, commenté et branché sur le plan** : chaque fichier porte sous son titre un en-tête `<!-- COMPANY-FILE <chemin> -->` + `> Rôle` + `> Plan (phase · agent)`. Ton job est de **copier cet arbre**, pas de réécrire les fichiers de mémoire (ils seraient plus pauvres et sans en-tête).

1. **Localise l'arbre de templates** — prends le premier chemin qui existe :
   - `~/.start-up-box/plugins/startup-skills/skills/create-company/templates/company/` (clone de la box, le plus à jour)
   - `~/.claude/skills/create-company/templates/company/` (copie locale du skill)
2. **Copie tout l'arbre** dans `./company/` (récursif — `cp -r <source>/. ./company/` ou équivalent). Ça pose les 31 fichiers d'un coup, en-têtes inclus.
3. **Nettoyage juridique** selon l'étape 2 :
   - `solo` → supprime `company/juridique/statuts.md` + `company/juridique/pacte_associes.md` (garde `checklist_solo.md`)
   - `associés` → supprime `company/juridique/checklist_solo.md` (garde `statuts.md` + `pacte_associes.md`)
4. **Crée `company/.planning/notes/`** (réservoir d'idées — non inclus dans l'arbre, voir plus bas).

> Si **aucun** chemin de templates n'existe (box non clonée / installeur incomplet) : **ne reconstruis pas les fichiers à la main**. Signale-le au fondateur et propose de relancer l'installeur — un scaffold improvisé perdrait la structure et les en-têtes qui branchent les agents.

**Contenu de l'arbre copié (carte de référence) — racine company/**
- `CLAUDE.md` — règles de chargement IA
- `AGENTS.md` — cross-tool
- `llms.txt` — inventaire fichiers critiques
- `COMPANY_PLAYBOOK.md` — gamme de fabrication (8 phases + gates)
- `info.json` — infos légales `{"name": "", "forme": "", "siren": "", "founded": "", "email": ""}`
- `team.json` — équipe `{"founders": [{"name": "", "role": "", "email": ""}]}`

**brand/**
- `plateforme.md` — WHY/WHAT/HOW, valeurs, positionnement
- `founder.md` — fondateur-comme-marque (solo) ou équipe
- `guide_editorial.md` — ton, voix, règles rédactionnelles
- `manifesto.md` — prise de position
- `fondations.md` — croyances, preuves
- `cibles.md` — personas clients
- `concurrence.md` — analyse concurrentielle
- `personas.md` — profils utilisateurs détaillés
- `charte.md` — charte graphique
- `direction_artistique.md` — direction artistique

**strategie/**
- `hypotheses.md` — croyances à valider (phase 0-1)
- `business_plan.md` — plan d'affaires
- `metrics.md` — North Star + KPIs
- `distribution.md` — canal d'acquisition prioritaire
- `subventions.md` — aides et financements

**marketing/**
- `plan_marketing.md` — plan marketing
- `calendrier_editorial.md` — calendrier éditorial

**juridique/** (selon choix étape 2)
- `statuts.md` ou `checklist_solo.md`
- `pacte_associes.md` (si associés seulement)

**projets/**
- `TEMPLATE_PROJET.md` — template pour les projets à venir

**.planning/notes/** — réservoir d'idées transverse, capturées entre sessions (widget ou conversation). 6 sujets fixes + inbox. Une idée jetée ici est invoquée au bon moment quand la phase correspondante démarre dans `/build-company`.
- `README.md` — mode d'emploi : comment déposer ("note produit: …"), comment revoir ("on revoit offre")
- `produit.md` — UX, features, design, parcours utilisateur
- `offre.md` — packaging, pricing, paliers, modèle one-shot vs abonnement
- `acquisition.md` — marketing, SEO, canaux, réseaux, partenariats
- `marque.md` — identité, naming, ton de voix, manifesto, DA
- `tech-ops.md` — infra, RGPD, légal, facturation, support, monitoring
- `vision.md` — cap long terme, nouveaux marchés, pivots, B2B, expansion
- `INBOX.md` — notes sans sujet clair, à trier

### Étape 4 — Récap

Affiche la liste des fichiers créés, puis **enchaîne directement** (invoque la skill `build-company` via l'outil Skill — ne demande pas au fondateur de la lancer) :

> "Dossier company/ créé avec [N] fichiers. J'enchaîne sur la phase 0 : je vais t'aider à formuler ton problème et ta cible."

## Contenu du README.md `.planning/notes/` à créer

```markdown
# Répertoire de notes

Réservoir d'idées permanent, classé par sujet. Dépose une idée quand elle vient ; elle ressort quand la phase correspondante démarre dans `/build-company`.

- **Déposer** : dis "note produit: …" ou "note offre: …" — Claude range dans le bon fichier, daté.
- **Revoir** : dis "on revoit [sujet]" — Claude rassemble toutes les notes du sujet.
- **Format** : `- [AAAA-MM-JJ] <idée telle quelle> — _(source: session)_`
- **Sujet ambigu** → va dans `INBOX.md`.

| Fichier | Contenu |
|---|---|
| produit.md | UX, features, design, parcours |
| offre.md | Pricing, packaging, paliers, modèle |
| acquisition.md | Marketing, canaux, SEO, réseaux |
| marque.md | Identité, naming, manifesto, DA |
| tech-ops.md | Infra, RGPD, légal, facturation |
| vision.md | Cap long terme, pivots, expansion |
```

Crée aussi les 6 fichiers sujets + INBOX.md avec ce header minimal :
```markdown
# Notes — [sujet]

<!-- Format : - [AAAA-MM-JJ] idée telle quelle — _(source: session)_ -->
```

## COMPANY_PLAYBOOK.md et CLAUDE.md company/

**Déjà dans l'arbre de templates copié à l'étape 3** — ne les réécris pas ici. Le `COMPANY_PLAYBOOK.md` bundlé est la version complète (8 phases détaillées, gates, agents, onboarding infra P6) ; le `CLAUDE.md` company/ porte les priorités de chargement et les règles « note X / on revoit ». Si tu as dû basculer en mode reconstruction manuelle (templates introuvables — cas dégradé signalé à l'étape 3), récupère leur contenu depuis le repo : https://github.com/oscardcstudio-cell/start-up-box
