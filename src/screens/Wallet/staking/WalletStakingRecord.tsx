import { View } from 'react-native'
import React from 'react'
// import WalletRecordList
// {
//   IRecordList,
// }
// from './components/WalletRecordList'
import Body from '@components/Body'
// import WalletRecordHeader from './components/WalletRecordHeader'
import WalletFillter from '../components/WalletFillter'

/**
 * 스테이킹 내역 화면
 */
export default function WalletStakingRecord(): JSX.Element {
  //임시 더미데이터

  return (
    <Body>
      {/* <WalletRecordHeader title="스테이킹" amount={'150000000'} /> */}
      <View style={{ flex: 4, gap: 20 }}>
        <WalletFillter />
        {/* <WalletRecordList records={recordData} /> */}
      </View>
    </Body>
  )
}
