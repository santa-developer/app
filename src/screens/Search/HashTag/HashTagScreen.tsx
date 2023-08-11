import React, { useState } from 'react'
import Text from '@components/Text'
import Body from '@components/Body'
import { Colors } from '@constants'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import Filter from '../Filter/Filter'
import IconSort from '@images/svg/IconSort.svg'
import IconHashtag from '@images/svg/IconHashtag.svg'

export default function HashTagScreen(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false)

  // 필터 모달 열기
  const showFilter = (): void => {
    setIsVisible(true)
  }

  interface HashTagProps {
    hashTag: string
    postCount: string
  }

  // 해시태그 검색결과 데이터
  const data: HashTagProps[] = [
    {
      hashTag: '#워터밤',
      postCount: '게시글 2,349개',
    },
    {
      hashTag: '#흠뻑쇼',
      postCount: '게시글 2,000개',
    },
    {
      hashTag: '#흠뻑쇼코디',
      postCount: '게시글 212개',
    },
  ]

  // 데이터 렌더링
  function HashTagItem({
    item,
  }: {
    item: HashTagProps
  }): JSX.Element {
    return (
      <HashTagWrap>
        <IconWrap>
          <IconHashtag />
        </IconWrap>
        <HashTagText>
          <Text size={16} bold={'500'}>
            {item.hashTag}
          </Text>
          <Text color={Colors.nagative}>{item.postCount}</Text>
        </HashTagText>
      </HashTagWrap>
    )
  }

  return (
    <Body style={{ backgroundColor: Colors.wh }}>
      {/* 상단 검색 정보 */}
      <SearchInfoWrap>
        <Text color={Colors.nagative}>
          전체 <Text bold={'500'}>210</Text>개
        </Text>
        <FilterBtn onPress={showFilter}>
          <IconSort />
          <FilterText color={Colors.nagative}>최신순</FilterText>
        </FilterBtn>
      </SearchInfoWrap>
      {/* 검색 결과 */}
      <FlatList
        renderItem={HashTagItem}
        data={data}
        keyExtractor={(item, index): string => index.toString()}
      ></FlatList>
      {/* 검색 필터 */}
      <Filter isVisible={isVisible} setIsVisible={setIsVisible} />
    </Body>
  )
}

const SearchInfoWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const FilterBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const FilterText = styled(Text)`
  margin-left: 5px;
`

const HashTagWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`

const IconWrap = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`

const HashTagText = styled.View`
  margin-left: 8px;
`
