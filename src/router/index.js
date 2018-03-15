import Vue from 'vue'
import Router from 'vue-router'

const home = r => {require(['./../pages/home/home.vue'], r)}
const login = r => {require(['./../pages/login/login.vue'], r)}
const city = r => {require(['./../pages/city/city.vue'], r)}
const msite = r => {require(['./../pages/msite/msite.vue'], r)}
const food = r => {require(['./../pages/food/food.vue'], r)}
const shop = r => {require(['./../pages/shop/shop.vue'], r)}
const search = r => {require(['./../pages/search/search.vue'], r)}
const searchGeohash = r => {require(['./../pages/search/geohash/geohash.vue'], r)}

Vue.use(Router)

let routes = [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/city/:id',
      name: 'city',
      component: city
    },
    {
      path: '/msite',
      name: 'msite',
      component: msite,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/food',
      name: 'food',
      component: food
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      children: [
        {
          path: 'geohash',
          name: 'searchGeohash',
          component: searchGeohash
        }
      ]
    }
  ]

export default new Router({
  routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  }
})
