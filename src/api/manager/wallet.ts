import axios from 'axios'

import { Const } from '@constants'
import _ from 'lodash'
import { ApiPathProp } from '../path'
import * as qs from 'qs'
import TokenService from '@service/TokenService'

const getWalletHeaderOptions = async (
  needToken: boolean,
  header?: HeadersInit_
): Promise<any> => {
  const result: any = { ...header }

  if (needToken) {
    const accessToken = await TokenService.getAccessToken()
    const refreshToken = await TokenService.getRefreshToken()
    if (accessToken || refreshToken) {
      result['Authorization'] = accessToken
      result['RefreshToken'] = refreshToken
    }
  }
  return result
}

export const axiosGetWallet = async ({
  path,
  params,
  signal,
  headers,
}: {
  path: ApiPathProp
  params?: object
  signal?: AbortSignal
  headers?: HeadersInit_
  isRetry?: boolean
}): Promise<any> => {
  return axios.get(path.url, {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
    baseURL: Const.WALLET_API_URL,
    headers: await getWalletHeaderOptions(path.needToken, headers),
    signal,
  })
}

export const axiosPostWallet = async ({
  path,
  params,
  signal,
  headers,
  fileKeys = [],
}: {
  path: ApiPathProp
  params?: object
  signal?: AbortSignal
  headers?: HeadersInit_
  fileKeys?: string[]
  isRetry?: boolean
}): Promise<any> => {
  const data = new FormData()
  _.forEach(params, (val, key) => {
    if (!_.isElement(val)) {
      if (Array.isArray(val)) {
        _.forEach(val, (item: Blob | any, index: number) => {
          item instanceof Blob
            ? data.append(key, item) // Blob 타입
            : _.forEach(Object.keys(item), (oKey: any) => {
                // Object
                data.append(`${key}[${index}].${oKey}`, item[oKey])
              })
        })
      } else {
        data.append(key, val)
      }
    }
  })
  const headerOptions = await getWalletHeaderOptions(
    path.needToken,
    headers
  )

  if (fileKeys.length > 0)
    headerOptions['content-type'] = 'multipart/form-data'

  return axios.post(path.url, data, {
    headers: headerOptions,
    baseURL: Const.WALLET_API_URL,
    signal,
  })
}
