import React from 'react'
import { IHAblMypageHeader } from '@models/Mypage/MYPAGE'
import {
  isBottomModalState,
  isMoreOptionState,
} from '@recoil/atoms/Mypage/mypage'
import Icon from 'react-native-fontawesome-pro'
import { useSetRecoilState } from 'recoil'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function MypageHeaderRight(
  props: IHAblMypageHeader
): JSX.Element {
  const setIsMoreOption = useSetRecoilState(isMoreOptionState)
  const setIsBottomModal = useSetRecoilState(isBottomModalState)
  const { isMypage } = props

  return (
    <TouchableOpacity
      style={styles.iconBtn}
      onPress={(): void => {
        isMypage ? setIsMoreOption(true) : setIsBottomModal(true)
      }}
    >
      <Icon name="ellipsis" type="solid" size={20} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconBtn: {
    padding: 20,
    justifyContent: 'center',
  },
})
