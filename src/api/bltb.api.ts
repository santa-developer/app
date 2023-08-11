import { axiosPost } from '@api/manager'
import RESPONSE from '@models/Common/RESPONSE'
import apiPath from '@api/path'

const { bltb: bltbApiPath } = apiPath

const bltb = {
  // 좋아요
  atvtLikeProc: {
    post: async ({
      params,
      signal,
    }: {
      params: { postMgmtNmbr: string }
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: bltbApiPath.atvtLikeProc,
        params,
        signal,
      })
    },
  },
  // 싫어요
  atvtHateProc: {
    post: async ({
      params,
      signal,
    }: {
      params: { postMgmtNmbr: string }
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: bltbApiPath.atvtHateProc,
        params,
        signal,
      })
    },
  },
}

export default bltb
