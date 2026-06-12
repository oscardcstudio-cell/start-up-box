# DOCUMENT_RECIPES.md — Fiches-recettes par livrable

La couche **manquante** entre le [`COMPANY_PLAYBOOK.md`](COMPANY_PLAYBOOK.md) (gamme au niveau *phase*) et les fichiers de la box (les *livrables*). Le playbook dit quel poste de travail, dans quel ordre. Ce fichier-ci donne la **fiche technique de chaque pièce** : quoi charger avant, faut-il chercher ou pas, le squelette du brief, les pièges connus, la gate de sortie.

> **But** : ne plus repartir de zéro à chaque document. On ouvre la fiche, on charge les intrants, on suit le protocole de recherche, on évite les pièges déjà documentés. Fini le « j'essaye → c'est nul → je relance une deep search → je crée un agent de plus en plus spécialisé ».

## Règle de déclenchement (non négociable)

**Avant de (re)produire un livrable de la box** — qu'on le crée ou qu'on l'itère :
1. Ouvrir sa fiche ci-dessous.
2. **Charger les intrants listés** (corpus-first) *avant* de briefer l'agent.
3. **Appliquer le protocole de recherche de la fiche** — ne jamais improviser une deep-research par réflexe.
4. Donner à l'agent le brief-clé + la liste des pièges connus.
5. Vérifier la gate de sortie avant de considérer le livrable « fait ».

## Taxonomie de recherche (le cœur du système)

La plupart des livrables d'une box sont **corpus-first** : la matière est déjà dans `company/`, pas sur le web. Le réflexe « deep search » coûte cher et redécouvre ce qu'on sait déjà. Quatre niveaux, du moins cher au plus cher :

| Niveau | Nom | Quand | Coût |
|---|---|---|---|
| **R0** | **Aucune** | Tout est dans `company/`. Réflexe deep-search = **STOP**. (manifesto, plateforme, guide édito, charte…) | 0 |
| **R1** | **Recharge** | La recherche existe déjà dans un fichier. On la **recharge**, on ne la refait pas. | ~0 |
| **R2** | **Web ciblé** | 2-3 requêtes précises pour vérifier un fait/chiffre/concurrent. Pas un fan-out. | faible |
| **R3** | **Deep-research** | Justifié quasi-uniquement en **validation marché (P1)**. Coûteux. **Sa sortie DOIT être capitalisée dans un fichier** → devient du R1 pour la suite. | élevé |

**Règle d'or recherche** : avant tout R3, vérifier qu'un R1 n'existe pas déjà (un fichier `strategie/` ou `brand/` couvre peut-être la question). Avant tout R2, vérifier que ce n'est pas du R0 déguisé (la réponse est dans le corpus).

> **Packages accélérateurs** (détail → `COMPANY_PLAYBOOK.md` § Packages) : `llm-scorer` (P1/P3/P4 — scorer variantes et hypothèses) · `preflight-checker` (P4/P5/P6 — gate avant exécution risquée) · `alert-router` (P5+/P6 — alertes seuils) · `doc-auditor` (∥ continu — santé des fichiers company/).

---

## Les 12 fiches

Une fiche par **archétype de livrable** (plusieurs fichiers proches partagent une recette). Champs : *Livrables · Phase · Pilote · Intrants · Recherche · Brief-clé · Pièges · Gate.*

### 1 — Hypothèses / cadrage
- **Livrables** : `strategie/hypotheses.md`
- **Phase** : P0
- **Pilote** : `meta-business` (méthodes : lean startup, jobs-to-be-done)
- **Intrants** : `brand/founder.md` (ébauche), `info.json`
- **Recherche** : **R0** — on formule des croyances à valider, on ne valide pas encore.
- **Brief-clé** : lister les croyances risquées (problème réel ? cible prête à payer ? canal ?), chacune formulée comme falsifiable + son signal de validation.
- **Pièges** : tomber amoureux de la solution avant le problème ; hypothèses non-falsifiables (« les gens aiment le design »).
- **Packages** : `llm-scorer` — soumettre les hypothèses à un rubric (falsifiabilité + signal minimal attendu) pour les trier objectivement.
- **Gate** : ≥1 hypothèse de problème écrite + une cible pressentie.

### 2 — Validation marché (cibles + concurrence)
- **Livrables** : `brand/cibles.md`, `brand/concurrence.md`
- **Phase** : P1
- **Pilote** : `meta-business` (+ `market-competitive`, skill `deep-research`)
- **Intrants** : `strategie/hypotheses.md`
- **Recherche** : **R3 légitime ICI** (le seul endroit où elle l'est franchement). La sortie brute se **capitalise** dans ces deux fichiers → tout réemploi ultérieur est du **R1** (on recharge `cibles.md`/`concurrence.md`, on ne re-scrape pas).
- **Brief-clé** : segments classés par douleur réelle + capacité/volonté de payer ; mapping concurrent par axe de valeur, pas par feature.
- **Pièges** : confondre « des gens disent que c'est cool » avec « des gens paieraient » ; budgets cibles irréalistes (*vécu SM : un budget annoncé « énorme » par la cible passé inaperçu en interne* — chiffrer côté payeur, pas côté vendeur).
- **Packages** : `llm-scorer` — scorer la qualité du signal collecté (déclencheur d'achat, diversité sources, spécificité) pour justifier le go/pivot.
- **Gate** : problème confirmé par signal externe réel. Sinon → pivot, on ne passe pas.

### 3 — Plateforme de marque
- **Livrables** : `brand/plateforme.md`
- **Phase** : P3 (marque minimale — la plateforme suffit pour tester l'offre en P4)
- **Pilote** : `meta-creation` + skill `design-director` (+ `meta-philosophe` pour cohérence des concepts)
- **Intrants** : `strategie/hypotheses.md` (validées), `brand/cibles.md`, `brand/founder.md`
- **Recherche** : **R0** — c'est de la synthèse interne (WHY/WHAT/HOW), pas du web.
- **Brief-clé** : WHY/WHAT/HOW + 3-5 valeurs + une phrase de positionnement opposable (qui exclut un concurrent).
- **Pièges** : positionnement consensuel qui ne dit non à personne ; valeurs interchangeables avec n'importe quelle boîte.
- **Packages** : `llm-scorer` — scorer les variantes de plateforme (distinctif, opposable, non-interchangeable) avant de valider la version finale.
- **Gate** : plateforme posée — **prérequis du guide éditorial (P3) et de l'identité complète (P5)**.

### 4 — Manifesto & fondations
- **Livrables** : `brand/manifesto.md` (+ tagline), `brand/fondations.md`
- **Phase** : P5 (identité complète — après validation de l'offre en P4)
- **Pilote** : `meta-redacteur` (briefé par `meta-creation`/`design-director`)
- **Intrants** : `brand/plateforme.md`, `brand/fondations.md`, `brand/guide_editorial.md`, `brand/cibles.md`, `brand/personas.md`
- **Recherche** : **R0** — un manifesto ne se cherche pas sur le web. Réflexe deep-search → STOP.
- **Brief-clé** : adresse au client en projet actif ; une tension + une promesse ; pas un pitch produit.
- **Pièges** *(vécu SM)* : zéro jargon secteur/administratif (la cible l'ignore) ; zéro chiffre en euros ; **le redacteur bannit les em-dash en consigne puis les sème dans sa sortie → vérifier** ; pas de majuscules d'emphase ; repasser le filtre anti-IA avant publication.
- **Gate** : passe `guide_editorial.md` + filtre anti-IA + validé par le fondateur.

### 5 — Guide éditorial / ton de voix
- **Livrables** : `brand/guide_editorial.md`
- **Phase** : P3 (tôt — il conditionne tout texte ultérieur, dont la landing de test P4)
- **Pilote** : `meta-redacteur`
- **Intrants** : `brand/plateforme.md`, `brand/cibles.md`
- **Recherche** : **R0**.
- **Brief-clé** : ton (3 adjectifs opposables), vocabulaire oui/non, interdits concrets, exemples avant/après.
- **Pièges** : guide trop abstrait (« soyez authentiques ») inapplicable ; pas d'exemples → inutilisable par les autres agents.
- **Gate** : posé **avant tout texte public** ; contient une liste d'interdits actionnable.

### 6 — Personas
- **Livrables** : `brand/personas.md`
- **Phase** : P5 (avec l'identité complète — ou ébauche plus tôt si besoin pour la landing P4)
- **Pilote** : `meta-business` ou `meta-creation`
- **Intrants** : `brand/cibles.md` (les personas en **dérivent**, ne les réinventent pas)
- **Recherche** : **R1** — recharger `cibles.md`. R2 seulement pour combler un trou factuel précis.
- **Brief-clé** : 2-4 portraits incarnés (situation, déclencheur, frein, vocabulaire propre) ancrés sur les segments de `cibles.md`.
- **Pièges** : personas déconnectés des cibles validées ; portraits décoratifs sans déclencheur d'achat.
- **Gate** : chaque persona traçable à un segment de `cibles.md`.

### 7 — Charte & direction artistique
- **Livrables** : `brand/charte.md`, `brand/direction_artistique.md`
- **Phase** : P5 (après validation de l'offre en P4 — on ne fige pas l'identité visuelle sur une offre non vendue)
- **Pilote** : `meta-creation` + skill `design-director`
- **Intrants** : `brand/plateforme.md`, `brand/manifesto.md`, `brand/guide_editorial.md`
- **Recherche** : **R0** (création) ou **R2** pour des références visuelles ciblées.
- **Brief-clé** : palette + typo + principes de composition qui **portent** le positionnement (pas décoratif) ; règles Figma de base (auto-layout, variables, min 16px).
- **Pièges** : faire le visuel avant la plateforme → décoratif ; palette générique au lieu des styles de librairie.
- **Gate** : charte posée — **prérequis de tout visuel public**.

### 8 — Business plan / prévisionnel
- **Livrables** : `strategie/business_plan.md`, `strategie/plan_financier.md`, `strategie/pitch_deck.md`, `strategie/subventions.md`
- **Phase** : P2
- **Pilote** : `meta-business`
- **Intrants** : `strategie/hypotheses.md`, `strategie/metrics.md`, `strategie/rapport-offre-pricing.md`, `brand/cibles.md`
- **Recherche** : **R1** (recharger pricing + metrics existants) + **R2** ciblé pour un chiffre de marché ou un dispositif d'aide précis. Pas de R3.
- **Brief-clé** : modèle éco chiffré (±20%), unit economics, roadmap ; pitch = structure narrative, pas un catalogue de features.
- **Pièges** : business plan sans aucun chiffre ; prévisionnel déconnecté du pricing réel.
- **Gate** : unit economics qui tiennent en hypothèse chiffrée + cohérence avec `metrics.md`.

### 9 — Offre & pricing
- **Livrables** : `strategie/rapport-offre-pricing.md`, `strategie/smoke-test-prix-runbook.md`, `strategie/wtp-*`
- **Phase** : P2 / P4
- **Pilote** : `meta-offre-pricing` (**s'interdit la deep-research par construction** — garde-fou coût)
- **Intrants** : `brand/cibles.md`, `strategie/hypotheses.md`, `strategie/metrics.md`
- **Recherche** : **R0/R1** imposé — l'agent travaille corpus-first (Van Westendorp, Gabor-Granger, smoke test). Aucune R3.
- **Brief-clé** : unité de vente, paliers, quoi gater (gratuit vs payant), modèle (freemium/one-shot/credits), méthode de prix sans data.
- **Pièges** : gater la mauvaise chose ; prix posé sans méthode ; *vécu SM : un palier critiqué comme « énorme » par la cible → tester, ne pas supposer*.
- **Packages** : `llm-scorer` — scorer les variantes de packaging / copy d'offre avant de sélectionner la version à tester en smoke-test.
- **Gate** : offre packagée testable (unité, prix, promesse) + une méthode de validation du prix.

### 10 — Metrics & distribution
- **Livrables** : `strategie/metrics.md`, `strategie/distribution.md`
- **Phase** : P2
- **Pilote** : `meta-business`
- **Intrants** : `strategie/hypotheses.md`, `strategie/business_plan.md`
- **Recherche** : **R0**.
- **Brief-clé** : une North Star Metric (pas une vanity) + anti-vanity explicites ; UN canal d'acquisition prioritaire creusé, pas cinq.
- **Pièges** : North Star qui est une vanity metric (vues, inscrits) ; viser 5 canaux → aucun creusé.
- **Gate** : North Star définie + 1 canal prioritaire choisi.

### 11 — Plan marketing & contenu
- **Livrables** : `marketing/plan_marketing.md`, `marketing/calendrier_editorial.md`, `marketing/copy-pack.md`, `marketing/email-sequences.md`
- **Phase** : P4 / P7
- **Pilote** : `meta-marketing` (plan/calendrier) + `meta-redacteur` (copy/emails)
- **Intrants** : `brand/guide_editorial.md` (**obligatoire avant tout texte**), `brand/plateforme.md`, `strategie/distribution.md`, `brand/personas.md`
- **Recherche** : **R1/R2** — recharger distribution + personas ; R2 pour un benchmark de canal précis.
- **Brief-clé** : objectifs par canal, piliers de contenu, rythme tenable solo ; copy qui passe le guide édito + filtre anti-IA.
- **Pièges** : calendrier ingérable en solo ; copy générique ignorant le guide édito.
- **Gate** : aligné `distribution.md` (1 canal North Star) + textes passent guide édito + anti-IA.

### 12 — Landing / funnel de conversion
- **Livrables** : `strategie/landing-*`, blueprints de page, funnel
- **Phase** : P4
- **Pilote** : `meta-ux-conversion` (conception) + `meta-redacteur` (copy) + `design-director` (exécution visuelle)
- **Intrants** : `brand/plateforme.md`, `brand/guide_editorial.md`, `brand/personas.md`, `strategie/rapport-offre-pricing.md`
- **Recherche** : **R0** (la conception s'appuie sur la recherche conversion vérifiée intégrée à `meta-ux-conversion` — 8 leviers validés, 14 mythes réfutés). R2 max pour un pattern précis. **Ne pas relancer une deep-research conversion : elle est dans l'agent.**
- **Brief-clé** : une promesse claire au-dessus de la ligne de flottaison, CTA contrastant, formulaire court, preuve ; chaîne d'agence stricte (briefer possède le corpus verbal, agents UI exécutent).
- **Pièges** : hero confus ; formulaire trop long ; *vécu SM : les agents UI improvisent le verbal si le briefer ne le leur fournit pas → le brief doit contenir le copy, pas juste « fais une landing »*.
- **Packages** : `preflight-checker` — vérifier que tous les assets sont en place (URL live, tracking pixel, CGU publiés) avant d'ouvrir le trafic.
- **Gate** : promesse limpide + CTA contrastant + form court + passe guide édito.

### ∥ Juridique (transverse)
- **Livrables** : `juridique/checklist_solo.md` (solo) ou `juridique/statuts.md` + `pacte_associes.md` (associés)
- **Pilote** : **un avocat startup spécialisé** (hors IA — aucun agent ne remplace un juriste sur statuts/RGPD/pacte).
- **Recherche** : **R2** ciblé (un dispositif/une obligation précise) — jamais sans vérification d'une source officielle (Légifrance, service-public.fr) ou d'un juriste.
- **Gate** : forme juridique avant le 1er euro ; RGPD + CGU avant toute collecte de données.

---

## Mise à jour des fiches (fiche vivante)

Une fiche morte ne sert à rien — c'est pour ça que le playbook seul ne suffisait pas. **Toute leçon apprise sur un livrable en session se déverse dans SA fiche**, section *Pièges* :
- un piège rencontré → l'ajouter à la fiche concernée, taggé `(vécu <projet>)` si spécifique, générique sinon ;
- une recherche R3 menée → noter dans la fiche **où la sortie a été capitalisée**, pour qu'elle devienne du R1 ;
- un agent/brief qui a mieux marché → mettre à jour le brief-clé.

C'est le verrou anti-redécouverte : la douleur d'une session devient l'épargne de la suivante.
