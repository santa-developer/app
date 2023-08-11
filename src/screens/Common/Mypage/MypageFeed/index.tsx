import {
  headerHeightState,
  trackingMypageFeedListState,
} from '@recoil/atoms/Mypage/mypage'
import React, { useCallback } from 'react'
import { View, Animated, Dimensions, StyleSheet } from 'react-native'
import { useRecoilValue } from 'recoil'
import { ITabRoute } from '@models/Mypage/MYPAGE_HOME'
import { Layout } from '@constants'
import _ from 'lodash'
import MypageNonFeed from './MypageNonFeed'
import MypageFeedItem from './MypageFeedItem'

const window = Dimensions.get('window')
const { TABBAR_HEIGHT } = Layout

export default function MypageContents(props: {
  mebrMgmtNmbr: string
  scrollY?: Animated.Value
  onMomentumScrollBegin?: () => void
  onMomentumScrollEnd?: () => void
  onScrollEndDrag?: () => void
  tabRoute: ITabRoute
  listArrRef?: any
  isTabFocused?: boolean
  routeKey: string
}): JSX.Element {
  const { tabRoute, listArrRef, isTabFocused } = props

  const headerHeight = useRecoilValue(headerHeightState)
  const trackingMypageFeedList = useRecoilValue(
    trackingMypageFeedListState
  )
  const list = trackingMypageFeedList[props.mebrMgmtNmbr].list

  const keyExtractor = useCallback(
    (item: any, index: number) => index.toString(),
    []
  )

  const flatListRef = (ref: any): any => {
    const foundIndex = listArrRef.current.findIndex(
      (e: { key: any }) => e.key === tabRoute.key
    )

    if (foundIndex === -1) {
      listArrRef.current.push({
        key: tabRoute.key,
        value: ref,
      })
    } else {
      listArrRef.current[foundIndex] = {
        key: tabRoute.key,
        value: ref,
      }
    }
  }

  return (
    <>
      {_.isEmpty(list) ? (
        <MypageNonFeed mebrMgmtNmbr={props.mebrMgmtNmbr} />
      ) : (
        <View style={styles.container}>
          <Animated.FlatList
            ref={flatListRef}
            data={list}
            renderItem={MypageFeedItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={{
              paddingTop: headerHeight[props.mebrMgmtNmbr],
              minHeight:
                window.height +
                headerHeight[props.mebrMgmtNmbr] -
                TABBAR_HEIGHT -
                165,
            }}
            scrollEventThrottle={16}
            numColumns={3}
            onScroll={
              isTabFocused
                ? Animated.event(
                    [
                      {
                        nativeEvent: {
                          contentOffset: {
                            y: props.scrollY || new Animated.Value(0),
                          },
                        },
                      },
                    ],
                    { useNativeDriver: true }
                  )
                : undefined
            }
            onMomentumScrollBegin={props.onMomentumScrollBegin}
            onMomentumScrollEnd={props.onMomentumScrollEnd}
            onScrollEndDrag={props.onScrollEndDrag}
            showsVerticalScrollIndicator={false}
            bounces={false}
          />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
