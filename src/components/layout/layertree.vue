<template>
  <div class="layertree">
    <span
      style="
        font-size: 18px;
        font-family: myFirstFont;
        font-weight: bold;
        padding: 10px;
      "
      >图层管理</span
    >
    <hr />
    <Tree
      ref="tree"
      :data="data"
      show-checkbox
      @on-check-change="checkChange"
      @on-select-change="selectChange"
      class="tree-content"
    ></Tree>
  </div>
</template>
<script>
import Bus from "@/utils/Bus.js";
import elTree2 from "./tree/src/tree.vue";
import axios from "axios";
import URL from "@/utils/Url.config.js";
import LM from "./layermanager.js";
import POIimg from "./poi-image.js";

var layersData = {};
var entitiesData = {};
var geojsonData = {};
var tilesetArray = {};
var primitiveData = {};
var primitiveDataID = {};
var heatMapData = [];

var terrainProvider = null;
var poiPositions = [];
var centerArr = [];
var extent = {};
var maxZoom = 14;
var poiShow = true;
var timestamp = 0;
var labelDataSource = null;
var entities,
  centerArr = [],
  entityHeights = [];
var colorListJIBIE = [
  Cesium.Color.RED,
  Cesium.Color.ORANGERED,
  Cesium.Color.ORANGE,
  Cesium.Color.YELLOW,
  Cesium.Color.YELLOWGREEN,
  Cesium.Color.SKYBLUE,
];

export default {
  components: {
    elTree2,
  },
  data() {
    return {
      filterText: "",
      data: [
        {
          id: "0",
          title: "基础图层",
          expand: true,
          disableCheckbox: true,
          children: [
            {
              id: "0_1",
              title: "全球行政区划",
              checked: false,
              isLayer: true,
            },
            {
              id: "0_2",
              title: "全球地名注记",
              checked: false,
              isLayer: true,
            },
          ],
        },
        {
          id: "1",
          title: "基础数据",
          expand: true,
          disableCheckbox: true,
          children: [
            {
              id: "1_3",
              title: "三维建筑白膜",
              checked: false,
              isB3DM: true,
              isLayer: true,
            },
          ],
        },
        {
          id: "2",
          title: "三维模型",
          expand: true,
          disableCheckbox: true,
          children: [
            {
              id: "2_1",
              title: "distributionBox",
              checked: false,
              isGLTF: true,
            },
            {
              id: "2_2",
              title: "House01",
              checked: false,
              isGLTF: true,
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      alreadylist: [], // 已经处理好的数据
    };
  },
  mounted() {
    this.$nextTick((res) => {
      // this.initXglobeFolder();
      this.initChecked();
    });
    //maximumScreenSpaceError 越小越清晰
    Bus.$on("message1", (val) => {
      this.value = val;
      var value1 = 16 - val * 0.16;
      // console.log(value1);
      for (const key in tilesetArray) {
        if (Object.hasOwnProperty.call(tilesetArray, key)) {
          const element = tilesetArray[key];
          element.maximumScreenSpaceError = value1;
        }
      }
    });
    //maximumMemoryUsage 内存大小
    Bus.$on("message2", (val) => {
      this.value = val;
      var value2 = val * 102.4;
      // console.log(value2);
      for (const key in tilesetArray) {
        if (Object.hasOwnProperty.call(tilesetArray, key)) {
          const element = tilesetArray[key];
          element.maximumMemoryUsage = value2;
        }
      }
    });

    //progressiveResolutionHeightFraction 0-0.5
    Bus.$on("message3", (val) => {
      this.value = val;
      var value3 = val * 0.005;
      // console.log(value3);
      for (const key in tilesetArray) {
        if (Object.hasOwnProperty.call(tilesetArray, key)) {
          const element = tilesetArray[key];
          element.progressiveResolutionHeightFraction = value3;
        }
      }
    });
    //cullRequestsWhileMovingMultiplie   移动时用于剔除请求的乘数。较大的代表更积极的剔除，较小的代表较不积极的剔除。
    Bus.$on("message9", (val) => {
      this.value = val;
      var value9 = val;
      // console.log(value9);
      for (const key in tilesetArray) {
        if (Object.hasOwnProperty.call(tilesetArray, key)) {
          const element = tilesetArray[key];
          element.progressiveResolutionHeightFraction = value9;
        }
      }
    });
    //dynamicScreenSpaceError   减少离相机较远的图块的屏幕空间错误。
    Bus.$on("message4", (val) => {
      this.value = val;
      var value4 = val;
      // console.log(value4);
      for (const key in tilesetArray) {
        if (Object.hasOwnProperty.call(tilesetArray, key)) {
          const element = tilesetArray[key];
          element.dynamicScreenSpaceError = value4;
        }
      }
    });
    //loadSiblings   减少离相机较远的图块的屏幕空间错误。
    Bus.$on("message5", (val) => {
      this.value = val;
      var value5 = val;
      // console.log(value5);
      for (const key in tilesetArray) {
        if (Object.hasOwnProperty.call(tilesetArray, key)) {
          const element = tilesetArray[key];
          element.loadSiblings = value5;
        }
      }
    });
    //cullWithChildrenBounds   减少离相机较远的图块的屏幕空间错误。
    Bus.$on("message6", (val) => {
      this.value = val;
      var value6 = val;
      // console.log(value6);
      for (const key in tilesetArray) {
        if (Object.hasOwnProperty.call(tilesetArray, key)) {
          const element = tilesetArray[key];
          element.cullWithChildrenBounds = value6;
        }
      }
    });
    //cullRequestsWhileMoving   减少离相机较远的图块的屏幕空间错误。
    Bus.$on("message7", (val) => {
      this.value = val;
      var value7 = val;
      // console.log(value7);
      for (const key in tilesetArray) {
        if (Object.hasOwnProperty.call(tilesetArray, key)) {
          const element = tilesetArray[key];
          element.cullRequestsWhileMoving = value7;
        }
      }
    });
    //preloadWhenHidden   减少离相机较远的图块的屏幕空间错误。
    Bus.$on("message8", (val) => {
      this.value = val;
      var value8 = val;
      // console.log(value8);
      for (const key in tilesetArray) {
        if (Object.hasOwnProperty.call(tilesetArray, key)) {
          const element = tilesetArray[key];
          element.preloadWhenHidden = value8;
        }
      }
    });
  },
  methods: {
    //
    initChecked() {
      var nodes = this.$refs.tree.getCheckedNodes();
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.children == undefined || node.children.length == 0) {
          if (node.isLayer) this.addLayerData(node);
        }
      }
    },
    //
    async selectChange(tree, selectedItem) {
      selectedItem.selected = !selectedItem.selected;
    },
    //
    async checkChange(tree, selectedItem) {
      var show = false;
      if (selectedItem.checked == true) {
        show = true;
      }

      if (selectedItem.isLayer == true) {
        // layer图层
        if (show) {
          this.addLayerData(selectedItem);
        } else {
          this.removeLayerData(selectedItem);
        }
      } else if (selectedItem.isEntity == true) {
        // entity数据
        if (show) {
          this.addEntityData(selectedItem);
        } else {
          this.removeEntityData(selectedItem);
        }
      } else if (selectedItem.isGeojson == true) {
        // geojson数据
        if (show) {
          this.addGeoJsonData(selectedItem);
        } else {
          this.removeGeoJsonData(selectedItem);
        }
      } else if (selectedItem.isB3DM == true) {
        if (show) {
          this.addB3DMData(selectedItem);
        } else {
          this.removeB3DMData(selectedItem);
        }
      }

      if ((selectedItem.id = "2_1")) {
        // var origin = Cesium.Cartesian3.fromDegrees(-120, 44.0, 0);
        // // 创建一个本地的东北向上坐标系，其原点为经度-120度，纬度44.0度。
        // // 可以随时更改模型的modelMatrix属性以移动或旋转模型。
        // var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin);
        // var model = viewer.scene.primitives.add(
        //   Cesium.Model.fromGltf({
        //     url: "/simpledata/power/distributionBox.gltf",
        //     modelMatrix: modelMatrix,
        //     minimumPixelSize: 128,
        //     maximumScale: 20000,
        //   })
        // );
        // model.readyPromise.then(function (model) {
        //   // Play all animations when the model is ready to render
        //   model.activeAnimations.addAll();
        //   // model.activeAnimations.addAll({
        //   //   // type:ModelAnimationLoop
        //   //   // NONE 只播放一次；REPEAT 从头开始循环播放；MIRRORED_REPEAT 首先，将其向前播放，然后反向播放，然后向前播放
        //   //   loop: Cesium.ModelAnimationLoop.REPEAT, // 循环播放动画
        //   // });
        // });

        // viewer.zoomTo(viewer.entities);
        const position = Cesium.Cartesian3.fromDegrees(
          -123.0744619,
          44.0503706,
          0
        );
        const heading = Cesium.Math.toRadians(135);
        const pitch = 0;
        const roll = 0;
        const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        const orientation = Cesium.Transforms.headingPitchRollQuaternion(
          position,
          hpr
        );
        const url="/simpledata/power/distributionBox.gltf"

        const entity = viewer.entities.add({
          name: url,
          position: position,
          orientation: orientation,
          model: {
            uri: url,
            minimumPixelSize: 128,
            maximumScale: 20000,
          },
        });
        viewer.trackedEntity = entity;
      }
    },
    //
    addLayerData(data) {
      if (data.title == "全球行政区划") {
        //加载天地图全球行政区划数据
        var provider = new Cesium.WebMapTileServiceImageryProvider({
          url: "http://t0.tianditu.com/ibo_w/wmts?service=wmts&tk=2a2c5ce64b61343727085b76c46d7ad3&request=GetTile&version=1.0.0&LAYER=ibo&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
          layer: "tiandituImgQH",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "tiandituImgQH",
          maximumLevel: 16,
        });
        layersData[data.title] =
          viewer.imageryLayers.addImageryProvider(provider);
      } else if (data.title == "全球地名注记") {
        //加载天地图全球地名注记数据
        var provider = new Cesium.WebMapTileServiceImageryProvider({
          url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&tk=2a2c5ce64b61343727085b76c46d7ad3&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
          layer: "tiandituImgMarker",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "tiandituImgMarker",
          maximumLevel: 16,
        });
        layersData[data.title] =
          viewer.imageryLayers.addImageryProvider(provider);
      } else if (data.title == "三维建筑白膜") {
        // const tileset = new Cesium.Cesium3DTileset({
        //   url: "/simpledata/3dtiles/qx-dyt/tileset.json", // 带网络属性模板
        //   maximumScreenSpaceError: 1, // Temporary workaround for low memory mobile devices - Increase maximum error to 8.
        //   maximumNumberOfLoadedTiles: 1000, // Temporary workaround for low memory mobile devices - Decrease (disable) tile cache.
        //   position: { alt: 452.9 },
        //   center: {
        //     lat: 34.216894,
        //     lng: 108.959834,
        //     alt: 591,
        //     heading: 4,
        //     pitch: -37,
        //   },
        //   show: true,
        // });
        // viewer.scene.primitives.add(tileset);
        // viewer.flyTo(tileset);
        alert("三维建筑白膜");
      }
    },
    removeLayerData(data) {
      if (layersData.hasOwnProperty(data.title)) {
        viewer.imageryLayers.remove(layersData[data.title]);
        delete layersData[data.title];
        this.removeLegend(data);
      }
    },
    //
    addEntityData(data) {
      if (data.title == "视频监控点") {
        entitiesData[data.title] = [];
        var entity = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(
            115.99325324373922,
            29.709743124163676
          ),
          billboard: {
            image: "/symbol/sp2.png",
            width: 25,
            height: 25,
          },
          label: {
            text: "视频监控点1",
            fillColor: Cesium.Color.WHITE,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            outlineColor: Cesium.Color.RED,
            font: "32px sans-serif",
            scale: 0.5,
            pixelOffset: new Cesium.Cartesian2(0.0, 24),
          },
          isVideo: true,
        });
        entitiesData[data.title].push(entity);
        viewer.zoomTo(viewer.entities);
      }
    },
    removeEntityData(data) {
      var entities = entitiesData[data.title];
      for (var i = 0; i < entities.length; i++) {
        viewer.entities.remove(entities[i]);
      }
      entitiesData[data.title] = [];
    },
    //
    async addGeoJsonData(data) {
      if (data.title == "武汉市建筑") {
        var node = this.data[1].children;
        node.splice(3, 1, {
          title: data.title,
          checked: true,
          loading: true,
          expand: false,
          isGeojson: true,
        });
        var _this = this;
        axios
          .get(
            URL.geoserver +
              "/jiujiang/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=jiujiang:buildings&outputFormat=application%2Fjson"
          )
          .then((res) => {
            var geojson = res.data;
            var promise = Cesium.GeoJsonDataSource.load(geojson, {
              // camera: viewer.scene.camera,
              // canvas: viewer.scene.canvas,
              clampToGround: true, //开启贴地
            });
            promise.then(function (dataSource) {
              viewer.dataSources.add(dataSource);
              entities = dataSource.entities.values;
              var colorHash = {};

              for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var name = entity.name;
                var color = colorHash[name];
                if (!color) {
                  (color = Cesium.Color.WHITESMOKE), (colorHash[name] = color);
                }
                entity.polygon.material = color;
                entity.polygon.outline = false;
                if (
                  viewer.terrainProvider instanceof
                  Cesium.EllipsoidTerrainProvider
                ) {
                  var _entity = entities[i];
                  _entity.polygon.extrudedHeight =
                    _entity.properties._Height._value;
                } else {
                  if (entityHeights.length == 0) {
                    let reslutArr = Cesium.sampleTerrain(
                      viewer.terrainProvider,
                      11,
                      centerArr
                    );
                    console.log(reslutArr);
                    entityHeights = reslutArr.map((item) => item.height);
                  }
                  var _entity = entities[i];
                  _entity.polygon.extrudedHeight =
                    entityHeights[i] + _entity.properties._Height._value;
                }
                // entity.polygon.extrudedHeight =entities[i].properties._Height._value;

                //100
                entity.polygon.classificationType =
                  Cesium.ClassificationType.TERRAIN;
                entity.isBuilding = true;
                entity.polygon.HeightReference =
                  Cesium.HeightReference.RELATIVE_TO_GROUND;

                var polyPositions = entity.polygon.hierarchy.getValue(
                  Cesium.JulianDate.now()
                ).positions;

                var polyCenter =
                  Cesium.BoundingSphere.fromPoints(polyPositions).center;

                polyCenter =
                  Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);

                let radisCenter = Cesium.Cartographic.fromCartesian(polyCenter);
                centerArr.push(radisCenter);
              }

              geojsonData[data.title] = dataSource;
              viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(
                  115.97490185882842,
                  29.548049889252916,
                  1295.1897647603191
                ),
                orientation: {
                  heading: 6.265754591474925,
                  pitch: -0.5557482988479676,
                  roll: 6.283126174105142,
                },
              });
            });
          });
      } else if (data.title == "视频监控点") {
        axios
          .get(
            URL.geoserver +
              "/jiujiang/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=jiujiang:shipin&outputFormat=application%2Fjson"
          )
          .then((res) => {
            var geojson = res.data;
            var promise = Cesium.GeoJsonDataSource.load(geojson, {
              camera: viewer.scene.camera,
              canvas: viewer.scene.canvas,
              clampToGround: true, //开启贴地
            });
            promise.then(function (dataSource) {
              viewer.dataSources.add(dataSource);
              entities = dataSource.entities.values;
              var colorHash = {};
              for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var name = entity.name;
                var color = colorHash[name];
                if (!color) {
                  (color = Cesium.Color.WHITESMOKE), (colorHash[name] = color);
                }
                entity.polygon.material = color;
                entity.polygon.outline = false;

                entity.polygon.extrudedHeight =
                  entities[i].properties._Height._value;
                //  _entity.polygon.extrudedHeight =entityHeights[i]+_entity.properties._Height._value;
                //100
                entity.polygon.HeightReference =
                  Cesium.HeightReference.RELATIVE_TO_GROUND;
                var polyPositions = entity.polygon.hierarchy.getValue(
                  Cesium.JulianDate.now()
                ).positions;
                var polyCenter =
                  Cesium.BoundingSphere.fromPoints(polyPositions).center;
                polyCenter =
                  Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                let radisCenter = Cesium.Cartographic.fromCartesian(polyCenter);
                centerArr.push(radisCenter);
              }
              geojsonData[data.title] = dataSource;
            });
          });
      }
    },
    removeGeoJsonData(data) {
      if (geojsonData.hasOwnProperty(data.title)) {
        geojsonData[data.title].entities.removeAll();
      }
      if (data.title == "武汉市建筑") {
        Bus.$emit("bubble-close", true);
      }
      if (data.title == "视频监控点") {
        Bus.$emit("videoplayer-close", true);
      }
    },
    //
    addB3DMData(data) {
      if (data.title == "火车站") {
        viewer.camera.flyTo({
          destination: new Cesium.Cartesian3(
            -2431179.055395176,
            4985231.950452045,
            3140798.948112879
          ),
          orientation: {
            heading: 0.2999333741265531,
            pitch: -0.5003978223079484,
            roll: 6.283184870079847,
          },
        });
        var tileset = new Cesium.Cesium3DTileset({
          url: URL.tomcat + "/huochezhan/tileset.json",
          maximumScreenSpaceError: 2, //越小越清晰，向下加载瓦片
          maximumMemoryUsage: 4096, //允许使用的最大内存（M）
          dynamicScreenSpaceError: true, //允许动态调节屏幕误差
          progressiveResolutionHeightFraction: 0.2, //取值（0-0.5）
          loadSiblings: true, //加载临近节点
          cullWithChildrenBounds: false,
          cullRequestsWhileMoving: true, // 相机移动不剔除瓦片
          cullRequestsWhileMovingMultiplier: 1,
          preloadWhenHidden: true, //预加载
        });
        var heightoff = -140;
        tilesetArray[data.title] = tileset;
        tileset.readyPromise
          .then(function (tileset) {
            viewer.scene.primitives.add(tileset);
            var cartographic = Cesium.Cartographic.fromCartesian(
              tileset.boundingSphere.center
            );
            var surface = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              0.0
            );
            var offset = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              heightoff
            );
            var translation = Cesium.Cartesian3.subtract(
              offset,
              surface,
              new Cesium.Cartesian3()
            );
            tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

            // viewer.zoomTo(
            //   tileset,
            //   new Cesium.HeadingPitchRange(
            //     0.3,
            //     -0.5,
            //     tileset.boundingSphere.radius * 1.5
            //   )
            // );
          })
          .otherwise(function (error) {
            console.log(error);
          });
      } else if (data.title == "体育馆") {
        viewer.camera.flyTo({
          destination: new Cesium.Cartesian3(
            -2427435.1202136064,
            4990317.807370859,
            3136491.062572306
          ),
          orientation: {
            heading: 0.29992998249528213,
            pitch: -0.5004188688984432,
            roll: 6.28318484612079,
          },
        });
        var tileset = new Cesium.Cesium3DTileset({
          url: URL.tomcat + "/tiyuguan/tileset.json",
          maximumScreenSpaceError: 2, //越小越清晰，向下加载瓦片
          maximumMemoryUsage: 4096, //允许使用的最大内存（M）
          dynamicScreenSpaceError: true, //允许动态调节屏幕误差
          progressiveResolutionHeightFraction: 0.5, //取值（0-0.5）
          loadSiblings: true, //加载临近节点
          cullWithChildrenBounds: false,
          cullRequestsWhileMoving: false, // 相机移动不剔除瓦片
          cullRequestsWhileMovingMultiplier: 1,
          preloadWhenHidden: true, //预加载
        });

        var heightoff = -140;
        tilesetArray[data.title] = tileset;
        tileset.readyPromise
          .then(function (tileset) {
            viewer.scene.primitives.add(tileset);
            var cartographic = Cesium.Cartographic.fromCartesian(
              tileset.boundingSphere.center
            );
            var surface = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              0.0
            );
            var offset = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              heightoff
            );
            var translation = Cesium.Cartesian3.subtract(
              offset,
              surface,
              new Cesium.Cartesian3()
            );
            tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

            // viewer.zoomTo(
            //   tileset,
            //   new Cesium.HeadingPitchRange(
            //     0.3,
            //     -0.5,
            //     tileset.boundingSphere.radius * 1.5
            //   )
            // );
          })
          .otherwise(function (error) {
            console.log(error);
          });
      } else if (data.title == "胜利塔") {
        viewer.camera.flyTo({
          destination: new Cesium.Cartesian3(
            -2425872.320695305,
            4986516.306245158,
            3141184.7087131767
          ),
          orientation: {
            heading: 1.576558773589599,
            pitch: -0.3169237949617538,
            roll: 0.0030366677337960724,
          },
        });
        var tileset = new Cesium.Cesium3DTileset({
          url: URL.tomcat + "/shenglita/tileset.json",
          maximumScreenSpaceError: 2, //越小越清晰，向下加载瓦片
          maximumMemoryUsage: 4096, //允许使用的最大内存（M）
          dynamicScreenSpaceError: true, //允许动态调节屏幕误差
          progressiveResolutionHeightFraction: 0.5, //取值（0-0.5）
          loadSiblings: true, //加载临近节点
          cullWithChildrenBounds: false,
          cullRequestsWhileMoving: false, // 相机移动不剔除瓦片
          cullRequestsWhileMovingMultiplier: 1,
          preloadWhenHidden: true, //预加载
        });
        var heightoff = -20;
        tilesetArray[data.title] = tileset;
        tileset.readyPromise
          .then(function (tileset) {
            viewer.scene.primitives.add(tileset);
            var cartographic = Cesium.Cartographic.fromCartesian(
              tileset.boundingSphere.center
            );
            var surface = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              0.0
            );
            var offset = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              heightoff
            );
            var translation = Cesium.Cartesian3.subtract(
              offset,
              surface,
              new Cesium.Cartesian3()
            );
            tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

            // viewer.zoomTo(
            //   tileset,
            //   new Cesium.HeadingPitchRange(
            //     0.3,
            //     -0.5,
            //     tileset.boundingSphere.radius * 1.5
            //   )
            // );
          })
          .otherwise(function (error) {
            console.log(error);
          });
      } else if (data.title == "半岛宾馆") {
        viewer.camera.flyTo({
          destination: new Cesium.Cartesian3(
            -2426624.231378075,
            4988539.210037199,
            3138248.0834177346
          ),
          orientation: {
            heading: 0.2999609880852212,
            pitch: -0.5002332076622915,
            roll: 6.2831850516311665,
          },
        });
        var tileset = new Cesium.Cesium3DTileset({
          url: URL.tomcat + "/bandao/tileset.json",

          maximumScreenSpaceError: 2, //越小越清晰，向下加载瓦片
          maximumMemoryUsage: 4096, //允许使用的最大内存（M）
          dynamicScreenSpaceError: true, //允许动态调节屏幕误差
          progressiveResolutionHeightFraction: 0.5, //取值（0-0.5）
          loadSiblings: true, //加载临近节点
          cullWithChildrenBounds: false,
          cullRequestsWhileMoving: false, // 相机移动不剔除瓦片
          cullRequestsWhileMovingMultiplier: 1,
          preloadWhenHidden: true, //预加载
        });
        var heightoff = 0;
        tilesetArray[data.title] = tileset;
        tileset.readyPromise
          .then(function (tileset) {
            viewer.scene.primitives.add(tileset);
            var cartographic = Cesium.Cartographic.fromCartesian(
              tileset.boundingSphere.center
            );
            var surface = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              0.0
            );
            var offset = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              heightoff
            );
            var translation = Cesium.Cartesian3.subtract(
              offset,
              surface,
              new Cesium.Cartesian3()
            );
            tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

            // viewer.zoomTo(
            //   tileset,
            //   new Cesium.HeadingPitchRange(
            //     0.3,
            //     -0.5,
            //     tileset.boundingSphere.radius * 1.5
            //   )
            // );
          })
          .otherwise(function (error) {
            console.log(error);
          });
      } else if (data.title == "老城区") {
        viewer.camera.flyTo({
          destination: new Cesium.Cartesian3(
            -2433559.7893535835,
            4986206.1342957495,
            3139907.36213659
          ),
          orientation: {
            heading: 5.708650070065147,
            pitch: -0.3645326053921636,
            roll: 6.281505365362561,
          },
        });
        var tileset1 = new Cesium.Cesium3DTileset({
          url: URL.tomcat + "/oldcity1/tileset.json",
          maximumScreenSpaceError: 2, //越小越清晰，向下加载瓦片
          maximumMemoryUsage: 4096, //允许使用的最大内存（M）
          dynamicScreenSpaceError: true, //允许动态调节屏幕误差
          progressiveResolutionHeightFraction: 0.5, //取值（0-0.5）
          loadSiblings: true, //加载临近节点
          cullWithChildrenBounds: false,
          cullRequestsWhileMoving: false, // 相机移动不剔除瓦片
          cullRequestsWhileMovingMultiplier: 1,
          preloadWhenHidden: true, //预加载
        });
        tilesetArray[data.title + "1"] = tileset1;
        tileset1.readyPromise
          .then(function (tileset) {
            viewer.scene.primitives.add(tileset);
            var cartographic = Cesium.Cartographic.fromCartesian(
              tileset.boundingSphere.center
            );
            var surface = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              0.0
            );
            var offset = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              heightoff
            );
            var translation = Cesium.Cartesian3.subtract(
              offset,
              surface,
              new Cesium.Cartesian3()
            );
            tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

            // viewer.zoomTo(
            //   tileset,
            //   new Cesium.HeadingPitchRange(
            //     0.3,
            //     -0.5,
            //     tileset.boundingSphere.radius * 1.5
            //   )
            // );
          })
          .otherwise(function (error) {
            console.log(error);
          });
        var tileset2 = new Cesium.Cesium3DTileset({
          url: URL.tomcat + "/oldcity2/tileset.json",
          maximumScreenSpaceError: 2, //越小越清晰，向下加载瓦片
          maximumMemoryUsage: 4096, //允许使用的最大内存（M）
          dynamicScreenSpaceError: true, //允许动态调节屏幕误差
          progressiveResolutionHeightFraction: 0.5, //取值（0-0.5）
          loadSiblings: true, //加载临近节点
          cullWithChildrenBounds: false,
          cullRequestsWhileMoving: false, // 相机移动不剔除瓦片
          cullRequestsWhileMovingMultiplier: 1,
          preloadWhenHidden: true, //预加载
        });
        tilesetArray[data.title + "2"] = tileset2;
        tileset2.readyPromise
          .then(function (tileset) {
            viewer.scene.primitives.add(tileset);
            var cartographic = Cesium.Cartographic.fromCartesian(
              tileset.boundingSphere.center
            );
            var surface = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              0.0
            );
            var offset = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              heightoff
            );
            var translation = Cesium.Cartesian3.subtract(
              offset,
              surface,
              new Cesium.Cartesian3()
            );
            tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

            // viewer.zoomTo(
            //   tileset,
            //   new Cesium.HeadingPitchRange(
            //     0.3,
            //     -0.5,
            //     tileset.boundingSphere.radius * 1.5
            //   )
            // );
          })
          .otherwise(function (error) {
            console.log(error);
          });
      } else if (data.title == "武汉市建筑") {
        viewer.camera.flyTo({
          destination: new Cesium.Cartesian3(
            -2427435.1202136064,
            4990317.807370859,
            3136491.062572306
          ),
          orientation: {
            heading: 0.29992998249528213,
            pitch: -0.5004188688984432,
            roll: 6.28318484612079,
          },
        });

        var tileset = new Cesium.Cesium3DTileset({
          url: "/data/wuhanbuildings/tileset.json",
          maximumScreenSpaceError: 2, //越小越清晰，向下加载瓦片
          maximumMemoryUsage: 4096, //允许使用的最大内存（M）
          dynamicScreenSpaceError: true, //允许动态调节屏幕误差
          progressiveResolutionHeightFraction: 0.5, //取值（0-0.5）
          loadSiblings: true, //加载临近节点
          cullWithChildrenBounds: false,
          cullRequestsWhileMoving: false, // 相机移动不剔除瓦片
          cullRequestsWhileMovingMultiplier: 1,
          preloadWhenHidden: true, //预加载
        });

        var heightoff = -140;
        tilesetArray[data.title] = tileset;
        tileset.readyPromise
          .then(function (tileset) {
            viewer.scene.primitives.add(tileset);
            var cartographic = Cesium.Cartographic.fromCartesian(
              tileset.boundingSphere.center
            );
            var surface = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              0.0
            );
            var offset = Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              heightoff
            );
            var translation = Cesium.Cartesian3.subtract(
              offset,
              surface,
              new Cesium.Cartesian3()
            );
            tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

            // viewer.zoomTo(
            //   tileset,
            //   new Cesium.HeadingPitchRange(
            //     0.3,
            //     -0.5,
            //     tileset.boundingSphere.radius * 1.5
            //   )
            // );
          })
          .otherwise(function (error) {
            console.log(error);
          });
      }
    },
    removeB3DMData(data) {
      if (tilesetArray.hasOwnProperty(data.title)) {
        viewer.scene.primitives.remove(tilesetArray[data.title]);
      } else if (tilesetArray.hasOwnProperty(data.title + "1")) {
        viewer.scene.primitives.remove(tilesetArray[data.title + "1"]);
        viewer.scene.primitives.remove(tilesetArray[data.title + "2"]);
      }
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>
<style scoped>
.layertree {
  width: 250px;
  overflow-x: hidden;
}

.filter-tree {
  height: 65vh;
  overflow: auto;
}

.layertree /deep/ .ivu-tree-title {
  color: #bfc4d8;
}

.layertree /deep/ .ivu-tree-title:hover {
  background: #35466bd6;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
<style>
.custom-tree-dz-node {
  flex: 1;
  display: flex;
  font-size: 14px;
  align-items: center;
}
</style>
