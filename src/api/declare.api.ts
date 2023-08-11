import { axiosPost } from '@api/manager'
import RESPONSE from '@models/Common/RESPONSE'
import apiPath from '@api/path'
import {
  IComtDeclare,
  IFeedDeclare,
  IUserDeclare,
} from '@models/api/DECLARE'

const { dec: decApiPath } = apiPath

const bltb = {
  // 게시물 신고
  bltbDecProc: {
    post: async ({
      params,
      signal,
    }: {
      params: IFeedDeclare
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: decApiPath.bltbDecProc,
        params,
        signal,
      })
    },
  },
  // 댓글 신고
  comtDecProc: {
    post: async ({
      params,
      signal,
    }: {
      params: IComtDeclare
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: decApiPath.comtDecProc,
        params,
        signal,
      })
    },
  },
  // 사용자 신고
  userDecProc: {
    post: async ({
      params,
      signal,
    }: {
      params: IUserDeclare
      signal?: AbortSignal
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: decApiPath.userDecProc,
        params,
        signal,
      })
    },
  },
}

export default bltb
