import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { IMypage } from '@models/Mypage/MYPAGE'
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import {
  headerHeightState,
  isMoreOptionState,
  mySelectSpaceState,
} from '@recoil/atoms/Mypage/mypage'
import { ITabRoute } from '@models/Mypage/MYPAGE_HOME'
import { TabView } from 'react-native-tab-view'
import MoreOptionsModal from '@screens/HABL/Mypage/MyapgeModal/MoreOptionsModal'
import MypageTabar from '@screens/HABL/Mypage/MypageHome/MypageTabar'
import MypageFeed from '@screens/Common/Mypage/MypageFeed'
import SpaceMypageIntro from './SpaceMypageIntro'
import { isLoadingShowState } from '@recoil/atoms/common'

export default function SpaceMypageScreen(
  props: IMypage
): JSX.Element {
  const { mebrMgmtNmbr } = props
  // 더보기 보기 여부
  const [isMoreOption, setIsMoreOption] =
    useRecoilState(isMoreOptionState)
  const [headerHeight, setHeaderHeight] =
    useRecoilState(headerHeightState)
  const mySelectSpace = useRecoilValue(mySelectSpaceState)
  const isLoadingShow = useSetRecoilState(isLoadingShowState)

  // 마이페이지 애니메이션
  const [tabIndex, setTabIndex] = useState(0)
  const [tabRoutes, setTabRoutes] = useState<ITabRoute[]>([
    { key: '', title: '' },
  ])
  const scrollY = useRef<any>(new Animated.Value(0)).current
  const isListGlidingRef = useRef(false)
  const tabIndexRef = useRef(0)
  const listArrRef = useRef([])
  const listOffsetRef = useRef<{ [key: string]: number }>({})

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight?.[mebrMgmtNmbr] || 0],
    outputRange: [0, -headerHeight?.[mebrMgmtNmbr] || 0],
    extrapolate: 'clamp',
  })
  const tabBarTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight?.[mebrMgmtNmbr] || 0],
    outputRange: [headerHeight?.[mebrMgmtNmbr] || 0, 0],
    extrapolateRight: 'clamp',
  })

  const onMomentumScrollBegin = useCallback(() => {
    isListGlidingRef.current = true
  }, [])
  const onMomentumScrollEnd = useCallback(() => {
    isListGlidingRef.current = false
    syncScrollOffset()
  }, [headerHeight])
  const onScrollEndDrag = useCallback(() => {
    syncScrollOffset()
  }, [headerHeight])

  // 더보기 창 닫기 이벤트
  const hideMoreOptions = (): void => {
    setIsMoreOption(false)
  }

  const syncScrollOffset = (): void => {
    const focusedTabKey = tabRoutes[tabIndexRef.current].key

    listArrRef.current.forEach((item: any) => {
      const scrollYValue = scrollY._value

      if (item.key !== focusedTabKey) {
        if (scrollYValue < headerHeight && scrollYValue >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollYValue,
              animated: false,
            })
            listOffsetRef.current[item.key] = scrollYValue
          }
        } else if (scrollYValue >= headerHeight) {
          if (
            listOffsetRef.current[item.key] <
              headerHeight[mebrMgmtNmbr] ||
            listOffsetRef.current[item.key] === null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: headerHeight,
                animated: false,
              })
              listOffsetRef.current[item.key] =
                headerHeight[mebrMgmtNmbr]
            }
          }
        }
      } else {
        if (item.value) {
          listOffsetRef.current[item.key] = scrollYValue
        }
      }
    })
  }

  const renderScene = useCallback(
    ({ route }: { route: ITabRoute }) => {
      const isFocused = route && route.key === tabRoutes[tabIndex].key
      return (
        <MypageFeed
          mebrMgmtNmbr={mebrMgmtNmbr}
          scrollY={scrollY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          tabRoute={route}
          listArrRef={listArrRef}
          isTabFocused={isFocused}
          routeKey={tabRoutes[tabIndex].key}
        />
      )
    },
    [headerHeight, tabIndex]
  )

  const renderTabBar = useCallback(
    (props: { navigationState: { routes: ITabRoute[] } }) => {
      return (
        <MypageTabar
          routes={props.navigationState.routes}
          tabBarTranslateY={tabBarTranslateY}
          onPress={onTabPress}
          tabIndexRef={tabIndexRef}
        />
      )
    },
    [headerHeight]
  )

  const onTabIndexChange = useCallback((id: number) => {
    setTabIndex(id)
    tabIndexRef.current = id
  }, [])

  const onTabPress = useCallback((idx: number) => {
    if (!isListGlidingRef.current) {
      setTabIndex(idx)
      tabIndexRef.current = idx
    }
  }, [])

  // 마이페이지 드래그 애니메이션
  const headerOnLayout = useCallback(
    (event: { nativeEvent: { layout: { height: number } } }) => {
      const { height } = event.nativeEvent.layout
      setHeaderHeight((prev) => ({
        ...prev,
        [mebrMgmtNmbr]: height,
      }))
    },
    []
  )

  // 초기정보 설정
  const initialize = (): void => {
    setTabRoutes(() => [
      { key: 'feed', title: `피드 ${0}` },
      { key: 'comment', title: `작성댓글 ${0}` },
    ])
  }

  useEffect(() => {
    if (mySelectSpace) {
      isLoadingShow(true)
      setTimeout(() => {
        isLoadingShow(false)
      }, 1000)
    }
  }, [mySelectSpace])

  useEffect(() => {
    initialize()
  }, [])

  return (
    <>
      <View style={styles.rootContainer}>
        {headerHeight?.[mebrMgmtNmbr] > 0 && (
          <TabView
            navigationState={{ index: tabIndex, routes: tabRoutes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={onTabIndexChange}
          />
        )}
        <Animated.View
          style={{
            ...styles.headerContainer,
            transform: [{ translateY: headerTranslateY }],
          }}
          onLayout={headerOnLayout}
          pointerEvents="box-none"
        >
          <SpaceMypageIntro />
        </Animated.View>
      </View>
      <MoreOptionsModal
        isVisible={isMoreOption}
        onBackdropPress={hideMoreOptions}
        onBackButtonPress={hideMoreOptions}
      />
    </>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
  },
})
