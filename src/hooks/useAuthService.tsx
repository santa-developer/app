import loginApi from '@api/login.api'
import memberApi from '@api/member.api'
import { Dev } from '@constants'
import { LoginInfo, LoginType } from '@models/Auth/LOGIN'
import { SocialInfo, SocialType } from '@models/Auth/USER_INFO'
import MEBR from '@models/MEBR'
import { SignUpUserInfoState } from '@recoil/atoms/Auth/signUp'
import {
  isLoggedInState,
  isMebrFollowState,
  manageSpaceListState,
} from '@recoil/atoms/auth'
import {
  decCommnetState,
  decDateState,
  decItemState,
} from '@recoil/atoms/common'
import { loginedUserInfoSelector } from '@recoil/selectors/Auth/auth'
import NavigationService from '@service/NavigationService'
import StorageService, { StorageKey } from '@service/StorageService'
import aesEncrypt from '@utils/AesEncrypt'
import $t from 'i18n'
import _ from 'lodash'
import { NativeModules } from 'react-native'
import {
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { useAlert } from './useCommonAlert'

type ReturnType = {
  login: (
    type: LoginType,
    params: {
      userId?: string | undefined
      userPassword?: string | undefined
      nationIso2?: string | undefined
      clpnNmbr?: string | undefined
      ctfcNmbr?: string | undefined
      socialId?: string | undefined
      socialType?: SocialType | undefined
      rcToken?: string | undefined
    }
  ) => Promise<{
    isLogin: boolean
    errorMessage: string
    memSttsCode?: number
  }>
  isLogin: () => Promise<boolean>
  isManageSpace: (hispMgmtNmbr: string) => boolean
  hasLoggedIn: () => boolean
  logout: () => Promise<void>
  snsSignOut: (socialType: SocialType) => Promise<void>
  navigateAfterLogin: (originPwd?: string) => void
  navigateToSocialSignUp: (
    socialId: string,
    socialType: SocialType,
    userEmil?: string
  ) => void
  getSNSName: (list?: SocialType[]) => string
  join: (stepNo: number) => Promise<void>
}

function useAuthService(): ReturnType {
  // state
  const [loginedUserInfo, setLoginedUserInfo] = useRecoilState(
    loginedUserInfoSelector
  )
  const [manageSpaceList, setManageSpaceList] = useRecoilState(
    manageSpaceListState
  )
  const [signUpUserInfo, setSignUpUserInfo] = useRecoilState(
    SignUpUserInfoState
  )

  const setIsLoggedIn = useSetRecoilState(isLoggedInState)
  const setIsMebrFollow = useSetRecoilState(isMebrFollowState)
  const setDecCommnet = useSetRecoilState(decCommnetState)
  const setDecItem = useSetRecoilState(decItemState)
  const setDecDate = useSetRecoilState(decDateState)

  const resetSignUpUserInfo = useResetRecoilState(SignUpUserInfoState)

  const alert = useAlert()

  /** 로그인 */
  const login = async (
    type: LoginType,
    params: {
      userId?: string
      userPassword?: string
      nationIso2?: string
      clpnNmbr?: string
      ctfcNmbr?: string
      socialId?: string
      socialType?: SocialType
      rcToken?: string
    }
  ): Promise<{
    isLogin: boolean
    errorMessage: string
    memSttsCode?: number
  }> => {
    let result
    const { userId, userPassword }: LoginInfo = params

    switch (type) {
      case LoginType.Social:
        const { socialId, socialType }: SocialInfo = params
        result = await loginApi.login.reCaptcha.loginProc.post({
          socialId,
          socialType,
        })
        break
      case LoginType.SignUp:
        result = await loginApi.login.loginProc.post({
          userId,
          userPassword,
        })
        break
      case LoginType.ID:
        result = await loginApi.login.reCaptcha.loginProc.post({
          userId,
          userPassword,
          rcToken: params.rcToken,
        })
        break
    }

    if (result.check) {
      let failMsg = ''
      if (!_.isEmpty(result.decItem)) {
        if (result.decItem === '03') {
          failMsg = $t(`USER.USER_STC_FAIL_${result.decItem}`)
        } else {
          failMsg = $t(
            `USER.USER_STC_FAIL_${result.decItem}`,
            result.decDate || ''
          )
        }
        setDecCommnet(failMsg)
        setDecItem(result.decItem || '')
        setDecDate(result.decDate || '')
      }

      const {
        tokenSet,
        userInfo,
        spaceList,
      }: {
        tokenSet: { accessToken: string; refreshToken: string }
        userInfo: MEBR
        spaceList: string[]
      } = result.response

      if (userInfo?.limitAgeYn === 'Y') {
        return {
          isLogin: false,
          errorMessage: $t('USER.USER_STC_50'),
        }
      }

      await StorageService.setItem(
        StorageKey.accessToken,
        tokenSet.accessToken
      )

      await StorageService.setItem(
        StorageKey.refreshToken,
        tokenSet.refreshToken
      )
      setManageSpaceList(spaceList)
      setLoginedUserInfo(userInfo)

      // 메신저 api 처리

      return {
        isLogin: true,
        errorMessage: failMsg || '',
      }
    } else {
      if (
        !_.isEmpty(result.decItem) &&
        (result.decItem === '04' || result.decItem === '05')
      ) {
        const failMsg = $t(
          `USER.USER_STC_FAIL_${result.decItem}`,
          result.decDate || ''
        )
        return {
          isLogin: false,
          errorMessage: failMsg,
        }
      }

      if (result.code === 410) {
        const {
          userInfo,
          tokenSet,
        }: {
          tokenSet: { accessToken: string; refreshToken: string }
          userInfo: MEBR
          spaceList: string[]
        } = result.response

        await StorageService.setItem(
          StorageKey.accessToken,
          tokenSet.accessToken
        )
        await StorageService.setItem(
          StorageKey.refreshToken,
          tokenSet.refreshToken
        )
        setLoginedUserInfo(userInfo)

        // todo: 메신저 api 처리
      }

      return {
        isLogin: false,
        errorMessage: $t(result.messageLocaleCode),
        // errorMessage: result.response
        //   ? localeStringParser(result.message, Number(result.etcData))
        //   : result.message,
        memSttsCode: result.code,
      }
    }
  }

  /**
   * acTocken 로그인 (앱 실행시 실행)
   */
  const isLogin = async (): Promise<boolean> => {
    const controller = new AbortController()

    const timeout = setTimeout(() => {
      controller.abort()
      logout()
    }, 30000)

    const result = await loginApi.login.loginProcWithAc.get(
      controller.signal
    )
    clearTimeout(timeout)

    if (result.check) {
      const {
        spaceList,
        userInfo,
        tokenSet: { accessToken },
      } = result.response
      const {
        // userId,
        // mebrFileMgmtNmbr,
        // mebrMgmtNmbr,
        // birthDay,
        clpnChngYn,
        emailCtfcYn,
      } = userInfo

      let failMsg = ''
      if (!_.isEmpty(result.response.decItem)) {
        const { decItem, decDate } = result.response
        if (decItem === '03') {
          failMsg = $t(`USER.USER_STC_FAIL_${decItem}`)
        } else {
          failMsg = $t(`USER.USER_STC_FAIL_${decItem}`, decDate || '')
        }
        setDecCommnet(failMsg)
        setDecItem(decItem || '')
        setDecDate(decDate || '')
      }

      const isClpnCnge = clpnChngYn === 'Y'
      const noEmailCert =
        _.isNil(emailCtfcYn) ||
        _.isEmpty(emailCtfcYn) ||
        emailCtfcYn === 'N'

      if (noEmailCert || isClpnCnge) {
        // 생일 체크
        setIsLoggedIn(false)
        return false
      } else if (userInfo?.limitAgeYn === 'Y') {
        // 연령 체크
        alert({ desc: $t('USER.USER_STC_50') })
        setIsLoggedIn(false)
        return false
      } else {
        setManageSpaceList(spaceList)
        setLoginedUserInfo(userInfo)
        await StorageService.setItem(
          StorageKey.accessToken,
          accessToken
        )

        // todo: sendbird 작업
        // await SendBirdService.user.loginProcess({
        //   userId,
        //   mebrFileMgmtNmbr,
        //   mebrMgmtNmbr,
        // })
        setIsLoggedIn(true)
        return true
      }

      // this.sendDeviceInfo()
      // setisLoggedIn = true
      // return true
    } else {
      if (
        result?.response?.decItem &&
        !_.isEmpty(result?.response.decItem)
      ) {
        const { decItem, decDate } = result.response
        const failMsg = $t(
          `USER.USER_STC_FAIL_${decItem}`,
          decDate || ''
        )
        alert({
          desc: failMsg,
          onPressConfirm: () => {
            setIsLoggedIn(false)
          },
        })
      } else {
        setIsLoggedIn(false)
      }
      return false
    }
  }

  /**
   * sns 로그인 회원가입으로 이동
   */
  const navigateToSocialSignUp = (
    socialId: string,
    socialType: SocialType,
    userEmil?: string
  ): void => {
    // 애플로그인시 전화번호 수집은 옵션 (활동제한)
    resetSignUpUserInfo()
    setSignUpUserInfo({
      ...signUpUserInfo,
      socialType,
      socialId,
      userEmil: userEmil ? (signUpUserInfo.userEmil = userEmil) : '',
    })
    setTimeout(() => {
      NavigationService.navigate(
        socialType === SocialType.Apple
          ? 'SignUpStepBirth'
          : 'SignUpStepEmail'
      )
    }, 300)
  }

  const isManageSpace = (hispMgmtNmbr: string): boolean =>
    hispMgmtNmbr ? manageSpaceList.includes(hispMgmtNmbr) : false

  /**
   * 로그인 여부
   */
  const hasLoggedIn = (): boolean =>
    _.some(loginedUserInfo && loginedUserInfo.mebrMgmtNmbr)

  /**
   * 로그아웃
   */
  const logout = async (): Promise<void> => {
    // await SendBirdService.user.logout() // todo: sendbird 로그아웃
    // await removeDveToken()
    await StorageService.removeItem(StorageKey.accessToken)
    await StorageService.removeItem(StorageKey.refreshToken)
    // MainQuestListStore.init()
    // SpaceQuestStore.init()

    setLoginedUserInfo(new MEBR(''))
    setIsMebrFollow({})
    setIsLoggedIn(false)

    setDecCommnet('')
    setDecItem('')
    setDecDate('')
    // NFTMainListStore.reset()
  }

  /**
   * SNS 계정 확인 후 해당 계정 로그아웃 처리
   * @param socialType
   * @private
   */
  const snsSignOut = async (
    socialType: SocialType
  ): Promise<void> => {
    try {
      switch (socialType) {
        case SocialType.Facebook:
          // await LoginManager.logOut()
          break
        case SocialType.Google:
          // await GoogleSignin.revokeAccess() // 계정 해제
          // await GoogleSignin.signOut()
          break
        case SocialType.Apple:
          await NativeModules.AppleSigin.deleteAppleAuthorization()
          break
        default:
          break
      }
    } catch (e) {
      // Alert.alert({ desc: _.toString(e) })
    }
  }

  /**
   * 로그인 후 화면이동
   * - 아이디 로그인 후
   * - SNS 로그인 후
   * @param originPwd
   */
  const navigateAfterLogin = (originPwd?: string): void => {
    const { mebrSttsCode, birthDay, emailCtfcYn } = loginedUserInfo

    const noEmailCertified = emailCtfcYn === 'N'
    const noBirthDay = _.isEmpty(birthDay)

    switch (mebrSttsCode) {
      // 휴면 계정
      case '40':
        if (noEmailCertified) {
          NavigationService.navigate('LoginStepEmail')
        } else {
          NavigationService.navigate('PassAuthScreen', {
            urlType: 'dormancy',
            kmcUrlCode: '02',
          })
        }

        break
      // 비밀번호 재설정
      case '60':
        if (noEmailCertified) {
          NavigationService.navigate('LoginStepEmail')
        } else if (noBirthDay) {
          NavigationService.navigate('LoginStepBirth')
        } else if (originPwd) {
          NavigationService.navigate('ResetPWUpdate')
        } else {
          setIsLoggedIn(true)
        }
        break
      // 일반
      default:
        if (noBirthDay) {
          NavigationService.navigate('LoginStepBirth')
        }
        if (noEmailCertified) {
          NavigationService.navigate('LoginStepEmail')
        } else {
          setIsLoggedIn(true)
        }
        break
    }
  }

  /**
   * sns 이름 가져오기
   * @param list
   * @returns
   */
  const getSNSName = (list?: SocialType[]): string => {
    return list
      ? list
          .join(', ')
          .replace(SocialType.Facebook, $t('COMM.COMM_WORD_FACEBOOK'))
          .replace(SocialType.Google, $t('COMM.COMM_WORD_GOOGLE'))
          .replace(SocialType.Apple, $t('COMM.COMM_WORD_APPLE'))
          .replace(SocialType.Hiblocks, $t('COMM.COMM_WORD_HIBLOCKS'))
      : ''
  }

  /**
   * 회원가입
   * @param stepNo
   */
  const join = async (stepNo: number): Promise<void> => {
    const TOTAL_STEP = 3

    if (stepNo > TOTAL_STEP) {
      const params = { ...signUpUserInfo }

      params.agrtMrktYn = signUpUserInfo.maketing ? 'Y' : 'N'
      const pswd = aesEncrypt(signUpUserInfo.pswd)
      params.pswd = pswd

      const result = await memberApi.member.joinproc.post(params)
      Dev.jsonLog({ result })
      if (result.check) {
        // signUpState default로 초기화
        resetSignUpUserInfo()
        alert({
          desc: $t('USER.USER_STC_02'),
          onPressConfirm: () => {
            NavigationService.navigate('Auth')
            // , {
            //   userId: result.response.userId,
            // })
          },
        })
      } else {
        stepNo = 3
        alert({
          desc: $t(result.messageLocaleCode),
        })
      }
    }
    setSignUpUserInfo({ ...signUpUserInfo, nowStep: stepNo })
  }

  return {
    login,
    isLogin,
    isManageSpace,
    hasLoggedIn,
    logout,
    snsSignOut,
    navigateAfterLogin,
    navigateToSocialSignUp,
    getSNSName,
    join,
  }
}

export default useAuthService
