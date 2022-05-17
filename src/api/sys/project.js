/**
 * @Description: 项目管理 - 接口
 * @Author: Zander
 * @Date: 2022/5/11 10:36
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/11 10:36
 */
import { $get, $post } from '@utils/http';

/**
 * 获取列表
 */
export const apiProjectList = () =>
  $get({
    url: '/sys/cadeProject/list'
  });

/**
 * 分页查询
 */
export const apiProjectSearch = (searchParams) =>
  $get({
    url: '/sys/cadeProject/search',
    params: searchParams
  });

/**
 * 根据ID获取详情
 */
export const apiProjectGetById = (id) =>
  $get({
    url: '/sys/cadeProject/getById',
    params: { id: id }
  });

/**
 * 保存信息
 */
export const apiProjectSave = (saveParams) =>
  $post({
    url: '/sys/cadeProject/save',
    data: saveParams
  });

/**
 * 更新信息
 */
export const apiProjectUpdateById = (updateParams) =>
  $post({
    url: '/sys/cadeProject/updateById',
    data: updateParams
  });

/**
 * 根据ID删除信息
 */
export const apiProjectDeleteById = (id) =>
  $post({
    url: '/sys/cadeProject/delete',
    data: { id: id }
  });

/**
 * 批量删除信息
 */
export const apiProjectBatchDeleteByIds = (ids) =>
  $post({
    url: '/sys/cadeProject/batchDeleteByIds',
    data: { ids: ids }
  });

/**
 * 根据ID逻辑删除信息
 */
export const apiProjectLogicDeleteById = (id) =>
  $post({
    url: '/sys/cadeProject/logicDeleteById',
    data: { id: id }
  });

/**
 * 批量逻辑删除
 */
export const apiProjectLogicBatchDeleteByIds = (ids) =>
  $post({
    url: '/sys/cadeProject/logicBatchDeleteByIds',
    data: { ids: ids }
  });

/**
 * 根据appIds查询项目信息
 * @param appIds
 */
export const apiProjectsByAppIds = (appIds) =>
  $get({
    url: '/sys/cadeProject/projectsByAppIds',
    params: { appIds: appIds }
  });
