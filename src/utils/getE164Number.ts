/**
 * 국제전화 국가 번호 조회
 */
import glp from 'google-libphonenumber'

const PNF = glp.PhoneNumberFormat
const phoneUtil = glp.PhoneNumberUtil.getInstance()

export default function getE164Number(
  nationIso2: string,
  phoneNumber: string
): string {
  const number = phoneUtil.parseAndKeepRawInput(
    phoneNumber,
    nationIso2
  )
  return phoneUtil.format(number, PNF.E164)
}
