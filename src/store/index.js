import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

import city from './modules/city/index.js'

Vue.use(Vuex)

const _mutations = Object.assign({}, mutations)
const _actions = Object.assign({}, actions)
const _getters = Object.assign({}, getters)

const state = {

}

export default new Vuex.Store({
  namespaced: true,
  state,
  mutations: _mutations,
  actions: _actions,
  getters: _getters,
  modules: {
    city
  }
})
