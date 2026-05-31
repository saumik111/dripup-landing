# Website Audit: http://127.0.0.1:3010
**Date:** 2026-05-31
**Scope:** /, /demo, /founder, /ask
**Mode:** full

## Verdict
Not ready to ship publicly. The desktop landing page loads, scrolls, and the FAQ interaction works, but the mobile homepage renders Next's client-side exception screen and the Ask CTA routes to a 404. Fix the mobile StickyCards hydration/render path first, then finish the CTA destinations.

## Scorecard
| Area | Grade | Reason |
|---|---|---|
| Browser health | C | Desktop did not show the app-error screen, but mobile home logged `removeChild` errors and rendered Next's client-side exception screen. |
| Performance | B | See transfer/request metrics and largest resources below. |
| Mobile UX | D | The mobile homepage crashes into the application error screen, so the main landing experience is unusable on mobile. |
| Accessibility basics | B+ | h1 and interactive-name checks were run; this is not a full WCAG audit. |
| Product flow | C | CTA destination quality is the main risk. |

## P0/P1 Issues
- **P1 Product flow /ask:** The navbar and FAQ CTA link to /ask, but the audited route returns HTTP 404. Impact: A primary exploration path breaks when a visitor tries to ask Drip Up what it can do. Recommendation: Create the /ask route or temporarily remove/redirect the Ask CTAs until the page exists.
- **P1 Browser health / (mobile):** The rendered page shows Next's client-side exception screen. Console includes NotFoundError: Failed to execute 'removeChild' on 'Node'. Impact: The visitor cannot use the landing page on this viewport. Recommendation: Stabilize the mobile StickyCards render path so desktop ScrollTrigger DOM is not created and replaced during mobile hydration.

## All Issues
- **P1 Product flow /ask:** The navbar and FAQ CTA link to /ask, but the audited route returns HTTP 404. Impact: A primary exploration path breaks when a visitor tries to ask Drip Up what it can do. Recommendation: Create the /ask route or temporarily remove/redirect the Ask CTAs until the page exists.
- **P1 Browser health / (mobile):** The rendered page shows Next's client-side exception screen. Console includes NotFoundError: Failed to execute 'removeChild' on 'Node'. Impact: The visitor cannot use the landing page on this viewport. Recommendation: Stabilize the mobile StickyCards render path so desktop ScrollTrigger DOM is not created and replaced during mobile hydration.
- **P2 Product flow /demo:** The Early access CTA routes to a page that only says 'Demo coming soon'. Impact: High-intent visitors cannot complete the early-access/onboarding action promised by the CTA. Recommendation: Replace the placeholder with an early access form, waitlist flow, or clear interim contact path.
- **P2 Performance /:** Desktop home transferred 6.8 MB. Impact: Large first-load transfer can slow the landing page on mobile and weaker networks. Recommendation: Optimize large images, preload only critical assets, and review animation/image payload.
- **P2 Performance / mobile:** Mobile home transferred 6.8 MB. Impact: Mobile users pay the same heavy asset cost as desktop. Recommendation: Serve smaller responsive images and avoid loading desktop-only media on mobile.
- **P3 Product flow /founder:** The Contact the founder CTA routes to a placeholder page. Impact: The link works, but the visitor still cannot contact the founder from that page. Recommendation: Add a minimal founder contact page with a clear method of contact when ready.
- **P3 Accessibility basics /demo (desktop):** No h1 was found in the rendered DOM. Impact: Screen reader and search context are weaker without a clear page-level heading. Recommendation: Promote the main page title to h1 or provide an accessible equivalent.
- **P3 Accessibility basics /demo (mobile):** No h1 was found in the rendered DOM. Impact: Screen reader and search context are weaker without a clear page-level heading. Recommendation: Promote the main page title to h1 or provide an accessible equivalent.

## Performance Summary
| Page | Viewport | Status | FCP ms | LCP ms | Full load ms | Requests | Transfer |
|---|---|---:|---:|---:|---:|---:|---:|
| / | desktop | 200 | 620 | n/a | 959 | 18 | 6.77 MB |
| / | mobile | 200 | 384 | n/a | 673 | 21 | 6.78 MB |
| /demo | desktop | 200 | 292 | n/a | 381 | 11 | 126 KB |
| /demo | mobile | 200 | 232 | n/a | 321 | 11 | 126 KB |
| /founder | desktop | 200 | 284 | n/a | 349 | 11 | 126 KB |
| /founder | mobile | 200 | 896 | n/a | 975 | 11 | 126 KB |
| /ask | desktop | 404 | 284 | n/a | 330 | 11 | 127 KB |
| /ask | mobile | 404 | 164 | n/a | 205 | 11 | 127 KB |

## Resource Findings
**desktop home largest resources**
  - link: 4.02 MB - http://127.0.0.1:3010/images/hero-section-bg.png
  - link: 2.40 MB - http://127.0.0.1:3010/images/last-card-bg.png
  - script: 179 KB - http://127.0.0.1:3010/_next/static/chunks/0oifmyrv_q0qn.js
  - script: 91 KB - http://127.0.0.1:3010/_next/static/chunks/0t~ff8-2vxpuk.js
  - script: 27 KB - http://127.0.0.1:3010/_next/static/chunks/04amandw51su~.js

**mobile home largest resources**
  - link: 4.02 MB - http://127.0.0.1:3010/images/hero-section-bg.png
  - link: 2.40 MB - http://127.0.0.1:3010/images/last-card-bg.png
  - script: 179 KB - http://127.0.0.1:3010/_next/static/chunks/0oifmyrv_q0qn.js
  - script: 91 KB - http://127.0.0.1:3010/_next/static/chunks/0t~ff8-2vxpuk.js
  - script: 27 KB - http://127.0.0.1:3010/_next/static/chunks/04amandw51su~.js

## UX And Mobile Findings
- Mobile home did not render the landing page. It showed: "Application error: a client-side exception has occurred while loading 127.0.0.1".
- Console evidence on mobile home: `NotFoundError: Failed to execute 'removeChild' on 'Node'`.
- Likely fix area: `components/StickyCards.js`, where the page initially renders desktop card DOM and then switches to mobile with `matchMedia`.
- Desktop home horizontal overflow: no.
- Mobile horizontal overflow could not be meaningfully assessed on the real landing page because the mobile page crashed before rendering the intended content.
- FAQ first-state desktop: [{"text":"Is Drip Up for my kind of store? -","expanded":"true"},{"text":"How do I get started? +","expanded":"false"},{"text":"Will it make changes to my store without me approving? +","expanded":"false"},{"text":"Is my store data safe? +","expanded":"false"}].
- FAQ after clicking second row: [{"text":"Is Drip Up for my kind of store? +","expanded":"false"},{"text":"How do I get started? -","expanded":"true"},{"text":"Will it make changes to my store without me approving? +","expanded":"false"},{"text":"Is my store data safe? +","expanded":"false"}].
- Screenshots are saved under C:\Users\saumi\Downloads\sellers website\dripup-landing\test folder\2026-05-31\website-audit\screenshots.

## Accessibility Findings
- / (desktop): h1 count 1, unnamed interactive controls 0.
- / (mobile): landing content did not render because of the client-side exception, so the h1 check is not meaningful until the crash is fixed.
- /demo (desktop): h1 count 0, unnamed interactive controls 0.
- /demo (mobile): h1 count 0, unnamed interactive controls 0.
- /founder (desktop): h1 count 1, unnamed interactive controls 0.
- /founder (mobile): h1 count 1, unnamed interactive controls 0.
- /ask (desktop): h1 count 1, unnamed interactive controls 0.
- /ask (mobile): h1 count 1, unnamed interactive controls 0.

## JSON Outputs
- C:\Users\saumi\Downloads\sellers website\dripup-landing\website-audit\2026-05-31\json\summary.json
- C:\Users\saumi\Downloads\sellers website\dripup-landing\website-audit\2026-05-31\json\pages.json
- C:\Users\saumi\Downloads\sellers website\dripup-landing\website-audit\2026-05-31\json\performance.json
- C:\Users\saumi\Downloads\sellers website\dripup-landing\website-audit\2026-05-31\json\resources.json
- C:\Users\saumi\Downloads\sellers website\dripup-landing\website-audit\2026-05-31\json\issues.json

## What Was Not Tested
- Real mobile devices.
- Authenticated or backend-backed onboarding because the current app is a static landing page.
- Production hosting/CDN behavior.
- Full WCAG compliance tooling.

## Next Actions
1. Fix the mobile homepage crash in the StickyCards responsive render path.
2. Create or redirect the /ask page because multiple CTAs currently point there.
3. Replace the /demo placeholder with the actual early-access path or a temporary waitlist/contact flow.
4. Review the 4.02 MB hero image and 2.40 MB final-card image; mobile currently pays the same image cost as desktop.
5. Add real founder-contact content to /founder when the founder section is ready.
