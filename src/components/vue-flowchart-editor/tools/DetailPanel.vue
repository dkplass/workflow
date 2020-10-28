<template>
  <detail-panel>
    <template v-slot="{ status }">
      <node-panel :status="status">
        <detail-form type="node" :read-only="readOnly"></detail-form>
      </node-panel>
      <edge-panel :status="status">
        <detail-form type="edge" :read-only="readOnly" />
      </edge-panel>
      <group-panel :status="status">
        <detail-form type="group" :read-only="readOnly" />
      </group-panel>
      <multi-panel :status="status"></multi-panel>
      <canvas-panel :status="status"></canvas-panel>
    </template>
  </detail-panel>
</template>

<script>
import {
  NodePanel,
  EdgePanel,
  GroupPanel,
  MultiPanel,
  CanvasPanel,
  DetailPanel
} from "vue-flowchart-editor";
import DetailForm from "./DetailForm.vue";

export default {
  name: "EditorDetailPanel",
  components: {
    NodePanel,
    EdgePanel,
    GroupPanel,
    MultiPanel,
    CanvasPanel,
    DetailPanel,
    DetailForm
  },
  props: ["readOnly"]
};
</script>

<style lang="scss" scoped></style>
