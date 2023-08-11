import React from 'react'
import { View } from 'react-native'
import PassAuth from '@components/PASS/PassAuth'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import KYCHeader from '@screens/KYC/components/KYCProgress'
import Hr from '@components/Hr'
import { Colors } from '@constants'

export default function KYCPass(): JSX.Element {
  return (
    <View>
      <KYCHeader title={'PASS 인증'} step={1} />
      <Hr borderColor={Colors.bg1} />

      <PassAuth urlType={'kyc'} kmcUrlCode={'01'} />
    </View>
  )
}

KYCPass.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: 'KYC 인증',
  })
}
