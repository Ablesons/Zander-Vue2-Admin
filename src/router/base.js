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
    name: 'redirect',
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/layout/redirect.vue'),
        meta: { title: 'redirect', unauth: true }
      }
    ]
  }
]
