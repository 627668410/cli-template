const state = {
  user: ''
}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
