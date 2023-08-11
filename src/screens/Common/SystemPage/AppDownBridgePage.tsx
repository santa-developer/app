import React from 'react'
import Body from '@components/Body'
import { Image, StyleSheet } from 'react-native'
import { Colors, Images, Layout } from '@constants'
import Text from '@components/Text'
import { View } from 'react-native'

export default function AppDownBrigePage(): JSX.Element {
  const imageWidth = Layout.window.width - 90

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
    },
    image: {
      width: imageWidth,
      height: imageWidth - 30,
      marginBottom: 60,
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    desc: {
      textAlign: 'center',
    },
    descSub: {
      textAlign: 'center',
      marginTop: 12,
    },
  })

  return (
    <Body>
      <View style={styles.wrapper}>
        <Image
          source={Images.gif.mobileSystemUpdate}
          id="appDownBridge"
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text
            bold={'500'}
            size={18}
            color={Colors.bl}
            style={styles.desc}
          >
            {'잠시만요!\n앱이 설치되어 있는지 확인 중입니다.'}
          </Text>
          <Text
            bold={'400'}
            size={14}
            color={Colors.nagative}
            style={styles.descSub}
          >
            {
              '앱이 설치된 경우 자동으로 실행됩니다.\n아직 설치하지 않으셨다면 지금 꼭 설치해 주세요!'
            }
          </Text>
        </View>
      </View>
    </Body>
  )
}
