import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import NavTab from '@components/NavTab'
import { FindTempType } from '@models/Auth/FIND'
import { ParamListBase } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { FindUserInfoState } from '@recoil/atoms/Auth/find'
import $t from 'i18n'
import React, { useState } from 'react'
import { Keyboard } from 'react-native'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import EmailTabScreen from './Tab/EmailTabScreen'
import PhoneTabScreen from './Tab/PhoneTabScreen'

/**
 * 아이디 찾기 페이지
 * todo: kebord on && 탭 클릭 시 keyboard 안되는 오류 수정해야함.
 * @param
 * @returns
 */
function FindID({
  navigation,
}: StackScreenProps<ParamListBase>): React.JSX.Element {
  const userInfo = useRecoilValue(FindUserInfoState)
  const resetUserInfo = useResetRecoilState(FindUserInfoState)
  const [, setIndex] = useState(0)

  // tab index change handler
  const onIndexChange = (index: number): void => {
    resetUserInfo()
    setIndex(index)
  }

  const _handlePressNextButton = async (): Promise<void> => {
    Keyboard.dismiss()
    setTimeout(() => navigation.navigate('FindIDResult'), 300)
  }

  return (
    <Body
      hidePadding
      bottomComponent={
        <BottomButtonOne
          buttonType={
            userInfo.ctfcNmbrConfirm || userInfo.userEmilConfirm
              ? 'active'
              : 'enabled'
          }
          text={$t('COMM.COMM_WORD_NEXT')}
          // text={'다음'}
          onPress={_handlePressNextButton}
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

export default FindID
