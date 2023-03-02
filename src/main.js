import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import 'vue2-datepicker/index.css'
import './assets/style.css'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router: new VueRouter(router)
}).$mount('#app')
