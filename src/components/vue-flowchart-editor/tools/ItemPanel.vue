<template>
  <item-panel class="item-panel">
    <template v-for="(item, index) in nodeItems">
      <item
        :key="index"
        :type="item.type || 'node'"
        :size="item.size || '80*48'"
        :shape="item.shape || 'flow-rect'"
        :model="{
          color: item.model.color || '#1890FF',
          label: item.model.label || '節點',
          ...item.model
        }"
      >
        <template v-if="item.src">
          <div class="item item-img">
            <img :src="item.src" :alt="item.model.label">
          </div>
        </template>
        <template v-else>
          <div :class="'item item-' + (item.shape || 'flow-rect')">
            <span>{{ item.model.label || "節點" }}</span>
          </div>
        </template>
      </item>
    </template>
  </item-panel>
</template>

<script>
import { Item, ItemPanel } from 'vue-flowchart-editor'

export default {
  name: 'EditorItemPanel',
  components: { ItemPanel, Item },
  props: {
    nodeItems: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.item-panel {
  width: 100%;
  height: 100%;
  padding: 0.4rem;
  text-align: center;
  overflow-y: auto;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    user-select: none;

    &.item-flow-rect {
      width: 100px;
      height: 50px;
      border: 1px solid rgb(24, 144, 255);
      background-color: rgba(24, 144, 255, 0.2);
    }

    &.item-flow-circle {
      width: 70px;
      height: 70px;
      border-radius: 60px;
      border: 1px solid rgb(250, 140, 22);
      background-color: rgba(250, 140, 22, 0.2);
    }

    &.item-flow-rhombus {
      width: 70px;
      height: 70px;
      margin: 25px auto;
      border: 1px solid rgb(19, 194, 194);
      background-color: rgba(19, 194, 194, 0.2);
      transform: rotate(45deg);

      span {
        transform: rotate(-45deg);
      }
    }

    &.item-flow-capsule {
      width: 100px;
      height: 50px;
      border-radius: 99em;
      border: 1px solid rgb(19, 194, 194);
      background-color: rgba(19, 194, 194, 0.2);
    }

    &.item-flow-ellipse {
      width: 100px;
      height: 70px;
      border-radius: 50%;
      border: 1px solid rgb(19, 194, 194);
      background-color: rgba(19, 194, 194, 0.2);
    }

    &.item-flow-diamond {
      position: relative;
      height: 50px;
      width: 50px;
      text-align: center;

      &:before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        transform: rotateX(45deg) rotateZ(45deg);
        background-color: rgba(19, 194, 194, 0.2);
      }

      &:after {
        content: "";
        position: absolute;
        top: -1px;
        left: -1px;
        height: calc(100% + 2px);
        width: calc(100% + 2px);
        border: 1px solid rgb(19, 194, 194);
        transform: rotateX(45deg) rotateZ(45deg);
      }

      span {
        z-index: 99;
        // transform: translateY(-40px);
      }
    }

    &.item-flow-triangle {
      position: relative;
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 60px solid rgb(41, 199, 199);

      &:before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-left: 48px solid transparent;
        border-right: 48px solid transparent;
        border-bottom: 58px solid #d0f3f3;
        top: 1px;
        left: -48px;
      }

      span {
        transform: translateY(40px);
      }
    }

    &.item-img {
      max-width: 100px;
    }
  }
}
</style>
