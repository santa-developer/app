import React from 'react'
import DeclareScreen from './DeclareScreen'
import { CommonHeader } from '@components/Header'
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack'
import $t from 'i18n'
import { RootStackParamList } from '@service/NavigationService'

type Props = StackScreenProps<RootStackParamList, 'Declare'>

export default function Declare(props: Props): JSX.Element {
  return <DeclareScreen {...props} />
}
Declare.navigationOptions = ({
  route,
}: Props): StackNavigationOptions => {
  const title = route.params?.title

  return CommonHeader({
    title: title || $t('COMM.COMM_WORD_REPORT'),
  })
}
