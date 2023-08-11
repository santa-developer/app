import React, { useEffect, useState } from 'react'
import SpaceIndicator from './SpaceIndicator'
import SpaceBanner from './SpaceBanner'
import { View } from 'react-native'
import { RecommendSpace } from '@models/Common/SPACE'
import space from '@api/space.api'

/**
 * Space 운영중 화면
 */
export default function SpaceOwner(): JSX.Element {
  const [owners, setOwners] = useState<RecommendSpace[]>([])

  useEffect(() => {
    space.followingSpace
      .get({ type: 'MY' })
      .then((data) => setOwners(data.response.list))
  }, [])

  return (
    <View>
      <SpaceBanner />
      <SpaceIndicator data={owners} />
    </View>
  )
}
