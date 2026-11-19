# Marlow

**Read harder texts. Prove what they say.**

**Live demo:** https://jamesplacco.github.io/marlow/

Marlow is for the student who reads fluently, earns A's in English, and is stuck at a 640. That student is not a weak reader. They lose points in three specific ways: they read a qualified claim as an absolute one, they pick the right answer for the wrong sentence, or they take a view the author reports for the author's own. Marlow teaches three moves that fix those errors, and measures the result on texts the student has never seen.

This repository holds the Marlow website and learning app as a single self-contained page, with the checks that test it.

## What is real, and what is not yet

| | Status |
| --- | --- |
| The learning app (diagnostic, all 24 lessons, drills, word banks, reports) | Working, and stored only in the visitor's own browser |
| The book, *Reading the Hard Stuff* | Full first draft, readable on the Book page |
| The evidence coach | Rules, not a reader. The sentence pick and the multiple choice in each lesson are scored outright. The two written answers are matched by pattern and labeled provisional: the coach checks that an answer is about the passage, does not assert the cause the task questions, and does not reverse the verb it is about, and when it is unsure the student can continue with the answer saved for a tutor and not counted as passed |
| Written answers | The coach matches patterns; it does not read. Before a written answer can pass it is checked for a figure or a name that is not in the passage, a change stated in the opposite direction, and (in a story) actions nobody performs; a hedge counts only in the clause it qualifies. A pass on written work is provisional and says what was checked. When the coach cannot confirm an answer, a learner with no coach gets the lesson author's worked explanation and a three-point self-review, recorded as self-reviewed and never as right. A learner who ticks "I work with a Marlow coach" on the Friday page can instead save the answer for the coach, who sees it only when the student sends the progress file. There is no tutor inbox, and the app never says an answer was sent. **Known limit:** on 14 held-out cases written before the fix was run on them, the coach still passed 4 of 10 wrong answers (two wrong attributions, one reversed result, one invented event in the present tense). Pattern matching cannot close that gap |
| The free diagnostic | A provisional screen of answer, evidence sentence, and confidence. It saves the written reasons and does not score them |
| Cohort outcomes | In the Tutor view. Opens several progress files at once and shows the group: sessions, first-check rate and hints per task (early sessions against recent), practice with evidence, oral reading, answers waiting, and who needs attention. Names can be hidden; the table copies or downloads as CSV. A sample cohort of six invented students is labeled as invented. Every figure is a workspace record, not an independent test, and the page says so. On a phone, a student can send the progress file to a tutor from the Friday page with the share sheet. It also reports the share of lesson tasks the coach decided with no tutor, and the answers that needed a tutor per student per week |
| The offer | Three ways to buy, software first: **Marlow** ($495 one time, the whole platform for a student working alone), **The Marlow Program** ($3,980, Marlow plus a certified coach for twenty weeks and the guarantee), and **Marlow for Teams** ($300 a student a year, $3,000 minimum, for tutoring companies and schools). What a family pays for Marlow or the Reading Assessment is credited toward the Program. The Cohort, Membership, adult packages, and tutor certification ($295 a tutor) sit below the three. No hourly rate appears on the site, and a test fails if one returns |
| The gate | The diagnostic, any three lessons, the book, and the drills are free. A fourth lesson or a practice section opens the Get Marlow page (`#unlock`), which takes an access code. `GATE` and `ACCESS` near the top of the script hold the switch and the hashed codes; `node tools/codehash.js YOUR-CODE` prints a hash to add. A link ending in `#unlock-code-YOUR-CODE` unlocks in one step, which is what a payment link should redirect to. Access is stored outside the progress records, so a progress file never carries it and erasing progress keeps it. This is a gate in the page and not a lock: anyone who reads the source can pass it. Real enforcement needs accounts and a server |
| Certification | `#certify`: the course outline and a twelve-question written exam (ten to pass), graded in the page with a note under each miss. A pass is half of certification; the teach-back is graded by a person and requested through the form |
| Checkout | Off. Paste a payment link into `CHECKOUT` in `index.html` and that offer's button on the Programs page becomes a pay button |
| Capacity | Only tutors who can be booked are listed, and no seat shows as open before enrollment opens (`CAP` and `CAP_OPEN` in `index.html`) |
| The request form | Every program button carries its program into the form; the form addresses an adult candidate as one (test, date, time zone); a free-diagnostic result can be attached with the visitor's consent. Does not send anything by itself. It prepares an email for the visitor to send, and says so. Set `APPLY_ENDPOINT` in `index.html` to a form service or backend to turn on real delivery |
| Tutor view and the example six-week report | Illustrations with invented data, labeled as such |
| Results | None published. The founding cohort has not run; no outcome on this site is a measured result |

## What is in it

| Area | Pages |
| --- | --- |
| Public site | Menu: Method, Pricing, For teams, About, Open the app, Start free. Footer: How we work, Training, Adult candidates (Verbal Edge), Schools, Tips, Policies. Plus Home and the request form |
| Learning app | Today (the hub: routine, numbers, next step), Diagnostic, Lesson library, Workspace, Fluency track, Word banks, Worked examples, Practice sections, Sentence unpacking, Transitions and grammar drills, Long reads, Tips, Review notebook, Example report, Tutor view |

### The method

Three moves, taught on every passage:

1. Find the sentence that matters.
2. Ask how far it goes.
3. Write down why.

Eight named errors (overlooked qualifiers, inference beyond the evidence, confusing the author's view with a reported one, outside knowledge, correct answer with the wrong evidence, quotation without a warrant, ignored counterevidence, high confidence on a miss) give the student, the tutor, and the parent one shared vocabulary.

### The app

The app bar is grouped into Today, Learn, Practice, Build, Track, and More; each group shows its own pages on a second row, so sixteen pages fit on one line on a laptop and scroll sideways on a phone.

- **Today** is the hub: the 20-minute routine as a checklist with live status, the six numbers that matter, and one next step chosen from the student's own state (diagnostic first, weekly checkpoint when it is due, practice sets at the right point in the sequence).
- **Diagnostic** measures all three terms of reading: oral reading (speed, accuracy, phrasing), listening comprehension, and reading comprehension, with answer, evidence, reasoning, and confidence captured on every item. Three original passages (science and policy, fiction, history); one gives a first profile, and each further passage adds four items so a recurring pattern can be told from one miss.
- **Workspace** runs the 20-minute routine: oral warm-up, read, answer with evidence, claim and revise against the evidence coach, closed-book summary, vocabulary retrieval. The coach names the error and gives hints; a worked explanation opens only after a real attempt the coach could not confirm.
- **Fluency track** with a weekly oral reading checkpoint on one of twelve passages that appear in no lesson (a 12-week plan never repeats one) and a trend, repeated reading, phrase-cued reading, echo reading, and multisyllabic word attack.
- **Word banks**: 283 words and terms across SAT, ACT, AP Language, AP Literature, GRE, and test verbs, each with definition, parts, near neighbor, and example; 74 root families and 26 affixes with links into the banks; a Families view grouping bank words by shared root; four modes (read, flip, quiz, match); a due-today strip tied to the review notebook.
- **Worked examples** (ten, across SAT, ACT, AP Language, AP Literature, GRE, and GMAT Focus) with step-by-step walkthroughs, the seam in every wrong answer, and an argument map.
- **Practice sections**: the book's two ten-item sections (Set A, nonfiction and literature; Set B, science and two texts), playable timed (13 minutes) or untimed, and Set C in the digital SAT's own format (ten short passages, one question each, 12 minutes), which is not in the book so a first attempt is a first look and several of whose right answers are firm rather than hedged. Each is scored twice (answers, and answers with the right sentence behind them), with the build of every wrong choice and attempt history per set.
- **Sentence unpacking**: the book's thirty-sentence set as a three-step drill (find the load-bearing word, pick the restatement at the right rung, read the unpacking), ten per session, scored per set.
- **Transitions and grammar drills**: forty items in four sets for the half of the SAT's Reading and Writing section that is not passages (transitions, sentence boundaries, agreement and form, notes with a goal). Each item asks for the deciding move first (name the relationship, make the stand-alone test, say what the goal needs) and keeps the choices covered until it is made; scored twice, answers and moves, with a link to the chapter that teaches it.
- **Long reads**: one whole book at the edge, 150 minutes a week. Six free public-domain books (Douglass, Washington, Du Bois, Madison, Thoreau, Austen) or your own, each with what to read, what to watch for, and three questions answered with a quoted line; a session log with a two-sentence closed-book close; a one-line map per chapter; a weekly minutes bar that feeds Today and the Friday report.
- **Since the start**: an outcome log on the Friday report page that sets each student's first measurement beside the latest (oral reading, practice sections, hints per task, right on the first check), marks which figures are assisted and which independent, and copies without the name.
- **Friday report**, built from the student's own log: this week against last week on six numbers (whole-book reading minutes among them), the pattern the coach saw most, one accepted claim in the student's words, and one thing to ask at dinner. Prints to one page; copies as text.
- **Progress files**: save everything to a JSON file, load it on another device, or start over. No account needed. A file is checked whole before anything on the device is touched: every record's type, every lesson and pattern name, every range. Records this version does not use are left out and reported. The previous state is kept as a backup with an undo. A record the browser refuses to store stays in memory, travels in every export, and shows in the app bar as "Not saved: N records. Retry"; the warning clears only when nothing is left waiting. A read-aloud is saved only if it ran at least five seconds and no faster than 400 words a minute; older entries that fail that rule are set aside, labeled, and left out of every figure. Today counts sessions from the session log over the last seven days, and counts lessons once.
- **Review notebook** with spaced vocabulary review, saved claims and summaries, and a reading log.
- **Multimodal**: listen with sentence highlighting, qualifier and argument maps, explain-it-aloud drills, and hands-on matching and ordering.

### The book

The Book page carries the full first draft of *Reading the Hard Stuff* (about 58,000 words): 37 chapters in nine parts (the moves; what moves the needle; applications; structure and voice; reading by domain; for parents; for tutors; the digital SAT, closely; the long reads), plus an appendix with every drill answer, two ten-item practice sections with each wrong choice explained, thirty sentences to unpack with a key, the method on one page, every question family by test, the full root table, the word banks, a 12-week self-study plan, a glossary, and sources. Part Eight covers what most SAT books skip: reading on a screen (stem first, the 90-second rule, scratch paper as a calibration log, the adaptive second module), transitions (ten relationships and the four confusions), rhetorical synthesis (the goal decides, not the facts), and sentence boundaries. Part Nine is how to read a whole hard book, and a reading guide to six public-domain books (Douglass, Washington, Du Bois, Madison, Thoreau, Austen) with what to watch for and three questions each. Chapter 37's quotations were checked against the Project Gutenberg and Avalon Project texts. It has a chapter reader with full-text search, read-aloud, adjustable text size, and a Where to start panel for five kinds of reader.

## How it works

- `index.html` is the site and the app. `content/book.js` is the text of the book, one chapter per line, fetched the first time someone opens the Book page. No build step, no framework, no server. Keep the two files together.
- `manifest.webmanifest`, `sw.js`, and the icons make it installable from a phone's browser (Add to Home Screen) and usable offline; the service worker is network-first, so a push to GitHub shows up on the next online load.
- The only external resources are two Google Fonts (Newsreader and Source Sans 3).
- Read-aloud uses the browser's built-in speech synthesis.
- All student progress is stored in the viewer's own browser (`localStorage`). Nothing is sent anywhere.
- Light and dark themes. Device and accessibility checks are the scripts above, not a claim.

## Checks you can run

```
npm install
npx playwright install chromium
npm test
```

| Script | What it establishes |
| --- | --- |
| `tests/coach.js` | The evidence coach against `tests/coach-fixture.json`: 81 labeled responses. The core set (67) includes the four false approvals from the November 18, 2026 audit and a valid answer and paraphrase for each; it must approve no wrong answer and must pass at least 85% of right answers, so a coach that approved nothing fails. The held-out set (14) was written before the fix was run on it, is reported separately, and never fails the run. The report keeps four numbers apart: wrong answers approved, right answers rejected, right answers abstained on, and the abstention rate. Current result: core 0 approved, 31 of 32 right answers passed; held-out 4 of 10 wrong answers approved, 3 of 4 right answers passed |
| `tests/integrity.js` | The app does not claim more than its code can establish: a retry is never a first check; a repeated lesson adds a session; a repeated practice set is never called unseen; an untimed section keeps its real time; the diagnostic can be completed by keyboard alone, survives a reload, saves every response, and flags a nonsense reason; malformed progress files are refused; a saved file leaves out the application form; erase removes the undo backup; a record the browser refused to save still reaches the file; a lesson left half done resumes after a reload; a tutor can read a student's file without changing their own records; focus moves to the heading of a new page; on a phone the passage and the question are one tap apart; the service worker leaves other projects' caches alone |
| `tests/progress.js` | A bad progress file changes nothing; a good one can be undone; a failed save is visible; the application form never claims receipt; the outcome log compares first against latest |
| `tests/hardening.js` | A progress file can neither run code nor break a page (every imported value that reaches the screen is checked on import and escaped on display); a link cannot invent a lesson or spend a free one; a timed section pauses while the student is on another page and nothing is saved behind their back; a fluency clock stops when the student leaves and never runs twice; a cohort CSV never carries a spreadsheet formula; on a phone a failed save and the text controls are on screen; the founder's credentials keep a readable label column; the test-date planner never gives a phase an end before its start and covers today through test day for any date a week or more out; "today" is the student's calendar day, not the last 24 hours |
| `tests/flows.js` | Every public page, the diagnostic, all 24 lessons, and each app page, end to end in a real browser |
| `tests/a11y.js` | axe-core (WCAG 2.1 AA and best-practice rules) on every view. An automated scan is not a full accessibility audit; keyboard and screen-reader checks are manual |
| `tests/devices.js` | Nine device profiles, iPhone SE to desktop 1920; fails on horizontal overflow |

The same checks run on every push (`.github/workflows/checks.yml`). The fixture's labels were written during development; they should be replaced and extended with real pilot responses, and a second educator should score a sample before they are treated as ground truth.

## Run it locally

Open `index.html` in any modern browser. That is all.

## Publish with GitHub Pages

Repository **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.** The site will be served at `https://<username>.github.io/marlow/`.

## Content

Every passage, poem, question, hint, definition, and example in this repository was written for Marlow. Public-domain works referenced in the lesson library are named with author and year. No material from test makers, publishers, or other programs is reproduced.

The checkpoint passages used to measure students are kept out of this repository on purpose; a passage that is public stops measuring.

## Status

Preview build. All 24 lessons are playable, with at least two for every error the diagnostic can route a student to. Answer keys sit in balanced positions in the diagnostic, the lessons, and all three practice sets, and Sets A and B match the book letter for letter. The book's text is fetched the first time the Book page is opened. The coach accepts a firm claim where a passage states something outright, so calibration is scored in both directions. Figures on the Coach report and Tutor view are illustrative examples, not real students.

## License

Copyright © 2026 Marlow Reading LLC. All rights reserved. Not licensed for reuse or redistribution.
