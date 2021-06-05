import Vue from 'vue'
import Vuex from 'vuex'
import canvas from './modules/canvas'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    canvas,
  },
  getters
})

export default store
