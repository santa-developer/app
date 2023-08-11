import { ViewStyle } from 'react-native'

export interface HomeHeaderProps {
  init?: string
}

export interface SearchHeaderProps {
  init?: string
}

export interface SimpleHeaderProps {
  title?: string
  headerTitle?: () => JSX.Element
  headerLeft?: () => JSX.Element
  headerRight?: () => JSX.Element
  headerStyle?: ViewStyle
  gestureEnabled?: boolean
  headerShown?: boolean
}
