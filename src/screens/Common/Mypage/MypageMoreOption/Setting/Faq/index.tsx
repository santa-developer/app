import { CommonHeader } from '@components/Header'
import { StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import FaqScreen from './FaqScreen'

export default function Faq(): React.JSX.Element {
  return <FaqScreen />
}

/**
 * navigation 옵션
 */
Faq.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: 'FAQ',
  })
}
