import { FlatList, TouchableOpacity, View } from 'react-native'
import React, { ReactElement, useState } from 'react'
import Body from '@components/Body'
import { Colors } from '@constants'
import Text from '@components/Text'
import { StyledFontFamily } from '@components/Text/TextStyles'
import styled from 'styled-components/native'
import Icon from 'react-native-fontawesome-pro'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import NavigationService from '@service/NavigationService'

/**
 * 언스테이킹 할 금액 입력 화면
 */
export default function WalletUnstakingTransfer({
  route,
}: any): JSX.Element {
  const { stakingAmount } = route.params
  const keyPads = [
    {
      keyValue: 1,
    },
    {
      keyValue: 2,
    },
    {
      keyValue: 3,
    },
    {
      keyValue: 4,
    },
    {
      keyValue: 5,
    },
    {
      keyValue: 6,
    },
    {
      keyValue: 7,
    },
    {
      keyValue: 8,
    },
    {
      keyValue: 9,
    },
    {
      keyValue: '',
    },
    {
      keyValue: 0,
    },
    {
      keyValue: (
        <Icon name="arrow-left" size={24} color={Colors.nagative} />
      ),
    },
  ]
  const [sendHIBS, setSendHIBS] = useState('0')

  return (
    <Body
      bottomComponent={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor:
                sendHIBS !== '0' ? Colors.active : Colors.nagative,
              width: 345,
              height: 50,
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={sendHIBS === '0' ? true : false}
            onPress={(): void =>
              NavigationService.navigate('WalletUnstakingConfirm', {
                sendHIBS,
              })
            }
          >
            <Text
              bold="500"
              color={Colors.wh}
              size={16}
              style={{
                lineHeight: 20,
                fontFamily: StyledFontFamily('bold'),
              }}
            >
              언스테이킹
            </Text>
          </TouchableOpacity>
        </View>
      }
    >
      {/* 송금할 금액  */}
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text size={30} bold="500" color={Colors.disabled}>
          {sendHIBS !== '0' ? `${sendHIBS} HIBS` : 'HIBS 입력'}
        </Text>
      </View>

      {/* 보유 HIBS  */}
      <Container>
        <HavingHIBS>
          <Text
            color={Colors.nagative}
            style={{ marginRight: 10 }}
            bold="500"
            size={16}
          >
            보유 HIBS
          </Text>
          <Text bold="500" size={16}>
            {stakingAmount.toLocaleString()} HIBS
          </Text>
        </HavingHIBS>

        {/* 숫자 키패드 */}
        <FlatList
          scrollEnabled={false}
          style={{ width: '100%' }}
          numColumns={3}
          data={keyPads}
          renderItem={(keypad): ReactElement<TouchableOpacity> => (
            <KeyPad
              onPress={(): void => {
                if (keypad.item.keyValue === '') return
                setSendHIBS((prev) => {
                  // 백스페이스 누를 떄
                  if (typeof keypad.item.keyValue !== 'number') {
                    const hibs = prev.replace(/,/g, '').slice(0, -1)

                    return Number(hibs).toLocaleString()
                  }

                  const newHIBS = prev + keypad.item.keyValue
                  const numericHIBS = Number(
                    newHIBS.replace(/,/g, '')
                  )

                  return numericHIBS.toLocaleString()
                })
              }}
            >
              <Text size={18} bold="500">
                {keypad.item.keyValue}
              </Text>
            </KeyPad>
          )}
        />
      </Container>
    </Body>
  )
}

const KeyPad = styled.TouchableOpacity`
  flex: 1;
  height: 63px;
  justify-content: center;
  align-items: center;
`
const HavingHIBS = styled.View`
  background-color: #fafafa;
  width: 305px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-bottom: 24px;
  flex-direction: row;
`
const Container = styled.View`
  align-items: center;
  flex: 1.5;
`

WalletUnstakingTransfer.navigationOptions =
  (): StackNavigationOptions =>
    CommonHeader({
      title: '언스테이킹',
    })
