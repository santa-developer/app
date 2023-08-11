import { NATN_CODE } from '@models/Common/NATN_CODE'

export type CountrySelectProps = {
  disabled?: boolean
  selectBoxWidth?: number | string
}
export type CountrySelectListModalProps = {
  isShowModal: boolean
  countryCodeList: NATN_CODE[]
  selectedCountry: NATN_CODE
  initialScrollIndex?: number
  onCoutnryPress: (country: NATN_CODE) => void
  closeModal?: () => void
}
