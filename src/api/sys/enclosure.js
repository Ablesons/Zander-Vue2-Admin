/**
 * @Description: 附件API
 * @Author: Zander
 * @Date: 2022/5/17 15:14
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/17 15:14
 */
import { $get, $post } from '@utils/http';

/**
 * 批量查询
 * @param ids
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiServerFiles = (ids) => $post({
  url: '/system/cadeEnclosure/serverFiles',
  data: { ids: ids }
});

/**
 * 批量逻辑删除
 * @param ids
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiLogicBatchDeleteByIds = (ids) => $post({
  url: '/system/cadeEnclosure/logicBatchDeleteByIds',
  data: { ids: ids }
});

/**
 * 根据bizId查询附件集合
 * @param bizId
 * @param bizType
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiSearchListByBizId = (bizId, bizType) => $get({
  url: '/system/cadeEnclosure/searchListByBizId',
  params: { bizId: bizId, bizType: bizType }
});
