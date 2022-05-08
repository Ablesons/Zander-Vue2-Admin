/**
 * @Description: 是否为多系统模式
 * @Author: Zander
 * @Date: 2022/5/4 22:34
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/4 22:34
 */
import { defaultSettings } from '@/config';

const state = {
  // 是否多系统模式
  isMulSys: defaultSettings.isMulSys || false,
  // 当前系统appId
  appId: defaultSettings.appInfo.AppId || '',
  // 当前登录系统名称
  sysName: '',
  // 登录用户可访问的授权系统
  userSys: {},
  // 登录用户可访问的授权系统数
  userSysNum: 0
}

const mutations = {
  SET_SYSNAME: (state, name) => {
    state.sysName = name;
  },
  SET_USERSYS: (state, obj) => {
    state.userSys = obj;
  },
  SET_USERSYSNUM: (state, num) => {
    state.userSysNum = num;
  }
}

const actions = {
  initUserSystem({ commit, state }) {
    console.log(commit);
    console.log(state);
    // return new Promise((resolve, reject) => {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
