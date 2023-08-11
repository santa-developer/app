export interface GetResponseOTPAuthentication {
  code: number
  message: string
  messageLocaleCode: string
  check: boolean
  response: {
    userEmil: string
    usesrFstnm: string
    clpnNmbr: string
    userName: string
    userNknm: string
    userId: string
  }
}
