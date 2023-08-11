import { View } from 'react-native'
import React from 'react'
import Body from '@components/Body'
import Text from '@components/Text'
import WalletButton from './components/WalletButton'
import { Colors } from '@constants'
import IconMoneyRemittance from '@components/Images/Icon/IconMoneyRemittance'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import NavigationService from '@service/NavigationService'
import { useRecoilValue } from 'recoil'
import { walletSendingHIBS } from '@recoil/atoms/Wallet/wallet'

export default function WalletTransferConfirm({
  route,
}: any): JSX.Element {
  const { walletAddress, userId } = route.params
  const sendingHIBS = useRecoilValue(walletSendingHIBS)

  return (
    <Body
      bottomComponent={
        <View style={{ paddingBottom: 10 }}>
          <WalletButton
            text="보내기"
            onPress={(): void =>
              NavigationService.navigate('WalletOTP', {
                walletAddress,
                userId,
              })
            }
          />
        </View>
      }
    >
      <View
        style={{
          backgroundColor: Colors.gr,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 2,
          gap: 5,
        }}
      >
        <IconMoneyRemittance />
        {userId && (
          <Text size={20} bold="500">
            {userId}
          </Text>
        )}
        <Text size={12} color={Colors.nagative}>
          {walletAddress}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          flex: 4,
        }}
      >
        <Text
          size={20}
          bold="500"
          style={{
            paddingTop: 86,
            width: '50%',
            textAlign: 'center',
          }}
        >
          지갑주소로 {sendingHIBS} HIBS를 송금하겠습니다.
        </Text>
      </View>
    </Body>
  )
}

WalletTransferConfirm.navigationOptions =
  (): StackNavigationOptions => {
    return CommonHeader({
      title: '송금확인',
    })
  }
