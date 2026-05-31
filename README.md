# Drip Up Landing

Single-scroll landing page for Drip Up, an AI seller-management product for Shopify fashion sellers.

## Stack

- Next.js 16 Pages Router
- React 19
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Three.js WebGL dissolve canvas with CSS mask-wipe fallback

## Start Here

Read these before working:

```text
PROJECT_LOG.md       Full chronological change log and project memory
WORKING_CONTEXT.md   Collaboration rules, git rules, active files, skills
DESIGN.md            Design system, copy lock, palette, motion rules
atoa/                Agent-to-agent handoff briefs
```

## Active Structure

```text
pages/
  index.js          Landing page composition
  demo.js           Placeholder CTA destination
  _app.js           Global CSS import
  _document.js      Font loading

components/
  Navbar.js         Fixed glass navbar with Ask and Early access actions
  HeroSection.js    Hero image, chat panel, word swap, reveal, desktop cube roll
  HeroCanvas.js     WebGL dissolve overlay plus mask-wipe fallback
  StickyCards.js    Desktop/mobile stacked cards and expanding final CTA card

public/images/
  hero-section-bg-v2.png  Active hero background
  hero-section-bg.png     Preserved previous hero background
  last-card-bg.png        Final sticky-card background

styles/
  globals.css       Base CSS, tokens, responsive overrides

artifacts/
  frontend-design-review/2026-05-31/  Review screenshots, reports, JSON

atoa/
  DOCKET.md
  handoff_*.md      Numbered handoff briefs for other agents
```

## Commands

```bash
npm run dev
npm run build
npm run start
```

## Notes

Archived reference projects, loose generated images, unused components, old template assets, mockups, videos, and stale agent handoff docs were moved to:

```text
C:\Users\saumi\Downloads\sellers website archive 2026-05-31
```
