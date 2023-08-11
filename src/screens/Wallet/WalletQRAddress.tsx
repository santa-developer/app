import { Dimensions, View } from 'react-native'
import React from 'react'
import Text from '@components/Text'
import Body from '@components/Body'
import { Colors } from '@constants'
import styled from 'styled-components/native'

/**
 * QR코드 입금주소보기 화면
 */
export default function WalletQRAddress(): JSX.Element {
  const windowWidth = Dimensions.get('window').width
  const marginHorizontalValue = 15
  return (
    <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* QR코드 자리 */}
      <View style={{ flex: 0.28 }}>
        <View
          style={{
            width: 160,
            height: 160,
            backgroundColor: Colors.active,
          }}
        />
      </View>
      <Text
        style={{ width: '80%', textAlign: 'center', flex: 0.15 }}
        size={18}
        bold="500"
      >
        0xyfaslfjwmmdksfjsjdf984652322645asdfhjjalkjfsldfjajsdlfjasdfkl
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 11,
        }}
      >
        <AddressScreenButton
          windowWidth={windowWidth / 2 - marginHorizontalValue}
          color={Colors.active}
        >
          <Text color={Colors.wh} size={16}>
            주소 복사
          </Text>
        </AddressScreenButton>

        <AddressScreenButton
          windowWidth={windowWidth / 2 - marginHorizontalValue}
          color={Colors.nagative}
        >
          <Text color={Colors.wh} size={16}>
            주소 공유하기
          </Text>
        </AddressScreenButton>
      </View>
    </Body>
  )
}

interface IAddressScreenButton {
  windowWidth: number
  color: string
}
const AddressScreenButton = styled.TouchableOpacity<IAddressScreenButton>`
  background-color: ${({ color }): string => color};
  padding: 14px 0px;
  justify-content: center;
  align-items: center;
  width: ${({ windowWidth }): number => windowWidth}px;
  border-radius: 4px;
`
