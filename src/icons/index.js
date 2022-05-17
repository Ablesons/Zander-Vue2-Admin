/**
 * @Description: SVG图片导入
 * @Author: Zander
 * @Date: 2022/5/6 16:16
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 16:16
 */
import Vue from 'vue'
import IconSvg from '@components/IconSvg'

// 全局注册组件
Vue.component('icon-svg', IconSvg);

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
