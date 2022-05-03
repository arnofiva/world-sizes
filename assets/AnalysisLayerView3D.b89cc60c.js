import{bZ as w,b_ as u,A as c,J as o,aa as y,c0 as m,L as V,c1 as p,I as n,d as r,u as _}from"./vendor.d1b93dad.js";const d="analysis-view-handles";let i=class extends w(u){constructor(e){super(e),this.type="analysis-3d",this.allAnalysisViews=new c,this._creatingViewCount=0,this._analysisViewCreationTasks=new Map,this._analysisModules={"area-measurement":{module:null},"direct-line-measurement":{module:null},"line-of-sight":{module:null},slice:{module:null}}}initialize(){for(const e of this.layer.analyses)this._createAnalysisView(e);this.handles.add([this.layer.analyses.on("after-add",e=>{this._createAnalysisView(e.item)}),this.layer.analyses.on("after-remove",e=>{const s=this.allAnalysisViews.removeAt(this.allAnalysisViews.findIndex(t=>t.analysis===e.item));o(s)&&s.destroy();const a=this._analysisViewCreationTasks.get(e.item);o(a)&&(a.abort(),this._analysisViewCreationTasks.delete(e.item))})],d)}destroy(){this.handles.remove(d),this.allAnalysisViews.drain(e=>e.destroy()),this._analysisViewCreationTasks.clear(),this._creatingViewCount=0}whenAnalysisView(e){const s=this._analysisViewCreationTasks.get(e);if(o(s))return s.promise;const a=new y("layerview:no-analysisview-for-analysis","The analysis has not been added to the AnalysisLayer of this layer view",{analysis:e});return Promise.reject(a)}isUpdating(){return this._creatingViewCount!==0||this.allAnalysisViews.some(e=>e.updating)}_createAnalysisView(e){this._analysisViewCreationTasks.set(e,m(s=>this._createAnalysisViewPromise(e,s)))}async _createAnalysisViewPromise(e,s){this._creatingViewCount+=1;const a=e.type,t=this._analysisModules[a];if(V(t.module)){const h=await this._loadAnalysisModule(a);t.module=h}const l=new t.module.default({analysis:e,view:this.view,parent:this});if(await l.when(),this._creatingViewCount-=1,p(s))throw l.destroy(),new y("layerview:no-analysisview-for-analysis","The analysis has not been added to the AnalysisLayer of this layer view",{analysis:e});return this.allAnalysisViews.add(l),l}_loadAnalysisModule(e){switch(e){case"area-measurement":return import("./AreaMeasurementAnalysisView3D.82f60dda.js").then(function(s){return s.A});case"direct-line-measurement":return import("./DirectLineMeasurementAnalysisView3D.b61c1f36.js").then(function(s){return s.D});case"line-of-sight":return import("./LineOfSightAnalysisView3D.e3f0e4b8.js");case"slice":return import("./SliceAnalysisView3D.400658bc.js");default:return null}}};n([r()],i.prototype,"type",void 0),n([r()],i.prototype,"layer",void 0),n([r()],i.prototype,"allAnalysisViews",void 0),n([r()],i.prototype,"_creatingViewCount",void 0),i=n([_("esri.views.3d.layers.AnalysisLayerView3D")],i);const f=i;export{f as default};
