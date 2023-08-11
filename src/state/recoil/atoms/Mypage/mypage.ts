import BLTB from '@models/Common/BLTB'
import HISP_MGMT from '@models/Common/HISP_MGMT'
import { MyPageCntProps } from '@models/Common/MYPAGE_CNT'
import PAGINATION from '@models/Common/PAGINATION'
import MEBR from '@models/MEBR'
import { MypageProps } from '@models/Mypage/MYPAGE'
import { atom } from 'recoil'

// 더보기 보여주기 여부
export const isMoreOptionState = atom({
  key: 'isMoreOption',
  default: false,
})

// 다른 사용자 마이페이지 옵션정보 클릭시
export const isBottomModalState = atom({
  key: 'isBottomModal',
  default: false,
})

// 마이페이지 헤더 높이 정보
export const headerHeightState = atom<Record<string, number>>({
  key: 'headerHeight',
  default: undefined,
})

// 마이페이지 사용자 정보
export const mypageUserInfoState = atom<MEBR>({
  key: 'mypageUserInfo',
  default: undefined,
})
// 마이페이지 카운트 정보(팔로우 팔로잉 좋아요)
export const mypageCntInfoState = atom<MyPageCntProps>({
  key: 'mypageCntInfo',
  default: undefined,
})

export const trackingMypageInfoState = atom<
  Record<string, MypageProps>
>({
  key: 'trackingMypageInfo',
  default: {},
})

export const trackingMypageFeedListState = atom<
  Record<string, { list: BLTB[]; pagination: PAGINATION }>
>({
  key: 'trackingMypageFeedList',
  default: {},
})

// 마이페이지 피드 목록
export const mypageFeedListState = atom<BLTB[]>({
  key: 'mypageFeedList',
  default: [],
})
export const mypageFeedPagenationState = atom<PAGINATION>({
  key: 'mypageFeedPagenation',
  default: undefined,
})

export const mebrMgmtNmbrFromUniqueKeyState = atom<
  Record<string, string>
>({
  key: 'mebrMgmtNmbrFromUniqueKey',
  default: {},
})

// 마이페이지 팔로우, 팔로잉, 좋아요 타입
export const followTypeState = atom({
  key: 'followType',
  default: '',
})

/** Space Mypage */
export const mySpaceListState = atom<{
  list?: HISP_MGMT[]
  pagination?: PAGINATION
}>({
  key: 'mySpaceList',
  default: {
    list: undefined,
    pagination: undefined,
  },
})
export const mySelectSpaceState = atom({
  key: 'mySelectSpace',
  default: '',
})
