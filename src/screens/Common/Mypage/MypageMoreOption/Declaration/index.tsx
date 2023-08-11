import React from 'react'
import DeclarationScreen from './DeclarationScreen'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'

export default function Declaration(): JSX.Element {
  return <DeclarationScreen />
}

Declaration.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '사용자 신고',
  })
}
