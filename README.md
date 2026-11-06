# Marlow

**Read harder texts. Prove what they say.**

Marlow teaches fluent readers who are stuck at a 640 to read the hard stuff: a three-move method, measured on texts they have never seen, guaranteed.

This repository holds the Marlow website and learning app as a single self-contained page.

## What is in it

| Area | Pages |
| --- | --- |
| Public site | Home, Method, How we work, Training, Programs, Book, International (Verbal Edge), Schools, Team, Apply, Policies |
| Learning app | Diagnostic, Lesson library, Workspace, Fluency track, Word banks, Worked examples, Tips, Review notebook, Coach report, Tutor view |

### The method

Three moves, taught on every passage:

1. Find the sentence that matters.
2. Ask how far it goes.
3. Write down why.

Eight named errors (overlooked qualifiers, inference beyond the evidence, confusing the author's view with a reported one, outside knowledge, correct answer with the wrong evidence, quotation without a warrant, ignored counterevidence, high confidence on a miss) give the student, the tutor, and the parent one shared vocabulary.

### The app

- **Diagnostic** measures all three terms of reading: oral reading (speed, accuracy, phrasing), listening comprehension, and reading comprehension, with answer, evidence, reasoning, and confidence captured on every item.
- **Workspace** runs the 20-minute routine: oral warm-up, read, answer with evidence, claim and revise against the evidence coach, closed-book summary, vocabulary retrieval. The coach names the error and never gives the answer; students can flag feedback to a tutor.
- **Fluency track** with a weekly oral reading checkpoint and trend, repeated reading, phrase-cued reading, echo reading, and multisyllabic word attack.
- **Word banks** for SAT, ACT, AP Language, AP Literature, GRE, and roots, in four modes (read, flip, quiz, match).
- **Worked examples** (ten, across SAT, ACT, AP Language, AP Literature, GRE, and GMAT Focus) with step-by-step walkthroughs, the seam in every wrong answer, and an argument map.
- **Practice section**: the book's ten-item section, playable timed (13 minutes) or untimed, scored twice (answers, and answers with the right sentence behind them), with the build of every wrong choice and attempt history.
- **Review notebook** with spaced vocabulary review, saved claims and summaries, and a reading log.
- **Multimodal**: listen with sentence highlighting, qualifier and argument maps, explain-it-aloud drills, and hands-on matching and ordering.

### The book

The Book page carries the full first draft of *Reading the Hard Stuff* (about 35,000 words): 30 chapters in six parts (the moves; what moves the needle; applications; structure and voice; reading by domain; for parents), plus an appendix with every drill answer, a ten-item practice section with each wrong choice explained, a 12-week self-study plan, a glossary, and sources. It has a chapter reader with read-aloud and adjustable text size.

## How it works

- `index.html` is the entire site. No build step, no framework, no server.
- The only external resources are two Google Fonts (Newsreader and Source Sans 3).
- Read-aloud uses the browser's built-in speech synthesis.
- All student progress is stored in the viewer's own browser (`localStorage`). Nothing is sent anywhere.
- Light and dark themes, keyboard accessible, works at phone width.

## Run it locally

Open `index.html` in any modern browser. That is all.

## Publish with GitHub Pages

Repository **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.** The site will be served at `https://<username>.github.io/marlow/`.

## Content

Every passage, poem, question, hint, definition, and example in this repository was written for Marlow. Public-domain works referenced in the lesson library are named with author and year. No material from test makers, publishers, or other programs is reproduced.

The checkpoint passages used to measure students are kept out of this repository on purpose; a passage that is public stops measuring.

## Status

Preview build. Five of 24 lessons are playable; the rest show what they teach. Figures on the Coach report and Tutor view are illustrative examples, not real students.

## License

Copyright © 2026 Marlow Reading LLC. All rights reserved. Not licensed for reuse or redistribution.
