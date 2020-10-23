<template>
  <vue-flowchart-editor ref="vueFlowchartEditor" class="vue-flowchart-editor">
    <div class="vfe-chart">
      <!-- Top Menu -->
      <div class="vfe-chart-header">
        <editor-toolbar :chart-data="flowChartData" :read-only="readOnly"></editor-toolbar>
      </div>
    </div>
  </vue-flowchart-editor>
</template>

<script>
import VueFlowchartEditor from "vue-flowchart-editor";
import EditorToolbar from "./tools/Toolbar.vue";

export default {
  name: "FlowchartEditor",
  components: {
    VueFlowchartEditor,
    EditorToolbar
  },
  props: ["readOnly", "toggleReadOnly", "chartData"],
  data() {
    return {
      flowChartData: this.chartData
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.vue-flowchart-editor {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
}

.vfe-chart {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .vfe-chart-header {
    border: 1px solid #e6e9ed;
    padding: 8px;
  }
}
</style>
