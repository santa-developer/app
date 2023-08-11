import PAGINATION from '@models/Common/PAGINATION'
import { NOTICE } from '@models/Mypage/NOTICE'
import {
  noticeListState,
  noticePaginationState,
} from '@recoil/atoms/Mypage/notice'
import { DefaultValue, selector } from 'recoil'

export const noticeSelector = selector<{
  list: NOTICE[]
  pagination: PAGINATION
}>({
  key: 'noticeSelector',
  get: ({ get }) => {
    const noticelist = get(noticeListState)
    const noticePagination = get(noticePaginationState)

    return {
      list: noticelist,
      pagination: noticePagination,
    }
  },
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const { list, pagination } = newValue
      set(noticeListState, list)
      set(noticePaginationState, pagination)
    } else {
      set(noticeListState, (prevProps) => prevProps)
      set(noticePaginationState, (prevProps) => prevProps)
    }
  },
})
