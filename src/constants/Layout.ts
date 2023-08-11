import { Dimensions, Platform } from 'react-native'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const defaultHeaderHeight = 55
const defaultStatusBarHeight = Platform.select({
  ios: StaticSafeAreaInsets.safeAreaInsetsTop,
  default: 0,
})

const TABBAR_HEIGHT = 60

export default {
  window: {
    width,
    height,
  },
  bodyWidth: width - 40,
  isSmallDevice: width < 375,
  buttonAndInputHeight: 50,
  bodyHeight: height - 60,
  headerHeight: defaultHeaderHeight,
  statusBarHeight: defaultStatusBarHeight,
  headerHeightWithStatusBar:
    defaultHeaderHeight + defaultStatusBarHeight,
  TABBAR_HEIGHT,
}

// 탭바 높이
