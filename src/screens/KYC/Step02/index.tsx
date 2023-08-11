import React from 'react'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import KYCCountry from './KYCCountry'

export default function KYC02Step(): JSX.Element {
  return <KYCCountry />
}

KYC02Step.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '',
  })
}
