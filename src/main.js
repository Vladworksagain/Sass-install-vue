import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from '../src/router/index'
import store from './store/index'
import Vuelidate from 'vuelidate'
import './filter/filter'

Vue.use(VueRouter)
Vue.use(Vuelidate)

export const eventBus = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
