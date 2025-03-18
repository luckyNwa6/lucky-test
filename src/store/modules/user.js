export default {
  state: {
    token: ''
  },
  getters: {
    getToken(state) {
      return state.token
    },

  },
  mutations: {
    setToken(state, data) {
      state.token = data
    },

  },
  actions: {
    setToken({ commit }, data) {
      commit('setToken', data)
    },
  }
}
