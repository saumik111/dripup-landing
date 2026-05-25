@AGENTS.md

# DripUp Landing Page — Claude Working Instructions

## Git / Version Control Rules

- **Commit after every meaningful change.** After each feature, fix, or section build, run `git add` + `git commit` with a clear message.
- **Push to GitHub after every commit** unless the user says otherwise. Remote: `https://github.com/saumik111/dripup-landing`
- **Tag approved versions.** When the user says "save this as a version" or "I like this", create a git tag: `git tag -a v<number> -m "<description>"` and push it: `git push origin --tags`. This lets us restore any approved state cleanly.
- **Never force push to main.** If something breaks, branch off the last good tag and fix forward.
- **Before any large change**, check `git status` to confirm the working tree is clean. If it isn't, commit or stash first.

## Work State Log

This section is the live state of the project. Update it after every session. It must reflect what has been done — not just what the user asked for, but all internal decisions, fixes, and reasoning.

---

### Session 1 — 2026-05-25 — Initial Setup + All Sections Built

#### What the user asked for
- Initialize a Next.js project called `dripup-landing`
- Install GSAP + @gsap/react
- Clean boilerplate, set up Tailwind config, folder structure, Git, GitHub

#### What was done (including internal decisions)

**Project init:**
- Ran `create-next-app@latest` — CLI defaulted to TypeScript despite `--no-typescript` flag (Next.js 16 behavior)
- Manually converted all `.tsx` → `.js` files, removed `tsconfig.json`, added `jsconfig.json` for `@/` path alias
- Removed TypeScript devDependencies, installed `gsap` + `@gsap/react`
- Tailwind v4 was installed (not v3) — uses CSS-based config by default. Added `@config "../tailwind.config.js"` directive in `globals.css` to wire up a standard `tailwind.config.js` for design tokens
- Git was auto-initialized by `create-next-app`. Made first commit: `initial project setup`
- Created GitHub repo `saumik111/dripup-landing` via API, pushed to `main`

**Design system:**
- Added all custom tokens to `tailwind.config.js`: colors (cream, forest-green, ink, stone, glass variants, 4 feature card backgrounds), font family (Geist), font sizes (h1–caption), spacing (xs–section), border-radius (tag/input/card/panel/btn)
- `globals.css`: imports Tailwind, wires tailwind.config.js, imports Geist from Google Fonts, resets margins/padding, sets body background to cream + Geist font

**Components built:**

`HeroSection.js`
- Fullscreen `<video>` tag with autoPlay/muted/loop/playsInline, src=`/videos/hero-bg.mp4` (user needs to drop file in)
- Semi-transparent overlay (rgba 0,0,0,0.18) for text legibility
- Logo "DRIP UP" top-left absolute positioned
- H1 + H2 above the glass panel, responsive with clamp()
- Glass panel: `rgba(245,240,232,0.65)` + `blur(12px)` + `0.5px solid rgba(200,195,185,0.4)` + `border-radius:24px`
- Glass panel interior: 2-column grid — left=chat bubbles, right=mock product UI
- GSAP timeline (repeat:-1) cycles through 4 chat items: prompt fades+slides in → response fades in → hold 2s → both fade out → next item
- Right side mock UI: 3 skeleton rows + "Ready to publish" bar, animates in sync with chat (scale 0.9→1)
- CTA bar: styled as a fake chat input (rounded pill, placeholder "Tell me what…."), actually an `<a>` tag linking to `/demo`

`ProblemSection.js`
- Cream background, full viewport height
- Centred 2-line headline: "Your ambitions can't wait / But admin work eats your entire day"
- 15 chaos tags (real seller admin tasks), absolutely positioned at centre, opacity:0 initially
- ScrollTrigger 1 (top 40%): tags scatter outward with random x/y/rotation using `TAG_POSITIONS` array, staggered 0.04s each
- ScrollTrigger 2 (80% center): tags explode outward in circular pattern (angle = index/total * 2π, distance 160-220vw), opacity→0
- Tags styled: `#1A3D35` background, `#F5F0E8` text, `border-radius:4px`

`SolutionSection.js`
- Cream background, 128px vertical padding
- Headline "Chat with Drip Up..." + subline, fade-in on scroll (gsap.from children, stagger 0.1s)
- Product UI card: white background, tabs (Summary / Insights / Artifacts), 3 report rows with colored dot indicators + Download buttons, subtle shadow

`FeatureCards.js`
- 4 cards, each `position:absolute inset:0`, background from warm family (Linen→Sand→Stone→Taupe)
- Cards 1-3 start at `y:100vh`, card 0 is base (visible)
- GSAP ScrollTrigger: pins the wrapper, `end: +=400%`, scrub:0.6, each subsequent card slides up to y:0 on scroll
- `onLeave` callback fires `onReady()` prop → triggers CTA section to appear
- Each card: 2-column grid (text left, UI card right)
- 4 inline UI mockups: PhotoshootsUI (3 image placeholders + publish bar), ListingsUI (3 checked rows + push button), InsightsUI (4 alert rows with colored dots + Fix buttons), AnalyticsUI (tabs + 3 report rows)

`CTASection.js`
- Hidden (opacity:0) until `visible` prop becomes true (set by FeatureCards onLeave)
- Own `<video>` tag (same `/videos/hero-bg.mp4` src) — plays independently in this section
- GSAP: section fades in, glass panel scales from 0.95→1
- Glass panel: same spec as hero panel, contains H2 "Tell Drip Up what to do" + H3 "And it manages the rest" + green CTA button "Watch it in action" → `/demo`
- Button hover: forest-green → forest-light (#2D5E52)

`pages/index.js`
- Imports all 5 sections, passes `heroVideoRef` to HeroSection, `ctaVisible` state + setter to FeatureCards/CTASection

`pages/demo.js`
- Placeholder page at `/demo` so CTA links don't 404

#### Internal decisions / reasoning log
- Used `position:absolute inset:0` for feature cards (not fixed) so they stack within their pinned container correctly
- Used `scale: "0.9"` string on rightImageRef initial set because GSAP handles it, but switched to gsap.set in useEffect for correctness
- CTASection gets its own `<video>` element rather than moving the hero video element, because the hero video is pinned in the DOM in a different scroll position — reusing the ref would cause layout issues
- `@config` directive in Tailwind v4 CSS is the correct way to bridge to a JS config file — without it, Tailwind v4 ignores tailwind.config.js entirely
- jsconfig.json `@/*` → `./*` maps `@/styles/globals.css` to `./styles/globals.css` from project root, which is correct for Pages Router

#### Outstanding items
- `public/videos/hero-bg.mp4` — user needs to provide this file
- Product UI mockups are all inline skeleton code — will be replaced with real screenshots when user provides them
- Mobile responsive breakpoints not yet implemented (desktop-first for now)
- No actual ScrollTrigger for CTA section cards-exit animation yet (currently triggered by FeatureCards onLeave — may need refinement)

---

## Project Overview

**Product:** DripUp — AI-powered seller management platform for Indian fashion sellers on Shopify  
**Goal:** Single-scroll landing page whose only purpose is to get the viewer to click "Watch it in action" → `/demo`  
**Stack:** Next.js 16 (Pages Router) + Tailwind CSS v4 + GSAP with ScrollTrigger  
**Font:** Geist (400, 500 only)  
**Repo:** https://github.com/saumik111/dripup-landing  

## Design System Summary

| Token | Value |
|-------|-------|
| Background | `#F5F0E8` cream |
| Accent | `#1A3D35` forest green |
| Text primary | `#1C1C1A` ink |
| Text secondary | `#6B6860` stone |
| Glass panel | `rgba(245,240,232,0.65)` + `blur(12px)` |
| H1 | 72px / 500 / lh 1.05 |
| H2 | 48px / 500 / lh 1.1 |
| H3 | 32px / 500 / lh 1.2 |
| Body | 18px / 400 / lh 1.6 |
| Section padding | 128px top/bottom |
| Max content width | 1200px |
