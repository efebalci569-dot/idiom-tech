# Idiom-Tech — Interactive English Vocabulary & Idiom Learning Platform

An educational web platform that helps high school students explore English
vocabulary, idioms and phrasal verbs through organized content, clear
explanations and interactive detail panels. All UI text is in English; Turkish
meanings and translations appear inside each entry.

**Live demo (after publishing):** update `src/config/site.ts` with the real URL —
the QR code on the About page regenerates automatically.

## Contents

- **118 vocabulary words** (`src/data/vocabulary.json`)
- **36 idioms** (`src/data/idioms.json`)
- **40 phrasal verbs** (`src/data/phrasal-verbs.json`)
- Pages: Home, Vocabulary, Idioms & Phrasal Verbs, Favorites, About
- Favorites saved in `localStorage` (same browser, survives refresh)
- Fully responsive: desktop two-column layout, mobile bottom-sheet detail panel

## Tech stack

React 18 + TypeScript + Vite 6 · React Router (HashRouter) · Lucide icons ·
`react-qr-code` · organized plain CSS (design tokens in `src/index.css`, no
framework required — fast on mobile connections).

## Setup & run

Requirements: **Node.js 18+** and npm.

```bash
npm install     # install dependencies
npm run dev     # local development server (http://localhost:5173)
npm run build   # type-check + production build into dist/
npm run preview # serve the production build locally for testing
node scripts/validate.mjs  # content quality gate (schema, counts, required entries)
```

Adding new content: append a record to the matching JSON file using the existing
schema (`id`, meanings, `definition`/`definitionEn`, `examples` with
`sentence` + `translation`, `level`, `topics`/`usageContext`, `source`). No code
changes needed. Then run `node scripts/validate.mjs` and `npm run build`.

## Publishing to GitHub Pages (HTTPS, QR-ready)

The project is pre-configured for trouble-free GitHub Pages hosting:

1. `vite.config.ts` uses `base: './'` (relative asset URLs — works for both
   project sites and user sites) and routing uses **HashRouter** (`#/vocabulary`),
   so page refreshes and direct links never 404. No server config needed.
2. Create a GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Idiom-Tech v1"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
3. Deploy the built site:
   ```bash
   npm run deploy
   ```
   (runs `npm run build` then publishes `dist/` with the `gh-pages` package).
   Or: upload the contents of `dist/` manually in any static host.
4. In the repo: **Settings → Pages → Deploy from branch → `gh-pages` branch**.
   Your public address will be `https://<user>.github.io/<repo>/` (HTTPS).
5. **Activate the QR code:** put that exact address into `SITE_URL` in
   `src/config/site.ts`, rebuild and redeploy:
   ```bash
   npm run deploy
   ```
   The About page (“Open on Your Phone”) will then render a scannable QR code
   with the caption “Scan to Explore Idiom-Tech”. Test it with 2–3 different
   phones before printing the exhibition poster. Until `SITE_URL` is set, the
   page honestly shows “QR code coming after publishing” instead of a fake code.

## Test report (v1)

Automated content gate (`node scripts/validate.mjs`): **passed** — 118 words,
36 idioms, 40 phrasals; schema complete (meanings, definitions, examples +
translations); ids unique; required entries present (featured words/idioms,
E-letter set, B-letter sets); Turkish search “fırsat” → Opportunity; letter
filter E returns only E-words.

Manual checklist against the project spec:

| # | Scenario | Result |
|---|----------|--------|
| 1 | Home → Vocabulary navigation | ✅ pass |
| 2 | Letter “E” lists only E-words (Earn, Education, Effect, Effort, Environment, Experience…) | ✅ pass (logic covered by gate) |
| 3 | Clicking a word opens correct TR meaning + example in side panel | ✅ pass |
| 4 | Turkish meaning search (“fırsat” → Opportunity) | ✅ pass |
| 5 | Idiom click shows correct explanation | ✅ pass |
| 6 | Idioms / Phrasal Verbs tabs independent, filters reset on switch | ✅ pass |
| 7 | Favorites survive page refresh (localStorage) | ✅ pass (separate Word/Expression sections) |
| 8 | Quiz scoring | ⏭️ **deferred** — quiz ships in v2 (see below) |
| 9 | Mobile use (responsive layout, bottom-sheet panel) | ✅ pass (CSS breakpoints at 960/640px; verify on a real phone after deploy) |
| 10 | Empty search shows friendly message + reset | ✅ pass |
| 11 | QR opens the correct page | ⏳ pending real URL (see publishing steps) |
| 12 | No cross-category data leaks when switching pages | ✅ pass (separate data files, filters, favorites kinds) |
| 13 | Keyboard: search, filters, Esc closes panel, visible focus | ✅ pass |
| 14 | Corrupt/missing fields don’t crash (safe reads, empty states, storage try/catch) | ✅ pass |

## Not yet implemented (planned v2)

- **Mini Quiz page** (10 questions from real data, shuffled options, score screen)
- Final QR activation (needs the real published URL)
- Project team names on the About page (to be provided by the owners)
- Optional: level/topic filters on the Idioms page (level filter exists), pagination
  if the dataset grows past ~1000 entries
