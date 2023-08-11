import React, { useEffect, useState } from 'react'
import NavTab from '@components/NavTab'
import LikePosts from './Component/LikePosts'
import DisLikePosts from './Component/DisLikePosts'
import HunterPosts from './Component/HunterPosts'
import {
  AtvPointProps,
  WknbMgmtProps,
} from '@models/Mypage/NOW_POINT'
import myPage from '@api/mypage.api'

export default function PointTabMenu(): JSX.Element {
  const [atvtPoint, setAtvtPoint] = useState<AtvPointProps>()
  const [nowData, setNowData] = useState<WknbMgmtProps>()

  // 스테이킹 정보 가져오기
  const _loadMyPointInfo = async (): Promise<void> => {
    return myPage.nowpoint
      .get()
      .then(async (result) => {
        if (result.check) {
          setAtvtPoint(result.response.atvtPoint)
          setNowData(result.response.nowData)
        } else {
          // await setDefaultMsg()
        }
      })
      .catch(async () => {
        // await setDefaultMsg()
      })
  }

  useEffect(() => {
    _loadMyPointInfo()
  }, [])

  const tabLabels = [
    `좋아요 ${
      nowData?.weekPoitRegYn === 'Y'
        ? Number(atvtPoint?.newLikeRPnt)
        : '-'
    }P`,
    `싫어요 ${
      nowData?.weekPoitRegYn === 'Y'
        ? Number(atvtPoint?.newHateRPnt)
        : '-'
    }P`,
    `헌터 ${
      nowData?.weekPoitRegYn === 'Y'
        ? Number(atvtPoint?.hunterPnt)
        : '-'
    }P`,
  ]
  const tabNames = ['account', 'feed', 'hashtag']
  const components = [LikePosts, DisLikePosts, HunterPosts]
  return (
    <>
      <NavTab
        tabLabel={tabLabels.map((label) => label.toString())}
        tabName={tabNames.map((name) => name.toString())}
        components={components}
      />
    </>
  )
}
