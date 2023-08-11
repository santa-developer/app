import React from 'react'
import { ButtonProps } from './ButtonModel'
import Text from '@components/Text'
import { Colors } from '@constants'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'react-native'

export default function ButtonScreen(
  props: ButtonProps
): JSX.Element {
  const {
    text,
    onPress,
    style,
    textStyle,
    buttonType,
    buttonStyle,
    children,
    ...rest
  } = props

  const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      width: '100%',
      height: 'auto',
      borderRadius: 4,
      paddingVertical: 14,
      backgroundColor:
        buttonType === 'normal'
          ? Colors.wh
          : buttonType === 'enabled'
          ? Colors.disabled
          : buttonType === 'active'
          ? Colors.active
          : buttonType === 'staking'
          ? Colors.staking
          : Colors.nagative,
    },
    buttonText: {
      textAlign: 'center',
      color: buttonType === 'normal' ? Colors.bl : Colors.wh,
    },
  })

  return (
    <View style={[styles.wrapper, style]}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={[styles.buttonContainer, buttonStyle]}
        disabled={buttonType === 'enabled'}
        {...rest}
      >
        {children ? (
          children
        ) : (
          <Text
            size={14}
            bold={'500'}
            style={[styles.buttonText, textStyle]}
          >
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}
