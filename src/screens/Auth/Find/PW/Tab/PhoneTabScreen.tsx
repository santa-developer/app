import memberApi from '@api/member.api'
import { BodyKeyboardDismiss } from '@components/Common/BodyKeyboardDismiss'
import { CountrySelect } from '@components/CountrySelect'
import TextInput from '@components/TextInput'
import { Const } from '@constants'
import { FindTempType } from '@models/Auth/FIND'
import { idCheckType } from '@models/Auth/USER_INFO'
import { useIsFocused } from '@react-navigation/native'
import { FindUserInfoState } from '@recoil/atoms/Auth/find'
import { selectedCountryState } from '@recoil/atoms/countryCode'
import { PhoneInputBox } from '@screens/Auth/Dormant/DormantSmsScreen'
import {
  ButtonBox,
  CtfcTimerText,
  CtfcTimerWrapper,
  InputBox,
  InputWrapper,
  SendButton,
} from '@screens/Auth/Login/StepEmailScreen'
import $t from 'i18n'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useDebouncedCallback } from 'use-debounce'
import { Wrapper } from '../../ID/Tab/EmailTabScreen'

const {
  CERTIFY_CONFIG: { TIMER_SECOND, TEXT_LENGTH },
} = Const

function PhoneTabScreen(): React.JSX.Element {
  const tempType = FindTempType.Sms
  const isFocused = useIsFocused()

  const [userInfo, setUserInfo] = useRecoilState(FindUserInfoState)
  const selectedCountry = useRecoilValue(selectedCountryState)

  const [ctfcTimer, setCtfcTimer] = useState(0)
  const [timerInterval, setTimerInterval] = useState<any>()

  // 전송버튼 텍스트
  const [sendBtnText, setSendBtnText] = useState(
    $t('COMM.COMM_WORD_SEND')
    // '전송'
  )

  /**
   * 타이머
   */
  const timer = (): void => {
    const initDate = Math.floor(+new Date() / 1000)
    setCtfcTimer(TIMER_SECOND)
    const interval = setInterval(() => {
      setCtfcTimer((val) => {
        const nowDate = Math.floor(+new Date() / 1000)
        const timerCount = nowDate - initDate

        if (val < 1) {
          clearInterval(timerInterval)
          return 0
        } else {
          return TIMER_SECOND - timerCount
        }
      })
    }, 1000)
    setTimerInterval(interval)
  }

  /**
   * 인증번호 발송
   * @private
   */
  const _handlePressSendMsgBtn = async (): Promise<void> => {
    setUserInfo({
      ...userInfo,
      ctfcNmbrErrMsg: '',
      ctfcNmbrHintMsg: '',
    })
    if (userInfo.clpnNmbr.length >= 11) {
      const result = await memberApi.member.sendFindPassProc.post({
        userId: userInfo.userId,
        tempType,
        clpnNmbr: userInfo.clpnNmbr,
        nationIso2: selectedCountry.natnCode,
      })
      if (result.check) {
        clearInterval(timerInterval)
        timer()

        setUserInfo({
          ...userInfo,
          ctfcNmbr: '',
          ctfcNmbrConfirm: false,
        })

        setSendBtnText($t('COMM.COMM_WORD_RESEND'))
        // setSendBtnText('재전송')
      } else {
        setUserInfo({
          ...userInfo,
          clpnNmbrErrMsg: $t(result.messageLocaleCode),
        })
      }
    } else {
      setUserInfo({
        ...userInfo,
        clpnNmbrErrMsg: $t('USER.USER_STC_13'),
        // ctfcNmbrErrMsg: '전화번호가 잘못되었습니다.',
      })
    }
  }

  /**
   * 인증번호 검증
   * @private
   */
  const _handlePressCertifyBtn = async (): Promise<void> => {
    const result = await memberApi.member.confirmFindPass.post({
      nationIso2: selectedCountry.natnCode,
      clpnNmbr: userInfo.clpnNmbr,
      ctfcNmbr: userInfo.ctfcNmbr,
      tempType,
      userId: userInfo.userId,
    })
    if (result.check) {
      clearInterval(timerInterval)
      setUserInfo({
        ...userInfo,
        natnCode: selectedCountry.natnCode,
        ctfcNmbrConfirm: true,
        ctfcNmbrHintMsg: '인증이 완료되었습니다.', // todo: 다국어 처리
      })
    } else {
      setUserInfo({
        ...userInfo,
        ctfcNmbrHintMsg: '',
        ctfcNmbrErrMsg: $t(result.messageLocaleCode),
      })
    }
  }

  const _handleChangeId = (text: string): void => {
    const userId = _.toLower(text)
    setUserInfo({
      ...userInfo,
      userId,
      userIdConfirm: false,
    })
    _debounceUserId()
  }

  const _debounceUserId = useDebouncedCallback(async () => {
    const idResult = await memberApi.member.idck.post({
      userId: userInfo.userId,
      pageType: idCheckType.PW,
    })
    if (idResult.check) {
      setUserInfo({
        ...userInfo,
        userIdErrMsg: '',
        userIdConfirm: true,
      })
    } else {
      setUserInfo({
        ...userInfo,
        userIdErrMsg: $t(idResult.messageLocaleCode),
        userIdConfirm: false,
      })
    }
  }, 500)

  useEffect((): void => {
    if (!isFocused) {
      _debounceUserId.cancel()
    }
  }, [isFocused])

  useEffect((): void => {
    if (!isFocused) {
      setCtfcTimer(0)
      setSendBtnText($t('COMM.COMM_WORD_SEND'))
    }
  }, [isFocused, userInfo.clpnNmbr])

  return (
    <Wrapper>
      <BodyKeyboardDismiss />
      <TextInput
        maxLength={100}
        // placeholder={`아이디를 입력하세요.`}
        placeholder={$t('COMM.COMM_WORD_ID')}
        value={userInfo.userId}
        onChangeText={_handleChangeId}
        errorMessage={userInfo.userIdErrMsg}
        onClickClearBtn={(): void => {
          setUserInfo({
            ...userInfo,
            userId: '',
            userIdErrMsg: '',
            userIdConfirm: false,
          })
        }}
      />
      <InputWrapper style={{ marginTop: 10 }}>
        <ButtonBox>
          <CountrySelect />
        </ButtonBox>
        <PhoneInputBox>
          <TextInput
            // placeholder={`휴대폰번호`}
            placeholder={$t('USER.USER_WORD_01')}
            maxLength={15}
            keyboardType="numeric"
            value={userInfo.clpnNmbr}
            errorMessage={userInfo.clpnNmbrErrMsg}
            onChangeText={(text: string): void => {
              setUserInfo({
                ...userInfo,
                clpnNmbr: _.trim(text),
                clpnNmbrErrMsg: '',
                ctfcNmbrErrMsg: '',
                ctfcNmbrConfirm: false,
              })
            }}
            onClickClearBtn={(): void => {
              setUserInfo({
                ...userInfo,
                clpnNmbr: '',
                clpnNmbrErrMsg: '',
                ctfcNmbrErrMsg: '',
                ctfcNmbrConfirm: false,
              })
            }}
          />
        </PhoneInputBox>
        <ButtonBox>
          <SendButton
            text={sendBtnText}
            onPress={(): void => {
              _handlePressSendMsgBtn()
            }}
            buttonType={
              userInfo.clpnNmbr.length >= 11 &&
              !_.isEmpty(selectedCountry)
                ? 'active'
                : 'enabled'
            }
          />
        </ButtonBox>
      </InputWrapper>
      {ctfcTimer > 0 && (
        <InputWrapper style={{ marginTop: 10 }}>
          <InputBox>
            <TextInput
              // placeholder={'인증번호 6자리를 입력해주세요.'}
              placeholder={$t('USER.USER_STC_28', TEXT_LENGTH)}
              value={userInfo.ctfcNmbr}
              onChangeText={(text: string): void => {
                setUserInfo({
                  ...userInfo,
                  ctfcNmbr: _.trim(text),
                  ctfcNmbrErrMsg: '',
                  ctfcNmbrConfirm: false,
                })
              }}
              keyboardType="numeric"
              maxLength={6}
              errorMessage={userInfo.ctfcNmbrErrMsg}
              hintMessage={userInfo.ctfcNmbrHintMsg}
              editable={!userInfo.ctfcNmbrConfirm}
              onClickClearBtn={(): void => {
                setUserInfo({
                  ...userInfo,
                  ctfcNmbr: '',
                  ctfcNmbrErrMsg: '',
                  ctfcNmbrConfirm: false,
                })
              }}
            />
            <CtfcTimerWrapper
              certifyComplete={userInfo.ctfcNmbrConfirm}
            >
              <CtfcTimerText>
                {moment.utc(ctfcTimer * 1000).format('m:ss')}
              </CtfcTimerText>
            </CtfcTimerWrapper>
          </InputBox>
          <ButtonBox>
            <SendButton
              text={$t('COMM.COMM_WORD_CONFIRM')}
              // text={'확인'}
              onPress={(): void => {
                _handlePressCertifyBtn()
              }}
              buttonType={
                userInfo.ctfcNmbrConfirm ||
                userInfo.ctfcNmbr.length < TEXT_LENGTH
                  ? 'enabled'
                  : 'active'
              }
            />
          </ButtonBox>
        </InputWrapper>
      )}
    </Wrapper>
  )
}

export default PhoneTabScreen
