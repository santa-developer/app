import React from 'react'
import Text from '@components/Text'
import { IHAblMypageHeader } from '@models/Mypage/MYPAGE'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'

export default function MypageHeaderCenter(
  props: IHAblMypageHeader
): JSX.Element {
  const { isMypage, userId } = props

  return (
    <View style={styles.wrapper}>
      {!isMypage && (
        <Text bold={'500'} size={16}>
          {userId}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})
