import React from 'react'
import { View } from 'react-native'
import Body from '@components/Body'
import WalletButton from '../components/WalletButton'
import Text from '@components/Text'
import FastImage from 'react-native-fast-image'
import businessmanPlan from '@images/gif/businessman-doing-budget-planning.gif'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import NavigationService from '@service/NavigationService'
import { checkPassword } from '../components/password'

/**
 * 언스테이킹 확인 화면
 */
export default function WalletUnstakingConfirm({
  route,
}: any): JSX.Element {
  const { sendHIBS } = route.params

  return (
    <Body
      bottomComponent={
        <View style={{ paddingBottom: 20 }}>
          <WalletButton
            text="확인"
            onPress={(): void => {
              checkPassword().then((data) => {
                if (!data) {
                  NavigationService.navigate(
                    'WalletPasswordSetting',
                    { from: 'unstaking', sendHIBS }
                  )
                  return
                }
                NavigationService.navigate('WalletPassword', {
                  from: 'unstaking',
                  sendHIBS,
                })
              })
            }}
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
          {sendHIBS.toLocaleString()} HIBS를 언스테이킹 하겠습니다.
        </Text>
      </View>
    </Body>
  )
}

WalletUnstakingConfirm.navigationOptions =
  (): StackNavigationOptions =>
    CommonHeader({
      title: '언스테이킹 확인',
    })
