# COMPANY_PLAYBOOK.md — Gamme de fabrication d'une boîte

La **couche de pilotage** du dossier `company/`. Les autres fichiers sont le *classeur* (où vont les livrables) ; celui-ci est la *gamme* : dans quel ordre on produit, quel agent pilote chaque phase, quel fichier `company/` se remplit, et quelle **gate** valider avant de passer à la suite.

> Tu peux suivre ce déroulé **à la main** (lancer les agents toi-même dans l'ordre) ou laisser la skill **`/build-company`** le piloter phase par phase.
>
> **Granularité document** : ce playbook séquence les *phases*. Pour la fiche technique d'un *livrable précis* (quoi charger, faut-il chercher, brief-clé, pièges connus), voir [`DOCUMENT_RECIPES.md`](DOCUMENT_RECIPES.md) — la couche anti-redécouverte. Le playbook = la gamme ; les recettes = les fiches de pièces.

## Principe (non négociable)

- **L'IA séquence, exécute, propose. L'humain décide chaque gate (go/no-go).** Une simulation CMU 2026 (*TheAgentCompany*) montre que même le meilleur modèle échoue 76 % des tâches autonomes : l'IA baisse la barrière d'**exécution**, pas celle du **jugement**.
- **On ne saute pas une gate.** Phase N non validée = pas de phase N+1. La gate protège des livrables construits sur du sable (ex. un pitch deck avant qu'une hypothèse soit validée).
- **Valider qu'on PAIE, pas juste qu'on aime.** Un signal de *willingness-to-pay* réel (P4) précède le build (P6). Entre "c'est cool" et "voici ma carte bleue" il y a un gouffre de 10-50× — c'est là que meurent les solos.
- **La marque coûteuse vient APRÈS la validation de l'offre.** Plateforme + guide éditorial suffisent pour tester (P3) ; charte, DA et personas (P5) ne se posent qu'une fois qu'on sait ce qui convertit — sinon on refonde l'identité après coup.
- **Red-team avant build.** On cherche activement pourquoi l'idée est FAUSSE (P2) avant d'investir des semaines de code (P6).
- **Discovery/validation AVANT build** — consensus Lean Startup + YC + Founder's Playbook d'Anthropic.
- **Le juridique est transverse**, pas une étape finale : la forme se décide avant le 1er euro, le RGPD/CGU avant toute collecte de données.

## Les 8 phases (+ juridique transverse)

Chaque phase : **objectif** · agent **pilote** (+ renforts) · **livrables** `company/` · **gate** · piège fréquent.

> **Note solo founder** : à chaque gate à risque (P1, P2, P4), si la réponse est *non*, la vraie question n'est pas seulement "pivoter ?" mais **"ai-je le temps / le budget de pivoter avant ma deadline perso, ou est-ce un kill ?"** — décide-le explicitement, ne force pas une mauvaise hypothèse par fatigue.

### Phase 0 — Cadrage / idée
- **Objectif** : formuler le problème et la cible pressentie. Pas encore de solution.
- **Pilote** : `meta-business` · méthodes : lean startup, jobs-to-be-done
- **Pour démarrer** : avant tout document structuré, `meta-business` pose ces 3 questions au fondateur :
  1. Quel problème tu as toi-même vécu — concret, récurrent, douloureux ?
  2. Combien d'autres personnes dans ton entourage ont ce même problème ?
  3. Qu'est-ce qu'ils font aujourd'hui pour le contourner — et pourquoi c'est insuffisant ?
  Les réponses alimentent directement `strategie/hypotheses.md`. Si le fondateur ne sait pas répondre → c'est normal, c'est pour ça qu'on est en Phase 0.
- **Livrables** : `strategie/hypotheses.md` (croyances à valider), ébauche `brand/founder.md`
- **Gate** : problème formulé en une phrase + cible identifiée (qui souffre de ce problème).
- **Piège** : tomber amoureux de la solution avant le problème.

### Phase 1 — Validation / discovery
- **Objectif** : confirmer que le problème est réel et douloureux, par du signal externe (pas une opinion interne).
- **Pilote** : `meta-business` · renforts `market-competitive`, skill `deep-research`
- **Livrables** : `brand/cibles.md`, `brand/concurrence.md`, mise à jour `strategie/hypotheses.md` (validé / invalidé)
- **Gate** : problème confirmé par signal réel — concrètement : **≥ 5 entretiens cible où la douleur ressort *sans qu'on l'induise***, OU un fake-door / pré-inscriptions avec un taux qui dépasse le hasard. **Sinon : pivot ou kill** (cf. note solo founder).
- **Piège** : confondre "des gens disent que c'est cool" avec "des gens paieraient / agiraient" ; mener des entretiens orientés qui cherchent l'approbation (cf. The Mom Test).
- **Packages** : `llm-scorer` — scorer chaque hypothèse (falsifiabilité + force du signal) pour décider pivot vs persévérer objectivement.

### Phase 2 — Stratégie & business model
- **Objectif** : modèle économique cohérent + sur quoi on se juge — *et* avoir cherché par où ça casse.
- **Pilote** : `meta-business` + `meta-offre-pricing`
- **Livrables** : `strategie/business_plan.md`, `strategie/metrics.md` (North Star + anti-vanity), `strategie/distribution.md` (canal North Star)
- **Red-team (avant la gate)** : un passage adversarial obligatoire — challenger 5 dimensions : **taille de marché réelle, faisabilité des unit economics, founder-market-fit, risque concurrentiel, risque d'exécution**. Sortir 2-3 scénarios d'échec documentés, chacun avec une parade ou un signal d'alerte à surveiller. Peut être confié à un agent en posture "avocat du diable" sur le `business_plan.md`.
- **Gate** : unit economics qui tiennent (au moins en hypothèse chiffrée ±20 %) + North Star Metric définie + **red-team passé (2-3 modes d'échec documentés avec parade)**. Le marché est-il assez grand pour *ton* objectif de revenu (pas un seuil VC absolu — un objectif solo est légitime) ?
- **Piège** : un business plan sans aucun chiffre ; une North Star qui est une vanity metric ; sauter le red-team parce que "j'y crois".

### Phase 3 — Marque minimale (de quoi tester)
- **Objectif** : juste assez de marque pour écrire une landing et une offre cohérentes. **Pas** l'identité visuelle complète — on ne la fige pas sur une offre non validée.
- **Pilote** : `meta-business` (positionnement) + `meta-redacteur` (guide édito) · renfort léger `design-director`
- **Livrables** : `brand/plateforme.md` (WHY/WHAT/HOW, positionnement), `brand/guide_editorial.md` (ton, vocabulaire, interdits)
- **Gate** : `plateforme.md` + `guide_editorial.md` posés — de quoi produire un texte de test qui sonne juste. **Suffisant pour passer à P4.**
- **Piège** : faire la charte, la DA et les personas maintenant → 2-3 semaines de design polies sur une offre que personne n'a encore accepté de payer. C'est le placement de P5.
- **Packages** : `llm-scorer` — scorer les variantes de plateforme (distinctif vs interchangeable, opposable vs consensuel).

### Phase 4 — Offre & go-to-market (+ validation willingness-to-pay)
- **Objectif** : une offre packagée + un canal accessible, **testés avec un signal de paiement réel** — pas seulement "testables".
- **Pilote** : `meta-offre-pricing` (packaging, paliers, prix) + `meta-marketing` (plan, calendrier) · renfort `meta-ux-conversion` (landing / funnel)
- **Livrables** : `marketing/plan_marketing.md`, `marketing/calendrier_editorial.md` + **une landing de test réellement en ligne**
- **Gate (durcie — c'est LA gate qui protège le build)** :
  1. **Canal prioritaire avec accès réel** : pas juste "ProductHunt" en l'air, mais une tactique avec amorce concrète (liste email 100+, partenaire prêt à booster, mentor PH engagé, budget pub défini). Sans accès → changer de canal.
  2. **Signal de willingness-to-pay observé** : landing en ligne + au moins un de — fake-door checkout > ~5 % de clics, pré-commandes/LOI payées, waitlist 100+ dont ≥10 % qui confirment "je paierais à ce prix". **Testée, pas testable.**
  - Pas de signal → **pivot offre / prix / promesse AVANT de builder**. On ne code rien sur une offre que personne n'achète.
- **Piège** : "on a décidé qu'on build" n'est pas une validation ; viser 5 canaux à la fois → aucun creusé.
- **Packages** : `llm-scorer` (scorer variantes copy/offre) · `preflight-checker` (assets + env vars avant d'ouvrir le paywall de test).

### Phase 5 — Identité de marque complète
- **Objectif** : maintenant qu'on sait ce qui convertit (P4), bâtir l'identité durable — en cohérence avec ce qui a marché, pas avec une hypothèse.
- **Pilote** : `meta-creation` + skill `design-director` · renforts `meta-redacteur` (manifesto), `meta-philosophe` (cohérence des concepts/citations)
- **Livrables** : `brand/manifesto.md`, `brand/fondations.md`, `brand/charte.md`, `brand/direction_artistique.md`, `brand/personas.md`
- **Gate** : `charte.md` + `direction_artistique.md` posés — **obligatoires avant tout visuel public**, et cohérents avec la promesse/le ton qui ont converti en P4.
- **Piège** : faire du visuel décoratif déconnecté du positionnement ; ou regretter d'avoir figé l'identité trop tôt (placement en P5 = précisément ce qu'on évite).
- **Packages** : `llm-scorer` — scorer les variantes d'identité (cohérence avec la plateforme et le signal P4).

### Phase 6 — Build / MVP *(si produit tech)*
- **Objectif** : le produit minimal qui exerce réellement l'hypothèse de valeur.
- **Pilote** : **GSD** (`gsd:new-project` → roadmap → `gsd:plan-phase` → `gsd:execute-phase`) · renfort `meta-ui-ux` pour les interfaces internes
- **Onboarding infra — prise par la main (AVANT d'écrire du code, si produit tech/web)** : le fondateur ne configure rien seul. Pour **chaque** outil de la stack, Claude : (1) explique en une phrase à quoi ça sert, (2) donne l'URL exacte, (3) dit ce que le fondateur fait lui-même (créer le compte, autoriser, copier une clé) vs ce que Claude fait en CLI. **Une étape à la fois, on attend la confirmation.** Ne présenter QUE les outils pertinents pour la stack décidée (détectée depuis `projets/TEMPLATE_PROJET.md` / la roadmap GSD).

  | Outil | À quoi ça sert | URL | Le fondateur fait | Claude fait |
  |---|---|---|---|---|
  | **Node.js** *(si app JS/web, et requis par GSD/Railway)* | Exécuter le code en local + faire tourner les CLI | https://nodejs.org (LTS) | Installe + rouvre le terminal | `node --version` (vérif) |
  | **GSD** *(moteur de build piloté par phases — requis pour cette phase)* | Séquencer le code en roadmap/phases (`gsd:new-project`…) | https://github.com/glittercowboy/get-shit-done | Rien | **Détecte si GSD est absent** (pas de commande `gsd:` / pas de `.claude/get-shit-done`) → installe pour le fondateur : `npx get-shit-done-cc --global`, puis redémarre la session si demandé. GSD se met à jour seul via `gsd:update` |
  | **GitHub + gh CLI** | Sauvegarder/versionner le code, socle du déploiement | gh : https://cli.github.com · compte : https://github.com/signup | Crée le compte GitHub si absent | Installe `gh`, lance `gh auth login` (flow navigateur, Claude guide le clic), `gh repo create <nom> --private --source=. --push`. Token dans le credential store — **jamais** dans une URL git |
  | **Clé API IA** *(si le produit appelle un LLM)* | Faire tourner l'IA du produit | Anthropic : https://console.anthropic.com/settings/keys · OpenRouter : https://openrouter.ai/keys | Crée la clé, la copie | La range dans `.env` (déjà gitignoré), confirme par un appel test |
  | **Railway** *(si déploiement web)* | Héberger l'app en ligne | https://railway.app · docs CLI : https://docs.railway.com/cli | Crée le compte (login via GitHub possible) | `npm i -g @railway/cli`, `railway login` (guide le code de pairing), `railway init`, reporte les vars du `.env`, `railway up` → donne l'URL publique |

  > **GSD n'est pas bundlé** (package npm tiers `get-shit-done-cc`, sous son propre canal de MAJ) : on l'installe, on ne le copie pas. Si l'install GSD échoue (offline/npm absent), le dire et proposer de continuer le build sans le séquençage GSD plutôt que de bloquer.

- **Livrables** : le repo applicatif (voir [`NEW_PROJECT.md`](../NEW_PROJECT.md)) + `projets/TEMPLATE_PROJET.md` rempli
- **Gate** : MVP qui permet de mesurer l'hypothèse (pas "feature-complete", "hypothèse-testable"). Gate infra : `git push` GitHub OK + (si web) URL Railway live qui répond.
- **Piège** : sur-construire avant le premier utilisateur. GSD gère le séquençage code, pas ce playbook. Côté infra : ne **jamais** mettre un token dans une URL git (credential store only), ne jamais commiter `.env`. Sur Windows, lancer `gh`/`railway` depuis le terminal de Claude Code.
- **Packages** : `preflight-checker` (gate avant déploiement : env vars, fichiers requis, schema valide) · `alert-router` (alertes coût LLM / erreurs dès le 1er run).

### Phase 7 — Lancement
- **Objectif** : mise en marché + boucle de mesure active.
- **Pilote** : `meta-marketing` + `meta-redacteur` (copy de lancement) · renforts `meta-creation` (assets), skill `autoresearch` (optimisation landing/copy)
- **Livrables** : campagne, dossier presse, posts, séquences email
- **Gate** : tracking des metrics en place (on saura si le launch marche) + RGPD/CGU OK (voir juridique).
- **Piège** : lancer sans instrumentation → aucun apprentissage, juste du bruit.
- **Packages** : `preflight-checker` (tracking + RGPD/CGU en place avant mise en ligne) · `alert-router` (alertes trafic, seuils d'erreur post-lancement → Slack/email).

### ∥ Juridique — transverse (pas une phase finale)
- **Objectif** : structure légale propre, au bon moment.
- **Pilote** : **un avocat startup spécialisé** — statuts, RGPD/CGU, pacte d'associés. Aucun agent IA ne remplace un juriste sur ces points. Ressource de départ : [The Galion Project](https://thegalionproject.com/), réseau local d'accélérateurs, ou une permanence juridique CCI.
- **Livrables** : `juridique/checklist_solo.md` (solo) ou `juridique/statuts.md` + `juridique/pacte_associes.md` (associés), `info.json`
- **Gates échelonnées** : forme juridique choisie **avant d'encaisser le 1er euro** · RGPD + CGU **avant toute collecte de données utilisateurs** (donc avant ou pendant Phase 6/7).
- **Piège** : repousser le juridique "à plus tard" et encaisser ou collecter de la data sans cadre.

## Guide d'invocation (question → agent)

Quel agent appeler selon ce que tu veux faire — utilisable hors déroulé, en one-shot.

| Tu veux… | Agent / skill | Phase de rattachement |
|---|---|---|
| Cadrer une idée, lister les hypothèses | `meta-business` | 0 |
| Étudier la concurrence, valider un besoin | `meta-business` + `market-competitive` + `deep-research` | 1 |
| Red-team / avocat du diable sur le business plan | `meta-business` (posture adversariale) | 2 |
| Business plan, pitch deck, prévisionnel, subvention | `meta-business` | 2 |
| Structurer l'offre, fixer un prix, choisir freemium/credits | `meta-offre-pricing` | 2 / 4 |
| Définir North Star, KPIs, canal d'acquisition | `meta-business` (metrics) | 2 |
| Plateforme de marque, positionnement | `meta-business` + `design-director` | 3 |
| Guide éditorial, ton de voix | `meta-redacteur` | 3 |
| Concevoir une landing / un funnel / une page pricing | `meta-ux-conversion` | 4 |
| Plan marketing, calendrier éditorial, campagne | `meta-marketing` | 4 / 7 |
| Manifesto, fondations, charte, direction artistique, personas | `meta-creation` + `design-director` | 5 |
| Valider une citation / un concept philo | `meta-philosophe` | 5 |
| Rédiger copy, emails, posts, taglines | `meta-redacteur` | 4 / 7 |
| Construire le produit (code) | **GSD** (`gsd:new-project`) | 6 |
| Dashboard / interface interne | `meta-ui-ux` | 6 |
| Gamifier un produit / une landing | `meta-gamification` | 4 / 7 |
| Optimiser une page de conversion (variantes scorées) | skill `autoresearch` | 7 |
| Forme juridique, statuts, RGPD, CGU, pacte | **Avocat startup spécialisé** (hors IA — voir section ∥ Juridique) | ∥ transverse |

## Mapping outils Claude (Founder's Playbook d'Anthropic)

Repère officiel du bon outil selon le stade :

| Stade | Outil Claude | Usage |
|---|---|---|
| Idea (P0-2) | **Claude Chat** | research, problem mapping, interviews |
| MVP (P6) | **Claude Code** | code, specs, debug, multi-agent |
| Launch (P7) | **Claude Cowork** | ops, workflows, knowledge partagé |
| Scale | **Platform API / Managed Agents** | agents long-running, orchestration autonome |

## Checklist de gates (résumé go/no-go)

- [ ] **P0** — hypothèse problème + cible écrites
- [ ] **P1** — problème confirmé par signal externe réel (≥5 entretiens / fake-door) — sinon pivot ou kill
- [ ] **P2** — unit economics tiennent + North Star définie + **red-team passé** (modes d'échec + parade)
- [ ] **P3** — `plateforme.md` + `guide_editorial.md` posés (marque minimale, de quoi tester)
- [ ] **P4** — canal **accessible** + offre **testée avec signal de paiement réel** (sinon pivot offre/prix/promesse)
- [ ] **P5** — `charte.md` + `direction_artistique.md` posés, cohérents avec ce qui a converti en P4
- [ ] **P6** — MVP qui mesure l'hypothèse de valeur
- [ ] **P7** — tracking en place + RGPD/CGU OK
- [ ] **∥** — forme juridique avant 1er euro ; RGPD/CGU avant collecte data

## Packages d'infrastructure (par phase)

Modules cross-projets (`C:\dev\claude\packages\`) à invoquer aux moments indiqués.

| Package | Phases | Usage |
|---|---|---|
| `doc-auditor` | ∥ continu | Audit santé fichiers `company/` (CLAUDE.md > 200 lignes, liens cassés, fichiers manquants) |
| `llm-scorer` | P1, P2, P3, P4, P5 | Scorer hypothèses, modes d'échec, plateforme, variantes copy/offre, identité — rubric + grade lettre |
| `preflight-checker` | P4, P6, P7 | Gate avant opération risquée : fichiers, env vars, conditions custom — exit 1 si fail |
| `alert-router` | P6+, P7 | Dispatch alertes seuils post-MVP (coût LLM, erreurs, trafic) → Slack / email / fichier |

Installation locale : `npm i file:../../packages/<name>`. CLI direct : `node packages/<name>/src/cli.mjs`.
