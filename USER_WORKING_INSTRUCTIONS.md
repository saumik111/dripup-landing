# User Working Instructions

This file captures the working preferences and collaboration rules established during the Drip Up landing page work. Use it as a reusable guide for future Codex, Claude, or other AI-agent sessions.

## Core Collaboration Style

- Before executing any meaningful task, first explain what you understood.
- If anything is unclear, ask questions before building.
- Do not silently assume important product, design, routing, backend, or copy decisions.
- After the user confirms, execute the task fully.
- The user likes communication in two forms:
  - clear words that explain what is happening,
  - visual references, screenshots, previews, or mockups whenever design is involved.
- The user wants the agent to take care of the whole workstream, not only code:
  - implementation,
  - testing,
  - cleanup,
  - Git commits,
  - tags when appropriate,
  - handoff notes when needed.
- The user prefers direct, honest diagnosis when something is wrong.
- If another agent or tool made changes, inspect what changed before editing.
- Never overwrite or revert unknown changes without understanding them.

## Execution Protocol

- For design or product changes:
  1. Restate what was requested.
  2. Identify what is clear.
  3. Identify what is unclear.
  4. Ask necessary questions.
  5. Wait for confirmation if the user says not to execute yet.
  6. Execute only after confirmation.

- For bug fixes:
  1. Explain what is happening.
  2. Explain why it is happening.
  3. Explain how it will be fixed.
  4. Then implement the fix.
  5. Verify with build/tests/browser checks.
  6. Commit the fix.

- For simple confirmed changes:
  - make the change,
  - run the relevant build/test,
  - commit if the user expects Git hygiene.

## Git Expectations

- Keep Git clean and intentional.
- Commit completed work.
- Use clear commit messages.
- Do not leave the user with a dirty worktree unless explicitly requested.
- Before starting, check `git status`.
- After finishing, check `git status` again.
- If the user asks for cleanup, organize files without deleting useful context.
- Preserve context files that help future agents understand the project.
- If handing off to another AI agent, create a self-contained handoff brief.

## Folder And Context Management

- Keep the project folder clean.
- Move irrelevant files into structured folders instead of leaving the root messy.
- Do not delete assets or source files just because they are not currently used.
- Keep useful context available for other agents:
  - current project state,
  - design decisions,
  - known issues,
  - recent changes,
  - working instructions,
  - handoff notes.
- Prefer Markdown context files for durable project memory.

## Design Collaboration Preferences

- The user does not want generic design-system application.
- The user wants to discuss visual direction deeply before large design changes.
- Do not treat placeholder UI, placeholder images, or placeholder colors as final.
- If colors are discussed, show them visually when possible; do not expect the user to understand colors from code alone.
- Use references and inspiration carefully:
  - copy the principle,
  - do not blindly copy the surface.
- Premium feel matters.
- Spacing, rhythm, typography, color, and motion should be deliberate.
- Avoid awkward overlaps, accidental line breaks, weak spacing, and elements that feel pasted in.
- If something lacks "kick" or premium depth, propose visual reasons and options before changing.

## Drip Up Design Direction Established

- Drip Up is a landing page for an agentic commerce coworker.
- Drip Up helps sellers manage and sell through online stores.
- The product should feel like a commerce-specific coworker or agent, not a generic SaaS dashboard.
- It is for e-commerce and D2C sellers.
- The visual system should be rethought from the original messy design system.
- Typography:
  - EB Garamond for narrative headings.
  - Inter for body, subtext, labels, and UI.
- Background system:
  - soft blue-white page gradient:
    `linear-gradient(to right, #F0F4FF, #FAFAFA)`
- Buttons:
  - black or ink buttons are part of the system.
  - some CTA buttons should be outline/transparent and turn black on hover when requested.
- Material Design-inspired color thinking is preferred, but not blindly copied.
- Cards should have contextual colors and depth.
- The user likes progressive card color depth inspired by stacked visual references.
- The floral sky background is an important transition/CTA visual.
- Placeholder product UI and images should be treated as temporary.
- Copy is deliberate and should not be casually rewritten.

## Typography Rules Learned

- Keep EB Garamond headings consistent with the design system.
- Do not change heading size casually.
- If one heading is meant to match another, inspect the actual CSS rule and use the same rule.
- Example final CTA heading rule:
  - `font-size: clamp(2rem, 4vw, 3.5rem);`
  - `line-height: 1.15;`
  - `font-weight: 500;`
- Italic emphasis should use the EB Garamond italic treatment.
- If one part of a heading is italic, keep its size visually consistent with the non-italic part unless the user asks otherwise.
- Line breaks should be intentional.
- Do not introduce line breaks in card subtexts unless requested.

## Copy Rules

- Treat user-provided copy as intentional.
- Do not rewrite copy unless explicitly asked.
- If a phrase is requested exactly, preserve casing, punctuation, and wording.
- Examples of exact copy preferences from this project:
  - `Get my early access`
  - `Built just for your brand`
  - `Get access to Drip Up early`
  - `Perfect, we will reach out to you soon !!!`
- If the user says a copy detail is deliberate, protect it.

## Frontend Interaction Preferences

- Animations must not be broken while making design changes.
- WebGL and scroll animations should be inspected before changing related sections.
- Desktop and mobile behavior both matter.
- Mobile should not be treated as an afterthought.
- Check whether sticky card stacks, scroll pinning, and animated sections still work after changes.
- Avoid runtime exceptions caused by server/mobile hydration mismatch.
- For responsive branches, avoid rendering the wrong branch before mount if it causes DOM replacement issues.
- Smooth transitions between sections matter.
- Fade transitions should feel seamless and should blend with the full page background.

## Ask Page Rules

- `/ask` is a minimal chat page in the Drip Up design system.
- It should not use the normal homepage Navbar directly unless requested.
- It should use a homepage-style glass nav when requested.
- Chat conversation should persist while navigating away and back in the same tab/session.
- Chat conversation should reset on page refresh or reopening the tab.
- Daily message limit should remain day-based and separate from chat memory.
- Message limit copy should be:
  - `10 messages left today`
  - `9 messages left today`
  - and so on.
- Placeholder should be:
  - `tell me ...`
- AI messages:
  - left aligned,
  - no bubble,
  - EB Garamond,
  - calm readable line height.
- User messages:
  - right aligned,
  - black pill bubble,
  - Inter.
- AI action buttons should sit below the completed AI response, not inline with the last sentence.
- AI action button label for early access should be:
  - `Get my early access`
- Contact-founder action button should route to the founder/contact page.

## Dynamic Back Navigation

- Back buttons should be dynamic.
- The button text should simply be:
  - `← Back`
- The destination should depend on where the user came from.
- If no source is known, fall back to home.
- Pages reached from `/ask` should be able to return to `/ask`.
- Dynamic routes can use a `from` query parameter such as:
  - `/demo?from=/ask`
  - `/founder?from=/ask`

## Early Access Form Rules

- The early access page is `/demo` for now.
- It should keep the dynamic `← Back` navbar.
- Heading:
  - `Built just for your brand`
  - `your brand` can be italic when requested.
  - Follow heading sizing rules from the design system.
- Subtext:
  - `Get access to Drip Up early`
- Form fields:
  - Name
  - Email
  - Phone number
  - Brand name
- Phone number:
  - default India code: `+91`
  - example should use Indian number format, such as `+91 98765 43210`
  - should not allow normal text characters.
  - if `+91`, validate exactly 10 digits after the country code.
  - support other international regions with a reasonable international validation rule.
- All fields are required.
- Avoid native browser tooltip messages if the user says they are unwanted.
- Use custom validation messages.
- The form card should not feel like weak glass if the user says glass does not look good.
- Use the design-system blue-white gradient panel when requested.
- On successful submit, card should flip with a 3D-style animation.
- Success message:
  - `Perfect, we will reach out to you soon !!!`
  - italic,
  - EB Garamond.

## Backend Rules

- If a form needs to collect real submissions, build a backend route.
- Do not leave real-looking production forms as frontend-only previews.
- Keep secrets in environment variables.
- Never expose backend API keys in browser code.
- Validate data on the server even if the frontend validates it.
- For early access leads, the current intended storage target is Google Sheets.
- Production-grade lead capture should include:
  - API route,
  - server validation,
  - spam protection basics,
  - a reliable storage or notification destination,
  - graceful error state in the UI.

## AI/API Rules

- Gemini is being used temporarily through Google AI Studio.
- The backend AI provider may later move to Bedrock/Claude.
- Do not hardcode API keys into committed source files.
- Do not expose AI keys through `NEXT_PUBLIC_` variables when a server route can protect them.
- Keep model choice configurable through environment variables where practical.
- If the AI is expected to render buttons/actions, define actions explicitly and map them safely in the frontend.

## Skills And Handoffs

- The user wants reusable Codex skills created from useful workflows.
- Skills should be crafted for the user's way of working, not copied blindly.
- Useful skills created/discussed include:
  - frontend design review,
  - website audit,
  - bug resolve,
  - agent-to-agent handoff.
- When handing off to Claude or another agent:
  - include what has been built,
  - current Git state,
  - current design system,
  - user preferences,
  - known issues,
  - next recommended actions.

## Quality Bar

- Run `npm run build` after meaningful frontend or Next.js changes.
- Use browser checks for important UI changes when possible.
- Check desktop and mobile for layout problems.
- Verify links and routes return successfully.
- Verify API routes with direct requests when backend behavior changes.
- Do not claim something is done until it is built and verified.
- Commit completed work with a clear message.
