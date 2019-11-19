import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({routes});

new Vue({
  render: h => h(App),
  vuetify, router
}).$mount('#app')
