import React, { useEffect, useState } from 'react'
import { BottomModalModel } from './BottomModalModel'
import Modal from 'react-native-modal'
import { Colors, Layout } from '@constants'
import IconIndicator from '@images/svg/IconIndicator.svg'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'react-native'

export default function BottomModalScreen({
  props,
}: {
  props: BottomModalModel
}): JSX.Element {
  const {
    isVisible,
    onBackdropPress,
    isBackDrop = true,
    modalHeight = '30%',
    backgroundColor = Colors.wh,
    children,
  } = props
  const [showModal, setShowModal] = useState(false)

  const handleCancel = (): void => {
    setShowModal(false)
  }

  useEffect(() => {
    setShowModal(isVisible)
  }, [isVisible])

  // 스타일
  const styles = StyleSheet.create({
    wrapper: {
      margin: 0,
      justifyContent: 'flex-end',
    },
    conatiner: {
      width: '100%',
      height: modalHeight,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 15,
      alignItems: 'center',
      backgroundColor: backgroundColor,
    },
    barButton: {
      marginTop: 5,
      marginBottom: 15,
    },
  })

  return (
    <Modal
      style={styles.wrapper}
      isVisible={showModal}
      deviceWidth={Layout.window.width}
      deviceHeight={Layout.window.height}
      onBackdropPress={onBackdropPress || handleCancel}
      hasBackdrop={isBackDrop}
    >
      <View style={styles.conatiner}>
        <TouchableOpacity
          style={styles.barButton}
          activeOpacity={1}
          onPress={onBackdropPress}
        >
          <IconIndicator />
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  )
}
