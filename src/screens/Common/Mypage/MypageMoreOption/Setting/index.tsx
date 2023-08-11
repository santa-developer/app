import { CommonHeader } from '@components/Header'
import { StackNavigationOptions } from '@react-navigation/stack'
import $t from 'i18n'
import React from 'react'
import MypageSettingScreen from './MypageSettingScreen'

function MypageSetting(): JSX.Element {
  return <MypageSettingScreen />
}

export default MypageSetting

/**
 * navigation 옵션
 */
MypageSetting.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    // title: '설정',
    title: $t('MP.MP_WORD_20'),
  })
}
