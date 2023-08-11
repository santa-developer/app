import { DefaultValue, selector } from 'recoil'
import {
  mypageUserInfoState,
  mypageCntInfoState,
  mypageFeedListState,
  mypageFeedPagenationState,
  trackingMypageInfoState,
  trackingMypageFeedListState,
} from '@recoil/atoms/Mypage/mypage'
import { MypageProps } from '@models/Mypage/MYPAGE'

export const mypageHomeUserInfoSelector = selector<MypageProps>({
  key: 'mypageHomeUserInfo',
  get: ({ get }) => {
    const userInfo = get(mypageUserInfoState)
    const cntInfo = get(mypageCntInfoState)

    return {
      userInfo,
      cntInfo,
    }
  },
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const { userInfo, cntInfo } = newValue
      if (userInfo && cntInfo) {
        set(mypageUserInfoState, userInfo)
        set(mypageCntInfoState, cntInfo)

        const info = {
          [userInfo.mebrMgmtNmbr]: {
            userInfo,
            cntInfo,
          },
        }
        set(trackingMypageInfoState, (prev) => ({ ...prev, ...info }))
      }
    }
  },
})

export const mypageHomeFeedSelector = selector({
  key: 'mypageHomeFeed',
  get: ({ get }) => {
    const feedList = get(mypageFeedListState)
    const pagenation = get(mypageFeedPagenationState)
    const userInfo = get(mypageUserInfoState)

    return {
      mebrMgmtNmbr: userInfo.mebrMgmtNmbr,
      list: feedList,
      pagination: pagenation,
    }
  },
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const { list, pagination, mebrMgmtNmbr } = newValue
      set(mypageFeedListState, list)
      set(mypageFeedPagenationState, pagination)

      const feedInfo = {
        [mebrMgmtNmbr]: {
          list,
          pagination,
        },
      }
      set(trackingMypageFeedListState, (prev) => ({
        ...prev,
        ...feedInfo,
      }))
    }
  },
})
