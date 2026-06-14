# Aesthetic Schools

20+ named schools organized into 5 traditions. Pick one before any code. Name it — commit to it. "Modern minimal" is not a school; "Notion-editorial warm monochrome" is.

**Reflex-reject test:**
1. Can someone guess the aesthetic from the category alone? ("dev tool → SaaS-cream + Inter"). Rework.
2. Can they guess from category + obvious anti-reference? ("AI tool but not SaaS → editorial-serif"). That lane is saturated too. Push further.

---

## Tradition 1: Swiss / Industrial / Print

### 1.1 Swiss Industrial Print
*1960s corporate identity + heavy machinery blueprints*

- **DNA:** High-contrast light mode. Monolithic heavy sans. Unforgiving structural grids with visible dividing lines. Asymmetric negative space punctuated by oversized viewport-bleeding numerals. Primary red as only accent.
- **Palette:** Background `#F4F4F0` or `#EAE8E3` (matte newsprint). Foreground `#050505`–`#111111`. Accent `#E61919` or `#FF2A2A` (aviation red). Nothing else.
- **Type:** Neue Haas Grotesk Black, Archivo Black, Monument Extended — `clamp(4rem, 10vw, 15rem)`. Tracking `-0.03em` to `-0.06em`. Line-height `0.85`–`0.95`. ALL CAPS structural heads.
- **Layout:** Blueprint CSS Grid, `display: grid; gap: 1px` with contrasting backgrounds for razor-thin lines. Zero `border-radius` — every corner 90 degrees.
- **Motion:** MOTION 2–3. Static by default.

### 1.2 Tactical Telemetry / CRT Terminal
*Classified military databases + legacy mainframes + HUD*

- **DNA:** Dark mode exclusivity. High-density tabular data. Absolute monospaced typography. ASCII framing devices, crosshairs, simulated CRT limitations.
- **Palette:** Background `#0A0A0A` or `#121212` (deactivated CRT — never `#000`). Foreground `#EAEAEA` (white phosphor). Accent `#E61919`. Terminal green `#4AF626` for ONE single element if needed.
- **Type:** JetBrains Mono, IBM Plex Mono, Space Mono, VT323. Fixed 10–14px. Tracking `0.05em`–`0.1em`. EXCLUSIVELY UPPERCASE.
- **Layout:** `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)` for scanlines.
- **Motion:** MOTION 1. No animation except data update ticks.

### 1.3 Blueprint / Technical Documentation
*Engineering drawings + instruction manuals*

- **DNA:** Grid as primary visual element. Measurement annotations. Geometric precision. Paper-like substrate.
- **Palette:** Off-white substrate, carbon ink, single engineering-blue or orange accent.
- **Type:** Heavy condensed sans headers, technical mono for specs and labels.

---

## Tradition 2: Editorial / Print / Literary

### 2.1 Specimen (Foundry/Type-Forward)
*Type specimen sheets + design foundry marketing*

- **DNA:** Left-margin numbered labels, huge serif display, asymmetric column spans, hairline rules, generous whitespace. Typography IS the design.
- **Type:** Fraunces, Cormorant Garamond, EB Garamond — display-dominant. Body tiny and sparse.
- **Palette:** Off-white paper `oklch(97% 0.008 80)`, carbon ink, one-color accent.
- **When:** Editorial/foundry/type-specimen briefs only. Never default. Opt-in.

### 2.2 Newsprint / Almanac
*Newspaper front page + reference almanac*

- **DNA:** Dense columnar layout. Hairline rules between columns. Ink-on-newsprint feel. Date, issue, masthead as design elements.
- **Type:** Newsreader, EB Garamond, Source Serif 4 for body. Grotesque condensed for heads. Tight leading `1.1`–`1.3`.
- **Palette:** Warm newsprint `oklch(94% 0.014 80)`, near-black ink, zero accent or single ochre.
- **Motion:** MOTION 0 — static. No animation.

### 2.3 Atelier / Salon
*Art gallery + private collection + curator's notes*

- **DNA:** Generous whitespace as primary material. Object-on-wall feel. Sparse type. Image as artifact.
- **Type:** Cormorant Garamond or Bodoni Moda at large optical sizes. Tiny caption text. No bold.
- **Palette:** Cool white `oklch(98% 0.003 240)`, warm ink `oklch(20% 0.008 60)`, no accent.
- **Motion:** MOTION 3. Slow, generous, 1.3–1.4× duration scale.

### 2.4 Linen / Garden
*Craft publication + slow-living magazine + botanical*

- **DNA:** Texture-adjacent. Warm, organic. Photography-led sections. Handcrafted feel despite being web.
- **Palette:** Warm linen `oklch(95% 0.018 85)`, soft sage or terracotta accent.
- **Type:** Instrument Serif or Sentient + clean grotesque body. Italic body in long-form.
- **Motion:** MOTION 4, 1.2× duration scale.

### 2.5 Riso / Studio Print
*Risograph print + zine + screen printing*

- **DNA:** Registration imperfection as aesthetic. Halftone textures. Bold flat color areas. Limited palette by constraint.
- **Palette:** 2–3 flat colors, often with intentional "off-register" color blending via `mix-blend-mode: multiply`.
- **Type:** Erode (Fontshare), Bricolage Grotesque. Heavy, playful.

---

## Tradition 3: Soft / Contemporary / Premium Digital

### 3.1 Ethereal Glass (SaaS / AI / Tech Dark)
*Deepest OLED black + subtle radial blooms*

- **DNA:** Near-black canvas `#050505`, warm radial gradients as background atmosphere, vantablack cards with heavy `backdrop-blur`, hairline `rgba(255,255,255,0.1)` borders, wide geometric grotesque type.
- **Palette:** Background `oklch(8% 0.005 40)`. Accent: warm amber, coral, or electric blue. Never neon purple.
- **Type:** Geist, Plus Jakarta Sans, Tomorrow — clean, geometric. No serif.
- **Motion:** MOTION 6. Staggered mask reveals, scroll entry, gentle bloom pulsing (one-shot only).

### 3.2 Editorial Luxury (Lifestyle / Real Estate / High Fashion)
*Warm creams + muted sage + deep espresso tones*

- **DNA:** High-contrast variable serif headings. CSS noise/film-grain overlay `opacity-[0.03]` for physical paper feel. Photography-dominant.
- **Palette:** Warm cream `oklch(96% 0.018 85)`, muted sage or espresso `oklch(25% 0.012 135)`.
- **Type:** Fraunces, Instrument Serif, Bodoni Moda — full weight range.
- **Motion:** MOTION 5. Entrance animation is a reveal, not a fade-up.

### 3.3 Soft Structuralism (Consumer / Health / Portfolio)
*Silver-grey or white + massive bold grotesque + airy float*

- **DNA:** Floating components with impossibly soft ambient shadows. Asymmetric bento tiles. Nested bezels (outer + inner container). "Double-Bezel" architecture.
- **Double-Bezel recipe:** Outer: `ring-1 ring-black/5 p-1.5 rounded-[2rem]`. Inner: `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[calc(2rem-0.375rem)]`.
- **Palette:** White/silver-grey. Soft accent with `oklch(75% 0.12 <hue>)`.
- **Motion:** MOTION 5. `translate-y-16 blur-md opacity-0` → `translate-y-0 blur-0 opacity-100` over 800ms.

### 3.4 Quiet / Modern-Minimal (Linear / Stripe School)
*Polished enterprise SaaS — restraint + precision*

- **DNA:** Pure `#fff` or near-white paper (zero-chroma neutrals permitted). Tight set displays. Black-on-white clarity. No decoration.
- **Type:** Geist, Inter (body ok here), IBM Plex Sans. Clean, no serif.
- **Palette:** White/zinc-50 paper, zinc-900 ink, single high-contrast accent.
- **Motion:** MOTION 3. Crisp, 0.9× duration scale. No theatrics.

---

## Tradition 4: Brutalist / Expressive / Counter-Design

### 4.1 Brutal
*Concert poster + raw HTML energy + punk*

- **DNA:** Grid broken by design. Type collision. Aggressive scale contrast. Visible structure is the aesthetic.
- **Type:** Bricolage Grotesque, Space Grotesk, Anton — extreme weights, extreme sizes.
- **Palette:** High contrast. Neon accents as intentional provocation. Or stark black/white.
- **Motion:** MOTION 2. Fast and decisive. 0.7× duration scale.

### 4.2 Manifesto
*Political poster + declaration + belief system*

- **DNA:** Large type as argument. Minimal layout. Words are the design. No decoration.
- **Type:** Big Shoulders Display, Clash Display, Tanker — heavy condensed, ALL CAPS.
- **Palette:** Monochrome or two-color maximum.
- **Motion:** MOTION 1–2. Near-static.

### 4.3 Sport / Stadium
*Athletic brand + stadium signage + game graphics*

- **DNA:** Grid systems derived from scoreboards. Motion blur aesthetics. High-contrast. Energy.
- **Type:** Big Shoulders, Anton, heavy condensed. Numbers as design elements.
- **Motion:** MOTION 4–5. Fast transitions, 0.7× scale.

---

## Tradition 5: Atmospheric / Nocturnal / Generative

### 5.1 Bloom
*Warm radial blooms on dark canvas*

- **DNA:** Dark-first. 2 warm radial background blooms (amber/coral, max 20–30% total backdrop). Elevated cards. No cool hues.
- **Palette:** `oklch(10% 0.008 40)` base. Warm accent `oklch(65% 0.22 60)`. Hairlines `rgba(255,255,255,0.08)`.
- **Motion:** MOTION 6. Entrance choreography, stagger reveals.

### 5.2 Midnight / Terminal
*Dark precision + monospace authority*

- **DNA:** Near-black, cool blue-black undertone. Data-dense. Monospace for functional content. High-contrast.
- **Motion:** MOTION 2–3. 0.9× duration scale. Snappy.

### 5.3 Aurora / Halo
*Iridescent light + generative art + creative tools*

- **DNA:** Shifting color fields. Organic gradients. Color as substance, not signal. Abstract.
- **Palette:** Carefully controlled despite appearing wild. OKLCH transitions across adjacent hues (never full rainbow).

---

## The Four Skill Archetypes (Full Presets)

| Archetype | School | Dials | When |
|-----------|--------|-------|------|
| **Brutalist / Tactical** | Swiss Industrial or Tactical Telemetry | V:9 M:2 D:8 | Industrial, telemetry, concert, alt-branding |
| **Minimalist / Utilitarian** | Quiet or Soft Structuralism | V:5 M:3 D:5 | SaaS, enterprise, dev tools, B2B |
| **Soft / Awwwards-tier** | Ethereal Glass or Soft Structuralism | V:7 M:6 D:4 | Agency, $150k-feeling, consumer premium |
| **Editorial / Print** | Specimen, Newsprint, Atelier | V:8 M:3 D:4 | Content-led, foundry, magazine, founder |
