import { fetch } from '@/api/chartData'

const state = {
  chartData: {
    nodes: [],
    edges: []
  }
}

const actions = {
  fetchChartData({ commit }, params) {
    const query = JSON.stringify(params.trim())

    return new Promise((resolve, reject) => {
      fetch(query).then(response => {
        // console.log(response)
        commit('SET_ChartData', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const mutations = {
  SET_ChartData(state, payload) {
    state.chartData = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
