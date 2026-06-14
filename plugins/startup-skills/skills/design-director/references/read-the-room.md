# Read the Room

## The Design Read

Before any code, state this one-liner out loud:

> *"Reading this as: [surface] for [audience], in a [vibe] language, leaning [aesthetic direction]."*

If you can't state this with specifics, stop and ask **one** question — the one where your read genuinely forks. Never a multi-question dump.

---

## The Three Dials

State dial values before proceeding. They gate every downstream decision.

### VARIANCE (1–10) — How much compositional surprise?

| Level | CSS Pattern | Feel |
|-------|-------------|------|
| 1–3 | 12-col symmetric grid, equal `fr` units, centered alignment | Institutional, formal, predictable |
| 4–7 | `margin-top: -2rem` overlaps, varied aspect ratios (4:3 next to 16:9), left-aligned heads over centered data | Designed, professional, alive |
| 8–10 | Masonry, `grid-template-columns: 2fr 1fr 1fr`, massive empty zones (`padding-left: 20vw`), collisions | Artful, editorial, singular |

**Mobile override:** Levels 4–10 collapse to strict single-column (`w-full`, `px-4`, `py-8`) at `< 768px`.

### MOTION (1–10) — How much animation?

| Level | Implementation | Feel |
|-------|----------------|------|
| 1–3 | CSS `:hover` and `:active` only. `prefers-reduced-motion` is the default mode | Static, calm, terminal-grade |
| 4–7 | `transition: property 0.3s cubic-bezier(0.16, 1, 0.3, 1)`. Load-in `animation-delay` cascades. `transform` and `opacity` only | Fluid, delight without theatre |
| 8–10 | Scroll-triggered reveals, parallax, `animation-timeline`. **NEVER `window.addEventListener('scroll')`** — hard ban | Cinematic, magazine-grade |

### DENSITY (1–10) — How much information per pixel?

| Level | Spacing | Feel |
|-------|---------|------|
| 1–3 | `py-32` to `py-48` gaps. Enormous whitespace | Art gallery, luxury |
| 4–7 | `py-16` to `py-24`. Standard web app spacing | Daily app, readable |
| 8–10 | Tight paddings, 1px line separators, `font-mono` on all numbers | Cockpit, analytics |

---

## Default Dial Values

| Register | VARIANCE | MOTION | DENSITY |
|----------|----------|--------|---------|
| Brand (landing, pitch, portfolio) | 8 | 6 | 4 |
| Product (app, dashboard, admin) | 4 | 3 | 6 |

**Override signals:**
- "minimalist / calm" → VARIANCE 5–6
- "playful / agency" → MOTION 7–8
- "trust-first / regulated / legal" → VARIANCE 3, MOTION 2
- "editorial / magazine" → VARIANCE 9, MOTION 4–5
- "cockpit / analytics" → DENSITY 9, MOTION 2
- "dark / atmospheric / AI" → VARIANCE 7, MOTION 6, DENSITY 5

---

## Signal → Dials Inference Table

| Brief Signal | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| SaaS / B2B / enterprise | 4 | 3 | 6 |
| Developer tool / CLI / API | 3 | 2 | 7 |
| Marketing / landing page | 7 | 5 | 4 |
| Portfolio / agency | 8 | 6 | 3 |
| Pitch deck / investor | 6 | 4 | 5 |
| Editorial / magazine | 9 | 4 | 4 |
| Dashboard / analytics | 3 | 2 | 9 |
| AI creative product | 7 | 6 | 5 |
| Consumer / app / onboarding | 5 | 5 | 5 |
| Luxury / fashion / beauty | 7 | 5 | 2 |
| Brutalist / concert / manifesto | 9 | 3 | 7 |
| Minimalist / Notion-like | 5 | 3 | 4 |

---

## Presets by Use-Case

### SaaS Marketing (Stripe-tier)
- **Dials:** 6 / 4 / 5
- **Vibe:** "cool confidence, nothing wasted"
- **Anchors:** Two-column hero, no centered everything, tight set display, one accent CTA

### Dev Tool / API Docs
- **Dials:** 3 / 2 / 7
- **Vibe:** "terminal calm, monospace authority"
- **Anchors:** Code blocks primary, 1px hairline dividers, monospace data labels

### Creative Agency / Portfolio
- **Dials:** 9 / 6 / 3
- **Vibe:** "directional, can't mistake it for anyone else"
- **Anchors:** Pick an extreme school, editorial flow, macrostructure first

### Pitch Deck / Investor
- **Dials:** 6 / 4 / 5
- **Vibe:** "confident, one idea per slide, credible"
- **Anchors:** Stat-led or Manifesto macrostructure, restraint, no decoration

### Dashboard / Analytics
- **Dials:** 3 / 2 / 9
- **Vibe:** "cockpit — everything visible, nothing wasted"
- **Anchors:** Dense layout, `tabular-nums` everywhere, color = signal not decoration

### Editorial / Long-Form
- **Dials:** 8 / 3 / 4
- **Vibe:** "newspaper texture, intentional rhythm, written for reading"
- **Anchors:** Asymmetric columns, hairline rules, italic body, pull quotes

### Consumer App / Onboarding
- **Dials:** 5 / 5 / 5
- **Vibe:** "approachable, soft, guides you through"
- **Anchors:** Soft shadows, rounded components, hover-lift on cards

---

## Physical Scene Test (for Theme and Palette)

Before choosing light vs dark, before picking a warm or cool palette — write **one sentence of physical scene**: who uses this, where, under what ambient light, in what mood.

If the sentence doesn't force the answer, it's not concrete enough. Add detail until it does.

> "A developer at 11pm, second monitor, reviewing a PR." → dark, cool, dense
> "A teacher between classes, phone, sunlight." → light, warm, spacious
> "A founder between investor meetings, MacBook, neutral office." → doesn't force yet — add more

If you can't write the sentence, ask the one question that unlocks it. Never choose light or dark "because that's the default" or "because tools look cool dark."

---

## Three Questions (Answer Before Any Code)

1. **Who is the actual human?** Not "users." The person, where they are, what's on their mind, what they did 5 minutes before.
2. **What must they accomplish?** The verb: *grade submissions / close a round / pick a plan / find the broken deploy*.
3. **What should it feel like?** In words that mean something: *warm like a worn notebook / cold like a terminal / dense like a trading floor / calm like a reading app*.
