# Marlow

**Read harder texts. Prove what they say.**

Marlow teaches fluent readers who are stuck at a 640 to read the hard stuff: a three-move method, measured on texts they have never seen, guaranteed.

This repository holds the Marlow website and learning app as a single self-contained page.

## What is in it

| Area | Pages |
| --- | --- |
| Public site | Home, Method, How we work, Training, Programs, Book, International (Verbal Edge), Schools, Team, Apply, Policies |
| Learning app | Today (the hub: routine, numbers, next step), Diagnostic, Lesson library, Workspace, Fluency track, Word banks, Worked examples, Practice sections, Sentence unpacking, Tips, Review notebook, Coach report, Tutor view |

### The method

Three moves, taught on every passage:

1. Find the sentence that matters.
2. Ask how far it goes.
3. Write down why.

Eight named errors (overlooked qualifiers, inference beyond the evidence, confusing the author's view with a reported one, outside knowledge, correct answer with the wrong evidence, quotation without a warrant, ignored counterevidence, high confidence on a miss) give the student, the tutor, and the parent one shared vocabulary.

### The app

- **Today** is the hub: the 20-minute routine as a checklist with live status, the six numbers that matter, and one next step chosen from the student's own state (diagnostic first, weekly checkpoint when it is due, practice sets at the right point in the sequence).
- **Diagnostic** measures all three terms of reading: oral reading (speed, accuracy, phrasing), listening comprehension, and reading comprehension, with answer, evidence, reasoning, and confidence captured on every item.
- **Workspace** runs the 20-minute routine: oral warm-up, read, answer with evidence, claim and revise against the evidence coach, closed-book summary, vocabulary retrieval. The coach names the error and never gives the answer; students can flag feedback to a tutor.
- **Fluency track** with a weekly oral reading checkpoint and trend, repeated reading, phrase-cued reading, echo reading, and multisyllabic word attack.
- **Word banks**: 283 words and terms across SAT, ACT, AP Language, AP Literature, GRE, and test verbs, each with definition, parts, near neighbor, and example; 74 root families and 26 affixes with links into the banks; a Families view grouping bank words by shared root; four modes (read, flip, quiz, match); a due-today strip tied to the review notebook.
- **Worked examples** (ten, across SAT, ACT, AP Language, AP Literature, GRE, and GMAT Focus) with step-by-step walkthroughs, the seam in every wrong answer, and an argument map.
- **Practice sections**: the book's two ten-item sections (Set A, nonfiction and literature; Set B, science and two texts), playable timed (13 minutes) or untimed, scored twice (answers, and answers with the right sentence behind them), with the build of every wrong choice and attempt history per set.
- **Sentence unpacking**: the book's thirty-sentence set as a three-step drill (find the load-bearing word, pick the restatement at the right rung, read the unpacking), ten per session, scored per set.
- **Friday report**, built from the student's own log: this week against last week on the five numbers, the pattern the coach saw most, one accepted claim in the student's words, and one thing to ask at dinner. Prints to one page; copies as text.
- **Progress files**: save everything to a JSON file, load it on another device, or start over. No account needed.
- **Review notebook** with spaced vocabulary review, saved claims and summaries, and a reading log.
- **Multimodal**: listen with sentence highlighting, qualifier and argument maps, explain-it-aloud drills, and hands-on matching and ordering.

### The book

The Book page carries the full first draft of *Reading the Hard Stuff* (about 48,000 words): 31 chapters in seven parts (the moves; what moves the needle; applications; structure and voice; reading by domain; for parents; for tutors), plus an appendix with every drill answer, two ten-item practice sections with each wrong choice explained, thirty sentences to unpack with a key, the method on one page, every question family by test, the full root table, the word banks, a 12-week self-study plan, a glossary, and sources. It has a chapter reader with full-text search, read-aloud, and adjustable text size.

## How it works

- `index.html` is the entire site. No build step, no framework, no server.
- `manifest.webmanifest`, `sw.js`, and the icons make it installable from a phone's browser (Add to Home Screen) and usable offline; the service worker is network-first, so a push to GitHub shows up on the next online load.
- The only external resources are two Google Fonts (Newsreader and Source Sans 3).
- Read-aloud uses the browser's built-in speech synthesis.
- All student progress is stored in the viewer's own browser (`localStorage`). Nothing is sent anywhere.
- Light and dark themes. Checked on nine device profiles (iPhone SE through desktop 1920, portrait and landscape): no horizontal overflow, scrollable nav and app bar on phones, stacked tutor roster under 560px, 44px tap targets on touch devices. Scanned with axe-core (WCAG 2.1 AA and best-practice rules) on every view: zero violations.

## Run it locally

Open `index.html` in any modern browser. That is all.

## Publish with GitHub Pages

Repository **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.** The site will be served at `https://<username>.github.io/marlow/`.

## Content

Every passage, poem, question, hint, definition, and example in this repository was written for Marlow. Public-domain works referenced in the lesson library are named with author and year. No material from test makers, publishers, or other programs is reproduced.

The checkpoint passages used to measure students are kept out of this repository on purpose; a passage that is public stops measuring.

## Status

Preview build. Sixteen of 24 lessons are playable (1 to 7, 9, 10, 12, 13, 16, 17, 18, 21, 23), covering every unit and every error the diagnostic can route a student to; the rest show what they teach. Figures on the Coach report and Tutor view are illustrative examples, not real students.

## License

Copyright © 2026 Marlow Reading LLC. All rights reserved. Not licensed for reuse or redistribution.
