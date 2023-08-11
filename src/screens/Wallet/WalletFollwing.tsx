import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import WalletSearch from './WalletSearch'
import { Colors } from '@constants'
import WalletMemberRecord from './components/WalletMemberRecord'
import { MebrVO } from '@models/Common/Wallet'
import transaction from '@api/transaction.api'
/**
 * 송금화면 에서 팔로잉 Tab
 */
export default function WalletFollwing(): JSX.Element {
  const [followingList, setFollowingList] = useState<MebrVO[]>([])

  useEffect(() => {
    transaction.getWalletFollowingList
      .get()
      .then((data) => setFollowingList(data.response.list))
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
        {followingList.map((item, index) => (
          <WalletMemberRecord
            id={item.userId}
            isMember={item.userId}
            walletAddress={item.address}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  )
}
