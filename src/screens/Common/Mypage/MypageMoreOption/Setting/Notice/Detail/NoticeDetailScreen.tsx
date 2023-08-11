import Body from '@components/Body'
import { CommonHeader } from '@components/Header'
import Text from '@components/Text'
import { Colors } from '@constants'
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack'
import $t from 'i18n'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components/native'

type Props = StackScreenProps<{
  NoticeDetail: {
    impYn: string
    nteTitle: string
    nteContents: string
    regdatetime: string
  }
}>

export default function NoticeDetail({
  route,
}: Props): React.JSX.Element {
  const { impYn, nteTitle, nteContents, regdatetime } = route.params
  return (
    <Body scrollable>
      <TitleWrap>
        <TitleTextBox>
          {impYn && impYn === 'Y' && (
            <Text color={Colors.active}>[중요] </Text>
          )}
          <Text style={{ flex: 1 }}>{nteTitle}</Text>
        </TitleTextBox>
        <Text size={12} color={Colors.nagative}>
          {moment.utc(regdatetime).format('YY.MM.DD')}
        </Text>
      </TitleWrap>
      <ContentsBox>
        <Text>{nteContents}</Text>
      </ContentsBox>
    </Body>
  )
}

/**
 * navigation 옵션
 */
NoticeDetail.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('COMM.COMM_WORD_NOTICE'), // 공지사항
  })
}

const TitleWrap = styled.View`
  border-bottom-color: ${Colors.bg1};
  border-bottom-width: 1px;
  padding-vertical: 20px;
`
const TitleTextBox = styled.View`
  flex-direction: row;
`
const ContentsBox = styled.View`
  padding-vertical: 20px;
`
