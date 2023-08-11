import Body from '@components/Body'
import { BottomButtonVarious } from '@components/BottomButton'
import { CommonHeader } from '@components/Header'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import { Colors } from '@constants'
import { StackNavigationOptions } from '@react-navigation/stack'
import { isLoggedInState } from '@recoil/atoms/auth'
import { alertSelector } from '@recoil/selectors/alert'
import NavigationService from '@service/NavigationService'
import { VALIDATIONS } from '@utils/ValidationCheck'
import _ from 'lodash'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components/native'
import { InputText } from './StepEmailScreen'

export interface PswdItem {
  currentPswd: string
  newPswd: string
  newPswdRe: string
}
const initPswd = {
  currentPswd: '',
  newPswd: '',
  newPswdRe: '',
}

export default function PswdUpdate(): React.JSX.Element {
  const [, setIsLogin] = useRecoilState(isLoggedInState)
  const [, setAlert] = useRecoilState(alertSelector)
  const [pswdInfo, setPswdInfo] = useState<PswdItem>(initPswd)
  const [pswdErrMsg, setPswdErrMsg] = useState<PswdItem>(initPswd)

  const { currentPswd, newPswd, newPswdRe } = pswdInfo

  // 입력 항목 변경 이벤트
  const handleChangeText = (id: string, text?: string): void => {
    setPswdErrMsg((info) => ({ ...info, [id]: '' }))
    setPswdInfo((info) => ({ ...info, [id]: text }))
  }

  // 입력 항목 초기화 이벤트
  const handleClearInfo = (id: string) => (): void => {
    setPswdErrMsg((info) => ({ ...info, [id]: '' }))
    setPswdInfo((info) => ({ ...info, [id]: '' }))
  }

  // 유효성 검사
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onValidationCheck = (): boolean => {
    if (_.isEmpty(newPswd)) {
      setPswdErrMsg((prev) => ({
        ...prev,
        // passwordRe: $t('API.API_STC_28'),
        newPswd: '비밀번호를 입력하세요.',
      }))
      return false
    }

    if (!VALIDATIONS.password.test(newPswd)) {
      setPswdErrMsg((prev) => ({
        ...prev,
        // newPswdRe: $t('USER.USER_STC_13'),
        newPswd: '유효한 형식이 아닙니다.',
      }))
      return false
    }

    if (newPswd !== newPswdRe) {
      setPswdErrMsg((prev) => ({
        ...prev,
        // passwordRe: $t('MP.MP_STC_07'),
        newPswdRe: '비밀번호가 일치하지 않습니다.',
      }))
      return false
    }

    return true
  }

  // 비밀번호 체크
  const onCheckPassword = (): boolean => {
    const userPassword = 'aaaaa'

    // const params = {
    //   userPassword: userPassword,
    // }
    // const result = await MyPageService.mypage.confirmPassProc.post({
    //   params,
    // })
    const result = {
      check: userPassword === currentPswd,
      message: '현재 비밀번호가 틀렸습니다.',
    }
    if (result.check) {
      return true
    } else {
      setPswdErrMsg((info) => ({
        ...info,
        currentPswd: result.message || '현재 비밀번호가 틀렸습니다.',
      }))
      return false
    }
  }

  // 비밀번호 변경 이벤트
  const handlePswdUpdate = (type: 'change' | 'stay') => (): void => {
    // setIsLoding(true)
    // 비밀번호 정상 변경
    let params = {
      password: '',
      passwordRe: '',
      type,
    }
    // 현재 비밀번호 체크
    if (!onCheckPassword()) {
      // setIsLoding(false)
      return
    }
    if (type === 'change') {
      // 유효성 체크
      if (!onValidationCheck()) {
        // setIsLoding(false)
        return
      }

      // setIsLoding(false)

      const encryptPassword = newPswd
      const encryptPasswordRe = newPswdRe

      params = {
        ...params,
        password: encryptPassword,
        passwordRe: encryptPasswordRe,
      }
    }

    // 비밀번호 및 변경기간 업데이트 (type => stay: 90일 연장, change: 변경)
    // const result = await MyPageService.mypage.updatePassProc.post({
    //   params,
    // })
    const result = { check: true, message: 'success', params }
    if (result.check) {
      setAlert({
        desc: '비밀번호가 정상적으로 변경되었습니다.',
        onConfirmBtnText: '확인',
        onPressConfirm: (): void => {
          NavigationService.popToTop()
          setIsLogin(true)
        },
      })
    } else {
      setAlert({ desc: '비밀번호 변경실패.' })
    }
  }

  return (
    <Body
      scrollable={true}
      bottomComponent={
        <BottomButtonVarious
          item={[
            {
              text: '변경하기',
              onPress: handlePswdUpdate('change'),
              buttonType:
                currentPswd.length > 0 &&
                newPswdRe.length > 0 &&
                newPswd.length > 0
                  ? 'active'
                  : 'enabled',
            },
            {
              text: '90일 뒤에 변경',
              onPress: handlePswdUpdate('stay'),
              buttonType: 'negative',
            },
          ]}
        />
      }
    >
      <Guide01Text>HABL 앱 비밀번호 변경 안내</Guide01Text>
      <Guide02Text>
        개인정보 도용 및 유출 등의 위험이 있습니다.{'\n'}계정을
        안전하게 보호하기 위해 비밀번호를 변경해주세요.
      </Guide02Text>
      <InputText>현재 비밀번호</InputText>
      <TextInput
        maxLength={20}
        secureTextEntry={true}
        placeholder={`현재 비밀번호`}
        value={currentPswd}
        onChangeText={(text: string): void => {
          handleChangeText('currentPswd', text)
        }}
        errorMessage={pswdErrMsg.currentPswd}
        onClickClearBtn={handleClearInfo('currentPswd')}
      />
      <InputText marginTop={'30'}>신규 비밀번호</InputText>
      <TextInput
        maxLength={20}
        secureTextEntry={true}
        placeholder={`8-20자의 영문+숫자+특수문자 조합`}
        value={newPswd}
        onChangeText={(text: string): void => {
          handleChangeText('newPswd', text)
        }}
        errorMessage={pswdErrMsg.newPswd}
        onClickClearBtn={handleClearInfo('newPswd')}
      />
      <TextInput
        maxLength={20}
        secureTextEntry={true}
        placeholder={`비밀번호 확인`}
        value={newPswdRe}
        onChangeText={(text: string): void => {
          handleChangeText('newPswdRe', text)
        }}
        errorMessage={pswdErrMsg.newPswdRe}
        onClickClearBtn={handleClearInfo('newPswdRe')}
      />
    </Body>
  )
}

/**
 * navigation 옵션
 */
PswdUpdate.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    // title: $t('USER.USER_WORD_43'), // 비밀번호 변경 안내
    title: '비밀번호 변경 안내',
  })
}

const Guide01Text = styled(Text)`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
  color: ${Colors.bl};
  margin-bottom: 12px;
`
const Guide02Text = styled(Text)`
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.nagative};
  margin-bottom: 40px;
`
