import Vue from 'vue'
import VueBus from 'vue-bus'
// Normalize的作用就是统一浏览器的初始样式
import 'normalize.css';
// 配置element-ui组件库
import Element from 'element-ui'
import '@/styles/element-variables.scss'
// 全局样式
import '@/styles/index.scss'
import '@/plugins';
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/locales';
import '@/icons';

Vue.use(VueBus);

Vue.config.productionTip = false

Vue.use(Element, {
  size: store.getters.size,
  i18n: (key, value) => i18n.t(key, value),
  zIndex: 3000
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
