import PAGINATION from '@models/Common/PAGINATION'
import { FAQ } from '@models/Mypage/FAQ'
import { atom } from 'recoil'

// FAQ 리스트
export const faqListState = atom<FAQ[]>({
  key: 'faqList',
  default: [],
})

// FAQ pagination
export const faqPaginationState = atom<PAGINATION>({
  key: 'faqPagination',
  default: undefined,
})

export const faqDvsnCodeListState = atom<
  { label: string; value: string }[]
>({
  key: 'faqDvsnCodeList',
  default: [],
})
