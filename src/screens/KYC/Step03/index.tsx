import React from 'react'
import { useRecoilValue } from 'recoil'
import { initKYCInfo } from '@recoil/atoms/KYC/kyc'
import KYCIdentity from './Local/KYCIdentity'
import ForeignerIdentity from './Foreigner/ForeignerIdentity'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import HeaderLeft from '../components/KYCHeaderLeft'

export default function KYC03Step(): JSX.Element {
  const { natnCode } = useRecoilValue(initKYCInfo)
  return (
    <>{natnCode === 'KR' ? <KYCIdentity /> : <ForeignerIdentity />}</>
  )
}

KYC03Step.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '',
    headerLeft: (): JSX.Element => <HeaderLeft />,
  })
}
