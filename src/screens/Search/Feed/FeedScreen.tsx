import React, { useState } from 'react'
import Text from '@components/Text'
import Body from '@components/Body'
import { Colors, Images } from '@constants'
import styled from 'styled-components/native'
import { FlatList, Image } from 'react-native'
import FeedFilter from '../Filter/FeedFilter'
import IconSort from '@images/svg/IconSort.svg'

export default function FeedScreen(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false)

  // 필터 모달 열기
  const showFilter = (): void => {
    setIsVisible(true)
  }

  interface FeedProps {
    thumbNail: JSX.Element
    title: string
    userId: string
  }

  // 피드결과 임시 데이터
  const data = [
    {
      thumbNail: (
        <ThumbnailWrap>
          {/* 임시 썸네일 */}
          <Image
            source={Images.png.profile}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </ThumbnailWrap>
      ),
      title: `23.03.04 | 'Cookie' has reached for me. A rainy day.`,
      userId: 'user_name1',
    },
    {
      thumbNail: (
        <ThumbnailWrap>
          <Image
            source={Images.png.profile}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </ThumbnailWrap>
      ),
      title: `23.03.04 | 'Cookie' has reached for me. A rainy day.`,
      userId: 'user_name1',
    },
  ]

  // 데이터 렌더링

  function FeedItem({ item }: { item: FeedProps }): JSX.Element {
    return (
      <FeedWrap>
        {item.thumbNail}
        <FeedInfo>
          <Text numberOfLines={1} size={16}>
            {item.title}
          </Text>
          <Text color={Colors.nagative} bold={'500'}>
            {item.userId}
          </Text>
        </FeedInfo>
      </FeedWrap>
    )
  }

  return (
    <Body style={{ backgroundColor: Colors.wh }}>
      <SearchInfoWrap>
        <Text color={Colors.nagative}>
          전체 <Text bold={'500'}>210</Text>개
        </Text>
        <FilterBtn onPress={showFilter}>
          <IconSort />
          <FilterText color={Colors.nagative}>최신순</FilterText>
        </FilterBtn>
      </SearchInfoWrap>
      {/* 검색결과 */}
      <FlatList
        data={data}
        renderItem={FeedItem}
        keyExtractor={(item, index): string => index.toString()}
      />
      {/* 검색 필터 */}
      <FeedFilter isVisible={isVisible} setIsVisible={setIsVisible} />
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

const FeedWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  border-bottom-width: 1px;
  border-color: ${Colors.info};
`

const ThumbnailWrap = styled.View`
  width: 70px;
  height: 70px;
  margin-right: 10px;
`

const FeedInfo = styled.View`
  flex: 4;
`
