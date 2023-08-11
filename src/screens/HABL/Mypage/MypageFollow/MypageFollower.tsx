import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import Body from '@components/Body'
import Search from '@components/Search'
import { Colors } from '@constants'
import FollowItem from './FollowItem'

export default function MypageFollower(): JSX.Element {
  const [search, setSearch] = useState('')
  const [followingList, setFollowingList] = useState<number[]>([])

  const handleClear = (): void => {
    setSearch('')
  }

  useEffect(() => {
    setFollowingList(() => [1, 2, 3, 11, 21, 31, 41, 32, 33, 14, 52])
  }, [])

  return (
    <Body style={styles.body}>
      <Search
        text={search}
        onChangeText={setSearch}
        placeholder="사용자 ID 검색"
        onSearch={(): void => {
          return
        }}
        onClear={handleClear}
      />
      <FlatList
        data={followingList}
        renderItem={FollowItem}
        showsVerticalScrollIndicator={false}
      />
    </Body>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.wh,
  },
})
