/**
 * @Description: 非对称加密、解密方法
 * @Author: Zander
 * @Date: 2022/5/8 17:34
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 17:34
 */
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// RSA秘钥生成方式
// Mac系统内置OpenSSL(开源加密库),所以可以直接在终端上使用命令。
// Windows系统可以使用git命令行工具

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const pubKey =
  '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBd9NGZNi/V3W6zDvJcRdyuRek\n' +
  'RchQP1pI3FIVg8++Onf4j98rfo1WvnHk30SPsvgWJrE1O6bf/RVNv8Dw0eXb0+DM\n' +
  'CC0TmNqquCDNNCsZh75H56L2Esx3QQZ7TvlKsBjRyv8eY9Qe7XoND8sVP5PXwhQ/\n' +
  'l3ir/rI7wBSJwrsOqQIDAQAB\n' +
  '-----END PUBLIC KEY-----';

const priKey =
  '-----BEGIN PRIVATE KEY-----\n' +
  'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMF300Zk2L9XdbrM\n' +
  'O8lxF3K5F6RFyFA/WkjcUhWDz746d/iP3yt+jVa+ceTfRI+y+BYmsTU7pt/9FU2/\n' +
  'wPDR5dvT4MwILROY2qq4IM00KxmHvkfnovYSzHdBBntO+UqwGNHK/x5j1B7teg0P\n' +
  'yxU/k9fCFD+XeKv+sjvAFInCuw6pAgMBAAECgYA5LxzAotA6BjTjKLjHOukuXK0z\n' +
  'PfkOVxtti8mrWFGQLaIGUygop/hI2nO5rZCLVN/lVDxuupoBfMHOQE5cH/5rbur2\n' +
  'o32WhfwYAuZ5kUxhvv7VAq1tDKuWbNH0Ab7MyjjRR+38KW4KHTorpHrkwAco7bKn\n' +
  'PH81vijyHp3Wo8mrAQJBAOG8k3Ljoq6OQ6OnMd/gkge5vSFfRLkCaIfR+HEyOZMt\n' +
  'UY8czLzbbtxzHClgtrU3VT4cG0s9TfXwsHF4IzNA0iECQQDbZ8WgqZxtPnXQw9HO\n' +
  'nZ2J6/zECdaeF6vxxrfP51vY2fUGF8nG3w4yq5wIrTKc3Uv2mBCk5yQUKk0AS7B6\n' +
  '/TuJAkB3Gruly+vjNBcGO0p6eJA0WVEsUYr+HwIuX6A5gamVOT0mSKjSIOmekXHT\n' +
  'dz8P4JEugz/3c/I1iPhf9maEPXhhAkEAjZGc3Dj0vSyTOpxPkWD0GN1TYG70s1eU\n' +
  '09GkIxsmkXq5di/9OzwL3jgK2zJeOQc1j6y4+J5IElblDm7INeOV+QJAJpPBUn/N\n' +
  '3r15IEbbTVC7b3X2bOyIoFxEOXim23bdMbLekgbnFbBQqDKazi24X2zGx1Vu4IYM\n' +
  'UJAYTV9sRY6/Vw==\n' +
  '-----END PRIVATE KEY-----\n';

/**
 * 加密
 * @param val 需要加密的值
 */
export function encrypt(val) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(pubKey);
  return encryptor.encrypt(val);
}

/**
 * 解密
 * @param val 需要解密的值
 */
export function decrypt(val) {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(priKey);
  return encryptor.decrypt(val);
}
