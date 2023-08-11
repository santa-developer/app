import Body from '@components/Body'
import Text from '@components/Text'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import IconAlertCircle from '@images/svg/IconAlertCircle.svg'
import { Colors } from '@constants'
import ActivityModal from './ActivityModal'
import IconKing from '@images/svg/IconKing.svg'
import { FlatList, Image, View } from 'react-native'
import $t from 'i18n'
import { WeeksStkgProps } from '@models/Mypage/NOW_POINT'
import myPage from '@api/mypage.api'
import { RankingProps } from '@models/Mypage/RANKING'
import NavigationService from '@service/NavigationService'
import ImageUtils from '@utils/ImageUtils'

export default function ActivityRanking(): React.JSX.Element {
  const [stakingInfo, setStakingInfo] = useState<WeeksStkgProps>()
  const [isVisible, setIsVisible] = useState(false)
  const [topList, setTopList] = useState<RankingProps[]>([])
  const [myRanking, setMyRanking] = useState<RankingProps>()
  const [rankList, setRankList] = useState<RankingProps[]>([])

  // 모달 열기
  const showModal = (): void => {
    setIsVisible(true)
  }

  // 스테이킹 정보 가져오기
  const _loadMyPointInfo = async (): Promise<void> => {
    return myPage.nowpoint
      .get()
      .then(async (result) => {
        if (result.check) {
          const response = result.response
          setStakingInfo(response.stakingInfo)
        } else {
          // await setDefaultMsg()
        }
      })
      .catch(async () => {
        // await setDefaultMsg()
      })
  }

  //todo갱민
  const params = {
    mebrMgmtNmbr: stakingInfo?.mebrMgmtNmbr || '',
    wknbMgmtNmbr: '20201148',
    // wknbMgmtNmbr: stakingInfo?.wknbMgmtNmbr || '',
    rankingType: 'A',
  }

  // 랭킹 목록 가져오기
  const _rankingList = async (): Promise<void> => {
    const result = await myPage.rankingProc.get(params)
    if (result.check) {
      const response = result.response
      setTopList(response.listTop3)
      setRankList(response.list)
      setMyRanking(response.myRanking)
    }
  }

  useEffect(() => {
    _loadMyPointInfo()
    _rankingList()
  }, [])

  // 데이터 렌더링
  function RankingUser({
    item,
  }: {
    item: RankingProps
  }): React.JSX.Element {
    return (
      <RankerWrap
        activeOpacity={0.7}
        onPress={(): void => {
          NavigationService.push('MypageHome', {
            mebrMgmtNmbr: item.mebrMgmtNmbr,
          })
        }}
      >
        <RankerInfoWrap>
          <Text>{item.ranking}</Text>
          <RankerProfile>
            <Image
              source={ImageUtils.getImageSource({
                id: item.mebrFileMgmtNmbr,
                type: 'user',
                size: 200,
              })}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </RankerProfile>
          <UserIdText>{item.userId}</UserIdText>
        </RankerInfoWrap>
        <UserHibsText>0 HIBS</UserHibsText>
      </RankerWrap>
    )
  }
  return (
    <Body style={{ backgroundColor: Colors.wh }} hidePadding>
      {/* 상단 랭킹집계 기간 안내 */}
      <TopInfoWrap onPress={showModal}>
        <Text color={Colors.nagative} style={{ marginRight: 5 }}>
          {$t(
            'RANK.RANK_STC_01',
            myRanking?.wkndSttdate || '',
            myRanking?.wkndEnddate || ''
          )}
        </Text>
        <IconAlertCircle />
        {isVisible && (
          <ActivityModal
            isVisible={true}
            setIsVisible={setIsVisible}
          />
        )}
      </TopInfoWrap>
      {/* Top3 랭킹 */}
      <TopRankingWrap>
        {/* 2nd */}
        {topList[1] && (
          <SndRankerWrap
            activeOpacity={0.7}
            onPress={(): void => {
              NavigationService.push('MypageHome', {
                mebrMgmtNmbr: topList[1]?.mebrMgmtNmbr,
              })
            }}
          >
            <Text size={16}>{topList[1].ranking}</Text>
            <SndProfile>
              <Image
                source={ImageUtils.getImageSource({
                  id: topList[1]?.mebrFileMgmtNmbr,
                  type: 'user',
                  size: 200,
                })}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </SndProfile>
            <UserIdText>{topList[1]?.userId}</UserIdText>
            <UserHibsText
              style={{ marginTop: 5 }}
            >{`9,000 HIBS`}</UserHibsText>
          </SndRankerWrap>
        )}

        {/* 1st */}
        {topList[0] && (
          <FstRankerWrap
            activeOpacity={0.7}
            onPress={(): void => {
              NavigationService.push('MypageHome', {
                mebrMgmtNmbr: topList[0]?.mebrMgmtNmbr,
              })
            }}
          >
            <IconKing
              style={{
                position: 'absolute',
                left: 32,
                top: -15,
                zIndex: 99,
              }}
            />
            <FstProfile>
              <Image
                source={ImageUtils.getImageSource({
                  id: topList[0]?.mebrFileMgmtNmbr,
                  type: 'user',
                  size: 200,
                })}
                style={{
                  width: 68,
                  height: 68,
                }}
              />
            </FstProfile>
            <UserIdText>{topList[0]?.userId}</UserIdText>
            <UserHibsText
              style={{ marginTop: 5 }}
            >{`9,500 HIBS`}</UserHibsText>
          </FstRankerWrap>
        )}
        {/* 3rd */}
        {topList[2] && (
          <SndRankerWrap
            activeOpacity={0.7}
            onPress={(): void => {
              NavigationService.push('MypageHome', {
                mebrMgmtNmbr: topList[2]?.mebrMgmtNmbr,
              })
            }}
          >
            <Text size={16}>{topList[2].ranking}</Text>
            <SndProfile>
              <Image
                source={ImageUtils.getImageSource({
                  id: topList[2]?.mebrFileMgmtNmbr,
                  type: 'user',
                  size: 200,
                })}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </SndProfile>
            <UserIdText>{topList[2]?.userId}</UserIdText>
            <UserHibsText
              style={{ marginTop: 5 }}
            >{`8,500 HIBS`}</UserHibsText>
          </SndRankerWrap>
        )}
      </TopRankingWrap>
      {/* 4위 이하 랭킹 리스트 */}
      <RankingList>
        <FlatList
          data={rankList}
          renderItem={RankingUser}
          keyExtractor={(item, index): string => index.toString()}
          contentContainerStyle={{
            paddingBottom: 300,
            paddingHorizontal: 15,
          }}
        />
      </RankingList>
      {/* 하단 배너 마이 랭킹 */}
      <MyRankingWrap>
        <MyRanking>
          <MyRankingInfo>
            <Myprofile>
              <Image
                source={ImageUtils.getImageSource({
                  id: myRanking?.mebrFileMgmtNmbr,
                  type: 'user',
                  size: 200,
                })}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </Myprofile>
            <View>
              <Text color={Colors.wh} size={15}>
                {myRanking?.userId}
              </Text>
              <Text color={Colors.wh}>
                {$t('RANK.RANK_WORD_03', myRanking?.ranking || '')}
              </Text>
            </View>
          </MyRankingInfo>
          <Text color={Colors.wh}>{`3,300`} HIBS</Text>
        </MyRanking>
      </MyRankingWrap>
    </Body>
  )
}

const TopInfoWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`

const TopRankingWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-top: 30px;
`

const FstRankerWrap = styled.TouchableOpacity`
  align-items: center;
  margin: 0 30px;
  margin-bottom: 15px;
  position: relative;
`

const SndRankerWrap = styled.TouchableOpacity`
  align-items: center;
  margin-top: 20px;
`

const FstProfile = styled.View`
  width: 68px;
  height: 68px;
  border-radius: 50px;
  /* background-color: ${Colors.disabled}; */
  margin-bottom: 5px;
  overflow: hidden;
`

const SndProfile = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  /* background-color: ${Colors.disabled}; */
  margin-bottom: 5px;
  overflow: hidden;
`

const UserIdText = styled(Text)`
  font-size: 16px;
  color: ${Colors.nagative};
`

const UserHibsText = styled(Text)`
  font-size: 16px;
  font-weight: 700;
`

const RankingList = styled.View`
  background-color: ${Colors.gr};
  margin-top: 20px;
  padding: 4px 0px;
  flex-grow: 1;
`

const RankerWrap = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
`

const RankerInfoWrap = styled.View`
  flex-direction: row;
  align-items: center;
`

const RankerProfile = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  overflow: hidden;
  margin: 0px 5px 0 10px;
`

const MyRankingWrap = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0px;
  padding: 0 15px;
`

const MyRanking = styled.View`
  padding: 10px 20px;
  background-color: ${Colors.active};
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const MyRankingInfo = styled.View`
  flex-direction: row;
  align-items: center;
`

const Myprofile = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  margin-right: 10px;
  overflow: hidden;
`
