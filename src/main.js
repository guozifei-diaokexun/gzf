// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import './baseComponent' // 引入注册所有基本的组件
import store from './store'


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)

export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});


