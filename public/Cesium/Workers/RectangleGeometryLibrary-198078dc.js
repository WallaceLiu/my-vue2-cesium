define(["exports","./Cartesian2-8646c5a1","./when-54335d57","./Check-24483042","./Transforms-f88f3a93","./Math-d6182036","./GeometryAttribute-8c0281a6"],function(t,X,d,n,a,Y,l){"use strict";var w=Math.cos,M=Math.sin,m=Math.sqrt,r={computePosition:function(t,n,a,r,e,o,s){var i=n.radiiSquared,g=t.nwCorner,h=t.boundingRectangle,u=g.latitude-t.granYCos*r+e*t.granXSin,c=w(u),C=M(u),l=i.z*C,S=g.longitude+r*t.granYSin+e*t.granXCos,n=c*w(S),g=c*M(S),c=i.x*n,i=i.y*g,C=m(c*n+i*g+l*C);o.x=c/C,o.y=i/C,o.z=l/C,a&&(a=t.stNwCorner,d.defined(a)?(u=a.latitude-t.stGranYCos*r+e*t.stGranXSin,S=a.longitude+r*t.stGranYSin+e*t.stGranXCos,s.x=(S-t.stWest)*t.lonScalar,s.y=(u-t.stSouth)*t.latScalar):(s.x=(S-h.west)*t.lonScalar,s.y=(u-h.south)*t.latScalar))}},S=new l.Matrix2,p=new X.Cartesian3,G=new X.Cartographic,f=new X.Cartesian3,x=new a.GeographicProjection;function R(t,n,a,r,e,o,s){var i=Math.cos(n),g=r*i,h=a*i,u=Math.sin(n),c=r*u,C=a*u;p=x.project(t,p),p=X.Cartesian3.subtract(p,f,p);i=l.Matrix2.fromRotation(n,S);p=l.Matrix2.multiplyByVector(i,p,p),p=X.Cartesian3.add(p,f,p);r=(t=x.unproject(p,t)).latitude,a=r+--o*C,u=r-g*--s,n=r-g*s+o*C,i=Math.max(r,a,u,n),r=Math.min(r,a,u,n),a=t.longitude,u=a+o*h,n=a+s*c,o=a+s*c+o*h;return{north:i,south:r,east:Math.max(a,u,n,o),west:Math.min(a,u,n,o),granYCos:g,granYSin:c,granXCos:h,granXSin:C,nwCorner:t}}r.computeOptions=function(t,n,a,r,e,o,s){var i=t.east,g=t.west,h=t.north,u=t.south,c=!1,C=!1;h===Y.CesiumMath.PI_OVER_TWO&&(c=!0),u===-Y.CesiumMath.PI_OVER_TWO&&(C=!0);var l,S=h-u,d=(w=i<g?Y.CesiumMath.TWO_PI-g+i:i-g)/((l=Math.ceil(w/n)+1)-1),w=S/((M=Math.ceil(S/n)+1)-1),S=X.Rectangle.northwest(t,o),n=X.Rectangle.center(t,G);0===a&&0===r||(n.longitude<S.longitude&&(n.longitude+=Y.CesiumMath.TWO_PI),f=x.project(n,f));var M,o=w,n=d,e=X.Rectangle.clone(t,e),C={granYCos:o,granYSin:0,granXCos:n,granXSin:0,nwCorner:S,boundingRectangle:e,width:l,height:M,northCap:c,southCap:C};return 0!==a&&(h=(S=R(S,a,d,w,0,l,M)).north,u=S.south,i=S.east,g=S.west,C.granYCos=S.granYCos,C.granYSin=S.granYSin,C.granXCos=S.granXCos,C.granXSin=S.granXSin,e.north=h,e.south=u,e.east=i,e.west=g),0!==r&&(a-=r,M=R(s=X.Rectangle.northwest(e,s),a,d,w,0,l,M),C.stGranYCos=M.granYCos,C.stGranXCos=M.granXCos,C.stGranYSin=M.granYSin,C.stGranXSin=M.granXSin,C.stNwCorner=s,C.stWest=M.west,C.stSouth=M.south),C},t.RectangleGeometryLibrary=r});
