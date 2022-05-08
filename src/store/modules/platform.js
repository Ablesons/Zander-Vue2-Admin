/**
 * @Description: 多平台模式
 * @Author: Zander
 * @Date: 2022/5/4 22:34
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/4 22:34
 */
import { defaultSettings } from '@/config';
import { Message } from 'element-ui';

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

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
