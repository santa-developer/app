import React, { useEffect, useState } from 'react'
import { Colors } from '@constants'
import { ScrollView, View } from 'react-native'
import WalletSearch from './WalletSearch'
import WalletMemberRecord from './components/WalletMemberRecord'
import transaction from '@api/transaction.api'
import { RecentReceiverVO } from '@models/Common/WALLET'

/**
 * 최근목록 화면
 */
export default function WalletRecentPlace(): JSX.Element {
  const [recentList, setRecentList] = useState<RecentReceiverVO[]>([])

  useEffect(() => {
    transaction.getRecentList
      .get({
        currPage: 1,
        recordCountPerPage: 1,
        searchText: '',
      })
      .then((data) => {
        setRecentList(data.response.response.list)
      })
  }, [])

  return (
    <View
      style={{
        backgroundColor: Colors.wh,
        height: '100%',
        paddingTop: 20,
        paddingHorizontal: 10,
      }}
    >
      <WalletSearch />
      <ScrollView showsVerticalScrollIndicator={false}>
        {recentList.map((item, index) => (
          <WalletMemberRecord
            id={item.id}
            isMember={item.memberId}
            key={index}
            walletAddress={item.address}
          />
        ))}
      </ScrollView>
    </View>
  )
}
