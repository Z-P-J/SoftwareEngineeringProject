import Vue from 'vue'
// import { Vue } from 'vue'
import axios from 'axios'
import APlayer from '@moefe/vue-aplayer';

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import { ElementUI } from 'element-ui'
import NMPlayer from 'nmplayer/dist/NMPlayer.esm'
import 'element-ui/lib/theme-chalk/index.css'
import filters from './filters'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(NMPlayer)
Vue.use(APlayer)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
