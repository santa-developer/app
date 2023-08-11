import {
  GestureResponderEvent,
  TextStyle,
  ViewStyle,
} from 'react-native'

export interface CheckBoxProps {
  title?: JSX.Element | string
  checked: boolean
  onPress: (event: GestureResponderEvent) => void
  checkIcon?: JSX.Element
  nonCheckIcon?: JSX.Element
  bodyStyle?: ViewStyle
  titleStyle?: TextStyle
  style?: ViewStyle
}
