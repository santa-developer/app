import React from 'react'
import Complete from '../../components/Complete'
import NavigationService from '@service/NavigationService'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'

export default function ForeignerKYCDone(): JSX.Element {
  const nextPage = (): void => {
    NavigationService.push('KYCMain')
  }

  return (
    <Complete
      title={`KYC 인증 신청 완료!`}
      desc={`KYC 인증이 신청되었습니다.\n 인증심사를 거친 후 승인 여부가 결정됩니다.\n \(KYC 인증심사는 영업일 기준 2-3일 소요됩니다.\)`}
      btnText={'확인'}
      onPress={nextPage}
    />
  )
}

ForeignerKYCDone.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: 'KYC 인증 신청 완료',
  })
}
