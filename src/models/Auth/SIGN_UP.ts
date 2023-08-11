import { UserInfoProps } from './USER_INFO'

export interface UserSignUpProp extends UserInfoProps {
  userIdConfirm: boolean
  pswdConfirm: boolean
  clpnNmbrCertified: string
  clpnNmbrCertifyComplete: boolean
  userEmilCertified: string
  userEmilCertifyComplete: boolean
  userEmilConfirm: boolean
  termsOfUse: boolean
  privacyPolicy: boolean
  personInfo: boolean
  maketing: boolean
  agrtMrktYn: string
  nowStep: number
}

export const initUserInfo = {
  userEmilCertified: '',
  userEmilCertifyComplete: false,
  userId: '',
  userIdConfirm: false,
  pswd: '',
  pswdConfirm: false,
  clpnNmbr: '',
  clpnNmbrCertified: '',
  clpnNmbrCertifyComplete: false,
  ctfcNmbr: '',
  natnCode: '',
  userEmil: '',
  userEmilConfirm: false,
  ctgrList: [],
  termsOfUse: false,
  privacyPolicy: false,
  personInfo: false,
  maketing: false,
  agrtMrktYn: 'N',
  birthDay: '',
  socialId: '',
  nowStep: 1,
}
