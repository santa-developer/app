import { axiosGet } from '@api/manager'
import PAGINATION from '@models/Common/PAGINATION'
import RESPONSE from '@models/Common/RESPONSE'
import apiPath from '@api/path'
import BLTB from '@models/Common/BLTB'
import BLTB_COMT from '@models/Common/BLTB_COMT'

const { home: homeApiPath } = apiPath
const { bltb: bltbApiPath } = apiPath

const home = {
  // 팔로우 리스트
  homeFollowList: {
    get: async ({
      params,
      signal,
    }: {
      params: {
        currPage: number
        recordCountPerPage: number
      }
      signal?: AbortSignal
    }): Promise<
      RESPONSE<{
        pagination: PAGINATION
        list: BLTB[]
      }>
    > => {
      return axiosGet({
        path: homeApiPath.homeFollowList,
        params,
        signal,
      })
    },
  },
  // 인기 피드 리스트
  homePopularityList: {
    get: async ({
      params,
      signal,
    }: {
      params: {
        currPage: number
        recordCountPerPage: number
      }
      signal?: AbortSignal
    }): Promise<
      RESPONSE<{
        pagination: PAGINATION
        list: BLTB[]
      }>
    > => {
      return axiosGet({
        path: homeApiPath.homePopularityList,
        params,
        signal,
      })
    },
  },
  // 댓글 리스트
  comtListProc: {
    get: async ({
      params,
      signal,
    }: {
      params: {
        postMgmtNmbr: number | string
        currPage: number
        recordCountPerPage: number
        orderType?: string
      }
      signal?: AbortSignal
    }): Promise<
      RESPONSE<{
        pagination: PAGINATION
        list: BLTB_COMT[]
      }>
    > => {
      return axiosGet({
        path: bltbApiPath.comtListProc,
        params,
        signal,
      })
    },
  },
}

export default home
