import { Colors } from '@constants'
import React from 'react'
import { HrProps } from './HrModel'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'

export default function HrScreen(props: HrProps): JSX.Element {
  const { borderColor, borderWidth, style } = props

  const styles = StyleSheet.create({
    hr: {
      width: '100%',
      borderTopWidth: Number(borderWidth) || 0.8,
      borderColor: borderColor || Colors.disabled,
    },
  })

  return <View style={[styles.hr, style]} />
}
