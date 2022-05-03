var H=Object.defineProperty;var $=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var F=(e,s,t)=>s in e?H(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t,L=(e,s)=>{for(var t in s||(s={}))W.call(s,t)&&F(e,t,s[t]);if($)for(var t of $(s))A.call(s,t)&&F(e,t,s[t]);return e};import{bu as V,k as O,bN as B,eE as v,li as M,hH as D,lh as U,aI as j,dZ as E,sm as g,fy as S,ak as q,sl as X,dN as Y,G as C,J as w,aK as G,l6 as N,A as P,I as l,d as n,ig as Z,sn as Q,dJ as _,u as R,rl as ee,rn as te,rm as se,kW as re,kX as le,kY as ie,a1 as oe,hB as ne,n8 as ae,bV as ue,fc as ye,l0 as pe}from"./vendor.d1b93dad.js";const fe={esriGeometryPoint:"points",esriGeometryPolyline:"polylines",esriGeometryPolygon:"polygons"};function T(e){const s=e.folders||[],t=s.slice(),r=new Map,o=new Map,p=new Map,b=new Map,m=new Map,f={esriGeometryPoint:o,esriGeometryPolyline:p,esriGeometryPolygon:b};(e.featureCollection&&e.featureCollection.layers||[]).forEach(i=>{const d=v(i);d.featureSet.features=[];const y=i.featureSet.geometryType;r.set(y,d);const k=i.layerDefinition.objectIdField;y==="esriGeometryPoint"?x(o,k,i.featureSet.features):y==="esriGeometryPolyline"?x(p,k,i.featureSet.features):y==="esriGeometryPolygon"&&x(b,k,i.featureSet.features)}),e.groundOverlays&&e.groundOverlays.forEach(i=>{m.set(i.id,i)}),s.forEach(i=>{i.networkLinkIds.forEach(d=>{const y=de(d,i.id,e.networkLinks);y&&t.push(y)})}),t.forEach(i=>{if(i.featureInfos){i.points=v(r.get("esriGeometryPoint")),i.polylines=v(r.get("esriGeometryPolyline")),i.polygons=v(r.get("esriGeometryPolygon")),i.mapImages=[];for(const d of i.featureInfos)switch(d.type){case"esriGeometryPoint":case"esriGeometryPolyline":case"esriGeometryPolygon":{const y=f[d.type].get(d.id);y&&i[fe[d.type]].featureSet.features.push(y);break}case"GroundOverlay":{const y=m.get(d.id);y&&i.mapImages.push(y);break}}i.fullExtent=I([i])}});const h=I(t);return{folders:s,sublayers:t,extent:h}}function J(e,s,t,r){const o=M&&M.findCredential(e);e=D(e,{token:o&&o.token});const p=U.kmlServiceUrl;return B(p,{query:{url:e,model:"simple",folders:"",refresh:t!==0||void 0,outSR:JSON.stringify(s)},responseType:"json",signal:r})}function K(e,s,t=null,r=[]){const o=[],p={},b=s.sublayers,m=s.folders.map(f=>f.id);return b.forEach(f=>{const h=new e;if(t?h.read(f,t):h.read(f),r.length&&m.indexOf(h.id)>-1&&(h.visible=r.indexOf(h.id)!==-1),p[f.id]=h,f.parentFolderId!=null&&f.parentFolderId!==-1){const i=p[f.parentFolderId];i.sublayers||(i.sublayers=[]),i.sublayers.unshift(h)}else o.unshift(h)}),o}function x(e,s,t){t.forEach(r=>{e.set(r.attributes[s],r)})}function he(e,s){let t;return s.some(r=>r.id===e&&(t=r,!0)),t}function de(e,s,t){const r=he(e,t);return r&&(r.parentFolderId=s,r.networkLink=r),r}function I(e){const s=j(E),t=j(E);for(const r of e){if(r.polygons&&r.polygons.featureSet&&r.polygons.featureSet.features)for(const o of r.polygons.featureSet.features)g(s,o.geometry),S(t,s);if(r.polylines&&r.polylines.featureSet&&r.polylines.featureSet.features)for(const o of r.polylines.featureSet.features)g(s,o.geometry),S(t,s);if(r.points&&r.points.featureSet&&r.points.featureSet.features)for(const o of r.points.featureSet.features)g(s,o.geometry),S(t,s);if(r.mapImages)for(const o of r.mapImages)g(s,o.extent),S(t,s)}return V(t,E)?null:{xmin:t[0],ymin:t[1],zmin:t[2],xmax:t[3],ymax:t[4],zmax:t[5],spatialReference:O.WGS84}}var c;let u=c=class extends q.EventedMixin(X(Y)){constructor(){super(...arguments),this._sublayersHandles=null,this.description=null,this.id=null,this.networkLink=null,this.title=null,this.sourceJSON=null,this.fullExtent=null}initialize(){C(()=>this.networkLink).then(()=>C(()=>this.visible===!0)).then(()=>this.load())}load(e){if(!this.networkLink||this.networkLink.viewFormat)return;const s=w(e)?e.signal:null,t=this._fetchService(this._get("networkLink").href,s).then(r=>{const o=I(r.sublayers);this.fullExtent=G.fromJSON(o),this.sourceJSON=r;const p=N(P.ofType(c),K(c,r));this.sublayers?this.sublayers.addMany(p):this.sublayers=p,this.layer.emit("sublayer-update"),this.layer&&this.layer.notifyChange("visibleSublayers")});return this.addResolvingPromise(t),Promise.resolve(this)}set sublayers(e){const s=this._get("sublayers");s&&(s.forEach(t=>{t.parent=null,t.layer=null}),this._sublayersHandles.forEach(t=>t.remove()),this._sublayersHandles=null),e&&(e.forEach(t=>{t.parent=this,t.layer=this.layer}),this._sublayersHandles=[e.on("after-add",({item:t})=>{t.parent=this,t.layer=this.layer}),e.on("after-remove",({item:t})=>{t.parent=null,t.layer=null})]),this._set("sublayers",e)}castSublayers(e){return N(P.ofType(c),e)}get visible(){return this._get("visible")}set visible(e){this._get("visible")!==e&&(this._set("visible",e),this.layer&&this.layer.notifyChange("visibleSublayers"))}readVisible(e,s){return!!s.visibility}set layer(e){this._set("layer",e),this.sublayers&&this.sublayers.forEach(s=>s.layer=e)}_fetchService(e,s){return J(e,this.layer.outSpatialReference,this.layer.refreshInterval,s).then(t=>T(t.data))}};l([n()],u.prototype,"description",void 0),l([n()],u.prototype,"id",void 0),l([n({readOnly:!0,value:null})],u.prototype,"networkLink",void 0),l([n({json:{write:{allowNull:!0}}})],u.prototype,"parent",void 0),l([n({value:null,json:{write:{allowNull:!0}}})],u.prototype,"sublayers",null),l([Z("sublayers")],u.prototype,"castSublayers",null),l([n({value:null,json:{read:{source:"name",reader:e=>Q(e)}}})],u.prototype,"title",void 0),l([n({value:!0})],u.prototype,"visible",null),l([_("visible",["visibility"])],u.prototype,"readVisible",null),l([n()],u.prototype,"sourceJSON",void 0),l([n({value:null})],u.prototype,"layer",null),l([n({type:G})],u.prototype,"fullExtent",void 0),u=c=l([R("esri.layers.support.KMLSublayer")],u);const z=u,ce=["kml","xml"];let a=class extends ee(te(se(re(le(ie(oe)))))){constructor(...e){super(...e),this._visibleFolders=[],this.allSublayers=new ne({getCollections:()=>[this.sublayers],getChildrenFunction:s=>s.sublayers}),this.outSpatialReference=O.WGS84,this.path=null,this.legendEnabled=!1,this.operationalLayerType="KML",this.sublayers=null,this.type="kml",this.url=null}initialize(){this.watch("sublayers",(e,s)=>{s&&s.forEach(t=>{t.parent=null,t.layer=null}),e&&e.forEach(t=>{t.parent=this,t.layer=this})},!0),this.on("sublayer-update",()=>this.notifyChange("fullExtent"))}normalizeCtorArgs(e,s){return typeof e=="string"?L({url:e},s):e}readSublayersFromItemOrWebMap(e,s){this._visibleFolders=s.visibleFolders}readSublayers(e,s,t){return K(z,s,t,this._visibleFolders)}writeSublayers(e,s){const t=[],r=e.toArray();for(;r.length;){const o=r[0];o.networkLink||(o.visible&&t.push(o.id),o.sublayers&&r.push(...o.sublayers.toArray())),r.shift()}s.visibleFolders=t}get title(){const e=this._get("title");return e&&this.originOf("title")!=="defaults"?e:this.url?ae(this.url,ce)||"KML":e||""}set title(e){this._set("title",e)}get visibleSublayers(){const e=this.sublayers,s=[],t=r=>{r.visible&&(s.push(r),r.sublayers&&r.sublayers.forEach(t))};return e&&e.forEach(t),s}get fullExtent(){return this._recomputeFullExtent()}load(e){const s=w(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["KML"]},e).catch(ue).then(()=>this._fetchService(s))),Promise.resolve(this)}destroy(){super.destroy(),this.allSublayers.destroy()}async _fetchService(e){const s=await Promise.resolve().then(()=>this.resourceInfo?{ssl:!1,data:this.resourceInfo}:J(this.url,this.outSpatialReference,this.refreshInterval,e)),t=T(s.data);t&&this.read(t,{origin:"service"})}_recomputeFullExtent(){let e=null;w(this.extent)&&(e=this.extent.clone());const s=t=>{if(t.sublayers)for(const r of t.sublayers.items)s(r),r.visible&&r.fullExtent&&(w(e)?e.union(r.fullExtent):e=r.fullExtent.clone())};return s(this),e}};l([n({readOnly:!0})],a.prototype,"allSublayers",void 0),l([n({type:O})],a.prototype,"outSpatialReference",void 0),l([n({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],a.prototype,"path",void 0),l([n({readOnly:!0,json:{read:!1,write:!1}})],a.prototype,"legendEnabled",void 0),l([n({type:["show","hide","hide-children"]})],a.prototype,"listMode",void 0),l([n({type:["KML"]})],a.prototype,"operationalLayerType",void 0),l([n({})],a.prototype,"resourceInfo",void 0),l([n({type:P.ofType(z),json:{write:{ignoreOrigin:!0}}})],a.prototype,"sublayers",void 0),l([_(["web-map","portal-item"],"sublayers",["visibleFolders"])],a.prototype,"readSublayersFromItemOrWebMap",null),l([_("service","sublayers",["sublayers"])],a.prototype,"readSublayers",null),l([ye("sublayers")],a.prototype,"writeSublayers",null),l([n({readOnly:!0,json:{read:!1}})],a.prototype,"type",void 0),l([n({json:{origins:{"web-map":{read:{source:"title"}}},write:{ignoreOrigin:!0}}})],a.prototype,"title",null),l([n(pe)],a.prototype,"url",void 0),l([n({readOnly:!0})],a.prototype,"visibleSublayers",null),l([n({type:G})],a.prototype,"extent",void 0),l([n()],a.prototype,"fullExtent",null),a=l([R("esri.layers.KMLLayer")],a);const ve=a;export{ve as default};
