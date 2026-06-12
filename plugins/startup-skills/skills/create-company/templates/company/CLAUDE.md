# Contexte entreprise — company/

Quand ce dossier est présent, charger ses fichiers pour tout contexte business ou brand.

> **Ordre de production** : ce fichier dit l'ordre de *lecture*. Pour l'ordre de *fabrication* de la boîte (quelle phase, quel agent, quelle gate), voir [`COMPANY_PLAYBOOK.md`](COMPANY_PLAYBOOK.md) — orchestré par la skill `/build-company`. Si le fondateur demande "par où commencer" ou "prochaine étape", router vers le playbook.
>
> **Avant de (re)produire un livrable** (manifesto, cibles, charte, pricing, landing…) : ouvrir d'abord sa **fiche-recette** dans [`DOCUMENT_RECIPES.md`](DOCUMENT_RECIPES.md) — elle dit quoi charger en intrant, **s'il faut chercher ou pas** (taxonomie R0-R3), le brief-clé et les pièges déjà connus. Ne jamais improviser une deep-research par réflexe : la plupart des livrables sont corpus-first (R0/R1).

## Priorité de chargement

1. `info.json` + `team.json` — qui vous êtes, votre équipe, vos contacts clés
2. `brand/plateforme.md` — WHY/WHAT/HOW, valeurs, positionnement
3. `brand/founder.md` — fondateur-comme-marque (si solo founder)
4. `brand/guide_editorial.md` — OBLIGATOIRE avant tout texte écrit au nom de l'entreprise
5. `strategie/hypotheses.md` + `strategie/metrics.md` — avant toute décision stratégique
6. Autres fichiers selon le contexte de la demande

## Règles non-négociables

- **Avant tout texte** au nom de l'entreprise (post, email, pitch, légende) → charger `brand/guide_editorial.md`. Pas de texte sans.
- **Avant tout visuel / charte** → charger `brand/charte.md` + `brand/direction_artistique.md`.
- **Avant toute décision stratégique** → charger `strategie/hypotheses.md` + `strategie/metrics.md`. Proposer 2-3 options, jamais une seule.
- **Avant toute demande juridique** → charger `juridique/statuts.md` + (`checklist_solo.md` si solo OU `pacte_associes.md` si associés).

## Fichiers par domaine

- Identité fondateur → `brand/founder.md` (solo) ou `team.json` (associés)
- Stratégie / finance / subventions → `strategie/`
- Acquisition / growth → `strategie/distribution.md`
- KPIs / tableau de bord → `strategie/metrics.md`
- Marketing / com / calendrier → `marketing/`
- Juridique / gouvernance → `juridique/`
- Projets en cours → `projets/`
- Visuel / DA / charte → `brand/charte.md`, `brand/direction_artistique.md`

## Compatibilité cross-tool

`AGENTS.md` pointe vers ce CLAUDE.md pour Codex, Cursor, Gemini CLI, Copilot CLI.
