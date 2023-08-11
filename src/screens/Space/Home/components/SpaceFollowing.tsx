import React, { useEffect, useState } from 'react'
import SpaceIndicator from './SpaceIndicator'
import SpaceBanner from './SpaceBanner'
import { View } from 'react-native'
import { RecommendSpace } from '@models/Common/SPACE'
import space from '@api/space.api'

/**
 * Space 팔로잉 화면
 */
export default function SpaceFollowing(): JSX.Element {
  const [followings, setFollow] = useState<RecommendSpace[]>([])

  useEffect(() => {
    space.followingSpace
      .get({ type: 'FOLLOW' })
      .then((data) => setFollow(data.response.list))
  }, [])
  return (
    <View>
      <SpaceBanner />
      <SpaceIndicator data={followings} />
    </View>
  )
}
