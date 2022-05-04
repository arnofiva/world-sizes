var It=Object.defineProperty,Lt=Object.defineProperties;var Vt=Object.getOwnPropertyDescriptors;var ut=Object.getOwnPropertySymbols;var Rt=Object.prototype.hasOwnProperty,St=Object.prototype.propertyIsEnumerable;var dt=(t,e,i)=>e in t?It(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,K=(t,e)=>{for(var i in e||(e={}))Rt.call(e,i)&&dt(t,i,e[i]);if(ut)for(var i of ut(e))St.call(e,i)&&dt(t,i,e[i]);return t},Q=(t,e)=>Lt(t,Vt(e));import{J as n,d as s,l as h,x as E,h as z,aI as g,bR as Z,k1 as At,jG as Pt,k2 as $t,k3 as Ot,ay as Et,az as zt,k4 as Ht,k5 as xt,k6 as Dt,M as m,jD as L,fb as kt,bb as N,k7 as jt,ei as A,k8 as et,k9 as Nt,ka as st,K as u,am as Gt,gs as Ut,iF as rt,ba as F,ho as wt,ax as Ft,al as Tt,I as Bt,aM as pt,y as at,aZ as X,aF as I,fd as M,kb as k,bc as ct,dR as ht,kc as gt,dt as j,a6 as f,an as vt,bx as Mt,kd as yt,ke as Wt,a8 as W,kf as mt,a_ as D,aH as Jt,P as _t,a7 as R,gC as qt,kg as Kt,cf as Qt,kh as Zt,V as G,dy as Xt,di as Yt,A as te,dm as ee}from"./vendor.5a0f9a12.js";import{p as ie}from"./AnalysisView3D.4f71e3f1.js";import{a as Ct,b as ne,g as it}from"./LineVisualElement.9378dd44.js";let O=class extends z{constructor(t){super(t),this.innerWidth=2,this.outerWidth=8,this.visibleInnerColor=new h([3,252,111,1]),this.visibleOuterColor=new h([3,252,111,.15]),this.occludedInnerColor=new h([252,3,69,1]),this.occludedOuterColor=new h([252,3,69,.1]),this.undefinedInnerColor=new h([255,255,255,1]),this.undefinedOuterColor=new h([127,127,127,.2])}};n([s({type:Number})],O.prototype,"innerWidth",void 0),n([s({type:Number})],O.prototype,"outerWidth",void 0),n([s({type:h})],O.prototype,"visibleInnerColor",void 0),n([s({type:h})],O.prototype,"visibleOuterColor",void 0),n([s({type:h})],O.prototype,"occludedInnerColor",void 0),n([s({type:h})],O.prototype,"occludedOuterColor",void 0),n([s({type:h})],O.prototype,"undefinedInnerColor",void 0),n([s({type:h})],O.prototype,"undefinedOuterColor",void 0),O=n([E("esri.views.3d.analysis.LineOfSight.LineOfSightConfiguration")],O);let P=class extends z{constructor(t){super(t),this.target=null,this.intersectedGraphic=null,this.intersectedLocation=null,this.elevationAlignedTargetLocation=null}};n([s()],P.prototype,"target",void 0),n([s()],P.prototype,"intersectedGraphic",void 0),n([s()],P.prototype,"intersectedLocation",void 0),n([s()],P.prototype,"elevationAlignedTargetLocation",void 0),n([s()],P.prototype,"visible",void 0),P=n([E("esri.views.3d.analysis.LineOfSightAnalysisResult")],P);let $=class extends z{constructor(t){super(t),this.elevationAlignedTargetLocation=null,this.inputPoints={isValid:!1,observer:g(),observerSurfaceNormal:null,target:g(),targetSurfaceNormal:null,observerAdjusted:g(),targetAdjusted:g()},this.computationResult={start:g(),end:g(),intersection:g(),isValid:!1,isTargetVisible:!1},this.result=null}notifyResultChanged(){this.notifyChange("computationResult")}notifyInputPointsChanged(){this.notifyChange("inputPoints")}};n([s()],$.prototype,"target",void 0),n([s()],$.prototype,"elevationAlignedTargetLocation",void 0),n([s()],$.prototype,"inputPoints",void 0),n([s()],$.prototype,"computationResult",void 0),n([s()],$.prototype,"result",void 0),$=n([E("esri.views.3d.analysis.LineOfSight.LineOfSightComputation")],$);var lt;let T=lt=class extends z{constructor(t){super(t)}clone(){return new lt({type:this.type,id:Z(this.id),point:Z(this.point),normal:Z(this.normal),ray:Z(this.ray)})}equals(t){return this.type===t.type&&this.id===t.id&&At(this.point,t.point)&&Pt(this.normal,t.normal)&&$t(this.ray,t.ray)}};n([s()],T.prototype,"type",void 0),n([s({constructOnly:!0})],T.prototype,"id",void 0),n([s({constructOnly:!0})],T.prototype,"point",void 0),n([s({constructOnly:!0})],T.prototype,"normal",void 0),n([s({constructOnly:!0})],T.prototype,"ray",void 0),T=lt=n([E("esri.views.3d.analysis.LineOfSight.LineOfSightIntersectionResult")],T);let B=class extends z{constructor(t){super(t)}initialize(){this.intersector=Et(this.view.state.viewingMode),this.intersector.options.hud=!1,this.intersector.options.store=zt.MIN}getScreenPointIntersection(t){const e=Ht(t,xt.get()),i=Dt(this.view.state.camera,e,ot);return this._getRayIntersection(i)}_getRayIntersection(t){if(m(t))return null;this.view.sceneIntersectionHelper.intersectToolIntersectorRay(t,this.intersector);const e=this.intersector.results.min;if(!e.getIntersectionPoint(nt))return null;const i=this.view.renderCoordsHelper.fromRenderCoords(nt,this.view.spatialReference),o=L(e.normal),r=kt(o,t.direction)>0?-1:1;if(N(o,o,r),jt(e))return new T({type:A.OBJECT,id:`${e.target.layerUid}/${e.target.nodeIndex}/${e.target.componentIndex}`,point:i,normal:o,ray:et(t)});if(Nt(e))return new T({type:A.TERRAIN,id:e.target.lij.slice(),point:i,normal:o,ray:et(t)});const l=st(e,this.view);if(u(l)){const a=l.layer,p=l.sourceLayer;let d;return p&&p.type==="scene"?d=Gt(l,p.objectIdField):d=l.uid,new T({type:A.OBJECT,id:`${a.uid}/${d}`,point:i,normal:o,ray:et(t)})}return null}_canUpdateFromIntersectionResult(t,e){if(m(t)||!e||t.type!==e.type)return!1;switch(t.type){case A.TERRAIN:{const i=t.id,o=e.id;return i[0]===o[0]&&i[1]===o[1]&&i[2]===o[2]||Ut(i,o)}case A.OBJECT:case A.I3S:return t.id===e.id}}updateFromIntersectionResult(t){let e;if(t.type===A.TERRAIN&&u(t.point)){const i=nt,o=oe,r=se;this.view.renderCoordsHelper.toRenderCoords(t.point,o),this.view.renderCoordsHelper.worldUpAtPosition(o,r);const l=this.view.basemapTerrain.elevationBounds,a=this.view.renderCoordsHelper.getAltitude(o),p=l?Math.abs(l.max-l.min)/Math.abs(a):100,d=a>0?1:-1;rt(r,r),N(r,r,d*p),F(i,o,r),wt(i,o,ot),e=this._getRayIntersection(ot)}else e=this._getRayIntersection(t.ray);return this._canUpdateFromIntersectionResult(e,t)?e.point:null}};n([s()],B.prototype,"view",void 0),n([s()],B.prototype,"intersector",void 0),B=n([E("esri.views.3d.analysis.LineOfSight.LineOfSightRayIntersector")],B);const nt=g(),oe=g(),se=g(),ot=Ot(),ft=Ft.getLogger("esri.views.3d.analysis.LineOfSight.LineOfSightController");let _=class extends Tt.EventedMixin(z){constructor(t){super(t),this.updateOnCameraChange=!0,this._updatingHandles=new Bt,this._frameTask=pt,this._handles=new at,this._computationHandles=new at,this._externalObserverUpdate=!0}initialize(){var t;const e=(t=this.view.resourceController)==null?void 0:t.scheduler;this._frameTask=e?e.registerTask(X.LINE_OF_SIGHT_TOOL):pt,this._intersector=new B({view:this.view}),this._handles.add([this._connectObserver(),this._connectComputations(),this._connectTargets()])}destroy(){this._handles.destroy(),this._computationHandles.destroy(),this._computations.removeAll(),this._updatingHandles.destroy()}get updating(){return this._frameTask.updating||this._updatingHandles.updating}get priority(){return this._frameTask.priority}set priority(t){this._frameTask.priority=t}get _computations(){return this.analysisViewData.computations}get _observerEngineLocation(){return this.analysisViewData.observerEngineLocation}set _observerEngineLocation(t){this.analysisViewData.observerEngineLocation=t}get _screenPixelSize(){return this.view.state.camera.computeScreenPixelSizeAt(this._observerEngineLocation)}getLineOfSightComputationDependencies(t){const{inputPoints:e}=t;return{inputPoints:e}}_computeResult(t){const e=t.computation,{inputPoints:i,computationResult:o}=e,{observerAdjusted:r,targetAdjusted:l}=i,{start:a,end:p}=o;I(a,r),I(p,l),this._canCompute(e)?this._computeIntersection(t):this._interpolateIntersection(t),e.notifyResultChanged(),this.emit("result-changed",{target:t.computation.target,result:e.result})}_adjustStartEndPositions(t){const e=this._screenPixelSize,i=this.view,{inputPoints:o}=t,{observer:r,observerSurfaceNormal:l,target:a,targetSurfaceNormal:p,observerAdjusted:d,targetAdjusted:w}=o,c=Y;u(l)?I(c,l):M(c,a,r);const y=e;rt(c,c),N(c,c,Math.min(y,1)),F(d,r,c),u(p)?I(c,p):M(c,r,a);const H=i.state.camera.computeScreenPixelSizeAt(a);rt(c,c),N(c,c,Math.min(H,1)),F(w,a,c)}_computeIntersection({computation:t,interpolationInfo:e}){const{view:i}=this,{sceneIntersectionHelper:o,renderCoordsHelper:r}=i;if(m(o))return;const l=this._intersector.intersector,{computationResult:a,inputPoints:p}=t,{observer:d,target:w}=p,{start:c,end:y}=a,H=wt(c,y,ae);o.intersectToolIntersectorRay(H,l);const S=a.intersection,U=Y;let v=!0;if(l.results.min.getIntersectionPoint(S)){I(e.originalIntersection,S),I(e.originalObserver,c),I(e.originalTarget,y),r.fromRenderCoords(S,U,i.spatialReference);const b=1-k(y,w)/k(c,w);v=k(d,S)>=b*k(d,w)}const x=new ct(U,i.spatialReference);{const{result:b,target:J}=t;u(b)?(b.target=J,b.intersectedGraphic=v?null:st(l.results.min,i),b.intersectedLocation=v?null:x,b.visible=v):t.result=new P({target:J,elevationAlignedTargetLocation:t.elevationAlignedTargetLocation,intersectedGraphic:v?null:st(l.results.min,i),intersectedLocation:v?null:x,visible:v})}a.isValid=p.isValid=!0,a.isTargetVisible=v}_interpolateIntersection({computation:t,interpolationInfo:e}){const{computationResult:i,inputPoints:o}=t,{start:r,end:l,intersection:a}=i,{originalIntersection:p,originalObserver:d,originalTarget:w}=e;if(I(a,p),o.isValid){const c=Y,y=k(d,p)/k(d,w);ht(c,r,d),N(c,c,1-y),F(a,a,c),ht(c,l,w),N(c,c,y),F(a,a,c),i.isValid=!0}else t.result=null,i.isValid=!1,i.isTargetVisible=!1}_canCompute(t){const e=this.analysisViewData.elevationAlignedObserver,i=this.view.frustum;if(m(e)||m(t.elevationAlignedTargetLocation)||m(i))return!1;const{observerAdjusted:o,targetAdjusted:r}=t.inputPoints,l=i.intersectsPoint(o),a=i.intersectsPoint(r);return l&&a}_onObserverPositionChange(t,e,i){if(this._externalObserverUpdate=i,m(t))return void(this.analysisViewData.elevationAlignedObserver=null);const o=this._applyProjectionAndElevationAlignment(t,e);if(m(o))return Ct(this.analysis,t.spatialReference,ft),void(this.analysisViewData.elevationAlignedObserver=null);const r=g();this.analysisViewData.elevationAlignedObserver=o,this.view.renderCoordsHelper.toRenderCoords(this.analysisViewData.elevationAlignedObserver,r),this._observerEngineLocation=r,this.priority=X.LINE_OF_SIGHT_TOOL_INTERACTIVE}_applyProjectionAndElevationAlignment(t,e){const i=u(e)&&e.type!==A.OBJECT;return ne(t,this.view.spatialReference,this.view.elevationProvider,i)}_onObserverRenderSpacePositionChangeForComputation(t,e,i){const{inputPoints:o}=t;if(I(o.observer,e),u(i)){const r=this._intersector.updateFromIntersectionResult(i);u(r)&&this.view.renderCoordsHelper.toRenderCoords(r,o.observer),o.observerSurfaceNormal=gt(i.normal)}else o.observerSurfaceNormal=null;this._adjustStartEndPositions(t),t.notifyInputPointsChanged(),this.priority=X.LINE_OF_SIGHT_TOOL_INTERACTIVE}_onTargetPositionChange(t,e,i,o=!0){const r=t.inputPoints;if(o&&(r.isValid=!1),t.elevationAlignedTargetLocation=this._applyProjectionAndElevationAlignment(e,i),m(t.elevationAlignedTargetLocation))Ct(this.analysis,e.spatialReference,ft);else{if(this.view.renderCoordsHelper.toRenderCoords(t.elevationAlignedTargetLocation,r.target),u(i)){const l=this._intersector.updateFromIntersectionResult(i);u(l)&&this.view.renderCoordsHelper.toRenderCoords(l,r.target),r.targetSurfaceNormal=gt(i.normal)}else r.targetSurfaceNormal=null;this._adjustStartEndPositions(t)}t.notifyInputPointsChanged(),this.priority=X.LINE_OF_SIGHT_TOOL_INTERACTIVE}_connectComputationToTarget(t){return j([f(()=>t.target.position,e=>{bt(e,t.target.intersection)||(t.target.intersection=null)},_t),f(()=>({computation:t,targetPosition:t.target.position,targetIntersection:t.target.intersection}),({computation:e,targetPosition:i,targetIntersection:o})=>{u(i)&&this._onTargetPositionChange(e,i,o)},R)])}_connectComputationToObserver(t){return f(()=>({computation:t,observer:this.analysisViewData.elevationAlignedObserver}),({computation:e})=>{this._externalObserverUpdate&&(e.inputPoints.isValid=!1,e.notifyInputPointsChanged())},R)}_connectComputationToRenderSpaceObserver(t){return f(()=>({computation:t,observer:this._observerEngineLocation,observerIntersection:u(this.analysis.observer)?this.analysis.observer.intersection:null}),({computation:e,observer:i,observerIntersection:o})=>{this._onObserverRenderSpacePositionChangeForComputation(e,i,o)},R)}_connectComputationToCamera(t){return f(()=>({camera:this.view.state.camera,isDirty:this._isCameraDirty}),({isDirty:e})=>{!this.updateOnCameraChange||t.inputPoints.isValid&&!e||t.notifyInputPointsChanged()},qt)}_connectComputationToSlicePlane(t){return f(()=>this.view.slicePlane,()=>t.notifyInputPointsChanged())}_connectComputationToElevation(t){return this.view.elevationProvider.on("elevation-change",e=>{const i=this.analysis.observer,o=t.target;let r=null,l=null,a=null,p=null;const d=u(i)&&u(i.position)?i.position.spatialReference:u(o.position)?o.position.spatialReference:e.spatialReference;u(i)&&u(i.position)&&(r=le,l=i.intersection,vt(i.position,r,d)),u(o.position)&&(a=ce,p=o.intersection,vt(o.position,a,d)),m(r)&&m(a)||(Mt(e.extent,e.spatialReference,tt,d),u(r)&&yt(tt,r)&&this._onObserverPositionChange(r,l,!1),u(a)&&yt(tt,a)&&this._onTargetPositionChange(t,a,p,!1),u(r)&&u(a)&&Wt(tt,r,a)&&t.notifyInputPointsChanged())})}_connectComputationToTask(t){let e=Kt;const i={computation:t,interpolationInfo:{originalIntersection:g(),originalObserver:g(),originalTarget:g()}};return j([f(()=>this.getLineOfSightComputationDependencies(t),()=>{e=mt(e),e=Qt(async o=>{await Zt(this._frameTask.schedule(()=>this._computeResult(i),o))})},R),W(()=>e=mt(e))])}_connectComputation(t){const e=this._computationHandles;e.has(t)||e.add([this._connectComputationToTarget(t),this._connectComputationToObserver(t),this._connectComputationToRenderSpaceObserver(t),this._connectComputationToCamera(t),this._connectComputationToSlicePlane(t),this._connectComputationToElevation(t),this._connectComputationToTask(t)],t)}_disconnectAnalysis(t){this._computationHandles.remove(t)}_onComputationCollectionChange(t){t.added.forEach(e=>this._connectComputation(e)),t.removed.forEach(e=>this._disconnectAnalysis(e))}_onTargetsChange(){return this._computations.removeAll(),this.analysis.targets.forEach(t=>this._addTarget(t)),this._updatingHandles.addOnCollectionChange(()=>this.analysis.targets,t=>this._onTargetCollectionChange(t))}_onTargetCollectionChange(t){t.added.forEach(e=>this._addTarget(e)),t.removed.forEach(e=>this._removeTarget(e))}_onCursorTargetChange(t,e){u(e)&&this._removeTarget(e),u(t)&&this._addTarget(t)}_addTarget(t){this._computations.some(e=>e.target===t)||this._computations.add(new $({target:t}))}_removeTarget(t){const e=this._computations.find(i=>i.target===t);this._computations.remove(e)}_connectObserver(){return j([f(()=>({observer:this.analysis.observer,observerPosition:u(this.analysis.observer)?this.analysis.observer.position:null,observerIntersection:u(this.analysis.observer)?this.analysis.observer.intersection:null}),({observer:t,observerPosition:e,observerIntersection:i})=>{u(t)&&!bt(e,i)&&(t.intersection=null)},_t),f(()=>({observerPosition:u(this.analysis.observer)?this.analysis.observer.position:null,observerIntersection:u(this.analysis.observer)?this.analysis.observer.intersection:null}),({observerPosition:t,observerIntersection:e})=>this._onObserverPositionChange(t,e,!0),R)])}_connectComputations(){let t=null;return j([f(()=>this._computations,()=>{D(t),t=this._updatingHandles.addOnCollectionChange(()=>this._computations,e=>this._onComputationCollectionChange(e)),this._computations.forEach(e=>this._connectComputation(e))},R),W(()=>t=D(t))])}_connectTargets(){let t=null;return j([f(()=>this.analysis.targets,()=>{t=D(t),t=this._onTargetsChange()},R),f(()=>this.analysisViewData.cursorTarget,(e,i)=>{this._onCursorTargetChange(e,i)}),W(()=>{t=D(t)})])}get _isCameraDirty(){const t=this.analysisViewData.elevationAlignedObserver,{view:e}=this,{renderCoordsHelper:i}=e;if(m(t)||m(i))return!1;const o=Y;i.toRenderCoords(t,o);const r=e.state.camera.computeScreenPixelSizeAt(o);return Math.abs((r-this._screenPixelSize)/this._screenPixelSize)>re}};function bt(t,e){return m(e)||u(t)&&t.equals(e.point)}n([s({constructOnly:!0})],_.prototype,"analysis",void 0),n([s({constructOnly:!0})],_.prototype,"analysisViewData",void 0),n([s({constructOnly:!0})],_.prototype,"view",void 0),n([s()],_.prototype,"updating",null),n([s()],_.prototype,"priority",null),n([s()],_.prototype,"updateOnCameraChange",void 0),n([s()],_.prototype,"_computations",null),n([s()],_.prototype,"_observerEngineLocation",null),n([s()],_.prototype,"_screenPixelSize",null),n([s({readOnly:!0})],_.prototype,"_updatingHandles",void 0),n([s()],_.prototype,"_frameTask",void 0),n([s()],_.prototype,"_isCameraDirty",null),_=n([E("esri.views.3d.analysis.LineOfSight.LineOfSightController")],_);const re=.1,Y=g(),ae=Ot(),tt=Jt(),le=new ct,ce=new ct;let V=class extends z{constructor(t){super(t),this._lineOfSightVisualizations=[],this._handle=null,this._computationHandles=new at}initialize(){this._handle=this._connectAnalysis()}destroy(){this._handle=D(this._handle),this._computationHandles=G(this._computationHandles)}get visible(){return this.analysisViewData.visible}get testInfo(){return{visualizations:this._lineOfSightVisualizations}}get _configuration(){return this.analysisViewData.configuration}createLineOfSightVisualization(){const t=this._configuration,e={view:this.view,attached:!0,width:t.outerWidth,innerWidth:t.innerWidth},i=h.toUnitRGBA(t.visibleOuterColor),o=h.toUnitRGBA(t.visibleInnerColor),r=h.toUnitRGBA(t.occludedOuterColor),l=h.toUnitRGBA(t.occludedInnerColor),a=h.toUnitRGBA(t.undefinedOuterColor),p=h.toUnitRGBA(t.undefinedInnerColor),d={visibleLineVisualElement:new it(Q(K({},e),{color:i,innerColor:o})),occludedLineVisualElement:new it(Q(K({},e),{color:r,innerColor:l})),undefinedLineVisualElement:new it(Q(K({},e),{color:a,innerColor:p}))};return this._lineOfSightVisualizations.push(d),d}destroyLineOfSightVisualization(t){t.visibleLineVisualElement=G(t.visibleLineVisualElement),t.occludedLineVisualElement=G(t.occludedLineVisualElement),t.undefinedLineVisualElement=G(t.undefinedLineVisualElement),this._lineOfSightVisualizations.splice(this._lineOfSightVisualizations.indexOf(t),1)}updateLineOfSightVisualization(t,e){const i=this._configuration,{computationResult:o,inputPoints:r}=t,{start:l,end:a,intersection:p,isValid:d,isTargetVisible:w}=o,{observer:c}=r,y=he;y[12]=c[0],y[13]=c[1],y[14]=c[2];const H=M(ue,l,c),S=M(de,a,c),U=M(pe,p,c),{visibleLineVisualElement:v,occludedLineVisualElement:x,undefinedLineVisualElement:b}=e,J=m(this.analysisViewData.elevationAlignedObserver)||m(t.elevationAlignedTargetLocation),q=this.visible&&!J;v.visible=q,x.visible=q,b.visible=q,q&&(v.geometry=null,x.geometry=null,b.geometry=null,d?w?(v.geometry=[[L(H),L(S)]],v.transform=y,v.color=h.toUnitRGBA(i.visibleOuterColor)):(v.geometry=[[L(H),L(U)]],v.transform=y,v.color=h.toUnitRGBA(i.occludedOuterColor),x.geometry=[[L(U),L(S)]],x.transform=y):(b.geometry=[[L(H),L(S)]],b.transform=y))}getLineOfSightVisualizationDependencies(t){const{computationResult:e}=t,{occludedOuterColor:i,visibleOuterColor:o}=this._configuration;return{computationResult:e,occludedOuterColor:i,visibleOuterColor:o,visible:this.visible}}_connectComputation(t){const e=this._computationHandles;if(e.has(t))return;const i=this.createLineOfSightVisualization();e.add([f(()=>this.getLineOfSightVisualizationDependencies(t),()=>this.updateLineOfSightVisualization(t,i),R),W(()=>this.destroyLineOfSightVisualization(i))],t)}_disconnectComputation(t){this._computationHandles.remove(t)}_connectAnalysis(){let t=null;return j([f(()=>this.analysisViewData.computations,e=>{t=D(t),t=e.on("change",i=>this._onComputationsCollectionChange(i)),this._onComputationsCollectionChange({target:e,added:e.items,removed:[],moved:[]})},R),W(()=>t=D(t))])}_onComputationsCollectionChange(t){t.added.forEach(e=>this._connectComputation(e)),t.removed.forEach(e=>this._disconnectComputation(e))}};n([s({constructOnly:!0})],V.prototype,"analysis",void 0),n([s({constructOnly:!0})],V.prototype,"analysisViewData",void 0),n([s({constructOnly:!0})],V.prototype,"view",void 0),n([s({readOnly:!0})],V.prototype,"visible",null),n([s()],V.prototype,"testInfo",null),n([s()],V.prototype,"_configuration",null),V=n([E("esri.views.3d.analysis.LineOfSight.LineOfSightVisualization")],V);const ue=g(),de=g(),pe=g(),he=Xt();let C=class extends ie(Yt(Tt.EventedMixin(z))){constructor(t){super(t),this.type="line-of-sight-view-3d",this.computations=new te,this.elevationAlignedObserver=null,this.configuration=new O,this.observerEngineLocation=g(),this.cursorTarget=null}initialize(){const t=this.view,e=this.analysis;this._analysisController=new _({analysis:e,analysisViewData:this,view:t}),this._analysisVisualization=new V({analysis:e,analysisViewData:this,view:t}),this.handles.add([this._analysisController.on("result-changed",i=>{i.target!==this.cursorTarget&&this.emit("result-changed",i)})])}destroy(){this._analysisController=G(this._analysisController),this._analysisVisualization=G(this._analysisVisualization)}get results(){return this.computations.map(t=>t.result)}get priority(){return this._analysisController.priority}set priority(t){this._analysisController.priority=t}get updating(){return u(this._analysisController)&&this._analysisController.updating}getResultForTarget(t){const e=this.computations.find(i=>i.target===t);return ee(e,i=>i.result)}get testInfo(){return{visualization:this._analysisVisualization,controller:this._analysisController}}};n([s()],C.prototype,"type",void 0),n([s()],C.prototype,"analysis",void 0),n([s({readOnly:!0})],C.prototype,"results",null),n([s()],C.prototype,"priority",null),n([s()],C.prototype,"computations",void 0),n([s()],C.prototype,"elevationAlignedObserver",void 0),n([s()],C.prototype,"configuration",void 0),n([s()],C.prototype,"observerEngineLocation",void 0),n([s()],C.prototype,"cursorTarget",void 0),n([s()],C.prototype,"updating",null),n([s()],C.prototype,"_analysisController",void 0),n([s()],C.prototype,"_analysisVisualization",void 0),C=n([E("esri.views.3d.analysis.LineOfSightAnalysisView3D")],C);const _e=C;export{_e as default};