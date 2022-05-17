/**
 * @Description: 菜单和路由
 * @Author: Zander
 * @Date: 2022/5/4 22:33
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/4 22:33
 */
import Layout from '@/layout/index.vue'
import { isEmpty } from '@utils/verify';
import store from '@/store';
import { defaultSettings } from '@/config';

/**
 * 将组件字符串路径转换为异步组件
 * @param componentPath vue文件路径
 * @returns {function(*=): any}
 */
export const loadView = (componentPath) => {
  return (resolve) => require([`@/views${componentPath}.vue`], resolve);
}

/**
 * 获取异步路由
 * @param menu
 * @returns {{path, component: (function(*=): *), meta: {noCache: boolean, icon: (*|string), title}, name}|null}
 */
export const getRouterItem = (menu) => {
  if (!menu) {
    return null;
  }
  const url = menu.url ? menu.url : '';
  if (isEmpty(url)) {
    return null;
  }
  const iconCls = menu.iconCls ? menu.iconCls : '';
  const noCache = menu.iscache !== 1;

  return {
    path: menu.path,
    name: menu.id,
    component: loadView(url),
    meta: {
      title: menu.name,
      icon: iconCls,
      noCache: noCache
    }
  };
}

export const recursionTree = (param) => {
  const { nodes, pid } = param;
  // 资源菜单集合
  const menuArray = [];
  for (const node of nodes) {
    if (node) {
      const menuItem = JSON.parse(JSON.stringify(node));
      const parentResId = menuItem.parentResId ? menuItem.parentResId : '';
      if (pid === parentResId) {
        // 递归
        const menuTree = recursionTree({
          nodes,
          pid: menuItem.id
        });

        if (menuTree && menuTree.length > 0) {
          menuItem.children = menuTree;
        }

        menuArray.push(menuItem);
      }
    }
  }
  return menuArray;
}

const state = {
  menuList: [],
  sidebarRouters: [],
  asyncRouter: [],
  isAddRouter: false
}

const mutations = {
  SET_MENU_LIST: (state, menuList) => {
    state.menuList = menuList;
  },
  SET_SIDEBAR_ROUTERS: (state, routes) => {
    state.sidebarRouters = routes;
  },
  SET_ASYNC_ROUTER: (state, routes) => {
    state.asyncRouter = routes;
  },
  SET_IS_ADD_ROUTER: (state, isAddRouter) => {
    state.isAddRouter = isAddRouter;
  }
}

const actions = {
  /**
   * 用户拥有的权限集合
   * @param dispatch
   * @param state
   * @returns {[]|*}
   */
  getMenuList({ dispatch, state }) {
    if (!state.menuList || state.menuList.length === 0) {
      dispatch('initMenus')
    }
    return state.menuList;
  },
  /**
   * 获取资源Tree
   * @param dispatch
   * @param state
   * @returns {any}
   */
  getMenuTree({ dispatch, state }) {
    if (!state.sidebarRouters || state.sidebarRouters.length === 0) {
      dispatch('initMenus')
    }
    return state.sidebarRouters;
  },
  /**
   * 获取路由
   * @param dispatch
   * @param state
   * @returns {[]|*}
   */
  getRouters({ dispatch, state }) {
    if (!state.asyncRouter || state.asyncRouter.length === 0) {
      dispatch('initMenus')
    }
    return state.asyncRouter;
  },
  /**
   * 初始化菜单和路由
   * @param dispatch
   */
  initMenus({ dispatch, commit }) {
    dispatch('user/getUserInfo', null, { root: true });
    const resources = store.getters.resources || [];
    const menus = [];
    const menusList = resources.filter(function(item) {
      if (item.projectId === defaultSettings.appInfo.AppId) {
        // 资源类型（0-菜单；1-功能；2-页签）
        if (item.resType === '0' || item.resType === '2') {
          dispatch('formatIdToPath', item)

          menus.push(item);
        }

        return true;
      }

      return false;
    });
    commit('SET_MENU_LIST', menusList)

    const menuTree = recursionTree({
      nodes: menus,
      pid: ''
    });
    commit('SET_SIDEBAR_ROUTERS', menuTree)
    dispatch('initRouters', menus)
  },
  /**
   * 根据menu初始化路由
   * @param commit
   * @param menus
   */
  initRouters({ commit }, menus) {
    const routers = [];
    menus.forEach(menuItem => {
      if (menuItem.resType === '0') {
        // 路由
        const router = getRouterItem(menuItem);
        if (router) {
          routers.push(router);
        }
      }
    })
    commit('SET_ASYNC_ROUTER', [
      {
        path: '',
        name: 'root',
        component: Layout,
        children: routers
      }
    ]);
  },
  /**
   * 重置菜单
   * @param commit
   */
  resetMenu({ commit }) {
    commit('SET_MENU_LIST', []);
    commit('SET_SIDEBAR_ROUTERS', []);
    commit('SET_ASYNC_ROUTER', []);
    commit('SET_IS_ADD_ROUTER', false);
  },

  /**
   * 格式化资源ID为路由path值
   * @param item
   */
  formatIdToPath($event, item) {
    let id = item.id;
    id = id.toLowerCase();

    // eslint-disable-next-line no-useless-escape
    item.path = id.replace(/\_(\w)/g, function(all, letter) {
      return letter.toUpperCase();
    });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
