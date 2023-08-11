import MEBR from '@models/MEBR'

// 로그인 타입
export enum LoginType {
  ID = 'id',
  Social = 'social',
  SignUp = 'signUp',
}

export interface LoginInfo {
  userId?: string
  userPassword?: string
}

export interface LoginResult {
  userInfo: MEBR
  tokenSet: { accessToken: string; refreshToken: string }
  spaceList: string[]
}
