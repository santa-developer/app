import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { StyledTextProps } from './TextModel'
import { Colors } from '@constants'
import { StyledFontFamily } from './TextStyles'

export default function TextScreen({
  props,
}: {
  props: StyledTextProps
}): JSX.Element {
  const {
    bold,
    size,
    color,
    letterSpacing,
    lineHeight,
    style,
    ...rest
  } = props
  const fontSize = size || 14

  const styles = StyleSheet.create({
    textStyle: {
      fontSize,
      letterSpacing,
      color: color || Colors.bl,
      lineHeight: lineHeight || fontSize + 8,
      fontFamily: StyledFontFamily(bold),
    },
  })

  return <Text {...rest} style={[styles.textStyle, style]} />
}
