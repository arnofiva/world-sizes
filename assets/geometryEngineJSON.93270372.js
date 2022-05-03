import{n1 as r,n2 as u}from"./vendor.d1b93dad.js";function s(e){return r.extendedSpatialReferenceInfo(e)}function l(e,n,t){return r.clip(u,e,n,t)}function a(e,n,t){return r.cut(u,e,n,t)}function p(e,n,t){return r.contains(u,e,n,t)}function d(e,n,t){return r.crosses(u,e,n,t)}function g(e,n,t,i){return r.distance(u,e,n,t,i)}function m(e,n,t){return r.equals(u,e,n,t)}function h(e,n,t){return r.intersects(u,e,n,t)}function x(e,n,t){return r.touches(u,e,n,t)}function w(e,n,t){return r.within(u,e,n,t)}function y(e,n,t){return r.disjoint(u,e,n,t)}function A(e,n,t){return r.overlaps(u,e,n,t)}function E(e,n,t,i){return r.relate(u,e,n,t,i)}function V(e,n){return r.isSimple(u,e,n)}function z(e,n){return r.simplify(u,e,n)}function I(e,n,t=!1){return r.convexHull(u,e,n,t)}function R(e,n,t){return r.difference(u,e,n,t)}function v(e,n,t){return r.symmetricDifference(u,e,n,t)}function D(e,n,t){return r.intersect(u,e,n,t)}function H(e,n,t=null){return r.union(u,e,n,t)}function L(e,n,t,i,o,c,f){return r.offset(u,e,n,t,i,o,c,f)}function S(e,n,t,i,o=!1){return r.buffer(u,e,n,t,i,o)}function _(e,n,t,i,o,c,f){return r.geodesicBuffer(u,e,n,t,i,o,c,f)}function b(e,n,t,i=!0){return r.nearestCoordinate(u,e,n,t,i)}function j(e,n,t){return r.nearestVertex(u,e,n,t)}function q(e,n,t,i,o){return r.nearestVertices(u,e,n,t,i,o)}function B(e,n,t,i){if(n==null||i==null)throw new Error("Illegal Argument Exception");const o=r.rotate(n,t,i);return o.spatialReference=e,o}function C(e,n,t){if(n==null||t==null)throw new Error("Illegal Argument Exception");const i=r.flipHorizontal(n,t);return i.spatialReference=e,i}function $(e,n,t){if(n==null||t==null)throw new Error("Illegal Argument Exception");const i=r.flipVertical(n,t);return i.spatialReference=e,i}function k(e,n,t,i,o){return r.generalize(u,e,n,t,i,o)}function G(e,n,t,i){return r.densify(u,e,n,t,i)}function O(e,n,t,i,o=0){return r.geodesicDensify(u,e,n,t,i,o)}function F(e,n,t){return r.planarArea(u,e,n,t)}function J(e,n,t){return r.planarLength(u,e,n,t)}function K(e,n,t,i){return r.geodesicArea(u,e,n,t,i)}function M(e,n,t,i){return r.geodesicLength(u,e,n,t,i)}const P=Object.freeze({__proto__:null,extendedSpatialReferenceInfo:s,clip:l,cut:a,contains:p,crosses:d,distance:g,equals:m,intersects:h,touches:x,within:w,disjoint:y,overlaps:A,relate:E,isSimple:V,simplify:z,convexHull:I,difference:R,symmetricDifference:v,intersect:D,union:H,offset:L,buffer:S,geodesicBuffer:_,nearestCoordinate:b,nearestVertex:j,nearestVertices:q,rotate:B,flipHorizontal:C,flipVertical:$,generalize:k,densify:G,geodesicDensify:O,planarArea:F,planarLength:J,geodesicArea:K,geodesicLength:M});export{D as A,k as B,K as C,q as D,H as E,M as G,B as H,_ as I,G as L,C as R,O as S,b as V,F as _,m as a,$ as b,h as c,E as d,x as f,A as g,z as h,a as i,L as j,P as k,w as l,V as m,g as o,y as p,J as q,s as r,p as s,l as t,d as u,j as v,v as w,R as x,I as y,S as z};
