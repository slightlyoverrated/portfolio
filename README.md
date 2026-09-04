# Ishan Dubey - Academic Portfolio

A static, responsive student portfolio built with React, TypeScript, Vite, and Tailwind CSS. Production: https://slightlyoverrated.github.io/portfolio/

## Local development

Use Node.js 24 (Node is only a development/build tool).

```sh
npm ci
npm run dev
```

## Production checks

```sh
npm run check
npm run build
npm run verify
npm run preview
```

The deployment output is `dist/`, including `index.html`, relative JS/CSS assets, the existing social preview image, and the CV PDF. Nothing requires a server runtime, database, API, or environment secrets. `scripts/verify-static.mjs` runs offline development/CI checks, including HTTP checks at both `/` and `/portfolio/`; it is not shipped to the browser.

Navigation uses section hashes, so refreshing `.../portfolio/#projects` remains safe. Vite's `base: './'` works at the repository prefix or a domain root. Only canonical/social metadata and external destinations use absolute URLs; runtime assets are relative.

## Content and CV

- `src/data/portfolio.json`: public identity, links, education, results, projects, skills, and involvement.
- `src/components/PortfolioExperience.tsx`: semantic sections and client-only theme/menu/clipboard interactions.
- `app/globals.css`: shared light/dark design tokens and responsive layouts.
- `public/cv/ishan-academic-cv.pdf`: downloadable one-page CV.

The PDF generator is an optional offline authoring utility, not an application dependency. After editing academic details, regenerate with Python and ReportLab, inspect the PDF, and commit it:

```sh
python -m pip install reportlab
python scripts/generate-cv.py
```

The original academic results are retained in the education section's expandable results panel. OrderFlow and Mitra are described as experiments; their demo/repository links are omitted because no public URLs were supplied. Previews are explicitly labelled illustrative concepts, not screenshots or working embedded applications. No unverified school offices, dates, credentials, or competition placements are claimed.

The cinematic navigation has been replaced with ordinary anchor navigation and restrained hover transitions. The interface supports reduced motion, visible keyboard focus, mobile navigation with Escape dismissal, persistent light/dark themes, and email-copy failure feedback. Contact uses `mailto:` and the browser Clipboard API; there is no backend form or analytics.

## GitHub Pages

In repository **Settings > Pages > Build and deployment**, select **GitHub Actions**. Allow Actions to run in **Settings > Actions > General**. `.github/workflows/deploy-pages.yml` builds, verifies, and deploys every push to `main` using the official Pages actions. The `github-pages` environment must permit deployments from `main`.

You can attach a custom domain later through GitHub Pages settings and your DNS provider. Update the canonical/OG/Twitter URLs in `index.html`, the `site` link in `src/data/portfolio.json`, and regenerate the CV afterward. Relative assets need no base-path change.

## Backup and safe rollback

Before the refactor, the original commit `d068e6cabf7b838ddec5c62ede4a0a6297dcec92` was preserved on GitHub as:

`backup/before-academic-refactor-2026-09-04`

A local source archive also exists at `D:\WebPortfolio\work\backups\portfolio-before-academic-2026-09-04.zip` (ignored by Git).

To preview the original without changing the current checkout, use a separate Git worktree after committing or saving your work. To restore production, revert the academic-refactor commit on `main` and push the new revert commit. This retains history and triggers deployment of the original. Avoid force-pushing or resetting the branch. The backup branch remains an exact reference for the original design.
