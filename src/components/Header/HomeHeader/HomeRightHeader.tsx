import React from 'react'
import IconDm from '@images/svg/IconDm.svg'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
export default function HomeRightHeader(): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.headerIcon} activeOpacity={0.7}>
        <IconDm />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    justifyContent: 'center',
  },
  headerIcon: {
    flexDirection: 'row',
  },
})
