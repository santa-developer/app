import React from 'react'
import { useRecoilValue } from 'recoil'
import { initKYCInfo } from '@recoil/atoms/KYC/kyc'
import ForeignerResidence from './Foreigner/ForeignerResidence'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import KYCAccount from './Local/KYCAccount'
import HeaderLeft from '../components/KYCHeaderLeft'

export default function KYC04Step(): JSX.Element {
  const { natnCode } = useRecoilValue(initKYCInfo)

  {
    return natnCode === 'KR' ? <KYCAccount /> : <ForeignerResidence />
  }
}

KYC04Step.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '',
    headerLeft: (): JSX.Element => <HeaderLeft />,
  })
}
