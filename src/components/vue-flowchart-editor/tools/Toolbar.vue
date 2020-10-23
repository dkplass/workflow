<template>
  <toolbar class="toolbar">
    <b-icon
      v-if="!readOnly"
      icon="three-dots-vertical"
      font-scale="1.5"
      class="cursor-pointer"
      @click="toggleGroup(1);handleGroupCollapse('one')"
    ></b-icon>
    <template v-if="!readOnly && groupCollapse.one">
      <toolbar-button command="undo" text="撤消" />
      <toolbar-button command="redo" text="重做" />
      <toolbar-button command="copy" text="複製" />
      <toolbar-button command="paste" text="貼上" />
    </template>
    <div class="split" v-if="!readOnly"></div>
    <b-icon
      icon="three-dots-vertical"
      font-scale="1.5"
      class="cursor-pointer"
      @click="toggleGroup(2);handleGroupCollapse('two')"
    ></b-icon>
    <template v-if="groupCollapse.two">
      <toolbar-button command="zoomIn" icon="zoom-in" text="放大" />
      <toolbar-button command="zoomOut" icon="zoom-out" text="縮小" />
      <toolbar-button command="autoZoom" icon="fit" text="自動縮放" />
      <toolbar-button command="resetZoom" icon="actual-size" text="實際尺寸" />
    </template>
    <div class="split"></div>
    <b-icon
      v-if="!readOnly"
      icon="three-dots-vertical"
      font-scale="1.5"
      class="cursor-pointer"
      @click="toggleGroup(3);handleGroupCollapse('three')"
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
    windowWidth(width) {
      if (width < 960) {
        this.handleGroupCollapse();
      }
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


      Object.keys(group).forEach((g) => {
        group[g] = (g == i) ? true : false
      });
    },
    handleToggleReadOnly() {
      this.$parent.$parent.$parent.$emit("toggle-read-only");
    }
  }
};
</script>

<style lang="scss">
.toolbar {
  display: flex;
  align-items: center;
  height: 2rem;

  .split {
    width: 0.6rem;
    height: 100%;
    border-right: 1px solid #eee;
    margin-right: 10px;
  }

  .pull-right {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .command {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #333;

    i {
      display: block;
      width: 1.6rem;
      height: 1.6rem;
      margin: 0 6px;
      text-align: center;
      border: 1px solid #fff;
      cursor: pointer;
    }

    span {
      display: block;
      font-size: 0.8rem;
      margin-left: -6px;
      padding-right: 6px;
      padding-top: 4px;
      line-height: 2rem;
      cursor: pointer;
    }

    &:hover {
      color: #1890ff;
    }
  }

  .disable {
    color: rgba(0, 0, 0, 0.25);

    i {
      cursor: not-allowed;
    }

    span {
      cursor: not-allowed;
    }

    &:hover {
      color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
