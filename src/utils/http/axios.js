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
import { getToken } from '@utils/auth';
import { defaultSettings } from '@/config';
import store from '@/store';

class Axios {
  constructor () {
    this.logOutMsg = true;
    this.baseURL = process.env.VUE_APP_BASE_API;
    this.downloadLoadingInstance = null;
  }

  init() {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    axios.defaults.timeout = 60 * 1000;
    // 拦截请求
    axios.interceptors.request.use(config => this.request(config), rejection => this.requestError(rejection));
    // 拦截响应
    axios.interceptors.response.use(res => this.responseIntercept(res), error => this.responseError(error));
  }

  async request(config) {
    // 配置请求头
    config.headers['X-Origin'] = defaultSettings.origin
    config.headers['X-Token'] = getToken();
    config.headers['X-AppId'] = defaultSettings.appInfo.AppId;
    config.headers['X-AppToken'] = defaultSettings.appInfo.AppToken;
    config.headers['X-AppSecret'] = defaultSettings.appInfo.AppSecret;

    // 处理请求地址
    const url = config.url;
    if (this.isHttpUrl(url)) {
      config.url = url;
    } else if (this.isImgUrl(url)) {
      config.url = `${this.baseURL}${url}`;
    } else {
      config.url = `${this.baseURL}${url}`;
    }

    return config;
  }

  /**
   * 失败请求的方法
   * @param rejection
   */
  requestError(rejection) {
    return this.useOrigin(rejection)
      ? Promise.reject(rejection)
      : Promise.reject(rejection.data);
  }

  /**
   * 成功响应的方法
   * @param res
   * @returns {Promise<never>|Promise<unknown>}
   */
  responseIntercept(res) {
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
          }).then(() => {
            store.dispatch('user/logOut').then(() => {});
            location.reload();
          }).catch();
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
  }

  /**
   * 响应失败的方法(根据自己的业务逻辑写)
   * @param error
   * @returns {Promise<never>}
   */
  responseError(error) {
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
            }).then(() => {
              store.dispatch('user/logOut').then(() => {});
              location.reload();
            }).catch();
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

export const axiosRequest = new Axios()
