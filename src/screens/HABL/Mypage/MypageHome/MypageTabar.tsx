import { ITabRoute } from '@models/Mypage/MYPAGE_HOME'
import React from 'react'
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Colors, Layout } from '@constants'
import Text from '@components/Text'

const { TABBAR_HEIGHT } = Layout

export default function MypageTabar({
  routes,
  tabBarTranslateY,
  onPress,
  tabIndexRef,
}: {
  routes: ITabRoute[]
  tabBarTranslateY: Animated.Value
  onPress: any
  tabIndexRef: any
}): JSX.Element {
  return (
    <Animated.View
      style={[
        styles.collapsibleTabBar,
        { transform: [{ translateY: tabBarTranslateY }] },
      ]}
    >
      {routes.map((route: ITabRoute, idx: number) => {
        return (
          <TouchableOpacity
            style={[
              styles.collapsibleTabBarButton,
              {
                borderBottomWidth:
                  idx === tabIndexRef.current ? 2 : 0,
              },
            ]}
            key={idx}
            onPress={(): void => onPress(idx)}
          >
            <View style={styles.collapsibleTabBarLabelContainer}>
              <Text
                style={[
                  styles.collapsibleTabBarLabelText,
                  {
                    color:
                      idx === tabIndexRef.current
                        ? Colors.bl
                        : Colors.disabled,
                  },
                ]}
              >
                {route.title}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  collapsibleTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: TABBAR_HEIGHT - 15,
    backgroundColor: Colors.wh,
    zIndex: 1,
  },
  collapsibleTabBarButton: {
    flex: 1,
  },
  collapsibleTabBarLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  collapsibleTabBarLabelText: {
    fontSize: 15,
    color: Colors.bl,
  },
})
