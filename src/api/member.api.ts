import { NATN_CODE } from '@models/Common/NATN_CODE'
import RESPONSE from '@models/Common/RESPONSE'
import { axiosGet, axiosPost } from './manager'
import apiPath from './path'
import {
  ConfirmFindPassType,
  CtfcType,
  FindPassChangeType,
  PhoneInfo,
  RegDeviceProp,
  SendFindPassType,
  SmsType,
  SocialInfo,
  SocialType,
  UserInfoProps,
  idCheckType,
} from '@models/Auth/USER_INFO'
import getE164Number from '@utils/getE164Number'
import MEBR from '@models/MEBR'
import { LoginResult } from '@models/Auth/LOGIN'
import { FindTempType } from '@models/Auth/FIND'

const { member: memberApiPath } = apiPath

const member = {
  idck: {
    post: async (params: {
      userId: string
      pageType: idCheckType
    }): Promise<RESPONSE> => {
      return axiosPost({ path: memberApiPath.idck, params })
    },
  },
  natnproc: {
    get: async (): Promise<RESPONSE<NATN_CODE[]>> => {
      return axiosGet({ path: memberApiPath.natnproc })
    },
  },
  emailck: {
    post: async ({
      userEmil,
    }: {
      userEmil: string
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: memberApiPath.emailck,
        params: {
          userEmil,
        },
      })
    },
  },
  snsMemberCk: {
    post: async ({
      socialId,
      socialType,
    }: {
      socialId: string
      socialType: SocialType
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: memberApiPath.snsMemberCk,
        params: {
          socialId,
          socialType,
        },
      })
    },
  },
  sendSmsProc: {
    post: async ({
      nationIso2,
      clpnNmbr,
      smsType,
      userId,
      rcToken,
    }: {
      nationIso2: string
      clpnNmbr: string
      smsType: SmsType
      userId?: string
      rcToken?: string
    }): Promise<RESPONSE> => {
      clpnNmbr = getE164Number(nationIso2, clpnNmbr)
      return axiosPost({
        path: memberApiPath.sendSmsProc,
        params: {
          clpnNmbr,
          smsType,
          rcToken,
          userId: userId ? userId : '',
        },
      })
    },
  },
  sendSmsRcTkProc: {
    post: async ({
      nationIso2,
      clpnNmbr,
      smsType,
      userId,
      rcToken,
    }: {
      nationIso2: string
      clpnNmbr: string
      smsType: SmsType
      userId?: string
      rcToken?: string
    }): Promise<RESPONSE> => {
      clpnNmbr = getE164Number(nationIso2, clpnNmbr)
      return axiosPost({
        path: memberApiPath.sendSmsRcTkProc,
        params: {
          clpnNmbr,
          smsType,
          rcToken,
          userId: userId ? userId : '',
        },
      })
    },
  },

  sendSmsWalletPin: {
    post: async ({
      nationIso2,
      clpnNmbr,
    }: {
      nationIso2: string
      clpnNmbr: string
    }): Promise<RESPONSE> => {
      clpnNmbr = getE164Number(nationIso2, clpnNmbr)
      return axiosPost({
        path: memberApiPath.sendSmsWalletPin,
        params: {
          clpnNmbr,
        },
      })
    },
  },
  checkSmsProc: {
    post: async ({
      nationIso2,
      clpnNmbr,
      ctfcNmbr,
      smsType,
      userId,
    }: {
      nationIso2: string
      clpnNmbr: string
      ctfcNmbr: string
      smsType: SmsType
      userId?: string
    }): Promise<
      RESPONSE<{
        userId: string
        mebrFileMgmtNmbr: string
        joinInfo?: SocialType[]
      }>
    > => {
      clpnNmbr = getE164Number(nationIso2, clpnNmbr)
      return axiosPost({
        path: memberApiPath.checkSmsProc,
        params: {
          clpnNmbr,
          ctfcNmbr,
          smsType,
          userId: userId ? userId : '',
        },
      })
    },
  },
  checkSmsWalletPin: {
    post: async ({
      nationIso2,
      clpnNmbr,
      ctfcNmbr,
    }: {
      nationIso2: string
      clpnNmbr: string
      ctfcNmbr: string
    }): Promise<RESPONSE> => {
      clpnNmbr = getE164Number(nationIso2, clpnNmbr)
      return axiosPost({
        path: memberApiPath.checkSmsWalletPin,
        params: {
          clpnNmbr,
          ctfcNmbr,
        },
      })
    },
  },

  /**
   * 아이디 찾기 이메일
   */
  searchIdEmilProc: {
    post: async (params: {
      userEmil: string
    }): Promise<
      RESPONSE<{
        userId: string
        mebrFileMgmtNmbr: string
      }>
    > => {
      return axiosPost({
        path: memberApiPath.searchIdEmilProc,
        params,
      })
    },
  },

  /**
   * 비밀번호 재설정 이메일 발송
   */
  sendPassEmailProc: {
    post: async (params: {
      userEmil: string
      userId: string
    }): Promise<
      RESPONSE<{
        userId: string
        mebrFileMgmtNmbr: string
      }>
    > => {
      return axiosPost({
        path: memberApiPath.sendPassEmailProc,
        params,
      })
    },
  },

  /**
   * 임시비밀번호 SMS 발송
   */
  sendPassSmsProc: {
    post: async ({
      natnCode,
      clpnNmbr,
      ctfcNmbr,
      userId,
    }: {
      natnCode: string
      clpnNmbr: string
      ctfcNmbr: string
      userId: string
    }): Promise<
      RESPONSE<{
        userId: string
        mebrFileMgmtNmbr: string
      }>
    > => {
      clpnNmbr = getE164Number(natnCode, clpnNmbr)
      return axiosPost({
        path: memberApiPath.sendPassSmsProc,
        params: {
          clpnNmbr,
          ctfcNmbr,
          userId,
        },
      })
    },
  },

  /**
   * 비밀번호 재설정
   */
  modPassProc: {
    post: async (params: {
      userId: string
      pswd: string
      pswdRe: string
      pswdOrigin: string
      clpnNmbr: string
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: memberApiPath.modPassProc,
        params,
      })
    },
  },
  joinproc: {
    post: async (
      signUpUserInfo: UserInfoProps
    ): Promise<RESPONSE<{ userId: string }>> => {
      if (signUpUserInfo.clpnNmbr) {
        signUpUserInfo.clpnNmbr = getE164Number(
          signUpUserInfo.natnCode,
          signUpUserInfo.clpnNmbr
        )
      }
      return axiosPost({
        path: memberApiPath.joinproc,
        params: signUpUserInfo,
      })
    },
  },
  recommendUser: {
    post: async (params: {
      userId: string // 사용자 id
      rcmdId: string // 추천인 id
    }): Promise<RESPONSE<void>> => {
      return axiosPost({ path: memberApiPath.recommendUser, params })
    },
  },
  followProc: {
    post: async (params: {
      mebrMgmtNmbr: string // 팔로잉 할 멤버
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: memberApiPath.followProc,
        params,
      })
    },
  },
  rmFollowProc: {
    post: async (params: {
      mebrMgmtNmbr: string // 팔로잉 취소할 멤버
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: memberApiPath.rmFollowProc,
        params,
      })
    },
  },
  myFollowingList: {
    get: async (): Promise<RESPONSE<MEBR[]>> => {
      return axiosGet({
        path: memberApiPath.myFollowingList,
      })
    },
  },
  checkMebrFollowYn: {
    get: async (
      params: {
        mebrMgmtNmbr: string
      },
      signal?: AbortSignal
    ): Promise<RESPONSE<{ followYn: string }>> => {
      return axiosGet({
        path: memberApiPath.checkMebrFollowYn,
        params,
        signal,
      })
    },
  },
  regDevice: {
    post: async ({
      params,
    }: {
      params: RegDeviceProp
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: memberApiPath.regDevice,
        params,
      })
    },
    delete: async (): Promise<RESPONSE> => {
      return axiosPost({
        path: memberApiPath.removeDevice,
        params: { a: 1 },
      })
    },
  },
  //   myCtgrInfoProc: {
  //     get: async ({
  //       params,
  //     }: {
  //       params: { mebrMgmtNmbr: string }
  //     }): Promise<RESPONSE<{ ctgrList: HISP_CTGR[] }>> => {
  //       return axiosGet({
  //         path: memberApiPath.myCtgrInfoProc,
  //         params,
  //       })
  //     },
  //   },
  connectSnsByEmail: {
    post: async (
      params: PhoneInfo & SocialInfo
    ): Promise<RESPONSE<LoginResult>> => {
      return axiosPost({
        path: memberApiPath.connectSnsByEmail,
        params,
      })
    },
  },
  connectSns: {
    post: async (
      params: PhoneInfo & SocialInfo
    ): Promise<RESPONSE<LoginResult>> => {
      params.clpnNmbr =
        params.clpnNmbr &&
        params.nationIso2 &&
        getE164Number(params.nationIso2, params.clpnNmbr)

      return axiosPost({
        path: memberApiPath.connectSns,
        params,
      })
    },
  },
  connectApple: {
    post: async (
      params: PhoneInfo
    ): Promise<RESPONSE<LoginResult>> => {
      params.clpnNmbr =
        params.clpnNmbr &&
        params.nationIso2 &&
        getE164Number(params.nationIso2, params.clpnNmbr)

      return axiosPost({
        path: memberApiPath.connectApple,
        params,
      })
    },
  },
  blockProc: {
    post: async (params: {
      blockMebrMgmtNmbr: string
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: memberApiPath.blockProc,
        params,
      })
    },
  },
  blockRmProc: {
    post: async (params: {
      blockMebrMgmtNmbr: string
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: memberApiPath.blockRmProc,
        params,
      })
    },
  },
  myVoteBltbViewYnProc: {
    post: async (params: {
      myVoteBltbViewYn: string
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: memberApiPath.myVoteBltbViewYnProc,
        params,
      })
    },
  },
  updateMyBirthDay: {
    post: async (params: { birthDay: string }): Promise<RESPONSE> =>
      axiosPost({ path: memberApiPath.updateMyBirthDay, params }),
  },
  secession: {
    post: async ({
      signal,
    }: {
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: memberApiPath.secession,
        signal,
      })
    },
  },
  sendFindPassProc: {
    post: async (
      params: SendFindPassType,
      signal?: AbortSignal
    ): Promise<RESPONSE> => {
      if (params.tempType === FindTempType.Sms && params.nationIso2)
        params.clpnNmbr = getE164Number(
          params.nationIso2,
          params.clpnNmbr
        )
      return axiosPost({
        path: memberApiPath.sendFindPassProc,
        params: params,
        signal,
      })
    },
  },
  confirmFindPass: {
    post: async (
      params: ConfirmFindPassType,
      signal?: AbortSignal
    ): Promise<RESPONSE> => {
      if (params.tempType === FindTempType.Sms && params.nationIso2)
        params.clpnNmbr = getE164Number(
          params.nationIso2,
          params.clpnNmbr
        )
      return axiosPost({
        path: memberApiPath.confirmFindPass,
        params: params,
        signal,
      })
    },
  },
  findPassChange: {
    post: async (
      params: FindPassChangeType,
      signal?: AbortSignal
    ): Promise<RESPONSE> => {
      if (params.tempType === FindTempType.Sms && params.nationIso2)
        params.clpnNmbr = getE164Number(
          params.nationIso2,
          params.clpnNmbr
        )
      return axiosPost({
        path: memberApiPath.findPassChange,
        params: params,
        signal,
      })
    },
  },
  sendEmailCtfcNmbrProc: {
    signUp: {
      post: async ({
        params,
        signal,
      }: {
        params: {
          ctfcType: CtfcType
          userEmil: string
          rcToken?: string
          langCode?: string
        }
        signal?: AbortSignal
      }): Promise<RESPONSE> => {
        return axiosPost({
          path: memberApiPath.sendEmailCtfcNmbrProc.signUp,
          params,
          signal,
        })
      },
    },
    update: {
      post: async ({
        params,
        signal,
      }: {
        params: {
          ctfcType: CtfcType
          userEmil: string
          rcToken?: string
        }
        signal?: AbortSignal
      }): Promise<RESPONSE> => {
        return axiosPost({
          path: memberApiPath.sendEmailCtfcNmbrProc.update,
          params,
          signal,
        })
      },
    },
  }, // 이메일 인증 - 인증번호 발송 (로그인 사용자)

  checkEmailCtfcNmbr: {
    signUp: {
      post: async ({
        params,
        signal,
      }: {
        params: { ctfcNmbr: string; userEmil: string }
        signal?: AbortSignal
      }): Promise<RESPONSE> => {
        return axiosPost({
          path: memberApiPath.checkEmailCtfcNmbr.signUp,
          params,
          signal,
        })
      },
    },
    update: {
      post: async ({
        params,
        signal,
      }: {
        params: { ctfcNmbr: string; userEmil: string }
        signal?: AbortSignal
      }): Promise<RESPONSE> => {
        return axiosPost({
          path: memberApiPath.checkEmailCtfcNmbr.update,
          params,
          signal,
        })
      },
    },
  },
  myKycLevel: {
    get: async (
      signal?: AbortSignal
    ): Promise<
      RESPONSE<{
        kycLevel: number
        acctAuthStatus: string // useB 인증 여부
        otpStatus: string // OTP 인증 여부
        limitPerCount: number // HIBS 1회 한도
        limitPerDay: number // HIBS 1일 한도
        accuAmount: number // HIBS 24시간 송금 누적 금액
      }>
    > => {
      return axiosGet({
        path: memberApiPath.myKycLevel,
        signal,
      })
    },
  },
}

export default { member }
