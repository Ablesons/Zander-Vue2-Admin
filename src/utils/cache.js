/**
 * @Description: 字典缓存获取公共方法
 * @Author: Zander
 * @Date: 2022/5/16 15:39
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/16 15:39
 */
import store from '@/store';

export const getDic = (key) => {
  store.dispatch('cache/initCacheData').then(() => {})
  return store.getters.dataDic[`${key}`];
}
export const getDicName = (key, value) => {
  store.dispatch('cache/initCacheData').then(() => {})
  return store.getters.dataName[`${key}${value}`];
}
export const getDicValue = (key, value) => {
  store.dispatch('cache/initCacheData').then(() => {})
  return store.getters.dataValue[`${key}${value}`];
}
export const getSysConfig = (key) => {
  store.dispatch('cache/initCacheData').then(() => {})
  return store.getters.sysConfig[`${key}`];
}
