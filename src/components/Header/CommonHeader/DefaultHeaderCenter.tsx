import Text from '@components/Text'
import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'

export default function DefaultHeaderCenter({
  title,
}: {
  title: string
}): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <Text bold={'500'} size={16}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
