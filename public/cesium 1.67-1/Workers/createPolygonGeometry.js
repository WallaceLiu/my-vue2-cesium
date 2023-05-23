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
define(["./when-a55a8a4c","./Check-bc1d37d9","./Math-d7cbfcf6","./Cartesian2-6ec3db89","./Transforms-a4d7073e","./RuntimeError-7c184ac0","./WebGLConstants-4c11ee5f","./ComponentDatatype-919a7463","./GeometryAttribute-291ff23b","./GeometryAttributes-1c7ce91d","./AttributeCompression-6cfb9427","./GeometryPipeline-9b42374e","./EncodedCartesian3-5ad054af","./IndexDatatype-4351ba4c","./IntersectionTests-3d9e1b94","./Plane-37b84dad","./GeometryOffsetAttribute-c9accdb9","./VertexFormat-7f136973","./GeometryInstance-fadc2629","./arrayRemoveDuplicates-69403a22","./BoundingRectangle-e7351c16","./EllipsoidTangentPlane-323c7a98","./ArcType-66bc286a","./EllipsoidRhumbLine-4d1a57d2","./PolygonPipeline-5b0d203a","./PolygonGeometryLibrary-34f7d7a7","./EllipsoidGeodesic-365e69f7"],function(W,v,Y,j,Q,e,t,q,K,r,o,V,a,F,i,n,Z,b,L,s,l,N,c,u,R,M,y){"use strict";var p=new j.Cartographic,d=new j.Cartographic;function J(e,t,r,o){var a=o.cartesianToCartographic(e,p).height,i=o.cartesianToCartographic(t,d);i.height=a,o.cartographicToCartesian(i,t);var n=o.cartesianToCartographic(r,d);n.height=a-100,o.cartographicToCartesian(n,r)}var S=new l.BoundingRectangle,X=new j.Cartesian3,$=new j.Cartesian3,ee=new j.Cartesian3,te=new j.Cartesian3,re=new j.Cartesian3,oe=new j.Cartesian3,ae=new j.Cartesian3,ie=new j.Cartesian3,ne=new j.Cartesian3,se=new j.Cartesian2,le=new j.Cartesian2,ue=new j.Cartesian3,pe=new Q.Quaternion,ce=new Q.Matrix3,ye=new Q.Matrix3;function k(e){var t=e.vertexFormat,r=e.geometry,o=e.shadowVolume,a=r.attributes.position.values,i=a.length,n=e.wall,s=e.top||n,l=e.bottom||n;if(t.st||t.normal||t.tangent||t.bitangent||o){var u=e.boundingRectangle,p=e.tangentPlane,c=e.ellipsoid,y=e.stRotation,d=e.perPositionHeight,g=se;g.x=u.x,g.y=u.y;var m,h=t.st?new Float32Array(i/3*2):void 0;t.normal&&(m=d&&s&&!n?r.attributes.normal.values:new Float32Array(i));var f=t.tangent?new Float32Array(i):void 0,v=t.bitangent?new Float32Array(i):void 0,b=o?new Float32Array(i):void 0,_=0,P=0,C=$,T=ee,w=te,I=!0,A=ce,x=ye;if(0!==y){var E=Q.Quaternion.fromAxisAngle(p._plane.normal,y,pe);A=Q.Matrix3.fromQuaternion(E,A),E=Q.Quaternion.fromAxisAngle(p._plane.normal,-y,pe),x=Q.Matrix3.fromQuaternion(E,x)}else A=Q.Matrix3.clone(Q.Matrix3.IDENTITY,A),x=Q.Matrix3.clone(Q.Matrix3.IDENTITY,x);var G=0,O=0;s&&l&&(G=i/2,O=i/3,i/=2);for(var H=0;H<i;H+=3){var D=j.Cartesian3.fromArray(a,H,ue);if(t.st){var V=Q.Matrix3.multiplyByVector(A,D,X);V=c.scaleToGeodeticSurface(V,V);var F=p.projectPointOntoPlane(V,le);j.Cartesian2.subtract(F,g,F);var L=Y.CesiumMath.clamp(F.x/u.width,0,1),N=Y.CesiumMath.clamp(F.y/u.height,0,1);l&&(h[_+O]=L,h[_+1+O]=N),s&&(h[_]=L,h[_+1]=N),_+=2}if(t.normal||t.tangent||t.bitangent||o){var R=P+1,M=P+2;if(n){if(H+3<i){var S=j.Cartesian3.fromArray(a,H+3,re);if(I){var k=j.Cartesian3.fromArray(a,H+i,oe);d&&J(D,S,k,c),j.Cartesian3.subtract(S,D,S),j.Cartesian3.subtract(k,D,k),C=j.Cartesian3.normalize(j.Cartesian3.cross(k,S,C),C),I=!1}j.Cartesian3.equalsEpsilon(S,D,Y.CesiumMath.EPSILON10)&&(I=!0)}(t.tangent||t.bitangent)&&(w=c.geodeticSurfaceNormal(D,w),t.tangent&&(T=j.Cartesian3.normalize(j.Cartesian3.cross(w,C,T),T)))}else C=c.geodeticSurfaceNormal(D,C),(t.tangent||t.bitangent)&&(d&&(ae=j.Cartesian3.fromArray(m,P,ae),ie=j.Cartesian3.cross(j.Cartesian3.UNIT_Z,ae,ie),ie=j.Cartesian3.normalize(Q.Matrix3.multiplyByVector(x,ie,ie),ie),t.bitangent&&(ne=j.Cartesian3.normalize(j.Cartesian3.cross(ae,ie,ne),ne))),T=j.Cartesian3.cross(j.Cartesian3.UNIT_Z,C,T),T=j.Cartesian3.normalize(Q.Matrix3.multiplyByVector(x,T,T),T),t.bitangent&&(w=j.Cartesian3.normalize(j.Cartesian3.cross(C,T,w),w)));t.normal&&(e.wall?(m[P+G]=C.x,m[R+G]=C.y,m[M+G]=C.z):l&&(m[P+G]=-C.x,m[R+G]=-C.y,m[M+G]=-C.z),(s&&!d||n)&&(m[P]=C.x,m[R]=C.y,m[M]=C.z)),o&&(n&&(C=c.geodeticSurfaceNormal(D,C)),b[P+G]=-C.x,b[R+G]=-C.y,b[M+G]=-C.z),t.tangent&&(e.wall?(f[P+G]=T.x,f[R+G]=T.y,f[M+G]=T.z):l&&(f[P+G]=-T.x,f[R+G]=-T.y,f[M+G]=-T.z),s&&(d?(f[P]=ie.x,f[R]=ie.y,f[M]=ie.z):(f[P]=T.x,f[R]=T.y,f[M]=T.z))),t.bitangent&&(l&&(v[P+G]=w.x,v[R+G]=w.y,v[M+G]=w.z),s&&(d?(v[P]=ne.x,v[R]=ne.y,v[M]=ne.z):(v[P]=w.x,v[R]=w.y,v[M]=w.z))),P+=3}}t.st&&(r.attributes.st=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:h})),t.normal&&(r.attributes.normal=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:m})),t.tangent&&(r.attributes.tangent=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:f})),t.bitangent&&(r.attributes.bitangent=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:v})),o&&(r.attributes.extrudeDirection=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:b}))}if(e.extrude&&W.defined(e.offsetAttribute)){var B=a.length/3,z=new Uint8Array(B);if(e.offsetAttribute===Z.GeometryOffsetAttribute.TOP)s&&l||n?z=Z.arrayFill(z,1,0,B/2):s&&(z=Z.arrayFill(z,1));else{var U=e.offsetAttribute===Z.GeometryOffsetAttribute.NONE?0:1;z=Z.arrayFill(z,U)}r.attributes.applyOffset=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:z})}return r}var g=new j.Cartographic,m=new j.Cartographic,h={westOverIDL:0,eastOverIDL:0},f=new y.EllipsoidGeodesic;function _(e,t,r,o,a){if(a=W.defaultValue(a,new j.Rectangle),!W.defined(e)||e.length<3)return a.west=0,a.north=0,a.south=0,a.east=0,a;if(r===c.ArcType.RHUMB)return j.Rectangle.fromCartesianArray(e,t,a);f.ellipsoid.equals(t)||(f=new y.EllipsoidGeodesic(void 0,void 0,t)),a.west=Number.POSITIVE_INFINITY,a.east=Number.NEGATIVE_INFINITY,a.south=Number.POSITIVE_INFINITY,a.north=Number.NEGATIVE_INFINITY,h.westOverIDL=Number.POSITIVE_INFINITY,h.eastOverIDL=Number.NEGATIVE_INFINITY;for(var i,n=1/Y.CesiumMath.chordLength(o,t.maximumRadius),s=e.length,l=t.cartesianToCartographic(e[0],m),u=g,p=1;p<s;p++)i=u,u=l,l=t.cartesianToCartographic(e[p],i),f.setEndPoints(u,l),C(f,n,a,h);return i=u,u=l,l=t.cartesianToCartographic(e[0],i),f.setEndPoints(u,l),C(f,n,a,h),a.east-a.west>h.eastOverIDL-h.westOverIDL&&(a.west=h.westOverIDL,a.east=h.eastOverIDL,a.east>Y.CesiumMath.PI&&(a.east=a.east-Y.CesiumMath.TWO_PI),a.west>Y.CesiumMath.PI&&(a.west=a.west-Y.CesiumMath.TWO_PI)),a}var P=new j.Cartographic;function C(e,t,r,o){for(var a=e.surfaceDistance,i=Math.ceil(a*t),n=0<i?a/(i-1):Number.POSITIVE_INFINITY,s=0,l=0;l<i;l++){var u=e.interpolateUsingSurfaceDistance(s,P);s+=n;var p=u.longitude,c=u.latitude;r.west=Math.min(r.west,p),r.east=Math.max(r.east,p),r.south=Math.min(r.south,c),r.north=Math.max(r.north,c);var y=0<=p?p:p+Y.CesiumMath.TWO_PI;o.westOverIDL=Math.min(o.westOverIDL,y),o.eastOverIDL=Math.max(o.eastOverIDL,y)}}var O=[];function B(e,t,r,o,a,i,n,s,l){var u,p={walls:[]};if(i||n){var c,y,d=M.PolygonGeometryLibrary.createGeometryFromPositions(e,t,r,a,s,l),g=d.attributes.position.values,m=d.indices;if(i&&n){var h=g.concat(g);c=h.length/3,(y=F.IndexDatatype.createTypedArray(c,2*m.length)).set(m);var f=m.length,v=c/2;for(u=0;u<f;u+=3){var b=y[u]+v,_=y[u+1]+v,P=y[u+2]+v;y[u+f]=P,y[u+1+f]=_,y[u+2+f]=b}if(d.attributes.position.values=h,a&&s.normal){var C=d.attributes.normal.values;d.attributes.normal.values=new Float32Array(h.length),d.attributes.normal.values.set(C)}d.indices=y}else if(n){for(c=g.length/3,y=F.IndexDatatype.createTypedArray(c,m.length),u=0;u<m.length;u+=3)y[u]=m[u+2],y[u+1]=m[u+1],y[u+2]=m[u];d.indices=y}p.topAndBottom=new L.GeometryInstance({geometry:d})}var T=o.outerRing,w=N.EllipsoidTangentPlane.fromPoints(T,e),I=w.projectPointsOntoPlane(T,O),A=R.PolygonPipeline.computeWindingOrder2D(I);A===R.WindingOrder.CLOCKWISE&&(T=T.slice().reverse());var x=M.PolygonGeometryLibrary.computeWallGeometry(T,e,r,a,l);p.walls.push(new L.GeometryInstance({geometry:x}));var E=o.holes;for(u=0;u<E.length;u++){var G=E[u];I=(w=N.EllipsoidTangentPlane.fromPoints(G,e)).projectPointsOntoPlane(G,O),(A=R.PolygonPipeline.computeWindingOrder2D(I))===R.WindingOrder.COUNTER_CLOCKWISE&&(G=G.slice().reverse()),x=M.PolygonGeometryLibrary.computeWallGeometry(G,e,r,a,l),p.walls.push(new L.GeometryInstance({geometry:x}))}return p}function T(e){if(v.Check.typeOf.object("options",e),v.Check.typeOf.object("options.polygonHierarchy",e.polygonHierarchy),W.defined(e.perPositionHeight)&&e.perPositionHeight&&W.defined(e.height))throw new v.DeveloperError("Cannot use both options.perPositionHeight and options.height");if(W.defined(e.arcType)&&e.arcType!==c.ArcType.GEODESIC&&e.arcType!==c.ArcType.RHUMB)throw new v.DeveloperError("Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.");var t=e.polygonHierarchy,r=W.defaultValue(e.vertexFormat,b.VertexFormat.DEFAULT),o=W.defaultValue(e.ellipsoid,j.Ellipsoid.WGS84),a=W.defaultValue(e.granularity,Y.CesiumMath.RADIANS_PER_DEGREE),i=W.defaultValue(e.stRotation,0),n=W.defaultValue(e.perPositionHeight,!1),s=n&&W.defined(e.extrudedHeight),l=W.defaultValue(e.height,0),u=W.defaultValue(e.extrudedHeight,l);if(!s){var p=Math.max(l,u);u=Math.min(l,u),l=p}this._vertexFormat=b.VertexFormat.clone(r),this._ellipsoid=j.Ellipsoid.clone(o),this._granularity=a,this._stRotation=i,this._height=l,this._extrudedHeight=u,this._closeTop=W.defaultValue(e.closeTop,!0),this._closeBottom=W.defaultValue(e.closeBottom,!0),this._polygonHierarchy=t,this._perPositionHeight=n,this._perPositionHeightExtrude=s,this._shadowVolume=W.defaultValue(e.shadowVolume,!1),this._workerName="createPolygonGeometry",this._offsetAttribute=e.offsetAttribute,this._arcType=W.defaultValue(e.arcType,c.ArcType.GEODESIC),this._rectangle=void 0,this._textureCoordinateRotationPoints=void 0,this.packedLength=M.PolygonGeometryLibrary.computeHierarchyPackedLength(t)+j.Ellipsoid.packedLength+b.VertexFormat.packedLength+12}T.fromPositions=function(e){return e=W.defaultValue(e,W.defaultValue.EMPTY_OBJECT),v.Check.defined("options.positions",e.positions),new T({polygonHierarchy:{positions:e.positions},height:e.height,extrudedHeight:e.extrudedHeight,vertexFormat:e.vertexFormat,stRotation:e.stRotation,ellipsoid:e.ellipsoid,granularity:e.granularity,perPositionHeight:e.perPositionHeight,closeTop:e.closeTop,closeBottom:e.closeBottom,offsetAttribute:e.offsetAttribute,arcType:e.arcType})},T.pack=function(e,t,r){return v.Check.typeOf.object("value",e),v.Check.defined("array",t),r=W.defaultValue(r,0),r=M.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,r),j.Ellipsoid.pack(e._ellipsoid,t,r),r+=j.Ellipsoid.packedLength,b.VertexFormat.pack(e._vertexFormat,t,r),r+=b.VertexFormat.packedLength,t[r++]=e._height,t[r++]=e._extrudedHeight,t[r++]=e._granularity,t[r++]=e._stRotation,t[r++]=e._perPositionHeightExtrude?1:0,t[r++]=e._perPositionHeight?1:0,t[r++]=e._closeTop?1:0,t[r++]=e._closeBottom?1:0,t[r++]=e._shadowVolume?1:0,t[r++]=W.defaultValue(e._offsetAttribute,-1),t[r++]=e._arcType,t[r]=e.packedLength,t};var w=j.Ellipsoid.clone(j.Ellipsoid.UNIT_SPHERE),I=new b.VertexFormat,A={polygonHierarchy:{}};return T.unpack=function(e,t,r){v.Check.defined("array",e),t=W.defaultValue(t,0);var o=M.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=o.startingIndex,delete o.startingIndex;var a=j.Ellipsoid.unpack(e,t,w);t+=j.Ellipsoid.packedLength;var i=b.VertexFormat.unpack(e,t,I);t+=b.VertexFormat.packedLength;var n=e[t++],s=e[t++],l=e[t++],u=e[t++],p=1===e[t++],c=1===e[t++],y=1===e[t++],d=1===e[t++],g=1===e[t++],m=e[t++],h=e[t++],f=e[t];return W.defined(r)||(r=new T(A)),r._polygonHierarchy=o,r._ellipsoid=j.Ellipsoid.clone(a,r._ellipsoid),r._vertexFormat=b.VertexFormat.clone(i,r._vertexFormat),r._height=n,r._extrudedHeight=s,r._granularity=l,r._stRotation=u,r._perPositionHeightExtrude=p,r._perPositionHeight=c,r._closeTop=y,r._closeBottom=d,r._shadowVolume=g,r._offsetAttribute=-1===m?void 0:m,r._arcType=h,r.packedLength=f,r},T.computeRectangle=function(e,t){v.Check.typeOf.object("options",e),v.Check.typeOf.object("options.polygonHierarchy",e.polygonHierarchy);var r=W.defaultValue(e.granularity,Y.CesiumMath.RADIANS_PER_DEGREE),o=W.defaultValue(e.arcType,c.ArcType.GEODESIC);if(o!==c.ArcType.GEODESIC&&o!==c.ArcType.RHUMB)throw new v.DeveloperError("Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.");var a=e.polygonHierarchy,i=W.defaultValue(e.ellipsoid,j.Ellipsoid.WGS84);return _(a.positions,i,o,r,t)},T.createGeometry=function(e){var t=e._vertexFormat,r=e._ellipsoid,o=e._granularity,a=e._stRotation,i=e._polygonHierarchy,n=e._perPositionHeight,s=e._closeTop,l=e._closeBottom,u=e._arcType,p=i.positions;if(!(p.length<3)){var c=N.EllipsoidTangentPlane.fromPoints(p,r),y=M.PolygonGeometryLibrary.polygonsFromHierarchy(i,c.projectPointsOntoPlane.bind(c),!n,r),d=y.hierarchy,g=y.polygons;if(0!==d.length){p=d[0].outerRing;var m,h=M.PolygonGeometryLibrary.computeBoundingRectangle(c.plane.normal,c.projectPointOntoPlane.bind(c),p,a,S),f=[],v=e._height,b=e._extrudedHeight,_={perPositionHeight:n,vertexFormat:t,geometry:void 0,tangentPlane:c,boundingRectangle:h,ellipsoid:r,stRotation:a,bottom:!1,top:!0,wall:!1,extrude:!1,arcType:u};if(e._perPositionHeightExtrude||!Y.CesiumMath.equalsEpsilon(v,b,0,Y.CesiumMath.EPSILON2))for(_.extrude=!0,_.top=s,_.bottom=l,_.shadowVolume=e._shadowVolume,_.offsetAttribute=e._offsetAttribute,m=0;m<g.length;m++){var P,C=B(r,g[m],o,d[m],n,s,l,t,u);s&&l?(P=C.topAndBottom,_.geometry=M.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(P.geometry,v,b,r,n)):s?((P=C.topAndBottom).geometry.attributes.position.values=R.PolygonPipeline.scaleToGeodeticHeight(P.geometry.attributes.position.values,v,r,!n),_.geometry=P.geometry):l&&((P=C.topAndBottom).geometry.attributes.position.values=R.PolygonPipeline.scaleToGeodeticHeight(P.geometry.attributes.position.values,b,r,!0),_.geometry=P.geometry),(s||l)&&(_.wall=!1,P.geometry=k(_),f.push(P));var T=C.walls;_.wall=!0;for(var w=0;w<T.length;w++){var I=T[w];_.geometry=M.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(I.geometry,v,b,r,n),I.geometry=k(_),f.push(I)}}else for(m=0;m<g.length;m++){var A=new L.GeometryInstance({geometry:M.PolygonGeometryLibrary.createGeometryFromPositions(r,g[m],o,n,t,u)});if(A.geometry.attributes.position.values=R.PolygonPipeline.scaleToGeodeticHeight(A.geometry.attributes.position.values,v,r,!n),_.geometry=A.geometry,A.geometry=k(_),W.defined(e._offsetAttribute)){var x=A.geometry.attributes.position.values.length,E=new Uint8Array(x/3),G=e._offsetAttribute===Z.GeometryOffsetAttribute.NONE?0:1;Z.arrayFill(E,G),A.geometry.attributes.applyOffset=new K.GeometryAttribute({componentDatatype:q.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:E})}f.push(A)}var O=V.GeometryPipeline.combineInstances(f)[0];O.attributes.position.values=new Float64Array(O.attributes.position.values),O.indices=F.IndexDatatype.createTypedArray(O.attributes.position.values.length/3,O.indices);var H=O.attributes,D=Q.BoundingSphere.fromVertices(H.position.values);return t.position||delete H.position,new K.Geometry({attributes:H,indices:O.indices,primitiveType:O.primitiveType,boundingSphere:D,offsetAttribute:e._offsetAttribute})}}},T.createShadowVolume=function(e,t,r){var o=e._granularity,a=e._ellipsoid,i=t(o,a),n=r(o,a);return new T({polygonHierarchy:e._polygonHierarchy,ellipsoid:a,stRotation:e._stRotation,granularity:o,perPositionHeight:!1,extrudedHeight:i,height:n,vertexFormat:b.VertexFormat.POSITION_ONLY,shadowVolume:!0,arcType:e._arcType})},Object.defineProperties(T.prototype,{rectangle:{get:function(){if(!W.defined(this._rectangle)){var e=this._polygonHierarchy.positions;this._rectangle=_(e,this._ellipsoid,this._arcType,this._granularity)}return this._rectangle}},textureCoordinateRotationPoints:{get:function(){return W.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(e){var t=-e._stRotation;if(0==t)return[0,0,0,1,1,0];var r=e._ellipsoid,o=e._polygonHierarchy.positions,a=e.rectangle;return K.Geometry._textureCoordinateRotationPoints(o,t,r,a)}(this)),this._textureCoordinateRotationPoints}}}),function(e,t){return W.defined(t)&&(e=T.unpack(e,t)),e._ellipsoid=j.Ellipsoid.clone(e._ellipsoid),T.createGeometry(e)}});
