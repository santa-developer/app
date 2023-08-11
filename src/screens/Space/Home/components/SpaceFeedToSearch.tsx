import { View } from 'react-native'
import React from 'react'
import { Colors } from '@constants'
import Text from '@components/Text'

/**
 * 검색된 스페이스 피드 (단일)
 */
export default function SpaceFeedToSearch(): JSX.Element {
  return (
    <View
      style={{ flexDirection: 'row', gap: 10, paddingBottom: 10 }}
    >
      <View
        style={{
          width: 65,
          height: 65,
          backgroundColor: Colors.active,
        }}
      />
      <View style={{ gap: 10, justifyContent: 'center' }}>
        <Text>5R - 16 kettlebell Swing</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text color={Colors.nagative} size={12} bold="400">
            sdf231
          </Text>
          <Text color={Colors.active} size={12} bold="400">
            CrossFit
          </Text>
        </View>
      </View>
    </View>
  )
}
