<template>
  <command :name="command">
    <div class="item">
      <icon :type="iconType" :title="text"></icon>
      <span>{{ label }}</span>
    </div>
  </command>
</template>

<script>
import { Command } from "vue-flowchart-editor";
import Icon from "./Icon.vue";

export default {
  name: "EditorContextMenuItem",
  components: {
    Command,
    Icon
  },
  props: ["command", "icon", "text"],
  computed: {
    iconType() {
      return `icon${this.icon || this.command}`;
    },
    label() {
      const capitalize = s => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
      };

      return this.text || capitalize(this.command);
    }
  }
};
</script>
