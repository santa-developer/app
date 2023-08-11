import MEBR from '@models/MEBR'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import { DefaultValue, selector } from 'recoil'

export const loginedUserInfoSelector = selector<MEBR>({
  key: 'loginedUserInfoSeletor',
  get: ({ get }) => {
    const userInfo = get(loginedUserInfoState)

    return userInfo
  },
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const userInfo = newValue
      if (userInfo) {
        set(loginedUserInfoState, newValue)
      }
    }
  },
})
