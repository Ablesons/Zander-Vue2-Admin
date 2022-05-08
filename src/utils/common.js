/**
 * @Description: 公共工具类
 * @Author: Zander
 * @Date: 2022/5/8 17:49
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 17:49
 */
import { v1 as uuidv1 } from 'uuid';
import { isEmpty } from '@utils/verify';

class CommonUtils {
  /**
   * 深度拷贝
   * @param source 待拷贝对象
   * @returns {any}
   * @constructor
   */
  DeepCopy(source) {
    return JSON.parse(JSON.stringify(source));
  }

  /**
   * 删除数组中的某一项
   * @param arr
   * @param node
   * @constructor
   */
  ArrayRemoveItem(arr, node) {
    const index = arr.indexOf(node);

    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  /**
   * 根据对象属性值，删除数组
   * @param arr
   * @param propertyName 属性名称
   * @param propertyValue 属性值
   * @constructor
   */
  ArrayRemoveItemByPropertyValue(arr, propertyName, propertyValue) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i][propertyName] === propertyValue) {
        arr.splice(i, 1);
      }
    }
  }

  /**
   * 通过参数名获取url中的参数值
   * @param name
   * @returns {string|null}
   */
  getUrlParam(name) {
    // 构造一个含有目标参数的正则表达式对象
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    // 匹配目标参数
    const paramValue = window.location.search.substr(1).match(reg);

    if (paramValue != null) {
      return decodeURI(paramValue[2]);
    }

    return null;
  }

  /**
   * 验证元素是否存在指定class
   * @param ele
   * @param className
   * @returns {boolean}
   */
  hasClass(ele, className) {
    return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }

  /**
   * 元素添加class
   * @param ele
   * @param className
   */
  addClass(ele, className) {
    if (!this.hasClass(ele, className)) {
      ele.className += ' ' + className;
    }
  }

  /**
   * 元素删除class
   * @param ele
   * @param className
   */
  removeClass(ele, className) {
    if (this.hasClass(ele, className)) {
      const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
  }

  /**
   * 更换所选元素的className
   * @param ele
   * @param className
   */
  toggleClass(ele, className) {
    if (!ele || !className) {
      return;
    }
    let classString = ele.className;
    const nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
      classString += '' + className;
    } else {
      classString =
        classString.substr(0, nameIndex) +
        classString.substr(nameIndex + className.length);
    }
    ele.className = classString;
  }

  /**
   * 获取元素高度
   * @param querySelector
   * @returns {number}
   */
  getOffsetHeight(querySelector) {
    const el = document.querySelector(querySelector);
    return el.offsetHeight;
  }

  /**
   * 序列化数组中指定属性
   * @param arr
   * @param key
   * @returns {[]}
   */
  serializeArray(arr, key) {
    const tRtn = [];

    for (const item of arr) {
      const val = item[key];
      if (val && tRtn.indexOf(val) < 0) {
        tRtn.push(val);
      }
    }

    return tRtn;
  }

  /**
   * 序列化数组中指定属性为字符串
   * @param arr
   * @param key
   * @returns {string}
   */
  serializeArrayToStr(arr, key) {
    const tRtn = [];

    for (const item of arr) {
      const val = item[key];
      if (val && tRtn.indexOf(val) < 0) {
        tRtn.push(val);
      }
    }

    return tRtn.join(',');
  }

  /**
   * 格式化时间
   * @param dateTime
   * @param fmt
   * @returns {null|*}
   * @constructor
   */
  DateFormat(dateTime, fmt) {
    // 格式化时间
    // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
    // 如果为null,则格式化当前时间
    if (!dateTime) {
      return null;
    }
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (dateTime.toString().length === 10) {
      dateTime *= 1000;
    }
    const date = new Date(dateTime);
    let ret;
    const opt = {
      'y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'h+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      's+': date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        );
      }
    }
    return fmt;
  }

  /**
   * 获取随机字符串
   * @param len 长度
   * @returns {string}
   */
  randomString(len = 32) {
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  /**
   * 获取UUID
   * @returns {*}
   */
  getUUID() {
    const uuid = uuidv1();
    return uuid.replaceAll('-', '');
  }

  /**
   * 银行卡号每隔四位自动补一个空格
   * @param cardNum
   * @returns {*}
   */
  formatCardNumber(cardNum) {
    if (isEmpty(cardNum)) {
      return cardNum;
    }
    if (cardNum.length < 5) {
      return cardNum;
    }

    return cardNum.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  /**
   * 图片格式转换方法
   * @param dataurl
   * @returns {Blob}
   */
  dataURLToBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}

export const commonUtils = new CommonUtils();
