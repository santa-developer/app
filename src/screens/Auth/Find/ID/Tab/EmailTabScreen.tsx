import memberApi from '@api/member.api'
import { BodyKeyboardDismiss } from '@components/Common/BodyKeyboardDismiss'
import TextInput from '@components/TextInput'
import { Colors } from '@constants'
import { useIsFocused } from '@react-navigation/native'
import { FindUserInfoState } from '@recoil/atoms/Auth/find'
import $t from 'i18n'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components/native'
import { useDebouncedCallback } from 'use-debounce'

function EmailTabScreen(): React.JSX.Element {
  const isFocused = useIsFocused()

  const [userInfo, setUserInfo] = useRecoilState(FindUserInfoState)
  const resetUserInfo = (): void =>
    setUserInfo({
      ...userInfo,
      userEmil: '',
      userEmilErrMsg: '',
      userEmilConfirm: false,
    })

  /**
   * 아이디 찾기 이메일
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
          userId: result.response.userId,
          mebrFileMgmtNmbr: result.response.mebrFileMgmtNmbr,
          userEmilErrMsg: '',
        })
      } else {
        setUserInfo({
          ...userInfo,
          userEmilErrMsg: $t(result.messageLocaleCode),
        })
      }
    },
    500
  )

  useEffect((): void => {
    if (!isFocused) {
      _debounceUserEmil.cancel()
    }
  }, [isFocused])

  return (
    <Wrapper>
      <BodyKeyboardDismiss />
      <TextInput
        // placeholder={`이메일을 입력하세요.`}
        placeholder={$t('USER.USER_WORD_04')}
        keyboardType="email-address"
        value={userInfo.userEmil}
        onChangeText={(input: string): void => {
          const text = _.trim(input).toLowerCase()
          setUserInfo({
            ...userInfo,
            userEmil: text,
            userEmilErrMsg: '',
            userEmilConfirm: false,
          })
          _debounceUserEmil(text)
        }}
        errorMessage={userInfo.userEmilErrMsg}
        onClickClearBtn={(): void => {
          resetUserInfo()
        }}
      />
    </Wrapper>
  )
}

export default EmailTabScreen

export const Wrapper = styled.View`
  flex: 1;
  padding: 15px;
  padding-top: 40px;
  background-color: ${Colors.wh};
  width: 100%;
`
