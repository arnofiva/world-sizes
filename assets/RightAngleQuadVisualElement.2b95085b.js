import{y as p,aH as s,iP as l,i8 as o,eV as n,e$ as u,iw as h,f2 as d,aE as M,jS as O,jn as z,b9 as _,jf as c,c4 as g,hi as y,jT as S,J as q,c6 as P,c7 as m,di as f}from"./vendor.d1b93dad.js";import{n as x}from"./LineVisualElement.640b7e15.js";class R extends x{constructor(e){super(e),this._handles=new p,this._quadMaterial=null,this._outlineMaterial=null,this._maxSize=0,this._position=s(),this._up=s(),this._right=s(),this._renderOccluded=l.OccludeAndTransparent,this._color=o(1,0,0,1),this._outlineColor=o(0,0,0,1),this._outlineSize=0,this._size=32,this._outlineRenderOccluded=l.Opaque,this.applyProps(e)}get renderOccluded(){return this._renderOccluded}set renderOccluded(e){e!==this._renderOccluded&&(this._renderOccluded=e,this._updateQuadMaterial())}get color(){return this._color}set color(e){n(this._color,e),this._updateQuadMaterial()}get outlineColor(){return this._outlineColor}set outlineColor(e){n(this._outlineColor,e),this._updateOutlineMaterial()}get outlineSize(){return this._outlineSize}set outlineSize(e){const t=this._outlineSize===0!=(e===0);this._outlineSize=e,t?this.recreateGeometry():this._updateOutlineMaterial()}get size(){return this._size}set size(e){e!==this._size&&(this._size=e,this._updateTransform())}get outlineRenderOccluded(){return this._outlineRenderOccluded}set outlineRenderOccluded(e){this._outlineRenderOccluded=e,this._updateOutlineMaterial()}set geometry({previous:e,center:t,next:i}){this._maxSize=Math.min(u(t,e),u(t,i))/3,h(this._up,d(this._up,e,t)),h(this._right,d(this._right,i,t)),M(this._position,t),this.recreateGeometry()}createExternalResources(){this._quadMaterial=new O(this.quadMaterialParameters),this._outlineMaterial=new z(this.outlineMaterialParameters),this._handles.add(this.view.state.watch("camera",()=>this._updateTransform()))}destroyExternalResources(){this._quadMaterial=null,this._outlineMaterial=null,this._handles.removeAll()}forEachExternalMaterial(e){e(this._quadMaterial),e(this._outlineMaterial)}createGeometries(e){this._createQuadGeometry(e),this._createOutlineGeometry(e),this._updateTransform(e)}_createQuadGeometry(e){const t=this._quadGeometryData(this._up,this._right);e.addGeometry(t,this._quadMaterial)}_createOutlineGeometry(e){if(this._outlineSize===0)return;const t=_(c.get(),this._up,this._right),i=g.createPolylineGeometry([this._up,t,this._right]);e.addGeometry(i,this._outlineMaterial)}_updateTransform(e=this.object){const t=this.view.state.camera,i=this._size*t.computeScreenPixelSizeAt(this._position),r=Math.min(this._maxSize,i);y(a,this._position),S(a,a,[r,r,r]),q(e)&&(e.transformation=a)}_quadGeometryData(e,t){const i=_(c.get(),e,t);return new P([[m.POSITION,{size:3,data:[0,0,0,...t,...e,...i],exclusive:!0}]],[[m.POSITION,new Uint16Array([0,1,2,1,2,3])]])}get quadMaterialParameters(){return{color:this._color,transparent:!0,writeDepth:!1,polygonOffset:!0,renderOccluded:this._renderOccluded}}_updateQuadMaterial(){this._quadMaterial&&this._quadMaterial.setParameters(this.quadMaterialParameters)}get outlineMaterialParameters(){return{color:this._outlineColor,width:this._outlineSize,renderOccluded:this._outlineRenderOccluded}}_updateOutlineMaterial(){this._outlineMaterial&&this._outlineMaterial.setParameters(this.outlineMaterialParameters)}}const a=f();export{R as z};
