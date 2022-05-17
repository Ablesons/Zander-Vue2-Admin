/**
 * @Description: 按钮鉴权指令
 * @Author: Zander
 * @Date: 2022/5/16 22:14
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/16 22:14
 */
import { checkPermission } from '@utils/permission';

export default {
  inserted(el, _) {
    const permission = _.value; // 获取到 v-permission的值
    if (permission && permission instanceof Array && permission.length > 0) {
      const hasPermission = checkPermission(permission)
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error('请设置操作权限标签值')
    }
  }
}
