import { CommonHeader } from '@components/Header'
import { useAlert } from '@hooks/useCommonAlert'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationOptions } from '@react-navigation/stack'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import WalletPasswordInput from '@screens/Wallet/components/WalletPasswordKeybord'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

const initPasswordInfo = {
  password: [],
  confirmPassword: [],
}

const TEXT_LENGTH = 6

/**
 * 인증비밀번호 재설정 화면
 */
export default function ResetAuthenticationInput(): JSX.Element {
  const { mebrMgmtNmbr } = useRecoilValue(loginedUserInfoState)
  const alert = useAlert()

  const [passwordInfo, setPasswordInfo] = useState<{
    password: number[]
    confirmPassword: number[]
  }>(initPasswordInfo)

  const [isConfirm, setIsConfirm] = useState(false) // 비밀번호 확인 여부

  const setPassword = (password: number[]): void => {
    setPasswordInfo((prev) => {
      return { ...prev, password }
    })
    setIsConfirm(true)
  }

  const setConfirmPassword = (confirmPassword: number[]): void => {
    setPasswordInfo((prev) => {
      return { ...prev, confirmPassword }
    })
  }

  const resetPasswordInfo = (): void => {
    setPasswordInfo(initPasswordInfo)
    setIsConfirm(false)
  }

  const _submitResetAuthPassword = async (): Promise<void> => {
    const { password, confirmPassword } = passwordInfo

    if (password.join() === confirmPassword.join()) {
      await AsyncStorage.setItem(
        `${mebrMgmtNmbr}WALLET_PASSWORD_KEY`,
        password.join()
      )
      alert({
        desc: $t('WALT.WALT_STC_03'), // "인증번호가 설정되었습니다."
        onPressConfirm: () =>
          NavigationService.navigate('Verfication'),
      })
    } else {
      alert({
        desc: $t('WALT.WALT_STC_04'), // "인증번호가 일치하지 않습니다."
        onPressConfirm: resetPasswordInfo,
      })
    }
  }

  useEffect(() => {
    const { password, confirmPassword } = passwordInfo
    if (
      password.length === TEXT_LENGTH &&
      confirmPassword.length === TEXT_LENGTH
    ) {
      _submitResetAuthPassword()
    }
  }, [passwordInfo])

  return !isConfirm ? (
    <WalletPasswordInput
      // title='새로운 인증비밀번호를 입력하세요.
      title={$t('WALT.WALT_STC_02')}
      onComplete={setPassword}
    />
  ) : (
    <WalletPasswordInput
      // title='다시한번 인증비밀번호를 입력하세요.
      title={$t('WALT.WALT_STC_28')}
      onComplete={setConfirmPassword}
    />
  )
}

ResetAuthenticationInput.navigationOptions =
  (): StackNavigationOptions =>
    CommonHeader({
      title: $t('WALT.WALT_WORD_02'),
    })
