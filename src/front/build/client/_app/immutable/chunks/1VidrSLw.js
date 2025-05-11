const f=[...` 	
\r\f \v\uFEFF`];function h(t,e,u){var n=""+t;if(u){for(var l in u)if(u[l])n=n?n+" "+l:l;else if(n.length)for(var i=l.length,s=0;(s=n.indexOf(l,s))>=0;){var r=s+i;(s===0||f.includes(n[s-1]))&&(r===n.length||f.includes(n[r]))?n=(s===0?"":n.substring(0,s))+n.substring(r+1):s=r}}return n===""?null:n}function o(t,e){return t==null?null:String(t)}export{o as a,h as t};
