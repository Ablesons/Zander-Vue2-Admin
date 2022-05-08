/**
 * @Description: 服务端数据缓存接口
 * @Author: Zander
 * @Date: 2022/5/8 22:25
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 22:25
 */
import { $post } from '@utils/http';

/**
 * 获取缓存数据
 */
export const apiGetCacheData = () =>
  $post({
    url: '/common/getCacheData'
  });

/**
 * 刷新缓存数据
 */
export const apiRefreshCacheData = () =>
  $post({
    url: '/common/refreshCacheData'
  });
