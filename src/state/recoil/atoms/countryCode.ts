import { NATN_CODE, defaultCountry } from '@models/Common/NATN_CODE'
import { atom } from 'recoil'

// 선택된 국가
export const selectedCountryState = atom<NATN_CODE>({
  key: 'selectedCountry',
  default: defaultCountry,
})

// 국가 리스트
export const countryCodeListState = atom<NATN_CODE[]>({
  key: 'countryCode',
  default: [],
})
