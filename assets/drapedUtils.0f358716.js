import{aL as m,K as h,c6 as c,M}from"./vendor.5a0f9a12.js";function u(e,n){return n?"xoffset"in n&&n.xoffset?Math.max(e,Math.abs(n.xoffset)):"yoffset"in n&&n.yoffset?Math.max(e,Math.abs(n.yoffset||0)):e:e}function b(e){let n=0,t=0;for(let s=0;s<e.length;s++){const r=e[s].size;typeof r=="number"&&(n+=r,t++)}return n/t}function p(e,n){return typeof e=="number"?e:e&&e.stops&&e.stops.length?b(e.stops):n}function v(e,n){if(!n)return e;const t=n.filter(a=>a.type==="size").map(a=>{const{maxSize:i,minSize:f}=a;return(p(i,e)+p(f,e))/2});let s=0;const r=t.length;if(r===0)return e;for(let a=0;a<r;a++)s+=t[a];const o=Math.floor(s/r);return Math.max(o,e)}function z(e){const n=e&&e.renderer,t=(e&&e.event&&e.event.pointerType)==="touch"?9:6;if(!n)return t;const s="visualVariables"in n?v(t,n.visualVariables):t;if(n.type==="simple")return u(s,n.symbol);if(n.type==="unique-value"){let r=s;return n.uniqueValueInfos.forEach(o=>{r=u(r,o.symbol)}),r}if(n.type==="class-breaks"){let r=s;return n.classBreakInfos.forEach(o=>{r=u(r,o.symbol)}),r}return n.type,s}function R(e,n,t,s=new m){let r;if(t.type==="2d")r=n*t.resolution;else if(t.type==="3d"){const x=t.overlayPixelSizeInMapUnits(e),l=t.basemapSpatialReference;r=h(l)&&!l.equals(t.spatialReference)?c(l)/c(t.spatialReference):n*x}const o=e.x-r,a=e.y-r,i=e.x+r,f=e.y+r,{spatialReference:y}=t;return s.xmin=Math.min(o,i),s.ymin=Math.min(a,f),s.xmax=Math.max(o,i),s.ymax=Math.max(a,f),s.spatialReference=y,s}function g(e,n,t){const s=t.toMap(e);return M(s)?!1:R(s,z(),t,S).intersects(n)}const S=new m;export{R as a,g as o,z as s};
