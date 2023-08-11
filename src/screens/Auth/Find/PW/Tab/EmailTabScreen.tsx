import memberApi from '@api/member.api'
import { BodyKeyboardDismiss } from '@components/Common/BodyKeyboardDismiss'
import TextInput from '@components/TextInput'
import { Const } from '@constants'
import { FindTempType } from '@models/Auth/FIND'
import { idCheckType } from '@models/Auth/USER_INFO'
import { useIsFocused } from '@react-navigation/native'
import { FindUserInfoState } from '@recoil/atoms/Auth/find'
import {
  ButtonBox,
  CtfcTimerText,
  CtfcTimerWrapper,
  InputBox,
  InputWrapper,
  SendButton,
} from '@screens/Auth/Login/StepEmailScreen'
import $t, { getLocale } from 'i18n'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useDebouncedCallback } from 'use-debounce'
import { Wrapper } from '../../ID/Tab/EmailTabScreen'

const {
  CERTIFY_CONFIG: { TEXT_LENGTH, TIMER_SECOND },
} = Const

function EmailTabScreen(): React.JSX.Element {
  const tempType = FindTempType.Email
  const isFocused = useIsFocused()

  const [userInfo, setUserInfo] = useRecoilState(FindUserInfoState)

  const [sendBtnText, setSendBtnText] = useState(
    $t('COMM.COMM_WORD_SEND')
    // '전송'
  )

  const [ctfcTimer, setCtfcTimer] = useState(0)
  const [timerInterval, setTimerInterval] = useState<any>()

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

  const _handleChangeEmil = (input: string): void => {
    const text = _.trim(input).toLowerCase()
    setUserInfo({
      ...userInfo,
      userEmil: text,
      userEmilConfirm: false,
      ctfcNmbrErrMsg: '',
      ctfcNmbrHintMsg: '',
    })
    _debounceUserEmil(text)
  }

  /**
   * 아이디 검증
   * @private
   */
  const _debounceUserEmil = useDebouncedCallback(
    async (userEmil: string) => {
      const result = await memberApi.member.searchIdEmilProc.post({
        userEmil,
      })
      if (result.check) {
        setUserInfo({
          ...userInfo,
          userEmilConfirm: true,
          userEmilErrMsg: '',
          mebrFileMgmtNmbr: result.response.mebrFileMgmtNmbr,
        })
      } else {
        setUserInfo({
          ...userInfo,
          userEmilConfirm: false,
          userEmilErrMsg: $t(result.messageLocaleCode),
        })
      }
    },
    500
  )

  /**
   * 인증번호 발송
   * @private
   */
  const _handlePressSendMsgBtn = async (): Promise<void> => {
    const result = await memberApi.member.sendFindPassProc.post({
      userId: userInfo.userId,
      tempType,
      userEmil: userInfo.userEmil,
      langCode: await getLocale(),
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
        userEmilErrMsg: $t(result.messageLocaleCode),
      })
    }
  }

  /**
   * 인증번호 검증
   * @private
   */
  const _handlePressCertifyBtn = async (): Promise<void> => {
    const result = await memberApi.member.confirmFindPass.post({
      tempType,
      userId: userInfo.userId,
      userEmil: userInfo.userEmil,
      ctfcNmbr: userInfo.ctfcNmbr,
    })
    if (result.check) {
      clearInterval(timerInterval)
      setUserInfo({
        ...userInfo,
        ctfcNmbrConfirm: true,
        ctfcNmbrErrMsg: '',
        ctfcNmbrHintMsg: '인증이 완료되었습니다.', // todo: 다국어 처리
      })
    } else {
      setUserInfo({
        ...userInfo,
        ctfcNmbrErrMsg: $t(result.messageLocaleCode),
      })
    }
  }

  useEffect((): void => {
    if (!isFocused) {
      _debounceUserId.cancel()
      _debounceUserEmil.cancel()
    }
  }, [isFocused])

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
        <InputBox>
          <TextInput
            // placeholder={`이메일을 입력하세요.`}
            placeholder={$t('USER.USER_WORD_04')}
            keyboardType="email-address"
            value={userInfo.userEmil}
            onChangeText={_handleChangeEmil}
            errorMessage={userInfo.userEmilErrMsg}
            onClickClearBtn={(): void => {
              setUserInfo({
                ...userInfo,
                userEmil: '',
                userEmilErrMsg: '',
                userEmilConfirm: false,
              })
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
              userInfo.userEmilConfirm ? 'active' : 'enabled'
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
              maxLength={TEXT_LENGTH}
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
              // text={'확인'}
              text={$t('COMM.COMM_WORD_CONFIRM')}
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

export default EmailTabScreen
