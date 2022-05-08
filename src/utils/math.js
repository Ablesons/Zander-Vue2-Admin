/**
 * @Description: 数学计算（精度）
 * see https://cloud.tencent.com/developer/section/1191828
 * @Author: Zander
 * @Date: 2022/5/8 16:34
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 16:34
 */
import * as math from 'mathjs';

class MathUtils {
  /**
   * 加法
   * @param arg1
   * @param arg2
   * @returns {number | math.MathCollection}
   */
  add(arg1, arg2) {
    const bigNum1 = math.bignumber(arg1);
    const bigNum2 = math.bignumber(arg2);

    const result = math.add(bigNum1, bigNum2);

    return math.number(result);
  }

  /**
   * 减法
   * @param arg1
   * @param arg2
   * @returns {number | math.MathCollection}
   */
  subtract(arg1, arg2) {
    const bigNum1 = math.bignumber(arg1);
    const bigNum2 = math.bignumber(arg2);

    const result = math.subtract(bigNum1, bigNum2);

    return math.number(result);
  }

  /**
   * 除法
   * @param arg1
   * @param arg2
   * @returns {number | math.MathCollection}
   */
  divide(arg1, arg2) {
    const bigNum1 = math.bignumber(arg1);
    const bigNum2 = math.bignumber(arg2);

    const result = math.divide(bigNum1, bigNum2);

    return math.number(result);
  }

  /**
   * 乘法
   * @param arg1
   * @param arg2
   * @returns {number | math.MathCollection}
   */
  multiply(arg1, arg2) {
    const bigNum1 = math.bignumber(arg1);
    const bigNum2 = math.bignumber(arg2);

    const result = math.multiply(bigNum1, bigNum2);

    return math.number(result);
  }
}

export const mathUtils = new MathUtils();
