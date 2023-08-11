import Text from '@components/Text'
import React, { useEffect, useState } from 'react'
import Body from '@components/Body'
import { Colors, Layout, Images } from '@constants'
import styled from 'styled-components/native'
import IconAlertCircle from '@images/svg/IconAlertCircle.svg'
import HunterInfoModal from './HunterInfoModal'
import { FlatList, TouchableOpacity, View, Image } from 'react-native'
import dec from '@api/dec.api'
import myPage from '@api/mypage.api'
import BeforeCount from './BeforeCount'
import NonePosts from './NonePosts'
import {
  AtvPointProps,
  WknbMgmtProps,
} from '@models/Mypage/NOW_POINT'
import { AtvtBltbProps } from '@models/Mypage/ATVT_LIST'
import HunterModal from '@screens/HABL/Activity/Component/Complain/HunterModal'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import { useRecoilState } from 'recoil'
import ImageUtils from '@utils/ImageUtils'
import _ from 'lodash'

export default function HunterPosts(): React.JSX.Element {
  const [loginedUserInfo] = useRecoilState(loginedUserInfoState)
  const [hunterPointModal, setHunterPointModal] = useState(false) // 헌터 포인트 모달 (포인트 안내)
  const [beHunterModal, setBeHunterModal] = useState(false) // 헌터 선정 기준 모달(헌터 아닐 때)
  const [isHunter, setIsHunter] = useState<string>()
  const [nowData, setNowData] = useState<WknbMgmtProps>()
  const [atvtPoint, setAtvtPoint] = useState<AtvPointProps>()
  const [postList, setPostList] = useState<AtvtBltbProps[]>([])

  // 헌터여부 확인하기
  const _loadHunterYn = async (): Promise<void> => {
    const result = await dec.hunter.post()
    if (result.check) {
      setIsHunter(result.response.weekHunterYn)
    }
  }

  // 스테이킹 정보 가져오기 (배치 실행 여부, 포인트 점수)
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
    blbtType: 'hunter',
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
    _loadHunterYn()
    _loadMyPointInfo()
    _loadMyPointInfo()
    _loadMyAtvyList()
  }, [])

  // 헌터 포인트 모달 (포인트 안내)
  const showPointModal = (): void => {
    setHunterPointModal(true)
  }
  // 헌터 선정 기준 모달(헌터 아닐 때)
  const showBeHunterModal = (): void => {
    setBeHunterModal(true)
  }

  // 데이터 렌더링
  function HunterPost({
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
      </PostBox>
    )
  }

  return (
    <Body style={{ backgroundColor: Colors.gr }} hidePadding>
      {nowData?.weekPoitRegYn === 'Y' ? (
        // 주간활동 포인트 배치 실행 후
        <>
          {isHunter === 'Y' ? (
            // 헌터일 떄
            <>
              <HunterInfo>
                <Text size={16}>헌터 점수</Text>
                <HunterPntInfo onPress={showPointModal}>
                  <Text
                    style={{ marginRight: 5 }}
                    size={16}
                    color={Colors.point}
                  >
                    +{Number(atvtPoint?.hunterPnt)}P
                  </Text>
                  <IconAlertCircle />
                </HunterPntInfo>
                {hunterPointModal && (
                  <HunterInfoModal
                    isVisible={hunterPointModal}
                    setHunterModal={setHunterPointModal}
                  />
                )}
              </HunterInfo>
              <PostsWrap>
                {_.isEmpty(postList) ? (
                  <NonePosts />
                ) : (
                  <FlatList
                    data={postList}
                    renderItem={HunterPost}
                    keyExtractor={(item, index): string =>
                      index.toString()
                    }
                    numColumns={3}
                    contentContainerStyle={{ paddingBottom: 150 }}
                  />
                )}
              </PostsWrap>
            </>
          ) : (
            //  헌터 아닐 때
            <>
              <HunterNInfo>
                <Text size={16} bold={'500'}>
                  {loginedUserInfo?.userId}님, {`\n`} 스테이킹으로
                  헌터가 되어보세요!
                </Text>
                <TouchableOpacity onPress={showBeHunterModal}>
                  <Text color={Colors.active}>자세히 보기 {`>`}</Text>
                </TouchableOpacity>
                {beHunterModal && (
                  <HunterModal
                    isVisible={true}
                    setIsVisible={setBeHunterModal}
                  />
                )}
              </HunterNInfo>
              <View>
                <ImageWrap>
                  <BeforeImage source={Images.gif.folderIsEmpty} />
                </ImageWrap>
                <Text
                  color={Colors.nagative}
                  style={{ textAlign: 'center' }}
                >
                  게시물이 없습니다. 😐
                </Text>
              </View>
            </>
          )}
        </>
      ) : (
        // 주간활동 포인트 배치 실행 전
        <>
          <HunterInfo>
            <Text size={16}>헌터 점수</Text>
            <HunterPntInfo onPress={showPointModal}>
              <Text
                style={{ marginRight: 5 }}
                size={16}
                color={Colors.point}
              >
                - P
              </Text>
              <IconAlertCircle />
            </HunterPntInfo>
            {hunterPointModal && (
              <HunterInfoModal
                isVisible={hunterPointModal}
                setHunterModal={setHunterPointModal}
              />
            )}
          </HunterInfo>
          <BeforeCount />
        </>
      )}
    </Body>
  )
}

const HunterInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px;
`
const HunterNInfo = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 15px;
`
const HunterPntInfo = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 13px;
`

const PostsWrap = styled.View`
  width: 100%;
  margin: 0 auto;
`

const PostBox = styled.TouchableOpacity`
  background-color: ${Colors.wh};
  width: ${Layout.window.width / 3.6}px;
  height: ${Layout.window.width / 2.9}px;
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

const ImageWrap = styled.View`
  width: 100%;
  /* padding-top: 70px; */
`

const BeforeImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 300px;
  margin: auto;
`
