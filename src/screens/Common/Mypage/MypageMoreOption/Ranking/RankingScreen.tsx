import React from 'react'
import styled from 'styled-components/native'
import { Colors } from '@constants'
import RankingTab from './RankingTab'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import $t from 'i18n'

export default function RankingScreen(): React.JSX.Element {
  return (
    <RankingWrap>
      <RankingTab />
    </RankingWrap>
  )
}

const RankingWrap = styled.View`
  height: 100%;
  background-color: ${Colors.wh};
`
RankingScreen.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('COMM.COMM_WORD_06'),
  })
}
