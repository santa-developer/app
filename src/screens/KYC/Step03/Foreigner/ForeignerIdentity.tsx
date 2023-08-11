import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import KYCHeader from '@screens/KYC/components/KYCProgress'
import Text from '@components/Text'
import { Colors } from '@constants'
import IDCardGuide from './IDCardGuide'
import FacePicGuide from './FacePicGuide'
import Body from '@components/Body'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { initKYCInfo } from '@recoil/atoms/KYC/kyc'
import IconClear from '@components/Images/IconClear'
import Hr from '@components/Hr'
import NavigationService from '@service/NavigationService'
import PicGuideBtn from '@screens/KYC/components/PicGuideBtn'
import ImgUploadComp from '@screens/KYC/components/ImgUploadComp'
import _ from 'lodash'
import $t from 'i18n'
import { useAlert } from '@hooks/useCommonAlert'
import { kyc } from '@api/kyc.api'
import { isLoadingShowState } from '@recoil/atoms/common'
import { KYC_AUTH } from '@models/KYC'
import { BottomButtonOne } from '@components/BottomButton'

export default function ForeignerIdentity(): JSX.Element {
  const [IDModal, setIDModal] = useState(false)
  const [faceModal, setFaceModal] = useState(false)

  const [kycInfo, setKycInfo] = useRecoilState(initKYCInfo)

  const setIsLoadingShow = useSetRecoilState(isLoadingShowState)
  const alert = useAlert()
  const controller = new AbortController()

  useEffect(() => {
    setKycInfo({
      ...kycInfo,
      authIdImg: [],
      authFaceImg: [],
      btnUploadFaceImg: [],
      btnUploadIdcardImg: [],
    })
  }, [])

  const handleSaveIDCard = async (): Promise<void> => {
    const { authIdImg, authFaceImg } = kycInfo

    if (_.isEmpty(authIdImg)) {
      // [여권/ID] 필수 입력입니다.
      alert({
        desc: $t('COMM.COMM_WORD_REQUIRED', $t('KYC.KYC_WORD_27')),
      })
    }
    if (_.isEmpty(authFaceImg)) {
      // [얼굴사진] 필수 입력입니다.
      alert({
        desc: $t('COMM.COMM_WORD_REQUIRED', $t('KYC.KYC_WORD_30')),
      })
    }

    const params: KYC_AUTH = {
      files: [...authIdImg, ...authFaceImg],
    }

    setIsLoadingShow(true)

    const result = await kyc.saveAuthRequestForeigner3.post({
      params: params,
      signal: controller.signal,
    })

    if (result.check) {
      NavigationService.push('KYC04Step')
    } else {
      alert({ desc: result.message })
    }

    setIsLoadingShow(false)
  }

  return (
    <>
      <KYCHeader title={`신분증 확인`} step={2} />
      <Hr borderWidth={14} borderColor={Colors.bg1} />
      <Body
        scrollable
        bottomComponent={
          <BottomButtonOne
            text={`다음`}
            buttonType={
              kycInfo.authIdImg[0] && kycInfo.authFaceImg[0]
                ? 'active'
                : 'enabled'
            }
            onPress={handleSaveIDCard}
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
            >{`회원님의 신분증사진을 등록해주세요.`}</Text>

            <Text
              size={14}
              bold={`normal`}
              color={Colors.nagative}
            >{`이전 단계에서 기입한 내용과 신분증에 기재된 정보가\n 다를 경우 KYC 인증이 반려될 수 있습니다.`}</Text>
          </View>

          {/* 여권/ID 사진 업로드 */}
          <View style={styles.uploadContainer}>
            <View style={styles.uploadedTitleBox}>
              <View>
                <Text
                  size={14}
                  bold={`500`}
                  color={Colors.bl}
                  style={{ lineHeight: 20 }}
                >{`여권/ID 사진`}</Text>
                <Text
                  size={12}
                  bold={`normal`}
                  color={Colors.nagative}
                >{`10MB 이하의 이미지 (jpg, png)`}</Text>
              </View>

              <PicGuideBtn setIsModal={setIDModal} />
            </View>

            {kycInfo.authIdImg && kycInfo.authIdImg[0] ? (
              <View style={styles.uploadedBox}>
                <View style={styles.imageBox}>
                  <Image
                    source={{
                      uri: kycInfo.authIdImg[0].uri,
                    }}
                    style={{ width: 186, height: 113 }}
                  />
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={(): void =>
                      setKycInfo({ ...kycInfo, authIdImg: [] })
                    }
                  >
                    <IconClear svgColor={Colors.bl} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <ImgUploadComp
                form={{
                  type: 'IDcard',
                  state: kycInfo,
                  setState: setKycInfo,
                }}
                title={`신분증 사진 업로드`}
                desc={`(* A government issued ID or PASSPORT)`}
              />
            )}
          </View>

          <IDCardGuide isModal={IDModal} setIsModal={setIDModal} />

          {/* 얼굴 사진 업로드 */}
          <View style={styles.uploadContainer}>
            <View style={styles.uploadedTitleBox}>
              <View>
                <Text
                  size={14}
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
              <PicGuideBtn setIsModal={setFaceModal} />
            </View>

            {kycInfo.authFaceImg && kycInfo.authFaceImg[0] ? (
              <View style={styles.uploadedBox}>
                <View style={styles.imageBox}>
                  <Image
                    source={{ uri: kycInfo.authFaceImg[0].uri }}
                    style={styles.imageBox}
                  />
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={(): void =>
                      setKycInfo({ ...kycInfo, authFaceImg: [] })
                    }
                  >
                    <IconClear svgColor={Colors.bl} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <ImgUploadComp
                form={{
                  type: 'Face',
                  state: kycInfo,
                  setState: setKycInfo,
                }}
                title={`얼굴 사진 업로드`}
                desc={` (* A government issued ID or PASSPORT 들고 있는\n본인 사진과 메모에 이름, 날짜를 기입해 함께 찍어주세요.)`}
              />
            )}
          </View>

          <FacePicGuide
            isModal={faceModal}
            setIsModal={setFaceModal}
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
            >{`- 인증 가능한 증명서는 다음과 같습니다:\n   1)주민등록증 2)운전면허증 3)여권`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 10 }}
            >{`- 증명서 사본 또는 캡쳐, 편집본은 인정하지 않습니다.`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 10 }}
            >{`- 19세 미만의 유저는 여권을 사용하여 KYC인증을 진\n   행 할 수 있습니다.`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 8 }}
            >{`- 만료된 증명서 (주민등록증, 운전면허증, 여권)는 인증\n   불가합니다.`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 8 }}
            >{`- 셀프 카메라 촬영 인증은 손글씨로 쓴 메모가\n   필요합니다. 메모에 필요한 내용은 다음과 같습니다:\n   1)이름 2)전화번호 3)사진촬영을 한 날짜`}</Text>
            <Text
              size={14}
              bold={'normal'}
              color={Colors.nagative}
              style={{ lineHeight: 20, marginBottom: 8 }}
            >{`- 신청 전에 촬영된 사진은 인증 불가합니다.`}</Text>
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
            >{`- 증명서의 번호 뒷부분은 가려져야 합니다. 뒷부분을\n   가릴때는 테이프, 흰 종이등을 사용하여 수동적인\n   방법으로 진행해야하고, 디지털 방식의 편집은\n   제한됩니다.`}</Text>
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
        </View>
      </Body>
    </>
  )
}

const styles = StyleSheet.create({
  infoBox: {
    marginTop: 30,
    marginBottom: 20,
  },
  uploadContainer: {
    marginBottom: 30,
  },
  uploadedTitleBox: {
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
    marginBottom: 65,
  },
  uploadedBox: {
    width: '100%',
    height: 133,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gr,
    borderRadius: 4,
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
})
