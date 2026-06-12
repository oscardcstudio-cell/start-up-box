# company/ — Contexte entreprise pour Claude

Ce dossier centralise les infos de ton entreprise. Claude les charge automatiquement pour contextualiser toutes les demandes business, brand, rédaction, stratégie et juridique.

> **Format 2026** : optimisé solo founder + compatible cross-tool (CLAUDE.md + AGENTS.md). Si la boîte a des associés, garder `juridique/pacte_associes.md`. Si elle est solo, utiliser `juridique/checklist_solo.md` à la place.

## Structure complète

```
company/
│
├── COMPANY_PLAYBOOK.md           ← GAMME DE FABRICATION : les 8 phases + agent + gate (skill /build-company)
├── AGENTS.md                     ← Standard cross-tool (Codex, Cursor, Gemini, Claude)
├── CLAUDE.md                     ← Règles de chargement Claude
├── llms.txt                      ← Inventaire des fichiers pour LLM
├── info.json                     ← Infos légales : nom, SIRET, adresse, contacts, compta, avocat
├── team.json                     ← Équipe : fondateurs, salariés, freelances
│
├── brand/                        ← IDENTITÉ, ÉCRITURE & VISUEL
│   ├── plateforme.md             ← WHY/WHAT/HOW, valeurs, positionnement, bénéfices clients
│   ├── manifesto.md              ← Texte fondateur, tagline
│   ├── fondations.md             ← Origine du nom, mythe fondateur, ambition
│   ├── founder.md                ← Le fondateur comme marque (solo founder)
│   ├── guide_editorial.md        ← Ton, vocabulaire, interdits, formats par canal ← OBLIGATOIRE
│   ├── cibles.md                 ← Segments prioritaires avec besoins, freins, canaux
│   ├── concurrence.md            ← Mapping concurrentiel, positionnement, codes de catégorie
│   ├── personas.md               ← Portraits clients détaillés
│   ├── charte.md                 ← Couleurs, typographie, logo, règles d'usage
│   └── direction_artistique.md   ← Univers visuel, références, règles photo/vidéo
│
├── strategie/                    ← STRATÉGIE & FINANCE
│   ├── business_plan.md          ← Résumé exécutif, modèle éco, chiffres clés, roadmap
│   ├── pitch_deck.md             ← Structure narrative du pitch (9 slides)
│   ├── plan_financier.md         ← Prévisionnel 3 ans, BFR, hypothèses
│   ├── hypotheses.md             ← Croyances de base à valider (statuts, tests, deadlines)
│   ├── distribution.md           ← Canaux d'acquisition, North Star canal
│   ├── metrics.md                ← North Star Metric, inputs, runway, anti-vanity
│   └── subventions.md            ← Suivi des aides obtenues / en cours / à cibler
│
├── marketing/                    ← MARKETING & COM
│   ├── plan_marketing.md         ← Objectifs, canaux, campagnes, budget
│   └── calendrier_editorial.md   ← Piliers de contenu, rythme, dates clés
│
├── juridique/                    ← JURIDIQUE & GOUVERNANCE
│   ├── statuts.md                ← Résumé gouvernance, actionnariat, clauses importantes
│   ├── checklist_solo.md         ← Solo founder : forme juridique, RGPD, CGU, assurances
│   └── pacte_associes.md         ← Résumé pacte (uniquement si associés — sinon supprimer)
│
└── projets/                      ← PROJETS / PRODUITS EN COURS
    └── TEMPLATE_PROJET.md        ← Copier pour chaque projet / produit
```

## Par où commencer

**Priorité 1 — Claude utilise ces fichiers le plus souvent :**
1. `info.json` — infos légales de base
2. `team.json` — équipe
3. `brand/plateforme.md` — qui vous êtes et pourquoi
4. `brand/founder.md` — toi-comme-marque (si solo founder)
5. `brand/guide_editorial.md` — comment vous parlez

**Priorité 2 — pour les demandes stratégiques :**
6. `brand/cibles.md` — pour qui vous écrivez
7. `strategie/hypotheses.md` — ce qu'on suppose vs ce qu'on a validé
8. `strategie/metrics.md` — sur quoi on se juge
9. `strategie/business_plan.md` — contexte financier

**Priorité 3 — pour les demandes spécialisées :**
- `brand/charte.md` → quand vous travaillez sur des visuels
- `strategie/distribution.md` → quand vous discutez acquisition
- `strategie/subventions.md` → quand vous montez des dossiers
- `juridique/` → quand vous avez des questions de gouvernance

## Sécurité

Ce dossier est versionné dans git. **Ne jamais mettre de mots de passe, tokens ou clés API ici** — utilisez `.env` dans chaque projet. Pour le pacte d'associés et statuts complets, mettre uniquement un résumé (pas le document confidentiel).

## Pour produire la boîte (déroulé)

Le classeur ci-dessus stocke les livrables. Pour les **produire dans le bon ordre**, suivre [`COMPANY_PLAYBOOK.md`](COMPANY_PLAYBOOK.md) — 8 phases, un agent pilote et une gate de validation par phase. La skill **`/build-company`** orchestre ce déroulé (dire "par où commencer ?" ou `/build-company`).

## Pour créer une nouvelle boîte

Voir [`C:\dev\claude\NEW_COMPANY.md`](../NEW_COMPANY.md) — protocole d'init complet (clone du template + prompt d'audit à coller dans Claude).
