/**
 * @Description: 缓存配置
 * @Author: Zander
 * @Date: 2022/5/8 17:40
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 17:40
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const ExpiresInKey = 'Admin-Expires-In'

export const getToken = () => Cookies.get(TokenKey);

export const setToken = (token) => Cookies.set(TokenKey, token);

export const removeToken = () => Cookies.remove(TokenKey);

export const getExpiresIn = () => Cookies.get(ExpiresInKey) || -1;

export const setExpiresIn = (time) => Cookies.set(ExpiresInKey, time);

export const removeExpiresIn = () => Cookies.remove(ExpiresInKey);
