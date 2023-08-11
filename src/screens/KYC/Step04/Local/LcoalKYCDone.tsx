import React from 'react'
import Complete from '../../components/Complete'
import NavigationService from '@service/NavigationService'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'

export default function LocalKYCDone(): JSX.Element {
  const nextPage = (): void => {
    NavigationService.popToTop()
    NavigationService.push('HomeMain')
  }

  return (
    <Complete
      title={`KYC 인증완료!`}
      desc={`본인확인이 완료되었습니다.\n 지갑 이용 및 하블 활동을 할 수 있습니다.`}
      btnText={'확인'}
      onPress={nextPage}
    />
  )
}

LocalKYCDone.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: 'KYC 인증 완료',
  })
}
