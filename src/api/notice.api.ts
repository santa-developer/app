import RESPONSE from '@models/Common/RESPONSE'
import { axiosGet } from './manager'
import apiPath from './path'
import PAGINATION from '@models/Common/PAGINATION'
import { NOTICE } from '@models/Mypage/NOTICE'

const notice = {
  listProc: {
    get: async (props: {
      params: {
        langCode: string
        currPage: number
        recordCountPerPage?: number
      }
      signal?: AbortSignal
    }): Promise<
      RESPONSE<{ pagination: PAGINATION; list: NOTICE[] }>
    > => {
      return axiosGet({
        path: apiPath.notice.listProc,
        ...props,
      })
    },
  },
}

export default notice
