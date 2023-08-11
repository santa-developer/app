import memberApi from '@api/member.api'
import Body from '@components/Body'
import Button from '@components/Button'
import { BodyKeyboardDismiss } from '@components/Common/BodyKeyboardDismiss'
import { CommonHeader } from '@components/Header'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import { Colors, Const } from '@constants'
import { useAlert } from '@hooks/useCommonAlert'
import { CtfcType } from '@models/Auth/USER_INFO'
import { StackNavigationOptions } from '@react-navigation/stack'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components/native'

export default function EditEmailScreen(): React.JSX.Element {
  const {
    CERTIFY_CONFIG: { TIMER_SECOND, TEXT_LENGTH },
  } = Const

  //  로그인 유저 정보
  const [loginedUserInfo, setLoginedUserInfo] = useRecoilState(
    loginedUserInfoState
  )
  const { userEmil: loginedUserEmil } = loginedUserInfo

  // 이메일 주소
  const [userEmil, setUserEmil] = useState<string>(
    loginedUserEmil || ''
  )
  const [userEmilCertified, setUserEmilCertified] =
    useState<string>('')

  // 인증번호
  const [ctfcNmbr, setCtfcNmbr] = useState<string>('')
  const [userEmilErrMsg, setUserEmilErrMsg] = useState('')
  const [certifyErrMsg, setCertifyErrMsg] = useState<string>('')
  const [ctfcTimer, setCtfcTimer] = useState(0)
  const [timerInterval, setTimerInterval] = useState<any>()

  // 인증완료 여부
  const [ctfcComplete, setCtfcComplete] = useState<boolean>(false)

  const alert = useAlert()

  // 전송 버튼 텍스트
  const [sendBtnText, setSendBtnText] = useState(
    $t('COMM.COMM_WORD_SEND')
  )

  /**
   * 타이머
   */
  const timer = (): void => {
    const initDate = Math.floor(+new Date() / 300)
    setCtfcTimer(TIMER_SECOND)
    const interval = setInterval(() => {
      setCtfcTimer((val) => {
        const nowDate = Math.floor(+new Date() / 300)
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
    if (userEmil.length > 0) {
      const result =
        await memberApi.member.sendEmailCtfcNmbrProc.update.post({
          params: { userEmil, ctfcType: CtfcType.JOIN },
        })
      if (result.check) {
        clearInterval(timerInterval)
        timer()

        setCtfcNmbr('')
        setCtfcComplete(false)

        setSendBtnText($t('COMM.COMM_WORD_RESEND'))
      } else {
        setUserEmilErrMsg($t(result.messageLocaleCode))
      }
    } else {
      setUserEmilErrMsg($t('USER.USER_STC_13'))
    }
  }

  /**
   * 인증번호 검증
   * @private
   */
  const _handlePressCertifyBtn = async (): Promise<void> => {
    if (ctfcNmbr.length === TEXT_LENGTH) {
      const emailParam = { userEmil, ctfcNmbr }
      const result =
        await memberApi.member.checkEmailCtfcNmbr.update.post({
          params: emailParam,
        })

      if (result.check) {
        clearInterval(timerInterval)
        setCtfcTimer(0)
        setCtfcComplete(true)
        setUserEmilCertified(userEmil)

        alert({
          desc: `이메일 주소가 정상적으로 변경되었습니다.`,
        })

        setLoginedUserInfo({
          ...loginedUserInfo,
          userEmil,
          emailCtfcYn: 'Y',
        })

        NavigationService.goBack()
      } else {
        setCtfcComplete(false)
        setCertifyErrMsg(result.message)
      }
    } else {
      setCertifyErrMsg($t('USER.USER_STC_28', TEXT_LENGTH))
    }
  }

  // 이메일 변경시 재인증
  useEffect(() => {
    if (userEmilCertified !== userEmil) {
      setCtfcComplete(false)
    }
  }, [userEmil])
  return (
    <Body>
      <BodyKeyboardDismiss />
      <InputTitle size={14} color={Colors.nagative}>
        변경할 이메일
      </InputTitle>
      <ConfirmInputBox>
        <InputFlex>
          <TextInput
            value={userEmil}
            placeholder={'변경할 이메일 주소를 입력해주세요.'}
            keyboardType="email-address"
            editable={true}
            onChangeText={setUserEmil}
            errorMessage={userEmilErrMsg}
            onClickClearBtn={(): void => {
              setUserEmil('')
              setUserEmilErrMsg('')
            }}
          />
        </InputFlex>
        <BtnFlex>
          <Button
            text={sendBtnText}
            buttonType={userEmil.length < 1 ? 'enabled' : 'active'}
            onPress={(): void => {
              _handlePressSendMsgBtn()
            }}
          />
        </BtnFlex>
      </ConfirmInputBox>
      <HintText size={12} color={Colors.nagative}>
        아이디 찾기, 비밀번호 재설정시 사용합니다.
        {`\n`}
        정확한 이메일 주소를 입력해주세요.
      </HintText>
      {ctfcTimer > 0 && (
        <ConfirmInputBox style={{ marginTop: 18 }}>
          <InputFlex>
            <TextInput
              placeholder={$t('USER.USER_STC_28', TEXT_LENGTH)}
              value={ctfcNmbr}
              onChangeText={setCtfcNmbr}
              keyboardType="numeric"
              onClickClearBtn={(): void => {
                setCtfcNmbr('')
                setCertifyErrMsg('')
              }}
              secureTextEntry={true}
              errorMessage={certifyErrMsg}
              maxLength={6}
              editable={!ctfcComplete}
            />
            <CtfcTimerWrapper certifyComplete={ctfcComplete}>
              <CtfcTimerText>
                {moment.utc(ctfcTimer * 300).format('m:ss')}
              </CtfcTimerText>
            </CtfcTimerWrapper>
          </InputFlex>
          <BtnFlex>
            <Button
              text={$t('COMM.COMM_WORD_CONFIRM')}
              buttonType={
                ctfcComplete || ctfcNmbr.length < TEXT_LENGTH
                  ? 'enabled'
                  : 'active'
              }
              onPress={(): void => {
                _handlePressCertifyBtn()
              }}
            />
          </BtnFlex>
        </ConfirmInputBox>
      )}
    </Body>
  )
}

const InputTitle = styled(Text)`
  margin-bottom: 8px;
`

const ConfirmInputBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const InputFlex = styled.View`
  flex: 5;
`
const BtnFlex = styled.View`
  margin-left: 5px;
  flex: 1;
`

const HintText = styled(Text)`
  line-height: 16px;
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

EditEmailScreen.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '메일 변경',
  })
}
