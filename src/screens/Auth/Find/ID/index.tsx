import { CommonHeader } from '@components/Header'
import DefaultHeaderLeft from '@components/Header/CommonHeader/DefaultHeaderLeft'
import { ParamListBase } from '@react-navigation/native'
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import React from 'react'
import FindIDScreen from './FindIDScreen'

function FindID(
  props: StackScreenProps<ParamListBase>
): React.JSX.Element {
  return <FindIDScreen {...props} />
}

export default FindID

/**
 * navigation 옵션
 */
FindID.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('USER.USER_WORD_24'), // 아이디 찾기
    headerLeft: () => (
      <DefaultHeaderLeft
        onPress={(): void => {
          NavigationService.navigate('Auth')
        }}
      />
    ),
  })
}
