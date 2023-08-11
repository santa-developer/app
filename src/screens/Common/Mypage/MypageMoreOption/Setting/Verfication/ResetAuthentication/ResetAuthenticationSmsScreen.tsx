import memberApi from '@api/member.api'
import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import { BodyKeyboardDismiss } from '@components/Common/BodyKeyboardDismiss'
import { CountrySelect } from '@components/CountrySelect'
import { CommonHeader } from '@components/Header'
import TextInput from '@components/TextInput'
import { Const } from '@constants'
import { useIsFocused } from '@react-navigation/native'
import { StackNavigationOptions } from '@react-navigation/stack'
import { selectedCountryState } from '@recoil/atoms/countryCode'
import { PhoneInputBox } from '@screens/Auth/Dormant/DormantSmsScreen'
import {
  ButtonBox,
  CtfcTimerText,
  CtfcTimerWrapper,
  InputBox,
  InputText,
  InputWrapper,
  SendButton,
} from '@screens/Auth/Login/StepEmailScreen'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

const {
  CERTIFY_CONFIG: { TIMER_SECOND, TEXT_LENGTH },
} = Const

/**
 * 인증 비밀번호 sms 인증
 */
function ResetAuthenticationSms(): React.JSX.Element {
  const isFocused = useIsFocused()
  const selectedCountry = useRecoilValue(selectedCountryState)

  const [clpnNmbr, setClpnNmbr] = useState('')
  const [clpnNmbrErrMsg, setClpnNmbrErrMsg] = useState('')

  const [ctfcNmbr, setCtfcNmbr] = useState('')
  const [ctfcNmbrErrMsg, setCtfcNmbrErrMsg] = useState('')
  const [ctfcNmbrHintMsg, setCtfcNmbrHintMsg] = useState('')
  const [ctfcNmbrConfirm, setCtfcNmbrConfirm] = useState(false)

  const [ctfcTimer, setCtfcTimer] = useState(0)
  const [timerInterval, setTimerInterval] = useState<any>()

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
    setCtfcNmbrErrMsg('')
    setCtfcNmbrHintMsg('')
    if (clpnNmbr.length >= 11) {
      const param = {
        nationIso2: selectedCountry.natnCode,
        clpnNmbr: clpnNmbr,
      }
      const result = await memberApi.member.sendSmsWalletPin.post(
        param
      )
      if (result.check) {
        clearInterval(timerInterval)
        timer()

        setClpnNmbrErrMsg('')
        setCtfcNmbr('')
        setCtfcNmbrErrMsg('')
        setCtfcNmbrHintMsg('')
        setCtfcNmbrConfirm(false)

        setSendBtnText($t('COMM.COMM_WORD_RESEND')) // 재전송
      } else {
        setClpnNmbrErrMsg($t(result.messageLocaleCode))
      }
    } else {
      setClpnNmbrErrMsg($t('USER.USER_STC_13'))
    }
  }

  /**
   * 인증번호 검증
   * @private
   */
  const _handlePressCertifyBtn = async (): Promise<void> => {
    if (ctfcNmbr.length === TEXT_LENGTH) {
      const result = await memberApi.member.checkSmsWalletPin.post({
        nationIso2: selectedCountry.natnCode,
        clpnNmbr: clpnNmbr,
        ctfcNmbr: ctfcNmbr,
      })
      if (result.check) {
        clearInterval(timerInterval)
        setCtfcNmbrConfirm(true)
        setCtfcNmbrHintMsg('인증이 완료되었습니다.') // todo: 다국어 추가
      } else {
        setCtfcNmbrHintMsg('')
        setCtfcNmbrErrMsg($t(result.messageLocaleCode))
      }
    } else {
      setCtfcNmbrErrMsg($t('USER.USER_STC_28', TEXT_LENGTH))
    }
  }

  useEffect((): void => {
    if (!isFocused) {
      setCtfcTimer(0)
      setSendBtnText($t('COMM.COMM_WORD_SEND'))
    }
  }, [isFocused, clpnNmbr])

  return (
    <Body
      bottomComponent={
        <BottomButtonOne
          text={$t('COMM.COMM_WORD_NEXT')}
          // buttonType={ctfcNmbrConfirm ? 'active' : 'enabled'}
          buttonType="active"
          onPress={(): void =>
            NavigationService.navigate('ResetAuthenticationInput')
          }
        />
      }
    >
      <BodyKeyboardDismiss />
      <InputText>
        {/* 휴대폰 인증 */}
        {$t('WALT.WALT_WORD_13')}
      </InputText>
      <InputWrapper>
        <ButtonBox>
          <CountrySelect />
        </ButtonBox>
        <PhoneInputBox>
          <TextInput
            // placeholder={`휴대폰번호`}
            placeholder={$t('USER.USER_WORD_01')}
            maxLength={15}
            keyboardType="numeric"
            value={clpnNmbr}
            errorMessage={clpnNmbrErrMsg}
            onChangeText={(text: string): void => {
              setClpnNmbr(_.trim(text))
              setClpnNmbrErrMsg('')
              setCtfcNmbrErrMsg('')
              setCtfcNmbrConfirm(false)
            }}
            onClickClearBtn={(): void => {
              setClpnNmbr('')
              setClpnNmbrErrMsg('')
              setCtfcNmbrErrMsg('')
              setCtfcNmbrConfirm(false)
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
              clpnNmbr.length >= 11 && !_.isEmpty(selectedCountry)
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
              placeholder={$t('USER.USER_STC_28', TEXT_LENGTH)}
              // placeholder={'인증번호 6자리를 입력해주세요.'}
              value={ctfcNmbr}
              onChangeText={(text: string): void => {
                setCtfcNmbr(_.trim(text))
                setCtfcNmbrErrMsg('')
                setCtfcNmbrConfirm(false)
              }}
              keyboardType="numeric"
              maxLength={TEXT_LENGTH}
              errorMessage={ctfcNmbrErrMsg}
              hintMessage={ctfcNmbrHintMsg}
              editable={!ctfcNmbrConfirm}
              onClickClearBtn={(): void => {
                setCtfcNmbr('')
                setCtfcNmbrErrMsg('')
                setCtfcNmbrConfirm(false)
              }}
            />
            <CtfcTimerWrapper certifyComplete={ctfcNmbrConfirm}>
              <CtfcTimerText>
                {moment.utc(ctfcTimer * 1000).format('m:ss')}
              </CtfcTimerText>
            </CtfcTimerWrapper>
          </InputBox>
          <ButtonBox>
            <SendButton
              // text={'확인'}
              text={$t('COMM.COMM_WORD_CONFIRM')}
              onPress={_handlePressCertifyBtn}
              buttonType={
                ctfcNmbrConfirm || ctfcNmbr.length < TEXT_LENGTH
                  ? 'enabled'
                  : 'active'
              }
            />
          </ButtonBox>
        </InputWrapper>
      )}
    </Body>
  )
}

export default ResetAuthenticationSms

/**
 * navigation 옵션
 */
ResetAuthenticationSms.navigationOptions =
  (): StackNavigationOptions => {
    return CommonHeader({
      title: $t('USER.USER_WORD_29'),
    })
  }
