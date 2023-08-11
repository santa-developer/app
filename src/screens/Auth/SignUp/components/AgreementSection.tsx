import CheckBox from '@components/CheckBox'
import { SignUpUserInfoState } from '@recoil/atoms/Auth/signUp'
import AgreementModal from '@screens/Agreement'
import $t from 'i18n'
import React, { useState } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRecoilState } from 'recoil'
import styled from 'styled-components/native'

function AgreementSection(): React.JSX.Element {
  const [userInfo, setUserInfo] = useRecoilState(SignUpUserInfoState)

  // 약관 페이지 visible 여부
  const [isTerms, setIsTerms] = useState(false)
  const [isPerson, setIsPerson] = useState(false)
  const [isFourteen, setIsFourteen] = useState(false)
  const [isMarketing, setIsMarketing] = useState(false)

  const _handlePressTermsBtn = (): void => {
    setIsTerms(true)
  }
  const _handlePressPersonInfo = (): void => {
    setIsPerson(true)
  }
  const _handlePressPolicyBtn = (): void => {
    setIsFourteen(true)
  }
  const _handlePressMarketingBtn = (): void => {
    setIsMarketing(true)
  }

  function Chevron(): JSX.Element {
    return (
      <Icon
        name={'chevron-right'}
        color={'#8b8b8b'}
        type={'light'}
        size={12}
      />
    )
  }

  return (
    <View>
      <CheckView>
        <CheckBox
          checked={
            userInfo.termsOfUse &&
            userInfo.privacyPolicy &&
            userInfo.personInfo &&
            userInfo.maketing
          }
          onPress={(): void => {
            const flag =
              userInfo.termsOfUse &&
              userInfo.privacyPolicy &&
              userInfo.personInfo &&
              userInfo.maketing

            setUserInfo({
              ...userInfo,
              termsOfUse: !flag,
              privacyPolicy: !flag,
              personInfo: !flag,
              maketing: !flag,
            })
          }}
          // title={'전체동의'}
          title={$t('USER.USER_WORD_18')}
        />
      </CheckView>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#f0f0f0',
          marginVertical: 5,
        }}
      />

      <View>
        <CheckView>
          <CheckBox
            bodyStyle={{ flex: 1 }}
            checked={userInfo.privacyPolicy}
            onPress={(): void => {
              setUserInfo({
                ...userInfo,
                privacyPolicy: !userInfo.privacyPolicy,
              })
            }}
            // title={'[필수] 만 14세 이상입니다.'}
            title={`[${$t('USER.USER_WORD_40')}] ${$t(
              'USER.USER_WORD_42'
            )}`}
          />
          <TouchableOpacity
            onPress={_handlePressPolicyBtn}
            hitSlop={10}
          >
            <Chevron />
          </TouchableOpacity>
        </CheckView>

        <CheckView>
          <CheckBox
            bodyStyle={{ flex: 1 }}
            checked={userInfo.termsOfUse}
            onPress={(): void => {
              setUserInfo({
                ...userInfo,
                termsOfUse: !userInfo.termsOfUse,
              })
            }}
            // title={'[필수] 이용약관'}
            title={`[${$t('USER.USER_WORD_40')}] ${$t(
              'USER.USER_WORD_16'
            )}`}
          />
          <TouchableOpacity
            onPress={_handlePressTermsBtn}
            hitSlop={10}
          >
            <Chevron />
          </TouchableOpacity>
        </CheckView>

        <CheckView>
          <CheckBox
            bodyStyle={{ flex: 1 }}
            checked={userInfo.personInfo}
            onPress={(): void => {
              setUserInfo({
                ...userInfo,
                personInfo: !userInfo.personInfo,
              })
            }}
            // title={'[필수] 개인정보 수집 및 이용동의'}
            title={`[${$t('USER.USER_WORD_40')}] ${$t(
              'USER.USER_WORD_38'
            )}`}
          />
          <TouchableOpacity
            onPress={_handlePressPersonInfo}
            hitSlop={10}
          >
            <Chevron />
          </TouchableOpacity>
        </CheckView>

        <CheckView>
          <CheckBox
            bodyStyle={{ flex: 1 }}
            checked={userInfo.maketing}
            onPress={(): void => {
              setUserInfo({
                ...userInfo,
                maketing: !userInfo.maketing,
              })
            }}
            // title={'[선택] 마케팅 정보 수신동의'}
            title={`[${$t('USER.USER_WORD_41')}] ${$t(
              'USER.USER_WORD_39'
            )}`}
          />
          <TouchableOpacity
            onPress={_handlePressMarketingBtn}
            hitSlop={10}
          >
            <Chevron />
          </TouchableOpacity>
        </CheckView>
      </View>
      {/* 모달 */}
      <AgreementModal
        isTerms={isTerms}
        isFourteen={isFourteen}
        isMarketing={isMarketing}
        isPerson={isPerson}
        setIsTerms={setIsTerms}
        setIsFourteen={setIsFourteen}
        setIsMarketing={setIsMarketing}
        setIsPerson={setIsPerson}
      />
    </View>
  )
}

export default AgreementSection

export const CheckView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`
