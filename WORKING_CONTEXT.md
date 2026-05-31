# Drip Up Working Context

This file is the project memory for work on the Drip Up landing page. It is not a public product README. It captures how we collaborate, how Git/versioning should be handled, and how design-review work should be run.

**Cross-reference:** See `PROJECT_LOG.md` for the full chronological change log — every instruction received, every decision made, every file touched, and the complete project file map. Any agent picking up this work should read both files.

## Project

- Product: Drip Up
- Purpose: single-scroll landing page for an AI seller-management product for Shopify fashion sellers
- Active repo root: `C:\Users\saumi\Downloads\sellers website\dripup-landing`
- Archive folder: `C:\Users\saumi\Downloads\sellers website archive 2026-05-31`
- Main route: `/`
- CTA route: `/demo`

## Collaboration Style

Before implementation, Codex must:

1. Confirm what was understood.
2. Call out what is unclear, risky, or design-sensitive.
3. Ask focused questions when needed.
4. Wait for user confirmation before executing changes.
5. Then implement, verify, and summarize clearly.

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

## Frontend Design Review Protocol

Formal design-review mode is triggered by:

```text
$frontend-design-review
```

When this trigger is used, Codex should run a stricter X-ray review inspired by the pasted Guruansh Design X-ray skill, adapted for this project.

Use this mode for:

- homepage or component design audits
- design-system inventory
- palette, typography, spacing, copy, motion, and accessibility measurement
- screenshot-backed review
- approval-gated design-system rebuilds

Do not use the heavy protocol block in normal casual collaboration. Use it only during formal `$frontend-design-review` runs.

## Frontend Design Review Rules

For formal review:

1. Identify the exact lane: route, component, section, or flow.
2. Identify out-of-scope areas.
3. Identify protected copy.
4. Identify palette/design-system sources.
5. Measure before judging: colors, contrast, typography, spacing, hierarchy, motion, and responsive behavior.
6. Separate required fixes from optional polish.
7. Save evidence under:

```text
test folder/YYYY-MM-DD/frontend-design-review/
```

Use subfolders only when needed:

```text
captures/
json/
```

## Current Design-System Status

`DESIGN.md` exists, but it is not sacred. Treat it as historical input and a starting point, not as final truth.

The current design system must be rebuilt from:

1. User direction in the active session.
2. Live website screenshots and browser inspection.
3. Current active components.
4. Useful parts of `DESIGN.md`.
5. Useful parts of the pasted Frontend Design Review protocol.

Discard design rules that do not support the actual desired direction.

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
  hero-section-bg.png
  last-card-bg.png
```

## Reusable Skill

The project-specific review workflow has been turned into a reusable Codex skill named:

```text
frontend-design-review
```

Skill location:

```text
C:\Users\saumi\.codex\skills\frontend-design-review
```

That reusable skill preserves the useful discipline:

- lane lock
- copy lock
- palette lock
- measured visual review
- artifact sandbox
- scoped implementation after approval

It removes machine-specific paths, stale branding, and heavy protocol requirements outside formal review mode.
