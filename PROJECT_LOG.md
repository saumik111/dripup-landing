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
