import React from 'react'
import Body from '@components/Body'
import Text from '@components/Text'
import { View } from 'react-native'
import fundProtection from '@images/gif/girl-getting-funds-protection.gif'
import WalletButton from '../components/WalletButton'
import FastImage from 'react-native-fast-image'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import NavigationService from '@service/NavigationService'
import { checkPassword } from '../components/password'

/**
 * 스테이킹 확인 화면
 */
export default function WalletStakingConfirm({
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
                data
                  ? NavigationService.navigate('WalletPassword', {
                      from: 'staking',
                    })
                  : NavigationService.navigate(
                      'WalletPasswordSetting'
                    )
              })
            }}
          />
        </View>
      }
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.7,
          gap: 10,
        }}
      >
        <FastImage
          source={fundProtection}
          style={{ height: 237, width: 256 }}
        />
        <Text
          size={20}
          bold="500"
          style={{ width: '53%', textAlign: 'center' }}
        >
          {sendHIBS} HIBS를 스테이킹 하겠습니다.
        </Text>
      </View>
    </Body>
  )
}

WalletStakingConfirm.navigationOptions = (): StackNavigationOptions =>
  CommonHeader({
    title: '스테이킹 확인',
  })
