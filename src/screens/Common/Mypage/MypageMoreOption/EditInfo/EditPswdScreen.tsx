import React, { useState } from 'react'
import Body from '@components/Body'
import Button from '@components/Button'
import { Dev } from '@constants'
import { Platform, Keyboard } from 'react-native'
import styled from 'styled-components/native'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import { Colors } from '@constants'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import $t from 'i18n'
import { VALIDATIONS } from '@utils/ValidationCheck'
import { useDebouncedCallback } from 'use-debounce'
import NavigationService from '@service/NavigationService'
import myPage from '@api/mypage.api'
import aesEncrypt from '@utils/AesEncrypt'
import { useAlert } from '@hooks/useCommonAlert'

export default function EditPswdScreen(): React.JSX.Element {
  const [isVerified, setIsVerified] = useState(false)
  const [newPswd, setNewPswd] = useState('')
  const [newPswdRe, setNewPswdRe] = useState('')
  const [pwdErrorMsg, setPwdErrorMsg] = useState('')
  const [pwdReErrorMsg, setPwdReErrorMsg] = useState('')
  const alert = useAlert()

  // 신규 비밀번호 유효성 검사
  const _handleChangePassword = useDebouncedCallback(
    async (text: string): Promise<void> => {
      if (VALIDATIONS.password.test(text)) {
        setPwdErrorMsg('')

        if (text === newPswdRe) {
          setPwdErrorMsg('')
          setIsVerified(true)
        } else {
          setIsVerified(false)
          setPwdReErrorMsg(
            newPswdRe === '' ? '' : $t('MP.MP_STC_07')
            // 비밀번호가 일치하지 않습니다.
          )
        }
      } else {
        setPwdErrorMsg($t('USER.USER_STC_13'))
        // 유효한 형식이 아닙니다.
      }
    },
    500
  )
  //비밀번호 확인 유효성 검사
  const _handleChangePasswordRe = useDebouncedCallback(
    async (text: string): Promise<void> => {
      if (text === newPswd) {
        setPwdReErrorMsg('')
        setIsVerified(true)
      } else {
        setIsVerified(false)
        setPwdReErrorMsg($t('MP.MP_STC_07'))
        // 비밀번호가 일치하지 않습니다.
      }
    },
    500
  )

  // 저장버튼
  const _handlePressCertifyBtn = async (): Promise<void> => {
    const password = aesEncrypt(newPswd)
    const passwordRe = aesEncrypt(newPswd)

    const params = {
      password,
      passwordRe,
    }
    const result = await myPage.updatePassProc.post({
      params,
    })
    if (isVerified) {
      if (result.check) {
        alert({ desc: $t('USER.USER_STC_06') })
        NavigationService.navigate('EditMenuScreen')
        setPwdErrorMsg('')
      } else {
        setPwdErrorMsg(result.message)
      }
    }
  }

  return (
    <Body
      bottomComponent={
        <BottomButtonWrapper isAndroid={Platform.OS === 'android'}>
          <Button
            text={$t('COMM.COMM_WORD_SAVE')}
            onPress={(): void => {
              Keyboard.dismiss()
              _handlePressCertifyBtn()
              Dev.log('다음 버튼')
            }}
            buttonType={isVerified ? 'active' : 'enabled'}
          />
        </BottomButtonWrapper>
      }
    >
      <Text
        size={18}
        color={Colors.disabled}
        style={{ textAlign: 'center' }}
        bold={'600'}
      >
        <Text size={18} bold={'500'}>
          비밀번호
        </Text>
        를 변경해주세요.
      </Text>
      <EditInfoText size={14} color={Colors.disabled}>
        {/* 소중한 개인정보 보호를 위해 비밀번호 변경을 안내드립니다. */}
        {$t('MP.MP_STC_08')}
      </EditInfoText>
      <InputTitle size={14} color={Colors.disabled}>
        신규 비밀번호
      </InputTitle>
      <TextInput
        maxLength={20}
        value={newPswd}
        onChangeText={(text: string): void => {
          setNewPswd(text)
          _handleChangePassword(text)
        }}
        onClickClearBtn={(): void => {
          setNewPswd('')
          // setErrorMsg('')
        }}
        placeholder={$t('USER.USER_WORD_02')} //8~20자의 영문+숫자+특수문자 조합
        secureTextEntry={true}
        errorMessage={pwdErrorMsg}
      />
      <TextInput
        maxLength={20}
        value={newPswdRe}
        onChangeText={(text: string): void => {
          setNewPswdRe(text)
          _handleChangePasswordRe(text)
        }}
        onClickClearBtn={(): void => {
          setNewPswdRe('')
        }}
        placeholder={$t('MP.MP_WORD_16')} //비밀번호 확인
        secureTextEntry={true}
        errorMessage={pwdReErrorMsg}
      />
    </Body>
  )
}

const EditInfoText = styled(Text)`
  text-align: center;
  margin-top: 10px;
  line-height: 20px;
`
const InputTitle = styled(Text)`
  margin-bottom: 8px;
  margin-top: 38px;
`

// bottom button component
const BottomButtonWrapper = styled.View<{ isAndroid: boolean }>`
  flex-direction: row;
  justify-content: center;
  padding: ${(props): string => {
    return props.isAndroid ? '15px' : '0 15px'
  }};
`

/**
 * navigation 옵션
 */
EditPswdScreen.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('MP.MP_WORD_15'),
  })
}
