import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { Colors } from '@constants'
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import { isModalVisibleState } from '@recoil/atoms/Home/home'
import {
  isCopyURLVisibleState,
  isVisibleState,
} from '@recoil/atoms/alert'
import { isLoggedInState } from '@recoil/atoms/auth'
import { navigationRef } from '@service/NavigationService'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components/native'
import { showPushTooltipState } from '../state/recoil/atoms/common'
import AuthNavigator from './AuthNavigator'
import MainTabNavigator from './MainTabNavigator'

const Stack = createStackNavigator()
export default function AppNavigator(): JSX.Element {
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const isVisible = useRecoilValue(isVisibleState)
  const isCopyURLVisible = useRecoilValue(isCopyURLVisibleState)
  const isModalVisible = useRecoilValue(isModalVisibleState)
  const setShowPushTooltip = useSetRecoilState(showPushTooltipState)

  return (
    <Wrapper
      onTouchStart={(): void => {
        if (!(isVisible || isCopyURLVisible || isModalVisible)) {
          setShowPushTooltip(false)
        }
      }}
    >
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: Colors.wh },
            cardStyleInterpolator:
              CardStyleInterpolators.forNoAnimation,
          }}
        >
          {isLoggedIn ? (
            <Stack.Screen
              name={'MainNav'}
              component={MainTabNavigator}
            />
          ) : (
            <Stack.Screen
              name={'AuthNav'}
              component={AuthNavigator}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  flex: 1;
`
