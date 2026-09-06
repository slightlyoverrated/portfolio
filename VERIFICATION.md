# Authorship refinement verification — 6 September 2026

## Scope and recovery

Refined the existing portfolio from commit 9e5592ce2c6885769daac6b149af56fccfe9796c on codex/portfolio-authorship. The starting tree was clean. backup/pre-authorship-pass preserves that version. The older backup/pre-astra-portfolio-revamp branch, pre-astra-portfolio-revamp tag and local Git bundle remain intact.

Preserved section order, React/Vite architecture, green/paper typography, academic facts, local fonts, university photographs, GitHub Pages configuration, navigation, Quick View, accessible statement and reduced-motion controls. No runtime dependency was added.

## Changes reviewed

- Simpler factual hero; removed its decorative circuit illustration.
- Transcript-style academics: readable grades, plain SAT figures and retake note; removed subject cards and milestone pills.
- Clean personal statement document with the existing scroll typing and one caret. Removed surrounding engineering motifs and decorative shadow.
- OrderFlow workflow explanation replaces the simulated interface. KRUNG keeps its source/person/event/research relationships.
- Explicit real-screenshot and development-record placeholders for both projects. No fabricated screens, bugs, code, schema or project history.
- A genuine two-line source excerpt from this portfolio is linked to its immutable Git commit in a small disclosure.
- Static achievement list, underlined toolkit controls, documentary activity photograph slot and unrotated community contact sheet.
- Removed oversized slogans, repeated section indexes, decorative motion, most rounded containers and pill treatments. Supporting sections use varied spacing and quieter headings.
- Four main scroll sequences remain: statement, OrderFlow, KRUNG and the study path.

## Verification performed

- npm run check: TypeScript and oxlint passed.
- Production Vite build with GITHUB_ACTIONS=true and GITHUB_REPOSITORY=slightlyoverrated/portfolio: passed.
- All 14 built files fetched successfully under /portfolio/, including fonts, scripts, CSS and campus images. No QA fixtures are in the production bundle.
- Desktop visual review throughout the page at 1280×720; production academic layout reviewed at 1440×900.
- Mobile review at 390×844: hero, IGCSE/AS/SAT/IELTS, statement, both project interactions, achievements, toolkit, activities, community, study path and contact. Narrow 320×740 requested viewport also checked (browser rounded to 321 CSS pixels).
- No horizontal overflow or offscreen headings found. A mobile tool-evidence tooltip clipped left during review; fixed its containing block and verified its bounds afterward.
- All internal anchor targets resolve. Mobile menu moves focus into navigation; Escape closes it and returns focus to the toggle.
- Statement scroll reveal advanced from 78 to 265 of 360 words in the desktop check, with one caret. Full-text override reveals all text. Mobile uses no heading pin.
- OrderFlow direct stage selection and scroll-driven progression verified. KRUNG node selection updates its explanation. SVG relationship paths complete on scroll.
- Source disclosure opens correctly; opening/closing it refreshes downstream scroll positions.
- Toolkit evidence, footer pause/resume and Quick View entry/exit checked. Quick View exposes full statement text, removes pin spacers and hides the large evidence placeholders.
- Controlled local media-query harness: initial reduced state shows full text and zero pins; preference change enables motion and one desktop pin; changing back restores full text and zero pins. The operating system's preference was not changed.
- Browser console inspection: no runtime errors or warnings.

Approximately 363 KB JavaScript / 123 KB gzipped, 46.5 KB CSS / 9.9 KB gzipped, and 52.4 KB local fonts. Existing campus images remain lazy-loaded.

## Evidence still to be supplied

Real OrderFlow/KRUNG screenshots and development records; KRUNG's exact stack; hardware build evidence; activity and service photos/captions; certificate copies; GitHub/OrderFlow/email/CV links; IELTS result. All are explicit pending items or empty configurable fields. See README.md and docs/PROJECT-EVIDENCE.md for updates and restoration instructions.

Post-deployment commit, workflow result and public-asset verification are recorded in work/authorship-deployment-report.md.
