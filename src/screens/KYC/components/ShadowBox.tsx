import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ShadowProps } from '@models/KYC'
import { Colors } from '@constants'

export default function ShadowBox({
  children,
}: ShadowProps): JSX.Element {
  return <View style={styles.shadow}>{children}</View>
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.bl,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
})
