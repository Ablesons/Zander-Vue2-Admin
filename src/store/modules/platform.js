/**
 * @Description: 多平台模式
 * @Author: Zander
 * @Date: 2022/5/4 22:34
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/4 22:34
 */
import { defaultSettings } from '@/config';
import { Message } from 'element-ui';
import { apiPlatformChangePlatform, apiPlatformListCadePlatform } from '@api/sys/platform';
import { sessionStorageUtils } from '@utils/storage';
import { isEmpty } from '@utils/verify';
const CACHE_KEY = 'USER_PLATFORM_KEY'

const state = {
  /**
   * 是否多平台模式
   */
  isPlatform: defaultSettings.isPlatform || false,
  /**
   * 当前平台ID
   */
  platformId: '',
  /**
   * 当前平台名称
   */
  platformName: '',
  /**
   * 登录用户可访问的授权平台
   */
  userPlatforms: [],
  /**
   * 登录用户可访问的授权平台数
   */
  userPlatformsNum: 0
}

const mutations = {
  SET_ISPLATFORM: (state, flag) => {
    state.isPlatform = flag;
  },
  SET_PLATFORMID: (state, id) => {
    state.platformId = id;
  },
  SET_PLATFORMNAME: (state, name) => {
    state.platformName = name;
  },
  SET_USERPLATFORMS: (state, arr) => {
    state.userPlatforms = arr;
  },
  SET_USERPLATFORMSNUM: (state, num) => {
    state.userPlatformsNum = num;
  }
}

const actions = {
  /**
   * 设置用户账号
   * @param commit
   * @param userPlatform
   */
  setUserPlatform({ commit }, userPlatform) {
    apiPlatformChangePlatform(userPlatform.id).then(result => {
      const { success, message } = result;
      if (success) {
        sessionStorageUtils.setItem(CACHE_KEY, userPlatform);
        commit('SET_PLATFORMID', userPlatform.id)
        commit('SET_PLATFORMNAME', userPlatform.name)
      } else {
        Message({
          message: message,
          type: 'warning'
        });
      }
    })
  },
  /**
   * 初始化当前用户授权平台
   */
  initUserPlatform({ commit, dispatch }) {
    apiPlatformListCadePlatform({}).then(result => {
      const { success, message, data } = result;
      if (success) {
        if (data.length > 0) {
          commit('SET_USERPLATFORMS', data)
          commit('SET_USERPLATFORMSNUM', data.length)
        }
        let userPlatform = null;
        const userPlatformCache = sessionStorageUtils.getItem(CACHE_KEY)

        if (userPlatformCache) {
          for (const item of data) {
            if (item.id === userPlatformCache.id) {
              userPlatform = item;
              break;
            }
          }
        }

        if (!userPlatform) {
          userPlatform = data[0];
        }
        dispatch('setUserPlatform', userPlatform)
      } else {
        Message({
          message: message,
          type: 'warning'
        });
      }
    })
  },
  switchUserPlatform({ state, dispatch }, platformId) {
    if (isEmpty(platformId)) {
      Message({
        message: '平台切换失败!',
        type: 'warning'
      });
    } else {
      if (state.userPlatforms && state.userPlatforms.length > 0) {
        let userPlatform = null;
        for (const item of state.userPlatforms) {
          if (item.id === platformId) {
            userPlatform = item;
            break;
          }
        }

        if (userPlatform) {
          dispatch('setUserPlatform', userPlatform);
        } else {
          Message({
            message: '未查询到授权平台!',
            type: 'warning'
          });
        }
      } else {
        Message({
          message: '未查询到可切换平台!',
          type: 'warning'
        });
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
