import React from 'react'
import { View } from 'react-native'
import Body from '@components/Body'
import Text from '@components/Text'
import { Colors } from '@constants'
import styled from 'styled-components/native'
import IconMoneyMinus from '@components/Images/Icon/IconMoneyMinus'
import IconMoneyPlus from '@components/Images/Icon/IconMoneyPlus'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'

/**
 * 일반거래 상세화면
 * @returns
 */
export default function WalletTokenDetailRecord({
  route,
}: any): JSX.Element {
  const {
    params: {
      item: {
        userId,
        createdAt,
        transferType,
        address,
        transactionType,
        money,
      },
    },
  } = route

  const setTransferType = (): string =>
    transferType === 'DEPOSIT' ? '입금' : '출금'

  const setTransactionType = (): string => {
    let category = ''
    if (transactionType === 'normal') category = '일반거래'
    if (transactionType === 'staked') category = '스테이킹'
    if (
      transactionType === 'activity' ||
      transactionType === 'hunter'
    )
      category = '보상'

    return category
  }

  const setDetailContent = (): string => {
    let detail = ''
    if (transactionType === 'normal') {
      transferType === 'DEPOSIT'
        ? (detail = '입금')
        : (detail = '출금')
    }
    if (transactionType === 'staked') {
      transferType === 'DEPOSIT'
        ? (detail = '언스테이킹')
        : (detail = '스테이킹 입금')
    }
    if (transactionType === 'activity') detail = '활동 보상'
    if (transactionType === 'hunter') detail = '헌터 보상'

    return detail
  }

  return (
    <Body>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          gap: 5,
        }}
      >
        {money > 0 ? <IconMoneyPlus /> : <IconMoneyMinus />}
        {userId && (
          <Text size={20} bold="500">
            {userId}
          </Text>
        )}
        <Text size={12} color={Colors.nagative}>
          {address}
        </Text>

        <View style={{ paddingTop: 20, alignItems: 'center' }}>
          <Text
            color={money > 0 ? Colors.point : Colors.error}
            size={24}
            bold="700"
          >
            {money > 0
              ? `+ ${money.toLocaleString()}`
              : `- ${money.toLocaleString()}`}{' '}
            HIBS
          </Text>
          {/* 소수점 포함 부분은 추후 변경예정 */}
          <Text size={12} color={Colors.nagative}>
            소수점 포함 100,000.0000000 HIBS
          </Text>
        </View>
      </View>

      <View style={{ flex: 2, justifyContent: 'space-evenly' }}>
        <RecordRow>
          <Category>거래일시</Category>
          <Content>{createdAt}</Content>
        </RecordRow>
        <RecordRow>
          <Category>거래유형</Category>
          <Content>{setTransactionType()}</Content>
        </RecordRow>
        <RecordRow>
          <Category>상세내용</Category>
          <Content>{setDetailContent()}</Content>
        </RecordRow>
        <RecordRow>
          <Category>구분</Category>
          <Content>{setTransferType()}</Content>
        </RecordRow>
        <RecordRow>
          {/* 거래후 잔액 부분은 추후 변경예정 */}
          <Category>거래후 잔액</Category>
          <Content>1,500,000 HIBS</Content>
        </RecordRow>
      </View>
    </Body>
  )
}

WalletTokenDetailRecord.navigationOptions =
  (): StackNavigationOptions =>
    CommonHeader({
      title: '상세내역',
    })

const RecordRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
interface IContentText {
  children: string
}
const Category = ({ children }: IContentText): JSX.Element => {
  return (
    <Text size={14} color={Colors.nagative} bold="400">
      {children}
    </Text>
  )
}

const Content = ({ children }: IContentText): JSX.Element => {
  return (
    <Text size={15} color={Colors.bl} bold="500">
      {children}
    </Text>
  )
}
