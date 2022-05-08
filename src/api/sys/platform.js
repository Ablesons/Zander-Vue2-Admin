/**
 * @Description: 平台信息 - 接口
 * @Author: Zander
 * @Date: 2022/5/8 20:26
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 20:26
 */
import { $get, $post } from '@utils/http';

/**
 * 分页查询
 */
export const apiPlatformSearch = (searchParams) => $get({
  url: '/system/cadePlatform/search',
  params: searchParams
})

/**
 * 根据ID获取详情
 */
export const apiPlatformGetById = (id) =>
  $get({
    url: '/system/cadePlatform/getById',
    params: { id: id }
  });

/**
 * 保存信息
 */
export const apiPlatformSave = (saveParams) =>
  $post({
    url: '/system/cadePlatform/save',
    data: saveParams
  });

/**
 * 更新信息
 */
export const apiPlatformUpdateById = (updateParams) =>
  $post({
    url: '/system/cadePlatform/updateById',
    data: updateParams
  });

/**
 * 根据ID删除信息
 */
export const apiPlatformDeleteById = (id) =>
  $post({
    url: '/system/cadePlatform/deleteById',
    data: { id: id }
  });

/**
 * 批量删除信息
 */
export const apiPlatformBatchDeleteByIds = (ids) =>
  $post({
    url: '/system/cadePlatform/batchDeleteByIds',
    data: { ids: ids }
  });

/**
 * 根据ID逻辑删除信息
 */
export const apiPlatformLogicDeleteById = (id) =>
  $post({
    url: '/system/cadePlatform/logicDeleteById',
    data: { id: id }
  });

/**
 * 批量逻辑删除
 */
export const apiPlatformLogicBatchDeleteByIds = (ids) =>
  $post({
    url: '/system/cadePlatform/logicBatchDeleteByIds',
    data: { ids: ids }
  });

/**
 * 平台列表
 */
export const apiPlatformListCadePlatform = (searchParams) =>
  $get({
    url: '/system/cadePlatform/listCadePlatform',
    params: searchParams
  });

/**
 * 切换平台
 */
export const apiPlatformChangePlatform = (platformId) =>
  $post({
    url: '/system/cadePlatform/changePlatform',
    data: { platformId: platformId }
  });
