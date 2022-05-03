var Ze=Object.defineProperty,Ye=Object.defineProperties;var Ke=Object.getOwnPropertyDescriptors;var de=Object.getOwnPropertySymbols;var Xe=Object.prototype.hasOwnProperty,je=Object.prototype.propertyIsEnumerable;var _e=(s,e,n)=>e in s?Ze(s,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[e]=n,ne=(s,e)=>{for(var n in e||(e={}))Xe.call(e,n)&&_e(s,n,e[n]);if(de)for(var n of de(e))je.call(e,n)&&_e(s,n,e[n]);return s},ie=(s,e)=>Ye(s,Ke(e));import{hM as Ve,hN as Ne,hO as Fe,br as Je,hP as Qe,bY as et,hA as ve,hQ as tt,hR as se,z as nt,aF as me,hS as Ue,hT as it,hU as ot,r as L,hV as ce,t as F,hW as pe,hX as at,hY as rt,a6 as lt,b7 as st,hZ as ct,h_ as ut,h$ as ft,i0 as V,i1 as dt,e4 as _t,gY as G,hd as U,hf as vt,hg as mt,he as pt,i2 as ge,g_ as k,i3 as gt,i4 as ht,i5 as z,go as We,cd as oe,bD as xt,bE as yt,bF as bt,L as St,i6 as Ct,i7 as Tt,hC as It,bI as Dt,p as he,a as ae,d as le,n as Pt}from"./vendor.f59113c8.js";import{t as N,M as xe}from"./GeometryUtils.09f0c771.js";import{J as wt}from"./CIMSymbolHelper.9edf3a4c.js";import{n as ue,l as R,r as q,i as ke,a as j,b as ye}from"./StyleRepository.69275b89.js";import"./PixelBlock.30fdfa76.js";import{I as H}from"./Utils.c37502be.js";import{W as M,Y as He,X as be}from"./definitions.9639b7e5.js";import{M as ee}from"./number.dc47462b.js";import"./MaterialKey.9964f4ac.js";import"./BidiEngine.eb17884f.js";import"./enums.c01b5663.js";import"./colorUtils.4a110f06.js";import"./Geometry.e891c191.js";class Ot{constructor(e,n){this.lockedSchemaPixelSize=e,this.isGCS=n}getLevelRowColumn(e){return this.isGCS?[e[0],e[1]>>1,e[2]>>1]:this.lockedSchemaPixelSize===256&&e[0]>0?[e[0]-1,e[1]>>1,e[2]>>1]:e}adjustLevel(e){return this.isGCS?e:this.lockedSchemaPixelSize===256?e>0?e-1:0:e}getShift(e,n){let t=0,i=0;return(this.lockedSchemaPixelSize===256||this.isGCS)&&(e[2]%2&&(t=n),e[1]%2&&(i=n)),[t,i]}getScale(e){if(this.isGCS){if(this.lockedSchemaPixelSize===512)return 4}else if(this.lockedSchemaPixelSize===256&&e===0)return 1;return 2}}class J{constructor(e,n){this._width=0,this._height=0,this._free=[],this._width=e,this._height=n,this._free.push(new N(0,0,e,n))}get width(){return this._width}get height(){return this._height}allocate(e,n){if(e>this._width||n>this._height)return new N;let t=null,i=-1;for(let o=0;o<this._free.length;++o){const a=this._free[o];e<=a.width&&n<=a.height&&(t===null||a.y<=t.y&&a.x<=t.x)&&(t=a,i=o)}return t===null?new N:(this._free.splice(i,1),t.width<t.height?(t.width>e&&this._free.push(new N(t.x+e,t.y,t.width-e,n)),t.height>n&&this._free.push(new N(t.x,t.y+n,t.width,t.height-n))):(t.width>e&&this._free.push(new N(t.x+e,t.y,t.width-e,t.height)),t.height>n&&this._free.push(new N(t.x,t.y+n,e,t.height-n))),new N(t.x,t.y,e,n))}release(e){for(let n=0;n<this._free.length;++n){const t=this._free[n];if(t.y===e.y&&t.height===e.height&&t.x+t.width===e.x)t.width+=e.width;else if(t.x===e.x&&t.width===e.width&&t.y+t.height===e.y)t.height+=e.height;else if(e.y===t.y&&e.height===t.height&&e.x+e.width===t.x)t.x=e.x,t.width+=e.width;else{if(e.x!==t.x||e.width!==t.width||e.y+e.height!==t.y)continue;t.y=e.y,t.height+=e.height}this._free.splice(n,1),this.release(e)}this._free.push(e)}}class Se{constructor(e,n,t){this.width=0,this.height=0,this._dirties=[],this._glyphData=[],this._currentPage=0,this._glyphIndex={},this._textures=[],this._rangePromises=new Map,this.width=e,this.height=n,this._glyphSource=t,this._binPack=new J(e-4,n-4),this._glyphData.push(new Uint8Array(e*n)),this._dirties.push(!0),this._textures.push(void 0)}getGlyphItems(e,n){const t=[],i=this._glyphSource,o=new Set,a=1/256;for(const l of n){const c=Math.floor(l*a);o.add(c)}const r=[];return o.forEach(l=>{if(l<=256){const c=e+l;if(this._rangePromises.has(c))r.push(this._rangePromises.get(c));else{const f=i.getRange(e,l).then(()=>{this._rangePromises.delete(c)},()=>{this._rangePromises.delete(c)});this._rangePromises.set(c,f),r.push(f)}}}),Promise.all(r).then(()=>{let l=this._glyphIndex[e];l||(l={},this._glyphIndex[e]=l);for(const c of n){const f=l[c];if(f){t[c]={sdf:!0,rect:f.rect,metrics:f.metrics,page:f.page,code:c};continue}const d=i.getGlyph(e,c);if(!d||!d.metrics)continue;const _=d.metrics;let u;if(_.width===0)u=new N(0,0,0,0);else{const h=_.width+6,b=_.height+2*3;let x=h%4?4-h%4:4,C=b%4?4-b%4:4;x===1&&(x=5),C===1&&(C=5),u=this._binPack.allocate(h+x,b+C),u.isEmpty&&(this._dirties[this._currentPage]||(this._glyphData[this._currentPage]=null),this._currentPage=this._glyphData.length,this._glyphData.push(new Uint8Array(this.width*this.height)),this._dirties.push(!0),this._textures.push(void 0),this._binPack=new J(this.width-4,this.height-4),u=this._binPack.allocate(h+x,b+C));const y=this._glyphData[this._currentPage],T=d.bitmap;let g,m;if(T)for(let p=0;p<b;p++){g=h*p,m=this.width*(u.y+p+1)+u.x;for(let I=0;I<h;I++)y[m+I+1]=T[g+I]}}l[c]={rect:u,metrics:_,tileIDs:null,page:this._currentPage},t[c]={sdf:!0,rect:u,metrics:_,page:this._currentPage,code:c},this._dirties[this._currentPage]=!0}return t})}removeGlyphs(e){for(const n in this._glyphIndex){const t=this._glyphIndex[n];if(!t)continue;let i;for(const o in t)if(i=t[o],i.tileIDs.delete(e),i.tileIDs.size===0){const a=this._glyphData[i.page],r=i.rect;let l,c;for(let f=0;f<r.height;f++)for(l=this.width*(r.y+f)+r.x,c=0;c<r.width;c++)a[l+c]=0;delete t[o],this._dirties[i.page]=!0}}}bind(e,n,t,i=0){this._textures[t]||(this._textures[t]=new Ve(e,{pixelFormat:Ne.ALPHA,dataType:Fe.UNSIGNED_BYTE,width:this.width,height:this.height},new Uint8Array(this.width*this.height)));const o=this._textures[t];o.setSamplingMode(n),this._dirties[t]&&o.setData(this._glyphData[t]),e.bindTexture(o,i),this._dirties[t]=!1}dispose(){this._binPack=null;for(const e of this._textures)e&&e.dispose();this._textures.length=0}}class Ce{constructor(e){if(this._metrics=[],this._bitmaps=[],e)for(;e.next();)switch(e.tag()){case 1:{const n=e.getMessage();for(;n.next();)switch(n.tag()){case 3:{const t=n.getMessage();let i,o,a,r,l,c,f;for(;t.next();)switch(t.tag()){case 1:i=t.getUInt32();break;case 2:o=t.getBytes();break;case 3:a=t.getUInt32();break;case 4:r=t.getUInt32();break;case 5:l=t.getSInt32();break;case 6:c=t.getSInt32();break;case 7:f=t.getUInt32();break;default:t.skip()}t.release(),i&&(this._metrics[i]={width:a,height:r,left:l,top:c,advance:f},this._bitmaps[i]=o);break}default:n.skip()}n.release();break}default:e.skip()}}getMetrics(e){return this._metrics[e]}getBitmap(e){return this._bitmaps[e]}}class Et{constructor(){this._ranges=[]}getRange(e){return this._ranges[e]}addRange(e,n){this._ranges[e]=n}}class Te{constructor(e){this._glyphInfo={},this._baseURL=e}getRange(e,n){const t=this._getFontStack(e);if(t.getRange(n))return Promise.resolve();const i=256*n,o=i+255,a=this._baseURL.replace("{fontstack}",e).replace("{range}",i+"-"+o);return Je(a,{responseType:"array-buffer"}).then(r=>{t.addRange(n,new Ce(new Qe(new Uint8Array(r.data),new DataView(r.data))))}).catch(()=>{t.addRange(n,new Ce)})}getGlyph(e,n){const t=this._getFontStack(e);if(!t)return;const i=Math.floor(n/256);if(i>256)return;const o=t.getRange(i);return o?{metrics:o.getMetrics(n),bitmap:o.getBitmap(n)}:void 0}_getFontStack(e){let n=this._glyphInfo[e];return n||(n=this._glyphInfo[e]=new Et),n}}const Rt="dasharray-";class Q{constructor(e,n,t=0){this._size=[],this._mosaicsData=[],this._textures=[],this._dirties=[],this._maxItemSize=0,this._currentPage=0,this._pageWidth=0,this._pageHeight=0,this._mosaicRects={},this.pixelRatio=1,(e<=0||n<=0)&&console.error("Sprites mosaic defaultWidth and defaultHeight must be greater than zero!"),this._pageWidth=e,this._pageHeight=n,t>0&&(this._maxItemSize=t),this._binPack=new J(e-4,n-4)}dispose(){this._binPack=null,this._mosaicRects={};for(const e of this._textures)e&&e.dispose();this._textures.length=0}getWidth(e){return e>=this._size.length?-1:this._size[e][0]}getHeight(e){return e>=this._size.length?-1:this._size[e][1]}getPageSize(e){return e>=this._size.length?null:this._size[e]}setSpriteSource(e){if(this.dispose(),this.pixelRatio=e.devicePixelRatio,this._mosaicsData.length===0){this._binPack=new J(this._pageWidth-4,this._pageHeight-4);const n=Math.floor(this._pageWidth),t=Math.floor(this._pageHeight),i=new Uint32Array(n*t);this._mosaicsData[0]=i,this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0)}this._sprites=e}getSpriteItem(e,n=!1){let t,i,o=this._mosaicRects[e];if(o)return o;if(!this._sprites||this._sprites.loadStatus!=="loaded"||(e&&e.startsWith(Rt)?([t,i]=this._rasterizeDash(e),n=!0):t=this._sprites.getSpriteInfo(e),!t||!t.width||!t.height||t.width<0||t.height<0))return null;const a=t.width,r=t.height,[l,c,f]=this._allocateImage(a,r);return l.width<=0?null:(this._copy(l,t,c,f,n,i),o={rect:l,width:a,height:r,sdf:t.sdf,simplePattern:!1,pixelRatio:t.pixelRatio,page:c},this._mosaicRects[e]=o,o)}getSpriteItems(e){const n={};for(const t of e)n[t.name]=this.getSpriteItem(t.name,t.repeat);return n}getMosaicItemPosition(e,n){const t=this.getSpriteItem(e,n),i=t&&t.rect;if(!i)return null;i.width=t.width,i.height=t.height;const o=t.width,a=t.height,r=2;return{tl:[i.x+r,i.y+r],br:[i.x+r+o,i.y+r+a],page:t.page}}bind(e,n,t=0,i=0){this._textures[t]||(this._textures[t]=new Ve(e,{pixelFormat:Ne.RGBA,dataType:Fe.UNSIGNED_BYTE,wrapMode:et.CLAMP_TO_EDGE,width:this._size[t][0],height:this._size[t][1]},new Uint8Array(this._mosaicsData[t].buffer)));const o=this._textures[t];o.setSamplingMode(n),this._dirties[t]&&o.setData(new Uint8Array(this._mosaicsData[t].buffer)),e.bindTexture(o,i),this._dirties[t]=!1}static _copyBits(e,n,t,i,o,a,r,l,c,f,d){let _=i*n+t,u=l*a+r;if(d){u-=a;for(let v=-1;v<=f;v++,_=((v+f)%f+i)*n+t,u+=a)for(let h=-1;h<=c;h++)o[u+h]=e[_+(h+c)%c]}else for(let v=0;v<f;v++){for(let h=0;h<c;h++)o[u+h]=e[_+h];_+=n,u+=a}}_copy(e,n,t,i,o,a){if(!this._sprites||this._sprites.loadStatus!=="loaded"||t>=this._mosaicsData.length)return;const r=new Uint32Array(a?a.buffer:this._sprites.image.buffer),l=this._mosaicsData[t];l&&r||console.error("Source or target images are uninitialized!");const c=2,f=a?n.width:this._sprites.width;Q._copyBits(r,f,n.x,n.y,l,i[0],e.x+c,e.y+c,n.width,n.height,o),this._dirties[t]=!0}_allocateImage(e,n){e+=2,n+=2;const t=Math.max(e,n);if(this._maxItemSize&&this._maxItemSize<t){const r=new N(0,0,e,n);return this._mosaicsData.push(new Uint32Array(e*n)),this._dirties.push(!0),this._size.push([e,n]),this._textures.push(void 0),[r,this._mosaicsData.length-1,[e,n]]}let i=e%4?4-e%4:4,o=n%4?4-n%4:4;i===1&&(i=5),o===1&&(o=5);const a=this._binPack.allocate(e+i,n+o);return a.width<=0?(this._dirties[this._currentPage]||(this._mosaicsData[this._currentPage]=null),this._currentPage=this._mosaicsData.length,this._mosaicsData.push(new Uint32Array(this._pageWidth*this._pageHeight)),this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0),this._binPack=new J(this._pageWidth-4,this._pageHeight-4),this._allocateImage(e,n)):[a,this._currentPage,[this._pageWidth,this._pageHeight]]}_rasterizeDash(e){const n=/\[(.*?)\]/,t=e.match(n);if(!t)return null;const i=t[1].split(",").map(Number),o=e.slice(e.lastIndexOf("-")+1),[a,r,l]=wt.rasterizeDash(i,o);return[{x:0,y:0,width:r,height:l,sdf:!0,pixelRatio:1},new Uint8Array(a.buffer)]}}function zt(s,e,n){if(!window.PERFORMANCE_RECORDING_STORAGE)return;const t=window.PERFORMANCE_RECORDING_STORAGE;t.perf=t.perf||{};const i=t.perf;i[s]=i[s]||{start:null,time:0,min:void 0,max:void 0,samples:[],unit:n},i[s].time+=e,i[s].samples.push(e),(i[s].min==null||e<i[s].min)&&(i[s].min=e),(i[s].max==null||e>i[s].max)&&(i[s].max=e)}class Lt{constructor(e,n,t){this._layer=e,this._styleRepository=n,this.devicePixelRatio=t,this._spriteMosaic=null,this._glyphMosaic=null,this._connection=null}destroy(){this._connection&&(this._connection.close(),this._connection=null),this._styleRepository=null,this._layer=null,this._spriteMosaic&&(this._spriteMosaic=null),this._glyphMosaic&&(this._glyphMosaic=null)}get spriteMosaic(){return this._spriteSourcePromise.then(()=>this._spriteMosaic)}get glyphMosaic(){return this._glyphMosaic}async start(e){this._spriteSourcePromise=this._layer.loadSpriteSource(this.devicePixelRatio,e),this._spriteSourcePromise.then(t=>{this._spriteMosaic=new Q(1024,1024,250),this._spriteMosaic.setSpriteSource(t)});const n=new Te(this._layer.currentStyleInfo.glyphsUrl?ve(this._layer.currentStyleInfo.glyphsUrl,ie(ne({},this._layer.customParameters),{token:this._layer.apiKey})):null);this._glyphMosaic=new Se(1024,1024,n),this._broadcastPromise=tt("WorkerTileHandler",{client:this,schedule:e.schedule,signal:e.signal}).then(t=>(this._connection=t,Promise.all(this._connection.broadcast("setStyle",this._layer.currentStyleInfo.style,e))))}async updateStyle(e){return await this._broadcastPromise,this._broadcastPromise=Promise.all(this._connection.broadcast("updateStyle",e)),this._broadcastPromise}setSpriteSource(e){const n=new Q(1024,1024,250);return n.setSpriteSource(e),this._spriteMosaic=n,this._spriteSourcePromise=Promise.resolve(e),n}async setStyle(e,n){await this._broadcastPromise,this._styleRepository=e,this._spriteSourcePromise=this._layer.loadSpriteSource(this.devicePixelRatio,null),this._spriteSourcePromise.then(i=>{this._spriteMosaic=new Q(1024,1024,250),this._spriteMosaic.setSpriteSource(i)});const t=new Te(this._layer.currentStyleInfo.glyphsUrl?ve(this._layer.currentStyleInfo.glyphsUrl,ie(ne({},this._layer.customParameters),{token:this._layer.apiKey})):null);return this._glyphMosaic=new Se(1024,1024,t),this._broadcastPromise=Promise.all(this._connection.broadcast("setStyle",n)),this._broadcastPromise}fetchTileData(e,n){return this._getRefKeys(e,n).then(t=>{const i=this._layer.sourceNameToSource,o=[];for(const a in i)o.push(a);return this._getSourcesData(o,t,n)})}parseTileData(e,n){const t=e&&e.data;if(!t)return Promise.resolve(null);const{sourceName2DataAndRefKey:i,transferList:o}=t;return Object.keys(i).length===0?Promise.resolve(null):this._broadcastPromise.then(()=>this._connection.getAvailableClient().then(a=>a.invoke("createTileAndParse",{key:e.key.id,sourceName2DataAndRefKey:i,styleLayerUIDs:e.styleLayerUIDs},ie(ne({},n),{transferList:o}))))}async getSprites(e){return await this._spriteSourcePromise,this._spriteMosaic.getSpriteItems(e)}getGlyphs(e){return this._glyphMosaic.getGlyphItems(e.font,e.codePoints)}perfReport({key:e,milliseconds:n}){zt(e,n,"ms")}async _getTilePayload(e,n,t){const i=se.pool.acquire(e.id),o=this._layer.sourceNameToSource[n],{level:a,row:r,col:l}=i;se.pool.release(i);try{return{protobuff:await o.requestTile(a,r,l,t),sourceName:n}}catch(c){if(nt(c))throw c;return{protobuff:null,sourceName:n}}}_getRefKeys(e,n){const t=this._layer.sourceNameToSource,i=new Array;for(const o in t){const a=t[o].getRefKey(e,n);i.push(a)}return me(i)}_getSourcesData(e,n,t){const i=[];for(let o=0;o<n.length;o++)if(n[o].value==null||e[o]==null)i.push(null);else{const a=this._getTilePayload(n[o].value,e[o],t);i.push(a)}return me(i).then(o=>{const a={},r=[];for(let l=0;l<o.length;l++)if(o[l].value&&o[l].value&&o[l].value.protobuff&&o[l].value.protobuff.byteLength>0){const c=n[l].value.id;a[o[l].value.sourceName]={refKey:c,protobuff:o[l].value.protobuff},r.push(o[l].value.protobuff)}return{sourceName2DataAndRefKey:a,transferList:r}})}}function At(s,e,n,t,i,o){const{iconRotationAlignment:a,textRotationAlignment:r,iconTranslate:l,iconTranslateAnchor:c,textTranslate:f,textTranslateAnchor:d}=t;let _=0;for(const u of s.colliders){const[v,h]=u.partIndex===0?l:f,b=u.partIndex===0?c:d,x=u.minLod<=o&&o<=u.maxLod;_+=x?0:1,u.enabled=x,u.xScreen=u.xTile*i[0]+u.yTile*i[3]+i[6],u.yScreen=u.xTile*i[1]+u.yTile*i[4]+i[7],b===q.MAP?(u.xScreen+=n*v-e*h,u.yScreen+=e*v+n*h):(u.xScreen+=v,u.yScreen+=h),R.VIEWPORT===(u.partIndex===0?a:r)?(u.dxScreen=u.dxPixels,u.dyScreen=u.dyPixels):(u.dxScreen=n*(u.dxPixels+u.width/2)-e*(u.dyPixels+u.height/2)-u.width/2,u.dyScreen=e*(u.dxPixels+u.width/2)+n*(u.dyPixels+u.height/2)-u.height/2)}s.colliders.length>0&&_===s.colliders.length&&(s.unique.show=!1)}class Mt{constructor(e,n,t,i,o,a){this._symbols=e,this._styleRepository=i,this._zoom=o,this._currentLayerCursor=0,this._currentSymbolCursor=0,this._styleProps=new Map,this._allNeededMatrices=new Map,this._gridIndex=new Ue(n,t,it),this._si=Math.sin(Math.PI*a/180),this._co=Math.cos(Math.PI*a/180);for(const r of e)for(const l of r.symbols)this._allNeededMatrices.has(l.tile)||this._allNeededMatrices.set(l.tile,ot(l.tile.transforms.tileUnitsToPixels))}work(e){const n=this._gridIndex;function t(o){const a=o.xScreen+o.dxScreen,r=o.yScreen+o.dyScreen,l=a+o.width,c=r+o.height,[f,d,_,u]=n.getCellSpan(a,r,l,c);for(let v=d;v<=u;v++)for(let h=f;h<=_;h++){const b=n.cells[v][h];for(const x of b){const C=x.xScreen+x.dxScreen,y=x.yScreen+x.dyScreen,T=C+x.width,g=y+x.height;if(!(l<C||a>T||c<y||r>g))return!0}}return!1}const i=performance.now();for(;this._currentLayerCursor<this._symbols.length;this._currentLayerCursor++,this._currentSymbolCursor=0){const o=this._symbols[this._currentLayerCursor],a=this._getProperties(o.styleLayerUID);for(;this._currentSymbolCursor<o.symbols.length;this._currentSymbolCursor++){if(this._currentSymbolCursor%100==99&&performance.now()-i>e)return!1;const r=o.symbols[this._currentSymbolCursor];if(!r.unique.show)continue;At(r,this._si,this._co,a,this._allNeededMatrices.get(r.tile),this._zoom);const l=r.unique;if(!l.show)continue;const{iconAllowOverlap:c,iconIgnorePlacement:f,textAllowOverlap:d,textIgnorePlacement:_}=a;for(const u of r.colliders){if(!u.enabled)continue;const v=l.parts[u.partIndex];!v.show||!(u.partIndex?d:c)&&t(u)&&(u.hard?l.show=!1:v.show=!1)}if(l.show)for(const u of r.colliders){if(!u.enabled||(u.partIndex?_:f)||!l.parts[u.partIndex].show)continue;const v=u.xScreen+u.dxScreen,h=u.yScreen+u.dyScreen,b=v+u.width,x=h+u.height,[C,y,T,g]=this._gridIndex.getCellSpan(v,h,b,x);for(let m=y;m<=g;m++)for(let p=C;p<=T;p++)this._gridIndex.cells[m][p].push(u)}}}return!0}_getProperties(e){const n=this._styleProps.get(e);if(n)return n;const t=this._zoom,i=this._styleRepository.getStyleLayerByUID(e),o=i.getLayoutValue("symbol-placement",t)!==ue.POINT;let a=i.getLayoutValue("icon-rotation-alignment",t);a===R.AUTO&&(a=o?R.MAP:R.VIEWPORT);let r=i.getLayoutValue("text-rotation-alignment",t);r===R.AUTO&&(r=o?R.MAP:R.VIEWPORT);const l=i.getPaintValue("icon-translate",t),c=i.getPaintValue("icon-translate-anchor",t),f=i.getPaintValue("text-translate",t),d=i.getPaintValue("text-translate-anchor",t),_={iconAllowOverlap:i.getLayoutValue("icon-allow-overlap",t),iconIgnorePlacement:i.getLayoutValue("icon-ignore-placement",t),textAllowOverlap:i.getLayoutValue("text-allow-overlap",t),textIgnorePlacement:i.getLayoutValue("text-ignore-placement",t),iconRotationAlignment:a,textRotationAlignment:r,iconTranslateAnchor:c,iconTranslate:l,textTranslateAnchor:d,textTranslate:f};return this._styleProps.set(e,_),_}}function Vt(s,e){if(s.priority-e.priority)return s.priority-e.priority;const n=s.tile.key,t=e.tile.key;return n.world-t.world?n.world-t.world:n.level-t.level?n.level-t.level:n.row-t.row?n.row-t.row:n.col-t.col?n.col-t.col:s.xTile-e.xTile?s.xTile-e.xTile:s.yTile-e.yTile}class Nt{constructor(e,n,t,i,o,a){this._visibleTiles=e,this._symbolRepository=n,this._createCollisionJob=t,this._assignTileSymbolsOpacity=i,this._symbolLayerSorter=o,this._isLayerVisible=a,this._selectionJob=null,this._selectionJobCompleted=!1,this._collisionJob=null,this._collisionJobCompleted=!1,this._opacityJob=null,this._opacityJobCompleted=!1,this._running=!0}get running(){return this._running}setScreenSize(e,n){this._screenWidth===e&&this._screenHeight===n||this.restart(),this._screenWidth=e,this._screenHeight=n}restart(){this._selectionJob=null,this._selectionJobCompleted=!1,this._collisionJob=null,this._collisionJobCompleted=!1,this._opacityJob=null,this._opacityJobCompleted=!1,this._running=!0}continue(e){if(this._selectionJob||(this._selectionJob=this._createSelectionJob()),!this._selectionJobCompleted){const n=performance.now();if(!this._selectionJob.work(e)||(this._selectionJobCompleted=!0,(e=Math.max(0,e-(performance.now()-n)))===0))return!1}if(this._collisionJob||(this._collisionJob=this._createCollisionJob(this._selectionJob.sortedSymbols,this._screenWidth,this._screenHeight)),!this._collisionJobCompleted){const n=performance.now();if(!this._collisionJob.work(e)||(this._collisionJobCompleted=!0,(e=Math.max(0,e-(performance.now()-n)))===0))return!1}if(this._opacityJob||(this._opacityJob=this._createOpacityJob()),!this._opacityJobCompleted){const n=performance.now();if(!this._opacityJob.work(e)||(this._opacityJobCompleted=!0,(e=Math.max(0,e-(performance.now()-n)))===0))return!1}return this._running=!1,!0}_createSelectionJob(){const e=this._symbolRepository.uniqueSymbols;for(let l=0;l<e.length;l++){const c=e[l];for(let f=0;f<c.uniqueSymbols.length;f++){const d=c.uniqueSymbols[f];for(const _ of d.tileSymbols)_.selectedForRendering=!1}}const n=[];let t=0,i=0;const o=this._isLayerVisible;function a(l){let c;const f=performance.now();for(;i<e.length;i++,t=0){const d=e[i],_=d.styleLayerUID;if(!o(_)){n[i]||(n[i]={styleLayerUID:_,symbols:[]});continue}n[i]=n[i]||{styleLayerUID:_,symbols:[]};const u=n[i];for(;t<d.uniqueSymbols.length;t++){if(c=d.uniqueSymbols[t],t%100==99&&performance.now()-f>l)return!1;let v=null,h=!1,b=!1;for(const x of c.tileSymbols)if(!b||!h){const C=x.tile;(!v||C.isCoverage||C.neededForCoverage&&!h)&&(v=x,(C.neededForCoverage||C.isCoverage)&&(b=!0),C.isCoverage&&(h=!0))}if(v.selectedForRendering=!0,b){u.symbols.push(v),c.show=!0;for(const x of c.parts)x.show=!0}else c.show=!1}}for(const d of n)d.symbols.sort(Vt);return!0}const r=this._symbolLayerSorter;return{work:a,get sortedSymbols(){return n.sort(r)}}}_createOpacityJob(){const e=this._assignTileSymbolsOpacity,n=this._visibleTiles;let t=0;function i(o,a){const r=o.symbols;for(const[l,c]of r)Ft(c,a);e(o,a);for(const l of o.childrenTiles)i(l,a)}return{work(o){const a=performance.now();for(;t<n.length;t++){if(performance.now()-a>o)return!1;const r=n[t];L(r.parentTile)||i(r,performance.now())}return!0}}}}function Ft(s,e){for(const n of s){const t=n.unique;for(const i of t.parts){const o=i.targetOpacity>.5?1:-1;i.startOpacity+=o*((e-i.startTime)/ce),i.startOpacity=Math.min(Math.max(i.startOpacity,0),1),i.startTime=e,i.targetOpacity=t.show&&i.show?1:0}}}const Ut=32,Wt=8,kt=64;class Ht{constructor(e,n,t){this.tileCoordRange=e,this._visibleTiles=n,this._createUnique=t,this._tiles=new Map,this._uniqueSymbolsReferences=new Map}get uniqueSymbols(){return F(this._uniqueSymbolLayerArray)&&(this._uniqueSymbolLayerArray=this._createUniqueSymbolLayerArray()),this._uniqueSymbolLayerArray}add(e,n){this._uniqueSymbolLayerArray=null;let t=this._tiles.get(e.id);t||(t={symbols:new Map},this._tiles.set(e.id,t));const i=new Map;if(n)for(const r of n)t.symbols.has(r)&&(i.set(r,t.symbols.get(r)),t.symbols.delete(r));else for(const[r,l]of e.layerData)t.symbols.has(r)&&(i.set(r,t.symbols.get(r)),t.symbols.delete(r));this._removeSymbols(i);const o=e.symbols,a=new Map;for(const[r,l]of o){let c=l.length;if(c>=Ut){let f=this.tileCoordRange;do f/=2,c/=4;while(c>Wt&&f>kt);const d=new Ue(this.tileCoordRange,this.tileCoordRange,f);a.set(r,{flat:l,index:d}),t.symbols.set(r,{flat:l,index:d});for(const _ of l)d.getCell(_.xTile,_.yTile).push(_)}else a.set(r,{flat:l}),t.symbols.set(r,{flat:l})}this._addSymbols(e.key,o)}deleteStyleLayers(e){this._uniqueSymbolLayerArray=null;for(const[n,t]of this._tiles){const i=new Map;for(const o of e)t.symbols.has(o)&&(i.set(o,t.symbols.get(o)),t.symbols.delete(o));this._removeSymbols(i),t.symbols.size===0&&this._tiles.delete(n)}}removeTile(e){this._uniqueSymbolLayerArray=null;const n=this._tiles.get(e.id);if(!n)return;const t=new Map;for(const[i,o]of e.symbols)n.symbols.has(i)&&(t.set(i,n.symbols.get(i)),n.symbols.delete(i));this._removeSymbols(t),n.symbols.size===0&&this._tiles.delete(e.id)}_removeSymbols(e){for(const[n,{flat:t}]of e)for(const i of t){const o=i.unique,a=o.tileSymbols,r=a.length-1;for(let l=0;l<r;l++)if(a[l]===i){a[l]=a[r];break}if(a.length=r,r===0){const l=this._uniqueSymbolsReferences.get(n);l.delete(o),l.size===0&&this._uniqueSymbolsReferences.delete(n)}i.unique=null}}_addSymbols(e,n){if(n.size===0)return;const t=this._visibleTiles;for(const i of t)i.parentTile||i.key.world!==e.world||i.key.level===e.level&&!i.key.equals(e)||this._matchSymbols(i,e,n);for(const[i,o]of n)for(const a of o)if(F(a.unique)){const r=this._createUnique();a.unique=r,r.tileSymbols.push(a);let l=this._uniqueSymbolsReferences.get(i);l||(l=new Set,this._uniqueSymbolsReferences.set(i,l)),l.add(r)}}_matchSymbols(e,n,t){if(e.key.level>n.level){const o=e.key.level-n.level;if(e.key.row>>o!==n.row||e.key.col>>o!==n.col)return}if(n.level>e.key.level){const o=n.level-e.key.level;if(n.row>>o!==e.key.row||n.col>>o!==e.key.col)return}if(n.equals(e.key)){for(const o of e.childrenTiles)this._matchSymbols(o,n,t);return}const i=new Map;for(const[o,a]of t){const r=[];for(const d of a){const _=pe(this.tileCoordRange,d.xTile,n.level,n.col,e.key.level,e.key.col),u=pe(this.tileCoordRange,d.yTile,n.level,n.row,e.key.level,e.key.row);_>=0&&_<this.tileCoordRange&&u>=0&&u<this.tileCoordRange&&r.push({symbol:d,xTransformed:_,yTransformed:u})}const l=[],c=e.key.level<n.level?1:1<<e.key.level-n.level,f=this._tiles.get(e.id).symbols.get(o);if(f){const d=f.flat;for(const _ of r){let u,v=!1;const h=_.xTransformed,b=_.yTransformed;u=L(f.index)?f.index.getCell(h,b):d;const x=_.symbol,C=x.hash;for(const y of u)if(C===y.hash&&Math.abs(h-y.xTile)<=c&&Math.abs(b-y.yTile)<=c){const T=y.unique;x.unique=T,T.tileSymbols.push(x),v=!0;break}v||l.push(x)}}l.length>0&&i.set(o,l)}for(const o of e.childrenTiles)this._matchSymbols(o,n,i)}_createUniqueSymbolLayerArray(){const e=this._uniqueSymbolsReferences,n=new Array(e.size);let t,i=0;for(const[o,a]of e){const r=new Array(a.size);t=0;for(const l of a)r[t++]=l;n[i]={styleLayerUID:o,uniqueSymbols:r},i++}return n}}function Gt(s,e){const n=[],t=new Ht(4096,n,()=>{const o=new rt;return o.show=!1,o.parts.push({startTime:0,startOpacity:0,targetOpacity:0,show:!1}),o.parts.push({startTime:0,startOpacity:0,targetOpacity:0,show:!1}),o}),i=new Nt(n,t,(o,a,r)=>new Mt(o,a,r,s.styleRepository,s.key.level,0),(o,a)=>{at(o,a,!1)},()=>0,o=>{const a=e.getStyleLayerByUID(o).getLayoutProperty("visibility");return!a||a.getValue()!==ke.NONE});n.push(s),t.add(s),i.setScreenSize(512,512),i.continue(1/0)}class Ie extends Lt{constructor(e,n,t,i,o){super(e,n,t),this._memCache=i,this._loader=o,this._ongoingTileRequests=new Map,this._ongoingRequestToController=new Map}destroy(){this._ongoingRequestToController.forEach(e=>e.abort()),this._ongoingRequestToController.clear(),this._ongoingTileRequests.clear()}async getVectorTile(e,n,t,i){const o=new se(e,n,t,0);let a=this._memCache.get(o.id);if(L(a))return a.retain(),a;const r=await this._getVectorTileData(o);if(lt(i),!this._layer)return null;if(a=this._memCache.get(o.id),L(a))return a.retain(),a;const l=this._layer.tileInfo.getTileBounds(st(),o);return a=new ct(o,l[0],l[3],512,512,this._styleRepository,this._memCache),L(r)?(a.setData(r),a.retain(),this._memCache.put(o.id,a,a.memoryUsage*a.referenced,ut)):a.setData(null),a.neededForCoverage=!0,a.transforms.tileUnitsToPixels=ft(1/8,0,0,0,1/8,0,0,0,1),Gt(a,this._styleRepository),a}_getVectorTileData(e){const n=e.id;if(this._ongoingTileRequests.has(n))return this._ongoingTileRequests.get(n);const t=new AbortController,i={signal:t.signal},o=this._getParsedVectorTileData(e,i).then(a=>(this._ongoingTileRequests.delete(n),this._ongoingRequestToController.delete(n),a)).catch(()=>(this._ongoingTileRequests.delete(n),this._ongoingRequestToController.delete(n),null));return this._ongoingTileRequests.set(n,o),this._ongoingRequestToController.set(n,t),o}_getParsedVectorTileData(e,n){return this.fetchTileData(e,n).then(t=>this.parseTileData({key:e,data:t},n))}request(e,n){return this._loader.request(e,"binary",n)}}class te{constructor(){this.name=this.constructor.name||"UnnamedBrush"}prepareState(e,n,t){}draw(e,n,t){}drawMany(e,n,t){for(const i of n)this.draw(e,i,t)}}V.NEAREST,V.LINEAR,V.LINEAR,V.LINEAR_MIPMAP_LINEAR;const Bt={background:{"background.frag":`uniform lowp vec4 u_color;
void main() {
gl_FragColor = u_color;
}`,"background.vert":`attribute vec2 a_pos;
uniform highp mat3 u_dvsMat3;
uniform mediump vec2 u_coord_range;
uniform mediump float u_depth;
void main() {
vec3 v_pos = u_dvsMat3 * vec3(u_coord_range * a_pos, 1.0);
gl_Position = vec4(v_pos.xy, 0.0, 1.0);
}`},bitBlit:{"bitBlit.frag":`uniform lowp sampler2D u_tex;
uniform lowp float u_opacity;
varying mediump vec2 v_uv;
void main() {
lowp vec4 color = texture2D(u_tex, v_uv);
gl_FragColor = color *  u_opacity;
}`,"bitBlit.vert":`attribute vec2 a_pos;
attribute vec2 a_tex;
varying mediump vec2 v_uv;
void main(void) {
gl_Position = vec4(a_pos, 0.0, 1.0);
v_uv = a_tex;
}`},blend:{"blend.frag":`precision mediump float;
uniform sampler2D u_layerTexture;
uniform lowp float u_opacity;
uniform lowp float u_inFadeOpacity;
#ifndef NORMAL
uniform sampler2D u_backbufferTexture;
#endif
varying mediump vec2 v_uv;
float rgb2v(in vec3 c) {
return max(c.x, max(c.y, c.z));
}
vec3 rgb2hsv(in vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(in vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
vec3 tint(in vec3 Cb, in vec3 Cs) {
float vIn = rgb2v(Cb);
vec3 hsvTint = rgb2hsv(Cs);
vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
return hsv2rgb(hsvOut);
}
float overlay(in float Cb, in float Cs) {
return (1.0 - step(0.5, Cs)) * (1.0 - 2.0 * (1.0 - Cs ) * (1.0 - Cb)) + step(0.5, Cs) * (2.0 * Cs * Cb);
}
float colorDodge(in float Cb, in float Cs) {
return (Cb == 0.0) ? 0.0 : (Cs == 1.0) ? 1.0 : min(1.0, Cb / (1.0 - Cs));
}
float colorBurn(in float Cb, in float Cs) {
return (Cb == 1.0) ? 1.0 : (Cs == 0.0) ? 0.0 : 1.0 - min(1.0, (1.0 - Cb) / Cs);
}
float hardLight(in float Cb, in float Cs) {
return (1.0 - step(0.5, Cs)) * (2.0 * Cs * Cb) + step(0.5, Cs) * (1.0 - 2.0 * (1.0 - Cs) * (1.0 - Cb));
}
float reflectBlend(in float Cb, in float Cs) {
return (Cs == 1.0) ? Cs : min(Cb * Cb / (1.0 - Cs), 1.0);
}
float softLight(in float Cb, in float Cs) {
if (Cs <= 0.5) {
return Cb - (1.0 - 2.0 * Cs) * Cb * (1.0 - Cb);
}
if (Cb <= 0.25) {
return Cb + (2.0 * Cs - 1.0) * Cb * ((16.0 * Cb - 12.0) * Cb + 3.0);
}
return Cb + (2.0 * Cs - 1.0) * (sqrt(Cb) - Cb);
}
float vividLight(in float Cb, in float Cs) {
return (1.0 - step(0.5, Cs)) * colorBurn(Cb, 2.0 * Cs) + step(0.5, Cs) * colorDodge(Cb, (2.0 * (Cs - 0.5)));
}
float minv3(in vec3 c) {
return min(min(c.r, c.g), c.b);
}
float maxv3(in vec3 c) {
return max(max(c.r, c.g), c.b);
}
float lumv3(in vec3 c) {
return dot(c, vec3(0.3, 0.59, 0.11));
}
float satv3(vec3 c) {
return maxv3(c) - minv3(c);
}
vec3 clipColor(vec3 color) {
float lum = lumv3(color);
float mincol = minv3(color);
float maxcol = maxv3(color);
if (mincol < 0.0) {
color = lum + ((color - lum) * lum) / (lum - mincol);
}
if (maxcol > 1.0) {
color = lum + ((color - lum) * (1.0 - lum)) / (maxcol - lum);
}
return color;
}
vec3 setLum(vec3 cbase, vec3 clum) {
float lbase = lumv3(cbase);
float llum = lumv3(clum);
float ldiff = llum - lbase;
vec3 color = cbase + vec3(ldiff);
return clipColor(color);
}
vec3 setLumSat(vec3 cbase, vec3 csat, vec3 clum)
{
float minbase = minv3(cbase);
float sbase = satv3(cbase);
float ssat = satv3(csat);
vec3 color;
if (sbase > 0.0) {
color = (cbase - minbase) * ssat / sbase;
} else {
color = vec3(0.0);
}
return setLum(color, clum);
}
void main() {
vec4 src = texture2D(u_layerTexture, v_uv);
#ifdef NORMAL
gl_FragColor = src *  u_opacity;
#else
vec4 dst = texture2D(u_backbufferTexture, v_uv);
vec3 Cs = src.a == 0.0 ? src.rgb : vec3(src.rgb / src.a);
vec3 Cb = dst.a == 0.0 ? dst.rgb : vec3(dst.rgb / dst.a);
float as = u_opacity * src.a;
float ab = dst.a;
#ifdef DESTINATION_OVER
gl_FragColor = vec4(as * Cs * (1.0 - ab) + ab * Cb, as + ab - as * ab);
#endif
#ifdef SOURCE_IN
vec4 color = vec4(as * Cs * ab, as * ab);
vec4 fadeColor = (1.0 - u_opacity) * u_inFadeOpacity * vec4(ab * Cb, ab);
gl_FragColor = color + fadeColor;
#endif
#ifdef DESTINATION_IN
vec4 color = vec4(ab * Cb * as, ab * as);
vec4 fadeColor = (1.0 - u_opacity) * u_inFadeOpacity * vec4(ab * Cb, ab);
gl_FragColor = color + fadeColor;
#endif
#ifdef SOURCE_OUT
gl_FragColor = vec4(as * Cs * (1.0 - ab), as * (1.0 - ab));
#endif
#ifdef DESTINATION_OUT
gl_FragColor = vec4(ab * Cb * (1.0 - as), ab * (1.0 - as));
#endif
#ifdef SOURCE_ATOP
gl_FragColor = vec4(as * Cs * ab + ab * Cb * (1.0 - as), ab);
#endif
#ifdef DESTINATION_ATOP
gl_FragColor = vec4(as * Cs * (1.0 - ab) + ab * Cb * as, as);
#endif
#ifdef XOR
gl_FragColor = vec4(as * Cs * (1.0 - ab) + ab * Cb * (1.0 - as),
as * (1.0 - ab) + ab * (1.0 - as));
#endif
#ifdef MULTIPLY
gl_FragColor = vec4(as * Cs * ab * Cb + (1.0 - ab) * as * Cs + (1.0 - as) * ab * Cb,
as + ab * (1.0 - as));
#endif
#ifdef SCREEN
gl_FragColor = vec4((Cs + Cb - Cs * Cb) * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef OVERLAY
vec3 f = vec3(overlay(Cb.r, Cs.r), overlay(Cb.g, Cs.g), overlay(Cb.b, Cs.b));
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef DARKEN
gl_FragColor = vec4(min(Cs, Cb) * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef LIGHTER
gl_FragColor = vec4(as * Cs + ab * Cb, as + ab);
#endif
#ifdef LIGHTEN
gl_FragColor = vec4(max(Cs, Cb) * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef COLOR_DODGE
vec3 f = vec3(colorDodge(Cb.r, Cs.r), colorDodge(Cb.g, Cs.g), colorDodge(Cb.b, Cs.b));
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef COLOR_BURN
vec3 f = vec3(colorBurn(Cb.r, Cs.r), colorBurn(Cb.g, Cs.g), colorBurn(Cb.b, Cs.b));
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef HARD_LIGHT
vec3 f = vec3(hardLight(Cb.r, Cs.r), hardLight(Cb.g, Cs.g), hardLight(Cb.b, Cs.b));
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef SOFT_LIGHT
vec3 f = vec3(softLight(Cb.r, Cs.r), softLight(Cb.g, Cs.g), softLight(Cb.b, Cs.b));
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef DIFFERENCE
gl_FragColor = vec4(abs(Cb - Cs) * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef EXCLUSION
vec3 f = Cs + Cb - 2.0 * Cs * Cb;
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef INVERT
gl_FragColor = vec4((1.0 - Cb) * as * ab + Cb * ab * (1.0 - as), ab);
#endif
#ifdef VIVID_LIGHT
vec3 f = vec3(vividLight(Cb.r, Cs.r),
vividLight(Cb.g, Cs.g),
vividLight(Cb.b, Cs.b));
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef HUE
vec3 f = setLumSat(Cs,Cb,Cb);
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef SATURATION
vec3 f = setLumSat(Cb,Cs,Cb);
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef COLOR
vec3 f = setLum(Cs,Cb);
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef LUMINOSITY
vec3 f = setLum(Cb,Cs);
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef PLUS
gl_FragColor = clamp(vec4(src.r + Cb.r, src.g + Cb.g, src.b + Cb.b, as + ab), 0.0, 1.0);
#endif
#ifdef MINUS
gl_FragColor = vec4(clamp(vec3(Cb.r - src.r, Cb.g - src.g, Cb.b - src.b), 0.0, 1.0), ab * as);
#endif
#ifdef AVERAGE
vec3 f = (Cb + Cs) / 2.0;
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#ifdef REFLECT
vec3 f = vec3(reflectBlend(Cb.r, Cs.r),
reflectBlend(Cb.g, Cs.g),
reflectBlend(Cb.b, Cs.b));
gl_FragColor = vec4(f * as * ab + Cs * as * (1.0 - ab) + Cb * ab *(1.0 - as),
as + ab * (1.0 - as));
#endif
#endif
}`,"blend.vert":`attribute vec2 a_position;
varying mediump vec2 v_uv;
void main(void) {
gl_Position = vec4(a_position , 0.0, 1.0);
v_uv = (a_position + 1.0) / 2.0;
}`},dot:{dot:{"dot.frag":`precision mediump float;
varying vec4 v_color;
varying float v_dotRatio;
varying float v_invEdgeRatio;
uniform highp float u_tileZoomFactor;
void main()
{
float dist = length(gl_PointCoord - vec2(.5, .5)) * 2.;
float alpha = smoothstep(0., 1., v_invEdgeRatio * (dist - v_dotRatio) + 1.);
gl_FragColor = v_color * alpha;
}`,"dot.vert":`precision highp float;
attribute vec2 a_pos;
uniform sampler2D u_texture;
uniform highp mat3 u_dvsMat3;
uniform highp float u_tileZoomFactor;
uniform highp float u_dotSize;
uniform highp float u_pixelRatio;
varying vec2 v_pos;
varying vec4 v_color;
varying float v_dotRatio;
varying float v_invEdgeRatio;
const float EPSILON = 0.000001;
void main()
{
mat3 tileToTileTexture = mat3(  1., 0., 0.,
0., -1., 0.,
0., 1., 1.  );
vec3 texCoords = tileToTileTexture * vec3(a_pos.xy / 512., 1.);
v_color = texture2D(u_texture, texCoords.xy);
float smoothEdgeWidth = max(u_dotSize / 2., 1.) ;
float z = 0.;
z += 2.0 * step(v_color.a, EPSILON);
gl_PointSize = (smoothEdgeWidth + u_dotSize);
gl_Position = vec4((u_dvsMat3 * vec3(a_pos + .5, 1.)).xy, z, 1.);
v_dotRatio = u_dotSize / gl_PointSize;
v_invEdgeRatio = -1. / ( smoothEdgeWidth / gl_PointSize );
gl_PointSize  *= (u_pixelRatio * u_tileZoomFactor);
}`}},filtering:{"bicubic.glsl":`vec4 computeWeights(float v) {
float b = 1.0 / 6.0;
float v2 = v * v;
float v3 = v2 * v;
float w0 = b * (-v3 + 3.0 * v2 - 3.0 * v + 1.0);
float w1 = b * (3.0 * v3  - 6.0 * v2 + 4.0);
float w2 = b * (-3.0 * v3 + 3.0 * v2 + 3.0 * v + 1.0);
float w3 = b * v3;
return vec4(w0, w1, w2, w3);
}
vec4 bicubicOffsetsAndWeights(float v) {
vec4 w = computeWeights(v);
float g0 = w.x + w.y;
float g1 = w.z + w.w;
float h0 = 1.0 - (w.y / g0) + v;
float h1 = 1.0 + (w.w / g1) - v;
return vec4(h0, h1, g0, g1);
}
vec4 sampleBicubicBSpline(sampler2D sampler, vec2 coords, vec2 texSize) {
vec2 eX = vec2(1.0 / texSize.x, 0.0);
vec2 eY = vec2(0.0, 1.0 / texSize.y);
vec2 texel = coords * texSize - 0.5;
vec3 hgX = bicubicOffsetsAndWeights(fract(texel).x).xyz;
vec3 hgY = bicubicOffsetsAndWeights(fract(texel).y).xyz;
vec2 coords10 = coords + hgX.x * eX;
vec2 coords00 = coords - hgX.y * eX;
vec2 coords11 = coords10 + hgY.x * eY;
vec2 coords01 = coords00 + hgY.x * eY;
coords10 = coords10 - hgY.y * eY;
coords00 = coords00 - hgY.y * eY;
vec4 color00 = texture2D(sampler, coords00);
vec4 color10 = texture2D(sampler, coords10);
vec4 color01 = texture2D(sampler, coords01);
vec4 color11 = texture2D(sampler, coords11);
color00 = mix(color00, color01, hgY.z);
color10 = mix(color10, color11, hgY.z);
color00 = mix(color00, color10, hgX.z);
return color00;
}`,"bilinear.glsl":`vec4 sampleBilinear(sampler2D sampler, vec2 coords, vec2 texSize) {
vec2 texelStart = floor(coords * texSize);
vec2 coord0 = texelStart / texSize;
vec2 coord1 = (texelStart +  vec2(1.0, 0.0)) / texSize;
vec2 coord2 = (texelStart +  vec2(0.0, 1.0)) / texSize;
vec2 coord3 = (texelStart +  vec2(1.0, 1.0)) / texSize;
vec4 color0 = texture2D(sampler, coord0);
vec4 color1 = texture2D(sampler, coord1);
vec4 color2 = texture2D(sampler, coord2);
vec4 color3 = texture2D(sampler, coord3);
vec2 blend = fract(coords * texSize);
vec4 color01 = mix(color0, color1, blend.x);
vec4 color23 = mix(color2, color3, blend.x);
vec4 color = mix(color01, color23, blend.y);
#ifdef NNEDGE
float alpha = floor(color0.a * color1.a * color2.a * color3.a + 0.5);
color = color * alpha + (1.0 - alpha) * texture2D(sampler, coords);
#endif
return color;
}`,"epx.glsl":`vec4 sampleEPX(sampler2D sampler, float size, vec2 coords, vec2 texSize) {
vec2 invSize = 1.0 / texSize;
vec2 texel = coords * texSize;
vec2 texel_i = floor(texel);
vec2 texel_frac = fract(texel);
vec4 colorP = texture2D(sampler, texel_i * invSize);
vec4 colorP1 = vec4(colorP);
vec4 colorP2 = vec4(colorP);
vec4 colorP3 = vec4(colorP);
vec4 colorP4 = vec4(colorP);
vec4 colorA = texture2D(sampler, (texel_i - vec2(0.0, 1.0)) * invSize);
vec4 colorB = texture2D(sampler, (texel_i + vec2(1.0, 0.0)) * invSize);
vec4 colorC = texture2D(sampler, (texel_i - vec2(1.0, 0.0)) * invSize);
vec4 colorD = texture2D(sampler, (texel_i + vec2(0.0, 1.0)) * invSize);
if (colorC == colorA && colorC != colorD && colorA != colorB) {
colorP1 = colorA;
}
if (colorA == colorB && colorA != colorC && colorB != colorD) {
colorP2 = colorB;
}
if (colorD == colorC && colorD != colorB && colorC != colorA) {
colorP3 = colorC;
}
if (colorB == colorD && colorB != colorA && colorD != colorC) {
colorP4 = colorD;
}
vec4 colorP12 = mix(colorP1, colorP2, texel_frac.x);
vec4 colorP34 = mix(colorP1, colorP2, texel_frac.x);
return mix(colorP12, colorP34, texel_frac.y);
}`},fx:{integrate:{"integrate.frag":`precision mediump float;
uniform lowp sampler2D u_sourceTexture;
uniform lowp sampler2D u_maskTexture;
uniform mediump float u_zoomLevel;
uniform highp float u_timeDelta;
uniform highp float u_animationTime;
varying highp vec2 v_texcoord;
#include <materials/utils.glsl>
void main()
{
#ifdef DELTA
vec4 texel = texture2D(u_sourceTexture, v_texcoord);
vec4 data0 = texture2D(u_maskTexture, v_texcoord);
float flags = data0.r * 255.0;
float groupMinZoom = data0.g * 255.0;
float isVisible = getFilterBit(flags, 0);
float wouldClip = step(groupMinZoom, u_zoomLevel);
float direction = wouldClip * 1.0 + (1.0 - wouldClip) * -1.0;
float dt = u_timeDelta / max(u_animationTime, 0.0001);
vec4 nextState = vec4(texel + direction * dt);
gl_FragColor =  vec4(nextState);
#elif defined(UPDATE)
vec4 texel = texture2D(u_sourceTexture, v_texcoord);
gl_FragColor = texel;
#endif
}`,"integrate.vert":`precision mediump float;
attribute vec2 a_pos;
varying highp vec2 v_texcoord;
void main()
{
v_texcoord = a_pos;
gl_Position = vec4(a_pos * 2.0 - 1.0, 0.0, 1.0);
}`}},highlight:{"blur.frag":`varying mediump vec2 v_texcoord;
uniform mediump vec4 u_direction;
uniform mediump mat4 u_channelSelector;
uniform mediump float u_sigma;
uniform sampler2D u_texture;
mediump float gauss1(mediump vec2 dir) {
return exp(-dot(dir, dir) / (2.0 * u_sigma * u_sigma));
}
mediump vec4 selectChannel(mediump vec4 sample) {
return u_channelSelector * sample;
}
void accumGauss1(mediump float i, inout mediump float tot, inout mediump float weight) {
mediump float w = gauss1(i * u_direction.xy);
tot += selectChannel(texture2D(u_texture, v_texcoord + i * u_direction.zw))[3] * w;
weight += w;
}
void main(void) {
mediump float tot = 0.0;
mediump float weight = 0.0;
accumGauss1(-5.0, tot, weight);
accumGauss1(-4.0, tot, weight);
accumGauss1(-3.0, tot, weight);
accumGauss1(-2.0, tot, weight);
accumGauss1(-1.0, tot, weight);
accumGauss1(0.0, tot, weight);
accumGauss1(1.0, tot, weight);
accumGauss1(2.0, tot, weight);
accumGauss1(3.0, tot, weight);
accumGauss1(4.0, tot, weight);
accumGauss1(5.0, tot, weight);
gl_FragColor = vec4(0.0, 0.0, 0.0, tot / weight);
}`,"highlight.frag":`varying mediump vec2 v_texcoord;
uniform sampler2D u_texture;
uniform mediump float u_sigma;
uniform sampler2D u_shade;
uniform mediump vec2 u_minMaxDistance;
mediump float estimateDistance() {
mediump float y = texture2D(u_texture, v_texcoord)[3];
const mediump float y0 = 0.5;
mediump float m0 = 1.0 / (sqrt(2.0 * 3.1415) * u_sigma);
mediump float d = (y - y0) / m0;
return d;
}
mediump vec4 shade(mediump float d) {
mediump float mappedDistance = (d - u_minMaxDistance.x) / (u_minMaxDistance.y - u_minMaxDistance.x);
mappedDistance = clamp(mappedDistance, 0.0, 1.0);
return texture2D(u_shade, vec2(mappedDistance, 0.5));
}
void main(void) {
mediump float d = estimateDistance();
gl_FragColor = shade(d);
}`,"textured.vert":`attribute mediump vec2 a_position;
attribute mediump vec2 a_texcoord;
varying mediump vec2 v_texcoord;
void main(void) {
gl_Position = vec4(a_position, 0.0, 1.0);
v_texcoord = a_texcoord;
}`},magnifier:{"magnifier.frag":`uniform lowp vec4 u_background;
uniform mediump sampler2D u_readbackTexture;
uniform mediump sampler2D u_maskTexture;
uniform mediump sampler2D u_overlayTexture;
uniform bool u_maskEnabled;
uniform bool u_overlayEnabled;
varying mediump vec2 v_texCoord;
const lowp float barrelFactor = 1.1;
lowp vec2 barrel(lowp vec2 uv) {
lowp vec2 uvn = uv * 2.0 - 1.0;
if (uvn.x == 0.0 && uvn.y == 0.0) {
return vec2(0.5, 0.5);
}
lowp float theta = atan(uvn.y, uvn.x);
lowp float r = pow(length(uvn), barrelFactor);
return r * vec2(cos(theta), sin(theta)) * 0.5 + 0.5;
}
void main(void)
{
lowp vec4 color = texture2D(u_readbackTexture, barrel(v_texCoord));
color = (color + (1.0 - color.a) * u_background);
lowp float mask = u_maskEnabled ? texture2D(u_maskTexture, v_texCoord).a : 1.0;
color *= mask;
lowp vec4 overlayColor = u_overlayEnabled ? texture2D(u_overlayTexture, v_texCoord) : vec4(0);
gl_FragColor = overlayColor + (1.0 - overlayColor.a) * color;
}`,"magnifier.vert":`precision mediump float;
attribute mediump vec2 a_pos;
uniform mediump vec4 u_drawPos;
varying mediump vec2 v_texCoord;
void main(void)
{
v_texCoord = a_pos;
gl_Position = vec4(u_drawPos.xy + vec2(a_pos - 0.5) * u_drawPos.zw, 0.0, 1.0);
}`},materials:{"attributeData.glsl":`uniform highp sampler2D u_attributeData0;
uniform highp sampler2D u_attributeData1;
uniform highp sampler2D u_attributeData2;
uniform highp sampler2D u_attributeData3;
uniform highp int u_attributeTextureSize;
highp vec2 getAttributeDataCoords(in highp vec3 id) {
highp vec3  texel = unpackDisplayIdTexel(id);
highp float size = float(u_attributeTextureSize);
highp float u32 = float(int(texel.r) + int(texel.g) * 256 + int(texel.b) * 256 * 256);
highp float col = mod(u32, size);
highp float row = (u32 - col) / size;
highp float u = col / size;
highp float v = row / size;
return vec2(u, v);
}
highp vec2 getAttributeDataTextureCoords(in highp vec3 id) {
return (getAttributeDataCoords(id) * 2.0) - 1.0 + (.5 / vec2(u_attributeTextureSize));
}
highp vec4 getAttributeData0(in highp vec3 id) {
vec2 coords = getAttributeDataCoords(id);
return texture2D(u_attributeData0, coords);
}
highp vec4 getAttributeData1(in highp vec3 id) {
highp vec2 coords = getAttributeDataCoords(id);
return texture2D(u_attributeData1, coords);
}
highp vec4 getAttributeData2(in highp vec3 id) {
highp vec2 coords = getAttributeDataCoords(id);
return texture2D(u_attributeData2, coords);
}
highp vec4 getAttributeData3(in highp vec3 id) {
highp vec2 coords = getAttributeDataCoords(id);
return texture2D(u_attributeData3, coords);
}
float u88VVToFloat(in vec2 v) {
bool isMagic = v.x == 255.0 && v.y == 255.0;
if (isMagic) {
return NAN_MAGIC_NUMBER;
}
return (v.x + v.y * float(0x100)) - 32768.0;
}`,"constants.glsl":`const float C_DEG_TO_RAD = 3.14159265359 / 180.0;
const float C_256_TO_RAD = 3.14159265359 / 128.0;
const float SIGNED_BYTE_TO_UNSIGNED = 128.0;
const float POSITION_PRECISION = 1.0 / 8.0;
const float FILL_POSITION_PRECISION = 1.0 / 1.0;
const float SOFT_EDGE_RATIO = 1.0;
const float THIN_LINE_WIDTH_FACTOR = 1.1;
const float THIN_LINE_HALF_WIDTH = 1.0;
const float EXTRUDE_SCALE_PLACEMENT_PADDING = 1.0 / 4.0;
const float OFFSET_PRECISION = 1.0 / 8.0;
const float OUTLINE_SCALE = 1.0 / 5.0;
const float SDF_FONT_SIZE = 24.0;
const float MAX_SDF_DISTANCE = 8.0;
const float PLACEMENT_PADDING = 8.0;
const float EPSILON = 0.00001;
const int MAX_FILTER_COUNT = 2;
const int ATTR_VV_SIZE = 0;
const int ATTR_VV_COLOR = 1;
const int ATTR_VV_OPACITY = 2;
const int ATTR_VV_ROTATION = 3;
const highp float NAN_MAGIC_NUMBER = 1e-30;
const int BITSET_GENERIC_LOCK_COLOR = 1;
const int BITSET_MARKER_ALIGNMENT_MAP = 0;
const int BITSET_MARKER_OUTLINE_ALLOW_COLOR_OVERRIDE = 2;
const int BITSET_MARKER_SCALE_SYMBOLS_PROPORTIONALLY = 3;
const int BITSET_TYPE_FILL_OUTLINE = 0;
const int BITSET_LINE_SCALE_DASH = 2;`,fill:{"common.glsl":`#ifdef PATTERN
uniform mediump vec2 u_mosaicSize;
#endif
#ifdef DOT_DENSITY
uniform lowp vec4 u_isActive[ 2 ];
uniform highp float u_dotValue;
uniform highp float u_tileDotsOverArea;
uniform highp float u_dotTextureDotCount;
uniform mediump float u_tileZoomFactor;
#endif
varying highp vec3 v_id;
varying lowp vec4 v_color;
varying lowp float v_opacity;
varying mediump vec4 v_aux1;
#ifdef PATTERN
varying mediump vec2 v_tileTextureCoord;
#endif
#ifdef OUTLINED_FILL
varying lowp float v_isOutline;
#endif
#ifdef DOT_DENSITY
varying highp vec2 v_dotTextureCoords;
varying highp vec4 v_dotThresholds[ 2 ];
#endif`,"fill.frag":`precision highp float;
#include <materials/constants.glsl>
#include <materials/utils.glsl>
#include <materials/fill/common.glsl>
#ifdef PATTERN
uniform lowp sampler2D u_texture;
#endif
#ifdef DOT_DENSITY
uniform mediump mat4 u_dotColors[ 2 ];
uniform sampler2D u_dotTextures[ 2 ];
uniform vec4 u_dotBackgroundColor;
#endif
#ifdef OUTLINED_FILL
#include <materials/shared/line/common.glsl>
#include <materials/shared/line/line.frag>
lowp vec4 drawLine() {
float v_lineWidth = v_aux1.x;
vec2  v_normal    = v_aux1.yz;
LineData inputs = LineData(
v_color,
v_normal,
v_lineWidth,
v_opacity,
v_id
);
return shadeLine(inputs);
}
#endif
lowp vec4 drawFill() {
lowp vec4 out_color = vec4(0.);
#ifdef HITTEST
out_color = vec4(1.0, 0.0, 0.0, 0.0);
#elif defined(PATTERN)
mediump vec4 v_tlbr = v_aux1;
mediump vec2 normalizedTextureCoord = mod(v_tileTextureCoord, 1.0);
mediump vec2 samplePos = mix(v_tlbr.xy, v_tlbr.zw, normalizedTextureCoord);
lowp vec4 color = texture2D(u_texture, samplePos);
out_color = v_opacity * v_color * color;
#elif defined(DOT_DENSITY) && !defined(HIGHLIGHT)
vec4 textureThresholds0 = texture2D(u_dotTextures[0], v_dotTextureCoords);
vec4 textureThresholds1 = texture2D(u_dotTextures[1], v_dotTextureCoords);
vec4 difference0 = v_dotThresholds[0] - textureThresholds0;
vec4 difference1 = v_dotThresholds[1] - textureThresholds1;
#ifdef DD_DOT_BLENDING
vec4 isPositive0 = step(0.0, difference0);
vec4 isPositive1 = step(0.0, difference1);
float weightSum = dot(isPositive0, difference0) + dot(isPositive1, difference1);
float lessThanEqZero = step(weightSum, 0.0);
float greaterThanZero = 1.0 - lessThanEqZero ;
float divisor = (weightSum + lessThanEqZero);
vec4 weights0 = difference0 * isPositive0 / divisor;
vec4 weights1 = difference1 * isPositive1 / divisor;
vec4 dotColor = u_dotColors[0] * weights0 + u_dotColors[1] * weights1;
vec4 preEffectColor = greaterThanZero * dotColor + lessThanEqZero * u_dotBackgroundColor;
#else
float diffMax = max(max4(difference0), max4(difference1));
float lessThanZero = step(diffMax, 0.0);
float greaterOrEqZero = 1.0 - lessThanZero;
vec4 isMax0 = step(diffMax, difference0);
vec4 isMax1 = step(diffMax, difference1);
vec4 dotColor = u_dotColors[0] * isMax0 + u_dotColors[1] * isMax1;
vec4 preEffectColor = greaterOrEqZero * dotColor + lessThanZero * u_dotBackgroundColor;
#endif
out_color = preEffectColor;
#else
out_color = v_opacity * v_color;
#endif
#ifdef HIGHLIGHT
out_color.a = 1.0;
#endif
return out_color;
}
void main() {
#ifdef OUTLINED_FILL
if (v_isOutline > 0.5) {
gl_FragColor = drawLine();
} else {
gl_FragColor = drawFill();
}
#else
gl_FragColor = drawFill();
#endif
}`,"fill.vert":`#define PACKED_LINE
precision highp float;
attribute float a_bitset;
#ifdef DOT_DENSITY
attribute float a_inverseArea;
vec4 a_color = vec4(0.0, 0.0, 0.0, 1.0);
vec2 a_zoomRange = vec2(0.0, 10000.0);
#else
attribute vec4 a_color;
attribute vec4 a_aux2;
attribute vec4 a_aux3;
#ifndef SIMPLE
attribute vec4 a_aux1;
attribute vec2 a_zoomRange;
#else
vec2 a_zoomRange = vec2(0.0, 10000.0);
#endif
#endif
uniform vec2 u_tileOffset;
#include <materials/vcommon.glsl>
#include <materials/fill/common.glsl>
#include <materials/fill/hittest.glsl>
#ifdef DOT_DENSITY
vec4 dotThreshold(vec4 featureAttrOverFeatureArea, float dotValue, float tileDotsOverArea) {
return featureAttrOverFeatureArea * (1.0 / dotValue)  * (1.0 / tileDotsOverArea);
}
#endif
#ifdef OUTLINED_FILL
#include <materials/shared/line/common.glsl>
#include <materials/shared/line/line.vert>
void drawLine(out lowp vec4 out_color, out highp vec3 out_pos) {
LineData outputs = buildLine(
out_pos,
a_id,
a_pos,
a_color,
(a_aux3.xy - 128.) / 16.,
(a_aux3.zw - 128.) / 16.,
0.,
a_aux2.z / 16.,
a_bitset,
vec4(0.),
vec2(0.),
a_aux2.w / 16.
);
v_id      = outputs.id;
v_color   = outputs.color;
v_opacity = outputs.opacity;
v_aux1    = vec4(outputs.lineHalfWidth, outputs.normal, 0.);
out_color = outputs.color;
}
#endif
void drawFill(out lowp vec4 out_color, out highp vec3 out_pos) {
float a_bitSet = a_bitset;
v_color = getColor(a_color, a_bitSet, BITSET_GENERIC_LOCK_COLOR);
v_opacity = getOpacity();
v_id      = norm(a_id);
out_color = v_color;
#ifdef DOT_DENSITY
mat3 tileToTileNormalized = mat3(  2. / 512.,  0.,  0.,
0., -2. / 512.,  0.,
-1.,  1.,  1.  );
out_pos   = tileToTileNormalized * vec3((a_pos * FILL_POSITION_PRECISION), 1.);
#else
out_pos   = u_dvsMat3 * vec3(a_pos * FILL_POSITION_PRECISION, 1.);
#endif
#ifdef PATTERN
vec4  a_tlbr   = a_aux1;
float a_width  = a_aux2.x;
float a_height = a_aux2.y;
vec2  a_offset = a_aux2.zw;
vec2  a_scale  = a_aux3.xy;
float a_angle  = a_aux3.z;
vec2 scale = (1.0 / SIGNED_BYTE_TO_UNSIGNED) * a_scale;
float width = u_pixelRatio * u_zoomFactor * a_width * scale.x;
float height = u_pixelRatio * u_zoomFactor * a_height * scale.y;
float angle = C_256_TO_RAD * a_angle;
float sinA = sin(angle);
float cosA = cos(angle);
mat3 patternMatrix = mat3(cosA / width, sinA / height, 0,
-sinA / width, cosA / height, 0,
0,            0,             1);
vec2 tileOffset = vec2(u_tileOffset.x * cosA - u_tileOffset.y * sinA, u_tileOffset.x * sinA + u_tileOffset.y * cosA);
tileOffset = mod(tileOffset, vec2(a_aux2.x, a_aux2.y));
vec2 symbolOffset = (a_offset - tileOffset - SIGNED_BYTE_TO_UNSIGNED) / vec2(width, height);
v_tileTextureCoord = (patternMatrix * vec3(a_pos * FILL_POSITION_PRECISION, 1.0)).xy - symbolOffset;
v_aux1 = a_tlbr / u_mosaicSize.xyxy;
#elif defined(DOT_DENSITY)
vec4 ddAttributeData0 = getAttributeData2(a_id) * u_isActive[0] * a_inverseArea;
vec4 ddAttributeData1 = getAttributeData3(a_id) * u_isActive[1] * a_inverseArea;
float size = u_tileZoomFactor * 512.0 * 1.0 / u_pixelRatio;
v_dotThresholds[0] = dotThreshold(ddAttributeData0, u_dotValue, u_tileDotsOverArea);
v_dotThresholds[1] = dotThreshold(ddAttributeData1, u_dotValue, u_tileDotsOverArea);
v_dotTextureCoords = (a_pos * FILL_POSITION_PRECISION + 0.5) / size;
#endif
}
#ifdef HITTEST
void draw(out lowp vec4 out_color, out highp vec3 out_pos) {
#ifdef OUTLINED_FILL
if (getBit(a_bitset, BITSET_TYPE_FILL_OUTLINE) > 0.5) {
out_pos = vec3(0., 0., 2.);
return;
}
#endif
out_pos = hittestFill();
gl_PointSize = 1.0;
}
#elif defined(OUTLINED_FILL)
void draw(out lowp vec4 out_color, out highp vec3 out_pos) {
v_isOutline = getBit(a_bitset, BITSET_TYPE_FILL_OUTLINE);
if (v_isOutline > 0.5) {
drawLine(out_color, out_pos);
} else {
drawFill(out_color, out_pos);
}
}
#else
#define draw drawFill
#endif
void main()
{
INIT;
lowp vec4 color = vec4(0.);
highp vec3 pos  = vec3(0.);
draw(color, pos);
gl_Position = vec4(clip(color, pos, getFilterFlags(), a_zoomRange), 1.0);
}`,"hittest.glsl":`#include <materials/hittest/common.glsl>
#ifdef HITTEST
attribute vec2 a_pos1;
attribute vec2 a_pos2;
const float EPSILON_PARALLEL = 0.05;
bool hasSameSide(vec3 p0, vec3 p1, vec3 a, vec3 b) {
vec3 cp0 = cross(b - a, p0 - a);
vec3 cp1 = cross(b - a, p1 - a);
return dot(cp0, cp1) >= 0.;
}
bool intersectPointTriangle(vec3 p, vec3 a, vec3 b, vec3 c) {
return hasSameSide(p, a, b, c) && hasSameSide(p, b, a, c) && hasSameSide(p, c, a, b);
}
bool intersectCircleTriange(vec3 p, vec3 a, vec3 b, vec3 c, float radius) {
vec2 ba = b.xy - a.xy;
vec2 ca = c.xy - a.xy;
float crossProduct = ba.x * ca.y - ca.x * ba.y;
bool isParallel = crossProduct < EPSILON_PARALLEL && crossProduct > -EPSILON_PARALLEL;
if (isParallel) {
return false;
}
if (distance(p, a) <= radius) {
return true;
}
if (distance(p, b) <= radius) {
return true;
}
if (distance(p, c) <= radius) {
return true;
}
vec3 p0 = p - normalize(p - a) * radius;
if (intersectPointTriangle(p0, a, b, c)) {
return true;
}
vec3 p1 = p - normalize(p - b) * radius;
if (intersectPointTriangle(p1, a, b, c)) {
return true;
}
vec3 p2 = p - normalize(p - c) * radius;
return intersectPointTriangle(p2, a, b, c);
}
vec3 hittestFill() {
vec3 pos        = u_viewMat3 * u_tileMat3 * vec3(a_pos  * FILL_POSITION_PRECISION, 1.);
vec3 pos1       = u_viewMat3 * u_tileMat3 * vec3(a_pos1 * FILL_POSITION_PRECISION, 1.);
vec3 pos2       = u_viewMat3 * u_tileMat3 * vec3(a_pos2 * FILL_POSITION_PRECISION, 1.);
vec3 outTextureCoords = vec3(getAttributeDataTextureCoords(a_id), 0.0);
vec3  hittestPos = vec3(u_hittestPos, 1.);
float hittestDist = u_hittestDist;
if (!intersectCircleTriange(hittestPos, pos, pos1, pos2, hittestDist)) {
outTextureCoords.z += 2.0;
}
return outTextureCoords;
}
#endif`},hittest:{"common.glsl":`#ifdef HITTEST
uniform float u_hittestDist;
uniform highp vec2 u_hittestPos;
#endif`},icon:{"common.glsl":`uniform lowp vec2 u_mosaicSize;
varying lowp vec4 v_color;
varying highp vec3 v_id;
varying highp vec4 v_sizeTex;
varying mediump vec3 v_pos;
varying highp float v_filters;
varying lowp float v_opacity;
#ifdef SDF
varying lowp vec4 v_outlineColor;
varying mediump float v_outlineWidth;
varying mediump float v_distRatio;
varying mediump float v_overridingOutlineColor;
varying mediump float v_isThin;
#endif`,"hittest.glsl":`#include <materials/hittest/common.glsl>
#ifdef HITTEST
vec3 hittestMarker(vec2 size) {
vec3 pos        = u_viewMat3 * u_tileMat3 * vec3(a_pos  * POSITION_PRECISION, 1.);
vec3  hittestPos = vec3(u_hittestPos, 1.);
float hittestDist = u_hittestDist;
vec3 outTextureCoords = vec3(getAttributeDataTextureCoords(a_id), 0.0);
float maxHalfSize = max(size.x, size.y) / 2.;
if (distance(pos, hittestPos) - maxHalfSize > hittestDist) {
outTextureCoords.z += 2.0;
}
return outTextureCoords;
}
#endif`,"icon.frag":`precision mediump float;
#include <materials/constants.glsl>
#include <materials/utils.glsl>
#include <util/encoding.glsl>
#include <materials/constants.glsl>
#include <materials/icon/common.glsl>
uniform lowp sampler2D u_texture;
#ifdef HITTEST
vec4 getColor() {
return vec4(1.);
}
#elif defined(SDF)
vec4 getColor() {
vec2 v_size = v_sizeTex.xy;
vec2 v_tex  = v_sizeTex.zw;
lowp vec4 fillPixelColor = v_color;
float d = 0.5 - rgba2float(texture2D(u_texture, v_tex));
float size = max(v_size.x, v_size.y);
float dist = d * size * SOFT_EDGE_RATIO * v_distRatio;
fillPixelColor *= clamp(0.5 - dist, 0.0, 1.0);
float outlineWidth = v_outlineWidth;
#ifdef HIGHLIGHT
outlineWidth = max(outlineWidth, 4.0 * v_isThin);
#endif
if (outlineWidth > 0.25) {
lowp vec4 outlinePixelColor = v_overridingOutlineColor * v_color + (1.0 - v_overridingOutlineColor) * v_outlineColor;
float clampedOutlineSize = min(outlineWidth, size);
outlinePixelColor *= clamp(0.5 - abs(dist) + clampedOutlineSize * 0.5, 0.0, 1.0);
return v_opacity * ((1.0 - outlinePixelColor.a) * fillPixelColor + outlinePixelColor);
}
return v_opacity * fillPixelColor;
}
#else
vec4 getColor() {
vec2 v_tex  = v_sizeTex.zw;
lowp vec4 texColor = texture2D(u_texture, v_tex);
return v_opacity * texColor * v_color;
}
#endif
void main()
{
vec4 color = getColor();
#ifdef HIGHLIGHT
color.a = step(1.0 / 255.0, color.a);
#endif
gl_FragColor = color;
}`,"icon.vert":`precision highp float;
attribute vec4 a_color;
attribute vec4 a_outlineColor;
attribute vec4 a_sizeAndOutlineWidth;
attribute vec2 a_vertexOffset;
attribute vec2 a_texCoords;
attribute vec2 a_bitSetAndDistRatio;
attribute vec2 a_zoomRange;
#include <materials/vcommon.glsl>
#include <materials/icon/common.glsl>
#include <materials/icon/hittest.glsl>
vec2 getMarkerSize(inout vec2 offset, inout vec2 baseSize, inout float outlineSize, in float referenceSize, in float bitSet) {
vec2 outSize = baseSize;
#ifdef VV_SIZE
float r = getSize(referenceSize) / referenceSize;
outSize.xy *= r;
offset.xy *= r;
float scaleSymbolProportionally = getBit(bitSet, BITSET_MARKER_SCALE_SYMBOLS_PROPORTIONALLY);
outlineSize *= scaleSymbolProportionally * (r - 1.0) + 1.0;
#endif
return outSize;
}
vec3 getOffset(in vec2 in_offset, float a_bitSet) {
float isMapAligned = getBit(a_bitSet, BITSET_MARKER_ALIGNMENT_MAP);
vec3  offset       = getRotation() * vec3(in_offset, 0.0);
return getMatrix(isMapAligned) * offset;
}
void main()
{
INIT;
vec2  a_size   = a_sizeAndOutlineWidth.xy * a_sizeAndOutlineWidth.xy / 128.0;
vec2  a_offset = a_vertexOffset / 16.0;
float a_outlineSize = a_sizeAndOutlineWidth.z * a_sizeAndOutlineWidth.z / 128.0;
float a_bitSet = a_bitSetAndDistRatio.x;
vec2 v_size = getMarkerSize(a_offset, a_size, a_outlineSize, a_sizeAndOutlineWidth.w * a_sizeAndOutlineWidth.w / 128.0, a_bitSet);
vec2 v_tex      = a_texCoords / u_mosaicSize;
v_color    = getColor(a_color, a_bitSet, BITSET_GENERIC_LOCK_COLOR);
v_opacity  = getOpacity();
v_id       = norm(a_id);
v_filters  = getFilterFlags();
v_pos      = u_dvsMat3 * vec3(a_pos * POSITION_PRECISION, 1.0) + getOffset(a_offset, a_bitSet);
v_sizeTex  = vec4(v_size.xy, v_tex.xy);
#ifdef SDF
v_isThin   = getBit(a_bitSet, BITSET_MARKER_OUTLINE_ALLOW_COLOR_OVERRIDE);
#ifdef VV_COLOR
v_overridingOutlineColor = v_isThin;
#else
v_overridingOutlineColor = 0.0;
#endif
v_outlineWidth = min(a_outlineSize, max(max(v_size.x, v_size.y) - 0.99, 0.0));
v_outlineColor = a_outlineColor;
v_distRatio = a_bitSetAndDistRatio.y / 126.0;
#endif
#ifdef HITTEST
vec3 pos = hittestMarker(v_size.xy);
gl_PointSize = 1.;
gl_Position = vec4(clip(v_color, pos, v_filters, a_zoomRange), 1.0);
#else
gl_Position = vec4(clip(v_color, v_pos, v_filters, a_zoomRange), 1.0);
#endif
}`},label:{"common.glsl":`uniform mediump float u_zoomLevel;
uniform mediump float u_mapRotation;
uniform mediump float u_mapAligned;
uniform mediump vec2 u_mosaicSize;
varying mediump float v_antialiasingWidth;
varying mediump float v_edgeDistanceOffset;
varying mediump vec2 v_tex;
varying mediump vec4 v_color;
varying lowp vec4 v_animation;`,"label.frag":"#include <materials/text/text.frag>","label.vert":`precision highp float;
#include <materials/vcommon.glsl>
#include <materials/text/common.glsl>
attribute vec4 a_color;
attribute vec4 a_haloColor;
attribute vec4 a_texAndSize;
attribute vec4 a_refSymbolAndPlacementOffset;
attribute vec4 a_glyphData;
attribute vec2 a_vertexOffset;
attribute vec2 a_texCoords;
uniform float u_isHalo;
uniform float u_mapRotation;
uniform float u_mapAligned;
float getZ(in float minZoom, in float maxZoom, in float angle) {
float glyphAngle = angle * 360.0 / 254.0;
float mapAngle = u_mapRotation * 360.0 / 254.0;
float diffAngle = min(360.0 - abs(mapAngle - glyphAngle), abs(mapAngle - glyphAngle));
float z = 0.0;
z += u_mapAligned * (2.0 * (1.0 - step(minZoom, u_currentZoom)));
z += u_mapAligned * 2.0 * step(90.0, diffAngle);
z += 2.0 * (1.0 - step(u_currentZoom, maxZoom));
return z;
}
void main()
{
INIT;
float groupMinZoom    = getMinZoom();
float glyphMinZoom    = a_glyphData.x;
float glyphMaxZoom    = a_glyphData.y;
float glyphAngle      = a_glyphData.z;
float a_minZoom          = max(groupMinZoom, glyphMinZoom);
float a_placementPadding = a_refSymbolAndPlacementOffset.x * EXTRUDE_SCALE_PLACEMENT_PADDING;
vec2  a_placementDir     = unpack_u8_nf32(a_refSymbolAndPlacementOffset.zw);
float a_refSymbolSize    = a_refSymbolAndPlacementOffset.y;
float fontSize           = a_texAndSize.z;
float haloSize           = a_texAndSize.w * OUTLINE_SCALE;
vec2  vertexOffset = a_vertexOffset * OFFSET_PRECISION;
vec3  pos          = vec3(a_pos * POSITION_PRECISION, 1.0);
float z            = getZ(a_minZoom, glyphMaxZoom, glyphAngle);
float fontScale    = fontSize / SDF_FONT_SIZE;
float halfSize     = getSize(a_refSymbolSize) / 2.0;
float animation    = pow(getAnimationState(), vec4(2.0)).r;
v_color     = animation * ((1.0 - u_isHalo) * a_color + (u_isHalo * a_haloColor));
v_opacity   = 1.0;
v_tex       = a_texCoords / u_mosaicSize;
v_edgeDistanceOffset = u_isHalo * haloSize / fontScale / MAX_SDF_DISTANCE;
v_antialiasingWidth  = 0.105 * SDF_FONT_SIZE / fontSize / u_pixelRatio;
vec2 placementOffset = a_placementDir * (halfSize + a_placementPadding);
vec3 glyphOffset     = u_displayMat3 * vec3(vertexOffset + placementOffset, 0.0);
vec3 v_pos           = vec3((u_dvsMat3 * pos + glyphOffset).xy, z);
gl_Position = vec4(v_pos, 1.0);
#ifdef DEBUG
v_color = vec4(a_color.rgb, z == 0.0 ? 1.0 : 0.645);
#endif
}`},line:{"common.glsl":`varying lowp vec4 v_color;
varying highp vec3 v_id;
varying mediump vec2 v_normal;
varying mediump float v_lineHalfWidth;
varying lowp float v_opacity;
#ifdef PATTERN
varying mediump vec4 v_tlbr;
varying mediump vec2 v_patternSize;
#endif
#if defined(PATTERN) || defined(SDF)
varying highp float v_accumulatedDistance;
#endif
#ifdef SDF
varying mediump float v_lineWidthRatio;
#endif`,"hittest.glsl":`#include <materials/hittest/common.glsl>
#ifdef HITTEST
attribute vec2 a_pos1;
attribute vec2 a_pos2;
bool intersectCircleLineInner(vec3 p, vec3 a, vec3 b, float radius) {
vec3 v0 = a - p;
vec3 b2 = b - p;
vec3 v  = b2 - v0;
float D = 4. * dot(v0, v) * dot(v0, v) - 4. * dot(v, v) * ( dot(v0, v0) - radius * radius );
if (D < 0.) {
return false;
}
float sqrtD = sqrt(D);
float t0 = (-2. * dot(v0, v) + sqrtD) / (2. * dot(v, v));
float t1 = (-2. * dot(v0, v) - sqrtD) / (2. * dot(v, v));
return ((t0 >= 0. && t0 <= 1.) || (t1 >= 0. && t1 <= 1.));
}
bool intersectCircleLine(vec3 p, vec3 a, vec3 b, vec3 c, float radius) {
return intersectCircleLineInner(p, a, b, radius) || intersectCircleLineInner(p, b, c, radius);
}
vec3 hittestLine(float halfWidth) {
vec3 pos        = u_viewMat3 * u_tileMat3 * vec3(a_pos  * POSITION_PRECISION, 1.);
vec3 pos1       = u_viewMat3 * u_tileMat3 * vec3(a_pos1 * POSITION_PRECISION, 1.);
vec3 pos2       = u_viewMat3 * u_tileMat3 * vec3(a_pos2 * POSITION_PRECISION, 1.);
vec3 outTextureCoords = vec3(getAttributeDataTextureCoords(a_id), 0.0);
vec3  hittestPos = vec3(u_hittestPos, 1.);
float hittestDist = u_hittestDist;
if (!intersectCircleLine(hittestPos, pos, pos1, pos2, hittestDist + halfWidth)) {
outTextureCoords.z += 2.0;
}
return outTextureCoords;
}
#endif`,"line.frag":`precision lowp float;
#include <util/encoding.glsl>
#include <materials/constants.glsl>
#include <materials/line/common.glsl>
#include <materials/shared/line/common.glsl>
#include <materials/shared/line/line.frag>
#ifdef HITTEST
void main() {
gl_FragColor = vec4(1.);
}
#else
void main() {
LineData inputs = LineData(
v_color,
v_normal,
v_lineHalfWidth,
v_opacity,
#ifndef OUTLINED_FILL
#ifdef PATTERN
v_tlbr,
v_patternSize,
#endif
#ifdef SDF
v_lineWidthRatio,
#endif
#if defined(PATTERN) || defined(SDF)
v_accumulatedDistance,
#endif
#endif
v_id
);
gl_FragColor = shadeLine(inputs);
}
#endif`,"line.vert":`precision highp float;
attribute vec4 a_color;
attribute vec4 a_offsetAndNormal;
attribute vec2 a_accumulatedDistanceAndHalfWidth;
attribute vec4 a_tlbr;
attribute vec4 a_segmentDirection;
attribute vec2 a_aux;
attribute vec2 a_zoomRange;
#include <materials/vcommon.glsl>
#include <materials/line/common.glsl>
#include <materials/line/hittest.glsl>
#include <materials/shared/line/common.glsl>
#include <materials/shared/line/line.vert>
#ifdef HITTEST
void draw() {
float aa        = 0.5 * u_antialiasing;
float a_halfWidth = a_accumulatedDistanceAndHalfWidth.y / 16.;
float a_cimHalfWidth = a_aux.x / 16. ;
vec2  a_offset = a_offsetAndNormal.xy / 16.;
float baseWidth = getBaseLineHalfWidth(a_halfWidth, a_cimHalfWidth);
float halfWidth = getLineHalfWidth(baseWidth, aa);
gl_PointSize = 1.;
vec3 pos = hittestLine(halfWidth);
gl_Position = vec4(clip(v_color, pos, getFilterFlags(), a_zoomRange), 1.0);
}
#else
void draw()
{
highp vec3 pos = vec3(0.);
LineData outputs = buildLine(
pos,
a_id,
a_pos,
a_color,
a_offsetAndNormal.xy / 16.,
a_offsetAndNormal.zw / 16.,
a_accumulatedDistanceAndHalfWidth.x,
a_accumulatedDistanceAndHalfWidth.y / 16.,
a_segmentDirection.w,
a_tlbr,
a_segmentDirection.xy / 16.,
a_aux.x / 16.
);
v_id              = outputs.id;
v_color           = outputs.color;
v_normal          = outputs.normal;
v_lineHalfWidth   = outputs.lineHalfWidth;
v_opacity         = outputs.opacity;
#ifndef OUTLINED_FILL
#ifdef PATTERN
v_tlbr          = outputs.tlbr;
v_patternSize   = outputs.patternSize;
#endif
#ifdef SDF
v_lineWidthRatio = outputs.lineWidthRatio;
#endif
#if defined(PATTERN) || defined(SDF)
v_accumulatedDistance = outputs.accumulatedDistance;
#endif
#endif
gl_Position = vec4(clip(outputs.color, pos, getFilterFlags(), a_zoomRange), 1.0);
}
#endif
void main() {
INIT;
draw();
}`},shared:{line:{"common.glsl":`#if !defined(OUTLINED_FILL) && defined(PATTERN)
uniform mediump vec2 u_mosaicSize;
#endif
struct LineData {
lowp vec4 color;
mediump vec2 normal;
mediump float lineHalfWidth;
lowp float opacity;
#ifndef OUTLINED_FILL
#ifdef PATTERN
mediump vec4 tlbr;
mediump vec2 patternSize;
#endif
#ifdef SDF
mediump float lineWidthRatio;
#endif
#if defined(PATTERN) || defined(SDF)
highp float accumulatedDistance;
#endif
#endif
highp vec3 id;
};`,"line.frag":`uniform lowp float u_blur;
#if !defined(OUTLINED_FILL) && !defined(HIGHLIGHT)
#if defined(PATTERN) || defined(SDF)
uniform sampler2D u_texture;
uniform highp float u_pixelRatio;
#endif
#endif
#if defined(SDF) && !defined(HIGHLIGHT) && !defined(OUTLINED_FILL)
lowp vec4 getLineColor(LineData line) {
mediump float adjustedPatternWidth = line.patternSize.x * 2.0 * line.lineWidthRatio;
mediump float relativeTexX = fract(u_pixelRatio * line.accumulatedDistance / adjustedPatternWidth);
mediump float relativeTexY = 0.5 + 0.25 * line.normal.y;
mediump vec2 texCoord = mix(line.tlbr.xy, line.tlbr.zw, vec2(relativeTexX, relativeTexY));
mediump float d = rgba2float(texture2D(u_texture, texCoord)) - 0.5;
float dist = d * line.lineHalfWidth;
return line.opacity * clamp(0.5 - dist, 0.0, 1.0) * line.color;
}
#elif defined(PATTERN) && !defined(HIGHLIGHT) && !defined(OUTLINED_FILL)
lowp vec4 getLineColor(LineData line) {
mediump float lineHalfWidth = line.lineHalfWidth;
mediump float adjustedPatternWidth = line.patternSize.x * 2.0 * lineHalfWidth / line.patternSize.y;
mediump float relativeTexX = fract(u_pixelRatio * line.accumulatedDistance / adjustedPatternWidth);
mediump float relativeTexY = 0.5 + 0.5 * line.normal.y;
mediump vec2 texCoord = mix(line.tlbr.xy, line.tlbr.zw, vec2(relativeTexY, relativeTexX));
lowp vec4 color = texture2D(u_texture, texCoord);
return line.opacity * line.color * color;
}
#else
lowp vec4 getLineColor(LineData line) {
return line.opacity * line.color;
}
#endif
vec4 shadeLine(LineData line)
{
mediump float thinLineFactor = max(THIN_LINE_WIDTH_FACTOR * step(line.lineHalfWidth, THIN_LINE_HALF_WIDTH), 1.0);
mediump float fragDist = length(line.normal) * line.lineHalfWidth;
lowp float alpha = clamp(thinLineFactor * (line.lineHalfWidth - fragDist) / (u_blur + thinLineFactor - 1.0), 0.0, 1.0);
lowp vec4 out_color = getLineColor(line) * alpha;
#ifdef HIGHLIGHT
out_color.a = step(1.0 / 255.0, out_color.a);
#endif
#ifdef ID
if (out_color.a < 1.0 / 255.0) {
discard;
}
out_color = vec4(line.id, 0.0);
#endif
return out_color;
}`,"line.vert":`float getBaseLineHalfWidth(in float lineHalfWidth, in float referenceHalfWidth) {
#ifdef VV_SIZE
float refLineWidth = 2.0 * referenceHalfWidth;
return 0.5 * (lineHalfWidth / referenceHalfWidth) * getSize(refLineWidth);
#else
return lineHalfWidth;
#endif
}
float getLineHalfWidth(in float baseWidth, in float aa) {
float halfWidth = max(baseWidth + aa, 0.45) + 0.1 * aa;
#ifdef HIGHLIGHT
halfWidth = max(halfWidth, 2.0);
#endif
return halfWidth;
}
vec2 getDist(in vec2 offset, in float halfWidth) {
float thinLineFactor = max(THIN_LINE_WIDTH_FACTOR * step(halfWidth, THIN_LINE_HALF_WIDTH), 1.0);
return thinLineFactor * halfWidth * offset;
}
LineData buildLine(
out vec3 out_pos,
in vec3 in_id,
in vec2 in_pos,
in vec4 in_color,
in vec2 in_offset,
in vec2 in_normal,
in float in_accumulatedDist,
in float in_lineHalfWidth,
in float in_bitSet,
in vec4 in_tlbr,
in vec2 in_segmentDirection,
in float in_referenceHalfWidth
)
{
float aa        = 0.5 * u_antialiasing;
float baseWidth = getBaseLineHalfWidth(in_lineHalfWidth, in_referenceHalfWidth);
float halfWidth = getLineHalfWidth(baseWidth, aa);
float z         = 2.0 * step(baseWidth, 0.0);
vec2  dist      = getDist(in_offset, halfWidth);
vec3  offset    = u_displayViewMat3 * vec3(dist, 0.0);
vec3  pos       = u_dvsMat3 * vec3(in_pos * POSITION_PRECISION, 1.0) + offset;
#ifdef OUTLINED_FILL
vec4  color     = in_color;
float opacity   = 1.0;
#else
vec4  color     = getColor(in_color, in_bitSet, 0);
float opacity   = getOpacity();
#ifdef SDF
const float SDF_PATTERN_HALF_WIDTH = 15.5;
float scaleDash = getBit(in_bitSet, BITSET_LINE_SCALE_DASH);
float lineWidthRatio = (scaleDash * max(halfWidth - 0.55 * u_antialiasing, 0.25) + (1.0 - scaleDash)) / SDF_PATTERN_HALF_WIDTH;
#endif
#endif
out_pos = vec3(pos.xy, z);
return LineData(
color,
in_normal,
halfWidth,
opacity,
#ifndef OUTLINED_FILL
#ifdef PATTERN
in_tlbr / u_mosaicSize.xyxy,
vec2(in_tlbr.z - in_tlbr.x, in_tlbr.w - in_tlbr.y),
#endif
#ifdef SDF
lineWidthRatio,
#endif
#if defined(PATTERN) || defined(SDF)
in_accumulatedDist * u_zoomFactor + dot(in_segmentDirection, dist),
#endif
#endif
norm(in_id)
);
}`}},text:{"common.glsl":`uniform highp vec2 u_mosaicSize;
varying highp vec3 v_id;
varying mediump vec3 v_pos;
varying lowp float v_opacity;
varying lowp vec4 v_color;
varying highp vec2 v_tex;
varying mediump float v_antialiasingWidth;
varying mediump float v_edgeDistanceOffset;
varying lowp float v_transparency;`,"hittest.glsl":`#include <materials/hittest/common.glsl>
#ifdef HITTEST
vec3 hittestGlyph(in vec3 in_pos, in vec3 offset, in float fontSize) {
vec3 pos        = u_viewMat3 * u_tileMat3 * in_pos + u_tileMat3 * offset;
vec3  hittestPos = vec3(u_hittestPos, 1.);
float hittestDist = u_hittestDist;
vec3 outTextureCoords = vec3(getAttributeDataTextureCoords(a_id), 0.0);
float halfFontSize = fontSize / 2.;
if (distance(pos, hittestPos) > hittestDist + halfFontSize) {
outTextureCoords.z += 2.0;
}
return outTextureCoords;
}
#endif`,"text.frag":`precision mediump float;
#include <materials/text/common.glsl>
uniform lowp sampler2D u_texture;
#ifdef HITTEST
vec4 getColor() {
return vec4(1.);
}
#else
vec4 getColor()
{
float SDF_CUTOFF = (2.0 / 8.0);
float SDF_BASE_EDGE_DIST = 1.0 - SDF_CUTOFF;
lowp float dist = texture2D(u_texture, v_tex).a;
mediump float edge = SDF_BASE_EDGE_DIST - v_edgeDistanceOffset;
#ifdef HIGHLIGHT
edge /= 2.0;
#endif
lowp float aa = v_antialiasingWidth;
lowp float alpha = smoothstep(edge - aa, edge + aa, dist);
return alpha * v_color * v_opacity;
}
#endif
void main()
{
gl_FragColor = getColor();
}`,"text.vert":`precision highp float;
#include <materials/utils.glsl>
#include <materials/vcommon.glsl>
#include <materials/text/common.glsl>
#include <materials/text/hittest.glsl>
attribute vec4 a_color;
attribute vec4 a_haloColor;
attribute vec4 a_texFontSize;
attribute vec4 a_aux;
attribute vec2 a_zoomRange;
attribute vec2 a_vertexOffset;
attribute vec2 a_texCoords;
uniform float u_isHalo;
float getTextSize(inout vec2 offset, inout float baseSize, in float referenceSize) {
#ifdef VV_SIZE
float r = getSize(referenceSize) / referenceSize;
baseSize *= r;
offset.xy *= r;
return baseSize;
#endif
return baseSize;
}
void main()
{
INIT;
float a_referenceSize = a_aux.z * a_aux.z / 256.0;
float a_bitSet        = a_aux.w;
float a_fontSize      = a_texFontSize.z;
vec2  a_offset        = a_vertexOffset * OFFSET_PRECISION;
vec3  in_pos        = vec3(a_pos * POSITION_PRECISION, 1.0);
float fontSize      = getTextSize(a_offset, a_fontSize, a_referenceSize);
float fontScale     = fontSize / SDF_FONT_SIZE;
vec3  offset        = getRotation() * vec3(a_offset, 0.0);
mat3  extrudeMatrix = getBit(a_bitSet, 0) == 1.0 ? u_displayViewMat3 : u_displayMat3;
v_color   = u_isHalo * a_haloColor + (1.0 - u_isHalo) * getColor(a_color, a_bitSet, 1);
v_opacity = getOpacity();
v_id      = norm(a_id);
v_tex     = a_texCoords / u_mosaicSize;
v_pos     = u_dvsMat3 * in_pos + extrudeMatrix * offset;
v_edgeDistanceOffset = u_isHalo * OUTLINE_SCALE * a_texFontSize.w / fontScale / MAX_SDF_DISTANCE;
v_antialiasingWidth  = 0.105 * SDF_FONT_SIZE / fontSize / u_pixelRatio;
#ifdef HITTEST
vec3 pos = hittestGlyph(in_pos, offset, fontSize);
gl_PointSize = 1.;
gl_Position = vec4(clip(v_color, pos, getFilterFlags(), a_zoomRange), 1.0);
#else
gl_Position =  vec4(clip(v_color, v_pos, getFilterFlags(), a_zoomRange), 1.0);
#endif
}`},"utils.glsl":`float rshift(in float u32, in int amount) {
return floor(u32 / pow(2.0, float(amount)));
}
float getBit(in float bitset, in int bitIndex) {
float offset = pow(2.0, float(bitIndex));
return mod(floor(bitset / offset), 2.0);
}
float getFilterBit(in float bitset, in int bitIndex) {
return getBit(bitset, bitIndex + 1);
}
float getHighlightBit(in float bitset) {
return getBit(bitset, 0);
}
highp vec3 unpackDisplayIdTexel(in highp vec3 bitset) {
float isAggregate = getBit(bitset.b, 7);
return (1.0 - isAggregate) * bitset + isAggregate * (vec3(bitset.rgb) - vec3(0.0, 0.0, float(0x80)));
}
vec4 unpack(in float u32) {
float r = mod(rshift(u32, 0), 255.0);
float g = mod(rshift(u32, 8), 255.0);
float b = mod(rshift(u32, 16), 255.0);
float a = mod(rshift(u32, 24), 255.0);
return vec4(r, g, b, a);
}
vec3 norm(in vec3 v) {
return v /= 255.0;
}
vec4 norm(in vec4 v) {
return v /= 255.0;
}
float max4(vec4 target) {
return max(max(max(target.x, target.y), target.z), target.w);
}
vec2 unpack_u8_nf32(vec2 bytes) {
return (bytes - 127.0) / 127.0;
}`,"vcommon.glsl":`#include <materials/constants.glsl>
#include <materials/utils.glsl>
#include <materials/attributeData.glsl>
#include <materials/vv.glsl>
attribute vec2 a_pos;
attribute highp vec3 a_id;
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform highp mat3 u_tileMat3;
uniform highp mat3 u_viewMat3;
uniform highp float u_pixelRatio;
uniform mediump float u_zoomFactor;
uniform mediump float u_antialiasing;
uniform mediump float u_currentZoom;
vec4 VV_ADATA = vec4(0.0);
void loadVisualVariableData(inout vec4 target) {
#ifdef OES_TEXTURE_FLOAT
target.rgba = getAttributeData2(a_id);
#else
vec4 data0 = getAttributeData2(a_id);
vec4 data1 = getAttributeData3(a_id);
target.r = u88VVToFloat(data0.rg * 255.0);
target.g = u88VVToFloat(data0.ba * 255.0);
target.b = u88VVToFloat(data1.rg * 255.0);
target.a = u88VVToFloat(data1.ba * 255.0);
#endif
}
#ifdef VV
#define INIT loadVisualVariableData(VV_ADATA)
#else
#define INIT
#endif
vec4 getColor(in vec4 a_color, in float a_bitSet, int index) {
#ifdef VV_COLOR
float isColorLocked   = getBit(a_bitSet, index);
return getVVColor(VV_ADATA[ATTR_VV_COLOR], a_color, isColorLocked);
#else
return a_color;
#endif
}
float getOpacity() {
#ifdef VV_OPACITY
return getVVOpacity(VV_ADATA[ATTR_VV_OPACITY]);
#else
return 1.0;
#endif
}
float getSize(in float in_size) {
#ifdef VV_SIZE
return getVVSize(in_size, VV_ADATA[ATTR_VV_SIZE]);
#else
return in_size;
#endif
}
mat3 getRotation() {
#ifdef VV_ROTATION
return getVVRotationMat3(mod(VV_ADATA[ATTR_VV_ROTATION], 360.0));
#else
return mat3(1.0);
#endif
}
float getFilterFlags() {
#ifdef IGNORES_SAMPLER_PRECISION
return ceil(getAttributeData0(a_id).x * 255.0);
#else
return getAttributeData0(a_id).x * 255.0;
#endif
}
vec4 getAnimationState() {
return getAttributeData1(a_id);
}
float getMinZoom() {
vec4 data0 = getAttributeData0(a_id) * 255.0;
return data0.g;
}
mat3 getMatrix(float isMapAligned) {
return isMapAligned * u_displayViewMat3 + (1.0 - isMapAligned) * u_displayMat3;
}
vec3 clip(inout vec4 color, inout vec3 pos, in float filterFlags, in vec2 minMaxZoom) {
pos.z += 2.0 * (1.0 - getFilterBit(filterFlags, 0));
#ifdef INSIDE
pos.z += 2.0 * (1.0 - getFilterBit(filterFlags, 1));
#elif defined(OUTSIDE)
pos.z += 2.0 * getFilterBit(filterFlags, 1);
#elif defined(HIGHLIGHT)
#if !defined(HIGHLIGHT_ALL)
pos.z += 2.0 * (1.0 - getHighlightBit(filterFlags));
#endif
#endif
pos.z += 2.0 * (step(minMaxZoom.y, u_currentZoom) + (1.0 - step(minMaxZoom.x, u_currentZoom)));
return pos;
}`,"vv.glsl":`#if defined(VV_SIZE_MIN_MAX_VALUE) || defined(VV_SIZE_SCALE_STOPS) || defined(VV_SIZE_FIELD_STOPS) || defined(VV_SIZE_UNIT_VALUE)
#define VV_SIZE
#endif
#if defined(VV_COLOR) || defined(VV_SIZE) || defined(VV_OPACITY) || defined(VV_ROTATION)
#define VV
#endif
#ifdef VV_COLOR
uniform highp float u_vvColorValues[8];
uniform vec4 u_vvColors[8];
#endif
#ifdef VV_SIZE_MIN_MAX_VALUE
uniform highp vec4 u_vvSizeMinMaxValue;
#endif
#ifdef VV_SIZE_SCALE_STOPS
uniform highp float u_vvSizeScaleStopsValue;
#endif
#ifdef VV_SIZE_FIELD_STOPS
uniform highp float u_vvSizeFieldStopsValues[6];
uniform float u_vvSizeFieldStopsSizes[6];
#endif
#ifdef VV_SIZE_UNIT_VALUE
uniform highp float u_vvSizeUnitValueWorldToPixelsRatio;
#endif
#ifdef VV_OPACITY
uniform highp float u_vvOpacityValues[8];
uniform float u_vvOpacities[8];
#endif
#ifdef VV_ROTATION
uniform lowp float u_vvRotationType;
#endif
bool isNan(float val) {
return (val == NAN_MAGIC_NUMBER);
}
#ifdef VV_SIZE_MIN_MAX_VALUE
float getVVMinMaxSize(float sizeValue, float fallback) {
if (isNan(sizeValue)) {
return fallback;
}
float interpolationRatio = (sizeValue  - u_vvSizeMinMaxValue.x) / (u_vvSizeMinMaxValue.y - u_vvSizeMinMaxValue.x);
interpolationRatio = clamp(interpolationRatio, 0.0, 1.0);
return u_vvSizeMinMaxValue.z + interpolationRatio * (u_vvSizeMinMaxValue.w - u_vvSizeMinMaxValue.z);
}
#endif
#ifdef VV_SIZE_FIELD_STOPS
const int VV_SIZE_N = 6;
float getVVStopsSize(float sizeValue, float fallback) {
if (isNan(sizeValue)) {
return fallback;
}
if (sizeValue <= u_vvSizeFieldStopsValues[0]) {
return u_vvSizeFieldStopsSizes[0];
}
for (int i = 1; i < VV_SIZE_N; ++i) {
if (u_vvSizeFieldStopsValues[i] >= sizeValue) {
float f = (sizeValue - u_vvSizeFieldStopsValues[i-1]) / (u_vvSizeFieldStopsValues[i] - u_vvSizeFieldStopsValues[i-1]);
return mix(u_vvSizeFieldStopsSizes[i-1], u_vvSizeFieldStopsSizes[i], f);
}
}
return u_vvSizeFieldStopsSizes[VV_SIZE_N - 1];
}
#endif
#ifdef VV_SIZE_UNIT_VALUE
float getVVUnitValue(float sizeValue, float fallback) {
if (isNan(sizeValue)) {
return fallback;
}
return u_vvSizeUnitValueWorldToPixelsRatio * sizeValue;
}
#endif
#ifdef VV_OPACITY
const int VV_OPACITY_N = 8;
float getVVOpacity(float opacityValue) {
if (isNan(opacityValue)) {
return 1.0;
}
if (opacityValue <= u_vvOpacityValues[0]) {
return u_vvOpacities[0];
}
for (int i = 1; i < VV_OPACITY_N; ++i) {
if (u_vvOpacityValues[i] >= opacityValue) {
float f = (opacityValue - u_vvOpacityValues[i-1]) / (u_vvOpacityValues[i] - u_vvOpacityValues[i-1]);
return mix(u_vvOpacities[i-1], u_vvOpacities[i], f);
}
}
return u_vvOpacities[VV_OPACITY_N - 1];
}
#endif
#ifdef VV_ROTATION
mat4 getVVRotation(float rotationValue) {
if (isNan(rotationValue)) {
return mat4(1, 0, 0, 0,
0, 1, 0, 0,
0, 0, 1, 0,
0, 0, 0, 1);
}
float rotation = rotationValue;
if (u_vvRotationType == 1.0) {
rotation = 90.0 - rotation;
}
float angle = C_DEG_TO_RAD * rotation;
float sinA = sin(angle);
float cosA = cos(angle);
return mat4(cosA, sinA, 0, 0,
-sinA,  cosA, 0, 0,
0,     0, 1, 0,
0,     0, 0, 1);
}
mat3 getVVRotationMat3(float rotationValue) {
if (isNan(rotationValue)) {
return mat3(1, 0, 0,
0, 1, 0,
0, 0, 1);
}
float rotation = rotationValue;
if (u_vvRotationType == 1.0) {
rotation = 90.0 - rotation;
}
float angle = C_DEG_TO_RAD * -rotation;
float sinA = sin(angle);
float cosA = cos(angle);
return mat3(cosA, -sinA, 0,
sinA, cosA, 0,
0,    0,    1);
}
#endif
#ifdef VV_COLOR
const int VV_COLOR_N = 8;
vec4 getVVColor(float colorValue, vec4 fallback, float isColorLocked) {
if (isNan(colorValue) || isColorLocked == 1.0) {
return fallback;
}
if (colorValue <= u_vvColorValues[0]) {
return u_vvColors[0];
}
for (int i = 1; i < VV_COLOR_N; ++i) {
if (u_vvColorValues[i] >= colorValue) {
float f = (colorValue - u_vvColorValues[i-1]) / (u_vvColorValues[i] - u_vvColorValues[i-1]);
return mix(u_vvColors[i-1], u_vvColors[i], f);
}
}
return u_vvColors[VV_COLOR_N - 1];
}
#endif
float getVVSize(in float size, in float vvSize)  {
#ifdef VV_SIZE_MIN_MAX_VALUE
return getVVMinMaxSize(vvSize, size);
#elif defined(VV_SIZE_SCALE_STOPS)
return u_vvSizeScaleStopsValue;
#elif defined(VV_SIZE_FIELD_STOPS)
float outSize = getVVStopsSize(vvSize, size);
return isNan(outSize) ? size : outSize;
#elif defined(VV_SIZE_UNIT_VALUE)
return getVVUnitValue(vvSize, size);
#else
return size;
#endif
}`},"post-processing":{blit:{"blit.frag":`precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_uv;
void main() {
gl_FragColor = texture2D(u_texture, v_uv);
}`},bloom:{composite:{"composite.frag":`precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_blurTexture1;
uniform sampler2D u_blurTexture2;
uniform sampler2D u_blurTexture3;
uniform sampler2D u_blurTexture4;
uniform sampler2D u_blurTexture5;
uniform float u_bloomStrength;
uniform float u_bloomRadius;
uniform float u_bloomFactors[NUMMIPS];
uniform vec3 u_bloomTintColors[NUMMIPS];
float lerpBloomFactor(const in float factor) {
float mirrorFactor = 1.2 - factor;
return mix(factor, mirrorFactor, u_bloomRadius);
}
void main() {
gl_FragColor = u_bloomStrength * (
lerpBloomFactor(u_bloomFactors[0]) * vec4(u_bloomTintColors[0], 1.0) * texture2D(u_blurTexture1, v_uv) +
lerpBloomFactor(u_bloomFactors[1]) * vec4(u_bloomTintColors[1], 1.0) * texture2D(u_blurTexture2, v_uv) +
lerpBloomFactor(u_bloomFactors[2]) * vec4(u_bloomTintColors[2], 1.0) * texture2D(u_blurTexture3, v_uv) +
lerpBloomFactor(u_bloomFactors[3]) * vec4(u_bloomTintColors[3], 1.0) * texture2D(u_blurTexture4, v_uv) +
lerpBloomFactor(u_bloomFactors[4]) * vec4(u_bloomTintColors[4], 1.0) * texture2D(u_blurTexture5, v_uv)
);
}`},gaussianBlur:{"gaussianBlur.frag":`precision mediump float;
uniform sampler2D u_colorTexture;
uniform vec2 u_texSize;
uniform vec2 u_direction;
varying vec2 v_uv;
#define KERNEL_RADIUS RADIUS
#define SIGMA RADIUS
float gaussianPdf(in float x, in float sigma) {
return 0.39894 * exp(-0.5 * x * x / ( sigma * sigma)) / sigma;
}
void main() {
vec2 invSize = 1.0 / u_texSize;
float fSigma = float(SIGMA);
float weightSum = gaussianPdf(0.0, fSigma);
vec4 pixelColorSum = texture2D(u_colorTexture, v_uv) * weightSum;
for (int i = 1; i < KERNEL_RADIUS; i ++) {
float x = float(i);
float w = gaussianPdf(x, fSigma);
vec2 uvOffset = u_direction * invSize * x;
vec4 sample1 = texture2D(u_colorTexture, v_uv + uvOffset);
vec4 sample2 = texture2D(u_colorTexture, v_uv - uvOffset);
pixelColorSum += (sample1 + sample2) * w;
weightSum += 2.0 * w;
}
gl_FragColor = pixelColorSum /weightSum;
}`},luminosityHighPass:{"luminosityHighPass.frag":`precision mediump float;
uniform sampler2D u_texture;
uniform vec3 u_defaultColor;
uniform float u_defaultOpacity;
uniform float u_luminosityThreshold;
uniform float u_smoothWidth;
varying vec2 v_uv;
void main() {
vec4 texel = texture2D(u_texture, v_uv);
vec3 luma = vec3(0.299, 0.587, 0.114);
float v = dot(texel.xyz, luma);
vec4 outputColor = vec4(u_defaultColor.rgb, u_defaultOpacity);
float alpha = smoothstep(u_luminosityThreshold, u_luminosityThreshold + u_smoothWidth, v);
gl_FragColor = mix(outputColor, texel, alpha);
}`}},blur:{gaussianBlur:{"gaussianBlur.frag":`precision mediump float;
uniform sampler2D u_colorTexture;
uniform vec2 u_texSize;
uniform vec2 u_direction;
uniform float u_sigma;
varying vec2 v_uv;
#define KERNEL_RADIUS RADIUS
float gaussianPdf(in float x, in float sigma) {
return 0.39894 * exp(-0.5 * x * x / ( sigma * sigma)) / sigma;
}
void main() {
vec2 invSize = 1.0 / u_texSize;
float fSigma = u_sigma;
float weightSum = gaussianPdf(0.0, fSigma);
vec4 pixelColorSum = texture2D(u_colorTexture, v_uv) * weightSum;
for (int i = 1; i < KERNEL_RADIUS; i ++) {
float x = float(i);
float w = gaussianPdf(x, fSigma);
vec2 uvOffset = u_direction * invSize * x;
vec4 sample1 = texture2D(u_colorTexture, v_uv + uvOffset);
vec4 sample2 = texture2D(u_colorTexture, v_uv - uvOffset);
pixelColorSum += (sample1 + sample2) * w;
weightSum += 2.0 * w;
}
gl_FragColor = pixelColorSum /weightSum;
}`},"radial-blur":{"radial-blur.frag":`precision mediump float;
uniform sampler2D u_colorTexture;
varying vec2 v_uv;
const float sampleDist = 1.0;
const float sampleStrength = 2.2;
void main(void) {
float samples[10];
samples[0] = -0.08;
samples[1] = -0.05;
samples[2] = -0.03;
samples[3] = -0.02;
samples[4] = -0.01;
samples[5] =  0.01;
samples[6] =  0.02;
samples[7] =  0.03;
samples[8] =  0.05;
samples[9] =  0.08;
vec2 dir = 0.5 - v_uv;
float dist = sqrt(dir.x * dir.x + dir.y * dir.y);
dir = dir / dist;
vec4 color = texture2D(u_colorTexture,v_uv);
vec4 sum = color;
for (int i = 0; i < 10; i++) {
sum += texture2D(u_colorTexture, v_uv + dir * samples[i] * sampleDist);
}
sum *= 1.0 / 11.0;
float t = dist * sampleStrength;
t = clamp(t, 0.0, 1.0);
gl_FragColor = mix(color, sum, t);
}`}},dra:{"dra.frag":`precision mediump float;
uniform sampler2D u_minColor;
uniform sampler2D u_maxColor;
uniform sampler2D u_texture;
varying vec2 v_uv;
void main() {
vec4 minColor = texture2D(u_minColor, vec2(0.5));
vec4 maxColor = texture2D(u_maxColor, vec2(0.5));
vec4 color = texture2D(u_texture, v_uv);
vec3 minColorUnpremultiply = minColor.rgb / minColor.a;
vec3 maxColorUnpremultiply = maxColor.rgb / maxColor.a;
vec3 colorUnpremultiply = color.rgb / color.a;
vec3 range = maxColorUnpremultiply - minColorUnpremultiply;
gl_FragColor = vec4(color.a * (colorUnpremultiply - minColorUnpremultiply) / range, color.a);
}`,"min-max":{"min-max.frag":`#extension GL_EXT_draw_buffers : require
precision mediump float;
#define CELL_SIZE 2
uniform sampler2D u_minTexture;
uniform sampler2D u_maxTexture;
uniform vec2 u_srcResolution;
uniform vec2 u_dstResolution;
varying vec2 v_uv;
void main() {
vec2 srcPixel = floor(gl_FragCoord.xy) * float(CELL_SIZE);
vec2 onePixel = vec2(1.0) / u_srcResolution;
vec2 uv = (srcPixel + 0.5) / u_srcResolution;
vec4 minColor = vec4(1.0);
vec4 maxColor = vec4(0.0);
for (int y = 0; y < CELL_SIZE; ++y) {
for (int x = 0; x < CELL_SIZE; ++x) {
vec2 offset = uv + vec2(x, y) * onePixel;
minColor = min(minColor, texture2D(u_minTexture, offset));
maxColor = max(maxColor, texture2D(u_maxTexture, offset));
}
}
gl_FragData[0] = minColor;
gl_FragData[1] = maxColor;
}`}},"drop-shadow":{composite:{"composite.frag":`precision mediump float;
uniform sampler2D u_layerFBOTexture;
uniform sampler2D u_blurTexture;
uniform vec4 u_shadowColor;
uniform vec2 u_shadowOffset;
uniform highp mat3 u_displayViewMat3;
varying vec2 v_uv;
void main() {
vec3 offset = u_displayViewMat3 * vec3(u_shadowOffset, 0.0);
vec4 layerColor = texture2D(u_layerFBOTexture, v_uv);
vec4 blurColor = texture2D(u_blurTexture, v_uv - offset.xy / 2.0);
gl_FragColor = ((1.0 - layerColor.a) * blurColor.a * u_shadowColor + layerColor);
}`}},"edge-detect":{"frei-chen":{"frei-chen.frag":`precision mediump float;
uniform sampler2D u_colorTexture;
uniform vec2 u_texSize;
varying vec2 v_uv;
vec2 texel = vec2(1.0 / u_texSize.x, 1.0 / u_texSize.y);
mat3 G[9];
const mat3 g0 = mat3( 0.3535533845424652, 0, -0.3535533845424652, 0.5, 0, -0.5, 0.3535533845424652, 0, -0.3535533845424652 );
const mat3 g1 = mat3( 0.3535533845424652, 0.5, 0.3535533845424652, 0, 0, 0, -0.3535533845424652, -0.5, -0.3535533845424652 );
const mat3 g2 = mat3( 0, 0.3535533845424652, -0.5, -0.3535533845424652, 0, 0.3535533845424652, 0.5, -0.3535533845424652, 0 );
const mat3 g3 = mat3( 0.5, -0.3535533845424652, 0, -0.3535533845424652, 0, 0.3535533845424652, 0, 0.3535533845424652, -0.5 );
const mat3 g4 = mat3( 0, -0.5, 0, 0.5, 0, 0.5, 0, -0.5, 0 );
const mat3 g5 = mat3( -0.5, 0, 0.5, 0, 0, 0, 0.5, 0, -0.5 );
const mat3 g6 = mat3( 0.1666666716337204, -0.3333333432674408, 0.1666666716337204, -0.3333333432674408, 0.6666666865348816, -0.3333333432674408, 0.1666666716337204, -0.3333333432674408, 0.1666666716337204 );
const mat3 g7 = mat3( -0.3333333432674408, 0.1666666716337204, -0.3333333432674408, 0.1666666716337204, 0.6666666865348816, 0.1666666716337204, -0.3333333432674408, 0.1666666716337204, -0.3333333432674408 );
const mat3 g8 = mat3( 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408, 0.3333333432674408 );
void main() {
G[0] = g0,
G[1] = g1,
G[2] = g2,
G[3] = g3,
G[4] = g4,
G[5] = g5,
G[6] = g6,
G[7] = g7,
G[8] = g8;
mat3 I;
float cnv[9];
vec3 sample;
for (float i = 0.0; i < 3.0; i++) {
for (float j = 0.0; j < 3.0; j++) {
sample = texture2D(u_colorTexture, v_uv + texel * vec2(i - 1.0,j - 1.0)).rgb;
I[int(i)][int(j)] = length(sample);
}
}
for (int i = 0; i < 9; i++) {
float dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);
cnv[i] = dp3 * dp3;
}
float M = (cnv[0] + cnv[1]) + (cnv[2] + cnv[3]);
float S = (cnv[4] + cnv[5]) + (cnv[6] + cnv[7]) + (cnv[8] + M);
gl_FragColor = vec4(vec3(sqrt(M / S)), texture2D(u_colorTexture, v_uv).a);
}`},sobel:{"sobel.frag":`precision mediump float;
uniform sampler2D u_colorTexture;
varying vec2 v_uv;
uniform vec2 u_texSize;
vec2 texel = vec2(1.0 / u_texSize.x, 1.0 / u_texSize.y);
mat3 G[2];
const mat3 g0 = mat3( 1.0, 2.0, 1.0, 0.0, 0.0, 0.0, -1.0, -2.0, -1.0 );
const mat3 g1 = mat3( 1.0, 0.0, -1.0, 2.0, 0.0, -2.0, 1.0, 0.0, -1.0 );
void main() {
mat3 I;
float cnv[2];
vec3 sample;
G[0] = g0;
G[1] = g1;
for (float i = 0.0; i < 3.0; i++) {
for (float j = 0.0; j < 3.0; j++) {
sample = texture2D( u_colorTexture, v_uv + texel * vec2(i-1.0,j-1.0) ).rgb;
I[int(i)][int(j)] = length(sample);
}
}
for (int i = 0; i < 2; i++) {
float dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);
cnv[i] = dp3 * dp3;
}
gl_FragColor = vec4(vec3(0.5 * sqrt(cnv[0] * cnv[0] + cnv[1] * cnv[1])), texture2D(u_colorTexture, v_uv).a);
}`}},"edge-enhance":{"edge-enhance.frag":`precision mediump float;
uniform sampler2D u_colorTexture;
varying vec2 v_uv;
uniform vec2 u_texSize;
vec2 texel = vec2(1.0 / u_texSize.x, 1.0 / u_texSize.y);
mat3 G[2];
const mat3 g0 = mat3( 1.0, 0.0, -1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0 );
const mat3 g1 = mat3( 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, -1.0, -1.0, -1.0 );
void main() {
mat3 I;
float cnv[2];
vec3 sample;
G[0] = g0;
G[1] = g1;
for (float i = 0.0; i < 3.0; i++) {
for (float j = 0.0; j < 3.0; j++) {
sample = texture2D( u_colorTexture, v_uv + texel * vec2(i-1.0,j-1.0) ).rgb;
I[int(i)][int(j)] = length(sample);
}
}
for (int i = 0; i < 2; i++) {
float dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);
cnv[i] = dp3 * dp3;
}
vec4 color = texture2D(u_colorTexture, v_uv);
gl_FragColor = vec4(0.5 * sqrt(cnv[0] * cnv[0] + cnv[1] * cnv[1]) * color);
}`},filterEffect:{"filterEffect.frag":`precision mediump float;
uniform sampler2D u_colorTexture;
uniform mat4 u_coefficients;
varying vec2 v_uv;
void main() {
vec4 color = texture2D(u_colorTexture, v_uv);
vec4 rgbw = u_coefficients * vec4(color.a > 0.0 ? color.rgb / color.a : vec3(0.0), 1.0);
float a = color.a;
gl_FragColor = vec4(a * rgbw.rgb, a);
}`},pp:{"pp.vert":`precision mediump float;
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
gl_Position = vec4(a_position, 0.0, 1.0);
v_uv = (a_position + 1.0) / 2.0;
}`}},raster:{bitmap:{"bitmap.frag":`precision mediump float;
varying highp vec2 v_texcoord;
uniform sampler2D u_texture;
uniform highp vec2 u_coordScale;
uniform lowp float u_opacity;
#include <filtering/bicubic.glsl>
void main() {
#ifdef BICUBIC
vec4 color = sampleBicubicBSpline(u_texture, v_texcoord, u_coordScale);
#else
vec4 color = texture2D(u_texture, v_texcoord);
#endif
float alpha = u_opacity * color.a;
gl_FragColor = vec4(alpha * color.rgb, alpha);
}`,"bitmap.vert":`precision mediump float;
attribute vec2 a_pos;
uniform highp mat3 u_dvsMat3;
uniform highp vec2 u_coordScale;
varying highp vec2 v_texcoord;
void main()
{
v_texcoord = a_pos;
gl_Position = vec4(u_dvsMat3 * vec3(a_pos * u_coordScale, 1.0), 1.0);
}`},common:{"common.glsl":`uniform sampler2D u_image;
uniform int u_bandCount;
uniform bool u_isFloatTexture;
uniform bool u_flipY;
uniform float u_opacity;
uniform int u_resampling;
uniform vec2 u_srcImageSize;
#ifdef APPLY_PROJECTION
#include <raster/common/projection.glsl>
#endif
#ifdef BICUBIC
#include <filtering/bicubic.glsl>
#endif
#ifdef BILINEAR
#include <filtering/bilinear.glsl>
#endif
vec2 getPixelLocation(vec2 coords) {
vec2 targetLocation = u_flipY ? vec2(coords.s, 1.0 - coords.t) : coords;
#ifdef APPLY_PROJECTION
targetLocation = projectPixelLocation(targetLocation);
#endif
return targetLocation;
}
bool isOutside(vec2 coords){
if (coords.t>1.00001 ||coords.t<-0.00001 || coords.s>1.00001 ||coords.s<-0.00001) {
return true;
} else {
return false;
}
}
vec4 getPixel(vec2 pixelLocation) {
#ifdef BICUBIC
vec4 color = sampleBicubicBSpline(u_image, pixelLocation, u_srcImageSize);
#elif defined(BILINEAR)
vec4 color = sampleBilinear(u_image, pixelLocation, u_srcImageSize);
#else
vec4 color = texture2D(u_image, pixelLocation);
#endif
return color;
}`,"contrastBrightness.glsl":`uniform float u_contrastOffset;
uniform float u_brightnessOffset;
vec4 adjustContrastBrightness(vec4 currentPixel, bool isFloat) {
vec4 pixelValue = isFloat ? currentPixel * 255.0 : currentPixel;
float maxI = 255.0;
float mid = 128.0;
float c = u_contrastOffset;
float b = u_brightnessOffset;
vec4 v;
if (c > 0.0 && c < 100.0) {
v = (200.0 * pixelValue - 100.0 * maxI + 2.0 * maxI * b) / (2.0 * (100.0 - c)) + mid;
} else if (c <= 0.0 && c > -100.0) {
v = (200.0 * pixelValue - 100.0 * maxI + 2.0 * maxI * b) * (100.0 + c) / 20000.0 + mid;
} else if (c == 100.0) {
v = (200.0 * pixelValue - 100.0 * maxI + (maxI + 1.0) * (100.0 - c) + 2.0 * maxI * b);
v = (sign(v) + 1.0) / 2.0;
} else if (c == -100.0) {
v = vec4(mid, mid, mid, currentPixel.a);
}
return vec4(v.r / 255.0, v.g / 255.0, v.b / 255.0, currentPixel.a);
}`,"projection.glsl":`uniform sampler2D u_transformGrid;
uniform vec2 u_transformSpacing;
uniform vec2 u_transformGridSize;
uniform vec2 u_targetImageSize;
vec2 projectPixelLocation(vec2 coords) {
#ifdef LOOKUP_PROJECTION
vec4 pv = texture2D(u_transformGrid, coords);
return vec2(pv.r, pv.g);
#endif
vec2 index_image = floor(coords * u_targetImageSize);
vec2 oneTransformPixel = vec2(0.25 / u_transformGridSize.s, 1.0 / u_transformGridSize.t);
vec2 index_transform = floor(index_image / u_transformSpacing) / u_transformGridSize;
vec2 pos = fract((index_image + vec2(0.5, 0.5)) / u_transformSpacing);
vec2 srcLocation;
vec2 transform_location = index_transform + oneTransformPixel * 0.5;
if (pos.s <= pos.t) {
vec4 ll_abc = texture2D(u_transformGrid, vec2(transform_location.s, transform_location.t));
vec4 ll_def = texture2D(u_transformGrid, vec2(transform_location.s + oneTransformPixel.s, transform_location.t));
srcLocation.s = dot(ll_abc.rgb, vec3(pos, 1.0));
srcLocation.t = dot(ll_def.rgb, vec3(pos, 1.0));
} else {
vec4 ur_abc = texture2D(u_transformGrid, vec2(transform_location.s + 2.0 * oneTransformPixel.s, transform_location.t));
vec4 ur_def = texture2D(u_transformGrid, vec2(transform_location.s + 3.0 * oneTransformPixel.s, transform_location.t));
srcLocation.s = dot(ur_abc.rgb, vec3(pos, 1.0));
srcLocation.t = dot(ur_def.rgb, vec3(pos, 1.0));
}
return srcLocation;
}`},flow:{"flow.frag":`precision highp float;
varying float v_side;
varying float v_time;
varying float v_totalTime;
varying float v_timeSeed;
varying vec4 v_lineColor;
varying float v_lineRenderWidth;
uniform float u_time;
uniform float u_fadeDuration;
uniform float u_lineSpeed;
void main(void) {
vec4 color = v_lineColor;
float edgeWidth = min(2.0 * v_lineRenderWidth - 1.0, 1.0);
float edgeStart = (v_lineRenderWidth - edgeWidth) / v_lineRenderWidth;
if (edgeStart < 0.95) {
float s = step(edgeStart, abs(v_side));
color.a *= (1.0 - s) + s * (1.0 - (abs(v_side) - edgeStart) / (1.0 - edgeStart));
}
float t = mod(v_timeSeed * (v_totalTime + u_fadeDuration) + u_time * u_lineSpeed, v_totalTime + u_fadeDuration) - v_time;
color.a *= step(0.0, t) * exp(-2.3 * t / u_fadeDuration);
color.rgb *= color.a;
gl_FragColor = color;
}`,"flow.vert":`precision highp float;
attribute vec3 a_positionAndSide;
attribute vec3 a_timeInfo;
attribute vec2 a_extrude;
attribute float a_speed;
uniform mat3 u_dvsMat3;
uniform mat3 u_displayViewMat3;
varying float v_side;
varying float v_time;
varying float v_totalTime;
varying float v_timeSeed;
varying vec4 v_lineColor;
varying float v_lineRenderWidth;
#define MAX_STOPS 8
#ifdef VV_LINE_COLOR
uniform float u_lineColor_stops[MAX_STOPS];
uniform vec4 u_lineColor_values[MAX_STOPS];
uniform int u_lineColor_count;
#else
uniform vec4 u_lineColor;
#endif
#ifdef VV_LINE_OPACITY
uniform float u_lineOpacity_stops[MAX_STOPS];
uniform float u_lineOpacity_values[MAX_STOPS];
uniform int u_lineOpacity_count;
#else
uniform float u_lineOpacity;
#endif
#ifdef VV_LINE_RENDER_WIDTH
uniform float u_lineRenderWidth_stops[MAX_STOPS];
uniform float u_lineRenderWidth_values[MAX_STOPS];
uniform int u_lineRenderWidth_count;
#else
uniform float u_lineRenderWidth;
#endif
void main(void) {
float x = a_speed;
#ifdef VV_LINE_COLOR
vec4 lineColor = u_lineColor_values[0];
{
for (int i = 1; i < MAX_STOPS; i++) {
if (i >= u_lineColor_count) {
break;
}
float x1 = u_lineColor_stops[i - 1];
if (x < x1) {
break;
}
float x2 = u_lineColor_stops[i];
vec4 y2 = u_lineColor_values[i];
if (x < x2) {
vec4 y1 = u_lineColor_values[i - 1];
lineColor = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
} else {
lineColor = y2;
}
}
}
#else
vec4 lineColor = u_lineColor;
#endif
#ifdef VV_LINE_OPACITY
float lineOpacity = u_lineOpacity_values[0];
{
for (int i = 1; i < MAX_STOPS; i++) {
if (i >= u_lineOpacity_count) {
break;
}
float x1 = u_lineOpacity_stops[i - 1];
if (x < x1) {
break;
}
float x2 = u_lineOpacity_stops[i];
float y2 = u_lineOpacity_values[i];
if (x < x2) {
float y1 = u_lineOpacity_values[i - 1];
lineOpacity = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
} else {
lineOpacity = y2;
}
}
}
#else
float lineOpacity = u_lineOpacity;
#endif
#ifdef VV_LINE_RENDER_WIDTH
float lineRenderWidth = u_lineRenderWidth_values[0];
{
for (int i = 1; i < MAX_STOPS; i++) {
if (i >= u_lineRenderWidth_count) {
break;
}
float x1 = u_lineRenderWidth_stops[i - 1];
if (x < x1) {
break;
}
float x2 = u_lineRenderWidth_stops[i];
float y2 = u_lineRenderWidth_values[i];
if (x < x2) {
float y1 = u_lineRenderWidth_values[i - 1];
lineRenderWidth = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
} else {
lineRenderWidth = y2;
}
}
}
#else
float lineRenderWidth = u_lineRenderWidth;
#endif
vec2 position = a_positionAndSide.xy;
float side = a_positionAndSide.z;
vec2 xy = (u_dvsMat3 * vec3(position, 1.0) + u_displayViewMat3 * vec3(a_extrude * lineRenderWidth, 0.0)).xy;
gl_Position = vec4(xy, 0.0, 1.0);
v_side = side;
v_time = a_timeInfo.x;
v_totalTime = a_timeInfo.y;
v_timeSeed = a_timeInfo.z;
v_lineColor = vec4(lineColor.rgb, lineColor.a * lineOpacity);
v_lineRenderWidth = lineRenderWidth;
}`},hillshade:{"hillshade.frag":`precision mediump float;
varying highp vec2 v_texcoord;
#include <raster/common/common.glsl>
uniform int u_hillshadeType;
uniform float u_sinZcosAs[6];
uniform float u_sinZsinAs[6];
uniform float u_cosZs[6];
uniform float u_weights[6];
uniform vec2 u_factor;
uniform float u_minValue;
uniform float u_maxValue;
#include <raster/lut/colorize.glsl>
float getNeighborHoodAlpha(float a, float b, float c, float d, float e, float f, float g, float h, float i){
if (a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0) {
return 0.0;
}
else {
return e;
}
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
vec4 overlay(float val, float minValue, float maxValue, float hillshade) {
val = clamp((val - minValue) / (maxValue - minValue), 0.0, 1.0);
vec4 rgb = colorize(vec4(val, val, val, 1.0), 255.0);
vec3 hsv = rgb2hsv(rgb.xyz);
hsv.z = hillshade;
return vec4(hsv2rgb(hsv), 1.0) * rgb.a;
}
void main() {
vec2 pixelLocation = getPixelLocation(v_texcoord);
if (isOutside(pixelLocation)) {
gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
return;
}
vec4 currentPixel = getPixel(pixelLocation);
if (currentPixel.a == 0.0) {
gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
return;
}
vec2 axy = vec2(-1.0, -1.0);
vec2 bxy = vec2(0.0, -1.0);
vec2 cxy = vec2(1.0, -1.0);
vec2 dxy = vec2(-1.0, 0.0);
vec2 fxy = vec2(1.0, 0.0);
vec2 gxy = vec2(-1.0, 1.0);
vec2 hxy = vec2(0.0, 1.0);
vec2 ixy = vec2(1.0, 1.0);
vec2 onePixel = 1.0 / u_srcImageSize;
if (pixelLocation.s < onePixel.s) {
axy[0] = 1.0;
dxy[0] = 1.0;
gxy[0] = 1.0;
}
if (pixelLocation.t < onePixel.t) {
axy[1] = 1.0;
bxy[1] = 1.0;
cxy[1] = 1.0;
}
if (pixelLocation.s > 1.0 - onePixel.s) {
cxy[0] = -1.0;
fxy[0] = -1.0;
ixy[0] = -1.0;
}
if (pixelLocation.t > 1.0 - onePixel.t) {
gxy[1] = -1.0;
hxy[1] = -1.0;
ixy[1] = -1.0;
}
vec4 va = texture2D(u_image, pixelLocation + onePixel * axy);
vec4 vb = texture2D(u_image, pixelLocation + onePixel * bxy);
vec4 vc = texture2D(u_image, pixelLocation + onePixel * cxy);
vec4 vd = texture2D(u_image, pixelLocation + onePixel * dxy);
vec4 ve = texture2D(u_image, pixelLocation);
vec4 vf = texture2D(u_image, pixelLocation + onePixel * fxy);
vec4 vg = texture2D(u_image, pixelLocation + onePixel * gxy);
vec4 vh = texture2D(u_image, pixelLocation + onePixel * hxy);
vec4 vi = texture2D(u_image, pixelLocation + onePixel * ixy);
float dzx = (vc + 2.0 * vf + vi - va - 2.0 * vd - vg).r * u_factor.s;
float dzy = (vg + 2.0 * vh + vi - va - 2.0 * vb - vc).r * u_factor.t;
float dzd = sqrt(1.0 + dzx * dzx + dzy * dzy);
float hillshade = 0.0;
if (u_hillshadeType == 0){
float cosDelta = u_sinZsinAs[0] * dzy - u_sinZcosAs[0] * dzx;
float z = (u_cosZs[0] + cosDelta) / dzd;
if (z < 0.0)  z = 0.0;
hillshade = z;
} else {
for (int k = 0; k < 6; k++) {
float cosDelta = u_sinZsinAs[k] * dzy - u_sinZcosAs[k] * dzx;
float z = (u_cosZs[k] + cosDelta) / dzd;
if (z < 0.0) z = 0.0;
hillshade = hillshade + z * u_weights[k];
if (k == 5) break;
}
}
float alpha = getNeighborHoodAlpha(va.a, vb.a, vc.a, vd.a, ve.a, vf.a, vg.a, vh.a, vi.a);
#ifdef APPLY_COLORMAP
gl_FragColor = overlay(ve.r, u_minValue, u_maxValue, hillshade) * alpha * u_opacity;
#else
gl_FragColor = vec4(hillshade, hillshade, hillshade, 1.0) * alpha * u_opacity;
#endif
}`,"hillshade.vert":`precision mediump float;
attribute vec2 a_pos;
uniform highp mat3 u_dvsMat3;
uniform highp vec2 u_coordScale;
varying highp vec2 v_texcoord;
void main()
{
v_texcoord = a_pos;
gl_Position = vec4(u_dvsMat3 * vec3(a_pos * u_coordScale, 1.0), 1.0);
}`},lut:{"colorize.glsl":`uniform sampler2D u_colormap;
uniform float u_colormapOffset;
uniform float u_colormapMaxIndex;
vec4 colorize(vec4 currentPixel, float scaleFactor) {
float clrIndex = clamp(currentPixel.r * scaleFactor - u_colormapOffset, 0.0, u_colormapMaxIndex);
vec2 clrPosition = vec2((clrIndex + 0.5) / (u_colormapMaxIndex + 1.0), 0.0);
vec4 color = texture2D(u_colormap, clrPosition);
vec4 result = vec4(color.rgb, color.a * currentPixel.a);
return result;
}`,"lut.frag":`precision mediump float;
varying highp vec2 v_texcoord;
#include <raster/common/common.glsl>
#include <raster/lut/colorize.glsl>
void main() {
vec2 pixelLocation = getPixelLocation(v_texcoord);
if (isOutside(pixelLocation)) {
gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
return;
}
vec4 currentPixel = getPixel(pixelLocation);
vec4 result = colorize(currentPixel, 1.0);
gl_FragColor = vec4(result.xyz, 1.0) * result.a * u_opacity;
}`,"lut.vert":`precision mediump float;
attribute vec2 a_pos;
uniform highp mat3 u_dvsMat3;
uniform highp vec2 u_coordScale;
uniform highp float u_scale;
uniform highp vec2 u_offset;
varying highp vec2 v_texcoord;
void main()
{
v_texcoord = a_pos * u_scale + u_offset;
gl_Position = vec4(u_dvsMat3 * vec3(a_pos * u_coordScale, 1.0), 1.0);
}`},magdir:{"magdir.frag":`precision mediump float;
varying vec4 v_color;
uniform lowp float u_opacity;
void main() {
gl_FragColor = v_color * u_opacity;
}`,"magdir.vert":`precision mediump float;
attribute vec2 a_pos;
attribute vec2 a_offset;
attribute vec2 a_vv;
uniform highp mat3 u_dvsMat3;
uniform highp vec2 u_coordScale;
uniform vec2 u_symbolSize;
uniform vec2 u_symbolPercentRange;
uniform vec2 u_dataRange;
uniform float u_rotation;
uniform vec4 u_colors[12];
varying vec4 v_color;
void main()
{
float angle = a_offset.y + u_rotation;
#ifndef ROTATION_GEOGRAPHIC
angle = 3.14159265359 * 2.0 - angle - 3.14159265359 / 2.0;
#endif
vec2 offset = vec2(cos(angle), sin(angle)) * a_offset.x;
#ifdef DATA_RANGE
float valuePercentage = clamp((a_vv.y - u_dataRange.x) / (u_dataRange.y - u_dataRange.x), 0.0, 1.0);
float sizeRatio = u_symbolPercentRange.x + valuePercentage * (u_symbolPercentRange.y - u_symbolPercentRange.x);
float sizePercentage = clamp(sizeRatio, u_symbolPercentRange.x, u_symbolPercentRange.y);
#else
float sizePercentage = (u_symbolPercentRange.x + u_symbolPercentRange.y) / 2.0;
#endif
vec2 pos = a_pos + offset * sizePercentage * u_symbolSize;
v_color = u_colors[int(a_vv.x)];
gl_Position = vec4(u_dvsMat3 * vec3(pos * u_coordScale, 1.0), 1.0);
}`},reproject:{"reproject.frag":`precision mediump float;
varying vec2 v_texcoord;
#include <raster/common/common.glsl>
void main() {
vec2 pixelLocation = getPixelLocation(v_texcoord);
if (isOutside(pixelLocation)) {
gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
return;
}
vec4 currentPixel = getPixel(pixelLocation);
gl_FragColor = vec4(currentPixel.rgb, 1.0) * currentPixel.a * u_opacity;
}`,"reproject.vert":`precision mediump float;
attribute vec2 a_position;
varying highp vec2 v_texcoord;
void main()
{
v_texcoord = a_position;
gl_Position = vec4(2.0 * (a_position - 0.5), 0.0, 1.0);
}`},scalar:{"scalar.frag":`precision mediump float;
uniform lowp float u_opacity;
varying vec2 v_pos;
const vec4 outlineColor = vec4(0.2, 0.2, 0.2, 1.0);
const float outlineSize = 0.02;
const float innerRadius = 0.25;
const float outerRadius = 0.42;
const float innerSquareLength = 0.15;
void main() {
mediump float dist = length(v_pos);
mediump float fillalpha1 = smoothstep(outerRadius, outerRadius + outlineSize, dist);
fillalpha1 *= (1.0-smoothstep(outerRadius + outlineSize, outerRadius + 0.1 + outlineSize, dist));
#ifdef INNER_CIRCLE
mediump float fillalpha2 = smoothstep(innerRadius, innerRadius + outlineSize, dist);
fillalpha2 *= (1.0-smoothstep(innerRadius + outlineSize, innerRadius + 0.1 + outlineSize, dist));
#else
mediump float fillalpha2 = (abs(v_pos.x) < innerSquareLength ? 1.0 : 0.0) * (abs(v_pos.y) < innerSquareLength ? 1.0 : 0.0);
#endif
gl_FragColor = (fillalpha2 + fillalpha1) * outlineColor * u_opacity;
}`,"scalar.vert":`precision mediump float;
attribute vec2 a_pos;
attribute vec2 a_offset;
attribute vec2 a_vv;
uniform highp mat3 u_dvsMat3;
uniform highp vec2 u_coordScale;
uniform vec2 u_symbolSize;
uniform vec2 u_symbolPercentRange;
uniform vec2 u_dataRange;
varying vec2 v_pos;
void main()
{
#ifdef DATA_RANGE
float valuePercentage = clamp((a_vv.y - u_dataRange.x) / (u_dataRange.y - u_dataRange.x), 0.0, 1.0);
float sizeRatio = u_symbolPercentRange.x + valuePercentage * (u_symbolPercentRange.y - u_symbolPercentRange.x);
float sizePercentage = clamp(sizeRatio, u_symbolPercentRange.x, u_symbolPercentRange.y);
#else
float sizePercentage = (u_symbolPercentRange.x + u_symbolPercentRange.y) / 2.0;
#endif
vec2 size = u_symbolSize * sizePercentage;
vec2 pos = a_pos + a_offset * size;
v_pos = a_offset;
gl_Position = vec4(u_dvsMat3 * vec3(pos * u_coordScale, 1.0), 1.0);
}`},stretch:{"stretch.frag":`precision mediump float;
varying highp vec2 v_texcoord;
#include <raster/common/common.glsl>
uniform float u_minCutOff[3];
uniform float u_maxCutOff[3];
uniform float u_minOutput;
uniform float u_maxOutput;
uniform float u_factor[3];
uniform bool u_useGamma;
uniform float u_gamma[3];
uniform float u_gammaCorrection[3];
#include <raster/lut/colorize.glsl>
float stretchOneValue(float val, float minCutOff, float maxCutOff, float minOutput, float maxOutput, float factor, bool useGamma, float gamma, float gammaCorrection) {
if (val >= maxCutOff) {
return maxOutput;
} else if (val <= minCutOff) {
return minOutput;
}
float stretchedVal;
if (useGamma) {
float tempf = 1.0;
float outRange = maxOutput - minOutput;
float relativeVal = (val - minCutOff) / (maxCutOff - minCutOff);
if (gamma > 1.0) {
tempf -= pow(1.0 / outRange, relativeVal * gammaCorrection);
}
stretchedVal = (tempf * outRange * pow(relativeVal, 1.0 / gamma) + minOutput) / 255.0;
} else {
stretchedVal = minOutput + (val - minCutOff) * factor;
}
return stretchedVal;
}
void main() {
vec2 pixelLocation = getPixelLocation(v_texcoord);
if (isOutside(pixelLocation)) {
gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
return;
}
vec4 currentPixel = getPixel(pixelLocation);
#ifdef NOOP
gl_FragColor = vec4(currentPixel.rgb, 1.0) * currentPixel.a * u_opacity;
return;
#endif
if (u_bandCount == 1) {
float grayVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
#ifdef APPLY_COLORMAP
vec4 result = colorize(vec4(grayVal, grayVal, grayVal, 1.0), u_useGamma ? 255.0 : 1.0);
gl_FragColor = vec4(result.xyz, 1.0) * result.a * currentPixel.a * u_opacity;
#else
gl_FragColor = vec4(grayVal, grayVal, grayVal, 1.0) * currentPixel.a * u_opacity;
#endif
} else {
float redVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
float greenVal = stretchOneValue(currentPixel.g, u_minCutOff[1], u_maxCutOff[1], u_minOutput, u_maxOutput, u_factor[1], u_useGamma, u_gamma[1], u_gammaCorrection[1]);
float blueVal = stretchOneValue(currentPixel.b, u_minCutOff[2], u_maxCutOff[2], u_minOutput, u_maxOutput, u_factor[2], u_useGamma, u_gamma[2], u_gammaCorrection[2]);
gl_FragColor = vec4(redVal, greenVal, blueVal, 1.0) * currentPixel.a * u_opacity;
}
}`,"stretch.vert":`precision mediump float;
attribute vec2 a_pos;
uniform highp mat3 u_dvsMat3;
uniform highp vec2 u_coordScale;
uniform highp float u_scale;
uniform highp vec2 u_offset;
varying highp vec2 v_texcoord;
void main()
{
v_texcoord = a_pos * u_scale + u_offset;
gl_Position = vec4(u_dvsMat3 * vec3(a_pos * u_coordScale, 1.0), 1.0);
}`}},stencil:{"stencil.frag":`void main() {
gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}`,"stencil.vert":`attribute vec2 a_pos;
void main() {
gl_Position = vec4(a_pos, 0.0, 1.0);
}`},tileInfo:{"tileInfo.frag":`uniform mediump sampler2D u_texture;
varying mediump vec2 v_tex;
void main(void) {
lowp vec4 color = texture2D(u_texture, v_tex);
gl_FragColor = 0.75 * color;
}`,"tileInfo.vert":`attribute vec2 a_pos;
uniform highp mat3 u_dvsMat3;
uniform mediump float u_depth;
uniform mediump vec2 u_coord_ratio;
uniform mediump vec2 u_delta;
uniform mediump vec2 u_dimensions;
varying mediump vec2 v_tex;
void main() {
mediump vec2 offset = u_coord_ratio * vec2(u_delta + a_pos * u_dimensions);
vec3 v_pos = u_dvsMat3 * vec3(offset, 1.0);
gl_Position = vec4(v_pos.xy, 0.0, 1.0);
v_tex = a_pos;
}`},util:{"encoding.glsl":`const vec4 rgba2float_factors = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, rgba2float_factors);
}`}};class Ge{constructor(e){this.readFile=e}resolveIncludes(e){return this._resolve(e)}_resolve(e,n=new Map){if(n.has(e))return n.get(e);const t=this._read(e);if(!t)throw new Error(`cannot find shader file ${e}`);const i=/^[^\S\n]*#include\s+<(\S+)>[^\S\n]?/gm;let o=i.exec(t);const a=[];for(;o!=null;)a.push({path:o[1],start:o.index,length:o[0].length}),o=i.exec(t);let r=0,l="";return a.forEach(c=>{l+=t.slice(r,c.start),l+=n.has(c.path)?"":this._resolve(c.path,n),r=c.start+c.length}),l+=t.slice(r),n.set(e,l),l}_read(e){return this.readFile(e)}}function $t(s){let e=Bt;return s.split("/").forEach(n=>{e&&(e=e[n])}),e}const qt=new Ge($t);function re(s){return qt.resolveIncludes(s)}re("background/background.vert"),re("background/background.frag");re("tileInfo/tileInfo.vert"),re("tileInfo/tileInfo.frag");class Zt extends te{constructor(){super(...arguments),this._color=dt(1,0,0,1),this._patternMatrix=_t(),this._programOptions={id:!1,pattern:!1}}dispose(){this._vao&&(this._vao.dispose(),this._vao=null)}drawMany(e,n){const{context:t,painter:i,styleLayerUID:o}=e;this._loadWGLResources(e);const a=e.displayLevel,r=e.styleLayer,l=r.backgroundMaterial,c=i.vectorTilesMaterialManager,f=r.getPaintValue("background-color",a),d=r.getPaintValue("background-opacity",a),_=r.getPaintValue("background-pattern",a),u=_!==void 0,v=f[3]*d,h=1|window.devicePixelRatio,b=e.spriteMosaic;let x,C;const y=h>He?2:1,T=e.drawPhase===H.HITTEST,g=this._programOptions;g.id=T,g.pattern=u;const m=c.getMaterialProgram(t,l,g);if(t.bindVAO(this._vao),t.useProgram(m),u){const p=b.getMosaicItemPosition(_,!0);if(L(p)){const{tl:I,br:S,page:D}=p;x=S[0]-I[0],C=S[1]-I[1];const P=b.getPageSize(D);L(P)&&(b.bind(t,V.LINEAR,D,M),m.setUniform4f("u_tlbr",I[0],I[1],S[0],S[1]),m.setUniform2fv("u_mosaicSize",P),m.setUniform1i("u_texture",M))}m.setUniform1f("u_opacity",d)}else this._color[0]=v*f[0],this._color[1]=v*f[1],this._color[2]=v*f[2],this._color[3]=v,m.setUniform4fv("u_color",this._color);if(m.setUniform1f("u_depth",r.z||0),T){const p=ee(o+1);m.setUniform4fv("u_id",p)}for(const p of n){if(m.setUniform1f("u_coord_range",p.rangeX),m.setUniformMatrix3fv("u_dvsMat3",p.transforms.dvs),u){const I=Math.max(2**(Math.round(a)-p.key.level),1),S=y*p.width*I,D=S/ge(x),P=S/ge(C);this._patternMatrix[0]=D,this._patternMatrix[4]=P,m.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix)}t.setStencilFunction(G.EQUAL,p.stencilRef,255),t.drawArrays(U.TRIANGLE_STRIP,0,4)}}_loadWGLResources(e){if(this._vao)return;const{context:n,styleLayer:t}=e,i=t.backgroundMaterial,o=new Int8Array([0,0,1,0,0,1,1,1]),a=vt.createVertex(n,mt.STATIC_DRAW,o),r=new pt(n,i.getAttributeLocations(),i.getLayoutInfo(),{geometry:a});this._vao=r}}class Yt extends te{constructor(){super(...arguments),this._programOptions={id:!1}}dispose(){}drawMany(e,n){const{context:t,displayLevel:i,requiredLevel:o,state:a,drawPhase:r,painter:l,spriteMosaic:c,styleLayerUID:f}=e;if(!n.some(g=>{var m,p;return(m=(p=g.layerData.get(f))==null?void 0:p.circleIndexCount)!=null&&m}))return;const d=e.styleLayer,_=d.circleMaterial,u=l.vectorTilesMaterialManager,v=1.2,h=d.getPaintValue("circle-translate",i),b=d.getPaintValue("circle-translate-anchor",i),x=r===H.HITTEST,C=this._programOptions;C.id=x;const y=u.getMaterialProgram(t,_,C);t.useProgram(y),y.setUniformMatrix3fv("u_displayMat3",b===q.VIEWPORT?a.displayMat3:a.displayViewMat3),y.setUniform2fv("u_circleTranslation",h),y.setUniform1f("u_depth",d.z),y.setUniform1f("u_antialiasingWidth",v);let T=-1;if(x){const g=ee(f+1);y.setUniform4fv("u_id",g)}for(const g of n){if(!g.layerData.has(f))continue;g.key.level!==T&&(T=g.key.level,_.setDataUniforms(y,i,d,T,c));const m=g.layerData.get(f);if(!m.circleIndexCount)continue;m.prepareForRendering(t);const p=m.circleVertexArrayObject;F(p)||(t.bindVAO(p),y.setUniformMatrix3fv("u_dvsMat3",g.transforms.dvs),o!==g.key.level?t.setStencilFunction(G.EQUAL,g.stencilRef,255):t.setStencilFunction(G.GREATER,255,255),t.drawElements(U.TRIANGLES,m.circleIndexCount,k.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*m.circleIndexStart),g.triangleCount+=m.circleIndexCount/3)}}}const De=1/65536;class Kt extends te{constructor(){super(...arguments),this._fillProgramOptions={id:!1,pattern:!1},this._outlineProgramOptions={id:!1}}dispose(){}drawMany(e,n){const{displayLevel:t,drawPhase:i,renderPass:o,spriteMosaic:a,styleLayerUID:r}=e;let l=!1;for(const g of n)if(g.layerData.has(r)){const m=g.layerData.get(r);if(m.fillIndexCount>0||m.outlineIndexCount>0){l=!0;break}}if(!l)return;const c=e.styleLayer,f=c.getPaintProperty("fill-pattern"),d=f!==void 0,_=d&&f.isDataDriven;let u;if(d&&!_){const g=f.getValue(t);u=a.getMosaicItemPosition(g,!0)}const v=!d&&c.getPaintValue("fill-antialias",t);let h=!0,b=1;if(!d){const g=c.getPaintProperty("fill-color"),m=c.getPaintProperty("fill-opacity");if(!(g!=null&&g.isDataDriven||m!=null&&m.isDataDriven)){const p=c.getPaintValue("fill-color",t);b=c.getPaintValue("fill-opacity",t)*p[3],b>=1&&(h=!1)}}if(h&&o==="opaque")return;let x;i===H.HITTEST&&(x=ee(r+1));const C=c.getPaintValue("fill-translate",t),y=c.getPaintValue("fill-translate-anchor",t);(h||o!=="translucent")&&this._drawFill(e,r,c,n,C,y,d,u,_,x);const T=!c.hasDataDrivenOutlineColor&&c.outlineUsesFillColor&&b<1;v&&o!=="opaque"&&!T&&this._drawOutline(e,r,c,n,C,y,x)}_drawFill(e,n,t,i,o,a,r,l,c,f){if(r&&!c&&F(l))return;const{context:d,displayLevel:_,state:u,drawPhase:v,painter:h,pixelRatio:b,spriteMosaic:x}=e,C=t.fillMaterial,y=h.vectorTilesMaterialManager,T=b>He?2:1,g=v===H.HITTEST,m=this._fillProgramOptions;m.id=g,m.pattern=r;const p=y.getMaterialProgram(d,C,m);if(d.useProgram(p),L(l)){const{page:S}=l,D=x.getPageSize(S);L(D)&&(x.bind(d,V.LINEAR,S,M),p.setUniform2fv("u_mosaicSize",D),p.setUniform1i("u_texture",M))}p.setUniformMatrix3fv("u_displayMat3",a===q.VIEWPORT?u.displayMat3:u.displayViewMat3),p.setUniform2fv("u_fillTranslation",o),p.setUniform1f("u_depth",t.z+De),g&&p.setUniform4fv("u_id",f);let I=-1;for(const S of i){if(!S.layerData.has(n))continue;S.key.level!==I&&(I=S.key.level,C.setDataUniforms(p,_,t,I,x));const D=S.layerData.get(n);if(!D.fillIndexCount)continue;D.prepareForRendering(d);const P=D.fillVertexArrayObject;if(!F(P)){if(d.bindVAO(P),p.setUniformMatrix3fv("u_dvsMat3",S.transforms.dvs),d.setStencilFunction(G.EQUAL,S.stencilRef,255),r){const E=Math.max(2**(Math.round(_)-S.key.level),1),w=S.rangeX/(T*S.width*E);p.setUniform1f("u_patternFactor",w)}if(c){const E=D.patternMap;if(!E)continue;for(const[w,B]of E){const $=x.getPageSize(w);L($)&&(x.bind(d,V.LINEAR,w,M),p.setUniform2fv("u_mosaicSize",$),p.setUniform1i("u_texture",M),d.drawElements(U.TRIANGLES,B[1],k.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*B[0]))}}else d.drawElements(U.TRIANGLES,D.fillIndexCount,k.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*D.fillIndexStart);S.triangleCount+=D.fillIndexCount/3}}}_drawOutline(e,n,t,i,o,a,r){const{context:l,displayLevel:c,state:f,drawPhase:d,painter:_,pixelRatio:u,spriteMosaic:v}=e,h=t.outlineMaterial,b=_.vectorTilesMaterialManager,x=.75/u,C=d===H.HITTEST,y=this._outlineProgramOptions;y.id=C;const T=b.getMaterialProgram(l,h,y);l.useProgram(T),T.setUniformMatrix3fv("u_displayMat3",a===q.VIEWPORT?f.displayMat3:f.displayViewMat3),T.setUniform2fv("u_fillTranslation",o),T.setUniform1f("u_depth",t.z+De),T.setUniform1f("u_outline_width",x),C&&T.setUniform4fv("u_id",r);let g=-1;for(const m of i){if(!m.layerData.has(n))continue;m.key.level!==g&&(g=m.key.level,h.setDataUniforms(T,c,t,g,v));const p=m.layerData.get(n);if(p.prepareForRendering(l),!p.outlineIndexCount)continue;const I=p.outlineVertexArrayObject;F(I)||(l.bindVAO(I),T.setUniformMatrix3fv("u_dvsMat3",m.transforms.dvs),l.setStencilFunction(G.EQUAL,m.stencilRef,255),l.drawElements(U.TRIANGLES,p.outlineIndexCount,k.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*p.outlineIndexStart),m.triangleCount+=p.outlineIndexCount/3)}}}class Xt extends te{constructor(){super(...arguments),this._programOptions={id:!1,pattern:!1,sdf:!1}}dispose(){}drawMany(e,n){const{context:t,displayLevel:i,state:o,drawPhase:a,painter:r,pixelRatio:l,spriteMosaic:c,styleLayerUID:f}=e;if(!n.some(P=>{var E,w;return(E=(w=P.layerData.get(f))==null?void 0:w.lineIndexCount)!=null&&E}))return;const d=e.styleLayer,_=d.lineMaterial,u=r.vectorTilesMaterialManager,v=d.getPaintValue("line-translate",i),h=d.getPaintValue("line-translate-anchor",i),b=d.getPaintProperty("line-pattern"),x=b!==void 0,C=x&&b.isDataDriven;let y,T;if(x&&!C){const P=b.getValue(i);y=c.getMosaicItemPosition(P)}let g=!1;if(!x){const P=d.getPaintProperty("line-dasharray");if(T=P!==void 0,g=T&&P.isDataDriven,T&&!g){const E=P.getValue(i),w=d.getDashKey(E,d.getLayoutValue("line-cap",i));y=c.getMosaicItemPosition(w)}}const m=1/l,p=a===H.HITTEST,I=this._programOptions;I.id=p,I.pattern=x,I.sdf=T;const S=u.getMaterialProgram(t,_,I);if(t.useProgram(S),S.setUniformMatrix3fv("u_displayViewMat3",o.displayViewMat3),S.setUniformMatrix3fv("u_displayMat3",h===q.VIEWPORT?o.displayMat3:o.displayViewMat3),S.setUniform2fv("u_lineTranslation",v),S.setUniform1f("u_depth",d.z),S.setUniform1f("u_antialiasing",m),p){const P=ee(f+1);S.setUniform4fv("u_id",P)}if(y&&L(y)){const{page:P}=y,E=c.getPageSize(P);L(E)&&(c.bind(t,V.LINEAR,P,M),S.setUniform2fv("u_mosaicSize",E),S.setUniform1i("u_texture",M))}let D=-1;for(const P of n){if(!P.layerData.has(f))continue;P.key.level!==D&&(D=P.key.level,_.setDataUniforms(S,i,d,D,c));const E=2**(i-D)/l;S.setUniform1f("u_zoomFactor",E);const w=P.layerData.get(f);if(!w.lineIndexCount)continue;w.prepareForRendering(t);const B=w.lineVertexArrayObject;if(!F(B)){if(t.bindVAO(B),S.setUniformMatrix3fv("u_dvsMat3",P.transforms.dvs),t.setStencilFunction(G.EQUAL,P.stencilRef,255),C||g){const $=w.patternMap;if(!$)continue;for(const[X,O]of $){const Y=c.getPageSize(X);L(Y)&&(c.bind(t,V.LINEAR,X,M),S.setUniform2fv("u_mosaicSize",Y),S.setUniform1i("u_texture",M),t.drawElements(U.TRIANGLES,O[1],k.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*O[0]))}}else t.drawElements(U.TRIANGLES,w.lineIndexCount,k.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*w.lineIndexStart);P.triangleCount+=w.lineIndexCount/3}}}}const jt=1/65536;class Jt extends te{constructor(){super(...arguments),this._iconProgramOptions={id:!1,sdf:!1},this._sdfProgramOptions={id:!1},this._spritesTextureSize=gt()}dispose(){}drawMany(e,n){const{drawPhase:t,styleLayerUID:i}=e,o=e.styleLayer;let a;t===H.HITTEST&&(a=ee(i+1)),this._drawIcons(e,o,n,a),this._drawText(e,o,n,a)}_drawIcons(e,n,t,i){const{context:o,displayLevel:a,drawPhase:r,painter:l,spriteMosaic:c,state:f,styleLayerUID:d}=e,_=n.iconMaterial,u=l.vectorTilesMaterialManager;let v,h=!1;for(const D of t)if(D.layerData.has(d)&&(v=D.layerData.get(d),v.iconPerPageElementsMap.size>0)){h=!0;break}if(!h)return;const b=n.getPaintValue("icon-translate",a),x=n.getPaintValue("icon-translate-anchor",a);let C=n.getLayoutValue("icon-rotation-alignment",a);C===R.AUTO&&(C=n.getLayoutValue("symbol-placement",a)===ue.POINT?R.VIEWPORT:R.MAP);const y=C===R.MAP,T=n.getLayoutValue("icon-keep-upright",a)&&y,g=v.isIconSDF,m=r===H.HITTEST,p=this._iconProgramOptions;p.id=m,p.sdf=g;const I=u.getMaterialProgram(o,_,p);o.useProgram(I),I.setUniformMatrix3fv("u_displayViewMat3",C===R.MAP?f.displayViewMat3:f.displayMat3),I.setUniformMatrix3fv("u_displayMat3",x===q.VIEWPORT?f.displayMat3:f.displayViewMat3),I.setUniform2fv("u_iconTranslation",b),I.setUniform1f("u_depth",n.z),I.setUniform1f("u_mapRotation",xe(f.rotation)),I.setUniform1f("u_keepUpright",T?1:0),I.setUniform1f("u_level",10*a),I.setUniform1i("u_texture",M),I.setUniform1f("u_fadeDuration",ce/1e3),m&&I.setUniform4fv("u_id",i);let S=-1;for(const D of t){if(!D.layerData.has(d)||(D.key.level!==S&&(S=D.key.level,_.setDataUniforms(I,a,n,S,c)),v=D.layerData.get(d),v.iconPerPageElementsMap.size===0))continue;v.prepareForRendering(o),v.updateOpacityInfo();const P=v.iconVertexArrayObject;if(!F(P)){o.bindVAO(P),I.setUniformMatrix3fv("u_dvsMat3",D.transforms.dvs),I.setUniform1f("u_time",(performance.now()-v.lastOpacityUpdate)/1e3);for(const[E,w]of v.iconPerPageElementsMap)this._renderIconRange(e,I,w,E,D)}}}_renderIconRange(e,n,t,i,o){const{context:a,spriteMosaic:r}=e;this._spritesTextureSize[0]=r.getWidth(i)/4,this._spritesTextureSize[1]=r.getHeight(i)/4,n.setUniform2fv("u_mosaicSize",this._spritesTextureSize),r.bind(a,V.LINEAR,i,M),a.setStencilTestEnabled(!0),a.setStencilFunction(G.GREATER,255,255),a.setStencilWriteMask(0),a.drawElements(U.TRIANGLES,t[1],k.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*t[0]),o.triangleCount+=t[1]/3}_drawText(e,n,t,i){const{context:o,displayLevel:a,drawPhase:r,glyphMosaic:l,painter:c,pixelRatio:f,spriteMosaic:d,state:_,styleLayerUID:u}=e,v=n.textMaterial,h=c.vectorTilesMaterialManager;let b,x=!1;for(const W of t)if(W.layerData.has(u)&&(b=W.layerData.get(u),b.glyphPerPageElementsMap.size>0)){x=!0;break}if(!x)return;const C=n.getPaintProperty("text-opacity");if(C&&!C.isDataDriven&&C.getValue(a)===0)return;const y=n.getPaintProperty("text-color"),T=!y||y.isDataDriven||y.getValue(a)[3]>0,g=n.getPaintProperty("text-halo-width"),m=n.getPaintProperty("text-halo-color"),p=(!g||g.isDataDriven||g.getValue(a)>0)&&(!m||m.isDataDriven||m.getValue(a)[3]>0);if(!T&&!p)return;const I=24/8;let S=n.getLayoutValue("text-rotation-alignment",a);S===R.AUTO&&(S=n.getLayoutValue("symbol-placement",a)===ue.POINT?R.VIEWPORT:R.MAP);const D=S===R.MAP,P=n.getLayoutValue("text-keep-upright",a)&&D,E=r===H.HITTEST,w=.8*I/f;this._glyphTextureSize||(this._glyphTextureSize=ht(l.width/4,l.height/4));const B=n.getPaintValue("text-translate",a),$=n.getPaintValue("text-translate-anchor",a),X=this._sdfProgramOptions;X.id=E;const O=h.getMaterialProgram(o,v,X);o.useProgram(O),O.setUniformMatrix3fv("u_displayViewMat3",S===R.MAP?_.displayViewMat3:_.displayMat3),O.setUniformMatrix3fv("u_displayMat3",$===q.VIEWPORT?_.displayMat3:_.displayViewMat3),O.setUniform2fv("u_textTranslation",B),O.setUniform1f("u_depth",n.z+jt),O.setUniform2fv("u_mosaicSize",this._glyphTextureSize),O.setUniform1f("u_mapRotation",xe(_.rotation)),O.setUniform1f("u_keepUpright",P?1:0),O.setUniform1f("u_level",10*a),O.setUniform1i("u_texture",be),O.setUniform1f("u_antialiasingWidth",w),O.setUniform1f("u_fadeDuration",ce/1e3),E&&O.setUniform4fv("u_id",i);let Y=-1;for(const W of t){if(!W.layerData.has(u)||(W.key.level!==Y&&(Y=W.key.level,v.setDataUniforms(O,a,n,Y,d)),b=W.layerData.get(u),b.glyphPerPageElementsMap.size===0))continue;b.prepareForRendering(o),b.updateOpacityInfo();const fe=b.textVertexArrayObject;if(F(fe))continue;o.bindVAO(fe),O.setUniformMatrix3fv("u_dvsMat3",W.transforms.dvs),o.setStencilTestEnabled(!0),o.setStencilFunction(G.GREATER,255,255),o.setStencilWriteMask(0);const Be=(performance.now()-b.lastOpacityUpdate)/1e3;O.setUniform1f("u_time",Be),b.glyphPerPageElementsMap.forEach(($e,qe)=>{this._renderGlyphRange(o,$e,qe,l,O,p,T,W)})}}_renderGlyphRange(e,n,t,i,o,a,r,l){i.bind(e,V.LINEAR,t,be),a&&(o.setUniform1f("u_halo",1),e.drawElements(U.TRIANGLES,n[1],k.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*n[0]),l.triangleCount+=n[1]/3),r&&(o.setUniform1f("u_halo",0),e.drawElements(U.TRIANGLES,n[1],k.UNSIGNED_INT,Uint32Array.BYTES_PER_ELEMENT*n[0]),l.triangleCount+=n[1]/3)}}const Qt={vtlBackground:Zt,vtlFill:Kt,vtlLine:Xt,vtlCircle:Yt,vtlSymbol:Jt},en={background:{"background.frag":`#ifdef PATTERN
uniform lowp float u_opacity;
uniform lowp sampler2D u_texture;
varying mediump vec4 v_tlbr;
varying mediump vec2 v_tileTextureCoord;
#else
uniform lowp vec4 u_color;
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
void main() {
#ifdef PATTERN
mediump vec2 normalizedTextureCoord = mod(v_tileTextureCoord, 1.0);
mediump vec2 samplePos = mix(v_tlbr.xy, v_tlbr.zw, normalizedTextureCoord);
lowp vec4 color = texture2D(u_texture, samplePos);
gl_FragColor = u_opacity * color;
#else
gl_FragColor = u_color;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"background.vert":`precision mediump float;
attribute vec2 a_pos;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform mediump float u_coord_range;
uniform mediump float u_depth;
#ifdef PATTERN
uniform mediump mat3 u_pattern_matrix;
varying mediump vec2 v_tileTextureCoord;
uniform mediump vec4 u_tlbr;
uniform mediump vec2 u_mosaicSize;
varying mediump vec4 v_tlbr;
#endif
void main() {
gl_Position = vec4((u_dvsMat3 * vec3(u_coord_range * a_pos, 1.0)).xy, u_depth, 1.0);
#ifdef PATTERN
v_tileTextureCoord = (u_pattern_matrix * vec3(a_pos, 1.0)).xy;
v_tlbr             = u_tlbr / u_mosaicSize.xyxy;
#endif
#ifdef ID
v_id = u_id / 255.0;
#endif
}`},circle:{"circle.frag":`precision lowp float;
varying lowp vec4 v_color;
varying lowp vec4 v_stroke_color;
varying mediump float v_blur;
varying mediump float v_stroke_width;
varying mediump float v_radius;
varying mediump vec2 v_offset;
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
mediump float dist = length(v_offset);
mediump float alpha = smoothstep(0.0, -v_blur, dist - 1.0);
lowp float color_mix_ratio = v_stroke_width < 0.01 ? 0.0 : smoothstep(-v_blur, 0.0, dist - v_radius / (v_radius + v_stroke_width));
gl_FragColor = alpha * mix(v_color, v_stroke_color, color_mix_ratio);
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"circle.vert":`precision mediump float;
attribute vec2 a_pos;
#pragma header
varying lowp vec4 v_color;
varying lowp vec4 v_stroke_color;
varying mediump float v_blur;
varying mediump float v_stroke_width;
varying mediump float v_radius;
varying mediump vec2 v_offset;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump vec2 u_circleTranslation;
uniform mediump float u_depth;
uniform mediump float u_antialiasingWidth;
void main()
{
#pragma main
v_color = color * opacity;
v_stroke_color = stroke_color * stroke_opacity;
v_stroke_width = stroke_width;
v_radius = radius;
v_blur = max(blur, u_antialiasingWidth / (radius + stroke_width));
mediump vec2 offset = vec2(mod(a_pos, 2.0) * 2.0 - 1.0);
v_offset = offset;
#ifdef ID
v_id = u_id / 255.0;
#endif
mediump vec3 pos = u_dvsMat3 * vec3(a_pos * 0.5, 1.0) + u_displayMat3 * vec3((v_radius + v_stroke_width) * offset + u_circleTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},fill:{"fill.frag":`precision lowp float;
#ifdef PATTERN
uniform lowp sampler2D u_texture;
varying mediump vec2 v_tileTextureCoord;
varying mediump vec4 v_tlbr;
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
vec4 mixColors(vec4 color1, vec4 color2) {
float compositeAlpha = color2.a + color1.a * (1.0 - color2.a);
vec3 compositeColor = color2.rgb + color1.rgb * (1.0 - color2.a);
return vec4(compositeColor, compositeAlpha);
}
void main()
{
#ifdef PATTERN
mediump vec2 normalizedTextureCoord = fract(v_tileTextureCoord);
mediump vec2 samplePos = mix(v_tlbr.xy, v_tlbr.zw, normalizedTextureCoord);
lowp vec4 color = texture2D(u_texture, samplePos);
gl_FragColor = v_color[3] * color;
#else
gl_FragColor = v_color;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"fill.vert":`precision mediump float;
attribute vec2 a_pos;
#pragma header
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump float u_depth;
uniform mediump vec2 u_fillTranslation;
#ifdef PATTERN
#include <util/util.glsl>
uniform mediump vec2 u_mosaicSize;
uniform mediump float u_patternFactor;
varying mediump vec2 v_tileTextureCoord;
varying mediump vec4 v_tlbr;
#endif
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
void main()
{
#pragma main
v_color = color * opacity;
#ifdef ID
v_id = u_id / 255.0;
#endif
#ifdef PATTERN
float patternWidth = nextPOT(tlbr.z - tlbr.x);
float patternHeight = nextPOT(tlbr.w - tlbr.y);
float scaleX = 1.0 / (patternWidth * u_patternFactor);
float scaleY = 1.0 / (patternHeight * u_patternFactor);
mat3 patterMat = mat3(scaleX, 0.0,    0.0,
0.0,    -scaleY, 0.0,
0.0,    0.0,    1.0);
v_tileTextureCoord = (patterMat * vec3(a_pos, 1.0)).xy;
v_tlbr             = tlbr / u_mosaicSize.xyxy;
#endif
vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayMat3 * vec3(u_fillTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},icon:{"icon.frag":`precision mediump float;
uniform lowp sampler2D u_texture;
#ifdef SDF
uniform lowp vec4 u_color;
uniform lowp vec4 u_outlineColor;
#endif
varying mediump vec2 v_tex;
varying lowp float v_opacity;
varying mediump vec2 v_size;
varying lowp vec4 v_color;
#ifdef SDF
varying mediump flaot v_halo_width;
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
#include <util/encoding.glsl>
vec4 mixColors(vec4 color1, vec4 color2) {
float compositeAlpha = color2.a + color1.a * (1.0 - color2.a);
vec3 compositeColor = color2.rgb + color1.rgb * (1.0 - color2.a);
return vec4(compositeColor, compositeAlpha);
}
void main()
{
#ifdef SDF
lowp vec4 fillPixelColor = v_color;
float d = rgba2float(texture2D(u_texture, v_tex)) - 0.5;
const float softEdgeRatio = 0.248062016;
float size = max(v_size.x, v_size.y);
float dist = d * softEdgeRatio * size;
fillPixelColor *= clamp(0.5 - dist, 0.0, 1.0);
if (v_halo_width > 0.25) {
lowp vec4 outlinePixelColor = u_outlineColor;
const float outlineLimitRatio = (16.0 / 86.0);
float clampedOutlineSize = softEdgeRatio * min(v_halo_width, outlineLimitRatio * max(v_size.x, v_size.y));
outlinePixelColor *= clamp(0.5 - (abs(dist) - clampedOutlineSize), 0.0, 1.0);
gl_FragColor = v_opacity * mixColors(fillPixelColor, outlinePixelColor);
}
else {
gl_FragColor = v_opacity * fillPixelColor;
}
#else
lowp vec4 texColor = texture2D(u_texture, v_tex);
gl_FragColor = v_opacity * texColor;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"icon.vert":`attribute vec2 a_pos;
attribute vec2 a_vertexOffset;
attribute vec4 a_texAngleRange;
attribute vec4 a_levelInfo;
attribute float a_opacityInfo;
#pragma header
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
#ifdef SDF
varying mediump float v_halo_width;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump vec2 u_iconTranslation;
uniform vec2 u_mosaicSize;
uniform mediump float u_depth;
uniform mediump float u_mapRotation;
uniform mediump float u_level;
uniform lowp float u_keepUpright;
uniform mediump float u_fadeDuration;
varying mediump vec2 v_tex;
varying lowp float v_opacity;
varying mediump vec2 v_size;
const float C_OFFSET_PRECISION = 1.0 / 8.0;
const float C_256_TO_RAD = 3.14159265359 / 128.0;
const float C_DEG_TO_RAD = 3.14159265359 / 180.0;
const float tileCoordRatio = 1.0 / 8.0;
uniform highp float u_time;
void main()
{
#pragma main
v_color = color;
v_opacity = opacity;
#ifdef SDF
v_halo_width = halo_width;
#endif
float modded = mod(a_opacityInfo, 128.0);
float targetOpacity = (a_opacityInfo - modded) / 128.0;
float startOpacity = modded / 127.0;
float interpolatedOpacity = clamp(startOpacity + 2.0 * (targetOpacity - 0.5) * u_time / u_fadeDuration, 0.0, 1.0);
v_opacity *= interpolatedOpacity;
mediump float a_angle         = a_levelInfo[1];
mediump float a_minLevel      = a_levelInfo[2];
mediump float a_maxLevel      = a_levelInfo[3];
mediump vec2 a_tex            = a_texAngleRange.xy;
mediump float delta_z = 0.0;
mediump float rotated = mod(a_angle + u_mapRotation, 256.0);
delta_z += (1.0 - step(u_keepUpright, 0.0)) * step(64.0, rotated) * (1.0 - step(192.0, rotated));
delta_z += 1.0 - step(a_minLevel, u_level);
delta_z += step(a_maxLevel, u_level);
delta_z += step(v_opacity, 0.0);
vec2 offset = C_OFFSET_PRECISION * a_vertexOffset;
v_size = abs(offset);
#ifdef SDF
offset = (120.0 / 86.0) * offset;
#endif
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayViewMat3 * vec3(size * offset, 0.0) + u_displayMat3 * vec3(u_iconTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth + delta_z, 1.0);
#ifdef ID
v_id = u_id / 255.0;
#endif
v_tex = a_tex.xy / u_mosaicSize;
}`},line:{"line.frag":`precision lowp float;
varying mediump vec2 v_normal;
varying highp float v_accumulatedDistance;
varying mediump float v_lineHalfWidth;
varying lowp vec4 v_color;
varying mediump float v_blur;
#if defined (PATTERN) || defined(SDF)
varying mediump vec4 v_tlbr;
varying mediump vec2 v_patternSize;
varying mediump float v_widthRatio;
uniform sampler2D u_texture;
uniform mediump float u_antialiasing;
#endif
#ifdef SDF
#include <util/encoding.glsl>
#endif
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
mediump float fragDist = length(v_normal) * v_lineHalfWidth;
lowp float alpha = clamp((v_lineHalfWidth - fragDist) / v_blur, 0.0, 1.0);
#ifdef PATTERN
mediump float relativeTexX = fract(v_accumulatedDistance / (v_patternSize.x * v_widthRatio));
mediump float relativeTexY = 0.5 + v_normal.y * v_lineHalfWidth / (v_patternSize.y * v_widthRatio);
mediump vec2 texCoord = mix(v_tlbr.xy, v_tlbr.zw, vec2(relativeTexX, relativeTexY));
lowp vec4 color = texture2D(u_texture, texCoord);
gl_FragColor = alpha * v_color[3] * color;
#elif defined(SDF)
mediump float relativeTexX = fract((v_accumulatedDistance * 0.5) / (v_patternSize.x * v_widthRatio));
mediump float relativeTexY =  0.5 + 0.25 * v_normal.y;
mediump vec2 texCoord = mix(v_tlbr.xy, v_tlbr.zw, vec2(relativeTexX, relativeTexY));
mediump float d = rgba2float(texture2D(u_texture, texCoord)) - 0.5;
float dist = d * (v_lineHalfWidth + u_antialiasing / 2.0);
gl_FragColor = alpha * clamp(0.5 - dist, 0.0, 1.0) * v_color;
#else
gl_FragColor = alpha * v_color;
#endif
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"line.vert":`precision mediump float;
attribute vec2 a_pos;
attribute vec4 a_extrude_offset;
attribute vec4 a_dir_normal;
attribute vec2 a_accumulatedDistance;
#pragma header
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump float u_zoomFactor;
uniform mediump vec2 u_lineTranslation;
uniform mediump float u_antialiasing;
uniform mediump float u_depth;
varying mediump vec2 v_normal;
varying highp float v_accumulatedDistance;
const float scale = 1.0 / 31.0;
const mediump float tileCoordRatio = 8.0;
#if defined (SDF)
const mediump float sdfPatternHalfWidth = 15.5;
#endif
#if defined (PATTERN) || defined(SDF)
uniform mediump vec2 u_mosaicSize;
varying mediump vec4 v_tlbr;
varying mediump vec2 v_patternSize;
varying mediump float v_widthRatio;
#endif
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
varying lowp vec4 v_color;
varying mediump float v_lineHalfWidth;
varying mediump float v_blur;
void main()
{
#pragma main
v_color = color * opacity;
v_blur = blur + u_antialiasing;
v_normal = a_dir_normal.zw * scale;
#if defined (PATTERN) || defined(SDF)
v_tlbr          = tlbr / u_mosaicSize.xyxy;
v_patternSize   = vec2(tlbr.z - tlbr.x, tlbr.y - tlbr.w);
#if defined (PATTERN)
v_widthRatio = width / v_patternSize.y;
#else
v_widthRatio = width / sdfPatternHalfWidth / 2.0;
#endif
#endif
v_lineHalfWidth = (width + u_antialiasing) * 0.5;
mediump vec2 dir = a_dir_normal.xy * scale;
mediump vec2 offset_ = a_extrude_offset.zw * scale * offset;
mediump vec2 dist = v_lineHalfWidth * scale * a_extrude_offset.xy;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos + offset_ * tileCoordRatio / u_zoomFactor, 1.0) + u_displayViewMat3 * vec3(dist, 0.0) + u_displayMat3 * vec3(u_lineTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
#if defined (PATTERN) || defined(SDF)
v_accumulatedDistance = a_accumulatedDistance.x * u_zoomFactor / tileCoordRatio + dot(dir, dist + offset_);
#endif
#ifdef ID
v_id = u_id / 255.0;
#endif
}`},outline:{"outline.frag":`varying lowp vec4 v_color;
varying mediump vec2 v_normal;
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
lowp float dist = abs(v_normal.y);
lowp float alpha = smoothstep(1.0, 0.0, dist);
gl_FragColor = alpha * v_color;
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"outline.vert":`attribute vec2 a_pos;
attribute vec2 a_offset;
attribute vec2 a_xnormal;
#pragma header
varying lowp vec4 v_color;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform mediump vec2 u_fillTranslation;
uniform mediump float u_depth;
uniform mediump float u_outline_width;
varying lowp vec2 v_normal;
const float scale = 1.0 / 15.0;
void main()
{
#pragma main
v_color = color * opacity;
#ifdef ID
v_id = u_id / 255.0;
#endif
v_normal = a_xnormal;
mediump vec2 dist = u_outline_width * scale * a_offset;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + u_displayMat3 * vec3(dist + u_fillTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth, 1.0);
}`},text:{"text.frag":`uniform lowp sampler2D u_texture;
varying lowp vec2 v_tex;
varying lowp vec4 v_color;
varying mediump float v_edgeWidth;
varying mediump float v_edgeDistance;
#ifdef ID
varying mediump vec4 v_id;
#endif
void main()
{
lowp float dist = texture2D(u_texture, v_tex).a;
mediump float alpha = smoothstep(v_edgeDistance - v_edgeWidth, v_edgeDistance + v_edgeWidth, dist);
gl_FragColor = alpha * v_color;
#ifdef ID
if (gl_FragColor.a < 1.0 / 255.0) {
discard;
}
gl_FragColor = v_id;
#endif
}`,"text.vert":`attribute vec2 a_pos;
attribute vec2 a_vertexOffset;
attribute vec4 a_texAngleRange;
attribute vec4 a_levelInfo;
attribute float a_opacityInfo;
#pragma header
varying lowp vec4 v_color;
#ifdef ID
uniform mediump vec4 u_id;
varying mediump vec4 v_id;
#endif
uniform highp mat3 u_dvsMat3;
uniform highp mat3 u_displayMat3;
uniform highp mat3 u_displayViewMat3;
uniform mediump vec2 u_textTranslation;
uniform vec2 u_mosaicSize;
uniform mediump float u_depth;
uniform mediump float u_mapRotation;
uniform mediump float u_level;
uniform lowp float u_keepUpright;
uniform mediump float u_fadeDuration;
varying lowp vec2 v_tex;
const float offsetPrecision = 1.0 / 8.0;
const mediump float edgePos = 0.75;
uniform mediump float u_antialiasingWidth;
varying mediump float v_edgeDistance;
varying mediump float v_edgeWidth;
uniform lowp float u_halo;
const float sdfFontScale = 1.0 / 24.0;
const float sdfPixel = 3.0;
uniform highp float u_time;
void main()
{
#pragma main
if (u_halo > 0.5)
{
v_color = halo_color * opacity;
halo_width *= sdfPixel;
halo_blur *= sdfPixel;
}
else
{
v_color = color * opacity;
halo_width = 0.0;
halo_blur = 0.0;
}
float modded = mod(a_opacityInfo, 128.0);
float targetOpacity = (a_opacityInfo - modded) / 128.0;
float startOpacity = modded / 127.0;
float interpolatedOpacity = clamp(startOpacity + 2.0 * (targetOpacity - 0.5) * u_time / u_fadeDuration, 0.0, 1.0);
v_color *= interpolatedOpacity;
mediump float a_angle       = a_levelInfo[1];
mediump float a_minLevel    = a_levelInfo[2];
mediump float a_maxLevel    = a_levelInfo[3];
mediump vec2 a_tex          = a_texAngleRange.xy;
mediump float a_visMinAngle    = a_texAngleRange.z;
mediump float a_visMaxAngle    = a_texAngleRange.w;
mediump float delta_z = 0.0;
mediump float angle = mod(a_angle + u_mapRotation, 256.0);
if (a_visMinAngle < a_visMaxAngle)
{
delta_z += (1.0 - step(u_keepUpright, 0.0)) * (step(a_visMaxAngle, angle) + (1.0 - step(a_visMinAngle, angle)));
}
else
{
delta_z += (1.0 - step(u_keepUpright, 0.0)) * (step(a_visMaxAngle, angle) * (1.0 - step(a_visMinAngle, angle)));
}
delta_z += 1.0 - step(a_minLevel, u_level);
delta_z += step(a_maxLevel, u_level);
delta_z += step(v_color[3], 0.0);
v_tex = a_tex.xy / u_mosaicSize;
#ifdef ID
v_id = u_id / 255.0;
#endif
v_edgeDistance = edgePos - halo_width / size;
v_edgeWidth = (u_antialiasingWidth + halo_blur) / size;
mediump vec3 pos = u_dvsMat3 * vec3(a_pos, 1.0) + sdfFontScale * u_displayViewMat3 * vec3(offsetPrecision * size * a_vertexOffset, 0.0) + u_displayMat3 * vec3(u_textTranslation, 0.0);
gl_Position = vec4(pos.xy, u_depth + delta_z, 1.0);
}`},util:{"encoding.glsl":`const vec4 rgba2float_factors = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, rgba2float_factors);
}`,"util.glsl":`float nextPOT(in float x) {
return pow(2.0, ceil(log2(abs(x))));
}`}};function tn(s){let e=en;return s.split("/").forEach(n=>{e&&(e=e[n])}),e}const nn=new Ge(tn);function A(s){return nn.resolveIncludes(s)}function Z(s){let e="";for(const n in s){const t=s[n];if(typeof t=="boolean")t&&(e+=`#define ${n}
`);else if(typeof t=="number")e+=`#define ${n} ${t.toFixed()}
`;else if(typeof t=="object"){const i=t.options;let o=0;for(const a in i)e+=`#define ${i[a]} ${(o++).toFixed()}
`;e+=`#define ${n} ${i[t.value]}
`}}return e}const Pe=s=>Z({ID:s.id,PATTERN:s.pattern}),on={shaders:s=>({vertexShader:Pe(s)+A("background/background.vert"),fragmentShader:Pe(s)+A("background/background.frag")})},we=s=>Z({ID:s.id}),an={shaders:s=>({vertexShader:we(s)+A("circle/circle.vert"),fragmentShader:we(s)+A("circle/circle.frag")})},Oe=s=>Z({ID:s.id,PATTERN:s.pattern}),rn={shaders:s=>({vertexShader:Oe(s)+A("fill/fill.vert"),fragmentShader:Oe(s)+A("fill/fill.frag")})},Ee=s=>Z({ID:s.id}),ln={shaders:s=>({vertexShader:Ee(s)+A("outline/outline.vert"),fragmentShader:Ee(s)+A("outline/outline.frag")})},Re=s=>Z({ID:s.id,SDF:s.sdf}),sn={shaders:s=>({vertexShader:Re(s)+A("icon/icon.vert"),fragmentShader:Re(s)+A("icon/icon.frag")})},ze=s=>Z({ID:s.id,PATTERN:s.pattern,SDF:s.sdf}),cn={shaders:s=>({vertexShader:ze(s)+A("line/line.vert"),fragmentShader:ze(s)+A("line/line.frag")})},Le=s=>Z({ID:s.id}),un={shaders:s=>({vertexShader:Le(s)+A("text/text.vert"),fragmentShader:Le(s)+A("text/text.frag")})};class fn{constructor(){this._programByKey=new Map}dispose(){this._programByKey.forEach(e=>e.dispose()),this._programByKey.clear()}getMaterialProgram(e,n,t){const i=n.key<<3|this._getMaterialOptionsValue(n.type,t);if(this._programByKey.has(i))return this._programByKey.get(i);const o=this._getProgramTemplate(n.type),{shaders:a}=o,{vertexShader:r,fragmentShader:l}=a(t),c=n.getShaderHeader(),f=n.getShaderMain(),d=r.replace("#pragma header",c).replace("#pragma main",f),_=e.programCache.acquire(d,l,n.getAttributeLocations());return this._programByKey.set(i,_),_}_getMaterialOptionsValue(e,n){switch(e){case z.BACKGROUND:{const t=n;return(t.pattern?1:0)<<1|(t.id?1:0)}case z.FILL:{const t=n;return(t.pattern?1:0)<<1|(t.id?1:0)}case z.OUTLINE:return n.id?1:0;case z.LINE:{const t=n;return(t.sdf?1:0)<<2|(t.pattern?1:0)<<1|(t.id?1:0)}case z.ICON:{const t=n;return(t.sdf?1:0)<<1|(t.id?1:0)}case z.CIRCLE:return n.id?1:0;case z.TEXT:return n.id?1:0;default:return 0}}_getProgramTemplate(e){switch(e){case z.BACKGROUND:return on;case z.CIRCLE:return an;case z.FILL:return rn;case z.ICON:return sn;case z.LINE:return cn;case z.OUTLINE:return ln;case z.TEXT:return un;default:return null}}}const Ae=1e-6;class Me{constructor(e,n){this.spriteMosaic=e,this.glyphMosaic=n,this._brushCache=new Map,this._vtlMaterialManager=new fn}dispose(){this._brushCache&&(this._brushCache.forEach(e=>e.dispose()),this._brushCache=null),this._vtlMaterialManager=We(this._vtlMaterialManager),this.spriteMosaic.dispose(),this.glyphMosaic.dispose()}get vectorTilesMaterialManager(){return this._vtlMaterialManager}drawTile(e,n,t){const{context:i}=e,o=t.layers;t.backgroundBucketIds.length>0&&(e.renderPass="background",t.backgroundBucketIds.forEach(a=>this._renderStyleLayer(t.getLayerById(a),e,n,!0))),i.setBlendingEnabled(!1),i.setDepthTestEnabled(!0),i.setDepthWriteEnabled(!0),i.setDepthFunction(G.LEQUAL),e.renderPass="opaque";for(let a=o.length-1;a>=0;a--)this._renderStyleLayer(o[a],e,n,!1);i.setDepthWriteEnabled(!1),i.setBlendingEnabled(!0),i.setBlendFunctionSeparate(oe.ONE,oe.ONE_MINUS_SRC_ALPHA,oe.ONE,oe.ONE_MINUS_SRC_ALPHA),e.renderPass="translucent";for(let a=0;a<o.length;a++)this._renderStyleLayer(o[a],e,n,!1);i.setDepthTestEnabled(!1),e.renderPass="symbol";for(let a=0;a<o.length;a++)this._renderStyleLayer(o[a],e,n,!1);i.bindVAO()}_renderStyleLayer(e,n,t,i=!1){if(!(i||e&&t.layerData.has(e.uid)))return;const o=e.getLayoutProperty("visibility");if(o&&o.getValue()===ke.NONE)return;const{renderPass:a}=n;let r;switch(e.type){case j.BACKGROUND:if(a!=="background")return;r="vtlBackground";break;case j.FILL:if(a!=="opaque"&&n.renderPass!=="translucent")return;r="vtlFill";break;case j.LINE:if(a!=="translucent")return;r="vtlLine";break;case j.CIRCLE:if(a!=="symbol")return;r="vtlCircle";break;case j.SYMBOL:if(a!=="symbol")return;r="vtlSymbol"}const l=n.displayLevel;e.minzoom!==void 0&&e.minzoom>l+Ae||e.maxzoom!==void 0&&e.maxzoom<=l-Ae||(n.styleLayerUID=e.uid,n.styleLayer=e,this._drawWithBrush(n,t,r))}_drawWithBrush(e,n,t){if(!this._brushCache.has(t)){const i=Qt[t];this._brushCache.set(t,new i)}this._brushCache.get(t).drawMany(e,[n])}}let K=class extends xt(yt(bt)){constructor(){super(...arguments),this.type="vector-tile-3d"}initialize(){if(F(this.layer.fullExtent))return void this.addResolvingPromise(Promise.reject(new St("vectortilelayerview:full-extent-undefined","This layer view's layer does not define a fullExtent.")));const{basemapTerrain:s,spatialReference:e,pixelRatio:n,viewingMode:t}=this.view,i=t==="local"&&!Ct(e)||Tt.force512VTL,o=this.layer.tileInfo.spatialReference.isGeographic,a=i?this.layer.tileInfo:this.layer.tileInfo.getOrCreateCompatible(256,o?1:2),r=this._getTileInfoSupportError(a,this.layer.fullExtent);if(L(r))return this.addResolvingPromise(Promise.reject(r));const l=It(this.view,"basemapTerrain.tilingSchemeLocked").then(()=>{const y=s.tilingScheme,T=y.pixelSize;let g;if(this.schemaHelper=new Ot(T,s.spatialReference.isGeographic),T===256){const p=this.layer.tileInfo.spatialReference.isGeographic;g=this.layer.tileInfo.getOrCreateCompatible(256,p?1:2)}else g=this.view.spatialReference.isGeographic?this.layer.tileInfo.getOrCreateCompatible(512,.5):this.layer.tileInfo;const m=this._getTileInfoCompatibilityError(g,y);if(m)throw m;this.tileInfo=g});this._tileHandlerController=new AbortController;const c=this.view.resourceController;this._memCache=c.memoryController.newCache(this.layer.uid,y=>{y.release()});const{style:f}=this.layer.currentStyleInfo,d=new ye(f),_=s.mapTileRequester;this._tileHandler=new Ie(this.layer,d,n,this._memCache,_);const u=this._tileHandlerController.signal,v=y=>c.schedule(y),h=this._tileHandler.start({signal:u,schedule:v}),b=this._tileHandler.spriteMosaic;b.then(y=>{!Dt(u)&&this._tileHandler&&(this.painter=new Me(y,this._tileHandler.glyphMosaic))}),h.then(()=>this._tileHandlerController=null);const x=()=>{this._tileHandlerController&&this._tileHandlerController.abort(),this._tileHandlerController=new AbortController,this._memCache.clear();const{style:y}=this.layer.currentStyleInfo,T=new ye(y),g=new Ie(this.layer,T,n,this._memCache,_),m=g.start({signal:this._tileHandlerController.signal,schedule:v}),p=g.spriteMosaic;m.then(()=>this._tileHandlerController=null),this.updatingHandles.addPromise(Promise.all([m,p]).then(([,I])=>{const S=this._tileHandler,D=this.painter;this.painter=new Me(I,g.glyphMosaic),this._tileHandler=g,this.emit("data-changed"),S.destroy(),D&&D.dispose()}))};this.updatingHandles.add(()=>[this.layer.currentStyleInfo,this.view.pixelRatio],x);const C=Promise.all([l,h,b]);this.addResolvingPromise(C)}destroy(){this.painter=We(this.painter),this._tileHandlerController&&(this._tileHandlerController.abort(),this._tileHandlerController=null),he(this._tileHandler),this._memCache=he(this._memCache),this._tileHandler=null}get dataLevelRange(){const s=this.tileInfo.lods,e=s[0].scale,n=s[s.length-1].scale,t=this.levelRangeFromScaleRange(e,n);return t.minLevel===1&&this.tileInfo.size[0]===256&&(t.minLevel=0),t}async fetchTile(s,e,n,t){return this._tileHandler.getVectorTile(s,e,n,t)}};ae([le()],K.prototype,"layer",void 0),ae([le()],K.prototype,"dataLevelRange",null),ae([le()],K.prototype,"updatingProgressValue",void 0),K=ae([Pt("esri.views.3d.layers.VectorTileLayerView3D")],K);const Dn=K;export{Dn as default};
