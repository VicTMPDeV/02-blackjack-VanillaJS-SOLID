(()=>{"use strict";function n(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var t=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null==t)return;var e,a,o=[],i=!0,u=!1;try{for(t=t.call(n);!(i=(e=t.next()).done)&&(o.push(e.value),!r||o.length!==r);i=!0);}catch(n){u=!0,a=n}finally{try{i||null==t.return||t.return()}finally{if(u)throw a}}return o}(n,r)||t(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(n,r){var e="undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(!e){if(Array.isArray(n)||(e=t(n))||r&&n&&"number"==typeof n.length){e&&(n=e);var a=0,o=function(){};return{s:o,n:function(){return a>=n.length?{done:!0}:{done:!1,value:n[a++]}},e:function(n){throw n},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,l=!1;return{s:function(){e=e.call(n)},n:function(){var n=e.next();return u=n.done,n},e:function(n){l=!0,i=n},f:function(){try{u||null==e.return||e.return()}finally{if(l)throw i}}}}function t(n,r){if(n){if("string"==typeof n)return e(n,r);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?e(n,r):void 0}}function e(n,r){(null==r||r>n.length)&&(r=n.length);for(var t=0,e=new Array(r);t<r;t++)e[t]=n[t];return e}var a,o,i,u,l,c,f,d,s,y,v,h,b,m,A;a=[],o=["C","D","H","S"],i=["A","J","Q","K"],u=[],l=document.querySelector("#btnHitCard"),c=document.querySelector("#btnStand"),f=document.querySelector("#btnNewGame"),d=document.querySelectorAll(".divCards"),s=document.querySelectorAll("small"),y=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2;a=v(),u=[];for(var r=0;r<n;r++)u.push(0);s.forEach((function(n){return n.innerText=0})),d.forEach((function(n){return n.innerHTML=""})),l.disabled=!1,c.disabled=!1},v=function(){a=[];for(var n=2;n<=10;n++){var t,e=r(o);try{for(e.s();!(t=e.n()).done;){var u=t.value;a.push(n+u)}}catch(n){e.e(n)}finally{e.f()}}var l,c=r(o);try{for(c.s();!(l=c.n()).done;){var f,d=l.value,s=r(i);try{for(s.s();!(f=s.n()).done;){var y=f.value;a.push(y+d)}}catch(n){s.e(n)}finally{s.f()}}}catch(n){c.e(n)}finally{c.f()}return _.shuffle(a)},h=function(){if(0===a.length)throw"No quedan más cartas que jugar";return a.pop()},b=function(n,r){return u[r]=u[r]+function(n){var r=n.substring(0,n.length-1);return isNaN(r)?"A"===r?11:10:parseInt(r)}(n),s[r].innerHTML=u[r],u[r]},m=function(n,r){var t=document.createElement("img");t.src="assets/cards/".concat(n,".png"),t.classList.add("deck-card"),d[r].append(t)},A=function(r){for(var t=0;t<r&&r<=21;){var e=h();t=b(e,u.length-1),m(e,u.length-1)}!function(){var r=n(u,2),t=r[0],e=r[1];setTimeout((function(){e===t?alert("EMPATE"):t>21?alert("COMPUTADORA GANA"):e>21||t>e?alert("GANASTE!!!"):alert("COMPUTADORA GANA")}),100)}()},f.addEventListener("click",(function(){y()})),l.addEventListener("click",(function(){var n=h(),r=b(n,0);m(n,0),r>21?(console.warn("HAS PERDIDO"),l.disabled=!0,c.disabled=!0,A(r)):21===r&&(console.warn("JUGADOR: 21 PUNTOS!!!"),l.disabled=!0,c.disabled=!0,A(r))})),c.addEventListener("click",(function(){l.disabled=!0,c.disabled=!0,A(u[0])}))})();