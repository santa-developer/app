import Text from '@components/Text'
import React, { useState, useEffect } from 'react'
import Body from '@components/Body'
import { Colors, Layout } from '@constants'
import styled from 'styled-components/native'
import IconAlertCircle from '@images/svg/IconAlertCircle.svg'
import PontInfoModal from './PointInfoModal'
import { FlatList, Image } from 'react-native'
import IconHate from '@components/Images/Icon/IconHate'
import {
  AtvPointProps,
  WknbMgmtProps,
} from '@models/Mypage/NOW_POINT'
import myPage from '@api/mypage.api'
import BeforeCount from './BeforeCount'
import NonePosts from './NonePosts'
import ImageUtils from '@utils/ImageUtils'
import { AtvtBltbProps } from '@models/Mypage/ATVT_LIST'
import _ from 'lodash'

export default function DisLikePosts(): React.JSX.Element {
  const [pointModal, setPointModal] = useState(false)
  const [atvtPoint, setAtvtPoint] = useState<AtvPointProps>()
  const [nowData, setNowData] = useState<WknbMgmtProps>()
  const [postList, setPostList] = useState<AtvtBltbProps[]>([])

  // 스테이킹 정보 가져오기
  const _loadMyPointInfo = async (): Promise<void> => {
    return myPage.nowpoint
      .get()
      .then(async (result) => {
        if (result.check) {
          setAtvtPoint(result.response.atvtPoint)
          setNowData(result.response.nowData)
        } else {
          // await setDefaultMsg()
        }
      })
      .catch(async () => {
        // await setDefaultMsg()
      })
  }

  // 게시물 목록 조회
  const actvtListParams = {
    currPage: 1,
    recordCountPerPage: 10,
    blbtType: 'hate',
  }

  const _loadMyAtvyList = async (): Promise<void> => {
    const result = await myPage.getAtvtRecivedList.get({
      params: actvtListParams,
    })
    if (result.check) {
      const { list } = result.response
      setPostList(() => list)
    }
  }

  useEffect(() => {
    _loadMyPointInfo()
    _loadMyAtvyList()
  }, [])

  // 포인트 모달 열기
  const showModal = (): void => {
    setPointModal(true)
  }

  // 데이터 렌더링
  function DisLikePost({
    item,
  }: {
    item: AtvtBltbProps
  }): React.JSX.Element {
    return (
      <PostBox>
        <PostImg>
          <Image
            source={ImageUtils.getImageSource({
              type: 'user',
              id: item.bltbThnl,
              size: 200,
            })}
            style={{ width: '100%', height: '100%' }}
          />
        </PostImg>
        <PostBoxBottom>
          <IconHate width={12} height={12} />
          <Text
            size={13}
            color={Colors.nagative}
            style={{ marginLeft: 5 }}
          >
            {item.newHateRCnt}
          </Text>
        </PostBoxBottom>
      </PostBox>
    )
  }

  return (
    <Body style={{ backgroundColor: Colors.gr }} hidePadding>
      <DisLikeInfo>
        <Text size={16}>싫어요 받은 게시물</Text>
        <DisLikePntInfo onPress={showModal}>
          {nowData?.weekPoitRegYn === 'Y' ? (
            <Text
              style={{ marginRight: 5 }}
              size={16}
              color={Colors.error}
            >
              {Number(atvtPoint?.newHateRPnt)}P
            </Text>
          ) : (
            <Text
              style={{ marginRight: 5 }}
              size={16}
              color={Colors.error}
            >
              - P
            </Text>
          )}

          <IconAlertCircle />
        </DisLikePntInfo>
        {pointModal && (
          <PontInfoModal
            isVisible={pointModal}
            setPointModal={setPointModal}
          />
        )}
      </DisLikeInfo>

      {/* 게시물 리스트 */}
      {nowData?.weekPoitRegYn === 'Y' ? (
        <PostsWrap>
          {_.isEmpty(postList) ? (
            <NonePosts />
          ) : (
            <FlatList
              data={postList}
              renderItem={DisLikePost}
              keyExtractor={(item, index): string => index.toString()}
              numColumns={3}
              contentContainerStyle={{ paddingBottom: 150 }}
            />
          )}
        </PostsWrap> // 주간활동 포인트 배치 실행 전
      ) : (
        <BeforeCount />
      )}
    </Body>
  )
}

const DisLikeInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px;
`

const DisLikePntInfo = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`
const PostsWrap = styled.View`
  width: 100%;
  margin: 0 auto;
`

const PostBox = styled.TouchableOpacity`
  background-color: ${Colors.wh};
  width: ${Layout.window.width / 3.6}px;
  height: ${Layout.window.width / 3.0}px;
  border-radius: 4px;
  margin: 1.5% 2%;
  box-shadow: 0 0 0 rgba(186, 186, 186, 0.1);
  overflow: hidden;
`

const PostImg = styled.View`
  width: 100%;
  height: ${Layout.window.width / 3.6}px;
  background-color: ${Colors.bg2};
`

const PostBoxBottom = styled.View`
  flex-direction: row;
  padding-left: 5px;
  align-items: center;
`
