// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false;


//使用懒加载插件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/static/loading-svg/loading-cylon.svg'
})

//使用无限滚动加载插件
Vue.use(infiniteScroll);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
