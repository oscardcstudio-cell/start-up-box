# CLAUDE_BUG_DOCTRINE.md — Philosophie du bug (cross-projet)

> Chargement à la demande — ne pas @import dans CLAUDE.md.
> Consulter lors d'un bugfix non-trivial.

Doctrine issue de la culture post-mortem blameless (Google SRE, Netflix) + antifragilité (Taleb/Monperrus) :

## 1. Chaque bug immunise le projet

Après chaque correction de bug non-triviale, avant de clore le commit :
- Ajouter un check dans le script de health check du projet qui aurait détecté ce bug en prod
- Si le bug est statique (config, structure code) → ajouter un invariant dans la suite de tests
- Si le bug vient d'un intervalle de monitoring trop long → réduire cet intervalle

Le health check d'un projet grandit avec chaque incident. Un bug déjà vu ne peut pas passer inaperçu deux fois.

Exemple appliqué : bug tag_id=4/6 (un projet de trading, mai 2026) → ajout I1/I2/I3 dans test_critical_invariants.mjs + scan réduit à 6h.

## 2. 5 Whys avant d'écrire le fix

Avant d'écrire le fix, demander "pourquoi ?" au moins 3 fois.

Une personne n'est jamais la cause racine — chercher le problème de process, de monitoring ou de design en amont.

Exemple : "le bot n'a pas tradé" → pourquoi ? tag cassé → pourquoi ? tag_id défini en deux endroits → pourquoi ? pas de source de vérité unique → fix = centraliser les tag_ids.

## 3. Root cause one-liner (rappel — aussi dans CLAUDE.md inline)

```
Root cause: <cause systémique en une phrase>
```

Pas un post-mortem complet — juste la cause racine dans le message de commit. Coût zéro, trace permanente dans git.

## 4. Règle des 3 strikes — 3 fixes ratés = problème d'architecture

Si trois tentatives de fix sur le **même** bug échouent, **arrêter de patcher** : le problème n'est presque jamais le symptôme qu'on attaque, c'est l'architecture en amont. Au 3e échec, remonter d'un cran (le design, le contrat, la source de vérité unique) au lieu d'un 4e patch. Corollaire de méthode : **une hypothèse à la fois, un seul changement à la fois** — changer deux choses d'un coup rend le résultat illisible (on ne sait plus ce qui a agi). (Source : doctrine `systematic-debugging`, obra/superpowers.)

## 5. Échelle de décision avant d'écrire du code (anti-over-engineering)

Avant d'ajouter du code pour résoudre quoi que ce soit, descendre l'échelle et s'arrêter au **premier** rung qui marche :
1. **Ça doit vraiment exister ?** (le besoin est-il réel)
2. **La stdlib / le langage le fait déjà ?**
3. **La plateforme le fait nativement ?** (OS, framework, runtime)
4. **Une dépendance déjà installée le couvre ?**
5. **Un one-liner suffit ?**
6. **Seulement alors** : écrire le minimum.

Marquer une simplification délibérée par un commentaire `simplification:` indiquant son plafond et son chemin d'upgrade — ex. `// simplification: hardcodé, passer en config si > 3 cas`. Complète la règle d'or meta « vérifier l'existant avant de créer » côté **code**, pas seulement côté **outil**. (Source : échelle de décision ponytail.)
