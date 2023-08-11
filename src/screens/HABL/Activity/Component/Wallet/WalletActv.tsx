import React, { useState, useEffect } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import pushApi from '@api/push.api'
import PUSH from '@models/Common/PUSH'
import WalletItem from '@screens/HABL/Activity/Component/Wallet/WalletItem'
import NoneActiveList from '../NoneListItem'
import _ from 'lodash'

export default function WalletActv(): React.JSX.Element {
  const [walletList, setWalletList] = useState<PUSH[]>([])

  // 지갑 목록 가져오기
  const params = {
    pushTypeArr: ['4'],
  }

  const _actvList = async (): Promise<void> => {
    const result = await pushApi.push.listProc.get({ params })
    if (result.check) {
      const { list } = result.response
      setWalletList(() => list)
    }
  }

  useEffect(() => {
    _actvList()
  }, [])

  return (
    <View style={styles.body}>
      {_.isEmpty(walletList) ? (
        <NoneActiveList />
      ) : (
        <FlatList
          data={walletList}
          renderItem={WalletItem}
          keyExtractor={(item, index): string => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    height: '100%',
  },
})
