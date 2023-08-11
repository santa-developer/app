import Body from '@components/Body'
import { CommonHeader } from '@components/Header'
import Hr from '@components/Hr'
import Text from '@components/Text'
import ToggleSwitch from '@components/ToggleSwitch'
import { Colors } from '@constants'
import { useConfirm } from '@hooks/useCommonAlert'
import { StackNavigationOptions } from '@react-navigation/stack'
import NavigationService from '@service/NavigationService'
import $t from 'i18n'
import React, { useState } from 'react'
import styled from 'styled-components/native'

/**
 * 설정 - 보안/인증
 * @returns
 */
export default function Verfication(): React.JSX.Element {
  const confirm = useConfirm()
  // const BioTypeName = useBiometrics().getSensorTypeName()
  const BioTypeName = 'TouchId / FaceID'
  const [loginBio, setLoginBio] = useState(true)
  const [transferHipsBio, setTransferHipsBio] = useState(true)

  // 로그인 생체인식 토글 on/off
  const onPressLoginBio = async (): Promise<void> => {
    if (!loginBio) {
      setLoginBio(true)
    } else {
      confirm({
        desc: $t('USER.USER_STC_57'),
        onPressConfirm: () => setLoginBio(false),
      })
    }
    // todo: bio 기능 추가
    // if (loginBiometrics) {
    //   await BiometricsStore.confirmSensor({
    //     onPressConfirm: async ({ success }): Promise<void> => {
    //       if (success) {
    //         await BiometricsStore.updateBioToken()
    //         setLoginBio(true)
    //       }
    //     },
    //     onPressCancel: async (): Promise<void> => {
    //       await BiometricsStore.removeBioToken()
    //     },
    //   })
    // } else {
    //   alert({
    //     desc: $t('USER.USER_STC_57'),
    //     onPressConfirm: async () => {
    //       await BiometricsStore.removeBioToken()
    //       setLoginBio(false)
    //     },
    //   })
    // }
  }

  const onPressTransferHipsBio = async (): Promise<void> => {
    if (!transferHipsBio) {
      setTransferHipsBio(true)
    } else {
      confirm({
        desc: $t('USER.USER_STC_57'),
        onPressConfirm: () => setTransferHipsBio(false),
      })
    }
  }

  return (
    <Body scrollable>
      {/* BioSetting */}
      <SettingItemText>{BioTypeName}</SettingItemText>
      <SettingList disabled>
        <ListTitle>{$t('USER.USER_WORD_LOGIN')}</ListTitle>
        <ToggleSwitch isOn={loginBio} onPress={onPressLoginBio} />
      </SettingList>
      <SettingList disabled>
        <ListTitle>HIBS {$t('COMM.COMM_WORD_TRANSFER')}</ListTitle>
        <ToggleSwitch
          isOn={transferHipsBio}
          onPress={onPressTransferHipsBio}
        />
      </SettingList>

      {/* 인증비밀번호 재설정 */}
      <Hr borderColor={Colors.bg1} style={{ marginVertical: 13 }} />
      <SettingList
        onPress={(): void =>
          NavigationService.push('ResetAuthentication')
        }
      >
        <ListTitle>{$t('WALT.WALT_WORD_02')}</ListTitle>
      </SettingList>

      {/* otp 관리 (가상자산사업자 취득 후 활성화) */}
      {/* <Hr borderColor={Colors.bg1} style={{ marginVertical: 13 }} />
      <SettingList onPress={(): void => Dev.log()}>
        <ListTitle>{$t('KYC.KYC_WORD_93')}</ListTitle>
        <RightText 
          style={{
            color: ${Colors.wh};
            background-color: ${Colors.disabled};
            border-radius: 50px;
            font-size: 12px;
            padding: 5px 12px;
          }}
        >
          {$t(
            loginedUserInfo.otpStatus === 'SUCCESS'
              ? 'COMM.COMM_WORD_38'
              : 'COMM.COMM_WORD_39'
          )}
        </RightText>
      </SettingList>
      <SettingList onPress={(): void => NavigationService.push('')}>
        <ListTitle>
          {
            $t('KYC.KYC_WORD_54') // otp 등록
          }
        </ListTitle>
      </SettingList> */}
    </Body>
  )
}

/**
 * navigation 옵션
 */
Verfication.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('WALT.WALT_WORD_30'),
  })
}

const SettingItemText = styled.Text`
  font-size: 12px;
  color: ${Colors.nagative};
  padding-bottom: 10px;
`
const SettingList = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`
const ListTitle = styled(Text)`
  font-size: 16px;
`
