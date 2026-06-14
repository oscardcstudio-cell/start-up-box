# Typography

## The 2+1 Rule — 3 Faces Maximum

- **Display face** — headings, hero, pull quotes
- **Body face** — prose, UI labels, body copy
- **Outlier** (optional) — ONE register only: wordmark, hero stat, masthead, or mono code

**Rules:**
- Outlier appears ≤ 2 places. Wordmark + hero stat. Or pull quote + masthead.
- Mono counts as a face.
- Same family at different weights = one family.
- Never > 3 families — gate 39.

---

## Modular Scale (1.25 ratio — Major Third)

Base: 16px body.

```css
:root {
  --text-xs:   0.64rem;    /* 10.24px */
  --text-sm:   0.8rem;     /* 12.8px  */
  --text-base: 1rem;       /* 16px    */
  --text-md:   1.25rem;    /* 20px    */
  --text-lg:   1.5625rem;  /* 25px    */
  --text-xl:   1.9531rem;  /* 31.25px */
  --text-2xl:  2.4414rem;  /* 39px    */
  --text-3xl:  3.0518rem;  /* 49px    */
  --text-4xl:  3.8147rem;  /* 61px    */
  --text-display: clamp(2.75rem, 5vw + 1rem, 5.25rem);
}
```

**Display max: ≤ 5.5 rem (88px).** Exception: single-word stat (≤ 12 ch) can grow to 7 rem.

### Hero Headline Sizing by Copy Length

| Length | Size Cap | Notes |
|--------|----------|-------|
| ≤ 20 chars | Full `--text-display` | Single-word display-heavy only |
| 21–50 chars | `--text-display` | Sweet spot. If wraps > 2 lines at 414px, step down. |
| 51–90 chars | `--text-4xl` max | Consider: eyebrow + headline split |
| > 90 chars | Rewrite, or `--text-4xl` tight | 100-char headline = AI tell |

---

## Weights

- **Body:** One weight (400 or 350). Bold for emphasis only — never italic for decoration.
- **Headings:** Contrast body by ≥ 300 units. Body 400 → headings 700 or 200. Never 500–600 (mid-weight is neither bold nor light — undecided).
- Never synthesize; load the weight needed.

**Weight-inversion rule:** If body is 400, display goes heavy (700+) OR light (200). Picking 500–600 for headings is hedging. Commit.

**h1/h2 inversion rule (within a page):** The hero h1 can be *lighter* than the section h2s that follow. Light hero (300) → heavy section anchors (600) creates rhythm: the page breathes at the top, then grounds at each chapter. This is the opposite of what instinct suggests and is deliberate. Do not normalize both to the same weight.

---

## Line-Height

| Context | Value |
|---------|-------|
| Body copy — light surface | 1.5–1.65 |
| Body copy — dark surface | 1.65–1.8 (dark backgrounds reduce contrast; more air prevents muddiness) |
| Display / large heads | 1.1–1.3 |
| All-caps display | ≥ 1.0 (below 1.0, cap-tops collide with baseline above) |
| Tight brutalist macro | 0.85–0.95 |
| Brutalist micro (data) | 1.2–1.4 |

---

## Tracking (Letter-spacing)

| Context | Value |
|---------|-------|
| Tight display serif/grotesque | `-0.02em` to `-0.04em` |
| Brutalist heavy macro | `-0.03em` to `-0.06em` (glyphs form solid block) |
| Small-caps / labels / eyebrows | `0.08em` to `0.14em` |
| Brutalist micro / telemetry | `0.05em` to `0.1em` (typewriter spacing) |
| Body copy | ≤ 0.05em (never wider on body) |

---

## Banned Display Defaults

Never without deliberate reason:

**Sans-serif:** Inter, Roboto, Open Sans, Lato, Poppins, Source Sans, Nunito, Montserrat, Raleway, Work Sans, DM Sans, system-ui, Arial, Helvetica

**Serif:** Merriweather, Playfair Display (as body), Lora, Source Serif, Georgia-as-default

**Mono:** Courier New, Consolas, system-mono

Exception: Inter is acceptable for product UI body text only (never display).

---

## Free Display Faces (Google Fonts / Fontshare)

| Face | Voice | Best For |
|------|-------|----------|
| Fraunces | Variable serif, expressive italic | Editorial, Salon, Atelier |
| Newsreader | Roman serif, optical-size + italic | Editorial, magazine, long-form |
| Instrument Serif | Tight contrast, italic | Brand, atelier, intimate editorial |
| Cormorant Garamond | Classical, high contrast, luxury | Luxury, fashion, fine arts |
| EB Garamond | Honest classical Garamond, body-grade | Editorial body, longform |
| Geist | Modern grotesque, 7 weights | Modern minimal, SaaS, dev tools |
| Bricolage Grotesque | Variable display sans, condensable | Brutal, playful, riso |
| Space Grotesk | Geometric, slightly quirky | Brutalist, technical |
| Anton | Heavy condensed grotesque | Posters, manifestos |
| Big Shoulders Display | Industrial condensed | Sport, manifestos |
| Cabinet Grotesk (Fontshare) | Display grotesque, 9 weights | Editorial display, magazine |
| Clash Display (Fontshare) | Ultra-condensed | Posters, brand moments |
| Satoshi (Fontshare) | Playful geometric sans | Playful, consumer |
| Sentient (Fontshare) | Variable serif, soft contrast | Soft editorial, atmospheric |
| Erode (Fontshare) | Distressed serif, hand-set feel | Riso, tactile rebellion |
| Tanker (Fontshare) | Heavy condensed, pure display | One-word posters, mastheads |
| Tomorrow | Variable optical condensed | Tech, atmospheric |
| General Sans (Fontshare) | Modern grotesque, Geist-adjacent | Modern minimal |
| Switzer (Fontshare) | Neutral sans, broad weight range | SaaS body |
| Bodoni Moda | Modern Bodoni, dramatic | Fashion, editorial, luxury |

## Free Body Faces

Geist, Newsreader, Source Serif 4, EB Garamond, Spectral, Lora, Crimson Pro, IBM Plex Sans, Switzer, General Sans

## Mono Faces

JetBrains Mono, IBM Plex Mono, Space Mono, Geist Mono

---

## Tone-Pairing Table (7 Voices)

| Voice | Display | Body | Notes |
|-------|---------|------|-------|
| Editorial | Fraunces / Newsreader | EB Garamond / Spectral | Italic body in long-form |
| Technical | Space Grotesk / Geist | Geist / IBM Plex Sans | Mono for data labels |
| Brutalist | Anton / Big Shoulders / Monument Extended | IBM Plex Mono | ALL CAPS macro, tight tracking |
| Soft | Sentient / Instrument Serif | Satoshi / General Sans | Optical size, soft contrast |
| Luxury | Cormorant Garamond / Bodoni Moda | Switzer / Geist | High contrast, sparse setting |
| Playful | Bricolage Grotesque / Cabinet Grotesk | Switzer / Satoshi | Bold weight, not comic |
| Austere | Tanker / Clash Display | Space Grotesk | Max compression, statement only |

---

## Body Text Rules

- **Minimum 16px.** Below 14px: accessibility-hostile.
- **Measure 45–75 ch** (`max-width: 65ch`)
- Never all-caps body copy
- Never justified text without hyphenation
- Never letter-spacing > 0.05em on body
- Body text never pure `#000000`: use `oklch(18% 0.01 <hue>)` or equivalent

## Headings Rules

- Skip no levels: h1 → h2 → h3 (semantic order)
- `text-wrap: balance` on headings, `text-wrap: pretty` on body
- Headings: `letter-spacing: -0.02em` to `-0.04em` at display sizes

## Tracked Labels Are Short

Tracked uppercase labels (`letter-spacing: 0.12em+`) are short system markers: section eyebrows, nav items, metadata chips, table headers. Never write a full sentence in tracked caps. If the string is longer than ~4 words, reduce tracking to ≤ 0.06em or switch to regular case. Tracked long copy reads as AI scaffolding.

## Bans

- Gradient text (`background-clip: text`) — universal gate 5
- Single-font pages
- All-caps paragraphs
- `font-size` < 14px body, < 10px anywhere
- Hard-synthesized bold/italic (browser fake bold)
- > 3 font families (gate 39)
- Outlier face in > 2 slots (gate 40)
