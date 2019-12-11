import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/'
import PMonitor from './utils/performance'
import './router/permission'
import './plugins/element.js'
import '@/styles/index.scss'
import './icons'

Vue.config.productionTip = false

const pMonitor = new PMonitor()
pMonitor.init()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
