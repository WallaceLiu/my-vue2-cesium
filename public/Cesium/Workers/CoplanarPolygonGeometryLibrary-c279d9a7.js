define(["exports","./Cartesian2-08065eec","./Check-be2d5acb","./Transforms-475655a6","./OrientedBoundingBox-4a03a74e"],function(n,d,e,l,f){"use strict";var t={},i=new d.Cartesian3,x=new d.Cartesian3,B=new d.Cartesian3,P=new d.Cartesian3,M=new f.OrientedBoundingBox;function o(n,e,t,a,r){e=d.Cartesian3.subtract(n,e,i),t=d.Cartesian3.dot(t,e),e=d.Cartesian3.dot(a,e);return d.Cartesian2.fromElements(t,e,r)}t.validOutline=function(n){var e=f.OrientedBoundingBox.fromPoints(n,M).halfAxes,t=l.Matrix3.getColumn(e,0,x),n=l.Matrix3.getColumn(e,1,B),e=l.Matrix3.getColumn(e,2,P),t=d.Cartesian3.magnitude(t),n=d.Cartesian3.magnitude(n),e=d.Cartesian3.magnitude(e);return!(0===t&&(0===n||0===e)||0===n&&0===e)},t.computeProjectTo2DArguments=function(n,e,t,a){var r,i,o=f.OrientedBoundingBox.fromPoints(n,M),u=o.halfAxes,s=l.Matrix3.getColumn(u,0,x),C=l.Matrix3.getColumn(u,1,B),c=l.Matrix3.getColumn(u,2,P),m=d.Cartesian3.magnitude(s),g=d.Cartesian3.magnitude(C),n=d.Cartesian3.magnitude(c),u=Math.min(m,g,n);return(0!==m||0!==g&&0!==n)&&(0!==g||0!==n)&&(u!==g&&u!==n||(r=s),u===m?r=C:u===n&&(i=C),u!==m&&u!==g||(i=c),d.Cartesian3.normalize(r,t),d.Cartesian3.normalize(i,a),d.Cartesian3.clone(o.center,e),!0)},t.createProjectPointsTo2DFunction=function(a,r,i){return function(n){for(var e=new Array(n.length),t=0;t<n.length;t++)e[t]=o(n[t],a,r,i);return e}},t.createProjectPointTo2DFunction=function(t,a,r){return function(n,e){return o(n,t,a,r,e)}},n.CoplanarPolygonGeometryLibrary=t});
