import React from 'react'
import { ScrollView } from 'react-native'
import SpaceAccount from './SpaceAccount'

/**
 * 검색된 스페이스 계정 리스트
 */
export default function SpaceAccountList(): JSX.Element {
  return (
    <ScrollView
      style={{
        marginVertical: 18,
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
      <SpaceAccount />
    </ScrollView>
  )
}
