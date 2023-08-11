import { View } from 'react-native'
import React from 'react'
import { Colors } from '@constants'
import Text from '@components/Text'

/**
 * 검색된 스페이스 (단일)
 * @returns
 */

interface Iprops {
  spaceName: string
  category: string
  followCnt: number
  intro: string
}

export default function SpaceToSearch({
  spaceName,
  category,
  followCnt,
  intro,
}: Iprops): JSX.Element {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        gap: 10,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          width: 65,
          height: 65,
          backgroundColor: Colors.active,
        }}
      />

      <View>
        <Text>{spaceName}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text color={Colors.active}>
            {`${followCnt.toLocaleString()}명`}
          </Text>
          <Text>{category}</Text>
        </View>
        <Text bold="400" size={14} color={Colors.disabled}>
          {`${intro.substring(0, 22)}...`}
        </Text>
      </View>
    </View>
  )
}
