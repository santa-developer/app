import { Const, Dev } from '@constants'
import {
  BioConfirmProps,
  IsSensorAvailableResult,
} from '@models/Common/BIOMETRICS'
import $t from 'i18n'
import { Alert, Linking, Platform } from 'react-native'
import ReactNativeBiometrics, {
  BiometryType,
} from 'react-native-biometrics'
import StorageService, { StorageKey } from './StorageService'

class BiometricsService {
  // 생체 인증 가능여부
  _sensor: IsSensorAvailableResult = { available: false }
  rnBiometrics = new ReactNativeBiometrics()

  constructor() {
    this.isAvailable().then((value) => {
      Dev.jsonLog({ bioInfo: value })
    })
  }

  readonly getSensorTypeName = (): string => {
    return Platform.select({
      ios: 'Touch ID / Face ID',
      // this._sensor?.biometryType?.replace('ID', ' ID') ||
      // $t('USER.USER_STC_54'),
      default: $t('USER.USER_STC_54'), // 생체 인식
    })
  }

  isAvailable = async (): Promise<IsSensorAvailableResult> => {
    const result = await this.rnBiometrics.isSensorAvailable()
    this._sensor = { ...result }
    return result
  }

  get sensor(): {
    available: boolean
    biometryType?: BiometryType
    error?: string
  } {
    return this._sensor
  }

  /**
   * 생체 인증정보 현재 로그인 정보로 갱신
   */
  updateBioToken = async (): Promise<void> => {
    const refreshToken = await StorageService.getItem(
      StorageKey.refreshToken
    )
    if (this.sensor.available && refreshToken) {
      await StorageService.setItem(
        StorageKey.BIOMETRICS_LOGIN_RE_TOKEN,
        refreshToken
      )
    }
  }

  /**
   * 생체 인증 정보 변경
   * @param token 토큰
   */
  setBioToken = async (token: string): Promise<void> => {
    await StorageService.setItem(
      StorageKey.BIOMETRICS_LOGIN_RE_TOKEN,
      token
    )
  }

  /**
   * 생체 인증 정보 삭제
   */
  removeBioToken = async (): Promise<void> => {
    await StorageService.removeItem(
      StorageKey.BIOMETRICS_LOGIN_RE_TOKEN
    )
  }

  /**
   * 생체 인증 정보 호출
   */
  getBioToken = async (): Promise<string | null> => {
    return await StorageService.getItem(
      StorageKey.BIOMETRICS_LOGIN_RE_TOKEN
    )
  }

  /**
   * 생체인증 프롬프트 실행
   * @param BioConfirmProps
   * @return 예외 발생 : false
   */
  openPrompt = async (props: BioConfirmProps): Promise<boolean> => {
    return new Promise((resolve) => {
      this.isAvailable().then((value) => {
        this._sensor = value
        const { available, error } = value
        Dev.log(value)
        if (available) {
          // 1.2.1 생체 사용 가능
          this.rnBiometrics
            .simplePrompt({
              promptMessage: $t('COMM.COMM_WORD_10'), // '본인 인증',
              cancelButtonText: $t('COMM.COMM_WORD_CANCEL'), // '취소',
            })
            .then(async (simplePromptResult) => {
              await props.onPressConfirm?.(simplePromptResult)
              resolve(true)
              // console.log('successful biometrics provided')
            })
            .catch(async (reason) => {
              alert(reason.message)
              resolve(false)
              // console.log(error)
            })
        } else if (error) {
          // 1.2.2 생체 사용 불가 + error
          let alertProps = {
            message: '',
            onPress: () => resolve(true),
          }

          // 1.2.2.1 생체 사용 불가 os 별 처리
          if (Platform.OS === 'ios') {
            if (
              error.includes('Code=-7') ||
              error.includes('Code=-5')
            ) {
              alertProps.message = $t('USER.USER_STC_59') // '생체 인식 기능이 기기에 등록되어있지 않습니다.'
            } else if (error.includes('Code=-6')) {
              // 앱 내 미사용 체크
              alertProps = {
                message: $t(
                  'USER.USER_STC_60',
                  this.getSensorTypeName()
                ),
                onPress: (): void => {
                  Linking.openSettings()
                  resolve(true)
                },
              }
            } else if (error.includes('Code=-8')) {
              // 잠김
              alertProps.message = $t('USER.USER_STC_61') //'인증 실패 횟수가 초과되었습니다. 시스템 설정을 확인해주세요.'
            } else {
              alertProps = {
                message: Const.IS_DEV
                  ? error
                  : $t('WALT.WALT_STC_15'), // '지원하지 않는 기기입니다.'
                onPress: (): void => {
                  resolve(false)
                },
              }
            }
          } else if (Platform.OS === 'android') {
            switch (error) {
              case 'BIOMETRIC_ERROR_HW_UNAVAILABLE':
              case 'BIOMETRIC_ERROR_NONE_ENROLLED':
                alertProps.message = $t('USER.USER_STC_59') // '생체 인식 기능이 기기에 등록되어있지 않습니다.'
                break
              case 'BIOMETRIC_ERROR_NO_HARDWARE':
                alertProps.message = $t('WALT.WALT_STC_15') // '지원하지 않는 기기입니다.'
                break
              default:
                alertProps = {
                  message: Const.IS_DEV
                    ? error
                    : $t('WALT.WALT_STC_15'), // '지원하지 않는 기기입니다.'
                  onPress: (): void => {
                    resolve(false)
                  },
                }
                break
            }
          }
          Alert.alert('', alertProps.message, [
            {
              text: $t('COMM.COMM_WORD_CONFIRM'),
              onPress: alertProps.onPress,
            },
          ])
        } else {
          // 1.2.3 생체 사용 불가
          Alert.alert(
            '',
            $t('WALT.WALT_STC_15'), // '지원하지 않는 기기입니다.'
            [
              {
                text: $t('COMM.COMM_WORD_CONFIRM'),
                onPress: () => resolve(true),
              },
            ]
          )
        }
      })
    })
  }

  /** 생체인식 사용여부 확인 alert */
  confirmSensor = async (
    props: BioConfirmProps
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      Alert.alert($t('USER.USER_STC_52'), $t('USER.USER_STC_53'), [
        {
          text: $t('COMM.COMM_WORD_CONFIRM'),
          onPress: async (): Promise<void> => {
            resolve(await this.openPrompt(props))
          },
        },
        {
          text: $t('COMM.COMM_WORD_CANCEL'),
          onPress: (): void => {
            props.onPressCancel?.()
            resolve(true)
          },
        },
      ])
    })
  }
}

export default new BiometricsService()
