# Anti-Slop Gates

60 gates + pre-emit self-critique. Run before every emit. Record pass/fail in CSS comment: `/* gates: pass 58/60 · fail: 7 33 */`

---

## Pre-Emit Self-Critique (6 Axes — Run First)

Score 1–5. **Anything < 3 triggers revision before the gate sweep.**

| Axis | Question |
|------|----------|
| **A Philosophy** | Clear *why* — a position? Or just layout? |
| **B Hierarchy** | Primary, secondary, tertiary visible in 2 seconds? Or parking lot? |
| **C Execution** | Rule weight, accent footprint, text-wrap, focus rings, contrast — in spec? |
| **D Specificity** | Looks like THIS brief or generic "page for anyone"? |
| **E Restraint** | Everything removed that isn't earning its place? |
| **F Variety** | Different skeleton from previous output in this project? |

---

## Visual Gates (1–8)

1. Display font is Inter, Roboto, Open Sans, Poppins, Lato, or system default? **FAIL**
2. Purple-to-blue/-cyan-to-magenta gradient anywhere? **FAIL** *(Atmospheric: radial blooms on background only — permitted)*
3. 3-equal-column card grid with icon-above-heading tiles? **FAIL**
4. Card nested inside another card? **FAIL**
5. `background-clip: text` gradient headline? **FAIL** *(Universal — no genre permits)*
6. Card using thick colored left/right side-stripe border? **FAIL**
7. Hero `min-height: 100vh` with everything centered? **FAIL** *(Atmospheric/Playful: centered heroes OK when canvas is design)*
8. Pure `#000` or pure `#fff` as base color? **FAIL** *(Modern-Minimal: pure `#fff` paper permitted)*

---

## Structural Gates (9–10)

9. Page uses same structural fingerprint as last output in this project? **FAIL** — Hero → 3 features → CTA → footer is AI template; reject.
10. Sections separated only by equal whitespace — no rule, no ornament, no color shift? **FAIL** — Every section identical rhythm = no one decided.

---

## Microinteraction Gates (11–20)

11. `transition-all` or `transition: all` used? **FAIL** — Specify properties.
12. `hover:scale-105` across multiple unrelated elements? **FAIL**
13. Bounce/overshoot easings (`cubic-bezier(0.34, 1.56, ...)`) on UI state changes? **FAIL** — Reserve for physical interactions only.
14. Element with > 1 hover effect at same time (translate + scale + shadow + color + rotate)? **FAIL**
15. Animating `width`, `height`, `top`, `left`, `margin`, `padding`? **FAIL**
16. Focus ring transitions into existence (fade in)? **FAIL** — Focus rings appear instantly.
17. Celebratory success toast for action user already sees the result of? **FAIL** — Silent success is taste.
18. Tooltip hover-delay ≠ focus-delay? **FAIL** — Hover 800–1000ms, focus 0ms.
19. Auto-rotating content (carousel, banner, stats) lacks pause-on-hover-and-focus? **FAIL** (WCAG 2.2.2)
20. Placeholder name "Jane Doe/John Smith" or startup cliché (Acme, Nexus, Seamless)? **FAIL**

---

## Variety Gates (21–23)

21. `/* direction · macrostructure: <name> · genre: <genre> */` stamp missing from CSS top? **FAIL**
22. Macrostructure picked = previous output's stamp in this project? **FAIL**
23. Defaulted to Specimen macrostructure when brief didn't call for editorial/foundry/specimen? **FAIL** *(Atmospheric/modern-minimal/playful never default to Specimen)*

---

## Implementation Gates (24–35)

24. Neutral/surface color has `oklch(... 0 ...)` (zero chroma)? **FAIL** — Min 0.005 chroma. *(Modern-minimal: zero-chroma permitted)*
25. Accent covers > ~5% of any single viewport? **FAIL** *(Atmospheric: up to ~20% accent-tinted radial blooms permitted)*
26. Padding/gap/margin not on spacing scale (multiples of 4px: 2/4/8/12/16/24/40/64/96/144px)? **FAIL**
27. Prose container `max-width` outside 45–75ch range? **FAIL**
28. Interactive element lacks `:focus-visible`, `:active`, OR `:disabled` styling? **FAIL** — 8 states required.
29. `transform`/animation keyframe NOT covered by `@media (prefers-reduced-motion: reduce)` fallback? **FAIL**
30. Demo video: autoplay with sound, lacks `poster`, lacks `fetchpriority="high"`, or `loading="lazy"` on LCP element? **FAIL**
31. Abstract background > 1 accent color, > ~5% footprint, or animating mesh-gradient? **FAIL** *(Atmospheric: 2 warm radial blooms, ~20–30% total, fixed-attached, no animation)*
32. Page mixes 2+ icon libraries? **FAIL**
33. Defaulted to Lottie when hand-built SVG or CSS would work? **FAIL** — Lottie is last resort.
34. Same archetype as previous Hallmark output without varying at least one knob? **FAIL**
35. Visual-only `<svg>`, custom-art `<div>`, or decorative figure lacks `aria-label` or `aria-hidden="true"`? **FAIL**

---

## Layout-Safety Gates (36–38)

36. Page horizontally scrolls on any viewport 320–1920px? **FAIL** — Fix: `html, body { overflow-x: clip; }`.
37. Decorative text effect (highlighter band, stroke, underline) — visually verify position. Highlighter sits at x-height (~38%), not baseline. Underlines 1–2px, offset 1–2px from baseline.
38. Interactive bars (nav, toolbar, CTA row) not explicitly vertically centered? **FAIL** — Default flex `align-items: stretch` breaks rhythm.

---

## Typography Discipline Gates (39–40)

39. Page uses > 3 distinct `font-family` families? **FAIL** — Ceiling: display + body + 1 outlier.
40. Outlier face used in > 2 slots? **FAIL** — Wordmark + hero stat only.

---

## Input-State Gates (41–45)

41. Input/textarea/select changes `border-width` between states? **FAIL** — Border always 1px; changes go to background, outline, box-shadow.
42. Input focus ring uses `border` instead of `outline`? **FAIL** — Must be `outline: 2px solid var(--color-focus)` with `outline-offset: 1px`.
43. Input height ≠ adjacent button height? **FAIL** — Shared base height (44px floor).
44. Helper-text container collapses when empty? **FAIL** — Reserve `min-height: 1lh`.
45. Disabled input signaled by ONLY `opacity: 0.5`? **FAIL** — Need three: opacity 0.55 + `cursor: not-allowed` + `aria-disabled`.

---

## Contrast & Readability Gates (46–50)

46. Body text contrast < 4.5:1 against background? **FAIL** — APCA Lc ≥ 60.
47. Large text (≥ 24px regular or ≥ 18px bold), icon, or focus ring contrast < 3:1? **FAIL** — APCA Lc ≥ 45.
48. Button: `color` ≈ `background-color` (within 5% lightness AND 0.05 chroma in OKLCH)? **FAIL**
49. Accent fill used without `--color-accent-ink` defined and applied for text? **FAIL**
50. Dark section (OKLCH L < 50%) carrying default ink-colored text? **FAIL** — Swap text color.

---

## Nav / Footer / Hero Structural Slop (51–55)

51. **Nav fingerprint:** Wordmark-left + 4–5 text links + button-right at full width + 1px hairline + white background? **FAIL** unless brief explicitly justifies.
52. **Footer fingerprint:** 4 columns (Product/Company/Resources/Legal) + social + copyright + hairline + grey? **FAIL** unless genuine docs hub.
53. **Hero centered-everything:** Eyebrow, title, lede, CTA all stacked centered? **AUTO-FAIL** — Pick ≤ 2 centered; break alignment for others.
54. **Hero padding asymmetry:** `padding-block-end` < `padding-block-start`? **FAIL** — Bottom must be heavier (≥ 1.3×).
55. **Decorative-without-purpose:** Decorative element with no semantic anchor? **FAIL** — Decoration must be motivated.

---

## Honest Copy Gate (56)

56. **Invented metric:** Quantitative claim ("10× faster", "saves 5 hours/week") with no source? **FAIL**

---

## Re-drawn UI Chrome Gate (57)

57. **Re-drawn chrome:** Hand-built fake browser bar, phone frame, code-block frame, terminal, or IDE chrome in HTML/CSS/SVG? **FAIL** — Use real screenshot or omit.

---

## Token Discipline Gate (58)

58. **Mid-render token improvisation:** Color value or `font-family` introduced outside design tokens in `:root`/`[data-theme]`? **FAIL**

---

## Responsive / Clickable Affordances Gates (59–60)

59. **Two-line clickable text:** Button label, nav link, footer link, tab label wraps to 2+ lines at any viewport 320–1920px? **FAIL**
60. **Emoji-as-feature-icon:** Feature card, value prop, step number carries emoji (✨ 🚀 ⚡ 🔥 🎯 ✅)? **FAIL**

---

## Additional Responsive Gates (From Implementation)

| Gate | Check |
|------|-------|
| 61 | Image-bearing grid tracks use `minmax(0, 1fr)`, not bare `1fr` |
| 62 | Root carries `overflow-x: clip` on both `html` and `body` |
| 63 | Display headers wrap inside long words: `overflow-wrap: anywhere; min-width: 0` |
| 64 | Section heads collapse to 1 column at mobile across every theme |
| 65 | No scroll-jump on radio-tab clicks |

---

## Production Gates (Impeccable / ibelick — 66+)

### Layout & Viewport (66–68)

66. **`h-screen` / `min-h-screen` / `height: 100vh`:** **FAIL** — use `min-h-dvh` (dynamic viewport height). `vh` triggers catastrophic layout jump on iOS Safari when browser chrome appears/disappears.
67. **Fixed elements missing `safe-area-inset`:** Fixed bars, navs, drawers lack `env(safe-area-inset-bottom/left/right)` padding? **FAIL** on iOS notch/home-bar devices.
68. **Overflow-clipped dropdown:** Dropdown rendered with `position: absolute` inside `overflow: hidden` / `overflow: auto` container will clip. **FAIL** — use `<dialog>` / popover API / `position: fixed` / portal.

### Visual Anti-Patterns (69–76)

69. **Ghost-card (Codex tell):** `border: 1px solid X` + `box-shadow` with blur ≥ 16px on the same element? **FAIL** — pick one. Border OR shadow. Never both as decoration.
69b. **Glassmorphism / decorative blur:** `backdrop-filter: blur()` on non-overlay surfaces, frosted glass panels, or blur used as atmosphere/depth? **FAIL** — depth comes from surface contrast, hairlines, and tinted elevation. Blur is reserved for modal backdrops and functional overlays only.
69c. **`<pre>` for non-code content in editorial documents:** A gray-background monospace box used for a hierarchy, flow diagram, data structure, or any non-code content? **FAIL** — it imports "code snippet" aesthetics into the editorial voice and breaks register completely. Every `<pre>` block must be reconsidered: hierarchies → styled flow components, data → tables, sequences → numbered lists, diagrams → designed layout. The only valid use is actual code.
70. **Over-rounding (Codex tell):** `border-radius ≥ 32px` on cards, sections, or inputs? **FAIL** — cards cap at 12–16px. Full pill (`9999px`) is only for tags and buttons.
71. **Sketchy/hand-drawn SVG:** `feTurbulence`, `feDisplacementMap`, crude path scenes meant to depict something tangible (animals, objects, scenes)? **FAIL** — ship no illustration rather than sketchy SVG fallback.
72. **Stripe/diagonal background:** `repeating-linear-gradient(...)` diagonal stripes as body or section background? **FAIL** — codex decoration tell.
73. **Anti-cream background:** Page background sits in the warm-neutral band `oklch(L 84–97%, C < 0.06, hue 40–100)` for a brief that didn't explicitly request warmth? **FAIL** — warmth via accent + type + image, not body background.
74. **Hero-metric template:** Big number/stat + supporting smaller stats + gradient accent in hero? **FAIL** — SaaS cliché, saturated pattern.
75. **Identical card grids (repeat of gate 3 variant):** Same-sized cards with icon + heading + text, repeated 4–8 times in a section? **FAIL** — vary sizes, structure, or use a different macrostructure.

### Copy Anti-Patterns (76–79)

76. **Negation pivot:** "Not just X, it's Y." "Less about X, more about Y." Three or more instances on the same page? **FAIL** — stronger AI tell than any vocabulary item. Replace with direct positive claims.
77. **Marketing buzzwords:** "Seamless", "elevate", "empower", "supercharge", "leverage", "unleash", "transform", "next-generation", "cutting-edge", "game-changer", "world-class", "mission-critical", "enterprise-grade"? **FAIL** — specific noun + literal verb describing what the product does.
78. **Button vague label:** Button says "OK", "Yes", "Confirm", "Submit" for a destructive or specific action? **FAIL** — verb + object: "Delete project", "Save changes", "Send invoice".
79. **Link non-descriptive text:** "Click here", "Learn more" as standalone link text? **FAIL** — link must have standalone meaning for screen readers.

### Destructive UX (80)

80. **Destructive action without AlertDialog:** Delete, remove, reset, disconnect shown as a simple button + toast confirmation? **FAIL** — must use AlertDialog (or `<dialog role="alertdialog">`) with the exact item being destroyed and "cannot be undone" statement.

---

## Em-Dash Ban (Complete)

**Em-dash (`—`) is completely banned.** The #1 visual tell in production tests.

- Banned in: headlines, eyebrows, labels, pills, button text, image captions, nav, body copy, quote attribution
- Banned in: en-dash form (`–`) as separator (use plain hyphen `-`)
- Only permitted dash: regular hyphen `-` (compound words, ranges) and minus sign in math
- **Zero tolerance.** One `—` anywhere visible = output fails and must be rewritten.
