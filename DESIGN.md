# DripUp Landing Page Design System

This document is the design authority for the DripUp landing page. It is not the product app design system. It explains how the marketing page should present DripUp, the product, as an agentic commerce coworker for online sellers.

## 1. Product Definition

DripUp is an agentic commerce coworker for sellers who sell and manage products through an online store.

The product promise:

> DripUp helps sellers delegate store work through an AI coworker that can understand, execute, and manage commerce tasks.

The landing page must make that promise believable before the user clicks the CTA.

## 2. Landing Page Job

The landing page has one job: make a seller believe that DripUp can become a capable coworker for their online store, then move them toward the demo or trial action.

The page is not a dashboard. It is not the full product UI. It is a persuasive product story supported by believable product-like evidence.

The page should answer:

- What is DripUp?
- What kind of work can I give it?
- Does it understand online selling?
- Can I trust it with real store operations?
- What do I do next?

## 3. Design Thesis

DripUp should feel like:

> A clean blue-white agentic workspace where a seller can hand off online-store work to a capable AI coworker.

Four traits define the page:

| Trait | Meaning | Design consequence |
|---|---|---|
| Capable | It understands commerce work and executes precisely. | Clear hierarchy, measured spacing, product-like panels, no random decoration. |
| Coworker | It works with the seller, not instead of them. | Command surfaces, task feedback, review/approval moments, reassuring copy. |
| Commerce-specific | It is built for online sellers. | Product listings, inventory, orders, creative assets, store status, publishing flows. |
| Calm | It reduces operational load. | Blue-white surfaces, controlled motion, few primary actions, no visual shouting. |

## 4. Audience

Primary audience:

- Online sellers, especially fashion and lifestyle sellers.
- They manage listings, product photos, descriptions, pricing, inventory, orders, store performance, and growth tasks.
- They are overloaded by repetitive work but still want control.

Emotional state:

- Busy.
- Skeptical of vague AI claims.
- Interested in delegation if the system feels competent.
- Needs evidence that DripUp understands selling, not just chatting.

The design must reduce cognitive load. The seller should not have to decode the product from abstract visuals.

## 5. Page Narrative

The landing page story should move through this sequence:

1. **Command** - The seller can ask DripUp to do store work.
2. **Understanding** - DripUp knows the context: product, store, listing, order, performance.
3. **Execution** - DripUp creates, updates, checks, publishes, reports, or recommends.
4. **Control** - The seller can review, approve, and stay informed.
5. **Confidence** - The seller sees that store operations become easier.
6. **CTA** - The seller tries or watches DripUp in action.

Every section should support this sequence. Avoid sections that only look atmospheric.

## 6. Visual Direction

The approved direction is **blue-white**.

The page should feel:

- Bright, clear, and operational.
- Product-real, not purely decorative.
- Calm but intelligent.
- More like a modern AI workspace than a traditional SaaS landing page.
- More commerce-specific than a generic chatbot page.

Use Material Design as a structural influence, not as a visual costume.

Borrow from Material:

- Color roles.
- Surface hierarchy.
- State roles.
- Type roles.
- Component behavior.
- Adaptive layout logic.
- Motion that explains transitions.

Do not copy:

- Generic Google-app styling.
- Default Material component look.
- Over-rounded colorful surfaces that feel like a mobile settings app.
- Dynamic-color gimmicks that weaken brand control.

## 7. Current Asset Direction

The current floral/sky imagery is provisional.

It can remain temporarily if it supports openness, growth, and calm. It must not become the core identity unless explicitly approved later.

The stronger long-term asset direction is product-evidence imagery:

- Agent command surface.
- Store task queue.
- Product listing artifact.
- Generated product photo artifact.
- Inventory or order issue.
- SEO/listing improvement.
- Store performance report.
- Approval before publish.

Future assets should make DripUp's work visible.

## 8. Material-Inspired Role Model

Material Design should influence the landing page through roles:

| Material idea | DripUp landing adaptation |
|---|---|
| Primary | Main CTA or command action. |
| Surface | Page, card, panel, product preview, nav. |
| On-surface | Text and icons on surfaces. |
| Secondary | Supporting action or lower-priority chip. |
| Outline | Subtle separation between surfaces. |
| Error/warning/success | Commerce status states only. |
| Elevation | Layering between page, product panel, card, CTA, overlay. |
| Motion | Reveals state changes and task progress. |

Material gives grammar. DripUp provides the voice.

## 9. Color System

The current implementation pass uses a light blue-white page environment with Material-inspired tonal cards and black primary actions.

Color jobs:

1. **Surfaces** create hierarchy and calm.
2. **Text** creates reading order.
3. **Primary action** tells the seller what to do through black buttons.
4. **Product/status placeholders** communicate state without using the old green system.
5. **Imagery** creates context without fighting the UI.

### Current Palette

These tokens are approved for the current transition pass and may be tuned after visual testing.

| Token | Value | Role |
|---|---:|---|
| `--page-bg-start` | `#F0F4FF` | Left side of the page and WebGL dissolve gradient. |
| `--page-bg-end` | `#FAFAFA` | Right side of the page and WebGL dissolve gradient. |
| `--ink` | `#111318` | Primary text and black CTA buttons. |
| `--ink-soft` | `#252832` | Button hover/pressed state. |
| `--text-primary` | `#171717` | Main readable text. |
| `--text-secondary` | `#4F5B6B` | Subtext and supporting copy. |
| `--text-muted` | `#667386` | Lower-priority UI text. |
| `--surface` | `#FFFFFF` | Product panels and UI mockups. |
| `--surface-soft` | `#F8FAFF` | Soft raised surfaces. |
| `--outline` | `#D6E0F2` | Surface separation. |
| `--card-blue` | `#D8E2FF` | Create card: softened periwinkle for creative production. |
| `--card-mint` | `#BDF0DC` | Expand card: mint for reach, distribution, and freshness. |
| `--card-yellow` | `#FFE066` | Control card: warm alert yellow for operational attention. |
| `--card-peach` | `#FFB090` | Grow card: coral-peach for performance and momentum. |
| `--card-black` | `#111318` | Final/CTA card layer. |

### Color Rules

- Blue-white is the environment.
- Black carries primary CTA actions in this pass.
- The old green is not approved for the current system.
- Green may return later only if a specific status/image system needs it and the shade is reselected.
- Do not use floral colors as UI colors.
- Do not use low-contrast gray for important small text.
- Every status color must have a label, icon, or shape. Color alone is not enough.

### Semantic Colors - Draft

| Token | Value | Use |
|---|---:|---|
| `--success` | `#1A7F5A` | Published, synced, completed. |
| `--warning` | `#B7791F` | Needs attention soon, low stock, quality issue. |
| `--error` | `#C2413A` | Failed sync, missing required content, broken listing. |
| `--info` | `#2563A8` | Suggestion, insight, agent note. |

Use semantic colors only when the seller needs status meaning.

## 10. Typography

Approved UI/body font: **Inter**.

Narrative heading font: **EB Garamond** is allowed for landing-page storytelling if it continues to help DripUp feel human and distinctive.

The product-evidence layer should use Inter only.

### Type Roles

| Role | Font | Size | Weight | Line height | Use |
|---|---|---:|---:|---:|---|
| Hero display | EB Garamond | `clamp(40px, 6vw, 76px)` | 500 | 1.02-1.10 | Main landing statement. |
| Section headline | EB Garamond | `clamp(32px, 4vw, 56px)` | 500 | 1.05-1.15 | Narrative transitions. |
| Product title | Inter | 20-28px | 600 | 1.2 | UI/product evidence panels. |
| Body | Inter | 16-18px | 400 | 1.55-1.7 | Explanatory copy. |
| UI label | Inter | 12-14px | 500-600 | 1.3-1.5 | Chips, nav, field labels. |
| Metadata | Inter | 11-13px | 400-500 | 1.3 | Dates, low-priority supporting text. |
| Button | Inter | 14-16px | 600 | 1 | Primary and secondary actions. |

### Typography Rules

- Use Inter for anything that behaves like product UI.
- Use EB Garamond only for storytelling, not for buttons, labels, chips, or product panels.
- Avoid very light Inter weights for important UI; they feel fragile and can fail contrast.
- Keep letter spacing at `0` for body and UI text.
- Use uppercase labels sparingly.
- If a line is important to conversion, it must be readable without relying on animation.

## 11. Spacing And Layout

Spacing communicates relationship.

Keep the old philosophy, but rebuild around responsive landing sections.

### Spacing Scale

| Token | Value | Use |
|---|---:|---|
| `--space-1` | 4px | Icon-to-label, tiny internal gaps. |
| `--space-2` | 8px | Compact rows, chip padding, tight related items. |
| `--space-3` | 12px | Form/control gaps, compact stack rhythm. |
| `--space-4` | 16px | Product panel internal padding, row gaps. |
| `--space-6` | 24px | Card padding, heading-to-supporting-copy. |
| `--space-8` | 32px | Panel groups, card column gaps on smaller screens. |
| `--space-10` | 40px | CTA separation, large group gap. |
| `--space-16` | 64px | Section internal rhythm. |
| `--space-24` | 96px | Major desktop section rhythm. |
| `--space-32` | 128px | Large editorial breathing room on desktop only. |

### Layout Rules

- Landing sections can be cinematic, but product-evidence panels must feel orderly.
- Use max-width containers deliberately: 1120-1280px for desktop.
- Use 40px desktop side padding, 24px tablet, 16-20px mobile.
- Product panels should align to a grid, not float randomly.
- Mobile must reflow into one column.
- No component should depend on viewport width if text will clip.
- Fixed-format UI previews need stable dimensions with responsive constraints.

## 12. Radius And Shape

Radius should communicate component type.

| Token | Value | Use |
|---|---:|---|
| `--radius-xs` | 6px | Small status chips and internal UI marks. |
| `--radius-sm` | 10px | Inputs, compact rows, small product cells. |
| `--radius-md` | 14px | Product cards, task cards. |
| `--radius-lg` | 20px | Feature cards, hero product panels. |
| `--radius-xl` | 28px | Large landing panels or glass surfaces. |
| `--radius-pill` | 999px | Buttons, command bar, chips only. |

Rules:

- Pill radius is for actions, command inputs, and chips.
- Cards should not become pills.
- Product UI mockups can use tighter radius than marketing containers.
- Large radius should be rare; over-rounding makes the product feel toy-like.

## 13. Elevation And Surfaces

Elevation should show what layer the seller is looking at.

Material inspiration: surfaces gain importance through tonal separation and limited elevation.

### Surface Tiers

| Tier | Surface | Use |
|---|---|---|
| Base | `--page-base` | Page environment. |
| Soft band | `--page-soft` | Section background or scroll transition. |
| Card | `--surface-blue` or `--surface` | Feature card. |
| Product panel | `--surface` | UI evidence, command response, store preview. |
| Raised product panel | `--surface` + border + soft shadow | Active product proof or final CTA panel. |
| Overlay/glass | translucent white + blur | Only when background detail supports depth. |

### Shadow Draft

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(20, 35, 60, 0.06)` | Small product cells. |
| `--shadow-md` | `0 8px 24px rgba(20, 35, 60, 0.10)` | Cards and panels. |
| `--shadow-lg` | `0 18px 50px rgba(20, 35, 60, 0.14)` | Hero/final product evidence. |

Rules:

- Prefer tonal surface changes first, shadow second.
- Shadows should be cool-blue/ink tinted, not muddy beige.
- Borders must meet visual separation needs; avoid beige borders on blue surfaces.
- Glass must not reduce readability.

## 14. Component System

The landing-page system must define both narrative components and product-evidence components.

### Navbar

Purpose: stable orientation and quick CTA access.

Rules:

- Must fit mobile without clipping.
- Primary CTA is visually stronger than secondary action.
- Secondary action must not link to a nonexistent route.
- Glass nav is allowed only if text remains readable over hero imagery.

### Hero

Purpose: explain DripUp in one glance.

Rules:

- Must immediately communicate agentic commerce coworker.
- Hero can be cinematic, but not vague.
- Command/input surface should be a first-viewport signal.
- Product evidence should show seller work, not generic skeletons forever.
- The primary claim must remain readable on desktop and mobile.

### Command Bar

Purpose: show that the seller can delegate work.

Examples:

- "Create a product listing from these photos"
- "Fix low-stock listings"
- "Generate SEO copy for this product"
- "Show what needs attention today"

Rules:

- Command bar is a primary brand component.
- It should feel input-like but clickable when used as a CTA.
- It must be large enough for touch on mobile.

### Agent Task Card

Purpose: show what DripUp understood, did, or is doing.

States:

- Queued
- Working
- Needs review
- Completed
- Failed

Rules:

- Pair state color with text.
- Show commerce object: product, listing, order, image, report.
- Avoid generic "AI magic" language.

### Product Evidence Panel

Purpose: make the product believable without showing final app screens.

Possible modules:

- Store snapshot
- Product listing draft
- SEO improvement
- Generated product image preview
- Inventory alert
- Publishing checklist
- Performance insight
- Approval panel

Rules:

- Looks product-real, but can be stylized for landing.
- Uses Inter only.
- Uses Material-inspired spacing, surfaces, chips, labels, and state.
- Avoid meaningless skeleton placeholders in final design.

### Sticky Feature Cards

Purpose: explain capability categories through scroll.

Rules:

- Each card should pair a capability with product evidence.
- Text left, evidence right on desktop.
- Mobile becomes stacked: text above evidence.
- The card system should use the blue-white surface family.
- Subline contrast must pass normal text AA or be larger/bolder.

### Final CTA

Purpose: close the story with a concrete next action.

Rules:

- Should feel like the seller is about to enter a working relationship.
- Should reuse command/coworker language.
- Final CTA visual should not rely only on atmospheric image.
- CTA button must be visible and reachable on mobile.

## 15. Motion System

Motion is central to this landing page, but it must explain work.

Motion jobs:

1. Reveal what DripUp can do.
2. Show work being handed off.
3. Show task progress or completion.
4. Preserve orientation during scroll.
5. Create confidence, not distraction.

### Existing Motion To Keep As Concepts

- Word swap: useful if it shows the scope of seller work.
- WebGL dissolve: useful if it transitions from atmosphere to product evidence.
- Word reveal: useful for narrative pacing.
- Cube roll: useful if it feels like a conceptual turn, not a trick.
- Sticky cards: useful for capability exploration.
- Final card expansion: useful for closing CTA.

### Motion Rules

- Motion should connect to product meaning.
- Avoid motion that only shows technical cleverness.
- Keep scrubbed scroll animations reversible.
- Provide reduced-motion fallbacks.
- Do not let animation hide essential copy for too long.
- Mobile motion should be simpler than desktop motion.

## 16. Asset System

Assets should support the landing-page story.

### Allowed Asset Types

- Product-like UI panels.
- Commerce artifacts: listings, product photos, catalog rows, orders, inventory, reports.
- Agent task trails.
- Seller workflow moments.
- Abstract blue-white system textures only if subtle.
- Current floral/sky imagery only as provisional atmosphere.

### Avoid

- Purely decorative flowers as the main explanation.
- Generic AI gradients.
- Dark blurred tech backgrounds.
- Stock-looking business people.
- Random dashboards that do not relate to seller work.
- Product mockups that look final but contain fake/nonfunctional nonsense.

### Asset Principle

The viewer should be able to say:

> "This helps me run my store."

If an asset cannot support that sentence, it is probably decorative.

## 17. Copy System

Copy should sound like a capable coworker, not a hype machine.

Voice:

- Clear.
- Concrete.
- Seller-aware.
- Calm.
- Action-oriented.

Avoid:

- "Revolutionary"
- "Supercharge"
- "Unlock your potential"
- "AI-powered solution" without concrete task context
- Exclamation marks
- Vague productivity claims

Prefer:

- "Create listings from product photos."
- "Find what needs attention today."
- "Update prices across your store."
- "Draft SEO-ready product descriptions."
- "Review before publishing."
- "DripUp handles the repetitive store work."

### Current Copy Ledger - Draft

Copy is protected. The words currently on the page were deliberately crafted and should not be rewritten unless the user explicitly asks for copy changes.

| Current line | Status | Notes |
|---|---|---|
| "Grow & manage your shopify store simply by chatting" | Protected | Keep exact wording unless copy is explicitly reopened. |
| "We handle the boring work, so you can focus on growing" | Protected | Keep exact wording unless copy is explicitly reopened. |
| "Drip Up connects to your shopify store and takes over all the repetitive tasks" | Protected | Keep exact wording unless copy is explicitly reopened. |
| "Tell Drip Up what to do and it manages the rest" | Protected | Keep exact wording unless copy is explicitly reopened. |
| "Get my early access" | Protected | Current primary CTA wording in nav and final card. Keep exact wording unless copy is explicitly reopened. |
| "Early access" | Protected | Current collapsed nav CTA label. Keep exact wording unless copy is explicitly reopened. |

No copy should be changed in implementation until approved.

## 18. Responsive Rules

Responsive behavior is required, not polish.

### Mobile Rules

- No horizontal clipping.
- Navbar actions must fit or collapse.
- Hero panel must become single-column or simplified.
- Sticky cards must fit within viewport width.
- Product evidence panels must stack.
- Primary CTA must be at least 48px tall, preferably 52-56px.
- Text must wrap naturally.
- Avoid fixed desktop paddings like 40px inside narrow screens.
- Scroll motion should be shortened and simplified.

### Breakpoint Draft

| Breakpoint | Use |
|---|---|
| `< 480px` | Mobile command-first layout. |
| `480-767px` | Large phone/small tablet, stacked product evidence. |
| `768-1023px` | Tablet, two-column only if content fits. |
| `>= 1024px` | Desktop cinematic scroll layout. |

## 19. Implementation Principles

Implementation should gradually convert hardcoded style decisions into tokens.

Preferred order:

1. Define CSS variables in `globals.css`.
2. Update Tailwind tokens to match the new system.
3. Refactor active components section by section.
4. Replace placeholder product UI with designed landing-page evidence panels.
5. Add responsive rules.
6. Verify desktop and mobile with screenshots.

Do not change every component at once unless the user approves a full redesign pass.

## 20. Open Decisions

Resolved for the current transition pass:

1. EB Garamond remains for narrative headings.
2. Inter is used for subtext, UI, labels, buttons, and product-like panels.
3. Primary CTA buttons are black.
4. The page background remains `linear-gradient(to right, #F0F4FF, #FAFAFA)`.
5. The floral/sky imagery remains for one transition pass.

Still open:

1. What exact product-evidence assets should replace the current placeholders?
2. Should the final CTA remain image-based or become a full product/command scene?
3. Which status/accent colors should be introduced once the placeholder UI becomes real?
4. Whether the active `hero-section-bg-v2.png` should be regenerated larger than 1672x941 for sharper desktop coverage.
