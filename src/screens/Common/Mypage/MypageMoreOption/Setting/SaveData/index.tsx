import { CommonHeader } from '@components/Header'
import { StackNavigationOptions } from '@react-navigation/stack'
import $t from 'i18n'
import React from 'react'
import SaveDataScreen from './SaveDataScreen'

function SaveData(): React.JSX.Element {
  return <SaveDataScreen />
}
export default SaveData

/**
 * navigation 옵션
 */
SaveData.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    // title: '데이터 절약',
    title: $t('MP.MP_WORD_SAVE_DATA'),
  })
}
