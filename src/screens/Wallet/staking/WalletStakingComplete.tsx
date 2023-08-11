import { View } from 'react-native'
import React from 'react'
import Body from '@components/Body'
import { Colors } from '@constants'
import Text from '@components/Text'
import WalletButton from '../components/WalletButton'
import Icon from 'react-native-fontawesome-pro'
import IconCheck from '@components/Images/Icon/IconCheck'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import NavigationService from '@service/NavigationService'

/**
 * 스테이킹 완료 화면
 */
export default function WalletStakingComplete(): JSX.Element {
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
      <View style={{ alignItems: 'center', gap: 10, flex: 0.9 }}>
        <IconCheck />
        <Text
          size={20}
          bold="500"
          style={{ width: '60%', textAlign: 'center' }}
        >
          1,000,000 HIBS를 스테이킹 완료하였습니다.
        </Text>
        <Text
          size={14}
          bold="400"
          color={Colors.nagative}
          style={{ width: '50%', textAlign: 'center' }}
        >
          보상 시 등급에 따라 가중치가 부여됩니다. 감사합니다. 🙂
        </Text>
      </View>

      <View
        style={{
          gap: 20,
          backgroundColor: Colors.gr,
          padding: 15,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Icon name="circle-exclamation" size={20} />
          <Text style={{ alignItems: 'flex-start' }} size={16}>
            안내
          </Text>
        </View>
        <Text color={Colors.nagative} bold="400" size={14}>
          별도의 언스테이킹 전까지는 매주 등급이 새로 산정되며, 금액
          및 등급에 대한 혜택은 자동연장 됩니다. :)
        </Text>
        <Text color={Colors.active} bold="400" size={14}>
          * 언스테이킹 시간: (UTC 기준) 월요일 09시 ~ 17시
        </Text>
      </View>
    </Body>
  )
}

WalletStakingComplete.navigationOptions =
  (): StackNavigationOptions =>
    CommonHeader({
      title: '스테이킹완료',
      gestureEnabled: false,
      headerLeft: () => <></>,
    })
