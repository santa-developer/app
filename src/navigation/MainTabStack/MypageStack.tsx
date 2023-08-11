import { Colors } from '@constants'
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import Mypage from '@screens/HABL/Mypage'
import React from 'react'
import outOfTabGroup from '../Group/OutOfTabGroup'
import { GroupToStack } from '../GroupTostack'
import { RootStackParamList } from '@service/NavigationService'
import { homeLocationState } from '@recoil/atoms/Home/home'
import { useRecoilValue } from 'recoil'
import SpaceMypage from '@screens/Space/SpaceMypage'

export const MypageStack = createStackNavigator<RootStackParamList>()

function MypageStackNav(): JSX.Element {
  const homeLocation = useRecoilValue(homeLocationState)

  return (
    <MypageStack.Navigator
      initialRouteName="MypageHome"
      screenOptions={{
        cardStyle: { backgroundColor: Colors.wh },
        headerStyleInterpolator:
          HeaderStyleInterpolators.forSlideLeft,
        cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {homeLocation === 'HABL' ? (
        <MypageStack.Screen
          name="MypageHome"
          component={Mypage}
          options={{ headerShown: false }}
        />
      ) : (
        <MypageStack.Screen
          name="MypageHome"
          component={SpaceMypage}
          options={{ headerShown: false }}
        />
      )}
      {/* {groupToStack(MyPageStack, allPageGroup)} */}
      {GroupToStack(MypageStack, outOfTabGroup)}
    </MypageStack.Navigator>
  )
}

export default MypageStackNav
