/**
 * @Description: 自定义指令导出
 * @Author: Zander
 * @Date: 2022/5/6 16:08
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 16:08
 */
import Vue from 'vue';

const directives = require.context('./directives', false, /\.js/);
directives.keys().forEach(fileName => {
  const directiveConfig = directives(fileName);
  const directiveName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
  Vue.directive(directiveName, directiveConfig.default || directiveConfig)
})
