import React, { useEffect, useState } from 'react'
import SpaceSearchResultHeader from './SpaceSearchResultHeader'
import { useRecoilState } from 'recoil'
import { spaceSearchLocationState } from '@recoil/atoms/Space/space'
import styled from 'styled-components/native'
import Text from '@components/Text'
import { Colors } from '@constants'
import SpaceFeedList from './SpaceFeedList'
import SpaceAccountList from './SpaceAccountList'
import SpaceListToSearch from './SpaceListToSearch'
import SpaceHashTagList from './SpaceHashTagList'

/**
 * 스페이스 통합 검색결과 화면
 */
export default function SpaceSearch(): JSX.Element {
  const [category, setCategory] = useRecoilState(
    spaceSearchLocationState
  )
  const [component, setComponent] = useState(<SpaceListToSearch />)

  useEffect(() => {
    if (category === 'space') setComponent(<SpaceListToSearch />)
    if (category === 'account') setComponent(<SpaceAccountList />)
    if (category === 'spaceFeed') setComponent(<SpaceFeedList />)
    if (category === 'hashtag') setComponent(<SpaceHashTagList />)
  }, [category])

  return (
    <>
      <CategoryButtonContainer>
        <CategoryButton
          currentButton="space"
          currentCategory={category}
          onPress={(): void => setCategory('space')}
        >
          <CategoryText
            currentButton="space"
            currentCategory={category}
          >
            스페이스
          </CategoryText>
        </CategoryButton>

        <CategoryButton
          currentButton="account"
          currentCategory={category}
          onPress={(): void => setCategory('account')}
        >
          <CategoryText
            currentButton="account"
            currentCategory={category}
          >
            계정
          </CategoryText>
        </CategoryButton>

        <CategoryButton
          currentButton="spaceFeed"
          currentCategory={category}
          onPress={(): void => setCategory('spaceFeed')}
        >
          <CategoryText
            currentButton="spaceFeed"
            currentCategory={category}
          >
            스페이스 피드
          </CategoryText>
        </CategoryButton>

        <CategoryButton
          currentButton="hashtag"
          currentCategory={category}
          onPress={(): void => setCategory('hashtag')}
        >
          <CategoryText
            currentButton="hashtag"
            currentCategory={category}
          >
            해시태그
          </CategoryText>
        </CategoryButton>
      </CategoryButtonContainer>
      <SpaceSearchResultHeader />
      {component}
    </>
  )
}

interface ICategoryButton {
  currentCategory: string
  currentButton: string
}

const CategoryButton = styled.TouchableOpacity<ICategoryButton>`
  padding: 3px 12px;
  border: 1px;
  border-radius: 15px;
  height: auto;
  width: auto;
  border-color: ${(props): string => {
    if (props.currentButton === props.currentCategory)
      return Colors.active

    return Colors.disabled
  }};
`

const CategoryText = styled(Text)<ICategoryButton>`
  color: ${(props): string =>
    props.currentButton === props.currentCategory
      ? Colors.active
      : Colors.disabled};
`
const CategoryButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  gap: 10px;
  margin-bottom: 15px;
`
