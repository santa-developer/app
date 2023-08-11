import MEBR from '@models/MEBR'
import { atom } from 'recoil'

export const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: false,
})

export const loginedUserInfoState = atom<MEBR>({
  key: 'loginedUserInfo',
  default: new MEBR(''),
})

export const manageSpaceListState = atom<string[]>({
  key: 'manageSpaceList',
  default: [],
})

export const isMebrFollowState = atom<Record<string, boolean>>({
  key: 'isMebrFollow',
  default: {},
})
