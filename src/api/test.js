/**
 * @Description: 测试
 * @Author: Zander
 * @Date: 2022/5/16 22:59
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/16 22:59
 */
import { $exportExcel, $get, $post } from '@utils/http';

/**
 * 分页查询
 * @param searchParams
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiTestSearch = (searchParams) => $get({
  url: '/demo/test/search',
  params: searchParams
})

/**
 * 根据ID获取详情
 * @param id
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiTestGetById = (id) => $get({
  url: '/demo/test/getById',
  params: { id: id }
});

/**
 * 保存信息
 * @param saveParams
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiTestSave = (saveParams) => $post({
  url: '/demo/test/save',
  data: saveParams
});

/**
 * 更新信息
 * @param updateParams
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiTestUpdateById = (updateParams) => $post({
  url: '/demo/test/updateById',
  data: updateParams
});

/**
 * 根据ID删除信息
 * @param id
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiTestDeleteById = (id) => $post({
  url: '/demo/test/deleteById',
  data: { id: id }
});

/**
 * 批量删除信息
 * @param ids
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiTestBatchDeleteByIds = (ids) => $post({
  url: '/demo/test/batchDeleteByIds',
  data: { ids: ids }
});

/**
 * 根据ID逻辑删除信息
 * @param id
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiTestLogicDeleteById = (id) => $post({
  url: '/demo/test/logicDeleteById',
  data: { id: id }
});

/**
 * 批量逻辑删除
 * @param ids
 * @returns {Promise<minimist.Opts.unknown>}
 */
export const apiTestLogicBatchDeleteByIds = (ids) => $post({
  url: '/demo/test/logicBatchDeleteByIds',
  data: { ids: ids }
});

/**
 * 导出Excel
 * @param searchParams
 * @returns {Promise<unknown>}
 */
export const apiTestExportExcel = (searchParams) => $exportExcel({
  url: '/demo/test/exportExcel',
  params: searchParams
});
