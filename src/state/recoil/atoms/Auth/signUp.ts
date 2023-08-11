import { UserSignUpProp, initUserInfo } from '@models/Auth/SIGN_UP'
import { atom } from 'recoil'

export const SignUpUserInfoState = atom<UserSignUpProp>({
  key: 'signUpUserInfo',
  default: initUserInfo,
})
