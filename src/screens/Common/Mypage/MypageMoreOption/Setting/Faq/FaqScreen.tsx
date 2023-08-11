import commonApi from '@api/common.api'
import faqApi from '@api/faq.api'
import Body from '@components/Body'
import { SelectBox } from '@components/SelectBox'
import Text from '@components/Text'
import { Colors } from '@constants'
import { useAlert } from '@hooks/useCommonAlert'
import { FAQ } from '@models/Mypage/FAQ'
import {
  faqDvsnCodeListState,
  faqListState,
  faqPaginationState,
} from '@recoil/atoms/Mypage/faq'
import $t, { getLocale } from 'i18n'
import moment from 'moment'
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { FlatList, View } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import { useRecoilState, useResetRecoilState } from 'recoil'
import styled from 'styled-components/native'

const recordCountPerPage = 15
const initFaqDvsnCode = { label: 'ALL', value: '' }

export default function FaqScreen(): React.JSX.Element {
  const [faqDvsnCodeList, setFaqDvsnCodeList] = useRecoilState(
    faqDvsnCodeListState
  )
  const flatListRef = useRef<FlatList>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [faqDvsnCode, setFaqDvsnCode] = useState(initFaqDvsnCode)
  const [faqList, setFaqList] = useRecoilState(faqListState)
  const [pagination, setPagination] = useRecoilState(
    faqPaginationState
  )
  const resetFaqList = useResetRecoilState(faqListState)
  const resetPagination = useResetRecoilState(faqPaginationState)

  const isLastPage =
    pagination?.currentPageNo >= pagination?.lastPageNo
  const controller = new AbortController()

  const alert = useAlert()

  // faq list 가져오기
  const _getFaqListProc = async (currPage = 1): Promise<void> => {
    setIsLoading(true)

    const params = {
      langCode: await getLocale(),
      faqDvsnCode: faqDvsnCode.value,
      currPage,
      recordCountPerPage,
    }

    const result = await faqApi.listProc.get({
      params,
      signal: controller.signal,
    })

    if (result.check) {
      setFaqList(
        currPage == 1
          ? result.response.list
          : faqList.concat(result.response.list)
      )
      setPagination(result.response.pagination)
    } else {
      alert({ desc: $t(result.messageLocaleCode) })
    }
    setIsLoading(false)
  }

  // faq code list 가져오기
  const _getFaqDvsnCodeListProc = async (): Promise<void> => {
    const result = await commonApi.code.listProc.get(
      {
        grupCode: ['FAQ_DVSN_CODE'],
      },
      controller.signal
    )
    if (result.check) {
      const dvsnCodeList = [initFaqDvsnCode]
      const newCodeList = result.response.list.map((item) => {
        return { label: $t(item.msgCode), value: item.code }
      })
      dvsnCodeList.push(...newCodeList)
      setFaqDvsnCodeList(dvsnCodeList)
    }
  }

  // flatList 스크롤 마지막
  const onEndReached = (): void => {
    if (isLastPage || isLoading) {
      return
    }
    _getFaqListProc(pagination?.currentPageNo + 1)
  }

  // 카테고리 변경
  const onChangeSelect = (value: {
    label: string
    value: string
  }): void => {
    setFaqDvsnCode(value)
    // 리스트, 페이지네이션 초기화
    resetFaqList()
    resetPagination()
  }

  useLayoutEffect(() => {
    if (faqDvsnCodeList.length === 0) {
      _getFaqDvsnCodeListProc()
    }
  }, [])

  useEffect(() => {
    if (isLastPage || isLoading) {
      return
    } else {
      _getFaqListProc()
    }
  }, [pagination])

  function FaqItem({ item }: { item: FAQ }): React.JSX.Element {
    const { faqSbjt, faqCott, msgCode, regdatetime } = item
    const [isOpen, setIsOpen] = useState(false)
    return (
      <View>
        <FaqSbjtWrap onPress={(): void => setIsOpen((prev) => !prev)}>
          <BorderBottom>
            <FaqSbjtTextWrap>
              <Text color={Colors.active}>{$t(msgCode)}</Text>
              <Text>{faqSbjt}</Text>
              <Text size={12} color={Colors.nagative}>
                {moment.utc(regdatetime).format('YY.MM.DD')}
              </Text>
            </FaqSbjtTextWrap>
            <FaqSbjtIconWrap>
              <Icon
                name={`chevron-${isOpen ? 'up' : 'down'}`}
                type="light"
                color={Colors.nagative}
                size={15}
              />
            </FaqSbjtIconWrap>
          </BorderBottom>
        </FaqSbjtWrap>
        {isOpen && (
          <FaqCottWrap>
            <Text color={Colors.nagative}>{faqCott}</Text>
          </FaqCottWrap>
        )}
      </View>
    )
  }

  return (
    <Body hidePadding>
      <SelectBoxWrap>
        <SelectBox
          onValueChange={(value): void => {
            onChangeSelect(value)
          }}
          selectedValue={faqDvsnCode}
          placeholder=""
          items={faqDvsnCodeList}
        />
      </SelectBoxWrap>
      <FlatList
        ref={flatListRef}
        scrollEventThrottle={200}
        data={faqList}
        renderItem={({ item }: { item: FAQ }): React.JSX.Element => (
          <FaqItem item={item} />
        )}
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

const SelectBoxWrap = styled.View`
  padding: 15px;
`

const FaqSbjtWrap = styled.TouchableOpacity`
  padding: 10px 15px 0;
  width: 100%;
`
const BorderBottom = styled.View`
  padding: 10px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.bg1};
`
const FaqCottWrap = styled.View`
  padding: 15px;
  padding-bottom: 30px;
  background-color: ${Colors.gr};
`
const FaqSbjtTextWrap = styled.View``
const FaqSbjtIconWrap = styled.View``
