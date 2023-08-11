import apiPath from '@api/path'
import { axiosPost } from './manager'
import RESPONSE from '@models/Common/RESPONSE'

const { dec: decPath } = apiPath

const dec = {
  //주간 헌터 여부
  hunter: {
    post: async (): Promise<RESPONSE<{ weekHunterYn: string }>> => {
      return axiosPost({
        path: decPath.hunter,
      })
    },
  },
}

export default dec
