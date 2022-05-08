/**
 * @Description: Axios请求方法
 * @Author: Zander
 * @Date: 2022/5/6 14:48
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 14:48
 */
import { axiosRequest } from './axios';
import qs from 'qs';
import { isEmpty } from '@utils/verify';

/**
 * 处理查询参数，排除空值条件
 * @param params
 * @returns {{}}
 */
const getSearchParams = (params) => {
  // 实际参数
  const submitParams = {}
  if (params) {
    for (const key in params) {
      const value = params[key];
      if (!isEmpty(value)) {
        submitParams[key] = value;
      }
    }
  }
  return submitParams;
}

/**
 * Get请求
 * @param option
 * @returns {Promise<unknown>}
 */
export const $get = (option) => {
  // 实际提交参数
  const submitParams = getSearchParams(option.params);
  Object.assign(option, { method: 'GET', params: submitParams });
  return axiosRequest.request(option);
};

/**
 * Post请求
 * @param option
 * @returns {Promise<unknown>}
 */
export const $post = (option) => {
  // 发送的参数
  const postData = option.data ? option.data : {};

  const headers = option.headers;

  if (!headers) {
    Object.assign(option, {
      data: qs.stringify(postData),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }

  Object.assign(option, { method: 'post' });
  return axiosRequest.request(option);
}

/**
 * Put请求
 * @param option
 * @returns {Promise<unknown>}
 */
export const $put = (option) => {
  Object.assign(option, { method: 'PUT' });
  return axiosRequest.request(option);
}

/**
 * Delete请求
 * @param option
 * @returns {Promise<unknown>}
 */
export const $delete = (option) => {
  Object.assign(option, { method: 'DELETE' });
  return axiosRequest.request(option);
}
