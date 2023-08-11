import axios from 'axios'

import RESPONSE from '@models/Common/RESPONSE'
import _ from 'lodash'
import { ApiPathProp } from '../path'
import * as qs from 'qs'
import { getHeaderOptions } from '@utils/ApiUtils'

export const axiosGet = async ({
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
}): Promise<RESPONSE> => {
  return axios.get(path.url, {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
    headers: await getHeaderOptions(path.needToken, headers),
    signal,
  })
}

export const axiosPost = async ({
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
}): Promise<RESPONSE> => {
  const headerOptions: any = await getHeaderOptions(
    path.needToken,
    headers
  )

  if (fileKeys.length > 0) {
    const data = new FormData()

    _.forEach(params, (val, key) => {
      if (Array.isArray(val)) {
        _.forEach(val, (item: Blob | any) => {
          // if (item instanceof Blob) {
          data.append(key, item) // Blob 타입
          // } else {
          //   _.forEach(Object.keys(item), (oKey: any) => {
          // Object
          // data.append(`${key}[${index}].${oKey}`, item[oKey])
          // })
          // }
        })
      } else {
        data.append(key, val)
      }
    })

    return axios.post(path.url, data, {
      headers: {
        ...headerOptions,
        'Content-Type': 'multipart/form-data',
      },
      signal,
    })
  } else {
    return axios.post(path.url, params, {
      headers: {
        ...headerOptions,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      signal,
    })
  }
}
