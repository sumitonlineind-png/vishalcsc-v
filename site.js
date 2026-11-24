'use strict';
const F=fbInit();let svc=DEF;
const OTHER='Other / General Enquiry';
function renderSvc(l){svc=l;
 $('grid').innerHTML=l.map(svcCard).join('')+`<article class="card" style="background:var(--navy);color:#fff"><h3 style="color:#fff;font-size:1.3rem">Need something else?</h3><p style="margin-top:6px;opacity:.85">If it's online, we can do it. Tell us what you need.</p><button class="btn pri" style="margin-top:16px" data-ask>Ask us →</button></article>`;
 $('s').innerHTML=l.map(x=>`<option>${esc(x.name)}</option>`).join('')+`<option>${OTHER}</option>`}
document.addEventListener('click',e=>{if(e.target.closest('[data-ask]')){$('s').value=OTHER;$('contact').scrollIntoView({behavior:'smooth'});setTimeout(()=>$('n').focus({preventScroll:true}),500)}});
$('f').onsubmit=e=>{e.preventDefault();
 const t=`Hello Vishal CSC Centre,%0AName: ${encodeURIComponent($('n').value)}%0AMobile: ${encodeURIComponent($('m').value)}${$('e').value?'%0AEmail: '+encodeURIComponent($('e').value):''}%0AService: ${encodeURIComponent($('s').value)}%0ADetails: ${encodeURIComponent($('d').value)}`;
 $('wa').href='https://wa.me/919812321208?text='+t;$('ok').hidden=false;$('f').hidden=true};
if(F){
 watchShared(F.db,renderSvc);
 F.db.collection('posts').orderBy('createdAt','desc').limit(12).onSnapshot(sn=>{
  const l=sn.docs.map(d=>d.data());$('updates').hidden=!l.length;
  $('posts').innerHTML=l.map(p=>`<article class="card" style="padding:0;overflow:hidden">${okImg(p.image)?`<img src="${p.image}" alt="${esc(p.title)}" loading="lazy" style="width:100%;height:190px;object-fit:cover;display:block">`:''}<div style="padding:18px"><p class="mu" style="font-size:.8rem">${fmt(p.createdAt)}</p><h3 style="margin-top:4px;font-size:1.15rem">${esc(p.title)}</h3><p style="margin-top:6px;white-space:pre-line">${esc(p.body)}</p></div></article>`).join('')},()=>{});
}
