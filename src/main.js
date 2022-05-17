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
import { axiosRequest } from '@utils/http/axios';

// vxe-table配置
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'

Vue.use(VXETable)
VXETable.use(VXETablePluginElement)

Vue.use(VueBus);

Vue.config.productionTip = false

// 初始化请求的封装函数
axiosRequest.init();

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
