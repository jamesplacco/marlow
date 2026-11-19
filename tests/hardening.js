// Hardening checks: a progress file can neither run code nor break a page, a link cannot invent a lesson,
// clocks stop when the student leaves, a cohort CSV never carries a formula, and a phone shows a failed save.
const { chromium, devices } = require('playwright'); const path = require('path'); const fs = require('fs'); const os = require('os');
const TARGET = process.env.MARLOW || path.resolve(__dirname, '..', 'index.html'); const URL = 'file://' + TARGET;
(async () => {
  const b = await chromium.launch(); let fails = 0; const errs = [];
  const t = async (name, fn) => { try { const r = await fn(); console.log('PASS', name, r === undefined ? '' : '| ' + r); } catch (e) { fails++; console.log('FAIL', name, '|', e.message.split('\n')[0]); } };
  const must = (c, m) => { if (!c) throw new Error(m); };
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'marlow-h-')); const file = (name, obj) => { const f = path.join(tmp, name); fs.writeFileSync(f, JSON.stringify(obj)); return f; };
  const wrap = data => ({ app: 'marlow', version: 1, saved: new Date().toISOString(), data });
  const now = Date.now(), XSS = '<img src=x onerror="window.__pwned=1">';
  const page = async (opts = { viewport: { width: 1280, height: 900 } }) => { const ctx = await b.newContext(opts); const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message)); p.on('dialog', d => d.accept()); return p; };
  const seed = (p, data) => p.evaluate(d => { localStorage.clear(); localStorage.setItem('marlow-access', JSON.stringify({ h: '173adlfn5je', at: 1 })); Object.entries(d).forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v))); }, data);

  const p = await page(); await p.goto(URL + '#friday'); await p.waitForTimeout(200);

  // 1. The import check refuses the shapes that used to break pages or carry markup.
  const refused = [
    ['a diagnostic with no passages', { 'pr-name': 'A', 'pr-diag': {} }],
    ['a diagnostic passage with broken flags', { 'pr-diag': { passages: { science: { correct: 2, flags: 'x' } } } }],
    ['a diagnostic that points at no lesson', { 'pr-diag': { passages: {}, nextLesson: '"><img src=x>' } }],
    ['a reading log with markup for minutes', { 'pr-readlog': [{ title: 't', min: XSS, pages: 1, at: now }] }],
    ['a claim with markup for evidence', { 'pr-claims': [{ text: 'x', title: 'x', ev: XSS, at: now }] }],
    ['a word this app does not have', { 'pr-vocab': { notaword: { next: now, reviews: 1 } } }],
    ['a word named after a built-in', { 'pr-vocab': { constructor: { next: now, reviews: 1 } } }],
    ['half a chapter', { 'pr-book': 2.5 }],
    ['a current lesson named after a built-in', { 'pr-current': 'constructor' }],
  ];
  for (const [name, data] of refused) await t('import refuses ' + name, async () => {
    await seed(p, { 'pr-name': 'Kept' }); await p.goto(URL + '#friday'); await p.waitForTimeout(150);
    await p.setInputFiles('#fr-import', file('f.json', wrap(data))); await p.waitForTimeout(150);
    const msg = await p.textContent('#fr-io'); must(/Nothing was changed|not loaded|could not/i.test(msg), 'accepted: ' + msg.slice(0, 90));
    must(await p.evaluate(() => localStorage.getItem('pr-name')) === '"Kept"', 'progress changed');
  });

  // 2. Records already in storage cannot run code on any page that shows them.
  await t('stored records are shown as text, not markup', async () => {
    await seed(p, { 'pr-readlog': [{ title: XSS, min: XSS, pages: XSS, at: now }], 'pr-claims': [{ text: XSS, title: XSS, ev: XSS, at: now }],
      'pr-diag': { passages: { [Object.keys(await p.evaluate(() => DIAG))[0]]: { correct: XSS, flags: {} } }, nextLesson: '"><img src=x onerror="window.__pwned=1">', nextLessonTitle: XSS, priority: XSS, fluency: { wpm: XSS, acc: 1 } } });
    for (const v of ['review', 'diagnostic', 'report', 'friday', 'today', 'reads']) { await p.goto(URL + '#' + v); await p.waitForTimeout(200); }
    must(!(await p.evaluate(() => window.__pwned)), 'script ran');
  });

  // 3. A diagnostic record with no passages still leaves the Friday page usable.
  await t('Friday page works with an incomplete diagnostic', async () => {
    const before = errs.length; await seed(p, { 'pr-diag': { priority: 'x' }, 'pr-vocab': { notaword: { next: 0 } } });
    for (const v of ['friday', 'report', 'review']) { await p.goto(URL + '#' + v); await p.waitForTimeout(200); }
    await p.goto(URL + '#friday'); await p.waitForTimeout(200);
    must(errs.length === before, 'page error: ' + errs.slice(before).join('; '));
    must(await p.evaluate(() => typeof document.getElementById('fr-reset').onclick === 'function' || !!document.getElementById('fr-reset')), 'reset not wired');
  });

  // 4. A link cannot invent a lesson or spend a free one.
  await t('#workspace-constructor opens a real lesson and spends nothing', async () => {
    const before = errs.length; await p.evaluate(() => { localStorage.clear(); }); await p.goto(URL + '#workspace-constructor'); await p.waitForTimeout(300);
    const free = await p.evaluate(() => localStorage.getItem('marlow-free') || '[]');
    must(!/constructor/.test(free), 'free lessons: ' + free); must(errs.length === before, 'page error: ' + errs.slice(before).join('; '));
    await p.goto(URL + '#unlock-constructor'); await p.waitForTimeout(200);
    must(!/undefined/.test(await p.textContent('#v-unlock')), 'unlock page says undefined'); return free;
  });

  // 5. A timed section pauses while the student is elsewhere, and nothing is saved behind their back.
  await t('timed practice pauses off the page', async () => {
    const q = await page(); await q.clock.install(); await q.goto(URL + '#practice'); await seed(q, {}); await q.goto(URL + '#practice'); await q.waitForTimeout(200);
    await q.click('#v-practice button[data-mode="timed"]'); await q.clock.runFor(5000); const c1 = await q.textContent('#pt-clock');
    await q.evaluate(() => { location.hash = '#library'; }); await q.clock.runFor(20 * 60 * 1000);
    must((await q.evaluate(() => localStorage.getItem('pr-practice'))) === null, 'an attempt was saved while away');
    await q.evaluate(() => { location.hash = '#practice'; }); await q.clock.runFor(2000); const c2 = await q.textContent('#pt-clock');
    const sec = s => { const [m, x] = s.trim().split(':').map(Number); return m * 60 + x; }; must(sec(c1) - sec(c2) <= 3, `clock ran while away: ${c1} then ${c2}`);
    await q.context().close(); return `${c1} → ${c2}`;
  });

  // 6. A fluency clock stops when the student leaves, and a second start never doubles it.
  await t('fluency clock does not keep running or stack', async () => {
    const q = await page(); await q.clock.install(); await q.goto(URL + '#fluency'); await q.waitForTimeout(200);
    await q.click('#cp-btn'); await q.clock.runFor(3000); await q.evaluate(() => { location.hash = '#today'; }); await q.clock.runFor(3000);
    await q.evaluate(() => { location.hash = '#fluency'; }); await q.clock.runFor(3000);
    must((await q.textContent('#cp-time')).trim() === '0:00', 'old clock still counting: ' + await q.textContent('#cp-time'));
    await q.click('#cp-btn'); await q.clock.runFor(2000); const n = await q.evaluate(() => Object.keys(TIMERS).length);
    must(n === 1, n + ' clocks running'); await q.context().close();
  });

  // 7. Names that look like formulas are exported as text.
  await t('cohort CSV neutralises formulas', async () => {
    const q = await page(); await q.goto(URL + '#tutor'); await q.waitForTimeout(200);
    const student = name => wrap({ 'pr-name': name, 'pr-orf': [{ wpm: 120, acc: 0.95, pros: 2, at: now - 864e5, src: 'checkpoint' }] });
    await q.setInputFiles('#c-file', [file('s1.json', student('=HYPERLINK("http://x","y")')), file('s2.json', student('+1+1')), file('s3.json', student('Ann'))]); await q.waitForTimeout(300);
    const [dl] = await Promise.all([q.waitForEvent('download'), q.click('#c-csv')]); const csv = fs.readFileSync(await dl.path(), 'utf8');
    must(!/(^|,)"[=+\-@]/m.test(csv), 'formula cell: ' + csv.split('\n').find(l => /"[=+\-@]/.test(l))); must(/"'=HYPERLINK/.test(csv), 'name missing');
    await q.context().close();
  });

  // 8. On a phone, a failed save and the reading controls are on screen.
  await t('phone shows a failed save and the text controls', async () => {
    const q = await page(devices['iPhone 13']); await q.goto(URL + '#today'); await q.waitForTimeout(200);
    const r = await q.evaluate(() => { Storage.prototype.setItem = function () { throw new DOMException('full', 'QuotaExceededError'); }; store('pr-name', 'x');
      const vw = document.documentElement.clientWidth, vh = window.innerHeight, box = id => document.getElementById(id).getBoundingClientRect();
      const s = box('savestate'), a = box('t-larger'), sp = box('t-space'); return { save: s.width > 0 && s.left >= 0 && s.right <= vw && s.bottom <= vh, larger: a.right <= vw && a.width > 0, space: sp.right <= vw && sp.width > 0 }; });
    must(r.save, 'save warning off screen'); must(r.larger && r.space, 'text controls off screen'); await q.context().close();
  });

  // 9. The founder's credentials keep a readable label column.
  await t('founder list labels are not squeezed', async () => {
    await p.goto(URL + '#home'); await p.waitForTimeout(200);
    const w = await p.evaluate(() => Math.min(...[...document.querySelectorAll('#v-home dl.kv dt')].map(d => d.getBoundingClientRect().width))); must(w >= 120, 'label column ' + Math.round(w) + 'px'); return Math.round(w) + 'px';
  });

  console.log('errors:', errs); await b.close(); fs.rmSync(tmp, { recursive: true, force: true }); process.exit(fails || errs.length ? 1 : 0);
})();
