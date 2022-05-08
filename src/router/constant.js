/**
 * @Description: 将modules中的文件全部导入进来
 * @Author: Zander
 * @Date: 2022/5/8 21:30
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 21:30
 */
/// //////////////// 定义一个方法将modules中的文件全部导入进来 start ///////////////////

const routerList = [];

function getAll(r) {
  r.keys().forEach((key) => {
    routerList.push(...r(key).default);
  });
}

getAll(require.context('./modules', true, /\.js/));

/// //////////////// 定义一个方法将modules中的文件全部导入进来 end ///////////////////

// 用户定义的全部路由
export const constantRoutes = routerList;

// module 模块路由格式
// export default [
//    默认进入首页
//   {
//     path: "/about",
//     name: "About",
//     component: () => import("@/views/login.vue")
//   }
// ];
