import React from 'react'
import NavTab from '@components/NavTab'
import SpaceRecommend from '../../SpaceRecommend'
import { View } from 'react-native'

/**
 * 스페이스 홈화면 맨위에 표시되는 추천/팔로잉/운영중
 */
export default function SpaceHeader(): JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <NavTab
        tabName={['추천', '팔로잉', '운영중']}
        tabLabel={['추천', '팔로잉', '운영중']}
        components={[SpaceRecommend, SpaceRecommend, SpaceRecommend]}
      />
    </View>
  )
}
