import PAGINATION from '@models/Common/PAGINATION'
import PUSH from '@models/Common/PUSH'
import RESPONSE from '@models/Common/RESPONSE'
import { axiosGet, axiosPost } from './manager'
import apiPath from './path'

const { member: memberApiPath, push: pushApiPath } = apiPath

const push = {
  // 활동 내역
  listProc: {
    get: async (props: {
      params: {
        pushTypeArr: string[]
        currPage?: number
        recordCountPerPage?: number
      }
    }): Promise<
      RESPONSE<{ pagination: PAGINATION; list: PUSH[] }>
    > => {
      return axiosGet({
        path: pushApiPath.listProc,
        params: { ...props.params },
      })
    },
  },
  // 활동 내역 안읽은 알림 조회
  alam: {
    get: async (): Promise<
      RESPONSE<{
        walletCnt: number
        decCnt: number
        tagCnt: number
        replyCnt: number
        likeHateCnt: number
        followCnt: number
        etcCnt: number
      }>
    > => {
      return axiosGet({
        path: pushApiPath.alam,
      })
    },
  },

  deviceTokenList: {
    post: async ({
      params,
      signal,
    }: {
      params: {
        mebrMgmtNmbrList: string[]
      }
      signal?: AbortSignal
    }): Promise<
      RESPONSE<{
        deviceList: [
          {
            mebrMgmtNmbr: string
            toknNmbr: string
          }
        ]
      }>
    > => {
      return axiosPost({
        path: pushApiPath.deviceTokenList,
        params,
        signal,
      })
    },
  },
  sendMessage: {
    post: async ({
      params,
      signal,
    }: {
      params: {
        mebrMgmtNmbr: string
        channelUrl: string
        senderId: string
        senderNickname: string
        message: string
      }
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: pushApiPath.sendMessage,
        params,
        signal,
      })
    },
  },
  getPushSettings: {
    get: async (): Promise<
      RESPONSE<{
        pushSettings: {
          mebrMgmtNmbr: string
          sendYn01: string
          sendYn02: string
          sendYn03: string
          sendYn04: string
          sendYn05: string
          sendYn06: string
        }
        agrtMrktYn: string
        agrtMkrtDate: string
      }>
    > => {
      return axiosGet({
        path: memberApiPath.getPushSettings,
      })
    },
  },
  updatePushSettings: {
    post: async (params: {
      sendYn01: string
      sendYn02: string
      sendYn03: string
      sendYn04: string
      sendYn05: string
      sendYn06: string
    }): Promise<RESPONSE> =>
      axiosPost({ path: memberApiPath.updatePushSettings, params }),
  },
  updateMarketingPushSettings: {
    post: async (params: {
      agrtMrktYn: string
    }): Promise<RESPONSE<string>> =>
      axiosPost({
        path: memberApiPath.updateMarketingPushSettings,
        params,
      }),
  },
}

export default { push }
