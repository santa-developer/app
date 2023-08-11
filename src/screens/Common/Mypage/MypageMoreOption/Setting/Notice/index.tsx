import { CommonHeader } from '@components/Header'
import { StackNavigationOptions } from '@react-navigation/stack'
import $t from 'i18n'
import React from 'react'
import NoticeScreen from './NoticeScreen'

export default function Notice(): React.JSX.Element {
  return <NoticeScreen />
}

/**
 * navigation 옵션
 */
Notice.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('COMM.COMM_WORD_NOTICE'),
  })
}
