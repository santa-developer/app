import axios, { HttpStatusCode } from 'axios'
import { useSetRecoilState } from 'recoil'
import { isLoadingShowState } from '@recoil/atoms/common'
import _ from 'lodash'
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useLayoutEffect } from 'react'
import RESPONSE from '@models/Common/RESPONSE'
import NetInfo from '@react-native-community/netinfo'
import { Const, Dev } from '@constants'

export default function useAxiosInterceptor(): void {
  let pending = 0
  const setIsLoadingShow = useSetRecoilState(isLoadingShowState)

  const logout = (): void => {
    Dev.log('logout')
  }

  const checkIfNetworkError = (): void => {
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        // 네트워크 오류 Alert 실행
      }
    })
  }
  // 요청 중인 url
  const showLoadingDebounce = _.debounce((pending: number) => {
    setIsLoadingShow(pending !== 0)
  }, 200)

  // 기본 사용자 API
  axios.defaults.baseURL = Const.API_URL

  useLayoutEffect(() => {
    const request = axios.interceptors.request.use(
      (value: InternalAxiosRequestConfig): any => {
        if (__DEV__) {
          const { method, baseURL, url, params, data } = value
          Dev.log(
            `API 요청\t${method?.toUpperCase()} : ${baseURL}${url} ` +
              (params ? `params: ${JSON.stringify(params)} ` : '') +
              (data ? `data: ${JSON.stringify(data)} ` : '')
          )
        }

        showLoadingDebounce(++pending)
        return value
      },
      (error: any) => Promise.reject(error)
    )

    const response = axios.interceptors.response.use(
      (axiosResponse: AxiosResponse<RESPONSE | any>): any => {
        showLoadingDebounce(--pending)

        // WALLET API
        if (axiosResponse?.config?.baseURL === Const.WALLET_API_URL) {
          return axiosResponse?.data
        } else {
          const {
            code,
            message,
            check,
            decItem,
            decDate,
            response,
            messageLocaleCode,
          } = axiosResponse?.data

          switch (code) {
            case HttpStatusCode.NotAcceptable: // 406
              // refreshToken 재 로그인 처리
              break
            case HttpStatusCode.Unauthorized: // 401
            case 441: // 휴면 계정
            case 442: // 90일 경과
            case 443: // 비밀번호 5회 실패
              logout()
              break
          }

          return new RESPONSE(
            code,
            message,
            messageLocaleCode,
            check,
            response,
            decItem,
            decDate
          )
        }
      },

      (error: any) => {
        const { config, response } = error
        checkIfNetworkError()
        if (__DEV__) {
          Dev.error(
            `API Error : ${JSON.stringify(error)}, url : ${
              config.url
            }`
          )
        }
        // WALLET API
        if (config?.baseURL === Const.WALLET_API_URL) {
          return Promise.reject(error)
        } else {
          if (response?.status === HttpStatusCode.Unauthorized) {
            // refreshToken 재 로그인 처리
          }

          showLoadingDebounce(--pending)
          return Promise.reject(error)
        }
      }
    )
    return (): void => {
      axios.interceptors.request.eject(request)
      axios.interceptors.response.eject(response)
    }
  }, [])
}
