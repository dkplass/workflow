<template>
  <toolbar class="toolbar">
    <b-icon
      v-if="!readOnly && toolbarCollapseWidth"
      icon="three-dots-vertical"
      font-scale="1.5"
      class="cursor-pointer"
      @click="
        toggleGroup(1);
        handleGroupCollapse('one');
      "
    ></b-icon>
    <template v-if="!readOnly && groupCollapse.one">
      <toolbar-button command="undo" text="撤消" />
      <toolbar-button command="redo" text="重做" />
      <toolbar-button command="copy" text="複製" />
      <toolbar-button command="paste" text="貼上" />
    </template>
    <div class="split" v-if="!readOnly"></div>
    <b-icon
      v-if="toolbarCollapseWidth"
      icon="three-dots-vertical"
      font-scale="1.5"
      class="cursor-pointer"
      @click="
        toggleGroup(2);
        handleGroupCollapse('two');
      "
    ></b-icon>
    <template v-if="groupCollapse.two">
      <toolbar-button command="zoomIn" icon="zoom-in" text="放大" />
      <toolbar-button command="zoomOut" icon="zoom-out" text="縮小" />
      <toolbar-button command="autoZoom" icon="fit" text="自動縮放" />
      <toolbar-button command="resetZoom" icon="actual-size" text="實際尺寸" />
    </template>
    <div class="split"></div>
    <b-icon
      v-if="!readOnly && toolbarCollapseWidth"
      icon="three-dots-vertical"
      font-scale="1.5"
      class="cursor-pointer"
      @click="
        toggleGroup(3);
        handleGroupCollapse('three');
      "
    ></b-icon>
    <template v-if="!readOnly && groupCollapse.three">
      <toolbar-button command="toBack" icon="to-back" text="圖層下移" />
      <toolbar-button command="toFront" icon="to-front" text="圖層上移" />
      <toolbar-button command="addGroup" icon="group" text="群組" />
      <toolbar-button command="unGroup" icon="ungroup" text="取消群組" />
      <toolbar-button command="selectAll" icon="select-all" text="全選" />
      <toolbar-button command="multiSelect" icon="select" text="框選" />
    </template>
    <div class="split" v-if="!readOnly"></div>

    <!---->
    <div v-if="buttonsCollapseWidth" v-b-toggle.collapse-buttons size="sm" class="collapse-btn">
      <b-icon-chevron-down></b-icon-chevron-down>
    </div>
    <!---->
    <template v-else>
      <template v-if="!readOnly">
        <toolbar-button command="delete" text="刪除" label="刪除" />
        <toolbar-button command="clear" text="清空" label="清空" />
      </template>
      <div class="pull-right">
        <toolbar-button
          command="generateData"
          icon="save"
          text="生成資料"
          label="保存資料"
        ></toolbar-button>
        <toolbar-button
          command="downloadImage"
          icon="image"
          text="下載圖像"
          label="下載圖像"
        ></toolbar-button>
      </div>
      <b-button size="sm" @click.prevent="handleToggleReadOnly">{{
        readOnly ? "編輯模式" : "唯讀模式"
      }}</b-button>
    </template>

    <b-collapse id="collapse-buttons" is-nav>
      <div class="collapse-buttons-wrapper">
        <template v-if="!readOnly">
          <toolbar-button command="delete" text="刪除" />
          <toolbar-button command="clear" text="清空" />
        </template>
        <div class="pull-right">
          <toolbar-button command="generateData" icon="save" text="生成資料"></toolbar-button>
          <toolbar-button command="downloadImage" icon="image" text="下載圖像"></toolbar-button>
        </div>
        <b-button size="sm" @click.prevent="handleToggleReadOnly">{{
          readOnly ? "編輯模式" : "唯讀模式"
        }}</b-button>
      </div>
    </b-collapse>
  </toolbar>
</template>

<script>
import { Toolbar } from "vue-flowchart-editor";
import ToolbarButton from "./ToolbarButton.vue";
import { DetectiveWidth } from "@/mixins/mixin.detectiveWidth";

export default {
  name: "EditorToolbar",
  components: {
    Toolbar,
    ToolbarButton
  },
  props: ["chartData", "toggleReadOnly", "readOnly"],
  mixins: [DetectiveWidth],
  data() {
    return {
      groupCollapse: {
        one: true,
        two: true,
        three: true
      }
    };
  },
  watch: {
    windowWidth() {
      if (this.toolbarCollapseWidth) {
        this.handleGroupCollapse();
      } else {
        const group = this.groupCollapse;

        // check only one true

        Object.keys(group).forEach(g => {
          group[g] = true;
        });
      }
    }
  },
  computed: {
    toolbarCollapseWidth() {
      /**
       * 工具列在1056寬度下會出現縮放節點
       */
      if (this.windowWidth < 1056) {
        return true;
      }

      return false;
    },
    buttonsCollapseWidth() {
      /**
       * 工具列在765寬度會收納右半側按鈕
       */
      if (this.windowWidth < 765) {
        return true;
      }

      return false;
    }
  },
  methods: {
    toggleGroup(v) {
      const group = this.groupCollapse;

      switch (v) {
        case 1:
          group.one = !group.one;
          break;
        case 2:
          group.two = !group.two;
          break;
        case 3:
          group.three = !group.three;
          break;
        default:
          console.log("not a group");
      }
    },
    handleGroupCollapse(i = "one") {
      const group = this.groupCollapse;

      // check only one true

      Object.keys(group).forEach(g => {
        group[g] = g == i ? true : false;
      });
    },
    handleToggleReadOnly() {
      this.$parent.$parent.$parent.$emit("toggle-read-only");
    }
  }
};
</script>

<style lang="scss"></style>
