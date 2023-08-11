import React from 'react'

import Body from '@components/Body'
import { View } from 'react-native'
import NavTab from '@components/NavTab'
import WalletAddress from './WalletAddress'
import WalletRecentPlace from './WalletRecentPlace'
import WalletFollwing from './WalletFollwing'
import {
  HIBSexchange,
  OwnHIBSAmount,
  HIBSMarker,
  SendingHIBSAmount,
} from './components/WalletOwnHIBS'
import WalletButton from './components/WalletButton'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import { useRecoilValue } from 'recoil'
import {
  walletAddressInputValue,
  walletSendingHIBS,
  walletTransferButtonChange,
} from '@recoil/atoms/Wallet/wallet'
import NavigationService from '@service/NavigationService'

/**
 * 지갑 송금 주소 입력 화면 (최근목록/팔로잉/지갑주소 Tabs)
 */
export default function WalletTransferTabs({
  route,
}: any): JSX.Element {
  const transferButtonFlag = useRecoilValue(
    walletTransferButtonChange
  )
  const walletAddress = useRecoilValue(walletAddressInputValue)
  const sendingHIBS = useRecoilValue(walletSendingHIBS)
  const { hips, won, tokenPrice } = route.params

  return (
    <Body
      bottomComponent={
        <View style={{ paddingBottom: 10 }}>
          {transferButtonFlag ? (
            <WalletButton
              text="확인"
              onPress={(): void =>
                NavigationService.navigate('WalletTransferConfirm', {
                  walletAddress,
                  userId: '',
                })
              }
            />
          ) : (
            <WalletButton text="QR 코드스캔 " />
          )}
        </View>
      }
    >
      <View style={{ flex: 0.33 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <HIBSMarker>보유 HIBS</HIBSMarker>
          <OwnHIBSAmount size={16}>{hips}</OwnHIBSAmount>
        </View>
        <View style={{ paddingTop: 17 }}>
          <SendingHIBSAmount>{sendingHIBS}</SendingHIBSAmount>
          <HIBSexchange
            won={tokenPrice}
            wonTohips={won.toLocaleString('en-us', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          />
        </View>
      </View>

      <NavTab
        tabName={['최근목록', '팔로잉', '지갑주소']}
        tabLabel={['최근목록', '팔로잉', '지갑주소']}
        components={[
          WalletRecentPlace,
          WalletFollwing,
          WalletAddress,
        ]}
      />
    </Body>
  )
}

WalletTransferTabs.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '송금',
  })
}
