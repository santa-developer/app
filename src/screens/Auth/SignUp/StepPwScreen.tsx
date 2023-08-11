import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import { CommonHeader } from '@components/Header'
import TextInput from '@components/TextInput'
import { StackNavigationOptions } from '@react-navigation/stack'
import { SignUpUserInfoState } from '@recoil/atoms/Auth/signUp'
import NavigationService from '@service/NavigationService'
import { VALIDATIONS } from '@utils/ValidationCheck'
import $t from 'i18n'
import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useRecoilState } from 'recoil'
import { useDebouncedCallback } from 'use-debounce'
import { InputText } from '../Login/StepEmailScreen'

function StepPw(): React.JSX.Element {
  const [userInfo, setUserInfo] = useRecoilState(SignUpUserInfoState)

  const [inputPswd, setInputPswd] = useState('')
  const [pswdErrMsg, setPswdErrMsg] = useState('')

  const [inputPswdRe, setInputPswdRe] = useState('')
  const [pswdReErrMsg, setPswdReErrMsg] = useState('')

  const [pswdConfirm, setPswdConfirm] = useState(false)

  const _handleChangePassword = useDebouncedCallback(
    async (text: string): Promise<void> => {
      if (VALIDATIONS.password.test(text)) {
        setPswdErrMsg('')

        if (text === inputPswdRe) {
          setPswdReErrMsg('')
          setUserInfo({ ...userInfo, pswdConfirm: true })
          setPswdConfirm(true)
        } else {
          setUserInfo({ ...userInfo, pswdConfirm: false })
          setPswdConfirm(false)
          setPswdReErrMsg(
            inputPswdRe === '' ? '' : $t('MP.MP_STC_07')
            // '비밀번호가 일치하지 않습니다.'
          )
        }
      } else {
        setPswdErrMsg($t('USER.USER_STC_13'))
        // setPswdErrMsg('유효한 형식이 아닙니다.')
      }
    },
    500
  )

  const _handleChangePasswordRe = useDebouncedCallback(
    async (text: string): Promise<void> => {
      if (text === inputPswd) {
        setPswdReErrMsg('')
        setUserInfo({ ...userInfo, pswdConfirm: true })
        setPswdConfirm(true)
      } else {
        setUserInfo({ ...userInfo, pswdConfirm: false })
        setPswdConfirm(false)
        setPswdReErrMsg($t('MP.MP_STC_07'))
        // setPswdReErrMsg('비밀번호가 일치하지 않습니다.')
      }
    },
    500
  )

  useEffect(() => {
    setUserInfo({ ...userInfo, nowStep: 2 })
  }, [])

  return (
    <Body
      bottomComponent={
        <BottomButtonOne
          // text="다음"
          text={$t('COMM.COMM_WORD_NEXT')}
          onPress={(): void => {
            Keyboard.dismiss()
            NavigationService.navigate('SignUpStepId')
          }}
          buttonType={pswdConfirm ? 'active' : 'enabled'}
        />
      }
    >
      <InputText>{$t('COMM.COMM_WORD_PAWD')}</InputText>
      <TextInput
        maxLength={20}
        secureTextEntry={true}
        placeholder={$t('USER.USER_WORD_02')}
        // placeholder={`8-20자의 영문+숫자+특수문자 조합`}
        value={inputPswd}
        onChangeText={(text: string): void => {
          setInputPswd(text)
          setUserInfo({ ...userInfo, pswd: text, pswdConfirm: false })
          _handleChangePassword(text)
        }}
        errorMessage={pswdErrMsg}
        onClickClearBtn={(): void => {
          _handleChangePassword('')
        }}
      />
      <TextInput
        maxLength={20}
        secureTextEntry={true}
        placeholder={$t('USER.USER_WORD_02')}
        // placeholder={`비밀번호 확인`}
        value={inputPswdRe}
        onChangeText={(text: string): void => {
          setInputPswdRe(text)
          setUserInfo({ ...userInfo, pswdConfirm: false })
          _handleChangePasswordRe(text)
        }}
        errorMessage={pswdReErrMsg}
        onClickClearBtn={(): void => {
          _handleChangePasswordRe('')
        }}
      />
    </Body>
  )
}

export default StepPw

/**
 * navigation 옵션
 */
StepPw.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('USER.USER_WORD_28'), // 비밀번호 입력
  })
}
