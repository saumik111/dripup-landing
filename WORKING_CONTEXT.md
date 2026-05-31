# Drip Up Working Context

This file is the project memory for work on the Drip Up landing page. It is not a public product README. It captures how we collaborate, how Git/versioning should be handled, and how design-review and handoff work should be run.

Cross-reference: read `PROJECT_LOG.md` for the full chronological change log: every instruction received, every decision made, every file touched, and the current project file map. Any agent picking up this work should read `PROJECT_LOG.md`, this file, and `DESIGN.md`.

## Project

- Product: Drip Up
- Purpose: single-scroll landing page for an AI seller-management product for Shopify fashion sellers
- Active repo root: `C:\Users\saumi\Downloads\sellers website\dripup-landing`
- Archive folder: `C:\Users\saumi\Downloads\sellers website archive 2026-05-31`
- Main route: `/`
- CTA route: `/demo`
- Current active branch: `main`
- Current remote: `origin/main`

## Collaboration Style

Before implementation, Codex must:

1. Confirm what was understood.
2. Call out what is unclear, risky, or design-sensitive.
3. Ask focused questions when needed.
4. Wait for explicit confirmation before executing changes when the task is exploratory or design-sensitive.
5. Then implement, verify, document, and summarize clearly.

The user prefers frequent communication, visual explanations when useful, and design reasoning that is concrete rather than vague. Do not silently make broad design changes.

## Git And Versioning

Codex is responsible for keeping work safe.

- Check `git status` before edits.
- Keep commits scoped and meaningful.
- Do not use broad staging such as `git add .` unless explicitly approved.
- Do not revert or delete user work unless explicitly requested.
- Commit approved implementation checkpoints.
- Tag approved visual milestones when the user asks to save a version or approves a major state.
- Push only when the user confirms the checkpoint should be published.
- If the user explicitly instructs "push after every update" for a session, follow that newer instruction for that session and record it in `PROJECT_LOG.md`.

Suggested commit message pattern:

```text
<type>: <short description>
```

Useful types:

- `feat`: new behavior or section
- `fix`: bug fix
- `style`: visual-only change
- `copy`: wording change
- `asset`: image/video/asset update
- `docs`: project docs/context
- `chore`: cleanup or structure

## Current Design State

- Background: `linear-gradient(to right, #F0F4FF, #FAFAFA)`
- Narrative headings: EB Garamond
- UI, body, subtext, labels, and buttons: Inter
- Primary actions: black `#111318`
- Current active hero image: `public/images/hero-section-bg-v2.png`
- Old hero image preserved: `public/images/hero-section-bg.png`
- Current card colors:
  - Create: `#D8E2FF`
  - Expand your reach: `#BDF0DC`
  - Control the chaos: `#FFE066`
  - Grow with confidence: `#FFB090`
  - Watch it in action: `#111318`
- Copy is protected. Do not rewrite page text unless the user explicitly opens copy for changes.

## Frontend Design Review Protocol

Formal design-review mode is triggered by:

```text
$frontend-design-review
```

Use this mode for:

- homepage or component design audits
- design-system inventory
- palette, typography, spacing, copy, motion, and accessibility measurement
- screenshot-backed review
- approval-gated design-system rebuilds

Do not use the heavy protocol block in normal casual collaboration. Use it only during formal `$frontend-design-review` runs.

For formal review, save evidence under:

```text
artifacts/frontend-design-review/YYYY-MM-DD/
```

Use subfolders such as:

```text
captures/
json/
notes/
```

## Active Website Files

```text
pages/
  index.js
  demo.js
  _app.js
  _document.js

components/
  Navbar.js
  HeroSection.js
  HeroCanvas.js
  StickyCards.js

styles/
  globals.css

public/images/
  hero-section-bg-v2.png
  hero-section-bg.png
  last-card-bg.png

artifacts/
  frontend-design-review/YYYY-MM-DD/

atoa/
  DOCKET.md
  handoff_*.md
```

## Reusable Skills

Frontend design review skill:

```text
C:\Users\saumi\.codex\skills\frontend-design-review
```

Agent handoff skill:

```text
C:\Users\saumi\.codex\skills\atoa
```

Use `/atoa` or an explicit handoff request to create numbered handoff briefs under `atoa/`.
