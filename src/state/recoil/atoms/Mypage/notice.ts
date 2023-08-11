import PAGINATION from '@models/Common/PAGINATION'
import { NOTICE } from '@models/Mypage/NOTICE'
import { atom } from 'recoil'

export const recordCountPerPage = 10

// 공지사항 리스트
export const noticeListState = atom<NOTICE[]>({
  key: 'noticeList',
  default: [],
})

// 공지사항 pagination
export const noticePaginationState = atom<PAGINATION>({
  key: 'noticePagination',
  default: undefined,
})
