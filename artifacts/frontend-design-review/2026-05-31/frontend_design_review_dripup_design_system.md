# Frontend Design Review - Drip Up Design System

Session date: 2026-05-31

Project root: `C:\Users\saumi\Downloads\sellers website\dripup-landing`

## Protocol Check

- [BOOT COMPLETE] Project root, lane lock, brand/design sources, screenshot evidence, and artifact sandbox handled.
- [LANE LOCK] Reviewing only the Drip Up design system as expressed by active homepage `/`, active components, `DESIGN.md`, Tailwind config, global CSS, and current assets.
- [COPY LOCK] No copy rewrites approved. Current copy is audited only.
- [PALETTE LOCK] Palette sources compared: user direction, live UI, `DESIGN.md`, `tailwind.config.js`, `globals.css`, active component inline styles.
- [ARTIFACTS] `test folder\2026-05-31\frontend-design-review\`

## Evidence

- Desktop top capture: `captures\desktop_1440x900_top_direct.png`
- Mobile top capture: `captures\mobile_390x844_top_direct.png`
- Contrast JSON: `json\contrast_inventory.json`
- Source evidence:
  - `DESIGN.md`
  - `tailwind.config.js`
  - `styles\globals.css`
  - `components\Navbar.js`
  - `components\HeroSection.js`
  - `components\HeroCanvas.js`
  - `components\StickyCards.js`

Note: Chrome direct screenshots captured top viewport evidence. Scroll-state screenshots through DevTools protocol were attempted but blocked by local headless debug-port startup. Scroll-section findings below are based on active component code and top screenshot evidence.

## Findings

### [P1] Design System: Three Competing Palette Authorities

Evidence:

- `DESIGN.md` defines a warm olive/off-white system: dark olive, off-white, forest green, warm semantic colors.
- `tailwind.config.js` still defines cream, forest, ink, stone, and warm card colors.
- `globals.css` sets the page to a cool blue-white gradient: `#F0F4FF -> #FAFAFA`.
- `StickyCards.js` uses blue-white card surfaces: `#F0F3FF`, `#EBEef8`, `#E6E9F5`, `#E1E4F2`, `#DCDFF0`.
- Current hero/final assets introduce a saturated floral pink/purple/green visual world.

Verdict:

The system has no single color authority. This makes every future design decision unstable: warm olive rules, cool blue cards, floral imagery, and forest-green UI all compete.

Fix:

Create a new `DESIGN_SYSTEM.md` or rewrite `DESIGN.md` around one approved direction. Keep the old document only as historical input.

### [P1] Mobile Layout: Hero Does Not Reflow

Evidence:

- Mobile screenshot shows the nav CTA clipped on the right.
- Hero glass panel overflows horizontally.
- Chat input/action circle is clipped at the right edge.
- `HeroSection.js` uses fixed desktop assumptions: two-column panel, `padding: 0 40px`, panel `maxWidth: 860`, input `maxWidth: 600`, no mobile breakpoint.
- `StickyCards.js` uses fixed `width: 65%`, `height: 60%`, left/right columns, and desktop-scale card layout.

Verdict:

The design system has no responsive rules. This is not a section bug; it is a missing system layer.

Fix:

Define responsive tokens and component behavior: mobile nav, hero panel single-column/compact state, card widths, text scale, and touch target rules.

### [P1] Asset Direction: Decorative Atmosphere Is Carrying Product Meaning

Evidence:

- The hero and final CTA are flower/sky scenes.
- Product UI is represented as skeleton placeholders inside cards.
- Product goal is seller management for Shopify fashion sellers, but the primary imagery does not show seller work, product listings, storefronts, analytics, inventory, or fashion operations.

Verdict:

The assets are visually pleasant but weak as product evidence. They create mood, not comprehension.

Fix:

Develop a new asset strategy: real/realistic product workflow visuals, fashion seller artifacts, Shopify/product management UI, or a branded visual metaphor that still explains the product.

### [P1] Token System Exists In Docs But Not In Implementation

Evidence:

- Most active components use inline styles with hardcoded values.
- Tailwind tokens are stale and partly unrelated to the live blue-white update.
- `DESIGN.md` names CSS variables such as `--dark-bg-base`, but `globals.css` does not define them.
- Radius, spacing, shadows, colors, and fonts are repeated manually across components.

Verdict:

The project has design ideas, but not an operational design system.

Fix:

Define real CSS custom properties in `globals.css` and migrate active components toward those tokens gradually.

### [P1] Small Text Contrast Fails In Card System

Measurement from `json\contrast_inventory.json`:

| Element | Current | Background | Contrast | Verdict |
|---|---:|---:|---:|---|
| Card subline | `#888880` | `#F0F3FF` | 3.23:1 | Fails normal text AA |
| Card subline | `#888880` | `#DCDFF0` | 2.70:1 | Fails normal/large/UI |

Verdict:

The live card subline color is too light for small text, especially on darker blue cards.

Fix:

Either darken subline color, increase size/weight, or change card surface values.

### [P2] Typography System Has Drifted

Evidence:

- `DESIGN.md` says EB Garamond + Figtree.
- `_document.js` loads Figtree, EB Garamond, and Inter.
- Navbar uses Inter.
- StickyCards sublines and mockups use Inter.
- CTA button uses Figtree.

Verdict:

The type system now has three fonts without role clarity. Inter may be useful, but it needs an explicit role.

Fix:

Decide:

- EB Garamond: brand narrative headings.
- Inter or Figtree, not both, for UI/body.
- If both remain, document exact division.

### [P2] Surface/Elevation Rules Are Inconsistent

Evidence:

- Hero glass: `rgba(255,255,255,0.04)`, blur 6px, border 0.28.
- Navbar glass: `rgba(255,255,255,0.06)`, blur 12px, border 0.12.
- Cards: blue surfaces, beige borders, soft shadows.
- UI mockups: white panels on very light blue with low surface contrast.

Measurement:

| Element | Current | Background | Contrast | Verdict |
|---|---:|---:|---:|---|
| White mockup panel | `#FFFFFF` | `#F0F3FF` | 1.11:1 | Weak surface separation |
| Beige border estimate | `#C8C3B9` | `#F0F3FF` | 1.59:1 | Weak non-text contrast |

Verdict:

Glass, card, mockup, border, and shadow rules are not yet a coherent elevation system.

Fix:

Define elevation tiers: page base, card, raised mockup, glass overlay, nav, active CTA.

### [P2] Copy Voice Is Promising But Needs A Ledger

Current useful lines:

- "Grow & manage your shopify store simply by chatting"
- "We handle the boring work, so you can focus on growing"
- "Drip Up connects to your shopify store and takes over all the repetitive tasks"
- "Tell Drip Up what to do and it manages the rest"

Verdict:

The copy has a strong "capable helper" direction, but casing and product specificity need a pass. Example: `shopify` should likely be `Shopify`.

Fix:

Create a copy ledger before rewriting. Preserve approved lines until user confirms alternatives.

### [P2] Information Architecture Leak: `/ask` Link Has No Route

Evidence:

- `Navbar.js` links `Ask` to `/ask`.
- Active pages are `/` and `/demo`.

Verdict:

This is outside the design-system lane, but it affects CTA trust.

Fix:

Either create `/ask`, change it to an in-page action, or remove the secondary nav path.

## What Works

- The one-sentence design brief is strong: "capable partner who handles the boring work quietly."
- EB Garamond for narrative headings gives the page a distinct voice.
- The motion skeleton is valuable: word swap, dissolve, word reveal, cube roll, sticky cards, final expansion.
- Forest green `#1A3D35` has excellent contrast against cream/off-white and can remain a strong action/brand color.
- The spacing scale in `DESIGN.md` is usable as a starting point.
- The idea of showing product UI mockups inside feature cards is correct.

## What Should Be Discarded Or Rebuilt

- Discard `DESIGN.md` as an authoritative source in its current form.
- Discard stale Tailwind color tokens unless they are re-approved.
- Rebuild palette around one direction instead of mixing olive/cream, blue-white, and floral saturation.
- Rebuild mobile rules from the ground up.
- Rebuild asset strategy so visuals explain the product, not just mood.
- Rebuild tokens as actual CSS variables or theme values used by implementation.

## Recommended Next Design-System Structure

Create or rewrite a system with these sections:

1. Brand sentence and emotional constraints.
2. Persona: Indian fashion seller using Shopify, likely time-poor and operationally overloaded.
3. Palette: surface, text, action, semantic, image-treatment roles.
4. Typography: heading, body/UI, labels, numeric/dashboard text.
5. Spacing and layout grid: desktop and mobile.
6. Radius and elevation.
7. Components: nav, hero panel, chat input, sticky card, UI mockup, CTA.
8. Motion: what motion is allowed to communicate.
9. Asset system: what imagery must show, avoid, and support.
10. Copy principles and protected lines.

## Required User Decisions

1. Should the new system keep the floral/sky visual world, or is it temporary?
2. Should Drip Up stay warm olive/cream, move fully into cool blue-white, or become a hybrid with clear roles?
3. Should product UI evidence become the primary asset direction?
4. Should Inter replace Figtree for UI, or should Figtree remain the sole UI/body font?
5. Should the design system be rewritten as `DESIGN_SYSTEM.md` while keeping `DESIGN.md` as historical input?

## Verification Performed

- Read project context, README, active design document, Tailwind config, global CSS, active homepage components.
- Captured desktop and mobile top screenshots.
- Calculated contrast ratios for core palette/text/surface samples.
- Verified active repo boundary and current dirty Git state.

## Not Tested

- Full scroll-state visual capture due local headless browser debug-port issue.
- Hover/focus/keyboard states.
- Final CTA expanded state visually.
- Real device testing.

