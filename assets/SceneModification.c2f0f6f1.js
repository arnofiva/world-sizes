import{J as r,d as s,v as c,fn as y,x as m,eQ as f,bk as d,dv as u,fo as R,bR as g}from"./vendor.5a0f9a12.js";import{w as l}from"./persistable.e960b349.js";var n;let t=n=class extends f{constructor(a){super(a),this.geometry=null,this.type="clip"}writeGeometry(a,o,i,e){if(e.layer&&e.layer.spatialReference&&!e.layer.spatialReference.equals(this.geometry.spatialReference)){if(!d(a.spatialReference,e.layer.spatialReference))return void(e&&e.messages&&e.messages.push(new u("scenemodification:unsupported","Scene modifications with incompatible spatial references are not supported",{modification:this,spatialReference:e.layer.spatialReference,context:e})));const p=new c;R(a,p,e.layer.spatialReference),o[i]=p.toJSON(e)}else o[i]=a.toJSON(e);delete o[i].spatialReference}clone(){return new n({geometry:g(this.geometry),type:this.type})}};r([s({type:c}),l()],t.prototype,"geometry",void 0),r([y(["web-scene","portal-item"],"geometry")],t.prototype,"writeGeometry",null),r([s({type:["clip","mask","replace"],nonNullable:!0}),l()],t.prototype,"type",void 0),t=n=r([m("esri.layers.support.SceneModification")],t);const v=t;export{v as f};