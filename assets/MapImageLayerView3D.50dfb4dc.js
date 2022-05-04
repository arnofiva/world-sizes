var S=Object.defineProperty,$=Object.defineProperties;var D=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var G=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;var I=(a,e,t)=>e in a?S(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,E=(a,e)=>{for(var t in e||(e={}))G.call(e,t)&&I(a,t,e[t]);if(b)for(var t of b(e))Q.call(e,t)&&I(a,t,e[t]);return a},F=(a,e)=>$(a,D(e));import{J as o,d as p,ga as T,x as A,ab as _,K as u,h0 as q,b0 as z,bp as H}from"./vendor.5a0f9a12.js";import{q as L}from"./DynamicLayerView3D.f6a1eadd.js";import{c as N}from"./ExportImageParameters.d925274e.js";import{s as R,a as j}from"./drapedUtils.0f358716.js";import{t as J,d as K}from"./popupUtils.535163fe.js";import"./projectExtentUtils.1832b9cd.js";import"./ImageMaterial.2d7ab4ce.js";import"./RefreshableLayerView.27e350dc.js";import"./sublayerUtils.3956c96b.js";const U=a=>{let e=class extends a{initialize(){this.exportImageParameters=new N({layer:this.layer})}destroy(){this.exportImageParameters.destroy(),this.exportImageParameters=null}get exportImageVersion(){var t;return(t=this.exportImageParameters)==null||t.commitProperty("version"),this.commitProperty("timeExtent"),(this._get("exportImageVersion")||0)+1}async fetchPopupFeatures(t,n){const{layer:d}=this;if(!t)return Promise.reject(new _("mapimagelayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:d}));const y=this.get("view.scale"),h=[],g=async r=>{const i=r.minScale===0||y<=r.minScale,s=r.maxScale===0||y>=r.maxScale;if(r.visible&&i&&s){if(r.sublayers)r.sublayers.forEach(g);else if(r.popupEnabled){const l=K(r,F(E({},n),{defaultPopupTemplateEnabled:!1}));u(l)&&h.unshift({sublayer:r,popupTemplate:l})}}},V=d.sublayers.toArray().reverse().map(g);await Promise.all(V);const M=h.map(async({sublayer:r,popupTemplate:i})=>{await r.load().catch(()=>{});const s=r.createQuery(),l=u(n)?n.event:null,f=R({renderer:r.renderer,event:l}),w=this.createFetchPopupFeaturesQueryGeometry(t,f);if(s.geometry=w,s.outFields=await J(r,i),this.layer.type==="map-image"&&"floors"in this.view){var x,v;const O=(x=this.view)==null||(v=x.floors)==null?void 0:v.clone(),m=q(O,r);u(m)&&(s.where=s.where?`(${s.where}) AND (${m})`:m)}const P=await this._loadArcadeModules(i);return P&&P.arcadeUtils.hasGeometryOperations(i)||(s.maxAllowableOffset=w.width/f),(await r.queryFeatures(s)).features});return(await z(M)).reduce((r,i)=>i.value?[...r,...i.value]:r,[]).filter(r=>r!=null)}canResume(){var t;return!!super.canResume()&&((t=this.timeExtent)==null||!t.isEmpty)}_loadArcadeModules(t){if(t.get("expressionInfos.length")||Array.isArray(t.content)&&t.content.some(n=>n.type==="expression"))return H()}};return o([p()],e.prototype,"exportImageParameters",void 0),o([p({readOnly:!0})],e.prototype,"exportImageVersion",null),o([p()],e.prototype,"layer",void 0),o([p()],e.prototype,"suspended",void 0),o([p(T)],e.prototype,"timeExtent",void 0),e=o([A("esri.views.layers.MapImageLayerView")],e),e};let c=class extends U(L){constructor(){super(...arguments),this.type="map-image-3d"}initialize(){this.updatingHandles.add(()=>this.exportImageVersion,()=>this.updatingHandles.addPromise(this.refreshDebounced()))}createFetchPopupFeaturesQueryGeometry(a,e){return j(a,e,this.view)}getFetchOptions(){return{timeExtent:this.timeExtent}}};c=o([A("esri.views.3d.layers.MapImageLayerView3D")],c);const ae=c;export{ae as default};