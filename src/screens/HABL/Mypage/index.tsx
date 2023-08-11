import React, { useEffect, useState } from 'react'
import MypageScreen from './MypageScreen'
import { StackScreenProps } from '@react-navigation/stack'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { loginedUserInfoState } from '@recoil/atoms/auth'
import { RootStackParamList } from '@service/NavigationService'
import { LoadingIconPage } from '@components/Loading/LoadingScreen'
import {
  mypageHomeFeedSelector,
  mypageHomeUserInfoSelector,
} from '@recoil/selectors/Mypage/mypage'
import MypageHeader from '@components/Header/MyapgeHeader'
import mypage from '@api/mypage.api'
import { mebrMgmtNmbrFromUniqueKeyState } from '@recoil/atoms/Mypage/mypage'

type Props = StackScreenProps<RootStackParamList, 'MypageHome'>

export default function Mypage({ route }: Props): JSX.Element {
  // ====== state ======
  const [isLoading, setIsLoading] = useState(false) // 로딩 여부
  const [initMebrMgmtNmbr, setInitMebrMngtNmbr] = useState('') //
  const [uniqueKey, setUniqueKey] = useState('')
  // ====== state end ======

  // ===== rocil ======
  // 사용자 유니크 값으로 저장
  const setMebrMgmtNmbrFromUniqueKey = useSetRecoilState(
    mebrMgmtNmbrFromUniqueKeyState
  )
  // 마이페이지 사용자 정보
  const userInfo = useRecoilValue(loginedUserInfoState) // 내정보 가져오기
  const setMypageHomeUserInfo = useSetRecoilState(
    mypageHomeUserInfoSelector
  )
  // 마이페이지 피드 정보
  const setMypageHomeFeed = useSetRecoilState(mypageHomeFeedSelector)

  // ===== rocil end ======

  // 초기정보 불러오기
  const initialize = async (): Promise<void> => {
    setIsLoading(true)
    // set uniqueKey
    const uniqueKey = `${new Date().getTime()}`
    setUniqueKey(uniqueKey)

    const mebrMgmtNmbr =
      route.params?.mebrMgmtNmbr || userInfo.mebrMgmtNmbr
    setInitMebrMngtNmbr(mebrMgmtNmbr)

    setMebrMgmtNmbrFromUniqueKey((prev) => ({
      ...prev,
      [uniqueKey]: mebrMgmtNmbr,
    }))

    const params = {
      mebrMgmtNmbr: mebrMgmtNmbr,
    }
    // 마이페이지 사용자 정보 가져오기
    const userResult = await mypage.myInfoProc.get({ params })
    if (userResult.check) {
      const response = userResult.response

      setMypageHomeUserInfo(response)
    }
    // 마이페이지 피드 정보 가져오기
    const listParams = {
      ...params,
      currPage: 1,
      recordCountPerPage: 30,
    }

    const result = await mypage.myBltbListProc.get({
      params: listParams,
    })
    if (result.check) {
      const response = result.response

      setMypageHomeFeed({
        mebrMgmtNmbr: mebrMgmtNmbr,
        ...response,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    initialize()
  }, [])

  return isLoading ? (
    <LoadingIconPage />
  ) : (
    <>
      <MypageHeader
        uniqueKey={uniqueKey}
        mebrMgmtNmbr={initMebrMgmtNmbr}
      />
      <MypageScreen mebrMgmtNmbr={initMebrMgmtNmbr} />
    </>
  )
}
