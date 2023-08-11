import Text from '@components/Text'
import { Layout } from '@constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function HomeEmpty({
  loading,
}: {
  loading: boolean
}): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <Text>
        {loading ? 'Loading' : '게시물이 존재하지 않습니다.'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Layout.bodyHeight - 300,
    width: '100%',
  },
})
