import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'

const state = {
  citySearchResult: [],
  cityName: '',
  cityHistory: []
}

const _mutations = Object.assign({}, mutations)
const _actions = Object.assign({}, actions)
const _getters = Object.assign({}, getters)

export default {
  namespaced: true,
  state,
  mutations: _mutations,
  getters: _getters,
  actions: _actions
}
