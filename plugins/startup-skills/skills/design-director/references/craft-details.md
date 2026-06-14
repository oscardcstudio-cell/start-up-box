# Craft Details

The gap between "technically works" and "feels crafted" lives here. LLMs ship 2 interaction states and skip 6. These are the details that compound invisibly.

---

## Eight Interaction States

Every interactive element requires all 8. Missing any = unfinished.

| State | When | Treatment |
|-------|------|-----------|
| **Default** | At rest | Base styling |
| **Hover** | Pointer over — gate behind `@media (hover: hover) and (pointer: fine)` | Small shift: color, 1px translate, subtle border |
| **Focus** | Keyboard or programmatic | `:focus-visible` ring — never `:focus` (shows on click too) |
| **Active/Pressed** | During press | `scale(0.97)`, `translateY(1px)`, darker background |
| **Disabled** | Not interactive | `opacity: 0.55` + `cursor: not-allowed` + `aria-disabled="true"` + `tabindex="-1"` |
| **Loading** | Processing | Inline spinner at right edge, label stays readable, submit disabled |
| **Error** | Failed state | Red border, error icon, message, `aria-invalid="true"` |
| **Success** | Completed | Green check or label swap, auto-dismiss after 2.5s |

---

## Concentric Radius Formula

**Outer radius = inner radius + padding.**

```css
/* Outer container */
.card { border-radius: 16px; padding: 8px; }

/* Inner element (8px = outer - padding) */
.card-inner { border-radius: 8px; }
```

Mismatched nested radii is the #1 "feels off" tell. Check every card-within-card.

---

## Tactile Press

```css
.button {
  transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1);
}
.button:active {
  transform: scale(0.97);
}
```

Range: 0.95–0.98. Never below 0.95. Never `scale(0)` as entry animation — start from `scale(0.95)` with `opacity: 0`.

---

## Text Rendering

```css
/* On headings and dark-on-light large text */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;

/* On number displays — prevents layout shift as digits update */
font-variant-numeric: tabular-nums;

/* On headings */
text-wrap: balance;

/* On body copy — prevents orphans */
text-wrap: pretty;
```

---

## Image Outline

1px edge treatment that makes images not float plastically on the page:

```css
/* Light mode */
img { box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1); }

/* Dark mode */
img { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1); }
```

Never tinted — always neutral alpha. The inset prevents adding a real border that shifts layout.

---

## Hit-Area (Minimum 40px)

Touch targets must be ≥ 40×40px (44px recommended for WCAG). Visually small elements use padding or pseudo-element expansion:

```css
.icon-button {
  /* Visible size: 20px */
  width: 20px; height: 20px;
  
  /* Hit area: 44px */
  padding: 12px;
  /* or */
  position: relative;
}
.icon-button::after {
  content: '';
  position: absolute;
  inset: -12px;
}
```

---

## Shadow Vocabulary

Shadows have named purposes. Using a shadow outside its purpose = slop.

| Name | Value | Use |
|------|-------|-----|
| **Panel Setback** | `0 24px 70px oklch(2% 0.004 <bg-hue> / 0.42)` | Large framed modules, demo containers only |
| **CTA Lift** | `0 18px 48px oklch(2% 0.004 <bg-hue> / 0.4)` | Primary action button — lift implies importance |
| **Status Glow** | `0 0 22px <accent> / 0.24)` | Tiny live indicators (online badge, activity pulse) only |
| **No Default Card Shadow** | — | Cards rest on border + background shift. No shadow by default |

**The hairline-first rule:** Add a 1px border before reaching for shadow. Border makes hierarchy; shadow makes atmosphere. Atmosphere costs GPU; hierarchy is free.

**No ghost-card rule:** `border` + `box-shadow blur ≥ 16px` on the same element = gate 69. Pick one. If both are needed, the element is doing two jobs — split it.

---

## Texture Budget

Texture and grain are for **brand-bearing moments** only: hero dividers, primary CTA fills, illustration backgrounds, major section headers. Generic cards, lists, and body containers stay flat. A page with texture everywhere has no texture — everything reads as the same noise level. Budget texture like color: one accent, used deliberately, never as fill.

**When texture is valid:**
- Full-bleed hero or section background
- The one decorative divider per surface
- A specific component that IS the brand (wordmark, campaign image)

**When texture is slop:**
- Default card background
- Every section has a different noise/grain level
- Grain on interactive elements (focus confusion)

---

## `will-change` — Use Sparingly

Only on elements that will actively animate:

```css
/* Good — element is about to animate */
.modal { will-change: transform; }

/* Bad — applied globally "for safety" */
* { will-change: transform; }
```

Remove `will-change` after animation completes. Keeping it active consumes GPU memory.

---

## Popover Origin-Awareness

Popovers must scale from their trigger, not from center:

```css
/* Radix UI */
.popover-content {
  transform-origin: var(--radix-popover-content-transform-origin);
}
/* Base UI */
.popover-content {
  transform-origin: var(--transform-origin);
}
```

Exception: modals keep `transform-origin: center` — they're not anchored to a specific trigger.

---

## Focus Ring

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: inherit;
}
```

- 2–3px, minimum 3:1 contrast against element AND page background
- `:focus-visible` only — keyboard-only, never shows on click
- **Never `outline: none` without replacement** — accessibility bug
- Focus ring **never animates** (fades in). It appears instantly — gate 16.

---

## Input Field Precision

**Border thickness is constant across ALL states.** State changes go to `background`, `outline`, or `box-shadow`, never `border-width`.

```css
.input {
  border: 1px solid var(--color-rule-2);   /* always 1px */
  outline: 2px solid transparent;          /* reserved for focus */
  outline-offset: 1px;
}
.input:hover    { background: var(--color-paper-2); }
.input:focus    { outline-color: var(--color-focus); }
.input[aria-invalid="true"] { border-color: var(--color-error); }
.input:disabled { opacity: 0.55; cursor: not-allowed; }
```

**Heights:**
- Input height = adjacent button height (44px base)
- Vertical padding: `(height - line-height-px) / 2`
- Helper text: `min-height: 1lh` even when empty (prevents jump on error)

---

## Entry Animation — Never from scale(0)

Nothing in the real world disappears and reappears completely. Start from `scale(0.95)` or higher:

```css
/* Bad */
.entering { transform: scale(0); }

/* Good */
.entering { transform: scale(0.95); opacity: 0; }
```

---

## Blur as Transition Bridge

When crossfade between two states feels off despite good timing, add `filter: blur(2px)` during the transition. It bridges the gap between old/new state overlapping:

```css
.button-content.transitioning {
  filter: blur(2px);
  opacity: 0.7;
  transition: filter 200ms ease, opacity 200ms ease;
}
```

Keep blur under **8px when animated** (continuous blur is expensive in Safari even below 20px). For one-shot static blur: up to 20px acceptable.

---

## Tooltip Sequential Behavior

First tooltip: delay 800–1000ms (prevents flash). Once one tooltip is open, subsequent hovers open instantly (0ms delay). Makes the whole toolbar feel faster without defeating the purpose of the delay.

```css
.tooltip[data-instant] { transition-duration: 0ms; }
```

---

## clip-path for Reveal Animations

GPU-composited, hardware-accelerated alternative to opacity-only:

```css
/* Hidden — clipped from right */
.hidden { clip-path: inset(0 100% 0 0); }

/* Visible */
.visible { clip-path: inset(0 0 0 0); }

/* Reveal left-to-right */
.overlay {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

Use for: tab color transitions, hold-to-delete fills, image reveals on scroll, comparison sliders.

---

## Page-Edge Clipping

When elements intentionally bleed past viewport:

```css
html { overflow-x: clip; }  /* not hidden — preserves sticky/fixed */
body { overflow-x: clip; }  /* fallback */
```

Never `overflow-x: hidden` — breaks `position: sticky` and `position: fixed` on descendants.

---

## Viewport & Safe Areas

**Never `h-screen`.** Use `min-h-dvh` (dynamic viewport height). `h-screen` triggers a catastrophic layout jump on iOS Safari when the address bar appears/disappears.

```css
/* Bad */
.hero { min-height: 100vh; }

/* Good */
.hero { min-height: 100dvh; }
```

**`safe-area-inset` for fixed/absolute elements** (iOS notch, Android nav bar):

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

```css
.fixed-bar {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
  padding-left: max(1rem, env(safe-area-inset-left));
  padding-right: max(1rem, env(safe-area-inset-right));
}
```

---

## Destructive Actions — AlertDialog Required

Any **irreversible action** (delete, remove, reset, disconnect) must use an `AlertDialog` (or native `<dialog>` with alert role), not a regular confirm modal or toast.

- Body must state what will be destroyed and that it cannot be undone
- Destructive button: red/error color, label matches the action ("Delete project", not "OK")
- Cancel is the default focus, not the destructive button

---

## Loading States — Structural Skeletons

Use skeletal loaders that mirror the actual layout dimensions — no generic circular spinners.

```html
<div class="skeleton" aria-busy="true" aria-label="Loading content">
  <div class="skeleton-line" style="width:70%"></div>
  <div class="skeleton-line" style="width:50%"></div>
</div>
```

```css
.skeleton-line {
  height: 1em;
  background: linear-gradient(90deg, var(--color-rule) 25%, var(--color-paper-2) 50%, var(--color-rule) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer { to { background-position: -200% 0 } }
```

---

## Input Paste — Never Block

**Never** `onpaste="return false"` or `event.preventDefault()` on paste in `<input>` or `<textarea>`. Blocks password managers, breaks accessibility, hostile to users.

---

## Z-Index Scale

```css
:root {
  --z-base:     1;
  --z-raised:   10;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-modal:    400;
  --z-toast:    500;
  --z-tooltip:  600;
}
```

Never arbitrary `z-50` or `z-[9999]`. Document the scale; use only systemic layers.
