# ROADMAP — start-up-box

Décisions de conception et pistes d'évolution de la box, **versionnées** (donc lisibles depuis n'importe quelle machine et par tout contributeur).

> `BACKLOG.md` est local (gitignoré, alimenté par le widget notes-backlog) : notes de travail éphémères d'Oscar.
> Tout ce qui engage la conception de la box vient **ici**.

---

## Portage multi-runtime

### Gemini CLI — support d'un fondateur sans Claude Code

**État** : protocole écrit (2026-09-02), **non implémenté**. Détail complet → [`PROTOCOLE_GEMINI.md`](PROTOCOLE_GEMINI.md).

**Pourquoi** : la box exige aujourd'hui Claude Code + un abonnement payant. Gemini CLI est gratuit (1 000 requêtes/jour avec un compte Google) et a repris la même architecture — agents en md + frontmatter, `SKILL.md`, hooks avec le même payload, fichier de contexte hiérarchique avec imports.

**Décision structurante** : la conversion vit **dans le pipeline**, jamais dans les fichiers — une conversion posée à la main serait écrasée au prochain passage du gate hebdo. Une source commitée (Claude), une table de conversion, deux cibles générées.

**Trois décisions en attente** (cf. le protocole) : mode d'approbation (`auto_edit` recommandé), support officiel vs best-effort, et l'arbitrage du double-writer `meta-rules/` — à trancher en premier.

---

## Briques externes candidates

### `claude-seo` — brique SEO (Phase 7 Lancement, mobilisable Phase 4 GTM)

**Etat** : retenu comme candidat (2026-07-23), intégration non tranchée.
**Source** : https://github.com/AgricIDaniel/claude-seo — MIT, ~12.1k stars / 1.8k forks.

**Contenu** : 25 sub-skills (technique, E-E-A-T, Schema, AI search/GEO, local, e-commerce, international), 18 sub-agents, 32 commandes `/seo`, 8 extensions MCP optionnelles (DataForSEO, Firecrawl, Ahrefs, SE Ranking, Bing, Unlighthouse…). Fonctionne sans clé API ; les crédentials débloquent de la donnée enrichie.

**Usage visé** : audit + optimisation SEO du site de la startup au lancement, et SEO content en Phase 4.

**À trancher avant intégration :**

1. **Anti-vendoring** — ne pas copier le repo dans `plugins/`. Le consommer en dépendance externe pinnée sur un tag (clone depuis le prompt-installeur, ou plugin séparé installé à côté). Une copie = dette immédiate.
2. **Pas de runner standalone** — friction constatée sur `subvention_match` : glue code manuel à chaque itération. Le fondateur ne tapera jamais `/seo audit` ; il faut une entrée unique côté box, Claude enchaîne (règle « le fondateur ne tape jamais de commande »).
3. **Bruit dans le catalogue** — 18 agents + 25 skills injectés chez le fondateur noient les 9 agents de la box. Exposer un seul point d'entrée, garder les sous-agents internes.
4. **Extensions MCP tierces** — vérifier qu'aucune ne réclame une clé payante par défaut, et que leurs licences sont compatibles.
5. **Auto-update** — le hook `startup-box-update.js` ne pull que la box. Décider qui met à jour claude-seo et à quelle cadence (pin figé vs suivi de tag).
