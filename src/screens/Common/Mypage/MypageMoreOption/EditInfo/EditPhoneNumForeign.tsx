import Body from '@components/Body'
import Button from '@components/Button'
import CheckBox from '@components/CheckBox'
import { BodyKeyboardDismiss } from '@components/Common/BodyKeyboardDismiss'
import { CountrySelect } from '@components/CountrySelect'
import { CommonHeader } from '@components/Header'
import IconAlertCircle from '@components/Images/Icon/IconAlertCircle'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import { Colors, Const } from '@constants'
import { useAlert } from '@hooks/useCommonAlert'
import { StackNavigationOptions } from '@react-navigation/stack'
import $t from 'i18n'
import moment from 'moment'
import React, { useState } from 'react'
import { Platform, View } from 'react-native'
import styled from 'styled-components/native'
import myPage from '@api/mypage.api'
import { useRecoilValue } from 'recoil'
import { selectedCountryState } from '@recoil/atoms/countryCode'

const {
  CERTIFY_CONFIG: { TIMER_SECOND, TEXT_LENGTH },
} = Const

export default function EditPhoneNumForeign(): React.JSX.Element {
  const [clpnNmbr, setClpnNmbr] = useState<string>('')
  const [ctfcNmbr, setCtfcNmbr] = useState<string>('')
  const [ctfcHintMsg, setCfcHintMsg] = useState<string>('')
  const [clpnNmbrErrMsg, setClpnNmbrErrMsg] = useState<string>('')
  const [ctfcErrMsg, setCtfcErrMsg] = useState<string>('')
  const [ctfcComplete, setCtfcComplete] = useState<boolean>(false)
  const [ctfcTimer, setCtfcTimer] = useState(0)
  const [timerInterval, setTimerInterval] = useState<any>()
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const country = useRecoilValue(selectedCountryState) // 국적

  // 전송버튼 텍스트
  const [sendBtnText, setSendBtnText] = useState(
    $t('COMM.COMM_WORD_SEND')
  )

  const alert = useAlert()

  // 체크박스 이벤트
  const handleCheckBox = (): void => {
    setIsChecked((prev) => !prev)
  }

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
    }, 300)
    setTimerInterval(interval)
  }

  /**
   * 인증번호 발송
   * @private
   */
  const _handlePressSendMsgBtn = async (): Promise<void> => {
    if (clpnNmbr.length >= 11) {
      const params = {
        nationIso2: country.natnCode,
        clpnNmbr: clpnNmbr,
      }
      const result = await myPage.updateMemberClpnNmbrProcSend.post(
        params
      )
      if (result.check) {
        clearInterval(timerInterval)
        timer()
        setSendBtnText($t('COMM.COMM_WORD_RESEND'))
      } else {
        setClpnNmbrErrMsg($t(result.messageLocaleCode))
      }
    } else {
      // console.log('전화번호가 잘못')
      // setErrorMessage($t('USER.USER_STC_13'))
    }
  }

  /**
   * 인증번호 검증
   * @private
   */
  const _handlePressCertifyBtn = async (): Promise<void> => {
    const result = await myPage.updateMemberClpnNmbrProcCheck.post({
      clpnNmbr: clpnNmbr,
      ctfcNmbr: ctfcNmbr,
    })
    if (result.check) {
      setCfcHintMsg('인증이 완료되었습니다.')
      setCtfcComplete(true)
      clearInterval(timerInterval)
    } else {
      setCtfcErrMsg('인증번호가 잘못되었습니다.')
    }
  }

  return (
    <Body
      bottomComponent={
        <BottomButtonWrapper isAndroid={Platform.OS === 'android'}>
          <Button
            text={$t('COMM.COMM_WORD_SAVE')}
            onPress={(): void => {
              alert({
                desc: `저장되었습니다.`,
              })
            }}
            buttonType={
              isChecked && ctfcComplete ? 'active' : 'enabled'
            }
          />
        </BottomButtonWrapper>
      }
    >
      <BodyKeyboardDismiss />
      <Text
        size={18}
        color={Colors.nagative}
        style={{ textAlign: 'center' }}
        bold={'600'}
      >
        <Text size={18} bold={'500'}>
          변경할 연락처
        </Text>
        를 입력해주세요.
      </Text>
      <EditInfoText size={14} color={Colors.nagative}>
        {/* 아이디, 비밀번호 찾기 등 본인확인이 필요한{`\n`}경우 사용할
        휴대전화입니다. */}
        {$t('MP.MP_STC_09')}
      </EditInfoText>
      <InputTitle size={14} color={Colors.nagative}>
        {/* 휴대폰 인증 */}
        {$t('WALT.WALT_WORD_13')}
      </InputTitle>
      {/* 핸드폰번호 입력 */}
      <InputWrap>
        <SelectBoxWrap>
          <CountrySelect />
        </SelectBoxWrap>
        <InputBox>
          <TextInput
            placeholder={$t('WALT.WALT_WORD_14')}
            keyboardType="numeric"
            maxLength={15}
            value={clpnNmbr}
            onChangeText={(text: string): void => {
              setClpnNmbr(text)
            }}
            errorMessage={clpnNmbrErrMsg}
          />
        </InputBox>
        <BtnBox>
          <Button
            text={sendBtnText}
            onPress={(): void => {
              _handlePressSendMsgBtn()
            }}
            buttonType={clpnNmbr.length >= 11 ? 'active' : 'enabled'}
          />
        </BtnBox>
      </InputWrap>
      {/* 인증번호 입력 */}
      {ctfcTimer > 0 && (
        <InputWrap style={{ marginTop: 5 }}>
          <CodeInputBox>
            <TextInput
              value={ctfcNmbr}
              placeholder={'인증번호 6자리를 입력해주세요.'}
              keyboardType="numeric"
              onChangeText={(text: string): void => {
                setCtfcNmbr(text)
              }}
              errorMessage={ctfcErrMsg}
              hintMessage={ctfcHintMsg}
              secureTextEntry={true}
            />
            <CtfcTimerWrapper certifyComplete={ctfcComplete}>
              <CtfcTimerText>
                {moment.utc(ctfcTimer * 300).format('m:ss')}
              </CtfcTimerText>
            </CtfcTimerWrapper>
          </CodeInputBox>
          <BtnBox>
            <Button
              text={$t('COMM.COMM_WORD_CONFIRM')}
              onPress={(): void => {
                _handlePressCertifyBtn()
              }}
              buttonType={
                ctfcComplete || ctfcNmbr.length < TEXT_LENGTH
                  ? 'enabled'
                  : 'active'
              }
            />
          </BtnBox>
        </InputWrap>
      )}

      <View>
        <NoticeWrap>
          <TextWrap>
            <IconAlertCircle />
            <Text style={{ marginLeft: 7, marginTop: -2 }}>
              연락처 변경 시 KYC 인증이 초기화 됩니다. {`\n`} 회원님의
              HIBS는 그대로 유지됩니다.
            </Text>
          </TextWrap>
        </NoticeWrap>
        <CheckWrap>
          <CheckBox
            checked={isChecked}
            onPress={handleCheckBox}
            titleStyle={{ fontSize: 14 }}
          />
          <Text color={isChecked ? Colors.bl : Colors.disabled}>
            위 내용을 확인하였습니다.
          </Text>
        </CheckWrap>
      </View>
    </Body>
  )
}

const EditInfoText = styled(Text)`
  text-align: center;
  margin-top: 10px;
  line-height: 20px;
`

const InputTitle = styled(Text)`
  margin-top: 38px;
  margin-bottom: 10px;
`

const InputWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

const SelectBoxWrap = styled.View`
  flex: 1;
`
const InputBox = styled.View`
  flex: 3;
  margin: 0 5px;
`
const CodeInputBox = styled.View`
  flex: 4;
  margin-right: 5px;
`

const BtnBox = styled.View`
  flex: 1;
`

const NoticeWrap = styled.View`
  margin-top: 20px;
  padding: 20px;
  border-width: 1px;
  border-color: ${Colors.bg1};
  background-color: ${Colors.gr};
`

const TextWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`

const CheckWrap = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: center;
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

// bottom button component
const BottomButtonWrapper = styled.View<{ isAndroid: boolean }>`
  flex-direction: row;
  justify-content: center;
  padding: ${(props): string => {
    return props.isAndroid ? '15px' : '0 15px'
  }};
`

EditPhoneNumForeign.navigationOptions =
  (): StackNavigationOptions => {
    return CommonHeader({
      title: $t('MP.MP_WORD_24'),
    })
  }
