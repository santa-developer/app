import React from 'react'
import { Colors } from '@constants'
import styled from 'styled-components/native'
import { View } from 'react-native'
import Text from '@components/Text'
import Button from '@components/Button'
import Modal from 'react-native-modal'

interface PointModalProps {
  isVisible: boolean
  setPointModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function PontInfoModal(
  props: PointModalProps
): React.JSX.Element {
  const { isVisible, setPointModal } = props

  // 포인트 모달 닫기
  const hideModal = (): void => {
    setPointModal(false)
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      swipeDirection={'down'}
      animationInTiming={400}
      animationOutTiming={200}
      style={{
        alignItems: 'center',
      }}
    >
      <PontInfoWrap>
        <View>
          <Text size={18} bold={'500'} style={{ marginBottom: 10 }}>
            활동 포인트를 쌓는 3가지 방법!
          </Text>
          <Text color={Colors.nagative} lineHeight={27}>
            1. 내가 올린 큐레이션 게시물에 좋아요 받기{' '}
            <Text color={Colors.point}>+5P</Text>
          </Text>
          <Text color={Colors.nagative} lineHeight={27}>
            2. 내가 올린 직접입력 게시물에 좋아요 받기{' '}
            <Text color={Colors.point}>+10P</Text>
          </Text>
          <Text color={Colors.nagative} lineHeight={27}>
            3. 헌터가 되어 유해콘텐츠 신고 후 확정 시{' '}
            <Text color={Colors.point}>+10P</Text>
          </Text>
          <Text style={{ marginTop: 15 }}>
            단, 내가 올린 게시물에 싫어요를 받으면 포인트 점수가{' '}
            {`\n`} 차감돼요! <Text color={Colors.error}>-5P</Text>
          </Text>
          <RowWrap>
            <Text color={Colors.nagative}>※</Text>
            <Text size={13} color={Colors.nagative}>
              획득한 포인트를 이용하여 하이블럭스의 알고리즘에 {`\n`}
              의해 주단위로 보상이 주어집니다. {':)'}
            </Text>
          </RowWrap>
          <Button
            text={'확인'}
            buttonType={'active'}
            style={{ marginTop: 25 }}
            onPress={hideModal}
          />
        </View>
      </PontInfoWrap>
    </Modal>
  )
}

const PontInfoWrap = styled.View`
  background-color: ${Colors.wh};
  padding: 25px 15px;
  border-radius: 4px;
  max-width: 340px;
`

const RowWrap = styled.View`
  flex-direction: row;
  margin-top: 10px;
`
