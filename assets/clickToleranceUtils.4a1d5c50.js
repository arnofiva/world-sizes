function i(e,n){return n?"xoffset"in n&&n.xoffset?Math.max(e,Math.abs(n.xoffset)):"yoffset"in n&&n.yoffset?Math.max(e,Math.abs(n.yoffset||0)):e:e}function c(e){let n=0,s=0;for(let r=0;r<e.length;r++){const t=e[r].size;typeof t=="number"&&(n+=t,s++)}return n/s}function u(e,n){return typeof e=="number"?e:e&&e.stops&&e.stops.length?c(e.stops):n}function p(e,n){if(!n)return e;const s=n.filter(o=>o.type==="size").map(o=>{const{maxSize:a,minSize:l}=o;return(u(a,e)+u(l,e))/2});let r=0;const t=s.length;if(t===0)return e;for(let o=0;o<t;o++)r+=s[o];const f=Math.floor(r/t);return Math.max(f,e)}function y(e){const n=e&&e.renderer,s=(e&&e.event&&e.event.pointerType)==="touch"?9:6;if(!n)return s;const r="visualVariables"in n?p(s,n.visualVariables):s;if(n.type==="simple")return i(r,n.symbol);if(n.type==="unique-value"){let t=r;return n.uniqueValueInfos.forEach(f=>{t=i(t,f.symbol)}),t}if(n.type==="class-breaks"){let t=r;return n.classBreakInfos.forEach(f=>{t=i(t,f.symbol)}),t}return n.type,r}export{y as s};
