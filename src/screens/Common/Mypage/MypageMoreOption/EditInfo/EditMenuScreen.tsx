import React from 'react'
import Body from '@components/Body'
import styled from 'styled-components/native'
import Text from '@components/Text'
import IconChevron from '@components/Images/Icon/IconChevron'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'

export default function EditMenuScreen(): JSX.Element {
  return (
    <Body>
      <EditMenuWrap>
        <EditMenuContent
          onPress={(): void => {
            NavigationService.navigate('EditProfileScreen')
          }}
        >
          {/* 프로필 수정 */}
          <Text size={16}>{$t('MP.MP_WORD_28')}</Text>
          <ArrowRotateWrap>
            <IconChevron />
          </ArrowRotateWrap>
        </EditMenuContent>
        <EditMenuContent
          onPress={(): void => {
            NavigationService.navigate('EditPhoneCountry')
          }}
        >
          {/* 연락처 변경 */}
          <Text size={16}>{$t('MP.MP_WORD_24')}</Text>
          <ArrowRotateWrap>
            <IconChevron />
          </ArrowRotateWrap>
        </EditMenuContent>
        <EditMenuContent
          onPress={(): void => {
            NavigationService.navigate('CheckPswdScreen')
          }}
        >
          {/* 비밀번호 재설정 */}
          <Text size={16}>{$t('MP.MP_WORD_15')}</Text>
          <ArrowRotateWrap>
            <IconChevron />
          </ArrowRotateWrap>
        </EditMenuContent>
      </EditMenuWrap>
    </Body>
  )
}

const EditMenuWrap = styled.View`
  margin-top: 20px;
`

const EditMenuContent = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin: 10px 0;
`

const ArrowRotateWrap = styled.View`
  transform: rotate(-90deg);
`

EditMenuScreen.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('MP.MP_WORD_25'),
  })
}
