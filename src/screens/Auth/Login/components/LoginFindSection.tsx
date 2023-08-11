import Text from '@components/Text'
import { Colors } from '@constants'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import React from 'react'
import { Keyboard, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

function LoginFindSection(): React.JSX.Element {
  return (
    <>
      <FindLoginInfoBox onTouchStart={Keyboard.dismiss}>
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={(): void => {
            NavigationService.navigate('SignUpStepEmail')
          }}
        >
          <Text>{$t(`USER.USER_WORD_06`)}</Text>
        </TouchableOpacity>
        <VerticalLine />
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={(): void => {
            NavigationService.navigate('FindID')
          }}
        >
          <Text>{$t('USER.USER_WORD_24')}</Text>
        </TouchableOpacity>
        <VerticalLine />
        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={(): void => {
            NavigationService.navigate('FindPW')
          }}
        >
          <Text>{$t('MP.MP_WORD_15')}</Text>
        </TouchableOpacity>
      </FindLoginInfoBox>
    </>
  )
}

export default LoginFindSection

const VerticalLine = styled.View`
  width: 1px;
  border-left-width: 1px;
  border-left-color: ${Colors.bg1};
  height: 20px;
  align-items: center;
  justify-content: center;
`
const FindLoginInfoBox = styled.View`
  margin: 25px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
