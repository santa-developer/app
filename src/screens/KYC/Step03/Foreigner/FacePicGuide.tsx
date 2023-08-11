import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import Modal from 'react-native-modal'
import { Colors, Images } from '@constants'
import Text from '@components/Text'
import { KYC_MODAL_TYPE } from '@models/KYC'
import Body from '@components/Body'
import IconCurrDot from '@screens/KYC/components/IconCurrDot'
import GuideHeader from '@screens/KYC/components/GuideHeader'

export default function FacePicGuide({
  isModal,
  setIsModal,
}: KYC_MODAL_TYPE): JSX.Element {
  return (
    <Modal
      isVisible={isModal}
      backdropColor={Colors.wh}
      backdropOpacity={1}
      style={{ margin: 0 }}
    >
      <Body hidePadding scrollable>
        <GuideHeader
          textContent={`얼굴 사진 촬영 가이드`}
          onPress={setIsModal}
        />

        <View style={styles.guideContainer}>
          {/* 1. 신분증(외국인등록증) */}
          <View style={styles.guideTitle}>
            <IconCurrDot order={1} />
            <Text
              size={14}
              bold={'normal'}
              color={Colors.bl}
              style={{ marginLeft: 8 }}
            >{`신분증(외국인등록증)`}</Text>
          </View>

          <View style={styles.guideImgContainer}>
            <View style={styles.guideImgBox}>
              <Image
                source={Images.png.faceGuide1}
                style={{ width: 330, height: 200 }}
              />
            </View>
          </View>

          {/* 2. 운전면허증 */}
          <View style={styles.guideTitle}>
            <IconCurrDot order={2} />
            <Text
              size={14}
              bold={'normal'}
              color={Colors.bl}
              style={{ marginLeft: 8 }}
            >{`운전면허증`}</Text>
          </View>
          <View style={styles.guideImgContainer}>
            <View style={styles.guideImgBox}>
              <Image
                source={Images.png.faceGuide2}
                style={{ width: 330, height: 200 }}
              />
            </View>
          </View>
          {/* 3. 여권 */}
          <View style={styles.guideTitle}>
            <IconCurrDot order={3} />
            <Text
              size={14}
              bold={'normal'}
              color={Colors.bl}
              style={{ marginLeft: 8 }}
            >{`여권`}</Text>
          </View>
          <View style={styles.guideImgContainer}>
            <View style={styles.guideImgBox}>
              <Image
                source={Images.png.faceGuide3}
                style={{ width: 330, height: 200 }}
              />
            </View>
          </View>
        </View>
      </Body>
    </Modal>
  )
}

const styles = StyleSheet.create({
  guideContainer: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
  guideTitle: {
    flexDirection: 'row',
  },
  guideImgBox: {
    width: 330,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 9,
    marginBottom: 20,
  },
  guideImgContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
