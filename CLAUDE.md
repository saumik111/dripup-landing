@AGENTS.md

# DripUp Landing Page — Claude Working Instructions

## Git / Version Control Rules

- **Commit after every meaningful change.** After each feature, fix, or section build, run `git add` + `git commit` with a clear message.
- **Push to GitHub after every commit** unless the user says otherwise. Remote: `https://github.com/saumik111/dripup-landing`
- **Tag approved versions.** When the user says "save this as a version" or "I like this", create a git tag: `git tag -a v<number> -m "<description>"` and push it: `git push origin --tags`. This lets us restore any approved state cleanly.
- **Never force push to main.** If something breaks, branch off the last good tag and fix forward.
- **Before any large change**, check `git status` to confirm the working tree is clean. If it isn't, commit or stash first.

## Saved Versions

| Tag | Description |
|-----|-------------|
| v1.0 | Hero dissolve + word reveal working |
| v1.1 | Before glass panel dissolve experiment |
| v1.2 | Dissolve transition, word reveal, panel dissolve, solution copy updated |
| v1.3 | Cube roll animation working, text horizontal, color reveal clean |
| v1.4 | Word reveal working, cube positioned correctly, seamless swap |

---

## Work State Log

### Session 1 — 2026-05-25 — Initial Setup + All Sections Built

- Created Next.js 16 (Pages Router, no TypeScript, Tailwind v4)
- Installed GSAP + @gsap/react, Three.js
- Built all 5 sections: HeroSection, ProblemSection, SolutionSection, FeatureCards, CTASection
- Set up GitHub repo `saumik111/dripup-landing`
- Added jsconfig.json for `@/` path alias (Next.js 16 kept regenerating tsconfig.json)

---

### Session 2 — 2026-05-25 to 2026-05-28 — Full Visual & Animation Build

#### Typography
- Fonts: **Figtree** (500, 600) for body/labels/buttons, **EB Garamond** (400, 500) for all headings
- All major headings: EB Garamond, `font-style: normal`, `font-weight: 500`
- `<em>` tags: EB Garamond italic via `globals.css`
- H1 font size: `clamp(2rem, 4vw, 3.5rem)` — this is the canonical hero heading size used everywhere

#### Hero Section — Current State
**Structure:**
- Section: `position: relative`, `height: 175vh` — scroll track for dissolve + word reveal
- Background image: `position: absolute`, `src="/images/hero-bg.png"` — user-swappable
- Dark overlay: `rgba(0,0,0,0.18)` at `z:1`
- HeroCanvas: WebGL dissolve canvas at `z:2` — covers image
- Logo "DRIP UP": `position: absolute`, `top: 32`, `left: 40`, `z:30`
- Heading wrapper: `position: absolute`, `top: 0`, `height: 100vh`, `z:1` — pinned to first viewport, dissolved by canvas
- Panel+CTA wrapper: `position: absolute`, `top: 0`, `height: 100vh`, `z:3`, `paddingTop: 36vh` — dissolved by canvas
- hero-content: `position: absolute`, `bottom: 0`, `height: 125vh`, `z:30` — word reveal + cube

**Heading animation:**
- Word-swap animation on "shopify store" ↔ "online store" with letter-by-letter stagger
- Entry: measure both words at mount, lock container to average px width, entrance animation on page load (word-by-word rise from y:48)
- Loop: letters enter → hold 3.2s → dip together (y:5) → jump out (y:-24) → next word → repeat
- On scroll back: fully reversible

**Dissolve (HeroCanvas.js):**
- Three.js WebGL canvas, IronHill shader (exact port from codegrid-ironhill-scroll-animation source)
- Cream fill `#F5F0E8` dissolves upward over hero image+panel+heading as you scroll
- Progress: `(scrollY / (heroHeight - windowHeight)) * speed` where speed=1.2
- Canvas z:20 — above heading(z:1) and panel(z:3), below hero-content(z:30)
- uSpread: 0.5, exact IronHill fragment shader with `noiseValue * uSpread` (not + uSpread)

**Word reveal (hero-content):**
- Two `<span style={{ display: "block" }}>` wrappers for line 1 and line 2
- Individual word `<span className="reveal-line" style={{ display: "inline", opacity: 0 }}>` — IronHill method
- ScrollTrigger: `start: "top 25%"`, `end: "center center"`, scrub:true
- opacity 0→1 per word in sequence

**Cube roll animation:**
- Fires at `start: "center center"` — pins hero-content when text is dead center
- `end: "+=500"` — 500px scroll distance for full animation
- Sequence: fade out word-reveal div → fade in cube → tilt -12° → pause 0.08s → roll to 95° → settle to 90° with `back.out(1.5)`
- Cube geometry: `transformOrigin: "center center"`, front face `rotateX(0) translateZ(80px)`, bottom face `rotateX(-90deg) translateZ(80px)`, no perspective wrapper
- Front face text: "We handle the boring work, / so you can focus on *growing*"
- Bottom face text: "Drip Up plugs into your shopify store / and takes over all the repetitive tasks"
- Both faces: same height `clamp(120px, 12vw, 160px)`, same font, same flex centering, same lineHeight 1.3

#### Internal decisions — Hero
- Canvas z:20 was chosen so heading(z:1) and panel(z:3) get dissolved, but word-reveal(z:30) and cube(z:30) stay above
- Removed `perspective` from cube wrapper — at `translateZ(80px)` with perspective, the front face appeared ~7% larger than word-reveal div, causing visible size jump on swap. Without perspective (orthographic), translateZ has no size effect
- Word-reveal div must have same `height: clamp(120px, 12vw, 160px)` and `display:flex; justifyContent:center` as cube to ensure text sits at identical Y position on swap
- The word splitter originally used `display:inline-block` which caused vertical stacking in flex containers. Fixed with `display:inline` spans inside `display:block` span containers
- Trailing spaces inside inline spans were adding micro-height to line boxes. Fixed by putting space between words outside the span

#### ProblemSection.js — Current State
- Removed all chaos tags and explosion animation
- Just two lines: "We handle the boring work," + "so you can focus on growing"
- Plain section, no animations

#### SolutionSection.js — Current State
- Heading: "Drip Up plugs into your Shopify store and takes over all the repetitive tasks, / just like your manager"
- Product UI card with tabs (Summary/Insights/Artifacts) + 3 report rows
- Fade-in on scroll (gsap.from children)

#### FeatureCards.js — Current State
- 4 stacked cards, GSAP ScrollTrigger pin, scrub:0.6
- Card 1 heading + subline: enter from below with rotateX(90→0) on scroll in
- onLeave fires onReady() → shows CTASection

#### pages/index.js — Current State
- HeroSection + SolutionSection + FeatureCards + CTASection
- ProblemSection removed from page (its content moved into HeroSection hero-content)
- Sections after hero wrapped in `position: relative; z-index: 5; background: #F5F0E8`

---

## Project Overview

**Product:** DripUp — AI-powered seller management platform for Indian fashion sellers on Shopify
**Goal:** Single-scroll landing page whose only purpose is to get the viewer to click "Watch it in action" → `/demo`
**Stack:** Next.js 16 (Pages Router) + Tailwind CSS v4 + GSAP with ScrollTrigger + Three.js (WebGL)
**Fonts:** Figtree (body/labels) + EB Garamond (headings)
**Repo:** https://github.com/saumik111/dripup-landing

## Design System Summary

| Token | Value |
|-------|-------|
| Background | `#F5F0E8` cream |
| Accent | `#1A3D35` forest green |
| Text primary | `#1C1C1A` ink |
| Text secondary | `#6B6860` stone |
| Heading font | EB Garamond, weight 500, normal |
| Body/UI font | Figtree, weight 500 |
| H1 size | `clamp(2rem, 4vw, 3.5rem)` |
| H2 size | `clamp(28px, 3.5vw, 48px)` |
| Hero glass panel | `rgba(255,255,255,0.04)` + `blur(6px)` + white border 0.28 |
| Section padding | 128px top/bottom |
| Max content width | 1200px |

## Outstanding Items
- Mobile responsive breakpoints not implemented (desktop-first)
- Feature card UI mockups are skeleton placeholders — real screenshots pending
- CTASection still uses `/images/hero-bg.png` as background — same as hero
- `/demo` page is a placeholder
