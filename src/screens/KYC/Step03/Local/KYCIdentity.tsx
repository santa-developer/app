import React from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Text from '@components/Text'
import Button from '@components/Button'
import { Colors, Images } from '@constants'
import KYCHeader from '@screens/KYC/components/KYCProgress'
import Body from '@components/Body'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { initKYCInfo, initKycOcr } from '@recoil/atoms/KYC/kyc'

export default function KYCIdentity(): JSX.Element {
  const ID_TYPE = [
    { code: 1, name: 'KYC.KYC_WORD_63' }, // 주민등록증
    { code: 2, name: 'KYC.KYC_WORD_36' }, // 운전면허증
    { code: 3, name: 'KYC.KYC_WORD_37' }, // 여권
    { code: 4, name: 'KYC.KYC_WORD_102' }, // 외국인등록증
  ]

  const setKycOcr = useSetRecoilState(initKycOcr)
  const [kycInfo, setKycInfo] = useRecoilState(initKYCInfo)

  const handleBtnClick = (code: number): void => {
    setKycOcr({ ...initKycOcr, ocrType: code })
    setKycInfo({ ...kycInfo, kycLevel: 3 })

    NavigationService.push('KYCIdentityDone')
  }

  return (
    <>
      <KYCHeader title={`신분증 확인`} step={2} />
      <Body scrollable>
        <View style={styles.identityContatiner}>
          <View style={styles.infoContainer}>
            <FastImage
              style={styles.iconImg}
              source={Images.gif.identityCard}
            />
            <Text size={18} bold={'500'} color={Colors.bl}>
              {/* 신분증을 선택하세요. */}
              {$t('KYC.KYC_STC_52')}
            </Text>
            <Text size={14} bold={'normal'} color={Colors.nagative}>
              {/* {`사진이 포함된 신분증으로 본인 확인을 진행합니다.`} */}
              {$t('KYC.KYC_STC_51')}
            </Text>
          </View>

          <View>
            {ID_TYPE.map((item) => (
              <Button
                key={item.code}
                text={$t(item.name)}
                buttonType={'active'}
                buttonStyle={{
                  marginBottom: 10,
                }}
                onPress={(): void => {
                  handleBtnClick(item.code)
                  //   getCameraPermissions().then((result) => {
                  //     if (result) {
                  //       _handleBtnClick(e.code)
                  //     }
                  //   })
                }}
              />
            ))}
          </View>
        </View>
      </Body>
    </>
  )
}

const styles = StyleSheet.create({
  identityContatiner: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  iconImg: {
    width: 252,
    height: 225.92,
    margin: 10,
    alignSelf: 'center',
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 42,
  },
})
