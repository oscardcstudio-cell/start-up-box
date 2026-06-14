# Motion

## Animation Decision Framework

Before writing any animation code, answer these in order:

### 1. Should this animate at all?

| Frequency | Decision |
|-----------|----------|
| 100+ times/day (keyboard shortcuts, command palette, shortcuts) | No animation. Ever. |
| Tens of times/day (hover effects, list navigation) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare/first-time (onboarding, feedback forms, celebrations) | Can add delight |

**Never animate keyboard-initiated actions.** These are repeated hundreds of times daily. Raycast has no open/close animation — that is optimal.

### 2. What is the purpose?

Every animation must answer *"why does this animate?"*

Valid purposes:
- **Spatial consistency** — toast enters/exits same direction, swipe-to-dismiss feels intuitive
- **State indication** — morphing button shows state change
- **Feedback** — button scales down on press, confirming the interface heard you
- **Preventing jarring changes** — elements appearing without transition feel broken

If the purpose is "it looks cool" and the user sees it often — don't animate.

### 3. What easing?

- Element **entering** → `--ease-out` (starts fast, feels responsive)
- Element **exiting** → `--ease-in` (accelerates away)
- **Moving on screen** → `--ease-in-out`
- **Hover / color change** → `ease`
- **Constant motion** (marquee, progress) → `linear`
- **Default** → `--ease-out`

---

## Easing Canon (Exact Values)

```css
:root {
  /* Entering — decelerate. Strong, responsive. */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* Exiting — accelerate away. */
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);

  /* Toggles — symmetrical. */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* iOS-like drawer (from Ionic Framework). */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);

  /* Alternative strong ease-out (emilkowalski variant). */
  --ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);

  /* Material 3 standard. */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Banned:** `ease` (browser default, uncrafted), `linear` (except progress bars), bounce/elastic/overshoot on UI state changes.

**Never `ease-in` for UI elements** — starts slow, feels sluggish. A dropdown with `ease-in` at 300ms feels slower than `ease-out` at the same 300ms.

---

## Duration Buckets

```css
:root {
  --dur-micro: 80–120ms;   /* button press, toggle tick, color shift */
  --dur-short: 150–200ms;  /* hover lift, tooltip, menu open */
  --dur-long:  400–500ms;  /* modal, drawer, accordion, reveal */
}
```

### Duration by Element

| Element | Duration |
|---------|----------|
| Button press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Scroll entry reveals | 600ms+ |
| Hold-to-delete press | 2s linear |
| Release / snap back | 200ms ease-out |

**UI animations stay under 300ms.** A 180ms dropdown feels more responsive than a 400ms one.

---

## Exit Timing

**Exits ≈ 70–75% of enter duration.** 300ms enter → 220ms exit. Slow where the user is deciding, fast where the system is responding.

```css
/* Enter slow (deliberate press) */
.button:active .overlay {
  transition: clip-path 2s linear;
}
/* Exit fast (system response) */
.overlay {
  transition: clip-path 200ms ease-out;
}
```

---

## Stagger

- **Between items: 30–80ms.** Long delays make interface feel slow.
- Stagger is decorative — never block interaction while stagger plays.
- Use CSS cascade: `animation-delay: calc(var(--index) * 50ms)` or nth-child.
- ≤ 8 items only for dropdown/menu stagger.

```css
.item { animation: fadeIn 300ms var(--ease-out) forwards; }
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }
```

---

## Microinteraction Recipes

### Button press
```css
.button { transition: transform 160ms var(--ease-out); }
.button:active { transform: scale(0.97); }
```

### Modal open/close
- Backdrop: 300ms `--ease-out` in, 220ms `--ease-in` out
- Content: `scale(0.96) opacity(0)` → `scale(1) opacity(1)`, 300ms `--ease-out`
- Reduced-motion: opacity-only, 150ms

### Dropdown/menu
- Open: 180ms `--ease-out`, optional 30ms stagger (≤ 8 items)
- Close: 140ms `--ease-in`

### Tooltip
- Hover: **800–1000ms delay** (prevent flash on cursor travel)
- Focus: **0ms delay** (keyboard users reach deliberately)
- Animation: 150ms `--ease-out` opacity + `scale(0.97)` from trigger origin

### Tab change
- Underline: `transform: translateX()` + width, 250ms `--ease-out`
- Content out: fade 100ms `--ease-in`
- Content in: fade 150ms `--ease-out` with 50ms delay

### Copy-to-clipboard
- No toast. Button label swaps to "Copied" + check icon; reverts after 2.5s.

### Scroll entry (stagger reveal)
- `translateY(8px) opacity(0)` → `translateY(0) opacity(1)`
- 400ms `--ease-out`
- One-shot only via IntersectionObserver. Never re-trigger.

---

## Spring Physics

For physical interactions (drag release, gestures, toggle handles) only.

| Config | Feel | Use For |
|--------|------|---------|
| stiffness 50, damping 20 | Gentle, no overshoot | Calm reveals |
| stiffness 180, damping 22 | Snappy, slight overshoot | Drag release, toggle handle |
| stiffness 280, damping 26 | Stiff, minimal bounce | Picker snap |
| stiffness 400, damping 40 | Very stiff, no bounce | Position corrections |

Apple-style config (easier to reason about):
```js
{ type: "spring", duration: 0.5, bounce: 0.2 }
```
Keep bounce 0.1–0.3. Avoid bounce in most UI. Use for drag-to-dismiss and playful interactions.

---

## Reduced-Motion (Mandatory)

Every `transform`/animation must have a `@media (prefers-reduced-motion: reduce)` branch.

- Spatial motion → opacity crossfade ≤ 150ms
- Functional motion (spinners, progress) → slowed but present
- Infinite loops, parallax, scroll-hijack → collapse to static

```css
@media (prefers-reduced-motion: reduce) {
  .element { animation: fade 0.2s ease; }
}
```

```jsx
const shouldReduceMotion = useReducedMotion();
const closedX = shouldReduceMotion ? 0 : '-100%';
```

---

## Theme Duration Scales

| Theme | Scale | Flavour |
|-------|-------|---------|
| Specimen / Quiet | 1.0× | Default |
| Midnight | 0.9× | Snappy, technical |
| Brutal / Manifesto / Sport | 0.7× | Fast, decisive |
| Garden / Linen | 1.2× | Calm |
| Atelier / Salon | 1.3–1.4× | Generous, gentle |
| Newsprint / Terminal | 0× | Static. No motion. |
| Almanac | 0.85× | Functional |

---

## Performance Rules

- **Only animate `transform` and `opacity`.** These skip layout and paint — GPU-composited.
- **Framer Motion `x`/`y` shorthand = NOT hardware-accelerated.** Under load, use full `transform: "translateX()"` instead.
- **`backdrop-blur` only on fixed/sticky elements** — never on scrolling containers (continuous GPU repaints on mobile).
- **`will-change: transform` sparingly** — only on elements that will actively animate. Remove after animation completes.
- **Never `window.addEventListener('scroll')` for scroll animations** — use `IntersectionObserver`, GSAP `ScrollTrigger`, or `animation-timeline: view()`.
- **No `requestAnimationFrame` loop without a stop condition.** A rAF loop with no exit path = silent CPU drain.
- **Blur animation max 8px.** Continuous blur is expensive in Safari even below 20px. One-shot static blur: up to 20px acceptable.
- **Never animate CSS variables for `transform`, `opacity`, or position.** CSS variables inherit — updating one variable triggers style recalc on all descendants. Update `transform` directly on the element instead.

```js
// Bad: triggers recalc on all children
element.style.setProperty('--swipe-amount', `${distance}px`);

// Good: only affects this element
element.style.transform = `translateY(${distance}px)`;
```

- **Scroll-linked motion:** prefer `scroll-timeline` / `animation-timeline: view()`. Use `IntersectionObserver` for visibility-triggered reveals. Never poll `scrollY`.

---

## FLIP Pattern (Layout-Like Transitions)

For transitions that look like layout changes (element moving from one position to another) without actually animating layout properties:

1. **First** — record current position: `el.getBoundingClientRect()`
2. **Last** — apply the final state (add class, change DOM)
3. **Invert** — apply a `transform` to make element look like it's in the First position
4. **Play** — remove the transform with a transition

```js
const first = el.getBoundingClientRect();
el.classList.add('moved');
const last = el.getBoundingClientRect();

// Invert
el.style.transform = `translateX(${first.left - last.left}px) translateY(${first.top - last.top}px)`;

// Play
requestAnimationFrame(() => {
  el.style.transition = 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
  el.style.transform = '';
});
```

Use FLIP for: tab switches, list reordering, shared-element transitions, expanding cards. Batch all DOM reads before writes — never interleave.

---

## The Narrative — Slow-Fast-Boom-Stop

Page-level choreography follows this rhythm:
- **Slow** — Initial load-in: generous timing, weighted entrance
- **Fast** — Interaction responses: immediate, < 200ms, no friction
- **Boom** — One moment of delight: the one microinteraction that surprises
- **Stop** — Silence after the boom: don't layer more

2–3 microinteractions per surface maximum. Frequency-check every one before adding.

---

## Perpetual Micro-Interactions

Every **active/featured component** can have an infinite loop state. Use one per surface maximum, on the element that most benefits from signaling "alive":

| Pattern | CSS | When |
|---------|-----|------|
| **Pulse** | `@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }` | Live status indicator, online badge |
| **Float** | `@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }` | Hero illustration, featured card |
| **Shimmer** | gradient sweep animation | Skeleton loader |
| **Typewriter** | character-by-character text reveal, infinite | Hero tagline on dark canvas |
| **Caret blink** | `@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} } steps(2)` | Code blocks, terminal cursor only |

**Rules:**
- All perpetual animations pause on `prefers-reduced-motion: reduce`
- Duration ≥ 2s (slower = more ambient, less distracting)
- One per page — not one per component
- Never on interactive elements (buttons, links) — loops fight click feedback
