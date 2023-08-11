import { StackNavigationOptions } from '@react-navigation/stack'
import { SimpleHeaderProps } from '../HeaderModel'
import { Colors, Layout } from '@constants'
import { Platform } from 'react-native'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'
import { ReactNode } from 'react'
import DefaultHeaderRight from './DefaultHeaderRight'
import DefaultHeaderCenter from './DefaultHeaderCenter'
import DefaultHeaderLeft from './DefaultHeaderLeft'

export default function CommonHeader(
  props: SimpleHeaderProps
): StackNavigationOptions {
  const {
    title = '',
    headerLeft,
    headerTitle,
    headerRight,
    headerStyle,
    gestureEnabled = true,
    headerShown = true,
  } = props
  return {
    headerLeft: headerLeft || ((): ReactNode => DefaultHeaderLeft()),
    headerTitle:
      headerTitle ||
      ((): ReactNode => DefaultHeaderCenter({ title })),
    headerRight: headerRight || DefaultHeaderRight,
    gestureEnabled: gestureEnabled,
    headerRightContainerStyle: { flex: 1 },
    headerLeftContainerStyle: { flex: 1 },
    // headerTitleContainerStyle: { flex: 1 },
    headerTitleStyle: { width: '100%' },
    headerShown: headerShown,
    headerStyle: {
      height:
        Layout.headerHeight +
        Platform.select({
          ios: StaticSafeAreaInsets?.safeAreaInsetsTop,
          default: 0,
        }),
      shadowColor: 'transparent',
      borderBottomWidth: 1, //for ios
      borderBottomColor: Colors.wh2,
      elevation: 0,
      backgroundColor: Colors.wh,
      ...headerStyle,
    },
  }
}
