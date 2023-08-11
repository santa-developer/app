import React from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Body from '@components/Body'
import Text from '@components/Text'
import { Colors, Images } from '@constants'
import ShadowBox from '@screens/KYC/components/ShadowBox'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'

export default function Checking(): JSX.Element {
  return (
    <Body>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text
            size={20}
            bold={'500'}
            color={Colors.bl}
          >{`잠시만 기다려주세요`}</Text>
          <Text
            size={14}
            bold={'normal'}
            color={Colors.nagative}
          >{`신분증 정보를 확인중입니다`}</Text>

          <ShadowBox>
            <FastImage
              style={styles.iconImg}
              source={Images.gif.cvAnalysis}
            />
          </ShadowBox>
        </View>
      </View>
    </Body>
  )
}

Checking.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '',
  })
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImg: {
    width: 290,
    height: 303,
    marginTop: 23,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.bl,
  },
})
