# BACKLOG — start-up-box

Notes et tâches du projet, catégorisées par phase du COMPANY_PLAYBOOK.
Alimenté par le widget notes-backlog (preset `company-phases`).

---

## À faire — Phase 0 : Cadrage

<!-- notes P0 -->

## À faire — Phase 1 : Validation

<!-- notes P1 -->

## À faire — Phase 2 : Stratégie

<!-- notes P2 -->

## À faire — Phase 3 : Marque

<!-- notes P3 -->

## À faire — Phase 4 : Offre & GTM

<!-- notes P4 -->

## À faire — Phase 5 : Build

<!-- notes P5 -->

## À faire — Phase 6 : Lancement

<!-- notes P6 -->

## À faire — Non classé

<!-- notes non catégorisées -->

---

## Agents × COMPANY_PLAYBOOK — mapping complet

**Etat** : à faire — Phase 5 (Build) / transverse.

Le `/build-company` orchestre les phases mais le mapping agents×phases n'est pas complet. Pour chaque phase du playbook, définir explicitement :
- quel meta-agent appeler (business / marketing / creation / ux-conversion / offre-pricing / redacteur / philosophe / gamification…)
- quelles skills et quels modules utiliser
- quels fichiers `company/` lire en entrée + écrire en sortie

Objectif : que les agents utilisent les bonnes skills et les bons outils automatiquement, sans qu'Oscar ait à le spécifier à chaque fois.

---

## Intégrer subvention_match dans le déroulé build-company

**Etat** : à planifier.
**Contexte** : `subvention_match` (repo oscardcstudio) est un outil de matching de subventions. L'intégrer dans le playbook start-up-box pour que les fondateurs soient automatiquement guidés vers la recherche de subventions au bon moment.

Probablement Phase 2 (Validation) ou Phase 4 (Offre&GTM) — financement avant lancement. À confirmer : moment optimal dans le parcours, et comment appeler l'outil depuis `/build-company`.

---

## Remplacer "Oscar" par variable utilisateur

**Etat** : à faire — important pour la distribution publique du package.

Dans tous les fichiers templates du package (company/, INSTALL.md, docs/onboarding/index.html, COMPANY_PLAYBOOK.md), remplacer les occurrences hardcodées "Oscar" par une variable neutre (ex. `{{founder}}`, "l'utilisateur", "le fondateur"). Configurable lors du scaffold via `/create-company`.
