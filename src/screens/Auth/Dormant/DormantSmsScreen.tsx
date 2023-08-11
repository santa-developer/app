import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import { CountrySelect } from '@components/CountrySelect'
import { CommonHeader } from '@components/Header'
import TextInput from '@components/TextInput'
import { Const } from '@constants'
import { StackNavigationOptions } from '@react-navigation/stack'
import {
  isLoggedInState,
  loginedUserInfoState,
} from '@recoil/atoms/auth'
import $t from 'i18n'
import _ from 'lodash'
import moment from 'moment'
import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styled from 'styled-components/native'
import {
  ButtonBox,
  CtfcTimerText,
  CtfcTimerWrapper,
  InputBox,
  InputText,
  InputWrapper,
  SendButton,
} from '../Login/StepEmailScreen'

const {
  CERTIFY_CONFIG: { TIMER_SECOND, TEXT_LENGTH },
} = Const

/**
 * kyc 인증 완료 회원(외국인) 휴면해제 인증
 * @returns
 */
function DormentSms(): JSX.Element {
  const setIsLogin = useSetRecoilState(isLoggedInState)
  const [userInfo, setUserInfo] = useRecoilState(loginedUserInfoState)
  const { natnCode } = userInfo

  // input 정보
  const [clpnNmbr, setClpnNmbr] = useState<string>('')

  // 인증번호
  const [ctfcNmbr, setCtfcNmbr] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [hintMassage, setHintMessage] = useState<string>('')
  const [ctfcTimer, setCtfcTimer] = useState(0)
  const [timerInterval, setTimerInterval] = useState<any>()

  const [clpnNmbrCertifyComplete, setClpnNmbrCertifyComplete] =
    useState<boolean>(false)

  // 전송버튼 텍스트
  const [sendBtnText, setSendBtnText] = useState(
    // $t('COMM.COMM_WORD_SEND')
    '전송'
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
    setErrorMessage('')
    if (clpnNmbr.length >= 11) {
      // const { selectedCountry } = CountrySelectorStore
      // CommonStore.isLoadingShow = true
      const result = {
        check: true,
        message: '일치하는 정보를 찾을 수 없습니다.',
      }
      // await UserService.member.sendFindPassProc.post({
      //   userId: userInfo.userId,
      //   tempType,
      //   clpnNmbr: userInfo.clpnNmbr,
      //   nationIso2: selectedCountry.natnCode,
      // })
      if (result.check) {
        clearInterval(timerInterval)
        timer()

        setCtfcNmbr('')
        setClpnNmbrCertifyComplete(false)

        // setSendBtnText($t('COMM.COMM_WORD_RESEND'))
        setSendBtnText('재전송')
      } else {
        setErrorMessage(result.message)
      }
    } else {
      // setErrorMessage($t('USER.USER_STC_13'))
      setErrorMessage('전화번호가 잘못되었습니다.')
    }
    // CommonStore.isLoadingShow = false
  }

  /**
   * 인증번호 검증
   * @private
   */
  const _handlePressCertifyBtn = async (): Promise<void> => {
    if (ctfcNmbr.length === TEXT_LENGTH) {
      // const { selectedCountry } = CountrySelectorStore
      // CommonStore.isLoadingShow = true
      const result = { check: true, message: '서버에러' }
      // await UserService.member.confirmFindPass.post({
      //   nationIso2: selectedCountry.natnCode,
      //   clpnNmbr: userInfo.clpnNmbr,
      //   ctfcNmbr: userInfo.ctfcNmbr,
      //   tempType,
      //   userId: userInfo.userId,
      // })
      if (result.check) {
        clearInterval(timerInterval)
        setHintMessage('')
        setClpnNmbrCertifyComplete(true)
        setUserInfo({ ...userInfo, natnCode, clpnNmbr })
      } else {
        setErrorMessage(result.message)
      }
      // CommonStore.isLoadingShow = false
    } else {
      // userInfo.errorMsg.ctfcNmbr = $t('USER.USER_STC_28', TEXT_LENGTH)
      setErrorMessage('인증번호가 잘못되었습니다.')
      // CommonStore.isLoadingShow = false
    }
  }

  return (
    <Body
      bottomComponent={
        <BottomButtonOne
          text={'인증완료'}
          // title={$t('COMM.COMM_WORD_NEXT')}
          onPress={(): void => {
            setIsLogin(true)
            // AuthStore.loginedUserInfo.userEmil = userEmilCertified
            // AuthStore.loginedUserInfo.emailCtfcYn = 'Y'
            // navigateAfterLogin()
          }}
          buttonType={clpnNmbrCertifyComplete ? 'active' : 'enabled'}
        />
      }
    >
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
            placeholder={`휴대푠번호`}
            // placeholder={$t('USER.USER_WORD_01')}
            maxLength={15}
            keyboardType="numeric"
            value={clpnNmbr}
            onChangeText={(text: string): void => {
              setClpnNmbr(_.trim(text))
              setErrorMessage('')
              setHintMessage('')
              setClpnNmbrCertifyComplete(false)
            }}
            onClickClearBtn={(): void => {
              setClpnNmbr('')
              setErrorMessage('')
              setHintMessage('')
              setClpnNmbrCertifyComplete(false)
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
              clpnNmbr.length >= 11 && !_.isEmpty(natnCode)
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
              // placeholder={$t('USER.USER_STC_28', TEXT_LENGTH)}
              placeholder={'인증번호 6자리를 입력해주세요.'}
              value={ctfcNmbr}
              secureTextEntry={true}
              onChangeText={(text: string): void => {
                setCtfcNmbr(_.trim(text))
                setErrorMessage('')
                setHintMessage('')
                setClpnNmbrCertifyComplete(false)
              }}
              keyboardType="numeric"
              maxLength={6}
              errorMessage={errorMessage}
              hintMessage={hintMassage}
              editable={!clpnNmbrCertifyComplete}
              onClickClearBtn={(): void => {
                setCtfcNmbr('')
                setErrorMessage('')
                setHintMessage('')
                setClpnNmbrCertifyComplete(false)
              }}
            />
            <CtfcTimerWrapper
              certifyComplete={clpnNmbrCertifyComplete}
            >
              <CtfcTimerText>
                {moment.utc(ctfcTimer * 1000).format('m:ss')}
              </CtfcTimerText>
            </CtfcTimerWrapper>
          </InputBox>
          <ButtonBox>
            <SendButton
              // text={$t('COMM.COMM_WORD_CONFIRM')}
              text={'확인'}
              onPress={_handlePressCertifyBtn}
              buttonType={
                clpnNmbrCertifyComplete ||
                ctfcNmbr.length < TEXT_LENGTH
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

export default DormentSms

/**
 * navigation 옵션
 */
DormentSms.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '휴면계정해제',
  })
}

export const PhoneInputBox = styled(InputBox)`
  margin-left: 5px;
  flex: 3;
`
