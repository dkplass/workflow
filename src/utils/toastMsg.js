import Vue from 'vue'

/**
 * 提示訊息函數
 * @param {string} msg
 * @param {string} title
 * @param {string} variant
 * @param {int} autoHideDelay
 */

export const toastMsg = (msg, title = '', variant = 'info', autoHideDelay = 5000) => {
  const vm = new Vue()

  vm.$bvToast.toast(`${msg}`, {
    title,
    variant,
    autoHideDelay
  })
}
