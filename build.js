!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o=document.querySelector(".control"),r=document.querySelector("button");let l=0,d=[],i=[];function c(e,t){if(event){const e=event.target;if("LABEL"!=e.tagName&&"INPUT"!=e.tagName)return;document.querySelector(".info").innerHTML="",d=[],l=+e.id}let n=document.createElement("table"),o=document.createElement("tr"),c=document.createElement("th");c.innerHTML="Display Name",o.appendChild(c),t[l].puzzles.forEach(e=>{let t=document.createElement("th");i.push(e.name),t.innerHTML=e.name,o.appendChild(t)});let a=document.createElement("th");a.innerHTML="Comparison",o.appendChild(a),n.appendChild(o);for(let o=0;o<e.length;o++){let r,i,c=document.createElement("tr"),a=document.createElement("td");a.innerHTML=e[o].displayName,c.appendChild(a);let s={};s.name=e[o].displayName,s.times=[];for(let n=0;n<t[l].rounds.length;n++)r=document.createElement("td"),i=document.createElement("span"),void 0===t[l].rounds[n].solutions[e[o].uid]||"Incorrect"===t[l].rounds[n].solutions[e[o].uid].correct?(r.innerHTML="150",s.times.push(150)):(r.innerHTML=t[l].rounds[n].solutions[e[o].uid].time.$numberLong,s.times.push(+t[l].rounds[n].solutions[e[o].uid].time.$numberLong),i.innerHTML=t[l].rounds[n].solutions[e[o].uid].code,r.appendChild(i)),c.appendChild(r);let u=document.createElement("td"),p=document.createElement("input");p.type="checkbox",p.id=o,u.appendChild(p),c.appendChild(u),n.appendChild(c),d.push(s)}r.addEventListener("click",()=>{!function(e,t){let n=document.querySelectorAll("[type='checkbox']:checked"),o=[],r=["red","green","pink","yellow","brown","purple","blue","orange","gray","black"];for(let t=0;t<n.length&&t<10;t++){let l={};l.label=e[n[t].id].name,l.borderColor=r.pop(),l.backgroundColor="transparent",l.data=e[n[t].id].times,o.push(l)}document.querySelector(".line-chart").innerHTML="";let l=document.createElement("canvas");document.querySelector(".line-chart").appendChild(l),l.style.display="block",l.getContext("2d"),new Chart(l,{type:"line",data:{labels:t,datasets:o},options:{responsive:!0,title:{display:!0,text:"Chart.js Line Chart"},tooltips:{mode:"index",intersect:!1},hover:{mode:"nearest",intersect:!0},scales:{xAxes:[{display:!0,scaleLabel:{display:!0,labelString:"Puzzle"}}],yAxes:[{display:!0,scaleLabel:{display:!0,labelString:"Time"}}]}}})}(d,i)}),document.querySelector(".info").appendChild(n)}!async function(){try{let e=await fetch("https://cors.io/?https://drive.google.com/uc?export=download&id=1Rnc8OIYlsSKo7-nOTzodi6LdX3bXdc-9"),t=await fetch("https://cors.io/?https://drive.google.com/uc?export=download&id=1QsO2d1BNYZ5m8YlY35qD_VUJIRnz5drO");if(t.ok&&e.ok){let n=await t.json(),r=await e.json();document.querySelector(".loader").style.display="none",document.querySelector(".control").style.display="flex",c(n,r),o.addEventListener("click",()=>{c(n,r)})}}catch(e){console.log(e)}}()}]);