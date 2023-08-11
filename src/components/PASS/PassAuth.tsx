import React, { useEffect, useRef, useState } from 'react'
import WebView from 'react-native-webview'
import {
  WebViewMessageEvent,
  WebViewNavigation,
  WebViewSourceUri,
} from 'react-native-webview/lib/WebViewTypes'
import { Const, Dev, Layout } from '@constants'
import {
  SafeAreaView,
  NativeEventSubscription,
  BackHandler,
  StyleSheet,
} from 'react-native'
import NavigationService from '@service/NavigationService'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isLoadingShowState } from '@recoil/atoms/common'
import { userAgentState } from '@recoil/atoms/common'
import TokenService from '@service/TokenService'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import { getSecurityValue } from '@utils/ApiUtils'
import { useAlert } from '@hooks/useCommonAlert'
import $t from 'i18n'
import { View } from 'react-native'

const PassAuth = ({
  urlType,
  kmcUrlCode,
}: {
  urlType: string
  kmcUrlCode: string
}): JSX.Element => {
  const webViewRef = useRef<WebView>(null)

  const alert = useAlert()

  const setIsLoadingShow = useSetRecoilState(isLoadingShowState)
  const userAgent = useRecoilValue(userAgentState)

  const [source, setSource] = useState<WebViewSourceUri>()

  const [listener, setListener] = useState<NativeEventSubscription>()
  const [isAuthComplete, setIsAuthComplete] = useState(false)
  const loginedUserInfo = useRecoilValue(loginedUserInfoState)
  const [, setNavState] = useState<WebViewNavigation>({
    url: '',
    canGoBack: false,
    title: '',
    canGoForward: false,
    loading: false,
    lockIdentifier: 0,
    mainDocumentURL: '',
    navigationType: 'click',
  })

  // 사용자 정보 가져오기
  const _onBackPress = (event: WebViewNavigation) => (): boolean => {
    const { canGoBack, url } = event
    if (url.indexOf('/kmcis/error/') > 0) {
      _init()
    } else if (canGoBack) {
      webViewRef?.current?.goBack()
    } else {
      listener?.remove()
      NavigationService.goBack()
    }
    return true
  }

  const _init = async (): Promise<void> => {
    setIsLoadingShow(true)

    setSource({ uri: '' })
    setSource({
      uri: `${Const.API_URL}/userView/auth/kmcPass?kmcUrlCode=${kmcUrlCode}`,
      headers: {
        ...(await getSecurityValue()),
        refreshToken: await TokenService.getRefreshToken(),
        Authorization: await TokenService.getAccessToken(),
        WbMebrMgmtNmbr: loginedUserInfo.mebrMgmtNmbr,
      },
    })
  }

  const _handleNavigationStateChange = (
    event: WebViewNavigation
  ): void => {
    if (!event.loading) {
      setNavState(event)

      listener?.remove()
      setListener(
        BackHandler.addEventListener(
          'hardwareBackPress',
          _onBackPress(event)
        )
      )
    }
  }

  const _handleMessage = ({
    nativeEvent: { data },
  }: WebViewMessageEvent): void => {
    const jsonData = JSON.parse(data)
    Dev.log('jsonData')
    Dev.jsonLog({ jsonData })
    if (jsonData) {
      switch (jsonData.type) {
        case 'close':
          setIsAuthComplete(true)
          break
        default:
          break
      }
    } else {
    }
  }

  useEffect(() => {
    if (isAuthComplete) {
      if (urlType === 'kyc') {
        //PASS 인증 성공 시 본인인증 페이지로 이동
        NavigationService.push('KYCDetailInfo')
      } else if (urlType === 'auth') {
        alert({
          desc: $t('COMM.COMM_STC_SAVE_PROC'), // 저장되었습니다.
          onPressConfirm: (): void => {
            NavigationService.goBack()
          },
        })
      }
    }
  }, [isAuthComplete])

  useEffect(() => {
    _init().then()
    return (): void => {
      urlType === 'dormancy' && listener?.remove()
    }
  }, [])

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        {source?.uri && (
          <WebView
            ref={webViewRef}
            scalesPageToFit
            userAgent={userAgent}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            source={source}
            onLoadEnd={(): void => setIsLoadingShow(false)}
            onNavigationStateChange={_handleNavigationStateChange}
            onMessage={_handleMessage}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

PassAuth.navigationOptions = { headerShown: false }

export default PassAuth

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: Layout.window.height,
  },
})
