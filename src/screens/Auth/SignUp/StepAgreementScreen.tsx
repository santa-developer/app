import Body from '@components/Body'
import { BottomButtonOne } from '@components/BottomButton'
import { CommonHeader } from '@components/Header'
import useAuthService from '@hooks/useAuthService'
import { StackNavigationOptions } from '@react-navigation/stack'
import { SignUpUserInfoState } from '@recoil/atoms/Auth/signUp'
import $t from 'i18n'
import React from 'react'
import { useRecoilValue } from 'recoil'
import AgreementSection from './components/AgreementSection'

/**
 * sns 가입 이메일 존재하는 계정 약관동의
 * @returns
 */
function StepAgreement(): React.JSX.Element {
  const { join } = useAuthService()
  const userInfo = useRecoilValue(SignUpUserInfoState)

  return (
    <Body
      bottomComponent={
        <BottomButtonOne
          text={$t('COMM.COMM_WORD_NEXT')}
          // text={'다음'}
          onPress={async (): Promise<void> => {
            await join(4)
          }}
          buttonType={
            // [선택] 마케팅 제외
            userInfo.termsOfUse &&
            userInfo.privacyPolicy &&
            userInfo.personInfo
              ? 'active'
              : 'enabled'
          }
        />
      }
      style={{ justifyContent: 'space-between' }}
    >
      <AgreementSection />
    </Body>
  )
}

export default StepAgreement

/**
 * navigation 옵션
 */
StepAgreement.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('USER.USER_WORD_12'),
    // title: '약관동의',
  })
}
