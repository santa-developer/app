import React from 'react'
import $t from 'i18n'
import { CommonHeader } from '@components/Header'
import { StackNavigationOptions } from '@react-navigation/stack'
import Body from '@components/Body'
import { Colors } from '@constants'
import styled from 'styled-components/native'
import Text from '@components/Text'
import { View } from 'react-native'
import IconAcivity from '@images/svg/IconAcivity.svg'
import IconStaking from '@images/svg/IconStaking.svg'

import Pie from './Component/DonutChart'

export default function RewardHistoryScreen(): React.JSX.Element {
  return (
    <Body hidePadding style={{ backgroundColor: Colors.wh }}>
      <RewardInfoWrap>
        <Text size={20} bold={'500'}>
          지난 차수의 보상 내역 및 {`\n`}랭킹 정보 입니다{' :)'}
        </Text>
        <Text color={Colors.nagative} style={{ marginTop: 10 }}>
          같은 포인트 점수라도 리워드 Pool의 사용자 비율에 따라{`\n`}
          지급되므로 HIBS 보상이 지난주와 다를 수 있습니다.
        </Text>
      </RewardInfoWrap>
      <RewardGraphWrap>
        <RewardGraph>
          {/* 상단 포인트집계기간, 총보상 */}
          <RewardInfo>
            <View>
              <Text color={Colors.nagative}>
                {`2020.01.01`} - {`2020.01.07`}
              </Text>
              <Text size={20} bold={'700'} style={{ marginTop: 8 }}>
                {`8,500`} HIBS{' '}
                <Text size={13} color={Colors.nagative}>
                  ({`7,000`} + {`1,500`})
                </Text>
              </Text>
            </View>
            <TakeBtn>
              <Text size={13} color={Colors.wh}>
                받기
              </Text>
            </TakeBtn>
          </RewardInfo>
          {/* 그래프 */}
          <GraphWrap>
            <Pie />
            {/* <PieChart /> */}
          </GraphWrap>
          {/* 보상 상세내용(활동보상, 스테이킹 보상) */}
          <View>
            <DetailWrap>
              <DetailTitle>
                <IconAcivity />
                <Text
                  color={Colors.nagative}
                  style={{ marginLeft: 5 }}
                >
                  활동보상{' '}
                  <Text
                    size={12}
                    color={Colors.nagative}
                  >{`100위 밖`}</Text>
                </Text>
              </DetailTitle>
              <Text size={16} bold={'700'}>
                {`17,000`} HIBS
              </Text>
              <Text size={13} color={Colors.nagative}>
                {`17,148`} point / 개인스테이킹 1등급 (가중치{`1.16%`}
                )
              </Text>
            </DetailWrap>
            <DetailWrap>
              <DetailTitle>
                <IconStaking />
                <Text
                  color={Colors.nagative}
                  style={{ marginLeft: 5 }}
                >
                  스테이킹보상{' '}
                  <Text
                    size={12}
                    color={Colors.nagative}
                  >{`100위 밖`}</Text>
                </Text>
              </DetailTitle>
              <Text size={16} bold={'700'}>
                {`1,500`} HIBS
              </Text>
              <Text size={13} color={Colors.nagative}>
                {`100,000`} HIBS / 나의 스테이킹 점유율 {`26%`}
              </Text>
            </DetailWrap>
          </View>
        </RewardGraph>
      </RewardGraphWrap>
    </Body>
  )
}

/**
 * navigation 옵션
 */
RewardHistoryScreen.navigationOptions =
  (): StackNavigationOptions => {
    return CommonHeader({
      title: $t('MP.MP_WORD_12'),
    })
  }

const RewardInfoWrap = styled.View`
  padding: 30px 15px;
`

const RewardGraphWrap = styled.View`
  background-color: ${Colors.gr};
  padding: 10px 15px;
  flex-grow: 1;
`
const RewardGraph = styled.View`
  background-color: ${Colors.wh};
  padding: 30px 15px;
`

const RewardInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`
const TakeBtn = styled.TouchableOpacity`
  padding: 5px 14px;
  background-color: ${Colors.active};
  border-radius: 50px;
`

const GraphWrap = styled.View`
  margin: 20px 0 0;
`

const DetailWrap = styled.View`
  margin-top: 20px;
`
const DetailTitle = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`
