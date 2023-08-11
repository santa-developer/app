import { CommonHeader } from '@components/Header'
import { StackNavigationOptions } from '@react-navigation/stack'
import $t from 'i18n'
import React from 'react'
import ResetAuthenticationScreen from './ResetAuthenticationScreen'

function ResetAuthentication(): React.JSX.Element {
  return <ResetAuthenticationScreen />
}

export default ResetAuthentication

/**
 * navigation 옵션
 */
ResetAuthentication.navigationOptions =
  (): StackNavigationOptions => {
    return CommonHeader({
      title: $t('WALT.WALT_WORD_02'),
    })
  }
