/**
 * @Description: 基础路由(白名单路由)
 * @Author: Zander
 * @Date: 2022/5/8 21:35
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 21:35
 */
import Layout from '@/layout/index.vue';

export default [
  {
    name: 'Home',
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          affix: true
        }
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    meta: { title: 'Login', unauth: true },
    component: () => import('@views/auth/login.vue')
  },
  {
    name: 'Auth',
    path: '/auth',
    meta: { title: 'Auth', unauth: true },
    component: () => import('@views/auth/auth.vue')
  },
  {
    name: 'Welcome',
    path: '/welcome',
    meta: { title: 'Welcome', unauth: true },
    component: () => import('@views/home/welcome.vue')
  },
  {
    name: 'Redirect',
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/layout/redirect.vue'),
        meta: { title: 'Redirect', unauth: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@views/error/404.vue'),
    meta: { title: '404', hidden: true, unauth: true }
  },
  {
    path: '/401',
    component: () => import('@views/error/401.vue'),
    meta: { title: '401', hidden: true, unauth: true }
  }
]
