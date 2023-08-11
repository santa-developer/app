import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import PUSH from '@models/Common/PUSH'
import pushApi from '@api/push.api'
import TagItem from './TagItem'
import NoneActiveList from '../NoneListItem'
import _ from 'lodash'

export default function TagActv(): React.JSX.Element {
  const [tagList, setTagList] = useState<PUSH[]>([])

  // 태그 목록 가져오기
  const params = {
    pushTypeArr: ['3'],
  }

  const _actvList = async (): Promise<void> => {
    const result = await pushApi.push.listProc.get({ params })
    if (result.check) {
      const { list } = result.response
      setTagList(() => list)
    }
  }

  useEffect(() => {
    _actvList()
  }, [])

  return (
    <View style={styles.body}>
      {_.isEmpty(tagList) ? (
        <NoneActiveList />
      ) : (
        <FlatList
          data={tagList}
          renderItem={TagItem}
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
