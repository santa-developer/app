import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  useRecoilState,
  useRecoilValue,
  // useRecoilValue,
} from 'recoil'
import {
  headerHeightState,
  isBottomModalState,
  isMoreOptionState,
  trackingMypageInfoState,
  // trackingMypageFeedListState,
  // trackingMypageInfoState,
} from '@recoil/atoms/Mypage/mypage'
import BottomModal from '@components/BottomModal'
import MoreOptionsModal from './MyapgeModal/MoreOptionsModal'
import UserRelationshopModal from './MyapgeModal/UserRelationshopModal'
import { Colors } from '@constants'
import { Animated } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import MypageIntro from './MypageHome/MypageIntro'
import { TabView } from 'react-native-tab-view'
import { ITabRoute } from '@models/Mypage/MYPAGE_HOME'
import MypageFeed from '../../Common/Mypage/MypageFeed'
import MypageTabar from './MypageHome/MypageTabar'
import { IMypage } from '@models/Mypage/MYPAGE'
import { loginedUserInfoState } from '@recoil/atoms/auth'

export default function MypageScreen(props: IMypage): JSX.Element {
  const { mebrMgmtNmbr } = props

  // 더보기 보기 여부
  const [isMoreOption, setIsMoreOption] =
    useRecoilState(isMoreOptionState)
  // 다른 사용자 마이페이지 옵션정보
  const [isBottomModal, setIsBottomModal] = useRecoilState(
    isBottomModalState
  )
  const loginedUserInfo = useRecoilValue(loginedUserInfoState)

  const [headerHeight, setHeaderHeight] =
    useRecoilState(headerHeightState)

  // 마이페이지 애니메이션
  const [tabIndex, setTabIndex] = useState(0)
  const [tabRoutes, setTabRoutes] = useState<ITabRoute[]>([
    { key: '', title: '' },
  ])
  const isListGlidingRef = useRef(false)
  const tabIndexRef = useRef(0)
  const listArrRef = useRef([])
  const listOffsetRef = useRef<{ [key: string]: number }>({})
  const scrollY = useRef<any>(new Animated.Value(0)).current

  const trackingMypageInfo = useRecoilValue(trackingMypageInfoState)
  const cntInfo = trackingMypageInfo[mebrMgmtNmbr]?.cntInfo
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

  // 더보기 창 닫기 이벤트
  const hideMoreOptions = (): void => {
    setIsMoreOption(false)
  }
  const hideBottomModal = (): void => {
    setIsBottomModal(false)
  }

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
    if (mebrMgmtNmbr === loginedUserInfo.mebrMgmtNmbr) {
      setTabRoutes(() => [
        { key: 'feed', title: `피드 ${cntInfo?.bltbCnt || 0}` },
        { key: 'like', title: `좋아요 ${cntInfo?.bltbVoteCnt || 0}` },
        { key: 'nft', title: `NFT ${cntInfo?.bltbVoteCnt || 0}` },
      ])
    } else {
      setTabRoutes(() => [
        { key: 'feed', title: `피드 ${cntInfo?.bltbCnt || 0}` },
        { key: 'nft', title: `NFT ${cntInfo?.bltbVoteCnt || 0}` },
      ])
    }
  }

  useEffect(() => {
    initialize()
  }, [])

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
          <MypageIntro {...props} />
        </Animated.View>
      </View>
      <MoreOptionsModal
        isVisible={isMoreOption}
        onBackdropPress={hideMoreOptions}
        onBackButtonPress={hideMoreOptions}
      />
      <BottomModal
        isVisible={isBottomModal}
        backgroundColor={Colors.modalBg}
        onBackdropPress={hideBottomModal}
      >
        <UserRelationshopModal />
      </BottomModal>
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
