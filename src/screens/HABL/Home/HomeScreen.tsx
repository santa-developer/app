import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import home from '@api/home.api'
import BLTB from '@models/Common/BLTB'
import { FlatList } from 'react-native'
import HomeModal from '@components/Modal/HomeModal/HomeModal'
import { StackNavigationOptions } from '@react-navigation/stack'
import Hr from '@components/Hr'
import Card from '@components/Card'
import { CommonHeader } from '@components/Header'
import HomeLeftHeader from '@components/Header/HomeHeader/HomeLeftHeader'
import HomeRightHeader from '@components/Header/HomeHeader/HomeRightHeader'
import { LoadingMark } from '@components/Loading/LoadingScreen'
import _ from 'lodash'
import { Colors } from '@constants'
import PAGINATION from '@models/Common/PAGINATION'
import HomeEmpty from '../../Common/Home/HomeEmpty'

export default function HomeScreen(): JSX.Element {
  const [feedList, setFeedList] = useState<BLTB[]>([])
  const [pagination, setPagination] = useState<{
    popularityPage?: PAGINATION
    followPage?: PAGINATION
  }>({
    popularityPage: undefined,
    followPage: undefined,
  })
  // const setIsLoadingShow = useSetRecoilState(isLoadingShowState)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false)

  // 리프레쉬 이벤트
  const handleRefresh = async (): Promise<void> => {
    setIsRefresh(true)
    getHomeList(1)
    setIsRefresh(false)
  }

  // 피드 정보 가져오기
  const getHomeList = async (listPage: number): Promise<void> => {
    // setIsLoadingShow(true)
    setLoading(true)
    if (listPage === 1) {
      setFeedList([])
    }

    const hablList: BLTB[] = []

    // 인기 피드
    const popularityResult = await home.homePopularityList.get({
      params: { currPage: listPage, recordCountPerPage: 7 },
    })

    // 팔로우 피드
    const followResult = await home.homeFollowList.get({
      params: {
        currPage: listPage,
        recordCountPerPage: 3,
      },
    })

    if (popularityResult.check) {
      const { list, pagination } = popularityResult.response
      if (list) {
        hablList.push(...list)
        setPagination((page) => ({
          ...page,
          popularityPage: pagination,
        }))
      }
    }
    if (followResult.check) {
      const { list, pagination } = followResult.response
      if (list) {
        hablList.push(...list)
        setPagination((page) => ({
          ...page,
          followPage: pagination,
        }))
      }
    }
    setFeedList((list) => {
      const newList = [...list, ...hablList]
      return _.uniqBy(newList, 'postMgmtNmbr')
    })
    setLoading(false)
    // setIsLoadingShow(false)
  }

  const handleNexPage = (): void => {
    // 게시물의 마지막 페이지 일 때 다음 페이지 조회 종료
    if (
      pagination?.popularityPage &&
      pagination?.popularityPage?.currentPageNo >=
        pagination?.popularityPage?.lastPageNo &&
      pagination?.followPage &&
      pagination?.followPage?.currentPageNo >=
        pagination?.followPage?.lastPageNo
    ) {
      return
    }

    if (!_.isEmpty(feedList)) {
      setPage((num) => num + 1)
    }
  }

  // 페이지 카운트 시 다음 페이지 호출
  useEffect(() => {
    if (page > 1) {
      getHomeList(page)
    }
  }, [page])

  useEffect(() => {
    setPage(1)
    getHomeList(1)
  }, [])

  return (
    <>
      <View>
        {feedList && (
          <FlatList
            data={feedList}
            renderItem={Card}
            refreshing={isRefresh}
            onRefresh={handleRefresh}
            ItemSeparatorComponent={(): JSX.Element => (
              <Hr style={styles.hr} />
            )}
            scrollEventThrottle={200}
            onEndReachedThreshold={0.5}
            onEndReached={handleNexPage}
            ListEmptyComponent={<HomeEmpty loading={loading} />}
            ListFooterComponent={<>{loading && <LoadingMark />}</>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        )}
      </View>
      <HomeModal />
    </>
  )
}

HomeScreen.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    headerLeft: HomeLeftHeader,
    headerRight: HomeRightHeader,
  })
}

const styles = StyleSheet.create({
  hr: {
    marginTop: 10,
    borderWidth: 4,
    borderColor: Colors.bg1,
  },
})
