import RESPONSE from '@models/Common/RESPONSE'
import { axiosGet } from './manager'
import apiPath from './path'
import { GetResponseOTPAuthentication } from '@models/Auth/OTP'

const { otp: otpPath } = apiPath

const otp = {
  authentication: {
    get: (): Promise<RESPONSE<GetResponseOTPAuthentication>> =>
      axiosGet({ path: otpPath.getOTPInfo }),
  },
}

export default otp
