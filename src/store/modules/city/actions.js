import types from './mutationTypes.js'

export default {
  saveSearchResult ({commit}, data) {
    commit(types.saveSearchResult, data)
  },
  saveSearchHistory ({commit}, data) {
    commit(types.saveSearchHistory, data)
  },
  getSearchHistory ({commit}) {
    commit(types.getSearchHistory)
  },
  clearHistory ({commit}) {
    commit(types.clearHistory)
  }
}
