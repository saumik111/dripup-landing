# Frontend Design Review - DripUp Homepage

Date: 2026-05-31

## 1. Scope Reviewed

- Route: `/`
- Local URL: `http://localhost:3002`
- Source of truth checked:
  - `DESIGN.md`
  - `WORKING_CONTEXT.md`
  - `styles/globals.css`
  - `tailwind.config.js`
  - `components/Navbar.js`
  - `components/HeroSection.js`
  - `components/StickyCards.js`
  - `components/HeroCanvas.js`

Out of scope:
- No implementation changes were made.
- No copy was rewritten.
- No assets were replaced.
- `/demo` visual quality was not reviewed.

## 2. Evidence Captured

Screenshots:

- `captures/desktop_1440x900_top.png`
- `captures/desktop_1440x900_scroll_hero_reveal.png`
- `captures/desktop_1440x900_sticky_cards.png`
- `captures/mobile_390x844_top.png`
- `captures/mobile_390x844_scroll_cards.png`

Data:

- `json/layout_contrast_inventory.json`

## 3. Findings By Severity

### P0 - Mobile sticky cards are not usable

Evidence:
- `captures/mobile_390x844_scroll_cards.png`
- `components/StickyCards.js` uses fixed desktop card geometry: `width: "65%"`, `height: "60%"`, horizontal flex layout, and scroll-linked stacked transforms.

Why it matters:
- On mobile, the UI preview column becomes a thin vertical strip.
- Text is clipped, buttons and rows are partially off-screen, and the card content cannot communicate the product capability.
- This breaks the landing-page story after the hero.

Recommendation:
- Add a mobile-specific stacked card layout instead of reusing the desktop two-column pinned card layout.
- Use text above product evidence.
- Disable or simplify 3D stack transforms on mobile.

### P1 - Mobile hero headline clips horizontally

Evidence:
- `captures/mobile_390x844_top.png`
- `json/layout_contrast_inventory.json` shows the hero `h1` at `x: 40`, width `371` inside a 390px viewport, extending past the visible right edge.
- `components/HeroSection.js` sets heading rows to `whiteSpace: "nowrap"` on both lines.

Why it matters:
- The first product claim is partially unreadable on mobile.
- This violates the responsive rule in `DESIGN.md`: no horizontal clipping.

Recommendation:
- Remove nowrap behavior on mobile.
- Rebuild the hero headline as natural wrapping text or use a mobile-specific line plan.

### P1 - Current visual system conflicts with the approved DripUp direction

Evidence:
- `DESIGN.md` defines a blue-white, Inter-led, Material-influenced landing system.
- `styles/globals.css` still sets body font to Figtree.
- `tailwind.config.js` still defines old cream, forest-green, linen, sand, stone, and taupe tokens.
- `components/HeroSection.js` and `components\StickyCards.js` still use green/cream UI decisions heavily.

Why it matters:
- The implementation has not moved into the new design system yet.
- Future edits will keep drifting unless tokens are reset first.

Recommendation:
- Establish v1 tokens in `globals.css` and `tailwind.config.js`.
- Replace Figtree with Inter for body/UI.
- Keep EB Garamond only if approved for narrative headings.

### P1 - Product evidence is still mostly placeholder UI

Evidence:
- `captures/desktop_1440x900_top.png`
- `captures/desktop_1440x900_sticky_cards.png`
- Hero panel and feature cards use generic skeleton rows, simple check rows, and placeholder tabs.

Why it matters:
- The landing page needs to make the agentic commerce coworker believable.
- Current visuals say "nice mockup" more than "this helps me run my store."

Recommendation:
- Replace placeholders with one strong product-evidence scene first:
  - command input
  - task understanding
  - commerce artifact
  - approval/publish status

### P1 - Navbar includes an `/ask` route that does not exist

Evidence:
- `components/Navbar.js` links to `/ask`.
- `pages/` contains only `/` and `/demo`.

Why it matters:
- A primary nav action sends users to a missing route.
- This undermines trust at the first interaction point.

Recommendation:
- Either remove `Ask`, route it to an existing section/anchor, or create the route intentionally.

### P2 - Small supporting text fails normal AA contrast

Evidence:
- `components/StickyCards.js` uses `#888880` for card sublines on `#F0F3FF`.
- Computed contrast: 3.23:1.

Why it matters:
- The sublines are small text, so they need at least 4.5:1.
- The issue is visible in desktop sticky-card captures where sublines feel faint.

Recommendation:
- Use a darker secondary token from the new system, such as a tuned `--text-secondary`.

### P2 - Typography is split across Figtree, Inter, and EB Garamond

Evidence:
- `pages/_document.js` loads Figtree, EB Garamond, and Inter.
- `styles/globals.css` sets body to Figtree.
- `Navbar.js` uses Inter.
- `HeroSection.js` uses Figtree for product/chat UI.

Why it matters:
- User approved Inter as the UI/body font.
- Product evidence should feel precise and modern, but font drift makes the system feel unfinished.

Recommendation:
- Use Inter globally for body and UI.
- Keep EB Garamond only for narrative headings if approved.
- Remove Figtree from the active system.

### P2 - The command bar looks like an input but is implemented as a link with `cursor: text`

Evidence:
- `components/HeroSection.js` renders the command bar as an `<a href="/demo">`.
- Styling uses `cursor: "text"`.

Why it matters:
- The component visually promises typing, but clicking navigates away.
- The command surface is central to DripUp's brand, so its behavior should be intentional.

Recommendation:
- Decide whether the hero command bar is a CTA, a demo launcher, or an actual input-like interaction.
- Match cursor, label, affordance, and behavior.

## 4. Design-System Conflicts

Current conflicts:

- Design doc says blue-white; implementation still uses forest green and cream as primary identity.
- Design doc says Inter for UI/body; implementation uses Figtree globally.
- Design doc says product-evidence visuals; implementation uses placeholder skeletons and atmospheric flowers.
- Design doc says no mobile clipping; current hero headline and sticky cards clip on mobile.
- Design doc says Material-inspired role model; implementation has no tokenized role system yet.

## 5. Recommended Direction

Build the next pass around a cleaner product proof:

> "A seller gives DripUp a store task, DripUp understands the commerce context, prepares the work, and asks for review before publishing."

Recommended first implementation target:

1. Token reset:
   - Inter body/UI
   - blue-white surfaces
   - blue primary action
   - green only for commerce success/status

2. Hero rebuild:
   - keep the cinematic feeling if desired
   - remove mobile clipping
   - replace generic skeleton with an agent task/product evidence panel
   - make the command surface behavior clear

3. Sticky-card rebuild:
   - desktop: product-evidence cards with real seller tasks
   - mobile: simple stacked cards, no thin clipped UI columns

4. Asset direction:
   - use floral/sky only as provisional atmosphere
   - begin developing commerce-specific UI assets/panels

## 6. Proposed Implementation Plan

After approval:

1. Update design tokens and fonts.
2. Fix mobile layout foundations.
3. Rebuild the hero product-evidence panel.
4. Rebuild sticky cards for desktop and mobile.
5. Run visual QA again at desktop and mobile.
6. Create a scoped Git checkpoint after the approved pass.

## 7. Questions Needing User Confirmation

1. Should EB Garamond stay for narrative headings, or should the page go fully Inter?
2. Should the main CTA become blue now, with green reserved for success/publish states?
3. Should we keep the floral/sky background for one transition pass, or replace it immediately?
4. Should the first product-evidence visual be:
   - product listing creation
   - store task queue
   - product photo generation
   - inventory/order issue resolution
   - review-before-publish workflow

