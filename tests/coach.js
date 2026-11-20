// Runs the coach scoring fixture against the real grading code in index.html.
// Reports false passes and false rejections separately; a single accuracy figure would hide the difference.
// A written answer can pass the pattern check; it can never be labeled correct. That label is the release gate: one written answer labeled correct fails the run.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const TARGET = process.env.MARLOW || path.resolve(__dirname, '..', 'index.html');
(async () => {
  const fx = JSON.parse(fs.readFileSync(path.join(__dirname, 'coach-fixture.json'), 'utf8')).cases;
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + TARGET + '#today'); await p.waitForTimeout(300); await p.evaluate(() => { localStorage.setItem('marlow-access', JSON.stringify({ h: '173adlfn5je', at: 1 })); });
  const got = await p.evaluate(cases => cases.map(c => { openLesson(c.lesson); wState.pick = c.pick; const r = checkTask(LESSONS[c.lesson].tasks[c.task], c.response); return { k: r.k, t: r.t, ver: r.ver, type: LESSONS[c.lesson].tasks[c.task].type }; }), fx);
  await b.close();
  /* Four numbers, kept apart: a wrong answer that passed the pattern check, a right answer rejected, a right answer the check abstained on, and how often it abstains at all.
     The regression set holds the cases that were held out until 2026-11-20. They have now been seen, so they are regression cases: the ones the pattern check gets wrong
     are marked as known limits and stay visible in every run. A fresh held-out set has to be written by someone who has not read the checker's rules, and frozen before it is run. */
  const tally = () => ({ n: 0, approve: 0, reject: 0, abstainRight: 0, unsure: 0, rightTotal: 0, rightPassed: 0, known: 0, bad: 0 });
  const T = { core: tally(), heldout: tally() }; const labeled = got.filter(g => (g.type === 'free' || g.type === 'claim') && (g.k === 'good' || g.ver === 'verified')).length;
  fx.forEach((c, i) => { const g = c.set === 'heldout' ? T.heldout : T.core; const verdict = got[i].k === 'checked' || got[i].k === 'good' ? 'accept' : got[i].k === 'crit' ? 'reject' : 'unsure'; g.n++; if (verdict === 'unsure') g.unsure++;
    const ok = c.expect === 'accept' ? verdict === 'accept' : verdict !== 'accept';
    if (c.expect === 'accept') { g.rightTotal++; if (verdict === 'accept') g.rightPassed++; else if (verdict === 'reject') g.reject++; else g.abstainRight++; } else if (verdict === 'accept') g.approve++;
    if (!ok) { if (c.knownLimit) g.known++; else g.bad++; }
    console.log(`${ok ? 'ok  ' : c.knownLimit ? 'LIMIT' : c.set === 'heldout' ? 'MISS' : 'FAIL'} ${c.id.padEnd(26)} ${c.category.padEnd(30)} expect ${c.expect.padEnd(8)} got ${verdict.padEnd(6)} "${got[i].t}"`); });
  const line = (name, g) => `${name}: ${g.n} cases · wrong answers that passed the pattern check ${g.approve} · right answers rejected ${g.reject} · right answers abstained on ${g.abstainRight} · abstention rate ${Math.round(g.unsure / g.n * 100)}% · right answers passed ${g.rightPassed} of ${g.rightTotal}`;
  console.log('\n' + line('core', T.core) + ` · known limits ${T.core.known} · unexpected ${T.core.bad}`); if (T.heldout.n) console.log(line('held-out', T.heldout)); else console.log('held-out: none. The former held-out cases are regression cases now; a fresh set is owed by an independent writer.');
  console.log(`written answers labeled correct: ${labeled} of ${got.length}`); if (labeled) { console.log('FAIL a written answer was labeled correct; a pattern check may only report that it passed'); process.exit(1); }
  /* A coach that approved nothing would have no false approvals. It must also pass most right answers. */
  const passRate = T.core.rightPassed / T.core.rightTotal; if (passRate < 0.85) { console.log(`FAIL the coach passes only ${Math.round(passRate * 100)}% of right answers in the core set`); process.exit(1); }
  process.exit(T.core.bad ? 1 : 0);
})();
