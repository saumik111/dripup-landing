# DripUp Landing — Project Log

This file is the living record of every change, every decision, and every instruction given on this project.
Its purpose is to give any AI agent (or human) picking up this work a complete, unambiguous picture of what has happened, why, and what the current state is.

Cross-reference:
- `WORKING_CONTEXT.md` — collaboration protocol, git rules, design-review protocol, file map
- `DESIGN.md` — full design system: palette, typography, spacing, components, copy rules, motion rules

---

## How We Work

These rules were set by the user (Saumi) and must be followed by any agent working on this project.

1. **Confirm before executing.** When given an instruction, the agent must first state what it understood, what it plans to do, and flag anything unclear or risky. Do not touch any file until the user says "execute".
2. **Wait for "execute".** The single word "execute" (or explicit confirmation) is the only trigger to begin implementation. Any other response — including "yes", "ok", "sounds good" — is clarification, not a go-ahead, unless unambiguous.
3. **Push to git after every update.** Every completed change must be committed with a scoped message and pushed to the remote (`origin main`) before reporting done.
4. **Scoped commits only.** Never use `git add .` or `git add -A` unless explicitly approved. Stage only the files changed in that specific update.
5. **Never delete user work without explicit approval.** Old assets, old components, old branches — leave them unless the user says remove.
6. **Copy is protected.** The exact wording of all copy on the page is locked. Do not rewrite any text unless the user explicitly opens copy for change. See `DESIGN.md` Section 17 for the copy ledger.
7. **No silent design changes.** Do not change colours, spacing, layout, or motion beyond what was asked. If a change has side-effects, flag them first.
8. **Document everything here.** Every instruction received, every decision made, every file touched must be logged in this file under the Change Log section.

---

## Project Snapshot

**Product:** DripUp — an AI commerce coworker for Shopify fashion sellers.
**Page job:** Single-scroll landing page. Make a seller believe DripUp can handle their store work, then move them to the demo.
**Repo:** `https://github.com/saumik111/dripup-landing`
**Active branch:** `main`
**Local path:** `C:\Users\saumi\Downloads\sellers website\dripup-landing`

**Stack:**
- Next.js 15, React 19, Pages Router
- Tailwind CSS v4
- GSAP + ScrollTrigger (scroll animations, word swap, cube roll, card stacking)
- Three.js WebGL dissolve canvas (hero dissolve on scroll)

**File map:**
```
pages/
  index.js          — Landing page composition (imports Navbar, HeroSection, StickyCards)
  demo.js           — Placeholder "Demo coming soon" page at /demo
  _app.js           — Global CSS import
  _document.js      — Google Fonts load (EB Garamond, Inter)

components/
  Navbar.js         — Fixed glass navbar. Hides on scroll down, shows on scroll up.
                      Locks visible when last sticky card fully expands.
                      Two hover-expand buttons: "Ask" (/ask) and "Try it" (/demo).
  HeroSection.js    — Hero section (175vh tall).
                      Background image + dark overlay.
                      Word-swap heading: "Grow & manage your [shopify store / online store] simply by chatting".
                      Glass chat panel with looping prompt/response pairs.
                      WebGL dissolve canvas (HeroCanvas.js) dissolves hero into page gradient on scroll.
                      Word reveal ("We handle the boring work...") and cube roll transition.
  HeroCanvas.js     — Three.js WebGL shader. Dissolves from hero image to page gradient (#F0F4FF → #FAFAFA)
                      as user scrolls through the hero section. Positioned at bottom of hero, full hero height.
  StickyCards.js    — 5 stacked feature cards. Animate in sequence on scroll:
                      1. Create (blue, photoshoots UI)
                      2. Expand your reach (mint, listings UI)
                      3. Control the chaos (yellow, insights UI)
                      4. Grow with confidence (peach, analytics UI)
                      5. Watch it in action (black, last-card-bg.png fills card, expands full-screen,
                         reveals CTA heading "Tell Drip Up what to do and it manages the rest" + Try it button)

public/images/
  hero-section-bg.png    — Original hero background (floral/sky, kept as backup)
  hero-section-bg-v2.png — Current active hero background (new floral image, ChatGPT generated, May 31 2026)
  last-card-bg.png       — Background for the final sticky card (CTA card)

styles/
  globals.css       — CSS variables (design tokens), base reset, body gradient, responsive overrides
```

**Design system summary (full detail in DESIGN.md):**
- Background: `linear-gradient(to right, #F0F4FF, #FAFAFA)`
- Ink / primary text: `#111318`
- Narrative headings: EB Garamond 500
- UI / body / buttons: Inter
- Primary CTA buttons: black (`#111318`)
- Surface tints: blue-white family
- Motion: GSAP scroll-scrubbed, reversible

---

## Change Log

All entries are in chronological order. Each entry records: what the user asked, what was decided, what was done, and which files were changed.

---

### Entry 001 — 2026-05-31

**Session agent:** Claude (Sonnet 4.6)

**User instruction:**
> "I have recently dropped an image in the folder. Put that in the hero section image. And also maintain a file of what is in this folder about whatever we do — every single update, every single decision made should be mentioned there. Also it should have a section where it is mentioned how we work: you don't execute directly, you confirm back what I just said and tell me what you understood, and then when I say only execute. Secondly you will be pushing to git after every update."

**What was understood:**
1. A new image had been dropped into the `sellers website/` root folder. Find it and use it as the hero section background image in `HeroSection.js`.
2. Create a `PROJECT_LOG.md` file that documents: how we work (confirm-first protocol), every change, every decision, and the full project context — so any AI agent picking up the work has everything it needs.
3. Also update `WORKING_CONTEXT.md` to reference `PROJECT_LOG.md`.
4. After every update, commit and push to git.

**Image identified:**
`ChatGPT Image May 31, 2026, 02_02_49 PM.png` — located at `c:/Users/saumi/Downloads/sellers website/`. A lush floral garden scene: pink, purple, orange, and white flowers against a pale sky. Same visual family as the original `hero-section-bg.png`. Generated via ChatGPT image generation.

**Decisions made:**
- Named the new image `hero-section-bg-v2.png` for clarity and version tracking. Old `hero-section-bg.png` preserved — not deleted.
- `PROJECT_LOG.md` created at repo root (`dripup-landing/`) so it lives alongside `WORKING_CONTEXT.md` and `DESIGN.md` and is tracked in git.
- `WORKING_CONTEXT.md` updated to reference `PROJECT_LOG.md`.

**Files changed:**
- `public/images/hero-section-bg-v2.png` — added (new hero background image)
- `components/HeroSection.js` line 232 — `src` changed from `/images/hero-section-bg.png` to `/images/hero-section-bg-v2.png`
- `PROJECT_LOG.md` — created (this file)
- `WORKING_CONTEXT.md` — updated to add reference to `PROJECT_LOG.md`

**Commit:** `asset: new hero bg (hero-section-bg-v2) + PROJECT_LOG created`

---

### Entry 002 — 2026-05-31

**Session agent:** Claude (Sonnet 4.6)

**User instruction (originally asked to Codex, then handed to Claude for execution):**

Six changes requested:

1. Remove `\n` line breaks from card subtexts in `StickyCards.js` — let text wrap naturally.
2. Fix the WebGL animation not working in the user's own browser (works in Codex's browser, fails silently for user). Diagnose and fix.
3. Build a mobile-specific stack animation identical in behaviour to the desktop one — pinned, scroll-driven, cards stack and slide — not just flat vertical cards.
4. Make the cards feel more premium: bolder colors, stronger shadows, more contrast between card background and white UI mockup panel, more confident scale.
5. Choose card colors based on text context (each card's meaning should drive its color), and make lower cards progressively darker to reinforce visual depth/stack effect.
6. Fix cube roll animation overlapping the cards on mobile.

**What was understood:**
- Points 1, 4, 5: all in `StickyCards.js` — colors, shadows, subtext cleanup.
- Point 2: `HeroCanvas.js` — add WebGL detection before init, add CSS gradient fallback div so the dissolve effect still visually works even without WebGL.
- Point 3: `StickyCards.js` — replace the flat mobile vertical layout with a full `MobileStack` component that mirrors desktop: pinned section, ScrollTrigger scrub, cards stack/slide/expand identically to desktop, CTA overlay included.
- Point 6: `HeroSection.js` — guard the cube roll `useEffect` with `if (window.innerWidth <= 700) return` so it never fires on mobile, eliminating the overlap.

**Decisions made:**

**Card colors chosen (with reasoning):**
| Card | Old color | New color | Reasoning |
|---|---|---|---|
| Create | `#EEF3FF` pale blue | `#C9D4FF` bold periwinkle | Creative/visual production — bold blue signals energy |
| Expand your reach | `#E6F4EA` pale mint | `#A8EDD4` vivid mint | SEO/reach/distribution — fresh teal energy, clearly different from blue |
| Control the chaos | `#FFF2C2` pale yellow | `#FFD43B` rich yellow | Alerts/operations — strong yellow demands attention, matches "chaos" meaning |
| Grow with confidence | `#FFE1CC` pale peach | `#FF8C5A` deep coral/orange | Growth/performance — warm, bold, clearly deeper than yellow above it |
| Watch it in action | `#111318` black | `#111318` black (kept) | Final CTA — black is already correct, heaviest/deepest in the stack |

Color progression deliberately gets bolder and darker from card 1 → 5 to reinforce the visual depth of the stack.

**Shadow upgrade:** Desktop and mobile card shadows changed from `0 18px 46px rgba(30,45,78,0.11)` to `0 24px 64px rgba(10,20,60,0.22), 0 4px 16px rgba(10,20,60,0.10)` — deeper, cooler-toned, more separation.

**WebGL fix approach:** Added `isWebGLSupported()` helper that probes a throwaway canvas before Three.js loads. If it returns false, the CSS fallback div (`display: none` by default) is made visible — a `linear-gradient(to bottom, transparent → #F0F4FF → #FAFAFA)` that mimics the dissolve visually. Both the canvas and fallback div are always in the DOM; only one is visible at a time. Added `console.warn` in both failure paths for dev debugging.

**Mobile cube roll fix:** Added `if (window.innerWidth <= 700) return` as the first line of the cube roll `useEffect`. On mobile the word-reveal text stays visible (no cube), and no ScrollTrigger pin is created that could overlap the card section.

**Mobile stack:** New `MobileStack` component inserted above `export default function StickyCards`. Uses same GSAP + ScrollTrigger pattern as desktop but with mobile geometry: cards at `88%` width, `62%` height, `cardYOffset: 3`, `cardScaleStep: 0.05`, `stackDist: 2.2 * vh`, `expandDist: 0.5 * vh`. Full CTA overlay with word-by-word heading animation and button. The `isMobile` branch in `StickyCards` now renders `<MobileStack />` instead of flat cards.

**Files changed:**
- `components/StickyCards.js` — new CARDS colors, \n removed from subtexts, `whiteSpace: "pre-line"` removed from desktop subline, stronger shadows on desktop cards, full `MobileStack` component added, mobile branch now renders `<MobileStack />`
- `components/HeroCanvas.js` — `isWebGLSupported()` helper added, CSS gradient fallback div added, two `console.warn` paths for debugging, both canvas and fallback always in DOM
- `components/HeroSection.js` — cube roll `useEffect` now guards `if (window.innerWidth <= 700) return` at top

**Commit:** `feat: premium cards, mobile stack animation, WebGL fallback, mobile cube roll fix`

---

### Entry 003 — 2026-05-31

**Session agent:** Claude (Sonnet 4.6)

**User instruction:**
> "It is too bold, it is hurting the eyes. Fix the color — not too much but a bit. Secondly do a grey screen test of the cards to find out whether the colors go with the text color or not. If not then tell me what can we do to fix it."

**What was understood:**
1. Colors from Entry 002 were too saturated. Pull them back to a middle ground — keep the color personality and depth progression but remove the harshness. Not back to original pastels.
2. Perform a grey screen test (luminance-only analysis) on card background vs subtext color combinations, identify contrast failures, and propose a fix.

**Grey screen test findings:**
- Cards 1 (Create) and 2 (Expand) had hue-matched muted text — `#2B3580` blue on blue bg, `#0D5C3A` green on green bg. Both pairs desaturate to similar grey values, meaning the subtext contrast fails in greyscale and on low-contrast displays.
- Cards 1 and 2 also desaturated to nearly the same grey value as each other — the stack depth was invisible in monochrome.
- Cards 3 and 4 were fine — yellow and coral have clearly different luminance and contrast.

**Fix chosen:** Option A — change all colored-card muted text to `rgba(17,19,24,0.55)`. Always dark ink, always readable, opacity gives a designed-in softness without fighting the background. Applied to all 4 colored cards (black card keeps its existing `#D8DEEA`).

**Decisions made:**

**Color adjustment (toned down from Entry 002):**
| Card | Entry 002 | Entry 003 | Change |
|---|---|---|---|
| Create | `#C9D4FF` | `#D8E2FF` | Lighter, softer periwinkle |
| Expand | `#A8EDD4` | `#BDF0DC` | Lighter, softer mint |
| Control | `#FFD43B` | `#FFE066` | Warmer, less harsh yellow |
| Grow | `#FF8C5A` | `#FFB090` | Softer coral-peach |
| Watch | `#111318` | `#111318` | Unchanged |

**Subtext color fix:**
All 4 colored cards: muted text changed from hue-matched dark colors to `rgba(17,19,24,0.55)` — neutral dark ink at 55% opacity. Readable in greyscale, passes contrast on all 4 backgrounds.

**Files changed:**
- `components/StickyCards.js` — CARDS array updated: bg colors toned down, all muted colors unified to `rgba(17,19,24,0.55)`
- `PROJECT_LOG.md` — this entry

**Commit:** `style: tone down card colors, fix subtext contrast (grey screen test)`

---
