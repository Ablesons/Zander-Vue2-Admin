/**
 * @Description: 框架组件、插件注册
 * @Author: Zander
 * @Date: 2022/5/6 16:22
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 16:22
 */
import Vue from 'vue'

/// /////////////////////////////////////////////////////////
// 全局引入组件
/// /////////////////////////////////////////////////////////
import LoadScript from 'vue-plugin-load-script';

// 图片预览
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

import '@/directive'

/**
 * 注册全局自定义组件
 */
import BackToTop from '@components/BackToTop'
import ZdToolbar from '@components/Toolbar';
import ZdSelect from '@components/Select/Select';
import ZdTitle from '@components/Title'
import ZdTable from '@components/Table/index.vue';
import ZdDialog from '@components/Dialog';
import ZdUploadFile from '@components/Upload/upload.vue';

Vue.use(LoadScript);

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 5566
  }
});
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: 'data-source'
  }
});

/**
 * 全局自定义组件挂载
 */
Vue.component('BackToTop', BackToTop)
Vue.component('zd-toolbar', ZdToolbar)
Vue.component('zd-select', ZdSelect)
Vue.component('zd-title', ZdTitle)
Vue.component('zd-table', ZdTable)
Vue.component('zd-dialog', ZdDialog)
Vue.component('zd-upload', ZdUploadFile)
