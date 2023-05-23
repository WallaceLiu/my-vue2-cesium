<template>
  <div class="layout">
    <div class="top-header">
      <div class="header-title">
        vue2-cesium<span>template</span>
        <div id="he-plugin-simple"></div>
      </div>
    </div>
    <layer-tree class="left-top" v-show="layerShow"></layer-tree>

    <cesium-view></cesium-view>
    <!-- 工具栏的一些组件 -->
    <tool-bar class="right-top"> </tool-bar>
    <!-- <measure-toolbar></measure-toolbar> -->
    <nucleardensity-toolbar></nucleardensity-toolbar>
    <setting-toolbar></setting-toolbar>
    <hotpoint-toolbar></hotpoint-toolbar>
  </div>
</template>

<script>
import toolBar from "@/components/layout/toolbar";
import layerTree from "@/components/layout/layertree";
import cesiumView from "@/components/layout/cesium";
import settingToolbar from "@/components/toolbar/setting.vue";
import nucleardensityToolbar from "@/components/toolbar/nucleardensity.vue";
import measureToolbar from "@/components/toolbar/measure.vue";
import hotpointToolbar from "@/components/toolbar/hotpoint.vue";

export default {
  name: "layout",
  components: {
    toolBar,
    layerTree,
    cesiumView,
    measureToolbar,
    hotpointToolbar,
    settingToolbar,
    nucleardensityToolbar,
  },
  data() {
    return {
      layerShow: true,
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout {
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
}
#he-plugin-simple {
  position: absolute;
  top: 3rem;
  right: 3rem;
  z-index: 100;
}
.left-top {
  position: absolute;
  left: 10px;
  top: 70px;
  z-index: 100;
  padding: 10px;
  text-align: left;
  border: 1px solid #15222b;
  background: rgba(8, 10, 52, 0.8);
  border: 1px solid rgba(34, 47, 113, 1);
  box-shadow: inset 0 0 10px rgba(34, 47, 113, 1);
}

.logo-name {
  font-size: 20px;
  position: relative;
  top: -16px;
  font-weight: 600;
  text-shadow: 3px 4px 0px #1c2f3c;
  left: 2px;
}

.right-top {
  position: absolute;
  top: 25px;
  z-index: 100;
  right: 10px;
  display: flex;
}

.top-header {
  width: 100vw;
  height: 60px;
  position: absolute;
  top: 0px;
  z-index: 100;
  text-align: left;
  background-image: url("../assets/header.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
}

.header-title {
  font-size: 22px;
  position: relative;
  top: 5px;
  left: 25px;
  font-weight: 600;
  text-shadow: 3px 4px 0px #1c2f3c;
}

.header-title span {
  font-size: 20px;
  margin-left: 10px;
  color: #9cccff;
  font-weight: 600;
}

.bottom-title {
  position: absolute;
  bottom: 0px;
  height: 25px;
  width: 100vw;
  background: rgba(8, 10, 52, 0.8);
  z-index: 100;
}

.bottom-title span {
  font-size: 15px;
  line-height: 25px;
  color: #c5c4c4;
}
</style>
<style>
.ivu-modal-content {
  background: rgba(8, 10, 52, 0.8) !important;
  color: white;
  font-family: "微软雅黑";
}
.ivu-modal-header-inner {
  color: #f9f9f9 !important;
  font-family: "微软雅黑";
}
.ivu-table-header {
  background: rgba(8, 10, 52, 0.8) !important;
  color: #f9f9f9;
  font-family: "微软雅黑";
}
.ivu-table-body {
  background: rgba(8, 10, 52, 0.8) !important;
  color: #f9f9f9;
  font-family: "微软雅黑";
}
.ivu-table td {
  background: rgba(8, 10, 52, 0.8) !important;
  color: #f9f9f9;
  font-family: "微软雅黑";
}
.ivu-table th {
  background: rgba(8, 10, 52, 0.8) !important;
  color: #f9f9f9;
  font-family: "微软雅黑";
}
.ivu-table-tbody td :hover {
  background-color: rgba(153, 155, 190, 0.8) !important;
  color: #cecaca;
  font-family: "微软雅黑";
}
.ivu-btn-text {
  color: #f9f9f9 !important;
  font-family: "微软雅黑";
}
</style>