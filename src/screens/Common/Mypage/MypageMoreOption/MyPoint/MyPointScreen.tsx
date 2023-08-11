import Text from '@components/Text'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Colors } from '@constants'
import IconAlertCircle from '@images/svg/IconAlertCircle.svg'
import PointTabMenu from './PointTabMenu'
import $t from 'i18n'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'
import myPage from '@api/mypage.api'
import {
  WeeksStkgProps,
  WknbMgmtProps,
} from '@models/Mypage/NOW_POINT'
import { useRecoilState } from 'recoil'
import { loginedUserInfoState } from '@recoil/atoms/auth'
import NavigationService from '@service/NavigationService'

export default function MyPointScreen(): React.JSX.Element {
  const [loginedUserInfo] = useRecoilState(loginedUserInfoState)
  const [stakingInfo, setStakingInfo] = useState<WeeksStkgProps>()
  const [nowData, setNowData] = useState<WknbMgmtProps>()
  const [totalPoint, setTotalPoint] = useState('0') // 내 포인트 정보

  // 스테이킹 정보 가져오기
  const _loadMyPointInfo = async (): Promise<void> => {
    return myPage.nowpoint
      .get()
      .then(async (result) => {
        if (result.check) {
          setStakingInfo(result.response.stakingInfo)
          setNowData(result.response.nowData)
        } else {
          // await setDefaultMsg()
        }
      })
      .catch(async () => {
        // await setDefaultMsg()
      })
  }

  // 내 포인트 확인
  const getMemberPoint = async (): Promise<void> => {
    const result = await myPage.memberpoint.get({
      mebrMgmtNmbr: loginedUserInfo.mebrMgmtNmbr,
    })
    if (result.check) {
      setTotalPoint(result.response.totalPoint)
    }
  }

  useEffect(() => {
    _loadMyPointInfo()
    getMemberPoint()
  }, [])
  return (
    <MyPointWrap>
      {/* 상단 포인트 정보 (고정) */}
      <MyPointHeader>
        <PointInfo>
          <IconAlertCircle />
          <Text style={{ marginLeft: 5 }} color={Colors.nagative}>
            집계일 {nowData?.wkndSttdate} - {nowData?.wkndEnddate}{' '}
            (UCT 기준)
          </Text>
        </PointInfo>
        {nowData?.weekPoitRegYn === 'Y' ? (
          <Text size={30} bold={'500'}>
            {Number(totalPoint)} P
          </Text>
        ) : (
          <Text size={30} bold={'500'}>
            - P
          </Text>
        )}
      </MyPointHeader>
      {/* 포인트 탭 */}
      <PointTabMenu />
      <StaKingLinkWrap>
        <StaKingLink
          onPress={(): void => {
            NavigationService.navigate('Wallet')
          }}
        >
          {nowData?.weekClasHuntRegYn === 'Y' ? (
            <Text color={Colors.wh}>
              금주 스테이킹 {stakingInfo?.stkgClas}등급 ☺️ 다음 보상시
              가중치 {stakingInfo?.stkgCunt}% 적용!
            </Text>
          ) : (
            <Text color={Colors.wh}>
              금주 스테이킹 등급 집계중입니다. ☺️
            </Text>
          )}
        </StaKingLink>
      </StaKingLinkWrap>
    </MyPointWrap>
  )
}

const MyPointWrap = styled.SafeAreaView`
  height: 100%;
  background-color: ${Colors.wh};
`

const MyPointHeader = styled.View`
  padding: 20px 15px;
`

const PointInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

const StaKingLinkWrap = styled.View`
  width: 100%;
  padding: 0 15px;
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
`

const StaKingLink = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: ${Colors.active};
  border-radius: 50px;
`

// 헤더
MyPointScreen.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: $t('RANK.RANK_WORD_24'),
  })
}
