import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { post } from './utils/request'
import 'amfe-flexible'
import { Image, Tab, Tabs, Lazyload, NavBar, ImagePreview } from 'vant'

Vue.use(Image)
  .use(Tab)
  .use(Tabs)
  .use(Lazyload)
  .use(NavBar)
  .use(ImagePreview)

Vue.config.productionTip = false
Vue.prototype.$post = post

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
