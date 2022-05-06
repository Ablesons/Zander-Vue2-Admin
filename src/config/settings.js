/**
 * @Description: 系统配置信息
 * @Author: Zander
 * @Date: 2022/5/6 16:01
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 16:01
 */
module.exports = {
  /**
   * 站点信息
   */
  origin: 'CADE-SAAS-FRP',

  /**
   * 多系统模式，登录成功后，是否跳转欢迎页
   * 各个系统之间可以跳转
   */
  isMulSys: false,

  /**
   * 多平台模式
   */
  isPlatform: false,

  /**
   * 显示设置
   */
  showSettings: true,

  /**
   * 多页签
   */
  showTagsView: true,

  /**
   * 固定顶部工具条
   */
  fixedHeader: true,

  /**
   * 左侧导航显示logo
   */
  showSidebarLogo: false,

  /**
   * 显示左侧导航字体样式配置
   */
  sidebarTextTheme: true,

  /**
   * 是否开启高拍仪
   */
  isOpenPhotoGraph: true,

  /**
   * 系统注册信息
   */
  appInfo: {
    AppId: 'SYS',
    AppToken: 'XYLP-SYS', // 项目名，需和sso配置的项目名保持一致
    AppSecret: '7786df7fc3a34e26a61c034d5ec8245d'
  },

  /**
   * 企业微信配置
   */
  workWx: {
    agentId: '1000002',
    secret: 'PMmNfXI0OUJEfU6O8NIajiNqMMzOsNwE1oY4njNLXig'
  }
}
