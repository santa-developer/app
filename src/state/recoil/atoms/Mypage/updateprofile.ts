import { atom } from 'recoil'
import { UpdateProfileProps } from '@models/Mypage/MYPAGE'

export const editProfileState = atom<UpdateProfileProps>({
  key: 'userInfo',
  default: undefined,
})
