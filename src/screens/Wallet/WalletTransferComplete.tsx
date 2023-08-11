import { View } from 'react-native'
import React from 'react'
import Body from '@components/Body'
import WalletButton from './components/WalletButton'
import Text from '@components/Text'
import { Colors } from '@constants'
import IconMoneyRemittance from '@components/Images/Icon/IconMoneyRemittance'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import NavigationService from '@service/NavigationService'
import { useRecoilValue } from 'recoil'
import { walletSendingHIBS } from '@recoil/atoms/Wallet/wallet'

export default function WalletTransferComplete({
  route,
}: any): JSX.Element {
  const { userId, walletAddress } = route.params
  const sendingHIBS = useRecoilValue(walletSendingHIBS)

  return (
    <Body
      bottomComponent={
        <View style={{ paddingBottom: 10 }}>
          <WalletButton
            text="확인"
            onPress={(): void => NavigationService.navigate('Wallet')}
          />
        </View>
      }
      style={{ gap: 110 }}
    >
      <View
        style={{
          backgroundColor: Colors.gr,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1.5,
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
          flex: 2,
        }}
      >
        <Text
          size={20}
          bold="500"
          style={{ width: '65%', textAlign: 'center' }}
        >
          지갑주소로 {sendingHIBS} HIBS를 송금완료 하였습니다.
        </Text>
      </View>
    </Body>
  )
}

WalletTransferComplete.navigationOptions =
  (): StackNavigationOptions =>
    CommonHeader({
      title: '송금완료',
      gestureEnabled: false,
      headerLeft: () => <></>,
    })
