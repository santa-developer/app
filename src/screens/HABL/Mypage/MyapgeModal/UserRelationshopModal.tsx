import Text from '@components/Text'
import { Colors } from '@constants'
import { useConfirm } from '@hooks/useCommonAlert'
import { isBottomModalState } from '@recoil/atoms/Mypage/mypage'
import NavigationService from '@service/NavigationService'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components/native'

export default function UserRelationshopModal(): JSX.Element {
  const confirm = useConfirm()
  const setIsBottomModal = useSetRecoilState(isBottomModalState) // 다른 사용자 마이페이지 옵션정보

  const handleBlock = (): void => {
    setIsBottomModal(false)

    confirm({
      title: '이 계정을 차단하시겠습니까?',
      desc: '상대방은 회원님의 게시물을 확인 할 수 없습니다.\nHABL은 회원님이 차단한 사실을 상대방에게\n알리지 않습니다.',
      onPressConfirm: async (): Promise<void> => {
        confirm({
          title: '해당 계정이 차단되었습니다.',
          desc: '마이페이지 > 더보기 > 설정 > 차단계정 관리\n메뉴에서 혹은 상대방의 마이페이지에서\n차단해제가 가능합니다.',
        })
      },
    })
  }

  const handleDeclaration = (): void => {
    setIsBottomModal(false)
    NavigationService.navigate('Declaration')
  }

  return (
    <Wrapper>
      <FollowingContainer style={styles.shadow}>
        <Button>
          <Text color={Colors.bl} size={16} bold="500">
            팔로잉
          </Text>
        </Button>
      </FollowingContainer>
      <BlockContainer style={styles.shadow}>
        <Button bar={true} onPress={handleBlock}>
          <Text color={Colors.bl} size={16} bold="500">
            계정차단
          </Text>
        </Button>
        <Button onPress={handleDeclaration}>
          <Text color={Colors.error} size={16} bold="500">
            신고
          </Text>
        </Button>
      </BlockContainer>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
`

const FollowingContainer = styled.View`
  width: 100%;
  height: 25%;
  border-radius: 10px;
  justify-content: center;
  margin-bottom: 10px;
  background-color: ${Colors.wh};
`

const BlockContainer = styled.View`
  width: 100%;
  border-radius: 10px;
  background-color: ${Colors.wh};
`
const Button = styled.TouchableOpacity<{ bar?: boolean }>`
  justify-content: center;
  padding: 14px 20px;
  border-bottom-width: ${(props): string =>
    props.bar ? '1px' : '0'};
  border-bottom-color: ${Colors.bg1};
`

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.nagative,
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
  },
})
