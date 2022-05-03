import{I as i,d as n,u as m,aa as y,a$ as g,J as v,bY as w,bZ as x,b_ as b,L as p,bj as F}from"./vendor.d1b93dad.js";import{i as I}from"./RefreshableLayerView.887b0383.js";import{s as L,a as P}from"./drapedUtils.7cbe7d8e.js";const R=a=>{let t=class extends a{async fetchPopupFeatures(l,c){const{layer:o}=this;if(!l)return Promise.reject(new y("tilelayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:o}));if(o.type!=="tile")return Promise.reject(new y("tilelayerview:fetchPopupFeatures","Layer type should be 'tile'",{type:o.type}));const f=this.get("view.scale"),d=o.allSublayers.toArray().filter(e=>{const s=e.minScale===0||f<=e.minScale,u=e.maxScale===0||f>=e.maxScale;return e.popupTemplate&&e.popupEnabled&&e.visible&&s&&u});return g(d.map(async e=>{const s=e.createQuery(),u=v(c)?c.event:null,h=L({renderer:e.renderer,event:u});return s.geometry=this.createFetchPopupFeaturesQueryGeometry(l,h),s.outFields=await e.popupTemplate.getRequiredFields(),(await e.queryFeatures(s)).features})).then(e=>[].concat(...e.map(s=>s.value).filter(Boolean)))}};return i([n()],t.prototype,"layer",void 0),t=i([m("esri.layers.mixins.TileLayerView")],t),t};let r=class extends I(w(R(x(b)))){constructor(){super(...arguments),this.type="tile-3d"}get imageFormatIsOpaque(){return this.layer.tileInfo.format==="jpg"}get hasMixedImageFormats(){return this.layer.tileInfo.format==="mixed"}get dataLevelRange(){if(this.tileInfo){const a=this.tileInfo.lods,t=a[0].scale,l=a[a.length-1].scale;return this.levelRangeFromScaleRange(t,l)}return{minLevel:0,maxLevel:0}}initialize(){if(this.layer.type==="web-tile"){const a=this.layer.get("fullExtent.spatialReference"),t=this.layer.get("tileInfo.spatialReference");if(p(a)||p(t)||!F(a,t)){const l=this.layer.originOf("fullExtent")==="defaults"||p(this.layer.fullExtent)?"SceneView requires fullExtent to be specified by the user on WebTileLayer":"SceneView requires fullExtent to be specified in the same spatial reference as tileInfo on WebTileLayer";this.addResolvingPromise(Promise.reject(new y("layerview:incompatible-fullextent",l)))}}this._addTilingSchemeMatchPromise()}createFetchPopupFeaturesQueryGeometry(a,t){return P(a,t,this.view)}async doRefresh(){this.suspended||this.emit("data-changed")}};i([n({readOnly:!0})],r.prototype,"imageFormatIsOpaque",null),i([n({readOnly:!0})],r.prototype,"hasMixedImageFormats",null),i([n()],r.prototype,"layer",void 0),i([n({readOnly:!0,aliasOf:"layer.tileInfo"})],r.prototype,"tileInfo",void 0),i([n({readOnly:!0})],r.prototype,"dataLevelRange",null),r=i([m("esri.views.3d.layers.TileLayerView3D")],r);const q=r;export{q as default};
