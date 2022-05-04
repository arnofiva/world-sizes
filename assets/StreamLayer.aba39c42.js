var $=Object.defineProperty,j=Object.defineProperties;var R=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var T=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var m=(t,r,o)=>r in t?$(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,p=(t,r)=>{for(var o in r||(r={}))T.call(r,o)&&m(t,o,r[o]);if(c)for(var o of c(r))O.call(r,o)&&m(t,o,r[o]);return t},h=(t,r)=>j(t,R(r));import{J as e,d as s,x as S,eQ as F,ax as P,rL as N,rl as D,rM as L,rm as k,rn as E,l2 as J,l3 as _,l4 as U,l5 as G,rK as A,a2 as C,k as I,ab as d,K as M,c8 as V,rN as f,sB as q,bq as Q,sF as z,e1 as W,a5 as B,bO as K,rO as Y,bM as Z,e2 as H,rP as X,aL as ee,gQ as v,rQ as te,rR as re,rS as ie,rG as se,dZ as g,sG as oe,sH as ae,e4 as ne,e5 as le,rU as pe,e3 as de,dY as b,rV as ye,l9 as ue,sI as ce,sJ as me,e7 as he}from"./vendor.5a0f9a12.js";var u;let n=u=class extends F{constructor(){super(...arguments),this.age=null,this.ageReceived=null,this.displayCount=null,this.maxObservations=1}clone(){return new u({age:this.age,ageReceived:this.ageReceived,displayCount:this.displayCount,maxObservations:this.maxObservations})}};e([s({type:Number,json:{write:!0}})],n.prototype,"age",void 0),e([s({type:Number,json:{write:!0}})],n.prototype,"ageReceived",void 0),e([s({type:Number,json:{write:!0}})],n.prototype,"displayCount",void 0),e([s({type:Number,json:{write:!0}})],n.prototype,"maxObservations",void 0),n=u=e([S("esri.layers.support.PurgeOptions")],n);const x=n,fe=P.getLogger("esri.layers.StreamLayer"),w=he();let i=class extends N(D(L(k(E(J(_(U(G(A(C)))))))))){constructor(...t){super(...t),this.copyright=null,this.definitionExpression=null,this.displayField=null,this.elevationInfo=null,this.featureReduction=null,this.fields=null,this.fieldsIndex=null,this.geometryDefinition=null,this.geometryType=null,this.labelsVisible=!0,this.labelingInfo=null,this.legendEnabled=!0,this.maxReconnectionAttempts=0,this.maxReconnectionInterval=20,this.maxScale=0,this.minScale=0,this.objectIdField=null,this.operationalLayerType="ArcGISStreamLayer",this.popupEnabled=!0,this.popupTemplate=null,this.purgeOptions=new x,this.screenSizePerspectiveEnabled=!0,this.sourceJSON=null,this.spatialReference=I.WGS84,this.type="stream",this.url=null,this.updateInterval=300,this.webSocketUrl=null}normalizeCtorArgs(t,r){return typeof t=="string"?p({url:t},r):t}load(t){if(!("WebSocket"in globalThis))return this.addResolvingPromise(Promise.reject(new d("stream-layer:websocket-unsupported","WebSocket is not supported in this browser. StreamLayer will not have real-time connection with the stream service."))),Promise.resolve(this);const r=M(t)?t.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Stream Service","Feed"]},t).catch(V).then(()=>this._fetchService(r))),Promise.resolve(this)}get defaultPopupTemplate(){return this.createPopupTemplate()}set renderer(t){f(t,this.fieldsIndex),this._set("renderer",t)}readRenderer(t,r,o){const a=(r=r.layerDefinition||r).drawingInfo&&r.drawingInfo.renderer||void 0;if(a){const l=q(a,r,o)||void 0;return l||fe.error("Failed to create renderer",{rendererDefinition:r.drawingInfo.renderer,layer:this,context:o}),l}if(r.defaultSymbol)return r.types&&r.types.length?new Q({defaultSymbol:y(r.defaultSymbol,r,o),field:r.typeIdField,uniqueValueInfos:r.types.map(l=>({id:l.id,symbol:y(l.symbol,l,o)}))}):new z({symbol:y(r.defaultSymbol,r,o)})}createPopupTemplate(t){return W(this,t)}createQuery(){const t=new B;return t.returnGeometry=!0,t.outFields=["*"],t.where=this.definitionExpression||"1=1",t}getFieldDomain(t,r){if(!this.fields)return null;let o=null;return this.fields.some(a=>(a.name===t&&(o=a.domain),!!o)),o}getField(t){return this.fieldsIndex.get(t)}serviceSupportsSpatialReference(t){return!0}async _fetchService(t){var r;if(this.webSocketUrl){var o;if((o=this.timeInfo)==null||!o.trackIdField)throw new d("stream-layer:missing-metadata","The stream layer trackIdField must be specified.");if(!this.objectIdField)throw new d("stream-layer:missing-metadata","The stream layer objectIdField must be specified.");if(!this.fields)throw new d("stream-layer:missing-metadata","The stream layer fields must be specified.");if(!this.geometryType)throw new d("stream-layer:missing-metadata","The stream layer geometryType must be specified.");this.url=this.webSocketUrl}else if(!this.sourceJSON){const{data:a}=await K(this.parsedUrl.path,{query:p(p({f:"json"},this.customParameters),this.parsedUrl.query),responseType:"json",signal:t});this.sourceJSON=a}return this.sourceJSON=h(p({},(r=this.sourceJSON)!=null?r:{}),{objectIdField:"__esri_stream_id__"}),this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl}),f(this.renderer,this.fieldsIndex),Y(this.timeInfo,this.fieldsIndex),Z(this,{origin:"service"})}};e([s({type:String})],i.prototype,"copyright",void 0),e([s({readOnly:!0})],i.prototype,"defaultPopupTemplate",null),e([s({type:String,json:{name:"layerDefinition.definitionExpression",write:{enabled:!0,allowNull:!0}}})],i.prototype,"definitionExpression",void 0),e([s({type:String})],i.prototype,"displayField",void 0),e([s({type:H})],i.prototype,"elevationInfo",void 0),e([s(X)],i.prototype,"featureReduction",void 0),e([s(w.fields)],i.prototype,"fields",void 0),e([s(w.fieldsIndex)],i.prototype,"fieldsIndex",void 0),e([s({type:ee})],i.prototype,"geometryDefinition",void 0),e([s({type:v.apiValues,json:{read:{reader:v.read}}})],i.prototype,"geometryType",void 0),e([s(te)],i.prototype,"labelsVisible",void 0),e([s({type:[re],json:{read:{source:"layerDefinition.drawingInfo.labelingInfo",reader:ie},write:{target:"layerDefinition.drawingInfo.labelingInfo"}}})],i.prototype,"labelingInfo",void 0),e([s(se)],i.prototype,"legendEnabled",void 0),e([s({type:["show","hide"]})],i.prototype,"listMode",void 0),e([s({type:g})],i.prototype,"maxReconnectionAttempts",void 0),e([s({type:g})],i.prototype,"maxReconnectionInterval",void 0),e([s(oe)],i.prototype,"maxScale",void 0),e([s(ae)],i.prototype,"minScale",void 0),e([s({type:String})],i.prototype,"objectIdField",void 0),e([s({value:"ArcGISStreamLayer",type:["ArcGISStreamLayer"]})],i.prototype,"operationalLayerType",void 0),e([s(ne)],i.prototype,"popupEnabled",void 0),e([s({type:le,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],i.prototype,"popupTemplate",void 0),e([s({type:x})],i.prototype,"purgeOptions",void 0),e([s({types:pe,json:{origins:{service:{write:{target:"drawingInfo.renderer",enabled:!1}},"web-scene":{name:"layerDefinition.drawingInfo.renderer",types:de,write:!0}},write:{target:"layerDefinition.drawingInfo.renderer"}}})],i.prototype,"renderer",null),e([b("service","renderer",["drawingInfo.renderer","defaultSymbol"]),b("renderer",["layerDefinition.drawingInfo.renderer","layerDefinition.defaultSymbol"])],i.prototype,"readRenderer",null),e([s(ye)],i.prototype,"screenSizePerspectiveEnabled",void 0),e([s()],i.prototype,"sourceJSON",void 0),e([s({type:I,json:{origins:{service:{read:{source:"spatialReference"}}}}})],i.prototype,"spatialReference",void 0),e([s({json:{read:!1}})],i.prototype,"type",void 0),e([s(ue)],i.prototype,"url",void 0),e([s({type:Number})],i.prototype,"updateInterval",void 0),e([s({type:String})],i.prototype,"webSocketUrl",void 0),i=e([S("esri.layers.StreamLayer")],i);const y=ce({types:me}),be=i;export{be as default};