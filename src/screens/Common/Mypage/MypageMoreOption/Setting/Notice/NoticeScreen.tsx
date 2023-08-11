import notice from '@api/notice.api'
import Body from '@components/Body'
import { useAlert } from '@hooks/useCommonAlert'
import $t, { getLocale } from 'i18n'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useRecoilState } from 'recoil'
import { NoticeItem } from './components/NoticeItem'
import {
  noticeListState,
  noticePaginationState,
} from '@recoil/atoms/Mypage/notice'

const recordCountPerPage = 15

export default function NoticeScreen(): React.JSX.Element {
  const flatListRef = useRef<FlatList>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [noticeList, setNoticeList] = useRecoilState(noticeListState)
  const [pagination, setPagination] = useRecoilState(
    noticePaginationState
  )
  const isLastPage =
    pagination?.currentPageNo >= pagination?.lastPageNo
  const controller = new AbortController()

  const alert = useAlert()

  const _getNoticeListProc = async (currPage = 1): Promise<void> => {
    setIsLoading(true)

    const params = {
      langCode: await getLocale(),
      currPage,
      recordCountPerPage,
    }

    const result = await notice.listProc.get({
      params,
      signal: controller.signal,
    })

    if (result.check) {
      setNoticeList(
        currPage == 1
          ? result.response.list
          : noticeList.concat(result.response.list)
      )
      setPagination(result.response.pagination)
    } else {
      alert({ desc: $t(result.messageLocaleCode) })
    }
    setIsLoading(false)
  }

  const onEndReached = (): void => {
    if (isLastPage || isLoading) {
      return
    }
    _getNoticeListProc(pagination?.currentPageNo + 1)
  }

  useEffect(() => {
    if (isLastPage || isLoading) {
      return
    } else {
      _getNoticeListProc()
    }
  }, [isLastPage])

  return (
    <Body hidePadding>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={{ padding: 15 }}
        scrollEventThrottle={200}
        data={noticeList}
        renderItem={NoticeItem}
        onEndReached={onEndReached}
        ListEmptyComponent={
          <View style={{ paddingTop: '45%' }}>
            {/* <Text>{`결과가 없습니다.`}</Text> */}
            {/* <Text>{`${$t('COMM.COMM_STC_NO_RESULT')}`}</Text> */}
          </View>
        }
      />
    </Body>
  )
}
