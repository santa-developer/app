import React from 'react'
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import { Colors } from '@constants'
import Mypage from '@screens/HABL/Mypage'
import { MypageStack } from './MypageStack'
import outOfTabGroup from '../Group/OutOfTabGroup'
import { GroupToStack } from '../GroupTostack'
import { useRecoilValue } from 'recoil'
import { homeLocationState } from '@recoil/atoms/Home/home'

import Home from '@screens/HABL/Home'
import HomeScreen from '@screens/HABL/Home/HomeScreen'
import Space from '@screens/Space/Home'
import SpaceScreen from '@screens/Space/Home/SpaceScreen'

const HomeStack = createStackNavigator()

export default function HomeStackNav(): JSX.Element {
  const homeLocation = useRecoilValue(homeLocationState)

  return (
    <HomeStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: Colors.wh },
        headerStyleInterpolator:
          HeaderStyleInterpolators.forSlideLeft,
        cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {homeLocation === 'HABL' ? (
        <>
          {/* HABL 스택 */}
          <HomeStack.Screen
            name="HomeMain"
            component={Home}
            options={HomeScreen.navigationOptions}
          />
          <MypageStack.Screen
            name="MypageHome"
            component={Mypage}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          {/* CHALLENGE 스택 */}
          <HomeStack.Screen
            name="HomeMain"
            component={Space}
            options={SpaceScreen.navigationOptions}
          />
        </>
      )}
      {/* NFT 스택 */}
      {/* SHOP 스택 */}
      {/* SPACE 스택 */}
      {GroupToStack(HomeStack, outOfTabGroup)}
    </HomeStack.Navigator>
  )
}
