import React from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native'

const SpaceMypageCommentItem = (): JSX.Element => {
  return (
    <View
      style={{ backgroundColor: 'red', width: 100, height: 100 }}
    ></View>
  )
}

export default function SpaceMypageComment(): JSX.Element {
  const fff = [1, 2, 3, 4, 5]

  return (
    <>
      <FlatList
        numColumns={3}
        data={fff}
        renderItem={SpaceMypageCommentItem}
      />
    </>
  )
}
