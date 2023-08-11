import React from 'react'
import Body from '@components/Body'
import { Image, StyleSheet, View } from 'react-native'
import { Colors, Dev, Images, Layout } from '@constants'
import Text from '@components/Text'
import { BottomButtonOne } from '@components/BottomButton'

export default function Error500Page(): JSX.Element {
  const imageWidth = Layout.window.width - 90

  const handlePress = (): void => {
    Dev.log('뒤로가기 이벤트 추가')
  }

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
    <Body
      bottomComponent={
        <BottomButtonOne
          text="이전페이지"
          buttonType="active"
          onPress={handlePress}
        />
      }
    >
      <View style={styles.wrapper}>
        <Image
          source={Images.gif.manFacingWebsiteError}
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
            {'일시적인 장애로\n서비스가 중단되었습니다.'}
          </Text>
          <Text
            bold={'400'}
            size={14}
            color={Colors.nagative}
            style={styles.descSub}
          >
            {'서비스 이용에 불편을 드려 죄송합니다.'}
          </Text>
        </View>
      </View>
    </Body>
  )
}
