import React from 'react'
import { ScrollView } from 'react-native'
import SpaceFeedToSearch from './SpaceFeedToSearch'

/**
 * 스페이스피드 검색 리스트
 */
export default function SpaceFeedList(): JSX.Element {
  return (
    <ScrollView
      style={{
        marginVertical: 18,
        flex: 1,
      }}
    >
      <SpaceFeedToSearch />
      <SpaceFeedToSearch />
      <SpaceFeedToSearch />
      <SpaceFeedToSearch />
      <SpaceFeedToSearch />
      <SpaceFeedToSearch />
      <SpaceFeedToSearch />
      <SpaceFeedToSearch />
    </ScrollView>
  )
}
