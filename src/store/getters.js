/**
 * @Description: getters
 * @Author: Zander
 * @Date: 2022/5/4 22:36
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/4 22:36
 */
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  errorLogs: state => state.errorLog.logs,
  dataDic: state => state.cache.dataDic,
  dataValue: state => state.cache.dataValue,
  dataName: state => state.cache.dataName,
  sysConfig: state => state.cache.sysConfig,
  ip: state => state.user.ip,
  id: state => state.user.id,
  loginName: state => state.user.loginName,
  name: state => state.user.name,
  userType: state => state.user.userType,
  status: state => state.user.status,
  firstLogin: state => state.user.firstLogin,
  organizations: state => state.user.organizations,
  roles: state => state.user.roles,
  resources: state => state.user.resources,
  resIds: state => state.user.resIds,
  avatar: state => state.user.avatar,
  introduction: state => state.user.introduction
}
export default getters
