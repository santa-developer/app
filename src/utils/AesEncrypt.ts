/**
 * 암,복호화 유틸
 */

import randomString from './RandomString'
import CryptoJS from 'crypto-js'

// 암호화
export default function aesEncrypt(data: string): string {
  const saltKey = randomString(32)
  const encryptKey = CryptoJS.enc.Utf8.parse(saltKey)
  const encryptIv = CryptoJS.enc.Utf8.parse(saltKey.substring(0, 16))

  const cipher = CryptoJS.AES.encrypt(data, encryptKey, {
    iv: encryptIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encodeURIComponent(cipher.toString()) + '_#_' + saltKey
}
