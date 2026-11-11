// Nine device profiles: fails on horizontal overflow; small tap targets are listed for review.
const path=require('path'); const TARGET=process.env.MARLOW||path.resolve(__dirname,'..','index.html');
const {chromium,devices}=require('playwright');
const views=["home","method","how","training","programs","book","international","schools","team","apply","policies","diagnostic","library","workspace","fluency","vocab","examples","practice","sentences","writing","reads","today","friday","tips","review","report","tutor"];
const profiles=[["iPhone SE",devices['iPhone SE']],["iPhone 13",devices['iPhone 13']],["iPhone 14 Pro Max",devices['iPhone 14 Pro Max']],["iPhone 13 landscape",devices['iPhone 13 landscape']],["iPad Mini",devices['iPad Mini']],["iPad Pro 11",devices['iPad Pro 11']],["iPad Pro 11 landscape",devices['iPad Pro 11 landscape']],["laptop 1366",{viewport:{width:1366,height:768}}],["desktop 1920",{viewport:{width:1920,height:1080}}]];
(async()=>{const b=await chromium.launch();const problems=[];let overflow=0;
for(const [name,prof] of profiles){ const ctx=await b.newContext(prof); const p=await ctx.newPage();
  for(const v of views){ await p.goto('file://'+TARGET+'#'+v); await p.waitForTimeout(250);
    if(v==='book'){ await p.evaluate(()=>location.hash='#book-reader'); await p.waitForTimeout(200); }
    const r=await p.evaluate(()=>{ const vw=document.documentElement.clientWidth; const out={scrollW:document.documentElement.scrollWidth,vw,over:[],small:[]};
      document.querySelectorAll('body *').forEach(el=>{ if(el.closest('[hidden]')) return; const cs=getComputedStyle(el); if(cs.display==='none'||cs.visibility==='hidden') return; const r=el.getBoundingClientRect(); if(r.width===0&&r.height===0) return;
        if(r.right>vw+1&&r.width>20&&cs.position!=='fixed'){ out.over.push((el.id?'#'+el.id:el.tagName.toLowerCase()+(el.className&&typeof el.className==='string'?'.'+el.className.split(' ')[0]:''))+' right='+Math.round(r.right)+' w='+Math.round(r.width)); }
        if((el.tagName==='BUTTON'||el.tagName==='A'||el.tagName==='INPUT'||el.tagName==='SELECT')&&r.width>0&&(r.height<32||r.width<32)&&el.tagName!=='INPUT'){ if(!el.closest('.toc')) out.small.push(el.tagName.toLowerCase()+(el.className&&typeof el.className==='string'?'.'+el.className.split(' ')[0]:'')+' '+Math.round(r.width)+'x'+Math.round(r.height)+' "'+(el.textContent||'').trim().slice(0,18)+'"'); } });
      out.over=[...new Set(out.over)].slice(0,6); const sm={}; out.small.forEach(s=>{const k=s.split(' ')[0]; sm[k]=(sm[k]||0)+1;}); out.smallSummary=sm; return out; });
    if(r.scrollW>r.vw+1) overflow++; if(r.scrollW>r.vw+1||r.over.length) problems.push(`${name} / ${v}: scrollW ${r.scrollW} vw ${r.vw} ${r.over.join(' | ')}`);
    if(Object.keys(r.smallSummary).length) problems.push(`${name} / ${v}: small targets ${JSON.stringify(r.smallSummary)}`);
  }
  await ctx.close(); }
console.log(problems.join('\n')||'no problems'); console.log(`\npages wider than the screen: ${overflow}`); await b.close(); process.exit(overflow?1:0);})();
