# Brand Tokens

Exact design tokens for 20+ real products. Load this when a brief says "like Linear", "Stripe-aesthetic", "Notion-style", etc. — use as reference anchor, then diverge deliberately.

**Usage:** These are reverse-engineered from production. Use for inspiration and palette anchoring, never copy verbatim.

---

## Dark Product Canvases

### Linear
*Near-black product-as-marketing, lavender-blue accent, product screenshots first*

```yaml
canvas: "#010102"           # deepest dark in this collection
surface-1: "#0f1011"
surface-2: "#141516"
hairline: "#23252a"
ink: "#f7f8f8"
ink-muted: "#d0d6e0"
ink-subtle: "#8a8f98"
accent: "#5e6ad2"           # lavender-blue — brand mark, focus, primary CTA only
accent-hover: "#828fff"
```
Typography: Custom sans (SF Pro Display fallback), weight 500–600, tracking -3px at 80px → -0.05px at body.
Radius: 4px (xs) → 16px (xl). Cards 12px. Never pill on cards.
Voice: Dense product screenshots frame the marketing. Chrome is secondary. No second chromatic color.

### Raycast
*Near-black developer tool, white CTA pill, Inter ss03, product-screenshot-first*

```yaml
canvas: "#07080a"
surface: "#0d0d0d"
surface-elevated: "#101111"
hairline: "#242728"
ink: "#f4f4f6"
body: "#cdcdcd"
mute: "#9c9c9d"
accent: "#ffffff"           # white pill CTA — the whole accent is white
on-accent: "#000000"
accent-red: "#ff6161"       # category illustrations only
accent-blue: "#57c1ff"      # category illustrations only
accent-green: "#59d499"     # category illustrations only
accent-yellow: "#ffc533"    # category illustrations only
hero-stripe: "#ff5757"      # diagonal launch-banner gradient only
```
Typography: Inter + `font-feature-settings: "ss03"` everywhere. Weight 500–600 display, 400 body.
Radius: 4–10px. Never 16px+ on cards.
Voice: Marketing IS the product UI at page scale. Monochrome continuity, no atmospheric breaks.

### Impeccable (Neo Kinpaku)
*Dark lacquer + gold leaf + verdigris patina — technical luxury*

```yaml
canvas: "oklch(7% 0.006 95)"     # warm mineral black
surface: "oklch(11% 0.006 95)"   # raised lacquer (panels, cards)
surface-deep: "oklch(4% 0.004 95)" # deepest inset
graphite: "oklch(15% 0.008 95)"  # inputs, inactive
hairline: "oklch(78% 0 0 / 0.16)"   # neutral rule
hairline-strong: "oklch(74% 0.09 82 / 0.6)" # gold rule
ink: "oklch(88% 0 0)"            # body — neutral near-white
ink-bright: "oklch(91% 0 0)"     # headlines
ink-muted: "oklch(72% 0 0)"      # captions
accent-gold: "oklch(84% 0.19 80.46)"  # primary — CTAs, active, wordmark
accent-patina: "oklch(70% 0.12 188)"  # secondary — improved state, live indicators
warning: "oklch(58% 0.15 35)"    # vermilion — errors only
```
Typography: Alumni Sans Pinstripe (display, weight 300 hero / 600 sections), Albert Sans (body, 1.02rem, lh 1.8).
Radius: 2–8px (restrained). No `border-radius` > 8px.
Voice: Hairlines first, no glass, no default card shadow. Texture on brand-bearing moments only.

### Vercel / ElevenLabs tier
*Pure black, white typography, zero-chroma neutrals, maximum contrast*

```yaml
canvas: "#000000"           # pure black — one of the rare justified cases
surface: "#111111"
surface-2: "#1a1a1a"
hairline: "#333333"
ink: "#ffffff"
ink-muted: "#888888"
accent: "#ffffff"           # white primary
```
Typography: Geist, tight negative tracking. Weight 500 display.
Voice: Monochrome system. Color = white on black. Any accent = a significant decision.

---

## Light Product Canvases

### Stripe
*White canvas, electric indigo, thin weight 300 everywhere, tabular figures*

```yaml
canvas: "#ffffff"
canvas-soft: "#f6f9fc"
hairline: "#e3e8ee"
ink: "#0d253d"
ink-secondary: "#273951"
ink-muted: "#64748d"
accent: "#533afd"           # electric indigo
accent-deep: "#4434d4"
accent-soft: "#665efd"
brand-navy: "#1c1e54"
```
Typography: Sohne-var (SF Pro Display fallback), weight **300** across display + heading + body. Negative tracking scales: -1.4px at 56px, 0 at body. `font-feature-settings: "tnum"` on numbers.
Radius: 4–12px. Buttons: pill (`9999px`).
Voice: Finance infrastructure credibility. Thin weight everywhere creates editorial restraint. Gradient mesh in upper third of marketing pages (atmospheric only, never text).

### Notion
*White canvas + deep navy hero, purple primary, illustration-rich, pastel card tints*

```yaml
canvas: "#ffffff"
hero-bg: "#0a1530"          # deep navy — hero band only
surface: "#f6f5f4"
hairline: "#e5e3df"
ink: "#1a1a1a"
ink-muted: "#787671"
accent: "#5645d4"           # purple primary
accent-secondary: "#0075de" # link blue
# Pastel card tints (database property colors reflected in marketing cards)
tint-peach: "#ffe8d4"
tint-rose: "#fde0ec"
tint-mint: "#d9f3e1"
tint-lavender: "#e6e0f5"
tint-sky: "#dcecfa"
tint-yellow: "#fef7d6"
```
Typography: Notion Sans (Inter-based custom), weight 400–600. -2px at 80px hero, 0 at body.
Radius: 4–24px range. Buttons 8px (not pill).
Voice: Illustration-rich brand voice, pastel system mirrors in-product database colors. Workspace UI mockup directly in hero.

---

## Premium Brand Surfaces

### Figma
*White canvas, purple-to-pink gradient hero accent, friendly-professional*

```yaml
canvas: "#ffffff"
surface: "#f5f5f5"
ink: "#1e1e1e"
ink-muted: "#757575"
accent-purple: "#7b61ff"
accent-pink: "#f24e1e"
accent-blue: "#1abcfe"
accent-green: "#0acf83"     # logo colors, used in illustrations
```
Typography: Custom sans (Inter fallback), weight 400–700.
Voice: The logo's 4-color system bleeds into illustration but never into UI chrome. Marketing is friendlier and more colorful than the product UI.

### Apple (Marketing)
*White/black alternating, enormous display type, product photography dominant*

```yaml
canvas-light: "#ffffff"
canvas-dark: "#000000"
ink-on-light: "#1d1d1f"
ink-on-dark: "#f5f5f7"
ink-muted-light: "#6e6e73"
ink-muted-dark: "#a1a1a6"
accent: "#0071e3"           # blue links only — never decorative
```
Typography: SF Pro Display, weight 600–700 display, negative tracking aggressive (-0.03em at hero). Body 17px, lh 1.47.
Voice: The product IS the design. Every page section exists to show the product. Type and product photography alternate. No decorative elements.

### Loom / Framer tier
*Warm neutral canvas, product screenshot hero, single saturated accent*

```yaml
canvas: "#fafafa"
surface: "#f0f0f0"
ink: "#111111"
ink-muted: "#666666"
accent: "#ff3c00"           # or brand-specific saturated
```

### Superhuman
*Deep navy, gold accent, luxury email product positioning*

```yaml
canvas: "#0a0e1a"
surface: "#121829"
hairline: "#1e2640"
ink: "#e8eaf6"
ink-muted: "#8b92b8"
accent: "#f0b429"           # gold
```

---

## Developer Tool Surfaces

### Supabase
*Dark green ecosystem — dark canvas + electric green accent*

```yaml
canvas: "#1c1c1c"
surface: "#2a2a2a"
ink: "#ededed"
accent: "#3ecf8e"           # electric green brand
```

### Vercel (product)
*Pure black + white + zero-chroma grays*

```yaml
canvas: "#000000"
surface: "#111111"
hairline: "#333333"
ink: "#ffffff"
```

### PostHog / Linear product tier
*Near-black, one chromatic accent, dense UI, product-led*

```yaml
canvas: "#151515"
surface: "#1d1d1d"
hairline: "#2a2a2a"
ink: "#f0f0f0"
ink-muted: "#888888"
```

---

## How to Use This Reference

When brief says "like X":
1. Load the brand's token set above as reference anchor
2. Note the **voice** description — that's the design philosophy, not just the palette
3. Use the tokens to inform your own OKLCH palette (translate to OKLCH), don't copy hex values directly
4. The **macrostructure** still needs to fit the brief — brand tokens don't dictate page structure

When brief says "inspired by X but different":
- Take the palette register (dark/light, restrained/expressive)
- Pick a **different** aesthetic school from `references/aesthetic-schools.md`
- Keep the voice philosophy, change the visual vocabulary
