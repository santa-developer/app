import { Colors } from '@constants'
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import React from 'react'
import outOfTabGroup from '../Group/OutOfTabGroup'
import { GroupToStack } from '../GroupTostack'
import Activity from '@screens/HABL/Activity'
import ActivityScreen from '@screens/HABL/Activity/ActivityScreen'
import { MypageStack } from './MypageStack'
import Mypage from '@screens/HABL/Mypage'

const ActivityStack = createStackNavigator()

export const activityGroup = {}

export default function ActivityStackNav(): JSX.Element {
  return (
    <ActivityStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: Colors.wh },
        headerStyleInterpolator:
          HeaderStyleInterpolators.forSlideLeft,
        cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <ActivityStack.Screen
        name="Activity"
        component={Activity}
        options={ActivityScreen.navigationOptions}
      />
      <MypageStack.Screen
        name="MypageHome"
        component={Mypage}
        options={{ headerShown: false }}
      />
      {/* {groupToStack(MyPageStack, allPageGroup)} */}
      {GroupToStack(ActivityStack, outOfTabGroup)}
    </ActivityStack.Navigator>
  )
}
