# Marlow: working rules for Claude

The repo is the source of truth. The site has no build step: edit `index.html`, `content/book.js` and `sw.js` directly.

## Every change
- Bump the cache version in `sw.js` (`CACHE = PREFIX + "vNN"`) whenever `index.html` or `content/book.js` changes, or returning visitors keep the old page.
- Run `npm test` before committing (first time: `npm install && npx playwright install chromium`). `tests/flows.js` takes about 10 minutes; run single suites with `npm run test:<name>` while iterating.
- Add or update a test in `tests/` for any behavior you change. GitHub Actions runs `npm test` on every push.
- Update `README.md` when a page, record, or price changes.

## Writing rules (all copy, docs, commit messages)
- No em dashes. Never use the word "intersection".
- BLUF first, plain and dense, no filler.
- All passages are original, or public domain (published before 1929) with the author named.
- Checkpoint (comprehension) passages are confidential: never put them in the site, the book, or this repo.
- Do not attribute teaching methods to named institutions (Jane Street, DLI, CIA, Harvard, Stanford, Oxford, Cambridge) unless verified. Franklin, Richards Heuer, and the Oxbridge tutorial are the only ones cited.

## Do not change without asking Jamie
- The hero lede with "guarantee the result", and the guarantee section.
- The pricing headline "Priced on outcomes, not hours. Prices do not move."
- Prices, the access gate (`GATE`, `ACCESS` code hashes), and the contact email.
- Positioning: Marlow is a product people buy as a package, not tutoring hours.

## How the app stores data
- Everything is in `localStorage` under `pr-` keys, listed in `PR_RECORD` / `PR_LIST`. A new record must be added there or export, import, and `validateProgress` will drop it.
- Routing is by hash: the part before the first `-` is the view, so a section id must not start with another view's name.
- The pattern coach is heuristic and still approves some wrong answers (see `tests/coach.js` held-out results). Do not tune tests to hide that.

## Measurement rules
- A written answer is never labeled correct. `checkTask` returns `checked` for an open task that passes the pattern check; only a sentence pick or a multiple choice can be `good`. `tests/coach.js` fails the build if this changes.
- Use the metric dictionary (`firstRate`, `cleanRate`, `sessCells`): keyed first check, keyed no hint, written check passed. Do not add a figure that mixes keyed and written tasks.
- A causal answer key states its assumption. "Rules out" is for what cannot be true (timing); everything else weakens, on an assumption the feedback names.
- A new stored record needs a schema in `REC_OK` and a test that a malformed one is refused.
- Recovery order is fixed: copy the original to a `marlow-q-` key, read it back, and only then write the repaired record. Never remove or overwrite a stored record whose copy has not been verified, and never clip a recovery copy.
- `FILE_MAX` and `ATT_BUDGET` are the only size limits. Any new record that can grow needs a cap that keeps a saved file under `FILE_MAX`, and a test that its own backup reloads.
- A passed pattern check ends in the comparison step, never in a Next button.
