import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios'
import fastclick from 'fastclick'

import 'common/stylus/index.styl'
Vue.config.productionTip = false
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  render: h => h(App)
})
