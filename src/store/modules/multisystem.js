/**
 * @Description: 是否为多系统模式
 * @Author: Zander
 * @Date: 2022/5/4 22:34
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/4 22:34
 */
import { defaultSettings } from '@/config';
import { commonUtils } from '@utils/common';
import { apiProjectsByAppIds } from '@api/sys/project';
import { getToken } from '@utils/auth';

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
  initUserSystem({ commit, dispatch, state }) {
    return new Promise(resolve => {
      dispatch('user/getUserInfo', null, { root: true }).then(async (result) => {
        if (result) {
          const { resources } = result;
          const sysArray = commonUtils.serializeArray(resources, 'projectId');
          await apiProjectsByAppIds(sysArray.join(',')).then(projectResult => {
            commit('SET_USERSYS', projectResult.data)
            commit('SET_USERSYSNUM', state.userSys.length)
            if (state.userSys) {
              state.userSys.map(item => {
                if (item.appId.toUpperCase() === state.appId.toUpperCase()) {
                  commit('SET_SYSNAME', item.name);
                }
              });
            }
          });
        }
        resolve(result);
      });
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

/**
 * 获取系统跳转Url并追加token
 * @param appId
 */
export const getMulSysUrl = (appId) => {
  if (state.userSys) {
    let sysInfo = {};
    state.userSys.map(item => {
      if (item.appId.toUpperCase() === appId) {
        sysInfo = item;
      }
    })

    if (sysInfo) {
      let url = sysInfo.webAddr ? sysInfo.webAddr : '';

      let token = getToken();

      token = encodeURIComponent(token);

      url = `${url}#/auth?token=${token}`;

      return url;
    }
  }
  return ''
}
