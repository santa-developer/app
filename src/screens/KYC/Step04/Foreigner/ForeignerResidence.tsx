import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import KYCHeader from '@screens/KYC/components/KYCProgress'
import Text from '@components/Text'
import CheckBox from '@components/CheckBox'
import { Colors } from '@constants'
import Body from '@components/Body'
import ResidencyGuide from './ResidencyGuide'
import ResidencyFaceGuide from './ResidencyFaceGuide'
import { initKYCInfo } from '@recoil/atoms/KYC/kyc'
import { useRecoilState, useSetRecoilState } from 'recoil'
import IconClear from '@components/Images/IconClear'
import Hr from '@components/Hr'
import NavigationService from '@service/NavigationService'
import PicGuideBtn from '@screens/KYC/components/PicGuideBtn'
import ImgUploadComp from '@screens/KYC/components/ImgUploadComp'
import KYCPersonComp from '@screens/KYC/KYCMain/Terms/PersonTerm'
import IconChevron from '@components/Images/Icon/IconChevron'
import { useAlert } from '@hooks/useCommonAlert'
import _ from 'lodash'
import $t from 'i18n'
import { KYC_AUTH } from '@models/KYC'
import { isLoadingShowState } from '@recoil/atoms/common'
import { kyc } from '@api/kyc.api'
import { BottomButtonOne } from '@components/BottomButton'

export default function ForeignerResidence(): JSX.Element {
  // 가이드 모달 여부
  const [isPORModal, setIsPORModal] = useState(false)
  const [isFaceModal, setIsFaceModal] = useState(false)

  // 개인정보 수집 동의 여부
  const [isChecked, setIsChecked] = useState(false)

  // 업로드 이미지
  const [kycInfo, setKycInfo] = useRecoilState(initKYCInfo)

  const [isModal, setIsModal] = useState(false)

  const setIsLoadingShow = useSetRecoilState(isLoadingShowState)

  const alert = useAlert()
  const controller = new AbortController()

  const handleCheckBox = (): void => {
    setIsChecked((prev) => !prev)
  }

  const handelSaveResidReq = async (): Promise<void> => {
    if (_.isEmpty(kycInfo.btnUploadIdcardImg)) {
      // [거주지증명서 사진] 필수 입력입니다.
      alert({
        desc: $t('COMM.COMM_WORD_REQUIRED', $t('KYC.KYC_WORD_51')),
      })
      return
    }
    if (_.isEmpty(kycInfo.btnUploadFaceImg)) {
      // [얼굴사진] 필수 입력입니다.
      alert({
        desc: $t('COMM.COMM_WORD_REQUIRED', $t('KYC.KYC_WORD_30')),
      })
      return
    }

    const params: KYC_AUTH = {
      files: [
        ...kycInfo.btnUploadIdcardImg,
        ...kycInfo.btnUploadFaceImg,
      ],
    }

    setIsLoadingShow(true)

    const result = await kyc.saveResidenceRequest.post({
      params: params,
      signal: controller.signal,
    })

    if (result.check) {
      // alert({
      //   desc: $t('KYC.KYC_STC_35'), // KYC 인증신청이 완료되었습니다.
      //   onPressConfirm: () => {
      //     setKycReload(true)
      //   },
      // })
      NavigationService.push('ForeignerKYCDone')
    } else {
      alert({ desc: result.message })
    }
    setIsLoadingShow(false)
  }

  return (
    <>
      <KYCHeader title={`거주지 인증`} step={3} />
      <Hr borderWidth={14} borderColor={Colors.bg1} />

      <Body
        scrollable
        bottomComponent={
          <BottomButtonOne
            text={`다음`}
            buttonType={
              kycInfo.btnUploadIdcardImg[0] &&
              kycInfo.btnUploadFaceImg[0] &&
              isChecked
                ? 'active'
                : 'enabled'
            }
            onPress={handelSaveResidReq}
          />
        }
      >
        <View>
          {/* 안내사항 */}
          <View style={styles.infoBox}>
            <Text
              size={16}
              bold={`500`}
              color={Colors.bl}
              style={{ marginBottom: 6 }}
            >{`회원님의 거주지 증명서를 등록해주세요.`}</Text>

            <Text
              size={14}
              bold={`normal`}
              color={Colors.nagative}
            >{`이전 단계에서 기입한 내용과 거주지증명서에 기재된\n정보가 다를 경우 KYC 인증이 반려될 수 있습니다.`}</Text>
          </View>

          {/* 거주지증명서 사진 업로드 */}
          <View style={styles.uploadContainer}>
            <View style={styles.uploadTitleBox}>
              <View>
                <Text
                  size={16}
                  bold={`500`}
                  color={Colors.bl}
                  style={{ lineHeight: 20 }}
                >{`거주지 증명서 사진`}</Text>
                <Text
                  size={12}
                  bold={`normal`}
                  color={Colors.nagative}
                >{`10MB 이하의 이미지 (jpg, png)`}</Text>
              </View>

              <PicGuideBtn setIsModal={setIsPORModal} />
            </View>

            {kycInfo.btnUploadIdcardImg[0] ? (
              <View style={styles.uploadedBox}>
                <View style={styles.imageBox}>
                  <Image
                    source={{
                      uri: kycInfo.btnUploadIdcardImg[0].uri,
                    }}
                    style={{ width: 186, height: 113 }}
                  />
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={(): void =>
                      setKycInfo({
                        ...kycInfo,
                        btnUploadIdcardImg: [],
                      })
                    }
                  >
                    <IconClear svgColor={Colors.bl} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <ImgUploadComp
                form={{
                  type: 'POR',
                  state: kycInfo,
                  setState: setKycInfo,
                }}
                title={`거주지 증명서 사진 업로드`}
                desc={`(* Current official document with your name and address :\n  Utility Bill or Credit Card Statement or Lease agreement\n           or mortgage statement or Property Tax Receipt)`}
              />
            )}
          </View>

          <ResidencyGuide
            isModal={isPORModal}
            setIsModal={setIsPORModal}
          />

          {/* 얼굴 사진 업로드 */}
          <View style={styles.uploadContainer}>
            <View style={styles.uploadTitleBox}>
              <View>
                <Text
                  size={16}
                  bold={`500`}
                  color={Colors.bl}
                  style={{ lineHeight: 20 }}
                >{`얼굴 사진`}</Text>
                <Text
                  size={12}
                  bold={`normal`}
                  color={Colors.nagative}
                >{`10MB 이하의 이미지 (jpg, png)`}</Text>
              </View>

              <PicGuideBtn setIsModal={setIsFaceModal} />
            </View>

            {kycInfo.btnUploadFaceImg[0] ? (
              <View style={styles.uploadedBox}>
                <View style={styles.imageBox}>
                  <Image
                    source={{ uri: kycInfo.btnUploadFaceImg[0]?.uri }}
                    style={{ width: 186, height: 113 }}
                  />
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={(): void =>
                      setKycInfo({ ...kycInfo, btnUploadFaceImg: [] })
                    }
                  >
                    <IconClear svgColor={Colors.bl} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <ImgUploadComp
                form={{
                  type: 'PORFace',
                  state: kycInfo,
                  setState: setKycInfo,
                }}
                title={`얼굴 사진 업로드`}
                desc={`  (* 거주지 증명서를 들고 있는 본인 사진과\n메모에 이름, 날짜를 기입해 함께 찍어주세요.)`}
              />
            )}
          </View>

          <ResidencyFaceGuide
            isModal={isFaceModal}
            setIsModal={setIsFaceModal}
          />
          {/* 사진 업로드 시 유의사항 */}
          <View style={styles.noticeBox}>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.bl}
              style={{ lineHeight: 20, marginBottom: 8 }}
            >{`사진 업로드 시 유의사항`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 10 }}
            >{`- 거주지증명서 캡쳐, 편집본은 인정하지 않습니다.`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 10 }}
            >{`- 셀프 카메라 촬영 인증은 손글씨로 쓴 메모가\n  필요합니다. 메모에 필요한 내용은 다음과 같습니다:\n  1) 이름 2) 전화번호 3) 사진촬영을 한 날짜`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 10 }}
            >{`- 신청 전에 촬영된 사진은 인증 불가합니다.`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 8 }}
            >{`- 메모가 부착되지 않았거나 거주지증명서의 중요번호\n   가 모두 노출된 경우 반려됩니다.`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 8 }}
            >{`- 대한민국 이외 국가의 회원은 거주지증명서로만 KYC\n   인증이 가능합니다.`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 8 }}
            >{`- 충분히 밝은 장소에서 촬영하고, 얼굴이 선명하게\n   보여야 합니다.`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 8 }}
            >{`- 모자, 반다나, 마스크 등의 착용은 제한되고 필터등을\n   통한 편집 행위는 제한됩니다.`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 8 }}
            >{`- 제출이 된후 편집이나 취소가 불가합니다. 신청서를\n   제출하기 전에 확인하는 것을 권장드립니다.`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 8 }}
            >{`- 사진 제출과 관련된 가이드를 참고하세요.`}</Text>
          </View>

          <View style={styles.termsAgree}>
            <CheckBox
              checked={isChecked}
              onPress={handleCheckBox}
              titleStyle={{ fontSize: 14 }}
            />
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={(): void => setIsModal(true)}
            >
              <Text
                size={14}
                bold={'normal'}
                color={isChecked ? Colors.bl : Colors.disabled}
                style={{ lineHeight: 20 }}
              >
                {`개인정보 수집 및 이용동의`}
              </Text>
              <IconChevron
                rotate={`-90`}
                svgColor={isChecked ? Colors.bl : Colors.disabled}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isModal && <KYCPersonComp setIsKYCPerson={setIsModal} />}
      </Body>
    </>
  )
}

const styles = StyleSheet.create({
  infoBox: {
    marginTop: 15,
    marginBottom: 20,
  },
  uploadContainer: {
    marginBottom: 30,
  },
  uploadTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  noticeBox: {
    backgroundColor: Colors.gr,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.bg1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  uploadedBox: {
    width: '100%',
    height: 133,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: Colors.gr,
  },
  iconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  imageBox: {
    width: 186,
    height: 113,
  },
  termsAgree: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 58,
  },
  termsContainer: {
    width: Dimensions.get('window').width - 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
