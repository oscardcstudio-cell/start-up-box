# CLAUDE_BUG_DOCTRINE.md — Philosophie du bug (cross-projet)

> Chargement à la demande — ne pas `@import` dans CLAUDE.md.
> Consulter lors d'un bugfix non-trivial.

Doctrine issue de la culture post-mortem blameless (Google SRE, Netflix) + antifragilité (Taleb / Monperrus) :

## 1. Chaque bug immunise le projet

Après chaque correction de bug non-triviale, avant de clore le commit :
- Ajouter un check dans le script de health check du projet qui aurait détecté ce bug en prod
- Si le bug est statique (config, structure code) → ajouter un invariant dans la suite de tests
- Si le bug vient d'un intervalle de monitoring trop long → réduire cet intervalle

Le health check d'un projet grandit avec chaque incident. Un bug déjà vu ne peut pas passer inaperçu deux fois.

Exemple : un identifiant cassé (`tag_id` lu comme `4` au lieu de `6`) a empêché une action critique de se déclencher → ajout de 3 invariants dans la suite de tests + réduction de l'intervalle de scan à 6h. Le même bug ne peut plus passer.

## 2. 5 Whys avant d'écrire le fix

Avant d'écrire le fix, demander "pourquoi ?" au moins 3 fois.

Une personne n'est jamais la cause racine — chercher le problème de process, de monitoring ou de design en amont.

Exemple : "l'action ne s'est pas déclenchée" → pourquoi ? l'identifiant était cassé → pourquoi ? il était défini en deux endroits → pourquoi ? pas de source de vérité unique → fix = centraliser les identifiants.

## 3. Root cause one-liner (rappel — aussi dans CLAUDE.md inline)

```
Root cause: <cause systémique en une phrase>
```

Pas un post-mortem complet — juste la cause racine dans le message de commit. Coût zéro, trace permanente dans git.
