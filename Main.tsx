import React, { useEffect, JSX, useState } from 'react'
import { Platform, StatusBar, View } from 'react-native'
import styled from 'styled-components/native'
// import { DownloadProgress } from 'react-native-code-push'
import NetInfo, {
  NetInfoState,
} from '@react-native-community/netinfo'
import { useRecoilState } from 'recoil'
import {
  isServerAccessibleState,
  isWiFiEnabledState,
  userAgentState,
} from '@recoil/atoms/common'
import ServerCheckingScreen from './src/screens/Common/SystemPage/ServerCheckingScreen'
import deviceInfo from 'react-native-device-info'
import RNExitApp from 'react-native-exit-app'
import Splash from 'react-native-splash-screen'
import JailMonkey from 'jail-monkey'
import { Dev, Const } from '@constants'
import VersionManageService from '@service/VersionManageService'
import { DatabaseProvider } from '@service/database/DatabaseContext'
import AppNavigator from './src/navigation/AppNavigator'
import Alert from '@components/Alert'
import Toast from '@components/Toast'
import { configureFontAwesomePro } from 'react-native-fontawesome-pro'
import { LoadingPage } from '@components/Loading/LoadingScreen'
import useAxiosInterceptor from '@hooks/useAxiosInterceptor'
import {
  FilePath,
  setDefaultMsg,
  writeFile,
} from '@service/FileService'
import { initI18n } from 'i18n'
import msgApi from '@api/msg.api'
import KYCPopUp from '@screens/KYC/components/KYCPopUp'

configureFontAwesomePro()

function Main(): JSX.Element {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  useAxiosInterceptor()

  const [isServerAccessible, setIsServerAccessible] = useRecoilState(
    isServerAccessibleState
  )
  const [, setIsWiFiEnable] = useRecoilState(isWiFiEnabledState)
  const [, setUserAgent] = useRecoilState(userAgentState)
  // const [progress, setProgress] = useState<DownloadProgress>()
  const [, setNeedUpdate] = useState(false)

  const _checkIsRecentVersion = async (): Promise<void> => {
    if (!(await VersionManageService.isLatestVersion())) {
      setNeedUpdate(true)
    }
  }

  // 다국어 메세지 가져오기
  const _loadingDataFromServer = async (): Promise<void> => {
    return msgApi.msg.listProc
      .get()
      .then(async (result) => {
        if (result.check) {
          await writeFile(
            FilePath.localeMsg,
            JSON.stringify(result.response)
          )
        } else {
          await setDefaultMsg()
        }
      })
      .catch(async () => {
        await setDefaultMsg()
      })
      .finally(async () => {
        await initI18n()
      })
  }

  const initializeProject = async (): Promise<void> => {
    // 루팅 & 탈옥 단말 확인
    if (JailMonkey.isJailBroken()) {
      if (Platform.OS === 'ios') {
        // Alert.toast({
        //   desc: '탈옥이나 루팅을 통한 비정상 단말의 경우 지원하지 않습니다.',
        // })
        setTimeout(() => {
          RNExitApp.exitApp() // ios 앱 종료
        }, 3000)
        Dev.log(JailMonkey.jailBrokenMessage())
      } else {
        // Alert.toast({
        //   desc: '탈옥이나 루팅을 통한 비정상 단말의 경우 지원하지 않습니다.',
        // })
        setTimeout(() => {
          // BackHandler.exitApp() // and 앱 종료
        }, 3000)
      }
    }
    Dev.log('App.tsx : 탈옥 & 루팅 단말 확인')

    // await rmConfig.init()
    // Dev.log('App.tsx : Firebase Remote Config 수신 완료')

    Dev.log('App.tsx : 생체인증 기능 확인 완료')
    if (
      // (await rmConfig.getString('SERVER_AVAILABLE_PROD')) === 'N' &&
      !Const.IS_DEV
    ) {
      Splash.hide()
      setIsServerAccessible(false)
    } else {
      _checkIsRecentVersion()
      Dev.log('App.tsx : 앱 버전 확인 완료')

      // await CommonService.log.post()
      // CodePushService.sync({
      //   downloadProgressCallback: setProgress,
      // }).then((value) => {
      //   Dev.log('SyncStatus:::' + JSON.stringify(value))
      //   Dev.log('App.tsx : CodePush 버전 확인 완료')
      //   // value !== SyncStatus.UP_TO_DATE && Splash.hide()
      // })

      // CommonStore.fontScale = await deviceInfo.getFontScale()
      Dev.log('App.tsx : 폰트스케일 체크...')

      await _loadingDataFromServer()
      Dev.log('App.tsx : 언어 데이터 로딩 완료')

      Dev.log('App.tsx : 스플래시 종료')
      Splash.hide()
      // configurePushNotification()
      setLoadingComplete(true)
    }
  }

  useEffect(() => {
    // Wi-Fi 연결 확인
    const netInfoUnsubscribe = NetInfo.addEventListener(
      (state: NetInfoState) => {
        setIsWiFiEnable(
          !!(state.isConnected && state.type === 'wifi')
        )
      }
    )

    // 디바이스 UserAgent
    deviceInfo.getUserAgent().then((v) => setUserAgent(() => v))

    initializeProject().then(() => {
      // AppState.addEventListener('change', _handleAppStateChange)
    })

    return (): void => {
      netInfoUnsubscribe()
    }
  }, [])

  return !isServerAccessible ? (
    <ServerCheckingScreen />
  ) : !isLoadingComplete ? (
    <View />
  ) : (
    <Wrapper>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'white'}
      />
      <DatabaseProvider>
        <AppNavigator />

        <LoadingPage />
        <Alert />
        <Toast />
        <KYCPopUp />
      </DatabaseProvider>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  flex: 1;
`

export default Main
