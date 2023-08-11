import { ScrollView } from 'react-native'
import React from 'react'

import SpaceHashtag from './SpaceHashtag'
import styled from 'styled-components/native'
import NavigationService from '@service/NavigationService'

/**
 * 해쉬태그 검색 결과 리스트
 */
export default function SpaceHashTagList(): JSX.Element {
  return (
    <ScrollView
      style={{
        marginVertical: 18,
        flex: 1,
      }}
    >
      <GoHashTagList
        onPress={(): void =>
          NavigationService.navigate('SpaceHashtag')
        }
      >
        <SpaceHashtag />
      </GoHashTagList>
      <SpaceHashtag />
      <SpaceHashtag />
      <SpaceHashtag />
      <SpaceHashtag />
      <SpaceHashtag />
      <SpaceHashtag />
      <SpaceHashtag />
      <SpaceHashtag />
      <SpaceHashtag />
      <SpaceHashtag />
      <SpaceHashtag />
      <SpaceHashtag />
      <SpaceHashtag />
    </ScrollView>
  )
}

const GoHashTagList = styled.TouchableOpacity``
