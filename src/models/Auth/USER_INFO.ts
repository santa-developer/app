import { FindTempType } from './FIND'

export enum SocialType {
  Facebook = 'F',
  Google = 'G',
  Hiblocks = 'H',
  Apple = 'A',
}

export enum SmsType {
  JOIN = '0',
  ID = '1',
  PW = '2',
  LOGIN = '3',
  SNS_JOIN = '6',
}

// sns 가입 여부
export enum CtfcType {
  JOIN = '0',
  SNS_JOIN = '6',
}

// 핸드폰 번호 & 인증번호 정보
export interface PhoneInfo {
  nationIso2?: string
  clpnNmbr?: string
  ctfcNmbr?: string
}

export type RegDeviceProp = {
  mebrMgmtNmbr: string
  toknNmbr: string
  toknNmbrApn: string
  dveDvnsCode: 'I' | 'A' // (I- 아이폰,A - 안드로이드)
  langCode: string
}

export type ConfirmFindPassType = SendFindPassType & {
  ctfcNmbr: string
}
export type FindPassChangeType = ConfirmFindPassType & {
  pswd: string
  pswdRe: string
}

export type SendFindPassType = {
  userId: string
} & (
  | {
      tempType: FindTempType.Email
      userEmil: string
      langCode?: string
    }
  | {
      tempType: FindTempType.Sms
      nationIso2?: string
      clpnNmbr: string
    }
)

// Socail parameter type
export interface SocialInfo {
  socialId?: string
  socialType?: SocialType
}

export enum idCheckType {
  JOIN = '0',
  PW = '2',
}

export interface UserInfoProps {
  userId: string
  pswd: string
  clpnNmbr: string
  ctfcNmbr: string
  natnCode: string
  userEmil: string
  ctgrList?: string[]
  socialType?: SocialType
  socialId?: string
  birthDay?: string
}
