import RESPONSE from '@models/Common/RESPONSE'
import { axiosPost } from './manager'
import apiPath from './path'
import { MailInquiriesProps } from '@models/Mypage/MAIL_INQUIRIES'

const { issue: mailProc } = apiPath

const mail = {
  mailProc: {
    post: async ({
      params,
    }: {
      params: MailInquiriesProps
    }): Promise<RESPONSE> => {
      return axiosPost({
        path: mailProc.mailProc,
        params,
      })
    },
  },
}

export default mail
