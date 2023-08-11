import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import pushApi from '@api/push.api'
import PUSH from '@models/Common/PUSH'
import LikeItem from './LikeItem'
import NoneActiveList from '../NoneListItem'
import _ from 'lodash'

export default function LikeActve(): React.JSX.Element {
  const [likeList, setLikeList] = useState<PUSH[]>([])

  // 좋아요, 싫어요 목록 가져오기
  const params = {
    pushTypeArr: ['7'],
  }

  const _actvList = async (): Promise<void> => {
    const result = await pushApi.push.listProc.get({ params })
    if (result.check) {
      const { list } = result.response
      setLikeList(() => list)
    }
  }

  useEffect(() => {
    _actvList()
  }, [])

  return (
    <View style={styles.body}>
      {_.isEmpty(likeList) ? (
        <NoneActiveList />
      ) : (
        <FlatList
          data={likeList}
          renderItem={LikeItem}
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
