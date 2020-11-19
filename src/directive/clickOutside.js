import Vue from 'vue'

Vue.directive('click-outside', {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }

    window.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function(el) {
    window.removeEventListener('click', el.clickOutsideEvent)
  }
})
