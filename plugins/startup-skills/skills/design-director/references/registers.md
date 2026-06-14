# Registers

Two design registers. They diverge on every dimension. Choosing wrong register is the most expensive mistake — it corrupts all downstream decisions.

---

## Brand Register

**Surfaces:** Landing pages, marketing sites, pitch decks, dossiers, portfolios, campaigns, editorial, founder stories.

**The bar:** Distinctiveness. A visitor should wonder *"how was this made?"* — never *"which AI made this?"*

**The test:** Would someone show this to a friend as an example of good design? Or would they just navigate it?

### Typography
- Characterful display face — Fraunces, Cormorant, Bodoni Moda, Tanker, Bricolage Grotesque, Cabinet Grotesk, Instrument Serif
- Inter/Roboto/Open Sans as display = automatic fail
- Tight-set display (`letter-spacing: -0.03em` to `-0.05em`)
- Italic body acceptable in long-form editorial contexts
- Outlier face permitted (wordmark + hero stat or pull quote + masthead)
- Size: push to `clamp(4rem, 8vw, 7rem)` when brief supports it

### Color
- OKLCH palette with visible chroma and intent
- Accent can be expressive — hue 20–60 (oranges/warm), hue 330–350 (magentas), green-lime, amber
- Atmospheric genre: radial blooms up to ~20–30% backdrop are permitted
- Paper can be warm-tinted (`oklch(96% 0.015 80)`) or deep-dark (`oklch(14% 0.010 40)`)
- One accent, used sparingly — links, CTAs, active states — not fills

### Motion
- MOTION dial 5–8
- Scroll-triggered reveals are appropriate
- Staggered entrance choreography
- One cinematic "boom" moment permitted (but only one)
- Marketing animation explaining features is valid
- Still requires: `prefers-reduced-motion` branches, transform/opacity only

### Layout
- VARIANCE dial 7–9
- Any macrostructure except "default AI nav + 3-feature-row + CTA + footer"
- Asymmetric columns, editorial flow, overlap, negative space as design
- Sections separated by rule, color shift, or ornament — never just equal whitespace
- Hero: asymmetric, two-column, or full-bleed. Never centered-everything.

### Permissions
- Hairline rules, fleurons, drop caps, double rules
- Italic body in long-form
- Asymmetric column counts (2:5, 3:7)
- Hand-built SVG illustrations
- Numbered display labels, edge-aligned headlines
- `<mark>` highlighting (single accent only)
- Atmospheric: glow shadows on hover (dark context only)

### Bans
- Generic SaaS "Quiet" aesthetic on editorial brief
- 3-column equal feature-card grid
- Centered-everything hero
- Card-in-card nesting
- Pill-button + gradient fill as primary CTA (unless brief explicitly calls for it)
- Purple-to-blue/cyan gradient
- Gradient text (`background-clip: text`)
- Glassmorphism

---

## Product Register

**Surfaces:** App UI, dashboards, admin panels, tools, SaaS product, settings, onboarding, analytics.

**The bar:** Earned familiarity. Someone fluent in Linear / Figma / Notion / Raycast must instantly trust it. Strangeness without purpose fails.

**The test:** Can a user find what they need in < 10 seconds? Does every element signal its function without decoration?

### Typography
- Clean grotesque or geometric sans: Geist, Inter (body only), IBM Plex Sans, Switzer, Space Grotesk
- Inter is acceptable for body text only — never display
- Body weight: 400 (never lighter in product — readability drops)
- Heading weight: 600–700 (close to body, not editorial contrast)
- `tabular-nums` on every number that updates
- `font-size` ≥ 16px body, ≥ 12px labels, ≥ 10px meta

### Color
- OKLCH palette, neutral-dominant
- Accent = semantic signal: active state, focus ring, primary CTA
- Zero-chroma neutrals acceptable (modern-minimal genre)
- Color = meaning: red → error/danger, green → success/online, amber → warning
- Dark mode from launch — never one-mode-only
- Accent footprint < 3% of viewport (product users see it hundreds of times daily)

### Motion
- MOTION dial 2–4
- Keyboard-initiated actions: never animate (command palette, shortcuts, navigation)
- Hover states: standard (150–200ms, no theatrics)
- Modals, drawers: 200–300ms max
- Never scroll-hijacking
- Never cinematic reveals in product context
- Loading states: spinner or skeleton, not animation
- `prefers-reduced-motion` collapses to opacity crossfade only

### Layout
- VARIANCE dial 3–5
- Predictable navigation: permanent sidebar or top nav with clear labels
- Density appropriate to task (DENSITY dial 6–8 for dashboards)
- Grid: consistent, navigable, no surprises
- Tables: `tabular-nums`, alternating row backgrounds optional, sticky headers
- Cards: uniform sizing, consistent radius, same border treatment
- DENSITY 9 contexts: 1px line separators, no card boxes, monospace data

### Permissions
- Pill-rounded CTAs (filled + outlined)
- Black-filled primary + white-outlined secondary
- Two-column hero (title-left + paragraph-right)
- Refined card with subtle border + 8px radius
- Skeleton shimmer loaders
- Toast notifications for async feedback
- Inline validation (on blur, not every keystroke)

### Bans
- Editorial layouts that confuse navigation
- Decorative animation (parallax, scroll-narrative, hover-trail)
- Asymmetric columns that fight scanability
- Drop caps, fleurons, ornament
- Bouncy easings on any UI element
- Gradient text (`background-clip: text`)
- Glassmorphism
- Italic serif body
- Custom cursors
- Em-dashes anywhere visible to user

---

## Quick Routing Table

| Signal | Register |
|--------|----------|
| "landing page" / "marketing" | Brand |
| "pitch deck" / "investor" | Brand |
| "portfolio" / "agency" / "dossier" | Brand |
| "editorial" / "magazine" / "blog" | Brand |
| "product UI" / "app" / "dashboard" | Product |
| "admin" / "settings" / "tool" | Product |
| "SaaS" alone (no further context) | Product (but hero is Brand) |
| "design system" / "component library" | Product |
| "onboarding" | Product (warm, not editorial) |

SaaS marketing pages straddle both: **Brand aesthetics for the marketing pages, Product aesthetics for the app UI.** Don't bleed one into the other.

---

## Genre Mapping

| Hallmark Genre | Register | Surfaces |
|----------------|----------|---------|
| Atmospheric | Brand | AI creative, music, generative, dark/nocturnal products |
| Editorial | Brand | Content-led, portfolios, manifestos, magazines, founder stories |
| Playful | Product (warm) | Consumer apps, onboarding, community, friendly tools |
| Modern-Minimal | Product | SaaS, enterprise, API, developer tools, Stripe/Linear school |
