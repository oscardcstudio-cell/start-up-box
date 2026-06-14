# Color

**Rule: OKLCH only.** Perceptually uniform — lightness is consistent, hue predictable across tints. Never raw hex in component code; all colors come from `:root` tokens.

---

## Physical Scene Test (Before Choosing Light vs Dark)

Dark vs. light is never a default. Not dark "because tools look cool dark." Not light "to be safe."

Before choosing, write **one sentence of physical scene**: who uses this, where, under what ambient light, in what mood. If the sentence doesn't force the answer, it's not concrete enough — add detail until it does.

> "A developer at 11pm, second monitor, reviewing a PR." → dark
> "A teacher between classes, phone, sunlight." → light
> "A founder between investor meetings, MacBook, neutral." → doesn't force yet — add more

If you can't write the sentence, ask the one question that unlocks it.

---

## Color Strategy (Pick Before Picking Colors)

Four levels on the commitment axis. Decide before choosing palette.

| Strategy | Surface coverage | Use case |
|----------|-----------------|----------|
| **Restrained** | One accent ≤ 10% | Product default; brand minimalism; trust-first |
| **Committed** | One saturated color 30–60% | Brand-identity-driven pages; signature moments |
| **Full palette** | 3–4 named roles, each deliberate | Brand campaigns; data visualization |
| **Drenched** | Surface IS the color | Campaign heroes; editorial full-bleed sections |

---

## Token Architecture

### Layer 1: Paper (base surface)
- Light: `oklch(96–98% 0.005–0.015 <anchor hue>)`
- Dark: `oklch(12–16% 0.008–0.015 <anchor hue>)`

### Layer 2: Ink (primary text)
- Light: `oklch(16–22% 0.005–0.015 <anchor hue>)`
- Dark: `oklch(92–96% 0.005–0.01 <anchor hue>)`

### Layer 3: Neutrals (5–9 steps between paper and ink)
- Each step tinted at 0.005–0.015 chroma toward anchor hue

### Layer 4: Accent (one saturated color)
- Chroma: 0.12–0.22
- Used for: links, active states, highlights, focus rings
- **Never as fill covering > 5% of viewport**

### Layer 5: Focus ring
- Passes ≥ 3:1 contrast against both element AND page background
- `oklch(55–70% 0.19 <accent hue or contrasting hue>)`

---

## Accent-Ink Token (Critical)

When `--color-accent` fills any surface carrying text, **must define** `--color-accent-ink`:
- If accent L > 50%: use ink (dark text on accent)
- If accent L ≤ 50%: use paper (light text on accent)
- **Verify APCA Lc ≥ 7:1 body, ≥ 3:1 large**

Missing `--color-accent-ink` = one careless `color: white` away from failure.

---

## Example Palettes

### Warm-oat (anchor hue 80)
```css
:root {
  --color-paper:   oklch(96%  0.012 80);
  --color-paper-2: oklch(93%  0.014 80);
  --color-rule:    oklch(82%  0.010 80);
  --color-neutral: oklch(56%  0.008 80);
  --color-muted:   oklch(40%  0.008 70);
  --color-ink:     oklch(18%  0.010 60);
  --color-accent:  oklch(62%  0.22  55);  /* signal orange */
  --color-accent-ink: oklch(98% 0.005 80);
  --color-focus:   oklch(55%  0.19  55);
}
```

### Midnight (anchor hue 40)
```css
:root {
  --color-paper:   oklch(14%  0.008 40);
  --color-paper-2: oklch(18%  0.010 40);
  --color-rule:    oklch(30%  0.008 40);
  --color-neutral: oklch(58%  0.008 40);
  --color-muted:   oklch(72%  0.006 40);
  --color-ink:     oklch(94%  0.006 80);
  --color-accent:  oklch(62%  0.22  55);
  --color-accent-ink: oklch(16% 0.008 40);
  --color-focus:   oklch(70%  0.19  55);
}
```

### Cool SaaS (anchor hue 250)
```css
:root {
  --color-paper:   oklch(98%  0.005 250);
  --color-paper-2: oklch(95%  0.007 250);
  --color-rule:    oklch(88%  0.006 250);
  --color-neutral: oklch(60%  0.006 250);
  --color-muted:   oklch(45%  0.006 250);
  --color-ink:     oklch(18%  0.008 250);
  --color-accent:  oklch(58%  0.20  260);  /* electric blue */
  --color-accent-ink: oklch(98% 0.002 250);
  --color-focus:   oklch(58%  0.20  260);
}
```

---

## Contrast Targets

| Content | WCAG minimum | APCA minimum | Target |
|---------|-------------|--------------|--------|
| Body text | 4.5:1 | Lc 60 | 7:1 |
| Large text (≥ 24px regular or ≥ 18px bold) | 3:1 | Lc 45 | 4.5:1 |
| UI component boundaries | 3:1 | Lc 45 | 4.5:1 |
| Placeholder/helper text | 4.5:1 | Lc 60 | 4.5:1 |

Verify every (text color, background) pair before emit.

---

## Dark Mode Recipe

| Token | Rule |
|-------|------|
| Paper | L 12–18%. Never `#000` |
| Ink | L 92–96%. Never `#fff` |
| Body font-weight | -50 units from light mode (400 → 350) |
| Accent chroma | -0.02–0.04 from light mode |
| Accent lightness | +5–10% from light mode |
| Elevation | Higher surfaces = lighter, not darker (+~3% L per level) |
| Hue | Never switch hue between modes. Keep anchor, only move L and chroma |

---

## Neutral Tinting

**Never flat gray (`oklch(L 0 H)` — zero chroma).** Minimum 0.005 chroma toward anchor hue. If anchor is warm (hue 50–100), neutrals lean warm. If cool (hue 240–280), cool.

Exception: Modern-minimal genre allows zero-chroma neutrals when the brief is explicitly monochrome.

---

## Bans

- Pure `#000000` or `#ffffff`
- Flat gray (zero chroma), unless modern-minimal explicit
- Purple-to-cyan, purple-to-blue, orange-to-pink gradients (AI slop)
- Accent as fill covering > ~5% viewport (atmospheric allows radial blooms up to ~20–30%)
- Gray text on colored background
- Red-green as the only signal pair (accessibility fail)
- Alpha transparency as a color definition
- Three-color gradients (two-stop only)
- `background-clip: text` gradient headlines — always
- **Anti-cream (2026 AI default):** The entire warm-neutral band `oklch(L 84–97%, C < 0.06, hue 40–100)` reads as cream/sand/paper/parchment regardless of what the token is named. Token names like `--paper`, `--linen`, `--parchment`, `--bone`, `--flour`, `--ivory`, `--cream`, `--sand` are tells in themselves. If the brief is "warm / editorial / traditional / family", **do NOT translate that into a near-white warm-tinted background** — that's the AI move. Warmth is carried by accent + typography + imagery, not by the body background. Alternatives: (a) a saturated brand color as the body (terracotta, oxblood, deep ochre, near-black), (b) a true off-white at chroma 0, or (c) a darker tinted neutral that's clearly the brand's own.

---

## Accent Usage

**Reach for it to:**
- Mark active nav item
- Draw focus ring
- Underline link on hover
- Border or text color on primary CTA
- Small square anchor beside heading

**Never to:**
- Fill giant buttons
- Color whole sections
- Use for decorative gradients
