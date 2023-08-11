import React from 'react'
import { useConfirm } from '@hooks/useCommonAlert'
import NavigationService from '@service/NavigationService'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import { Colors } from '@constants'
import { KYCBank, initKYCInfo } from '@recoil/atoms/KYC/kyc'
import { useRecoilValue, useResetRecoilState } from 'recoil'

export default function HeaderLeft(): React.JSX.Element {
  const confirm = useConfirm()
  const { kycLevel } = useRecoilValue(initKYCInfo)
  const resetBankInfo = useResetRecoilState(KYCBank)

  const handleBackPress = (): void => {
    if (kycLevel === undefined || kycLevel < 2) {
      NavigationService.navigate('KYCMain')
    } else {
      confirm({
        desc: `KYC인증이 완료되지 않았습니다.\n취소하시겠습니까?\n\n14일 이내 남은 단계를 이어서 진행할 수 있습니다.`,
        onPressConfirm: () => {
          if (kycLevel === 3) {
            resetBankInfo()
          }

          NavigationService.navigate('MypageHome')
        },
      })
    }
  }

  return (
    <View style={styles.headerWrap}>
      <TouchableOpacity onPress={handleBackPress}>
        <Icon
          name={'arrow-left'}
          type={'light'}
          size={16}
          color={Colors.bl}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerWrap: {
    padding: 20,
    justifyContent: 'center',
  },
})
