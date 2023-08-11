import React, { useState } from 'react'
import Text from '@components/Text'
import styled from 'styled-components/native'
import { TouchableOpacity, Image } from 'react-native'
import { Colors, Images } from '@constants'
import _ from 'lodash'
import IconTrash from '@components/Images/Icon/IconTrash'
import IconXmark from '@components/Images/Icon/IconXmark'

export default function RecentSearch(): React.JSX.Element {
  // 최근 검색어 임시 데이터
  const [recentSearchKeyword, setRecentSearchKeyword] = useState<
    string[]
  >([
    '뉴진수',
    '흠뻑쇼',
    '뮤지컬',
    'Fresh Blood List',
    '프랑케슈타인',
    '거침없이 하이킥',
    '지붕뚫고 하이킥',
    '하이킥 (짧은다리의 역습)',
    '워터밤',
    '박재범',
    '몸매',
    '로꼬',
  ])

  // 전체 삭제 이벤트
  function AllDelete(): void {
    setRecentSearchKeyword([])
  }

  // 개별 삭제 이벤트
  function DeleteKeyword(index: number): void {
    const updateKeywords = [...recentSearchKeyword]
    updateKeywords.splice(index, 1)
    setRecentSearchKeyword(updateKeywords)
  }
  return (
    <>
      <RecentSearchHeader>
        <Text>최근검색</Text>
        <DeleteBox onPress={(): void => AllDelete()}>
          <DeleteText color={Colors.nagative}>전체삭제</DeleteText>
          <IconTrash />
        </DeleteBox>
      </RecentSearchHeader>

      {/* 최근검색 없을 경우 */}
      <EmptySearchBox>
        <EmptyContent>
          <Image
            source={Images.gif.folderIsEmpty}
            style={{
              width: '100%',
              height: 300,
            }}
          />
          <EmptyText color={Colors.nagative} size={14}>
            원하는 콘텐츠를 찾아보세요.
          </EmptyText>
        </EmptyContent>
      </EmptySearchBox>

      {/* 최근 검색어 있을 경우 */}
      <RecentSearchBox contentContainerStyle={{ paddingBottom: 20 }}>
        {_.map(recentSearchKeyword, (keyword, i) => (
          <RecentKeywordWrap key={i}>
            <TouchableOpacity>
              <Text size={14} bold={'500'}>
                {keyword}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={(): void => DeleteKeyword(i)}>
              <IconXmark />
            </TouchableOpacity>
          </RecentKeywordWrap>
        ))}
      </RecentSearchBox>
    </>
  )
}

const RecentSearchHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin-top: 15px;
  padding-bottom: 20px;
`

const DeleteBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const DeleteText = styled(Text)`
  margin-right: 5px;
`

const EmptySearchBox = styled.View`
  height: 100%;
  position: relative;
  justify-content: center;
  display: none;
`

const EmptyContent = styled.View`
  width: 100%;
  margin-bottom: 200px;
`

const EmptyText = styled(Text)`
  text-align: center;
  margin-top: 20px;
`

const RecentSearchBox = styled.ScrollView`
  padding: 0px 15px;
  flex: 1;
`

const RecentKeywordWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.info};
  background-color: ${Colors.wh};
`
