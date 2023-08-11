import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'

export interface ButtonProps extends ViewProps {
  text?: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  buttonType?:
    | 'normal'
    | 'active'
    | 'enabled'
    | 'negative'
    | 'staking'
  textStyle?: StyleProp<TextStyle>
  padding?: string
}

export interface ActivityButtonProps {
  onPress?: () => void
  clicked: boolean
  size?: 'md' | 'sm'
  activity: 'like' | 'hate' | 'likeN' | 'hateN'
  disabled?: boolean
  activityCount?: number | string
  playAnimation?: boolean
  containerStyle?: StyleProp<ViewStyle>
  isQuest?: boolean
  opYn?: string
}
