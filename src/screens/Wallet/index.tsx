import React from 'react'
import WalletScreen from './WalletScreen'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'

export default function Wallet(): JSX.Element {
  return <WalletScreen />
}
Wallet.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '지갑',
  })
}
