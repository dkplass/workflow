<template>
  <div class="wrapper">
    <flowchart-editor
      ref="flowchartEditor"
      :key="reRender"
      :read-only="readOnly"
      :chart-data="flowChartData"
      :chart-data-node-items="flowChartNodeItems"
      @save-data="save"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FlowchartEditor from '@/components/vue-flowchart-editor/FlowchartEditor.vue'
// import chartData from '@/data/data'
import dataNodeItems from '@/data/dataNodeItems'
import { update } from '@/api/chartData'

export default {
  name: 'Home',
  components: {
    FlowchartEditor
  },
  data() {
    return {
      readOnly: false,
      reRender: +new Date(),
      // flowChartData: this.TEST,
      // CD: this.$store.getters.chartData,
      flowChartNodeItems: dataNodeItems
    }
  },
  computed: {
    ...mapGetters([
      'chartData'
    ]),
    flowChartData: {
      get: function() {
        return this.$store.getters.chartData
      },
      set: function(value) {
        return this.$store.commit('ChartData/SET_ChartData', value)
      }
    }
  },
  created() {
    // console.log(this.chartData)
  },
  mounted() {
    this.$on('toggle-read-only', (e) => {
      this.readOnly = !this.readOnly
      this.$nextTick(() => {
        this.reRender = +new Date() // 重新渲染组件
      })
    })

    this.$on('refresh', (e) => {
      setTimeout(() => {
        this.$nextTick(() => {
          this.reRender = +new Date() // 重新渲染组件
        })
      }, 1000)
    })
  },
  methods: {
    save(data) {
      // this.flowChartData = JSON.parse(JSON.stringify(data))
      // console.log(this.flowChartData)
      update(data).then(response => {
        this.$bvModal.msgBoxOk(response, {
          title: '更新訊息',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: '確認',
          headerClass: 'p-2',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        // console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
