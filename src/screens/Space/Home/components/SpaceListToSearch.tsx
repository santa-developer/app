import React from 'react'
import { ScrollView } from 'react-native'
import Text from '@components/Text'

/**
 * 스페이스 검색 결과
 */
export default function SpaceListToSearch(): JSX.Element {
  return (
    <ScrollView
      style={{
        marginVertical: 18,
        flex: 1,
      }}
    >
      <Text>테스트테스트 우리닐스</Text>
    </ScrollView>
  )
}
