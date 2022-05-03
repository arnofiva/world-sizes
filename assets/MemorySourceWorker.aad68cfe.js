var Z=Object.defineProperty,k=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;var O=(f,e,t)=>e in f?Z(f,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):f[e]=t,D=(f,e)=>{for(var t in e||(e={}))C.call(e,t)&&O(f,t,e[t]);if(R)for(var t of R(e))P.call(e,t)&&O(f,t,e[t]);return f},w=(f,e)=>k(f,A(e));import{aa as I,nC as G,n3 as z,dO as L,fq as _,L as W,fp as b,ik as Q,J as E,fz as j,nF as S,nG as B,nH as H,n7 as M}from"./vendor.d1b93dad.js";import{t as U,n as V}from"./objectIdUtils.924cdb7f.js";import{m as J}from"./FeatureStore.6d3fd27f.js";import{V as K}from"./QueryEngine.b25a2b06.js";import{a as N,n as X,l as Y}from"./clientSideDefaults.84a29eaa.js";import{y as ee,u as g,d as x,c as T,h as v}from"./sourceUtils.a99e2632.js";import"./PooledRBush.74db5953.js";import"./quickselect.02d2bace.js";import"./optimizedFeatureQueryEngineAdapter.264950bf.js";import"./QueryEngineCapabilities.650d7541.js";const te=M,ie={xmin:-180,ymin:-90,xmax:180,ymax:90,spatialReference:M},se={hasAttachments:!1,capabilities:"query, editing, create, delete, update",useStandardizedQueries:!0,supportsCoordinatesQuantization:!0,supportsReturningQueryGeometry:!0,advancedQueryCapabilities:{supportsQueryAttachments:!1,supportsStatistics:!0,supportsPercentileStatistics:!0,supportsReturningGeometryCentroid:!0,supportsQueryWithDistance:!0,supportsDistinct:!0,supportsReturningQueryExtent:!0,supportsReturningGeometryProperties:!1,supportsHavingClause:!0,supportsOrderBy:!0,supportsPagination:!0,supportsQueryWithResultType:!1,supportsSqlExpression:!0,supportsDisjointSpatialRel:!0}};function ne(f){return Q(f)?f.z!=null:!!f.hasZ}function re(f){return Q(f)?f.m!=null:!!f.hasM}class ge{constructor(){this._queryEngine=null,this._nextObjectId=null}destroy(){this._queryEngine&&this._queryEngine&&this._queryEngine.destroy(),this._queryEngine=this._fieldsIndex=this._createDefaultAttributes=null}async load(e){const t=[],{features:r}=e,i=this._inferLayerProperties(r,e.fields),d=e.fields||[],p=e.hasM!=null?e.hasM:i.hasM,c=e.hasZ!=null?e.hasZ:i.hasZ,y=!e.spatialReference&&!i.spatialReference,o=y?te:e.spatialReference||i.spatialReference,a=y?ie:null,s=e.geometryType||i.geometryType,m=!s;let u=e.objectIdField||i.objectIdField,l=e.timeInfo;if(!m&&(y&&t.push({name:"feature-layer:spatial-reference-not-found",message:"Spatial reference not provided or found in features. Defaults to WGS84"}),!s))throw new I("feature-layer:missing-property","geometryType not set and couldn't be inferred from the provided features");if(!u)throw new I("feature-layer:missing-property","objectIdField not set and couldn't be found in the provided fields");if(i.objectIdField&&u!==i.objectIdField&&(t.push({name:"feature-layer:duplicated-oid-field",message:`Provided objectIdField "${u}" doesn't match the field name "${i.objectIdField}", found in the provided fields`}),u=i.objectIdField),u&&!i.objectIdField){let n=null;d.some(h=>h.name===u&&(n=h,!0))?(n.type="esriFieldTypeOID",n.editable=!1,n.nullable=!1):d.unshift({alias:u,name:u,type:"esriFieldTypeOID",editable:!1,nullable:!1})}for(const n of d){if(n.name==null&&(n.name=n.alias),n.alias==null&&(n.alias=n.name),!n.name)throw new I("feature-layer:invalid-field-name","field name is missing",{field:n});if(n.name===u&&(n.type="esriFieldTypeOID"),G.jsonValues.indexOf(n.type)===-1)throw new I("feature-layer:invalid-field-type",`invalid type for field "${n.name}"`,{field:n})}const F={};for(const n of d)if(n.type!=="esriFieldTypeOID"&&n.type!=="esriFieldTypeGlobalID"){const h=z(n);h!==void 0&&(F[n.name]=h)}if(this._fieldsIndex=new L(d),this._createDefaultAttributes=N(F,u),l){if(l.startTimeField){const n=this._fieldsIndex.get(l.startTimeField);n?(l.startTimeField=n.name,n.type="esriFieldTypeDate"):l.startTimeField=null}if(l.endTimeField){const n=this._fieldsIndex.get(l.endTimeField);n?(l.endTimeField=n.name,n.type="esriFieldTypeDate"):l.endTimeField=null}if(l.trackIdField){const n=this._fieldsIndex.get(l.trackIdField);n?l.trackIdField=n.name:(l.trackIdField=null,t.push({name:"feature-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:l}}))}l.startTimeField||l.endTimeField||(t.push({name:"feature-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing or invalid",details:{timeInfo:l}}),l=null)}const q={warnings:t,featureErrors:[],layerDefinition:w(D({},se),{drawingInfo:X(s),templates:Y(F),extent:a,geometryType:s,objectIdField:u,fields:d,hasZ:!!c,hasM:!!p,timeInfo:l}),assignedObjectIds:{}};if(this._queryEngine=new K({fields:d,geometryType:s,hasM:p,hasZ:c,objectIdField:u,spatialReference:o,featureStore:new J({geometryType:s,hasM:p,hasZ:c}),timeInfo:l,cacheSpatialQueries:!0}),!r||!r.length)return this._nextObjectId=U,q;const $=V(u,r);return this._nextObjectId=$+1,await _(r,o),this._loadInitialFeatures(q,r)}async applyEdits(e){const{spatialReference:t,geometryType:r}=this._queryEngine;return await Promise.all([ee(t,r),_(e.adds,t),_(e.updates,t)]),this._applyEdits(e)}queryFeatures(e,t={}){return this._queryEngine.executeQuery(e,t.signal)}queryFeatureCount(e,t={}){return this._queryEngine.executeQueryForCount(e,t.signal)}queryObjectIds(e,t={}){return this._queryEngine.executeQueryForIds(e,t.signal)}queryExtent(e,t={}){return this._queryEngine.executeQueryForExtent(e,t.signal)}querySnapping(e,t={}){return this._queryEngine.executeQueryForSnapping(e,t.signal)}_inferLayerProperties(e,t){let r,i,d=null,p=null,c=null;for(const y of e){const o=y.geometry;if(!W(o)&&(d||(d=b(o)),p||(p=o.spatialReference),r==null&&(r=ne(o)),i==null&&(i=re(o)),d&&p&&r!=null&&i!=null))break}if(t&&t.length){let y=null;t.some(o=>{const a=o.type==="esriFieldTypeOID",s=!o.type&&o.name&&o.name.toLowerCase()==="objectid";return y=o,a||s})&&(c=y.name)}return{geometryType:d,spatialReference:p,objectIdField:c,hasM:i,hasZ:r}}_loadInitialFeatures(e,t){const{geometryType:r,hasM:i,hasZ:d,objectIdField:p,spatialReference:c,featureStore:y}=this._queryEngine,o=[];for(const a of t){if(a.uid!=null&&(e.assignedObjectIds[a.uid]=-1),a.geometry&&r!==b(a.geometry)){e.featureErrors.push(g("Incorrect geometry type."));continue}const s=this._createDefaultAttributes(),m=x(this._fieldsIndex,s,a.attributes,!0,e.warnings);m?e.featureErrors.push(m):(this._assignObjectId(s,a.attributes,!0),a.attributes=s,a.uid!=null&&(e.assignedObjectIds[a.uid]=a.attributes[p]),E(a.geometry)&&(a.geometry=j(a.geometry,a.geometry.spatialReference,c)),o.push(a))}if(y.addMany(S([],o,r,d,i,p)),e.layerDefinition.extent=this._queryEngine.fullExtent,e.layerDefinition.timeInfo){const{start:a,end:s}=this._queryEngine.timeExtent;e.layerDefinition.timeInfo.timeExtent=[a,s]}return e}_applyEdits(e){const{adds:t,updates:r,deletes:i}=e,d={addResults:[],deleteResults:[],updateResults:[],uidToObjectId:{}};if(t&&t.length&&this._applyAddEdits(d,t),r&&r.length&&this._applyUpdateEdits(d,r),i&&i.length){for(const p of i)d.deleteResults.push(T(p));this._queryEngine.featureStore.removeManyById(i)}return{fullExtent:this._queryEngine.fullExtent,featureEditResults:d}}_applyAddEdits(e,t){const{addResults:r}=e,{geometryType:i,hasM:d,hasZ:p,objectIdField:c,spatialReference:y,featureStore:o}=this._queryEngine,a=[];for(const s of t){if(s.geometry&&i!==b(s.geometry)){r.push(g("Incorrect geometry type."));continue}const m=this._createDefaultAttributes(),u=x(this._fieldsIndex,m,s.attributes);if(u)r.push(u);else{if(this._assignObjectId(m,s.attributes),s.attributes=m,s.uid!=null){const l=s.attributes[c];e.uidToObjectId[s.uid]=l}E(s.geometry)&&(s.geometry=j(v(s.geometry,y),s.geometry.spatialReference,y)),a.push(s),r.push(T(s.attributes[c]))}}o.addMany(S([],a,i,p,d,c))}_applyUpdateEdits({updateResults:e},t){const{geometryType:r,hasM:i,hasZ:d,objectIdField:p,spatialReference:c,featureStore:y}=this._queryEngine;for(const o of t){const{attributes:a,geometry:s}=o,m=a&&a[p];if(m==null){e.push(g(`Identifier field ${p} missing`));continue}if(!y.has(m)){e.push(g(`Feature with object id ${m} missing`));continue}const u=B(y.getFeature(m),r,d,i);if(E(s)){if(r!==b(s)){e.push(g("Incorrect geometry type."));continue}u.geometry=j(v(s,c),s.spatialReference,c)}if(a){const l=x(this._fieldsIndex,u.attributes,a);if(l){e.push(l);continue}}y.add(H(u,r,d,i,p)),e.push(T(m))}}_assignObjectId(e,t,r=!1){const i=this._queryEngine.objectIdField;r&&t&&isFinite(t[i])?e[i]=t[i]:e[i]=this._nextObjectId++}}export{ge as default};
