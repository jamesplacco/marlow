// Runs the coach scoring fixture against the real grading code in index.html.
// Reports false acceptances and false rejections separately; a single accuracy figure would hide the difference.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const TARGET = process.env.MARLOW || path.resolve(__dirname, '..', 'index.html');
(async () => {
  const fx = JSON.parse(fs.readFileSync(path.join(__dirname, 'coach-fixture.json'), 'utf8')).cases;
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + TARGET + '#today'); await p.waitForTimeout(300);
  const got = await p.evaluate(cases => cases.map(c => { openLesson(c.lesson); wState.pick = c.pick; const r = checkTask(LESSONS[c.lesson].tasks[c.task], c.response); return { k: r.k, t: r.t }; }), fx);
  await b.close();
  let fa = 0, fr = 0, unsure = 0, known = 0, bad = 0;
  fx.forEach((c, i) => { const verdict = got[i].k === 'good' ? 'accept' : got[i].k === 'crit' ? 'reject' : 'unsure'; if (verdict === 'unsure') unsure++;
    const ok = c.expect === 'accept' ? verdict === 'accept' : verdict !== 'accept';
    if (!ok) { if (c.expect === 'accept') fr++; else fa++; if (c.knownLimit) known++; else bad++; }
    console.log(`${ok ? 'ok  ' : c.knownLimit ? 'LIMIT' : 'FAIL'} ${c.id.padEnd(14)} ${c.category.padEnd(38)} expect ${c.expect.padEnd(8)} got ${verdict.padEnd(6)} "${got[i].t}"`); });
  console.log(`\n${fx.length} cases · false acceptances ${fa} · false rejections ${fr} · coach unsure on ${unsure} · known limits ${known} · unexpected ${bad}`);
  process.exit(bad ? 1 : 0);
})();
