import Body from '@components/Body'
import { CommonHeader } from '@components/Header'
import Text from '@components/Text'
import { Colors } from '@constants'
import { StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

/**
 * 띠배너공지 상세내용 화면
 */
export default function SpaceAnnounce(): JSX.Element {
  return (
    <Body style={{ justifyContent: 'space-around' }}>
      <HeaderText>※ 스페이스 운영자 보상 종료 안내</HeaderText>

      {/* 종료사유 제목 및 내용 */}
      <View>
        <HeaderText>종료 사유</HeaderText>
        <ContentContainer>
          <ContentText>
            보상만을 위한 피드를 등록하는 일부 사용자들로 인해 기존
            회원들의 불만/민원이 있었습니다.
          </ContentText>
          <Text></Text>
          <ContentText>
            따라서 보상만을 위한 무의미한 반복 피드 등록등 어뷰징 방지
            및 개인 피드와 스페이스 피드와의 중복 피드 감소를 위해
            스페이스 피드에 대한 보상 지급을 종료하기로
            결정하였습니다.
          </ContentText>
        </ContentContainer>
      </View>
      {/* 종료서비스 제목 및 내용 */}
      <View>
        <HeaderText>종료 서비스 내용</HeaderText>
        <ContentContainer>
          <ContentText>
            • 스페이스 피드의 보팅/좋아요 등 활동 시 활동포인트 지급
            종료
          </ContentText>
          <ContentText>• 스페이스 운영자 보상 지급 종료</ContentText>
        </ContentContainer>
      </View>

      {/* 스페이스는 이제 이렇게 즐겨요 제목 및 내용 */}
      <View>
        <HeaderText>스페이스는 이제 이렇게 즐겨요</HeaderText>
        <ContentContainer>
          <ContentText>
            1. 나와 친구들과의 추억을 스페이스에서!
          </ContentText>
          <ContentText>
            2. 사랑하는 연인과 둘만의 이야기를!
          </ContentText>
          <ContentText>
            3. 나만의 사진 일기장으로! (나만 보고 쓸 수 있어요)
          </ContentText>
          <ContentText>
            4. 나와 맞는 관심사를 가진 사람들과의 모임을!{' '}
          </ContentText>
        </ContentContainer>
      </View>
      <ContentText>
        스페이스 피드 활동/운영자 보상은 종료되지만 하블 피드 활동
        보상은 유지됩니다.
      </ContentText>
    </Body>
  )
}

SpaceAnnounce.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    headerShown: false,
  })
}

const HeaderText = styled(Text)`
  font-size: 500px;
  font-size: 16px;
`

const ContentContainer = styled.View`
  background-color: ${Colors.bg1};
  padding: 10px;
`
const ContentText = styled(Text)`
  color: ${Colors.nagative};
  text-align: justify;
`
