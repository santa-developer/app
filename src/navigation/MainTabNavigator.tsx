import React from 'react'
import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-fontawesome-pro'
import HomeStackNav from './MainTabStack/HomeStack'
import MypageStackNav from './MainTabStack/MypageStack'
import SearchStackNav from './MainTabStack/SearchStack'
import ActivityStackNav from './MainTabStack/ActivityStackNav'
import IconHome from '@components/Images/Icon/IconHome'
import IconUser from '@components/Images/Icon/IconUser'
import IconAactivity from '@components/Images/Icon/IconAactivity'
import IconSearch from '@components/Images/Icon/IconSearch'
import { Colors } from '@constants'
import styled from 'styled-components/native'
import {
  NavigationState,
  PartialState,
  Route,
} from '@react-navigation/routers'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import outOfTabGroup from './Group/OutOfTabGroup'
import { GestureResponderEvent, TouchableOpacity } from 'react-native'
import { tabNavState } from '@recoil/atoms/common'
import { useSetRecoilState } from 'recoil'

const TabNav = createBottomTabNavigator()

export default function MainTabNavigator(): JSX.Element {
  const setTabNav = useSetRecoilState(tabNavState)

  const getTabBarButton = ({
    funcBeforeOnPress,
  }: {
    funcBeforeOnPress: () => void
  }) =>
    function (props: BottomTabBarButtonProps): JSX.Element {
      const { onPress, ...rest } = props
      const _onPress = (event: GestureResponderEvent): void => {
        funcBeforeOnPress()
        onPress && onPress(event)
      }
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={_onPress}
          {...rest}
        />
      )
    }

  const isTabBarVisible = (
    route: Partial<Route<string>> & {
      state?: PartialState<NavigationState>
    }
  ): boolean => {
    const routeName = getFocusedRouteNameFromRoute(route)
    return !(
      routeName && Object.keys(outOfTabGroup).includes(routeName)
    )
  }

  return (
    <TabNav.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarVisibilityAnimationConfig: {
          show: { animation: 'timing', config: { duration: 300 } },
          hide: { animation: 'timing', config: { duration: 100 } },
        },
        tabBarStyle: {
          // 탭바가 아닌 항목에 대해서는 탭바 가림
          display: isTabBarVisible(route) ? 'flex' : 'none',
        },
      })}
    >
      <TabNav.Screen
        name="HomeStack"
        component={HomeStackNav}
        options={(): BottomTabNavigationOptions => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: getTabBarButton({
            funcBeforeOnPress: () => {
              setTabNav('Home')
            },
          }),
          tabBarIcon: ({ focused }): JSX.Element => (
            <IconHome fill={focused ? Colors.pu : Colors.disabled} />
          ),
        })}
      />
      <TabNav.Screen
        name="SearchStack"
        component={SearchStackNav}
        options={(): BottomTabNavigationOptions => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarButton: getTabBarButton({
            funcBeforeOnPress: () => {
              setTabNav('Search')
            },
          }),
          tabBarIcon: ({ focused }): JSX.Element => (
            <IconSearch
              fill={focused ? Colors.pu : Colors.disabled}
            />
          ),
        })}
      />
      <TabNav.Screen
        name="UploadStack"
        component={HomeStackNav}
        options={(): BottomTabNavigationOptions => ({
          tabBarShowLabel: false,
          tabBarButton: getTabBarButton({
            funcBeforeOnPress: () => {
              setTabNav('Upload')
            },
          }),
          tabBarIcon: (): JSX.Element => (
            <>
              <UploadCicle>
                <Icon
                  name="plus"
                  size={28}
                  color={Colors.wh}
                  type={'light'}
                />
              </UploadCicle>
            </>
          ),
        })}
      />
      <TabNav.Screen
        name="ActivityStack"
        component={ActivityStackNav}
        options={(): BottomTabNavigationOptions => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: getTabBarButton({
            funcBeforeOnPress: () => {
              setTabNav('Activity')
            },
          }),
          tabBarIcon: ({ focused }): JSX.Element => (
            <IconAactivity
              stroke={focused ? Colors.pu : Colors.disabled}
            />
          ),
        })}
      />
      <TabNav.Screen
        name="MypageStack"
        component={MypageStackNav}
        options={(): BottomTabNavigationOptions => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: getTabBarButton({
            funcBeforeOnPress: () => {
              setTabNav('MypageHome')
            },
          }),
          tabBarIcon: ({ focused }): JSX.Element => (
            <IconUser
              stroke={focused ? Colors.pu : Colors.disabled}
            />
          ),
        })}
      />
    </TabNav.Navigator>
  )
}

const UploadCicle = styled.View`
  height: 65px;
  width: 65px;
  background-color: ${Colors.active};
  border-radius: 50px;
  position: absolute;
  bottom: 33%;
  justify-content: center;
  align-items: center;
`
