<template>
  <div>
    <form readonly>
      <div v-if="type === 'node'">
        <!--  customize properties -->
        <p class="form-item">
          <label>ID</label>
          <input v-model="formModel.id" type="text" disabled class="w-100">
        </p>
        <p class="form-item">
          <label>名稱</label>
          <select v-model="formModel.label" class="w-100">
            <option value="領料">領料</option>
            <option value="外加">外加</option>
            <option value="內加">內加</option>
            <option value="裁切">裁切</option>
            <option value="超入">超入</option>
            <option value="超出">超出</option>
            <option value="針入">針入</option>
            <option value="針出">針出</option>
            <option value="品入">品入</option>
            <option value="品出">品出</option>
            <option value="外廠">外廠</option>
          </select>
          <!-- <input v-model="formModel.label" type="text"> -->
        </p>
        <p v-for="item in formModel.data" :key="item.name" class="form-item">
          <label>{{ item.name }}</label>
          <input v-model="item.value" class="w-100">
        </p>
        <hr>
        <p class="form-item">
          <label>顏色</label>
          <span v-click-outside="closeColorPicker" class="w-100 position-relative">
            <input :value="formModel.style.fill | hexFormat" class="w-100" :style="{ 'backgroundColor': formModel.style.fill }" @input="setColor" @click="colorPickerOpen = !colorPickerOpen">
            <ColorPicker v-if="colorPickerOpen" :init-color="formModel.style.fill" @update-color="updateColor" />
          </span>
        </p>
        <p class="form-item">
          <label>形狀</label>
          <select v-model="formModel.shape" class="w-100">
            <option value="">-- 請選擇節點的形狀 --</option>
            <option value="flow-rect">rect</option>
            <option value="flow-circle">circle</option>
            <option value="flow-rhombus">rhombus</option>
            <option value="flow-capsule">capsule</option>
          </select>
        </p>
        <p class="form-item">
          <label>尺寸</label>
          <input v-model="formModel.size" class="w-100">
          <!-- <input v-model="nodeSizeWidth" class="w-50 mr-1">
          *
          <input v-model="nodeSizeHeight" class="w-50 ml-1"> -->
        </p>
        <p class="form-item">
          <b-button v-if="!readOnly" size="sm" class="w-100" @click.prevent="handleSubmit">
            更新
          </b-button>
        </p>
      </div>
      <div v-else-if="type === 'edge'">
        <!-- <p>
          <select v-model="formModel.shape">
            <option value="">-- 請選擇邊框的形狀 --</option>
            <option value="flow-polyline">Polyline</option>
            <option value="flow-smooth">Smooth</option>
            <option value="flow-polyline-round">Polyline Round</option>
            <option value="custom-polyline">Custom Polyline</option>
          </select>
        </p> -->
        <p class="form-item">
          <label>id</label>
          <input v-model="formModel.id" disabled>
        </p>
        <p class="form-item">
          <label>名稱</label>
          <input v-model="formModel.label">
        </p>
        <p v-for="item in formModel.data" :key="item.name" class="form-item">
          <label>{{ item.name }}</label>
          <input v-model="item.value">
        </p>
        <p class="form-item">
          <b-button @click.prevent="handleSubmit">更新</b-button>
        </p>
      </div>
      <div v-else-if="type === 'group'">
        <input v-model="formModel.label" @blur.prevent="handleSubmit">
      </div>
    </form>
  </div>
</template>

<script>
import ColorPicker from '@/components/color-picker/ColorPicker.vue'

export default {
  name: 'EditorDetailForm',
  inject: ['root'],
  // props: ['type', 'readOnly'],
  components: {
    ColorPicker
  },
  props: {
    type: {
      type: String,
      default: 'node'
    },
    readOnly: Boolean
  },
  data() {
    return {
      formModel: {},
      maxNodeWidth: 200,
      defaultNodeWidth: 80,
      defaultNodeHeight: 48,
      fontSize: 12,
      colorPickerOpen: false
    }
  },
  computed: {
    nodeSizeWidth: {
      get() {
        const width = this.formModel.size ? this.formModel.size.split('*')[0] : ''
        return width
      },
      set(v) {
        const width = v
        const size = this.formModel.size.split('*')
        size[0] = width
        this.formModel.size = size.join('*')
      }
    },
    nodeSizeHeight: {
      get() {
        const height = this.formModel.size ? this.formModel.size.split('*')[1] : ''
        return height
      },
      set(v) {
        const height = v
        const size = this.formModel.size.split('*')
        size[1] = height
        this.formModel.size = size.join('*')
      }
    }
  },
  created() {
    const formModel = this.root.propsAPI.getSelected()[0].getModel()
    this.formModel = Object.assign(
      {},
      { shape: 'flow-polyline' },
      JSON.parse(JSON.stringify(formModel))
    )
  },
  methods: {
    handleSubmit() {
      const { getSelected, executeCommand, update } = this.root.propsAPI
      const { formModel } = this
      setTimeout(() => {
        const item = getSelected()[0]
        if (!item) return
        // 自動調整尺寸
        const adjustSize = model => {
          if (model.type !== 'node' || model.shape !== 'flow-rect') {
            return model
          }
          const canvas = document.createElement('canvas')
          const canvasContext = canvas.getContext('2d')
          canvasContext.font = this.fontSize + 'px System'
          const maxWidth = this.maxNodeWidth
          const label = model.label.replace('\n', '')
          const sourceWidth = this.defaultNodeWidth
          const sourceHeight = this.defaultNodeHeight
          const spacing = 10
          const widthWithSpacing = canvasContext.measureText(label).width + spacing
          model.size = `${sourceWidth}*${sourceHeight}` // 先恢復默認尺寸
          if (widthWithSpacing <= sourceWidth || sourceWidth >= maxWidth) {
            return model
          }
          // 自動撐寬
          if (widthWithSpacing <= maxWidth) {
            return {
              ...model,
              size: `${widthWithSpacing}*${sourceHeight}`
            }
          }
          // 自動拆行
          let multilineText = ''
          let multilineCount = 1
          let multilineTextWidth = 0
          for (const char of label) {
            const { width } = canvasContext.measureText(char)
            if (multilineTextWidth + width + spacing >= maxWidth) {
              multilineText += '\n'
              multilineTextWidth = 0
              multilineCount++
            }
            multilineText += char
            multilineTextWidth += width
          }
          return {
            ...model,
            label: multilineText,
            size: `${maxWidth}*${Math.max(
              sourceHeight,
              this.fontSize * multilineCount * 1.2 + spacing
            )}`
          }
        }
        const newFormModel = adjustSize(formModel)
        console.log(newFormModel)
        executeCommand(() => {
          update(item, newFormModel)
        })
      }, 0)
    },
    updateColor(hex) {
      this.formModel.style.fill = hex
      this.formModel.style.stroke = hex
      console.log(hex)
    },
    closeColorPicker() {
      this.colorPickerOpen = false
    },
    setColor(e) {
      console.log(e.target.value)
      this.formModel.style.fill = e.target.value
      // value => formModel.style.fill = value
    }
  }
}
</script>

<style lang="scss" scoped>
hr {
  height: 0;
  border: 0;
  border-top: 1px dashed #ccc;
}

.form-item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;

  label {
    width: 70px;
    margin: 0 10px 0 0;
    text-align: right;
  }

  input {
    width: 160px;
  }

  button {
    width: 160px;
    margin: 0 auto;
  }
}
</style>
