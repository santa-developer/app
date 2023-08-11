import React from 'react'
import MailInquiriesScreen from './MailInquiriesScreen'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import $t from 'i18n'

export default function MailInquiries(): React.JSX.Element {
  return <MailInquiriesScreen />
}

/**
 * navigation 옵션
 */
MailInquiries.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('COMM.COMM_WORD_34'),
  })
}
