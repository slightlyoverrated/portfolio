# Ishan Dubey — university portfolio

A one-page, static React/Vite portfolio deployed to https://slightlyoverrated.github.io/portfolio/.

## Content updates

Edit `src/data/portfolio.ts`. It holds identity, subjects, IGCSE and AS grades, SAT subscores, IELTS status/score, the personal statement, project case studies, skills and their evidence, achievements, activities, community entries, university interests and links.

Unknown GitHub, OrderFlow, email and CV links are intentionally empty. They only render when configured. Relative CV paths are resolved through the Vite base URL. No admission, users, revenue, internships or service activities are invented. The existing portfolio supplied the technology and activity information; school leadership roles remain unspecified.

OrderFlow and KRUNG each have an `evidence` object. Put real screenshots under `public/projects/`, then set `image` to a relative path such as `projects/orderflow/checkout.png`, with an accurate `alt`, `caption` and `description`. Empty images render explicit placeholders. Add a verified development note in `process`; it is empty until actual bugs, earlier versions or code are available. The diagrams explain the documented order workflow and content relationships; they do not claim to be screenshots or backend architecture. OrderFlow lists its supplied tools, while KRUNG lists work involved because its exact stack has not been supplied.

The activity photograph is configured through `activityPhoto` (relative public image path, alt text and caption). Community images use the automatic discovery described below. The small implementation note under the toolkit contains a real two-line excerpt from this portfolio's motion hook and links to its immutable Git commit; it is not presented as evidence from OrderFlow or KRUNG.

Place service photographs in `src/assets/community-service/` and rebuild. Supported extensions: jpg, jpeg, png, webp, avif (upper or lowercase). Images are discovered in filename order. Set `image` to a filename for an explicit match; otherwise unassigned photographs fill the frames automatically, and additional images receive new frames. Fill the accurate captions, organisation, date, role and impact fields and set `placeholder: false` when confirmed. See that folder's README.

## Development and checks

```powershell
npm ci
npm run dev
npm run check
npm run build
```

To reproduce the GitHub Pages build and preview its exact subpath:

```powershell
$env:GITHUB_ACTIONS='true'
$env:GITHUB_REPOSITORY='slightlyoverrated/portfolio'
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Open http://127.0.0.1:4173/portfolio/. The original deployment workflow in `.github/workflows/deploy-pages.yml` deploys pushes to `main`. No server, API, database, authentication or hosting change is required for this portfolio.

## Interaction and accessibility

Persistent anchor navigation, a mobile disclosure menu with keyboard focus and Escape handling, scroll progress, and an accessible full-text personal statement are always available. Four main sequences remain: statement typing with a short desktop heading pin, OrderFlow stage progression, KRUNG relationship lines and the future study path. The supporting sections are static. Buttons allow independent project exploration. Opening the source note refreshes scroll positions. Quick View uses the same document, pauses motion, simplifies diagrams and exposes a print/save PDF action. Reduced-motion preferences are respected at first render and when changed. The footer also offers a motion toggle.

## Recover the version before the authorship pass

The refinement starts from `9e5592ce2c6885769daac6b149af56fccfe9796c`, preserved at `backup/pre-authorship-pass`. To restore that tracked tree on a clean `main`, run `git restore --source=backup/pre-authorship-pass --staged --worktree .`, commit the restoration and push `main`. The older pre-redesign backup below remains available.

## Recover the previous website

Original commit: `d2425389e564c2666e895edaa7c2af4897d9c340`.

Remote backup branch: `backup/pre-astra-portfolio-revamp`.
Remote backup tag: `pre-astra-portfolio-revamp`.
Both were pushed and verified before any redesign edits. The initial working tree was clean. A complete Git bundle is also saved locally at `work/backups/pre-astra-portfolio-revamp.bundle`.

Inspect the previous version without changing `main`:

```powershell
Set-Location D:\WebPortfolio
git fetch origin --tags
git switch --detach pre-astra-portfolio-revamp
```

Restore and redeploy its exact tracked file tree (start with a clean working tree):

```powershell
Set-Location D:\WebPortfolio
git switch main
git pull --ff-only origin main
git restore --source=pre-astra-portfolio-revamp --staged --worktree .
git commit -m "Restore portfolio before Astra revamp"
git push origin main
```

Keep the backup branch, tag and local bundle. The restore creates a normal commit and preserves history.
