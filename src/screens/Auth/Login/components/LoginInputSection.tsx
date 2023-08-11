import Button from '@components/Button'
import { LoadingMark } from '@components/Loading/LoadingScreen'
import ReCaptchaV2 from '@components/ReCaptcha/v2'
import TextInput from '@components/TextInput'
import { Layout } from '@constants'
import useAuthService from '@hooks/useAuthService'
import { LoginType } from '@models/Auth/LOGIN'
import { isLoadingShowState } from '@recoil/atoms/common'
import { alertSelector } from '@recoil/selectors/alert'
import BiometricsService from '@service/BiometricsService'
import NavigationService from '@service/NavigationService'
import StorageService, { StorageKey } from '@service/StorageService'
import $t from 'i18n'
import _ from 'lodash'
import React, { useState } from 'react'
import { Keyboard, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'

export default function LoginSection(): React.JSX.Element {
  const { login, navigateAfterLogin } = useAuthService()

  const setIsLoading = useSetRecoilState(isLoadingShowState)
  const setAlert = useSetRecoilState(alertSelector)
  // const userInfo = useRecoilValue(loginedUserInfoSelector)

  const [inputId, setInputId] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  const rcHeight = Layout.window.height - 200
  const rcWidth = Layout.window.width - 40

  const [showModal, setShowModal] = useState<boolean>(false)

  const _handleHideModal = (): void => {
    setShowModal(false)
  }

  // reCAPTCHA 인증 성공 후 로직 (reCAPTCHA 아직)
  // const _handleSuccess = async (rcToken: string): Promise<void> => {
  const _handleSuccess = async (): Promise<void> => {
    _handleHideModal()
    setIsLoading(true)

    // const password = aesEncrypt(userPassword)
    const password = inputPassword

    // login(LoginType.ID, { // 나중에 reCaptcha 추가
    const result = await login(LoginType.SignUp, {
      userId: inputId,
      userPassword: password,
    })
    const { isLogin, errorMessage, memSttsCode } = result
    if (isLogin) {
      // 기존에 생체 인증으로 로그인 한 회원
      const bioToken = await StorageService.getItem(
        StorageKey.BIOMETRICS_LOGIN_RE_TOKEN
      )
      const recentUserId = await StorageService.getItem(
        StorageKey.RECENT_LOGIN_USER_ID
      )
      const refreshToken = await StorageService.getItem(
        StorageKey.refreshToken
      )

      // 생체 인증 정보 저장
      if (!recentUserId || !bioToken || recentUserId !== inputId) {
        BiometricsService.confirmSensor({
          onPressConfirm: ({ success }) => {
            if (success && refreshToken) {
              BiometricsService.setBioToken(refreshToken)
            }
          },
          onPressCancel: () => {
            BiometricsService.removeBioToken()
          },
        }).then((value) => {
          value && navigateAfterLogin(inputPassword)
        })
      } else {
        setTimeout(() => {
          navigateAfterLogin(inputPassword)
        }, 300)
      }
    } else {
      setAlert({
        desc: errorMessage,
        onPressConfirm: (): void => {
          // 비밀번호 오류 횟수 5회
          if (memSttsCode === 400)
            NavigationService.navigate('FindPW')
          // 비밀번호 90일 경과
          else if (memSttsCode === 410)
            NavigationService.navigate('LoginPswdUpdate')
        },
      })
    }
  }

  return (
    <View>
      <TextInput
        containerStyle={{ marginBottom: 10 }}
        // placeholder={'아이디'}
        placeholder={$t('COMM.COMM_WORD_ID')}
        value={inputId}
        onChangeText={(text: string): void => {
          setInputId(_.toLower(text))
        }}
        maxLength={100}
        onClickClearBtn={(): void => {
          setInputId('')
        }}
      />
      <TextInput
        containerStyle={{ marginBottom: 10 }}
        // placeholder={'비밀번호'}
        placeholder={$t('COMM.COMM_WORD_PAWD')}
        value={inputPassword}
        secureTextEntry={true}
        onChangeText={(text: string): void => {
          setInputPassword(text)
        }}
        maxLength={20}
        onClickClearBtn={(): void => {
          setInputPassword('')
        }}
      />
      <LoginButton
        // text={'로그인'}
        text={$t('USER.USER_WORD_LOGIN')}
        buttonType={
          inputId.length > 0 && inputPassword.length > 0
            ? 'active'
            : 'enabled'
        }
        onPress={(): void => {
          Keyboard.dismiss()
          // setShowModal(true)
          _handleSuccess()
        }}
      />
      <ReactNativeModal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        useNativeDriverForBackdrop
        style={{
          marginTop: Layout.statusBarHeight,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onBackdropPress={_handleHideModal}
        onBackButtonPress={_handleHideModal}
        isVisible={showModal}
      >
        <View style={{ height: rcHeight, width: rcWidth }}>
          <LoadingMark
            viewStyle={{
              position: 'absolute',
              top: 30,
              left: 0,
              right: 0,
            }}
          />
          <ReCaptchaV2 onSuccess={_handleSuccess} />
        </View>
      </ReactNativeModal>
    </View>
  )
}

const LoginButton = styled(Button)`
  margin-top: 15px;
`
