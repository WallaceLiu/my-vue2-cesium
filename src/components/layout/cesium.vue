<template>
  <div>
    <div id="cesiumContainer"></div>
    <!-- cesium目标的气泡弹框 -->
    <bubble
      :isShow="bubble.isShow && !bubble.isBack"
      :height="bubble.height"
      :width="bubble.width"
      :style="{ top: bubble.top + 'px', left: bubble.left + 'px' }"
    >
      <div slot="title">
        <p>{{ bubbleParams.name }}</p>
      </div>
      <div slot="content">
        <div v-for="(val, key, index) in bubbleParams.info" :key="index">
          {{ key }}：{{ val }}
        </div>
      </div>
    </bubble>
  </div>
</template>
<script>
import Bus from "@/utils/Bus.js";
import URL from "@/utils/Url.config.js";
// 气泡
import bubble from "@/components/layout/bubble.vue";

var clickSelecting = false;
var drawClickSelected = null;

export default {
  name: "cesiumContainer",
  components: {
    bubble,
  },
  data() {
    return {
      bubble: {
        isShow: false,
        width: 0,
        height: 0,
        isBack: false,
        top: 0,
        left: 0,
        x: 0,
        y: 0,
      },
      bubbleParams: {
        name: "",
        info: [],
      },
    };
  },
  mounted() {
    this.initCesium();
    this.monitor();
  },
  methods: {
    initCesium() {
      // 创建viewer实例
      viewer = new Cesium.Viewer("cesiumContainer", {
        timeline: false,
        animation: false,
        navigationHelpButton: false,
        geocoder: false,
        SkyAtmosphere: false,
        sceneModePicker: false,
        homeButton: false,
        fullscreenButton: false,
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
          url: "http://t0.tianditu.com/img_w/wmts?tk=2a2c5ce64b61343727085b76c46d7ad3&service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
          layer: "img",
          style: "default",
          format: "tiles",
          tileMatrixSetID: "w",
          credit: new Cesium.Credit("天地图全球影像服务"),
          maximumLevel: 18,
          show: false,
        }),
        baseLayerPicker: false,
        selectionIndicator: false, //鼠标点击wms选择框
        infoBox: false,
      });

      // 引入指北针
      viewer.extend(Cesium.viewerCesiumNavigationMixin, {});

      // 引入3d tielse调试器，设置不显示
      viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
      var obj = document.getElementsByClassName(
        "cesium-viewer-cesium3DTilesInspectorContainer"
      )[0];
      obj.style.display = "none";
      // 去掉默认picking
      var inputNode = document.getElementsByClassName(
        "cesium-cesiumInspector-sectionContent"
      )[0].children[3].children[0].children[0];
      inputNode.click();

      // 去除版权信息
      viewer._cesiumWidget._creditContainer.style.display = "none";
      // 设置延迟时间以显示动画
      setTimeout(() => {
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            115.42510230563575,
            29.38086287024092,
            5500000
          ),
        });
      }, 1000);

      //抗锯齿
      viewer.scene.postProcessStages.fxaa.enabled = true;

      //修改分辨率
      var supportsImageRenderingPixelated =
        viewer.cesiumWidget._supportsImageRenderingPixelated;
      if (supportsImageRenderingPixelated) {
        var vtxf_dpr = window.devicePixelRatio;
        viewer.resolutionScale = vtxf_dpr;
      }
    },
    monitor() {
      Bus.$on("cesium-select-point", (res) => {
        clickSelecting = res.show;
        drawClickSelected = res.type;
      });
    },
  },
};
</script>
<style scoped>
#cesiumContainer {
  height: 100vh;
  width: 100vw;
}
</style>
