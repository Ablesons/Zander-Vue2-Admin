/**
 * @Description: Axios封装
 * @Author: Zander
 * @Date: 2022/5/6 14:41
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 14:41
 */
import axios from 'axios'
import { Notification, MessageBox, Message, Loading } from 'element-ui'

class Axios {
  constructor () {
    this.logOutMsg = true
  }
}

export const axiosRequest = new Axios()
