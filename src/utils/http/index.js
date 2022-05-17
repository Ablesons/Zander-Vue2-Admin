/**
 * @Description: Axios请求方法
 * @Author: Zander
 * @Date: 2022/5/6 14:48
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 14:48
 */
import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
import { isEmpty } from '@utils/verify';
import { commonUtils } from '@utils/common';

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
  return axios(option);
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
  return axios(option);
}

/**
 * Put请求
 * @param option
 * @returns {Promise<unknown>}
 */
export const $put = (option) => {
  Object.assign(option, { method: 'PUT' });
  return axios(option);
}

/**
 * Delete请求
 * @param option
 * @returns {Promise<unknown>}
 */
export const $delete = (option) => {
  Object.assign(option, { method: 'DELETE' });
  return axios(option);
}

export const $exportExcel = (option) => {
  return new Promise((resolve, reject) => {
    const params = option.params;

    // 实际提交参数
    const submitParams = getSearchParams(params);

    let fileName = params.fileName;

    if (isEmpty(fileName)) {
      fileName = commonUtils.getUUID();
    }

    Object.assign(option, {
      method: 'get',
      responseType: 'blob',
      params: submitParams
    });

    axios(option)
      .then((blobData) => {
        if (blobData.type === 'application/vnd.ms-excel') {
          const blob = new Blob([blobData], { type: 'application/xlsx' });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a'); // 创建a标签
          link.href = url;
          link.download = `${params.fileName}.xlsx`; // 重命名文件
          link.click();
          URL.revokeObjectURL(url); // 下载完成释放URL 对象

          resolve(blobData);
        } else if (blobData.type === 'application/json') {
          const reader = new FileReader();
          reader.readAsText(blobData);
          reader.onload = function(e) {
            const obj = JSON.parse(e.target.result); // 此处的msg就是后端返回的msg内容

            if (obj.message) {
              Message({
                message: obj.message,
                type: 'error'
              });
            }

            resolve(obj);
          };
        } else {
          const error = new Error();
          error.message = '服务器内部错误';
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  })
}
