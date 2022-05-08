/**
 * @Description: 字符串工具类
 * @Author: Zander
 * @Date: 2022/5/8 17:03
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 17:03
 */
class StringUtils {
  /**
   * 去除空格
   * @param str
   * @param type  1-所有空格；2-前后空格；3-前空格；4-后空格
   * @returns {*}
   */
  trim(str, type = 1) {
    let rtnStr = '';
    if (type === 1) {
      rtnStr = str.replace(/\s+/g, '');
    } else if (type === 2) {
      rtnStr = str.replace(/(^\s*)|(\s*$)/g, '');
    } else if (type === 3) {
      rtnStr = str.replace(/(^\s*)/g, '');
    } else if (type === 4) {
      rtnStr = str.replace(/(\s*$)/g, '');
    } else {
      rtnStr = str;
    }
    return rtnStr;
  }

  /**
   * 转换大小写
   * @param str
   * @param type  1-首字母大写；2-首字母小写；3-大小写转换；4-全部大写；5-全部小写
   * @returns {*}
   */
  changeCase(str, type = 4) {
    let rtnStr = '';
    if (type === 1) {
      rtnStr = str.replace(/\b\w+\b/g, function(word) {
        return (
          word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
        );
      });
    } else if (type === 2) {
      rtnStr = str.replace(/\b\w+\b/g, function(word) {
        return (
          word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
        );
      });
    } else if (type === 3) {
      rtnStr = str
        .split('')
        .map(function(word) {
          if (/[a-z]/.test(word)) {
            return word.toUpperCase();
          }
          return word.toLowerCase();
        })
        .join('');
    } else if (type === 4) {
      rtnStr = str.toUpperCase();
    } else if (type === 5) {
      rtnStr = str.toLowerCase();
    } else {
      rtnStr = str;
    }
    return rtnStr;
  }

  /**
   * 把字符串中的带"_"转成空字符串,"_"后面首字母大写
   * @param str
   * @returns {*}
   */
  toHump(str) {
    return str.replace(/_(\w)/g, function(all, letter) {
      return letter.toUpperCase();
    });
  }

  /**
   * 驼峰转换下划线
   * @param str
   * @returns {string}
   */
  toLine(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  }
}

export const stringUtils = new StringUtils();
