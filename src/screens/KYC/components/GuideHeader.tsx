import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from '@components/Text'
import { Colors } from '@constants'
import IconXmark from '@images/svg/IconXmark.svg'

export default function GuideHeader(props: {
  textContent: string
  onPress: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  const { textContent, onPress } = props

  const handleModal = (): void => onPress(false)

  return (
    <View style={styles.container}>
      <Text size={16} bold={`500`} color={Colors.bl}>
        {textContent}
      </Text>
      <TouchableOpacity style={styles.closeBtn} onPress={handleModal}>
        <IconXmark />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 44,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
  },
})
