import { Colors } from '@constants'
import NavigationService from '@service/NavigationService'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon, { IconProps } from 'react-native-fontawesome-pro'

export default function DefaultHeaderLeft(
  props?: IconProps
): JSX.Element {
  return (
    <View>
      <TouchableOpacity
        onPress={(): void => {
          props?.onPress || NavigationService.goBack()
        }}
        style={[styles.iconBtn, props?.containerStyle]}
      >
        <Icon
          name={props?.name || 'arrow-left'}
          type={props?.type || 'light'}
          size={props?.size || 16}
          color={Colors.bl}
          {...props}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  iconBtn: {
    padding: 20,
    justifyContent: 'center',
  },
})
