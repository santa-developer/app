import React from 'react'
import Body from '@components/Body'
import { Image, View } from 'react-native'
import { Colors, Images, Layout } from '@constants'
import Text from '@components/Text'
import { StyleSheet } from 'react-native'

export default function SystemCheckPage(): JSX.Element {
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
    inspectionContainer: {
      flexDirection: 'row',
      width: Layout.window.width - 150,
      marginTop: 37,
    },
    inspectionSubContainer: {
      flexDirection: 'row',
      width: Layout.window.width - 150,
      marginTop: 10,
    },
    inspectionTitle: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 22,
    },
    inspectionDesc: {
      marginLeft: 16,
    },
  })

  return (
    <Body>
      <View style={styles.wrapper}>
        <View>
          <Image
            source={Images.gif.websiteUnderConstruction}
            id="appDownBridge"
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            bold={'500'}
            size={18}
            color={Colors.bl}
            style={styles.desc}
          >
            {'시스템 정기점검 중입니다.'}
          </Text>
          <Text
            bold={'400'}
            size={14}
            color={Colors.nagative}
            style={styles.descSub}
          >
            {
              '신속하게 처리하여 빠른 시일 내에\n정상적인 서비스가 되도록 하겠습니다.'
            }
          </Text>

          <View style={styles.inspectionContainer}>
            <Text style={styles.inspectionTitle}>{'점검시간:'}</Text>
            <Text style={styles.inspectionDesc}>
              {'2014/10/15 (수)\n00:00~03:00 (3시간)'}
            </Text>
          </View>
          <View style={styles.inspectionSubContainer}>
            <Text style={styles.inspectionTitle}>{'점검시간:'}</Text>
            <Text style={styles.inspectionDesc}>
              {'성능 업그레이드를 위한 시스템 점검'}
            </Text>
          </View>
        </View>
      </View>
    </Body>
  )
}
