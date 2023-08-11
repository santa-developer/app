import { View } from 'react-native'
import React from 'react'
import Body from '@components/Body'
import WalletButton from '../components/WalletButton'
import Text from '@components/Text'
import businessmanPlan from '@images/gif/businessman-doing-budget-planning.gif'
import FastImage from 'react-native-fast-image'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import NavigationService from '@service/NavigationService'
/**
 * 언스테이킹 완료 화면
 */
export default function WalletUnstakingComplete({
  route,
}: any): JSX.Element {
  const { sendHIBS } = route.params

  return (
    <Body
      bottomComponent={
        <View style={{ paddingBottom: 20 }}>
          <WalletButton
            text="확인"
            onPress={(): void => NavigationService.navigate('Wallet')}
          />
        </View>
      }
    >
      <View style={{ alignItems: 'center', gap: 20 }}>
        <FastImage
          source={businessmanPlan}
          style={{ width: 209, height: 240 }}
        />
        <Text
          size={20}
          bold="500"
          style={{ textAlign: 'center', width: '59%' }}
        >
          {sendHIBS.toLocaleString()} HIBS를 언스테이킹
          완료하였습니다.
        </Text>
      </View>
    </Body>
  )
}

WalletUnstakingComplete.navigationOptions =
  (): StackNavigationOptions =>
    CommonHeader({
      title: '언스테이킹 완료',
      headerLeft: () => <></>,
      gestureEnabled: false,
    })
