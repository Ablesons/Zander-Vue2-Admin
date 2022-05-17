/**
 * @Description: 用户信息
 * @Author: Zander
 * @Date: 2022/5/4 22:35
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/4 22:35
 */
import { apiLogin, apiLoginByToken } from '@api/sys/users';
import { removeToken, setToken } from '@utils/auth';
import { resetRouter } from '@/router';
import { localStorageUtils, sessionStorageUtils } from '@utils/storage';

const LOGINUSERKEY = 'LOGINUSER';

const state = {
  ip: '',
  id: '',
  loginName: '',
  name: '',
  userType: '',
  // 用户状态（0，失效；1，生效）
  status: -1,
  // 是否第一次登录（0，否；1，是）
  firstLogin: -1,
  // 用户所属组织机构
  organizations: [],
  // 用户角色
  roles: [],
  // 用户拥有的权限
  resources: [],
  // 用户拥有的权限ID集合
  resIds: [],
  // 头像
  avatar: '',
  introduction: ''
}

const mutations = {
  SET_IP: (state, ip) => {
    state.ip = ip;
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_LOGINNAME: (state, loginName) => {
    state.loginName = loginName;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_USERTYPE: (state, userType) => {
    state.userType = userType;
  },
  SET_STATUS: (state, status) => {
    state.status = status;
  },
  SET_FIRSTLOGIN: (state, firstLogin) => {
    state.firstLogin = firstLogin;
  },
  SET_ORGANIZATIONS: (state, organizations) => {
    state.organizations = organizations;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_RESOURCES: (state, resources) => {
    state.resources = resources;
  },
  SET_RESIDS: (state, resIds) => {
    const ids = [];

    resIds.some(res => {
      ids.push(res.id);
    });

    state.resIds = ids;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  }
}

const actions = {
  // 登录
  async login({ dispatch }, userInfo) {
    return new Promise((resolve, reject) => {
      let { loginName, password } = userInfo;
      loginName = loginName.trim();
      apiLogin({ loginName, password }).then(result => {
        console.log(result)
        if (result.success) {
          const { data } = result;
          setToken(data.token);
          dispatch('setUserInfo', data)
          dispatch('cache/init', null, { root: true })
          dispatch('menus/resetMenu', null, { root: true })
        }
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    })
  },
  // 通过token登录
  async loginByToken({ dispatch }) {
    return new Promise((resolve, reject) => {
      apiLoginByToken().then(result => {
        if (result.success) {
          const { data } = result;
          setToken(data.token);
          dispatch('setUserInfo', data)
          dispatch('cache/init', null, { root: true })
          dispatch('menus/resetMenu', null, { root: true })
        }
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    })
  },
  // 设置登录用户信息
  setMutation({ commit }, loginUser) {
    if (loginUser) {
      commit('SET_IP', loginUser.ip);
      commit('SET_ID', loginUser.id);
      commit('SET_LOGINNAME', loginUser.loginName);
      commit('SET_NAME', loginUser.name);
      commit('SET_USERTYPE', loginUser.userType);
      commit('SET_STATUS', loginUser.status);
      commit('SET_FIRSTLOGIN', loginUser.firstLogin);
      commit('SET_ORGANIZATIONS', loginUser.organizations);
      commit('SET_ROLES', loginUser.roles);
      commit('SET_RESOURCES', loginUser.resources);
      commit('SET_RESIDS', loginUser.resources);
      commit('SET_AVATAR', loginUser.avatar);
      commit('SET_INTRODUCTION', loginUser.introduction);
    } else {
      commit('SET_IP', '');
      commit('SET_ID', '');
      commit('SET_LOGINNAME', '');
      commit('SET_NAME', '');
      commit('SET_USERTYPE', '');
      commit('SET_STATUS', -1);
      commit('SET_FIRSTLOGIN', -1);
      commit('SET_ORGANIZATIONS', []);
      commit('SET_ROLES', []);
      commit('SET_RESOURCES', []);
      commit('SET_RESIDS', []);
      commit('SET_AVATAR', '');
      commit('SET_INTRODUCTION', '');
    }
  },
  // 设置第一次登陆
  setFirstlogin({ commit }, firstLogin) {
    const loginUser = sessionStorageUtils.getItem(LOGINUSERKEY);
    loginUser.firstLogin = 0;
    sessionStorageUtils.setItem(LOGINUSERKEY, loginUser);
    commit('SET_FIRSTLOGIN', firstLogin);
  },
  // 缓存登录用户信息
  setUserInfo({ dispatch }, loginUser) {
    sessionStorageUtils.setItem(LOGINUSERKEY, loginUser);
    dispatch('setMutation', loginUser)
  },
  getUserInfo({ dispatch }) {
    return new Promise(resolve => {
      const loginUser = sessionStorageUtils.getItem(LOGINUSERKEY);
      dispatch('setMutation', loginUser)
      resolve(loginUser);
    })
  },
  logOut({ dispatch }) {
    removeToken();
    sessionStorageUtils.clear();
    localStorageUtils.clear();
    dispatch('setMutation', null)
    resetRouter()
    dispatch('cache/clear', null, { root: true })
    dispatch('tagsView/delAllViews', null, { root: true })
    dispatch('menus/resetMenu', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
