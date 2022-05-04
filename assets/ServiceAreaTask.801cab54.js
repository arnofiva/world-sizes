var x=Object.defineProperty,J=Object.defineProperties;var O=Object.getOwnPropertyDescriptors;var $=Object.getOwnPropertySymbols;var q=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var b=(r,e,a)=>e in r?x(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a,d=(r,e)=>{for(var a in e||(e={}))q.call(e,a)&&b(r,a,e[a]);if($)for(var a of $(e))F.call(e,a)&&b(r,a,e[a]);return r},m=(r,e)=>J(r,O(e));import{J as s,d as o,bc as h,dY as p,ca as I,v as K,g as v,x as R,eQ as Q,lr as T,K as Z,b$ as C,k as E,bl as M,kZ as V,bT as Y,bO as _,k_ as z}from"./vendor.5a0f9a12.js";import{a as D,i as B,u as G,f as H,d as L,o as U}from"./NAMessage.f6175452.js";import"./GPMessage.2f9aa33f.js";function S(r){return r.features.map(e=>{const a=E.fromJSON(r.spatialReference),l=v.fromJSON(e);return M(l.geometry).spatialReference=a,l})}function f(r){return T(r.features.map(e=>(Z(e.geometry)&&(e.geometry.spatialReference=r.spatialReference),C(e.geometry))))}let t=class extends Q{constructor(r){super(r),this.facilities=null,this.messages=null,this.pointBarriers=null,this.polylineBarriers=null,this.polygonBarriers=null,this.serviceAreaPolylines=null,this.serviceAreaPolygons=null}readFacilities(r){return f(r)}readPointBarriers(r,e){return f(e.barriers)}readPolylineBarriers(r){return f(r)}readPolygonBarriers(r){return f(r)}readIncidents(r,e){return S(e.saPolylines)}readServiceAreaPolygons(r,e){return S(e.saPolygons)}};s([o({type:[h]})],t.prototype,"facilities",void 0),s([p("facilities")],t.prototype,"readFacilities",null),s([o({type:[D]})],t.prototype,"messages",void 0),s([o({type:[h]})],t.prototype,"pointBarriers",void 0),s([p("pointBarriers",["barriers"])],t.prototype,"readPointBarriers",null),s([o({type:[I]})],t.prototype,"polylineBarriers",void 0),s([p("polylineBarriers")],t.prototype,"readPolylineBarriers",null),s([o({type:[K]})],t.prototype,"polygonBarriers",void 0),s([p("polygonBarriers")],t.prototype,"readPolygonBarriers",null),s([o({type:[v]})],t.prototype,"serviceAreaPolylines",void 0),s([p("serviceAreaPolylines",["saPolylines"])],t.prototype,"readIncidents",null),s([o({type:[v]})],t.prototype,"serviceAreaPolygons",void 0),s([p("serviceAreaPolygons",["saPolygons"])],t.prototype,"readServiceAreaPolygons",null),t=s([R("esri.rest.support.ServiceAreaSolveResult")],t);const W=t,X=U({accumulateAttributes:{name:"accumulateAttributeNames"},attributeParameterValues:!0,defaultBreaks:!0,facilities:!0,outSpatialReference:{name:"outSR",getter:r=>r.outSpatialReference.wkid},pointBarriers:{name:"barriers"},polylineBarriers:!0,polygonBarriers:!0,restrictionAttributes:{name:"restrictionAttributeNames"},returnPointBarriers:{name:"returnBarriers"},travelMode:!0});async function ee(r,e,a){const l=[],u=[],n={},y={},P=V(r),{path:A}=P;e.facilities&&e.facilities.features&&B(e.facilities.features,u,"facilities.features",n),e.pointBarriers&&e.pointBarriers.features&&B(e.pointBarriers.features,u,"pointBarriers.features",n),e.polylineBarriers&&e.polylineBarriers.features&&B(e.polylineBarriers.features,u,"polylineBarriers.features",n),e.polygonBarriers&&e.polygonBarriers.features&&B(e.polygonBarriers.features,u,"polygonBarriers.features",n);const k=await Y(u);for(const i in n){const c=n[i];l.push(i),y[i]=k.slice(c[0],c[1])}if(G(y,l)){let i=null;try{i=await H(A,e.apiKey,a)}catch{}i&&!i.hasZ&&L(y,l)}for(const i in y)y[i].forEach((c,w)=>{e.get(i)[w].geometry=c});const N=m(d({},a),{query:m(d(d({},P.query),X.toQueryParams(e)),{f:"json"})}),{data:j}=await _(`${A}/solveServiceArea`,N);return W.fromJSON(j)}let g=class extends z{constructor(r){super(r),this.url=null}solve(r,e){return ee(this.url,r,e)}};s([o()],g.prototype,"url",void 0),g=s([R("esri.tasks.ServiceAreaTask")],g);const ie=g;export{ie as default};
