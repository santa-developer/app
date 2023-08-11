import React, { useEffect, useState } from 'react'
import Body from '@components/Body'
import { View } from 'react-native'
import WalletFillter from './components/WalletFillter'
import WalletRecordHeader from './components/WalletRecordHeader'
import WalletRecordList, {
  IRecord,
  IRecordList,
} from './components/WalletRecordList'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import { ResponseWalletTransactionList } from '@models/Common/Wallet'
import transaction from '@api/transaction.api'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  walletTransactionRecordList,
  walletTransactionWithFilter,
} from '@recoil/atoms/Wallet/wallet'
import moment from 'moment'

/**
 * 토근 거래내역 화면
 */
export default function WalletTokenRecord({
  route,
}: any): JSX.Element {
  const [tokenRecord, setTokenRecord] =
    useState<ResponseWalletTransactionList>({
      pagination: {
        RECORD_COUND: 0,
        PAGE_SIZE: 0,
        currentPageNo: 0,
        recordCountPerPage: 0,
        pageSize: 0,
        totalRecordCount: 0,
      },
      list: [],
      // },
    })
  const setRecordList = useSetRecoilState(walletTransactionRecordList)
  const [recordListWithFilter, setRecordListWithFilter] =
    useRecoilState(walletTransactionWithFilter)
  const {
    params: { hips, won, wonTohips },
  } = route

  //api 호출
  useEffect(() => {
    transaction.getTransactionList
      .get({
        type: '',
        sort: 'desc',
        transactionType: '',
        month: '',
        currPage: 1,
        recordCountPerPage: 100,
      })
      .then((data): void => setTokenRecord(data.response))
  }, [])

  //내역 데이터로 변환
  useEffect(() => {
    let newRecordList: IRecordList[] = []

    tokenRecord.list.map((item) => {
      const date = item.createdAt
      let isExist = false
      const record: IRecord = {
        id: item.id,
        title: item.hispName || 'unknown',
        category: item.type,
        money: Number(item.amount),
        total: Number(item.totalAmount),
        createdAt: item.createdAt,
        transferType: item.transferType,
        transactionType: item.transactionType,
        address: item.address,
        userId: item.userId,
      }

      //비었을때
      if (newRecordList.length === 0) {
        newRecordList.push({ date, list: [record] })
        return
      }

      //이미 존재하는 날짜인지
      newRecordList = newRecordList.map((item) => {
        const itemDate = moment(item.date)
        const findDate = moment(date)

        if (
          itemDate.format('Y') === findDate.format('Y') &&
          itemDate.format('M') === findDate.format('M') &&
          itemDate.format('D') === findDate.format('D')
        ) {
          isExist = true
          return { date: item.date, list: [...item.list, record] }
        }

        return item
      })

      if (!isExist) {
        newRecordList.push({ date, list: [record] })
      }
    })

    setRecordList(newRecordList)
    setRecordListWithFilter(newRecordList)
  }, [tokenRecord])

  return (
    <Body>
      <WalletRecordHeader
        title="보유 HIBS"
        amount={hips}
        won={won}
        wonTohips={wonTohips}
      />
      <View style={{ flex: 4, gap: 20 }}>
        <WalletFillter />
        <WalletRecordList records={recordListWithFilter} />
      </View>
    </Body>
  )
}

WalletTokenRecord.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: 'HIBS 거래내역',
  })
}
