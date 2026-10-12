function s(i=4){const e=new Map;return{lire(t){return e.get(t)},garder(t,n){for(e.delete(t),e.set(t,n);e.size>i;){const r=e.keys().next().value;if(r===void 0)break;e.delete(r)}}}}export{s as c};
