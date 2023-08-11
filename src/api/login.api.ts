import MEBR from '@models/MEBR'
import apiPath from './path'
import RESPONSE from '@models/Common/RESPONSE'
import { axiosGet, axiosPost } from './manager'
import { LoginInfo, LoginResult } from '@models/Auth/LOGIN'
import { PhoneInfo, SocialInfo } from '@models/Auth/USER_INFO'
import getE164Number from '@utils/getE164Number'

const { login: loginApiPath } = apiPath

const login = {
  reCaptcha: {
    loginProc: {
      post: async (
        params: (LoginInfo | SocialInfo) & { rcToken?: string }
      ): Promise<RESPONSE<LoginResult>> => {
        return axiosPost({
          path: loginApiPath.reCaptcha.loginProcWithTK,
          params,
        })
      },
    },
    loginProcWithPhone: {
      post: async (
        params: PhoneInfo & { rcToken?: string }
      ): Promise<RESPONSE> => {
        const clpnNmbr =
          params.clpnNmbr &&
          params.nationIso2 &&
          getE164Number(params.nationIso2, params.clpnNmbr)
        return axiosPost({
          path: loginApiPath.reCaptcha.loginProcWithPhoneAndTK,
          params: { clpnNmbr, rcToken: params.rcToken },
        })
      },
    },
  },
  loginProc: {
    post: async (
      params: LoginInfo | SocialInfo
    ): Promise<RESPONSE<LoginResult>> => {
      return axiosPost({ path: loginApiPath.loginProc, params })
    },
  },
  loginProcWithPhone: {
    post: async (params: PhoneInfo): Promise<RESPONSE> => {
      const clpnNmbr =
        params.clpnNmbr &&
        params.nationIso2 &&
        getE164Number(params.nationIso2, params.clpnNmbr)
      return axiosPost({
        path: loginApiPath.loginProcWithPhone,
        params: { clpnNmbr },
      })
    },
  },
  loginProcWithAc: {
    get: async (
      signal: AbortSignal
    ): Promise<
      RESPONSE<{
        userInfo: MEBR
        spaceList: string[]
        tokenSet: {
          accessToken: string
        }
        decItem?: string
        decDate?: string
      }>
    > => {
      return axiosGet({
        path: loginApiPath.loginProcWithAc,
        signal,
      })
    },
  },
  // 휴면 계정 해제
  userInfoWakeUp: {
    post: async ({
      params,
      signal,
    }: {
      params: { mebrMgmtNmbr: string }
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: loginApiPath.userInfoWakeUp,
        params,
        signal,
      })
    },
  },
}

export default {
  login,
  getE164Number,
}
