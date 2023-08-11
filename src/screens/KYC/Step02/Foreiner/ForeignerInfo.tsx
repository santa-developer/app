import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import KYCHeader from '@screens/KYC/components/KYCProgress'
import Text from '@components/Text'
import { Colors } from '@constants'
import { SelectBox } from '@components/SelectBox'
import TextInput from '@components/TextInput'
import Body from '@components/Body'
import moment from 'moment'
import Hr from '@components/Hr'
import NavigationService from '@service/NavigationService'
import {
  CtfcTimerWrapper,
  CtfcTimerText,
} from '@screens/Auth/Login/StepEmailScreen'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import { VALIDATIONS } from '@utils/ValidationCheck'
import { initKYCInfo } from '@recoil/atoms/KYC/kyc'
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { useAlert } from '@hooks/useCommonAlert'
import { KYC_AUTH } from '@models/KYC'
import { isLoadingShowState } from '@recoil/atoms/common'
import { kyc } from '@api/kyc.api'
import $t from 'i18n'
import { SELECT_ITEM } from '@models/KYC'
import _ from 'lodash'
import { CountrySelect } from '@components/CountrySelect'
import { selectedCountryState } from '@recoil/atoms/countryCode'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BottomButtonOne } from '@components/BottomButton'

export default function ForeignerInfo(): JSX.Element {
  // user 정보
  const [kycInfo, setKycInfo] = useRecoilState(initKYCInfo)
  const { gender, clpnNmbr, smsCtfcYn, birthDay } = kycInfo

  // 이름
  const [userName, setUserName] = useState({
    fstName: '',
    lstName: '',
  })

  // 국가코드
  const ctryCode = useRecoilValue(selectedCountryState)

  useEffect(() => {
    setIsSent(false)
    setPhoneNum('')
    setCtfcCode('')
    setKycInfo({ ...kycInfo, clpnNmbr: '', smsCtfcYn: 'N' })
  }, [ctryCode])

  // 휴대폰 인증번호 전송여부 State
  const [isSent, setIsSent] = useState(false)
  const [phoneNum, setPhoneNum] = useState('')
  const [ctfcCode, setCtfcCode] = useState('')

  // 주소지 State
  const [address, setAddress] = useState({
    reciAddress1: '',
    reciAddress2: '',
    reciAddress3: '',
    reciAddress4: '',
  })
  // 생년월일 State
  const birthY = moment(birthDay).format('YYYY')
  const birthM = moment(birthDay).format('MM')
  const birthD = moment(birthDay).format('DD')

  const [birthYear, setBirthYear] = useState<SELECT_ITEM>({
    label: `${birthY} 년`,
    value: `${birthY}`,
  })
  const [birthMonth, setBirthMonth] = useState<SELECT_ITEM>({
    label: `${birthM} 월`,
    value: `${birthM}`,
  })
  const [birthDate, setBirthDate] = useState<SELECT_ITEM>({
    label: `${birthD} 일`,
    value: `${birthD}`,
  })

  //성별
  const genderList = [
    { label: '남자', value: 'M' },
    { label: '여자', value: 'F' },
  ]
  const [genderState, setGenderState] = useState<SELECT_ITEM>()

  const setIsLoadingshow = useSetRecoilState(isLoadingShowState)
  const alert = useAlert()
  const controller = new AbortController()

  const startYears = moment().subtract(100, 'years').format('YYYY') // 시작 년도
  const endYears = moment().subtract(13, 'years').format('YYYY') // 끝 년도, 만 14세 이상

  //타이머
  const [ctfcTimer, setCtfcTimer] = useState(-1)
  const [timerInterval, setTimerInterval] = useState<any>()

  // 타이머 실행
  useEffect(() => {
    if (ctfcTimer === 0) {
      alert({
        desc: $t('KYC.KYC_STC_84'), // 인증시간이 초과되었습니다.\n계좌 인증을 다시 해주세요.
        onPressConfirm: () => {
          setIsSent(false)
        },
      })
    }

    if (isSent) {
      clearInterval(timerInterval)
      timer()
    }
  }, [ctfcTimer === 0])

  // 년도,월,일
  const getList = (
    start: string,
    end: string,
    type: string
  ): SELECT_ITEM[] => {
    const list: SELECT_ITEM[] = []
    let i = Number(start)
    const j = Number(end)

    for (i; i <= j; i++) {
      if (type === 'year') {
        list.push({ label: `${i} 년`, value: `${i}` })
      } else if (type === 'month') {
        list.push({ label: `${i} 월`, value: `${i}` })
      } else if (type === 'day') {
        list.push({ label: `${i} 일`, value: `${i}` })
      }
    }

    return list
  }

  /**
   * 타이머
   */
  const timer = (): void => {
    const initDate = Math.floor(+new Date() / 1000)
    setCtfcTimer(180)
    const interval = setInterval(() => {
      setCtfcTimer((val) => {
        const nowDate = Math.floor(+new Date() / 1000)
        const timerCount = nowDate - initDate

        if (val < 1) {
          clearInterval(timerInterval)
          return 0
        } else {
          return 180 - timerCount
        }
      })
    }, 1000)
    setTimerInterval(interval)
  }

  // 인증번호 전송 이벤트
  const handleSendCtfc = async (): Promise<void> => {
    let cellphone
    const smsCode = ctryCode.smsCode //국가코드

    if (_.isEmpty(smsCode)) {
      alert({
        desc: $t('API.API_STC_15'), // '국가 코드를 입력하세요.',
      })
      return
    }

    // if (_.isEmpty(phoneNum)) {
    //   alert({
    //     desc: $t('KYC.KYC_STC_37'), // '휴대폰 번호를 입력해주세요.',
    //   })
    //   return
    // }

    setKycInfo({ ...kycInfo, smsCode })
    if (phoneNum[0] === '0') {
      cellphone = phoneNum.substring(1, phoneNum.length)
    }

    setIsLoadingshow(true)

    try {
      // clpnNmbr => +8212345678  (+82:국가 코드)(12345678: 전화번호)
      const params = { clpnNmbr: smsCode + cellphone }

      const result = await kyc.sendSmsProc.post({
        params,
        signal: controller.signal,
      })

      if (result.check) {
        setKycInfo({
          ...kycInfo,
          clpnNmbr: smsCode + cellphone,
          smsCtfcYn: 'N',
        })
        clearInterval(timerInterval)
        timer()

        setIsSent(true)
      } else {
        setIsSent(false)
        alert({
          desc: result.message,
        })
      }
    } catch (e) {
      let message = 'Unknown Error'
      if (e instanceof Error) message = e.message
      else message = String(e)

      setIsSent(false)
      alert({ desc: message })
    } finally {
      setIsLoadingshow(false)
    }
  }

  // 인증 번호 확인 이벤트
  const handleCheckCtfc = async (): Promise<void> => {
    if (_.isEmpty(ctfcCode)) {
      alert({
        desc: $t('KYC.KYC_STC_32'), // 인증번호를 입력하세요.
      })
      return
    }

    setIsLoadingshow(true)

    try {
      const params = { clpnNmbr, ctfcNmbr: ctfcCode }

      const result = await kyc.checkSmsProc.post({
        params,
        signal: controller.signal,
      })

      if (result.check) {
        clearInterval(timerInterval)
        setIsSent(false)
        setKycInfo({ ...kycInfo, smsCtfcYn: 'Y', ctfcNmbr: ctfcCode })
      } else {
        alert({ desc: result.message })
      }
    } catch (e) {
      let message = 'Unknown Error'
      if (e instanceof Error) message = e.message
      else message = String(e)

      alert({ desc: message })
    } finally {
      setIsLoadingshow(false)
    }
  }

  const handleSaveAuthReq = async (): Promise<void> => {
    if (birthYear && birthMonth && birthDate) {
      setKycInfo({
        ...kycInfo,
        birthDay:
          birthYear.value + birthMonth.value + birthDate.value,
      })
    }

    if (!userName.fstName || !userName.lstName) {
      alert({
        desc: $t('COMM.COMM_WORD_REQUIRED', $t('KYC.KYC_WORD_16')),
        // desc: `[이름] 필수 입력입니다.`,
      })
      return
    } else {
      if (
        !(
          VALIDATIONS.checkEngText.test(userName.fstName) &&
          VALIDATIONS.checkEngText.test(userName.lstName)
        )
      ) {
        alert({ desc: `영문이름을 작성해주세요.` })
        return
      }
    }

    // if (kycInfo.smsCtfcYn !== 'Y') {
    //   alert({
    //     desc: $t('COMM.COMM_WORD_REQUIRED', $t('KYC.KYC_WORD_50')),
    //     // desc: `[휴대폰 인증] 필수 입력입니다.`,
    //   })
    //   return
    // }
    if (!gender) {
      alert({
        desc: $t('COMM.COMM_WORD_REQUIRED', $t('KYC.KYC_WORD_24')),
        // desc: `[성별] 필수 입력입니다.`,
      })
      return
    }
    if (
      !(
        address.reciAddress1 &&
        address.reciAddress2 &&
        address.reciAddress3
      )
    ) {
      alert({
        desc: $t('COMM.COMM_WORD_REQUIRED', $t('KYC.KYC_WORD_99')),
        // desc: `[자택주소] 필수 입력입니다.`,
      })
      return
    }

    const params: KYC_AUTH = {
      userFstnm: userName.fstName,
      userLstnm: userName.lstName,
      natnCode: ctryCode.natnCode,
      clpnNmbr,
      gender: genderState?.value,
      smsCtfcYn,
      birthDay: birthYear.value + birthMonth.value + birthDate.value,
      reciAddress1: address.reciAddress1,
      reciAddress2: address.reciAddress2,
      reciAddress3: address.reciAddress3,
      reciAddress4: address.reciAddress4,
    }

    setIsLoadingshow(true)

    const result = await kyc.saveAuthRequestForeigner2.post({
      params: params,
      signal: controller.signal,
    })
    if (result.check) {
      setKycInfo({ ...kycInfo, kycLevel: 2, ...address })

      NavigationService.push('KYC03Step')
    } else {
      alert({ desc: result.message })
    }

    setIsLoadingshow(false)
  }

  return (
    <>
      <KYCHeader title={`정보입력하기`} step={1} />

      <Hr borderWidth={14} borderColor={Colors.bg1} />

      <Body
        scrollable
        bottomComponent={
          <BottomButtonOne
            text={$t('COMM.COMM_WORD_NEXT')} //다음
            buttonType={`active`}
            onPress={
              handleSaveAuthReq
              // NavigationService.push('KYC03Step')
            }
          />
        }
      >
        <View style={styles.textLine}>
          <Text size={16} bold={'500'} color={Colors.bl}>
            {/* {`회원님의 신원 정보를 입력해주세요.`} */}
            {$t('KYC.KYC_STC_8')}
          </Text>
          <Text size={14} bold={'normal'} color={Colors.nagative}>
            {/* {`여권에 기재된 정보를 입력하셔야 합니다.`} */}
            {$t('KYC.KYC_STC_9')}
          </Text>
          <Text size={14} bold={'normal'} color={Colors.nagative}>
            {/* {`인증 후 수정은 불가능합니다.`} */}
            {$t('KYC.KYC_STC_117')}
          </Text>
        </View>

        {/* 이름 */}
        <View>
          <Text size={14} bold={'normal'} color={Colors.nagative}>
            {`이름`}
          </Text>

          <View style={styles.InputContainer}>
            {/* 성 입력 */}
            <TextInput
              placeholder={$t('KYC.KYC_WORD_46')} /* 성 */
              value={userName.lstName}
              onChange={(event): void => {
                setUserName({
                  ...userName,
                  lstName: event.nativeEvent.text,
                })
              }}
              containerStyle={{ flex: 1, marginRight: 5 }}
            />

            {/* 이름 입력  */}
            <TextInput
              placeholder={$t('KYC.KYC_WORD_47')} /* 이름 */
              value={userName.fstName}
              onChange={(event): void => {
                setUserName({
                  ...userName,
                  fstName: event.nativeEvent.text,
                })
              }}
              containerStyle={{ flex: 2 }}
            />
          </View>
        </View>

        {/* 휴대폰 인증 */}
        <View>
          {/* 번호입력 */}
          <View style={styles.phoneNumInputBox}>
            <View style={styles.ctryBox}>
              <CountrySelect />
            </View>

            <TextInput
              placeholder={$t('KYC.KYC_WORD_17')} // 휴대폰번호
              keyboardType={'phone-pad'}
              value={phoneNum}
              onChange={(event): void => {
                setPhoneNum(event.nativeEvent.text)
              }}
              containerStyle={{
                flex: 1,
                marginHorizontal: 5,
                height: 48,
              }}
            />
            <TouchableOpacity
              disabled={smsCtfcYn === 'Y'}
              style={[
                styles.sendBtn,
                {
                  backgroundColor:
                    smsCtfcYn !== 'Y'
                      ? Colors.active
                      : Colors.disabled,
                },
              ]}
              onPress={(): void => {
                handleSendCtfc()
              }}
            >
              <Text color={Colors.wh}>
                {!isSent ? `전송` : `재전송`}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 인증번호 입력 */}
          {isSent && (
            <View style={styles.verifyContainer}>
              <View style={styles.verifyBox}>
                <TextInput
                  editable={smsCtfcYn !== 'Y'}
                  maxLength={6}
                  keyboardType={'number-pad'}
                  secureTextEntry={true}
                  containerStyle={{
                    height: 48,
                  }}
                  placeholder={$t('KYC.KYC_WORD_21')} // 인증번호입력
                  onChange={(event): void => {
                    setCtfcCode(event.nativeEvent.text)
                  }}
                />

                {isSent && (
                  <CtfcTimerWrapper certifyComplete={false}>
                    <CtfcTimerText>
                      {moment.utc(ctfcTimer * 1000).format('m:ss')}
                    </CtfcTimerText>
                  </CtfcTimerWrapper>
                )}
              </View>

              <TouchableOpacity
                disabled={smsCtfcYn === 'Y'}
                style={[
                  styles.sendBtn,
                  {
                    backgroundColor:
                      smsCtfcYn !== 'Y'
                        ? Colors.active
                        : Colors.disabled,
                  },
                ]}
                onPress={handleCheckCtfc}
              >
                <Text color={Colors.wh}>확인</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text size={13} color={Colors.nagative}>
            {/* {`본인인증완료된 연락처로 연락처정보가 변경됩니다.`} */}
            {$t('KYC.KYC_STC_5')}
          </Text>
        </View>

        {/* 자택주소 */}
        <View style={styles.addressContainer}>
          <Text
            size={14}
            bold={'normal'}
            color={Colors.nagative}
            style={{ lineHeight: 20, marginBottom: 8 }}
          >
            {/* {`자택주소`} */}
            {$t('KYC.KYC_WORD_99')}
          </Text>
          <View style={styles.addressInputBox}>
            {/* *표시 필수입력칸 */}
            <TextInput
              placeholder={`* Street Address 1`}
              value={address.reciAddress3}
              onChange={(event): void => {
                setAddress({
                  ...address,
                  reciAddress3: event.nativeEvent.text,
                })
              }}
            />
            <TextInput
              placeholder={`Street Address 2`}
              value={address.reciAddress4}
              onChange={(event): void => {
                setAddress({
                  ...address,
                  reciAddress4: event.nativeEvent.text,
                })
              }}
            />
            <TextInput
              placeholder={`* Post town`}
              value={address.reciAddress2}
              onChange={(event): void => {
                setAddress({
                  ...address,
                  reciAddress2: event.nativeEvent.text,
                })
              }}
            />
            <TextInput
              placeholder={`* Post Code`}
              value={address.reciAddress1}
              keyboardType="number-pad"
              onChange={(event): void => {
                setAddress({
                  ...address,
                  reciAddress1: event.nativeEvent.text,
                })
              }}
            />
          </View>
        </View>

        {/* 생년월일 */}
        <View style={styles.birthContainer}>
          <Text
            size={14}
            bold={'normal'}
            color={Colors.nagative}
            style={{ marginBottom: 8 }}
          >
            {/* 생년월일 */}
            {$t('KYC.KYC_WORD_22')}
          </Text>

          <View style={styles.birthBox}>
            <SelectBox
              items={getList(startYears, endYears, 'year')}
              width={'33%'}
              placeholder={`${birthY} 년`}
              placeholderColor={Colors.disabled}
              selectedValue={birthYear}
              onValueChange={(val): void => {
                setBirthYear(val)
              }}
            />
            <SelectBox
              items={getList(`01`, `12`, 'month')}
              width={'33%'}
              placeholder={`${birthM} 월`}
              selectedValue={birthMonth}
              onValueChange={(val): void => setBirthMonth(val)}
            />
            <SelectBox
              items={getList(`01`, `31`, 'day')}
              width={'30%'}
              placeholder={`${birthD} 일`}
              selectedValue={birthDate}
              onValueChange={(val): void => setBirthDate(val)}
            />
          </View>
          <Text
            size={12}
            bold={'normal'}
            color={Colors.nagative}
            style={{ marginTop: 8 }}
          >
            {/* {`생년월일 변경 시 회원가입 시 입력했던 정보도 같이 변경됩니다.`} */}
            {$t('KYC.KYC_STC_11')}
          </Text>
        </View>

        {/* 성별 */}
        <View style={styles.genderContainer}>
          <Text
            size={14}
            bold={'normal'}
            color={Colors.nagative}
            style={{ marginBottom: 8 }}
          >
            {/* {`성별`} */}
            {$t('KYC.KYC_WORD_24')}
          </Text>
          <SelectBox
            placeholder={`성별 선택`}
            items={genderList}
            selectedValue={genderState}
            onValueChange={(val): void => {
              setGenderState(val)
              setKycInfo({ ...kycInfo, gender: val.value })
            }}
          />
        </View>
      </Body>
    </>
  )
}

ForeignerInfo.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '',
  })
}

const styles = StyleSheet.create({
  textLine: {
    flexDirection: 'column',
    marginTop: 15,
    marginBottom: 20,
  },
  InputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 28,
  },
  ctryBox: {
    flex: 0.5,
  },
  phoneNumInputBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendBtn: {
    width: 66,
    height: 48,
    borderRadius: 4,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    marginTop: 25,
  },
  addressInputBox: {
    flexDirection: 'column',
  },
  birthContainer: {
    marginTop: 20,
    marginBottom: 18,
  },
  birthBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderContainer: {
    marginBottom: 43,
  },
  verifyContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verifyBox: {
    flex: 1,
    marginRight: 5,
  },
})
