/**
 * @Description: Axios封装
 * @Author: Zander
 * @Date: 2022/5/6 14:41
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 14:41
 */
import axios from 'axios'
import NProgress from '@utils/progress';
import { MessageBox, Message } from 'element-ui'

class Axios {
  constructor (options) {
    this.logOutMsg = true;
    this.baseURL = process.env.VUE_APP_BASE_API;
    this.axiosInstance = axios.create(options);
    this.downloadLoadingInstance = null;
    this.requestIntercept();
    this.responseIntercept();
  }

  async request(config) {
    return new Promise((resolve, reject) => {})
  }

  /**
   * 请求拦截
   */
  requestIntercept() {
    this.axiosInstance.interceptors.request.use(config => {
      // 开启进度条动画
      NProgress.start();
      return config;
    }, error => {
      return this.useOrigin(error) ? Promise.reject(error) : Promise.reject(error.data);
    });
  }

  /**
   * 响应拦截
   */
  responseIntercept() {
    this.axiosInstance.interceptors.request.use(res => {
      // 关闭进度条动画
      NProgress.done();
      const code = res.status;
      if ((code >= 200 && code < 300) || code === 304) {
        const resultData = res.data;

        if (!resultData.success) {
          // 令牌失效
          if (resultData.code === 'unauthorized' && this.logOutMsg) {
            MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {}).catch();
            this.logOutMsg = false;
          }
          // 无权限访问
          if (resultData.code === 'forbidden') {
            Message({
              message: resultData.message,
              type: 'warning'
            });
          }
        }

        return this.isPlainRequest(res.config.url) || this.useOrigin(res) ? Promise.resolve(res) : Promise.resolve(res.data);
      }
      return Promise.reject(res);
    }, error => {
      // 关闭进度条动画
      NProgress.done();
      if (error.response) {
        const req = error.response.request;
        const status = error.response.status;
        const result = error.response.data;
        switch (status) {
          case 401:
            if (this.logOutMsg) {
              MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {}).catch();
              this.logOutMsg = false;
            }
            break;
          case 404:
            Message({
              message: '请求资源不存在:' + req.responseURL,
              type: 'error'
            });
            break;
          case 502:
            Message({
              message: '服务未响应，请稍后再试',
              type: 'error'
            });
            break;
          default:
            Message({
              message: result.message,
              type: 'error'
            });
        }
      } else {
        Message({
          message: '服务未响应，请稍后重试',
          type: 'error'
        })
      }
      return error.response ? Promise.reject(error.response) : Promise.reject(error);
    });
  }

  isHttpUrl(url) {
    return /^https?:\/\//.test(url);
  }

  isImgUrl(url) {
    return /^(sso|iam|iam-.*)\//.test(url);
  }

  isPlainRequest(url) {
    return /\.(html?|xml|txt)$/.test(url);
  }

  useOrigin(res) {
    return res.config.useOrigin;
  }
}

export const axiosRequest = new Axios({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 60000
})
