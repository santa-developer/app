import { View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import FolderEmpty from '@images/gif/folder-is-empty.gif'
import Text from '@components/Text'
import { Colors } from '@constants'

/**
 * 검색 화면 출력시 초기화면
 */
export default function SpaceSearchInit(): JSX.Element {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <FastImage
        source={FolderEmpty}
        style={{
          flex: 0.85,
          width: '100%',
          padding: 0,
        }}
      />
      <Text bold="400" color={Colors.nagative} size={16}>
        원하는 콘텐츠를 찾아보세요
      </Text>
    </View>
  )
}
