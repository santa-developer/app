import { CommonHeader } from '@components/Header'
import DefaultHeaderLeft from '@components/Header/CommonHeader/DefaultHeaderLeft'
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack'
import NavigationService, {
  RootStackParamList,
} from '@service/NavigationService'
import $t from 'i18n'
import React from 'react'
import FindPWScreen from './FindPWScreen'

function FindPW(
  props: StackScreenProps<RootStackParamList>
): React.JSX.Element {
  return <FindPWScreen {...props} />
}
export default FindPW

/**
 * navigation 옵션
 */
FindPW.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('MP.MP_WORD_15'),
    // title: '비밀번호 재설정',
    headerLeft: () => (
      <DefaultHeaderLeft
        onPress={(): void => NavigationService.navigate('Auth')}
      />
    ),
  })
}
