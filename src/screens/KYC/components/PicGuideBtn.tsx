import { Colors } from '@constants'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import IconHelpCircle from '@images/svg/IconHelpCircle.svg'
import Text from '@components/Text'

export default function PicGuideBtn(props: {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element {
  const { setIsModal } = props

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={(): void => setIsModal(true)}
    >
      <IconHelpCircle />
      <Text
        size={12}
        bold={'normal'}
        color={Colors.wh}
        style={{ marginLeft: 3 }}
      >
        {`촬영가이드`}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 85,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    backgroundColor: Colors.bl,
  },
})
