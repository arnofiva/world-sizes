import{pI as g,pJ as N,pK as S,bQ as u,pL as w,pM as D,ab as P,bP as O,pN as c,pO as M,pP as Q,pQ as f,pR as R,pS as h,pT as d,pU as T}from"./vendor.5a0f9a12.js";function E(e,t,a,l){return e.name?e.styleName&&e.styleName==="Esri2DPointSymbolsStyle"?x(e,t,l):D(e,t,l).then(o=>v(o,e.name,t,a,l)):Promise.reject(new P("symbolstyleutils:style-symbol-reference-name-missing","Missing name in style symbol reference"))}function v(e,t,a,l,o){const p=e.data,b={portal:a&&a.portal||O.getDefault(),url:u(e.baseUrl),origin:"portal-item"},n=p.items.find(r=>r.name===t);if(!n){const r=`The symbol name '${t}' could not be found`;return Promise.reject(new P("symbolstyleutils:symbol-name-not-found",r,{symbolName:t}))}let m=c(M(n,l),b),i=n.thumbnail&&n.thumbnail.href;const y=n.thumbnail&&n.thumbnail.imageData;Q()&&(m=f(m),i=f(i));const U={portal:a.portal,url:u(w(m)),origin:"portal-item"};return g(m,o).then(r=>{const j=l==="cimRef"?N(r.data):r.data,s=S(j,U);if(s&&R(s)){if(i){const $=c(i,b);s.thumbnail=new h({url:$})}else y&&(s.thumbnail=new h({url:`data:image/png;base64,${y}`}));e.styleUrl?s.styleOrigin=new d({portal:a.portal,styleUrl:e.styleUrl,name:t}):e.styleName&&(s.styleOrigin=new d({portal:a.portal,styleName:e.styleName,name:t}))}return s})}function x(e,t,a){const l=T.replace(/\{SymbolName\}/gi,e.name);return g(l,a).then(o=>{const p=N(o.data);return S(p,{portal:t.portal,url:u(w(l)),origin:"portal-item"})})}export{v as fetchSymbolFromStyle,E as resolveWebStyleSymbol};