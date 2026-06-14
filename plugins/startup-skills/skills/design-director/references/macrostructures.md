# Macrostructures

A macrostructure is a complete page-shape, not a knob. Pick one before writing code. The same content looks unrecognizably different across structures.

**Diversification rule (mandatory):** No two consecutive outputs in the same project share a macrostructure. Check CSS stamp before picking.

**CSS stamp:** `/* direction · macrostructure: <name> · genre: <genre> */`

**First-10 default:** When brief is vague, pick from the first ten — they cover ~80% of briefs.

---

## The 21 Named Macrostructures

1. **Bento Grid** — Modular blocks of varying sizes as irregular grid. Feature cards, quotes, images, stats. Visual rhythm from size variation.

2. **Long Document** — Memo/letter/journal. Continuous prose with inline section heads. Literature about the product.

3. **Marquee Hero** — Hero IS the page above fold. Single bold statement/visual fills viewport. No subhead or CTA in fold. Below fold becomes something else.

4. **Stat-Led** — Hero is a giant number (metric/count/percentage). Everything below supports or qualifies it.

5. **Workbench** — Product screenshots in frames are primary content. Guided tour of the app in use. Less copy, more demonstration.

6. **Conversational FAQ** — Bold questions, brief answers. Reads like an honest interview. Often collapsible accordions.

7. **Manifesto** — Polemical large type. Declaration energy. Tells reader what to believe before what to buy.

8. **Photographic** — Single huge image dominates each fold. Text is small annotation. *Look* before *read*.

9. **Quote-Led** — Hero is a pull-quote with attribution. Headline is borrowed credibility. Leads with social proof.

10. **Specimen** — Left-margin numbered labels, huge serif display, asymmetric column spans, hairline rules, typographic CTA, generous whitespace. Editorial/foundry energy. Opt-in only — never default.

11. **Catalogue** — Uniform grid of variations (typefaces, colors, SKUs). Page is a visual index of inventory.

12. **Letter** — First-person, written, intimate. Opens with greeting. No buttons in fold. Reads as personal founder note.

13. **Index-First** — Page IS a list of links. No hero image, no narrative flow. Pure navigation as design.

14. **Narrative Workflow** — Numbered stages (1.0 → 2.0 → 3.0 → 4.0). Story of how user uses product over time.

15. **Split Studio** — Diptych. Every major block divides screen (text left + proof right, alternates down page).

16. **Feature Stack** — Sticky left pane (label/description) + scroll-synced right pane (screenshots cycling). Cinematic pacing.

17. **Type Specimen** — Typeface IS the design. Foundry/design-system marketing where the custom typeface is brand's proof.

18. **Portfolio Grid** — Filterable cards of projects. Studio/designer homepages where work is the product.

19. **Map/Diagram** — Large spatial diagram organizes the page (flowchart, floor plan, network graph). Information laid out spatially.

20. **Ecosystem Index** — Multiple discovery surfaces (featured/latest/by category/by people). Value is emergence and browsing.

21. **Component Playground** — Interactive code-preview blocks are primary content. Each block previews a thing + shows copy-paste.

---

## Hero Polish Patterns (Optional Layer)

Hero macrostructures (Marquee Hero, Stat-Led, Quote-Led, Letter, Photographic) admit ONE optional polish pattern. Never two at once.

- **HP1 Vertical-rail** — Side decoration strip
- **HP2 Marquee-overflow** — Text/image bleeds past viewport edge
- **HP3 Cursor-spotlight** — Cursor-driven radial gradient interaction
- **HP4 Decorative-numeral** — Large numeral as structural accent

---

## Six Axes of Structural Variety

**Fingerprint = one choice per axis. 42,000+ possible fingerprints.**

### Axis 1: Section-Heading Placement

| Pattern | Notes |
|---------|-------|
| Hanging | Floating in negative space above section. Minimal modernist default. |
| Centered display | Symmetrical, formal. Apple products, Atelier genre. |
| Bottom-aligned | Heading anchors base of section, content above. Swiss editorial. |
| Left-margin | Eyebrow/number in narrow left column. Opt-in only. Never default for SaaS/consumer. |
| Overlapping image | Layered atop photography/color. Demands contrast. |
| Sticky/pinned | Remains visible while content scrolls beneath. |
| Inline with body | Heading emerges from paragraph flow. Essays, Medium. |

### Axis 2: Body Composition
Single column / Two-column asymmetric / Multi-column justified / Marginalia / Full-bleed with margin reset / Asymmetric spans

### Axis 3: Divider Language
Hairline rule / Ornament (fleuron) / Negative space only / Bleed-color block / Double rule

### Axis 4: Button Voice
Outlined / Unstyled link / Oversized solid / Typographic-only / Form-as-CTA

### Axis 5: Image Treatment
Full-bleed / Tightly cropped / Inline with text / Margin-aligned / None

### Axis 6: Reveal Pattern
Fade-up stagger / Horizontal sweep / Type-unmask / Number-tick / None

---

## Anti-Template Structural Tells (Reject These)

1. **SaaS hero:** Centred display + centred subhead + centred CTA pill + 100vh + fade-up
2. **3-feature row:** 3 equal columns of icon-above-heading-above-body
3. **Benefits-then-CTA:** Feature bullets + "Sign up" button block
4. **Everything-fades-in:** Every section gets scroll-triggered fade-up
5. **Carbon-copy footer:** Logo + 4 link columns + social + copyright

---

## Grid Rules

- **Prefer CSS Grid** for page layout, **Flexbox** for internals
- **Fluid grids:** `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`
- **Break the 3-equal-column default:** Vary widths with `grid-template-columns: 1.2fr 1fr 0.8fr`, use 12-column grid with varied spans, 4-up with 2-span hero
- **Bento:** Use CSS Grid with `grid-template-rows` and `grid-template-columns` explicitly — not auto-fit — to control the specific tile sizes

---

## Spacing Scale (4pt Base)

```css
:root {
  --space-3xs: 0.125rem;  /*  2px */
  --space-2xs: 0.25rem;   /*  4px */
  --space-xs:  0.5rem;    /*  8px */
  --space-sm:  0.75rem;   /* 12px */
  --space-md:  1rem;      /* 16px */
  --space-lg:  1.5rem;    /* 24px */
  --space-xl:  2.5rem;    /* 40px */
  --space-2xl: 4rem;      /* 64px */
  --space-3xl: 6rem;      /* 96px */
  --space-4xl: 9rem;      /* 144px */
}
```

Use `gap` for siblings, `margin` only for optical adjustments.
