/**
 * @Description: 校验
 * @Author: Zander
 * @Date: 2022/5/4 21:59
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/4 21:59
 */
const toString = Object.prototype.toString

export function is (val, type) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef (val) {
  return typeof val !== 'undefined'
}

export function isUnDef (val) {
  return !isDef(val)
}

export function isDate (val) {
  return is(val, 'Date')
}

export function isNull (val) {
  return val === null
}

export function isNullAndUnDef (val) {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef (val) {
  return isUnDef(val) || isNull(val)
}

export function isNumber (val) {
  return is(val, 'Number')
}

export function isString (val) {
  return is(val, 'String')
}

export function isFunction (val) {
  return typeof val === 'function'
}

export function isBoolean (val) {
  return is(val, 'Boolean')
}

export function isRegExp (val) {
  return is(val, 'RegExp')
}

export function isArray (val) {
  return val && Array.isArray(val)
}

export function isObject (val) {
  return val !== null && val !== undefined && is(val, 'Object')
}

export function isEmpty (val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (isNull(val) || isUnDef(val)) {
    return true
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isPromise (val) {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isWindow (val) {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement (val) {
  return isObject(val) && !!val.tagName
}

export function isMap (val) {
  return is(val, 'Map')
}

export function validUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

export function isUrl (url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

export function isEmail (email) {
  const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  return reg.test(email)
}

export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

export function validUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}
