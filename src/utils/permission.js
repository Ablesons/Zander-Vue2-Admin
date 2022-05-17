/**
 * @Description: 路由 - 权限验证
 * @Author: Zander
 * @Date: 2022/5/4 22:26
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/4 22:26
 */
import router from '@/router';
import NProgress from '@utils/progress';
import { MessageBox } from 'element-ui'
import { getToken } from '@utils/auth';
import i18n from '@/locales';
import store from '@/store';
import { isEmpty } from '@utils/verify';

const getPageTitle = (key) => {
  const hasKey = i18n.te(`route.${key}`);
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`);
    return `${pageName} - ${process.env.VUE_APP_TITLE}`;
  }
  return `${process.env.VUE_APP_TITLE}`;
}

export const routerBeforeEach = (to, from, next) => {
  NProgress.start();
  next();
  if (getToken()) {
    // 路由白名单标识
    if (to.meta.unauth) {
      next();
      NProgress.done();
    } else {
      if (!store.getters.isAddRouter) {
        store.dispatch('menus/getRouters').then(() => {
          router.addRoutes(store.getters.asyncRouter);
          store.commit('menus/SET_IS_ADD_ROUTER', true);
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        });
      } else {
        next();
      }
    }
  } else {
    // 路由白名单标识
    if (to.meta.unauth) {
      next();
    } else {
      if (isEmpty(getToken())) {
        NProgress.done();
        next({ name: 'Login', query: { backUrl: to.fullPath } });
      } else {
        MessageBox.confirm('您已被登出，请重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          showClose: false,
          showCancelButton: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: 'warning'
        }).then(() => {
          NProgress.done();
          store.dispatch('user/logOut').then(() => {
            next({ name: 'Login', query: { backUrl: to.fullPath } });
          })
        })
      }
    }
  }
}

export const routerAfterEach = (to) => {
  // Finish progress bar
  NProgress.done();

  // set page title
  document.title = getPageTitle(to.meta.title);
}

/**
 * 验证权限
 * @param arr 资源ID
 * @returns {boolean}
 */
export const checkPermission = (arr) => {
  if (arr && arr instanceof Array && arr.length > 0) {
    const resIds = store.getters.resIds;
    if (resIds) {
      return arr.some(resId => {
        return resIds.indexOf(resId) !== -1;
      });
    }
  }
  console.error('无权限：' + arr);
  return false;
}
