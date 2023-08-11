import React from 'react'
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import { Colors } from '@constants'
import Search from '@screens/Search'
import { GroupToStack } from '../GroupTostack'
import outOfTabGroup from '../Group/OutOfTabGroup'
import SearchScreen from '@screens/Search/SearchScreen'

const SearchStack = createStackNavigator()

export default function SearchStackNav(): JSX.Element {
  return (
    <SearchStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: Colors.wh },
        headerStyleInterpolator:
          HeaderStyleInterpolators.forSlideLeft,
        cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={SearchScreen.navigationOptions}
      />
      {/* {groupToStack(HomeStack, allPageGroup)}  */}
      {GroupToStack(SearchStack, outOfTabGroup)}
    </SearchStack.Navigator>
  )
}

export interface IStackNavigator {
  [SpaceCategoryResult: string]: undefined
}
