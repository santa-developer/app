import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import Button from '@components/Button'
import { CommonHeader } from '@components/Header'
import DefaultHeaderLeft from '@components/Header/CommonHeader/DefaultHeaderLeft'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import { Colors, Const } from '@constants'
import useAuthService from '@hooks/useAuthService'
import { StackNavigationOptions } from '@react-navigation/stack'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import { isLoadingShowState } from '@recoil/atoms/common'
import NavigationService from '@service/NavigationService'
import { VALIDATIONS } from '@utils/ValidationCheck'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useRecoilState } from 'recoil'
import styled from 'styled-components/native'

const {
  CERTIFY_CONFIG: { TEXT_LENGTH, TIMER_SECOND },
} = Const

function StepEmail(): React.JSX.Element {
  // const {
  //   loginedUserInfo: {
  //     socialType,
  //     socialId,
  //     userEmil: loginedUserEmil,
  //   },
  // } = AuthStore
  const [, setIsLoadingShow] = useRecoilState(isLoadingShowState)
  const [loginedUserInfo] = useRecoilState(loginedUserInfoState)

  // 전송버튼 텍스트
  const [sendBtnText, setSendBtnText] = useState(
    // $t('COMM.COMM_WORD_SEND')
    '전송'
  )
  // 이메일
  const [userEmil, setUserEmil] = useState(
    loginedUserInfo?.userEmil || ''
  )
  const [userEmilCertified, setUserEmilCertified] =
    useState<string>('')

  // 인증 완료 여부
  const [userEmilCertifyComplete, setUserEmilCertifyComplete] =
    useState<boolean>(false)
  const [userEmilCertifyCompleteMsg, setUserEmilCertifyCompleteMsg] =
    useState<string>()

  // 인증번호
  const [ctfcNmbr, setCtfcNmbr] = useState<string>('')
  const [ctfcTimer, setCtfcTimer] = useState(0)
  const [timerInterval, setTimerInterval] = useState<any>()

  const [userEmilErrMsg, setUserEmilErrMsg] = useState('')
  const [certifyErrMsg, setCertifyErrMsg] = useState('')

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
    setUserEmilErrMsg('')
    setUserEmilCertifyCompleteMsg('')
    if (VALIDATIONS.email.test(userEmil)) {
      const result = { check: true, message: '실패햇음비나' }
      // await UserService.member.sendEmailCtfcNmbrProc.update.post({
      //   params: { userEmil, ctfcType: CtfcType.JOIN }, // TODO woodonglee : 확인 필요
      // })
      if (result.check) {
        clearInterval(timerInterval)
        timer()

        setCtfcNmbr('')
        setUserEmilCertifyComplete(false)

        // setSendBtnText($t('COMM.COMM_WORD_RESEND'))
        setSendBtnText('재전송')
        setUserEmilErrMsg('')
      } else {
        setUserEmilErrMsg(result.message)
      }
    } else {
      // setUserEmilErrMsg($t('USER.USER_STC_13'))
      setUserEmilErrMsg('잘못된 이메일 형식입니다.')
    }
    // atorm.isLoadingShow = false
  }

  /**
   * 인증번호 검증
   * @private
   */
  const _handlePressCertifyBtn = async (): Promise<void> => {
    // const smsType = _.isEmpty(socialId)
    //   ? SmsType.JOIN
    //   : SmsType.SNS_JOIN

    if (ctfcNmbr.length === TEXT_LENGTH) {
      setIsLoadingShow(true)
      setCertifyErrMsg('')

      // const emailParam = { userEmil, ctfcNmbr }
      // const socialParam = {
      //   socialId,
      //   socialType,
      // }

      const result = {
        check: true,
        response: { joinInfo: '' },
        message: '인증번호가 잘못되었습니다.',
      }
      // await UserService.member.checkEmailCtfcNmbr.update.post({
      //   params: emailParam,
      // })
      if (result.check) {
        clearInterval(timerInterval)
        setUserEmilCertifyComplete(true)
        setUserEmilCertified(userEmil)
        setCertifyErrMsg('')
        setUserEmilCertifyCompleteMsg('인증이 완료되었습니다.')
        Keyboard.dismiss()
      } else {
        setCertifyErrMsg(result.message)
      }
      setIsLoadingShow(false)
    } else {
      // setCertifyErrMsg($t('USER.USER_STC_28', TEXT_LENGTH))
      setCertifyErrMsg('인증번호가 잘못되었습니다.')
    }
  }

  // 이메일 변경시 재인증
  useEffect(() => {
    if (userEmilCertified !== userEmil) {
      setUserEmilCertifyComplete(false)
    }
  }, [userEmil])

  return (
    <Body
      bottomComponent={
        <BottomButtonOne
          text={'다음'}
          // title={$t('COMM.COMM_WORD_NEXT')}
          onPress={(): void => {
            // AuthStore.loginedUserInfo.userEmil = userEmilCertified
            // AuthStore.loginedUserInfo.emailCtfcYn = 'Y'
            // navigateAfterLogin()
          }}
          buttonType={userEmilCertifyComplete ? 'active' : 'enabled'}
        />
      }
    >
      <InputText>메일 인증</InputText>
      <InputWrapper>
        <InputBox>
          <TextInput
            placeholder={`이메일을 입력하세요.`}
            keyboardType="email-address"
            value={userEmil}
            onChangeText={(text: string): void => {
              setUserEmil(_.toLower(text))
            }}
            errorMessage={userEmilErrMsg}
            onClickClearBtn={(): void => {
              setUserEmil('')
              setUserEmilErrMsg('')
            }}
          />
        </InputBox>
        <ButtonBox>
          <SendButton
            text={sendBtnText}
            onPress={(): void => {
              _handlePressSendMsgBtn()
            }}
            buttonType={userEmil.length > 1 ? 'active' : 'enabled'}
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
              onChangeText={setCtfcNmbr}
              keyboardType="numeric"
              maxLength={6}
              errorMessage={certifyErrMsg}
              hintMessage={userEmilCertifyCompleteMsg}
              editable={!userEmilCertifyComplete}
              onClickClearBtn={(): void => {
                setCtfcNmbr('')
                setCertifyErrMsg('')
              }}
            />
            <CtfcTimerWrapper
              certifyComplete={userEmilCertifyComplete}
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
                userEmilCertifyComplete ||
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

export default StepEmail

/**
 * navigation 옵션
 */
StepEmail.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    // title: $t('USER.USER_WORD_35'), // 메일 인증
    title: '메일인증',
    headerLeft: (): JSX.Element =>
      DefaultHeaderLeft({
        onPress: async (): Promise<void> => {
          NavigationService.goBack()
          if (useAuthService().hasLoggedIn()) {
            await useAuthService().logout()
          }
        },
      }),
  })
}

export const InputText = styled(Text)<{ marginTop?: string }>`
  font-size: 14px;
  color: ${Colors.nagative};
  margin-bottom: 10px;
  margin-top: ${(props): string => props.marginTop || '0'}px;
`

export const InputWrapper = styled.View`
  flex-direction: row;
  width: 100%;
`
export const InputBox = styled.View`
  flex: 5;
  margin-right: 5px;
`
export const ButtonBox = styled.View`
  flex: 1;
`
export const SendButton = styled(Button)`
  height: 52px;
`
export const CtfcTimerWrapper = styled.View<{
  certifyComplete: boolean
}>`
  position: absolute;
  right: ${(props): string =>
    !props.certifyComplete ? '45px' : '15px'};
  height: 50px;
  justify-content: center;
`
export const CtfcTimerText = styled(Text)`
  color: ${Colors.error};
`
