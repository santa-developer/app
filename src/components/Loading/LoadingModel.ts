import { StyleProp, ViewStyle } from 'react-native'

export interface LoadingProps {
  viewStyle?: StyleProp<ViewStyle>
  spinnerStyle?: StyleProp<ViewStyle>
  spinnerColor?: string
  size?: number | 'small' | 'large'
  darkTheme?: boolean
  isHeaderEmpty?: boolean
}
