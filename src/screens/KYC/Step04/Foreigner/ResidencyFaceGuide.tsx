import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Modal from 'react-native-modal'
import { Colors, Images } from '@constants'
import Text from '@components/Text'
import { KYC_MODAL_TYPE } from '@models/KYC'
import GuideHeader from '@screens/KYC/components/GuideHeader'
import Body from '@components/Body'
import IconCurrDot from '@screens/KYC/components/IconCurrDot'

export default function ResidencyFaceGuide({
  isModal,
  setIsModal,
}: KYC_MODAL_TYPE): JSX.Element {
  return (
    <View>
      <Modal
        isVisible={isModal}
        backdropColor={Colors.wh}
        backdropOpacity={1}
        style={{ margin: 0 }}
      >
        <Body hidePadding>
          <GuideHeader
            textContent={`얼굴 사진 촬영 가이드`}
            onPress={setIsModal}
          />

          <View style={styles.guideContainer}>
            {/* 1. 거주지증명서 */}
            <View style={styles.guideTitle}>
              <IconCurrDot order={1} />
              <Text
                size={14}
                bold={'normal'}
                color={Colors.bl}
                style={{ marginLeft: 8 }}
              >{`거주지증명서`}</Text>
            </View>
            <View style={styles.guideImgContainer}>
              <View style={styles.guideImgBox}>
                <Image
                  source={Images.png.residenceFaceGuide}
                  style={{ width: 335, height: 215 }}
                />
              </View>
            </View>
          </View>
        </Body>
      </Modal>
    </View>
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
    width: 335,
    height: 221.43,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  guideImgContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
