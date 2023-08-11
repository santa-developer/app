import React from 'react'
import Complete from '@screens/KYC/components/Complete'
import NavigationService from '@service/NavigationService'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import HeaderLeft from '@screens/KYC/components/KYCHeaderLeft'

export default function IdentityDone(): JSX.Element {
  const nextPage = (): void => {
    NavigationService.push('KYC04Step')
  }

  return (
    <Complete
      title={`신분증 진위확인이\n   완료되었습니다`}
      btnText={'다음'}
      onPress={nextPage}
    />
  )
}

IdentityDone.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '',
    headerLeft: (): JSX.Element => <HeaderLeft />,
  })
}
