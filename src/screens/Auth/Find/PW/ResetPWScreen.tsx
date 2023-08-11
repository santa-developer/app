import memberApi from '@api/member.api'
import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import { CommonHeader } from '@components/Header'
import TextInput from '@components/TextInput'
import MEBR from '@models/MEBR'
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack'
import { FindUserInfoState } from '@recoil/atoms/Auth/find'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import { InputText } from '@screens/Auth/Login/StepEmailScreen'
import NavigationService, {
  RootStackParamList,
} from '@service/NavigationService'
import aesEncrypt from '@utils/AesEncrypt'
import { VALIDATIONS } from '@utils/ValidationCheck'
import $t from 'i18n'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { Keyboard } from 'react-native'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useDebouncedCallback } from 'use-debounce'

/**
 * 비밀번호 재설정 페이지
 * todo: 비밀번호 재설정 api
 * @returns
 */
function ResetPW(
  props: StackScreenProps<RootStackParamList, 'ResetPW'>
): React.JSX.Element {
  const {
    route: {
      params: { tempType },
    },
  } = props
  const [userInfo, setUserInfo] = useRecoilState(FindUserInfoState)

  // 로그인 유저 정보 저장
  const setLoginedUserInfo = useSetRecoilState(loginedUserInfoState)

  // 입력 항목 변경 이벤트
  const _handleChangeText = (id: string, text?: string): void => {
    setUserInfo({
      ...userInfo,
      [id]: text,
      [`${id}ErrMsg`]: '',
      pswdConfirm: false,
    })
    _debounceValidationCheck()
  }

  // 입력 항목 초기화 이벤트
  const _handleClearInfo = (id: string) => (): void => {
    setUserInfo({
      ...userInfo,
      [id]: '',
      [`${id}ErrMsg`]: '',
      pswdConfirm: false,
    })
  }

  // 유효성 검사
  const _debounceValidationCheck = useDebouncedCallback(
    (): boolean => {
      if (_.isEmpty(userInfo.pswd)) {
        setUserInfo({
          ...userInfo,
          pswdErrMsg: $t('API.API_STC_28'),
          // pswdErrMsg: '비밀번호를 입력하세요.',
        })
        return false
      }
      if (!VALIDATIONS.password.test(userInfo.pswd)) {
        setUserInfo({
          ...userInfo,
          pswdErrMsg: $t('USER.USER_STC_13'),
          // pswdErrMsg: '유효한 형식이 아닙니다.',
        })
        return false
      }
      if (userInfo.pswd !== userInfo.pswdRe) {
        setUserInfo({
          ...userInfo,
          pswdReErrMsg: $t('MP.MP_STC_07'),
          // pswdReErrMsg: '비밀번호가 일치하지 않습니다.',
        })
        return false
      }

      setUserInfo({ ...userInfo, pswdConfirm: true })

      return true
    },
    500
  )

  const _handlePressModPass = async (): Promise<void> => {
    const pswd = aesEncrypt(userInfo.pswd)
    const pswdRe = aesEncrypt(userInfo.pswdRe)

    const result = await memberApi.member.findPassChange.post({
      tempType, // 'S', 'E' (sms, email)인증구분
      userId: userInfo.userId,
      userEmil: userInfo.userEmil,
      ctfcNmbr: userInfo.ctfcNmbr,
      pswd: pswd,
      pswdRe: pswdRe,
      clpnNmbr: userInfo.clpnNmbr,
      nationIso2: userInfo.natnCode,
    })

    if (result.check) {
      const {
        userInfo,
      }: {
        userInfo: MEBR
      } = result.response

      setLoginedUserInfo(userInfo)

      Keyboard.dismiss()
      setTimeout(
        () => NavigationService.navigate('FindPWResult'),
        300
      )
    } else {
      alert({ desc: $t(result.messageLocaleCode) })
    }
  }

  useEffect(() => {
    setUserInfo({ ...userInfo, pswd: '', pswdRe: '' })
  }, [])

  return (
    <Body
      bottomComponent={
        <BottomButtonOne
          // text="다음"
          text={$t('COMM.COMM_WORD_NEXT')}
          onPress={_handlePressModPass}
          buttonType={userInfo.pswdConfirm ? 'active' : 'enabled'}
        />
      }
    >
      <InputText marginTop="15">
        {$t('COMM.COMM_WORD_PAWD')}
      </InputText>
      <TextInput
        maxLength={20}
        secureTextEntry={true}
        placeholder={$t('USER.USER_WORD_02')}
        value={userInfo.pswd}
        onChangeText={(text: string): void => {
          _handleChangeText('pswd', text)
        }}
        errorMessage={userInfo.pswdErrMsg}
        onClickClearBtn={_handleClearInfo('pswd')}
      />
      <TextInput
        maxLength={20}
        secureTextEntry={true}
        placeholder={$t('MP.MP_WORD_16')}
        value={userInfo.pswdRe}
        onChangeText={(text: string): void => {
          _handleChangeText('pswdRe', text)
        }}
        errorMessage={userInfo.pswdReErrMsg}
        onClickClearBtn={_handleClearInfo('pswdRe')}
      />
    </Body>
  )
}

export default ResetPW
/**
 * navigation 옵션
 */
ResetPW.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('MP.MP_WORD_15'),
    // title: '비밀번호 재설정',
  })
}
