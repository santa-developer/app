import memberApi from '@api/member.api'
import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import { CommonHeader } from '@components/Header'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import { Colors } from '@constants'
import useAuthService from '@hooks/useAuthService'
import { idCheckType } from '@models/Auth/USER_INFO'
import { StackNavigationOptions } from '@react-navigation/stack'
import { SignUpUserInfoState } from '@recoil/atoms/Auth/signUp'
import { VALIDATIONS } from '@utils/ValidationCheck'
import $t from 'i18n'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'

function StepId(): React.JSX.Element {
  const { join } = useAuthService()
  const [userInfo, setUserInfo] = useRecoilState(SignUpUserInfoState)
  const [inputId, setInputId] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [hintMsg, setHintMsg] = useState(
    // '6~20자의 영문, 숫자, 밑줄문자, 마침표 사용가능'
    $t('USER.USER_WORD_03')
  )

  const _handleChangeLoginId = useDebouncedCallback(
    async (userId: string): Promise<void> => {
      setErrorMsg('')

      if (!VALIDATIONS.userId.test(userId)) {
        setErrorMsg($t('USER.USER_WORD_03'))
        // setErrorMsg('잘못된 아이디 형식입니다.')
        setHintMsg('')
        return
      }
      const result = await memberApi.member.idck.post({
        userId,
        pageType: idCheckType.JOIN,
      })
      if (result.check) {
        setUserInfo({ ...userInfo, userId, userIdConfirm: true })
      } else {
        setErrorMsg(result.message)
        setUserInfo({ ...userInfo, userIdConfirm: false })
      }
    },
    500
  )

  useEffect(() => {
    setUserInfo({ ...userInfo, nowStep: 3 })
  }, [])

  return (
    <Body
      bottomComponent={
        <BottomButtonOne
          // text={'가입하기'}
          text={$t('USER.USER_WORD_06')}
          buttonType={userInfo.userIdConfirm ? 'active' : 'enabled'}
          onPress={async (): Promise<void> => {
            await join(userInfo.nowStep + 1)
          }}
        />
      }
    >
      <IdText>아이디</IdText>
      <TextInput
        maxLength={20}
        placeholder={`아이디`}
        value={inputId}
        onChangeText={(text: string): void => {
          const lowerText = _.toLower(text)
          setInputId(lowerText)
          setErrorMsg('')
          setUserInfo({ ...userInfo, userIdConfirm: false })
          _handleChangeLoginId(lowerText)
        }}
        errorMessage={errorMsg}
        hintMessage={hintMsg}
        onClickClearBtn={(): void => {
          setInputId('')
          setUserInfo({ ...userInfo, userIdConfirm: false })
        }}
      />
    </Body>
  )
}

export default StepId

/**
 * navigation 옵션
 */
StepId.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    // title: $t('USER.USER_WORD_35'), // 메일 인증
    title: '아이디 생성',
  })
}

const IdText = styled(Text)<{ marginTop?: string }>`
  font-size: 14px;
  line-height: 27px;
  color: ${Colors.nagative};
  margin-bottom: 10px;
  margin-top: ${(props): string => props.marginTop || '0'};
`
