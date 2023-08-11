import React from 'react'
import styled from 'styled-components/native'
import Modal from 'react-native-modal'
import { Colors } from '@constants'
import Text from '@components/Text'
import Button from '@components/Button'

interface ActivityModalProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ActivityModal(
  props: ActivityModalProps
): React.JSX.Element {
  const { isVisible, setIsVisible } = props

  const hideModal = (): void => {
    setIsVisible(false)
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
      <ModalWrap>
        <Text bold={'500'}>활동랭킹</Text>
        <Text color={Colors.nagative}>
          일주일간 활동포인트를 많이 획득한 회원{`\n`} TOP100입니다.
        </Text>
        <Text bold={'500'} style={{ marginTop: 15 }}>
          포인트 획득 방법
        </Text>
        <TextWrap>
          <Text color={Colors.nagative}>・</Text>
          <Text color={Colors.nagative}>
            내가 올린 게시글 좋아요 받기
          </Text>
        </TextWrap>
        <TextWrap>
          <Text color={Colors.nagative}>・</Text>
          <Text color={Colors.nagative}>
            헌터가 되어 유해콘텐츠 신고 후 확정받기
          </Text>
        </TextWrap>
        <Button
          text={'확인'}
          buttonType={'active'}
          onPress={hideModal}
          style={{ marginTop: 25 }}
        />
      </ModalWrap>
    </Modal>
  )
}

const ModalWrap = styled.View`
  padding: 25px 15px;
  background-color: ${Colors.wh};
  border-radius: 4px;
  width: 340px;
`

const TextWrap = styled.View`
  flex-direction: row;
  align-items: center;
`
