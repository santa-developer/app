import memberApi from '@api/member.api'
import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import Button from '@components/Button'
import { CommonHeader } from '@components/Header'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import { Const } from '@constants'
import useAuthService from '@hooks/useAuthService'
import { useConfirm } from '@hooks/useCommonAlert'
import { CtfcType } from '@models/Auth/USER_INFO'
import { StackNavigationOptions } from '@react-navigation/stack'
import { SignUpUserInfoState } from '@recoil/atoms/Auth/signUp'
import NavigationService from '@service/NavigationService'
import { VALIDATIONS } from '@utils/ValidationCheck'
import $t from 'i18n'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Keyboard, View } from 'react-native'
import { useRecoilState } from 'recoil'
import styled from 'styled-components/native'
import { InputText } from '../Login/StepEmailScreen'
import AgreementSection from './components/AgreementSection'

const {
  CERTIFY_CONFIG: { TEXT_LENGTH, TIMER_SECOND },
} = Const

/**
 * 이메일 & 약관동의
 * @returns
 */
function StepEmail(): React.JSX.Element {
  const [userInfo, setUserInfo] = useRecoilState(SignUpUserInfoState)

  // 전송버튼 텍스트
  const [sendBtnText, setSendBtnText] = useState(
    $t('COMM.COMM_WORD_SEND')
    // '전송'
  )
  const [ctfcTimer, setCtfcTimer] = useState(0)
  const [timerInterval, setTimerInterval] = useState<any>()

  const [userEmilErrMsg, setUserEmilErrMsg] = useState('')
  const [certifyErrMsg, setCertifyErrMsg] = useState('')
  const [userEmilCertifyCompleteMsg, setUserEmilCertifyCompleteMsg] =
    useState<string>()

  const confirm = useConfirm()

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
    if (VALIDATIONS.email.test(userInfo.userEmil)) {
      const result =
        await memberApi.member.sendEmailCtfcNmbrProc.update.post({
          params: {
            userEmil: userInfo.userEmil,
            ctfcType: CtfcType.JOIN,
          },
        })
      if (result.check) {
        clearInterval(timerInterval)
        timer()
        setUserInfo({
          ...userInfo,
          userEmilCertifyComplete: false,
          ctfcNmbr: '',
        })

        setSendBtnText($t('COMM.COMM_WORD_RESEND'))
        // setSendBtnText('재전송')
        setUserEmilErrMsg('')
      } else {
        setUserEmilErrMsg($t(result.messageLocaleCode))
      }
    } else {
      setUserEmilErrMsg($t('USER.USER_STC_13'))
    }
    // atorm.isLoadingShow = false
  }

  /**
   * 인증번호 검증
   * @private
   */
  const _handlePressCertifyBtn = async (): Promise<void> => {
    const ctfcType = _.isEmpty(userInfo.socialId)
      ? CtfcType.JOIN
      : CtfcType.SNS_JOIN
    if (userInfo.ctfcNmbr.length === TEXT_LENGTH) {
      setCertifyErrMsg('')

      const emailParam = {
        ctfcType,
        userEmil: userInfo.userEmil,
        ctfcNmbr: userInfo.ctfcNmbr,
      }
      const socialParam = {
        socialId: userInfo.socialId,
        socialType: userInfo.socialType,
      }

      const result =
        await memberApi.member.checkEmailCtfcNmbr.signUp.post({
          params: emailParam,
        })
      if (result.check) {
        clearInterval(timerInterval)
        // todo: sns 정보 있을 경우 연동하시겠습니까? 테스트 필요
        if (
          result.response?.joinInfo &&
          result.response?.joinInfo.length > 0
        ) {
          confirm({
            desc: $t(
              'USER.USER_STC_35',
              useAuthService().getSNSName(result.response.joinInfo)
            ),
            onPressConfirm: async (): Promise<void> => {
              const result =
                await memberApi.member.connectSnsByEmail.post({
                  ...emailParam,
                  ...socialParam,
                })
              if (result.check) {
                alert({
                  title: $t('USER.USER_WORD_30'),
                  desc: $t('USER.USER_STC_02'),
                  onPressConfirm: () => {
                    NavigationService.popToTop()
                  },
                })
              }
            },
            onPressCancel: (): void => {
              NavigationService.navigate('Auth')
            },
          })
        }
        setUserInfo({
          ...userInfo,
          userEmilCertifyComplete: true,
          userEmilCertified: userInfo.userEmil,
        })
        setCertifyErrMsg('')
        setUserEmilCertifyCompleteMsg('인증이 완료되었습니다.')
        Keyboard.dismiss()
      } else {
        setCertifyErrMsg(result.message)
      }
    } else {
      setCertifyErrMsg($t('USER.USER_STC_28', TEXT_LENGTH))
      // setCertifyErrMsg('인증번호가 잘못되었습니다.')
    }
  }

  // 이메일 변경시 재인증
  useEffect(() => {
    if (userInfo.userEmilCertified !== userInfo.userEmil) {
      setUserInfo({ ...userInfo, userEmilCertifyComplete: false })
    }
    setCtfcTimer(0)
    setSendBtnText($t('COMM.COMM_WORD_SEND'))
    // setSendBtnText('전송')
  }, [userInfo.userEmil])

  useEffect(() => {
    setUserInfo({ ...userInfo, nowStep: 1 })
  }, [])

  return (
    <Body
      bottomComponent={
        <BottomButtonOne
          text={$t('COMM.COMM_WORD_NEXT')}
          // text={'다음'}
          onPress={(): void => {
            NavigationService.navigate('SignUpStepBirth')
          }}
          buttonType={
            userInfo.userEmilCertifyComplete &&
            userInfo.termsOfUse &&
            userInfo.privacyPolicy &&
            userInfo.personInfo
              ? 'active'
              : 'enabled'
          }
        />
      }
      style={{ justifyContent: 'space-between' }}
    >
      <View>
        <InputText>{$t('USER.USER_WORD_34')}</InputText>
        <InputWrapper>
          <InputBox>
            <TextInput
              placeholder={$t('COMM.COMM_STC_35')}
              keyboardType="email-address"
              value={userInfo.userEmil}
              onChangeText={(text: string): void => {
                setUserInfo({
                  ...userInfo,
                  userEmil: _.toLower(text),
                })
              }}
              errorMessage={userEmilErrMsg}
              onClickClearBtn={(): void => {
                setUserInfo({
                  ...userInfo,
                  userEmil: '',
                })
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
              buttonType={
                userInfo.userEmil.length > 1 ? 'active' : 'enabled'
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
                value={userInfo.ctfcNmbr}
                secureTextEntry={true}
                onChangeText={(text: string): void => {
                  setUserInfo({
                    ...userInfo,
                    ctfcNmbr: text,
                  })
                }}
                keyboardType="numeric"
                maxLength={6}
                errorMessage={certifyErrMsg}
                hintMessage={userEmilCertifyCompleteMsg}
                editable={!userInfo.userEmilCertifyComplete}
                onClickClearBtn={(): void => {
                  setUserInfo({
                    ...userInfo,
                    ctfcNmbr: '',
                  })
                  setCertifyErrMsg('')
                }}
              />
              <CtfcTimerWrapper
                userCertifyComplete={userInfo.userEmilCertifyComplete}
              >
                <Text>
                  {moment.utc(ctfcTimer * 1000).format('m:ss')}
                </Text>
              </CtfcTimerWrapper>
            </InputBox>
            <ButtonBox>
              <SendButton
                text={$t('COMM.COMM_WORD_CONFIRM')}
                // text={'확인'}
                onPress={_handlePressCertifyBtn}
                buttonType={
                  userInfo.userEmilCertifyComplete ||
                  userInfo.ctfcNmbr.length < TEXT_LENGTH
                    ? 'enabled'
                    : 'active'
                }
              />
            </ButtonBox>
          </InputWrapper>
        )}
      </View>

      {/* 약관동의 체크박스 */}
      <AgreementSection />
    </Body>
  )
}

export default StepEmail

/**
 * navigation 옵션
 */
StepEmail.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('USER.USER_WORD_34'), // 메일인증
  })
}

const InputWrapper = styled.View`
  flex-direction: row;
`
const InputBox = styled.View`
  flex: 5;
  margin-right: 5px;
`
const ButtonBox = styled.View`
  flex: 1;
`
const SendButton = styled(Button)`
  height: 52px;
`
const CtfcTimerWrapper = styled.View<{
  userCertifyComplete: boolean
}>`
  position: absolute;
  right: ${(props): string =>
    !props.userCertifyComplete ? '45px' : '15px'};
  height: 50px;
  justify-content: center;
`
