/**
 * @Description: 浏览器缓存方法
 * @Author: Zander
 * @Date: 2022/5/8 15:53
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 15:53
 */
class StorageProxy {
  constructor(storageModel, prefix = 'Zander') {
    this.storage = storageModel;
    this.prefix = prefix;
  }

  /**
   * 私有方法获取key
   * @param key
   * @returns {string}
   */
  getKey(key) {
    return `${this.prefix}:${key}`;
  }

  /**
   * 设置缓存配置(秒级)
   * @param time
   * @returns {{prefix: string, storeTime: number}}
   */
  setOptions(time) {
    // 如果用户没传递时间进来就是一天
    if (time && time > 0) {
      time = new Date().getTime() + 1000 * time;
    } else {
      time = new Date().getTime() + 1000 * 60 * 60 * 24;
    }
    return {
      storeTime: time,
      prefix: this.prefix
    };
  }

  /**
   * 设置存储
   * @param key
   * @param value
   * @param time
   */
  setItem(key, value, time) {
    const _key = this.getKey(key);
    const options = this.setOptions(time);
    this.storage.setItem(_key, JSON.stringify({ value, options }));
  }

  /**
   * 获取存储
   * @param key
   * @returns {null|*}
   */
  getItem(key) {
    const _key = this.getKey(key);
    const storeData = this.storage.getItem(_key);
    if (storeData) {
      const {
        value,
        options: { storeTime }
      } = JSON.parse(storeData);
      // 如果从存储中获取的时间大于当前的时间或者等于0的时候表示当前的localStorage有效
      if (storeTime > new Date().getTime()) {
        return value;
      }
      this.removeItem(_key);
      return null;
    }
    return null;
  }

  /**
   * 删除存储
   * @param key
   */
  removeItem(key) {
    const _key = this.getKey(key);
    const value = this.getItem(key);
    if (value) {
      this.storage.removeItem(_key);
    }
  }

  /**
   * 清空存储
   */
  clear() {
    this.storage.clear()
  }
}

class SessionStorageProxy extends StorageProxy {
  constructor(sessionStorage, prefix) {
    super(localStorage, prefix);
  }
}

export const localStorageUtils = new StorageProxy(localStorage, 'Zander');

export const sessionStorageUtils = new SessionStorageProxy(sessionStorage, 'Zander');
