import React, { useEffect, useState } from 'react'
import MypageFollower from './MypageFollower'
import MypageFollowing from './MypageFollowing'
import MypageLike from './MypageLike'
import { CommonHeader } from '@components/Header'
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack'
import NavTab from '@components/NavTab'
import _ from 'lodash'
import { RootStackParamList } from '@service/NavigationService'
import { nFormatter } from '@utils/NumberUtils'

type Props = StackScreenProps<RootStackParamList, 'MypageFollow'>

export default function MypageFollow(props: Props): JSX.Element {
  const { followType, cntInfo } = props.route.params
  const [navTabinfo, setNavTabinfo] = useState<{
    tabLabel: string[]
    tabName: string[]
    components: (() => JSX.Element)[]
  }>({
    tabLabel: [],
    tabName: [],
    components: [],
  })

  useEffect(() => {
    setNavTabinfo({
      tabLabel: [
        `팔로잉 ${nFormatter(cntInfo.followingCnt)}`,
        `팔로워 ${nFormatter(cntInfo.followerCnt)}`,
        `좋아요 ${nFormatter(cntInfo.voteCnt)}`,
      ],
      tabName: ['following', 'follower', 'like'],
      components: [MypageFollower, MypageFollowing, MypageLike],
    })
  }, [])

  return (
    <>
      {!_.isEmpty(navTabinfo.components) && (
        <NavTab
          tabLabel={navTabinfo.tabLabel}
          tabName={navTabinfo.tabName}
          components={navTabinfo.components}
          initialRoute={followType || 'following'}
        />
      )}
    </>
  )
}

MypageFollow.navigationOptions = (
  props: Props
): StackNavigationOptions => {
  return CommonHeader({
    title: props.route.params.userInfo.userId,
  })
}
