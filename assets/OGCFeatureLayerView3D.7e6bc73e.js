import{J as r,d as i,x as a,ab as p}from"./vendor.5a0f9a12.js";import{w as l}from"./FeatureLayerViewBase3D.50873b39.js";import"./FeatureLikeLayerView3D.3222472b.js";import"./Graphics3DFeatureProcessor.462fe7fc.js";import"./Graphics3DScaleVisibility.633f4d1f.js";import"./optimizedFeatureQueryEngineAdapter.2d287105.js";import"./PooledRBush.b04ffdfd.js";import"./quickselect.02d2bace.js";import"./Graphics3DObjectStates.c78fd15d.js";import"./QueryEngine.122382f0.js";import"./QueryEngineCapabilities.650d7541.js";import"./attributeUtils.987422a2.js";import"./FeatureStore.79f3a64e.js";import"./projectExtentUtils.1832b9cd.js";import"./EventedSet.7195c138.js";import"./popupUtils.535163fe.js";import"./RefreshableLayerView.27e350dc.js";const m=s=>{let e=class extends s{get availableFields(){return this.layer.fieldsIndex.fields.map(o=>o.name)}};return r([i()],e.prototype,"layer",void 0),r([i({readOnly:!0})],e.prototype,"availableFields",null),e=r([a("esri.views.layers.OGCFeatureLayerView")],e),e};let t=class extends m(l){constructor(){super(...arguments),this.type="ogc-feature-3d"}initialize(){this.layer.serviceSupportsSpatialReference(this.view.spatialReference)||this.addResolvingPromise(Promise.reject(new p("layerview:spatial-reference-incompatible","The spatial references supported by this OGC layer are incompatible with the spatial reference of the view",{layer:this.layer})))}};r([i()],t.prototype,"layer",void 0),t=r([a("esri.views.3d.layers.OGCFeatureLayerView3D")],t);const L=t;export{L as default};