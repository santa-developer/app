import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import Text from '@components/Text'
import KYCHeader from '@screens/KYC/components/KYCProgress'
import TextInput from '@components/TextInput'
import { Colors } from '@constants'
import NavigationService from '@service/NavigationService'
import Hr from '@components/Hr'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import {
  CtfcTimerText,
  CtfcTimerWrapper,
} from '@screens/Auth/Login/StepEmailScreen'
import moment from 'moment'
import Body from '@components/Body'
import { useAlert } from '@hooks/useCommonAlert'
import {
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import {
  KYCBank,
  KYCReload,
  initKYCInfo,
} from '@recoil/atoms/KYC/kyc'
import ImageUtils from '@utils/ImageUtils'
import { isLoadingShowState } from '@recoil/atoms/common'
import { kyc } from '@api/kyc.api'
import { useToast } from '@hooks/useCommonAlert'
import $t from 'i18n'
import { VALIDATIONS } from '@utils/ValidationCheck'
import HeaderLeft from '@screens/KYC/components/KYCHeaderLeft'
import { nFormatter } from '@utils/NumberUtils'
import { BottomButtonOne } from '@components/BottomButton'

export default function CheckAccount(): JSX.Element {
  const [kycInfo, setKycInfo] = useRecoilState(initKYCInfo)

  // 은행정보
  const [bank, setBank] = useRecoilState(KYCBank)

  const {
    bankCode,
    bankName,
    accountNum,
    printContent,
    fileMgmtNmbr,
  } = bank
  const resetBankInfo = useResetRecoilState(KYCBank)

  const alert = useAlert()
  const toast = useToast()
  const controller = new AbortController()
  const setIsLoadingShow = useSetRecoilState(isLoadingShowState)
  const setKYCReload = useSetRecoilState(KYCReload)

  // 타이머 관련 state
  const [ctfcTimer, setCtfcTimer] = useState(-1)
  const [timerInterval, setTimerInterval] = useState<any>()

  // 송금 코드(인증코드) 확인
  const handleCtfcNmbr = async (): Promise<void> => {
    const params = {
      bankCode,
      accountNum,
      printContent,
    }

    try {
      setIsLoadingShow(true)
      const result = await kyc.sendBankVerify.post({
        params,
        signal: controller.signal,
      })

      if (result.check) {
        clearInterval(timerInterval)
        setKYCReload(true)
        toast({ desc: $t('KYC.KYC_STC_97') }) //신분증 및 계좌 인증이 완료되었습니다.

        setKycInfo({ ...kycInfo, kycLevel: 5 })
        NavigationService.push('LocalKYCDone')
      } else {
        // 인증번호 입력안한 경우 or 인증번호 틀린 경우 초기화 하지 않고 toast 실행
        const message = result.messageLocaleCode

        if (message === 'API.API_USEB_FV001') {
          toast({ desc: $t(result.messageLocaleCode) })
        } else if (message === 'API.API_USEB_null') {
          toast({ desc: $t(result.messageLocaleCode) })
        } else {
          // 그 외의 경우 alert 실행
          alert({
            desc: $t(result.messageLocaleCode),
            onPressConfirm: (): void => {
              resetBankInfo()
              setKYCReload(true)
              NavigationService.push('KYC04Step')
            },
          })
        }
      }
    } catch (e) {
    } finally {
      setKYCReload(false)
      setIsLoadingShow(false)
    }
  }

  const prevPage = (): void => {
    resetBankInfo()
    NavigationService.push('KYC04Step')
  }

  /**
   * 타이머
   */
  const timer = (): void => {
    const initDate = Math.floor(+new Date() / 1000)
    setCtfcTimer(300)
    const interval = setInterval(() => {
      setCtfcTimer((val) => {
        const nowDate = Math.floor(+new Date() / 1000)
        const timerCount = nowDate - initDate

        if (val < 1) {
          clearInterval(timerInterval)
          return 0
        } else {
          return 300 - timerCount
        }
      })
    }, 1000)
    setTimerInterval(interval)
  }

  // 타이머 실행
  useEffect(() => {
    if (ctfcTimer === 0) {
      alert({
        desc: $t('KYC.KYC_STC_84'), // 인증시간이 초과되었습니다.\n계좌 인증을 다시 해주세요.
        onPressConfirm: () => {
          setBank({ ...bank, isRemitt: false })
          NavigationService.goBack()
        },
      })
    }
    clearInterval(timerInterval)
    timer()
  }, [ctfcTimer === 0])

  useEffect(() => {
    if (!bankCode || !accountNum) {
      NavigationService.goBack()
    }
  }, [])
  return (
    <>
      <KYCHeader title={'계좌 인증'} step={3} />

      <Hr borderWidth={14} borderColor={Colors.bg1} />

      <Body
        bottomComponent={
          <BottomButtonOne
            text={'확인'}
            buttonType={printContent ? 'active' : 'enabled'}
            onPress={(): void => {
              if (
                printContent &&
                !VALIDATIONS.checkNumText.test(printContent)
              ) {
                alert({
                  desc: $t('KYC.KYC_STC_59', nFormatter(4)), //`입금내역에 표시된 4자리 숫자를 입력해주세요.`
                  onPressConfirm: () => {
                    setBank({ ...bank, printContent: '' })
                  },
                })
                return
              }

              handleCtfcNmbr()
            }}
          />
        }
      >
        <View style={styles.textContainer}>
          <Text size={16} bold={'500'} color={Colors.bl}>
            {/* 1원을 송금했습니다. */}
            {`${$t('KYC.KYC_STC_58')} 🙂`}
          </Text>
          <Text size={14} bold={'normal'} color={Colors.nagative}>
            {/* {`입금내역에 표시된 숫자 4자리를 입력해주세요.`} */}
            {$t('KYC.KYC_STC_59', nFormatter(4))}
          </Text>
        </View>

        {/* 송금한 계좌 정보  */}
        <View style={styles.accountContainer}>
          <View style={styles.bankInfoBox}>
            {/* bank image */}
            <View style={{ width: 51.29, height: 50 }}>
              <Image
                source={ImageUtils.getImageSource({
                  type: 'user',
                  id: fileMgmtNmbr,
                  size: 200,
                })}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </View>
            <View style={{ marginLeft: 14.27 }}>
              <Text
                size={14}
                bold={`normal`}
                color={Colors.bl}
                style={{ lineHeight: 20 }}
              >
                {bankName}
              </Text>
              <Text
                size={14}
                bold={`normal`}
                color={Colors.nagative}
                style={{ lineHeight: 20 }}
              >
                {accountNum}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={prevPage}>
            <Text
              size={14}
              bold={`normal`}
              color={Colors.active}
              style={{ lineHeight: 20 }}
            >
              {/* 변경하기 */}
              {$t('KYC.KYC_WORD_67')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 인증번호 */}
        <View style={styles.verifyContainer}>
          <TextInput
            placeholder={$t('KYC.KYC_WORD_68', nFormatter(4))} // 4자리 숫자 입력
            secureTextEntry={false}
            maxLength={4}
            value={printContent}
            keyboardType={'number-pad'}
            onChangeText={(text): void =>
              setBank({ ...bank, printContent: text })
            }
            editable={bank ? true : false}
            style={{
              paddingVertical: 14,
            }}
          />

          {/* 타이머 */}
          <CtfcTimerWrapper certifyComplete={true}>
            <CtfcTimerText>
              {moment.utc(ctfcTimer * 1000).format('m:ss')}
            </CtfcTimerText>
          </CtfcTimerWrapper>
        </View>
      </Body>
    </>
  )
}

CheckAccount.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '',
    headerLeft: (): JSX.Element => <HeaderLeft />,
  })
}

const styles = StyleSheet.create({
  textContainer: {
    marginVertical: 30,
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifyContainer: {
    height: 48,
  },
})
