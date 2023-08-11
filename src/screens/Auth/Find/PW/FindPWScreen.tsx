import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import NavTab from '@components/NavTab'
import { FindTempType } from '@models/Auth/FIND'
import { StackScreenProps } from '@react-navigation/stack'
import { FindUserInfoState } from '@recoil/atoms/Auth/find'
import { RootStackParamList } from '@service/NavigationService'
import $t from 'i18n'
import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import EmailTabScreen from './Tab/EmailTabScreen'
import PhoneTabScreen from './Tab/PhoneTabScreen'

/**
 * 비밀번호 재설정 페이지
 * todo: kebord on 상태로 탭 클릭 시 탭 내부 안되는 오류 수정해야함.
 * @param
 * @returns
 */
function FindPW(
  props: StackScreenProps<RootStackParamList>
): React.JSX.Element {
  const { navigation } = props
  const userInfo = useRecoilValue(FindUserInfoState)
  const resetUserInfo = useResetRecoilState(FindUserInfoState)
  const [index, setIndex] = useState(0)

  // tab index change handler
  const onIndexChange = (index: number): void => {
    resetUserInfo()
    setIndex(index)
  }

  const _handlePressNextButton = async (): Promise<void> => {
    const tempType =
      index === 0 ? FindTempType.Sms : FindTempType.Email
    navigation.push('ResetPW', { tempType })
  }

  useEffect((): void => {
    resetUserInfo()
    navigation.addListener('focus', (): void => {
      resetUserInfo()
    })
  }, [])

  return (
    <Body
      hidePadding
      bottomComponent={
        <BottomButtonOne
          buttonType={
            userInfo.ctfcNmbrConfirm && userInfo.userIdConfirm
              ? 'active'
              : 'enabled'
          }
          text={$t('COMM.COMM_WORD_NEXT')}
          // text={'다음'}
          onPress={(): void => {
            Keyboard.dismiss()
            _handlePressNextButton()
          }}
        />
      }
    >
      <NavTab
        tabLabel={[
          $t('COMM.COMM_WORD_PHONE'), // 연락처
          $t('COMM.COMM_WORD_EMAIL'), // 이메일
        ]}
        tabName={[FindTempType.Sms, FindTempType.Email]}
        components={[PhoneTabScreen, EmailTabScreen]}
        onIndexChange={onIndexChange}
      />
    </Body>
  )
}

export default FindPW
