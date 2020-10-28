<template>
  <div>
    <register-command
      name="generateData"
      :config="generateDataCommandConfig"
      extend="copy"
    ></register-command>
    <register-command
      name="downloadImage"
      :config="downloadImageCommandConfig"
      extend="copy"
    ></register-command>
  </div>
</template>

<script>
import { RegisterCommand } from "vue-flowchart-editor";

export default {
  name: "CustomCommand",
  components: {
    RegisterCommand
  },
  inject: ["root"],
  props: ["save", "download"],
  data() {
    const { propsAPI } = this.root;
    const { save, download } = this;
    return {
      generateDataCommandConfig: {
        queue: false, // 是否進入隊列，默認為true
        enable(/* editor */) {
          // 命令是否可用
          return true;
        },
        execute(/* editor */) {
          // 正向命令邏輯
          console.log("執行正向命令");
          const data = propsAPI.save();
          console.log(data);
          console.log(JSON.stringify(data));
          save(data);
          alert(JSON.stringify(data));
        },
        back(/* editor */) {
          // 反向命令邏輯
          console.log("執行反向命令");
        }
      },
      downloadImageCommandConfig: {
        queue: false,
        enable() {
          return true;
        },
        execute() {
          download();
        },
        back() {}
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
