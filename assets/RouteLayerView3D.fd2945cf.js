import{bZ as p,b_ as d,O as h,gc as c,R as m,hB as y,J as l,A as u,g,W as v,I as i,d as o,u as b}from"./vendor.d1b93dad.js";import{O as f}from"./GraphicsProcessor.6d850421.js";import{l as O}from"./projectExtentUtils.834f9a01.js";import{r as S}from"./EventedSet.d233fc70.js";import"./Graphics3DScaleVisibility.a06906ae.js";import"./optimizedFeatureQueryEngineAdapter.264950bf.js";import"./PooledRBush.74db5953.js";import"./quickselect.02d2bace.js";import"./Graphics3DObjectStates.c79f2989.js";let s=class extends p(d){constructor(){super(...arguments),this.type="route-3d",this.loadedGraphics=new S,this._byObjectID=new Map,this.slicePlaneEnabled=!1,this.drapeSourceType=h.Features,this.fullExtentInLocalViewSpatialReference=null}initialize(){this._set("processor",new f({owner:this,scaleVisibilityEnabled:!0,frustumVisibilityEnabled:!0})),this.addResolvingPromise(this.processor.setup()),this.updatingHandles.addOnCollectionChange(()=>this._routeItems,e=>this._routeItemsChanged(e)),this.addResolvingPromise(O(this).then(e=>this.fullExtentInLocalViewSpatialReference=e)),this.handles.add(c(()=>{var e,t;return(e=this.view)==null||(t=e.basemapTerrain)==null?void 0:t.ready},()=>()=>this.notifyChange("updating"),{once:!0}))}destroy(){this.handles.removeAll(),this.updatingHandles.removeAll(),this._set("processor",m(this.processor))}get _routeItems(){return new y({getCollections:()=>[this.layer.pointBarriers,this.layer.polygonBarriers,this.layer.polylineBarriers,this.layer.stops,this.layer.directionLines,this.layer.directionPoints,l(this.layer.routeInfo)?new u([this.layer.routeInfo]):null]})}_routeItemsChanged(e){e.removed.length&&this.loadedGraphics.removeMany(e.removed.map(t=>{const r=this._byObjectID.get(t);return this._byObjectID.delete(t),r})),this.loadedGraphics.addMany(e.added.map(t=>{const r=g.fromJSON(t.toPortalJSON());return this._byObjectID.set(t,r),r}))}get legendEnabled(){var e;return this.canResume()&&!((e=this.processor)!=null&&e.frustumVisibilitySuspended)}getSuspendInfo(){var e,t,r,n;const a=super.getSuspendInfo();return a.outsideScaleRange=(e=(t=this.processor)==null?void 0:t.scaleVisibilitySuspended)!=null&&e,a.outsideOfView=(r=(n=this.processor)==null?void 0:n.frustumVisibilitySuspended)!=null&&r,a}async fetchPopupFeatures(e,t){return l(t)?t.clientGraphics:null}getGraphicFromGraphicUid(e){return this.processor.getGraphicFromGraphicUid(e)}whenGraphicBounds(e,t){return this.processor.whenGraphicBounds(e,t)}computeAttachmentOrigin(e,t){var r;return(r=this.processor)==null?void 0:r.computeAttachmentOrigin(e,t)}getSymbolLayerSize(e,t){return this.processor.getSymbolLayerSize(e,t)}async queryGraphics(){return new u(this.loadedGraphics.toArray())}maskOccludee(e){return this.processor.maskOccludee(e)}highlight(e){return this.processor.highlight(e)}get updatePolicy(){var e;return((e=this.processor)==null?void 0:e.graphicsCore.effectiveUpdatePolicy)||v.SYNC}canResume(){var e;return super.canResume()&&!((e=this.processor)!=null&&e.scaleVisibilitySuspended)}isUpdating(){var e,t,r;return!(!((e=this.processor)!=null&&e.updating||(t=this.view)==null||(r=t.basemapTerrain)==null)&&r.ready)}get performanceInfo(){var e,t,r;return{displayedNumberOfFeatures:this.loadedGraphics.length,maximumNumberOfFeatures:-1,totalNumberOfFeatures:-1,nodes:0,core:null,updating:this.updating,elevationUpdating:(e=(t=this.processor)==null?void 0:t.elevationAlignment.updating)!=null&&e,visibilityFrustum:!((r=this.processor)!=null&&r.frustumVisibilitySuspended)}}};i([o()],s.prototype,"_routeItems",null),i([o()],s.prototype,"loadedGraphics",void 0),i([o({readOnly:!0})],s.prototype,"legendEnabled",null),i([o()],s.prototype,"layer",void 0),i([o({readOnly:!0})],s.prototype,"processor",void 0),i([o({type:Boolean})],s.prototype,"slicePlaneEnabled",void 0),s=i([b("esri.views.3d.layers.RouteLayerView3D")],s);const F=s;export{F as default};
