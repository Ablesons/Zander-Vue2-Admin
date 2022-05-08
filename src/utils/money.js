/**
 * @Description: 金额工具类
 * @Author: Zander
 * @Date: 2022/5/8 16:18
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 16:18
 */
import { formatNumber, formatMoney } from 'accounting';
import * as math from 'mathjs';

class Money {
  // ----------------- 金额转换 ----------------- //
  /**
   * 分转元 （除100）
   * @param value
   * @returns {math.Unit|string}
   */
  rmbF2Y(value) {
    if (!value) {
      return '';
    }
    return math.divide(value, 100);
  }

  /**
   * 元转分（乘100）
   * @param value
   * @returns {string|*}
   */
  rmbY2F(value) {
    if (!value) {
      return '';
    }
    return math.multiply(value, 100);
  }

  /**
   * 数字金额 转 汉字金额
   * @param money
   * @returns {string}
   */
  convertChinese(money) {
    if (!money) {
      return '';
    }
    // 汉字的数字
    const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];

    // 基本单位
    const cnIntRadice = ['', '拾', '佰', '仟'];

    // 对应整数部分扩展单位
    const cnIntUnits = ['', '万', '亿', '兆'];

    // 对应小数部分单位
    const cnDecUnits = ['角', '分', '毫', '厘'];

    // 整数金额时后面跟的字符
    const cnInteger = '整';

    // 整型完以后的单位
    const cnIntLast = '元';

    // 最大处理的数字
    const maxNum = 999999999999999.9999;

    // 金额整数部分
    let integerNum;

    // 金额小数部分
    let decimalNum;

    // 输出的中文金额字符串
    let chineseStr = '';

    // 分离金额后用的数组，预定义
    let parts;

    if (money >= maxNum) {
      // 超出最大处理数字
      return '';
    }

    if (money === 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
    }

    // 转换为字符串
    const moneyStr = money.toString();
    if (moneyStr.indexOf('.') === -1) {
      integerNum = money;
      decimalNum = '';
    } else {
      parts = moneyStr.split('.');
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }

    // 获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      let zeroCount = 0;

      integerNum = integerNum + '';

      const IntLen = integerNum.length;
      for (let i = 0; i < IntLen; i++) {
        const n = integerNum.substr(i, 1), p = IntLen - i - 1, q = p / 4, m = p % 4;
        if (n === '0') {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0];
          }
          // 归零
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m === 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
        }
      }
      chineseStr += cnIntLast;
    }
    // 小数部分
    if (decimalNum !== '') {
      const decLen = decimalNum.length;
      for (let i = 0; i < decLen; i++) {
        const n = decimalNum.substr(i, 1);
        if (n !== '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (chineseStr === '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum === '') {
      chineseStr += cnInteger;
    }
    return chineseStr;
  }

  /**
   * 格式化金额，保留两位小数
   * @param value
   * @returns {[]|*|string}
   */
  format(value) {
    return formatNumber(value, 2);
  }

  /**
   * 格式化金额
   * @param value
   * @returns {[]|*}
   */
  formatMoney(value) {
    return formatMoney(value);
  }

  /**
   * 格式化金额，保留两位小数
   * 分转元，并格式化千分位显示
   * @param value
   * @returns {*[]|*|string}
   */
  formatRmbF2Y(value) {
    const rmb = this.rmbF2Y(value);

    return this.format(rmb);
  }

  /**
   * 金额千分位格式化
   * @param num
   * @returns {string}
   */
  toThousands(num) {
    num = (num || 0).toString();
    let result = '';
    let dot = '';
    if (!num) {
      return num;
    }
    const dotIndex = num.indexOf('.');
    let symbol = num.substring(0, 1);
    if (dotIndex > -1) {
      dot = num.substring(dotIndex);
      num = num.substring(0, dotIndex);
    }
    if (symbol === '+' || symbol === '-') {
      num = num.substring(1);
    } else {
      symbol = '';
    }
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return symbol + result + dot;
  }
}

export const moneyUtils = new Money();
