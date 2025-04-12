import{t as j,a as M}from"../chunks/BloMgKyR.js";import"../chunks/DMvcjDYs.js";import{C as K,E as it,an as st,ao as ot,ap as nt,o as ct,aq as dt,ar as ft,ag as lt,as as L,ac as U,ad as W,ae as ut,a7 as vt,aa as ht,c as u,q as b,F as Y,s as w,r as l,_ as p,a9 as J}from"../chunks/DvUjY8h5.js";import{a as _t,w as mt,e as P,s as x}from"../chunks/BaA98Pk7.js";import{i as wt}from"../chunks/CDjYmTfr.js";import{e as Et,i as bt}from"../chunks/TDCAPJ9a.js";import{i as pt}from"../chunks/CSBI7I02.js";import{o as yt}from"../chunks/GyJkTNFx.js";const gt=()=>performance.now(),g={tick:a=>requestAnimationFrame(a),now:()=>gt(),tasks:new Set};function V(){const a=g.now();g.tasks.forEach(t=>{t.c(a)||(g.tasks.delete(t),t.f())}),g.tasks.size!==0&&g.tick(V)}function Tt(a){let t;return g.tasks.size===0&&g.tick(V),{promise:new Promise(r=>{g.tasks.add(t={c:a,f:r})}),abort(){g.tasks.delete(t)}}}function O(a,t){mt(()=>{a.dispatchEvent(new CustomEvent(t))})}function kt(a){if(a==="float")return"cssFloat";if(a==="offset")return"cssOffset";if(a.startsWith("--"))return a;const t=a.split("-");return t.length===1?t[0]:t[0]+t.slice(1).map(r=>r[0].toUpperCase()+r.slice(1)).join("")}function Q(a){const t={},r=a.split(";");for(const s of r){const[i,v]=s.split(":");if(!i||v===void 0)break;const h=kt(i.trim());t[h]=v.trim()}return t}const At=a=>a;function Dt(a,t,r,s){var i=(a&dt)!==0,v="both",h,D=t.inert,R=t.style.overflow,f,n;function T(){var _=ut,A=K;U(null),W(null);try{return h??(h=r()(t,(s==null?void 0:s())??{},{direction:v}))}finally{U(_),W(A)}}var k={is_global:i,in(){t.inert=D,O(t,"introstart"),f=B(t,T(),n,1,()=>{O(t,"introend"),f==null||f.abort(),f=h=void 0,t.style.overflow=R})},out(_){t.inert=!0,O(t,"outrostart"),n=B(t,T(),f,0,()=>{O(t,"outroend"),_==null||_()})},stop:()=>{f==null||f.abort(),n==null||n.abort()}},y=K;if((y.transitions??(y.transitions=[])).push(k),_t){var m=i;if(!m){for(var c=y.parent;c&&(c.f&it)!==0;)for(;(c=c.parent)&&(c.f&st)===0;);m=!c||(c.f&ot)!==0}m&&nt(()=>{ct(()=>k.in())})}}function B(a,t,r,s,i){var v=s===1;if(ft(t)){var h,D=!1;return lt(()=>{if(!D){var _=t({direction:v?"in":"out"});h=B(a,_,r,s,i)}}),{abort:()=>{D=!0,h==null||h.abort()},deactivate:()=>h.deactivate(),reset:()=>h.reset(),t:()=>h.t()}}if(r==null||r.deactivate(),!(t!=null&&t.duration))return i(),{abort:L,deactivate:L,reset:L,t:()=>s};const{delay:R=0,css:f,tick:n,easing:T=At}=t;var k=[];if(v&&r===void 0&&(n&&n(0,1),f)){var y=Q(f(0,1));k.push(y,y)}var m=()=>1-s,c=a.animate(k,{duration:R});return c.onfinish=()=>{var _=(r==null?void 0:r.t())??1-s;r==null||r.abort();var A=s-_,$=t.duration*Math.abs(A),F=[];if($>0){var N=!1;if(f)for(var C=Math.ceil($/16.666666666666668),I=0;I<=C;I+=1){var o=_+A*T(I/C),e=Q(f(o,1-o));F.push(e),N||(N=e.overflow==="hidden")}N&&(a.style.overflow="hidden"),m=()=>{var d=c.currentTime;return _+A*T(d/$)},n&&Tt(()=>{if(c.playState!=="running")return!1;var d=m();return n(d,1-d),!0})}c=a.animate(F,{duration:$,fill:"forwards"}),c.onfinish=()=>{m=()=>s,n==null||n(s,1-s),i()}},{abort:()=>{c&&(c.cancel(),c.effect=null,c.onfinish=L)},deactivate:()=>{i=L},reset:()=>{s===0&&(n==null||n(1,0))},t:()=>m()}}const $t=a=>a;function It(a,{delay:t=0,duration:r=400,easing:s=$t}={}){const i=+getComputedStyle(a).opacity;return{delay:t,duration:r,easing:s,css:v=>`opacity: ${v*i}`}}var xt=j('<p class="info-message"> </p>'),Rt=j('<tr><td> </td><td> </td><td> </td><td> </td><td> </td><td class="actions"><button class="edit" title="Edit record"><i class="fas fa-pen"></i></button>  <button class="delete" title="Delete record"><i class="fas fa-times"></i></button></td></tr>'),Ft=j('<div class="wrapper dash"><div class="container dash"><!> <div class="header"><h3>Education</h3> <div class="actions"><button class="green"><i class="fas fa-plus"></i> Add New Record</button> <button class="green"><i class="fas fa-sync-alt"></i> Reload Initial Data</button> <button class="red"><i class="fas fa-trash-alt"></i> Delete All</button></div></div> <div class="seeker"></div> <div class="table-container"><table><thead><tr><th>Autonomous Community</th><th>Year</th><th>Basic FP</th><th>Middle Grade</th><th>Higher Grade</th><th>Actions</th></tr></thead></table> <div class="scroll-body"><table><tbody></tbody></table></div></div></div></div>');function Ht(a,t){vt(t,!1);let r="/api/v1/education-data",s=Y([]),i=Y("");async function v(){try{const o=await fetch(r);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const e=await o.json();p(s,e)}catch(o){console.error("[GET] Error getting education data:",o)}}function h(){}async function D(){const o=`${r}/loadInitialData?reset=true`,e=`${r}/loadInitialData`;try{if(b(s).length>0){if(!confirm("There are existing records. Do you want to reload the initial data and reset everything?"))return;const E=await fetch(o);if(!E.ok)throw new Error(`Error ${E.status}`);p(i,"🔄 Initial data reloaded with reset.")}else{const d=await fetch(e);if(!d.ok)throw new Error(`Error ${d.status}`);p(i,"📥 Initial data loaded.")}await v()}catch(d){console.error("[LOAD INITIAL DATA] Error:",d),p(i,"❌ Error loading initial data.")}setTimeout(()=>{p(i,"")},3e3)}async function R(){if(confirm("Are you sure you want to delete all records?")){try{const e=await fetch(r,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);p(i,"✅ All records have been deleted."),await v()}catch(e){console.error("[DELETE] Error deleting records:",e),p(i,"❌ Error deleting records.")}setTimeout(()=>{p(i,"")},3e3)}}async function f(o,e){if(confirm(`Are you sure you want to delete the record for ${o} (${e})?`)){try{const E=await fetch(`${r}/${o}/${e}`,{method:"DELETE"});if(!E.ok)throw new Error(`HTTP error! status: ${E.status}`);p(i,`🗑️ Record for ${o} (${e}) deleted successfully.`),await v()}catch(E){console.error("[DELETE ONE] Error deleting record:",E),p(i,"❌ Error deleting the record.")}setTimeout(()=>{p(i,"")},3e3)}}yt(async()=>{v()}),pt();var n=Ft(),T=u(n),k=u(T);{var y=o=>{var e=xt(),d=u(e,!0);l(e),J(()=>x(d,b(i))),Dt(3,e,()=>It,()=>({duration:300})),M(o,e)};wt(k,o=>{b(i)&&o(y)})}var m=w(k,2),c=w(u(m),2),_=u(c),A=w(_,2),$=w(A,2);l(c),l(m);var F=w(m,4),N=w(u(F),2),C=u(N),I=u(C);Et(I,5,()=>b(s),bt,(o,e)=>{var d=Rt(),E=u(d),X=u(E,!0);l(E);var S=w(E),Z=u(S,!0);l(S);var q=w(S),tt=u(q,!0);l(q);var G=w(q),at=u(G,!0);l(G);var H=w(G),rt=u(H,!0);l(H);var z=w(H),et=w(u(z),2);l(z),l(d),J(()=>{x(X,b(e).autonomous_community),x(Z,b(e).year),x(tt,b(e).basic_fp),x(at,b(e).middle_grade),x(rt,b(e).higher_grade)}),P("click",et,()=>f(b(e).autonomous_community,b(e).year)),M(o,d)}),l(I),l(C),l(N),l(F),l(T),l(n),P("click",_,h),P("click",A,D),P("click",$,R),M(a,n),ht()}export{Ht as component};
