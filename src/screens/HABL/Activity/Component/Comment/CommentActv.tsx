import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import pushApi from '@api/push.api'
import PUSH from '@models/Common/PUSH'
import CommentItem from './CommentItem'
import _ from 'lodash'
import NoneActiveList from '../NoneListItem'

export default function CommentActv(): React.JSX.Element {
  const [commentList, setCommentList] = useState<PUSH[]>([])

  // 댓글 목록 가져오기
  const params = {
    pushTypeArr: ['1'],
  }

  const _actvList = async (): Promise<void> => {
    const result = await pushApi.push.listProc.get({ params })
    if (result.check) {
      const { list } = result.response
      setCommentList(() => list)
    }
  }

  useEffect(() => {
    _actvList()
  }, [])

  return (
    <View style={styles.body}>
      {_.isEmpty(commentList) ? (
        <NoneActiveList />
      ) : (
        <FlatList
          data={commentList}
          renderItem={CommentItem}
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
