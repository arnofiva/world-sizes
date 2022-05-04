var I=Object.defineProperty;var g=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var b=(e,t,a)=>t in e?I(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,h=(e,t)=>{for(var a in t||(t={}))$.call(t,a)&&b(e,a,t[a]);if(g)for(var a of g(t))E.call(t,a)&&b(e,a,t[a]);return e};import{bR as S,ab as i,A as y,K as F,bS as R,bT as O,g as U}from"./vendor.5a0f9a12.js";function k(e){return e&&e.applyEdits!=null}async function j(e,t,a,n={}){let d,l;const r={edits:a,result:new Promise((s,c)=>{d=s,l=c})};e.emit("apply-edits",r);try{var o;const{results:s,edits:c}=await L(e,t,a,n),p=A=>A.filter(v=>!v.error).map(S),u={edits:c,addedFeatures:p(s.addFeatureResults),updatedFeatures:p(s.updateFeatureResults),deletedFeatures:p(s.deleteFeatureResults),addedAttachments:p(s.addAttachmentResults),updatedAttachments:p(s.updateAttachmentResults),deletedAttachments:p(s.deleteAttachmentResults)};return(o=s.editedFeatureResults)!=null&&o.length&&(u.editedFeatures=s.editedFeatureResults),(u.addedFeatures.length||u.updatedFeatures.length||u.deletedFeatures.length||u.addedAttachments.length||u.updatedAttachments.length||u.deletedAttachments.length)&&e.emit("edits",u),d(u),s}catch(s){throw l(s),s}}async function L(e,t,a,n){if(await e.load(),!k(t))return Promise.reject(new i(`${e.type}-layer:no-editing-support`,"Layer source does not support applyEdits capability",{layer:e}));if(!e.editingEnabled)throw new i(`${e.type}-layer:editing-disabled`,"Editing is disabled for layer",{layer:e});const{edits:d,options:l}=await B(e,a,n);return d.addFeatures.length||d.updateFeatures.length||d.deleteFeatures.length||d.addAttachments.length||d.updateAttachments.length||d.deleteAttachments.length?{edits:d,results:await t.applyEdits(d,l)}:{edits:d,results:{addFeatureResults:[],updateFeatureResults:[],deleteFeatureResults:[],addAttachmentResults:[],updateAttachmentResults:[],deleteAttachmentResults:[]}}}async function B(e,t,a){const n=t&&(t.addFeatures||t.updateFeatures||t.deleteFeatures),d=t&&(t.addAttachments||t.updateAttachments||t.deleteAttachments);if(!t||!n&&!d)throw new i(`${e.type}-layer:missing-parameters`,"'addFeatures', 'updateFeatures', 'deleteFeatures', 'addAttachments', 'updateAttachments' or 'deleteAttachments' parameter is required");if(!e.capabilities.data.isVersioned&&a&&a.gdbVersion)throw new i(`${e.type}-layer:invalid-parameter`,"'gdbVersion' is applicable only if the layer supports versioned data. See: 'capabilities.data.isVersioned'");if(!e.capabilities.editing.supportsRollbackOnFailure&&a&&a.rollbackOnFailureEnabled)throw new i(`${e.type}-layer:invalid-parameter`,"This layer does not support 'rollbackOnFailureEnabled' parameter. See: 'capabilities.editing.supportsRollbackOnFailure'");if(!e.capabilities.editing.supportsGlobalId&&a&&a.globalIdUsed)throw new i(`${e.type}-layer:invalid-parameter`,"This layer does not support 'globalIdUsed' parameter. See: 'capabilities.editing.supportsGlobalId'");if(!e.capabilities.editing.supportsGlobalId&&d)throw new i(`${e.type}-layer:invalid-parameter`,"'addAttachments', 'updateAttachments' and 'deleteAttachments' are applicable only if the layer supports global ids. See: 'capabilities.editing.supportsGlobalId'");if((!a||!a.globalIdUsed)&&d)throw new i(`${e.type}-layer:invalid-parameter`,"When 'addAttachments', 'updateAttachments' or 'deleteAttachments' is specified, globalIdUsed should be set to true");const l=h({},a);if(l.rollbackOnFailureEnabled!=null||e.capabilities.editing.supportsRollbackOnFailure||(l.rollbackOnFailureEnabled=!0),l.rollbackOnFailureEnabled===!1&&l.returnServiceEditsOption==="original-and-current-features")throw new i(`${e.type}-layer:invalid-parameter`,"'original-and-current-features' is valid for 'returnServiceEditsOption' only when 'rollBackOnFailure' is true.");if(!e.capabilities.editing.supportsReturnServiceEditsInSourceSpatialReference&&l.returnServiceEditsInSourceSR)throw new i(`${e.type}-layer:invalid-parameter`,"This layer does not support 'returnServiceEditsInSourceSR' parameter. See: 'capabilities.editing.supportsReturnServiceEditsInSourceSpatialReference'");if(l.returnServiceEditsInSourceSR&&l.returnServiceEditsOption!=="original-and-current-features")throw new i(`${e.type}-layer:invalid-parameter`,"'returnServiceEditsOption' is valid only when 'returnServiceEditsOption' is set to 'original-and-current-features'");const r=h({},t);if(r.addFeatures=t&&y.isCollection(t.addFeatures)?t.addFeatures.toArray():r.addFeatures||[],r.updateFeatures=t&&y.isCollection(t.updateFeatures)?t.updateFeatures.toArray():r.updateFeatures||[],r.deleteFeatures=t&&y.isCollection(t.deleteFeatures)?t.deleteFeatures.toArray():r.deleteFeatures||[],r.addFeatures.length&&!e.capabilities.operations.supportsAdd)throw new i(`${e.type}-layer:unsupported-operation`,"Layer does not support adding features.");if(r.updateFeatures.length&&!e.capabilities.operations.supportsUpdate)throw new i(`${e.type}-layer:unsupported-operation`,"Layer does not support updating features.");if(r.deleteFeatures.length&&!e.capabilities.operations.supportsDelete)throw new i(`${e.type}-layer:unsupported-operation`,"Layer does not support deleting features.");r.addAttachments=r.addAttachments||[],r.updateAttachments=r.updateAttachments||[],r.deleteAttachments=r.deleteAttachments||[],r.addFeatures=r.addFeatures.map(w),r.updateFeatures=r.updateFeatures.map(w);const o=a&&a.globalIdUsed;return r.addFeatures.forEach(s=>G(s,e,o)),r.updateFeatures.forEach(s=>V(s,e,o)),r.deleteFeatures.forEach(s=>T(s,e,o)),r.addAttachments.forEach(s=>f(s,e)),r.updateAttachments.forEach(s=>f(s,e)),{edits:await z(r),options:l}}function m(e,t,a){if(a){if("attributes"in e&&!e.attributes[t.globalIdField])throw new i(`${t.type}-layer:invalid-parameter`,"Feature should have 'globalId' when 'globalIdUsed' is true");if(!("attributes"in e)&&!e.globalId)throw new i(`${t.type}-layer:invalid-parameter`,"'globalId' of the feature should be passed when 'globalIdUsed' is true")}if("geometry"in e&&F(e.geometry)){if(e.geometry.hasZ&&t.capabilities.data.supportsZ===!1)throw new i(`${t.type}-layer:z-unsupported`,"Layer does not support z values while feature has z values.");if(e.geometry.hasM&&t.capabilities.data.supportsM===!1)throw new i(`${t.type}-layer:m-unsupported`,"Layer does not support m values while feature has m values.")}}function G(e,t,a){m(e,t,a)}function T(e,t,a){m(e,t,a)}function V(e,t,a){if(m(e,t,a),"geometry"in e&&F(e.geometry)&&!t.capabilities.editing.supportsGeometryUpdate)throw new i(`${t.type}-layer:unsupported-operation`,"Layer does not support geometry updates.")}function f(e,t){const{feature:a,attachment:n}=e;if(!a||"attributes"in a&&!a.attributes[t.globalIdField])throw new i(`${t.type}-layer:invalid-parameter`,"Attachment should have reference to a feature with 'globalId'");if(!("attributes"in a)&&!a.globalId)throw new i(`${t.type}-layer:invalid-parameter`,"Attachment should have reference to 'globalId' of the parent feature");if(!n.globalId)throw new i(`${t.type}-layer:invalid-parameter`,"Attachment should have 'globalId'");if(!n.data&&!n.uploadId)throw new i(`${t.type}-layer:invalid-parameter`,"Attachment should have 'data' or 'uploadId'");if(!(n.data instanceof File&&!!n.data.name)&&!n.name)throw new i(`${t.type}-layer:invalid-parameter`,"'name' is required when attachment is specified as Base64 encoded string using 'data'");if(!t.capabilities.editing.supportsUploadWithItemId&&n.uploadId)throw new i(`${t.type}-layer:invalid-parameter`,"This layer does not support 'uploadId' parameter. See: 'capabilities.editing.supportsUploadWithItemId'");if(typeof n.data=="string"){const d=R(n.data);if(d&&!d.isBase64)throw new i(`${t.type}-layer:invalid-parameter`,"Attachment 'data' should be a Blob, File or Base64 encoded string")}}async function z(e){const t=e.addFeatures,a=e.updateFeatures,n=t.concat(a).map(o=>o.geometry),d=await O(n),l=t.length,r=a.length;return d.slice(0,l).forEach((o,s)=>e.addFeatures[s].geometry=o),d.slice(l,l+r).forEach((o,s)=>e.updateFeatures[s].geometry=o),e}function w(e){const t=new U;return e.attributes||(e.attributes={}),t.geometry=e.geometry,t.attributes=e.attributes,t}export{j as applyEdits};