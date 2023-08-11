import { Colors } from '@constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '@components/Text'

export default function IconCurrDot(props: {
  order: number
}): JSX.Element {
  return (
    <View style={styles.currDot}>
      <Text
        size={12}
        bold={'normal'}
        color={Colors.wh}
        style={{ textAlign: 'center' }}
      >
        {props.order}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  currDot: {
    width: 22,
    height: 22,
    backgroundColor: Colors.active,
    borderRadius: 99,
  },
})
