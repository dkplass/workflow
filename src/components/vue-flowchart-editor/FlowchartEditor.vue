<template>
  <vue-flowchart-editor ref="flowChart" class="vue-flowchart-editor">
    <div class="vfe-chart">
      <!-- Top Menu -->
      <div class="vfe-chart-header">
        <editor-toolbar :chart-data="flowChartData" :read-only="readOnly"></editor-toolbar>
      </div>
      <div class="vfe-chart-container">
        <!-- Left Panel -->
        <div class="vfe-chart-sidebar">
          <editor-item-panel v-if="!readOnly" :node-items="flowChartNodeItems"></editor-item-panel>
        </div>
        <!-- Main Canvas -->
        <div class="vfe-chart-main">
          <flow
            :data="flowChartData"
            :onClick="handleClick"
            :onNodeClick="handleNodeClick"
            :onNodeDoubleClick="handleNodeDoubleClick"
            :onNodeMouseLeave="handleNodeMouseLeave"
            :onAfterChange="handleAfterChange"
            :graph="graphConfig"
          />
          <div class="tooltip">
            <template v-for="item in tooltipData">
              <p :key="item.name">{{ item.name }}: {{ item.value }}</p>
            </template>
          </div>
        </div>
        <!-- Right Panel -->
        <div class="vfe-chart-panel">
          <div class="vfe-chart-panel-detail">
            <editor-detail-panel :read-only="readOnly"></editor-detail-panel>
          </div>
          <div class="vfe-chart-panel-minimap">
            <editor-minimap></editor-minimap>
          </div>
        </div>
      </div>
    </div>
    <!-- Mouse Right Button Context Menu -->
    <editor-context-menu v-if="!readOnly"></editor-context-menu>
    <register-edge
      name="custom-polyline"
      extend="flow-polyline"
      :config="customEdgeConfig"
    ></register-edge>
    <custom-command :save="saveChartData" :download="downloadImage"></custom-command>
  </vue-flowchart-editor>
</template>

<script>
import VueFlowchartEditor, { Flow, RegisterEdge } from "vue-flowchart-editor";
import EditorToolbar from "./tools/Toolbar.vue";
import EditorItemPanel from "./tools/ItemPanel.vue";
import EditorDetailPanel from "./tools/DetailPanel.vue";
import EditorMinimap from "./tools/EditorMinimap.vue";
import EditorContextMenu from "./tools/ContextMenu.vue";
import CustomCommand from "./tools/CustomCommand.vue";

export default {
  name: "FlowchartEditor",
  components: {
    VueFlowchartEditor,
    Flow,
    RegisterEdge,
    EditorToolbar,
    EditorItemPanel,
    EditorDetailPanel,
    EditorMinimap,
    EditorContextMenu,
    CustomCommand
  },
  props: ["readOnly", "toggleReadOnly", "chartData", "chartDataNodeItems", "saveData"],
  data() {
    return {
      flowChartData: this.chartData,
      flowChartNodeItems: this.chartDataNodeItems,
      graphConfig: {
        mode: "readOnly"
      },
      customEdgeConfig: {
        getActivedStyle(/*item*/) {
          return {
            lineWidth: 3
          };
        },
        getSelectedStyle(/*item*/) {
          return {
            lineWidth: 3
          };
        }
      },
      tooltipDom: null,
      tooltipShow: true,
      tooltipData: []
    };
  },
  created() {},
  mounted() {
    this.tooltipDom = document.getElementsByClassName("tooltip")[0];
  },
  methods: {
    handleClick(e) {
      console.log(e);
      if (this.readOnly && !e.item) {
        this.tooltipDom.style.display = "none";
      }
    },
    handleNodeClick(e) {
      console.log(e);
    },
    handleNodeDoubleClick(e) {
      console.log(e.item.model.data);
      if (this.readOnly) {
        this.tooltipData = e.item.model.data;
        this.$nextTick(() => {
          this.tooltipDom.style.left = e.domX + "px";
          this.tooltipDom.style.top = e.domY + "px";
          this.tooltipDom.style.display = "block";
        });
      }
    },
    handleNodeMouseLeave(e) {
      if (this.readOnly) {
        console.log(e);
        this.tooltipDom.style.display = "none";
      }
    },
    handleAfterChange(e) {
      if (!this.readOnly) {
        const { action, item } = e;
        console.log(action);
        if (item && item.getModel) {
          const model = item.getModel();
          console.log(model);
        }
        // 可以根据 action 和 model 来决定是否删掉左侧用过的节点
      }
    },
    saveChartData(data) {
      this.$emit("save-data", data);
    },
    _downloadImage(data, filename = "flowchart.png") {
      const a = document.createElement("a");
      a.href = data;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
    },
    downloadImage() {
      const page = this.$refs["flowChart"].propsAPI.editor.getCurrentPage();
      this._downloadImage(page.saveImage().toDataURL("image/png"));
    }
  }
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

  .vfe-chart-container {
    flex: 1;
    display: flex;
    overflow: hidden;

    .vfe-chart-main {
      position: relative;
      flex: 1;
      max-height: calc(100% - 5px);

      .tooltip {
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100px;
        height: auto;
        padding: 15px;
        border-radius: 10px;
        z-index: 999;
        opacity: 0.8;
        color: #ffffff;
        font-size: 12px;
        background-color: #000;

        p {
          margin: 0;
        }
      }
    }

    .vfe-chart-sidebar {
      position: relative;
      display: flex;
      justify-content: center;
      min-width: 110px;
      width: 10rem;
      background-color: #fafafa;
      border-right: 1px solid #e6e9ed;
    }

    .vfe-chart-panel {
      position: relative;
      width: 16rem;
      min-width: 200px;
      background-color: #fafafa;
      border-left: 1px solid #e6e9ed;

      .vfe-chart-panel-detail {
        padding: 10px;
        width: 100%;
        height: calc(100% - 250px);
        overflow-y: auto;
      }

      .vfe-chart-panel-minimap {
        width: 100%;
        height: 250px;
        border-top: 1px solid #e6e9ed;
      }
    }
  }
}
</style>
