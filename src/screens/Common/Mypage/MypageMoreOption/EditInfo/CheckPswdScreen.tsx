import React, { useState } from 'react'
import Body from '@components/Body'
import Button from '@components/Button'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import Text from '@components/Text'
import TextInput from '@components/TextInput'
import { Colors } from '@constants'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import $t from 'i18n'
import NavigationService from '@service/NavigationService'
import mypage from '@api/mypage.api'
import aesEncrypt from '@utils/AesEncrypt'

export default function CheckPswdScreen(): React.JSX.Element {
  const [password, setPassword] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const _handlePressCertifyBtn = async (): Promise<void> => {
    const userPassword = aesEncrypt(password)
    // const userPassword = password

    const params = {
      userPassword,
    }
    const result = await mypage.confirmPassProc.post({
      params,
    })

    if (result.check) {
      setErrorMsg('')
      NavigationService.navigate('EditPswdScreen')
      setPassword('')
    } else {
      setErrorMsg(result.message)
    }
  }

  return (
    <Body
      bottomComponent={
        <BottomButtonWrapper isAndroid={Platform.OS === 'android'}>
          <Button
            text={$t('COMM.COMM_WORD_CONFIRM')}
            onPress={(): void => {
              _handlePressCertifyBtn()
            }}
            buttonType={password.length < 1 ? 'enabled' : 'active'}
          />
        </BottomButtonWrapper>
      }
    >
      <Text
        size={18}
        color={Colors.nagative}
        style={{ textAlign: 'center' }}
        bold={'600'}
      >
        <Text size={18} bold={'500'}>
          기존 비밀번호
        </Text>
        를 입력해주세요.
      </Text>
      <EditInfoText size={14} color={Colors.nagative}>
        {$t('MP.MP_STC_08')}
      </EditInfoText>

      <InputTitle size={14} color={Colors.nagative}>
        현재 비밀번호
      </InputTitle>
      <TextInput
        maxLength={20}
        value={password}
        onChangeText={setPassword}
        onClickClearBtn={(): void => {
          setPassword('')
          setErrorMsg('') //임시
        }}
        placeholder={$t('MP.MP_WORD_03')}
        secureTextEntry={true}
        errorMessage={errorMsg}
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

CheckPswdScreen.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('MP.MP_WORD_16'),
  })
}
