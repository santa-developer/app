import React, { useState } from 'react'
import Body from '@components/Body'
import styled from 'styled-components/native'
import Text from '@components/Text'
import { Colors, Images } from '@constants'
import { FlatList, Image } from 'react-native'
import Filter from '../Filter/Filter'
import IconSort from '@images/svg/IconSort.svg'

export default function AccountScreen(): React.JSX.Element {
  const [isFollowing, setIsFollowing] = useState(false)

  const [isVisible, setIsVisible] = useState(false)

  // 필터 모달 열기
  const showFilter = (): void => {
    setIsVisible(true)
  }

  function handleFlwBtn(): void {
    setIsFollowing(!isFollowing)
    // Dev.log(isFollowing)
  }

  interface AccountProps {
    thumbNail: React.JSX.Element
    userId: string
    intro: string
    // isFollowing: boolean
    btn: React.JSX.Element
  }

  // 계정 검색결과 데이터
  const data: AccountProps[] = [
    {
      thumbNail: (
        <Image
          source={Images.png.profile}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      ),
      userId: 'spiderrrrrrrman',
      intro: '생일선물좀 골라줄래요?? 이러다 내년에 사주겠어요.',
      btn: isFollowing ? (
        <FollowBtn activeOpacity={0.3} onPress={handleFlwBtn}>
          <Text color={Colors.wh}>{'팔로우'}</Text>
        </FollowBtn>
      ) : (
        <FollowingBtn activeOpacity={0.3} onPress={handleFlwBtn}>
          <Text color={Colors.active}>{'팔로잉'}</Text>
        </FollowingBtn>
      ),
    },
    {
      thumbNail: (
        <Image
          source={Images.png.profile}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      ),
      userId: 'woodonglee',
      intro: 'Hey men~ Give me the present list..., Plz..',
      btn: isFollowing ? (
        <FollowBtn activeOpacity={0.3} onPress={handleFlwBtn}>
          <Text color={Colors.wh}>{'팔로우'}</Text>
        </FollowBtn>
      ) : (
        <FollowingBtn activeOpacity={0.3} onPress={handleFlwBtn}>
          <Text color={Colors.active}>{'팔로잉'}</Text>
        </FollowingBtn>
      ),
    },
    {
      thumbNail: (
        <Image
          source={Images.png.profile}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      ),
      userId: '287Park',
      intro: '기다리다 지쳤어요 땡뻘!',
      btn: isFollowing ? (
        <FollowBtn activeOpacity={0.3} onPress={handleFlwBtn}>
          <Text color={Colors.wh}>{'팔로우'}</Text>
        </FollowBtn>
      ) : (
        <FollowingBtn activeOpacity={0.3} onPress={handleFlwBtn}>
          <Text color={Colors.active}>{'팔로잉'}</Text>
        </FollowingBtn>
      ),
    },
  ]

  // 데이터 렌더링
  function AccountItem({
    item,
  }: {
    item: AccountProps
  }): JSX.Element {
    return (
      <AccountWrap>
        <ProfileWrap activeOpacity={0.5}>
          {item.thumbNail}
        </ProfileWrap>
        <ProfileInfoWrap>
          <Text numberOfLines={1} bold={'500'} size={15}>
            {item.userId}
          </Text>
          <Text color={Colors.nagative} numberOfLines={1}>
            {item.intro}
          </Text>
        </ProfileInfoWrap>
        {item.btn}
      </AccountWrap>
    )
  }

  return (
    <Body style={{ backgroundColor: Colors.wh }}>
      {/* 상단 검색 정보 (개수, 필터) */}
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
        renderItem={AccountItem}
        keyExtractor={(item, index): string => index.toString()}
      />
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

const AccountWrap = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`

const ProfileWrap = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`

const ProfileInfoWrap = styled.View`
  flex: 4;
  padding: 0 10px;
`

const FollowBtn = styled.TouchableOpacity`
  padding: 5px 12px;
  background-color: ${Colors.active};
  border-radius: 50px;
`

const FollowingBtn = styled.TouchableOpacity`
  padding: 5px 12px;
  border-width: 1px;
  border-color: ${Colors.active};
  border-radius: 50px;
`
