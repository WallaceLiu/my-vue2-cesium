<template>
  <div style="background: rgba(8, 10, 52, 0.8)">
    <Modal
      class-name="nucleardensity-toolbar"
      v-model="nucleardensityShow"
      draggable
      scrollable
      footer-hide
      title="设置"
      width="320"
      :styles="{ top: '85px' }"
      @on-visible-change="visibleChange"
    >
      <div class="block">
        <span class="demonstration">更新数据的值域</span>
        <el-slider
          v-model="value1"
          :step="1"
          :format-tooltip="formatTooltip0"
        ></el-slider>
      </div>
      <div class="block" style="margin-top: 10px">
        <span class="demonstration1" style="margin-right: 10px">透明度 </span>
        <el-slider
          v-model="value2"
          :step="1"
          :format-tooltip="formatTooltip1"
        ></el-slider>
      </div>
      <div class="block" style="margin-top: 10px">
        <span class="demonstration1" style="margin-right: 10px">半径 </span>
        <el-slider
          v-model="value3"
          :step="1"
          :format-tooltip="formatTooltip2"
        ></el-slider>
      </div>
    </Modal>
  </div>
</template>
<script>
import Bus from "@/utils/Bus";
import tooltip from "@/components/toolbar/tooltip";

export default {
  data() {
    return {
      value1: 100,
      value2: 0.5,
      value3: 100,
      nucleardensityShow: false,
      statusID: -1, // -1是无功能，1是测距离，2是测面积，3是方位角
    };
  },
  components: {
    tooltip,
  },
  mounted() {
    Bus.$on("nucleardensity-toolbar", (res) => {
      if (this.nucleardensityShow && res) return;
      this.nucleardensityShow = res;
    });
    //Bus.$emit('message',this.value1);
  },

  methods: {
    formatTooltip0(val) {
      Bus.$emit("message1", this.value1);
      return val * 10;
    },
    formatTooltip1(val) {
      Bus.$emit("message1", this.value1);
      return val * 0.01;
    },
    formatTooltip2(val) {
      Bus.$emit("message1", this.value1);
      return val * 0.5;
    },
    visibleChange(show) {
      // 模态框关闭时
      if (!show) {
        this.statusID = -1;
      }
    },
  },
};
</script>
<style>
.nucleardensity-toolbar {
  right: calc(-100% + 330px) !important;
}

.nucleardensity-toolbar /deep/ .ivu-modal-content {
  border-radius: 2px !important;
  background: rgba(8, 10, 52, 0.8);
  /* border: 1px solid #0081cb; */
  box-shadow: inset 0 0 10px #3c6379;
}

.nucleardensity-toolbar /deep/ .ivu-modal-close {
  right: 2px !important;
  top: 2px !important;
}
.nucleardensity-toolbar /deep/ .ivu-modal-header {
  padding: 4px 6px;
  background: rgba(34, 47, 113, 1);
}
.nucleardensity-toolbar /deep/ .ivu-modal-header-inner {
  font-size: 14px;
  color: #eee;
}
.nucleardensity-toolbar /deep/ .ivu-icon-ios-close {
  font-size: 24px !important;
  color: #eee !important;
}
.nucleardensity-toolbar /deep/ .ivu-modal-body {
  padding: 3px 6px 6px 6px;
  display: flex;
}
.toolbar-btn {
  padding: 5px;
  height: 34px;
  border-radius: 2px;
}
.toolbar-btn:hover {
  opacity: 0.7;
  cursor: pointer;
}
.btn-img {
  width: 24px;
  height: 24px;
}
.line {
  height: 24px;
  width: 1px;
  background: #aaa;
  margin: 5px;
}
</style>