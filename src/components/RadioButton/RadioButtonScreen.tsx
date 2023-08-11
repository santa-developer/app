import Text from '@components/Text'
import { Colors } from '@constants'
import React from 'react'
import { RadioButtonProps } from './RadioButtonModel'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function RadioButtonScreen(
  prpos: RadioButtonProps
): JSX.Element {
  const { onPress, checked, desc } = prpos

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    readio: {
      borderWidth: checked ? 6 : 3,
      borderColor: checked ? Colors.active : Colors.disabled,
      width: 18,
      height: 18,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioText: {
      marginLeft: 5,
      color: checked ? Colors.bl : Colors.nagative,
      fontWeight: checked ? '500' : '400',
    },
  })

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={styles.readio} />
      <Text style={styles.radioText}>{desc}</Text>
    </TouchableOpacity>
  )
}
