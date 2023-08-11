import React from 'react'
import { View } from 'react-native'
import PassAuth from '@components/PASS/PassAuth'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import $t from 'i18n'

export default function EditPhonePass(): JSX.Element {
  return (
    <View>
      <PassAuth urlType={'auth'} kmcUrlCode={'02'} />
    </View>
  )
}

EditPhonePass.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('MP.MP_WORD_24'),
  })
}
