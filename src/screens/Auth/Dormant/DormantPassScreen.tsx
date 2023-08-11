import Text from '@components/Text'
import $t from 'i18n'
import React from 'react'
import { View } from 'react-native'

/**
 * kyc 인증 완료 회원(내국인) 휴면해제 인증
 * @returns
 */
function DormantPass(): React.JSX.Element {
  return (
    <View>
      <Text>{$t('KYC.KYC_WORD_82')}</Text>
    </View>
  )
}

export default DormantPass
