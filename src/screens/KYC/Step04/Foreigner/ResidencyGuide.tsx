import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Modal from 'react-native-modal'
import { Colors, Images } from '@constants'
import Text from '@components/Text'
import { KYC_MODAL_TYPE } from '@models/KYC'
import IconCurrDot from '@screens/KYC/components/IconCurrDot'
import Body from '@components/Body'
import GuideHeader from '@screens/KYC/components/GuideHeader'

export default function ResidencyGuide({
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
        <Body hidePadding scrollable>
          <GuideHeader
            textContent={`거주지증명서 사진 촬영 가이드`}
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
                  source={Images.png.residenceIdGuide}
                  style={{ width: 210, height: 311 }}
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
    height: 431,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gr,
    marginTop: 9,
  },
  guideImgContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
