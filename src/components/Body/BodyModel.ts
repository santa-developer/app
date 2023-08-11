import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native'

export interface BodyProps extends ViewProps {
  children: React.ReactNode
  scrollable?: boolean
  bottomComponent?: React.ReactNode
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onMomentumScrollBegin?: (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => void
  onMomentumScrollEnd?: (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => void
  onRefresh?: () => Promise<void>
  disableRefresh?: boolean
  scrollViewRef?: any
  refreshControlStyle?: StyleProp<ViewStyle>
  hideRefresh?: boolean
  hidePadding?: boolean
  keyboardAvoidingEnabled?: boolean
  useHeader?: boolean
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled'
}
