import React, { useState } from 'react'
import SearchTabMenu from './SearchTabMenu'
import Search from '@components/Search'
import { useRecoilValue } from 'recoil'
import { homeLocationState } from '@recoil/atoms/Home/home'
import Body from '@components/Body'
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import SpaceCategory from '@screens/Space/Home/components/SpaceCategory'
import { IStackNavigator } from 'src/navigation/MainTabStack/SearchStack'
import { CommonHeader } from '@components/Header'
import SpaceSearchInit from '@screens/Space/Home/components/SpaceSearchInit'
import SpaceSearch from '@screens/Space/Home/components/SpaceSearch'
// import RecentSearch from './RecentSearch'

export default function SearchScreen({
  navigation,
}: {
  navigation: StackNavigationProp<
    IStackNavigator,
    'SpaceCategoryResult',
    'SpaceHashtag'
  >
}): React.JSX.Element {
  const [search, setSearch] = useState<string>('')
  const [searchFocus, setFocus] = useState(false)
  const location = useRecoilValue(homeLocationState)
  const clearBtn = (): void => {
    setSearch('')
  }

  return (
    <Body>
      <Search
        text={search}
        onChangeText={(value): void => setSearch(value)}
        onSearch={(): void => {
          return
        }}
        onClear={clearBtn}
        onFocus={(): void => setFocus(true)}
        onBlur={(): void => setFocus(false)}
      />
      {/* 최근검색 띄우기 */}
      {/* <RecentSearch /> */}

      {/* 검색결과 탭 */}
      {location === 'HABL' ? (
        <SearchTabMenu />
      ) : !searchFocus ? (
        <SpaceCategory navigation={navigation} />
      ) : search.length === 0 ? (
        <SpaceSearchInit />
      ) : (
        <SpaceSearch navigation={navigation} />
      )}
    </Body>
  )
}

SearchScreen.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    headerShown: false,
  })
}
