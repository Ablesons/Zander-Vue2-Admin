import Vue from 'vue'
import VueRouter from 'vue-router'
import baseRoutes from '@/router/base';
import { constantRoutes } from '@/router/constant';
import { routerBeforeEach, routerAfterEach } from '@utils/permission';

Vue.use(VueRouter)

/**
 * 处理路由
 * @returns {*[]}
 */
const setRoutes = () => {
  baseRoutes.push(...constantRoutes);
  return baseRoutes;
}

/**
 * 实例化路由
 */
const createRouter = () => new VueRouter({
  // mode: "history", //去掉url中的#
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes: setRoutes()
});

const router = createRouter();

/**
 * 路由执行前拦截
 */
router.beforeEach(async (to, from, next) => {
  routerBeforeEach(to, from, next);
});

/**
 * 路由执行后拦截
 */
router.afterEach(to => {
  routerAfterEach(to);
});

/**
 * 重置路由
 */
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router
