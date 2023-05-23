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
define(["./when-a55a8a4c","./Check-bc1d37d9","./Math-d7cbfcf6","./Cartesian2-6ec3db89","./Transforms-a4d7073e","./RuntimeError-7c184ac0","./WebGLConstants-4c11ee5f","./ComponentDatatype-919a7463","./GeometryAttribute-291ff23b","./GeometryAttributes-1c7ce91d","./AttributeCompression-6cfb9427","./GeometryPipeline-9b42374e","./EncodedCartesian3-5ad054af","./IndexDatatype-4351ba4c","./IntersectionTests-3d9e1b94","./Plane-37b84dad","./VertexFormat-7f136973","./arrayRemoveDuplicates-69403a22","./BoundingRectangle-e7351c16","./EllipsoidTangentPlane-323c7a98","./EllipsoidRhumbLine-4d1a57d2","./PolygonPipeline-5b0d203a","./PolylineVolumeGeometryLibrary-41894c8d","./EllipsoidGeodesic-365e69f7","./PolylinePipeline-83c8909c"],function(u,c,n,g,T,e,t,G,A,R,r,I,i,O,o,a,y,l,s,d,p,S,h,m,f){"use strict";var v={};function q(e,t){if(!u.defined(e))throw new c.DeveloperError("identifier is required.");u.defined(v[e])||(v[e]=!0,console.warn(u.defaultValue(t,e)))}function b(e){var t=(e=u.defaultValue(e,u.defaultValue.EMPTY_OBJECT)).polylinePositions,r=e.shapePositions;if(!u.defined(t))throw new c.DeveloperError("options.polylinePositions is required.");if(!u.defined(r))throw new c.DeveloperError("options.shapePositions is required.");this._positions=t,this._shape=r,this._ellipsoid=g.Ellipsoid.clone(u.defaultValue(e.ellipsoid,g.Ellipsoid.WGS84)),this._cornerType=u.defaultValue(e.cornerType,h.CornerType.ROUNDED),this._vertexFormat=y.VertexFormat.clone(u.defaultValue(e.vertexFormat,y.VertexFormat.DEFAULT)),this._granularity=u.defaultValue(e.granularity,n.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeGeometry";var i=1+t.length*g.Cartesian3.packedLength;i+=1+r.length*g.Cartesian2.packedLength,this.packedLength=i+g.Ellipsoid.packedLength+y.VertexFormat.packedLength+2}q.geometryOutlines="Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.",q.geometryZIndex="Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored",q.geometryHeightReference="Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored",q.geometryExtrudedHeightReference="Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored",b.pack=function(e,t,r){if(!u.defined(e))throw new c.DeveloperError("value is required");if(!u.defined(t))throw new c.DeveloperError("array is required");var i;r=u.defaultValue(r,0);var n=e._positions,o=n.length;for(t[r++]=o,i=0;i<o;++i,r+=g.Cartesian3.packedLength)g.Cartesian3.pack(n[i],t,r);var a=e._shape;for(o=a.length,t[r++]=o,i=0;i<o;++i,r+=g.Cartesian2.packedLength)g.Cartesian2.pack(a[i],t,r);return g.Ellipsoid.pack(e._ellipsoid,t,r),r+=g.Ellipsoid.packedLength,y.VertexFormat.pack(e._vertexFormat,t,r),r+=y.VertexFormat.packedLength,t[r++]=e._cornerType,t[r]=e._granularity,t};var E=g.Ellipsoid.clone(g.Ellipsoid.UNIT_SPHERE),w=new y.VertexFormat,P={polylinePositions:void 0,shapePositions:void 0,ellipsoid:E,vertexFormat:w,cornerType:void 0,granularity:void 0};b.unpack=function(e,t,r){if(!u.defined(e))throw new c.DeveloperError("array is required");var i;t=u.defaultValue(t,0);var n=e[t++],o=new Array(n);for(i=0;i<n;++i,t+=g.Cartesian3.packedLength)o[i]=g.Cartesian3.unpack(e,t);n=e[t++];var a=new Array(n);for(i=0;i<n;++i,t+=g.Cartesian2.packedLength)a[i]=g.Cartesian2.unpack(e,t);var l=g.Ellipsoid.unpack(e,t,E);t+=g.Ellipsoid.packedLength;var s=y.VertexFormat.unpack(e,t,w);t+=y.VertexFormat.packedLength;var d=e[t++],p=e[t];return u.defined(r)?(r._positions=o,r._shape=a,r._ellipsoid=g.Ellipsoid.clone(l,r._ellipsoid),r._vertexFormat=y.VertexFormat.clone(s,r._vertexFormat),r._cornerType=d,r._granularity=p,r):(P.polylinePositions=o,P.shapePositions=a,P.cornerType=d,P.granularity=p,new b(P))};var _=new s.BoundingRectangle;return b.createGeometry=function(e){var t=e._positions,r=l.arrayRemoveDuplicates(t,g.Cartesian3.equalsEpsilon),i=e._shape;if(i=h.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(i),!(r.length<2||i.length<3)){S.PolygonPipeline.computeWindingOrder2D(i)===S.WindingOrder.CLOCKWISE&&i.reverse();var n=s.BoundingRectangle.fromPoints(i,_);return function(e,t,r,i){var n=new R.GeometryAttributes;i.position&&(n.position=new A.GeometryAttribute({componentDatatype:G.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e}));var o,a,l,s,d,p,u=t.length,c=e.length/3,g=(c-2*u)/(2*u),y=S.PolygonPipeline.triangulate(t),h=(g-1)*u*6+2*y.length,m=O.IndexDatatype.createTypedArray(c,h),f=2*u,v=0;for(o=0;o<g-1;o++){for(a=0;a<u-1;a++)p=(l=2*a+o*u*2)+f,d=(s=l+1)+f,m[v++]=s,m[v++]=l,m[v++]=d,m[v++]=d,m[v++]=l,m[v++]=p;d=(s=(l=2*u-2+o*u*2)+1)+f,p=l+f,m[v++]=s,m[v++]=l,m[v++]=d,m[v++]=d,m[v++]=l,m[v++]=p}if(i.st||i.tangent||i.bitangent){var b,E,w=new Float32Array(2*c),P=1/(g-1),_=1/r.height,x=r.height/2,k=0;for(o=0;o<g;o++){for(b=o*P,E=_*(t[0].y+x),w[k++]=b,w[k++]=E,a=1;a<u;a++)E=_*(t[a].y+x),w[k++]=b,w[k++]=E,w[k++]=b,w[k++]=E;E=_*(t[0].y+x),w[k++]=b,w[k++]=E}for(a=0;a<u;a++)b=0,E=_*(t[a].y+x),w[k++]=b,w[k++]=E;for(a=0;a<u;a++)b=(g-1)*P,E=_*(t[a].y+x),w[k++]=b,w[k++]=E;n.st=new A.GeometryAttribute({componentDatatype:G.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:new Float32Array(w)})}var C=c-2*u;for(o=0;o<y.length;o+=3){var V=y[o]+C,D=y[o+1]+C,L=y[o+2]+C;m[v++]=V,m[v++]=D,m[v++]=L,m[v++]=L+u,m[v++]=D+u,m[v++]=V+u}var F=new A.Geometry({attributes:n,indices:m,boundingSphere:T.BoundingSphere.fromVertices(e),primitiveType:A.PrimitiveType.TRIANGLES});if(i.normal&&(F=I.GeometryPipeline.computeNormal(F)),i.tangent||i.bitangent){try{F=I.GeometryPipeline.computeTangentAndBitangent(F)}catch(e){q("polyline-volume-tangent-bitangent","Unable to compute tangents and bitangents for polyline volume geometry")}i.tangent||(F.attributes.tangent=void 0),i.bitangent||(F.attributes.bitangent=void 0),i.st||(F.attributes.st=void 0)}return F}(h.PolylineVolumeGeometryLibrary.computePositions(r,i,n,e,!0),i,n,e._vertexFormat)}},function(e,t){return u.defined(t)&&(e=b.unpack(e,t)),e._ellipsoid=g.Ellipsoid.clone(e._ellipsoid),b.createGeometry(e)}});
