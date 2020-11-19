<template>
  <div class="color-picker">
    <div class="color-picker-flyout">
      <!-- <div class="color-chip" /> -->
      <div class="color-picker-inner">
        <div class="control">
          <input id="hsl-h" v-model.number="h" type="range" min="0" step="0.1" max="360">
        </div>
        <div class="control">
          <input id="hsl-s" v-model.number="s" type="range" min="0" step="0.1" max="100">
        </div>
        <div class="control">
          <input id="hsl-l" v-model.number="l" type="range" min="0" step="0.1" max="100">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: {
    initColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      h: 0,
      s: 0,
      l: 0
    }
  },
  watch: {
    h() {
      const hex = this.HSLToHex()
      this.$emit('update-color', hex)
    },
    s() {
      const hex = this.HSLToHex()
      this.$emit('update-color', hex)
    },
    l() {
      const hex = this.HSLToHex()
      this.$emit('update-color', hex)
    }
  },
  mounted() {
    this.hexToHSL(this.initColor)
  },
  methods: {
    hexToHSL(hex) {
      // convert to rgb first
      let r = 0; let g = 0; let b = 0

      if (hex.length === 4) {
        r = '0x' + hex[1] + hex[1]
        g = '0x' + hex[2] + hex[2]
        b = '0x' + hex[3] + hex[3]
      } else if (hex.length === 7) {
        r = '0x' + hex[1] + hex[2]
        g = '0x' + hex[3] + hex[4]
        b = '0x' + hex[5] + hex[6]
      }

      // then convert to hsl
      r /= 255
      g /= 255
      b /= 255

      const cmin = Math.min(r, g, b)
      const cmax = Math.max(r, g, b)
      const delta = cmax - cmin
      let h = 0
      let s = 0
      let l = 0

      if (delta === 0) { h = 0 } else if (cmax === r) { h = ((g - b) / delta) % 6 } else if (cmax === g) { h = (b - r) / delta + 2 } else { h = (r - g) / delta + 4 }

      h = Math.round(h * 60)

      if (h < 0) { h += 360 }

      l = (cmax + cmin) / 2
      s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
      s = +(s * 100).toFixed(1)
      l = +(l * 100).toFixed(1)

      this.h = h
      this.s = s
      this.l = l
    },
    HSLToHex() {
      const h = this.h; let s = this.s; let l = this.l
      s /= 100
      l /= 100

      const c = (1 - Math.abs(2 * l - 1)) * s
      const x = c * (1 - Math.abs((h / 60) % 2 - 1))
      const m = l - c / 2
      let r = 0
      let g = 0
      let b = 0

      if (h >= 0 && h < 60) {
        r = c; g = x; b = 0
      } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0
      } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x
      } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c
      } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c
      } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x
      }
      // Having obtained RGB, convert channels to hex
      r = Math.round((r + m) * 255).toString(16).toUpperCase()
      g = Math.round((g + m) * 255).toString(16).toUpperCase()
      b = Math.round((b + m) * 255).toString(16).toUpperCase()

      // Prepend 0s, if necessary
      if (r.length === 1) { r = '0' + r }
      if (g.length === 1) { g = '0' + g }
      if (b.length === 1) { b = '0' + b }

      return '#' + r + g + b
    }
  }
}
</script>

<style lang="scss" scoped>
.color-picker {
  width: 100%;
  position: absolute;
  left: 0;
  top: 1.4rem;

  .color-picker-flyout {
    width: 100%;
    border: 1px solid #000;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.12);
    font-family: "Roboto", "Helvetica Neue", sans-serif;
    z-index: 2;

    .color-chip {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      border-radius: 4px 4px 0 0;
    }

    .color-picker-inner {
      // padding: 1.5rem 1ream;
      margin: 1rem;

      .control {
        width: 100%;
        height: 12px;
        border-radius: 12px;
        // border: 1px solid #ddd;

        input[type=range] {
          display: block;
          appearance: none;
          background-color: currentColor;
          background-origin: content-box;
          background-repeat: no-repeat;
          border-radius: 1rem;
          color: inherit;
          height: 1rem;
          margin: 0 0 1rem;
          padding: 0;
          width: 100%;

          &:focus {
            outline: none;
          }

          &::-moz-range-track {
            background-color: transparent;
          }

          &::-moz-range-thumb {
            background-color: transparent;
            border: 0;
            border-radius: 100%;
            box-shadow:
              inset 0 0 0 .125rem currentColor,
              inset 0 0 0 .25rem #fff;
            height: 1.2rem;
            width: 1.2rem;
          }

          &::-webkit-slider-runnable-track {
            margin: 0 -.5rem;
          }

          &::-webkit-slider-thumb {
            appearance: none;
            background-color: transparent;
            border-radius: 100%;
            box-shadow:
              inset 0 0 0 .125rem currentColor,
              inset 0 0 0 .25rem #fff;
            height: 1.2rem;
            width: 1.2rem;
          }

          &::-ms-track {
            width: 100%;
            cursor: pointer;
            background: transparent;
            border-color: transparent;
            color: transparent;
          }
        }
      }

      .control + .control {
        margin-top: 1rem;
      }
    }
  }
}

#hsl-h {
  background-image: linear-gradient(
    to right,
    #F00,
    #FF0,
    #0F0,
    #0FF,
    #00F,
    #F0F,
    #F00
  );
}

#hsl-s {
  background-image: linear-gradient(
    to right,
    #888,
    transparent
  );
}

#hsl-l {
  background-image: linear-gradient(
    to right,
    #000,
    transparent,
    #FFF
  );
}
</style>
