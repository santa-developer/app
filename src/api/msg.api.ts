import { axiosGet } from '@api/manager'
import apiPath from '@api/path'
import RESPONSE from '@models/Common/RESPONSE'

const msg = {
  listProc: {
    get: async (): Promise<RESPONSE<object>> => {
      return axiosGet({
        path: apiPath.msg.listProc,
      })
    },
  },
}

export default {
  msg,
}
