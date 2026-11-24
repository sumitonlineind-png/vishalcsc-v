'use strict';
const CFG={apiKey:"AIzaSyCSSQ9792wWwJhsflpolO4mYiL6UpBdPJI",authDomain:"webapp-c4e83.firebaseapp.com",projectId:"webapp-c4e83",storageBucket:"webapp-c4e83.firebasestorage.app",messagingSenderId:"552943239920",appId:"1:552943239920:web:d450cdcb022a6df2a8f835"};
const $=id=>document.getElementById(id);
const esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ic=(n,c)=>`<svg class="i ${c||''}" viewBox="0 0 24 24" aria-hidden="true"><use href="/icons.svg#i-${esc(n)}"/></svg>`;
const okImg=u=>/^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/.test(u||'');
const DEF=[
["fingerprint","Aadhaar Services","Address & mobile update, PVC card, download and e-KYC support"],
["credit-card","PAN Card","New PAN, corrections, reprint and PAN–Aadhaar linking"],
["file-badge","Certificates","Income, caste, domicile, birth & death certificates via Saral Haryana"],
["landmark","Banking & AEPS","Cash withdrawal, deposit, money transfer and mini statements"],
["zap","Bill Payments & Recharge","Electricity, water, gas, DTH, mobile recharge and FASTag"],
["briefcase","Job & Exam Forms","HSSC, HTET, CET, SSC, police, army & all sarkari naukri forms"],
["graduation-cap","Scholarships & Admissions","Scholarship portals, college admissions and result printouts"],
["users","Family ID (PPP) & Ration","Parivar Pehchan Patra updates, ration card and pension schemes"],
["heart-pulse","Ayushman & Insurance","Ayushman Bharat card, life, health and vehicle insurance"],
["wheat","Kisan Services","PM-Kisan, Meri Fasal Mera Byora, crop insurance and land records"],
["plane","Tickets & Travel","Train, bus and flight tickets, passport application help"],
["printer","Print, Scan & Lamination","Colour print, photocopy, scanning, photos and lamination"],
["receipt","GST & ITR Filing","Income tax returns, GST registration and Udyam MSME"],
["car","Licence & RTO","Learner & driving licence, vehicle RC and challan services"]].map(([icon,name,desc])=>({icon,name,desc}));
const ICONS=["fingerprint","credit-card","file-badge","landmark","zap","briefcase","graduation-cap","users","heart-pulse","wheat","plane","printer","receipt","car","file-text","shopping-bag","smartphone","building-2","book-open","camera","banknote","wifi","package","stamp","indian-rupee","shield-check"];
const ST={new:'Naya',processing:'Process mein',ready:'Taiyar',done:'Complete',cancelled:'Cancel'};
const fmt=t=>t&&t.toDate?t.toDate().toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'}):'';
const svcCard=s=>`<article class="card svc"><span class="ico">${ic(s.icon||'file-text')}</span><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p>${s.price?`<span class="price">${esc(s.price)}</span>`:''}</article>`;
function fbInit(){
 if(!(window.firebase&&CFG.apiKey))return null;
 try{if(!firebase.apps.length)firebase.initializeApp(CFG);
  return{db:firebase.firestore(),auth:firebase.auth?firebase.auth():null,ts:()=>firebase.firestore.FieldValue.serverTimestamp()}}catch(e){return null}
}
function watchShared(db,onServices){
 const q=()=>{};
 db.collection('services').onSnapshot(sn=>{const l=sn.docs.map(d=>({id:d.id,...d.data()})).filter(x=>x.active!==false).sort((a,b)=>(a.order||0)-(b.order||0));if(l.length&&onServices)onServices(l)},q);
 db.collection('news').orderBy('createdAt','desc').limit(10).onSnapshot(sn=>{const a=sn.docs.map(d=>d.data()).filter(n=>n.active&&n.text),b=$('news');if(b){b.hidden=!a.length;$('newst').textContent=a.map(n=>n.text).join('     •     ')}},q);
 db.doc('settings/shop').onSnapshot(d=>{const s=d.data()||{},o=s.open!==false;document.querySelectorAll('[data-shop]').forEach(e=>{e.textContent=o?'Open · '+(s.hours||'9AM – 8PM'):'Abhi band hai';e.className='badge '+(o?'ok':'off')})},q);
}
function regSW(p){if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register(p).catch(()=>{}))}
