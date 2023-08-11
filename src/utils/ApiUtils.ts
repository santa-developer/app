import { Const, Dev } from '@constants'
import { getLocale, localeStringParser } from 'i18n'
import deviceInfo from 'react-native-device-info'
import TokenService from '@service/TokenService'

export const getHeaderOptions = async (
  needToken: boolean,
  header?: HeadersInit_
): Promise<any> => {
  const result: any = {
    ...header,
    ...(await getSecurityValue()),
  }

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
export const getSecurityValue = async (): Promise<
  Record<string, string>
> => {
  const result: Record<string, string> = {}
  try {
    const { u, e, d, a, p, f, t, z } = Const.ENV.h
    const utcHours = new Date().getUTCHours()

    result[e] =
      utcHours === 0
        ? z
        : utcHours === 12
        ? t
        : utcHours < 12
        ? utcHours % d === 0
          ? a.e
          : a.o
        : utcHours % d === 0
        ? p.e
        : p.o

    result[u] = localeStringParser(
      f,
      await deviceInfo.getUniqueId(),
      await getLocale()
    )

    return result
  } catch (e) {
    Dev.log(e)
    return result
  }
}
