var te=Object.defineProperty;var z=Object.getOwnPropertySymbols;var re=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable;var F=(t,e,o)=>e in t?te(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,G=(t,e)=>{for(var o in e||(e={}))re.call(e,o)&&F(t,o,e[o]);if(z)for(var o of z(e))oe.call(e,o)&&F(t,o,e[o]);return t};import{h as x,d as l,l as w,e as se,m as ne,Q as ie,g as S,a as ae,f as H,Y as le,k as ce,c as O,b as v,i as q,r as j,j as he,n as V,o as de,p as pe,q as ue,t as ge,s as fe,v as ye,u as K,w as me,x as R,y as W,z as ve,A as we,B as Y,C as be,D as X,U,E as Oe,F as _e,G as A,N as Pe,H as Re}from"./vendor.5a0f9a12.js";const Ce=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}};Ce();var Le=Object.defineProperty,Ee=Object.getOwnPropertyDescriptor,xe=(t,e,o,s)=>{for(var r=s>1?void 0:s?Ee(e,o):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(r=(s?n(e,o,r):n(r))||r);return s&&r&&Le(e,o,r),r};function $e(t){let e=t.length;for(;e!=0;){const o=Math.floor(Math.random()*e);e--,[t[e],t[o]]=[t[o],t[e]]}}class J extends x{constructor(e){super();this.colors=e,$e(e)}get selectionColor(){return this.colors.length?this.colors[0]:void 0}allocate(){this.colors.length&&this.colors.shift()}reinstate(e){this.colors.push(e)}}xe([l()],J.prototype,"selectionColor",1);const Me=["#f700dc","#f8e900","#9400f6","#04ebf3","#35f714"],je=["#f7baf1","#f7f3ba","#dcb8f5","#b6f0f2","#c3f7ba"],Te=["#4d0044","#4d4700","#2e004d","#02484b","#114d06"],L=new J(Me.map((t,e)=>({main:new w(t),dark:new w(Te[e]),light:new w(je[e])}))),_=new se({portalItem:{id:"8e49a0c79bf543fd8fa52b4dd5c9a064"}}),c=new ne({container:"viewDiv",map:_,environment:{atmosphereEnabled:!1,starsEnabled:!1,lighting:{type:"virtual"}},constraints:{altitude:{min:3e6,max:3e7}},padding:{top:20}});function D(t){const e=t.getAttribute("label");if(e)return e;if(t.layer.type==="feature")return t.getAttribute("NAME")||t.getAttribute("COUNTRY")}ie();function Se(t,e,o){const s=D(t),r=le(t.geometry,ce.WGS84),i=o.main.clone();i.a=.2;const n=o.light.clone();return n.a=.9,new S({attributes:G({label:s},t.attributes),geometry:r,symbol:new ae({symbolLayers:[new H({material:{color:[0,0,0,0]},outline:{color:o.main,size:3}}),new H({material:{color:i},outline:{color:o.light,size:1.2}})]})})}const T=180;class k{constructor(e){this.view=e}rotate(e,o){const s=O();v(this.view,[e.centroid.x,e.centroid.y,0],0,e.spatialReference,s,0,1);const r=q();return j(r,r,o,s),this.transformPolygon(e,r)}moveTo(e,o){const s=e.centroid,r=q();return this.addZRotation(o,r,!1),this.addYRotation(o,r,!1),this.addYRotation(s,r,!0),this.addZRotation(s,r,!0),this.transformPolygon(e,r)}scale(e,o){const s=e.centroid.x,r=e.centroid.y,i=e.clone();return i.rings.forEach(n=>{n.forEach(a=>{a[0]+=(a[0]-s)*(o-1),a[1]+=(a[1]-r)*(o-1)})}),i}clamp(e,o,s){return e<o?o:e>s?s:e}angle(e,o){const s=he(e,o)/(V(e)*V(o));return-Math.acos(this.clamp(s,-1,1))}axisAngleFromPoints(e,o,s=[0,0,1,0]){return de(s,e,o),pe(s,s),s[3]=this.angle(e,o),s}transformCoordinates(e,o,s,r){const i=ue(0,0,0);v(this.view,[e,o,0],0,s,i,0,1),ge(i,i,r);const n=[0,0,0];return fe(this.view,i,0,n,0,s,1),[n[0],n[1]]}transformPolygon(e,o){const s=[],r=e.spatialReference,[i]=this.transformCoordinates(e.centroid.x,e.centroid.y,r,o);for(const n of e.rings){const a=[];for(const h of n){let[d,M]=this.transformCoordinates(h[0],h[1],r,o);const f=d-i;T<Math.abs(f)&&(d=i<0?d-2*T:d+2*T),a.push([d,M])}s.push(a)}return new ye({rings:s,spatialReference:r})}addZRotation(e,o,s){const r=O(),i=O();v(this.view,[0,0,0],0,e.spatialReference,r,0,1),v(this.view,[e.x,0,0],0,e.spatialReference,i,0,1);const n=this.axisAngleFromPoints(r,i);isNaN(n[3])||j(o,o,s?n[3]:-n[3],n)}addYRotation(e,o,s){const r=O(),i=O();v(this.view,[0,0,0],0,e.spatialReference,r,0,1),v(this.view,[0,e.y,0],0,e.spatialReference,i,0,1);const n=this.axisAngleFromPoints(r,i);isNaN(n[3])||j(o,o,s?n[3]:-n[3],n)}}var Ae=Object.defineProperty,De=Object.getOwnPropertyDescriptor,m=(t,e,o,s)=>{for(var r=s>1?void 0:s?De(e,o):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(r=(s?n(e,o,r):n(r))||r);return s&&r&&Ae(e,o,r),r};const Z=new k(c),Ie=new K({symbolLayers:[new me({material:{color:[0,0,0,0]},width:5e3,height:5e3,depth:5e3,resource:{primitive:"diamond"}})]});let u=class extends x{constructor(t){super(t);this.center=new S({symbol:Ie}),this.handlers=new W;const e=t.selection.color,s=(this.graphic=Se(t.selection.graphic,c,e)).geometry.centroid;this.center.geometry=s;const r=D(t.selection.graphic),i=e.main.clone();i.a=.7,this.label=new S({geometry:s.clone(),symbol:new K({symbolLayers:[new ve({text:r,material:{color:[255,255,255,.9]},halo:{size:.5,color:e.dark},font:{size:12}})]})}),this.handlers.add(this.watch("center.geometry",n=>{this.graphic.geometry=Z.moveTo(this.graphic.geometry,n),this.label.geometry=n})),this.handlers.add(this.watch("angle",(n,a=0)=>{const h=(a-n)*Math.PI/180;this.graphic.geometry=Z.rotate(this.graphic.geometry,h)}))}get angle(){return this.center.symbol.symbolLayers.getItemAt(0).heading}destroy(){this.handlers.removeAll()}};m([l({constructOnly:!0})],u.prototype,"selection",2);m([l()],u.prototype,"graphic",2);m([l()],u.prototype,"center",2);m([l()],u.prototype,"label",2);m([l({readOnly:!0})],u.prototype,"angle",1);m([l()],u.prototype,"handlers",2);u=m([R("TrueSize.TransformedRegion")],u);var Ne=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,g=(t,e,o,s)=>{for(var r=s>1?void 0:s?ze(e,o):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(r=(s?n(e,o,r):n(r))||r);return s&&r&&Ne(e,o,r),r};let p=class extends x{constructor(){super(...arguments);this.regions=new we,this.handles=new W,this.interactive=!1,this.loading=!1}get active(){return this.sketchViewModel.state==="active"}initialize(){this.sketchLayer=new Y({title:"Graphics layer for moving country center",listMode:"hide",elevationInfo:{mode:"on-the-ground"}}),this.graphicsLayer=new Y({title:"Graphics layer for projecting country",listMode:"hide",elevationInfo:{mode:"on-the-ground"}}),_.loadAll().then(()=>{c.map.layers.push(this.sketchLayer),c.map.layers.push(this.graphicsLayer)}),this.sketchViewModel=new be({layer:this.sketchLayer,view:c,defaultUpdateOptions:{toggleToolOnClick:!1,enableScaling:!1,enableZ:!0}}),new k(c),this.sketchViewModel.on("update",t=>{if(t.state!=="active"||!t.graphics.length)return;const e=this.regionFromGraphic(t.graphics[0]),o=t.toolEventInfo.type;(o==="move-start"||o==="rotate-start")&&this._set("interactive",!0),(o==="move-stop"||o==="rotate-stop")&&(this._set("interactive",!1),o==="move-stop"&&c.goTo(e.center.geometry))}),this.sketchViewModel.on("delete",t=>{t.graphics.map(e=>this.regionFromGraphic(e)).forEach(e=>{this.graphicsLayer.remove(e.graphic),this.graphicsLayer.remove(e.label),this.regions.remove(e),L.reinstate(e.selection.color)})})}cancelEditing(){this.sketchViewModel.cancel(),this.handles.removeAll()}regionFromGraphic(t){return this.regions.find(e=>e.graphic===t||e.selection.graphic===t||e.label===t||e.center===t)}continueEditing(t){const e=this.regionFromGraphic(t);e&&this.sketchViewModel.update(e.center,{enableScaling:!1})}editSelection(t){L.allocate();const e=new u({selection:t});this.regions.add(e),this.sketchLayer.add(e.center),this.graphicsLayer.add(e.graphic),this.graphicsLayer.add(e.label),this.continueEditing(t.graphic),c.goTo(e.center.geometry)}};g([l()],p.prototype,"sketchViewModel",2);g([l()],p.prototype,"sketchLayer",2);g([l()],p.prototype,"graphicsLayer",2);g([l()],p.prototype,"regions",2);g([l()],p.prototype,"handles",2);g([l()],p.prototype,"active",1);g([l({readOnly:!0})],p.prototype,"interactive",2);g([l()],p.prototype,"loading",2);p=g([R("TrueSize.RegionEditor")],p);var Fe=Object.defineProperty,Ge=Object.getOwnPropertyDescriptor,$=(t,e,o,s)=>{for(var r=s>1?void 0:s?Ge(e,o):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(r=(s?n(e,o,r):n(r))||r);return s&&r&&Fe(e,o,r),r};function B(t){return`${t.layer.id}_${t.getObjectId()}`}let y=class extends x{constructor(t){super(t)}equalsGraphic(t){return B(this.graphic)===B(t)}async highlight(t){if(this.highlightHandle)return;t.highlightOptions={color:this.color.light,fillOpacity:1,haloColor:this.color.main,haloOpacity:.7};const e=this.graphic,s=(await t.whenLayerView(e.layer)).highlight(e);this.highlightHandle=s}removeHighlight(){const t=this.highlightHandle;t&&t.remove()}};$([l({constructOnly:!0})],y.prototype,"color",2);$([l({constructOnly:!0})],y.prototype,"graphic",2);$([l()],y.prototype,"highlightHandle",2);y=$([R("TrueSize.SelectedRegion")],y);var He=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,I=(t,e,o,s)=>{for(var r=s>1?void 0:s?qe(e,o):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(r=(s?n(e,o,r):n(r))||r);return s&&r&&He(e,o,r),r};let P=class extends X{constructor(){super(...arguments);this.selectedRegion=null,this.regionEditor=new p,this.highlightAtPointer=U(async t=>{if(this.regionEditor.active||c.interacting)return;const e=L.selectionColor;if(!e)return;const o=await this.queryRegion(t);if(o&&!this.regionEditor.active&&o.layer.type!=="graphics"){const s=this.selectedRegion;if(s&&s.equalsGraphic(o))return;this.selectedRegion=new y({graphic:o,color:e}),await this.selectedRegion.highlight(c),s&&s.removeHighlight()}else this.resetRegion()}),this.selectAtPointer=U(async t=>{if(this.regionEditor.active)return;const e=await this.queryRegion(t,!0);if(e){const o=L.selectionColor;if(e.layer.type==="graphics")this.regionEditor.continueEditing(e);else if(o){t.preventDefault();const s=e.clone(),r=s.geometry,n=Math.max(Math.abs(r.extent.ymax),Math.abs(r.extent.ymin))/2500;let a=r.rings;const h=a.reduce((f,C)=>Math.max(C.length,f),0);a=a.filter(f=>f.length>h/10);let d=0,M=0;a=a.map(f=>{const C=f.map(b=>({x:b[0],y:b[1]}));d+=C.length;const N=Oe(C,n);return M+=N.length,N.map(b=>[b.x,b.y])}),r.rings=a,this.regionEditor.editSelection(new y({color:o,graphic:s})),this.resetRegion(),await _e(this.regionEditor,"active")}}})}postInitialize(){c.popup.autoOpenEnabled=!1,this.scheduleEventListener()}render(){const t=this.selectedRegion;return A("div",{class:"place-country"},A("span",null,t?"Compare "+D(t.graphic):""))}async queryRegion(t,e=!1){const o=_.allLayers.filter(n=>n.type==="feature"||n.type==="graphics"),r=(await c.hitTest(t,{include:o})).results;function i(n){return o.indexOf(n.graphic.layer)}if(r.length){r.sort((h,d)=>i(d)-i(h));const n=r[0].graphic,a=n.layer;if(a.type==="feature"&&a instanceof Pe&&e){const h=a.createQuery();h.returnGeometry=!0,h.objectIds=[n.getObjectId()],h.outSpatialReference=n.geometry.spatialReference;const d=await a.queryFeatures(h);if(d.features.length)return d.features[0]}return n}}resetRegion(){const t=this.selectedRegion;t&&(t.removeHighlight(),this.selectedRegion=null)}scheduleEventListener(){let t=!1;c.on("pointer-move",async e=>{if(!t)try{await this.highlightAtPointer(e)}catch{}}),c.on("immediate-click",async e=>{t=!0,await this.selectAtPointer(e),t=!1})}};I([l()],P.prototype,"selectedRegion",2);I([l()],P.prototype,"regionEditor",2);P=I([R("TrueSize.PlaceCountry")],P);var Ve=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,ee=(t,e,o,s)=>{for(var r=s>1?void 0:s?Ye(e,o):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(r=(s?n(e,o,r):n(r))||r);return s&&r&&Ve(e,o,r),r};const Q=new P;let E=class extends X{constructor(){super(...arguments);this.editor=Q.regionEditor,this.white={light:new w([200,200,200]),main:new w([80,80,80]),dark:new w([20,20,20])}}postInitialize(){c.ui.add([{component:"title",position:"top-left",index:0}]),c.ui.add(Q,"manual"),_.loadAll().then(async()=>{_.allLayers.filter(t=>t.type==="feature").map(t=>t).forEach(t=>{t.fields.find(e=>e.name==="NAME")?t.outFields=["NAME"]:t.fields.find(e=>e.name==="COUNTRY")&&(t.outFields=["COUNTRY"])})})}render(){return A("div",{class:"widgets"})}};ee([l({readOnly:!0})],E.prototype,"editor",2);E=ee([R("TrueSize.App")],E);new E({container:"app"});Re(()=>!c.updating).then(()=>{var e;const t=document.getElementById("loader");(e=t==null?void 0:t.parentElement)==null||e.removeChild(t)});window.view=c;
