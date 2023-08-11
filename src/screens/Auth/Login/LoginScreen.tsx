import memberApi from '@api/member.api'
import Body from '@components/Body'
import { BodyKeyboardDismiss } from '@components/Common/BodyKeyboardDismiss'
import Text from '@components/Text'
import { Colors, Const } from '@constants'
import useAuthService from '@hooks/useAuthService'
import { useAlert } from '@hooks/useCommonAlert'
import HablLogo from '@images/svg/HablLogo.svg'
import IconApple from '@images/svg/IconApple.svg'
import IconBiometricsAndroid from '@images/svg/IconBiometricsAndroid.svg'
import IconFaceID from '@images/svg/IconFaceID.svg'
import IconGoogle from '@images/svg/IconGoogle.svg'
import IconTouchID from '@images/svg/IconTouchID.svg'
import { LoginType } from '@models/Auth/LOGIN'
import { SocialType } from '@models/Auth/USER_INFO'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import { isLoadingShowState } from '@recoil/atoms/common'
import { confirmSelector } from '@recoil/selectors/alert'
import BiometricsService from '@service/BiometricsService'
import StorageService, { StorageKey } from '@service/StorageService'
import TokenService from '@service/TokenService'
import $t from 'i18n'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {
  NativeModules,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import styled from 'styled-components/native'
import LoginFindSection from './components/LoginFindSection'
import LoginSection from './components/LoginInputSection'
// import { GoogleSignin } from '@react-native-google-signin/google-signin'

export default function LoginScreen(): React.JSX.Element {
  // const [, setCount] = useState(0)
  // const [showPermission, setShowPermission] = useState(false)
  const {
    snsSignOut,
    login,
    isLogin,
    navigateAfterLogin,
    logout,
    navigateToSocialSignUp,
  } = useAuthService()
  const [isAutoLogin, setIsAutoLogin] = useState(true)
  const [bioToken, setBioToken] = useState('')

  const alert = useAlert()
  const setConfirm = useSetRecoilState(confirmSelector)
  const setIsLoadingShow = useSetRecoilState(isLoadingShowState)

  const loginedUserInfo = useRecoilValue(loginedUserInfoState)
  const resetLoginedUserInfo = useResetRecoilState(
    loginedUserInfoState
  )

  /**
   * 모달 visible
   * @param visible
   */
  // function CheckModalVisible(visible: boolean): void {
  //   setCount((val) => {
  //     return visible ? val + 1 : val - 1
  //   })
  // }

  /**
   * 생체정보 아이콘 component
   */
  const IconBiometrics = (): JSX.Element => {
    const props = { height: 50, width: 50 }
    switch (BiometricsService.sensor.biometryType) {
      case 'TouchID':
        return <IconTouchID {...props} />
      case 'FaceID':
        return <IconFaceID {...props} />
      default:
        return <IconBiometricsAndroid {...props} />
    }
  }

  /**
   * 구글 인증 버튼
   * @private
   */
  const _handlePressGoogleButton = async (): Promise<void> => {
    try {
      // const googleUser = await GoogleSignin.signIn()
      // if (googleUser) {
      //   await _signInSNSAsync({
      //     socialId: googleUser.user.id,
      //     socialType: SocialType.Google,
      //     email: {
      //       address: googleUser.user.email || '',
      //     },
      //   })
      // }
    } catch (e) {
      resetLoginedUserInfo()
    }
  }

  /**
   * 애플 인증 버튼
   * @private
   */
  const _handlePressAppleButton = async (): Promise<void> => {
    const AppleSignIn = NativeModules.AppleSigin
    try {
      const result =
        await AppleSignIn.requestAppleAuthorizationUseStored()
      const idData = jwtDecode<{
        email?: string
        email_verified?: boolean
        is_private_email?: boolean
      }>(result.identityToken)

      if (result.user && idData) {
        await _signInSNSAsync({
          email: {
            address: idData.email || '',
            isVerified: idData.email_verified || false,
          },
          socialId: result.user,
          socialType: SocialType.Apple,
        })
      }
    } catch (e) {
      resetLoginedUserInfo()
    }
  }

  /**
   * 생체 인증 버튼
   * @private
   */
  const _handlePressBioButton = async (): Promise<void> => {
    if (bioToken) {
      BiometricsService.openPrompt({
        onPressConfirm: async ({ success }): Promise<void> => {
          if (success) {
            await StorageService.setItem(
              StorageKey.refreshToken,
              bioToken
            )
            const result = await isLogin()
            if (!result) {
              alert({
                title: $t('USER.USER_STC_62'),
                desc: $t('USER.USER_STC_63'),
                onPressConfirm: () => {
                  setBioToken('')
                  BiometricsService.removeBioToken()
                },
              })
            }
          }
        },
      })
    }
  }

  /**
   * 구글 API 사용
   * @private
   */
  // const googleSigninConfigure = async (): Promise<void> => {
  //   const file = require('../../../android/app/google-services.json')
  //   const webClientId = _.find(file.client[0].oauth_client, [
  //     'client_type',
  //     3,
  //   ]).client_id
  //   return GoogleSignin.configure({
  //     webClientId: webClientId,
  //   })
  // }

  /** sns 버튼 리스트 */
  const snsButtonList: {
    show: boolean
    textCode: string
    icon: JSX.Element
    onPress: () => void
  }[] = [
    {
      show: true,
      textCode: 'GOOGLE',
      icon: <IconGoogle />,
      onPress: _handlePressGoogleButton,
    },
    {
      show: Platform.OS === 'ios',
      textCode: 'APPLE',
      icon: <IconApple />,
      onPress: _handlePressAppleButton,
    },
    {
      show: BiometricsService.sensor.available && !!bioToken,
      textCode: 'BIOMETRICS',
      icon: <IconBiometrics />,
      onPress: _handlePressBioButton,
    },
  ]

  /**
   * SNS 로그인 / 가입
   * @private
   * @param params
   */
  const _signInSNSAsync = async (params: {
    socialId: string
    socialType: SocialType
    email: {
      address: string
      isVerified?: boolean
    }
  }): Promise<void> => {
    const { socialId, socialType, email } = params
    setIsLoadingShow(true)
    await snsSignOut(socialType) //SNS계정 확인 후 해당 sns 세션 종료
    // SNS 계정 있는지 체크
    const result = await memberApi.member.snsMemberCk.post({
      socialId,
      socialType,
    })

    // 1. 로그인 화면
    if (result.check) {
      // 1) SNS 로그인/가입 정보를 몾 찾았으므로 로그인 불가능, 가입 유도
      setConfirm({
        desc: $t('API.API_STC_56'),
        onConfirmBtnText: $t('USER.USER_WORD_06'),
        onPressConfirm: (): void => {
          if (email.address.indexOf('privaterelay.appleid.com') > 0) {
            alert({ desc: $t('USER.USER_STC_56') })
          }

          navigateToSocialSignUp(socialId, socialType, email.address)
        },
      })
    } else {
      // 2) 로그인 정보를 찾았으므로 로그인
      login(LoginType.Social, {
        socialId,
        socialType,
      }).then(async ({ isLogin, errorMessage }) => {
        if (isLogin) {
          const recentUserId = await StorageService.getItem(
            StorageKey.RECENT_LOGIN_USER_ID
          )
          const userId = loginedUserInfo.userId
          if (userId !== recentUserId) {
            // await BiometricsStore.removeBioToken()
          }
          navigateAfterLogin()
        } else {
          alert({ desc: errorMessage })
        }
      })
    }
  }

  useEffect(() => {
    // googleSigninConfigure().then()

    BiometricsService.getBioToken().then((value) => {
      value && setBioToken(value)
    })

    TokenService.getAccessToken().then((key) => {
      if (key.trim()) {
        setIsAutoLogin(true)
        isLogin()
          .then((isLogin) => {
            if (!isLogin) {
              setIsAutoLogin(false)
              logout()
            }
          })
          .catch(() => {
            setIsAutoLogin(false)
            logout()
          })
      } else {
        setIsAutoLogin(false)
      }
    })

    // AsyncStorage.getItem('SHOW_PERMISSION').then((value) => {
    //   if (_.isEmpty(value)) {
    //     setTimeout(() => {
    //       setShowPermission(true)
    //       CheckModalVisible(true)
    //     }, 800)
    //   } else {
    //     checkFCMPermission()
    //     HomeStore.isPermissionModal = true
    //     // chkNotice(signal)
    //   }
    // })
  }, [])

  return (
    <>
      <Wrapper useHeader={false}>
        <BodyKeyboardDismiss />
        <LogoBox>
          {Const.IS_DEV && (
            <Text
              size={17}
              color="red"
              bold="bold"
              style={{
                marginBottom: 20,
              }}
            >
              {`개발버전`}
            </Text>
          )}
          <HablLogo width={180} height={44} />
          <Text style={{ marginTop: 12 }}>
            {'Social Media Collecting Platform'}
          </Text>
        </LogoBox>

        <LoginInputBox>
          <LoginSection />
        </LoginInputBox>

        <BottomBox>
          {/* Find Section */}
          <LoginFindSection />

          <MiddleLineBox>
            <HorizonLine />
            <View>
              <MiddleLineText>
                {$t(`USER.USER_STC_55`)}
              </MiddleLineText>
            </View>
            <HorizonLine />
          </MiddleLineBox>
          <SnsButtonBox>
            {snsButtonList
              .filter((value) => value.show)
              .map((item) => {
                return (
                  <TouchableOpacity
                    style={{ marginHorizontal: 12.5 }}
                    key={item.textCode}
                    onPress={item.onPress}
                  >
                    {item.icon}
                  </TouchableOpacity>
                )
              })}
          </SnsButtonBox>
        </BottomBox>
      </Wrapper>
      {isAutoLogin && <LoddingView />}
    </>
  )
}
const Wrapper = styled(Body)`
  align-items: center;
  justify-content: center;
`
const LogoBox = styled.View`
  margin-top: 30px;
  margin-bottom: 25px;
  align-self: center;
  align-items: center;
  justify-content: center;
`
const LoginInputBox = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
`
const BottomBox = styled.View`
  flex-direction: column;
  justify-content: center;
`
const MiddleLineBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const HorizonLine = styled.View`
  width: 30%;
  border-top-width: 1px;
  border-top-color: ${Colors.bg1};
  align-items: center;
  justify-content: center;
`
const MiddleLineText = styled(Text)`
  font-size: 12px;
  color: ${Colors.nagative};
  margin: 0 10px;
`
const SnsButtonBox = styled.View`
  margin-top: 25px;
  flex-direction: row;
  justify-content: center;
`
const LoddingView = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${Colors.wh};
`
