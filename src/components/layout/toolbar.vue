<!-- 顶部工具栏 风场 温度 航线 热点 设置 -->
<template>
  <div>
    <button
      class="cesium-button my-cesium-toolbar-button"
      style="width: 80px; height: 36px"
      title="量测工具"
      @click="addWind()"
    >
      <i class="el-icon-cloudy" style="width: 20px; height: 20px"></i>
      <div class="tool-name">风场</div>
    </button>
    <button
      class="cesium-button my-cesium-toolbar-button"
      style="width: 80px; height: 36px"
      title="量测工具"
      @click="addTemperature()"
    >
      <i class="el-icon-sunny" style="width: 20px; height: 20px"></i>
      <div class="tool-name">温度</div>
    </button>
    <button
      class="cesium-button my-cesium-toolbar-button"
      style="width: 80px; height: 36px"
      title="量测工具"
      @click="addFlights()"
    >
      <!-- <img src="@/assets/toolbar/hotpoint.png" style="width:20px;height:20px;" /> -->
      <i class="el-icon-s-promotion" style="width: 20px; height: 20px"></i>
      <div class="tool-name">航线</div>
    </button>
    <!-- <button
      class="cesium-button my-cesium-toolbar-button"
      style="width:80px;height:36px"
      title="量测工具"
      @click="open(2)"
    >
      <img src="@/assets/toolbar/liangce.png" style="width:20px;height:20px;" />
      <div class="tool-name">量测</div>
    </button> -->
    <button
      class="cesium-button my-cesium-toolbar-button"
      style="width: 80px; height: 36px"
      title="量测工具"
      @click="open(3)"
    >
      <img
        src="@/assets/toolbar/hotpoint.png"
        style="width: 20px; height: 20px"
      />
      <div class="tool-name">热点</div>
    </button>
    <button
      class="cesium-button my-cesium-toolbar-button"
      style="width: 80px; height: 36px"
      title="空间分析工具"
      @click="open(1)"
    >
      <img
        src="@/assets/toolbar/kongjian.png"
        style="width: 20px; height: 20px"
      />
      <div class="tool-name">设置</div>
    </button>
    <button
      class="cesium-button my-cesium-toolbar-button"
      style="width: 80px; height: 36px"
      title="空间分析工具"
      @click="open(4)"
    >
      <img
        src="@/assets/toolbar/kongjian.png"
        style="width: 20px; height: 20px"
      />
      <div class="tool-name">密度</div>
    </button>
  </div>
</template>
<script>
import Bus from "@/utils/Bus";

export default {
  data() {
    return {
      value2: 50,
    };
  },
  methods: {
    // 飞机航线
    addFlights() {
      alert("飞机航线");
    },
    // 热力
    addHeatmap() {
      alert("热力");
    },
    // 温度
    addTemperature() {
      alert("温度");
    },
    // 风场
    addWind() {
      alert("风场");
    },
    open(type) {
      switch (type) {
        case 1:
          Bus.$emit("setting-toolbar", true);
          break;
        case 2:
          Bus.$emit("measure-toolbar", true);
          break;
        case 3:
          Bus.$emit("hotpoint-toolbar", true);
          break;
        case 4:
          Bus.$emit("nucleardensity-toolbar", true);
          break;
      }
    },
  },
};
</script>
<style>
.my-cesium-toolbar-button {
  box-sizing: border-box;
  padding: 0;
  padding-top: 6px;
  vertical-align: middle;
  z-index: 0;
  display: flex;
  padding-left: 10px;
  background: rgba(8, 10, 52, 0.8);
  border: 1px solid rgba(34, 47, 113, 1);
  box-shadow: inset 0 0 10px rgba(34, 47, 113, 1);
}
.tool-name {
  margin-left: 10px;
}
.tiletool {
  position: absolute;
  z-index: 101;
  top: 62px;
  right: 22px;
  cursor: pointer;
}
.tiletool:hover {
  opacity: 0.6;
}
</style>
