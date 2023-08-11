import { Modal, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '@constants'
import Text from '@components/Text'

interface IWalletModal {
  text: string
  buttonText: string
  visible: boolean
  setVisible: () => void
}

export default function WalletModal({
  text,
  buttonText,
  visible,
  setVisible,
}: IWalletModal): JSX.Element {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={style.overlay}>
        <View style={style.modalView}>
          <Text color={Colors.nagative}>{text}</Text>
          <Pressable onPress={setVisible} style={style.modalConfirm}>
            <Text color={Colors.wh} size={16} bold="500">
              {buttonText}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: Colors.wh,
    padding: 20,
    alignItems: 'center',
    gap: 30,
    borderRadius: 15,
    width: '80%',
    shadowColor: Colors.bl,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalConfirm: {
    backgroundColor: Colors.active,
    width: '100%',
    padding: 5,
    borderRadius: 4,
    alignItems: 'center',
  },
})
