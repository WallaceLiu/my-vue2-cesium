/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["./when-a55a8a4c","./Check-bc1d37d9","./Math-d7cbfcf6","./Cartesian2-6ec3db89","./Transforms-a4d7073e","./RuntimeError-7c184ac0","./WebGLConstants-4c11ee5f","./ComponentDatatype-919a7463","./AttributeCompression-6cfb9427","./IndexDatatype-4351ba4c","./IntersectionTests-3d9e1b94","./Plane-37b84dad","./createTaskProcessorWorker","./EllipsoidTangentPlane-323c7a98","./OrientedBoundingBox-764de7b5","./TerrainEncoding-69e30123"],function(v,C,ce,ge,me,e,i,r,n,we,t,s,h,u,xe,ve){"use strict";var Ce={clipTriangleAtAxisAlignedThreshold:function(e,i,r,t,n,s){if(!v.defined(e))throw new C.DeveloperError("threshold is required.");if(!v.defined(i))throw new C.DeveloperError("keepAbove is required.");if(!v.defined(r))throw new C.DeveloperError("u0 is required.");if(!v.defined(t))throw new C.DeveloperError("u1 is required.");if(!v.defined(n))throw new C.DeveloperError("u2 is required.");var h,u,o;v.defined(s)?s.length=0:s=[],o=i?(h=r<e,u=t<e,n<e):(h=e<r,u=e<t,e<n);var d,p,a,f,l,c,g=h+u+o;return 1===g?h?(d=(e-r)/(t-r),p=(e-r)/(n-r),s.push(1),s.push(2),1!==p&&(s.push(-1),s.push(0),s.push(2),s.push(p)),1!==d&&(s.push(-1),s.push(0),s.push(1),s.push(d))):u?(a=(e-t)/(n-t),f=(e-t)/(r-t),s.push(2),s.push(0),1!==f&&(s.push(-1),s.push(1),s.push(0),s.push(f)),1!==a&&(s.push(-1),s.push(1),s.push(2),s.push(a))):o&&(l=(e-n)/(r-n),c=(e-n)/(t-n),s.push(0),s.push(1),1!==c&&(s.push(-1),s.push(2),s.push(1),s.push(c)),1!==l&&(s.push(-1),s.push(2),s.push(0),s.push(l))):2===g?h||r===e?u||t===e?o||n===e||(p=(e-r)/(n-r),a=(e-t)/(n-t),s.push(2),s.push(-1),s.push(0),s.push(2),s.push(p),s.push(-1),s.push(1),s.push(2),s.push(a)):(c=(e-n)/(t-n),d=(e-r)/(t-r),s.push(1),s.push(-1),s.push(2),s.push(1),s.push(c),s.push(-1),s.push(0),s.push(1),s.push(d)):(f=(e-t)/(r-t),l=(e-n)/(r-n),s.push(0),s.push(-1),s.push(1),s.push(0),s.push(f),s.push(-1),s.push(2),s.push(0),s.push(l)):3!==g&&(s.push(0),s.push(1),s.push(2)),s},computeBarycentricCoordinates:function(e,i,r,t,n,s,h,u,o){if(!v.defined(e))throw new C.DeveloperError("x is required.");if(!v.defined(i))throw new C.DeveloperError("y is required.");if(!v.defined(r))throw new C.DeveloperError("x1 is required.");if(!v.defined(t))throw new C.DeveloperError("y1 is required.");if(!v.defined(n))throw new C.DeveloperError("x2 is required.");if(!v.defined(s))throw new C.DeveloperError("y2 is required.");if(!v.defined(h))throw new C.DeveloperError("x3 is required.");if(!v.defined(u))throw new C.DeveloperError("y3 is required.");var d=r-h,p=h-n,a=s-u,f=t-u,l=1/(a*d+p*f),c=i-u,g=e-h,m=(a*g+p*c)*l,w=(-f*g+d*c)*l,x=1-m-w;return v.defined(o)?(o.x=m,o.y=w,o.z=x,o):new ge.Cartesian3(m,w,x)},computeLineSegmentLineSegmentIntersection:function(e,i,r,t,n,s,h,u,o){C.Check.typeOf.number("x00",e),C.Check.typeOf.number("y00",i),C.Check.typeOf.number("x01",r),C.Check.typeOf.number("y01",t),C.Check.typeOf.number("x10",n),C.Check.typeOf.number("y10",s),C.Check.typeOf.number("x11",h),C.Check.typeOf.number("y11",u);var d=(u-s)*(r-e)-(h-n)*(t-i);if(0!=d){var p=((h-n)*(i-s)-(u-s)*(e-n))/d,a=((r-e)*(i-s)-(t-i)*(e-n))/d;return 0<=p&&p<=1&&0<=a&&a<=1?(v.defined(o)||(o=new ge.Cartesian2),o.x=e+p*(r-e),o.y=i+p*(t-i),o):void 0}}},ye=32767,be=16383,Be=[],Ie=[],Ae=[],Ee=new ge.Cartographic,De=new ge.Cartesian3,Te=[],Oe=[],ze=[],ke=[],Me=[],Ne=new ge.Cartesian3,Ve=new me.BoundingSphere,qe=new xe.OrientedBoundingBox,Re=new ge.Cartesian2,He=new ge.Cartesian3;function Se(){this.vertexBuffer=void 0,this.index=void 0,this.first=void 0,this.second=void 0,this.ratio=void 0}Se.prototype.clone=function(e){return v.defined(e)||(e=new Se),e.uBuffer=this.uBuffer,e.vBuffer=this.vBuffer,e.heightBuffer=this.heightBuffer,e.normalBuffer=this.normalBuffer,e.index=this.index,e.first=this.first,e.second=this.second,e.ratio=this.ratio,e},Se.prototype.initializeIndexed=function(e,i,r,t,n){this.uBuffer=e,this.vBuffer=i,this.heightBuffer=r,this.normalBuffer=t,this.index=n,this.first=void 0,this.second=void 0,this.ratio=void 0},Se.prototype.initializeFromClipResult=function(e,i,r){var t=i+1;return-1!==e[i]?r[e[i]].clone(this):(this.vertexBuffer=void 0,this.index=void 0,this.first=r[e[t]],++t,this.second=r[e[t]],++t,this.ratio=e[t],++t),t},Se.prototype.getKey=function(){return this.isIndexed()?this.index:JSON.stringify({first:this.first.getKey(),second:this.second.getKey(),ratio:this.ratio})},Se.prototype.isIndexed=function(){return v.defined(this.index)},Se.prototype.getH=function(){return v.defined(this.index)?this.heightBuffer[this.index]:ce.CesiumMath.lerp(this.first.getH(),this.second.getH(),this.ratio)},Se.prototype.getU=function(){return v.defined(this.index)?this.uBuffer[this.index]:ce.CesiumMath.lerp(this.first.getU(),this.second.getU(),this.ratio)},Se.prototype.getV=function(){return v.defined(this.index)?this.vBuffer[this.index]:ce.CesiumMath.lerp(this.first.getV(),this.second.getV(),this.ratio)};var o=new ge.Cartesian2,d=-1,p=[new ge.Cartesian3,new ge.Cartesian3],a=[new ge.Cartesian3,new ge.Cartesian3];function f(e,i){var r=p[++d],t=a[d];return r=n.AttributeCompression.octDecode(e.first.getNormalX(),e.first.getNormalY(),r),t=n.AttributeCompression.octDecode(e.second.getNormalX(),e.second.getNormalY(),t),De=ge.Cartesian3.lerp(r,t,e.ratio,De),ge.Cartesian3.normalize(De,De),n.AttributeCompression.octEncode(De,i),--d,i}Se.prototype.getNormalX=function(){return v.defined(this.index)?this.normalBuffer[2*this.index]:(o=f(this,o)).x},Se.prototype.getNormalY=function(){return v.defined(this.index)?this.normalBuffer[2*this.index+1]:(o=f(this,o)).y};var g=[];function Ue(e,i,r,t,n,s,h,u,o){if(0!==h.length){for(var d=0,p=0;p<h.length;)p=g[d++].initializeFromClipResult(h,p,u);for(var a=0;a<d;++a){var f=g[a];if(f.isIndexed())f.newIndex=s[f.index],f.uBuffer=e,f.vBuffer=i,f.heightBuffer=r,o&&(f.normalBuffer=t);else{var l=f.getKey();if(v.defined(s[l]))f.newIndex=s[l];else{var c=e.length;e.push(f.getU()),i.push(f.getV()),r.push(f.getH()),o&&(t.push(f.getNormalX()),t.push(f.getNormalY())),f.newIndex=c,s[l]=c}}}3===d?(n.push(g[0].newIndex),n.push(g[1].newIndex),n.push(g[2].newIndex)):4===d&&(n.push(g[0].newIndex),n.push(g[1].newIndex),n.push(g[2].newIndex),n.push(g[0].newIndex),n.push(g[2].newIndex),n.push(g[3].newIndex))}}return g.push(new Se),g.push(new Se),g.push(new Se),g.push(new Se),h(function(e,i){var r=e.isEastChild,t=e.isNorthChild,n=r?be:0,s=r?ye:be,h=t?be:0,u=t?ye:be,o=Te,d=Oe,p=ze,a=Me;o.length=0,d.length=0,p.length=0,a.length=0;var f=ke;f.length=0;var l={},c=e.vertices,g=e.indices;g=g.subarray(0,e.indexCountWithoutSkirts);var m,w,x,v,C,y=ve.TerrainEncoding.clone(e.encoding),b=y.hasVertexNormals,B=e.exaggeration,I=0,A=e.vertexCountWithoutSkirts,E=e.minimumHeight,D=e.maximumHeight,T=new Array(A),O=new Array(A),z=new Array(A),k=b?new Array(2*A):void 0;for(x=w=0;w<A;++w,x+=2){var M=y.decodeTextureCoordinates(c,w,Re);if(m=y.decodeHeight(c,w)/B,v=ce.CesiumMath.clamp(M.x*ye|0,0,ye),C=ce.CesiumMath.clamp(M.y*ye|0,0,ye),z[w]=ce.CesiumMath.clamp((m-E)/(D-E)*ye|0,0,ye),v<20&&(v=0),C<20&&(C=0),ye-v<20&&(v=ye),ye-C<20&&(C=ye),T[w]=v,O[w]=C,b){var N=y.getOctEncodedNormal(c,w,He);k[x]=N.x,k[x+1]=N.y}(r&&be<=v||!r&&v<=be)&&(t&&be<=C||!t&&C<=be)&&(l[w]=I,o.push(v),d.push(C),p.push(z[w]),b&&(a.push(k[x]),a.push(k[x+1])),++I)}var V=[];V.push(new Se),V.push(new Se),V.push(new Se);var q,R=[];for(R.push(new Se),R.push(new Se),R.push(new Se),w=0;w<g.length;w+=3){var H=g[w],S=g[w+1],U=g[w+2],F=T[H],P=T[S],W=T[U];V[0].initializeIndexed(T,O,z,k,H),V[1].initializeIndexed(T,O,z,k,S),V[2].initializeIndexed(T,O,z,k,U);var X=Ce.clipTriangleAtAxisAlignedThreshold(be,r,F,P,W,Be);(q=0)>=X.length||(q=R[0].initializeFromClipResult(X,q,V))>=X.length||(q=R[1].initializeFromClipResult(X,q,V))>=X.length||(q=R[2].initializeFromClipResult(X,q,V),Ue(o,d,p,a,f,l,Ce.clipTriangleAtAxisAlignedThreshold(be,t,R[0].getV(),R[1].getV(),R[2].getV(),Ie),R,b),q<X.length&&(R[2].clone(R[1]),R[2].initializeFromClipResult(X,q,V),Ue(o,d,p,a,f,l,Ce.clipTriangleAtAxisAlignedThreshold(be,t,R[0].getV(),R[1].getV(),R[2].getV(),Ie),R,b)))}var K=r?-ye:0,L=t?-ye:0,Y=[],_=[],G=[],J=[],Z=Number.MAX_VALUE,j=-Z,Q=Ae;Q.length=0;var $=ge.Ellipsoid.clone(e.ellipsoid),ee=ge.Rectangle.clone(e.childRectangle),ie=ee.north,re=ee.south,te=ee.east,ne=ee.west;for(te<ne&&(te+=ce.CesiumMath.TWO_PI),w=0;w<o.length;++w)v=(v=Math.round(o[w]))<=n?(Y.push(w),0):s<=v?(G.push(w),ye):2*v+K,o[w]=v,C=(C=Math.round(d[w]))<=h?(_.push(w),0):u<=C?(J.push(w),ye):2*C+L,d[w]=C,(m=ce.CesiumMath.lerp(E,D,p[w]/ye))<Z&&(Z=m),j<m&&(j=m),p[w]=m,Ee.longitude=ce.CesiumMath.lerp(ne,te,v/ye),Ee.latitude=ce.CesiumMath.lerp(re,ie,C/ye),Ee.height=m,$.cartographicToCartesian(Ee,De),Q.push(De.x),Q.push(De.y),Q.push(De.z);var se=me.BoundingSphere.fromVertices(Q,ge.Cartesian3.ZERO,3,Ve),he=xe.OrientedBoundingBox.fromRectangle(ee,Z,j,$,qe),ue=new ve.EllipsoidalOccluder($).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(se.center,Q,3,se.center,Z,Ne),oe=j-Z,de=new Uint16Array(o.length+d.length+p.length);for(w=0;w<o.length;++w)de[w]=o[w];var pe=o.length;for(w=0;w<d.length;++w)de[pe+w]=d[w];for(pe+=d.length,w=0;w<p.length;++w)de[pe+w]=ye*(p[w]-Z)/oe;var ae,fe=we.IndexDatatype.createTypedArray(o.length,f);if(b){var le=new Uint8Array(a);i.push(de.buffer,fe.buffer,le.buffer),ae=le.buffer}else i.push(de.buffer,fe.buffer);return{vertices:de.buffer,encodedNormals:ae,indices:fe.buffer,minimumHeight:Z,maximumHeight:j,westIndices:Y,southIndices:_,eastIndices:G,northIndices:J,boundingSphere:se,orientedBoundingBox:he,horizonOcclusionPoint:ue}})});
