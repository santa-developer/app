import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { Images, Layout } from '@constants'
import FastImage from 'react-native-fast-image'
import Text from '@components/Text'
import { Colors } from '@constants'
import ShadowBox from './ShadowBox'
import Icon from 'react-native-fontawesome-pro'
import Body from '@components/Body'
import { useRecoilState, useRecoilValue } from 'recoil'
import { KYCModal, initKYCInfo } from '@recoil/atoms/KYC/kyc'
import { BottomButtonOne } from '@components/BottomButton'
import { kyc } from '@api/kyc.api'
import NavigationService from '@service/NavigationService'
import { useAlert, useConfirm } from '@hooks/useCommonAlert'
import moment from 'moment'
import $t from 'i18n'

export default function KYCPopUp(): React.JSX.Element {
  const [isModal, setIsModal] = useRecoilState(KYCModal)
  const kycInfo = useRecoilValue(initKYCInfo)

  const alert = useAlert()
  const confirm = useConfirm()
  const controller = new AbortController()

  // kycLevel에 따른 단계 진행
  const handleKycStep = async (): Promise<void> => {
    setIsModal(false)

    if (kycInfo.kycLevel === 1)
      return NavigationService.push('KYCMain')

    const diffDate = moment
      .duration(moment().diff(kycInfo.kycModdatetime))
      .days()

    // 14일이 안지난 경우 최근 완료한 단계부터 진행
    if (diffDate <= 14) {
      confirm({
        desc: $t('KYC.KYC_STC_116'), // KYC 인증을 진행한 이력이 있습니다.\n이어서 진행하시겠습니까?
        onPressConfirm: () => {
          if (kycInfo.kycLevel === 2) {
            NavigationService.push('KYC03Step')
          } else if (kycInfo.kycLevel === 3) {
            NavigationService.push('KYC04Step')
          } else if (
            kycInfo.natnCode !== 'KR' &&
            kycInfo.kycLevel === 4
          ) {
            NavigationService.push('KYCMain')
          }
        },
        onPressCancel: async () => {
          // KYC 단계 1단계로 설정 및 데이터 지우기
          const result = await kyc.kycInfoReset.post({
            signal: controller.signal,
          })
          if (result.check) {
            NavigationService.push('KYCMain')
          } else {
            alert({ desc: result.message })
          }
        },
      })
    } else {
      // KYC 단계 1단계로 설정 및 데이터 지우기
      const result = await kyc.kycInfoReset.post({
        signal: controller.signal,
      })
      if (result.check) {
        NavigationService.push('KYCMain')
      } else {
        alert({ desc: result.message })
      }
    }
  }

  return (
    <ReactNativeModal
      isVisible={isModal}
      deviceWidth={Layout.window.width}
      deviceHeight={Layout.window.height}
      backdropColor={Colors.wh}
      backdropOpacity={1}
      style={{ margin: 0 }}
    >
      <Body
        bottomComponent={
          <BottomButtonOne
            text="KYC 인증하기"
            buttonType="active"
            textStyle={{ fontSize: 16 }}
            onPress={handleKycStep}
          />
        }
      >
        <View>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={(): void => setIsModal(false)}
          >
            <Icon
              name={'xmark'}
              size={20}
              type="regular"
              color={Colors.bl}
            />
          </TouchableOpacity>

          <ShadowBox>
            <FastImage
              style={styles.iconImg}
              source={Images.gif.employeeCard}
            />
          </ShadowBox>

          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text
                size={24}
                bold={'bold'}
                color={Colors.bl}
                style={{ textAlign: 'center', marginBottom: 16 }}
              >
                {`KYC 인증 정책 변경안내`}
              </Text>
              <Text
                size={14}
                color={Colors.bl}
                bold={'normal'}
                style={{ marginBottom: 10 }}
              >
                {`* 자금세탁방지(Anti-Money Laundering) 의무를 이행\n   하기 위하여 KYC 인증 방법이 변경되었습니다.`}
              </Text>
              <Text
                size={14}
                color={Colors.bl}
                bold={'normal'}
                style={{ marginBottom: 10 }}
              >
                {`* KYC 인증을 안 할 경우 하블 앱의 일부메뉴(ex.송금)의\n   사용이 제한될 수 있습니다.`}
              </Text>
            </View>

            {/* <View style={styles.transContainer}>
                <View style={{ marginBottom: 15 }}>
                  <Text
                    size={12}
                    bold={'normal'}
                    color={Colors.bl}
                    style={{ marginBottom: 6 }}
                  >
                    Eng
                  </Text>
                  <Text
                    size={12}
                    bold={'normal'}
                    color={'#8b8b8b'}
                    style={{ marginBottom: 10 }}
                  >
                    {`* The method of KYC verification has been changed in\n order to comply with the Anti-Money Laundering\n regulations.`}
                  </Text>
                  <Text size={12} bold={'normal'} color={'#8b8b8b'}>
                    {`* If you do not complete the KYC verification, the use of\n certain features on the Hable app (e.g. money transfers)\n may be restricted.`}
                  </Text>
                </View>

                <View>
                  <Text
                    size={12}
                    bold={'normal'}
                    color={Colors.bl}
                    style={{ marginBottom: 6 }}
                  >
                    ID
                  </Text>
                  <Text
                    size={12}
                    bold={'normal'}
                    color={'#8b8b8b'}
                    style={{ marginBottom: 10 }}
                  >
                    {`* Metode verifikasi KYC telah diubah untuk mematuhi\n peraturan Anti-Money Laundering.`}
                  </Text>
                  <Text size={12} bold={'normal'} color={'#8b8b8b'}>
                    {`* Jika Anda tidak menyelesaikan verifikasi KYC,\n penggunaan fitur-fitur tertentu pada aplikasi Hable\n(misalnya transfer uang) dapat dibatasi.`}
                  </Text>
                </View>
              </View> */}
          </View>
        </View>
      </Body>
    </ReactNativeModal>
  )
}

const styles = StyleSheet.create({
  closeBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 12,
  },
  iconImg: {
    width: 252,
    height: 225.92,
    margin: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.bl,
  },
  contentContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  // transContainer: {
  //   backgroundColor: Colors.gr,
  //   borderWidth: 1,
  //   borderStyle: 'solid',
  //   borderColor: Colors.bg1,
  //   paddingVertical: 20,
  //   paddingHorizontal: 11,
  //   marginBottom: 20,
  // },
})
