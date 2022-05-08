/**
 * @Description: 用户接口管理
 * @Author: Zander
 * @Date: 2022/5/6 16:08
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 16:08
 */
import { $post } from '@utils/http';

/**
 * 登录
 * @param loginParams
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiLogin = (loginParams) => $post({
  url: '/xylp/common/login',
  data: loginParams
})

/**
 * 通过token登录
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiLoginByToken = () => $post({
  url: '/xylp/common/loginByToken'
})
