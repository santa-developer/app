import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@constants'
import Text from '@components/Text'

/**
 * 검색된 스페이스 계정 (단일)
 */
export default function SpaceAccount(): JSX.Element {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: Colors.active,
          borderRadius: 50,
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text size={16} bold="500">
            user_id01
          </Text>
          <Text size={14} bold="400" color={Colors.nagative}>
            자기소개를 입력해주세요
          </Text>
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: Colors.active,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
        >
          <Text>팔로우</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
