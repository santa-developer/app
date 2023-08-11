import React, { useEffect, useState } from 'react'
import MypageHeader from '@components/Header/MyapgeHeader'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import { LoadingIconPage } from '@components/Loading/LoadingScreen'
import mypage from '@api/mypage.api'
import { mySpaceListState } from '@recoil/atoms/Mypage/mypage'
import SpaceMypageScreen from './SpaceMypageScreen'

export default function SpaceMypage(): JSX.Element {
  // ====== state ======
  const [isLoading, setIsLoading] = useState(false) // 로딩 여부

  // ====== state end ======
  const userInfo = useRecoilValue(loginedUserInfoState) // 내정보 가져오기
  const setMySpaceList = useSetRecoilState(mySpaceListState)

  const initialize = async (): Promise<void> => {
    setIsLoading(true)

    const params = {
      mebrMgmtNmbr: userInfo.mebrMgmtNmbr,
      spaceLimit: 10,
    }

    // 사용자 스페이스 정보 가져오기
    const result = await mypage.getMySpaceList.get(params)

    if (result.check) {
      setMySpaceList(result.response)
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
      <MypageHeader mebrMgmtNmbr={userInfo.mebrMgmtNmbr} />
      <SpaceMypageScreen mebrMgmtNmbr={userInfo.mebrMgmtNmbr} />
    </>
  )
}
