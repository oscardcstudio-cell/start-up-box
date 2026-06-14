# Critique

The first build lives in *correct* — the grid aligns, colors don't clash. *Crafted* is a different place. This protocol pulls correct toward crafted.

---

## Verb-Vocabulary (Choose One Mode Before Starting)

### Build / Shape
| Verb | What It Means |
|------|---------------|
| **craft** | Shape then build a feature end-to-end. Design → code in one pass. |
| **shape** | Plan UX/UI before writing code. Delivers a brief, not code. |
| **init** | Set up project context: PRODUCT.md, DESIGN.md, tokens, first steps. |
| **document** | Generate DESIGN.md from existing project code. |

### Evaluate
| Verb | What It Means |
|------|---------------|
| **critique** | Review only. Score 1–5 on six axes. Ranked punch-list. No edits. |
| **audit** | Technical quality checks: accessibility, performance, responsive. |

### Refine
| Verb | What It Means |
|------|---------------|
| **polish** | Final pass: alignment, spacing, interaction states, copy, against design system. |
| **bolder** | Amplify the direction. More contrast, stronger type, pushed accent. |
| **quieter** | Tone down. Reduce noise, increase restraint, let structure breathe. |
| **distill** | Strip to essence. Remove every element that isn't earning its place. |
| **harden** | Production-ready: error states, i18n, edge cases, accessibility. |
| **onboard** | Design first-run flows, empty states, activation paths. |
| **redesign** | New visual structure, same content and routes. Treat as new surface. |

### Enhance
| Verb | What It Means |
|------|---------------|
| **animate** | Add purposeful animation and motion where missing. |
| **colorize** | Add strategic color to monochromatic or flat UI. |
| **typeset** | Fix typography hierarchy, font choices, scale. |
| **layout** | Fix spacing, rhythm, visual hierarchy. |
| **delight** | Add personality and memorable micro-touches. |
| **overdrive** | Push past conventional limits — for when "bold" isn't enough. |

### Fix
| Verb | What It Means |
|------|---------------|
| **clarify** | Fix UX copy, labels, button text, error messages. |
| **adapt** | Adapt for different devices, screen sizes, dark mode. |
| **optimize** | Diagnose and fix UI performance (animation, layout, render). |

---

## Pre-Emit Self-Critique (6 Axes)

Score 1–5 on each axis. **Anything < 3 triggers a revision pass before shipping.** Record scores in CSS comment: `/* critique: P4 H3 E5 S3 R4 V4 */`

| Axis | Asks |
|------|------|
| **A Philosophy** | Is there a clear *why* — a position the page takes? Or just layout? Does it embody the Design Read, or did I state intent then default anyway? |
| **B Hierarchy** | One clear focal point per surface? Reader can tell in 2 seconds: primary, secondary, tertiary? Or everything equal weight (a parking lot)? |
| **C Execution** | Details in spec — rule weight, accent footprint, text-wrap, focus rings, contrast? Or sloppy despite right bones? Concentric radii, optical alignment, real interaction states? |
| **D Specificity** | Could this only exist for *this* brief? Or would it fit any client in the category? Looks like this brief, or generic "page for anyone"? |
| **E Restraint** | Every element removed that isn't earning its place? Decoration pretending to be design? Redundancy, padding-for-padding? |
| **F Variety** | Different skeleton from the last surface in this project? Different from what any AI would default to? Score by structural distance, not visual. |

---

## Four-Way Review Protocol

Look at the work four ways before calling it done:

### 1. Composition (Step Back)
- Does the layout breathe unevenly, or is it monotone (same card, same gap, same density)?
- Is there a focal point, or does everything compete?
- Is the macrostructure doing work, or is it invisible?

### 2. Craft (Move Pixel-Close)
- Mentally delete every border. Can you still read the hierarchy through surface/tone alone?
- Concentric radii: outer = inner + padding?
- Hit areas ≥ 40px on all interactive elements?
- 8 states on every interactive element, or just 2?

### 3. Content (Read as a User)
- Read every visible string as a real first-time visitor. Does it tell one coherent story?
- Any invented metrics, logos, or testimonials? If yes — real number, honest placeholder (`—`), or different layout.
- Does copy use banned filler ("elevate", "seamless", "next-gen", "revolutionize")?
- Does copy use banned em-dashes (`—`)? Zero allowed anywhere.

### 4. Structure (Open the CSS)
- Negative margins undoing padding?
- `calc()` workarounds?
- Absolute positioning to escape flow?
- The clean answer is always simpler than the hack.

---

## Last Question

*"If they said this lacks craft, what would they point to?"*

That thing you just thought of — fix it. Then ask again.

---

## Key Structural Slop (Immediate Reject)

If any of these are present, rework before scoring:

**Visual:**
- Inter/Roboto/Open Sans as display face
- Purple-to-blue/cyan gradient anywhere
- 3-equal-column card grid with icon-above-heading tiles
- `background-clip: text` gradient headline
- Hero `min-height: 100vh` with everything centered
- Pure `#000` or `#fff` as base color

**Motion:**
- `transition-all` or `transition: all`
- `hover:scale-105` across multiple unrelated elements
- Bounce/overshoot easings on UI state changes (buttons, modals)
- Animating `width`, `height`, `top`, `left`, `margin`, `padding`
- Focus ring that fades in (must appear instantly)
- Celebratory success toast for action user already sees

**Content:**
- Placeholder "Jane Doe/John Smith" or startup clichés (Acme, Nexus)
- Invented metrics with no source ("10× faster", "saves 5 hours/week")
- Re-drawn fake browser bar, phone frame, or IDE chrome in HTML/CSS

**Structure:**
- Same structural fingerprint as last output in this project
- Nav: wordmark-left + 4–5 text links + button-right + 1px hairline + white background (default AI nav)
- Footer: 4 columns (Product/Company/Resources/Legal) + social + copyright + grey
- Hero: eyebrow, title, lede, CTA all stacked centered (pick ≤ 2 centered)
- Decorative element with no semantic anchor

**Typography:**
- > 3 distinct `font-family` families (gate 39)
- Outlier face in > 2 slots (gate 40)
- Input `border-width` changes between states (must stay 1px always)

---

## Punch-List Format (for Critique Mode)

When delivering a critique:
1. State the six-axis scores with one-line justification each
2. List issues ranked by impact (visual quality → user trust → accessibility)
3. No edits — descriptions only with specific line/component references
4. End with: the one change that would most improve the score

---

## Verb-Mode Scope

| Mode | Scope | Output |
|------|-------|--------|
| critique | Read only | Scored assessment + punch-list |
| polish | Same visual language, same structure | Tightened code, all 8 states, spacing on scale |
| bolder | Visual language only | Bigger type, stronger accent, higher contrast |
| quieter | Visual language only | Reduced noise, more whitespace, muted palette |
| distill | Visual language + structure | Removal pass — everything that doesn't earn its place |
| redesign | New visual structure, same content/routes | Treat as greenfield for visuals |
