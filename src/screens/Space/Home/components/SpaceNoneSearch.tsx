import React from 'react'
import { View } from 'react-native'
import NoResult from '@images/gif/no-result-search.gif'
import FastImage from 'react-native-fast-image'
import Text from '@components/Text'
import { Colors } from '@constants'

export default function SpaceNoneSearch(): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FastImage
        source={NoResult}
        style={{ width: '80%', height: '50%' }}
      />
      <Text color={Colors.nagative}>검색 결과가 없습니다.</Text>
    </View>
  )
}
