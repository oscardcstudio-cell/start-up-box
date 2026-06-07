---
name: create-company
description: "Scaffolde un dossier company/ complet dans le repo courant — brand, stratégie, marketing, juridique, projets. Lance /create-company pour initialiser ta boîte avant de démarrer /build-company. Triggers : créer le dossier company, initialiser ma startup, scaffold company, create-company."
---

# Create Company — scaffold du dossier company/

Tu scaffoldes un dossier `company/` complet dans le répertoire courant. C'est la première action avant de lancer `/build-company`.

## Mode opératoire

### Étape 1 — Vérification

Vérifie si `company/` existe déjà dans le répertoire courant.
- **Oui** : demande confirmation avant de continuer ("Un dossier company/ existe déjà. Je peux l'écraser ou l'ignorer et démarrer /build-company directement. Que préfères-tu ?")
- **Non** : continue.

### Étape 2 — Choix fondateur

Pose une seule question : **solo founder ou avec associés ?**
- `solo` → crée `juridique/checklist_solo.md`, supprime `juridique/pacte_associes.md`
- `associés` → crée `juridique/statuts.md` + `juridique/pacte_associes.md`, supprime `juridique/checklist_solo.md`

### Étape 3 — Scaffold

Crée la structure complète en écrivant les fichiers suivants avec des placeholders `<!-- À fournir -->`.

**Racine company/**
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

Affiche la liste des fichiers créés, puis :

> "Dossier company/ créé avec [N] fichiers. Lance `/build-company` pour démarrer la phase 0 : je vais t'aider à formuler ton problème et ta cible."

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

## Contenu du COMPANY_PLAYBOOK.md à créer

Crée `company/COMPANY_PLAYBOOK.md` avec ce contenu minimal :

```markdown
# COMPANY_PLAYBOOK.md — Gamme de fabrication

8 phases de création, pilotées par `/build-company`. Gate humaine à chaque étape.

| Phase | Objectif | Gate |
|---|---|---|
| 0 — Cadrage | Formuler le problème et la cible | Hypothèse problème + cible écrits |
| 1 — Validation | Confirmer le problème par du signal externe | Problème confirmé (interviews, fake-door...) |
| 2 — Stratégie | Modèle économique + North Star | Unit economics tiennent + North Star définie |
| 3 — Marque | Identité, ton, DA | guide_editorial.md + charte.md posés |
| 4 — Offre & GTM | Offre packagée + canal prioritaire | 1 canal + offre testable |
| 5 — Build | MVP qui mesure l'hypothèse de valeur | MVP hypothèse-testable |
| 6 — Lancement | Mise en marché + mesure active | Tracking en place + RGPD/CGU OK |
| ∥ Juridique | Structure légale propre | Forme avant 1er euro ; RGPD avant collecte data |

Détail complet : https://github.com/oscardcstudio-cell/start-up-box
```

## Contenu du CLAUDE.md company/ à créer

```markdown
# Contexte entreprise — company/

Quand ce dossier est présent, charger ses fichiers pour tout contexte business ou brand.

## Priorité de chargement

1. info.json + team.json
2. brand/plateforme.md
3. brand/founder.md
4. brand/guide_editorial.md — OBLIGATOIRE avant tout texte
5. strategie/hypotheses.md + strategie/metrics.md

## Règles

- Avant tout texte → charger brand/guide_editorial.md
- Avant tout visuel → charger brand/charte.md + brand/direction_artistique.md
- Avant toute décision stratégique → charger strategie/hypotheses.md + strategie/metrics.md

## Notes entre sessions

- Quand le fondateur dit **"note X: …"** (produit/offre/acquisition/marque/tech-ops/vision) → ranger dans `.planning/notes/<X>.md`, daté, garder sa formulation, confirmer où c'est rangé.
- Quand le fondateur dit **"on revoit [sujet]"** → rassembler toutes les notes du sujet, décider ensemble, logger la décision.
- **Avant tout chantier** : `/build-company` lit les notes pertinentes pour la phase — elles sont injectées dans le prompt de l'agent. Une note capturée ici EST invoquée au bon moment.
```
