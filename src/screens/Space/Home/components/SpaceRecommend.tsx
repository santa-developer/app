import React, { useEffect, useState } from 'react'
import SpaceIndicator from './SpaceIndicator'
import SpaceBanner from './SpaceBanner'
import { View } from 'react-native'
import space from '@api/space.api'
import { RecommendSpace } from '@models/Common/SPACE'

/**
 * Space 추천 화면
 */
export default function SpaceRecommend(): JSX.Element {
  const [recommends, setRecommends] = useState<RecommendSpace[]>([])

  useEffect(() => {
    space.recommendSpace
      .get()
      .then((data) => setRecommends(data.response.list))
  }, [])

  return (
    <View>
      <SpaceBanner />
      <SpaceIndicator data={recommends} />
    </View>
  )
}
