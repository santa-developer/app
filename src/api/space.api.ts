import RESPONSE from '@models/Common/RESPONSE'
import { axiosGet } from './manager'
import apiPath from './path'
import BLTB from '@models/Common/BLTB'
import PAGINATION from '@models/Common/PAGINATION'
import {
  HispCategoryVO,
  RecommendSpace,
  SpaceCategory,
} from '@models/Common/SPACE'
import MAIN_CONTS_MGMT from '@models/Common/MAIN_CONTS_MGMT'
import HISP_MGMT from '@models/Common/HISP_MGMT'
import { SpaceListType } from '@models/Common/SPACE_LIST_TYPE'
import HispKeyword from '@models/Common/HISP_KEYWORD'

const {
  hisp: spacePath,
  home: spacePath2,
  homeSpace: spacePath3,
} = apiPath

const space = {
  spaceHome: {
    get: (): Promise<
      RESPONSE<{
        pagination: PAGINATION
        list: BLTB[]
      }>
    > =>
      axiosGet({
        path: spacePath.mainSpaceInfo,
      }),
  },
  category: {
    get: ({
      includeSpaceCnt,
    }: {
      includeSpaceCnt: boolean
    }): Promise<RESPONSE<HispCategoryVO[]>> =>
      axiosGet({
        path: spacePath.ctgrList,
        params: { includeSpaceCnt },
      }),
  },
  recommendSpace: {
    get: (): Promise<RESPONSE<{ list: RecommendSpace[] }>> =>
      axiosGet({ path: spacePath2.recSpaceList }),
  },
  followingSpace: {
    get: ({
      type,
    }: {
      type: string
    }): Promise<RESPONSE<{ list: RecommendSpace[] }>> =>
      axiosGet({
        path: spacePath3.mySpaceListProc,
        params: { type },
      }),
  },
  spaceInCategory: {
    get: ({
      hispCtgrMgmtNmbr,
    }: {
      hispCtgrMgmtNmbr: string
    }): Promise<RESPONSE<{ list: SpaceCategory[] }>> =>
      axiosGet({
        path: spacePath3.spaceListByCtgrProc,
        params: { hispCtgrMgmtNmbr },
      }),
  },

  bannerListProc: {
    get: async ({
      signal,
    }: {
      signal?: AbortSignal
    }): Promise<RESPONSE<MAIN_CONTS_MGMT[]>> => {
      return axiosGet({
        path: spacePath3.bannerListProc,
        signal,
      })
    },
  },
  mySpaceListProc: {
    get: async ({
      signal,
      params,
    }: {
      signal?: AbortSignal
      params?: {
        mebrMgmtNmbr?: string
        currPage?: number
        recordCountPerPage?: number
        type?: SpaceListType
        orderByType?: 'F' | 'T' | 'D'
        searchText?: string
        spaceLimit?: number | null
      }
    }): Promise<
      RESPONSE<{
        list: HISP_MGMT[]
        pagination: PAGINATION
        info?: HispKeyword
      }>
    > => {
      return axiosGet({
        path: spacePath3.mySpaceListProc,
        signal,
        params,
      })
    },
  },
}

export default space
