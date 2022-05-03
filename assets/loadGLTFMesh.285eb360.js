import{tC as O,bN as k,J as i,tD as P,tE as _,ty as D,bk as $,d7 as b,tF as y,ra as j,tz as I,nd as z,kA as N,tG as S,tH as G,tI as J,l as R,gR as Q,tJ as V,hG as q,rb as H,ne as K,nj as M,dG as L,nk as U,tK as W,tL as X,tM as E,tN as Y,tO as Z,tP as tt,tQ as et,tR as nt,tS as ot,tT as B,tU as rt,ng as st,tV as at,tW as it,hk as T,tX as ct,tY as lt,tZ as ut,cg as C,L as ft,t_ as pt}from"./vendor.d1b93dad.js";import{k as mt}from"./georeference.21ca7d25.js";import"./axisAngleDegrees.f9e2944e.js";async function Lt(t,e,o){const s=new O(dt(o)),n=(await P(s,e,o,!0)).model,f=n.lods.shift(),l=new Map,c=new Map;n.textures.forEach((h,A)=>l.set(A,ht(h))),n.materials.forEach((h,A)=>c.set(A,$t(h,l)));const a=xt(f);for(const h of a.parts)bt(a,h,c);const{position:d,normal:u,tangent:r,color:p,texCoord0:m}=a.vertexAttributes,x={position:d.typedBuffer,normal:i(u)?u.typedBuffer:null,tangent:i(r)?r.typedBuffer:null,uv:i(m)?m.typedBuffer:null,color:i(p)?p.typedBuffer:null},v=mt(x,t,o);return{transform:v.transform,components:a.components,spatialReference:t.spatialReference,vertexAttributes:new j({position:v.vertexAttributes.position,normal:v.vertexAttributes.normal,tangent:v.vertexAttributes.tangent,color:x.color,uv:x.uv})}}function dt(t){return t!=null&&t.resolveFile?{busy:!1,request:async(e,o,s)=>{const n=t.resolveFile(e);return(await k(n,{responseType:o==="image"?"image":o==="binary"?"array-buffer":"json",signal:i(s)?s.signal:null})).data}}:null}function w(t,e){if(ft(t))return"-";const o=t.typedBuffer;return`${I(e,o.buffer,()=>e.size)}/${o.byteOffset}/${o.byteLength}`}function gt(t){return i(t)?t.toString():"-"}function xt(t){let e=0;const o={color:!1,tangent:!1,normal:!1,texCoord0:!1},s=new Map,n=new Map,f=[];for(const l of t.parts){const{attributes:{position:c,normal:a,color:d,tangent:u,texCoord0:r}}=l,p=`
      ${w(c,s)}/
      ${w(a,s)}/
      ${w(d,s)}/
      ${w(u,s)}/
      ${w(r,s)}/
      ${gt(l.transform)}
    `;let m=!1;const x=I(n,p,()=>(m=!0,{start:e,length:c.count}));m&&(e+=c.count),a&&(o.normal=!0),d&&(o.color=!0),u&&(o.tangent=!0),r&&(o.texCoord0=!0),f.push({gltf:l,writeVertices:m,region:x})}return{vertexAttributes:{position:y(z,e),normal:o.normal?y(N,e):null,tangent:o.tangent?y(S,e):null,color:o.color?y(G,e):null,texCoord0:o.texCoord0?y(J,e):null},parts:f,components:[]}}function ht(t){return new _({data:t.data,wrap:At(t.parameters.wrap)})}function $t(t,e){const o=new R(Et(t.color,t.opacity)),s=t.emissiveFactor?new R(Tt(t.emissiveFactor)):null;return new D({color:o,colorTexture:$(b(t.textureColor,n=>e.get(n))),normalTexture:$(b(t.textureNormal,n=>e.get(n))),emissiveColor:s,emissiveTexture:$(b(t.textureEmissive,n=>e.get(n))),occlusionTexture:$(b(t.textureOcclusion,n=>e.get(n))),alphaMode:vt(t.alphaMode),alphaCutoff:t.alphaCutoff,doubleSided:t.doubleSided,metallic:t.metallicFactor,roughness:t.roughnessFactor,metallicRoughnessTexture:$(b(t.textureMetallicRoughness,n=>e.get(n)))})}function bt(t,e,o){e.writeVertices&&yt(t,e);const s=e.gltf,n=wt(s.indices||s.attributes.position.count,s.primitiveType),f=e.region.start;if(f)for(let l=0;l<n.length;l++)n[l]+=f;t.components.push(new H({faces:n,material:o.get(s.material),trustSourceNormals:!0}))}function yt(t,e){const{position:o,normal:s,tangent:n,color:f,texCoord0:l}=t.vertexAttributes,c=e.region.start,{attributes:a,transform:d}=e.gltf,u=a.position.count;if(K(o.slice(c,u),a.position,d),i(a.normal)&&i(s)){const r=M(L(),d);U(s.slice(c,u),a.normal,r)}else i(s)&&W(s,0,0,1,{dstIndex:c,count:u});if(i(a.tangent)&&i(n)){const r=M(L(),d);X(n.slice(c,u),a.tangent,r)}else i(n)&&E(n,0,0,1,1,{dstIndex:c,count:u});if(i(a.texCoord0)&&i(l)?Y(l.slice(c,u),a.texCoord0):i(l)&&Z(l,0,0,{dstIndex:c,count:u}),i(a.color)&&i(f)){const r=a.color,p=f.slice(c,u);if(r.elementCount===4)r instanceof S?tt(p,r,255):r instanceof G?et(p,r):r instanceof nt&&ot(p,r,8);else{E(p,255,255,255,255);const m=B.fromTypedArray(p.typedBuffer,p.typedBufferStride);r instanceof N?rt(m,r,255):r instanceof B?st(m,r):r instanceof at&&it(m,r,8)}}else i(f)&&E(f.slice(c,u),255,255,255,255)}function wt(t,e){switch(e){case T.TRIANGLES:return ut(t,pt);case T.TRIANGLE_STRIP:return lt(t);case T.TRIANGLE_FAN:return ct(t)}}function vt(t){switch(t){case"OPAQUE":return"opaque";case"MASK":return"mask";case"BLEND":return"blend"}}function At(t){return{horizontal:F(t.s),vertical:F(t.t)}}function F(t){switch(t){case C.CLAMP_TO_EDGE:return"clamp";case C.MIRRORED_REPEAT:return"mirror";case C.REPEAT:return"repeat"}}function g(t){return t**(1/V)*255}function Et(t,e){return Q(g(t[0]),g(t[1]),g(t[2]),e)}function Tt(t){return q(g(t[0]),g(t[1]),g(t[2]))}export{Lt as loadGLTFMesh};
