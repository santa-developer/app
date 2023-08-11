import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Body from '@components/Body'
import Text from '@components/Text'
import RadioButton from '@components/RadioButton'
import { Colors } from '@constants'
import IconAlertCircle from '@components/Images/IconAlertCircle'
import NavigationService from '@service/NavigationService'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { initKYCInfo } from '@recoil/atoms/KYC/kyc'
import { isLoadingShowState } from '@recoil/atoms/common'
import { useAlert } from '@hooks/useCommonAlert'
import { kyc } from '@api/kyc.api'
import HeaderLeft from '../components/KYCHeaderLeft'
import $t from 'i18n'
import { CountrySelect } from '@components/CountrySelect'
import { selectedCountryState } from '@recoil/atoms/countryCode'
import { BottomButtonOne } from '@components/BottomButton'

export default function KYCCountry(): JSX.Element {
  const [kycInfo, setKycInfo] = useRecoilState(initKYCInfo)
  const country = useRecoilValue(selectedCountryState) // 국적
  const [isKorea, setIsKorea] = useState(true) //거주국가

  const { natnCode } = country

  const resetCountry = useResetRecoilState(selectedCountryState)
  const setIsLoadingShow = useSetRecoilState(isLoadingShowState)
  const controller = new AbortController()
  const alert = useAlert()

  const handleComplete = async (): Promise<void> => {
    try {
      setIsLoadingShow(true)

      const params = {
        natnCode,
      }

      const result = await kyc.setKYCInfo.post({
        params,
        signal: controller.signal,
      })

      if (result.check) {
        setKycInfo({ ...kycInfo, natnCode })

        if (natnCode !== 'KR' && !isKorea) {
          NavigationService.push('ForeignerInfo')
        } else {
          NavigationService.push('KYCPass')
        }
      } else {
        alert({ desc: result.message })
      }
    } catch (e) {
      let message = 'Unknown Error'
      if (e instanceof Error) message = e.message
      else message = String(e)

      alert({ desc: message })
    } finally {
      setIsLoadingShow(false)
    }
  }

  useEffect(() => {
    resetCountry()
    setIsKorea(true)
  }, [])

  return (
    <Body
      scrollable
      bottomComponent={
        <BottomButtonOne
          buttonType={natnCode ? 'active' : 'enabled'}
          text={$t('USER.USER_STC_103')} // KYC 인증하기
          onPress={handleComplete}
        />
      }
    >
      <View style={styles.countryContainer}>
        <View>
          <Text
            size={natnCode === 'KR' ? 18 : 20}
            bold={'500'}
            color={Colors.bl}
            style={{
              marginTop: 20,
              marginBottom: 14,
              lineHeight: 26,
            }}
          >
            {`회원님의 국적 및 거주국가를\n선택해주세요.`}
          </Text>

          <Text size={14} bold={'normal'} color={Colors.nagative}>
            {/* {`인증하려는 신분증과 국가 정보가 같아야 합니다.`} */}
            {$t('KYC.KYC_STC_25')}
          </Text>

          {/* 국적 */}
          <View style={styles.selectContainer}>
            <Text
              size={14}
              bold={'normal'}
              style={{ marginBottom: 8, color: Colors.nagative }}
            >
              {/* {`국적`} */}
              {$t('KYC.KYC_WORD_39')}
            </Text>

            <CountrySelect />
          </View>

          {/* 거주국가 */}
          <View>
            <Text
              size={14}
              bold={'normal'}
              style={{ marginBottom: 5, color: Colors.nagative }}
            >
              {/* {`거주국가`} */}
              {$t('KYC.KYC_WORD_88')}
            </Text>
            <Text
              size={11}
              bold={'normal'}
              style={{ marginBottom: 30, color: Colors.active }}
            >
              {/* {`* 외국국적이며, 외국인등록증이 없이 대한민국에 거주할 경우 \'그 외\'를\n   선택해주세요`} */}
              {`* ${$t('KYC.KYC_STC_105')}`}
            </Text>

            <View style={styles.radioContainer}>
              <View style={{ marginRight: 97 }}>
                <RadioButton
                  checked={isKorea}
                  onPress={(): void => setIsKorea(true)}
                  desc={$t('NATN.NATN_WORD_KR')} // 대한민국
                />
              </View>
              <RadioButton
                checked={!isKorea}
                onPress={(): void => setIsKorea(false)}
                desc={$t('KYC.KYC_WORD_89')} // 그 외
              />
            </View>
          </View>
        </View>

        <View>
          {/* 필수 준비사항 */}
          {(natnCode === 'KR' || isKorea) && (
            <View style={styles.notice}>
              <View style={styles.noticeTitle}>
                <IconAlertCircle svgColor={Colors.bl} />
                <View style={{ paddingLeft: 5 }}>
                  <Text size={16} bold={'500'} color={Colors.bl}>
                    {/* KYC 인증 시 필수 준비사항 */}
                    {$t('KYC.KYC_WORD_90')}
                  </Text>
                </View>
              </View>

              <View style={styles.noticeTextBox}>
                <Text
                  size={14}
                  bold={'normal'}
                  style={{ color: Colors.nagative }}
                >
                  {/* - 신분증 (신분증 / 운전면허증/ 여권 / 외국인등록증) */}
                  {`- ${$t('KYC.KYC_WORD_91')}`}
                </Text>

                <Text
                  size={14}
                  bold={'normal'}
                  style={{ color: Colors.nagative }}
                >
                  {/* - 송금 받을 계좌 */}
                  {`- ${$t('KYC.KYC_WORD_92')}`}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Body>
  )
}

KYCCountry.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    headerLeft: (): JSX.Element => <HeaderLeft />,
    title: 'KYC 인증',
    gestureEnabled: false,
  })
}

const styles = StyleSheet.create({
  countryContainer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  selectContainer: {
    paddingTop: 36,
    paddingBottom: 39,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 124,
  },
  notice: {
    width: '100%',
    height: 115,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.bg1,
    marginBottom: 40,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  noticeTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  noticeTextBox: {
    marginBottom: 20,
  },
})
