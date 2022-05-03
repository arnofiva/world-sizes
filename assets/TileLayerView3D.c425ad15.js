import{a as i,d as n,n as f,L as y,aF as g,r as v,bD as w,bE as F,bF as x,t as p,a_ as b}from"./vendor.f59113c8.js";import{i as I}from"./RefreshableLayerView.45aa338b.js";import{s as L}from"./clickToleranceUtils.4a1d5c50.js";import{a as P}from"./drapedUtils.7aa34fad.js";const R=a=>{let t=class extends a{async fetchPopupFeatures(s,c){const{layer:o}=this;if(!s)return Promise.reject(new y("tilelayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:o}));if(o.type!=="tile")return Promise.reject(new y("tilelayerview:fetchPopupFeatures","Layer type should be 'tile'",{type:o.type}));const m=this.get("view.scale"),d=o.allSublayers.toArray().filter(e=>{const l=e.minScale===0||m<=e.minScale,u=e.maxScale===0||m>=e.maxScale;return e.popupTemplate&&e.popupEnabled&&e.visible&&l&&u});return g(d.map(async e=>{const l=e.createQuery(),u=v(c)?c.event:null,h=L({renderer:e.renderer,event:u});return l.geometry=this.createFetchPopupFeaturesQueryGeometry(s,h),l.outFields=await e.popupTemplate.getRequiredFields(),(await e.queryFeatures(l)).features})).then(e=>[].concat(...e.map(l=>l.value).filter(Boolean)))}};return i([n()],t.prototype,"layer",void 0),t=i([f("esri.layers.mixins.TileLayerView")],t),t};let r=class extends I(w(R(F(x)))){constructor(){super(...arguments),this.type="tile-3d"}get imageFormatIsOpaque(){return this.layer.tileInfo.format==="jpg"}get hasMixedImageFormats(){return this.layer.tileInfo.format==="mixed"}get dataLevelRange(){if(this.tileInfo){const a=this.tileInfo.lods,t=a[0].scale,s=a[a.length-1].scale;return this.levelRangeFromScaleRange(t,s)}return{minLevel:0,maxLevel:0}}initialize(){if(this.layer.type==="web-tile"){const a=this.layer.get("fullExtent.spatialReference"),t=this.layer.get("tileInfo.spatialReference");if(p(a)||p(t)||!b(a,t)){const s=this.layer.originOf("fullExtent")==="defaults"||p(this.layer.fullExtent)?"SceneView requires fullExtent to be specified by the user on WebTileLayer":"SceneView requires fullExtent to be specified in the same spatial reference as tileInfo on WebTileLayer";this.addResolvingPromise(Promise.reject(new y("layerview:incompatible-fullextent",s)))}}this._addTilingSchemeMatchPromise()}createFetchPopupFeaturesQueryGeometry(a,t){return P(a,t,this.view)}async doRefresh(){this.suspended||this.emit("data-changed")}};i([n({readOnly:!0})],r.prototype,"imageFormatIsOpaque",null),i([n({readOnly:!0})],r.prototype,"hasMixedImageFormats",null),i([n()],r.prototype,"layer",void 0),i([n({readOnly:!0,aliasOf:"layer.tileInfo"})],r.prototype,"tileInfo",void 0),i([n({readOnly:!0})],r.prototype,"dataLevelRange",null),r=i([f("esri.views.3d.layers.TileLayerView3D")],r);const q=r;export{q as default};
