import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vuelidate from 'vuelidate'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'



Vue.use(Vuelidate)
Vue.use(VueFire)

Vue.use(Vuetify, {
  iconfont: 'fa'
 })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
