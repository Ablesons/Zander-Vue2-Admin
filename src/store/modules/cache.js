/**
 * @Description: 服务端数据缓存
 * @Author: Zander
 * @Date: 2022/5/4 22:30
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/4 22:30
 */
import { apiGetCacheData, apiRefreshCacheData } from '@api/sys/cache';
import { sessionStorageUtils } from '@utils/storage';

const CACHEDATA_KEY = 'CACHEDATA'
const state = {
  // 字典集合
  dataDic: {},
  // 字典值
  dataValue: {},
  // 字典值名称
  dataName: {},
  // 系统配置
  sysConfig: {}
}

const mutations = {
  SET_DATADIC: (state, dataDic) => {
    state.dataDic = dataDic;
  },
  SET_DATAVALUE: (state, dataValue) => {
    state.dataValue = dataValue;
  },
  SET_DATANAME: (state, dataName) => {
    state.dataName = dataName;
  },
  SET_SYSCONFIG: (state, sysConfig) => {
    state.sysConfig = sysConfig;
  }
}

const actions = {
  async init({ commit }) {
    apiGetCacheData().then(result => {
      if (result.success) {
        const { dataDic, dataValue, dataName, sysConfig } = result.data;
        sessionStorageUtils.setItem(CACHEDATA_KEY, result.data);
        commit('SET_DATADIC', dataDic);
        commit('SET_DATAVALUE', dataValue);
        commit('SET_DATANAME', dataName);
        commit('SET_SYSCONFIG', sysConfig);
      }
    })
  },
  initCacheData({ commit, state }) {
    if (Object.keys(state.dataDic).length === 0) {
      const {
        dataDic,
        dataValue,
        dataName,
        sysConfig
      } = sessionStorageUtils.getItem(CACHEDATA_KEY);
      if (dataDic) {
        commit('SET_DATADIC', dataDic);
        commit('SET_DATAVALUE', dataValue);
        commit('SET_DATANAME', dataName);
        commit('SET_SYSCONFIG', sysConfig);
      } else {
        apiGetCacheData().then(result => {
          if (result.success) {
            const { dataDic, dataValue, dataName, sysConfig } = result.data;
            sessionStorageUtils.setItem(CACHEDATA_KEY, result.data);
            commit('SET_DATADIC', dataDic);
            commit('SET_DATAVALUE', dataValue);
            commit('SET_DATANAME', dataName);
            commit('SET_SYSCONFIG', sysConfig);
          }
        })
      }
    }
  },
  async refreshCacheData({ commit }) {
    apiRefreshCacheData().then(result => {
      if (result.success) {
        const { dataDic, dataValue, dataName, sysConfig } = result.data;
        sessionStorageUtils.setItem(CACHEDATA_KEY, result.data);
        commit('SET_DATADIC', dataDic);
        commit('SET_DATAVALUE', dataValue);
        commit('SET_DATANAME', dataName);
        commit('SET_SYSCONFIG', sysConfig);
      }
    })
  },
  async clear({ commit }) {
    sessionStorageUtils.removeItem(CACHEDATA_KEY);
    commit('SET_DATADIC', {});
    commit('SET_DATAVALUE', {});
    commit('SET_DATANAME', {});
    commit('SET_SYSCONFIG', {});
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
