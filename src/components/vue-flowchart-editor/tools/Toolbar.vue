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
    />
    <template v-if="!readOnly && groupCollapse.one">
      <toolbar-button command="undo" text="撤消" />
      <toolbar-button command="redo" text="重做" />
      <toolbar-button command="copy" text="複製" />
      <toolbar-button command="paste" text="貼上" />
    </template>
    <div v-if="!readOnly" class="split" />
    <b-icon
      v-if="toolbarCollapseWidth"
      icon="three-dots-vertical"
      font-scale="1.5"
      class="cursor-pointer"
      @click="
        toggleGroup(2);
        handleGroupCollapse('two');
      "
    />
    <template v-if="groupCollapse.two">
      <toolbar-button command="zoomIn" icon="zoom-in" text="放大" />
      <toolbar-button command="zoomOut" icon="zoom-out" text="縮小" />
      <toolbar-button command="autoZoom" icon="fit" text="自動縮放" />
      <toolbar-button command="resetZoom" icon="actual-size" text="實際尺寸" />
    </template>
    <div class="split" />
    <b-icon
      v-if="!readOnly && toolbarCollapseWidth"
      icon="three-dots-vertical"
      font-scale="1.5"
      class="cursor-pointer"
      @click="
        toggleGroup(3);
        handleGroupCollapse('three');
      "
    />
    <template v-if="!readOnly && groupCollapse.three">
      <toolbar-button command="toBack" icon="to-back" text="圖層下移" />
      <toolbar-button command="toFront" icon="to-front" text="圖層上移" />
      <toolbar-button command="addGroup" icon="group" text="群組" />
      <toolbar-button command="unGroup" icon="ungroup" text="取消群組" />
      <toolbar-button command="selectAll" icon="select-all" text="全選" />
      <toolbar-button command="multiSelect" icon="select" text="框選" />
    </template>
    <div v-if="!readOnly" class="split" />

    <!---->
    <div v-if="buttonsCollapseWidth" v-b-toggle.collapse-buttons size="sm" class="collapse-btn">
      <b-icon-chevron-down />
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
          text="保存資料"
          label="保存資料"
        />
        <toolbar-button
          command="downloadImage"
          icon="image"
          text="下載圖像"
          label="下載圖像"
        />
      </div>
      <b-button v-b-modal="'query-modal'" size="sm" class="mx-1">單號查詢</b-button>
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
          <toolbar-button command="generateData" icon="save" text="生成資料" />
          <toolbar-button command="downloadImage" icon="image" text="下載圖像" />
        </div>
        <b-button size="sm" @click.prevent="handleToggleReadOnly">{{
          readOnly ? "編輯模式" : "唯讀模式"
        }}</b-button>
      </div>
    </b-collapse>

    <b-modal id="query-modal" hide-header>
      <b-input-group prepend="ProdNo">
        <b-form-input v-model="prodNo" type="text" aria-label="Text input with checkbox" />
      </b-input-group>

      <template #modal-footer>
        <b-button
          variant="secondary"
          size="sm"
          class="d-block w-100"
          @click="fetchChartData"
        >
          查詢
        </b-button>
      </template>
    </b-modal>
  </toolbar>
</template>

<script>
import { Toolbar } from 'vue-flowchart-editor'
import ToolbarButton from './ToolbarButton.vue'
import { DetectiveWidth } from '@/mixins/mixin.detectiveWidth'

export default {
  name: 'EditorToolbar',
  components: {
    Toolbar,
    ToolbarButton
  },
  mixins: [DetectiveWidth],
  // props: ['chartData', 'toggleReadOnly', 'readOnly'],
  props: {
    readOnly: Boolean,
    chartData: {
      type: Object,
      default: function() {
        return { }
      }
    }
  },
  data() {
    return {
      prodNo: '305AA-AK002-N09',
      groupCollapse: {
        one: true,
        two: true,
        three: true
      }
    }
  },
  computed: {
    toolbarCollapseWidth() {
      /**
       * 工具列在1056寬度下會出現縮放節點
       */
      if (this.windowWidth < 1056) {
        return true
      }

      return false
    },
    buttonsCollapseWidth() {
      /**
       * 工具列在765寬度會收納右半側按鈕
       */
      if (this.windowWidth < 765) {
        return true
      }

      return false
    }
  },
  watch: {
    windowWidth() {
      if (this.toolbarCollapseWidth) {
        this.handleGroupCollapse()
      } else {
        const group = this.groupCollapse

        // check only one true

        Object.keys(group).forEach(g => {
          group[g] = true
        })
      }
    }
  },
  methods: {
    toggleGroup(v) {
      const group = this.groupCollapse

      switch (v) {
        case 1:
          group.one = !group.one
          break
        case 2:
          group.two = !group.two
          break
        case 3:
          group.three = !group.three
          break
        default:
          console.log('not a group')
      }
    },
    handleGroupCollapse(i = 'one') {
      const group = this.groupCollapse

      // check only one true

      Object.keys(group).forEach(g => {
        group[g] = g === i
      })
    },
    handleToggleReadOnly() {
      this.$parent.$parent.$parent.$emit('toggle-read-only')
    },
    fetchChartData() {
      // example value '305AA-AK002-N09'
      this.$store.dispatch('ChartData/fetchChartData', this.prodNo)

      this.$bvModal.hide('query-modal')

      this.$parent.$parent.$parent.$emit('refresh')
    }
  }
}
</script>

<style lang="scss">
button.close {
  &.close {
    outline: none;
  }
}
</style>
