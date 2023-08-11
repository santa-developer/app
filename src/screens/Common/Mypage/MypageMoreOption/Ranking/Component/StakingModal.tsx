import Text from '@components/Text'
import { Colors } from '@constants'
import React from 'react'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import Button from '@components/Button'

interface StakingModalProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StakingModal(
  props: StakingModalProps
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
        <Text bold={'500'}>스테이킹 랭킹</Text>
        <Text color={Colors.nagative}>
          일주일간 스테이킹을 많이 한 회원 {`\n`}TOP100입니다.
        </Text>
        <TextWrap style={{ marginTop: 15 }}>
          <Text color={Colors.nagative}>・</Text>
          <Text color={Colors.nagative}>
            스테이킹 금액에 따라 활동포인트의 가중치 및 {`\n`}스테이킹
            보상이 지급됩니다.
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
`
