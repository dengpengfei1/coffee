// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import FastClick from 'fastclick'
import store from './store/index.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body)
    }, false)
}

import 'mint-ui/lib/style.min.css'
import './config/rem.js'

Vue.use(Mint)
Vue.config.productionTip = false

// 路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.matched.length === 0) {
//     from.name ? next({name: from.name}) : next('/home')
//   } else {
//     if(!window.localStorage.user) {
//       if(to.fullPath === '/home') {
//         return next()
//       }
//       if (to.name !== 'login') {
//         next('/login')
//       } else {
//         next()
//       }
//     } else {
//       next()
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
