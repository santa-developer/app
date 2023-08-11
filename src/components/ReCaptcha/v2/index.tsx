import { Const, Dev } from '@constants'
import React, { useEffect, useState } from 'react'
import { WebView } from 'react-native-webview'
import { getLocale } from '../../../i18n'
import { useRecoilValue } from 'recoil'
import { userAgentState } from '@recoil/atoms/common'
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes'

declare global {
  interface Window {
    setupObservers: any
    ReactNativeWebView: any
  }
}

export const ReCaptchaV2 = (props: {
  onSuccess: (rcToken: string) => void
}): JSX.Element => {
  const { onSuccess } = props
  const userAgent = useRecoilValue(userAgentState)

  const _handleRCEvent = (event: WebViewMessageEvent): void => {
    if (event && event.nativeEvent.data) {
      const data = decodeURIComponent(
        decodeURIComponent(event.nativeEvent.data)
      )
      if (data.startsWith('params:')) {
        Dev.log('params')
        // const params = JSON.parse(data.substring(7))
        // if (params.visibility === 'visible') {
        //   setRcHeight(Layout.window.height - 200 || 100)
        // }
      } else if (['cancel', 'error', 'expired'].includes(data)) {
        Dev.log('cancel', 'error', 'expired')
      } else {
        onSuccess(data)
      }
    }
  }

  const [languageCode, setLanguageCode] = useState<string>('en')

  const siteKey = Const.ENV.reCaptcha.v2
  const baseUrl = Const.ENV.reCaptcha.url

  useEffect(() => {
    Dev.log('ReCaptcha V2 show')
    return (): void => {
      Dev.log('ReCaptcha V2 hide')
    }
  }, [])

  const setContentHeightObserverJsCode = (): string =>
    `(${String(function () {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      window.setupObservers = function () {
        this.document.body.style.visibility = 'visible'
        const iframes = document.getElementsByTagName('iframe')
        const iframe = iframes[iframes.length - 1]
        if (
          iframe &&
          iframe.parentElement &&
          iframe.parentElement.parentElement
        ) {
          const target = iframe.parentElement.parentElement
          const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function () {
              const contentParams = {
                height: iframe.clientHeight + 30,
                visibility: target.style.visibility,
              }
              window.ReactNativeWebView.postMessage(
                `params:` + JSON.stringify(contentParams)
              )
            })
          })
          observer.observe(target, {
            attributes: true,
            attributeFilter: ['style'],
          })
        }
      }
      setTimeout(() => window.setupObservers(), 500)
    })})();`

  const generateTheWebViewContent = (
    languageCode: string
  ): string => `<!DOCTYPE html>
              <html>
          <head>
            <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <script src="https://recaptcha.google.com/recaptcha/api.js?explicit&hl=${
              languageCode || 'en'
            }"></script>
            <script type="text/javascript">
              var onloadCallback = function () { 
              };
              var onDataCallback = function (response) { 
                window.ReactNativeWebView.postMessage(response) 
              };
              var onDataExpiredCallback = function (error) { 
                window.ReactNativeWebView.postMessage("expired"); 
                setTimeout(() => window.setupObservers(), 250);
              };
              var onDataErrorCallback = function (error) { 
                window.ReactNativeWebView.postMessage("error"); 
              }
              var onDataCancelCallback = function (error) { 
                window.ReactNativeWebView.postMessage("cancel"); 
              }
            </script>
          </head>
            <body>
            <div id="captcha" style="text-align: center">
              <div class="g-recaptcha" style="display: inline-block;"
                data-sitekey="${siteKey}" data-callback="onDataCallback"
                data-expired-callback="onDataExpiredCallback"
                data-cancel-callback="onDataCancelCallback"
                data-error-callback="onDataErrorCallback">
              </div>
            </div>
          </body>
              </html>`

  useEffect(() => {
    getLocale().then((value) => {
      setLanguageCode(value)
    })
  }, [])
  return (
    <WebView
      userAgent={userAgent}
      originWhitelist={['*']}
      mixedContentMode={'always'}
      onMessage={_handleRCEvent}
      javaScriptEnabled={true}
      injectedJavaScript={setContentHeightObserverJsCode()}
      automaticallyAdjustContentInsets
      style={{ backgroundColor: 'transparent', width: '100%' }}
      source={{
        html: generateTheWebViewContent(languageCode),
        baseUrl,
      }}
    />
  )
}

export default ReCaptchaV2
