// Accessibility scan (axe-core, WCAG 2.1 AA and best-practice rules) on every view. An automated scan does not establish full accessibility; keyboard and screen-reader checks are still manual.
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
const path=require('path'); const TARGET=process.env.MARLOW||path.resolve(__dirname,'..','index.html');
const axe=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
const views=["home","method","how","training","programs","book","international","schools","team","apply","policies","diagnostic","library","workspace","fluency","vocab","examples","practice","sentences","writing","reads","today","friday","tips","review","report","tutor"];
const agg={};
for(const v of views){ await p.goto('file://'+TARGET+'#'+v); await p.waitForTimeout(400); await p.addScriptTag({content:axe});
  const r=await p.evaluate(async()=>{ const res=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}}); return res.violations.map(x=>({id:x.id,impact:x.impact,n:x.nodes.length,help:x.help,ex:x.nodes.slice(0,3).map(n=>n.target.join(' ')+' :: '+(n.html||'').slice(0,120))})); });
  for(const x of r){ const k=x.id; agg[k]=agg[k]||{impact:x.impact,help:x.help,views:{},ex:x.ex}; agg[k].views[v]=x.n; } }
for(const [k,x] of Object.entries(agg)){ console.log(`\n## ${k} [${x.impact}] ${x.help}`); console.log('  views:',JSON.stringify(x.views)); x.ex.forEach(e=>console.log('  -',e)); }
const n=Object.keys(agg).length; console.log(n?`\n${n} rule(s) violated`:`axe-core: 0 violations on ${views.length} views`); await b.close(); process.exit(n?1:0);})();
