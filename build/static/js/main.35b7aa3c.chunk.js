(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(40)},19:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(11),u=n.n(o),i=(n(19),n(12)),c=n(2),l=n(3),m=n.n(l),s=function(){return m.a.get("/persons").then().then(function(e){return e.data})},d=function(e){return m.a.post("/persons",e).then(function(e){return e.data})},f=function(e,t){return m.a.put("".concat("/persons","/").concat(e),t).then(function(e){return e.data})},v=function(e){return m.a.delete("".concat("/persons","/").concat(e)).then(function(e){return e.data})},h=function(e){var t=e.filter,n=e.handleFilter;return r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4 ",r.a.createElement("input",{value:t,onChange:n}))},b=function(e){return r.a.createElement("form",{onSubmit:e.addContact},r.a.createElement("h3",null,"lis\xe4\xe4 uusi"),r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:e.newName,onChange:e.handleName})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumber})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},E=function(e){var t=e.getContacts;return r.a.createElement("div",null,r.a.createElement("h2",null,"Numerot"),r.a.createElement("ul",null,t()))},p=function(e){var t=e.message;if(null===t)return null;var n={color:t.includes("valitettavasti")?"red":"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return r.a.createElement("div",{style:n},t)},g=function(){var e=Object(a.useState)([]),t=Object(c.a)(e,2),n=t[0],o=t[1],u=Object(a.useState)(""),l=Object(c.a)(u,2),m=l[0],g=l[1],w=Object(a.useState)(""),j=Object(c.a)(w,2),O=j[0],k=j[1],C=Object(a.useState)(""),N=Object(c.a)(C,2),y=N[0],S=N[1],B=Object(a.useState)("testivirhe"),L=Object(c.a)(B,2),F=L[0],J=L[1];Object(a.useEffect)(function(){s().then(function(e){o(e)})},[]);var P=0===y.length?n:n.filter(function(e){return e.name.toLowerCase().includes(y.trim().toLowerCase())}),W=function(e){window.confirm("".concat(e.name," on jo luettelossa, korvataanko vanha numero uudella?"))&&f(e.id,e).then(function(){o(n.map(function(t){return e.id===t.id?e:t})),J("Muokattiin ".concat(e.name))})};return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(p,{message:F}),r.a.createElement(h,{filter:y,handleFilter:function(e){return S(e.target.value)}}),r.a.createElement(b,{newName:m,newNumber:O,handleName:function(e){return g(e.target.value)},handleNumber:function(e){return k(e.target.value)},addContact:function(e){e.preventDefault();var t={name:m,number:O},a=n.find(function(e){return e.name===t.name});if(void 0===a)d(t).then(function(e){o(n.concat(e)),J("Lis\xe4ttiin ".concat(e.name))}),g(""),k("");else{var r=Object(i.a)({},a,{number:O});W(r)}}}),r.a.createElement(E,{getContacts:function(){return P.map(function(e){return r.a.createElement("li",{key:e.id},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return t=e.id,a=e.name,void(window.confirm("poistetaanko ".concat(a))&&v(t).then(function(){o(n.filter(function(e){return e.id!==t})),J("Poistettiin ".concat(a))}).catch(function(e){o(n.filter(function(e){return e.id!==t})),J("".concat(a," oli jo valitettavasti poistettu"))}));var t,a}},"poista"))})}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[13,2,1]]]);
//# sourceMappingURL=main.35b7aa3c.chunk.js.map