<template>
  <context-menu class="contextMenu">
    <node-menu>
      <menu-li command="copy" text="複製" />
      <menu-li command="delete" text="刪除" />
    </node-menu>
    <edge-menu>
      <menu-li command="delete" text="刪除" />
    </edge-menu>
    <group-menu>
      <menu-li command="copy" text="複製" />
      <menu-li command="delete" text="刪除" />
      <menu-li command="unGroup" icon="ungroup" text="取消群組" />
    </group-menu>
    <multi-menu>
      <menu-li command="copy" text="複製" />
      <menu-li command="paste" text="貼上" />
      <menu-li command="addGroup" icon="group" text="群組" />
      <menu-li command="delete" text="刪除" />
    </multi-menu>
    <canvas-menu>
      <menu-li command="undo" text="撤銷" />
      <menu-li command="redo" text="重做" />
      <menu-li command="pasteHere" icon="paste" text="貼上到此" />
    </canvas-menu>
  </context-menu>
</template>

<script>
import {
  NodeMenu,
  EdgeMenu,
  GroupMenu,
  MultiMenu,
  CanvasMenu,
  ContextMenu
} from "vue-flowchart-editor";
import MenuLi from "./ContextMenuItem";

export default {
  name: "EditorContextMenu",
  components: {
    NodeMenu,
    EdgeMenu,
    GroupMenu,
    MultiMenu,
    CanvasMenu,
    ContextMenu,
    MenuLi
  }
};
</script>

<style lang="scss">
.contextMenu {
  display: none;
  overflow: hidden;
  font-size: 12px;
  background: rgba($color: #000000, $alpha: 0.8);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  .command {
    &.disable {
      .item {
        color: rgb(138, 138, 138);

        cursor: auto;

        &:hover {
          background: rgba($color: #000000, $alpha: 0.6);
        }
      }
    }
  }

  .item {
    display: flex;
    align-items: center;
    padding: 5px 12px;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
    color: rgb(255, 255, 255);

    &:hover {
      background: rgba($color: #000000, $alpha: 0.6);
    }

    i {
      margin-right: 8px;
      // margin-top: 3px;
    }

    span {
      padding-top: 2px;
    }
  }
}
</style>
