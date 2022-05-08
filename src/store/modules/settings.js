/**
 * @Description: 系统设置
 * @Author: Zander
 * @Date: 2022/5/4 22:34
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/4 22:34
 */
import variables from '@/styles/element-variables.scss'
import { defaultSettings } from '@/config';

const state = {
  theme: variables.theme,
  showSettings: defaultSettings.showSettings,
  showTagsView: defaultSettings.showTagsView,
  fixedHeader: defaultSettings.fixedHeader,
  showSidebarLogo: defaultSettings.showSidebarLogo,
  sidebarTextTheme: defaultSettings.sidebarTextTheme,
  table: { align: 'center' },
  dialogForm: { width: '500' },
  autocomplete: 'off'
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
