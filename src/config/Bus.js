import Vue from 'vue'
const bus = new Vue()

bus.$on('reload', function () {
  window.location.reload()
})

export default bus
