import types from './mutationTypes.js'

export default {
  [types.saveSearchResult] (state, data) {
    state.citySearchResult = data.res
    state.cityName = data.address
  },
  [types.saveSearchHistory] (state, data) {
    let res = state.cityHistory.some(function (item) {
      return item.name === data.name
    })
    if (res && state.cityHistory.length !== 0) return
    state.cityHistory.push(data)
    let history = state.cityHistory
    history = JSON.stringify(history)
    window.localStorage.setItem('citySearchHistory', history)
  },
  [types.getSearchHistory] (state) {
    let res = window.localStorage.getItem('citySearchHistory', history)
    res = JSON.parse(res)
    if (!res) res = []
    state.cityHistory = res
  },
  [types.clearHistory] (state) {
    state.cityHistory = []
  }
}
