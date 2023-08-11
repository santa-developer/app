import { UserFindProps, initInfo } from '@models/Auth/FIND'
import { atom } from 'recoil'

export const FindUserInfoState = atom<UserFindProps>({
  key: 'findUserInfo',
  default: initInfo,
})
