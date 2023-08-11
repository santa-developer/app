import { FindTempType } from '@models/Auth/FIND'
import { MyPageCntProps } from '@models/Common/MYPAGE_CNT'
import MEBR from '@models/MEBR'
import {
  NavigationContainerRef,
  ParamListBase,
  StackActions,
} from '@react-navigation/native'
import React from 'react'

export const navigationRef =
  React.createRef<NavigationContainerRef<ParamListBase>>()

const navigate = (routeName: string, params?: object): void => {
  navigationRef.current?.navigate(routeName, params)
}

const popToTop = (): void => {
  navigationRef.current?.dispatch(StackActions.popToTop())
}
const pop = (count?: number): void => {
  navigationRef.current?.dispatch(StackActions.pop(count))
}
const goBack = (): void => {
  navigationRef.current?.goBack()
}
let isPushing = false
const push = (routeName: string, params?: object): void => {
  if (isPushing) {
    return
  }
  isPushing = true
  if (navigationRef.current) {
    const { dispatch } = navigationRef.current
    dispatch(StackActions.push(routeName, params))
  }

  setTimeout(() => {
    isPushing = false
  }, 500)
}

export type RootStackParamList = {
  /* AuthNavigator start */
  Auth: { userId?: string } | undefined
  ResetPW: { tempType: FindTempType }

  /* MainTabNavigator start */
  Home: undefined
  Profile: { userId: string }
  Feed: { sort: 'latest' | 'top' } | undefined

  /* Mypage Navigator start */
  MypageHome: {
    mebrMgmtNmbr?: string
    uniqueKey?: string
  }
  MypageFollow: {
    followType: string
    userInfo: MEBR
    cntInfo: MyPageCntProps
  }

  NoticeDetail: {
    impYn: string | undefined
    nteTitle: string
    nteContents: string
    regdatetime: string
  }

  ResetAuthenticationReInput: {
    password: string
  }

  // out of all page
  // 신고
  Declare: { reportId: string; code: string; title?: string }
}

export default {
  navigate,
  goBack,
  popToTop,
  push,
  pop,
}
