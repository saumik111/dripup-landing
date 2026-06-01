# Website Audit: http://127.0.0.1:3010
**Date:** 2026-06-01
**Scope:** /, /demo, /founder, /ask
**Mode:** full

## Verdict
The audited pages load cleanly across the tested desktop and mobile Chrome viewports. No issues were captured by this audit pass.

## Scorecard
| Area | Grade | Reason |
|---|---|---|
| Browser health | A | No runtime exceptions were captured on audited pages; request failures are listed if present. |
| Performance | A | See transfer/request metrics and largest resources below. |
| Mobile UX | A | Mobile was loaded and scrolled in Chrome emulation; overflow findings are listed below. |
| Accessibility basics | A | h1 and interactive-name checks were run; this is not a full WCAG audit. |
| Product flow | A | CTA destination quality is the main risk. |

## P0/P1 Issues
- None captured.

## All Issues
- No issues captured.

## Performance Summary
| Page | Viewport | Status | FCP ms | LCP ms | Full load ms | Requests | Transfer |
|---|---|---:|---:|---:|---:|---:|---:|
| / | desktop | 200 | 356 | n/a | 554 | 23 | 1.07 MB |
| / | mobile | 200 | 332 | n/a | 336 | 23 | 696 KB |
| /demo | desktop | 200 | 668 | n/a | 709 | 15 | 251 KB |
| /demo | mobile | 200 | 76 | n/a | 120 | 15 | 251 KB |
| /founder | desktop | 200 | 120 | n/a | 147 | 15 | 251 KB |
| /founder | mobile | 200 | 80 | n/a | 112 | 15 | 251 KB |
| /ask | desktop | 200 | 196 | n/a | 225 | 15 | 251 KB |
| /ask | mobile | 200 | 160 | n/a | 243 | 15 | 251 KB |

## Resource Findings
**desktop home largest resources**
  - img: 315 KB - http://127.0.0.1:3010/images/hero-section-bg-desktop.webp
  - img: 264 KB - http://127.0.0.1:3010/images/last-card-bg-desktop.webp
  - script: 179 KB - http://127.0.0.1:3010/_next/static/chunks/0oifmyrv_q0qn.js
  - script: 91 KB - http://127.0.0.1:3010/_next/static/chunks/0p4ziyoz21l5u.js
  - css: 35 KB - http://127.0.0.1:3010/_next/static/media/inter-latin-ext-500-normal.0876mliq8ouqp.woff2

**mobile home largest resources**
  - script: 179 KB - http://127.0.0.1:3010/_next/static/chunks/0oifmyrv_q0qn.js
  - img: 103 KB - http://127.0.0.1:3010/images/hero-section-bg-mobile.webp
  - script: 91 KB - http://127.0.0.1:3010/_next/static/chunks/0p4ziyoz21l5u.js
  - img: 81 KB - http://127.0.0.1:3010/images/last-card-bg-mobile.webp
  - css: 35 KB - http://127.0.0.1:3010/_next/static/media/inter-latin-ext-500-normal.0876mliq8ouqp.woff2

## UX And Mobile Findings
- Desktop home horizontal overflow: no.
- Mobile home horizontal overflow: no.
- FAQ first-state desktop: [{"text":"Is Drip Up for my kind of store? -","expanded":"true"},{"text":"How do I get started? +","expanded":"false"},{"text":"Will it make changes to my store without me approving? +","expanded":"false"},{"text":"Is my store data safe? +","expanded":"false"}].
- FAQ after clicking second row: [{"text":"Is Drip Up for my kind of store? +","expanded":"false"},{"text":"How do I get started? -","expanded":"true"},{"text":"Will it make changes to my store without me approving? +","expanded":"false"},{"text":"Is my store data safe? +","expanded":"false"}].
- Screenshots are saved under C:\Users\saumi\Downloads\sellers website\dripup-landing\test folder\2026-06-01\website-audit\screenshots.

## Accessibility Findings
- / (desktop): h1 count 1, unnamed interactive controls 0.
- / (mobile): h1 count 1, unnamed interactive controls 0.
- /demo (desktop): h1 count 1, unnamed interactive controls 0.
- /demo (mobile): h1 count 1, unnamed interactive controls 0.
- /founder (desktop): h1 count 1, unnamed interactive controls 0.
- /founder (mobile): h1 count 1, unnamed interactive controls 0.
- /ask (desktop): h1 count 1, unnamed interactive controls 0.
- /ask (mobile): h1 count 1, unnamed interactive controls 0.

## JSON Outputs
- C:\Users\saumi\Downloads\sellers website\dripup-landing\website-audit\2026-06-01\json\summary.json
- C:\Users\saumi\Downloads\sellers website\dripup-landing\website-audit\2026-06-01\json\pages.json
- C:\Users\saumi\Downloads\sellers website\dripup-landing\website-audit\2026-06-01\json\performance.json
- C:\Users\saumi\Downloads\sellers website\dripup-landing\website-audit\2026-06-01\json\resources.json
- C:\Users\saumi\Downloads\sellers website\dripup-landing\website-audit\2026-06-01\json\issues.json

## What Was Not Tested
- Real mobile devices.
- Authenticated or backend-backed onboarding because the current app is a static landing page.
- Production hosting/CDN behavior.
- Full WCAG compliance tooling.

## Next Actions
1. Run one real-device mobile check before public launch.
2. Connect the preview intake forms to the real inbox or backend when that workflow is ready.
3. Run a dedicated frontend design review for visual polish now that the browser-health pass is clean.
