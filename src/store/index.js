import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import user from './modules/user'
import getters from './getters'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ['user']
})

let store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    user
  },
  getters
})

export default store
