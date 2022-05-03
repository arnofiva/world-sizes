var w=Object.defineProperty,x=Object.defineProperties;var F=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var h=(r,e,a)=>e in r?w(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a,d=(r,e)=>{for(var a in e||(e={}))I.call(e,a)&&h(r,a,e[a]);if(b)for(var a of b(e))O.call(e,a)&&h(r,a,e[a]);return r},m=(r,e)=>x(r,F(e));import{I as s,d as o,bb as $,dJ as p,bX as q,v as C,g as v,u as R,eF as Q,lj as D,J as E,fD as K,k as M,bk as T,kQ as V,fC as X,bN as Z,kR as z}from"./vendor.d1b93dad.js";import{a as G,i as f,u as H,f as L,d as U,o as W}from"./NAMessage.e6b76703.js";import"./GPMessage.1829557e.js";function S(r){return r.features.map(e=>{const a=M.fromJSON(r.spatialReference),l=v.fromJSON(e);return T(l.geometry).spatialReference=a,l})}function B(r){return D(r.features.map(e=>(E(e.geometry)&&(e.geometry.spatialReference=r.spatialReference),K(e.geometry))))}let t=class extends Q{constructor(r){super(r),this.facilities=null,this.messages=null,this.pointBarriers=null,this.polylineBarriers=null,this.polygonBarriers=null,this.serviceAreaPolylines=null,this.serviceAreaPolygons=null}readFacilities(r){return B(r)}readPointBarriers(r,e){return B(e.barriers)}readPolylineBarriers(r){return B(r)}readPolygonBarriers(r){return B(r)}readIncidents(r,e){return S(e.saPolylines)}readServiceAreaPolygons(r,e){return S(e.saPolygons)}};s([o({type:[$]})],t.prototype,"facilities",void 0),s([p("facilities")],t.prototype,"readFacilities",null),s([o({type:[G]})],t.prototype,"messages",void 0),s([o({type:[$]})],t.prototype,"pointBarriers",void 0),s([p("pointBarriers",["barriers"])],t.prototype,"readPointBarriers",null),s([o({type:[q]})],t.prototype,"polylineBarriers",void 0),s([p("polylineBarriers")],t.prototype,"readPolylineBarriers",null),s([o({type:[C]})],t.prototype,"polygonBarriers",void 0),s([p("polygonBarriers")],t.prototype,"readPolygonBarriers",null),s([o({type:[v]})],t.prototype,"serviceAreaPolylines",void 0),s([p("serviceAreaPolylines",["saPolylines"])],t.prototype,"readIncidents",null),s([o({type:[v]})],t.prototype,"serviceAreaPolygons",void 0),s([p("serviceAreaPolygons",["saPolygons"])],t.prototype,"readServiceAreaPolygons",null),t=s([R("esri.rest.support.ServiceAreaSolveResult")],t);const Y=t,_=W({accumulateAttributes:{name:"accumulateAttributeNames"},attributeParameterValues:!0,defaultBreaks:!0,facilities:!0,outSpatialReference:{name:"outSR",getter:r=>r.outSpatialReference.wkid},pointBarriers:{name:"barriers"},polylineBarriers:!0,polygonBarriers:!0,restrictionAttributes:{name:"restrictionAttributeNames"},returnPointBarriers:{name:"returnBarriers"},travelMode:!0});async function ee(r,e,a){const l=[],u=[],n={},y={},P=V(r),{path:A}=P;e.facilities&&e.facilities.features&&f(e.facilities.features,u,"facilities.features",n),e.pointBarriers&&e.pointBarriers.features&&f(e.pointBarriers.features,u,"pointBarriers.features",n),e.polylineBarriers&&e.polylineBarriers.features&&f(e.polylineBarriers.features,u,"polylineBarriers.features",n),e.polygonBarriers&&e.polygonBarriers.features&&f(e.polygonBarriers.features,u,"polygonBarriers.features",n);const k=await X(u);for(const i in n){const c=n[i];l.push(i),y[i]=k.slice(c[0],c[1])}if(H(y,l)){let i=null;try{i=await L(A,e.apiKey,a)}catch{}i&&!i.hasZ&&U(y,l)}for(const i in y)y[i].forEach((c,J)=>{e.get(i)[J].geometry=c});const N=m(d({},a),{query:m(d(d({},P.query),_.toQueryParams(e)),{f:"json"})}),{data:j}=await Z(`${A}/solveServiceArea`,N);return Y.fromJSON(j)}let g=class extends z{constructor(r){super(r),this.url=null}solve(r,e){return ee(this.url,r,e)}};s([o()],g.prototype,"url",void 0),g=s([R("esri.tasks.ServiceAreaTask")],g);const ie=g;export{ie as default};
