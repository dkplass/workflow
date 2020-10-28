<template>
  <div class="wrapper">
    <flowchart-editor
      :read-only="readOnly"
      :key="reRender"
      :chart-data="flowChartData"
      :chart-data-node-items="flowChartNodeItems"
      @save-data="save"
    ></flowchart-editor>
  </div>
</template>

<script>
import FlowchartEditor from "@/components/vue-flowchart-editor/FlowchartEditor.vue";
import chartData from "@/data/data";
import dataNodeItems from "@/data/dataNodeItems";

export default {
  name: "Home",
  components: {
    FlowchartEditor
  },
  data() {
    return {
      readOnly: false,
      reRender: +new Date(),
      flowChartData: chartData,
      flowChartNodeItems: dataNodeItems
    };
  },
  mounted() {
    this.$on("toggle-read-only", () => {
      this.readOnly = !this.readOnly;
      this.$nextTick(() => {
        console.log(this.readOnly);
        this.reRender = +new Date(); // 重新渲染组件
      });
    });
  },
  methods: {
    save(data) {
      this.flowChartData = JSON.parse(JSON.stringify(data));
      console.log(this.flowChartData);
    }
  }
};
</script>

<style lang="scss" scoped></style>
