import React, { useState } from 'react'
import Icon from 'react-native-fontawesome-pro'
import { FormInputProps } from './TextInputModel'
import _ from 'lodash'
import { Colors } from '@constants'
import { StyleSheet, Text, TextInput } from 'react-native'
import { View } from 'react-native'

export default function TextInputScreen({
  props,
}: {
  props: FormInputProps
}): JSX.Element {
  const {
    inputRef,
    iconInfo,
    containerStyle,
    hintMessage,
    errorMessage,
    secureTextEntry,
    onClickClearBtn,
    editable = true,
    ...rest
  } = props

  const [isBlindText, setIsBlindText] = useState(secureTextEntry)
  const [isFocus, setIsFocus] = useState(false)
  const [eyeIcon, setEyeIcon] = useState('eye-slash')

  const handlePressIsSecureText = (): void => {
    setIsBlindText(!isBlindText)
    setEyeIcon(isBlindText ? 'eye' : 'eye-slash')
  }

  const handleFocus = (): void => {
    setIsFocus(true)
  }
  const handleBlur = (): void => {
    setIsFocus(false)
  }

  const type = (): string => {
    return !_.isEmpty(errorMessage)
      ? 'error'
      : !_.isEmpty(props.value)
      ? 'active'
      : isFocus
      ? 'active'
      : 'disable'
  }

  const styles = StyleSheet.create({
    wrapper: {
      borderRadius: 4,
      borderWidth: 1,
      paddingLeft: 15,
      paddingRight: rest.multiline ? 15 : 40,
      marginBottom: !_.isEmpty(hintMessage) ? 4 : 8,
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      borderColor:
        type() === 'error'
          ? Colors.error // Negative시 보더 색상
          : type() === 'disable'
          ? Colors.disabled // Disable 보더 색상
          : Colors.nagative, // Active, Positve 보더 색상
    },
    leftIcon: { marginLeft: 15 },
    textInput: {
      height: 50,
      width: '100%',
      fontSize: 15,
      color: editable ? Colors.bl : Colors.nagative,
    },
    rightIcon: {
      paddingRight: 15,
    },
    textDescript: {
      marginBottom: 8,
      fontSize: 13,
      color: errorMessage ? Colors.nagative : Colors.error,
    },
  })

  return (
    <>
      <View style={[styles.wrapper, containerStyle]}>
        {(iconInfo?.iconName || iconInfo?.iconComp) &&
          (iconInfo?.iconComp || (
            <Icon
              name={iconInfo?.iconName}
              type="solid"
              color={Colors.wh2}
              style={styles.leftIcon}
            />
          ))}
        <TextInput
          style={styles.textInput}
          ref={inputRef}
          secureTextEntry={isBlindText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          {...rest}
        />
        {isFocus &&
          onClickClearBtn &&
          editable &&
          !secureTextEntry && (
            <Icon
              name="circle-xmark"
              type="solid"
              color={Colors.disabled}
              onPress={onClickClearBtn}
            />
          )}
        {isFocus && secureTextEntry && (
          <Icon
            name={eyeIcon}
            type="solid"
            style={styles.rightIcon}
            onPress={handlePressIsSecureText}
            color={Colors.nagative}
          />
        )}
        {/* {typeof hintMessage !== 'string' && hintMessage?.isError && (
          <ErrorIcon
            name="circle-exclamation"
            type="solid"
            color=${Colors.error}
          />
        )} */}
      </View>
      {hintMessage && (
        <Text style={styles.textDescript}>{hintMessage}</Text>
      )}
      {errorMessage && (
        <Text style={styles.textDescript}>{errorMessage}</Text>
      )}
    </>
  )
}
