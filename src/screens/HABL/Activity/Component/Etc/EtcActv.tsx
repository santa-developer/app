import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import EtcItem from './EtcItem'
import pushApi from '@api/push.api'
import PUSH from '@models/Common/PUSH'
import _ from 'lodash'
import NoneActiveList from '../NoneListItem'

export default function EtcActv(): React.JSX.Element {
  const [etcList, setEtcList] = useState<PUSH[]>([])

  // 기타 목록 가져오기
  const params = {
    pushTypeArr: ['5'],
  }

  const _actvList = async (): Promise<void> => {
    const result = await pushApi.push.listProc.get({ params })
    if (result.check) {
      const { list } = result.response
      setEtcList(() => list)
    }
  }

  useEffect(() => {
    _actvList()
  }, [])

  return (
    <View style={styles.body}>
      {_.isEmpty(etcList) ? (
        <NoneActiveList />
      ) : (
        <FlatList
          data={etcList}
          renderItem={EtcItem}
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
