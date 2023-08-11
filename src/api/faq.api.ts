import RESPONSE from '@models/Common/RESPONSE'
import { axiosGet } from './manager'
import apiPath from './path'
import PAGINATION from '@models/Common/PAGINATION'
import { FAQ } from '@models/Mypage/FAQ'

const faq = {
  listProc: {
    get: async (props: {
      params: {
        langCode: string
        faqDvsnCode: string
        currPage: number
        recordCountPerPage?: number
      }
      signal?: AbortSignal
    }): Promise<
      RESPONSE<{ pagination: PAGINATION; list: FAQ[] }>
    > => {
      return axiosGet({
        path: apiPath.faq.listProc,
        ...props,
      })
    },
  },
}

export default faq
