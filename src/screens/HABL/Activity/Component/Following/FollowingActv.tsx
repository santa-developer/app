import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import pushApi from '@api/push.api'
import PUSH from '@models/Common/PUSH'
import FollowingItem from './FollowingItem'
import NoneActiveList from '../NoneListItem'
import _ from 'lodash'

export default function FollowingActv(): React.JSX.Element {
  const [followingList, setFollowingList] = useState<PUSH[]>([])

  // 팔로우 목록 가져오기
  const params = {
    pushTypeArr: ['2'],
  }

  const _actvList = async (): Promise<void> => {
    const result = await pushApi.push.listProc.get({ params })
    if (result.check) {
      const { list } = result.response
      setFollowingList(() => list)
    }
  }

  useEffect(() => {
    _actvList()
  }, [])

  return (
    <View style={styles.body}>
      {_.isEmpty(followingList) ? (
        <NoneActiveList />
      ) : (
        <FlatList
          data={followingList}
          renderItem={FollowingItem}
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
