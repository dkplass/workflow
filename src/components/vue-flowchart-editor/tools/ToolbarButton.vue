<template>
  <command :name="command">
    <icon :type="iconType" :title="text" />
    <span v-if="label">{{ label }}</span>
  </command>
</template>

<script>
import { Command } from "vue-flowchart-editor";
import Icon from "./Icon.vue";

export default {
  name: "ToolbarButton",
  components: {
    Command,
    Icon
  },
  props: ["command", "icon", "text", "label"],
  computed: {
    iconType() {
      return `icon${this.icon || this.command}`;
    }
  }
};
</script>
