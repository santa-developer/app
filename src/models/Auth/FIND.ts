import { SmsType, UserInfoProps } from './USER_INFO'

// 비밀번호 재설정 인증 API 구분
export enum FindTempType {
  Sms = 'S',
  Email = 'E',
}

export interface UserFindProps extends UserInfoProps {
  smsType: SmsType
  mebrFileMgmtNmbr: string

  pswdRe: string
  originPwd: string

  userIdConfirm: boolean
  userEmilConfirm: boolean
  ctfcNmbrConfirm: boolean

  pswdConfirm: boolean
  pswdReConfirm: boolean
  originPwdReConfirm: boolean

  userIdErrMsg: string
  userEmilErrMsg: string
  clpnNmbrErrMsg: string
  ctfcNmbrErrMsg: string
  ctfcNmbrHintMsg: string

  pswdErrMsg: string
  pswdReErrMsg: string
  originPwdReErrMsg: string
}

export const initInfo = {
  userId: '',
  userEmil: '',
  clpnNmbr: '',
  ctfcNmbr: '',
  smsType: SmsType.ID,
  natnCode: '',
  mebrFileMgmtNmbr: '',

  userIdConfirm: false,
  userEmilConfirm: false,
  ctfcNmbrConfirm: false,

  pswdConfirm: false,
  pswdReConfirm: false,
  originPwdReConfirm: false,

  userIdErrMsg: '',
  userEmilErrMsg: '',
  clpnNmbrErrMsg: '',
  ctfcNmbrErrMsg: '',
  ctfcNmbrHintMsg: '',

  pswdErrMsg: '',
  pswdReErrMsg: '',
  originPwdReErrMsg: '',

  pswd: '',
  pswdRe: '',
  originPwd: '',
}
